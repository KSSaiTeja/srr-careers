/**
 * One-off: delete every row in the enrollments collection.
 * Run: npx tsx scripts/clear-enrollments.ts
 */
import config from "@payload-config";
import { getPayload } from "payload";

async function main() {
  const payload = await getPayload({ config });
  let total = 0;

  while (true) {
    const batch = await payload.find({
      collection: "enrollments",
      limit: 100,
      depth: 0,
      pagination: false,
    });
    if (batch.docs.length === 0) break;

    for (const doc of batch.docs) {
      await payload.delete({ collection: "enrollments", id: doc.id });
      total += 1;
    }
  }

  console.log(`Deleted ${total} enrollment(s).`);
  process.exit(0);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
