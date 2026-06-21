import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`whats_new_page_feed_updates\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`pinned\` integer DEFAULT false,
  	\`category\` text DEFAULT 'events' NOT NULL,
  	\`time_ago\` text NOT NULL,
  	\`badge\` text DEFAULT 'update' NOT NULL,
  	\`badge_label\` text DEFAULT 'UPDATE' NOT NULL,
  	\`title\` text NOT NULL,
  	\`description\` text NOT NULL,
  	\`cta_label\` text,
  	\`cta_href\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`whats_new_page\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`whats_new_page_feed_updates_order_idx\` ON \`whats_new_page_feed_updates\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`whats_new_page_feed_updates_parent_id_idx\` ON \`whats_new_page_feed_updates\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`whats_new_page\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`intro_page_title\` text DEFAULT 'What''s Happening at SRR',
  	\`newsletter_title\` text DEFAULT 'Stay in the loop',
  	\`newsletter_description\` text DEFAULT 'One email when something actually matters. No drip campaigns, no fluff — just pure career intelligence.',
  	\`newsletter_cta_label\` text DEFAULT 'Subscribe',
  	\`newsletter_cta_href\` text DEFAULT 'mailto:suresh@srrcareers.in?subject=SRR%20Careers%20newsletter',
  	\`updated_at\` text,
  	\`created_at\` text
  );
  `)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`whats_new_page_feed_updates\`;`)
  await db.run(sql`DROP TABLE \`whats_new_page\`;`)
}
