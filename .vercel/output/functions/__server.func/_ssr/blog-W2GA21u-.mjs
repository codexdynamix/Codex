import { i as __toESM } from "../_runtime.mjs";
import { r as require_react } from "../_libs/@fortawesome/react-fontawesome+[...].mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { C as useSearch, S as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { Z as Clock, at as Check, ct as Calendar, dt as BookOpen, f as Sparkles, g as Share2, ht as ArrowLeft, i as User } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { v as cn } from "./router-DPjHh583.mjs";
import { a as SEO, c as calculateReadingTime, i as NewsletterSignup, n as Footer, o as ScrollProgress, r as Nav, s as SiteCanvas } from "./SiteCanvas-DZhNtQ-7.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/blog-W2GA21u-.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName$1 = "/app/applet/src/components/Blog.tsx";
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
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("article", {
		className: cn("relative min-h-screen bg-background text-foreground transition-colors", className),
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ScrollProgress, {
				height: "h-1",
				color: "bg-blue"
			}, void 0, false, {
				fileName: _jsxFileName$1,
				lineNumber: 271,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SEO, {
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
			}, void 0, false, {
				fileName: _jsxFileName$1,
				lineNumber: 274,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "shell max-w-4xl py-12 sm:py-20",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "mb-8 flex items-center justify-between",
						children: [onBack ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
							type: "button",
							onClick: onBack,
							className: "group inline-flex items-center gap-2 text-xs font-semibold text-muted-foreground hover:text-label transition-colors cursor-pointer",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ArrowLeft, { className: "size-3.5 transition-transform group-hover:-translate-x-1" }, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 297,
								columnNumber: 15
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Back to all insights" }, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 298,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$1,
							lineNumber: 292,
							columnNumber: 13
						}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", {
							href: "/#insights",
							className: "group inline-flex items-center gap-2 text-xs font-semibold text-muted-foreground hover:text-label transition-colors",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ArrowLeft, { className: "size-3.5 transition-transform group-hover:-translate-x-1" }, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 305,
								columnNumber: 15
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Back to all insights" }, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 306,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$1,
							lineNumber: 301,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
							type: "button",
							onClick: handleShare,
							className: "inline-flex items-center gap-1.5 rounded-full border border-black/8 bg-white px-3 py-1.5 text-xs font-medium text-muted-foreground hover:text-label hover:border-black/20 shadow-xs transition-all cursor-pointer",
							title: "Share or copy article link",
							children: [copied ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Check, { className: "size-3 text-green-600" }, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 316,
								columnNumber: 23
							}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Share2, { className: "size-3" }, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 316,
								columnNumber: 69
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: copied ? "Link copied" : "Share" }, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 317,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$1,
							lineNumber: 310,
							columnNumber: 11
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$1,
						lineNumber: 290,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("header", {
						className: "space-y-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex flex-wrap items-center gap-2 text-xs",
								children: [
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
										className: "inline-flex items-center gap-1.5 rounded-full bg-blue/10 px-3 py-1 font-semibold text-blue",
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(BookOpen, { className: "size-3" }, void 0, false, {
											fileName: _jsxFileName$1,
											lineNumber: 325,
											columnNumber: 15
										}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: post.category || "Engineering" }, void 0, false, {
											fileName: _jsxFileName$1,
											lineNumber: 326,
											columnNumber: 15
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName$1,
										lineNumber: 324,
										columnNumber: 13
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
										className: "inline-flex items-center gap-1 rounded-full bg-black/4 px-2.5 py-0.5 text-[11px] font-medium text-muted-foreground",
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Clock, { className: "size-3 text-subtle" }, void 0, false, {
											fileName: _jsxFileName$1,
											lineNumber: 331,
											columnNumber: 15
										}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: readingTime.text }, void 0, false, {
											fileName: _jsxFileName$1,
											lineNumber: 332,
											columnNumber: 15
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName$1,
										lineNumber: 330,
										columnNumber: 13
									}, this),
									post.publishedAt && /* @__PURE__ */ (void 0)("span", {
										className: "inline-flex items-center gap-1 text-[11px] text-muted-foreground",
										children: [/* @__PURE__ */ (void 0)(Calendar, { className: "size-3 text-subtle" }, void 0, false, {
											fileName: _jsxFileName$1,
											lineNumber: 337,
											columnNumber: 17
										}, this), /* @__PURE__ */ (void 0)("time", {
											dateTime: post.publishedAt,
											children: new Date(post.publishedAt).toLocaleDateString("en-US", {
												month: "short",
												day: "numeric",
												year: "numeric"
											})
										}, void 0, false, {
											fileName: _jsxFileName$1,
											lineNumber: 338,
											columnNumber: 17
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName$1,
										lineNumber: 336,
										columnNumber: 15
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName$1,
								lineNumber: 323,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", {
								className: "text-3xl sm:text-5xl font-extrabold tracking-tight text-label font-display leading-[1.15]",
								children: post.title
							}, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 349,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex items-center gap-3 pt-1 text-xs text-muted-foreground",
								children: [
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
										className: "flex items-center gap-1",
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(User, { className: "size-3.5 text-subtle" }, void 0, false, {
											fileName: _jsxFileName$1,
											lineNumber: 356,
											columnNumber: 15
										}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: ["By ", post.author || "Codex Dynamics Engineering"] }, void 0, true, {
											fileName: _jsxFileName$1,
											lineNumber: 357,
											columnNumber: 15
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName$1,
										lineNumber: 355,
										columnNumber: 13
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
										className: "text-black/20",
										children: "•"
									}, void 0, false, {
										fileName: _jsxFileName$1,
										lineNumber: 359,
										columnNumber: 13
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
										className: "flex items-center gap-1 font-mono text-[11px]",
										children: [
											/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Clock, { className: "size-3 text-subtle" }, void 0, false, {
												fileName: _jsxFileName$1,
												lineNumber: 361,
												columnNumber: 15
											}, this),
											/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: readingTime.text }, void 0, false, {
												fileName: _jsxFileName$1,
												lineNumber: 362,
												columnNumber: 15
											}, this),
											/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
												className: "text-subtle",
												children: [
													"(",
													readingTime.words,
													" words)"
												]
											}, void 0, true, {
												fileName: _jsxFileName$1,
												lineNumber: 363,
												columnNumber: 15
											}, this)
										]
									}, void 0, true, {
										fileName: _jsxFileName$1,
										lineNumber: 360,
										columnNumber: 13
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName$1,
								lineNumber: 354,
								columnNumber: 11
							}, this),
							post.excerpt && /* @__PURE__ */ (void 0)("div", {
								className: "mt-6 flex items-start gap-3 rounded-2xl border border-blue/15 bg-blue/5 p-4 text-xs sm:text-sm text-muted-foreground",
								children: [/* @__PURE__ */ (void 0)(Sparkles, { className: "size-4 shrink-0 text-blue mt-0.5" }, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 369,
									columnNumber: 15
								}, this), /* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("strong", {
									className: "font-semibold text-label",
									children: "Core Takeaway: "
								}, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 371,
									columnNumber: 17
								}, this), /* @__PURE__ */ (void 0)("span", { children: post.excerpt }, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 372,
									columnNumber: 17
								}, this)] }, void 0, true, {
									fileName: _jsxFileName$1,
									lineNumber: 370,
									columnNumber: 15
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$1,
								lineNumber: 368,
								columnNumber: 13
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName$1,
						lineNumber: 322,
						columnNumber: 9
					}, this),
					post.coverImage && /* @__PURE__ */ (void 0)("div", {
						className: "my-8 overflow-hidden rounded-3xl border border-black/8 shadow-sm",
						children: /* @__PURE__ */ (void 0)("img", {
							src: post.coverImage,
							alt: post.title,
							className: "h-64 sm:h-96 w-full object-cover",
							loading: "lazy"
						}, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 381,
							columnNumber: 13
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 380,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "mt-10 article-prose text-label leading-relaxed max-w-none",
						dangerouslySetInnerHTML: { __html: renderedHtml }
					}, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 391,
						columnNumber: 9
					}, this),
					(post.tags || post.focusKeyword) && /* @__PURE__ */ (void 0)("div", {
						className: "mt-12 pt-6 border-t border-hairline flex flex-wrap items-center gap-2 text-xs",
						children: [
							/* @__PURE__ */ (void 0)("span", {
								className: "font-semibold text-label text-xs",
								children: "Topics & Keywords:"
							}, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 399,
								columnNumber: 13
							}, this),
							post.focusKeyword && /* @__PURE__ */ (void 0)("span", {
								className: "rounded-md bg-blue/10 px-2.5 py-1 font-mono text-blue font-medium",
								children: ["#", post.focusKeyword]
							}, void 0, true, {
								fileName: _jsxFileName$1,
								lineNumber: 401,
								columnNumber: 15
							}, this),
							post.tags?.map((tag) => /* @__PURE__ */ (void 0)("span", {
								className: "rounded-md bg-muted px-2.5 py-1 text-muted-foreground font-mono text-[11px]",
								children: ["#", tag]
							}, tag, true, {
								fileName: _jsxFileName$1,
								lineNumber: 406,
								columnNumber: 15
							}, this))
						]
					}, void 0, true, {
						fileName: _jsxFileName$1,
						lineNumber: 398,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "mt-14 pt-8 border-t border-hairline",
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(NewsletterSignup, {
							variant: "card",
							title: "Enjoyed this architectural deep dive?",
							description: "Subscribe to receive our technical blueprints, web performance audits, and high-conversion design systems directly to your inbox.",
							source: `blog_${post.slug || "article"}`
						}, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 418,
							columnNumber: 11
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 417,
						columnNumber: 9
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName$1,
				lineNumber: 288,
				columnNumber: 7
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName$1,
		lineNumber: 264,
		columnNumber: 5
	}, this);
}
var _jsxFileName = "/app/applet/src/routes/blog.tsx?tsr-split=component";
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
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SiteCanvas, { children: [
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SEO, {
			title: currentPost.title,
			description: currentPost.excerpt || currentPost.title,
			ogType: "article",
			articleAuthor: currentPost.author,
			articlePublishedTime: currentPost.publishedAt,
			articleSection: currentPost.category,
			articleTags: currentPost.tags,
			keywords: currentPost.tags
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 73,
			columnNumber: 7
		}, this),
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Nav, {}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 74,
			columnNumber: 7
		}, this),
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("main", {
			className: "pt-16",
			children: isLoading ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "shell max-w-4xl py-24 text-center",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "inline-block size-6 animate-spin rounded-full border-2 border-blue border-t-transparent" }, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 77,
					columnNumber: 13
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "mt-3 text-xs text-muted-foreground",
					children: "Loading article..."
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 78,
					columnNumber: 13
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 76,
				columnNumber: 22
			}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Blog, {
				post: currentPost,
				onBack: handleBack
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 79,
				columnNumber: 20
			}, this)
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 75,
			columnNumber: 7
		}, this),
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Footer, {}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 81,
			columnNumber: 7
		}, this)
	] }, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 72,
		columnNumber: 10
	}, this);
}
//#endregion
export { BlogPageRoute as component };
