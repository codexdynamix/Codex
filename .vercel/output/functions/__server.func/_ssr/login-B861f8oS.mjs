import { i as __toESM } from "../_runtime.mjs";
import { r as require_react } from "../_libs/@fortawesome/react-fontawesome+[...].mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { c as readClientToken, n as authMe, r as clearClientToken, s as getLead, t as authLogin } from "./api-BHfs_otP.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/login-B861f8oS.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName = "/app/applet/src/routes/login.tsx?tsr-split=component";
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
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		style: {
			minHeight: "100vh",
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
			background: "var(--color-background)",
			color: "var(--color-foreground)",
			padding: 24
		},
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
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
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					style: {
						marginBottom: 20,
						textAlign: "center"
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
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
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 88,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", {
							style: {
								margin: 0,
								fontSize: 30,
								fontWeight: 800
							},
							children: "Client Portal"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 104,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
							style: {
								margin: "8px 0 0",
								color: "var(--color-subtle)"
							},
							children: "Sign in to your account"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 109,
							columnNumber: 11
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 84,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("form", {
					onSubmit: handleSubmit,
					style: {
						display: "grid",
						gap: 16
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
							style: {
								display: "grid",
								gap: 8
							},
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								style: {
									color: "var(--color-foreground)",
									fontWeight: 600
								},
								children: "Email address"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 123,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
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
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 127,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 119,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
							style: {
								display: "grid",
								gap: 8
							},
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								style: {
									color: "var(--color-foreground)",
									fontWeight: 600
								},
								children: ["Password ", /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("small", {
									style: {
										color: "var(--color-muted-foreground)",
										fontWeight: 400
									},
									children: "(Optional - password not required)"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 144,
									columnNumber: 23
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 141,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
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
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 148,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 137,
							columnNumber: 11
						}, this),
						error ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							style: {
								background: "rgba(255, 59, 48, 0.08)",
								border: "1px solid rgba(255, 59, 48, 0.2)",
								color: "#a1141e",
								borderRadius: 10,
								padding: "10px 12px",
								fontSize: 14
							},
							children: error
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 158,
							columnNumber: 20
						}, this) : null,
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
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
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 169,
							columnNumber: 11
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 115,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					style: {
						marginTop: 16,
						color: "var(--color-subtle)",
						fontSize: 13,
						textAlign: "center"
					},
					children: [
						"Demo client access: ",
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("strong", { children: "client@codexdynamics.com" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 190,
							columnNumber: 31
						}, this),
						" / ",
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("strong", { children: "client123" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 190,
							columnNumber: 75
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 184,
					columnNumber: 9
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 75,
			columnNumber: 7
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 66,
		columnNumber: 10
	}, this);
}
//#endregion
export { ClientLoginPage as component };
