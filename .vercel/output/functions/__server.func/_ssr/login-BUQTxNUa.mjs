import { i as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/@fortawesome/react-fontawesome+[...].mjs";
import { c as readClientToken, n as authMe, r as clearClientToken, s as getLead, t as authLogin } from "./api-BHfs_otP.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/login-BUQTxNUa.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ClientLoginPage() {
	const [email, setEmail] = (0, import_react.useState)("client@codexdynamics.com");
	const [password, setPassword] = (0, import_react.useState)("client123");
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)("");
	(0, import_react.useEffect)(() => {
		const impersonateLeadId = new URLSearchParams(window.location.search).get("impersonateLeadId");
		if (impersonateLeadId) {
			setLoading(true);
			setError("");
			getLead(impersonateLeadId).then(async (lead) => {
				let stashedLead = null;
				try {
					const raw = sessionStorage.getItem("codex_impersonate_lead");
					stashedLead = raw ? JSON.parse(raw) : null;
				} catch (_) {
					stashedLead = null;
				}
				const accountLead = lead || stashedLead;
				const accountPassword = accountLead?.clientPassword || "client123";
				if (!accountLead?.email) throw new Error("This lead does not have portal credentials.");
				if (!await authLogin(accountLead.email, accountPassword)) throw new Error("Could not enter the lead account.");
				sessionStorage.removeItem("codex_impersonate_lead");
				window.location.assign("/client");
			}).catch((err) => {
				clearClientToken();
				setError(err instanceof Error ? err.message : "Could not enter the lead account.");
				setLoading(false);
			});
			return;
		}
		if (!readClientToken()) return;
		authMe().then((user) => {
			if (user) window.location.assign("/client");
			else clearClientToken();
		}).catch(() => {
			clearClientToken();
		});
	}, []);
	async function handleSubmit(event) {
		event.preventDefault();
		setLoading(true);
		setError("");
		try {
			if (!await authLogin(email.trim(), password)) throw new Error("Login failed.");
			window.location.assign("/client");
		} catch (err) {
			const message = err instanceof Error ? err.message : "Unable to sign in.";
			setError(message);
		} finally {
			setLoading(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		style: {
			minHeight: "100vh",
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
			background: "var(--color-background)",
			color: "var(--color-foreground)",
			padding: 24
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			style: {
				width: "100%",
				maxWidth: 440,
				background: "var(--color-paper)",
				border: "1px solid var(--color-border)",
				borderRadius: 20,
				boxShadow: "var(--shadow-border)",
				padding: 28
			},
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					style: {
						marginBottom: 20,
						textAlign: "center"
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							style: {
								display: "inline-flex",
								width: 48,
								height: 48,
								borderRadius: 12,
								alignItems: "center",
								justifyContent: "center",
								background: "var(--color-fill)",
								color: "var(--color-foreground)",
								fontWeight: 800,
								fontSize: 22,
								marginBottom: 12,
								border: "1px solid var(--color-border)"
							},
							children: "CD"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							style: {
								margin: 0,
								fontSize: 30,
								fontWeight: 800
							},
							children: "Client Portal"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							style: {
								margin: "8px 0 0",
								color: "var(--color-subtle)"
							},
							children: "Sign in to your account"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit: handleSubmit,
					style: {
						display: "grid",
						gap: 16
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							style: {
								display: "grid",
								gap: 8
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								style: {
									color: "var(--color-foreground)",
									fontWeight: 600
								},
								children: "Email address"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "email",
								value: email,
								onChange: (event) => setEmail(event.target.value),
								placeholder: "you@example.com",
								style: {
									background: "var(--color-fill)",
									border: "1px solid var(--color-border)",
									borderRadius: 12,
									color: "var(--color-foreground)",
									padding: "12px 14px",
									fontSize: 15
								},
								required: true
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							style: {
								display: "grid",
								gap: 8
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								style: {
									color: "var(--color-foreground)",
									fontWeight: 600
								},
								children: ["Password ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", {
									style: {
										color: "var(--color-muted-foreground)",
										fontWeight: 400
									},
									children: "(Optional - password not required)"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "password",
								value: password,
								onChange: (event) => setPassword(event.target.value),
								placeholder: "Password not required",
								style: {
									background: "var(--color-fill)",
									border: "1px solid var(--color-border)",
									borderRadius: 12,
									color: "var(--color-foreground)",
									padding: "12px 14px",
									fontSize: 15
								}
							})]
						}),
						error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							style: {
								background: "rgba(255, 59, 48, 0.08)",
								border: "1px solid rgba(255, 59, 48, 0.2)",
								color: "#a1141e",
								borderRadius: 10,
								padding: "10px 12px",
								fontSize: 14
							},
							children: error
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "submit",
							disabled: loading,
							style: {
								border: "none",
								borderRadius: 12,
								background: loading ? "#6d6d73" : "var(--color-primary)",
								color: "var(--color-primary-foreground)",
								fontWeight: 700,
								fontSize: 15,
								padding: "12px 16px",
								cursor: loading ? "not-allowed" : "pointer",
								opacity: loading ? .8 : 1
							},
							children: loading ? "Signing in..." : "Sign in"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					style: {
						marginTop: 16,
						color: "var(--color-subtle)",
						fontSize: 13,
						textAlign: "center"
					},
					children: [
						"Demo client access: ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "client@codexdynamics.com" }),
						" / ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "client123" })
					]
				})
			]
		})
	});
}
//#endregion
export { ClientLoginPage as component };
