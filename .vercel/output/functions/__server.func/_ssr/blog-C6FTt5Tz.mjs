import { i as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/@fortawesome/react-fontawesome+[...].mjs";
import { C as useSearch, S as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { Z as Clock, at as Check, ct as Calendar, dt as BookOpen, f as Sparkles, g as Share2, ht as ArrowLeft, i as User } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { v as cn } from "./router-B2S7_RqX.mjs";
import { a as SEO, c as calculateReadingTime, i as NewsletterSignup, n as Footer, o as ScrollProgress, r as Nav, s as SiteCanvas } from "./SiteCanvas-BpGAJpX0.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/blog-C6FTt5Tz.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
/**
* Lightweight, high-performance Markdown parser that transforms headers,
* blockquotes, code blocks, unordered/ordered lists, bold/italics, and paragraphs
* into semantic HTML matching Codex Dynamics design typography.
*/
function renderMarkdownToHtml(markdown) {
	if (!markdown) return "";
	const lines = markdown.split("\n");
	const result = [];
	let inCodeBlock = false;
	let codeBlockContent = [];
	let inList = false;
	let listType = "ul";
	for (let i = 0; i < lines.length; i++) {
		const line = lines[i];
		if (line.trim().startsWith("```")) {
			if (inCodeBlock) {
				result.push(`<pre class="my-6 overflow-x-auto rounded-2xl bg-[#0d1117] p-5 text-xs text-[#e6edf3] font-mono border border-white/10 leading-relaxed shadow-inner"><code>${escapeHtml(codeBlockContent.join("\n"))}</code></pre>`);
				codeBlockContent = [];
				inCodeBlock = false;
			} else {
				if (inList) {
					result.push(listType === "ul" ? "</ul>" : "</ol>");
					inList = false;
				}
				inCodeBlock = true;
			}
			continue;
		}
		if (inCodeBlock) {
			codeBlockContent.push(line);
			continue;
		}
		const isUnorderedItem = line.trim().startsWith("- ") || line.trim().startsWith("* ");
		const isOrderedItem = /^\d+\.\s/.test(line.trim());
		if (!isUnorderedItem && !isOrderedItem && inList) {
			result.push(listType === "ul" ? "</ul>" : "</ol>");
			inList = false;
		}
		if (!line.trim()) continue;
		if (line.startsWith("### ")) {
			result.push(`<h3 class="mt-8 mb-3 text-xl font-bold tracking-tight text-label font-display">${parseInline(line.slice(4))}</h3>`);
			continue;
		}
		if (line.startsWith("## ")) {
			result.push(`<h2 class="mt-12 mb-4 text-2xl sm:text-3xl font-bold tracking-tight text-label font-display pb-2 border-b border-black/8">${parseInline(line.slice(3))}</h2>`);
			continue;
		}
		if (line.startsWith("# ")) {
			result.push(`<h1 class="mt-8 mb-4 text-3xl sm:text-4xl font-extrabold tracking-tight text-label font-display">${parseInline(line.slice(2))}</h1>`);
			continue;
		}
		if (line.startsWith("> ")) {
			result.push(`<blockquote class="my-6 border-l-3 border-blue bg-blue/5 py-3 px-5 rounded-r-xl text-sm italic text-label/90 leading-relaxed">${parseInline(line.slice(2))}</blockquote>`);
			continue;
		}
		if (isUnorderedItem) {
			if (!inList) {
				result.push(`<ul class="my-4 space-y-2 list-disc list-inside text-sm sm:text-base text-muted-foreground leading-relaxed pl-2">`);
				inList = true;
				listType = "ul";
			}
			const itemText = line.trim().replace(/^[-*]\s+/, "");
			result.push(`<li class="marker:text-blue">${parseInline(itemText)}</li>`);
			continue;
		}
		if (isOrderedItem) {
			if (!inList) {
				result.push(`<ol class="my-4 space-y-2 list-decimal list-inside text-sm sm:text-base text-muted-foreground leading-relaxed pl-2">`);
				inList = true;
				listType = "ol";
			}
			const itemText = line.trim().replace(/^\d+\.\s+/, "");
			result.push(`<li class="marker:text-blue marker:font-semibold">${parseInline(itemText)}</li>`);
			continue;
		}
		result.push(`<p class="my-4 text-sm sm:text-base text-muted-foreground leading-relaxed font-sans">${parseInline(line)}</p>`);
	}
	if (inList) result.push(listType === "ul" ? "</ul>" : "</ol>");
	return result.join("\n");
}
function escapeHtml(str) {
	return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
}
function parseInline(text) {
	let res = escapeHtml(text);
	res = res.replace(/`([^`]+)`/g, `<code class="rounded bg-black/6 px-1.5 py-0.5 text-xs font-mono text-blue font-medium">$1</code>`);
	res = res.replace(/\*\*([^*]+)\*\*/g, `<strong class="font-semibold text-label">$1</strong>`);
	res = res.replace(/\*([^*]+)\*/g, `<em class="italic">$1</em>`);
	res = res.replace(/\[([^\]]+)\]\(([^)]+)\)/g, `<a href="$2" target="_blank" rel="noopener noreferrer" class="text-blue hover:underline font-medium inline-flex items-center gap-0.5">$1</a>`);
	return res;
}
/**
* Blog Component
* Renders an optimized, design-system-aligned long-form blog article layout.
* Features:
* - Reactive viewport scroll progress indicator
* - Dynamic SEO (React Helmet equivalent) with Open Graph & JSON-LD article schema
* - Automated reading time calculation labeled as a subtle muted badge
* - Executive summary callout box
* - Clean semantic typography designed for high readability
* - Native copy link & share functionality
*/
function Blog({ post, onBack, className }) {
	const [copied, setCopied] = import_react.useState(false);
	const readingTime = (0, import_react.useMemo)(() => {
		return calculateReadingTime(post.content);
	}, [post.content]);
	const renderedHtml = (0, import_react.useMemo)(() => {
		return renderMarkdownToHtml(post.content);
	}, [post.content]);
	const articleSchema = (0, import_react.useMemo)(() => {
		return {
			"@context": "https://schema.org",
			"@type": "BlogPosting",
			headline: post.title,
			description: post.excerpt || post.title,
			author: {
				"@type": "Organization",
				name: post.author || "Codex Dynamics",
				url: "https://codexdynamics.com"
			},
			publisher: {
				"@type": "Organization",
				name: "Codex Dynamics",
				logo: {
					"@type": "ImageObject",
					url: "https://codexdynamics.com/hero/studio.jpg"
				}
			},
			datePublished: post.publishedAt || (/* @__PURE__ */ new Date()).toISOString(),
			dateModified: post.updatedAt || post.publishedAt || (/* @__PURE__ */ new Date()).toISOString(),
			mainEntityOfPage: {
				"@type": "WebPage",
				"@id": typeof window !== "undefined" ? window.location.href : "https://codexdynamics.com"
			},
			keywords: post.focusKeyword ? [post.focusKeyword] : post.tags,
			wordCount: readingTime.words,
			timeRequired: `PT${readingTime.minutes}M`
		};
	}, [post, readingTime]);
	const handleShare = async () => {
		const url = typeof window !== "undefined" ? window.location.href : "";
		if (navigator.share) try {
			await navigator.share({
				title: post.title,
				text: post.excerpt || post.title,
				url
			});
			return;
		} catch {}
		if (navigator.clipboard) {
			await navigator.clipboard.writeText(url);
			setCopied(true);
			toast.success("Article link copied to clipboard!");
			setTimeout(() => setCopied(false), 2500);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: cn("relative min-h-screen bg-background text-foreground transition-colors", className),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollProgress, {
				height: "h-1",
				color: "bg-blue"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SEO, {
				title: post.title,
				description: post.excerpt || post.title,
				ogType: "article",
				ogImage: post.coverImage || "/hero/studio.jpg",
				articleAuthor: post.author || "Codex Dynamics",
				articlePublishedTime: post.publishedAt,
				articleModifiedTime: post.updatedAt,
				articleSection: post.category || "Engineering",
				articleTags: post.tags,
				keywords: post.focusKeyword ? [post.focusKeyword, ...post.tags || []] : post.tags,
				schemaOrg: articleSchema
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "shell max-w-4xl py-12 sm:py-20",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-8 flex items-center justify-between",
						children: [onBack ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: onBack,
							className: "group inline-flex items-center gap-2 text-xs font-semibold text-muted-foreground hover:text-label transition-colors cursor-pointer",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "size-3.5 transition-transform group-hover:-translate-x-1" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Back to all insights" })]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
							href: "/#insights",
							className: "group inline-flex items-center gap-2 text-xs font-semibold text-muted-foreground hover:text-label transition-colors",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "size-3.5 transition-transform group-hover:-translate-x-1" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Back to all insights" })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: handleShare,
							className: "inline-flex items-center gap-1.5 rounded-full border border-black/8 bg-white px-3 py-1.5 text-xs font-medium text-muted-foreground hover:text-label hover:border-black/20 shadow-xs transition-all cursor-pointer",
							title: "Share or copy article link",
							children: [copied ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-3 text-green-600" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Share2, { className: "size-3" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: copied ? "Link copied" : "Share" })]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
						className: "space-y-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap items-center gap-2 text-xs",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "inline-flex items-center gap-1.5 rounded-full bg-blue/10 px-3 py-1 font-semibold text-blue",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, { className: "size-3" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: post.category || "Engineering" })]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "inline-flex items-center gap-1 rounded-full bg-black/4 px-2.5 py-0.5 text-[11px] font-medium text-muted-foreground",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "size-3 text-subtle" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: readingTime.text })]
									}),
									post.publishedAt && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "inline-flex items-center gap-1 text-[11px] text-muted-foreground",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar, { className: "size-3 text-subtle" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("time", {
											dateTime: post.publishedAt,
											children: new Date(post.publishedAt).toLocaleDateString("en-US", {
												month: "short",
												day: "numeric",
												year: "numeric"
											})
										})]
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "text-3xl sm:text-5xl font-extrabold tracking-tight text-label font-display leading-[1.15]",
								children: post.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-3 pt-1 text-xs text-muted-foreground",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "flex items-center gap-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, { className: "size-3.5 text-subtle" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["By ", post.author || "Codex Dynamics Engineering"] })]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-black/20",
										children: "•"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "flex items-center gap-1 font-mono text-[11px]",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "size-3 text-subtle" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: readingTime.text }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "text-subtle",
												children: [
													"(",
													readingTime.words,
													" words)"
												]
											})
										]
									})
								]
							}),
							post.excerpt && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-6 flex items-start gap-3 rounded-2xl border border-blue/15 bg-blue/5 p-4 text-xs sm:text-sm text-muted-foreground",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "size-4 shrink-0 text-blue mt-0.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
									className: "font-semibold text-label",
									children: "Core Takeaway: "
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: post.excerpt })] })]
							})
						]
					}),
					post.coverImage && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "my-8 overflow-hidden rounded-3xl border border-black/8 shadow-sm",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: post.coverImage,
							alt: post.title,
							className: "h-64 sm:h-96 w-full object-cover",
							loading: "lazy"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-10 article-prose text-label leading-relaxed max-w-none",
						dangerouslySetInnerHTML: { __html: renderedHtml }
					}),
					(post.tags || post.focusKeyword) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-12 pt-6 border-t border-hairline flex flex-wrap items-center gap-2 text-xs",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-semibold text-label text-xs",
								children: "Topics & Keywords:"
							}),
							post.focusKeyword && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "rounded-md bg-blue/10 px-2.5 py-1 font-mono text-blue font-medium",
								children: ["#", post.focusKeyword]
							}),
							post.tags?.map((tag) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "rounded-md bg-muted px-2.5 py-1 text-muted-foreground font-mono text-[11px]",
								children: ["#", tag]
							}, tag))
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-14 pt-8 border-t border-hairline",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NewsletterSignup, {
							variant: "card",
							title: "Enjoyed this architectural deep dive?",
							description: "Subscribe to receive our technical blueprints, web performance audits, and high-conversion design systems directly to your inbox.",
							source: `blog_${post.slug || "article"}`
						})
					})
				]
			})
		]
	});
}
var DEFAULT_POST = {
	id: "default-post",
	title: "Engineering High-Conversion Architecture for Design Systems",
	slug: "engineering-high-conversion-architecture",
	excerpt: "Why splitting design tokens from runtime business logic reduces bundle latency and produces predictable 99th percentile conversion rates on mobile devices.",
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
	tags: [
		"Architecture",
		"Design Systems",
		"Web Performance",
		"Rank Math"
	],
	focusKeyword: "high-conversion architecture"
};
function BlogPageRoute() {
	const { slug } = useSearch({ from: "/blog" });
	const navigate = useNavigate();
	const [currentPost] = (0, import_react.useState)(DEFAULT_POST);
	const [isLoading] = (0, import_react.useState)(false);
	const handleBack = () => {
		navigate({ to: "/" });
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SiteCanvas, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SEO, {
			title: currentPost.title,
			description: currentPost.excerpt || currentPost.title,
			ogType: "article",
			articleAuthor: currentPost.author,
			articlePublishedTime: currentPost.publishedAt,
			articleSection: currentPost.category,
			articleTags: currentPost.tags,
			keywords: currentPost.tags
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Nav, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
			className: "pt-16",
			children: isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "shell max-w-4xl py-24 text-center",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "inline-block size-6 animate-spin rounded-full border-2 border-blue border-t-transparent" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-xs text-muted-foreground",
					children: "Loading article..."
				})]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Blog, {
				post: currentPost,
				onBack: handleBack
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Footer, {})
	] });
}
//#endregion
export { BlogPageRoute as component };
