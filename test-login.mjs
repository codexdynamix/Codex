import { chromium } from "playwright";

async function test() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  const logs = [];
  page.on("console", (msg) => logs.push({ type: msg.type(), text: msg.text() }));
  page.on("pageerror", (err) => logs.push({ type: "pageerror", text: err.message, stack: err.stack }));

  console.log("Navigating to http://127.0.0.1:3000/admin/login/super-admin ...");
  await page.goto("http://127.0.0.1:3000/admin/login/super-admin", { waitUntil: "domcontentloaded", timeout: 10000 });
  await page.waitForTimeout(2000);
  console.log("Title:", await page.title());
  console.log("URL:", page.url());
  console.log("Body text snippet:\n", (await page.innerText("body")).slice(0, 500));

  console.log("Looking for Sign In button...");
  const signInButton = await page.$("button:has-text('Sign In')");
  if (signInButton) {
    console.log("Clicking Sign In button...");
    await signInButton.click();
    await page.waitForTimeout(3000);
    console.log("URL after clicking Sign In:", page.url());
    console.log("Body text snippet after Sign In:\n", (await page.innerText("body")).slice(0, 800));
  } else {
    console.log("Sign In button not found!");
  }

  console.log("Logs during test:\n", JSON.stringify(logs, null, 2));
  await page.screenshot({ path: "screenshots/test-login.png" });
  await browser.close();
}

test().catch(console.error);
