import { useState, useEffect } from "react";
import { createFileRoute, useNavigate, useSearch } from "@tanstack/react-router";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Blog, type BlogPostData } from "@/components/Blog";
import { SEO } from "@/components/SEO";
import { SiteCanvas } from "@/components/SiteCanvas";
import type { BlogPost } from "@/types/crm";

interface BlogSearch {
  slug?: string;
}

export const Route = createFileRoute("/blog")({
  validateSearch: (search: Record<string, unknown>): BlogSearch => {
    return {
      slug: (search.slug as string) || "",
    };
  },
  component: BlogPageRoute,
});

const DEFAULT_POST: BlogPostData = {
  id: "default-post",
  title: "Engineering High-Conversion Architecture for Design Systems",
  slug: "engineering-high-conversion-architecture",
  excerpt:
    "Why splitting design tokens from runtime business logic reduces bundle latency and produces predictable 99th percentile conversion rates on mobile devices.",
  content: `## The Modern Latency Paradox

Web applications in 2026 operate under stricter conversion latency penalties than ever before. Every additional 100 milliseconds of main-thread execution correlates directly with a 7% reduction in mobile user retention.

Yet, most modern marketing websites drown under hundreds of kilobytes of un-tree-shaken icon libraries, redundant client-side routing bundles, and client-rendered layout shifts.

### Core Architectural Principles

To guarantee sub-second Time to Interactive (TTI), we adhere to three foundational rules:

1. **Deterministic Typography Scaling**: Calculating font metrics on the root rather than letting JavaScript recalculate line heights dynamically.
2. **Server-Side Rendered Critical Path**: Shipping pure semantic HTML for the first viewport before any hydrate-pass initializes.
3. **Headless Conversion Tracking**: Measuring visitor interaction telemetry through lightweight beacons without blocking execution loops.

> "A great user interface is not one that screams for attention; it is one whose precision makes every interaction feel completely inevitable."

### Technical Implementation

Here is how our micro-bundle hydration lifecycle is orchestrated:

\`\`\`typescript
// Precision Telemetry Beacon
export function recordConversionEvent(event: string, meta: Record<string, unknown>) {
  if (typeof navigator !== "undefined" && navigator.sendBeacon) {
    const payload = JSON.stringify({ event, meta, timestamp: Date.now() });
    navigator.sendBeacon("/api/telemetry", payload);
  }
}
\`\`\`

By offloading analytic pipelines to non-blocking background workers, our public interfaces maintain a steady 60 frames-per-second scrolling rhythm across both desktop displays and low-power mobile devices.

### Summary & Next Steps

When evaluating your digital product stack, treat typography and layout as physical materials. Build components with strict boundary scopes, verify your Rank Math on-page keyword density, and inspect your real-world mobile scroll ergonomics.`,
  author: "Codex Dynamics Engineering",
  category: "Engineering",
  publishedAt: "2026-09-17T00:00:00.000Z",
  tags: ["Architecture", "Design Systems", "Web Performance", "Rank Math"],
  focusKeyword: "high-conversion architecture",
};

