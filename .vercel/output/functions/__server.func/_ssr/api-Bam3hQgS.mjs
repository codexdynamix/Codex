//#region node_modules/.nitro/vite/services/ssr/assets/api-Bam3hQgS.js
var TOKEN_KEY = "codex_client_token";
var USER_KEY = "codex_client_user";
var DEFAULT_CLIENT = {
	id: "usr_demo",
	name: "Alex Morgan",
	email: "client@codexdynamics.com",
	phone: "+1 (555) 234-5678",
	country: "United States",
	status: "Active",
	balances: { usd: 0 }
};
var clientMessages = [{
	id: "msg_1",
	sender: "agent",
	text: "Welcome to your Codex Dynamics client workspace. Let us know how we can help with your project.",
	createdAt: (/* @__PURE__ */ new Date(Date.now() - 36e5)).toISOString()
}];
function readClientToken() {
	try {
		return localStorage.getItem(TOKEN_KEY);
	} catch {
		return null;
	}
}
function clearClientToken() {
	try {
		localStorage.removeItem(TOKEN_KEY);
		localStorage.removeItem(USER_KEY);
	} catch {}
}
function getStoredUser() {
	try {
		const raw = localStorage.getItem(USER_KEY);
		return raw ? JSON.parse(raw) : null;
	} catch {
		return null;
	}
}
async function authLogin(email, _password) {
	const cleanEmail = String(email || "client@codexdynamics.com").trim();
	const nameFromEmail = cleanEmail.split("@")[0].replace(/[._-]+/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
	const user = {
		...DEFAULT_CLIENT,
		email: cleanEmail,
		name: cleanEmail === DEFAULT_CLIENT.email ? DEFAULT_CLIENT.name : nameFromEmail || "Client"
	};
	try {
		localStorage.setItem(TOKEN_KEY, `tok_${Date.now()}`);
		localStorage.setItem(USER_KEY, JSON.stringify(user));
	} catch {}
	return user;
}
async function authMe() {
	if (!readClientToken()) return null;
	return getStoredUser() || DEFAULT_CLIENT;
}
async function getLead(leadId) {
	return {
		id: leadId,
		name: "Client Account",
		email: "client@codexdynamics.com",
		clientPassword: "client123"
	};
}
async function getTransactionsPage() {
	return {
		transactions: [{
			id: "tx_101",
			type: "Invoice Payment",
			description: "Web Platform Architecture & Retainer",
			amount: "$4,500.00",
			status: "Completed",
			createdAt: (/* @__PURE__ */ new Date(Date.now() - 432e6)).toISOString()
		}],
		total: 1
	};
}
async function getClientMessages() {
	return { messages: clientMessages };
}
async function sendClientMessage(text) {
	const msg = {
		id: `msg_${Date.now()}`,
		sender: "client",
		text,
		message: text,
		createdAt: (/* @__PURE__ */ new Date()).toISOString()
	};
	clientMessages = [...clientMessages, msg];
	return {
		ok: true,
		message: msg
	};
}
async function getClientWorkspace() {
	return {
		projects: [],
		services: [
			"Web Development",
			"Brand Identity",
			"CRM Infrastructure"
		]
	};
}
async function requestClientService(payload) {
	return {
		ok: true,
		request: payload
	};
}
//#endregion
export { getClientWorkspace as a, readClientToken as c, getClientMessages as i, requestClientService as l, authMe as n, getLead as o, clearClientToken as r, getTransactionsPage as s, authLogin as t, sendClientMessage as u };
