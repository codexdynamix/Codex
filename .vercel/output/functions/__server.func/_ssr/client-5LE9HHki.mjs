import { i as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/@fortawesome/react-fontawesome+[...].mjs";
import { B as Headphones, J as ExternalLink, L as LayoutDashboard, N as LogOut, O as MessageCircle, Q as ClipboardCheck, U as FolderOpen, W as FilePenLine, _ as Send, a as UserRound, et as CircleCheck, f as Sparkles, ft as Bell, h as ShieldCheck, lt as CalendarDays, o as Upload, st as ChartColumn, u as ThumbsUp, ut as Briefcase, x as Receipt } from "../_libs/lucide-react.mjs";
import { a as getClientMessages, c as readClientToken, i as getClientInvoices, l as requestClientService, n as authMe, o as getClientWorkspace, r as clearClientToken, u as sendClientMessage } from "./api-BHfs_otP.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/client-5LE9HHki.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
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
	if (loading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		style: {
			minHeight: "100vh",
			display: "grid",
			placeItems: "center",
			background: "#252930",
			color: "#EAECEF"
		},
		children: "Loading workspace..."
	});
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
	if (section === "connected") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConnectedSystemsPageV2, {
		user,
		onBack: () => setSection("overview"),
		onRequest: () => startServiceEnquiry("I would like to connect a business system to my client account. Please tell me what access details you need.")
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		style: {
			minHeight: "100vh",
			background: "#252930",
			color: "#EAECEF",
			fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Segoe UI', sans-serif"
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			style: {
				display: "grid",
				gridTemplateColumns: "230px minmax(0, 1fr)",
				minHeight: "100vh"
			},
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				style: {
					background: "#2A2E36",
					borderRight: "1px solid #3C424D",
					padding: 20,
					display: "flex",
					flexDirection: "column"
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						style: {
							display: "flex",
							alignItems: "center",
							gap: 10,
							marginBottom: 42
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
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
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "Codex Dynamics" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							style: {
								color: "#848E9C",
								fontSize: 11
							},
							children: "Client workspace"
						})] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						style: {
							color: "#848E9C",
							fontSize: 10,
							textTransform: "uppercase",
							letterSpacing: ".1em",
							marginBottom: 10
						},
						children: "Codex workspace"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
						style: {
							display: "grid",
							gap: 4
						},
						children: tabs.map(([key, label, Icon]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
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
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { size: 16 }), label]
						}, key))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						style: {
							color: "#848E9C",
							fontSize: 10,
							textTransform: "uppercase",
							letterSpacing: ".1em",
							margin: "22px 0 10px"
						},
						children: "Business operations"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
						style: {
							display: "grid",
							gap: 4
						},
						children: connectedTabs.map(([key, label, Icon]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
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
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { size: 16 }), label]
						}, key))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						style: {
							marginTop: "auto",
							borderTop: "1px solid #3C424D",
							paddingTop: 16
						},
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", {
								style: { fontSize: 13 },
								children: user.name || "Client"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								style: {
									color: "#848E9C",
									fontSize: 11,
									margin: "4px 0 14px"
								},
								children: user.email
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
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
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { size: 15 }), " Sign out"]
							})
						]
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
				style: {
					padding: "30px clamp(18px, 4vw, 54px) 48px",
					minWidth: 0
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
						style: {
							display: "flex",
							justifyContent: "space-between",
							gap: 20,
							marginBottom: 30
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								style: {
									color: "#F0B90B",
									fontSize: 11,
									fontWeight: 700,
									letterSpacing: ".12em",
									textTransform: "uppercase"
								},
								children: "Client account"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
								style: {
									margin: "7px 0 0",
									fontSize: "clamp(26px, 4vw, 38px)"
								},
								children: [
									"Welcome, ",
									(user.name || "there").split(" ")[0],
									"."
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								style: {
									color: "#A8AEB8",
									margin: "8px 0 0"
								},
								children: "Everything about your Codex Dynamics work, in one place."
							})
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
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
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, { size: 16 }), " Contact support"]
						})]
					}),
					section === "overview" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Overview, {
						user,
						invoices,
						setSection
					}),
					section === "services" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Page, {
						title: "Services",
						subtitle: "Review active work or request another service from your account team.",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							style: { marginBottom: 26 },
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								style: {
									color: "#848E9C",
									fontSize: 11,
									letterSpacing: ".1em",
									textTransform: "uppercase",
									marginBottom: 10
								},
								children: "Your active services"
							}), services.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Service, { item }, item[0]))]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							style: {
								display: "flex",
								justifyContent: "space-between",
								alignItems: "center",
								gap: 12,
								marginBottom: 10,
								flexWrap: "wrap"
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								style: {
									color: "#F0B90B",
									fontSize: 11,
									letterSpacing: ".1em",
									textTransform: "uppercase"
								},
								children: "Available services"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								style: {
									display: "flex",
									gap: 8
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
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
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
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
								})]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							style: {
								display: "grid",
								gap: 12
							},
							children: additionalServices.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Service, {
								item,
								action: () => requestService(item[1]),
								actionLabel: "Request service"
							}, item[0]))
						})] })]
					}),
					section === "projects" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Page, {
						title: "Projects & timeline",
						subtitle: "Track milestones, owners, deadlines and the next action for each engagement.",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							style: {
								...surface,
								padding: 20
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								style: {
									display: "flex",
									justifyContent: "space-between",
									alignItems: "center"
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "Website and digital presence" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									style: {
										color: "#848E9C",
										fontSize: 12,
										marginTop: 4
									},
									children: "Project timeline will appear when an engagement is assigned."
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Status, { text: "Planning" })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
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
								].map((step, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									style: {
										borderTop: `3px solid ${index === 0 ? "#F0B90B" : "#4A515C"}`,
										paddingTop: 9,
										color: index === 0 ? "#EAECEF" : "#848E9C",
										fontSize: 12
									},
									children: [step, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										style: {
											fontSize: 11,
											marginTop: 4
										},
										children: index === 0 ? "Ready" : "Not started"
									})]
								}, step))
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ActionCard, {
							icon: CalendarDays,
							title: "No milestone dates yet",
							text: "Ask support to set up your project timeline and review schedule.",
							action: "Request a project plan",
							onClick: () => startServiceEnquiry("Please set up a project timeline and milestone review schedule for my account.")
						})]
					}),
					section === "files" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Page, {
						title: "Files & documents",
						subtitle: "Keep briefs, creatives, contracts, receipts and deliverables together.",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							style: {
								display: "grid",
								gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
								gap: 12
							},
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ActionCard, {
									icon: FolderOpen,
									title: "Project files",
									text: "Website assets, design exports and campaign creatives.",
									action: "Request files",
									onClick: () => startServiceEnquiry("Please help me access the project files for my account.")
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ActionCard, {
									icon: Receipt,
									title: "Receipts",
									text: "Downloadable payment records and invoices.",
									action: "View billing",
									onClick: () => setSection("billing")
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ActionCard, {
									icon: Upload,
									title: "Upload a file",
									text: "Send a brief, logo, copy or approval asset to the team.",
									action: "Upload via support",
									onClick: () => startServiceEnquiry("I need to upload a file for my project. Please tell me where to send it.")
								})
							]
						})
					}),
					section === "approvals" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Page, {
						title: "Approvals",
						subtitle: "Review and approve work before it goes live.",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ActionCard, {
							icon: ThumbsUp,
							title: "Nothing waiting for approval",
							text: "New website designs, campaign creatives and copy approvals will appear here.",
							action: "Ask what is next",
							onClick: () => startServiceEnquiry("Do I have any project or campaign items waiting for approval?")
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ActionCard, {
							icon: ClipboardCheck,
							title: "Revision requests",
							text: "Send clear feedback and keep the approval history in one thread.",
							action: "Request a revision",
							onClick: () => startServiceEnquiry("I would like to request a revision to my current project.")
						})]
					}),
					section === "links" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Page, {
						title: "Websites & campaign links",
						subtitle: "Quick access to the digital properties your team manages.",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							style: {
								display: "grid",
								gap: 12
							},
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LinkCard, {
									title: "Live website",
									text: "No website connected yet"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LinkCard, {
									title: "Staging website",
									text: "No staging link connected yet"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LinkCard, {
									title: "Marketing dashboards",
									text: "Google Ads, Meta Ads and analytics links will appear here"
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ActionCard, {
							icon: ExternalLink,
							title: "Connect a link",
							text: "Ask the team to attach a website, campaign or reporting dashboard.",
							action: "Request a link",
							onClick: () => startServiceEnquiry("Please connect my website or marketing dashboard links to this account.")
						})]
					}),
					section === "connected" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Page, {
						title: "Connected systems",
						subtitle: "External tools belonging to your business. Codex Dynamics does not manage these systems from this screen.",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							style: {
								display: "grid",
								gap: 12
							},
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalSystem, {
									title: "Website administration",
									provider: "External website CMS or back office",
									detail: "Manage pages, bookings and website content in the system connected to your site."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalSystem, {
									title: "Booking management",
									provider: "External booking platform",
									detail: "View and manage appointments collected from your website."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalSystem, {
									title: "Zoho Mail",
									provider: "External mailbox",
									detail: "Open your business mailbox in Zoho without exposing your password here."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalSystem, {
									title: "Hostinger Mail",
									provider: "External mailbox",
									detail: "Open your business mailbox in Hostinger Webmail."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalSystem, {
									title: "Analytics & advertising",
									provider: "Google Analytics, Google Ads or Meta",
									detail: "Open connected reporting and advertising platforms."
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ActionCard, {
							icon: ExternalLink,
							title: "Connect a business system",
							text: "Ask Codex Dynamics to attach a website, booking platform, mailbox or reporting tool.",
							action: "Request a connection",
							onClick: () => startServiceEnquiry("I would like to connect a business system to my client account. Please tell me what access details you need.")
						})]
					}),
					section === "account" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Page, {
						title: "Account & security",
						subtitle: "Manage your profile, access and client preferences.",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							style: {
								display: "grid",
								gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))",
								gap: 12
							},
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ActionCard, {
									icon: UserRound,
									title: "Profile details",
									text: `${user.name || "Client"} · ${user.email}`,
									action: "Update via support",
									onClick: () => startServiceEnquiry("I need to update my client profile details.")
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ActionCard, {
									icon: ShieldCheck,
									title: "Security",
									text: "Password changes, login history and two-factor authentication.",
									action: "Ask about security",
									onClick: () => startServiceEnquiry("I would like to review my account security options.")
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ActionCard, {
									icon: FilePenLine,
									title: "Contracts & agreements",
									text: "Service terms, renewal dates and signed agreements.",
									action: "Request documents",
									onClick: () => startServiceEnquiry("Please send me the contracts and service agreements for my account.")
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ActionCard, {
									icon: Bell,
									title: "Notifications",
									text: "Invoice, approval, campaign and project updates.",
									action: "Manage notifications",
									onClick: () => startServiceEnquiry("I would like to change my account notification preferences.")
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ActionCard, {
							icon: MessageCircle,
							title: "Feedback",
							text: "Tell us how the experience is going or leave a testimonial.",
							action: "Send feedback",
							onClick: () => startServiceEnquiry("I would like to send feedback about my client experience.")
						})]
					}),
					section === "billing" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Page, {
						title: "Billing & receipts",
						subtitle: "Your invoices, payment dates, receipts and recurring fees.",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							style: {
								...surface,
								overflow: "hidden"
							},
							children: invoices.length ? invoices.map((inv) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								style: {
									display: "flex",
									alignItems: "center",
									gap: 14,
									padding: 16,
									borderBottom: "1px solid #414751"
								},
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Receipt, {
										size: 17,
										color: "#30D158"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										style: { flex: 1 },
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: inv.description || inv.type || "Payment" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											style: {
												color: "#848E9C",
												fontSize: 12
											},
											children: new Date(inv.createdAt || inv.date).toLocaleDateString()
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: inv.amount || "-" })
								]
							}, inv.id)) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Empty, {
								title: "No payments recorded yet",
								text: "Receipts and payment history will appear here when your account has billing activity."
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							style: {
								...surface,
								padding: 18,
								marginTop: 14
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "Recurring fees & next due date" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								style: {
									color: "#A8AEB8",
									fontSize: 13
								},
								children: "No recurring schedule is attached yet. Contact support to confirm your plan and next due date."
							})]
						})]
					}),
					section === "campaigns" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Page, {
						title: "Campaigns",
						subtitle: "Your websites, campaign links and marketing performance.",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							style: {
								...surface,
								padding: 24
							},
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartColumn, {
									size: 34,
									color: "#F0B90B"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "No campaigns linked yet" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									style: { color: "#A8AEB8" },
									children: "Once your campaigns are connected, spend, reach, clicks, leads and conversions will appear here."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
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
									].map((label) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										style: {
											background: "#292E35",
											borderRadius: 8,
											padding: 14
										},
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", {
											style: { color: "#848E9C" },
											children: label
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											style: {
												fontSize: 22,
												marginTop: 5
											},
											children: "-"
										})]
									}, label))
								})
							]
						})
					}),
					section === "support" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Page, {
						title: "Support",
						subtitle: "Chat directly with the Codex Dynamics team.",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							style: {
								...surface,
								overflow: "hidden"
							},
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									style: {
										padding: 16,
										borderBottom: "1px solid #414751"
									},
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("b", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										style: { color: "#30D158" },
										children: "●"
									}), " Codex Dynamics support"] })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									style: {
										minHeight: 250,
										padding: 18
									},
									children: messages.length ? messages.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										style: {
											background: "#F0B90B",
											color: "#20242B",
											padding: 10,
											borderRadius: 8,
											margin: "0 0 10px auto",
											maxWidth: "78%"
										},
										children: item.text || item.message
									}, item.id)) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Empty, {
										title: "Start a conversation",
										text: "Ask about your service, website, campaign or invoice."
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									style: {
										display: "flex",
										gap: 8,
										padding: 12,
										borderTop: "1px solid #414751"
									},
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
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
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: send,
										"aria-label": "Send support message",
										style: {
											width: 42,
											border: 0,
											borderRadius: 7,
											background: "#F0B90B",
											color: "#20242B"
										},
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, { size: 16 })
									})]
								})
							]
						})
					})
				]
			})]
		})
	});
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			style: {
				...surface,
				padding: 24,
				marginBottom: 18
			},
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					style: {
						color: "#848E9C",
						fontSize: 11,
						letterSpacing: ".1em"
					},
					children: "ACCOUNT STATUS"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					style: {
						fontSize: 22,
						fontWeight: 800,
						marginTop: 10
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						style: { color: "#30D158" },
						children: "●"
					}), " Active"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					style: { color: "#A8AEB8" },
					children: "Your client workspace is ready."
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			style: {
				display: "grid",
				gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
				gap: 12,
				marginBottom: 18
			},
			children: stats.map(([label, value, Icon]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				style: {
					...surface,
					padding: 18
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					style: {
						display: "flex",
						justifyContent: "space-between",
						color: "#848E9C",
						fontSize: 12
					},
					children: [label, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
						size: 16,
						color: "#F0B90B"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					style: {
						fontSize: 24,
						fontWeight: 800,
						marginTop: 15
					},
					children: value
				})]
			}, label))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			style: {
				...surface,
				padding: 22
			},
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				style: {
					display: "flex",
					justifyContent: "space-between",
					alignItems: "center",
					marginBottom: 14
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					style: { margin: 0 },
					children: "Your services"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => setSection("services"),
					style: {
						border: 0,
						background: "transparent",
						color: "#F0B90B"
					},
					children: "View all"
				})]
			}), services.slice(0, 3).map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Service, { item }, item[0]))]
		})
	] });
}
function Page({ title, subtitle, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		style: { marginBottom: 22 },
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				style: {
					color: "#F0B90B",
					fontSize: 11,
					fontWeight: 700,
					letterSpacing: ".12em",
					textTransform: "uppercase"
				},
				children: "Client workspace"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				style: {
					margin: "7px 0 5px",
					fontSize: 28
				},
				children: title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				style: {
					margin: 0,
					color: "#A8AEB8"
				},
				children: subtitle
			})
		]
	}), children] });
}
function Service({ item, action, actionLabel }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		style: {
			...surface,
			padding: 18,
			display: "flex",
			gap: 12,
			marginBottom: 12
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				style: {
					color: "#F0B90B",
					fontFamily: "monospace",
					fontSize: 11
				},
				children: item[0]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				style: { flex: 1 },
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: item[1] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					style: {
						color: "#848E9C",
						fontSize: 12,
						marginTop: 4
					},
					children: item[2]
				})]
			}),
			action ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
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
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {
				size: 16,
				color: "#30D158"
			})
		]
	});
}
function ActionCard({ icon: Icon, title, text, action, onClick }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		style: {
			...surface,
			padding: 20,
			marginTop: 12
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
				size: 20,
				color: "#F0B90B"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				style: { margin: "12px 0 6px" },
				children: title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				style: {
					color: "#A8AEB8",
					fontSize: 13,
					margin: 0
				},
				children: text
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
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
			})
		]
	});
}
function LinkCard({ title, text }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		style: {
			...surface,
			padding: 18,
			display: "flex",
			alignItems: "center",
			gap: 12
		},
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, {
			size: 18,
			color: "#848E9C"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: title }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			style: {
				color: "#848E9C",
				fontSize: 12,
				marginTop: 4
			},
			children: text
		})] })]
	});
}
function ExternalSystem({ title, provider, detail }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		style: {
			...surface,
			padding: 18,
			display: "flex",
			alignItems: "center",
			gap: 14
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				style: {
					width: 36,
					height: 36,
					borderRadius: 8,
					display: "grid",
					placeItems: "center",
					background: "#292E35",
					color: "#F0B90B"
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { size: 17 })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				style: { flex: 1 },
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: title }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						style: {
							color: "#F0B90B",
							fontSize: 11,
							marginTop: 3
						},
						children: [provider, " · External system"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						style: {
							color: "#848E9C",
							fontSize: 12,
							marginTop: 5
						},
						children: detail
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
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
			})
		]
	});
}
function ConnectedSystemsPageV2({ user, onBack, onRequest }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		style: {
			minHeight: "100vh",
			background: "#F4F7F8",
			color: "#15242B",
			fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Segoe UI', sans-serif"
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			style: {
				maxWidth: 1160,
				margin: "0 auto",
				padding: "24px clamp(18px, 4vw, 52px) 60px"
			},
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				style: {
					display: "flex",
					justifyContent: "space-between",
					alignItems: "center",
					gap: 18,
					paddingBottom: 22,
					borderBottom: "1px solid #D7E2E6"
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						style: {
							color: "#287C94",
							fontSize: 11,
							fontWeight: 800,
							letterSpacing: ".14em",
							textTransform: "uppercase"
						},
						children: "Back office"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						style: {
							margin: "5px 0 0",
							fontSize: 30
						},
						children: "Manage your business"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						style: {
							margin: "7px 0 0",
							color: "#60777F",
							fontSize: 13
						},
						children: "Mail, bookings, website management, client chat and reporting in one back office."
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
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
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				style: {
					display: "grid",
					gridTemplateColumns: "minmax(0,1.35fr) minmax(250px,.65fr)",
					gap: 18,
					marginTop: 28
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						style: {
							color: "#60777F",
							fontSize: 11,
							fontWeight: 800,
							letterSpacing: ".12em",
							textTransform: "uppercase",
							marginBottom: 10
						},
						children: "Daily shortcuts"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
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
						].map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							style: {
								background: "#FFFFFF",
								border: "1px solid #D7E2E6",
								borderRadius: 12,
								padding: 20,
								boxShadow: "0 5px 18px rgba(36,73,85,.06)"
							},
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									style: {
										color: "#287C94",
										fontSize: 11,
										fontWeight: 800,
										textTransform: "uppercase"
									},
									children: "Back office"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									style: {
										margin: "10px 0 5px",
										fontSize: 19
									},
									children: item.title
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									style: {
										color: "#60777F",
										fontSize: 13,
										margin: 0
									},
									children: item.detail
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
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
								})
							]
						}, item.title))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						style: {
							color: "#60777F",
							fontSize: 11,
							fontWeight: 800,
							letterSpacing: ".12em",
							textTransform: "uppercase",
							margin: "28px 0 10px"
						},
						children: "Business tools"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						style: {
							display: "grid",
							gap: 10
						},
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SystemRow, {
								title: "Website management",
								detail: "Pages, content, bookings and site settings"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SystemRow, {
								title: "Bookings",
								detail: "Appointments collected from the website"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SystemRow, {
								title: "Mail",
								detail: "Zoho Mail or Hostinger Mail inbox"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SystemRow, {
								title: "Client chat",
								detail: "Conversations with website visitors and customers"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SystemRow, {
								title: "Analytics & advertising",
								detail: "Google Analytics, Google Ads and Meta reporting"
							})
						]
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
					style: {
						background: "#E8F3F6",
						border: "1px solid #C6E0E7",
						borderRadius: 12,
						padding: 20,
						alignSelf: "start"
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							style: {
								color: "#287C94",
								fontSize: 11,
								fontWeight: 800,
								textTransform: "uppercase"
							},
							children: "Your back office"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							style: {
								fontSize: 19,
								margin: "10px 0 7px"
							},
							children: "Everything used to run your site"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							style: {
								color: "#4F6B74",
								fontSize: 13,
								lineHeight: 1.6,
								margin: 0
							},
							children: "Mail, bookings, client conversations, website controls and reporting are all part of this back office."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
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
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							style: {
								color: "#6E8991",
								fontSize: 12,
								marginTop: 14
							},
							children: ["Signed in as ", user.name || user.email]
						})
					]
				})]
			})]
		})
	});
}
function SystemRow({ title, detail }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
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
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				style: {
					width: 34,
					height: 34,
					display: "grid",
					placeItems: "center",
					borderRadius: 8,
					background: "#E8F3F6",
					color: "#287C94"
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { size: 16 })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				style: { flex: 1 },
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: title }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					style: {
						color: "#60777F",
						fontSize: 12,
						marginTop: 3
					},
					children: detail
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				style: {
					color: "#7A929A",
					fontSize: 11,
					border: "1px solid #C6D6DA",
					borderRadius: 99,
					padding: "4px 7px"
				},
				children: "Not connected"
			})
		]
	});
}
function Status({ text }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
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
	});
}
function Empty({ title, text }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		style: {
			padding: 44,
			textAlign: "center",
			color: "#A8AEB8"
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Receipt, {
				size: 28,
				color: "#F0B90B"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				style: { color: "#EAECEF" },
				children: title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: text })
		]
	});
}
//#endregion
export { ClientWorkspace as component };
