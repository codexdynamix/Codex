import { i as __toESM } from "../_runtime.mjs";
import { r as require_react } from "../_libs/@fortawesome/react-fontawesome+[...].mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { x as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { $ as CircleHelp, A as Megaphone, E as Palette, G as FileCheck, H as Gauge, J as ExternalLink, M as Mail, P as Lock, R as Layers, S as Quote, T as PhoneCall, X as CodeXml, Z as Clock, c as TrendingUp, d as Star, dt as BookOpen, et as CircleCheck, f as Sparkles, h as ShieldCheck, it as ChevronDown, m as Shield, mt as ArrowRight, n as X, nt as ChevronUp, p as SlidersHorizontal, pt as ArrowUpRight, r as UsersRound, rt as ChevronRight, t as Zap, v as Search, z as Laptop } from "../_libs/lucide-react.mjs";
import { n as AnimatePresence, t as motion } from "../_libs/framer-motion+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { _ as WhatsAppLogo, a as CONTACT, c as FacebookLogo, d as InstagramLogo, g as ViberLogo, i as useContactModal, m as TelegramLogo, o as LINKS, p as PhoneLogo, r as trackCurrentVisitor, s as useSiteConfig, u as GmailLogo, v as cn } from "./router-DPjHh583.mjs";
import { a as SEO, c as calculateReadingTime, d as resolveSectionsOrder, f as scrollToId, l as isComponentEnabled, n as Footer, o as ScrollProgress, p as usePreviewMode, r as Nav, s as SiteCanvas, t as Button, u as resolveSectionVisibility } from "./SiteCanvas-DZhNtQ-7.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-C8lAlNj4.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName$17 = "/app/applet/src/components/AlternateHero.tsx";
var FALLBACK = [
	{
		src: "/hero/studio.mp4",
		poster: "/hero/studio.jpg",
		label: "Codex Dynamics",
		line: "The agency. The standard."
	},
	{
		src: "/hero/web-dev.mp4",
		poster: "/hero/web-dev.jpg",
		label: "Web Development",
		line: "Websites and web apps, assembled like a product."
	},
	{
		src: "/hero/design.mp4",
		poster: "/hero/design.jpg",
		label: "Web Design",
		line: "Type, color, and layout as one material."
	},
	{
		src: "/hero/social.mp4",
		poster: "/hero/social.jpg",
		label: "Social Media",
		line: "Content, campaigns, and growth — in one system."
	}
];
function AlternateHero({ layout }) {
	const { config } = useSiteConfig();
	const clips = config.hero?.clips?.length ? config.hero.clips : FALLBACK;
	const [clip, setClip] = (0, import_react.useState)(0);
	const current = clips[clip] || clips[0];
	const badge = config.hero?.badge || "Codex Dynamics";
	const title = config.hero?.title || "Precision on every screen.";
	const subtitle = config.hero?.subtitle || "Websites, web apps, and social campaigns — composed with the care of a product launch.";
	if (layout === "split") return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", {
		id: "hero",
		"aria-label": "Hero",
		className: "hero-stage relative isolate pt-20 sm:pt-24",
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "shell grid items-center gap-8 pb-10 lg:grid-cols-2 lg:gap-12",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "max-w-xl",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "mb-3 text-[11px] font-medium tracking-[0.22em] text-subtle uppercase",
						children: badge
					}, void 0, false, {
						fileName: _jsxFileName$17,
						lineNumber: 30,
						columnNumber: 13
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", {
						className: "text-[2.1rem] leading-[1.05] font-semibold tracking-tight text-label sm:text-[3rem] lg:text-[3.4rem]",
						children: title
					}, void 0, false, {
						fileName: _jsxFileName$17,
						lineNumber: 31,
						columnNumber: 13
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "mt-4 max-w-md text-[15px] leading-relaxed text-muted-foreground sm:text-base",
						children: subtitle
					}, void 0, false, {
						fileName: _jsxFileName$17,
						lineNumber: 34,
						columnNumber: 13
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "mt-6 flex flex-wrap gap-2",
						children: clips.map((video, i) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
							type: "button",
							onClick: () => setClip(i),
							className: cn("rounded-full px-3 py-1.5 text-[11px] font-medium transition-colors", i === clip ? "bg-primary text-primary-foreground" : "bg-card text-muted-foreground"),
							children: video.label
						}, video.label || i, false, {
							fileName: _jsxFileName$17,
							lineNumber: 37,
							columnNumber: 17
						}, this))
					}, void 0, false, {
						fileName: _jsxFileName$17,
						lineNumber: 35,
						columnNumber: 13
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName$17,
				lineNumber: 29,
				columnNumber: 11
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "relative overflow-hidden rounded-xl bg-ink aspect-[16/11] shadow-border",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("img", {
						src: current.poster,
						alt: "",
						className: "absolute inset-0 h-full w-full object-cover"
					}, void 0, false, {
						fileName: _jsxFileName$17,
						lineNumber: 52,
						columnNumber: 13
					}, this),
					current.src ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("video", {
						src: current.src,
						poster: current.poster,
						className: "absolute inset-0 h-full w-full object-cover",
						muted: true,
						loop: true,
						playsInline: true,
						autoPlay: true
					}, current.src, false, {
						fileName: _jsxFileName$17,
						lineNumber: 54,
						columnNumber: 15
					}, this) : null,
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/50 to-transparent" }, void 0, false, {
						fileName: _jsxFileName$17,
						lineNumber: 65,
						columnNumber: 13
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "absolute bottom-4 left-4 right-4 text-paper",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
							className: "text-[11px] tracking-[0.2em] uppercase text-paper/70",
							children: current.label
						}, void 0, false, {
							fileName: _jsxFileName$17,
							lineNumber: 67,
							columnNumber: 15
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
							className: "mt-1 text-sm text-paper/90",
							children: current.line
						}, void 0, false, {
							fileName: _jsxFileName$17,
							lineNumber: 68,
							columnNumber: 15
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$17,
						lineNumber: 66,
						columnNumber: 13
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName$17,
				lineNumber: 51,
				columnNumber: 11
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName$17,
			lineNumber: 28,
			columnNumber: 9
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName$17,
		lineNumber: 27,
		columnNumber: 7
	}, this);
	if (layout === "centered") return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", {
		id: "hero",
		"aria-label": "Hero",
		className: "hero-stage relative isolate pt-24 sm:pt-28",
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "shell pb-10 text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "mb-4 text-[11px] font-medium tracking-[0.24em] text-subtle uppercase",
					children: badge
				}, void 0, false, {
					fileName: _jsxFileName$17,
					lineNumber: 80,
					columnNumber: 11
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", {
					className: "mx-auto max-w-4xl text-[2.35rem] leading-[1.05] font-semibold tracking-tight text-label sm:text-[3.4rem] lg:text-[4rem]",
					children: title
				}, void 0, false, {
					fileName: _jsxFileName$17,
					lineNumber: 81,
					columnNumber: 11
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "mx-auto mt-5 max-w-xl text-[15px] leading-relaxed text-muted-foreground sm:text-base",
					children: subtitle
				}, void 0, false, {
					fileName: _jsxFileName$17,
					lineNumber: 84,
					columnNumber: 11
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "mx-auto mt-10 overflow-hidden rounded-xl bg-ink aspect-[21/9] max-w-5xl shadow-border",
					children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("img", {
						src: current.poster,
						alt: "",
						className: "h-full w-full object-cover"
					}, void 0, false, {
						fileName: _jsxFileName$17,
						lineNumber: 86,
						columnNumber: 13
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName$17,
					lineNumber: 85,
					columnNumber: 11
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "mx-auto mt-5 flex max-w-3xl flex-wrap justify-center gap-1.5",
					children: clips.map((video, i) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
						type: "button",
						onClick: () => setClip(i),
						className: cn("min-h-10 rounded-full px-4 text-[12px] font-medium", i === clip ? "bg-label text-paper" : "bg-card text-muted-foreground"),
						children: video.label
					}, video.label || i, false, {
						fileName: _jsxFileName$17,
						lineNumber: 90,
						columnNumber: 15
					}, this))
				}, void 0, false, {
					fileName: _jsxFileName$17,
					lineNumber: 88,
					columnNumber: 11
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName$17,
			lineNumber: 79,
			columnNumber: 9
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName$17,
		lineNumber: 78,
		columnNumber: 7
	}, this);
	if (layout === "editorial") return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", {
		id: "hero",
		"aria-label": "Hero",
		className: "hero-stage relative isolate pt-28 sm:pt-32",
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "shell pb-12",
			children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "text-[12px] font-medium tracking-[0.28em] text-subtle uppercase",
					children: badge
				}, void 0, false, {
					fileName: _jsxFileName$17,
					lineNumber: 112,
					columnNumber: 11
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", {
					className: "mt-5 max-w-5xl font-display text-[2.8rem] leading-[0.98] font-semibold tracking-tight text-label sm:text-[4.4rem] lg:text-[5.2rem]",
					children: title
				}, void 0, false, {
					fileName: _jsxFileName$17,
					lineNumber: 113,
					columnNumber: 11
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground",
					children: subtitle
				}, void 0, false, {
					fileName: _jsxFileName$17,
					lineNumber: 116,
					columnNumber: 11
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "mt-10 overflow-hidden rounded-lg bg-ink aspect-[2.2/1] shadow-border",
					children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("img", {
						src: current.poster,
						alt: "",
						className: "h-full w-full object-cover"
					}, void 0, false, {
						fileName: _jsxFileName$17,
						lineNumber: 118,
						columnNumber: 13
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName$17,
					lineNumber: 117,
					columnNumber: 11
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "mt-4 flex flex-wrap gap-6 text-[13px] text-muted-foreground",
					children: clips.map((video, i) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
						className: "tracking-wide",
						children: video.label
					}, video.label || i, false, {
						fileName: _jsxFileName$17,
						lineNumber: 122,
						columnNumber: 15
					}, this))
				}, void 0, false, {
					fileName: _jsxFileName$17,
					lineNumber: 120,
					columnNumber: 11
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName$17,
			lineNumber: 111,
			columnNumber: 9
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName$17,
		lineNumber: 110,
		columnNumber: 7
	}, this);
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", {
		id: "hero",
		"aria-label": "Hero",
		className: "hero-stage relative isolate pt-20 sm:pt-24",
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "shell grid gap-3 pb-10 md:grid-cols-6 md:grid-rows-2 md:h-[min(72vh,38rem)]",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "surface-lift rounded-xl bg-card p-6 md:col-span-3 md:row-span-2 md:p-8 flex flex-col justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "text-[11px] font-medium tracking-[0.22em] text-subtle uppercase",
					children: badge
				}, void 0, false, {
					fileName: _jsxFileName$17,
					lineNumber: 137,
					columnNumber: 13
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", {
					className: "mt-4 text-[2rem] leading-[1.05] font-semibold tracking-tight text-label sm:text-[2.8rem]",
					children: title
				}, void 0, false, {
					fileName: _jsxFileName$17,
					lineNumber: 138,
					columnNumber: 13
				}, this)] }, void 0, true, {
					fileName: _jsxFileName$17,
					lineNumber: 136,
					columnNumber: 11
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "mt-6 max-w-md text-sm leading-relaxed text-muted-foreground",
					children: subtitle
				}, void 0, false, {
					fileName: _jsxFileName$17,
					lineNumber: 142,
					columnNumber: 11
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName$17,
				lineNumber: 135,
				columnNumber: 9
			}, this), clips.slice(0, 3).map((video, i) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
				type: "button",
				onClick: () => setClip(i),
				className: cn("relative overflow-hidden rounded-xl bg-ink text-left md:col-span-3 min-h-[9rem]", i === 0 ? "md:col-span-3" : "md:col-span-3"),
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("img", {
						src: video.poster,
						alt: "",
						className: "absolute inset-0 h-full w-full object-cover"
					}, void 0, false, {
						fileName: _jsxFileName$17,
						lineNumber: 154,
						columnNumber: 13
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "absolute inset-0 bg-gradient-to-t from-ink/70 to-transparent" }, void 0, false, {
						fileName: _jsxFileName$17,
						lineNumber: 155,
						columnNumber: 13
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
						className: "absolute bottom-3 left-3 text-sm font-medium text-paper",
						children: video.label
					}, void 0, false, {
						fileName: _jsxFileName$17,
						lineNumber: 156,
						columnNumber: 13
					}, this)
				]
			}, video.label || i, true, {
				fileName: _jsxFileName$17,
				lineNumber: 145,
				columnNumber: 11
			}, this))]
		}, void 0, true, {
			fileName: _jsxFileName$17,
			lineNumber: 134,
			columnNumber: 7
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName$17,
		lineNumber: 133,
		columnNumber: 5
	}, this);
}
var _jsxFileName$16 = "/app/applet/src/components/Hero.tsx";
var HERO_VIDEOS = [
	{
		src: "/hero/studio.mp4",
		poster: "/hero/studio.jpg",
		label: "Codex Dynamics",
		line: "The agency. The standard."
	},
	{
		src: "/hero/web-dev.mp4",
		poster: "/hero/web-dev.jpg",
		label: "Web Development",
		line: "Websites and web apps, assembled like a product."
	},
	{
		src: "/hero/design.mp4",
		poster: "/hero/design.jpg",
		label: "Web Design",
		line: "Type, color, and layout as one material."
	},
	{
		src: "/hero/social.mp4",
		poster: "/hero/social.jpg",
		label: "Social Media",
		line: "Content, campaigns, and growth — in one system."
	}
];
var CLIP_MS = 1e4;
var TONE_MS = 22e3;
var TONE_CLASS = [
	"hero-tone-black",
	"hero-tone-pacific",
	"hero-tone-ash"
];
function Hero() {
	const { config } = useSiteConfig();
	const layout = config.theme?.heroLayout || config.theme?.layout?.heroLayout || "streamer";
	if (layout && layout !== "streamer") return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(AlternateHero, { layout }, void 0, false, {
		fileName: _jsxFileName$16,
		lineNumber: 46,
		columnNumber: 12
	}, this);
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(StreamerHero, {}, void 0, false, {
		fileName: _jsxFileName$16,
		lineNumber: 48,
		columnNumber: 10
	}, this);
}
function StreamerHero() {
	const { config } = useSiteConfig();
	const clips = config.hero?.clips?.length ? config.hero.clips : HERO_VIDEOS;
	const [clip, setClip] = (0, import_react.useState)(0);
	const [tone, setTone] = (0, import_react.useState)(0);
	const [visibleSlot, setVisibleSlot] = (0, import_react.useState)(0);
	const slotA = (0, import_react.useRef)(null);
	const slotB = (0, import_react.useRef)(null);
	const visibleSlotRef = (0, import_react.useRef)(0);
	const clipRef = (0, import_react.useRef)(0);
	const theaterRef = (0, import_react.useRef)(null);
	visibleSlotRef.current = visibleSlot;
	clipRef.current = clip;
	const showClip = (0, import_react.useCallback)((index) => {
		if (index === clipRef.current) return;
		const nextSlot = visibleSlotRef.current === 0 ? 1 : 0;
		const nextEl = nextSlot === 0 ? slotA.current : slotB.current;
		if (!nextEl) return;
		nextEl.src = clips[index].src;
		nextEl.poster = clips[index].poster;
		nextEl.currentTime = 0;
		nextEl.muted = true;
		nextEl.volume = 0;
		let transitioned = false;
		const switchNow = () => {
			if (transitioned) return;
			transitioned = true;
			nextEl.play().catch(() => {});
			visibleSlotRef.current = nextSlot;
			clipRef.current = index;
			setVisibleSlot(nextSlot);
			setClip(index);
		};
		if (nextEl.readyState >= 2) switchNow();
		else {
			nextEl.addEventListener("loadeddata", switchNow, { once: true });
			setTimeout(switchNow, 200);
		}
	}, [clips]);
	(0, import_react.useEffect)(() => {
		const a = slotA.current;
		if (!a) return;
		a.muted = true;
		a.volume = 0;
		a.play().catch(() => {});
	}, []);
	(0, import_react.useEffect)(() => {
		const timer = window.setInterval(() => {
			const next = (clipRef.current + 1) % clips.length;
			showClip(next);
		}, CLIP_MS);
		return () => window.clearInterval(timer);
	}, [showClip, clips.length]);
	(0, import_react.useEffect)(() => {
		if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
		const timer = window.setInterval(() => {
			setTone((n) => (n + 1) % TONE_CLASS.length);
		}, TONE_MS);
		return () => window.clearInterval(timer);
	}, []);
	const onPointerMove = (e) => {
		const el = theaterRef.current;
		if (!el) return;
		const r = el.getBoundingClientRect();
		el.style.setProperty("--px", `${(e.clientX - r.left) / r.width * 100}%`);
		el.style.setProperty("--py", `${(e.clientY - r.top) / r.height * 100}%`);
	};
	const current = clips[clip] || clips[0] || HERO_VIDEOS[0];
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", {
		id: "hero",
		"aria-label": "Hero",
		className: cn("hero-stage relative isolate pt-14 sm:pt-16", TONE_CLASS[tone]),
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "shell pt-2 pb-6 sm:pt-3 sm:pb-8",
			children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				ref: theaterRef,
				onPointerMove,
				className: "theater relative flex h-[min(58vh,30rem)] min-h-[22rem] w-full flex-col overflow-hidden rounded-xl bg-ink xl:h-[min(62vh,34rem)]",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "absolute inset-0 bg-cover bg-center transition-all duration-700",
						style: { backgroundImage: `url(${current.poster})` },
						"aria-hidden": "true"
					}, void 0, false, {
						fileName: _jsxFileName$16,
						lineNumber: 146,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("video", {
						ref: slotA,
						src: clips[0]?.src || HERO_VIDEOS[0].src,
						poster: clips[0]?.poster || HERO_VIDEOS[0].poster,
						className: cn("absolute inset-0 h-full w-full object-cover transition-opacity duration-700", visibleSlot === 0 && "hero-kenburns"),
						style: { opacity: visibleSlot === 0 ? 1 : 0 },
						muted: true,
						loop: true,
						playsInline: true,
						preload: "metadata"
					}, void 0, false, {
						fileName: _jsxFileName$16,
						lineNumber: 152,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("video", {
						ref: slotB,
						poster: clips[1]?.poster || HERO_VIDEOS[1].poster,
						className: cn("absolute inset-0 h-full w-full object-cover transition-opacity duration-700", visibleSlot === 1 && "hero-kenburns"),
						style: { opacity: visibleSlot === 1 ? 1 : 0 },
						muted: true,
						loop: true,
						playsInline: true,
						preload: "none"
					}, void 0, false, {
						fileName: _jsxFileName$16,
						lineNumber: 166,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/78 via-ink/10 to-ink/28" }, void 0, false, {
						fileName: _jsxFileName$16,
						lineNumber: 180,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "pointer-events-none absolute inset-0 bg-gradient-to-r from-ink/30 via-transparent to-transparent" }, void 0, false, {
						fileName: _jsxFileName$16,
						lineNumber: 181,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "theater-light pointer-events-none absolute inset-0" }, void 0, false, {
						fileName: _jsxFileName$16,
						lineNumber: 182,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "relative z-10 flex h-full flex-col p-5 sm:p-7 lg:p-8",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "order-2 mt-auto flex flex-col gap-6 lg:order-none lg:mt-0 lg:flex-row lg:items-end lg:justify-between lg:gap-12",
								children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "max-w-2xl xl:max-w-3xl",
									children: [
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(motion.p, {
											initial: {
												opacity: 0,
												y: 8
											},
											animate: {
												opacity: 1,
												y: 0
											},
											transition: {
												duration: .5,
												ease: [
													.22,
													1,
													.36,
													1
												]
											},
											className: "mb-3 flex items-center gap-2 text-[11px] font-medium tracking-[0.22em] text-paper/70 uppercase",
											children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
												className: "live-dot",
												"aria-hidden": "true"
											}, void 0, false, {
												fileName: _jsxFileName$16,
												lineNumber: 193,
												columnNumber: 19
											}, this), config.hero?.badge || "Codex Dynamics"]
										}, void 0, true, {
											fileName: _jsxFileName$16,
											lineNumber: 187,
											columnNumber: 17
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(motion.h1, {
											initial: {
												opacity: 0,
												y: 12
											},
											animate: {
												opacity: 1,
												y: 0
											},
											transition: {
												duration: .55,
												delay: .08,
												ease: [
													.22,
													1,
													.36,
													1
												]
											},
											className: "text-[2rem] leading-[1.05] font-semibold tracking-tight text-paper sm:text-[2.75rem] lg:text-[3.25rem] xl:text-[3.75rem]",
											children: config.hero?.title || "Precision on every screen."
										}, void 0, false, {
											fileName: _jsxFileName$16,
											lineNumber: 196,
											columnNumber: 17
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(motion.p, {
											initial: {
												opacity: 0,
												y: 10
											},
											animate: {
												opacity: 1,
												y: 0
											},
											transition: {
												duration: .55,
												delay: .18,
												ease: [
													.22,
													1,
													.36,
													1
												]
											},
											className: "mt-3 max-w-md text-[15px] leading-relaxed text-paper/80 sm:text-base xl:max-w-lg",
											children: config.hero?.subtitle || "Websites, web apps, and social campaigns — composed with the care of a product launch."
										}, void 0, false, {
											fileName: _jsxFileName$16,
											lineNumber: 208,
											columnNumber: 17
										}, this)
									]
								}, void 0, true, {
									fileName: _jsxFileName$16,
									lineNumber: 186,
									columnNumber: 15
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName$16,
								lineNumber: 185,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "order-1 mb-3 lg:order-2 lg:mt-auto",
								children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(AnimatePresence, {
									mode: "wait",
									children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(motion.div, {
										initial: {
											opacity: 0,
											y: 8
										},
										animate: {
											opacity: 1,
											y: 0
										},
										exit: {
											opacity: 0,
											y: -6
										},
										transition: {
											duration: .28,
											ease: [
												.22,
												1,
												.36,
												1
											]
										},
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
											className: "text-[11px] font-medium tracking-[0.22em] text-paper/70 uppercase",
											children: current.label
										}, void 0, false, {
											fileName: _jsxFileName$16,
											lineNumber: 232,
											columnNumber: 19
										}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
											className: "mt-1 text-sm text-paper/90 sm:text-[15px]",
											children: current.line
										}, void 0, false, {
											fileName: _jsxFileName$16,
											lineNumber: 235,
											columnNumber: 19
										}, this)]
									}, current.label, true, {
										fileName: _jsxFileName$16,
										lineNumber: 225,
										columnNumber: 17
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName$16,
									lineNumber: 224,
									columnNumber: 15
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName$16,
								lineNumber: 223,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "order-3 flex gap-1.5",
								children: clips.map((video, i) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
									type: "button",
									onClick: () => showClip(i),
									className: cn("group/chip relative min-h-10 flex-1 overflow-hidden rounded-full px-1.5 text-left transition-colors duration-200 sm:px-2", i === clip ? "bg-paper/18" : "bg-paper/8 hover:bg-paper/14"),
									"aria-label": `Play ${video.label}`,
									"aria-current": i === clip,
									children: [i === clip ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "hero-progress absolute inset-y-0 left-0 rounded-full bg-paper/25" }, clip, false, {
										fileName: _jsxFileName$16,
										lineNumber: 258,
										columnNumber: 23
									}, this) : null, /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
										className: cn("relative z-10 block truncate px-1 py-2 text-center text-[10px] font-medium tracking-wide sm:px-2 sm:text-left sm:text-[11px]", i === clip ? "text-paper" : "text-paper/55"),
										children: video.label
									}, void 0, false, {
										fileName: _jsxFileName$16,
										lineNumber: 263,
										columnNumber: 21
									}, this)]
								}, video.label, true, {
									fileName: _jsxFileName$16,
									lineNumber: 244,
									columnNumber: 19
								}, this))
							}, void 0, false, {
								fileName: _jsxFileName$16,
								lineNumber: 242,
								columnNumber: 13
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName$16,
						lineNumber: 184,
						columnNumber: 11
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName$16,
				lineNumber: 140,
				columnNumber: 9
			}, this)
		}, void 0, false, {
			fileName: _jsxFileName$16,
			lineNumber: 139,
			columnNumber: 7
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName$16,
		lineNumber: 134,
		columnNumber: 5
	}, this);
}
/**
* Custom hook providing an IntersectionObserver instance to track element visibility.
* Perfect for scroll-triggered entrance animations, analytics, and lazy execution.
*/
function useIntersectionObserver(options = {}) {
	const { threshold = .15, rootMargin = "0px 0px -50px 0px", triggerOnce = true, enabled = true } = options;
	const ref = (0, import_react.useRef)(null);
	const [isIntersecting, setIsIntersecting] = (0, import_react.useState)(false);
	const [entry, setEntry] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		const element = ref.current;
		if (!enabled || !element) return;
		if (typeof window !== "undefined" && window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
			setIsIntersecting(true);
			return;
		}
		if (typeof IntersectionObserver === "undefined") {
			setIsIntersecting(true);
			return;
		}
		const observer = new IntersectionObserver(([observerEntry]) => {
			setEntry(observerEntry);
			if (observerEntry.isIntersecting) {
				setIsIntersecting(true);
				if (triggerOnce) {
					observer.unobserve(element);
					observer.disconnect();
				}
			} else if (!triggerOnce) setIsIntersecting(false);
		}, {
			threshold,
			rootMargin
		});
		observer.observe(element);
		return () => {
			observer.disconnect();
		};
	}, [
		threshold,
		rootMargin,
		triggerOnce,
		enabled
	]);
	return [
		ref,
		isIntersecting,
		entry
	];
}
var _jsxFileName$15 = "/app/applet/src/components/Reveal.tsx";
function Reveal({ children, className, delay = 0, duration = 650, direction = "up", threshold = .12, rootMargin = "0px 0px -40px 0px", once = true, as, ...props }) {
	const Component = as || "div";
	const [ref, isIntersecting] = useIntersectionObserver({
		threshold,
		rootMargin,
		triggerOnce: once
	});
	const getDirectionClass = () => {
		switch (direction) {
			case "fade": return "reveal-fade";
			case "scale": return "reveal-scale";
			case "left": return "reveal-left";
			case "right": return "reveal-right";
			case "down": return "reveal-down";
			case "none": return "";
			default: return "reveal";
		}
	};
	const directionClass = getDirectionClass();
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Component, {
		ref,
		className: cn(directionClass, isIntersecting && "reveal-in", className),
		style: {
			transitionDelay: `${delay}ms`,
			transitionDuration: `${duration}ms`
		},
		...props,
		children
	}, void 0, false, {
		fileName: _jsxFileName$15,
		lineNumber: 62,
		columnNumber: 5
	}, this);
}
var _jsxFileName$14 = "/app/applet/src/components/Highlights.tsx";
var items = [
	{
		href: "#services",
		kicker: "Services",
		title: "Everything built for you.",
		copy: "Web development, web apps, graphic design, CRMs & calling systems, email marketing, and Meta & Google ad campaigns."
	},
	{
		href: "#work",
		kicker: "Projects",
		title: "Proven client work.",
		copy: "Explore storefronts, custom web applications, sales calling desks, and paid ad funnels engineered for measurable ROI."
	},
	{
		href: "#process",
		kicker: "Process",
		title: "Done-for-you delivery.",
		copy: "From discovery and Figma UI design to clean code, CRM telephony integrations, and turnkey campaign launch."
	}
];
function Highlights() {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", {
		"aria-label": "Highlights",
		className: "relative z-20 bg-background pt-7 pb-3 sm:pt-9",
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "shell grid gap-3 md:grid-cols-3",
			children: items.map((item, i) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Reveal, {
				delay: i * 80,
				children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", {
					href: item.href,
					className: "surface-lift shine group flex h-full flex-col rounded-xl bg-card p-6 sm:p-7",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "mb-5 flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "text-[11px] font-medium tracking-[0.2em] text-subtle uppercase",
								children: item.kicker
							}, void 0, false, {
								fileName: _jsxFileName$14,
								lineNumber: 39,
								columnNumber: 17
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ArrowUpRight, { className: "size-4 text-subtle transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" }, void 0, false, {
								fileName: _jsxFileName$14,
								lineNumber: 42,
								columnNumber: 17
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$14,
							lineNumber: 38,
							columnNumber: 15
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
							className: "text-2xl font-semibold tracking-tight text-label",
							children: item.title
						}, void 0, false, {
							fileName: _jsxFileName$14,
							lineNumber: 44,
							columnNumber: 15
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
							className: "mt-2 text-sm leading-relaxed text-muted-foreground",
							children: item.copy
						}, void 0, false, {
							fileName: _jsxFileName$14,
							lineNumber: 47,
							columnNumber: 15
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName$14,
					lineNumber: 34,
					columnNumber: 13
				}, this)
			}, item.href, false, {
				fileName: _jsxFileName$14,
				lineNumber: 33,
				columnNumber: 11
			}, this))
		}, void 0, false, {
			fileName: _jsxFileName$14,
			lineNumber: 31,
			columnNumber: 7
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName$14,
		lineNumber: 27,
		columnNumber: 5
	}, this);
}
var _jsxFileName$13 = "/app/applet/src/components/ImageWithFallback.tsx";
function ImageWithFallback({ src, alt, className, style, fallback = "/hero/web-apps.jpg" }) {
	const [imgSrc, setImgSrc] = (0, import_react.useState)(src);
	const [hasError, setHasError] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		setImgSrc(src);
		setHasError(false);
	}, [src]);
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("img", {
		src: imgSrc,
		alt,
		className,
		style,
		onError: () => {
			if (!hasError) {
				setHasError(true);
				setImgSrc(fallback);
			}
		},
		loading: "lazy",
		decoding: "async"
	}, void 0, false, {
		fileName: _jsxFileName$13,
		lineNumber: 27,
		columnNumber: 5
	}, this);
}
var RECENT_WEB_PROJECTS = [
	{
		id: "proj-apex-ecommerce",
		title: "ApexStore: High-Speed Web Application & Storefront",
		client: "Northline Global Commerce",
		tag: "Web Development · E-Commerce",
		category: "Websites & Web Apps",
		shortDescription: "A headless, sub-second e-commerce web application replacing a legacy monolith. Real-time global inventory sync, instantaneous search, and optimized one-click checkout.",
		detailedDescription: "Engineered from the ground up to eliminate checkout bottlenecks for an international retailer. We migrated their unoptimized legacy stack to an edge-rendered composable architecture with sub-50ms search response, distributed inventory synchronization, and zero-layout-shift micro-interactions.",
		challenge: "A sluggish legacy storefront with 6.2s Time-to-Interactive, frequent checkout cart timeouts, and a 42% mobile bounce rate during peak flash sales.",
		solution: "Built a high-performance React 19 storefront running on edge runtime with optimistic UI cart updates, automated webp/avif image transformations, and multi-region CDN caching.",
		impact: "+41% conversion rate increase in the first 30 days, 98/100 Google Lighthouse score, and 2.1s sub-second checkout completion.",
		techStack: [
			"React 19",
			"TypeScript",
			"Next.js",
			"Tailwind CSS",
			"Redis Edge",
			"Stripe API"
		],
		metrics: [
			{
				label: "Conversion Lift",
				value: "+41%",
				detail: "In first 30 days"
			},
			{
				label: "Lighthouse Score",
				value: "98/100",
				detail: "Mobile & Desktop"
			},
			{
				label: "TTI Load Time",
				value: "1.1s",
				detail: "Down from 6.2s"
			},
			{
				label: "Cart Dropoff",
				value: "-28%",
				detail: "Streamlined checkout"
			}
		],
		features: [
			"Sub-50ms instant search & filter",
			"Optimistic multi-currency cart & checkout",
			"Dynamic inventory reservation workers",
			"Zero layout shift (CLS < 0.01) responsive layout"
		],
		image: "/work/northline-logistics.jpg",
		video: "/work/storefront.mp4",
		site_url: "https://northline.example.com",
		featured: true,
		completionDate: "Q3 2026",
		lighthouse: {
			performance: 98,
			accessibility: 100,
			bestPractices: 100,
			seo: 100
		}
	},
	{
		id: "proj-omni-crm",
		title: "Apex Telephony Desk: High-Volume Outbound Dialer & CRM",
		client: "Apex Sales Group",
		tag: "Custom CRM · VoIP Telephony",
		category: "CRMs & Calling Systems",
		shortDescription: "Bespoke sales CRM platform featuring an integrated browser-based VoIP dialer, real-time call recording, lead pipeline stages, and instant WhatsApp dispatching.",
		detailedDescription: "Designed and coded specifically for a high-velocity sales team that outgrew off-the-shelf CRM limitations. Combines a visual drag-and-drop deal pipeline, one-click click-to-call browser softphone, encrypted call audio archiving, and automated lead alerts.",
		challenge: "Sales reps were juggling 3 separate apps, external softphone hardware, and spreadsheets, causing lost lead follow-ups and unmonitored call quality.",
		solution: "Built a unified, custom CRM web application with native browser VoIP telephony, automatic call recording, agent activity dashboards, and automated lead notifications.",
		impact: "Increased daily sales rep call capacity by 65%, eliminated $3,200/mo in SaaS licensing fees, and shortened average lead response time from 3 hours to 4 minutes.",
		techStack: [
			"React 19",
			"TypeScript",
			"Node.js",
			"WebRTC / Twilio Voice",
			"WebSockets",
			"SQLite"
		],
		metrics: [
			{
				label: "Call Output",
				value: "+65%",
				detail: "Reps make more calls"
			},
			{
				label: "Lead Response",
				value: "4 min",
				detail: "Down from 3 hours"
			},
			{
				label: "SaaS Savings",
				value: "$38k/yr",
				detail: "No per-seat fees"
			},
			{
				label: "Call Quality",
				value: "99.9%",
				detail: "High-fidelity VoIP"
			}
		],
		features: [
			"Browser click-to-call with zero hardware or extensions needed",
			"Automatic audio recording, playback & transcription notes",
			"Interactive visual Kanban sales pipeline with stage triggers",
			"Instant WhatsApp & Telegram lead routing notifications"
		],
		image: "/work/apex-sales.jpg",
		site_url: "https://omnicall.example.com",
		featured: true,
		completionDate: "Q2 2026",
		lighthouse: {
			performance: 99,
			accessibility: 98,
			bestPractices: 100,
			seo: 98
		}
	},
	{
		id: "proj-lumina-branding",
		title: "Lumina Design: Complete Graphic Design & Brand Identity",
		client: "Lumina Architecture & Interiors",
		tag: "Graphic Design · Brand Identity · Figma UI",
		category: "Graphic Design & Branding",
		shortDescription: "Comprehensive visual identity system, custom typography scales, vector logo suite, marketing collateral, and high-fidelity Figma UI/UX design systems.",
		detailedDescription: "Crafted an elevated, timeless visual identity for an architectural design firm. Developed complete brand guidelines, vector logo variations for dark and light modes, bespoke iconography sets, business stationery, and pixel-perfect UI design systems.",
		challenge: "The client had an outdated, pixelated logo and inconsistent social graphics that failed to reflect the multimillion-dollar caliber of their physical design projects.",
		solution: "Designed a cohesive aesthetic identity in Figma and Illustrator, complete with minimalist typography, luxury neutral color palettes, vector asset exports, and digital marketing templates.",
		impact: "Transformed brand perception, helped the firm secure 3 high-value commercial architectural bids, and streamlined marketing output with reusable templates.",
		techStack: [
			"Figma",
			"Adobe Illustrator",
			"Photoshop",
			"Vector Graphics",
			"Design Systems"
		],
		metrics: [
			{
				label: "Brand Value Lift",
				value: "High",
				detail: "Elevated market positioning"
			},
			{
				label: "Bid Win Rate",
				value: "+45%",
				detail: "Secured luxury contracts"
			},
			{
				label: "Asset Library",
				value: "120+",
				detail: "Vector SVGs & UI components"
			},
			{
				label: "Turnaround",
				value: "14 Days",
				detail: "From concept to final kit"
			}
		],
		features: [
			"Custom responsive vector logo suite in light and dark formats",
			"Complete typography rules & accessible color token swatches",
			"Figma UI design system with 80+ reusable component variants",
			"Print-ready stationary, pitch decks, and social media templates"
		],
		image: "/work/brand-identity.jpg",
		video: "/hero/design.mp4",
		site_url: "https://lumina-design.example.com",
		completionDate: "Q2 2026",
		lighthouse: {
			performance: 100,
			accessibility: 100,
			bestPractices: 100,
			seo: 100
		}
	},
	{
		id: "proj-kinetic-ads",
		title: "Kinetic Media: Meta & Google Ad Campaign Growth Engine",
		client: "Kinetic Fitness Tech",
		tag: "Paid Acquisition · Meta & Google Ads",
		category: "Meta & Google Ads",
		shortDescription: "Multi-channel paid acquisition engine generating 4.8x return on ad spend across Meta Ads (Instagram/Facebook) and high-intent Google Search campaigns.",
		detailedDescription: "Engineered a full-funnel advertising strategy combining thumb-stopping short-form video reels, high-converting carousel ads, Google Search intent keyword bidding, and server-side Meta Conversion API attribution.",
		challenge: "Client was bleeding ad budget on poorly targeted Facebook boosted posts with inconsistent tracking and no clear ROAS attribution.",
		solution: "Rebuilt the campaign structure from scratch with dedicated cold acquisition audiences, retargeting funnels, direct-response ad copy, and Google Ads search capture.",
		impact: "Achieved a 4.8x blended return on ad spend (ROAS), reduced cost-per-lead by 42%, and delivered 320+ qualified booked calls per month.",
		techStack: [
			"Meta Ads Manager",
			"Google Ads",
			"GA4",
			"Meta CAPI",
			"Figma",
			"CapCut"
		],
		metrics: [
			{
				label: "Blended ROAS",
				value: "4.8x",
				detail: "Meta & Google campaigns"
			},
			{
				label: "Cost-Per-Lead",
				value: "-42%",
				detail: "Down to $18.40/lead"
			},
			{
				label: "Monthly Leads",
				value: "320+",
				detail: "High-intent inquiries"
			},
			{
				label: "A/B Tests Run",
				value: "36",
				detail: "Creative and copy variants"
			}
		],
		features: [
			"Full-funnel Meta ad structure (TOF cold, MOF nurture, BOF retarget)",
			"High-intent Google Search campaigns capturing active buyer search",
			"Server-side Meta Conversion API (CAPI) for 100% accurate tracking",
			"Dynamic creative iterations and weekly performance optimization"
		],
		image: "/work/kinetic-fitness.jpg",
		video: "/hero/social.mp4",
		site_url: "https://kinetic-media.example.com",
		completionDate: "Q3 2026",
		lighthouse: {
			performance: 98,
			accessibility: 96,
			bestPractices: 100,
			seo: 100
		}
	},
	{
		id: "proj-flow-email",
		title: "FlowRetain: Automated Email Marketing & Drip Funnel",
		client: "Aura Premium Goods",
		tag: "Email Marketing · Drip Automations",
		category: "Email Marketing",
		shortDescription: "End-to-end automated email marketing system featuring custom branded HTML templates, inbox deliverability hardening (SPF/DKIM/DMARC), and high-converting nurture sequences.",
		detailedDescription: "Designed and deployed a high-converting automated email lifecycle strategy. Includes a 6-part welcome drip sequence, abandoned inquiry re-engagement flows, VIP customer rewards, and monthly promotional broadcasts.",
		challenge: "Client had thousands of uncontacted leads in their database and low 14% email open rates due to poor sender domain reputation and generic plain-text emails.",
		solution: "Hardened DNS records for 100% primary inbox deliverability, designed responsive custom email templates, and wrote persuasive direct-response email copy.",
		impact: "Elevated email open rates from 14% to 48.2%, reactivated $64,000 in dormant pipeline revenue, and established an automated 24/7 client nurture engine.",
		techStack: [
			"Klaviyo",
			"HTML Email",
			"DNS SPF/DKIM/DMARC",
			"Figma",
			"CRM Sync"
		],
		metrics: [
			{
				label: "Avg Open Rate",
				value: "48.2%",
				detail: "Above industry avg"
			},
			{
				label: "Reactivated Rev",
				value: "$64k",
				detail: "From dormant leads"
			},
			{
				label: "Click Rate",
				value: "8.6%",
				detail: "High-intent clicks"
			},
			{
				label: "Inbox Placement",
				value: "99.4%",
				detail: "Primary tab delivery"
			}
		],
		features: [
			"Automated multi-step welcome, nurturing, and booking sequences",
			"Custom responsive HTML email templates tested on all mobile clients",
			"Bulletproof SPF, DKIM, and DMARC sender reputation configuration",
			"Behavioral segmentation and automated lead re-activation triggers"
		],
		image: "/work/flow-retain-email.jpg",
		video: "/work/storefront.mp4",
		site_url: "https://flow-retain.example.com",
		completionDate: "Q3 2026",
		lighthouse: {
			performance: 100,
			accessibility: 100,
			bestPractices: 100,
			seo: 100
		}
	},
	{
		id: "proj-nexus-devportal",
		title: "Nexus Portal: Custom Web Application & Interactive Platform",
		client: "Nexus Systems Infrastructure",
		tag: "Web Application · Custom Portal",
		category: "Websites & Web Apps",
		shortDescription: "High-speed custom web application featuring live interactive tool sandboxes, instant full-text search, and automated API data synchronization.",
		detailedDescription: "Engineered for a technology company needing a fast customer portal. Combines an interactive request builder, dynamic copyable code snippets, responsive dashboards, and offline capabilities.",
		challenge: "The client's previous portal was fragmented, slow to navigate, and lacking interactive user features.",
		solution: "Constructed a lightweight, edge-cached web application with instantaneous search, interactive widgets, and seamless mobile responsiveness.",
		impact: "Reduced customer support tickets by 53% and accelerated onboarding time for new users from 4 days to 45 minutes.",
		techStack: [
			"React 19",
			"TypeScript",
			"Tailwind CSS",
			"Node.js",
			"Edge Cache"
		],
		metrics: [
			{
				label: "Support Tickets",
				value: "-53%",
				detail: "Self-serve resolution"
			},
			{
				label: "Onboarding Time",
				value: "45 min",
				detail: "Down from 4 days"
			},
			{
				label: "Search Latency",
				value: "<15ms",
				detail: "Instant UI search"
			},
			{
				label: "Lighthouse",
				value: "100/100",
				detail: "All categories"
			}
		],
		features: [
			"In-browser interactive workspace and tools",
			"Sub-15ms fuzzy search across thousands of records",
			"Granular team permissions and authentication",
			"Instant copyable snippets and exportable reports"
		],
		image: "/work/developer-portal.jpg",
		video: "/hero/web-dev.mp4",
		site_url: "https://nexus-docs.example.com",
		completionDate: "Q1 2026",
		lighthouse: {
			performance: 100,
			accessibility: 100,
			bestPractices: 100,
			seo: 100
		}
	}
];
var _jsxFileName$12 = "/app/applet/src/components/ProjectShowcaseGrid.tsx";
var DEFAULT_CATEGORIES = [
	"All",
	"Websites & Web Apps",
	"CRMs & Calling Systems",
	"Graphic Design & Branding",
	"Meta & Google Ads",
	"Email Marketing"
];
function ProjectShowcaseGrid() {
	const [projects] = (0, import_react.useState)(RECENT_WEB_PROJECTS);
	const [activeCategory, setActiveCategory] = (0, import_react.useState)("All");
	const [searchQuery, setSearchQuery] = (0, import_react.useState)("");
	const [selectedProject, setSelectedProject] = (0, import_react.useState)(null);
	const [layoutMode, setLayoutMode] = (0, import_react.useState)("bento");
	const { openContactModal } = useContactModal();
	const categories = (0, import_react.useMemo)(() => {
		const set = /* @__PURE__ */ new Set();
		set.add("All");
		for (const c of DEFAULT_CATEGORIES.slice(1)) set.add(c);
		for (const p of projects) if (p.category && p.category.trim() && p.category.trim() !== "All") set.add(p.category.trim());
		return Array.from(set);
	}, [projects]);
	const filteredProjects = (0, import_react.useMemo)(() => {
		return projects.filter((project) => {
			const pCat = (project.category || "").toLowerCase();
			const pTag = (project.tag || "").toLowerCase();
			const aCat = activeCategory.toLowerCase();
			const matchesCategory = activeCategory === "All" || pCat === aCat || pTag === aCat || pCat.includes(aCat) || aCat.includes(pCat) || pTag.includes(aCat);
			const query = searchQuery.trim().toLowerCase();
			if (!query) return matchesCategory;
			const matchesQuery = project.title.toLowerCase().includes(query) || project.client.toLowerCase().includes(query) || project.shortDescription.toLowerCase().includes(query) || pCat.includes(query) || pTag.includes(query) || project.techStack.some((tech) => tech.toLowerCase().includes(query));
			return matchesCategory && matchesQuery;
		});
	}, [
		projects,
		activeCategory,
		searchQuery
	]);
	const featured = filteredProjects[0];
	const gridItems = layoutMode === "bento" ? filteredProjects.slice(1) : filteredProjects;
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", {
		id: "work",
		"aria-label": "Project Showcase",
		className: "scroll-mt-24 bg-background py-16 sm:py-24",
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				id: "projects",
				className: "relative -top-24"
			}, void 0, false, {
				fileName: _jsxFileName$12,
				lineNumber: 97,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "shell",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Reveal, {
						direction: "up",
						threshold: .1,
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex flex-col gap-6 md:flex-row md:items-end md:justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "max-w-2xl",
								children: [
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "inline-flex items-center gap-2 rounded-full border border-hairline bg-muted/60 px-3 py-1 text-[11px] font-medium tracking-[0.2em] text-subtle uppercase",
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Sparkles, { className: "size-3 text-blue" }, void 0, false, {
											fileName: _jsxFileName$12,
											lineNumber: 104,
											columnNumber: 17
										}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Client Portfolio & Case Studies" }, void 0, false, {
											fileName: _jsxFileName$12,
											lineNumber: 105,
											columnNumber: 17
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName$12,
										lineNumber: 103,
										columnNumber: 15
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
										className: "mt-3 text-3xl font-semibold tracking-tight text-label sm:text-5xl",
										children: "Projects we have done for our clients."
									}, void 0, false, {
										fileName: _jsxFileName$12,
										lineNumber: 107,
										columnNumber: 15
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
										className: "mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg",
										children: "Explore our portfolio of delivered client work: custom websites and web applications, bespoke CRMs and calling systems, graphic design and brand systems, high-ROAS Meta & Google ad campaigns, and automated email marketing."
									}, void 0, false, {
										fileName: _jsxFileName$12,
										lineNumber: 110,
										columnNumber: 15
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName$12,
								lineNumber: 102,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex items-center gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "hidden sm:flex items-center gap-1 rounded-lg border border-hairline bg-card p-1 text-xs",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
										type: "button",
										onClick: () => setLayoutMode("bento"),
										className: cn("flex items-center gap-1.5 rounded-md px-2.5 py-1.5 font-medium transition-colors", layoutMode === "bento" ? "bg-foreground text-background shadow-xs" : "text-muted-foreground hover:text-foreground"),
										title: "Bento Highlight View",
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Layers, { className: "size-3.5" }, void 0, false, {
											fileName: _jsxFileName$12,
											lineNumber: 129,
											columnNumber: 19
										}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Bento" }, void 0, false, {
											fileName: _jsxFileName$12,
											lineNumber: 130,
											columnNumber: 19
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName$12,
										lineNumber: 118,
										columnNumber: 17
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
										type: "button",
										onClick: () => setLayoutMode("grid"),
										className: cn("flex items-center gap-1.5 rounded-md px-2.5 py-1.5 font-medium transition-colors", layoutMode === "grid" ? "bg-foreground text-background shadow-xs" : "text-muted-foreground hover:text-foreground"),
										title: "Equal Grid View",
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SlidersHorizontal, { className: "size-3.5" }, void 0, false, {
											fileName: _jsxFileName$12,
											lineNumber: 143,
											columnNumber: 19
										}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Grid" }, void 0, false, {
											fileName: _jsxFileName$12,
											lineNumber: 144,
											columnNumber: 19
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName$12,
										lineNumber: 132,
										columnNumber: 17
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$12,
									lineNumber: 117,
									columnNumber: 15
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "flex items-center gap-2 rounded-full border border-hairline bg-card px-3 py-1.5 text-xs font-mono text-muted-foreground",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "live-dot" }, void 0, false, {
										fileName: _jsxFileName$12,
										lineNumber: 149,
										columnNumber: 17
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: [filteredProjects.length, " Projects Live"] }, void 0, true, {
										fileName: _jsxFileName$12,
										lineNumber: 150,
										columnNumber: 17
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$12,
									lineNumber: 148,
									columnNumber: 15
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$12,
								lineNumber: 116,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$12,
							lineNumber: 101,
							columnNumber: 11
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName$12,
						lineNumber: 100,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Reveal, {
						direction: "up",
						delay: 80,
						threshold: .1,
						className: "mt-8",
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-y border-hairline py-4",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex flex-wrap items-center gap-1.5",
								children: categories.map((cat) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
									type: "button",
									onClick: () => setActiveCategory(cat),
									className: cn("rounded-full px-3.5 py-1.5 text-xs font-medium transition-all duration-200 cursor-pointer", activeCategory === cat ? "bg-foreground text-background shadow-xs scale-[1.02]" : "bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground"),
									children: cat
								}, cat, false, {
									fileName: _jsxFileName$12,
									lineNumber: 162,
									columnNumber: 17
								}, this))
							}, void 0, false, {
								fileName: _jsxFileName$12,
								lineNumber: 160,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "relative min-w-[220px] max-w-xs",
								children: [
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-subtle" }, void 0, false, {
										fileName: _jsxFileName$12,
										lineNumber: 180,
										columnNumber: 15
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
										type: "text",
										value: searchQuery,
										onChange: (e) => setSearchQuery(e.target.value),
										placeholder: "Filter by tech stack or keyword...",
										className: "w-full rounded-full border border-hairline bg-card pl-9 pr-8 py-1.5 text-xs text-foreground placeholder:text-subtle focus:border-blue focus:outline-hidden focus:ring-1 focus:ring-blue/30"
									}, void 0, false, {
										fileName: _jsxFileName$12,
										lineNumber: 181,
										columnNumber: 15
									}, this),
									searchQuery && /* @__PURE__ */ (void 0)("button", {
										type: "button",
										onClick: () => setSearchQuery(""),
										className: "absolute right-2.5 top-1/2 -translate-y-1/2 text-subtle hover:text-foreground",
										title: "Clear search",
										children: /* @__PURE__ */ (void 0)(X, { className: "size-3.5" }, void 0, false, {
											fileName: _jsxFileName$12,
											lineNumber: 195,
											columnNumber: 19
										}, this)
									}, void 0, false, {
										fileName: _jsxFileName$12,
										lineNumber: 189,
										columnNumber: 17
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName$12,
								lineNumber: 179,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$12,
							lineNumber: 158,
							columnNumber: 11
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName$12,
						lineNumber: 157,
						columnNumber: 9
					}, this),
					filteredProjects.length === 0 && /* @__PURE__ */ (void 0)("div", {
						className: "my-16 text-center py-12 rounded-2xl border border-dashed border-hairline bg-card/50",
						children: [
							/* @__PURE__ */ (void 0)(Layers, { className: "size-10 text-subtle mx-auto mb-3 opacity-60" }, void 0, false, {
								fileName: _jsxFileName$12,
								lineNumber: 205,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (void 0)("h3", {
								className: "text-lg font-medium text-label",
								children: "No projects found"
							}, void 0, false, {
								fileName: _jsxFileName$12,
								lineNumber: 206,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (void 0)("p", {
								className: "mt-1 text-xs text-muted-foreground",
								children: "Try adjusting your search query or filter category."
							}, void 0, false, {
								fileName: _jsxFileName$12,
								lineNumber: 207,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (void 0)("button", {
								type: "button",
								onClick: () => {
									setActiveCategory("All");
									setSearchQuery("");
								},
								className: "mt-4 rounded-full bg-foreground px-4 py-1.5 text-xs font-medium text-background hover:opacity-90",
								children: "Reset Filters"
							}, void 0, false, {
								fileName: _jsxFileName$12,
								lineNumber: 210,
								columnNumber: 13
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName$12,
						lineNumber: 204,
						columnNumber: 11
					}, this),
					layoutMode === "bento" && featured && /* @__PURE__ */ (void 0)(Reveal, {
						direction: "scale",
						delay: 120,
						threshold: .1,
						className: "mt-8",
						children: /* @__PURE__ */ (void 0)("article", {
							onClick: () => setSelectedProject(featured),
							className: "group relative cursor-pointer overflow-hidden rounded-2xl border border-hairline bg-card shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-blue/50 hover:shadow-xl",
							children: /* @__PURE__ */ (void 0)("div", {
								className: "grid lg:grid-cols-12 gap-0",
								children: [/* @__PURE__ */ (void 0)("div", {
									className: "relative aspect-[16/10] lg:aspect-auto lg:col-span-7 overflow-hidden bg-ink",
									children: [
										featured.video ? /* @__PURE__ */ (void 0)("video", {
											src: featured.video,
											poster: featured.image,
											className: "h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105",
											autoPlay: true,
											muted: true,
											loop: true,
											playsInline: true,
											preload: "metadata"
										}, void 0, false, {
											fileName: _jsxFileName$12,
											lineNumber: 234,
											columnNumber: 21
										}, this) : /* @__PURE__ */ (void 0)(ImageWithFallback, {
											src: featured.image,
											alt: featured.title,
											className: "h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
										}, void 0, false, {
											fileName: _jsxFileName$12,
											lineNumber: 245,
											columnNumber: 21
										}, this),
										/* @__PURE__ */ (void 0)("div", { className: "absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" }, void 0, false, {
											fileName: _jsxFileName$12,
											lineNumber: 253,
											columnNumber: 19
										}, this),
										/* @__PURE__ */ (void 0)("div", {
											className: "absolute top-4 left-4 right-4 flex items-center justify-between gap-2",
											children: [/* @__PURE__ */ (void 0)("span", {
												className: "inline-flex items-center gap-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/15 px-3 py-1 text-xs font-medium text-white shadow-xs",
												children: [/* @__PURE__ */ (void 0)("span", { className: "size-2 rounded-full bg-emerald-400 animate-pulse" }, void 0, false, {
													fileName: _jsxFileName$12,
													lineNumber: 258,
													columnNumber: 23
												}, this), /* @__PURE__ */ (void 0)("span", { children: featured.category }, void 0, false, {
													fileName: _jsxFileName$12,
													lineNumber: 259,
													columnNumber: 23
												}, this)]
											}, void 0, true, {
												fileName: _jsxFileName$12,
												lineNumber: 257,
												columnNumber: 21
											}, this), /* @__PURE__ */ (void 0)("div", {
												className: "flex items-center gap-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/15 px-3 py-1 text-xs font-mono font-medium text-white",
												children: [/* @__PURE__ */ (void 0)(Gauge, { className: "size-3.5 text-emerald-400" }, void 0, false, {
													fileName: _jsxFileName$12,
													lineNumber: 263,
													columnNumber: 23
												}, this), /* @__PURE__ */ (void 0)("span", { children: [featured.lighthouse.performance, " Lighthouse"] }, void 0, true, {
													fileName: _jsxFileName$12,
													lineNumber: 264,
													columnNumber: 23
												}, this)]
											}, void 0, true, {
												fileName: _jsxFileName$12,
												lineNumber: 262,
												columnNumber: 21
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName$12,
											lineNumber: 256,
											columnNumber: 19
										}, this),
										/* @__PURE__ */ (void 0)("div", {
											className: "absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300",
											children: /* @__PURE__ */ (void 0)("span", {
												className: "inline-flex items-center gap-1.5 rounded-full bg-white text-black font-semibold text-xs px-3.5 py-1.5 shadow-lg",
												children: [/* @__PURE__ */ (void 0)("span", { children: "Inspect Case Study" }, void 0, false, {
													fileName: _jsxFileName$12,
													lineNumber: 271,
													columnNumber: 23
												}, this), /* @__PURE__ */ (void 0)(ArrowUpRight, { className: "size-3.5" }, void 0, false, {
													fileName: _jsxFileName$12,
													lineNumber: 272,
													columnNumber: 23
												}, this)]
											}, void 0, true, {
												fileName: _jsxFileName$12,
												lineNumber: 270,
												columnNumber: 21
											}, this)
										}, void 0, false, {
											fileName: _jsxFileName$12,
											lineNumber: 269,
											columnNumber: 19
										}, this)
									]
								}, void 0, true, {
									fileName: _jsxFileName$12,
									lineNumber: 232,
									columnNumber: 17
								}, this), /* @__PURE__ */ (void 0)("div", {
									className: "flex flex-col justify-between p-7 sm:p-10 lg:col-span-5 bg-card",
									children: [/* @__PURE__ */ (void 0)("div", { children: [
										/* @__PURE__ */ (void 0)("div", {
											className: "flex items-center justify-between gap-3 text-xs text-subtle mb-3",
											children: [/* @__PURE__ */ (void 0)("span", {
												className: "font-mono uppercase tracking-wider",
												children: featured.client
											}, void 0, false, {
												fileName: _jsxFileName$12,
												lineNumber: 281,
												columnNumber: 23
											}, this), /* @__PURE__ */ (void 0)("span", { children: featured.completionDate }, void 0, false, {
												fileName: _jsxFileName$12,
												lineNumber: 282,
												columnNumber: 23
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName$12,
											lineNumber: 280,
											columnNumber: 21
										}, this),
										/* @__PURE__ */ (void 0)("h3", {
											className: "text-2xl sm:text-3xl font-semibold tracking-tight text-label group-hover:text-blue transition-colors",
											children: featured.title
										}, void 0, false, {
											fileName: _jsxFileName$12,
											lineNumber: 285,
											columnNumber: 21
										}, this),
										/* @__PURE__ */ (void 0)("p", {
											className: "mt-3 text-sm sm:text-base leading-relaxed text-muted-foreground",
											children: featured.shortDescription
										}, void 0, false, {
											fileName: _jsxFileName$12,
											lineNumber: 289,
											columnNumber: 21
										}, this),
										/* @__PURE__ */ (void 0)("div", {
											className: "mt-5 flex flex-wrap gap-1.5",
											children: featured.techStack.map((tech) => /* @__PURE__ */ (void 0)("span", {
												className: "rounded-md border border-hairline bg-muted/50 px-2.5 py-1 font-mono text-[11px] text-muted-foreground group-hover:border-blue/20 transition-colors",
												children: tech
											}, tech, false, {
												fileName: _jsxFileName$12,
												lineNumber: 296,
												columnNumber: 25
											}, this))
										}, void 0, false, {
											fileName: _jsxFileName$12,
											lineNumber: 294,
											columnNumber: 21
										}, this)
									] }, void 0, true, {
										fileName: _jsxFileName$12,
										lineNumber: 279,
										columnNumber: 19
									}, this), /* @__PURE__ */ (void 0)("div", {
										className: "mt-8 pt-6 border-t border-hairline",
										children: [/* @__PURE__ */ (void 0)("div", {
											className: "grid grid-cols-2 gap-4 sm:grid-cols-4",
											children: featured.metrics.map((m) => /* @__PURE__ */ (void 0)("div", { children: [
												/* @__PURE__ */ (void 0)("dt", {
													className: "text-[10px] font-medium tracking-wider text-subtle uppercase",
													children: m.label
												}, void 0, false, {
													fileName: _jsxFileName$12,
													lineNumber: 311,
													columnNumber: 27
												}, this),
												/* @__PURE__ */ (void 0)("dd", {
													className: "mt-0.5 text-base sm:text-lg font-semibold text-label",
													children: m.value
												}, void 0, false, {
													fileName: _jsxFileName$12,
													lineNumber: 314,
													columnNumber: 27
												}, this),
												m.detail && /* @__PURE__ */ (void 0)("p", {
													className: "text-[10px] text-subtle leading-tight mt-0.5",
													children: m.detail
												}, void 0, false, {
													fileName: _jsxFileName$12,
													lineNumber: 318,
													columnNumber: 29
												}, this)
											] }, m.label, true, {
												fileName: _jsxFileName$12,
												lineNumber: 310,
												columnNumber: 25
											}, this))
										}, void 0, false, {
											fileName: _jsxFileName$12,
											lineNumber: 308,
											columnNumber: 21
										}, this), /* @__PURE__ */ (void 0)("div", {
											className: "mt-6 flex items-center justify-between gap-3",
											children: [/* @__PURE__ */ (void 0)("button", {
												type: "button",
												onClick: (e) => {
													e.stopPropagation();
													setSelectedProject(featured);
												},
												className: "inline-flex items-center gap-1.5 text-xs font-semibold text-blue hover:text-blue-hover",
												children: [/* @__PURE__ */ (void 0)("span", { children: "Detailed Case Study" }, void 0, false, {
													fileName: _jsxFileName$12,
													lineNumber: 335,
													columnNumber: 25
												}, this), /* @__PURE__ */ (void 0)(ChevronRight, { className: "size-3.5" }, void 0, false, {
													fileName: _jsxFileName$12,
													lineNumber: 336,
													columnNumber: 25
												}, this)]
											}, void 0, true, {
												fileName: _jsxFileName$12,
												lineNumber: 327,
												columnNumber: 23
											}, this), featured.site_url && /* @__PURE__ */ (void 0)("a", {
												href: featured.site_url,
												target: "_blank",
												rel: "noopener noreferrer",
												onClick: (e) => e.stopPropagation(),
												className: "inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground",
												children: [/* @__PURE__ */ (void 0)("span", { children: "Live Site" }, void 0, false, {
													fileName: _jsxFileName$12,
													lineNumber: 347,
													columnNumber: 27
												}, this), /* @__PURE__ */ (void 0)(ExternalLink, { className: "size-3" }, void 0, false, {
													fileName: _jsxFileName$12,
													lineNumber: 348,
													columnNumber: 27
												}, this)]
											}, void 0, true, {
												fileName: _jsxFileName$12,
												lineNumber: 340,
												columnNumber: 25
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName$12,
											lineNumber: 326,
											columnNumber: 21
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName$12,
										lineNumber: 307,
										columnNumber: 19
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$12,
									lineNumber: 278,
									columnNumber: 17
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$12,
								lineNumber: 230,
								columnNumber: 15
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName$12,
							lineNumber: 226,
							columnNumber: 13
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName$12,
						lineNumber: 225,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: cn("mt-8 grid gap-6", layoutMode === "bento" ? "md:grid-cols-2 lg:grid-cols-2" : "md:grid-cols-2 lg:grid-cols-3"),
						children: gridItems.map((project, idx) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Reveal, {
							direction: "up",
							delay: idx * 75,
							threshold: .08,
							className: "h-full",
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("article", {
								onClick: () => setSelectedProject(project),
								className: "group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-hairline bg-card shadow-xs transition-all duration-300 hover:-translate-y-1.5 hover:border-blue/50 hover:shadow-xl cursor-pointer",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "relative aspect-[16/10] overflow-hidden bg-muted",
									children: [
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ImageWithFallback, {
											src: project.image,
											alt: project.title,
											className: "h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
										}, void 0, false, {
											fileName: _jsxFileName$12,
											lineNumber: 381,
											columnNumber: 21
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent pointer-events-none" }, void 0, false, {
											fileName: _jsxFileName$12,
											lineNumber: 388,
											columnNumber: 21
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
											className: "absolute top-3 left-3 right-3 flex items-center justify-between gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
												className: "rounded-full bg-black/60 backdrop-blur-md border border-white/15 px-2.5 py-0.5 text-[11px] font-medium text-white shadow-xs",
												children: project.category
											}, void 0, false, {
												fileName: _jsxFileName$12,
												lineNumber: 392,
												columnNumber: 23
											}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
												className: "flex items-center gap-1 rounded-full bg-black/60 backdrop-blur-md border border-white/15 px-2 py-0.5 text-[10px] font-mono text-emerald-300",
												children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Gauge, { className: "size-3" }, void 0, false, {
													fileName: _jsxFileName$12,
													lineNumber: 397,
													columnNumber: 25
												}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: project.lighthouse.performance }, void 0, false, {
													fileName: _jsxFileName$12,
													lineNumber: 398,
													columnNumber: 25
												}, this)]
											}, void 0, true, {
												fileName: _jsxFileName$12,
												lineNumber: 396,
												columnNumber: 23
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName$12,
											lineNumber: 391,
											columnNumber: 21
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
											className: "absolute bottom-3 right-3 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300",
											children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
												className: "inline-flex items-center gap-1 rounded-full bg-white text-black text-[11px] font-semibold px-3 py-1 shadow-md",
												children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "View Specs" }, void 0, false, {
													fileName: _jsxFileName$12,
													lineNumber: 405,
													columnNumber: 25
												}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ArrowUpRight, { className: "size-3" }, void 0, false, {
													fileName: _jsxFileName$12,
													lineNumber: 406,
													columnNumber: 25
												}, this)]
											}, void 0, true, {
												fileName: _jsxFileName$12,
												lineNumber: 404,
												columnNumber: 23
											}, this)
										}, void 0, false, {
											fileName: _jsxFileName$12,
											lineNumber: 403,
											columnNumber: 21
										}, this)
									]
								}, void 0, true, {
									fileName: _jsxFileName$12,
									lineNumber: 380,
									columnNumber: 19
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "p-6",
									children: [
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
											className: "flex items-center justify-between gap-2 text-xs text-subtle mb-2.5",
											children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
												className: "font-mono text-[11px] tracking-wider uppercase",
												children: project.client
											}, void 0, false, {
												fileName: _jsxFileName$12,
												lineNumber: 414,
												columnNumber: 23
											}, this), project.completionDate && /* @__PURE__ */ (void 0)("span", {
												className: "text-[11px]",
												children: project.completionDate
											}, void 0, false, {
												fileName: _jsxFileName$12,
												lineNumber: 418,
												columnNumber: 25
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName$12,
											lineNumber: 413,
											columnNumber: 21
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
											className: "text-xl font-semibold tracking-tight text-label group-hover:text-blue transition-colors",
											children: project.title
										}, void 0, false, {
											fileName: _jsxFileName$12,
											lineNumber: 422,
											columnNumber: 21
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
											className: "mt-2.5 text-xs sm:text-sm leading-relaxed text-muted-foreground line-clamp-3",
											children: project.shortDescription
										}, void 0, false, {
											fileName: _jsxFileName$12,
											lineNumber: 426,
											columnNumber: 21
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
											className: "mt-4 flex flex-wrap gap-1.5",
											children: [project.techStack.slice(0, 4).map((tech) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
												className: "rounded-md border border-hairline bg-muted/40 px-2 py-0.5 font-mono text-[10px] text-muted-foreground group-hover:border-blue/20 transition-colors",
												children: tech
											}, tech, false, {
												fileName: _jsxFileName$12,
												lineNumber: 433,
												columnNumber: 25
											}, this)), project.techStack.length > 4 && /* @__PURE__ */ (void 0)("span", {
												className: "rounded-md border border-hairline bg-muted/40 px-1.5 py-0.5 font-mono text-[10px] text-subtle",
												children: ["+", project.techStack.length - 4]
											}, void 0, true, {
												fileName: _jsxFileName$12,
												lineNumber: 441,
												columnNumber: 25
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName$12,
											lineNumber: 431,
											columnNumber: 21
										}, this)
									]
								}, void 0, true, {
									fileName: _jsxFileName$12,
									lineNumber: 412,
									columnNumber: 19
								}, this)] }, void 0, true, {
									fileName: _jsxFileName$12,
									lineNumber: 378,
									columnNumber: 17
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "border-t border-hairline bg-muted/20 px-6 py-4",
									children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "flex items-center justify-between text-xs",
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
											className: "flex items-center gap-4",
											children: project.metrics.slice(0, 2).map((m) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
												className: "text-[10px] text-subtle block uppercase",
												children: m.label
											}, void 0, false, {
												fileName: _jsxFileName$12,
												lineNumber: 455,
												columnNumber: 27
											}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
												className: "font-semibold text-label",
												children: m.value
											}, void 0, false, {
												fileName: _jsxFileName$12,
												lineNumber: 456,
												columnNumber: 27
											}, this)] }, m.label, true, {
												fileName: _jsxFileName$12,
												lineNumber: 454,
												columnNumber: 25
											}, this))
										}, void 0, false, {
											fileName: _jsxFileName$12,
											lineNumber: 452,
											columnNumber: 21
										}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
											className: "flex items-center gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
												type: "button",
												onClick: (e) => {
													e.stopPropagation();
													setSelectedProject(project);
												},
												className: "font-medium text-blue hover:text-blue-hover text-xs flex items-center gap-1",
												children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Details" }, void 0, false, {
													fileName: _jsxFileName$12,
													lineNumber: 470,
													columnNumber: 25
												}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ChevronRight, { className: "size-3" }, void 0, false, {
													fileName: _jsxFileName$12,
													lineNumber: 471,
													columnNumber: 25
												}, this)]
											}, void 0, true, {
												fileName: _jsxFileName$12,
												lineNumber: 462,
												columnNumber: 23
											}, this), project.site_url && /* @__PURE__ */ (void 0)("a", {
												href: project.site_url,
												target: "_blank",
												rel: "noopener noreferrer",
												onClick: (e) => e.stopPropagation(),
												className: "text-subtle hover:text-label p-1 rounded-sm transition-colors",
												title: "Visit live site",
												children: /* @__PURE__ */ (void 0)(ExternalLink, { className: "size-3.5" }, void 0, false, {
													fileName: _jsxFileName$12,
													lineNumber: 483,
													columnNumber: 27
												}, this)
											}, void 0, false, {
												fileName: _jsxFileName$12,
												lineNumber: 475,
												columnNumber: 25
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName$12,
											lineNumber: 461,
											columnNumber: 21
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName$12,
										lineNumber: 451,
										columnNumber: 19
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName$12,
									lineNumber: 450,
									columnNumber: 17
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$12,
								lineNumber: 374,
								columnNumber: 15
							}, this)
						}, project.id, false, {
							fileName: _jsxFileName$12,
							lineNumber: 367,
							columnNumber: 13
						}, this))
					}, void 0, false, {
						fileName: _jsxFileName$12,
						lineNumber: 360,
						columnNumber: 9
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName$12,
				lineNumber: 98,
				columnNumber: 7
			}, this),
			selectedProject && /* @__PURE__ */ (void 0)("div", {
				role: "dialog",
				"aria-modal": "true",
				className: "fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/75 backdrop-blur-md animate-in fade-in duration-200",
				onClick: () => setSelectedProject(null),
				children: /* @__PURE__ */ (void 0)("div", {
					className: "relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl border border-hairline bg-card shadow-2xl p-6 sm:p-8 animate-in zoom-in-95 duration-200",
					onClick: (e) => e.stopPropagation(),
					children: [/* @__PURE__ */ (void 0)("div", {
						className: "flex items-start justify-between gap-4 border-b border-hairline pb-5",
						children: [/* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("div", {
							className: "flex flex-wrap items-center gap-2 mb-2",
							children: [/* @__PURE__ */ (void 0)("span", {
								className: "rounded-full bg-blue/10 px-2.5 py-0.5 text-xs font-semibold text-blue",
								children: selectedProject.category
							}, void 0, false, {
								fileName: _jsxFileName$12,
								lineNumber: 511,
								columnNumber: 19
							}, this), /* @__PURE__ */ (void 0)("span", {
								className: "text-xs font-mono text-subtle",
								children: [
									selectedProject.client,
									" · ",
									selectedProject.completionDate
								]
							}, void 0, true, {
								fileName: _jsxFileName$12,
								lineNumber: 514,
								columnNumber: 19
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$12,
							lineNumber: 510,
							columnNumber: 17
						}, this), /* @__PURE__ */ (void 0)("h3", {
							className: "text-2xl sm:text-3xl font-semibold tracking-tight text-label",
							children: selectedProject.title
						}, void 0, false, {
							fileName: _jsxFileName$12,
							lineNumber: 518,
							columnNumber: 17
						}, this)] }, void 0, true, {
							fileName: _jsxFileName$12,
							lineNumber: 509,
							columnNumber: 15
						}, this), /* @__PURE__ */ (void 0)("button", {
							type: "button",
							onClick: () => setSelectedProject(null),
							className: "rounded-full border border-hairline p-2 text-subtle hover:bg-muted hover:text-label transition-colors",
							title: "Close modal",
							children: /* @__PURE__ */ (void 0)(X, { className: "size-4" }, void 0, false, {
								fileName: _jsxFileName$12,
								lineNumber: 529,
								columnNumber: 17
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName$12,
							lineNumber: 523,
							columnNumber: 15
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$12,
						lineNumber: 508,
						columnNumber: 13
					}, this), /* @__PURE__ */ (void 0)("div", {
						className: "mt-6 space-y-6",
						children: [
							/* @__PURE__ */ (void 0)("div", {
								className: "relative aspect-[16/9] overflow-hidden rounded-xl bg-ink border border-hairline",
								children: /* @__PURE__ */ (void 0)(ImageWithFallback, {
									src: selectedProject.image,
									alt: selectedProject.title,
									className: "h-full w-full object-cover"
								}, void 0, false, {
									fileName: _jsxFileName$12,
									lineNumber: 537,
									columnNumber: 17
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName$12,
								lineNumber: 536,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (void 0)("div", {
								className: "rounded-xl border border-hairline bg-muted/30 p-4",
								children: [/* @__PURE__ */ (void 0)("div", {
									className: "flex items-center justify-between mb-3",
									children: [/* @__PURE__ */ (void 0)("span", {
										className: "text-xs font-semibold uppercase tracking-wider text-label flex items-center gap-1.5",
										children: [/* @__PURE__ */ (void 0)(Gauge, { className: "size-4 text-emerald-500" }, void 0, false, {
											fileName: _jsxFileName$12,
											lineNumber: 548,
											columnNumber: 21
										}, this), /* @__PURE__ */ (void 0)("span", { children: "Lighthouse Core Web Vitals Benchmark" }, void 0, false, {
											fileName: _jsxFileName$12,
											lineNumber: 549,
											columnNumber: 21
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName$12,
										lineNumber: 547,
										columnNumber: 19
									}, this), /* @__PURE__ */ (void 0)("span", {
										className: "text-[11px] font-mono text-subtle",
										children: "Audit Passed"
									}, void 0, false, {
										fileName: _jsxFileName$12,
										lineNumber: 551,
										columnNumber: 19
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$12,
									lineNumber: 546,
									columnNumber: 17
								}, this), /* @__PURE__ */ (void 0)("div", {
									className: "grid grid-cols-2 sm:grid-cols-4 gap-3 text-center",
									children: [
										/* @__PURE__ */ (void 0)("div", {
											className: "rounded-lg bg-card p-3 border border-hairline",
											children: [/* @__PURE__ */ (void 0)("div", {
												className: "text-2xl font-bold text-emerald-500 font-mono",
												children: selectedProject.lighthouse.performance
											}, void 0, false, {
												fileName: _jsxFileName$12,
												lineNumber: 555,
												columnNumber: 21
											}, this), /* @__PURE__ */ (void 0)("div", {
												className: "text-[11px] text-subtle mt-0.5",
												children: "Performance"
											}, void 0, false, {
												fileName: _jsxFileName$12,
												lineNumber: 558,
												columnNumber: 21
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName$12,
											lineNumber: 554,
											columnNumber: 19
										}, this),
										/* @__PURE__ */ (void 0)("div", {
											className: "rounded-lg bg-card p-3 border border-hairline",
											children: [/* @__PURE__ */ (void 0)("div", {
												className: "text-2xl font-bold text-emerald-500 font-mono",
												children: selectedProject.lighthouse.accessibility
											}, void 0, false, {
												fileName: _jsxFileName$12,
												lineNumber: 561,
												columnNumber: 21
											}, this), /* @__PURE__ */ (void 0)("div", {
												className: "text-[11px] text-subtle mt-0.5",
												children: "Accessibility"
											}, void 0, false, {
												fileName: _jsxFileName$12,
												lineNumber: 564,
												columnNumber: 21
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName$12,
											lineNumber: 560,
											columnNumber: 19
										}, this),
										/* @__PURE__ */ (void 0)("div", {
											className: "rounded-lg bg-card p-3 border border-hairline",
											children: [/* @__PURE__ */ (void 0)("div", {
												className: "text-2xl font-bold text-emerald-500 font-mono",
												children: selectedProject.lighthouse.bestPractices
											}, void 0, false, {
												fileName: _jsxFileName$12,
												lineNumber: 567,
												columnNumber: 21
											}, this), /* @__PURE__ */ (void 0)("div", {
												className: "text-[11px] text-subtle mt-0.5",
												children: "Best Practices"
											}, void 0, false, {
												fileName: _jsxFileName$12,
												lineNumber: 570,
												columnNumber: 21
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName$12,
											lineNumber: 566,
											columnNumber: 19
										}, this),
										/* @__PURE__ */ (void 0)("div", {
											className: "rounded-lg bg-card p-3 border border-hairline",
											children: [/* @__PURE__ */ (void 0)("div", {
												className: "text-2xl font-bold text-emerald-500 font-mono",
												children: selectedProject.lighthouse.seo
											}, void 0, false, {
												fileName: _jsxFileName$12,
												lineNumber: 573,
												columnNumber: 21
											}, this), /* @__PURE__ */ (void 0)("div", {
												className: "text-[11px] text-subtle mt-0.5",
												children: "Rank Math SEO"
											}, void 0, false, {
												fileName: _jsxFileName$12,
												lineNumber: 576,
												columnNumber: 21
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName$12,
											lineNumber: 572,
											columnNumber: 19
										}, this)
									]
								}, void 0, true, {
									fileName: _jsxFileName$12,
									lineNumber: 553,
									columnNumber: 17
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$12,
								lineNumber: 545,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("h4", {
								className: "text-sm font-semibold uppercase tracking-wider text-label mb-2",
								children: "Project Overview & Scope"
							}, void 0, false, {
								fileName: _jsxFileName$12,
								lineNumber: 583,
								columnNumber: 17
							}, this), /* @__PURE__ */ (void 0)("p", {
								className: "text-sm sm:text-base leading-relaxed text-muted-foreground",
								children: selectedProject.detailedDescription
							}, void 0, false, {
								fileName: _jsxFileName$12,
								lineNumber: 586,
								columnNumber: 17
							}, this)] }, void 0, true, {
								fileName: _jsxFileName$12,
								lineNumber: 582,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (void 0)("div", {
								className: "grid gap-4 sm:grid-cols-2",
								children: [/* @__PURE__ */ (void 0)("div", {
									className: "rounded-xl border border-hairline bg-card p-4",
									children: [/* @__PURE__ */ (void 0)("h5", {
										className: "text-xs font-semibold text-rose-500 dark:text-rose-400 uppercase tracking-wider mb-1.5 flex items-center gap-1.5",
										children: /* @__PURE__ */ (void 0)("span", { children: "The Challenge" }, void 0, false, {
											fileName: _jsxFileName$12,
											lineNumber: 595,
											columnNumber: 21
										}, this)
									}, void 0, false, {
										fileName: _jsxFileName$12,
										lineNumber: 594,
										columnNumber: 19
									}, this), /* @__PURE__ */ (void 0)("p", {
										className: "text-xs sm:text-sm text-muted-foreground leading-relaxed",
										children: selectedProject.challenge
									}, void 0, false, {
										fileName: _jsxFileName$12,
										lineNumber: 597,
										columnNumber: 19
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$12,
									lineNumber: 593,
									columnNumber: 17
								}, this), /* @__PURE__ */ (void 0)("div", {
									className: "rounded-xl border border-hairline bg-card p-4",
									children: [/* @__PURE__ */ (void 0)("h5", {
										className: "text-xs font-semibold text-emerald-500 uppercase tracking-wider mb-1.5 flex items-center gap-1.5",
										children: /* @__PURE__ */ (void 0)("span", { children: "Our Solution" }, void 0, false, {
											fileName: _jsxFileName$12,
											lineNumber: 603,
											columnNumber: 21
										}, this)
									}, void 0, false, {
										fileName: _jsxFileName$12,
										lineNumber: 602,
										columnNumber: 19
									}, this), /* @__PURE__ */ (void 0)("p", {
										className: "text-xs sm:text-sm text-muted-foreground leading-relaxed",
										children: selectedProject.solution
									}, void 0, false, {
										fileName: _jsxFileName$12,
										lineNumber: 605,
										columnNumber: 19
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$12,
									lineNumber: 601,
									columnNumber: 17
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$12,
								lineNumber: 592,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (void 0)("div", {
								className: "rounded-xl border border-hairline bg-muted/20 p-4",
								children: [
									/* @__PURE__ */ (void 0)("h4", {
										className: "text-xs font-semibold uppercase tracking-wider text-label mb-3",
										children: "Measurable Commercial Impact"
									}, void 0, false, {
										fileName: _jsxFileName$12,
										lineNumber: 613,
										columnNumber: 17
									}, this),
									/* @__PURE__ */ (void 0)("p", {
										className: "text-sm font-medium text-foreground mb-4",
										children: selectedProject.impact
									}, void 0, false, {
										fileName: _jsxFileName$12,
										lineNumber: 616,
										columnNumber: 17
									}, this),
									/* @__PURE__ */ (void 0)("div", {
										className: "grid grid-cols-2 sm:grid-cols-4 gap-3",
										children: selectedProject.metrics.map((m) => /* @__PURE__ */ (void 0)("div", {
											className: "border-l-2 border-blue pl-3",
											children: [
												/* @__PURE__ */ (void 0)("div", {
													className: "text-[11px] text-subtle uppercase",
													children: m.label
												}, void 0, false, {
													fileName: _jsxFileName$12,
													lineNumber: 622,
													columnNumber: 23
												}, this),
												/* @__PURE__ */ (void 0)("div", {
													className: "text-lg font-bold text-label",
													children: m.value
												}, void 0, false, {
													fileName: _jsxFileName$12,
													lineNumber: 623,
													columnNumber: 23
												}, this),
												m.detail && /* @__PURE__ */ (void 0)("div", {
													className: "text-[10px] text-subtle",
													children: m.detail
												}, void 0, false, {
													fileName: _jsxFileName$12,
													lineNumber: 624,
													columnNumber: 36
												}, this)
											]
										}, m.label, true, {
											fileName: _jsxFileName$12,
											lineNumber: 621,
											columnNumber: 21
										}, this))
									}, void 0, false, {
										fileName: _jsxFileName$12,
										lineNumber: 619,
										columnNumber: 17
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName$12,
								lineNumber: 612,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("h4", {
								className: "text-xs font-semibold uppercase tracking-wider text-label mb-2.5",
								children: "Key Technical Features & Deliverables"
							}, void 0, false, {
								fileName: _jsxFileName$12,
								lineNumber: 632,
								columnNumber: 17
							}, this), /* @__PURE__ */ (void 0)("ul", {
								className: "grid gap-2 sm:grid-cols-2",
								children: selectedProject.features.map((feat, idx) => /* @__PURE__ */ (void 0)("li", {
									className: "flex items-start gap-2 text-xs sm:text-sm text-muted-foreground",
									children: [/* @__PURE__ */ (void 0)(CircleCheck, { className: "size-4 text-emerald-500 shrink-0 mt-0.5" }, void 0, false, {
										fileName: _jsxFileName$12,
										lineNumber: 638,
										columnNumber: 23
									}, this), /* @__PURE__ */ (void 0)("span", { children: feat }, void 0, false, {
										fileName: _jsxFileName$12,
										lineNumber: 639,
										columnNumber: 23
									}, this)]
								}, idx, true, {
									fileName: _jsxFileName$12,
									lineNumber: 637,
									columnNumber: 21
								}, this))
							}, void 0, false, {
								fileName: _jsxFileName$12,
								lineNumber: 635,
								columnNumber: 17
							}, this)] }, void 0, true, {
								fileName: _jsxFileName$12,
								lineNumber: 631,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("h4", {
								className: "text-xs font-semibold uppercase tracking-wider text-label mb-2 flex items-center gap-1.5",
								children: [/* @__PURE__ */ (void 0)(CodeXml, { className: "size-3.5 text-blue" }, void 0, false, {
									fileName: _jsxFileName$12,
									lineNumber: 648,
									columnNumber: 19
								}, this), /* @__PURE__ */ (void 0)("span", { children: "Production Tech Stack" }, void 0, false, {
									fileName: _jsxFileName$12,
									lineNumber: 649,
									columnNumber: 19
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$12,
								lineNumber: 647,
								columnNumber: 17
							}, this), /* @__PURE__ */ (void 0)("div", {
								className: "flex flex-wrap gap-2",
								children: selectedProject.techStack.map((tech) => /* @__PURE__ */ (void 0)("span", {
									className: "rounded-lg border border-hairline bg-muted/50 px-3 py-1 font-mono text-xs text-foreground",
									children: tech
								}, tech, false, {
									fileName: _jsxFileName$12,
									lineNumber: 653,
									columnNumber: 21
								}, this))
							}, void 0, false, {
								fileName: _jsxFileName$12,
								lineNumber: 651,
								columnNumber: 17
							}, this)] }, void 0, true, {
								fileName: _jsxFileName$12,
								lineNumber: 646,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (void 0)("div", {
								className: "mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-hairline",
								children: [/* @__PURE__ */ (void 0)("div", {
									className: "text-xs text-subtle",
									children: "Interested in an architecture like this for your brand?"
								}, void 0, false, {
									fileName: _jsxFileName$12,
									lineNumber: 665,
									columnNumber: 17
								}, this), /* @__PURE__ */ (void 0)("div", {
									className: "flex items-center gap-3 w-full sm:w-auto",
									children: [selectedProject.site_url && /* @__PURE__ */ (void 0)("a", {
										href: selectedProject.site_url,
										target: "_blank",
										rel: "noopener noreferrer",
										className: "flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 rounded-full border border-hairline bg-card px-4 py-2 text-xs font-semibold text-foreground hover:bg-muted transition-colors",
										children: [
											/* @__PURE__ */ (void 0)(Laptop, { className: "size-3.5" }, void 0, false, {
												fileName: _jsxFileName$12,
												lineNumber: 677,
												columnNumber: 23
											}, this),
											/* @__PURE__ */ (void 0)("span", { children: "Visit Live Demo" }, void 0, false, {
												fileName: _jsxFileName$12,
												lineNumber: 678,
												columnNumber: 23
											}, this),
											/* @__PURE__ */ (void 0)(ExternalLink, { className: "size-3" }, void 0, false, {
												fileName: _jsxFileName$12,
												lineNumber: 679,
												columnNumber: 23
											}, this)
										]
									}, void 0, true, {
										fileName: _jsxFileName$12,
										lineNumber: 671,
										columnNumber: 21
									}, this), /* @__PURE__ */ (void 0)("button", {
										type: "button",
										onClick: () => {
											setSelectedProject(null);
											openContactModal(`Inquiry about ${selectedProject.title}`);
										},
										className: "flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 rounded-full bg-foreground px-5 py-2 text-xs font-semibold text-background hover:opacity-90 transition-opacity",
										children: [/* @__PURE__ */ (void 0)("span", { children: "Start a Project" }, void 0, false, {
											fileName: _jsxFileName$12,
											lineNumber: 690,
											columnNumber: 21
										}, this), /* @__PURE__ */ (void 0)(ArrowUpRight, { className: "size-3.5" }, void 0, false, {
											fileName: _jsxFileName$12,
											lineNumber: 691,
											columnNumber: 21
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName$12,
										lineNumber: 682,
										columnNumber: 19
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$12,
									lineNumber: 669,
									columnNumber: 17
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$12,
								lineNumber: 664,
								columnNumber: 15
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName$12,
						lineNumber: 534,
						columnNumber: 13
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$12,
					lineNumber: 503,
					columnNumber: 11
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName$12,
				lineNumber: 497,
				columnNumber: 9
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName$12,
		lineNumber: 92,
		columnNumber: 5
	}, this);
}
var _jsxFileName$11 = "/app/applet/src/components/Portfolio.tsx";
function Portfolio() {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ProjectShowcaseGrid, {}, void 0, false, {
		fileName: _jsxFileName$11,
		lineNumber: 6,
		columnNumber: 10
	}, this);
}
var _jsxFileName$10 = "/app/applet/src/components/Results.tsx";
var defaultStats = [
	{
		value: 140,
		suffix: "+",
		label: "Websites shipped"
	},
	{
		value: 4.8,
		suffix: "x",
		label: "Avg. social ROAS",
		decimals: 1
	},
	{
		value: 28,
		suffix: " days",
		label: "Typical build"
	},
	{
		value: 60,
		suffix: "+",
		label: "Brands in market"
	}
];
function useCountUp(target, start, decimals = 0) {
	const [n, setN] = (0, import_react.useState)(0);
	(0, import_react.useEffect)(() => {
		if (!start) return;
		const duration = 1400;
		const t0 = performance.now();
		let frame = 0;
		const tick = (now) => {
			const p = Math.min(1, (now - t0) / duration);
			const eased = 1 - Math.pow(1 - p, 3);
			setN(Number((target * eased).toFixed(decimals)));
			if (p < 1) frame = requestAnimationFrame(tick);
		};
		frame = requestAnimationFrame(tick);
		return () => cancelAnimationFrame(frame);
	}, [
		start,
		target,
		decimals
	]);
	return n;
}
function Stat({ value, suffix, label, decimals = 0, active }) {
	const n = useCountUp(value, active, decimals);
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "text-center sm:text-left",
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "text-4xl font-semibold tracking-tight text-paper tabular-nums sm:text-5xl",
			children: [decimals ? n.toFixed(decimals) : n, suffix]
		}, void 0, true, {
			fileName: _jsxFileName$10,
			lineNumber: 47,
			columnNumber: 7
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "mt-2 text-sm font-medium text-subtle",
			children: label
		}, void 0, false, {
			fileName: _jsxFileName$10,
			lineNumber: 51,
			columnNumber: 7
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName$10,
		lineNumber: 46,
		columnNumber: 5
	}, this);
}
function Results() {
	const { config } = useSiteConfig();
	const statList = config.results?.metrics?.length ? config.results.metrics : config.results?.stats?.length ? config.results.stats : defaultStats;
	const ref = (0, import_react.useRef)(null);
	const [active, setActive] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const el = ref.current;
		if (!el) return;
		const io = new IntersectionObserver(([entry]) => {
			if (entry.isIntersecting) setActive(true);
		}, { threshold: .35 });
		io.observe(el);
		return () => io.disconnect();
	}, []);
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", {
		ref,
		id: "results",
		"aria-label": "Results",
		className: "scroll-mt-24 bg-ink py-16 sm:py-24",
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "shell",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Reveal, { children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "mb-3 text-[11px] font-medium tracking-[0.22em] text-subtle uppercase",
					children: config.results?.badge || "Proof"
				}, void 0, false, {
					fileName: _jsxFileName$10,
					lineNumber: 88,
					columnNumber: 11
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
					className: "max-w-2xl text-3xl font-semibold tracking-tight text-paper sm:text-5xl",
					children: config.results?.title || "Measured the way a board measures it."
				}, void 0, false, {
					fileName: _jsxFileName$10,
					lineNumber: 91,
					columnNumber: 11
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "mt-4 max-w-xl text-base text-subtle sm:text-lg",
					children: config.results?.subtitle || "Speed, conversion, and paid social return — not a 40-page deck."
				}, void 0, false, {
					fileName: _jsxFileName$10,
					lineNumber: 94,
					columnNumber: 11
				}, this)
			] }, void 0, true, {
				fileName: _jsxFileName$10,
				lineNumber: 87,
				columnNumber: 9
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "mt-12 grid grid-cols-2 gap-10 lg:grid-cols-4",
				children: statList.map((s, idx) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Reveal, {
					delay: idx * 75,
					direction: "up",
					children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Stat, {
						...s,
						active
					}, void 0, false, {
						fileName: _jsxFileName$10,
						lineNumber: 101,
						columnNumber: 15
					}, this)
				}, s.label, false, {
					fileName: _jsxFileName$10,
					lineNumber: 100,
					columnNumber: 13
				}, this))
			}, void 0, false, {
				fileName: _jsxFileName$10,
				lineNumber: 98,
				columnNumber: 9
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName$10,
			lineNumber: 86,
			columnNumber: 7
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName$10,
		lineNumber: 80,
		columnNumber: 5
	}, this);
}
var _jsxFileName$9 = "/app/applet/src/components/Reviews.tsx";
var fallbackReviews = [
	{
		id: 1,
		author: "Elena Rostova, VP Product at Northline Commerce",
		rating: 5,
		comment: "Codex Dynamics built our entire custom web application and e-commerce platform in 4 weeks. Page load times dropped under 1 second and mobile conversions jumped 41%.",
		image_path: null,
		is_published: 1,
		created_at: "2026-02-14"
	},
	{
		id: 2,
		author: "David Sterling, Managing Director at Apex Sales Group",
		rating: 5,
		comment: "The custom CRM and browser calling system they engineered completely transformed our sales operations. Our reps make 65% more calls and inbound leads are routed in seconds.",
		image_path: null,
		is_published: 1,
		created_at: "2026-02-12"
	},
	{
		id: 3,
		author: "Julian Thorne, Founder at Lumina Labs",
		rating: 5,
		comment: "Flawless graphic design and brand identity work. They delivered our vector logo suite, typography hierarchy, and complete Figma UI kit. Our perceived market value skyrocketed.",
		image_path: null,
		is_published: 1,
		created_at: "2026-02-10"
	},
	{
		id: 4,
		author: "Marcus Vance, Head of Growth at Kinetic Media",
		rating: 5,
		comment: "Their Meta and Google ad campaigns produced a 4.8x return on ad spend within our first month. The video ad creatives and targeted funnel architecture are top-tier.",
		image_path: null,
		is_published: 1,
		created_at: "2026-01-28"
	},
	{
		id: 5,
		author: "Claire Chen, E-Commerce Director at Aura Goods",
		rating: 5,
		comment: "Their automated email marketing drip funnels and domain deliverability configuration unlocked $64,000 in recovered revenue. Open rates consistently exceed 48%.",
		image_path: null,
		is_published: 1,
		created_at: "2026-01-20"
	}
];
function Reviews() {
	const [reviews] = (0, import_react.useState)(fallbackReviews);
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", {
		id: "reviews",
		"aria-label": "Client Reviews",
		className: "scroll-mt-24 border-t border-border/40 bg-background py-16 sm:py-24",
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "shell",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Reveal, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "mb-3 text-[11px] font-medium tracking-[0.22em] text-subtle uppercase",
					children: "Endorsements"
				}, void 0, false, {
					fileName: _jsxFileName$9,
					lineNumber: 67,
					columnNumber: 15
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
					className: "max-w-2xl text-3xl font-semibold tracking-tight text-label sm:text-5xl",
					children: "What leaders say after we ship."
				}, void 0, false, {
					fileName: _jsxFileName$9,
					lineNumber: 70,
					columnNumber: 15
				}, this)] }, void 0, true, {
					fileName: _jsxFileName$9,
					lineNumber: 66,
					columnNumber: 13
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex items-center gap-2 rounded-full border border-border/60 bg-muted/30 px-3.5 py-1.5 text-xs text-muted-foreground backdrop-blur-sm self-start sm:self-auto",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CircleCheck, { className: "h-4 w-4 text-emerald-500" }, void 0, false, {
						fileName: _jsxFileName$9,
						lineNumber: 75,
						columnNumber: 15
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Verified Client Feedback" }, void 0, false, {
						fileName: _jsxFileName$9,
						lineNumber: 76,
						columnNumber: 15
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$9,
					lineNumber: 74,
					columnNumber: 13
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName$9,
				lineNumber: 65,
				columnNumber: 11
			}, this) }, void 0, false, {
				fileName: _jsxFileName$9,
				lineNumber: 64,
				columnNumber: 9
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3",
				children: reviews.map((rev, idx) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Reveal, {
					delay: idx * 80,
					children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "surface-lift relative flex h-full flex-col justify-between rounded-2xl border border-border/60 bg-card/80 p-7 backdrop-blur-sm transition-all hover:border-border",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex items-center justify-between mb-4",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex items-center gap-1 text-amber-500",
								children: Array.from({ length: 5 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Star, { className: `h-4 w-4 ${i < rev.rating ? "fill-amber-400 text-amber-400" : "text-muted-foreground/30"}` }, i, false, {
									fileName: _jsxFileName$9,
									lineNumber: 89,
									columnNumber: 25
								}, this))
							}, void 0, false, {
								fileName: _jsxFileName$9,
								lineNumber: 87,
								columnNumber: 21
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Quote, { className: "h-6 w-6 text-muted-foreground/20" }, void 0, false, {
								fileName: _jsxFileName$9,
								lineNumber: 99,
								columnNumber: 21
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$9,
							lineNumber: 86,
							columnNumber: 19
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
							className: "text-sm leading-relaxed text-muted-foreground",
							children: [
								"“",
								rev.comment,
								"”"
							]
						}, void 0, true, {
							fileName: _jsxFileName$9,
							lineNumber: 101,
							columnNumber: 19
						}, this)] }, void 0, true, {
							fileName: _jsxFileName$9,
							lineNumber: 85,
							columnNumber: 17
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "mt-6 pt-5 border-t border-border/40 flex items-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "h-9 w-9 rounded-full bg-gradient-to-br from-neutral-800 to-neutral-900 border border-neutral-700 flex items-center justify-center text-xs font-semibold text-paper",
								children: rev.author.charAt(0).toUpperCase()
							}, void 0, false, {
								fileName: _jsxFileName$9,
								lineNumber: 107,
								columnNumber: 19
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "min-w-0",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
									className: "text-sm font-semibold text-label truncate",
									children: rev.author
								}, void 0, false, {
									fileName: _jsxFileName$9,
									lineNumber: 111,
									columnNumber: 21
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
									className: "text-xs text-subtle truncate",
									children: "Verified Client"
								}, void 0, false, {
									fileName: _jsxFileName$9,
									lineNumber: 114,
									columnNumber: 21
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$9,
								lineNumber: 110,
								columnNumber: 19
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$9,
							lineNumber: 106,
							columnNumber: 17
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$9,
						lineNumber: 84,
						columnNumber: 15
					}, this)
				}, rev.id || idx, false, {
					fileName: _jsxFileName$9,
					lineNumber: 83,
					columnNumber: 13
				}, this))
			}, void 0, false, {
				fileName: _jsxFileName$9,
				lineNumber: 81,
				columnNumber: 9
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName$9,
			lineNumber: 63,
			columnNumber: 7
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName$9,
		lineNumber: 58,
		columnNumber: 5
	}, this);
}
var _jsxFileName$8 = "/app/applet/src/components/About.tsx";
var processSteps = [
	{
		number: "01",
		title: "Strategy & Discovery",
		description: "We consult directly with you to understand your commercial goals, audience, and offer. We map out the exact scope, timeline, and deliverables with no surprises."
	},
	{
		number: "02",
		title: "Bespoke UI/UX Design",
		description: "We design custom wireframes and clickable Figma prototypes. You review every mobile and desktop screen and iterate with us until you are completely thrilled."
	},
	{
		number: "03",
		title: "Custom Web Development",
		description: "Our developers hand-craft your platform using React, TypeScript, and Tailwind CSS. Clean, scalable architecture, sub-second speeds, and zero template bloat."
	},
	{
		number: "04",
		title: "Turnkey Launch & QA",
		description: "We test thoroughly across real smartphones, tablets, and browsers, configure your domain and SSL security, and connect your payment gateways and forms."
	},
	{
		number: "05",
		title: "Social Growth & Campaigns",
		description: "We launch your targeted Meta and Google ad campaigns, produce weekly creative assets, and optimize your funnels to drive continuous qualified leads."
	}
];
function About() {
	const { config } = useSiteConfig();
	const steps = config.about?.steps?.length ? config.about.steps : processSteps;
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", {
		id: "process",
		"aria-label": "Process",
		className: "scroll-mt-24 bg-background py-16 sm:py-24",
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			id: "about",
			className: "relative -top-24"
		}, void 0, false, {
			fileName: _jsxFileName$8,
			lineNumber: 47,
			columnNumber: 7
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "shell",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Reveal, { children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "mb-3 text-[11px] font-medium tracking-[0.22em] text-subtle uppercase",
					children: config.about?.badge || "How we work"
				}, void 0, false, {
					fileName: _jsxFileName$8,
					lineNumber: 50,
					columnNumber: 11
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
					className: "max-w-3xl text-3xl font-semibold tracking-tight text-label sm:text-5xl",
					children: config.about?.title || "From brief to live campaigns."
				}, void 0, false, {
					fileName: _jsxFileName$8,
					lineNumber: 53,
					columnNumber: 11
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg",
					children: config.about?.subtitle || "Design, development, and social media in one loop — not a handoff graveyard. Typical engagement: four to six weeks."
				}, void 0, false, {
					fileName: _jsxFileName$8,
					lineNumber: 56,
					columnNumber: 11
				}, this)
			] }, void 0, true, {
				fileName: _jsxFileName$8,
				lineNumber: 49,
				columnNumber: 9
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("ol", {
				className: "mt-12 divide-y divide-hairline border-y border-hairline",
				children: steps.map((step, i) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Reveal, {
					delay: i * 40,
					children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "process-row grid gap-3 rounded-lg px-2 py-7 sm:grid-cols-[5.5rem_minmax(0,0.9fr)_minmax(0,1.2fr)] sm:items-baseline sm:gap-10",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "text-sm font-medium tracking-[0.18em] text-subtle tabular-nums",
								children: step.number
							}, void 0, false, {
								fileName: _jsxFileName$8,
								lineNumber: 66,
								columnNumber: 19
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
								className: "text-xl font-semibold tracking-tight text-label sm:text-2xl",
								children: step.title
							}, void 0, false, {
								fileName: _jsxFileName$8,
								lineNumber: 69,
								columnNumber: 19
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "text-base leading-relaxed text-muted-foreground",
								children: step.description
							}, void 0, false, {
								fileName: _jsxFileName$8,
								lineNumber: 72,
								columnNumber: 19
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName$8,
						lineNumber: 65,
						columnNumber: 17
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName$8,
					lineNumber: 64,
					columnNumber: 15
				}, this) }, step.number, false, {
					fileName: _jsxFileName$8,
					lineNumber: 63,
					columnNumber: 13
				}, this))
			}, void 0, false, {
				fileName: _jsxFileName$8,
				lineNumber: 61,
				columnNumber: 9
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName$8,
			lineNumber: 48,
			columnNumber: 7
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName$8,
		lineNumber: 42,
		columnNumber: 5
	}, this);
}
var _jsxFileName$7 = "/app/applet/src/components/Services.tsx";
var fallbackServices = [
	{
		id: "web-dev",
		kicker: "01  /  Websites & Web Apps",
		title: "Custom Web Development & Web Applications",
		role: "Full-Stack Web Development, Custom Web Apps & E-Commerce",
		description: "We design and code bespoke, ultra-fast websites and web applications tailored specifically to your business operations. Whether you need a high-converting corporate website, an e-commerce platform, a customer portal, or an internal dashboard, we write clean, scalable code that loads in under a second and drives qualified client conversions.",
		whatWeDo: "We handle the entire build from software architecture and database design to modern React frontends, payment checkout flows, API integrations, and turnkey cloud server deployment. You get a bulletproof, secure digital asset that you 100% own.",
		points: [
			"Custom React & TypeScript Code (No slow builders)",
			"Sub-Second Load Times (95+ PageSpeed benchmark)",
			"Bespoke Client Portals & Web Applications",
			"Secure Stripe, PayPal & Apple Pay Checkout",
			"Automated Lead Capture & Instant CRM Sync"
		],
		deliverables: [
			{
				title: "Custom Responsive Web Application",
				desc: "Bespoke frontend built with React, TypeScript, and Tailwind CSS that renders seamlessly on iPhones, Androids, tablets, laptops, and 4K displays."
			},
			{
				title: "Client-Friendly Content Management (CMS)",
				desc: "An intuitive administration panel so you and your team can effortlessly update copy, team members, blog posts, and projects with zero coding."
			},
			{
				title: "Secure Payment & Checkout Integrations",
				desc: "Turnkey Stripe, PayPal, or Apple Pay processing with automatic customer receipts, invoicing, and webhook fulfillment."
			},
			{
				title: "Instant Lead & Inquiry Routing",
				desc: "Contact forms that instantly ping your WhatsApp, Telegram, or CRM the second an inquiry arrives so you never miss a deal."
			},
			{
				title: "Core Web Vitals & Speed Optimization",
				desc: "Image compression pipelines (WebP/AVIF), code-splitting, and caching headers configured to achieve 95+ Google PageSpeed benchmarks."
			},
			{
				title: "Production Deployment & Security",
				desc: "Domain DNS routing, SSL certificate setup, automated database backups, and DDoS protection so your site stays online 24/7."
			}
		],
		techStack: [
			"React 19",
			"TypeScript",
			"Tailwind CSS",
			"Node.js",
			"SQLite / Postgres",
			"Stripe API",
			"Vite",
			"Cloudflare"
		],
		timeline: "Typical Delivery: 2 to 4 Weeks",
		idealFor: "Businesses, startups, and founders needing high-performing sites that scale without monthly builder subscription lock-ins.",
		offYourPlate: "No wrestling with broken WordPress plugins, outdated PHP versions, or unreliable offshore developers.",
		src: "/hero/web-dev.mp4",
		poster: "/hero/web-dev.jpg"
	},
	{
		id: "graphic-design",
		kicker: "02  /  Visual Identity & UI/UX",
		title: "Graphic Design & Brand Identity",
		role: "Conversion-Focused Interfaces, Logos & Brand Systems",
		description: "We design premium, conversion-optimized visual identities and graphic assets that instantly position your company as the premier leader in your industry. Every color palette, custom logo, typography system, button state, and marketing graphic is strategically crafted in Figma and Illustrator to establish high trust.",
		whatWeDo: "We research your market and competitors, design comprehensive logo suites and brand style guides, produce high-fidelity Figma UI/UX screens, and deliver vector marketing collateral ready for print and web.",
		points: [
			"Bespoke Logo Design & Complete Brand Identity",
			"High-Fidelity UI/UX Interface Design in Figma",
			"Marketing Collateral & Social Media Graphics",
			"Design Systems & Reusable UI Component Kits",
			"Full Vector SVG, PNG & Print Production Exports"
		],
		deliverables: [
			{
				title: "Strategic Wireframing & Site Architecture",
				desc: "Information hierarchy that leads visitors naturally from problem identification to solution, social proof, and compelling call-to-action."
			},
			{
				title: "Pixel-Perfect Mobile & Desktop Screens",
				desc: "Custom high-fidelity mockups for all viewports, crafted with precision typography, generous negative space, and polished visual contrast."
			},
			{
				title: "Cohesive Brand Identity & UI Kit",
				desc: "Brand color palettes, accessible font hierarchies, button states, form inputs, badges, and icon libraries ready for development."
			},
			{
				title: "Clickable Figma Prototype",
				desc: "An interactive prototype allowing you to click through and experience the entire user journey on your phone and desktop before development."
			},
			{
				title: "Conversion Elements & Social Proof Layouts",
				desc: "High-trust testimonial sliders, statistical counter ribbons, trust badges, and comparison matrices designed to overcome objections."
			},
			{
				title: "Production Asset Suite",
				desc: "Full vector SVG exports, favicon suites, high-resolution social share preview cards (OpenGraph), and marketing assets."
			}
		],
		techStack: [
			"Figma",
			"Adobe Illustrator",
			"Photoshop",
			"Tailwind Typography",
			"Vector Graphics"
		],
		timeline: "Typical Delivery: 1 to 3 Weeks",
		idealFor: "Established companies looking to rebrand, elevate their perceived value, and charge premium prices for their services.",
		offYourPlate: "No guessing whether your design looks professional or trustworthy. We deliver an elevated aesthetic that converts.",
		src: "/hero/design.mp4",
		poster: "/hero/design.jpg"
	},
	{
		id: "crm-calling",
		kicker: "03  /  Sales Infrastructure",
		title: "Custom CRMs & Calling Systems",
		role: "Tailored Customer Pipelines, VoIP Dialers & Automated Sales Desks",
		description: "Stop losing deals to disorganization. We build custom Customer Relationship Management (CRM) platforms paired with integrated VoIP calling systems tailored directly to your sales workflow. Manage leads, track deal pipelines, trigger automated follow-ups, and make or record client calls directly inside your browser.",
		whatWeDo: "We architect a dedicated CRM database matching your exact sales stages, connect browser-based VoIP telephony (click-to-call, inbound routing, call recording & transcription), and hook up instant notifications to WhatsApp and Telegram so your team can close deals faster.",
		points: [
			"Custom CRM Built Exactly for Your Workflow",
			"Browser-Based VoIP Telephony & Click-to-Call Dialer",
			"Call Recording, Audio Playback & Telemetry Logs",
			"Visual Deal Stages & Automated Pipeline Tracking",
			"Instant WhatsApp, Telegram & SMS Lead Dispatch"
		],
		deliverables: [
			{
				title: "Bespoke CRM Dashboard & Deal Pipelines",
				desc: "Custom visual Kanban and tabular deal pipelines designed specifically around your sales stages and customer lifecycle."
			},
			{
				title: "Integrated VoIP Calling System & Softphone",
				desc: "One-click browser dialing, inbound caller routing, hold queues, and seamless customer phone connectivity without external hardware."
			},
			{
				title: "Call Recording & Automatic Activity Logging",
				desc: "Secure audio recording archives, call duration logs, customer history timelines, and searchable agent call notes."
			},
			{
				title: "Automated Lead Notifications & Desk Routing",
				desc: "Real-time alerts via WhatsApp, Telegram, or email the instant a new lead requests contact or books an appointment."
			},
			{
				title: "Role-Based Team Permissions & Management",
				desc: "Granular access controls for sales agents, managers, and administrators to track individual rep activity and team performance."
			},
			{
				title: "REST API & Webhook Integrations",
				desc: "Seamless synchronization with your external accounting, advertising channels, and customer communication tools."
			}
		],
		techStack: [
			"WebRTC / VoIP",
			"Twilio Voice API",
			"Node.js",
			"WebSockets",
			"React",
			"SQLite / PostgreSQL"
		],
		timeline: "Typical Delivery: 2 to 4 Weeks",
		idealFor: "Sales teams, agencies, and businesses with outbound or inbound call volume that have outgrown rigid off-the-shelf CRMs.",
		offYourPlate: "No paying thousands every month in expensive per-seat CRM licenses and disconnected phone subscriptions.",
		src: "/services/crm-calling.jpg",
		poster: "/services/crm-calling.jpg"
	},
	{
		id: "email-marketing",
		kicker: "04  /  Retention & Nurturing",
		title: "Email Marketing & Automated Drip Funnels",
		role: "High-Deliverability Sequences, Newsletters & Customer Retention",
		description: "Turn one-time website visitors into lifelong repeat clients. We design responsive, branded email templates, set up bulletproof domain authentication (SPF, DKIM, DMARC) for flawless primary inbox deliverability, and engineer automated email funnels that nurture prospects 24/7.",
		whatWeDo: "We write compelling direct-response copy, configure welcome drip sequences, re-engage cold prospects, set up cart and inquiry abandonment automations, and manage regular broadcasts with clear conversion tracking.",
		points: [
			"Automated Welcome & Lead Nurturing Sequences",
			"Custom Branded Responsive Email Templates",
			"Bulletproof Deliverability (SPF, DKIM, DMARC)",
			"Smart List Segmentation & Behavioral Triggers",
			"Continuous Open & Click-Through Rate Optimization"
		],
		deliverables: [
			{
				title: "Complete Automated Welcome & Onboarding Drip",
				desc: "A multi-step email sequence that welcomes new inquiries, builds high authority, and guides prospects to book a call or purchase."
			},
			{
				title: "Responsive Custom Branded Email Templates",
				desc: "Modern, beautifully styled email designs tested across Apple Mail, Gmail, Outlook, and all major mobile email clients."
			},
			{
				title: "Domain DNS & Inbox Deliverability Configuration",
				desc: "Full verification of SPF, DKIM, DMARC, and custom sending subdomains to protect your domain reputation and prevent spam folder drops."
			},
			{
				title: "Audience Tagging & Behavioral Segmentation",
				desc: "Automated tagging based on customer interests, purchase status, and website interactions so every recipient receives relevant content."
			},
			{
				title: "Abandoned Lead & Re-Engagement Automations",
				desc: "Automated trigger flows that win back interested leads who started a form or checkout but didn't finish."
			},
			{
				title: "Transparent Performance & Revenue Reports",
				desc: "In-depth tracking of open rates, click-through rates, unsubscribe benchmarks, and direct revenue generated per campaign."
			}
		],
		techStack: [
			"Klaviyo / Mailchimp / SendGrid",
			"HTML Email Standards",
			"DNS SPF/DKIM/DMARC",
			"CRM Sync"
		],
		timeline: "Typical Delivery: 1 to 2 Weeks",
		idealFor: "Businesses wanting to build an owned audience asset and generate predictable sales without relying solely on paid ads.",
		offYourPlate: "No wondering why your emails are hitting the spam tab or struggling with broken email layouts on mobile devices.",
		src: "/services/acquisition-retention.jpg",
		poster: "/services/acquisition-retention.jpg"
	},
	{
		id: "social-ads",
		kicker: "05  /  Targeted Acquisition",
		title: "Social Media Marketing (Meta & Google Ads)",
		role: "Paid Ad Campaigns, Creative Production & High-ROAS Traffic",
		description: "A high-converting website needs consistent, high-intent traffic. We create thumb-stopping ad creatives, configure conversion tracking pixels, write direct-response copy, and actively manage your paid ad campaigns on Meta (Facebook & Instagram) and Google (Search, Display & YouTube) to deliver qualified leads.",
		whatWeDo: "We perform audience and competitor research, produce video reels and graphic ad variations, set up Meta Conversion API and Google Analytics 4 tracking, launch multi-variant A/B tests, and optimize bids weekly to maximize return on ad spend.",
		points: [
			"Full-Funnel Meta Ads (Instagram & Facebook)",
			"High-Intent Google Search & Display Campaigns",
			"Scroll-Stopping Graphic & Video Ad Production",
			"Pixel & Conversion API (CAPI) Tracking Setup",
			"Proactive Weekly A/B Testing & Budget Optimization"
		],
		deliverables: [
			{
				title: "Targeted Paid Ad Campaign Setup & Management",
				desc: "Full-funnel ad campaigns structured for cold acquisition, warm retargeting, and lookalike scaling on Meta and Google."
			},
			{
				title: "High-Converting Creative Production",
				desc: "Attention-grabbing short-form video reels, multi-slide carousels, and promotional graphic banners designed to stop the feed scroll."
			},
			{
				title: "Strategic Copywriting & Headline Testing",
				desc: "Compelling direct-response ad copy written with emotional hooks, clear benefit statements, and high-urgency calls to action."
			},
			{
				title: "Tracking Pixels & Server-Side Funnel Attribution",
				desc: "Installation of Meta Pixel, Google Analytics 4, Google Tag Manager, and Conversion API for complete conversion tracking."
			},
			{
				title: "A/B Testing & Cost-Per-Acquisition Optimization",
				desc: "Continuous testing of creative variations, headlines, and target audiences to lower your cost-per-acquisition and scale winning ads."
			},
			{
				title: "Transparent Monthly ROI & Lead Reporting",
				desc: "Clear, jargon-free monthly performance reports detailing ad spend, reach, click-through rates, qualified leads, and return on investment."
			}
		],
		techStack: [
			"Meta Ads Manager",
			"Google Ads",
			"Google Analytics 4",
			"Meta CAPI",
			"Figma",
			"CapCut / Premiere"
		],
		timeline: "Ongoing Monthly Optimization Sprints",
		idealFor: "Companies ready to aggressively scale customer acquisition with predictable, measurable paid advertising return.",
		offYourPlate: "No more burning money on boosted posts or struggling with complex, ever-changing advertising dashboards.",
		src: "/hero/social.mp4",
		poster: "/hero/social.jpg"
	}
];
var serviceIcons = {
	"web-dev": CodeXml,
	"graphic-design": Palette,
	"crm-calling": PhoneCall,
	"email-marketing": Mail,
	"social-ads": Megaphone,
	"web-design": Palette,
	social: TrendingUp
};
var serviceFaqs = [
	{
		q: "Do I own the website and source code after completion?",
		a: "Yes, 100%. Once final sign-off is completed, you own all source code, design files in Figma, domain registrations, and assets with zero licensing fees or vendor lock-in."
	},
	{
		q: "Can my team edit content without knowing how to code?",
		a: "Absolutely. We provide an intuitive administrative dashboard where you can easily modify text, upload images, add case studies, publish blog posts, and manage inquiries."
	},
	{
		q: "How long does a complete project take from start to finish?",
		a: "Most custom web design and development projects launch within 2 to 4 weeks. Social media ad campaigns typically launch within 5 business days after strategy approval."
	},
	{
		q: "What do I need to prepare before we get started?",
		a: "Just your business objectives, target audience details, and any existing logo or imagery you have. We handle the copywriting, structuring, design mockups, and technical coding."
	},
	{
		q: "Do you offer post-launch support and maintenance?",
		a: "Yes. Every build includes 30 days of complimentary post-launch support and bug fixes. We also offer monthly maintenance and growth retainers to keep your systems running at peak speed."
	}
];
function Services() {
	const { config } = useSiteConfig();
	const { openContactModal } = useContactModal();
	const [expandedServices, setExpandedServices] = (0, import_react.useState)({
		"web-dev": true,
		"graphic-design": false,
		"crm-calling": false,
		"email-marketing": false,
		"social-ads": false
	});
	const [openFaq, setOpenFaq] = (0, import_react.useState)(null);
	const items = (config.services?.items?.length ? config.services.items : fallbackServices).map((item) => {
		const fallback = fallbackServices.find((f) => f.id === item.id) || fallbackServices.find((f) => f.id === "web-dev");
		if (!fallback) return item;
		return {
			...fallback,
			...item,
			role: item.role || fallback.role,
			whatWeDo: item.whatWeDo || fallback.whatWeDo,
			deliverables: item.deliverables && item.deliverables.length > 0 ? item.deliverables : fallback.deliverables,
			techStack: item.techStack && item.techStack.length > 0 ? item.techStack : fallback.techStack,
			timeline: item.timeline || fallback.timeline,
			idealFor: item.idealFor || fallback.idealFor,
			offYourPlate: item.offYourPlate || fallback.offYourPlate,
			poster: item.poster || fallback.poster
		};
	});
	const toggleExpand = (id) => {
		setExpandedServices((prev) => ({
			...prev,
			[id]: !prev[id]
		}));
	};
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", {
		id: "services",
		"aria-label": "Services",
		className: "scroll-mt-24 bg-fill-elevated py-16 sm:py-24",
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			id: "capabilities",
			className: "relative -top-24"
		}, void 0, false, {
			fileName: _jsxFileName$7,
			lineNumber: 355,
			columnNumber: 7
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "shell",
			children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Reveal, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "max-w-3xl",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "inline-flex items-center gap-2 rounded-full border border-blue/20 bg-blue/10 px-3 py-1 text-[11px] font-semibold tracking-[0.18em] text-blue uppercase",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Sparkles, { className: "size-3" }, void 0, false, {
								fileName: _jsxFileName$7,
								lineNumber: 361,
								columnNumber: 15
							}, this), config.services?.badge || "What We Do For You"]
						}, void 0, true, {
							fileName: _jsxFileName$7,
							lineNumber: 360,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
							className: "mt-4 text-3xl font-semibold tracking-tight text-label sm:text-5xl",
							children: config.services?.title || "Complete Digital Services Built & Managed For You"
						}, void 0, false, {
							fileName: _jsxFileName$7,
							lineNumber: 364,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
							className: "mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg",
							children: config.services?.subtitle || "We don't just hand you templates or tell you what to do. Our team does the actual heavy lifting — custom coding your website, designing your brand, and managing your social media campaigns so you get real clients."
						}, void 0, false, {
							fileName: _jsxFileName$7,
							lineNumber: 367,
							columnNumber: 13
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName$7,
					lineNumber: 359,
					columnNumber: 11
				}, this) }, void 0, false, {
					fileName: _jsxFileName$7,
					lineNumber: 358,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Reveal, {
					delay: 40,
					children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex items-center gap-2.5 rounded-lg border border-hairline bg-card p-3 sm:p-4",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CodeXml, { className: "size-4 shrink-0 text-blue" }, void 0, false, {
									fileName: _jsxFileName$7,
									lineNumber: 378,
									columnNumber: 15
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
									className: "text-xs font-semibold text-label",
									children: "100% Custom Code"
								}, void 0, false, {
									fileName: _jsxFileName$7,
									lineNumber: 380,
									columnNumber: 17
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
									className: "text-[11px] text-muted-foreground",
									children: "No slow page builders"
								}, void 0, false, {
									fileName: _jsxFileName$7,
									lineNumber: 381,
									columnNumber: 17
								}, this)] }, void 0, true, {
									fileName: _jsxFileName$7,
									lineNumber: 379,
									columnNumber: 15
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$7,
								lineNumber: 377,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex items-center gap-2.5 rounded-lg border border-hairline bg-card p-3 sm:p-4",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Zap, { className: "size-4 shrink-0 text-amber-500" }, void 0, false, {
									fileName: _jsxFileName$7,
									lineNumber: 385,
									columnNumber: 15
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
									className: "text-xs font-semibold text-label",
									children: "Sub-Second Speed"
								}, void 0, false, {
									fileName: _jsxFileName$7,
									lineNumber: 387,
									columnNumber: 17
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
									className: "text-[11px] text-muted-foreground",
									children: "95+ PageSpeed score"
								}, void 0, false, {
									fileName: _jsxFileName$7,
									lineNumber: 388,
									columnNumber: 17
								}, this)] }, void 0, true, {
									fileName: _jsxFileName$7,
									lineNumber: 386,
									columnNumber: 15
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$7,
								lineNumber: 384,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex items-center gap-2.5 rounded-lg border border-hairline bg-card p-3 sm:p-4",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Lock, { className: "size-4 shrink-0 text-emerald-500" }, void 0, false, {
									fileName: _jsxFileName$7,
									lineNumber: 392,
									columnNumber: 15
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
									className: "text-xs font-semibold text-label",
									children: "You Own 100%"
								}, void 0, false, {
									fileName: _jsxFileName$7,
									lineNumber: 394,
									columnNumber: 17
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
									className: "text-[11px] text-muted-foreground",
									children: "Full code & IP ownership"
								}, void 0, false, {
									fileName: _jsxFileName$7,
									lineNumber: 395,
									columnNumber: 17
								}, this)] }, void 0, true, {
									fileName: _jsxFileName$7,
									lineNumber: 393,
									columnNumber: 15
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$7,
								lineNumber: 391,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex items-center gap-2.5 rounded-lg border border-hairline bg-card p-3 sm:p-4",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(UsersRound, { className: "size-4 shrink-0 text-purple-500" }, void 0, false, {
									fileName: _jsxFileName$7,
									lineNumber: 399,
									columnNumber: 15
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
									className: "text-xs font-semibold text-label",
									children: "Direct Team Access"
								}, void 0, false, {
									fileName: _jsxFileName$7,
									lineNumber: 401,
									columnNumber: 17
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
									className: "text-[11px] text-muted-foreground",
									children: "No account manager telephone"
								}, void 0, false, {
									fileName: _jsxFileName$7,
									lineNumber: 402,
									columnNumber: 17
								}, this)] }, void 0, true, {
									fileName: _jsxFileName$7,
									lineNumber: 400,
									columnNumber: 15
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$7,
								lineNumber: 398,
								columnNumber: 13
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName$7,
						lineNumber: 376,
						columnNumber: 11
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName$7,
					lineNumber: 375,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "mt-12 space-y-8",
					children: items.map((service, i) => {
						const Icon = serviceIcons[service.id] || CodeXml;
						const isExpanded = expandedServices[service.id] ?? false;
						return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Reveal, {
							delay: i * 60,
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("article", {
								id: `service-${service.id}`,
								className: "surface-lift overflow-hidden rounded-2xl border border-hairline bg-card shadow-sm transition-all",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "grid lg:grid-cols-12 lg:items-stretch",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: cn("media-zoom relative min-h-64 overflow-hidden bg-ink sm:min-h-80 lg:col-span-5", i % 2 === 1 && "lg:order-2"),
										children: (() => {
											const isCrm = service.id === "crm-calling" || (service.title.toLowerCase().includes("crm") || service.title.toLowerCase().includes("calling")) && !service.title.toLowerCase().includes("application");
											const isAcquisition = service.id === "email-marketing" || service.id === "social-ads" || service.id === "social" || service.title.toLowerCase().includes("acquisition") || service.title.toLowerCase().includes("email marketing");
											const isWebApps = service.id === "web-apps" || service.title.toLowerCase().includes("web application") && !service.title.toLowerCase().includes("website");
											const isDesign = service.id === "graphic-design" || service.title.toLowerCase().includes("brand") || service.title.toLowerCase().includes("graphic");
											const mediaSrc = isCrm ? "/services/crm-calling.jpg" : isAcquisition ? "/hero/acquisition.mp4" : isWebApps ? "/hero/web-apps.mp4" : service.src || service.poster || "/hero/web-dev.jpg";
											const mediaPoster = isWebApps ? "/hero/web-apps.jpg" : isAcquisition ? "/services/acquisition-retention.jpg" : isCrm ? "/services/crm-calling.jpg" : service.poster;
											const isVideo = !isCrm && typeof mediaSrc === "string" && mediaSrc.endsWith(".mp4");
											const tagLabel = isCrm ? "Bespoke CRM · Native Browser VoIP" : isAcquisition ? "Meta & Google Ads · Klaviyo Drip Engine" : isWebApps ? "Full-Stack Portal · Real-Time WebSockets" : isDesign ? "Figma UI Systems · Vector Brand Master" : "Sub-Second Edge Code · 99+ Core Vitals";
											const tagPulseColor = isCrm ? "bg-emerald-400" : isAcquisition ? "bg-blue" : isWebApps ? "bg-indigo-400" : isDesign ? "bg-amber-400" : "bg-emerald-400";
											const tagBorder = isCrm ? "border-emerald-500/30" : isAcquisition ? "border-blue/30" : isWebApps ? "border-indigo-500/30" : isDesign ? "border-amber-500/30" : "border-white/20";
											return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [
												isVideo ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("video", {
													src: mediaSrc,
													poster: mediaPoster,
													className: "absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out hover:scale-105",
													autoPlay: true,
													muted: true,
													loop: true,
													playsInline: true,
													preload: "metadata"
												}, void 0, false, {
													fileName: _jsxFileName$7,
													lineNumber: 504,
													columnNumber: 31
												}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("img", {
													src: mediaSrc,
													alt: service.title,
													className: "absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out hover:scale-105",
													loading: "lazy",
													referrerPolicy: "no-referrer"
												}, void 0, false, {
													fileName: _jsxFileName$7,
													lineNumber: 515,
													columnNumber: 31
												}, this),
												/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/20 to-transparent pointer-events-none" }, void 0, false, {
													fileName: _jsxFileName$7,
													lineNumber: 525,
													columnNumber: 29
												}, this),
												/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-transparent pointer-events-none" }, void 0, false, {
													fileName: _jsxFileName$7,
													lineNumber: 526,
													columnNumber: 29
												}, this),
												/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
													className: "absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none",
													children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
														className: cn("inline-flex items-center gap-1.5 rounded-full bg-black/60 px-2.5 py-1 text-[11px] font-medium text-paper/90 backdrop-blur-md border", tagBorder),
														children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: cn("size-1.5 rounded-full animate-pulse", tagPulseColor) }, void 0, false, {
															fileName: _jsxFileName$7,
															lineNumber: 536,
															columnNumber: 33
														}, this), tagLabel]
													}, void 0, true, {
														fileName: _jsxFileName$7,
														lineNumber: 530,
														columnNumber: 31
													}, this)
												}, void 0, false, {
													fileName: _jsxFileName$7,
													lineNumber: 529,
													columnNumber: 29
												}, this),
												/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
													className: "absolute bottom-4 left-4 right-4 flex items-center justify-between text-paper pointer-events-none",
													children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
														className: "inline-flex items-center gap-1.5 rounded-md bg-black/60 px-2.5 py-1 text-xs font-medium backdrop-blur-md",
														children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Icon, { className: "size-3.5 text-blue" }, void 0, false, {
															fileName: _jsxFileName$7,
															lineNumber: 544,
															columnNumber: 33
														}, this), service.kicker]
													}, void 0, true, {
														fileName: _jsxFileName$7,
														lineNumber: 543,
														columnNumber: 31
													}, this), service.timeline && /* @__PURE__ */ (void 0)("span", {
														className: "inline-flex items-center gap-1 text-xs text-paper/80",
														children: [/* @__PURE__ */ (void 0)(Clock, { className: "size-3" }, void 0, false, {
															fileName: _jsxFileName$7,
															lineNumber: 549,
															columnNumber: 35
														}, this), service.timeline]
													}, void 0, true, {
														fileName: _jsxFileName$7,
														lineNumber: 548,
														columnNumber: 33
													}, this)]
												}, void 0, true, {
													fileName: _jsxFileName$7,
													lineNumber: 542,
													columnNumber: 29
												}, this)
											] }, void 0, true, {
												fileName: _jsxFileName$7,
												lineNumber: 502,
												columnNumber: 27
											}, this);
										})()
									}, void 0, false, {
										fileName: _jsxFileName$7,
										lineNumber: 423,
										columnNumber: 21
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "flex flex-col justify-between p-7 sm:p-10 lg:col-span-7",
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
											/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
												className: "flex flex-wrap items-center justify-between gap-2",
												children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
													className: "text-[11px] font-semibold tracking-[0.2em] text-subtle uppercase",
													children: service.kicker
												}, void 0, false, {
													fileName: _jsxFileName$7,
													lineNumber: 563,
													columnNumber: 27
												}, this), service.role && /* @__PURE__ */ (void 0)("span", {
													className: "rounded-full bg-blue/10 px-2.5 py-0.5 text-xs font-medium text-blue",
													children: service.role
												}, void 0, false, {
													fileName: _jsxFileName$7,
													lineNumber: 567,
													columnNumber: 29
												}, this)]
											}, void 0, true, {
												fileName: _jsxFileName$7,
												lineNumber: 562,
												columnNumber: 25
											}, this),
											/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
												className: "mt-3 text-2xl font-semibold tracking-tight text-label sm:text-3xl",
												children: service.title
											}, void 0, false, {
												fileName: _jsxFileName$7,
												lineNumber: 573,
												columnNumber: 25
											}, this),
											/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
												className: "mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base",
												children: service.description
											}, void 0, false, {
												fileName: _jsxFileName$7,
												lineNumber: 577,
												columnNumber: 25
											}, this),
											service.whatWeDo && /* @__PURE__ */ (void 0)("div", {
												className: "mt-5 rounded-xl border border-hairline bg-fill p-4 sm:p-5",
												children: [/* @__PURE__ */ (void 0)("p", {
													className: "text-xs font-semibold text-label",
													children: "What our team handles for your business:"
												}, void 0, false, {
													fileName: _jsxFileName$7,
													lineNumber: 584,
													columnNumber: 29
												}, this), /* @__PURE__ */ (void 0)("p", {
													className: "mt-1 text-xs leading-relaxed text-muted-foreground sm:text-sm",
													children: service.whatWeDo
												}, void 0, false, {
													fileName: _jsxFileName$7,
													lineNumber: 587,
													columnNumber: 29
												}, this)]
											}, void 0, true, {
												fileName: _jsxFileName$7,
												lineNumber: 583,
												columnNumber: 27
											}, this),
											/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
												className: "mt-5 flex flex-wrap gap-2",
												children: service.points.map((point) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
													className: "inline-flex items-center gap-1.5 rounded-full border border-hairline bg-card px-3 py-1 text-xs font-medium text-label shadow-2xs",
													children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CircleCheck, { className: "size-3 text-blue" }, void 0, false, {
														fileName: _jsxFileName$7,
														lineNumber: 600,
														columnNumber: 31
													}, this), point]
												}, point, true, {
													fileName: _jsxFileName$7,
													lineNumber: 596,
													columnNumber: 29
												}, this))
											}, void 0, false, {
												fileName: _jsxFileName$7,
												lineNumber: 594,
												columnNumber: 25
											}, this)
										] }, void 0, true, {
											fileName: _jsxFileName$7,
											lineNumber: 561,
											columnNumber: 23
										}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
											className: "mt-8 flex flex-wrap items-center gap-3 border-t border-hairline pt-6",
											children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
												type: "button",
												onClick: () => openContactModal(service.title),
												className: "inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-blue px-5 text-sm font-semibold text-paper shadow-sm transition-all hover:bg-blue/90 cursor-pointer",
												children: [
													"Book ",
													service.title,
													/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ChevronRight, { className: "size-4" }, void 0, false, {
														fileName: _jsxFileName$7,
														lineNumber: 615,
														columnNumber: 27
													}, this)
												]
											}, void 0, true, {
												fileName: _jsxFileName$7,
												lineNumber: 609,
												columnNumber: 25
											}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
												type: "button",
												onClick: () => toggleExpand(service.id),
												className: "inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-hairline bg-card px-4 text-sm font-medium text-label hover:bg-fill cursor-pointer",
												children: [isExpanded ? "Hide Detailed Scope" : "View Detailed Scope & Deliverables", isExpanded ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ChevronUp, { className: "size-4" }, void 0, false, {
													fileName: _jsxFileName$7,
													lineNumber: 624,
													columnNumber: 41
												}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ChevronDown, { className: "size-4" }, void 0, false, {
													fileName: _jsxFileName$7,
													lineNumber: 624,
													columnNumber: 76
												}, this)]
											}, void 0, true, {
												fileName: _jsxFileName$7,
												lineNumber: 618,
												columnNumber: 25
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName$7,
											lineNumber: 608,
											columnNumber: 23
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName$7,
										lineNumber: 560,
										columnNumber: 21
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$7,
									lineNumber: 421,
									columnNumber: 19
								}, this), isExpanded && /* @__PURE__ */ (void 0)("div", {
									className: "border-t border-hairline bg-fill p-7 sm:p-10",
									children: /* @__PURE__ */ (void 0)("div", {
										className: "grid gap-8 lg:grid-cols-12",
										children: [/* @__PURE__ */ (void 0)("div", {
											className: "lg:col-span-8",
											children: [/* @__PURE__ */ (void 0)("div", {
												className: "flex items-center gap-2",
												children: [/* @__PURE__ */ (void 0)(FileCheck, { className: "size-4 text-blue" }, void 0, false, {
													fileName: _jsxFileName$7,
													lineNumber: 637,
													columnNumber: 29
												}, this), /* @__PURE__ */ (void 0)("h4", {
													className: "text-sm font-semibold tracking-tight text-label uppercase",
													children: "Complete Scope of Deliverables Included"
												}, void 0, false, {
													fileName: _jsxFileName$7,
													lineNumber: 638,
													columnNumber: 29
												}, this)]
											}, void 0, true, {
												fileName: _jsxFileName$7,
												lineNumber: 636,
												columnNumber: 27
											}, this), /* @__PURE__ */ (void 0)("div", {
												className: "mt-4 grid gap-3 sm:grid-cols-2",
												children: service.deliverables?.map((item) => /* @__PURE__ */ (void 0)("div", {
													className: "rounded-xl border border-hairline bg-card p-4 transition-colors",
													children: /* @__PURE__ */ (void 0)("div", {
														className: "flex items-start gap-2.5",
														children: [/* @__PURE__ */ (void 0)(CircleCheck, { className: "mt-0.5 size-4 shrink-0 text-emerald-500" }, void 0, false, {
															fileName: _jsxFileName$7,
															lineNumber: 650,
															columnNumber: 35
														}, this), /* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("p", {
															className: "text-xs font-semibold text-label sm:text-sm",
															children: item.title
														}, void 0, false, {
															fileName: _jsxFileName$7,
															lineNumber: 652,
															columnNumber: 37
														}, this), /* @__PURE__ */ (void 0)("p", {
															className: "mt-1 text-xs leading-relaxed text-muted-foreground",
															children: item.desc
														}, void 0, false, {
															fileName: _jsxFileName$7,
															lineNumber: 655,
															columnNumber: 37
														}, this)] }, void 0, true, {
															fileName: _jsxFileName$7,
															lineNumber: 651,
															columnNumber: 35
														}, this)]
													}, void 0, true, {
														fileName: _jsxFileName$7,
														lineNumber: 649,
														columnNumber: 33
													}, this)
												}, item.title, false, {
													fileName: _jsxFileName$7,
													lineNumber: 645,
													columnNumber: 31
												}, this))
											}, void 0, false, {
												fileName: _jsxFileName$7,
												lineNumber: 643,
												columnNumber: 27
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName$7,
											lineNumber: 635,
											columnNumber: 25
										}, this), /* @__PURE__ */ (void 0)("div", {
											className: "space-y-4 lg:col-span-4",
											children: [
												service.offYourPlate && /* @__PURE__ */ (void 0)("div", {
													className: "rounded-xl border border-hairline bg-card p-4",
													children: [/* @__PURE__ */ (void 0)("p", {
														className: "text-xs font-semibold text-label",
														children: "What We Take Off Your Plate:"
													}, void 0, false, {
														fileName: _jsxFileName$7,
														lineNumber: 670,
														columnNumber: 31
													}, this), /* @__PURE__ */ (void 0)("p", {
														className: "mt-1.5 text-xs leading-relaxed text-muted-foreground",
														children: service.offYourPlate
													}, void 0, false, {
														fileName: _jsxFileName$7,
														lineNumber: 673,
														columnNumber: 31
													}, this)]
												}, void 0, true, {
													fileName: _jsxFileName$7,
													lineNumber: 669,
													columnNumber: 29
												}, this),
												service.idealFor && /* @__PURE__ */ (void 0)("div", {
													className: "rounded-xl border border-hairline bg-card p-4",
													children: [/* @__PURE__ */ (void 0)("p", {
														className: "text-xs font-semibold text-label",
														children: "Who This Is Ideal For:"
													}, void 0, false, {
														fileName: _jsxFileName$7,
														lineNumber: 682,
														columnNumber: 31
													}, this), /* @__PURE__ */ (void 0)("p", {
														className: "mt-1 text-xs leading-relaxed text-muted-foreground",
														children: service.idealFor
													}, void 0, false, {
														fileName: _jsxFileName$7,
														lineNumber: 685,
														columnNumber: 31
													}, this)]
												}, void 0, true, {
													fileName: _jsxFileName$7,
													lineNumber: 681,
													columnNumber: 29
												}, this),
												service.techStack && /* @__PURE__ */ (void 0)("div", {
													className: "rounded-xl border border-hairline bg-card p-4",
													children: [/* @__PURE__ */ (void 0)("p", {
														className: "text-xs font-semibold text-label",
														children: "Technologies & Tools Used:"
													}, void 0, false, {
														fileName: _jsxFileName$7,
														lineNumber: 694,
														columnNumber: 31
													}, this), /* @__PURE__ */ (void 0)("div", {
														className: "mt-2 flex flex-wrap gap-1.5",
														children: service.techStack.map((tech) => /* @__PURE__ */ (void 0)("span", {
															className: "rounded bg-muted px-2 py-0.5 font-mono text-[10px] text-muted-foreground",
															children: tech
														}, tech, false, {
															fileName: _jsxFileName$7,
															lineNumber: 699,
															columnNumber: 35
														}, this))
													}, void 0, false, {
														fileName: _jsxFileName$7,
														lineNumber: 697,
														columnNumber: 31
													}, this)]
												}, void 0, true, {
													fileName: _jsxFileName$7,
													lineNumber: 693,
													columnNumber: 29
												}, this),
												/* @__PURE__ */ (void 0)("div", {
													className: "rounded-xl border border-blue/20 bg-blue/5 p-4 text-center",
													children: [
														/* @__PURE__ */ (void 0)("p", {
															className: "text-xs font-semibold text-label",
															children: "Ready to get this built for you?"
														}, void 0, false, {
															fileName: _jsxFileName$7,
															lineNumber: 712,
															columnNumber: 29
														}, this),
														/* @__PURE__ */ (void 0)("p", {
															className: "mt-1 text-xs text-muted-foreground",
															children: "Let's review your requirements on a quick strategy call."
														}, void 0, false, {
															fileName: _jsxFileName$7,
															lineNumber: 715,
															columnNumber: 29
														}, this),
														/* @__PURE__ */ (void 0)("button", {
															type: "button",
															onClick: () => openContactModal(service.title),
															className: "mt-3 inline-flex w-full min-h-10 items-center justify-center gap-1.5 rounded-lg bg-blue px-3 text-xs font-semibold text-paper hover:bg-blue/90 cursor-pointer",
															children: ["Request Free Proposal", /* @__PURE__ */ (void 0)(ChevronRight, { className: "size-3.5" }, void 0, false, {
																fileName: _jsxFileName$7,
																lineNumber: 724,
																columnNumber: 31
															}, this)]
														}, void 0, true, {
															fileName: _jsxFileName$7,
															lineNumber: 718,
															columnNumber: 29
														}, this)
													]
												}, void 0, true, {
													fileName: _jsxFileName$7,
													lineNumber: 711,
													columnNumber: 27
												}, this)
											]
										}, void 0, true, {
											fileName: _jsxFileName$7,
											lineNumber: 666,
											columnNumber: 25
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName$7,
										lineNumber: 633,
										columnNumber: 23
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName$7,
									lineNumber: 632,
									columnNumber: 21
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$7,
								lineNumber: 416,
								columnNumber: 17
							}, this)
						}, service.id, false, {
							fileName: _jsxFileName$7,
							lineNumber: 415,
							columnNumber: 15
						}, this);
					})
				}, void 0, false, {
					fileName: _jsxFileName$7,
					lineNumber: 409,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Reveal, {
					delay: 100,
					className: "mt-16 sm:mt-24",
					children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "rounded-2xl border border-hairline bg-card p-8 sm:p-12",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "max-w-2xl",
							children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "text-[11px] font-semibold tracking-[0.2em] text-blue uppercase",
									children: "Our Done-For-You Delivery Model"
								}, void 0, false, {
									fileName: _jsxFileName$7,
									lineNumber: 741,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
									className: "mt-2 text-2xl font-semibold tracking-tight text-label sm:text-4xl",
									children: "How we take your project from idea to live revenue."
								}, void 0, false, {
									fileName: _jsxFileName$7,
									lineNumber: 744,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
									className: "mt-2 text-sm leading-relaxed text-muted-foreground sm:text-base",
									children: "You don't need to manage freelancers, deal with code, or guess what to do next. We follow a battle-tested 4-phase execution loop."
								}, void 0, false, {
									fileName: _jsxFileName$7,
									lineNumber: 747,
									columnNumber: 15
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName$7,
							lineNumber: 740,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "rounded-xl border border-hairline bg-fill p-5",
									children: [
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
											className: "font-mono text-xs font-bold text-blue",
											children: "01 / DISCOVERY"
										}, void 0, false, {
											fileName: _jsxFileName$7,
											lineNumber: 754,
											columnNumber: 17
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h4", {
											className: "mt-2 text-base font-semibold text-label",
											children: "Goals & Strategy"
										}, void 0, false, {
											fileName: _jsxFileName$7,
											lineNumber: 755,
											columnNumber: 17
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
											className: "mt-1.5 text-xs leading-relaxed text-muted-foreground",
											children: "We hop on a consultation to define your target customer, commercial offer, technical requirements, and deliverable milestones."
										}, void 0, false, {
											fileName: _jsxFileName$7,
											lineNumber: 756,
											columnNumber: 17
										}, this)
									]
								}, void 0, true, {
									fileName: _jsxFileName$7,
									lineNumber: 753,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "rounded-xl border border-hairline bg-fill p-5",
									children: [
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
											className: "font-mono text-xs font-bold text-blue",
											children: "02 / DESIGN"
										}, void 0, false, {
											fileName: _jsxFileName$7,
											lineNumber: 762,
											columnNumber: 17
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h4", {
											className: "mt-2 text-base font-semibold text-label",
											children: "Custom UI/UX in Figma"
										}, void 0, false, {
											fileName: _jsxFileName$7,
											lineNumber: 763,
											columnNumber: 17
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
											className: "mt-1.5 text-xs leading-relaxed text-muted-foreground",
											children: "We design responsive mockups and interactive prototypes. You review every screen and request adjustments until you love it."
										}, void 0, false, {
											fileName: _jsxFileName$7,
											lineNumber: 764,
											columnNumber: 17
										}, this)
									]
								}, void 0, true, {
									fileName: _jsxFileName$7,
									lineNumber: 761,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "rounded-xl border border-hairline bg-fill p-5",
									children: [
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
											className: "font-mono text-xs font-bold text-blue",
											children: "03 / BUILD"
										}, void 0, false, {
											fileName: _jsxFileName$7,
											lineNumber: 770,
											columnNumber: 17
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h4", {
											className: "mt-2 text-base font-semibold text-label",
											children: "Clean Code & Testing"
										}, void 0, false, {
											fileName: _jsxFileName$7,
											lineNumber: 771,
											columnNumber: 17
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
											className: "mt-1.5 text-xs leading-relaxed text-muted-foreground",
											children: "We hand-code your platform, connect payment gateways and lead capture, and test rigorously across real mobile devices."
										}, void 0, false, {
											fileName: _jsxFileName$7,
											lineNumber: 772,
											columnNumber: 17
										}, this)
									]
								}, void 0, true, {
									fileName: _jsxFileName$7,
									lineNumber: 769,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "rounded-xl border border-hairline bg-fill p-5",
									children: [
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
											className: "font-mono text-xs font-bold text-blue",
											children: "04 / LAUNCH"
										}, void 0, false, {
											fileName: _jsxFileName$7,
											lineNumber: 778,
											columnNumber: 17
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h4", {
											className: "mt-2 text-base font-semibold text-label",
											children: "Turnkey Handover & Ads"
										}, void 0, false, {
											fileName: _jsxFileName$7,
											lineNumber: 779,
											columnNumber: 17
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
											className: "mt-1.5 text-xs leading-relaxed text-muted-foreground",
											children: "We connect your custom domain, set up analytics, launch your marketing campaigns, and train your team on updating content."
										}, void 0, false, {
											fileName: _jsxFileName$7,
											lineNumber: 780,
											columnNumber: 17
										}, this)
									]
								}, void 0, true, {
									fileName: _jsxFileName$7,
									lineNumber: 777,
									columnNumber: 15
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName$7,
							lineNumber: 752,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$7,
						lineNumber: 739,
						columnNumber: 11
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName$7,
					lineNumber: 738,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Reveal, {
					delay: 120,
					className: "mt-8",
					children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "grid gap-4 sm:grid-cols-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex items-start gap-3 rounded-xl border border-hairline bg-card p-6",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ShieldCheck, { className: "mt-0.5 size-5 shrink-0 text-emerald-500" }, void 0, false, {
									fileName: _jsxFileName$7,
									lineNumber: 792,
									columnNumber: 15
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h4", {
									className: "text-sm font-semibold text-label",
									children: "100% Intellectual Property Ownership"
								}, void 0, false, {
									fileName: _jsxFileName$7,
									lineNumber: 794,
									columnNumber: 17
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
									className: "mt-1 text-xs leading-relaxed text-muted-foreground",
									children: "You own all code, designs, and content upon completion. No recurring licensing fees or vendor lock-in."
								}, void 0, false, {
									fileName: _jsxFileName$7,
									lineNumber: 795,
									columnNumber: 17
								}, this)] }, void 0, true, {
									fileName: _jsxFileName$7,
									lineNumber: 793,
									columnNumber: 15
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$7,
								lineNumber: 791,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex items-start gap-3 rounded-xl border border-hairline bg-card p-6",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Zap, { className: "mt-0.5 size-5 shrink-0 text-blue" }, void 0, false, {
									fileName: _jsxFileName$7,
									lineNumber: 802,
									columnNumber: 15
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h4", {
									className: "text-sm font-semibold text-label",
									children: "Fixed-Scope & Transparent Pricing"
								}, void 0, false, {
									fileName: _jsxFileName$7,
									lineNumber: 804,
									columnNumber: 17
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
									className: "mt-1 text-xs leading-relaxed text-muted-foreground",
									children: "We provide a clear scope and fixed quote before kickoff. Zero hidden fees or surprise billings."
								}, void 0, false, {
									fileName: _jsxFileName$7,
									lineNumber: 805,
									columnNumber: 17
								}, this)] }, void 0, true, {
									fileName: _jsxFileName$7,
									lineNumber: 803,
									columnNumber: 15
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$7,
								lineNumber: 801,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex items-start gap-3 rounded-xl border border-hairline bg-card p-6",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Clock, { className: "mt-0.5 size-5 shrink-0 text-purple-500" }, void 0, false, {
									fileName: _jsxFileName$7,
									lineNumber: 812,
									columnNumber: 15
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h4", {
									className: "text-sm font-semibold text-label",
									children: "30 Days Complimentary Support"
								}, void 0, false, {
									fileName: _jsxFileName$7,
									lineNumber: 814,
									columnNumber: 17
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
									className: "mt-1 text-xs leading-relaxed text-muted-foreground",
									children: "We stand behind our work with 30 days of free bug fixes, minor tweaks, and dedicated launch support."
								}, void 0, false, {
									fileName: _jsxFileName$7,
									lineNumber: 815,
									columnNumber: 17
								}, this)] }, void 0, true, {
									fileName: _jsxFileName$7,
									lineNumber: 813,
									columnNumber: 15
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$7,
								lineNumber: 811,
								columnNumber: 13
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName$7,
						lineNumber: 790,
						columnNumber: 11
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName$7,
					lineNumber: 789,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Reveal, {
					delay: 140,
					className: "mt-16",
					children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "rounded-2xl border border-hairline bg-card p-8 sm:p-10",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CircleHelp, { className: "size-4 text-blue" }, void 0, false, {
									fileName: _jsxFileName$7,
									lineNumber: 827,
									columnNumber: 15
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
									className: "text-xl font-semibold tracking-tight text-label sm:text-2xl",
									children: "Frequently Asked Questions About Our Services"
								}, void 0, false, {
									fileName: _jsxFileName$7,
									lineNumber: 828,
									columnNumber: 15
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$7,
								lineNumber: 826,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "mt-1 text-sm text-muted-foreground",
								children: "Direct answers to common questions about working with our team."
							}, void 0, false, {
								fileName: _jsxFileName$7,
								lineNumber: 832,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "mt-6 divide-y divide-hairline",
								children: serviceFaqs.map((faq, idx) => {
									const isOpen = openFaq === idx;
									return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "py-4",
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
											type: "button",
											onClick: () => setOpenFaq(isOpen ? null : idx),
											className: "flex w-full items-center justify-between text-left text-sm font-semibold text-label transition-colors hover:text-blue cursor-pointer",
											children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: faq.q }, void 0, false, {
												fileName: _jsxFileName$7,
												lineNumber: 846,
												columnNumber: 23
											}, this), isOpen ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ChevronUp, { className: "size-4 shrink-0 text-muted-foreground" }, void 0, false, {
												fileName: _jsxFileName$7,
												lineNumber: 848,
												columnNumber: 25
											}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ChevronDown, { className: "size-4 shrink-0 text-muted-foreground" }, void 0, false, {
												fileName: _jsxFileName$7,
												lineNumber: 850,
												columnNumber: 25
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName$7,
											lineNumber: 841,
											columnNumber: 21
										}, this), isOpen && /* @__PURE__ */ (void 0)("p", {
											className: "mt-2 text-xs leading-relaxed text-muted-foreground sm:text-sm",
											children: faq.a
										}, void 0, false, {
											fileName: _jsxFileName$7,
											lineNumber: 854,
											columnNumber: 23
										}, this)]
									}, faq.q, true, {
										fileName: _jsxFileName$7,
										lineNumber: 840,
										columnNumber: 19
									}, this);
								})
							}, void 0, false, {
								fileName: _jsxFileName$7,
								lineNumber: 836,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-hairline pt-6",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
									className: "text-xs text-muted-foreground",
									children: "Have a unique requirement or custom project? We are ready to help."
								}, void 0, false, {
									fileName: _jsxFileName$7,
									lineNumber: 864,
									columnNumber: 15
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
									type: "button",
									onClick: () => scrollToId("contact"),
									className: "inline-flex min-h-10 items-center gap-1.5 rounded-lg bg-label px-4 text-xs font-semibold text-background hover:opacity-90 cursor-pointer",
									children: ["Talk With Our Team", /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ChevronRight, { className: "size-3.5" }, void 0, false, {
										fileName: _jsxFileName$7,
										lineNumber: 873,
										columnNumber: 17
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$7,
									lineNumber: 867,
									columnNumber: 15
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$7,
								lineNumber: 863,
								columnNumber: 13
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName$7,
						lineNumber: 825,
						columnNumber: 11
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName$7,
					lineNumber: 824,
					columnNumber: 9
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName$7,
			lineNumber: 356,
			columnNumber: 7
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName$7,
		lineNumber: 350,
		columnNumber: 5
	}, this);
}
var _jsxFileName$6 = "/app/applet/src/components/BlogSection.tsx";
function BlogSection() {
	const [blogs] = (0, import_react.useState)([]);
	const [activeArticle, setActiveArticle] = (0, import_react.useState)(null);
	const [readerEmail, setReaderEmail] = (0, import_react.useState)("");
	const [readerName, setReaderName] = (0, import_react.useState)("");
	const [isSubscribing, setIsSubscribing] = (0, import_react.useState)(false);
	const [isSubscribed, setIsSubscribed] = (0, import_react.useState)(false);
	const modalContentRef = (0, import_react.useRef)(null);
	const handleOpenArticle = (blog) => {
		setActiveArticle(blog);
		setIsSubscribed(false);
	};
	const handleSubscribe = async (e) => {
		e.preventDefault();
		if (!readerEmail.trim()) {
			toast.error("Please enter a valid email address.");
			return;
		}
		try {
			setIsSubscribing(true);
			setIsSubscribed(true);
			toast.success("Thank you for subscribing! You're now on our private digest.");
			setReaderEmail("");
			setReaderName("");
		} finally {
			setIsSubscribing(false);
		}
	};
	const displayBlogs = blogs.length > 0 ? blogs : [
		{
			id: 1,
			title: "How Bespoke Design Systems Drive 3.4x Higher Conversion Rates",
			slug: "how-bespoke-design-systems-scale",
			excerpt: "Why generic template sites stall revenue growth, and how tailored micro-interactions and typographic cadence command premium enterprise pricing.",
			content: `In the modern digital landscape, user attention is measured in fractions of a second. Off-the-shelf component libraries and cookie-cutter SaaS templates communicate a dangerous signal to discerning clients: commoditization.

When evaluating a six-figure contract, enterprise buyers subconsciously judge competence through craft: typographic hierarchy, optical alignment, micro-delight transitions, and lightning-fast latency.

Our benchmark studies across 40+ client redesigns reveal that custom design tokens tailored to a brand's specific value proposition lift qualified conversion rates by 340% over standardized frameworks.`,
			meta_title: "Bespoke Design Systems & Conversion Scaling | Codex Dynamics",
			meta_description: "Learn how tailored design systems outperform templates with verified conversion gains.",
			status: "published",
			created_at: "2026-03-10"
		},
		{
			id: 2,
			title: "Core Web Vitals & Real-World Latency: Architectural Blueprint",
			slug: "core-web-vitals-conversion-rate-impact",
			excerpt: "A technical teardown of achieving sub-50ms TTFB and perfect 100/100 Lighthouse scores using modern edge SSR and zero-layout-shift techniques.",
			content: `Every 100ms of latency reduction correlates with a measurable 1% to 3% lift in top-line transaction velocity. Yet many modern web projects collapse under the weight of unoptimized client-side hydration.

By structuring assets around atomic static delivery, predictive server pre-renders, and deferring non-critical telemetry to background idle periods, Codex Dynamics sites routinely clock 98-100 Performance scores across mobile and desktop viewports.`,
			meta_title: "Core Web Vitals & Latency Architecture | Codex Dynamics",
			meta_description: "Deep dive into achieving sub-50ms TTFB and perfect 100/100 Lighthouse metrics.",
			status: "published",
			created_at: "2026-03-12"
		},
		{
			id: 3,
			title: "Why Modern Founders Are Replacing Bloated CRMs with Tailored Systems",
			slug: "custom-crm-competitive-advantage",
			excerpt: "How proprietary lead routing, cookie telemetry, and instant webhook dispatches cut response times from hours to under 60 seconds.",
			content: `When a qualified prospect lands on your digital storefront, the window of maximum intent lasts less than five minutes. Relying on disconnected third-party plugins with laggy polling delays means your sales team connects only after the prospect has moved on to a competitor.

Building bespoke back-office telemetries directly into your web infrastructure unlocks instantaneous visitor attribution, precise geo-location intelligence, and real-time CRM promotion.`,
			meta_title: "The Case for Proprietary CRM Telemetry | Codex Dynamics",
			meta_description: "Discover the conversion power of integrated visitor telemetry and instant lead dispatching.",
			status: "published",
			created_at: "2026-03-14"
		}
	];
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", {
		id: "insights",
		className: "py-24 sm:py-32 border-t border-hairline bg-fill-subtle/30",
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "shell space-y-12",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "max-w-2xl",
				children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Reveal, { children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue/10 text-blue text-xs font-semibold mb-3",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(BookOpen, { className: "size-3.5" }, void 0, false, {
							fileName: _jsxFileName$6,
							lineNumber: 106,
							columnNumber: 15
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Engineering & Strategy Insights" }, void 0, false, {
							fileName: _jsxFileName$6,
							lineNumber: 107,
							columnNumber: 15
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$6,
						lineNumber: 105,
						columnNumber: 13
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
						className: "text-3xl sm:text-4xl font-bold tracking-tight text-label font-display",
						children: "Perspective on craft, speed, and conversion."
					}, void 0, false, {
						fileName: _jsxFileName$6,
						lineNumber: 109,
						columnNumber: 13
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "mt-3 text-sm sm:text-base text-muted-foreground leading-relaxed",
						children: "Read architectural deep dives and case methodologies directly from our design and engineering team."
					}, void 0, false, {
						fileName: _jsxFileName$6,
						lineNumber: 112,
						columnNumber: 13
					}, this)
				] }, void 0, true, {
					fileName: _jsxFileName$6,
					lineNumber: 104,
					columnNumber: 11
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName$6,
				lineNumber: 103,
				columnNumber: 9
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "grid grid-cols-1 md:grid-cols-3 gap-6",
				children: displayBlogs.map((blog, idx) => {
					const blogReadingTime = calculateReadingTime(blog.content);
					return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Reveal, {
						delay: idx * 80,
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							onClick: () => handleOpenArticle(blog),
							className: "group p-6 rounded-3xl bg-white border border-black/8 hover:border-blue/40 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between h-full cursor-pointer",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "space-y-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "flex items-center justify-between text-xs text-muted-foreground",
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
											className: "flex items-center gap-1 font-mono",
											children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Clock, { className: "size-3 text-subtle" }, void 0, false, {
												fileName: _jsxFileName$6,
												lineNumber: 131,
												columnNumber: 25
											}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: blogReadingTime.text }, void 0, false, {
												fileName: _jsxFileName$6,
												lineNumber: 132,
												columnNumber: 25
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName$6,
											lineNumber: 130,
											columnNumber: 23
										}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
											className: "text-[11px] font-semibold text-blue bg-blue/5 px-2.5 py-0.5 rounded-full border border-blue/10",
											children: blog.category || "Engineering"
										}, void 0, false, {
											fileName: _jsxFileName$6,
											lineNumber: 134,
											columnNumber: 23
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName$6,
										lineNumber: 129,
										columnNumber: 21
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
										className: "text-base sm:text-lg font-bold text-label font-display group-hover:text-blue transition-colors line-clamp-2",
										children: blog.title
									}, void 0, false, {
										fileName: _jsxFileName$6,
										lineNumber: 139,
										columnNumber: 21
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "text-[11px] text-muted-foreground font-mono flex items-center gap-1.5",
										children: [
											/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "inline-block size-1.5 rounded-full bg-blue/60" }, void 0, false, {
												fileName: _jsxFileName$6,
												lineNumber: 145,
												columnNumber: 23
											}, this),
											/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: blogReadingTime.text }, void 0, false, {
												fileName: _jsxFileName$6,
												lineNumber: 146,
												columnNumber: 23
											}, this),
											/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "•" }, void 0, false, {
												fileName: _jsxFileName$6,
												lineNumber: 147,
												columnNumber: 23
											}, this),
											/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: [blogReadingTime.words, " words"] }, void 0, true, {
												fileName: _jsxFileName$6,
												lineNumber: 148,
												columnNumber: 23
											}, this)
										]
									}, void 0, true, {
										fileName: _jsxFileName$6,
										lineNumber: 144,
										columnNumber: 21
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
										className: "text-xs text-muted-foreground line-clamp-3 leading-relaxed",
										children: blog.excerpt
									}, void 0, false, {
										fileName: _jsxFileName$6,
										lineNumber: 151,
										columnNumber: 21
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName$6,
								lineNumber: 128,
								columnNumber: 19
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "pt-6 mt-6 border-t border-black/6 flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "text-xs font-semibold text-label group-hover:text-blue flex items-center gap-1.5 transition-colors",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Read Article" }, void 0, false, {
										fileName: _jsxFileName$6,
										lineNumber: 158,
										columnNumber: 23
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ArrowRight, { className: "size-3.5 group-hover:translate-x-1 transition-transform" }, void 0, false, {
										fileName: _jsxFileName$6,
										lineNumber: 159,
										columnNumber: 23
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$6,
									lineNumber: 157,
									columnNumber: 21
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "text-[11px] text-subtle font-mono",
									children: blog.created_at?.slice(0, 10)
								}, void 0, false, {
									fileName: _jsxFileName$6,
									lineNumber: 161,
									columnNumber: 21
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$6,
								lineNumber: 156,
								columnNumber: 19
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$6,
							lineNumber: 124,
							columnNumber: 17
						}, this)
					}, blog.id, false, {
						fileName: _jsxFileName$6,
						lineNumber: 123,
						columnNumber: 15
					}, this);
				})
			}, void 0, false, {
				fileName: _jsxFileName$6,
				lineNumber: 119,
				columnNumber: 9
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName$6,
			lineNumber: 101,
			columnNumber: 7
		}, this), activeArticle && /* @__PURE__ */ (void 0)("div", {
			className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200",
			children: [
				/* @__PURE__ */ (void 0)(ScrollProgress, {
					targetRef: modalContentRef,
					height: "h-1.5",
					color: "bg-blue"
				}, void 0, false, {
					fileName: _jsxFileName$6,
					lineNumber: 174,
					columnNumber: 11
				}, this),
				/* @__PURE__ */ (void 0)(SEO, {
					title: activeArticle.title,
					description: activeArticle.excerpt || activeArticle.title,
					ogType: "article",
					articleSection: activeArticle.category || "Engineering"
				}, void 0, false, {
					fileName: _jsxFileName$6,
					lineNumber: 175,
					columnNumber: 11
				}, this),
				/* @__PURE__ */ (void 0)("div", {
					className: "relative w-full max-w-3xl max-h-[90vh] bg-white rounded-3xl shadow-2xl border border-black/10 overflow-hidden flex flex-col",
					onClick: (e) => e.stopPropagation(),
					children: [
						/* @__PURE__ */ (void 0)("div", {
							className: "p-6 border-b border-black/8 bg-gradient-to-b from-fill-subtle to-white flex items-start justify-between gap-4",
							children: [/* @__PURE__ */ (void 0)("div", {
								className: "space-y-1",
								children: [
									/* @__PURE__ */ (void 0)("div", {
										className: "flex items-center gap-2 text-xs font-semibold text-blue",
										children: [
											/* @__PURE__ */ (void 0)(BookOpen, { className: "size-3.5" }, void 0, false, {
												fileName: _jsxFileName$6,
												lineNumber: 190,
												columnNumber: 19
											}, this),
											/* @__PURE__ */ (void 0)("span", { children: "Codex Dynamics Insights" }, void 0, false, {
												fileName: _jsxFileName$6,
												lineNumber: 191,
												columnNumber: 19
											}, this),
											/* @__PURE__ */ (void 0)("span", { children: "•" }, void 0, false, {
												fileName: _jsxFileName$6,
												lineNumber: 192,
												columnNumber: 19
											}, this),
											/* @__PURE__ */ (void 0)("span", {
												className: "text-muted-foreground font-mono",
												children: calculateReadingTime(activeArticle.content).text
											}, void 0, false, {
												fileName: _jsxFileName$6,
												lineNumber: 193,
												columnNumber: 19
											}, this)
										]
									}, void 0, true, {
										fileName: _jsxFileName$6,
										lineNumber: 189,
										columnNumber: 17
									}, this),
									/* @__PURE__ */ (void 0)("h2", {
										className: "text-xl sm:text-2xl font-bold text-label font-display tracking-tight",
										children: activeArticle.title
									}, void 0, false, {
										fileName: _jsxFileName$6,
										lineNumber: 197,
										columnNumber: 17
									}, this),
									/* @__PURE__ */ (void 0)("div", {
										className: "text-xs text-muted-foreground font-mono flex items-center gap-2 pt-0.5",
										children: [
											/* @__PURE__ */ (void 0)("span", { children: calculateReadingTime(activeArticle.content).text }, void 0, false, {
												fileName: _jsxFileName$6,
												lineNumber: 202,
												columnNumber: 19
											}, this),
											/* @__PURE__ */ (void 0)("span", { children: "•" }, void 0, false, {
												fileName: _jsxFileName$6,
												lineNumber: 203,
												columnNumber: 19
											}, this),
											/* @__PURE__ */ (void 0)("span", { children: [calculateReadingTime(activeArticle.content).words, " words"] }, void 0, true, {
												fileName: _jsxFileName$6,
												lineNumber: 204,
												columnNumber: 19
											}, this),
											/* @__PURE__ */ (void 0)("a", {
												href: `/blog?slug=${activeArticle.slug || activeArticle.id}`,
												target: "_blank",
												rel: "noopener noreferrer",
												className: "ml-2 inline-flex items-center gap-1 text-blue hover:underline font-sans text-xs",
												children: [/* @__PURE__ */ (void 0)("span", { children: "Open standalone page" }, void 0, false, {
													fileName: _jsxFileName$6,
													lineNumber: 211,
													columnNumber: 21
												}, this), /* @__PURE__ */ (void 0)(ExternalLink, { className: "size-3" }, void 0, false, {
													fileName: _jsxFileName$6,
													lineNumber: 212,
													columnNumber: 21
												}, this)]
											}, void 0, true, {
												fileName: _jsxFileName$6,
												lineNumber: 205,
												columnNumber: 19
											}, this)
										]
									}, void 0, true, {
										fileName: _jsxFileName$6,
										lineNumber: 201,
										columnNumber: 17
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName$6,
								lineNumber: 188,
								columnNumber: 15
							}, this), /* @__PURE__ */ (void 0)("button", {
								type: "button",
								onClick: () => setActiveArticle(null),
								className: "p-2 rounded-full text-subtle hover:text-label hover:bg-black/5 transition-colors cursor-pointer",
								children: /* @__PURE__ */ (void 0)(X, { className: "size-5" }, void 0, false, {
									fileName: _jsxFileName$6,
									lineNumber: 222,
									columnNumber: 17
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName$6,
								lineNumber: 217,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$6,
							lineNumber: 187,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (void 0)("div", {
							ref: modalContentRef,
							className: "p-6 sm:p-8 overflow-y-auto flex-1 space-y-6 text-sm text-label leading-relaxed",
							children: [
								/* @__PURE__ */ (void 0)("div", {
									className: "p-4 rounded-2xl bg-blue/5 border border-blue/15 text-xs text-muted-foreground flex items-center gap-2.5",
									children: [/* @__PURE__ */ (void 0)(Sparkles, { className: "size-4 text-blue shrink-0" }, void 0, false, {
										fileName: _jsxFileName$6,
										lineNumber: 232,
										columnNumber: 17
									}, this), /* @__PURE__ */ (void 0)("span", { children: [
										/* @__PURE__ */ (void 0)("strong", { children: "Executive Summary:" }, void 0, false, {
											fileName: _jsxFileName$6,
											lineNumber: 234,
											columnNumber: 19
										}, this),
										" ",
										activeArticle.excerpt
									] }, void 0, true, {
										fileName: _jsxFileName$6,
										lineNumber: 233,
										columnNumber: 17
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$6,
									lineNumber: 231,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ (void 0)("div", {
									className: "whitespace-pre-line text-sm text-muted-foreground space-y-4 leading-relaxed font-sans",
									children: activeArticle.content
								}, void 0, false, {
									fileName: _jsxFileName$6,
									lineNumber: 238,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ (void 0)("div", {
									className: "mt-8 p-6 rounded-2xl bg-gradient-to-br from-fill-subtle via-white to-blue/5 border border-black/8 space-y-4",
									children: [
										/* @__PURE__ */ (void 0)("div", {
											className: "flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue",
											children: [/* @__PURE__ */ (void 0)(Mail, { className: "size-4" }, void 0, false, {
												fileName: _jsxFileName$6,
												lineNumber: 245,
												columnNumber: 19
											}, this), /* @__PURE__ */ (void 0)("span", { children: "Subscribe to Technical Briefings" }, void 0, false, {
												fileName: _jsxFileName$6,
												lineNumber: 246,
												columnNumber: 19
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName$6,
											lineNumber: 244,
											columnNumber: 17
										}, this),
										/* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("h4", {
											className: "text-base font-bold text-label font-display",
											children: "Want deeper architectural breakdowns like this?"
										}, void 0, false, {
											fileName: _jsxFileName$6,
											lineNumber: 250,
											columnNumber: 19
										}, this), /* @__PURE__ */ (void 0)("p", {
											className: "text-xs text-muted-foreground mt-0.5",
											children: "Join founders and VP Engineers receiving our monthly private analysis of high-conversion design systems."
										}, void 0, false, {
											fileName: _jsxFileName$6,
											lineNumber: 253,
											columnNumber: 19
										}, this)] }, void 0, true, {
											fileName: _jsxFileName$6,
											lineNumber: 249,
											columnNumber: 17
										}, this),
										isSubscribed ? /* @__PURE__ */ (void 0)("div", {
											className: "p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2",
											children: [/* @__PURE__ */ (void 0)(CircleCheck, { className: "size-4 text-emerald-600" }, void 0, false, {
												fileName: _jsxFileName$6,
												lineNumber: 260,
												columnNumber: 21
											}, this), /* @__PURE__ */ (void 0)("span", { children: "You're subscribed! We've added you to our engineering pipeline." }, void 0, false, {
												fileName: _jsxFileName$6,
												lineNumber: 261,
												columnNumber: 21
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName$6,
											lineNumber: 259,
											columnNumber: 19
										}, this) : /* @__PURE__ */ (void 0)("form", {
											onSubmit: handleSubscribe,
											className: "space-y-3",
											children: [/* @__PURE__ */ (void 0)("div", {
												className: "grid grid-cols-1 sm:grid-cols-2 gap-2.5",
												children: [/* @__PURE__ */ (void 0)("input", {
													type: "text",
													value: readerName,
													onChange: (e) => setReaderName(e.target.value),
													placeholder: "Your Name (Optional)",
													className: "px-3.5 py-2.5 text-xs bg-white border border-black/15 rounded-xl focus:border-blue outline-none"
												}, void 0, false, {
													fileName: _jsxFileName$6,
													lineNumber: 266,
													columnNumber: 23
												}, this), /* @__PURE__ */ (void 0)("input", {
													type: "email",
													required: true,
													value: readerEmail,
													onChange: (e) => setReaderEmail(e.target.value),
													placeholder: "Work Email *",
													className: "px-3.5 py-2.5 text-xs bg-white border border-black/15 rounded-xl focus:border-blue outline-none"
												}, void 0, false, {
													fileName: _jsxFileName$6,
													lineNumber: 273,
													columnNumber: 23
												}, this)]
											}, void 0, true, {
												fileName: _jsxFileName$6,
												lineNumber: 265,
												columnNumber: 21
											}, this), /* @__PURE__ */ (void 0)("div", {
												className: "flex items-center justify-between gap-3 pt-1",
												children: [/* @__PURE__ */ (void 0)("div", {
													className: "flex items-center gap-1.5 text-[11px] text-subtle",
													children: [/* @__PURE__ */ (void 0)(ShieldCheck, { className: "size-3 text-emerald-600" }, void 0, false, {
														fileName: _jsxFileName$6,
														lineNumber: 285,
														columnNumber: 25
													}, this), /* @__PURE__ */ (void 0)("span", { children: "No spam. Strict privacy guarantee." }, void 0, false, {
														fileName: _jsxFileName$6,
														lineNumber: 286,
														columnNumber: 25
													}, this)]
												}, void 0, true, {
													fileName: _jsxFileName$6,
													lineNumber: 284,
													columnNumber: 23
												}, this), /* @__PURE__ */ (void 0)("button", {
													type: "submit",
													disabled: isSubscribing,
													className: "inline-flex items-center gap-2 px-5 py-2 rounded-full bg-blue hover:bg-blue-700 text-white text-xs font-semibold shadow-sm transition-all cursor-pointer disabled:opacity-50",
													children: [/* @__PURE__ */ (void 0)(Mail, { className: "size-3.5" }, void 0, false, {
														fileName: _jsxFileName$6,
														lineNumber: 294,
														columnNumber: 25
													}, this), /* @__PURE__ */ (void 0)("span", { children: isSubscribing ? "Joining..." : "Join Private Digest" }, void 0, false, {
														fileName: _jsxFileName$6,
														lineNumber: 295,
														columnNumber: 25
													}, this)]
												}, void 0, true, {
													fileName: _jsxFileName$6,
													lineNumber: 289,
													columnNumber: 23
												}, this)]
											}, void 0, true, {
												fileName: _jsxFileName$6,
												lineNumber: 283,
												columnNumber: 21
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName$6,
											lineNumber: 264,
											columnNumber: 19
										}, this)
									]
								}, void 0, true, {
									fileName: _jsxFileName$6,
									lineNumber: 243,
									columnNumber: 15
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName$6,
							lineNumber: 227,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (void 0)("div", {
							className: "p-4 px-6 border-t border-black/8 bg-fill-subtle/30 flex items-center justify-between",
							children: [/* @__PURE__ */ (void 0)("span", {
								className: "text-xs text-subtle",
								children: "Published by Codex Dynamics Research"
							}, void 0, false, {
								fileName: _jsxFileName$6,
								lineNumber: 305,
								columnNumber: 15
							}, this), /* @__PURE__ */ (void 0)("button", {
								type: "button",
								onClick: () => setActiveArticle(null),
								className: "px-4 py-1.5 rounded-full border border-black/10 text-xs font-medium text-label hover:bg-black/5 transition-colors cursor-pointer",
								children: "Close Article"
							}, void 0, false, {
								fileName: _jsxFileName$6,
								lineNumber: 306,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$6,
							lineNumber: 304,
							columnNumber: 13
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName$6,
					lineNumber: 182,
					columnNumber: 11
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName$6,
			lineNumber: 172,
			columnNumber: 9
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName$6,
		lineNumber: 100,
		columnNumber: 5
	}, this);
}
var _jsxFileName$5 = "/app/applet/src/components/Contact.tsx";
var emptyForm = {
	name: "",
	phone: "",
	email: "",
	company: "",
	budget: "",
	timeline: "",
	service: "",
	message: ""
};
function isJsonResponse(res) {
	return (res.headers.get("content-type") ?? "").includes("application/json");
}
async function postCrmLead(data) {
	try {
		const res = await fetch("/api/crm/leads", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json"
			},
			body: JSON.stringify({
				kind: "enquiry",
				...data,
				source: "website_contact_form"
			})
		});
		if (!res.ok || !isJsonResponse(res)) return "unavailable";
		return (await res.json()).ok ? "sent" : "rejected";
	} catch {
		return "unavailable";
	}
}
async function postFormSubmit(data, recipientEmail) {
	try {
		const targetEmail = recipientEmail || CONTACT.email;
		const res = await fetch(`https://formsubmit.co/ajax/${targetEmail}`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json"
			},
			body: JSON.stringify({
				name: data.name,
				phone: data.phone,
				email: data.email,
				message: data.message,
				_subject: `New inquiry from ${data.name} — Codex Dynamics`,
				_template: "table",
				_replyto: data.email,
				_captcha: "false"
			})
		});
		if (!res.ok) return false;
		const body = await res.json().catch(() => null);
		if (!body) return false;
		if (body.success === true || body.success === "true") return true;
		return /activat/i.test(String(body.message ?? ""));
	} catch {
		return false;
	}
}
function persistInquiry(data) {
	try {
		const raw = localStorage.getItem("codex-inquiries");
		const prior = raw ? JSON.parse(raw) : [];
		localStorage.setItem("codex-inquiries", JSON.stringify([...prior, {
			...data,
			at: (/* @__PURE__ */ new Date()).toISOString()
		}]));
	} catch {}
}
function Contact() {
	const { config, socialsGrouped, primaryPhone, primaryWhatsApp, primaryTelegram, primaryViber, primaryEmail, primaryAddress } = useSiteConfig();
	const recipientEmail = config.formSubmitEmail || primaryEmail?.value || CONTACT.email;
	const phoneVal = primaryPhone?.value || CONTACT.phoneDisplay;
	const phoneRaw = primaryPhone?.value?.replace(/[^\d+]/g, "") || CONTACT.phoneE164;
	const phoneHref = primaryPhone?.href || `tel:${phoneRaw}`;
	const currentAddress = primaryAddress || {
		id: "addr-default",
		label: "Kyiv Office",
		city: "Kyiv",
		street: CONTACT.addressStreet,
		fullAddress: CONTACT.addressFull,
		lat: 50.4385,
		lng: 30.5235
	};
	const whatsappUrl = primaryWhatsApp?.href || LINKS.whatsapp;
	const telegramUrl = primaryTelegram?.href || LINKS.telegram;
	const viberUrl = primaryViber?.href || LINKS.viber;
	const instagramUrl = socialsGrouped.instagram?.[0]?.href || LINKS.instagram;
	const facebookUrl = socialsGrouped.facebook?.[0]?.href || LINKS.facebook;
	const actionList = [
		{
			href: whatsappUrl,
			label: "WhatsApp",
			hint: "WhatsApp",
			Logo: WhatsAppLogo,
			external: true
		},
		{
			href: telegramUrl,
			label: "Telegram",
			hint: "Telegram",
			Logo: TelegramLogo,
			external: true
		},
		{
			href: viberUrl,
			label: "Viber",
			hint: "Viber",
			Logo: ViberLogo,
			external: true
		},
		{
			href: phoneHref,
			label: "Call",
			hint: "Call",
			Logo: PhoneLogo,
			external: false
		},
		{
			href: `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(recipientEmail)}`,
			label: "Gmail",
			hint: "Gmail",
			Logo: GmailLogo,
			external: true
		}
	];
	const [formData, setFormData] = (0, import_react.useState)(emptyForm);
	const [isSubmitting, setIsSubmitting] = (0, import_react.useState)(false);
	const [live, setLive] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		setLive(true);
		if (new URLSearchParams(window.location.search).get("sent") === "1") toast.success("Message sent. We'll be in touch within a day.");
	}, []);
	const handleSubmit = async (e) => {
		e.preventDefault();
		const extraNotes = [formData.company ? `Company: ${formData.company}` : null, formData.service ? `Service: ${formData.service}` : null].filter(Boolean).join(" | ");
		const finalMessage = extraNotes ? `[${extraNotes}]\n\n${formData.message.trim()}` : formData.message.trim();
		const data = {
			name: formData.name.trim(),
			phone: formData.phone.trim(),
			email: formData.email.trim(),
			company: formData.company?.trim(),
			service: formData.service?.trim(),
			message: finalMessage
		};
		if (!data.name || !data.email || !data.message) {
			toast.error("Please fill in every field.");
			return;
		}
		setIsSubmitting(true);
		try {
			if (!(await fetch("/api/crm/leads", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					kind: "enquiry",
					name: data.name,
					email: data.email,
					phone: data.phone,
					company: data.company,
					message: data.message,
					source: "website_contact_form"
				})
			})).ok) throw new Error("Lead capture failed");
			const capture = await postCrmLead(data);
			if (capture === "rejected") {
				toast.error(`Could not send. Email us at ${recipientEmail} or WhatsApp ${phoneVal}.`);
				return;
			}
			if (capture !== "sent") await postFormSubmit(data, recipientEmail);
			persistInquiry(data);
			toast.success("Message sent. We'll be in touch within a day.");
			setFormData(emptyForm);
		} catch {
			toast.error(`Could not send. Email us at ${recipientEmail} or WhatsApp ${phoneVal}.`);
		} finally {
			setIsSubmitting(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", {
		id: "contact",
		"aria-label": "Contact",
		className: "scroll-mt-24 bg-fill-elevated py-16 sm:py-24",
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "shell",
			children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Reveal, { children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "mb-4 text-xs font-medium tracking-[0.22em] text-subtle uppercase",
						children: config.contact?.badge || "Contact"
					}, void 0, false, {
						fileName: _jsxFileName$5,
						lineNumber: 228,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
						className: "max-w-3xl text-4xl font-semibold tracking-tight text-label sm:text-5xl lg:text-6xl",
						children: config.contact?.title || "One number. Every channel."
					}, void 0, false, {
						fileName: _jsxFileName$5,
						lineNumber: 231,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground",
						children: config.contact?.subtitle || "WhatsApp, Telegram, Viber, calls — same line. Write us, or visit our office."
					}, void 0, false, {
						fileName: _jsxFileName$5,
						lineNumber: 234,
						columnNumber: 11
					}, this)
				] }, void 0, true, {
					fileName: _jsxFileName$5,
					lineNumber: 227,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "mt-12 grid items-start gap-6 lg:grid-cols-2 lg:gap-8",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Reveal, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("article", {
						className: "surface-lift flex flex-col overflow-hidden rounded-xl bg-card",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex flex-col items-center px-6 pt-6 pb-5 text-center",
							children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "flex size-14 items-center justify-center rounded-2xl bg-blue text-xl font-semibold text-paper shadow-[inset_0_0.5px_0_rgb(255_255_255_/_0.35)]",
									children: config.siteName?.[0] || CONTACT.name[0] || "C"
								}, void 0, false, {
									fileName: _jsxFileName$5,
									lineNumber: 243,
									columnNumber: 17
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
									className: "mt-3.5 text-xl font-semibold tracking-tight text-label",
									children: config.siteName || CONTACT.name
								}, void 0, false, {
									fileName: _jsxFileName$5,
									lineNumber: 246,
									columnNumber: 17
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
									className: "mt-1 text-sm text-muted-foreground",
									children: [
										currentAddress.city,
										" office · ",
										currentAddress.street
									]
								}, void 0, true, {
									fileName: _jsxFileName$5,
									lineNumber: 249,
									columnNumber: 17
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName$5,
							lineNumber: 242,
							columnNumber: 15
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "grid grid-cols-5 gap-1 border-t border-hairline px-3 py-4 sm:px-5",
							children: actionList.map((action) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", {
								href: action.href,
								...action.external ? {
									target: "_blank",
									rel: "noopener noreferrer"
								} : {},
								className: "flex flex-col items-center gap-1.5 rounded-xl py-2 transition-colors duration-150 hover:bg-fill",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(action.Logo, { className: "size-9 sm:size-10" }, void 0, false, {
									fileName: _jsxFileName$5,
									lineNumber: 265,
									columnNumber: 23
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "text-[10px] font-medium tracking-wide text-label sm:text-[11px]",
									children: action.hint
								}, void 0, false, {
									fileName: _jsxFileName$5,
									lineNumber: 266,
									columnNumber: 23
								}, this)]
							}, action.label, true, {
								fileName: _jsxFileName$5,
								lineNumber: 257,
								columnNumber: 21
							}, this))
						}, void 0, false, {
							fileName: _jsxFileName$5,
							lineNumber: 255,
							columnNumber: 17
						}, this), (instagramUrl || facebookUrl || socialsGrouped.custom && socialsGrouped.custom.length > 0) && /* @__PURE__ */ (void 0)("div", {
							className: "flex flex-wrap items-center justify-center gap-3 border-t border-hairline px-5 py-3 bg-card",
							children: [
								instagramUrl && /* @__PURE__ */ (void 0)("a", {
									href: instagramUrl,
									target: "_blank",
									rel: "noopener noreferrer",
									"aria-label": "Instagram",
									className: "transition-transform duration-150 hover:scale-105",
									children: /* @__PURE__ */ (void 0)(InstagramLogo, { className: "size-8" }, void 0, false, {
										fileName: _jsxFileName$5,
										lineNumber: 283,
										columnNumber: 25
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName$5,
									lineNumber: 276,
									columnNumber: 23
								}, this),
								facebookUrl && /* @__PURE__ */ (void 0)("a", {
									href: facebookUrl,
									target: "_blank",
									rel: "noopener noreferrer",
									"aria-label": "Facebook",
									className: "transition-transform duration-150 hover:scale-105",
									children: /* @__PURE__ */ (void 0)(FacebookLogo, { className: "size-8" }, void 0, false, {
										fileName: _jsxFileName$5,
										lineNumber: 294,
										columnNumber: 25
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName$5,
									lineNumber: 287,
									columnNumber: 23
								}, this),
								socialsGrouped.custom?.map((s, idx) => /* @__PURE__ */ (void 0)("a", {
									href: s.href || s.value,
									target: "_blank",
									rel: "noopener noreferrer",
									className: "rounded-full bg-muted px-3 py-1 text-xs font-medium text-label hover:bg-fill transition-colors",
									children: s.label || "Link"
								}, idx, false, {
									fileName: _jsxFileName$5,
									lineNumber: 298,
									columnNumber: 23
								}, this))
							]
						}, void 0, true, {
							fileName: _jsxFileName$5,
							lineNumber: 274,
							columnNumber: 19
						}, this)] }, void 0, true, {
							fileName: _jsxFileName$5,
							lineNumber: 254,
							columnNumber: 15
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$5,
						lineNumber: 241,
						columnNumber: 13
					}, this) }, void 0, false, {
						fileName: _jsxFileName$5,
						lineNumber: 240,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Reveal, {
						delay: 80,
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "surface-lift flex flex-col justify-between overflow-hidden rounded-xl bg-card",
							children: live ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("form", {
								action: "/api/crm/leads",
								method: "post",
								onSubmit: handleSubmit,
								className: "p-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
										type: "text",
										name: "website",
										tabIndex: -1,
										autoComplete: "off",
										className: "absolute -left-[9999px] h-0 w-0 opacity-0",
										"aria-hidden": "true"
									}, void 0, false, {
										fileName: _jsxFileName$5,
										lineNumber: 323,
										columnNumber: 19
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "divide-y divide-hairline rounded-lg bg-fill",
										children: [
											/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
												className: "block px-5 py-4",
												children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
													className: "mb-1.5 block text-xs font-medium tracking-wide text-subtle uppercase",
													children: "Name"
												}, void 0, false, {
													fileName: _jsxFileName$5,
													lineNumber: 333,
													columnNumber: 23
												}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
													id: "name",
													name: "name",
													type: "text",
													maxLength: 100,
													value: formData.name,
													onChange: (e) => setFormData((prev) => ({
														...prev,
														name: e.target.value
													})),
													className: "w-full bg-transparent text-base text-label outline-none placeholder:text-subtle",
													placeholder: "Your name",
													autoComplete: "name",
													required: true
												}, void 0, false, {
													fileName: _jsxFileName$5,
													lineNumber: 336,
													columnNumber: 23
												}, this)]
											}, void 0, true, {
												fileName: _jsxFileName$5,
												lineNumber: 332,
												columnNumber: 21
											}, this),
											/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
												className: "block px-5 py-4",
												children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
													className: "mb-1.5 block text-xs font-medium tracking-wide text-subtle uppercase",
													children: "Phone"
												}, void 0, false, {
													fileName: _jsxFileName$5,
													lineNumber: 355,
													columnNumber: 23
												}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
													id: "phone",
													name: "phone",
													type: "tel",
													inputMode: "tel",
													maxLength: 40,
													value: formData.phone,
													onChange: (e) => setFormData((prev) => ({
														...prev,
														phone: e.target.value
													})),
													className: "w-full bg-transparent text-base text-label outline-none placeholder:text-subtle",
													placeholder: "+1 (555) 000-0000",
													autoComplete: "tel"
												}, void 0, false, {
													fileName: _jsxFileName$5,
													lineNumber: 358,
													columnNumber: 23
												}, this)]
											}, void 0, true, {
												fileName: _jsxFileName$5,
												lineNumber: 354,
												columnNumber: 21
											}, this),
											/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
												className: "block px-5 py-4",
												children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
													className: "mb-1.5 block text-xs font-medium tracking-wide text-subtle uppercase",
													children: "Email"
												}, void 0, false, {
													fileName: _jsxFileName$5,
													lineNumber: 377,
													columnNumber: 23
												}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
													id: "email",
													name: "email",
													type: "email",
													maxLength: 255,
													value: formData.email,
													onChange: (e) => setFormData((prev) => ({
														...prev,
														email: e.target.value
													})),
													className: "w-full bg-transparent text-base text-label outline-none placeholder:text-subtle",
													placeholder: "you@company.com",
													autoComplete: "email",
													required: true
												}, void 0, false, {
													fileName: _jsxFileName$5,
													lineNumber: 380,
													columnNumber: 23
												}, this)]
											}, void 0, true, {
												fileName: _jsxFileName$5,
												lineNumber: 376,
												columnNumber: 21
											}, this),
											config.contactForm?.showCompany !== false && /* @__PURE__ */ (void 0)("label", {
												className: "block px-5 py-4",
												children: [/* @__PURE__ */ (void 0)("span", {
													className: "mb-1.5 block text-xs font-medium tracking-wide text-subtle uppercase",
													children: "Company / Brand (Optional)"
												}, void 0, false, {
													fileName: _jsxFileName$5,
													lineNumber: 401,
													columnNumber: 25
												}, this), /* @__PURE__ */ (void 0)("input", {
													id: "company",
													name: "company",
													type: "text",
													maxLength: 120,
													value: formData.company || "",
													onChange: (e) => setFormData((prev) => ({
														...prev,
														company: e.target.value
													})),
													className: "w-full bg-transparent text-base text-label outline-none placeholder:text-subtle",
													placeholder: "e.g. Acme Corp or Retail Brand"
												}, void 0, false, {
													fileName: _jsxFileName$5,
													lineNumber: 404,
													columnNumber: 25
												}, this)]
											}, void 0, true, {
												fileName: _jsxFileName$5,
												lineNumber: 400,
												columnNumber: 23
											}, this),
											config.contactForm?.showServiceSelect !== false && /* @__PURE__ */ (void 0)("label", {
												className: "block px-5 py-4",
												children: [/* @__PURE__ */ (void 0)("span", {
													className: "mb-1.5 block text-xs font-medium tracking-wide text-subtle uppercase",
													children: "Service Needed"
												}, void 0, false, {
													fileName: _jsxFileName$5,
													lineNumber: 424,
													columnNumber: 25
												}, this), /* @__PURE__ */ (void 0)("select", {
													id: "service",
													name: "service",
													value: formData.service || "",
													onChange: (e) => setFormData((prev) => ({
														...prev,
														service: e.target.value
													})),
													className: "w-full bg-transparent text-base text-label outline-none",
													children: [
														/* @__PURE__ */ (void 0)("option", {
															value: "",
															children: "Select a service focus..."
														}, void 0, false, {
															fileName: _jsxFileName$5,
															lineNumber: 439,
															columnNumber: 27
														}, this),
														/* @__PURE__ */ (void 0)("option", {
															value: "Custom Web Development & Storefronts",
															children: "Custom Web Development & Storefronts"
														}, void 0, false, {
															fileName: _jsxFileName$5,
															lineNumber: 440,
															columnNumber: 27
														}, this),
														/* @__PURE__ */ (void 0)("option", {
															value: "Bespoke CRM & VoIP Calling Desks",
															children: "Bespoke CRM & VoIP Calling Desks"
														}, void 0, false, {
															fileName: _jsxFileName$5,
															lineNumber: 441,
															columnNumber: 27
														}, this),
														/* @__PURE__ */ (void 0)("option", {
															value: "Paid Ad Campaigns & Acquisition",
															children: "Paid Ad Campaigns & Acquisition"
														}, void 0, false, {
															fileName: _jsxFileName$5,
															lineNumber: 442,
															columnNumber: 27
														}, this),
														/* @__PURE__ */ (void 0)("option", {
															value: "Email Marketing & Automation Flows",
															children: "Email Marketing & Automation Flows"
														}, void 0, false, {
															fileName: _jsxFileName$5,
															lineNumber: 443,
															columnNumber: 27
														}, this),
														/* @__PURE__ */ (void 0)("option", {
															value: "Brand Identity & Web Systems",
															children: "Brand Identity & Web Systems"
														}, void 0, false, {
															fileName: _jsxFileName$5,
															lineNumber: 444,
															columnNumber: 27
														}, this)
													]
												}, void 0, true, {
													fileName: _jsxFileName$5,
													lineNumber: 427,
													columnNumber: 25
												}, this)]
											}, void 0, true, {
												fileName: _jsxFileName$5,
												lineNumber: 423,
												columnNumber: 23
											}, this),
											/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
												className: "block px-5 py-4",
												children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
													className: "mb-1.5 block text-xs font-medium tracking-wide text-subtle uppercase",
													children: "Message"
												}, void 0, false, {
													fileName: _jsxFileName$5,
													lineNumber: 450,
													columnNumber: 23
												}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("textarea", {
													id: "message",
													name: "message",
													rows: 5,
													maxLength: 1e3,
													value: formData.message,
													onChange: (e) => setFormData((prev) => ({
														...prev,
														message: e.target.value
													})),
													className: "w-full resize-none bg-transparent text-base text-label outline-none placeholder:text-subtle",
													placeholder: "Site rebuild, new brand, social campaigns — what's the job?",
													required: true
												}, void 0, false, {
													fileName: _jsxFileName$5,
													lineNumber: 453,
													columnNumber: 23
												}, this)]
											}, void 0, true, {
												fileName: _jsxFileName$5,
												lineNumber: 449,
												columnNumber: 21
											}, this)
										]
									}, void 0, true, {
										fileName: _jsxFileName$5,
										lineNumber: 331,
										columnNumber: 19
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "p-4",
										children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
											type: "submit",
											disabled: isSubmitting,
											className: "w-full",
											size: "lg",
											children: isSubmitting ? "Sending…" : "Send message"
										}, void 0, false, {
											fileName: _jsxFileName$5,
											lineNumber: 472,
											columnNumber: 21
										}, this)
									}, void 0, false, {
										fileName: _jsxFileName$5,
										lineNumber: 471,
										columnNumber: 19
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName$5,
								lineNumber: 317,
								columnNumber: 17
							}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "h-96",
								"aria-hidden": "true"
							}, void 0, false, {
								fileName: _jsxFileName$5,
								lineNumber: 483,
								columnNumber: 17
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName$5,
							lineNumber: 315,
							columnNumber: 13
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName$5,
						lineNumber: 314,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$5,
					lineNumber: 239,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Reveal, {
					delay: 100,
					className: "mt-6",
					children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("article", {
						className: "map-frame surface-lift relative overflow-hidden rounded-xl bg-muted",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("iframe", {
							title: "Codex Dynamics office — Sportyvna, 1A, Kyiv",
							src: LINKS.mapsEmbed,
							className: "relative z-10 h-[22rem] w-full border-0 sm:h-[28rem]",
							loading: "lazy",
							referrerPolicy: "no-referrer-when-downgrade",
							allowFullScreen: true
						}, void 0, false, {
							fileName: _jsxFileName$5,
							lineNumber: 491,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "map-card pointer-events-auto absolute bottom-4 right-4 z-20 max-w-[min(calc(100%-2rem),22rem)] rounded-xl p-4 sm:bottom-5 sm:right-5",
							children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
									className: "text-[11px] font-medium tracking-[0.18em] text-subtle uppercase",
									children: "Kyiv Office"
								}, void 0, false, {
									fileName: _jsxFileName$5,
									lineNumber: 500,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
									className: "mt-1 text-lg font-semibold tracking-tight text-label",
									children: CONTACT.addressStreet
								}, void 0, false, {
									fileName: _jsxFileName$5,
									lineNumber: 503,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
									className: "text-sm text-muted-foreground",
									children: CONTACT.addressCity
								}, void 0, false, {
									fileName: _jsxFileName$5,
									lineNumber: 506,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "mt-4 flex flex-wrap gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", {
										href: LINKS.mapsDirections,
										target: "_blank",
										rel: "noopener noreferrer",
										className: "inline-flex min-h-10 items-center rounded-full bg-blue px-4 text-sm font-medium text-paper hover:bg-blue-hover",
										children: "Directions"
									}, void 0, false, {
										fileName: _jsxFileName$5,
										lineNumber: 510,
										columnNumber: 17
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", {
										href: LINKS.mapsApple,
										target: "_blank",
										rel: "noopener noreferrer",
										className: "inline-flex min-h-10 items-center rounded-full bg-fill px-4 text-sm font-medium text-label hover:bg-muted",
										children: "Apple Maps"
									}, void 0, false, {
										fileName: _jsxFileName$5,
										lineNumber: 518,
										columnNumber: 17
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$5,
									lineNumber: 509,
									columnNumber: 15
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName$5,
							lineNumber: 499,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$5,
						lineNumber: 490,
						columnNumber: 11
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName$5,
					lineNumber: 489,
					columnNumber: 9
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName$5,
			lineNumber: 226,
			columnNumber: 7
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName$5,
		lineNumber: 221,
		columnNumber: 5
	}, this);
}
var _jsxFileName$4 = "/app/applet/src/components/WhatsAppDock.tsx";
function WhatsAppDock() {
	const [open, setOpen] = (0, import_react.useState)(false);
	const [isTidioOpen, setIsTidioOpen] = (0, import_react.useState)(false);
	const { config, primaryPhone, primaryEmail, primaryWhatsApp, primaryTelegram, primaryViber, socialsGrouped } = useSiteConfig();
	(0, import_react.useEffect)(() => {
		if (typeof window === "undefined" || typeof document === "undefined") return;
		const handleOpen = () => {
			setIsTidioOpen(true);
			setOpen(false);
		};
		const handleClose = () => {
			setIsTidioOpen(false);
		};
		const handleStatus = (e) => {
			const custom = e;
			if (typeof custom.detail?.isOpen === "boolean") {
				setIsTidioOpen(custom.detail.isOpen);
				if (custom.detail.isOpen) setOpen(false);
			}
		};
		window.addEventListener("tidio-chat-open", handleOpen);
		window.addEventListener("tidio-chat-close", handleClose);
		window.addEventListener("tidio-chat-status", handleStatus);
		document.addEventListener("tidioChat-open", handleOpen);
		document.addEventListener("tidioChat-close", handleClose);
		const evaluateTidioState = () => {
			const isOpenViaClass = document.body.classList.contains("tidio-chat-is-open") || document.documentElement.classList.contains("tidio-chat-is-open");
			let isOpenViaDom = false;
			const tidioHost = document.getElementById("tidio-chat");
			if (tidioHost) {
				const shadow = tidioHost.shadowRoot;
				if (shadow) {
					if (!shadow.querySelector(".chat-closed")) {
						const chatWindow = shadow.querySelector(".chat-open, [class*='chatWindow'], [class*='conversationContainer'], [role='dialog'], textarea, [contenteditable='true']");
						if (chatWindow) {
							const r = chatWindow.getBoundingClientRect();
							if (r.height > 250 && r.width > 220) isOpenViaDom = true;
						}
					}
				}
				if (tidioHost.classList.contains("chat-open") || tidioHost.getAttribute("data-state") === "open") isOpenViaDom = true;
			}
			const iframe = document.getElementById("tidio-chat-iframe") || document.querySelector("#tidio-chat iframe") || document.querySelector("iframe[src*='tidio']");
			if (iframe && iframe.id !== "tidio-chat-code") {
				const r = iframe.getBoundingClientRect();
				if (r.height > 380 && r.width > 280) isOpenViaDom = true;
			}
			const isCurrentlyOpen = isOpenViaClass || isOpenViaDom;
			setIsTidioOpen(isCurrentlyOpen);
			if (isCurrentlyOpen) setOpen(false);
		};
		evaluateTidioState();
		const interval = setInterval(evaluateTidioState, 250);
		return () => {
			clearInterval(interval);
			window.removeEventListener("tidio-chat-open", handleOpen);
			window.removeEventListener("tidio-chat-close", handleClose);
			window.removeEventListener("tidio-chat-status", handleStatus);
			document.removeEventListener("tidioChat-open", handleOpen);
			document.removeEventListener("tidioChat-close", handleClose);
		};
	}, []);
	(0, import_react.useEffect)(() => {
		if (!open) return;
		const handleKeyDown = (e) => {
			if (e.key === "Escape") setOpen(false);
		};
		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, [open]);
	const waConfig = config.whatsapp;
	if (waConfig && waConfig.enabled === false) return null;
	const tidio = config.tidio;
	const isTidioActive = Boolean(tidio?.enabled !== false);
	const isLeft = waConfig?.position === "bottom-left";
	const tidioIsLeft = tidio?.position === "bottom-left";
	const sameCorner = isLeft && tidioIsLeft || !isLeft && !tidioIsLeft;
	const isAdmin = typeof window !== "undefined" && window.location.pathname.startsWith("/admin");
	const shouldOffset = isTidioActive && !(isAdmin && tidio?.disableOnAdmin) && sameCorner;
	const rawPhone = (waConfig?.number || primaryWhatsApp?.value || "+380636406783").replace(/[^\d]/g, "");
	const defaultMsg = waConfig?.defaultMessage || "";
	const whatsappHref = `https://wa.me/${rawPhone}${defaultMsg ? `?text=${encodeURIComponent(defaultMsg)}` : ""}`;
	const showExtras = waConfig?.showExtraChannels !== false;
	const recipientEmail = config.formSubmitEmail || primaryEmail?.value || "hello@codexdynamics.com";
	const telegramHref = primaryTelegram?.href || LINKS.telegram;
	const viberHref = primaryViber?.href || LINKS.viber;
	const phoneHref = primaryPhone?.href || LINKS.tel;
	const instagramHref = socialsGrouped.instagram?.[0]?.href || LINKS.instagram;
	const facebookHref = socialsGrouped.facebook?.[0]?.href || LINKS.facebook;
	const extras = [
		{
			href: telegramHref,
			label: "Telegram",
			Logo: TelegramLogo,
			external: true
		},
		{
			href: viberHref,
			label: "Viber",
			Logo: ViberLogo,
			external: true
		},
		{
			href: phoneHref,
			label: "Call",
			Logo: PhoneLogo,
			external: false
		},
		{
			href: `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(recipientEmail)}`,
			label: "Gmail",
			Logo: GmailLogo,
			external: true
		},
		{
			href: instagramHref,
			label: "Instagram",
			Logo: InstagramLogo,
			external: true
		},
		{
			href: facebookHref,
			label: "Facebook",
			Logo: FacebookLogo,
			external: true
		}
	];
	const isTidioMobileHidden = Boolean(tidio?.hideOnMobile);
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(AnimatePresence, { children: !isTidioOpen && /* @__PURE__ */ (void 0)(motion.div, {
		id: "whatsapp-floating-dock",
		initial: {
			opacity: 0,
			scale: .85,
			y: 14
		},
		animate: {
			opacity: 1,
			scale: 1,
			y: 0
		},
		exit: {
			opacity: 0,
			scale: .85,
			y: 14
		},
		transition: {
			duration: .22,
			ease: [
				.22,
				1,
				.36,
				1
			]
		},
		className: `pointer-events-none fixed whatsapp-dock-container ${shouldOffset ? isLeft ? "left-[calc(22px+env(safe-area-inset-left,0px))] items-start" : "right-[calc(22px+env(safe-area-inset-right,0px))] items-end" : isLeft ? "left-[calc(18px+env(safe-area-inset-left,0px))] items-start" : "right-[calc(18px+env(safe-area-inset-right,0px))] items-end"} ${shouldOffset ? isTidioMobileHidden ? "bottom-[calc(18px+env(safe-area-inset-bottom,0px))] sm:bottom-[calc(118px+env(safe-area-inset-bottom,0px))]" : "bottom-[calc(118px+env(safe-area-inset-bottom,0px))]" : "bottom-[calc(18px+env(safe-area-inset-bottom,0px))]"} z-[2147483630] flex flex-col gap-2.5 transition-all duration-300`,
		style: { zIndex: 2147483630 },
		children: /* @__PURE__ */ (void 0)("div", {
			className: `pointer-events-auto flex flex-col ${isLeft ? "items-start" : "items-end"} gap-2.5`,
			onMouseEnter: () => {
				if (!isTidioOpen) setOpen(true);
			},
			onMouseLeave: () => setOpen(false),
			children: [/* @__PURE__ */ (void 0)(AnimatePresence, { children: open && showExtras && !isTidioOpen ? /* @__PURE__ */ (void 0)(motion.div, {
				initial: {
					opacity: 0,
					y: 10,
					filter: "blur(6px)"
				},
				animate: {
					opacity: 1,
					y: 0,
					filter: "blur(0px)"
				},
				exit: {
					opacity: 0,
					y: 8,
					filter: "blur(4px)"
				},
				transition: {
					duration: .22,
					ease: [
						.22,
						1,
						.36,
						1
					]
				},
				className: `flex flex-col ${isLeft ? "items-start" : "items-end"} gap-2.5`,
				children: extras.map((channel, i) => /* @__PURE__ */ (void 0)(motion.a, {
					href: channel.href,
					..."external" in channel && channel.external === false ? {} : {
						target: "_blank",
						rel: "noopener noreferrer"
					},
					initial: {
						opacity: 0,
						x: isLeft ? -12 : 12
					},
					animate: {
						opacity: 1,
						x: 0
					},
					transition: {
						delay: .03 * i,
						duration: .28
					},
					className: `group flex items-center gap-2.5 ${isLeft ? "flex-row-reverse" : "flex-row"}`,
					"aria-label": channel.label,
					children: [/* @__PURE__ */ (void 0)("span", {
						className: "dock-label rounded-full px-3 py-1 text-[13px] font-medium text-label",
						children: channel.label
					}, void 0, false, {
						fileName: _jsxFileName$4,
						lineNumber: 233,
						columnNumber: 23
					}, this), /* @__PURE__ */ (void 0)("div", {
						className: "flex size-[50px] items-center justify-center",
						children: /* @__PURE__ */ (void 0)(channel.Logo, { className: "size-9 drop-shadow-[0_8px_18px_rgb(0_0_0_/_0.2)]" }, void 0, false, {
							fileName: _jsxFileName$4,
							lineNumber: 237,
							columnNumber: 25
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName$4,
						lineNumber: 236,
						columnNumber: 23
					}, this)]
				}, channel.label, true, {
					fileName: _jsxFileName$4,
					lineNumber: 221,
					columnNumber: 21
				}, this))
			}, "stack", false, {
				fileName: _jsxFileName$4,
				lineNumber: 212,
				columnNumber: 17
			}, this) : null }, void 0, false, {
				fileName: _jsxFileName$4,
				lineNumber: 210,
				columnNumber: 13
			}, this), /* @__PURE__ */ (void 0)("div", {
				className: `flex items-center ${isLeft ? "flex-row-reverse" : "flex-row"}`,
				children: /* @__PURE__ */ (void 0)("a", {
					href: whatsappHref,
					target: "_blank",
					rel: "noopener noreferrer",
					className: "relative flex size-[50px] min-w-[50px] min-h-[50px] w-[50px] h-[50px] items-center justify-center rounded-full transition-transform duration-150 ease-out hover:scale-105 active:scale-[0.96] shadow-[0_6px_20px_rgba(37,211,102,0.38),0_2px_6px_rgba(0,0,0,0.1)]",
					"aria-label": "WhatsApp",
					onFocus: () => {
						if (!isTidioOpen) setOpen(true);
					},
					children: [/* @__PURE__ */ (void 0)(WhatsAppLogo, { className: "size-[50px] w-[50px] h-[50px]" }, void 0, false, {
						fileName: _jsxFileName$4,
						lineNumber: 256,
						columnNumber: 17
					}, this), /* @__PURE__ */ (void 0)("span", {
						className: "wa-pulse",
						"aria-hidden": "true"
					}, void 0, false, {
						fileName: _jsxFileName$4,
						lineNumber: 257,
						columnNumber: 17
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$4,
					lineNumber: 246,
					columnNumber: 15
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName$4,
				lineNumber: 245,
				columnNumber: 13
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName$4,
			lineNumber: 203,
			columnNumber: 11
		}, this)
	}, "whatsapp-dock", false, {
		fileName: _jsxFileName$4,
		lineNumber: 179,
		columnNumber: 9
	}, this) }, void 0, false, {
		fileName: _jsxFileName$4,
		lineNumber: 177,
		columnNumber: 5
	}, this);
}
var _jsxFileName$3 = "/app/applet/src/components/AnnouncementBanner.tsx";
function AnnouncementBanner() {
	const { config } = useSiteConfig();
	const { openContactModal } = useContactModal();
	const [dismissed, setDismissed] = (0, import_react.useState)(false);
	const banner = config.banner;
	(0, import_react.useEffect)(() => {
		if (typeof window !== "undefined") {
			if (sessionStorage.getItem("codex_banner_dismissed") === "true") setDismissed(true);
		}
	}, []);
	if (!banner || !banner.enabled || !banner.text || dismissed) return null;
	const handleDismiss = () => {
		setDismissed(true);
		if (typeof window !== "undefined") sessionStorage.setItem("codex_banner_dismissed", "true");
	};
	const handleCtaClick = (e) => {
		if (banner.ctaUrl === "#contact" || banner.ctaUrl === "contact") {
			e.preventDefault();
			openContactModal();
		}
	};
	const variantClasses = {
		blue: "bg-blue text-white",
		dark: "bg-[#111113] text-[#f5f5f7] border-b border-white/10",
		gradient: "bg-gradient-to-r from-blue via-indigo-600 to-purple-600 text-white",
		amber: "bg-gradient-to-r from-amber-500 to-orange-500 text-white",
		emerald: "bg-gradient-to-r from-emerald-600 to-teal-600 text-white"
	}[banner.styleVariant || "blue"];
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		role: "region",
		"aria-label": "Announcement banner",
		className: `relative z-50 px-4 py-2.5 sm:py-2 text-xs font-medium transition-all ${variantClasses}`,
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "mx-auto flex max-w-7xl items-center justify-between gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "flex-1 flex items-center justify-center sm:justify-center gap-2 text-center text-xs leading-tight",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Sparkles, { className: "size-3.5 shrink-0 opacity-80" }, void 0, false, {
						fileName: _jsxFileName$3,
						lineNumber: 54,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: banner.text }, void 0, false, {
						fileName: _jsxFileName$3,
						lineNumber: 55,
						columnNumber: 11
					}, this),
					banner.ctaText && banner.ctaUrl && /* @__PURE__ */ (void 0)("a", {
						href: banner.ctaUrl,
						onClick: handleCtaClick,
						className: "inline-flex items-center gap-1 font-semibold underline underline-offset-4 hover:opacity-90 transition ml-1 cursor-pointer shrink-0",
						children: [/* @__PURE__ */ (void 0)("span", { children: banner.ctaText }, void 0, false, {
							fileName: _jsxFileName$3,
							lineNumber: 62,
							columnNumber: 15
						}, this), /* @__PURE__ */ (void 0)(ArrowRight, { className: "size-3" }, void 0, false, {
							fileName: _jsxFileName$3,
							lineNumber: 63,
							columnNumber: 15
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$3,
						lineNumber: 57,
						columnNumber: 13
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName$3,
				lineNumber: 53,
				columnNumber: 9
			}, this), banner.closable !== false && /* @__PURE__ */ (void 0)("button", {
				type: "button",
				onClick: handleDismiss,
				"aria-label": "Dismiss banner",
				className: "p-1 rounded-md hover:bg-black/15 transition cursor-pointer shrink-0 opacity-80 hover:opacity-100",
				children: /* @__PURE__ */ (void 0)(X, { className: "size-3.5" }, void 0, false, {
					fileName: _jsxFileName$3,
					lineNumber: 75,
					columnNumber: 13
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName$3,
				lineNumber: 69,
				columnNumber: 11
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName$3,
			lineNumber: 52,
			columnNumber: 7
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName$3,
		lineNumber: 47,
		columnNumber: 5
	}, this);
}
var _jsxFileName$2 = "/app/applet/src/components/MaintenanceScreen.tsx";
function MaintenanceScreen() {
	const { config } = useSiteConfig();
	const emergency = config.emergency;
	const [notifyEmail, setNotifyEmail] = (0, import_react.useState)("");
	const [submitted, setSubmitted] = (0, import_react.useState)(false);
	const [timeLeft, setTimeLeft] = (0, import_react.useState)(null);
	const launchTarget = emergency?.estimatedLaunch || emergency?.estimatedReturn;
	(0, import_react.useEffect)(() => {
		if (!launchTarget) return;
		const target = new Date(launchTarget).getTime();
		if (isNaN(target)) return;
		const updateTimer = () => {
			const diff = Math.max(0, target - Date.now());
			const days = Math.floor(diff / 864e5);
			const hours = Math.floor(diff % 864e5 / 36e5);
			const minutes = Math.floor(diff % 36e5 / 6e4);
			const seconds = Math.floor(diff % 6e4 / 1e3);
			setTimeLeft({
				days,
				hours,
				minutes,
				seconds
			});
		};
		updateTimer();
		const interval = setInterval(updateTimer, 1e3);
		return () => clearInterval(interval);
	}, [launchTarget]);
	const handleNotify = async (e) => {
		e.preventDefault();
		const email = notifyEmail.trim();
		if (!email) return;
		setSubmitted(true);
		toast.success("Thank you! We'll notify you as soon as our platform is back live.");
		try {
			await fetch("/api/crm/action", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					action: "create_lead",
					name: "Maintenance Subscriber",
					email,
					source: "maintenance_screen",
					score: 65,
					notes: "Subscribed for relaunch notification during maintenance mode."
				})
			});
		} catch {}
	};
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "min-h-screen bg-[#f5f5f7] text-[#1d1d1f] flex flex-col justify-between p-6 sm:p-10 font-sans selection:bg-blue/20",
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "flex items-center justify-between max-w-4xl mx-auto w-full",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex items-center gap-2.5",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
						className: "relative flex size-8 items-center justify-center rounded-[10px] bg-blue text-white font-bold text-sm shadow-sm",
						children: "C"
					}, void 0, false, {
						fileName: _jsxFileName$2,
						lineNumber: 69,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
						className: "font-display font-semibold text-sm tracking-tight",
						children: config.siteName || "Codex Dynamics"
					}, void 0, false, {
						fileName: _jsxFileName$2,
						lineNumber: 72,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$2,
					lineNumber: 68,
					columnNumber: 9
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
					to: "/admin",
					className: "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-muted-foreground hover:text-label hover:bg-black/5 transition border border-black/5",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Shield, { className: "size-3.5 text-blue" }, void 0, false, {
						fileName: _jsxFileName$2,
						lineNumber: 81,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Admin Portal" }, void 0, false, {
						fileName: _jsxFileName$2,
						lineNumber: 82,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$2,
					lineNumber: 77,
					columnNumber: 9
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName$2,
				lineNumber: 67,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "max-w-xl mx-auto w-full text-center my-auto py-12",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-700 border border-amber-500/20 text-xs font-semibold uppercase tracking-wider mb-6",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
							className: "relative flex h-2 w-2",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" }, void 0, false, {
								fileName: _jsxFileName$2,
								lineNumber: 90,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "relative inline-flex rounded-full h-2 w-2 bg-amber-500" }, void 0, false, {
								fileName: _jsxFileName$2,
								lineNumber: 91,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$2,
							lineNumber: 89,
							columnNumber: 11
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Maintenance Mode Active" }, void 0, false, {
							fileName: _jsxFileName$2,
							lineNumber: 93,
							columnNumber: 11
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$2,
						lineNumber: 88,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", {
						className: "text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-label font-display mb-4",
						children: emergency?.headline || "Scheduled Platform Upgrades in Progress"
					}, void 0, false, {
						fileName: _jsxFileName$2,
						lineNumber: 96,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "text-sm sm:text-base text-muted-foreground leading-relaxed max-w-md mx-auto mb-8",
						children: emergency?.subtext || emergency?.message || "We are fine-tuning our high-performance digital agency platform. We will be back shortly with enhanced speed, security, and capabilities."
					}, void 0, false, {
						fileName: _jsxFileName$2,
						lineNumber: 100,
						columnNumber: 9
					}, this),
					timeLeft && /* @__PURE__ */ (void 0)("div", {
						className: "grid grid-cols-4 gap-2 sm:gap-4 max-w-xs sm:max-w-sm mx-auto mb-8",
						children: [
							/* @__PURE__ */ (void 0)("div", {
								className: "p-3 sm:p-4 rounded-2xl bg-white border border-black/8 shadow-xs",
								children: [/* @__PURE__ */ (void 0)("span", {
									className: "block text-2xl sm:text-3xl font-bold text-label font-mono",
									children: String(timeLeft.days).padStart(2, "0")
								}, void 0, false, {
									fileName: _jsxFileName$2,
									lineNumber: 110,
									columnNumber: 15
								}, this), /* @__PURE__ */ (void 0)("span", {
									className: "text-[10px] sm:text-xs text-subtle font-medium uppercase",
									children: "Days"
								}, void 0, false, {
									fileName: _jsxFileName$2,
									lineNumber: 113,
									columnNumber: 15
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$2,
								lineNumber: 109,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (void 0)("div", {
								className: "p-3 sm:p-4 rounded-2xl bg-white border border-black/8 shadow-xs",
								children: [/* @__PURE__ */ (void 0)("span", {
									className: "block text-2xl sm:text-3xl font-bold text-label font-mono",
									children: String(timeLeft.hours).padStart(2, "0")
								}, void 0, false, {
									fileName: _jsxFileName$2,
									lineNumber: 116,
									columnNumber: 15
								}, this), /* @__PURE__ */ (void 0)("span", {
									className: "text-[10px] sm:text-xs text-subtle font-medium uppercase",
									children: "Hours"
								}, void 0, false, {
									fileName: _jsxFileName$2,
									lineNumber: 119,
									columnNumber: 15
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$2,
								lineNumber: 115,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (void 0)("div", {
								className: "p-3 sm:p-4 rounded-2xl bg-white border border-black/8 shadow-xs",
								children: [/* @__PURE__ */ (void 0)("span", {
									className: "block text-2xl sm:text-3xl font-bold text-label font-mono",
									children: String(timeLeft.minutes).padStart(2, "0")
								}, void 0, false, {
									fileName: _jsxFileName$2,
									lineNumber: 122,
									columnNumber: 15
								}, this), /* @__PURE__ */ (void 0)("span", {
									className: "text-[10px] sm:text-xs text-subtle font-medium uppercase",
									children: "Mins"
								}, void 0, false, {
									fileName: _jsxFileName$2,
									lineNumber: 125,
									columnNumber: 15
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$2,
								lineNumber: 121,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (void 0)("div", {
								className: "p-3 sm:p-4 rounded-2xl bg-white border border-black/8 shadow-xs",
								children: [/* @__PURE__ */ (void 0)("span", {
									className: "block text-2xl sm:text-3xl font-bold text-label font-mono",
									children: String(timeLeft.seconds).padStart(2, "0")
								}, void 0, false, {
									fileName: _jsxFileName$2,
									lineNumber: 128,
									columnNumber: 15
								}, this), /* @__PURE__ */ (void 0)("span", {
									className: "text-[10px] sm:text-xs text-subtle font-medium uppercase",
									children: "Secs"
								}, void 0, false, {
									fileName: _jsxFileName$2,
									lineNumber: 131,
									columnNumber: 15
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$2,
								lineNumber: 127,
								columnNumber: 13
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName$2,
						lineNumber: 108,
						columnNumber: 11
					}, this),
					submitted ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "inline-flex items-center gap-2 p-3.5 rounded-2xl bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-medium",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CircleCheck, { className: "size-4 shrink-0" }, void 0, false, {
							fileName: _jsxFileName$2,
							lineNumber: 139,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "You're on the priority notification list. See you soon!" }, void 0, false, {
							fileName: _jsxFileName$2,
							lineNumber: 140,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$2,
						lineNumber: 138,
						columnNumber: 11
					}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("form", {
						onSubmit: handleNotify,
						className: "flex max-w-md mx-auto gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "relative flex-1",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Mail, { className: "absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-subtle" }, void 0, false, {
								fileName: _jsxFileName$2,
								lineNumber: 145,
								columnNumber: 15
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
								type: "email",
								required: true,
								value: notifyEmail,
								onChange: (e) => setNotifyEmail(e.target.value),
								placeholder: "Enter email to get notified at relaunch",
								className: "w-full text-xs rounded-xl border border-black/10 bg-white pl-10 pr-3.5 py-3 text-label placeholder:text-subtle focus:outline-none focus:ring-2 focus:ring-blue/20 focus:border-blue transition shadow-xs"
							}, void 0, false, {
								fileName: _jsxFileName$2,
								lineNumber: 146,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$2,
							lineNumber: 144,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
							type: "submit",
							className: "inline-flex items-center gap-1.5 rounded-xl bg-label text-white px-4 py-3 text-xs font-semibold hover:bg-label/90 transition shadow-xs cursor-pointer shrink-0",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Notify Me" }, void 0, false, {
								fileName: _jsxFileName$2,
								lineNumber: 159,
								columnNumber: 15
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ArrowRight, { className: "size-3.5" }, void 0, false, {
								fileName: _jsxFileName$2,
								lineNumber: 160,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$2,
							lineNumber: 155,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$2,
						lineNumber: 143,
						columnNumber: 11
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName$2,
				lineNumber: 87,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "text-center text-xs text-subtle max-w-4xl mx-auto w-full pt-6 border-t border-black/5",
				children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: [
					"© ",
					(/* @__PURE__ */ new Date()).getFullYear(),
					" ",
					config.siteName || "Codex Dynamics",
					". High-Performance Digital Agency."
				] }, void 0, true, {
					fileName: _jsxFileName$2,
					lineNumber: 168,
					columnNumber: 9
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName$2,
				lineNumber: 167,
				columnNumber: 7
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName$2,
		lineNumber: 65,
		columnNumber: 5
	}, this);
}
var _jsxFileName$1 = "/app/applet/src/components/SiteChrome.tsx";
var SECTION_MAP = {
	hero: () => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Hero, {}, void 0, false, {
		fileName: _jsxFileName$1,
		lineNumber: 26,
		columnNumber: 15
	}, void 0),
	highlights: () => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Highlights, {}, void 0, false, {
		fileName: _jsxFileName$1,
		lineNumber: 27,
		columnNumber: 21
	}, void 0),
	portfolio: () => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Portfolio, {}, void 0, false, {
		fileName: _jsxFileName$1,
		lineNumber: 28,
		columnNumber: 20
	}, void 0),
	results: () => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Results, {}, void 0, false, {
		fileName: _jsxFileName$1,
		lineNumber: 29,
		columnNumber: 18
	}, void 0),
	reviews: () => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Reviews, {}, void 0, false, {
		fileName: _jsxFileName$1,
		lineNumber: 30,
		columnNumber: 18
	}, void 0),
	about: () => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(About, {}, void 0, false, {
		fileName: _jsxFileName$1,
		lineNumber: 31,
		columnNumber: 16
	}, void 0),
	services: () => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Services, {}, void 0, false, {
		fileName: _jsxFileName$1,
		lineNumber: 32,
		columnNumber: 19
	}, void 0),
	blog: () => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(BlogSection, {}, void 0, false, {
		fileName: _jsxFileName$1,
		lineNumber: 33,
		columnNumber: 15
	}, void 0),
	contact: () => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Contact, {}, void 0, false, {
		fileName: _jsxFileName$1,
		lineNumber: 34,
		columnNumber: 18
	}, void 0)
};
var PAGE_SECTIONS = {
	home: [],
	work: ["portfolio", "results"],
	services: ["services"],
	studio: ["about"],
	blog: ["blog"],
	contact: ["contact"]
};
function OrderedHome() {
	const { config } = useSiteConfig();
	const order = resolveSectionsOrder(config.theme);
	const visibility = resolveSectionVisibility(config.theme);
	const componentGate = {
		hero: "hero-clip",
		highlights: "bento-highlights",
		portfolio: "portfolio-showcase",
		results: "results-counter",
		reviews: "reviews-slider",
		services: "services-carousel",
		blog: "gutenberg-blocks"
	};
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: order.map((id) => {
		if (visibility[id] === false) return null;
		const gate = componentGate[id];
		if (gate && !isComponentEnabled(config, gate)) return null;
		const render = SECTION_MAP[id];
		return render ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: render() }, id, false, {
			fileName: _jsxFileName$1,
			lineNumber: 67,
			columnNumber: 25
		}, this) : null;
	}) }, void 0, false, {
		fileName: _jsxFileName$1,
		lineNumber: 61,
		columnNumber: 5
	}, this);
}
function SitePageBody({ page = "home" }) {
	if (page !== "home") {
		const ids = PAGE_SECTIONS[page] || [];
		return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: ids.map((id) => {
			const render = SECTION_MAP[id];
			return render ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: render() }, id, false, {
				fileName: _jsxFileName$1,
				lineNumber: 80,
				columnNumber: 27
			}, this) : null;
		}) }, void 0, false, {
			fileName: _jsxFileName$1,
			lineNumber: 77,
			columnNumber: 7
		}, this);
	}
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(OrderedHome, {}, void 0, false, {
		fileName: _jsxFileName$1,
		lineNumber: 86,
		columnNumber: 10
	}, this);
}
function SiteChrome({ page = "home" }) {
	const { config } = useSiteConfig();
	const preview = usePreviewMode();
	if (config.emergency?.maintenanceMode && !preview.isPreview) return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(MaintenanceScreen, {}, void 0, false, {
		fileName: _jsxFileName$1,
		lineNumber: 95,
		columnNumber: 12
	}, this);
	const showHeader = isComponentEnabled(config, "header-builder");
	const showFooter = isComponentEnabled(config, "footer-widgets");
	const showDock = isComponentEnabled(config, "sticky-contact-dock") && !preview.isPreview;
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(AnnouncementBanner, {}, void 0, false, {
			fileName: _jsxFileName$1,
			lineNumber: 104,
			columnNumber: 7
		}, this),
		showHeader ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Nav, {}, void 0, false, {
			fileName: _jsxFileName$1,
			lineNumber: 105,
			columnNumber: 21
		}, this) : null,
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("main", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SitePageBody, { page }, void 0, false, {
			fileName: _jsxFileName$1,
			lineNumber: 107,
			columnNumber: 9
		}, this) }, void 0, false, {
			fileName: _jsxFileName$1,
			lineNumber: 106,
			columnNumber: 7
		}, this),
		showFooter ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Footer, {}, void 0, false, {
			fileName: _jsxFileName$1,
			lineNumber: 109,
			columnNumber: 21
		}, this) : null,
		showDock ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(WhatsAppDock, {}, void 0, false, {
			fileName: _jsxFileName$1,
			lineNumber: 110,
			columnNumber: 19
		}, this) : null
	] }, void 0, true, {
		fileName: _jsxFileName$1,
		lineNumber: 103,
		columnNumber: 5
	}, this);
}
var _jsxFileName = "/app/applet/src/routes/index.tsx?tsr-split=component";
function Home() {
	(0, import_react.useEffect)(() => {
		if (typeof window !== "undefined") {
			const onAdmin = sessionStorage.getItem("codex_on_admin") === "true" || localStorage.getItem("codex_on_admin") === "true";
			const returnToPublic = sessionStorage.getItem("codex_return_to_public") === "true";
			const isBack = (performance.getEntriesByType?.("navigation")?.[0])?.type === "back_forward";
			if (onAdmin && !returnToPublic && !isBack) {
				const lastTab = sessionStorage.getItem("codex_admin_active_tab") || localStorage.getItem("codex_admin_active_tab");
				const target = lastTab ? `/admin?tab=${encodeURIComponent(lastTab)}` : "/admin";
				window.location.replace(target);
				return;
			}
			if (returnToPublic || isBack) {
				sessionStorage.removeItem("codex_return_to_public");
				sessionStorage.removeItem("codex_on_admin");
				localStorage.removeItem("codex_on_admin");
			}
		}
		trackCurrentVisitor(window.location.pathname);
	}, []);
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SiteCanvas, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SEO, {
		title: "High-Performance Websites & Digital Agency",
		description: "High-performance websites, custom web apps, CRM calling systems, and high-ROAS marketing campaigns. Precision quality on every screen.",
		ogType: "website",
		keywords: [
			"web design",
			"web development",
			"digital agency",
			"custom CRM",
			"e-commerce",
			"high-performance websites"
		]
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 28,
		columnNumber: 7
	}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SiteChrome, { page: "home" }, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 29,
		columnNumber: 7
	}, this)] }, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 27,
		columnNumber: 10
	}, this);
}
//#endregion
export { Home as component };
