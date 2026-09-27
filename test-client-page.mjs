import { chromium } from "playwright";

async function test() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  const logs = [];
  page.on("console", (msg) => logs.push({ type: msg.type(), text: msg.text() }));
  page.on("pageerror", (err) => logs.push({ type: "pageerror", text: err.message, stack: err.stack }));

  console.log("Navigating to http://127.0.0.1:3000/client ...");
  await page.goto("http://127.0.0.1:3000/client", { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(3000);
  console.log("URL:", page.url());
  const bodyText = await page.innerText("body");
  console.log("Body text snippet:\n", bodyText.slice(0, 500));
  console.log("Is body empty / blank?", bodyText.trim().length === 0);
  console.log("Logs:\n", JSON.stringify(logs, null, 2));

  await page.screenshot({ path: "screenshots/client-page.png" });
  await browser.close();
}

test().catch(console.error);
