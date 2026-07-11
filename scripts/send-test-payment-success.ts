/**
 * One-off: send a sample payment-success receipt.
 * Run: npx tsx scripts/send-test-payment-success.ts [email]
 */
import { readFileSync } from "fs";
import { resolve } from "path";
import { isMailConfigured, sendMail } from "../lib/mail/resend-client";
import { paymentSuccess } from "../lib/mail/templates";

function loadEnv(): void {
  const raw = readFileSync(resolve(process.cwd(), ".env"), "utf8");
  for (const line of raw.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq < 0) continue;
    const key = trimmed.slice(0, eq).trim();
    let value = trimmed.slice(eq + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    if (!(key in process.env)) process.env[key] = value;
  }
}

async function main() {
  loadEnv();

  if (!isMailConfigured()) {
    console.error("Mail not configured — set RESEND_API_KEY and RESEND_FROM");
    process.exit(1);
  }

  const to =
    process.argv[2]?.trim() ||
    (process.env.EMAILS_INTERNAL_TO ?? "").split(",")[0]?.trim();

  if (!to) {
    console.error("Pass a recipient email, or set EMAILS_INTERNAL_TO");
    process.exit(1);
  }

  const nextDue = new Date();
  nextDue.setDate(nextDue.getDate() + 30);

  const content = paymentSuccess({
    name: "Test Candidate",
    email: to,
    mobile: "+91 98765 43210",
    addressLine1: "12 Example Street",
    city: "Hyderabad",
    state: "Telangana",
    pincode: "500001",
    courseName: "SAP S/4HANA FICO",
    planType: "installment",
    amount: 15000,
    coursePrice: 45000,
    paymentId: "pay_test_success_001",
    paymentDate: new Date().toISOString(),
    nextInstallmentDate: nextDue.toISOString(),
    orderId: "order_test_success_001",
  });

  const ok = await sendMail({ to, ...content });
  if (!ok) {
    console.error("Send failed");
    process.exit(1);
  }

  console.log(`Sent payment-success test to ${to}`);
  console.log(`Subject: ${content.subject}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
