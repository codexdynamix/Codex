import { handleChainiqApi, headersToObject } from "./chainiq-api.mjs";

const CHAINIQ_API_PREFIXES = [
  "/api/admin",
  "/api/client",
  "/api/chainiq",
  "/api/crm",
  "/api/public",
  "/api/track-visitor",
  "/api/submit-enquiry",
  "/api/platform/settings",
  "/api/market/tradfi",
  "/api/market/crypto",
  "/api/market/crypto-sparklines",
  "/api/heartbeat",
  "/api/visitor",
];

function isChainIqApiPath(pathname) {
  return CHAINIQ_API_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  );
}

function readBody(req) {
  return new Promise((resolve) => {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
    });
    req.on("end", () => resolve(body));
  });
}

export function chainiqApiPlugin() {
  return {
    name: "chainiq-admin-api",
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const requestUrl = req.url || "/";
        const url = new URL(requestUrl, "http://localhost:3000");
        if (!isChainIqApiPath(url.pathname)) {
          next();
          return;
        }

        const method = (req.method || "GET").toUpperCase();
        const rawBody =
          method === "GET" || method === "HEAD" ? "" : await readBody(req);
        const result = await handleChainiqApi({
          method,
          path: url.pathname,
          search: url.search,
          headers: headersToObject(req.headers),
          rawBody,
        });

        res.statusCode = result.status;
        res.setHeader("Content-Type", "application/json; charset=utf-8");
        res.setHeader("Cache-Control", "no-store");
        res.end(JSON.stringify(result.body));
      });
    },
  };
}