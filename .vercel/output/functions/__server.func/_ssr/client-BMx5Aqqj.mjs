import { i as __toESM } from "../_runtime.mjs";
import { r as require_react } from "../_libs/@fortawesome/react-fontawesome+[...].mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { B as Headphones, J as ExternalLink, L as LayoutDashboard, N as LogOut, O as MessageCircle, Q as ClipboardCheck, U as FolderOpen, W as FilePenLine, _ as Send, a as UserRound, et as CircleCheck, f as Sparkles, ft as Bell, h as ShieldCheck, lt as CalendarDays, o as Upload, st as ChartColumn, u as ThumbsUp, ut as Briefcase, x as Receipt } from "../_libs/lucide-react.mjs";
import { a as getClientMessages, c as readClientToken, i as getClientInvoices, l as requestClientService, n as authMe, o as getClientWorkspace, r as clearClientToken, u as sendClientMessage } from "./api-BHfs_otP.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/client-BMx5Aqqj.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName = "/app/applet/src/routes/client.tsx?tsr-split=component";
var services = [
	[
		"Web",
		"Websites & web apps",
		"Design, build, CMS, integrations and launch support."
	],
	[
		"Brand",
		"Brand identity & UI/UX",
		"Logo systems, interfaces, prototypes and campaign assets."
	],
	[
		"CRM",
		"CRM & sales infrastructure",
		"Pipelines, calling workflows, automations and permissions."
	],
	[
		"Email",
		"Email marketing",
		"Branded templates, nurture sequences and performance reporting."
	],
	[
		"Ads",
		"Paid acquisition",
		"Meta and Google strategy, creative, tracking and optimisation."
	]
];
var additionalServices = [
	[
		"Care",
		"Website care plan",
		"Ongoing updates, security checks, backups and performance tuning."
	],
	[
		"Content",
		"Content production",
		"Landing pages, campaign copy, email content and social creative."
	],
	[
		"Analytics",
		"Analytics & reporting",
		"Tracking setup, monthly reporting and conversion insights."
	]
];
var surface = {
	background: "#30353E",
	border: "1px solid #414751",
	borderRadius: 12
};
function ClientWorkspace() {
	const [user, setUser] = (0, import_react.useState)();
	const [invoices, setInvoices] = (0, import_react.useState)([]);
	const [messages, setMessages] = (0, import_react.useState)([]);
	const [_workspace, setWorkspace] = (0, import_react.useState)(null);
	const [section, setSection] = (0, import_react.useState)("overview");
	const [draft, setDraft] = (0, import_react.useState)("");
	const [loading, setLoading] = (0, import_react.useState)(true);
	(0, import_react.useEffect)(() => {
		if (!readClientToken()) {
			window.location.assign("/login");
			return;
		}
		Promise.all([
			authMe(),
			getClientInvoices(),
			getClientMessages(),
			getClientWorkspace()
		]).then(([profile, inv, chat, accountWorkspace]) => {
			if (!profile) {
				clearClientToken();
				window.location.assign("/login");
				return;
			}
			setUser(profile);
			setInvoices(inv?.invoices || []);
			setMessages(chat?.messages || []);
			setWorkspace(accountWorkspace);
		}).catch(() => {
			clearClientToken();
			window.location.assign("/login");
		}).finally(() => setLoading(false));
	}, []);
	if (loading) return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		style: {
			minHeight: "100vh",
			display: "grid",
			placeItems: "center",
			background: "#252930",
			color: "#EAECEF"
		},
		children: "Loading workspace..."
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 39,
		columnNumber: 23
	}, this);
	if (!user) return null;
	const send = async () => {
		if (!draft.trim()) return;
		const result = await sendClientMessage(draft.trim());
		if (result?.message) setMessages((items) => [...items, result.message]);
		setDraft("");
	};
	const requestService = async (name) => {
		await requestClientService({
			type: "service",
			service: name,
			message: `I would like to discuss ordering the ${name} service.`
		});
		const result = await sendClientMessage(`I would like to discuss ordering the ${name} service.`);
		if (result?.message) setMessages((items) => [...items, result.message]);
		setSection("support");
	};
	const startServiceEnquiry = (prompt) => {
		setDraft(prompt);
		setSection("support");
	};
	const logout = () => {
		clearClientToken();
		window.location.assign("/login");
	};
	const tabs = [
		[
			"overview",
			"Overview",
			LayoutDashboard
		],
		[
			"services",
			"Services",
			Sparkles
		],
		[
			"projects",
			"Projects",
			ClipboardCheck
		],
		[
			"files",
			"Files",
			FolderOpen
		],
		[
			"billing",
			"Billing",
			Receipt
		],
		[
			"campaigns",
			"Campaigns",
			ChartColumn
		],
		[
			"approvals",
			"Approvals",
			ThumbsUp
		],
		[
			"links",
			"Links",
			ExternalLink
		],
		[
			"support",
			"Support",
			Headphones
		],
		[
			"account",
			"Account",
			UserRound
		]
	];
	const connectedTabs = [[
		"connected",
		"Back office",
		ExternalLink
	]];
	if (section === "connected") return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ConnectedSystemsPageV2, {
		user,
		onBack: () => setSection("overview"),
		onRequest: () => startServiceEnquiry("I would like to connect a business system to my client account. Please tell me what access details you need.")
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 74,
		columnNumber: 12
	}, this);
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		style: {
			minHeight: "100vh",
			background: "#252930",
			color: "#EAECEF",
			fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Segoe UI', sans-serif"
		},
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			style: {
				display: "grid",
				gridTemplateColumns: "230px minmax(0, 1fr)",
				minHeight: "100vh"
			},
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("aside", {
				style: {
					background: "#2A2E36",
					borderRight: "1px solid #3C424D",
					padding: 20,
					display: "flex",
					flexDirection: "column"
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						style: {
							display: "flex",
							alignItems: "center",
							gap: 10,
							marginBottom: 42
						},
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("strong", {
							style: {
								display: "grid",
								placeItems: "center",
								width: 36,
								height: 36,
								borderRadius: 9,
								background: "#F0B90B",
								color: "#20242B"
							},
							children: "CD"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 99,
							columnNumber: 12
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("b", { children: "Codex Dynamics" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 107,
							columnNumber: 30
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							style: {
								color: "#848E9C",
								fontSize: 11
							},
							children: "Client workspace"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 107,
							columnNumber: 51
						}, this)] }, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 107,
							columnNumber: 25
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 94,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						style: {
							color: "#848E9C",
							fontSize: 10,
							textTransform: "uppercase",
							letterSpacing: ".1em",
							marginBottom: 10
						},
						children: "Codex workspace"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 111,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("nav", {
						style: {
							display: "grid",
							gap: 4
						},
						children: tabs.map(([key, label, Icon]) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
							onClick: () => setSection(key),
							style: {
								display: "flex",
								alignItems: "center",
								gap: 10,
								border: 0,
								borderRadius: 7,
								padding: "11px 10px",
								textAlign: "left",
								color: section === key ? "#F0B90B" : "#A8AEB8",
								background: section === key ? "#3A3F48" : "transparent"
							},
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Icon, { size: 16 }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 131,
								columnNumber: 14
							}, this), label]
						}, key, true, {
							fileName: _jsxFileName,
							lineNumber: 121,
							columnNumber: 46
						}, this))
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 118,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						style: {
							color: "#848E9C",
							fontSize: 10,
							textTransform: "uppercase",
							letterSpacing: ".1em",
							margin: "22px 0 10px"
						},
						children: "Business operations"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 132,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("nav", {
						style: {
							display: "grid",
							gap: 4
						},
						children: connectedTabs.map(([key, label, Icon]) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
							onClick: () => setSection(key),
							style: {
								display: "flex",
								alignItems: "center",
								gap: 10,
								border: 0,
								borderRadius: 7,
								padding: "11px 10px",
								textAlign: "left",
								color: section === key ? "#F0B90B" : "#A8AEB8",
								background: section === key ? "#3A3F48" : "transparent"
							},
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Icon, { size: 16 }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 152,
								columnNumber: 14
							}, this), label]
						}, key, true, {
							fileName: _jsxFileName,
							lineNumber: 142,
							columnNumber: 55
						}, this))
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 139,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						style: {
							marginTop: "auto",
							borderTop: "1px solid #3C424D",
							paddingTop: 16
						},
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("b", {
								style: { fontSize: 13 },
								children: user.name || "Client"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 157,
								columnNumber: 12
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								style: {
									color: "#848E9C",
									fontSize: 11,
									margin: "4px 0 14px"
								},
								children: user.email
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 159,
								columnNumber: 41
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
								onClick: logout,
								style: {
									width: "100%",
									display: "flex",
									gap: 8,
									padding: 9,
									border: "1px solid #444A55",
									borderRadius: 7,
									background: "transparent",
									color: "#A8AEB8"
								},
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(LogOut, { size: 15 }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 172,
									columnNumber: 14
								}, this), " Sign out"]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 163,
								columnNumber: 32
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 153,
						columnNumber: 9
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 87,
				columnNumber: 7
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("main", {
				style: {
					padding: "30px clamp(18px, 4vw, 54px) 48px",
					minWidth: 0
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("header", {
						style: {
							display: "flex",
							justifyContent: "space-between",
							gap: 20,
							marginBottom: 30
						},
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								style: {
									color: "#F0B90B",
									fontSize: 11,
									fontWeight: 700,
									letterSpacing: ".12em",
									textTransform: "uppercase"
								},
								children: "Client account"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 183,
								columnNumber: 17
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", {
								style: {
									margin: "7px 0 0",
									fontSize: "clamp(26px, 4vw, 38px)"
								},
								children: [
									"Welcome, ",
									(user.name || "there").split(" ")[0],
									"."
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 189,
								columnNumber: 36
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								style: {
									color: "#A8AEB8",
									margin: "8px 0 0"
								},
								children: "Everything about your Codex Dynamics work, in one place."
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 192,
								columnNumber: 69
							}, this)
						] }, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 183,
							columnNumber: 12
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
							onClick: () => setSection("support"),
							style: {
								display: "flex",
								alignItems: "center",
								gap: 8,
								height: 40,
								padding: "0 13px",
								border: "1px solid #4A515C",
								borderRadius: 7,
								background: "#30353E",
								color: "#EAECEF"
							},
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(MessageCircle, { size: 16 }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 205,
								columnNumber: 14
							}, this), " Contact support"]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 195,
							columnNumber: 82
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 178,
						columnNumber: 9
					}, this),
					section === "overview" && /* @__PURE__ */ (void 0)(Overview, {
						user,
						invoices,
						setSection
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 206,
						columnNumber: 36
					}, this),
					section === "services" && /* @__PURE__ */ (void 0)(Page, {
						title: "Services",
						subtitle: "Review active work or request another service from your account team.",
						children: [/* @__PURE__ */ (void 0)("div", {
							style: { marginBottom: 26 },
							children: [/* @__PURE__ */ (void 0)("div", {
								style: {
									color: "#848E9C",
									fontSize: 11,
									letterSpacing: ".1em",
									textTransform: "uppercase",
									marginBottom: 10
								},
								children: "Your active services"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 209,
								columnNumber: 14
							}, this), services.map((item) => /* @__PURE__ */ (void 0)(Service, { item }, item[0], false, {
								fileName: _jsxFileName,
								lineNumber: 215,
								columnNumber: 64
							}, this))]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 207,
							columnNumber: 140
						}, this), /* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("div", {
							style: {
								display: "flex",
								justifyContent: "space-between",
								alignItems: "center",
								gap: 12,
								marginBottom: 10,
								flexWrap: "wrap"
							},
							children: [/* @__PURE__ */ (void 0)("div", {
								style: {
									color: "#F0B90B",
									fontSize: 11,
									letterSpacing: ".1em",
									textTransform: "uppercase"
								},
								children: "Available services"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 222,
								columnNumber: 16
							}, this), /* @__PURE__ */ (void 0)("div", {
								style: {
									display: "flex",
									gap: 8
								},
								children: [/* @__PURE__ */ (void 0)("button", {
									onClick: () => startServiceEnquiry("I would like to order a service. Please help me choose the right option."),
									style: {
										border: 0,
										borderRadius: 7,
										background: "#F0B90B",
										color: "#20242B",
										padding: "8px 11px",
										fontSize: 12,
										fontWeight: 800
									},
									children: "Order a service"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 230,
									columnNumber: 18
								}, this), /* @__PURE__ */ (void 0)("button", {
									onClick: () => startServiceEnquiry("I have an enquiry about your services. Please get back to me."),
									style: {
										border: "1px solid #4A515C",
										borderRadius: 7,
										background: "transparent",
										color: "#EAECEF",
										padding: "8px 11px",
										fontSize: 12,
										fontWeight: 700
									},
									children: "Make an enquiry"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 238,
									columnNumber: 44
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 227,
								columnNumber: 42
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 215,
							columnNumber: 114
						}, this), /* @__PURE__ */ (void 0)("div", {
							style: {
								display: "grid",
								gap: 12
							},
							children: additionalServices.map((item) => /* @__PURE__ */ (void 0)(Service, {
								item,
								action: () => requestService(item[1]),
								actionLabel: "Request service"
							}, item[0], false, {
								fileName: _jsxFileName,
								lineNumber: 249,
								columnNumber: 48
							}, this))
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 246,
							columnNumber: 56
						}, this)] }, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 215,
							columnNumber: 109
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 207,
						columnNumber: 36
					}, this),
					section === "projects" && /* @__PURE__ */ (void 0)(Page, {
						title: "Projects & timeline",
						subtitle: "Track milestones, owners, deadlines and the next action for each engagement.",
						children: [/* @__PURE__ */ (void 0)("div", {
							style: {
								...surface,
								padding: 20
							},
							children: [/* @__PURE__ */ (void 0)("div", {
								style: {
									display: "flex",
									justifyContent: "space-between",
									alignItems: "center"
								},
								children: [/* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("b", { children: "Website and digital presence" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 257,
									columnNumber: 21
								}, this), /* @__PURE__ */ (void 0)("div", {
									style: {
										color: "#848E9C",
										fontSize: 12,
										marginTop: 4
									},
									children: "Project timeline will appear when an engagement is assigned."
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 257,
									columnNumber: 56
								}, this)] }, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 257,
									columnNumber: 16
								}, this), /* @__PURE__ */ (void 0)(Status, { text: "Planning" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 261,
									columnNumber: 92
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 253,
								columnNumber: 14
							}, this), /* @__PURE__ */ (void 0)("div", {
								style: {
									display: "grid",
									gridTemplateColumns: "repeat(4, 1fr)",
									gap: 8,
									marginTop: 22
								},
								children: [
									"Brief",
									"Design",
									"Build",
									"Launch"
								].map((step, index) => /* @__PURE__ */ (void 0)("div", {
									style: {
										borderTop: `3px solid ${index === 0 ? "#F0B90B" : "#4A515C"}`,
										paddingTop: 9,
										color: index === 0 ? "#EAECEF" : "#848E9C",
										fontSize: 12
									},
									children: [step, /* @__PURE__ */ (void 0)("div", {
										style: {
											fontSize: 11,
											marginTop: 4
										},
										children: index === 0 ? "Ready" : "Not started"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 271,
										columnNumber: 24
									}, this)]
								}, step, true, {
									fileName: _jsxFileName,
									lineNumber: 266,
									columnNumber: 77
								}, this))
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 261,
								columnNumber: 124
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 250,
							columnNumber: 158
						}, this), /* @__PURE__ */ (void 0)(ActionCard, {
							icon: CalendarDays,
							title: "No milestone dates yet",
							text: "Ask support to set up your project timeline and review schedule.",
							action: "Request a project plan",
							onClick: () => startServiceEnquiry("Please set up a project timeline and milestone review schedule for my account.")
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 274,
							columnNumber: 85
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 250,
						columnNumber: 36
					}, this),
					section === "files" && /* @__PURE__ */ (void 0)(Page, {
						title: "Files & documents",
						subtitle: "Keep briefs, creatives, contracts, receipts and deliverables together.",
						children: /* @__PURE__ */ (void 0)("div", {
							style: {
								display: "grid",
								gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
								gap: 12
							},
							children: [
								/* @__PURE__ */ (void 0)(ActionCard, {
									icon: FolderOpen,
									title: "Project files",
									text: "Website assets, design exports and campaign creatives.",
									action: "Request files",
									onClick: () => startServiceEnquiry("Please help me access the project files for my account.")
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 279,
									columnNumber: 14
								}, this),
								/* @__PURE__ */ (void 0)(ActionCard, {
									icon: Receipt,
									title: "Receipts",
									text: "Downloadable payment records and invoices.",
									action: "View billing",
									onClick: () => setSection("billing")
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 279,
									columnNumber: 248
								}, this),
								/* @__PURE__ */ (void 0)(ActionCard, {
									icon: Upload,
									title: "Upload a file",
									text: "Send a brief, logo, copy or approval asset to the team.",
									action: "Upload via support",
									onClick: () => startServiceEnquiry("I need to upload a file for my project. Please tell me where to send it.")
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 279,
									columnNumber: 404
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 275,
							columnNumber: 147
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 275,
						columnNumber: 33
					}, this),
					section === "approvals" && /* @__PURE__ */ (void 0)(Page, {
						title: "Approvals",
						subtitle: "Review and approve work before it goes live.",
						children: [/* @__PURE__ */ (void 0)(ActionCard, {
							icon: ThumbsUp,
							title: "Nothing waiting for approval",
							text: "New website designs, campaign creatives and copy approvals will appear here.",
							action: "Ask what is next",
							onClick: () => startServiceEnquiry("Do I have any project or campaign items waiting for approval?")
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 280,
							columnNumber: 117
						}, this), /* @__PURE__ */ (void 0)(ActionCard, {
							icon: ClipboardCheck,
							title: "Revision requests",
							text: "Send clear feedback and keep the approval history in one thread.",
							action: "Request a revision",
							onClick: () => startServiceEnquiry("I would like to request a revision to my current project.")
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 280,
							columnNumber: 395
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 280,
						columnNumber: 37
					}, this),
					section === "links" && /* @__PURE__ */ (void 0)(Page, {
						title: "Websites & campaign links",
						subtitle: "Quick access to the digital properties your team manages.",
						children: [/* @__PURE__ */ (void 0)("div", {
							style: {
								display: "grid",
								gap: 12
							},
							children: [
								/* @__PURE__ */ (void 0)(LinkCard, {
									title: "Live website",
									text: "No website connected yet"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 284,
									columnNumber: 14
								}, this),
								/* @__PURE__ */ (void 0)(LinkCard, {
									title: "Staging website",
									text: "No staging link connected yet"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 284,
									columnNumber: 79
								}, this),
								/* @__PURE__ */ (void 0)(LinkCard, {
									title: "Marketing dashboards",
									text: "Google Ads, Meta Ads and analytics links will appear here"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 284,
									columnNumber: 152
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 281,
							columnNumber: 142
						}, this), /* @__PURE__ */ (void 0)(ActionCard, {
							icon: ExternalLink,
							title: "Connect a link",
							text: "Ask the team to attach a website, campaign or reporting dashboard.",
							action: "Request a link",
							onClick: () => startServiceEnquiry("Please connect my website or marketing dashboard links to this account.")
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 284,
							columnNumber: 264
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 281,
						columnNumber: 33
					}, this),
					section === "connected" && /* @__PURE__ */ (void 0)(Page, {
						title: "Connected systems",
						subtitle: "External tools belonging to your business. Codex Dynamics does not manage these systems from this screen.",
						children: [/* @__PURE__ */ (void 0)("div", {
							style: {
								display: "grid",
								gap: 12
							},
							children: [
								/* @__PURE__ */ (void 0)(ExternalSystem, {
									title: "Website administration",
									provider: "External website CMS or back office",
									detail: "Manage pages, bookings and website content in the system connected to your site."
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 288,
									columnNumber: 14
								}, this),
								/* @__PURE__ */ (void 0)(ExternalSystem, {
									title: "Booking management",
									provider: "External booking platform",
									detail: "View and manage appointments collected from your website."
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 288,
									columnNumber: 200
								}, this),
								/* @__PURE__ */ (void 0)(ExternalSystem, {
									title: "Zoho Mail",
									provider: "External mailbox",
									detail: "Open your business mailbox in Zoho without exposing your password here."
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 288,
									columnNumber: 349
								}, this),
								/* @__PURE__ */ (void 0)(ExternalSystem, {
									title: "Hostinger Mail",
									provider: "External mailbox",
									detail: "Open your business mailbox in Hostinger Webmail."
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 288,
									columnNumber: 494
								}, this),
								/* @__PURE__ */ (void 0)(ExternalSystem, {
									title: "Analytics & advertising",
									provider: "Google Analytics, Google Ads or Meta",
									detail: "Open connected reporting and advertising platforms."
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 288,
									columnNumber: 621
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 285,
							columnNumber: 186
						}, this), /* @__PURE__ */ (void 0)(ActionCard, {
							icon: ExternalLink,
							title: "Connect a business system",
							text: "Ask Codex Dynamics to attach a website, booking platform, mailbox or reporting tool.",
							action: "Request a connection",
							onClick: () => startServiceEnquiry("I would like to connect a business system to my client account. Please tell me what access details you need.")
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 288,
							columnNumber: 786
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 285,
						columnNumber: 37
					}, this),
					section === "account" && /* @__PURE__ */ (void 0)(Page, {
						title: "Account & security",
						subtitle: "Manage your profile, access and client preferences.",
						children: [/* @__PURE__ */ (void 0)("div", {
							style: {
								display: "grid",
								gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))",
								gap: 12
							},
							children: [
								/* @__PURE__ */ (void 0)(ActionCard, {
									icon: UserRound,
									title: "Profile details",
									text: `${user.name || "Client"} · ${user.email}`,
									action: "Update via support",
									onClick: () => startServiceEnquiry("I need to update my client profile details.")
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 293,
									columnNumber: 14
								}, this),
								/* @__PURE__ */ (void 0)(ActionCard, {
									icon: ShieldCheck,
									title: "Security",
									text: "Password changes, login history and two-factor authentication.",
									action: "Ask about security",
									onClick: () => startServiceEnquiry("I would like to review my account security options.")
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 293,
									columnNumber: 230
								}, this),
								/* @__PURE__ */ (void 0)(ActionCard, {
									icon: FilePenLine,
									title: "Contracts & agreements",
									text: "Service terms, renewal dates and signed agreements.",
									action: "Request documents",
									onClick: () => startServiceEnquiry("Please send me the contracts and service agreements for my account.")
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 293,
									columnNumber: 469
								}, this),
								/* @__PURE__ */ (void 0)(ActionCard, {
									icon: Bell,
									title: "Notifications",
									text: "Invoice, approval, campaign and project updates.",
									action: "Manage notifications",
									onClick: () => startServiceEnquiry("I would like to change my account notification preferences.")
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 293,
									columnNumber: 728
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 289,
							columnNumber: 131
						}, this), /* @__PURE__ */ (void 0)(ActionCard, {
							icon: MessageCircle,
							title: "Feedback",
							text: "Tell us how the experience is going or leave a testimonial.",
							action: "Send feedback",
							onClick: () => startServiceEnquiry("I would like to send feedback about my client experience.")
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 293,
							columnNumber: 967
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 289,
						columnNumber: 35
					}, this),
					section === "billing" && /* @__PURE__ */ (void 0)(Page, {
						title: "Billing & receipts",
						subtitle: "Your invoices, payment dates, receipts and recurring fees.",
						children: [/* @__PURE__ */ (void 0)("div", {
							style: {
								...surface,
								overflow: "hidden"
							},
							children: invoices.length ? invoices.map((inv) => /* @__PURE__ */ (void 0)("div", {
								style: {
									display: "flex",
									alignItems: "center",
									gap: 14,
									padding: 16,
									borderBottom: "1px solid #414751"
								},
								children: [
									/* @__PURE__ */ (void 0)(Receipt, {
										size: 17,
										color: "#30D158"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 303,
										columnNumber: 16
									}, this),
									/* @__PURE__ */ (void 0)("div", {
										style: { flex: 1 },
										children: [/* @__PURE__ */ (void 0)("b", { children: inv.description || inv.type || "Payment" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 305,
											columnNumber: 18
										}, this), /* @__PURE__ */ (void 0)("div", {
											style: {
												color: "#848E9C",
												fontSize: 12
											},
											children: new Date(inv.createdAt || inv.date).toLocaleDateString()
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 305,
											columnNumber: 67
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 303,
										columnNumber: 53
									}, this),
									/* @__PURE__ */ (void 0)("strong", { children: inv.amount || "-" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 308,
										columnNumber: 90
									}, this)
								]
							}, inv.id, true, {
								fileName: _jsxFileName,
								lineNumber: 297,
								columnNumber: 53
							}, this)) : /* @__PURE__ */ (void 0)(Empty, {
								title: "No payments recorded yet",
								text: "Receipts and payment history will appear here when your account has billing activity."
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 308,
								columnNumber: 136
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 294,
							columnNumber: 138
						}, this), /* @__PURE__ */ (void 0)("div", {
							style: {
								...surface,
								padding: 18,
								marginTop: 14
							},
							children: [/* @__PURE__ */ (void 0)("b", { children: "Recurring fees & next due date" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 312,
								columnNumber: 14
							}, this), /* @__PURE__ */ (void 0)("p", {
								style: {
									color: "#A8AEB8",
									fontSize: 13
								},
								children: "No recurring schedule is attached yet. Contact support to confirm your plan and next due date."
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 312,
								columnNumber: 51
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 308,
							columnNumber: 278
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 294,
						columnNumber: 35
					}, this),
					section === "campaigns" && /* @__PURE__ */ (void 0)(Page, {
						title: "Campaigns",
						subtitle: "Your websites, campaign links and marketing performance.",
						children: /* @__PURE__ */ (void 0)("div", {
							style: {
								...surface,
								padding: 24
							},
							children: [
								/* @__PURE__ */ (void 0)(ChartColumn, {
									size: 34,
									color: "#F0B90B"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 319,
									columnNumber: 14
								}, this),
								/* @__PURE__ */ (void 0)("h2", { children: "No campaigns linked yet" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 319,
									columnNumber: 53
								}, this),
								/* @__PURE__ */ (void 0)("p", {
									style: { color: "#A8AEB8" },
									children: "Once your campaigns are connected, spend, reach, clicks, leads and conversions will appear here."
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 319,
									columnNumber: 85
								}, this),
								/* @__PURE__ */ (void 0)("div", {
									style: {
										display: "grid",
										gridTemplateColumns: "repeat(4, 1fr)",
										gap: 10
									},
									children: [
										"Spend",
										"Reach",
										"Leads",
										"ROAS"
									].map((label) => /* @__PURE__ */ (void 0)("div", {
										style: {
											background: "#292E35",
											borderRadius: 8,
											padding: 14
										},
										children: [/* @__PURE__ */ (void 0)("small", {
											style: { color: "#848E9C" },
											children: label
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 329,
											columnNumber: 18
										}, this), /* @__PURE__ */ (void 0)("div", {
											style: {
												fontSize: 22,
												marginTop: 5
											},
											children: "-"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 331,
											columnNumber: 35
										}, this)]
									}, label, true, {
										fileName: _jsxFileName,
										lineNumber: 325,
										columnNumber: 66
									}, this))
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 321,
									columnNumber: 116
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 316,
							columnNumber: 129
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 316,
						columnNumber: 37
					}, this),
					section === "support" && /* @__PURE__ */ (void 0)(Page, {
						title: "Support",
						subtitle: "Chat directly with the Codex Dynamics team.",
						children: /* @__PURE__ */ (void 0)("div", {
							style: {
								...surface,
								overflow: "hidden"
							},
							children: [
								/* @__PURE__ */ (void 0)("div", {
									style: {
										padding: 16,
										borderBottom: "1px solid #414751"
									},
									children: /* @__PURE__ */ (void 0)("b", { children: [/* @__PURE__ */ (void 0)("span", {
										style: { color: "#30D158" },
										children: "●"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 341,
										columnNumber: 19
									}, this), " Codex Dynamics support"] }, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 341,
										columnNumber: 16
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 338,
									columnNumber: 14
								}, this),
								/* @__PURE__ */ (void 0)("div", {
									style: {
										minHeight: 250,
										padding: 18
									},
									children: messages.length ? messages.map((item) => /* @__PURE__ */ (void 0)("div", {
										style: {
											background: "#F0B90B",
											color: "#20242B",
											padding: 10,
											borderRadius: 8,
											margin: "0 0 10px auto",
											maxWidth: "78%"
										},
										children: item.text || item.message
									}, item.id, false, {
										fileName: _jsxFileName,
										lineNumber: 346,
										columnNumber: 56
									}, this)) : /* @__PURE__ */ (void 0)(Empty, {
										title: "Start a conversation",
										text: "Ask about your service, website, campaign or invoice."
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 353,
										columnNumber: 55
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 343,
									columnNumber: 61
								}, this),
								/* @__PURE__ */ (void 0)("div", {
									style: {
										display: "flex",
										gap: 8,
										padding: 12,
										borderTop: "1px solid #414751"
									},
									children: [/* @__PURE__ */ (void 0)("input", {
										value: draft,
										onChange: (event) => setDraft(event.target.value),
										placeholder: "Write to your team...",
										style: {
											flex: 1,
											minWidth: 0,
											background: "#292E35",
											color: "#EAECEF",
											border: "1px solid #4A515C",
											borderRadius: 7,
											padding: 11
										}
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 358,
										columnNumber: 16
									}, this), /* @__PURE__ */ (void 0)("button", {
										onClick: send,
										"aria-label": "Send support message",
										style: {
											width: 42,
											border: 0,
											borderRadius: 7,
											background: "#F0B90B",
											color: "#20242B"
										},
										children: /* @__PURE__ */ (void 0)(Send, { size: 16 }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 372,
											columnNumber: 18
										}, this)
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 366,
										columnNumber: 20
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 353,
									columnNumber: 161
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 335,
							columnNumber: 112
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 335,
						columnNumber: 35
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 174,
				columnNumber: 7
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 82,
			columnNumber: 5
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 76,
		columnNumber: 10
	}, this);
}
function Overview({ _user, invoices, setSection }) {
	const stats = [
		[
			"Account tier",
			"Dedicated Agency",
			Briefcase
		],
		[
			"Invoices & payments",
			String(invoices.length),
			Receipt
		],
		[
			"Active services",
			"5",
			Sparkles
		],
		[
			"Client status",
			"Active & Verified",
			CircleCheck
		]
	];
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", {
			style: {
				...surface,
				padding: 24,
				marginBottom: 18
			},
			children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					style: {
						color: "#848E9C",
						fontSize: 11,
						letterSpacing: ".1em"
					},
					children: "ACCOUNT STATUS"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 387,
					columnNumber: 8
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					style: {
						fontSize: 22,
						fontWeight: 800,
						marginTop: 10
					},
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
						style: { color: "#30D158" },
						children: "●"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 395,
						columnNumber: 10
					}, this), " Active"]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 391,
					columnNumber: 30
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					style: { color: "#A8AEB8" },
					children: "Your client workspace is ready."
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 397,
					columnNumber: 33
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 383,
			columnNumber: 12
		}, this),
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			style: {
				display: "grid",
				gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
				gap: 12,
				marginBottom: 18
			},
			children: stats.map(([label, value, Icon]) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				style: {
					...surface,
					padding: 18
				},
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					style: {
						display: "flex",
						justifyContent: "space-between",
						color: "#848E9C",
						fontSize: 12
					},
					children: [label, /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Icon, {
						size: 16,
						color: "#F0B90B"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 412,
						columnNumber: 19
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 407,
					columnNumber: 10
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					style: {
						fontSize: 24,
						fontWeight: 800,
						marginTop: 15
					},
					children: value
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 412,
					columnNumber: 59
				}, this)]
			}, label, true, {
				fileName: _jsxFileName,
				lineNumber: 404,
				columnNumber: 45
			}, this))
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 399,
			columnNumber: 55
		}, this),
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", {
			style: {
				...surface,
				padding: 22
			},
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				style: {
					display: "flex",
					justifyContent: "space-between",
					alignItems: "center",
					marginBottom: 14
				},
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
					style: { margin: 0 },
					children: "Your services"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 424,
					columnNumber: 10
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
					onClick: () => setSection("services"),
					style: {
						border: 0,
						background: "transparent",
						color: "#F0B90B"
					},
					children: "View all"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 426,
					columnNumber: 30
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 419,
				columnNumber: 8
			}, this), services.slice(0, 3).map((item) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Service, { item }, item[0], false, {
				fileName: _jsxFileName,
				lineNumber: 430,
				columnNumber: 69
			}, this))]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 416,
			columnNumber: 39
		}, this)
	] }, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 383,
		columnNumber: 10
	}, this);
}
function Page({ title, subtitle, children }) {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		style: { marginBottom: 22 },
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				style: {
					color: "#F0B90B",
					fontSize: 11,
					fontWeight: 700,
					letterSpacing: ".12em",
					textTransform: "uppercase"
				},
				children: "Client workspace"
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 439,
				columnNumber: 8
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
				style: {
					margin: "7px 0 5px",
					fontSize: 28
				},
				children: title
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 445,
				columnNumber: 32
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
				style: {
					margin: 0,
					color: "#A8AEB8"
				},
				children: subtitle
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 448,
				columnNumber: 22
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 437,
		columnNumber: 12
	}, this), children] }, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 437,
		columnNumber: 10
	}, this);
}
function Service({ item, action, actionLabel }) {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		style: {
			...surface,
			padding: 18,
			display: "flex",
			gap: 12,
			marginBottom: 12
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				style: {
					color: "#F0B90B",
					fontFamily: "monospace",
					fontSize: 11
				},
				children: item[0]
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 464,
				columnNumber: 6
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				style: { flex: 1 },
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("b", { children: item[1] }, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 470,
					columnNumber: 8
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					style: {
						color: "#848E9C",
						fontSize: 12,
						marginTop: 4
					},
					children: item[2]
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 470,
					columnNumber: 24
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 468,
				columnNumber: 23
			}, this),
			action ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
				onClick: action,
				style: {
					alignSelf: "center",
					border: "1px solid #F0B90B",
					borderRadius: 7,
					background: "transparent",
					color: "#F0B90B",
					padding: "8px 10px",
					fontSize: 12,
					fontWeight: 700,
					whiteSpace: "nowrap"
				},
				children: actionLabel
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 474,
				columnNumber: 41
			}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CircleCheck, {
				size: 16,
				color: "#30D158"
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 484,
				columnNumber: 33
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 458,
		columnNumber: 10
	}, this);
}
function ActionCard({ icon: Icon, title, text, action, onClick }) {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		style: {
			...surface,
			padding: 20,
			marginTop: 12
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Icon, {
				size: 20,
				color: "#F0B90B"
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 497,
				columnNumber: 6
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
				style: { margin: "12px 0 6px" },
				children: title
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 497,
				columnNumber: 40
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
				style: {
					color: "#A8AEB8",
					fontSize: 13,
					margin: 0
				},
				children: text
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 499,
				columnNumber: 20
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
				onClick,
				style: {
					marginTop: 16,
					border: "1px solid #F0B90B",
					borderRadius: 7,
					background: "transparent",
					color: "#F0B90B",
					padding: "8px 11px",
					fontSize: 12,
					fontWeight: 700
				},
				children: action
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 503,
				columnNumber: 18
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 493,
		columnNumber: 10
	}, this);
}
function LinkCard({ title, text }) {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		style: {
			...surface,
			padding: 18,
			display: "flex",
			alignItems: "center",
			gap: 12
		},
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ExternalLink, {
			size: 18,
			color: "#848E9C"
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 524,
			columnNumber: 6
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("b", { children: title }, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 524,
			columnNumber: 53
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			style: {
				color: "#848E9C",
				fontSize: 12,
				marginTop: 4
			},
			children: text
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 524,
			columnNumber: 67
		}, this)] }, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 524,
			columnNumber: 48
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 518,
		columnNumber: 10
	}, this);
}
function ExternalSystem({ title, provider, detail }) {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		style: {
			...surface,
			padding: 18,
			display: "flex",
			alignItems: "center",
			gap: 14
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				style: {
					width: 36,
					height: 36,
					borderRadius: 8,
					display: "grid",
					placeItems: "center",
					background: "#292E35",
					color: "#F0B90B"
				},
				children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ExternalLink, { size: 17 }, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 549,
					columnNumber: 8
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 541,
				columnNumber: 6
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				style: { flex: 1 },
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("b", { children: title }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 551,
						columnNumber: 8
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						style: {
							color: "#F0B90B",
							fontSize: 11,
							marginTop: 3
						},
						children: [provider, " · External system"]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 551,
						columnNumber: 22
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						style: {
							color: "#848E9C",
							fontSize: 12,
							marginTop: 5
						},
						children: detail
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 555,
						columnNumber: 44
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 549,
				columnNumber: 40
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
				style: {
					border: "1px solid #4A515C",
					borderRadius: 7,
					background: "transparent",
					color: "#A8AEB8",
					padding: "8px 10px",
					fontSize: 12
				},
				onClick: () => {},
				children: "Not connected"
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 559,
				columnNumber: 30
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 535,
		columnNumber: 10
	}, this);
}
function ConnectedSystemsPageV2({ user, onBack, onRequest }) {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		style: {
			minHeight: "100vh",
			background: "#F4F7F8",
			color: "#15242B",
			fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Segoe UI', sans-serif"
		},
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			style: {
				maxWidth: 1160,
				margin: "0 auto",
				padding: "24px clamp(18px, 4vw, 52px) 60px"
			},
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("header", {
				style: {
					display: "flex",
					justifyContent: "space-between",
					alignItems: "center",
					gap: 18,
					paddingBottom: 22,
					borderBottom: "1px solid #D7E2E6"
				},
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						style: {
							color: "#287C94",
							fontSize: 11,
							fontWeight: 800,
							letterSpacing: ".14em",
							textTransform: "uppercase"
						},
						children: "Back office"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 696,
						columnNumber: 15
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", {
						style: {
							margin: "5px 0 0",
							fontSize: 30
						},
						children: "Manage your business"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 702,
						columnNumber: 31
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						style: {
							margin: "7px 0 0",
							color: "#60777F",
							fontSize: 13
						},
						children: "Mail, bookings, website management, client chat and reporting in one back office."
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 705,
						columnNumber: 39
					}, this)
				] }, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 696,
					columnNumber: 10
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
					onClick: onBack,
					style: {
						border: "1px solid #B7CDD4",
						borderRadius: 7,
						background: "#FFFFFF",
						color: "#31545E",
						padding: "10px 13px",
						fontWeight: 700
					},
					children: "Back to Codex workspace"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 709,
					columnNumber: 105
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 689,
				columnNumber: 8
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				style: {
					display: "grid",
					gridTemplateColumns: "minmax(0,1.35fr) minmax(250px,.65fr)",
					gap: 18,
					marginTop: 28
				},
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", { children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						style: {
							color: "#60777F",
							fontSize: 11,
							fontWeight: 800,
							letterSpacing: ".12em",
							textTransform: "uppercase",
							marginBottom: 10
						},
						children: "Daily shortcuts"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 721,
						columnNumber: 19
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						style: {
							display: "grid",
							gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
							gap: 12
						},
						children: [
							{
								title: "Open mail",
								detail: "Check your business inbox quickly",
								action: "Open mailbox"
							},
							{
								title: "Manage bookings",
								detail: "Review appointments from your website",
								action: "Open bookings"
							},
							{
								title: "Client chat",
								detail: "Talk to visitors and customers",
								action: "Open chat"
							}
						].map((item) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							style: {
								background: "#FFFFFF",
								border: "1px solid #D7E2E6",
								borderRadius: 12,
								padding: 20,
								boxShadow: "0 5px 18px rgba(36,73,85,.06)"
							},
							children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									style: {
										color: "#287C94",
										fontSize: 11,
										fontWeight: 800,
										textTransform: "uppercase"
									},
									children: "Back office"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 738,
									columnNumber: 16
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
									style: {
										margin: "10px 0 5px",
										fontSize: 19
									},
									children: item.title
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 743,
									columnNumber: 35
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
									style: {
										color: "#60777F",
										fontSize: 13,
										margin: 0
									},
									children: item.detail
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 746,
									columnNumber: 35
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
									style: {
										marginTop: 18,
										border: 0,
										borderRadius: 7,
										background: "#287C94",
										color: "#FFFFFF",
										padding: "10px 12px",
										fontWeight: 800
									},
									children: item.action
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 750,
									columnNumber: 35
								}, this)
							]
						}, item.title, true, {
							fileName: _jsxFileName,
							lineNumber: 732,
							columnNumber: 33
						}, this))
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 728,
						columnNumber: 35
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						style: {
							color: "#60777F",
							fontSize: 11,
							fontWeight: 800,
							letterSpacing: ".12em",
							textTransform: "uppercase",
							margin: "28px 0 10px"
						},
						children: "Business tools"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 758,
						columnNumber: 54
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						style: {
							display: "grid",
							gap: 10
						},
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SystemRow, {
								title: "Website management",
								detail: "Pages, content, bookings and site settings"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 768,
								columnNumber: 14
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SystemRow, {
								title: "Bookings",
								detail: "Appointments collected from the website"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 768,
								columnNumber: 106
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SystemRow, {
								title: "Mail",
								detail: "Zoho Mail or Hostinger Mail inbox"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 768,
								columnNumber: 185
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SystemRow, {
								title: "Client chat",
								detail: "Conversations with website visitors and customers"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 768,
								columnNumber: 254
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SystemRow, {
								title: "Analytics & advertising",
								detail: "Google Analytics, Google Ads and Meta reporting"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 768,
								columnNumber: 346
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 765,
						columnNumber: 34
					}, this)
				] }, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 721,
					columnNumber: 10
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("aside", {
					style: {
						background: "#E8F3F6",
						border: "1px solid #C6E0E7",
						borderRadius: 12,
						padding: 20,
						alignSelf: "start"
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							style: {
								color: "#287C94",
								fontSize: 11,
								fontWeight: 800,
								textTransform: "uppercase"
							},
							children: "Your back office"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 774,
							columnNumber: 12
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
							style: {
								fontSize: 19,
								margin: "10px 0 7px"
							},
							children: "Everything used to run your site"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 779,
							columnNumber: 36
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
							style: {
								color: "#4F6B74",
								fontSize: 13,
								lineHeight: 1.6,
								margin: 0
							},
							children: "Mail, bookings, client conversations, website controls and reporting are all part of this back office."
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 782,
							columnNumber: 51
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
							onClick: onRequest,
							style: {
								width: "100%",
								marginTop: 18,
								border: 0,
								borderRadius: 7,
								background: "#15242B",
								color: "#FFFFFF",
								padding: "10px 12px",
								fontWeight: 800
							},
							children: "Request a connection"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 787,
							columnNumber: 120
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							style: {
								color: "#6E8991",
								fontSize: 12,
								marginTop: 14
							},
							children: ["Signed in as ", user.name || user.email]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 796,
							columnNumber: 43
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 768,
					columnNumber: 464
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 716,
				columnNumber: 53
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 685,
			columnNumber: 6
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 680,
		columnNumber: 10
	}, this);
}
function SystemRow({ title, detail }) {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		style: {
			display: "flex",
			alignItems: "center",
			gap: 14,
			background: "#FFFFFF",
			border: "1px solid #D7E2E6",
			borderRadius: 10,
			padding: "15px 17px"
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				style: {
					width: 34,
					height: 34,
					display: "grid",
					placeItems: "center",
					borderRadius: 8,
					background: "#E8F3F6",
					color: "#287C94"
				},
				children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ExternalLink, { size: 16 }, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 822,
					columnNumber: 8
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 814,
				columnNumber: 6
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				style: { flex: 1 },
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("b", { children: title }, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 824,
					columnNumber: 8
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					style: {
						color: "#60777F",
						fontSize: 12,
						marginTop: 3
					},
					children: detail
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 824,
					columnNumber: 22
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 822,
				columnNumber: 40
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
				style: {
					color: "#7A929A",
					fontSize: 11,
					border: "1px solid #C6D6DA",
					borderRadius: 99,
					padding: "4px 7px"
				},
				children: "Not connected"
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 828,
				columnNumber: 30
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 806,
		columnNumber: 10
	}, this);
}
function Status({ text }) {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
		style: {
			color: "#F0B90B",
			border: "1px solid #F0B90B55",
			background: "#F0B90B12",
			borderRadius: 99,
			padding: "4px 8px",
			fontSize: 11,
			fontWeight: 700
		},
		children: text
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 839,
		columnNumber: 10
	}, this);
}
function Empty({ title, text }) {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		style: {
			padding: 44,
			textAlign: "center",
			color: "#A8AEB8"
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Receipt, {
				size: 28,
				color: "#F0B90B"
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 857,
				columnNumber: 6
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
				style: { color: "#EAECEF" },
				children: title
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 857,
				columnNumber: 43
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { children: text }, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 859,
				columnNumber: 20
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 853,
		columnNumber: 10
	}, this);
}
//#endregion
export { ClientWorkspace as component };
