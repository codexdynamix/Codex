import { i as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/@fortawesome/react-fontawesome+[...].mjs";
import { t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { D as MessageSquare, F as LoaderCircle, M as Mail, et as CircleCheck, f as Sparkles, k as Menu, mt as ArrowRight, n as X } from "../_libs/lucide-react.mjs";
import { n as AnimatePresence, t as motion } from "../_libs/framer-motion+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { _ as WhatsAppLogo, a as CONTACT, c as FacebookLogo, d as InstagramLogo, f as LinkedInLogo, g as ViberLogo, h as TwitterXLogo, i as useContactModal, l as GitHubLogo, m as TelegramLogo, o as LINKS, p as PhoneLogo, s as useSiteConfig, u as GmailLogo, v as cn } from "./router-B2S7_RqX.mjs";
import { t as Slot } from "../_libs/radix-ui__react-slot.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/SiteCanvas-BpGAJpX0.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var buttonVariants = cva("inline-flex items-center justify-center gap-1.5 font-medium whitespace-nowrap transition-[background-color,color,opacity,transform] duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:not-disabled:scale-[0.96]", {
	variants: {
		variant: {
			default: "bg-blue text-paper hover:bg-blue-hover",
			inverted: "bg-paper text-ink hover:bg-paper/90",
			ghost: "bg-transparent text-blue hover:opacity-70",
			outline: "bg-transparent text-foreground shadow-[inset_0_0_0_1px_var(--color-border)] hover:bg-muted",
			dark: "bg-ink text-paper hover:bg-label"
		},
		size: {
			default: "min-h-11 rounded-full px-5 text-base",
			sm: "min-h-10 rounded-full px-4 text-sm",
			lg: "min-h-12 rounded-full px-6 text-base",
			icon: "size-11 rounded-full"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
function Button({ className, variant, size, asChild = false, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		"data-slot": "button",
		className: cn(buttonVariants({
			variant,
			size,
			className
		})),
		...props
	});
}
var NAV_LINKS = [
	{
		href: "#services",
		label: "Services"
	},
	{
		href: "#work",
		label: "Projects"
	},
	{
		href: "#process",
		label: "Process"
	},
	{
		href: "#about",
		label: "About"
	},
	{
		href: "#reviews",
		label: "Reviews"
	},
	{
		href: "#contact",
		label: "Contact"
	}
];
function scrollToId(id) {
	document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}
var PreviewModeContext = (0, import_react.createContext)({
	isPreview: false,
	currentPage: "home"
});
function usePreviewMode() {
	return (0, import_react.useContext)(PreviewModeContext);
}
var DEFAULT_HOME_SEQUENCE = [
	"hero",
	"highlights",
	"services",
	"portfolio",
	"results",
	"about",
	"blog",
	"reviews",
	"contact"
];
var DEFAULT_ENABLED_COMPONENTS = [
	"header-builder",
	"hero-clip",
	"bento-highlights",
	"portfolio-showcase",
	"results-counter",
	"reviews-slider",
	"services-carousel",
	"gutenberg-blocks",
	"footer-widgets",
	"sticky-contact-dock"
];
var CAMEL_TO_KEBAB = {
	headerBuilder: "header-builder",
	gutenbergBlocks: "gutenberg-blocks",
	footerWidgets: "footer-widgets",
	stickyContactDock: "sticky-contact-dock",
	videoHero: "hero-clip",
	highlightsBento: "bento-highlights",
	portfolioShowcase: "portfolio-showcase",
	resultsCounter: "results-counter",
	reviewsSlider: "reviews-slider",
	tidioChat: "tidio-chat-widget",
	megaMenu: "header-builder",
	mobileDrawer: "header-builder"
};
function normalizeComponentIds(active) {
	if (!active) return [...DEFAULT_ENABLED_COMPONENTS];
	if (Array.isArray(active)) return active.filter((id) => typeof id === "string");
	if (typeof active === "object") {
		const ids = [];
		const seen = /* @__PURE__ */ new Set();
		for (const [key, value] of Object.entries(active)) {
			const id = CAMEL_TO_KEBAB[key] || key;
			seen.add(id);
			if (value) ids.push(id);
		}
		for (const id of DEFAULT_ENABLED_COMPONENTS) if (!seen.has(id)) ids.push(id);
		return ids.length ? ids : [...DEFAULT_ENABLED_COMPONENTS];
	}
	return [...DEFAULT_ENABLED_COMPONENTS];
}
function isComponentEnabled(config, id) {
	return normalizeComponentIds(config.theme?.activeComponents).includes(id);
}
function resolveFontPair(font) {
	switch (font) {
		case "playfair": return {
			display: "'Playfair Display', Georgia, serif",
			sans: "'Inter', system-ui, sans-serif"
		};
		case "syne": return {
			display: "'Syne', sans-serif",
			sans: "'Space Grotesk', system-ui, sans-serif"
		};
		case "inter": return {
			display: "'Plus Jakarta Sans', 'Inter', sans-serif",
			sans: "'Plus Jakarta Sans', 'Inter', sans-serif"
		};
		case "newsreader": return {
			display: "'Newsreader', Georgia, serif",
			sans: "'Inter', system-ui, sans-serif"
		};
		default: return {
			display: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Segoe UI', sans-serif",
			sans: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Segoe UI', sans-serif"
		};
	}
}
function radiusTokens(br) {
	switch (br) {
		case "sharp": return {
			sm: "0px",
			md: "2px",
			lg: "4px",
			xl: "6px",
			xxl: "8px"
		};
		case "clean": return {
			sm: "4px",
			md: "8px",
			lg: "12px",
			xl: "16px",
			xxl: "20px"
		};
		case "pill": return {
			sm: "9999px",
			md: "9999px",
			lg: "24px",
			xl: "36px",
			xxl: "48px"
		};
		default: return {
			sm: "8px",
			md: "12px",
			lg: "18px",
			xl: "28px",
			xxl: "36px"
		};
	}
}
function typeScalePx(scale) {
	switch (scale) {
		case "compact": return 15;
		case "spacious": return 17;
		case "editorial":
		case "large": return 18;
		default: return 16;
	}
}
function resolveSectionsOrder(theme) {
	const order = theme?.layout?.sectionsOrder || theme?.sectionsOrder;
	if (order && order.length) return order;
	return [...DEFAULT_HOME_SEQUENCE];
}
function resolveSectionVisibility(theme) {
	const vis = theme?.layout?.sectionVisibility;
	if (vis) return vis;
	return Object.fromEntries(DEFAULT_HOME_SEQUENCE.map((id) => [id, true]));
}
function buildThemeStyle(config) {
	const c = config.colors || {};
	const t = config.theme;
	const fonts = resolveFontPair(t?.fontFamily);
	const radius = radiusTokens(t?.borderRadius);
	const scale = t?.fontSizeScale || t?.layout?.fontSizeScale;
	const leading = t?.lineHeight;
	const cw = t?.containerWidth || "1280px";
	const primaryFg = "#ffffff";
	const style = {
		"--color-primary": c.primary || "#0071e3",
		"--color-primary-foreground": primaryFg,
		"--color-blue": c.primary || "#0071e3",
		"--color-blue-hover": c.highlight || c.accent || c.primary || "#0077ed",
		"--color-brand": c.primary || "#0071e3",
		"--color-ring": c.ring || c.primary || "#0071e3",
		"--color-accent": c.accent || c.primary || "#0071e3",
		"--color-accent-foreground": primaryFg,
		"--color-background": c.background || "#f5f5f7",
		"--color-site-bg": c.background || "#f5f5f7",
		"--color-fill": c.background || "#f5f5f7",
		"--color-fill-elevated": c.secondary || c.background || "#fbfbfd",
		"--color-secondary": c.secondary || c.background || "#f5f5f7",
		"--color-card": c.cardBg || "#ffffff",
		"--color-site-card": c.cardBg || "#ffffff",
		"--color-paper": "#ffffff",
		"--color-surface": c.surface || c.cardBg || "#ffffff",
		"--color-foreground": c.textMain || "#1d1d1f",
		"--color-label": c.textMain || "#1d1d1f",
		"--color-card-foreground": c.textMain || "#1d1d1f",
		"--color-muted-foreground": c.textMuted || "#6e6e73",
		"--color-subtle": c.textMuted || "#6e6e73",
		"--color-border": c.border || "#d2d2d7",
		"--color-hairline": c.border || "rgba(0,0,0,0.08)",
		"--color-highlight": c.highlight || c.accent || c.primary || "#0071e3",
		"--color-inverse": c.inverse || "#1d1d1f",
		"--font-display": fonts.display,
		"--font-sans": fonts.sans,
		"--radius-sm": radius.sm,
		"--radius-md": radius.md,
		"--radius-lg": radius.lg,
		"--radius-xl": radius.xl,
		"--radius-2xl": radius.xxl,
		"--container-max": cw === "full" ? "100%" : cw,
		fontFamily: fonts.sans
	};
	if (scale && scale !== "normal" && scale !== "standard") style["font-size"] = `${typeScalePx(scale)}px`;
	if (typeof leading === "number" && leading > 0) {
		style["--body-leading"] = String(leading);
		style["line-height"] = String(leading);
	}
	return style;
}
function hrefToPreviewPage(href) {
	if (href.includes("work") || href.includes("portfolio") || href.includes("project")) return "work";
	if (href.includes("capabilities") || href.includes("services")) return "services";
	if (href.includes("studio") || href.includes("process") || href.includes("about")) return "studio";
	if (href.includes("insights") || href.includes("blog")) return "blog";
	if (href.includes("contact")) return "contact";
	return "home";
}
function Mark({ letter, logoUrl }) {
	if (logoUrl) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
		src: logoUrl,
		alt: "Logo",
		className: "size-7 object-contain rounded-[6px]"
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "relative flex size-7 shrink-0 items-center justify-center rounded-[8px] bg-blue text-paper shadow-[inset_0_0.5px_0_rgb(255_255_255_/_0.35)]",
		"aria-hidden": "true",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-[13px] leading-none font-semibold tracking-tight",
			children: letter || "C"
		})
	});
}
function HeaderSocials({ className, headerSocials, fallbackSocials }) {
	const visible = [
		{
			key: "linkedin",
			enabled: headerSocials?.linkedin !== void 0 ? Boolean(headerSocials.linkedin.enabled) : true,
			url: headerSocials?.linkedin?.url || fallbackSocials?.linkedin || LINKS.linkedin,
			label: "LinkedIn",
			logo: LinkedInLogo,
			iconClass: "size-5 sm:size-6"
		},
		{
			key: "x",
			enabled: headerSocials?.x !== void 0 ? Boolean(headerSocials.x.enabled) : true,
			url: headerSocials?.x?.url || fallbackSocials?.twitter || LINKS.twitter,
			label: "Twitter / X",
			logo: TwitterXLogo,
			iconClass: "size-5 sm:size-6"
		},
		{
			key: "github",
			enabled: headerSocials?.github !== void 0 ? Boolean(headerSocials.github.enabled) : true,
			url: headerSocials?.github?.url || fallbackSocials?.github || LINKS.github,
			label: "GitHub",
			logo: GitHubLogo,
			iconClass: "size-5 sm:size-6"
		},
		{
			key: "instagram",
			enabled: headerSocials?.instagram !== void 0 ? Boolean(headerSocials.instagram.enabled) : true,
			url: headerSocials?.instagram?.url || fallbackSocials?.instagram || LINKS.instagram,
			label: "Instagram",
			logo: InstagramLogo,
			iconClass: "size-6 sm:size-7"
		},
		{
			key: "facebook",
			enabled: headerSocials?.facebook !== void 0 ? Boolean(headerSocials.facebook.enabled) : true,
			url: headerSocials?.facebook?.url || fallbackSocials?.facebook || LINKS.facebook,
			label: "Facebook",
			logo: FacebookLogo,
			iconClass: "size-6 sm:size-7"
		}
	].filter((item) => item.enabled && item.url);
	if (visible.length === 0) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("flex items-center gap-0.5 sm:gap-1", className),
		children: visible.map((item) => {
			const LogoComponent = item.logo;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
				href: item.url,
				target: "_blank",
				rel: "noopener noreferrer",
				"aria-label": item.label,
				title: item.label,
				className: "flex size-8 sm:size-9 items-center justify-center rounded-full transition-transform duration-150 ease-out hover:scale-105 active:scale-[0.96]",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogoComponent, { className: item.iconClass })
			}, item.key);
		})
	});
}
function Nav() {
	const { config, primaryPhone, primaryEmail, primaryAddress, primaryWhatsApp, primaryTelegram, primaryViber, socialsGrouped } = useSiteConfig();
	const brandName = config.siteName || "Codex";
	const brandInitial = brandName.trim()[0]?.toUpperCase() || "C";
	const phoneDisplay = primaryPhone?.value || CONTACT.phoneDisplay;
	const phoneHref = primaryPhone?.href || LINKS.tel;
	const emailRecipient = config.formSubmitEmail || primaryEmail?.value || CONTACT.email;
	const currentAddress = primaryAddress || {
		street: CONTACT.addressStreet,
		city: "Kyiv"
	};
	const whatsappHref = primaryWhatsApp?.href || LINKS.whatsapp;
	const telegramHref = primaryTelegram?.href || LINKS.telegram;
	const viberHref = primaryViber?.href || LINKS.viber;
	const instagramHref = config.headerSocials?.instagram?.url || socialsGrouped.instagram?.[0]?.href || LINKS.instagram;
	const facebookHref = config.headerSocials?.facebook?.url || socialsGrouped.facebook?.[0]?.href || LINKS.facebook;
	const linkedinHref = config.headerSocials?.linkedin?.url || socialsGrouped.linkedin?.[0]?.href || LINKS.linkedin;
	const twitterHref = config.headerSocials?.x?.url || socialsGrouped.twitter?.[0]?.href || LINKS.twitter;
	const githubHref = config.headerSocials?.github?.url || socialsGrouped.github?.[0]?.href || LINKS.github;
	const { openContactModal } = useContactModal();
	const preview = usePreviewMode();
	const [overLight, setOverLight] = (0, import_react.useState)(false);
	const [open, setOpen] = (0, import_react.useState)(false);
	const [progress, setProgress] = (0, import_react.useState)(0);
	const [scrolled, setScrolled] = (0, import_react.useState)(false);
	const onNavHref = (href) => (e) => {
		if (preview.isPreview && preview.navigateTo) {
			e.preventDefault();
			preview.navigateTo(hrefToPreviewPage(href));
			setOpen(false);
		}
	};
	const pin = preview.isPreview ? "absolute" : "fixed";
	(0, import_react.useEffect)(() => {
		const onScroll = () => {
			const hero = document.getElementById("hero");
			const isDarkHero = (config.theme?.heroLayout || config.theme?.layout?.heroLayout || "streamer") === "streamer";
			if (hero) setOverLight(!isDarkHero || hero.getBoundingClientRect().bottom < 88);
			else setOverLight(true);
			const doc = document.documentElement;
			const max = doc.scrollHeight - doc.clientHeight;
			setProgress(max > 0 ? doc.scrollTop / max : 0);
			setScrolled(window.scrollY > 8);
		};
		onScroll();
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, [config.theme?.heroLayout, config.theme?.layout?.heroLayout]);
	(0, import_react.useEffect)(() => {
		document.body.style.overflow = open ? "hidden" : "";
		return () => {
			document.body.style.overflow = "";
		};
	}, [open]);
	const light = overLight && !open;
	const headerStyle = config.theme?.headerStyle || "floating";
	if (headerStyle === "classic") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
		className: cn("pointer-events-none inset-x-0 top-0 z-50 border-b border-hairline bg-background/95 backdrop-blur-xl", pin),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "pointer-events-auto mx-auto w-full max-w-[72rem] px-4 sm:px-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col items-center py-5 text-center",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => window.scrollTo({
						top: 0,
						behavior: "smooth"
					}),
					className: "text-[1.35rem] font-semibold tracking-tight text-label font-display",
					children: brandName
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-[11px] tracking-[0.22em] text-subtle uppercase",
					children: config.siteTagline || "Digital Agency"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
				className: "flex items-center justify-center gap-1 border-t border-hairline py-2",
				"aria-label": "Primary",
				children: [NAV_LINKS.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					href: item.href,
					onClick: onNavHref(item.href),
					className: "rounded-full px-3 py-2 text-[12px] font-medium text-label/80 hover:text-label",
					children: item.label
				}, item.href)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => openContactModal(),
					className: "ml-2 rounded-full bg-label px-3.5 py-1.5 text-[12px] font-semibold text-paper",
					children: "Talk to us"
				})]
			})]
		})
	});
	if (headerStyle === "sticky") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: cn("pointer-events-none inset-x-0 top-0 z-50 border-b border-hairline bg-background/80 backdrop-blur-2xl", pin, scrolled && "shadow-xs"),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
			className: "pointer-events-auto mx-auto flex h-14 w-full max-w-[80rem] items-center justify-between px-4 sm:px-6",
			"aria-label": "Primary",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => window.scrollTo({
						top: 0,
						behavior: "smooth"
					}),
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mark, {
						letter: brandInitial,
						logoUrl: config.branding?.logoLight || config.branding?.logoDark
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-[14px] font-semibold tracking-tight text-label",
						children: brandName
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "hidden items-center gap-1 lg:flex",
					children: NAV_LINKS.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: item.href,
						onClick: onNavHref(item.href),
						className: "rounded-full px-3 py-1.5 text-[13px] font-medium text-label/80 hover:bg-black/5",
						children: item.label
					}, item.href))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "button",
						size: "sm",
						className: "hidden h-8 px-3.5 text-[13px] md:inline-flex",
						onClick: () => openContactModal(),
						children: "Talk to us"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "lg:hidden size-10",
						onClick: () => setOpen((v) => !v),
						"aria-label": "Menu",
						children: open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "size-5" })
					})]
				})
			]
		}), open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "pointer-events-auto border-t border-hairline bg-background px-4 py-4 lg:hidden",
			children: NAV_LINKS.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
				href: item.href,
				onClick: onNavHref(item.href),
				className: "block py-2.5 text-sm font-medium text-label",
				children: item.label
			}, item.href))
		}) : null]
	});
	if (headerStyle === "minimal") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: cn("pointer-events-none inset-x-0 top-0 z-50", pin),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
			className: "pointer-events-auto mx-auto flex h-12 w-full max-w-[56rem] items-center justify-between px-5",
			"aria-label": "Primary",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => window.scrollTo({
						top: 0,
						behavior: "smooth"
					}),
					className: "text-[13px] font-semibold tracking-tight text-label",
					children: brandName
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "hidden items-center gap-5 sm:flex",
					children: NAV_LINKS.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: item.href,
						onClick: onNavHref(item.href),
						className: "text-[12px] font-medium text-muted-foreground hover:text-label",
						children: item.label
					}, item.href))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => openContactModal(),
					className: "text-[12px] font-semibold text-primary",
					children: "Contact"
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-px w-full bg-hairline" })]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: cn("pointer-events-none inset-x-0 top-0 z-50 pt-[max(0.7rem,env(safe-area-inset-top))]", pin),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: cn("flex justify-center", "px-3 sm:px-5 xl:px-8"),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
				className: cn("ios-island pointer-events-auto relative z-50 flex h-12 w-full items-center justify-between gap-2 px-2 transition-[background-color,box-shadow,backdrop-filter,transform] duration-300 sm:h-[3.25rem] sm:px-2.5", "max-w-[72rem]", light ? "ios-island-light text-label" : "ios-island-dark text-paper", scrolled && "ios-island-scrolled", open && "ios-island-open"),
				"aria-label": "Primary",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => {
							setOpen(false);
							window.scrollTo({
								top: 0,
								behavior: "smooth"
							});
						},
						className: "flex min-h-11 items-center gap-2 rounded-full py-1 pr-2 pl-0.5",
						"aria-label": `${brandName} home`,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mark, {
							letter: brandInitial,
							logoUrl: config.branding?.logoLight || config.branding?.logoDark
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-[13px] font-semibold tracking-tight",
							children: brandName
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "absolute left-1/2 hidden -translate-x-1/2 items-center lg:flex",
						children: NAV_LINKS.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: item.href,
							onClick: onNavHref(item.href),
							className: cn("rounded-full px-3 py-1.5 text-[13px] font-medium transition-opacity duration-150 hover:opacity-55", light ? "text-label" : "text-paper/90"),
							children: item.label
						}, item.href))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-1.5 sm:gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeaderSocials, {
								headerSocials: config.headerSocials,
								fallbackSocials: {
									instagram: instagramHref,
									facebook: facebookHref,
									linkedin: linkedinHref,
									twitter: twitterHref,
									github: githubHref
								}
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "button",
								size: "sm",
								variant: light ? "default" : "inverted",
								className: "hidden h-8 min-h-8 px-3.5 text-[13px] md:inline-flex cursor-pointer shadow-xs",
								onClick: () => {
									setOpen(false);
									openContactModal();
								},
								children: "Talk to us"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => setOpen((v) => !v),
								className: cn("relative z-20 flex size-10 items-center justify-center rounded-full md:hidden", light ? "text-label" : "text-paper"),
								"aria-label": open ? "Close menu" : "Open menu",
								"aria-expanded": open,
								children: open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "size-5" })
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: cn("pointer-events-none absolute inset-x-4 bottom-1 h-px origin-left rounded-full", light ? "bg-label/20" : "bg-paper/25"),
						style: { transform: `scaleX(${progress})` },
						"aria-hidden": "true"
					})
				]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
			initial: {
				opacity: 0,
				y: -8,
				filter: "blur(8px)"
			},
			animate: {
				opacity: 1,
				y: 0,
				filter: "blur(0px)"
			},
			exit: {
				opacity: 0,
				y: -6,
				filter: "blur(6px)"
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
			className: "ios-sheet pointer-events-auto fixed inset-0 z-40 md:hidden",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex h-full flex-col px-6 pt-24 pb-10",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex flex-1 flex-col justify-center gap-1",
					children: NAV_LINKS.map((item, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.a, {
						href: item.href,
						initial: {
							opacity: 0,
							y: 12,
							filter: "blur(4px)"
						},
						animate: {
							opacity: 1,
							y: 0,
							filter: "blur(0px)"
						},
						transition: {
							delay: .05 * i,
							duration: .4
						},
						onClick: (e) => {
							onNavHref(item.href)(e);
							setOpen(false);
						},
						className: "py-3 text-4xl font-semibold tracking-tight text-paper",
						children: item.label
					}, item.href))
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap items-center gap-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: whatsappHref,
									target: "_blank",
									rel: "noopener noreferrer",
									"aria-label": "WhatsApp",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WhatsAppLogo, { className: "size-11" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: telegramHref,
									target: "_blank",
									rel: "noopener noreferrer",
									"aria-label": "Telegram",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TelegramLogo, { className: "size-11" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: viberHref,
									target: "_blank",
									rel: "noopener noreferrer",
									"aria-label": "Viber",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ViberLogo, { className: "size-11" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: phoneHref,
									"aria-label": "Call",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PhoneLogo, { className: "size-11" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(emailRecipient)}`,
									target: "_blank",
									rel: "noopener noreferrer",
									"aria-label": "Gmail",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GmailLogo, { className: "size-11" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: linkedinHref,
									target: "_blank",
									rel: "noopener noreferrer",
									"aria-label": "LinkedIn",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LinkedInLogo, { className: "size-11" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: twitterHref,
									target: "_blank",
									rel: "noopener noreferrer",
									"aria-label": "Twitter / X",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TwitterXLogo, { className: "size-11" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: githubHref,
									target: "_blank",
									rel: "noopener noreferrer",
									"aria-label": "GitHub",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GitHubLogo, { className: "size-11" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: instagramHref,
									target: "_blank",
									rel: "noopener noreferrer",
									"aria-label": "Instagram",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InstagramLogo, { className: "size-11" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: facebookHref,
									target: "_blank",
									rel: "noopener noreferrer",
									"aria-label": "Facebook",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FacebookLogo, { className: "size-11" })
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-sm text-paper/70",
							children: [
								phoneDisplay,
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "mx-2 text-paper/30",
									children: "·"
								}),
								currentAddress.street,
								", ",
								currentAddress.city
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "button",
							size: "lg",
							variant: "inverted",
							className: "w-full cursor-pointer shadow-md",
							onClick: () => {
								setOpen(false);
								openContactModal();
							},
							children: "Talk to us"
						})
					]
				})]
			})
		}, "menu") : null })]
	});
}
function NewsletterSignup({ title = "Codex Engineering Digest", description = "Architecture deep dives, performance benchmarks, and bespoke design systems delivered bi-weekly. Zero noise.", className, variant = "card", source = "newsletter_signup", placeholder = "Enter your work email...", buttonText = "Subscribe" }) {
	const [email, setEmail] = (0, import_react.useState)("");
	const [error, setError] = (0, import_react.useState)(null);
	const [isSubmitting, setIsSubmitting] = (0, import_react.useState)(false);
	const [isSubscribed, setIsSubscribed] = (0, import_react.useState)(false);
	const validateEmail = (val) => {
		const trimmed = val.trim();
		if (!trimmed) {
			setError("Please enter your email address.");
			return false;
		}
		if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(trimmed)) {
			setError("Please provide a valid email format (e.g. alex@company.com).");
			return false;
		}
		setError(null);
		return true;
	};
	const handleInputChange = (e) => {
		const val = e.target.value;
		setEmail(val);
		if (error) validateEmail(val);
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!validateEmail(email)) return;
		try {
			setIsSubmitting(true);
			setError(null);
			const res = await fetch("/api/crm/leads", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					kind: "lead",
					name: "Newsletter Subscriber",
					email: email.trim(),
					company: "",
					source,
					status: "new",
					score: 65,
					notes: `Subscribed via ${source} at ${(/* @__PURE__ */ new Date()).toLocaleString()}`
				})
			});
			try {
				const raw = localStorage.getItem("codex-newsletter-subscribers");
				const list = raw ? JSON.parse(raw) : [];
				list.push({
					email: email.trim(),
					date: (/* @__PURE__ */ new Date()).toISOString(),
					source
				});
				localStorage.setItem("codex-newsletter-subscribers", JSON.stringify(list));
			} catch {}
			if ((await res.json().catch(() => ({ ok: true }))).ok || res.ok) {
				setIsSubscribed(true);
				toast.success("You're on the list! Welcome to Codex Dynamics briefings.");
			} else toast.error("Subscription could not be processed. Please try again.");
		} catch {
			setIsSubscribed(true);
			toast.success("Subscribed successfully!");
		} finally {
			setIsSubmitting(false);
		}
	};
	if (isSubscribed) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("rounded-3xl border border-blue/20 bg-blue/5 p-6 text-center animate-in fade-in duration-300", variant === "footer" ? "p-4 bg-transparent border-hairline" : "", className),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-center gap-2 text-blue font-semibold text-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "You're subscribed!" })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-1 text-xs text-muted-foreground",
				children: [
					"A confirmation dispatch has been logged for ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-mono text-label font-medium",
						children: email
					}),
					"."
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: () => {
					setIsSubscribed(false);
					setEmail("");
				},
				className: "mt-3 text-[11px] text-blue underline hover:text-blue-hover cursor-pointer",
				children: "Subscribe another email"
			})
		]
	});
	if (variant === "footer") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("space-y-3", className),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h4", {
			className: "text-xs font-semibold tracking-wider text-label uppercase flex items-center gap-1.5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "size-3 text-blue" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Agency Newsletter" })]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 text-xs text-muted-foreground leading-relaxed",
			children: "Quarterly engineering blueprints and design systems."
		})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			onSubmit: handleSubmit,
			className: "space-y-2",
			noValidate: true,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative flex items-center",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					type: "email",
					value: email,
					onChange: handleInputChange,
					placeholder,
					"aria-label": "Email address for newsletter",
					disabled: isSubmitting,
					className: cn("w-full h-10 rounded-xl bg-paper px-3.5 pr-24 text-xs text-label border transition-colors outline-none", error ? "border-destructive focus:ring-1 focus:ring-destructive" : "border-hairline hover:border-black/20 dark:hover:border-white/20 focus:border-blue focus:ring-1 focus:ring-blue")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "submit",
					disabled: isSubmitting,
					className: "absolute right-1 h-8 px-3 rounded-lg bg-blue hover:bg-blue-hover text-white text-[11px] font-medium transition-colors flex items-center gap-1 disabled:opacity-50 cursor-pointer",
					children: isSubmitting ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-3 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: buttonText }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-3" })] })
				})]
			}), error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-[11px] text-destructive flex items-center gap-1 animate-in fade-in duration-150",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: error })
			})]
		})]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn(variant === "card" ? "p-6 sm:p-8 rounded-3xl bg-card border border-hairline shadow-xs relative overflow-hidden" : "p-4 rounded-2xl bg-card/60 border border-hairline", className),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-xl",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue/10 text-blue text-[11px] font-semibold border border-blue/15 mb-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "size-3" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Private Dispatch" })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "text-lg sm:text-xl font-bold text-label font-display tracking-tight",
					children: title
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1.5 text-xs sm:text-sm text-muted-foreground leading-relaxed",
					children: description
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit: handleSubmit,
					className: "mt-5 space-y-2",
					noValidate: true,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col sm:flex-row gap-2.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "relative flex-1",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "email",
									value: email,
									onChange: handleInputChange,
									placeholder,
									"aria-label": "Email address for newsletter",
									disabled: isSubmitting,
									className: cn("w-full h-11 rounded-2xl bg-paper px-4 text-xs sm:text-sm text-label border transition-all outline-none", error ? "border-destructive ring-1 ring-destructive" : "border-hairline hover:border-black/20 dark:hover:border-white/20 focus:border-blue focus:ring-2 focus:ring-blue/20")
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "submit",
								disabled: isSubmitting,
								className: "h-11 px-6 rounded-2xl bg-blue hover:bg-blue-hover text-white text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-2 shadow-sm hover:shadow-md disabled:opacity-50 cursor-pointer shrink-0",
								children: isSubmitting ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-4 animate-spin" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Subscribing..." })] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: buttonText }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-3.5" })] })
							})]
						}),
						error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-destructive pt-1 flex items-center gap-1",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: error })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[11px] text-subtle pt-1",
							children: "No spam. We respect your privacy and never share your data. Unsubscribe with one click."
						})
					]
				})
			]
		})
	});
}
function Footer() {
	const { config, primaryPhone, primaryEmail, primaryAddress, primaryWhatsApp, primaryTelegram, primaryViber, socialsGrouped } = useSiteConfig();
	const { openContactModal } = useContactModal();
	const year = config.copyrightYear || (/* @__PURE__ */ new Date()).getFullYear().toString();
	const brandName = config.siteName || "CODEX";
	const bio = config.footer?.tagline || "Web development, web design, and social media marketing. We build the site, then we grow it.";
	const phoneItem = primaryPhone || {
		value: CONTACT.phoneDisplay,
		href: LINKS.tel
	};
	const emailItem = primaryEmail || {
		value: CONTACT.email,
		href: LINKS.mailto
	};
	const addressItem = primaryAddress || {
		id: "addr-kyiv",
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
	const instagramUrl = config.headerSocials?.instagram?.url || socialsGrouped.instagram?.[0]?.href || LINKS.instagram;
	const facebookUrl = config.headerSocials?.facebook?.url || socialsGrouped.facebook?.[0]?.href || LINKS.facebook;
	const linkedinUrl = config.headerSocials?.linkedin?.url || socialsGrouped.linkedin?.[0]?.href || LINKS.linkedin;
	const twitterUrl = config.headerSocials?.x?.url || socialsGrouped.twitter?.[0]?.href || LINKS.twitter;
	const githubUrl = config.headerSocials?.github?.url || socialsGrouped.github?.[0]?.href || LINKS.github;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
		className: "border-t border-hairline bg-background py-14 pb-28 text-sm text-muted-foreground sm:py-16 sm:pb-28",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "shell",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-12 lg:grid-cols-12",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "lg:col-span-4 space-y-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-[13px] font-semibold tracking-[0.2em] text-label uppercase",
								children: brandName
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "max-w-sm leading-relaxed text-xs sm:text-sm",
								children: bio
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "pt-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-[11px] font-semibold uppercase tracking-wider text-label mb-2",
									children: "Direct Channels"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-wrap items-center gap-2",
									children: [
										whatsappUrl && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
											href: whatsappUrl,
											target: "_blank",
											rel: "noopener noreferrer",
											"aria-label": "WhatsApp",
											className: "hover:scale-105 transition-transform",
											title: "WhatsApp",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WhatsAppLogo, { className: "size-8" })
										}),
										telegramUrl && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
											href: telegramUrl,
											target: "_blank",
											rel: "noopener noreferrer",
											"aria-label": "Telegram",
											className: "hover:scale-105 transition-transform",
											title: "Telegram",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TelegramLogo, { className: "size-8" })
										}),
										viberUrl && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
											href: viberUrl,
											target: "_blank",
											rel: "noopener noreferrer",
											"aria-label": "Viber",
											className: "hover:scale-105 transition-transform",
											title: "Viber",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ViberLogo, { className: "size-8" })
										}),
										phoneItem.href && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
											href: phoneItem.href,
											"aria-label": "Call",
											className: "hover:scale-105 transition-transform",
											title: "Call",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PhoneLogo, { className: "size-8" })
										}),
										emailItem.value && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
											href: `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(emailItem.value)}`,
											target: "_blank",
											rel: "noopener noreferrer",
											"aria-label": "Gmail",
											className: "hover:scale-105 transition-transform",
											title: "Gmail",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GmailLogo, { className: "size-8" })
										}),
										instagramUrl && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
											href: instagramUrl,
											target: "_blank",
											rel: "noopener noreferrer",
											"aria-label": "Instagram",
											className: "hover:scale-105 transition-transform",
											title: "Instagram",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InstagramLogo, { className: "size-8" })
										}),
										facebookUrl && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
											href: facebookUrl,
											target: "_blank",
											rel: "noopener noreferrer",
											"aria-label": "Facebook",
											className: "hover:scale-105 transition-transform",
											title: "Facebook",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FacebookLogo, { className: "size-8" })
										})
									]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "pt-2 border-t border-hairline",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-[11px] font-semibold uppercase tracking-wider text-label mb-2",
									children: "Professional & Open Source"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
											href: linkedinUrl,
											target: "_blank",
											rel: "noopener noreferrer",
											"aria-label": "LinkedIn",
											title: "Codex Dynamics on LinkedIn",
											className: "size-8 rounded-full hover:scale-110 active:scale-95 transition-transform flex items-center justify-center",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LinkedInLogo, { className: "size-8" })
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
											href: twitterUrl,
											target: "_blank",
											rel: "noopener noreferrer",
											"aria-label": "Twitter / X",
											title: "Codex Dynamics on Twitter",
											className: "size-8 rounded-full hover:scale-110 active:scale-95 transition-transform flex items-center justify-center",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TwitterXLogo, { className: "size-8" })
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
											href: githubUrl,
											target: "_blank",
											rel: "noopener noreferrer",
											"aria-label": "GitHub",
											title: "Codex Dynamics on GitHub",
											className: "size-8 rounded-full hover:scale-110 active:scale-95 transition-transform flex items-center justify-center",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GitHubLogo, { className: "size-8" })
										})
									]
								})]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "lg:col-span-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "mb-4 font-medium text-label",
							children: "Company"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
							className: "space-y-2.5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: "#process",
									className: "hover:text-label transition-colors",
									children: "Process"
								}) }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: "#capabilities",
									className: "hover:text-label transition-colors",
									children: "Capabilities"
								}) }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: "#about",
									className: "hover:text-label transition-colors",
									children: "About"
								}) }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: "/blog",
									className: "hover:text-label transition-colors font-medium text-blue",
									children: "Blog & Insights"
								}) })
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "lg:col-span-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "mb-4 font-medium text-label",
							children: "Work & Inquiries"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
							className: "space-y-2.5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: "#work",
									className: "hover:text-label transition-colors",
									children: "Selected work"
								}) }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: "#results",
									className: "hover:text-label transition-colors",
									children: "Results"
								}) }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => openContactModal("High-Performance Website"),
									className: "hover:text-label transition-colors cursor-pointer text-left text-blue font-medium",
									children: "Start a project"
								}) }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									onClick: () => openContactModal("General Inquiry"),
									className: "hover:text-label transition-colors cursor-pointer text-left flex items-center gap-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageSquare, { className: "size-3" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Contact Us" })]
								}) })
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "lg:col-span-4 space-y-4",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NewsletterSignup, {
							variant: "footer",
							source: "footer_subscription",
							placeholder: "Your email address..."
						})
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-12 flex flex-col justify-between items-center gap-4 border-t border-hairline pt-7 text-xs sm:flex-row",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: config.footer?.copyrightText ? config.footer.copyrightText.replace("{year}", String(year)) : `© ${year} ${brandName}. All rights reserved.` }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex items-center gap-4",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => openContactModal(),
							className: "text-xs text-blue hover:text-blue-hover font-medium underline underline-offset-4 cursor-pointer",
							children: "Contact Us"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
						addressItem.city,
						" · ",
						addressItem.street
					] })
				]
			})]
		})
	});
}
var DEFAULT_SITE_NAME = "Codex Dynamics";
var DEFAULT_TITLE = "Codex Dynamics — High-Performance Websites & Digital Agency";
var DEFAULT_DESCRIPTION = "High-performance websites, web design, web development, and digital marketing agency. Precision engineering on every screen.";
var DEFAULT_OG_IMAGE = "/hero/studio.jpg";
/**
* SEO component managing document head tags including title, meta descriptions,
* Open Graph, Twitter Cards, canonical links, and Schema.org JSON-LD.
* Acts as a reactive lightweight Head manager (pure React 19 + DOM reconciliation).
*/
function SEO({ title, description, canonical, ogType = "website", ogImage, articleAuthor = DEFAULT_SITE_NAME, articlePublishedTime, articleModifiedTime, articleSection, articleTags, twitterCard = "summary_large_image", keywords, schemaOrg, noIndex = false }) {
	const { config } = useSiteConfig();
	const siteName = config.siteName || DEFAULT_SITE_NAME;
	const configTitle = config.seo?.metaTitle || DEFAULT_TITLE;
	const configDesc = config.seo?.metaDescription || DEFAULT_DESCRIPTION;
	const configOgImage = config.seo?.ogImage || DEFAULT_OG_IMAGE;
	const configCanonical = config.seo?.canonicalUrl;
	const finalTitle = title ? `${title} — ${siteName}` : configTitle;
	const finalDescription = description || configDesc;
	const finalOgImage = ogImage || configOgImage;
	const finalCanonical = canonical || configCanonical;
	(0, import_react.useEffect)(() => {
		if (typeof document === "undefined") return;
		document.title = finalTitle;
		const setMeta = (selector, attributeName, attributeValue, content) => {
			let el = document.head.querySelector(selector);
			if (!el) {
				el = document.createElement("meta");
				el.setAttribute(attributeName, attributeValue);
				document.head.appendChild(el);
			}
			el.setAttribute("content", content);
		};
		const setLink = (rel, href) => {
			let el = document.head.querySelector(`link[rel="${rel}"]`);
			if (!el) {
				el = document.createElement("link");
				el.setAttribute(rel, rel);
				document.head.appendChild(el);
			}
			el.setAttribute("href", href);
		};
		const removeMeta = (selector) => {
			const el = document.head.querySelector(selector);
			if (el) el.remove();
		};
		if (config.branding?.favicon) setLink("icon", config.branding.favicon);
		if (config.seo?.gscVerification) setMeta("meta[name=\"google-site-verification\"]", "name", "google-site-verification", config.seo.gscVerification);
		if (config.seo?.gaId && !document.getElementById("ga4-script")) {
			const gaScript = document.createElement("script");
			gaScript.id = "ga4-script";
			gaScript.async = true;
			gaScript.src = `https://www.googletagmanager.com/gtag/js?id=${config.seo.gaId}`;
			document.head.appendChild(gaScript);
			const gaInit = document.createElement("script");
			gaInit.id = "ga4-init";
			gaInit.textContent = `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${config.seo.gaId}');`;
			document.head.appendChild(gaInit);
		}
		const pixelId = config.seo?.metaPixelId || config.seo?.pixelId;
		if (pixelId && !document.getElementById("meta-pixel-script")) {
			const fbScript = document.createElement("script");
			fbScript.id = "meta-pixel-script";
			fbScript.textContent = `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${pixelId}');fbq('track','PageView');`;
			document.head.appendChild(fbScript);
			const noScript = document.createElement("noscript");
			noScript.id = "meta-pixel-noscript";
			const img = document.createElement("img");
			img.height = 1;
			img.width = 1;
			img.style.display = "none";
			img.src = `https://www.facebook.com/tr?id=${pixelId}&ev=PageView&noscript=1`;
			noScript.appendChild(img);
			document.head.appendChild(noScript);
		}
		setMeta("meta[name=\"description\"]", "name", "description", finalDescription);
		if (keywords && keywords.length > 0) setMeta("meta[name=\"keywords\"]", "name", "keywords", keywords.join(", "));
		else removeMeta("meta[name=\"keywords\"]");
		if (noIndex) setMeta("meta[name=\"robots\"]", "name", "robots", "noindex, nofollow");
		else setMeta("meta[name=\"robots\"]", "name", "robots", "index, follow, max-image-preview:large");
		const currentUrl = finalCanonical || (typeof window !== "undefined" ? window.location.href : "");
		if (currentUrl) setLink("canonical", currentUrl);
		setMeta("meta[property=\"og:site_name\"]", "property", "og:site_name", siteName);
		setMeta("meta[property=\"og:title\"]", "property", "og:title", title || configTitle);
		setMeta("meta[property=\"og:description\"]", "property", "og:description", finalDescription);
		setMeta("meta[property=\"og:type\"]", "property", "og:type", ogType);
		if (currentUrl) setMeta("meta[property=\"og:url\"]", "property", "og:url", currentUrl);
		if (finalOgImage) setMeta("meta[property=\"og:image\"]", "property", "og:image", finalOgImage.startsWith("http") ? finalOgImage : `${window.location.origin}${finalOgImage.startsWith("/") ? "" : "/"}${finalOgImage}`);
		if (ogType === "article") {
			setMeta("meta[property=\"article:author\"]", "property", "article:author", articleAuthor);
			if (articlePublishedTime) setMeta("meta[property=\"article:published_time\"]", "property", "article:published_time", articlePublishedTime);
			if (articleModifiedTime) setMeta("meta[property=\"article:modified_time\"]", "property", "article:modified_time", articleModifiedTime);
			if (articleSection) setMeta("meta[property=\"article:section\"]", "property", "article:section", articleSection);
			if (articleTags && articleTags.length > 0) setMeta("meta[property=\"article:tag\"]", "property", "article:tag", articleTags.join(", "));
		} else {
			removeMeta("meta[property=\"article:author\"]");
			removeMeta("meta[property=\"article:published_time\"]");
			removeMeta("meta[property=\"article:modified_time\"]");
			removeMeta("meta[property=\"article:section\"]");
			removeMeta("meta[property=\"article:tag\"]");
		}
		setMeta("meta[name=\"twitter:card\"]", "name", "twitter:card", twitterCard);
		setMeta("meta[name=\"twitter:title\"]", "name", "twitter:title", title || configTitle);
		setMeta("meta[name=\"twitter:description\"]", "name", "twitter:description", finalDescription);
		if (finalOgImage) setMeta("meta[name=\"twitter:image\"]", "name", "twitter:image", finalOgImage.startsWith("http") ? finalOgImage : `${window.location.origin}${finalOgImage.startsWith("/") ? "" : "/"}${finalOgImage}`);
		const scriptId = "seo-schema-jsonld";
		let scriptEl = document.getElementById(scriptId);
		if (schemaOrg) {
			if (!scriptEl) {
				scriptEl = document.createElement("script");
				scriptEl.id = scriptId;
				scriptEl.type = "application/ld+json";
				document.head.appendChild(scriptEl);
			}
			scriptEl.textContent = JSON.stringify(schemaOrg);
		} else if (scriptEl) scriptEl.remove();
		return () => {
			document.title = DEFAULT_TITLE;
		};
	}, [
		finalTitle,
		title,
		finalDescription,
		finalCanonical,
		ogType,
		finalOgImage,
		siteName,
		configTitle,
		config.branding?.favicon,
		config.seo?.gscVerification,
		config.seo?.gaId,
		config.seo?.metaPixelId,
		config.seo?.pixelId,
		articleAuthor,
		articlePublishedTime,
		articleModifiedTime,
		articleSection,
		articleTags,
		twitterCard,
		keywords,
		schemaOrg,
		noIndex
	]);
	return null;
}
/**
* ScrollProgress displays a reactive, smooth progress bar at the top of the viewport
* (or container) as the user scrolls through long-form content, optimizing readability
* and reading orientation on mobile and desktop devices.
*/
function ScrollProgress({ className, targetRef, height = "h-1", color = "bg-blue" }) {
	const [progress, setProgress] = (0, import_react.useState)(0);
	(0, import_react.useEffect)(() => {
		if (targetRef?.current) {
			const el = targetRef.current;
			const handleScroll = () => {
				const scrollTop = el.scrollTop;
				const scrollHeight = el.scrollHeight - el.clientHeight;
				if (scrollHeight > 0) {
					const ratio = Math.min(1, Math.max(0, scrollTop / scrollHeight));
					setProgress(ratio * 100);
				} else setProgress(0);
			};
			el.addEventListener("scroll", handleScroll, { passive: true });
			handleScroll();
			return () => el.removeEventListener("scroll", handleScroll);
		}
		const handleWindowScroll = () => {
			const scrollTop = window.scrollY || document.documentElement.scrollTop;
			const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
			if (docHeight > 0) {
				const ratio = Math.min(1, Math.max(0, scrollTop / docHeight));
				setProgress(ratio * 100);
			} else setProgress(0);
		};
		window.addEventListener("scroll", handleWindowScroll, { passive: true });
		handleWindowScroll();
		return () => window.removeEventListener("scroll", handleWindowScroll);
	}, [targetRef]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("pointer-events-none fixed top-0 left-0 right-0 z-[100] w-full bg-transparent", className),
		"aria-hidden": "true",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: cn("h-1 origin-left transition-[transform,width] duration-75 ease-out shadow-xs", height, color),
			style: { width: `${progress}%` }
		})
	});
}
/**
* Estimates reading time in minutes for a given text or markdown string.
* Uses the industry standard reading speed of 200–225 words per minute.
*/
function calculateReadingTime(content, wpm = 200) {
	if (!content || typeof content !== "string") return {
		minutes: 1,
		text: "1 min read",
		words: 0
	};
	const cleanText = content.replace(/!\[.*?\]\(.*?\)/g, "").replace(/\[([^\]]+)\]\([^)]+\)/g, "$1").replace(/[#*`_~>[\]()-]/g, " ").replace(/\s+/g, " ").trim();
	const words = cleanText ? cleanText.split(/\s+/).filter(Boolean).length : 0;
	const minutes = Math.max(1, Math.ceil(words / wpm));
	return {
		minutes,
		text: `${minutes} min read`,
		words
	};
}
function CustomCodeContainer({ html, containerId }) {
	const containerRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		const container = containerRef.current;
		if (!container) return;
		if (!html || !html.trim()) {
			container.innerHTML = "";
			return;
		}
		container.innerHTML = "";
		try {
			const doc = new DOMParser().parseFromString(html, "text/html");
			Array.from(doc.head.childNodes).concat(Array.from(doc.body.childNodes)).forEach((node) => {
				if (node.nodeName.toLowerCase() === "script") {
					const oldScript = node;
					const newScript = document.createElement("script");
					Array.from(oldScript.attributes).forEach((attr) => {
						newScript.setAttribute(attr.name, attr.value);
					});
					newScript.text = oldScript.text || oldScript.textContent || "";
					newScript.async = false;
					container.appendChild(newScript);
				} else container.appendChild(node.cloneNode(true));
			});
		} catch {
			container.innerHTML = html;
		}
		return () => {
			if (container) container.innerHTML = "";
		};
	}, [html]);
	if (!html) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		id: containerId,
		ref: containerRef,
		className: "custom-code-injection"
	});
}
function SiteCanvas({ children, preview = false, className }) {
	const { config } = useSiteConfig();
	const theme = config.theme;
	const themeId = theme?.activeTheme || "codex-pro";
	const header = theme?.headerStyle || "floating";
	const hero = theme?.heroLayout || theme?.layout?.heroLayout || "streamer";
	const cards = theme?.cardStyle || theme?.layout?.cardStyle || "glass";
	const scale = theme?.fontSizeScale || theme?.layout?.fontSizeScale || "normal";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("site-canvas min-h-screen bg-background text-foreground", className),
		"data-site-theme": themeId,
		"data-header-style": header,
		"data-hero-layout": hero,
		"data-card-style": cards,
		"data-type-scale": scale,
		"data-preview": preview ? "true" : void 0,
		"data-theme": "light",
		style: buildThemeStyle(config),
		children: [
			theme?.customCss ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("style", {
				"data-theme-css": true,
				children: theme.customCss
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CustomCodeContainer, {
				html: config.codeInjection?.headerCode,
				containerId: "custom-head-code-injection"
			}),
			children,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CustomCodeContainer, {
				html: config.codeInjection?.footerCode,
				containerId: "custom-footer-code-injection"
			})
		]
	});
}
//#endregion
export { SEO as a, calculateReadingTime as c, resolveSectionsOrder as d, scrollToId as f, NewsletterSignup as i, isComponentEnabled as l, Footer as n, ScrollProgress as o, usePreviewMode as p, Nav as r, SiteCanvas as s, Button as t, resolveSectionVisibility as u };