function BlogPageRoute() {
  const { slug } = useSearch({ from: "/blog" });
  const navigate = useNavigate();
  const [currentPost, setCurrentPost] = useState<BlogPostData>(DEFAULT_POST);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadPost() {
      try {
        setIsLoading(true);

        // 1. If slug is present, fetch via public single-blog endpoint (increments view count in SQLite)
        if (slug) {
          try {
            const singleRes = await fetch(`/api/public/blog?slug=${encodeURIComponent(slug)}`);
            if (singleRes.ok) {
              const singleJson = await singleRes.json();
              if (singleJson.ok && singleJson.post) {
                const p = singleJson.post;
                let parsedTags = ["Architecture", "Engineering", "Rank Math"];
                if (Array.isArray(p.tags)) {
                  parsedTags = p.tags;
                } else if (typeof p.tags === "string" && p.tags.trim()) {
                  try {
                    const arr = JSON.parse(p.tags);
                    if (Array.isArray(arr)) parsedTags = arr;
                    else parsedTags = p.tags.split(",").map((t: string) => t.trim()).filter(Boolean);
                  } catch {
                    parsedTags = p.tags.split(",").map((t: string) => t.trim()).filter(Boolean);
                  }
                }

                setCurrentPost({
                  id: p.id,
                  title: p.title,
                  slug: p.slug,
                  excerpt: p.excerpt,
                  content: p.content,
                  coverImage: p.cover_image || p.image_url || undefined,
                  author: p.author || "Codex Dynamics Research",
                  category: p.category || "Engineering",
                  publishedAt: p.created_at || new Date().toISOString(),
                  updatedAt: p.updated_at,
                  tags: parsedTags,
                  focusKeyword: p.focus_keyword || p.title.toLowerCase().slice(0, 30),
                });
                return;
              }
            }
          } catch {
            // Fall through to content list fallback
          }
        }

        // 2. Fallback: query public content endpoint or crm data
        let found: any = null;
        const pubRes = await fetch("/api/public/content");
        if (pubRes.ok) {
          const pubJson = await pubRes.json();
          if (pubJson.blogs && pubJson.blogs.length > 0) {
            found = slug
              ? pubJson.blogs.find((b: any) => b.slug === slug || String(b.id) === slug)
              : pubJson.blogs[0];
          }
        }

        if (!found) {
          const res = await fetch("/api/crm/data");
          if (res.ok) {
            const json = await res.json();
            if (json.blogs && json.blogs.length > 0) {
              found = slug
                ? json.blogs.find((b: BlogPost) => b.slug === slug || String(b.id) === slug)
                : json.blogs[0];
            }
          }
        }

        if (found) {
          let parsedTags = ["Architecture", "Engineering", "Rank Math"];
          if (Array.isArray(found.tags)) {
            parsedTags = found.tags;
          } else if (typeof found.tags === "string" && found.tags.trim()) {
            try {
              const arr = JSON.parse(found.tags);
              if (Array.isArray(arr)) parsedTags = arr;
              else parsedTags = found.tags.split(",").map((t: string) => t.trim()).filter(Boolean);
            } catch {
              parsedTags = found.tags.split(",").map((t: string) => t.trim()).filter(Boolean);
            }
          }

          setCurrentPost({
            id: found.id,
            title: found.title,
            slug: found.slug,
            excerpt: found.excerpt,
            content: found.content,
            coverImage: found.cover_image || found.image_url || undefined,
            author: found.author || "Codex Dynamics Research",
            category: found.category || "Engineering",
            publishedAt: found.created_at || new Date().toISOString(),
            updatedAt: found.updated_at,
            tags: parsedTags,
            focusKeyword: found.focus_keyword || found.title.toLowerCase().slice(0, 30),
          });
        }
      } catch {
        // Fallback default post
      } finally {
        setIsLoading(false);
      }
    }
    void loadPost();
  }, [slug]);

  const handleBack = () => {
    void navigate({ to: "/" });
  };

  return (
    <SiteCanvas>
      <SEO
        title={currentPost.title}
        description={currentPost.excerpt || currentPost.title}
        ogType="article"
        articleAuthor={currentPost.author}
        articlePublishedTime={currentPost.publishedAt}
        articleSection={currentPost.category}
        articleTags={currentPost.tags}
        keywords={currentPost.tags}
      />
      <Nav />
      <main className="pt-16">
        {isLoading ? (
          <div className="shell max-w-4xl py-24 text-center">
            <div className="inline-block size-6 animate-spin rounded-full border-2 border-blue border-t-transparent" />
            <p className="mt-3 text-xs text-muted-foreground">Loading article...</p>
          </div>
        ) : (
          <Blog post={currentPost} onBack={handleBack} />
        )}
      </main>
      <Footer />
    </SiteCanvas>
  );
}
