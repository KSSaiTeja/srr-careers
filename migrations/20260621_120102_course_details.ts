import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`course_details_overview_meta_cards\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`icon\` text NOT NULL,
  	\`label\` text NOT NULL,
  	\`value\` text NOT NULL,
  	\`value_suffix\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`course_details\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`course_details_overview_meta_cards_order_idx\` ON \`course_details_overview_meta_cards\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`course_details_overview_meta_cards_parent_id_idx\` ON \`course_details_overview_meta_cards\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`course_details_syllabus_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`number\` text NOT NULL,
  	\`title\` text NOT NULL,
  	\`description\` text,
  	\`topics\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`course_details\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`course_details_syllabus_items_order_idx\` ON \`course_details_syllabus_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`course_details_syllabus_items_parent_id_idx\` ON \`course_details_syllabus_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`course_details_faq_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`question\` text NOT NULL,
  	\`answer\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`course_details\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`course_details_faq_items_order_idx\` ON \`course_details_faq_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`course_details_faq_items_parent_id_idx\` ON \`course_details_faq_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`course_details\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`slug\` text NOT NULL,
  	\`meta_title\` text NOT NULL,
  	\`meta_description\` text NOT NULL,
  	\`intro_page_title\` text NOT NULL,
  	\`intro_headline\` text NOT NULL,
  	\`intro_headline_highlight\` text NOT NULL,
  	\`intro_subtext\` text,
  	\`overview_description\` text NOT NULL,
  	\`overview_primary_cta\` text DEFAULT 'Book a Free Demo',
  	\`overview_secondary_cta\` text DEFAULT 'Explore Curriculum',
  	\`overview_secondary_cta_href\` text DEFAULT '#syllabus',
  	\`overview_module_count\` text,
  	\`overview_module_label\` text DEFAULT 'Modules',
  	\`overview_module_blurb\` text,
  	\`who_is_it_for_eyebrow\` text DEFAULT 'who is it for',
  	\`who_is_it_for_title\` text NOT NULL,
  	\`who_is_it_for_title_highlight\` text NOT NULL,
  	\`who_is_it_for_audience\` text NOT NULL,
  	\`who_is_it_for_hands_on_title\` text DEFAULT 'Hands-on with real systems.',
  	\`who_is_it_for_hands_on_description\` text,
  	\`who_is_it_for_hands_on_features\` text NOT NULL,
  	\`syllabus_eyebrow\` text DEFAULT 'Curriculum',
  	\`syllabus_title\` text DEFAULT 'Full Syllabus',
  	\`footer_blocks_also_offered_eyebrow\` text DEFAULT 'Also offered',
  	\`footer_blocks_also_offered_title\` text NOT NULL,
  	\`footer_blocks_also_offered_href\` text NOT NULL,
  	\`footer_blocks_also_offered_cta_label\` text DEFAULT 'Explore Course Details',
  	\`footer_blocks_limited_seats_cta_eyebrow\` text DEFAULT 'NEXT BATCH STARTS SOON',
  	\`footer_blocks_limited_seats_cta_title_line1\` text DEFAULT 'Limited Seats.',
  	\`footer_blocks_limited_seats_cta_title_line2\` text DEFAULT 'Reserve yours.',
  	\`footer_blocks_limited_seats_cta_description\` text,
  	\`footer_blocks_limited_seats_cta_cta_label\` text DEFAULT 'Book a Free Demo',
  	\`footer_blocks_limited_seats_cta_cta_href\` text DEFAULT '#pre-footer',
  	\`faq_eyebrow\` text DEFAULT 'FAQs',
  	\`faq_title\` text DEFAULT 'Questions we hear,',
  	\`faq_highlight\` text DEFAULT 'before the  demo.',
  	\`faq_helper_text\` text,
  	\`faq_ask_link_label\` text DEFAULT 'Ask us anything →',
  	\`faq_ask_link_href\` text DEFAULT '#pre-footer',
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`course_details_slug_idx\` ON \`course_details\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`course_details_updated_at_idx\` ON \`course_details\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`course_details_created_at_idx\` ON \`course_details\` (\`created_at\`);`)
  await db.run(sql`ALTER TABLE \`payload_locked_documents_rels\` ADD \`course_details_id\` integer REFERENCES course_details(id);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_course_details_id_idx\` ON \`payload_locked_documents_rels\` (\`course_details_id\`);`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`course_details_overview_meta_cards\`;`)
  await db.run(sql`DROP TABLE \`course_details_syllabus_items\`;`)
  await db.run(sql`DROP TABLE \`course_details_faq_items\`;`)
  await db.run(sql`DROP TABLE \`course_details\`;`)
  await db.run(sql`PRAGMA foreign_keys=OFF;`)
  await db.run(sql`CREATE TABLE \`__new_payload_locked_documents_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` integer,
  	\`media_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`payload_locked_documents\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_payload_locked_documents_rels\`("id", "order", "parent_id", "path", "users_id", "media_id") SELECT "id", "order", "parent_id", "path", "users_id", "media_id" FROM \`payload_locked_documents_rels\`;`)
  await db.run(sql`DROP TABLE \`payload_locked_documents_rels\`;`)
  await db.run(sql`ALTER TABLE \`__new_payload_locked_documents_rels\` RENAME TO \`payload_locked_documents_rels\`;`)
  await db.run(sql`PRAGMA foreign_keys=ON;`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_order_idx\` ON \`payload_locked_documents_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_parent_idx\` ON \`payload_locked_documents_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_path_idx\` ON \`payload_locked_documents_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_users_id_idx\` ON \`payload_locked_documents_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_media_id_idx\` ON \`payload_locked_documents_rels\` (\`media_id\`);`)
}
