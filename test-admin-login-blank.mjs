import { chromium } from "playwright";

async function test() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  const logs = [];
  page.on("console", (msg) => logs.push({ type: msg.type(), text: msg.text() }));
  page.on("pageerror", (err) => logs.push({ type: "pageerror", text: err.message, stack: err.stack }));

  console.log("Navigating to http://127.0.0.1:3000/admin/login ...");
  const response = await page.goto("http://127.0.0.1:3000/admin/login", { waitUntil: "domcontentloaded" });
  console.log("HTTP status:", response?.status());
  await page.waitForTimeout(2000);
  console.log("Current URL:", page.url());
  console.log("HTML content:\n", await page.content());
  console.log("Logs:\n", logs);
  await browser.close();
}

test().catch(console.error);
