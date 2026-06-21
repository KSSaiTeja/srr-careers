import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`our_story_page_intro_metrics\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`value\` text NOT NULL,
  	\`label\` text NOT NULL,
  	\`icon\` text DEFAULT 'target' NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`our_story_page\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`our_story_page_intro_metrics_order_idx\` ON \`our_story_page_intro_metrics\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`our_story_page_intro_metrics_parent_id_idx\` ON \`our_story_page_intro_metrics\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`our_story_page_values_principles\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`description\` text NOT NULL,
  	\`icon\` text DEFAULT 'target' NOT NULL,
  	\`featured\` integer DEFAULT false,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`our_story_page\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`our_story_page_values_principles_order_idx\` ON \`our_story_page_values_principles\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`our_story_page_values_principles_parent_id_idx\` ON \`our_story_page_values_principles\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`our_story_page_excellence_pillars\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`num\` text NOT NULL,
  	\`title\` text NOT NULL,
  	\`description\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`our_story_page\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`our_story_page_excellence_pillars_order_idx\` ON \`our_story_page_excellence_pillars\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`our_story_page_excellence_pillars_parent_id_idx\` ON \`our_story_page_excellence_pillars\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`our_story_page_faq_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`question\` text NOT NULL,
  	\`answer\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`our_story_page\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`our_story_page_faq_items_order_idx\` ON \`our_story_page_faq_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`our_story_page_faq_items_parent_id_idx\` ON \`our_story_page_faq_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`our_story_page\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`intro_page_title\` text DEFAULT 'Our Story',
  	\`intro_headline\` text DEFAULT 'A finishing school for the next gen',
  	\`intro_headline_highlight\` text DEFAULT 'SAP FICO',
  	\`intro_headline_suffix\` text DEFAULT ' Consultants',
  	\`intro_subtext\` text,
  	\`values_title\` text DEFAULT 'Our',
  	\`values_title_line2\` text DEFAULT 'Values.',
  	\`values_intro\` text,
  	\`excellence_title\` text DEFAULT 'We''ve orchestrated',
  	\`excellence_highlight\` text DEFAULT 'Excellence.',
  	\`faq_eyebrow\` text DEFAULT 'FAQs',
  	\`faq_title\` text DEFAULT 'Questions we hear,',
  	\`faq_highlight\` text DEFAULT 'before the  demo.',
  	\`faq_helper_text\` text,
  	\`faq_ask_link_label\` text DEFAULT 'Ask us anything →',
  	\`faq_ask_link_href\` text DEFAULT '#pre-footer',
  	\`updated_at\` text,
  	\`created_at\` text
  );
  `)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`our_story_page_intro_metrics\`;`)
  await db.run(sql`DROP TABLE \`our_story_page_values_principles\`;`)
  await db.run(sql`DROP TABLE \`our_story_page_excellence_pillars\`;`)
  await db.run(sql`DROP TABLE \`our_story_page_faq_items\`;`)
  await db.run(sql`DROP TABLE \`our_story_page\`;`)
}
