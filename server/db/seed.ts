import { db } from "@/server/db";
import { users } from "@/server/db/schema";

async function seed() {
  await db.insert(users).values([
    { name: "Alice", email: "alice@example.com", image: "alice.png" },
    { name: "Bob", email: "bob@example.com", image: "bob.png" },
    { name: "Charlie", email: "charlie@example.com", image: "charlie.png" },
  ]);
  console.log("🌱 Seeding completed successfully!");
}

seed().catch((error) => {
  console.error("❌ Seeding failed:", error);
});
