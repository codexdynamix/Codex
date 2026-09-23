import { readdirSync } from "node:fs";
import { join } from "node:path";
import type { Plugin } from "vite";
import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { nitro } from "nitro/vite";
// @ts-expect-error JS plugin alongside the TS vite config
import { grokPwaPlugin } from "./scripts/grok-pwa-plugin.mjs";
// @ts-expect-error JS plugin alongside the TS vite config
import { appEnvPlugin } from "./scripts/app-env-plugin.mjs";
import { isMigrationFile } from "./scripts/migration-plan.mjs";
// @ts-expect-error JS plugin
import { chainiqApiPlugin } from "./server/chainiq-plugin.mjs";

/** The files `src/lib/db.ts` globs — same directory, same non-recursive scope. */
function hasGlobbedMigrations(root: string): boolean {
  try {
    return readdirSync(join(root, "migrations")).some(isMigrationFile);
  } catch {
    return false;
  }
}

/**
 * Finish PGLite bootstrap during dev-server setup (before traffic). Vite awaits
 * async `configureServer` hooks. Production: `src/lib/db` kicks `ensureDbReady`
 * on import.
 *
 * Vite awaiting the hook puts this on time-to-first-render, so an app with no
 * migrations — no schema to apply — skips it entirely rather than paying for a
 * PGLite instance it never queries.
 */
function pgliteBootstrapPlugin(): Plugin {
  return {
    name: "app-builder:pglite-bootstrap",
    apply: "serve",
    async configureServer(server) {
      if (!hasGlobbedMigrations(server.config.root)) return;
      try {
        const mod = (await server.ssrLoadModule("/src/lib/db.ts")) as {
          ensureDbReady?: () => Promise<void>;
        };
        if (typeof mod.ensureDbReady === "function") {
          await mod.ensureDbReady();
        }
      } catch (err) {
        console.error("[app-builder] DB bootstrap failed:", err);
        throw err;
      }
    },
  };
}

/**
 * Live-preview OAuth popup — handled HERE so the agent never has to create a
 * `/auth/popup` route (and cannot break it by scaffolding a React page that
 * paints the full app shell in the popup).
 *
 * `signIn` (client.ts) opens `/auth/popup?providerId=…` in a top-level window.
 * This middleware runs before TanStack Start, calls `handleAuthPopupRequest`,
 * and returns the 302 / completion HTML. Deployed apps do not use the popup
 * (full-page OAuth redirect), so `apply: "serve"` is enough.
 */
function authPopupPlugin(): Plugin {
  return {
    name: "app-builder:auth-popup",
    apply: "serve",
    configureServer(server) {
      // Register immediately (not in a returned post-hook) so we run BEFORE
      // TanStack Start / the SPA HTML fallback. A model-authored
      // `src/routes/auth/popup.tsx` React page must never win this path.
      server.middlewares.use(async (req, res, next) => {
        try {
          const rawUrl = req.url ?? "";
          const pathOnly = rawUrl.split("?", 1)[0] ?? "";
          if (pathOnly !== "/auth/popup") {
            next();
            return;
          }
          if ((req.method ?? "GET").toUpperCase() !== "GET") {
            res.statusCode = 405;
            res.setHeader("content-type", "text/plain; charset=utf-8");
            res.end("Method Not Allowed");
            return;
          }

          const host = String(
            req.headers["x-forwarded-host"] ?? req.headers.host ?? "localhost:3000",
          );
          const proto = String(
            req.headers["x-forwarded-proto"] ??
              ((req.socket as { encrypted?: boolean } | undefined)?.encrypted ? "https" : "http"),
          );
          const requestHeaders = new Headers();
          for (const [key, value] of Object.entries(req.headers)) {
            if (value === undefined) continue;
            if (Array.isArray(value)) {
              for (const v of value) requestHeaders.append(key, v);
            } else {
              requestHeaders.set(key, value);
            }
          }
          // Ensure Host is the public preview host so Better Auth's dynamic
          // baseURL / redirect_uri match the popup origin.
          if (!requestHeaders.has("host")) requestHeaders.set("host", host);

          const request = new Request(`${proto}://${host}${rawUrl}`, {
            method: "GET",
            headers: requestHeaders,
          });

          const mod = (await server.ssrLoadModule("/src/lib/auth/popup.server.ts")) as {
            handleAuthPopupRequest: (req: Request) => Promise<Response>;
          };
          const response = await mod.handleAuthPopupRequest(request);

          res.statusCode = response.status;
          // Preserve multiple Set-Cookie headers (OAuth state + session).
          const setCookies =
            typeof response.headers.getSetCookie === "function"
              ? response.headers.getSetCookie()
              : [];
          response.headers.forEach((value, key) => {
            if (key.toLowerCase() === "set-cookie") return;
            res.setHeader(key, value);
          });
          for (const cookie of setCookies) {
            res.appendHeader("set-cookie", cookie);
          }
          const body = Buffer.from(await response.arrayBuffer());
          res.end(body);
        } catch (err) {
          console.error("[app-builder] /auth/popup handler failed:", err);
          if (!res.headersSent) {
            res.statusCode = 500;
            res.setHeader("content-type", "text/plain; charset=utf-8");
            res.end("auth popup failed");
          }
        }
      });
    },
  };
}

/**
 * Prevent continuous reload loops caused by Vite dev client when WebSocket
 * disconnects under reverse proxies or if file writes trigger unintended full-reloads.
 */
function preventViteReloadPlugin(): Plugin {
  return {
    name: "prevent-vite-reload-loop",
    configureServer(server) {
      // 0. Ensure /src/styles.css requested as stylesheet is served with ?direct (text/css)
      server.middlewares.use((req, res, next) => {
        const url = req.url || "";
        if (url === "/src/styles.css" || url === "/src/styles.css?") {
          req.url = "/src/styles.css?direct";
        }
        next();
      });

      // 1. Suppress unintended full-reloads emitted over WebSocket for non-source file changes
      const origSend = server.ws.send;
      server.ws.send = function (payload: any, ...args: any[]) {
        if (payload && typeof payload === "object") {
          if (payload.type === "full-reload") {
            const p = String(payload.path || "");
            if (
              !p ||
              p.includes("sqlite") ||
              p.includes(".data") ||
              p.includes("screenshots") ||
              p.includes("uploads") ||
              p.includes(".grok") ||
              p.includes(".cache") ||
              p.endsWith(".png") ||
              p.endsWith(".jpg") ||
              p.endsWith(".mp4")
            ) {
              console.warn(`[vite] suppressed unwanted full-reload for: ${p || "untracked asset"}`);
              return;
            }
          }
        }
        return origSend.call(this, payload, ...args);
      };

      // 2. Intercept @vite/client middleware to neutralize aggressive location.reload() loops
      server.middlewares.use((req, res, next) => {
        const url = req.url || "";
        if (url === "/@vite/client" || url.startsWith("/@vite/client?")) {
          const originalEnd = res.end.bind(res);
          const chunks: Buffer[] = [];

          res.write = function (chunk: any, ..._rest: any[]) {
            if (chunk) chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
            return true;
          };

          res.end = function (chunk?: any, ..._rest: any[]) {
            if (chunk) chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
            let body = Buffer.concat(chunks).toString("utf-8");

            // Neutralize all automatic reload triggers in Vite client
            body = body.replaceAll(
              "location.reload();",
              'console.warn("[vite] location.reload() suppressed to prevent reload loop"); (void 0);',
            );

            res.setHeader("Content-Length", Buffer.byteLength(body));
            return originalEnd(body);
          };
        }
        next();
      });
    },
  };
}

// `0.0.0.0:3000` is the server contract.
export default defineConfig(({ command, isPreview }) => ({
  server: {
    host: "0.0.0.0",
     port: process.env.PORT ? parseInt(process.env.PORT, 10) : 3000,
    strictPort: true,
    allowedHosts: true,
    watch: {
      ignored: [
        "**/.data/**",
        "**/database.sqlite*",
        "**/*.sqlite*",
        "**/*.sqlite3*",
        "**/uploads/**",
        "**/screenshots/**",
        "**/.cache/**",
        "**/.grok/**",
        "**/*.png",
        "**/*.jpg",
        "**/*.jpeg",
        "**/*.mp4",
        "**/*.webp",
        "**/dist/**",
      ],
    },
  },
  preview: {
    host: "127.0.0.1",
    port: 8081,
    strictPort: true,
  },
  resolve: { tsconfigPaths: true },
  plugins: [
    preventViteReloadPlugin(),
    chainiqApiPlugin(),
    pgliteBootstrapPlugin(),
    // Before tanstackStart so /auth/popup never falls through to the SPA.
    authPopupPlugin(),
    // Dev-only /__app-env, read by scripts/check-auth-invariant.mjs.
    appEnvPlugin(),
    // PWA head + ?install=1 tutorial page; runs before Start/Nitro.
    grokPwaPlugin(),
    tailwindcss(),
    tanstackStart(),
    ...(command === "build" || isPreview
      ? [
          nitro({
            preset: "vercel",
            // Auto-registers server/middleware/* (the PWA install page +
            // manifest + head-tag middleware). Nitro v3 defaults serverDir to
            // false, so removing this silently unwires /?install=1 on deploys.
            serverDir: "./server",
          }),
        ]
      : []),
    viteReact(),
  ],
}));
