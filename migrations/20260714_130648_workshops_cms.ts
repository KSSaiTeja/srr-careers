import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

/**
 * Adds Workshops Page global + Workshop Detail Pages collection
 * (listing chrome, shared labels, and per-workshop content/agenda).
 */
export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`workshops_page\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`meta_title\` text DEFAULT 'Workshops | SRR Careers',
  	\`meta_description\` text DEFAULT 'Campus and corporate workshops from SRR Careers — career pathways, skills blueprint, resume & interview prep, GST, and personal finance. Duration and pricing are customisable.',
  	\`intro_page_title\` text DEFAULT 'Workshops',
  	\`intro_headline\` text DEFAULT 'Practical programmes for campuses and teams',
  	\`intro_subtext\` text DEFAULT 'Careers, skills, placements, GST, and personal finance — delivered by practitioners. Duration and pricing are both {{duration}} for your institution or batch.',
  	\`shared_duration_label\` text DEFAULT 'Customisable',
  	\`shared_pricing_label\` text DEFAULT 'Customisable',
  	\`shared_duration_note\` text DEFAULT 'Sample agenda below — length can be tailored to your institution or batch.',
  	\`shared_pricing_note\` text DEFAULT 'Fees tailored to campus or corporate batch size.',
  	\`cards_duration_prefix\` text DEFAULT 'Duration:',
  	\`cards_price_prefix\` text DEFAULT 'Price:',
  	\`cards_sample_prefix\` text DEFAULT '· sample',
  	\`detail_meta_duration_label\` text DEFAULT 'Duration',
  	\`detail_meta_price_label\` text DEFAULT 'Price',
  	\`detail_meta_mode_label\` text DEFAULT 'Mode',
  	\`detail_meta_audience_label\` text DEFAULT 'Audience',
  	\`detail_meta_speaker_label\` text DEFAULT 'Speaker',
  	\`detail_pricing_eyebrow\` text DEFAULT 'Duration & pricing',
  	\`detail_pricing_headline\` text DEFAULT 'Both customisable',
  	\`detail_sample_agenda_prefix\` text DEFAULT 'Sample agenda:',
  	\`detail_highlights_heading\` text DEFAULT 'What you''ll take away',
  	\`detail_agenda_eyebrow\` text DEFAULT 'Agenda',
  	\`detail_agenda_title_modules\` text DEFAULT 'Session modules',
  	\`detail_agenda_title_sessions\` text DEFAULT 'One-day programme flow',
  	\`detail_agenda_title_formats\` text DEFAULT 'Choose a format',
  	\`detail_format_audience_label\` text DEFAULT 'Audience:',
  	\`detail_back_cta_label\` text DEFAULT 'All workshops',
  	\`detail_back_cta_href\` text DEFAULT '/workshops',
  	\`updated_at\` text,
  	\`created_at\` text
  );
  `)

  await db.run(sql`CREATE TABLE \`workshop_details\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`slug\` text NOT NULL,
  	\`sort_order\` numeric DEFAULT 0,
  	\`published\` integer DEFAULT true,
  	\`nav_label\` text,
  	\`meta_title\` text,
  	\`meta_description\` text,
  	\`card_eyebrow\` text DEFAULT 'Workshop' NOT NULL,
  	\`card_title\` text NOT NULL,
  	\`card_summary\` text NOT NULL,
  	\`card_duration_baseline\` text,
  	\`detail_description\` text NOT NULL,
  	\`detail_mode\` text,
  	\`detail_speaker\` text,
  	\`detail_audience\` text,
  	\`detail_course_detail_slug\` text,
  	\`agenda_layout\` text DEFAULT 'modules' NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`workshop_details_slug_idx\` ON \`workshop_details\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`workshop_details_updated_at_idx\` ON \`workshop_details\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`workshop_details_created_at_idx\` ON \`workshop_details\` (\`created_at\`);`)

  await db.run(sql`CREATE TABLE \`workshop_details_detail_highlights\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`text\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`workshop_details\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`workshop_details_detail_highlights_order_idx\` ON \`workshop_details_detail_highlights\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`workshop_details_detail_highlights_parent_id_idx\` ON \`workshop_details_detail_highlights\` (\`_parent_id\`);`)

  await db.run(sql`CREATE TABLE \`workshop_details_agenda_modules\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`duration\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`workshop_details\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`workshop_details_agenda_modules_order_idx\` ON \`workshop_details_agenda_modules\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`workshop_details_agenda_modules_parent_id_idx\` ON \`workshop_details_agenda_modules\` (\`_parent_id\`);`)

  await db.run(sql`CREATE TABLE \`workshop_details_agenda_sessions\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`label\` text,
  	\`time\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`workshop_details\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`workshop_details_agenda_sessions_order_idx\` ON \`workshop_details_agenda_sessions\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`workshop_details_agenda_sessions_parent_id_idx\` ON \`workshop_details_agenda_sessions\` (\`_parent_id\`);`)

  await db.run(sql`CREATE TABLE \`workshop_details_agenda_sessions_modules\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`duration\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`workshop_details_agenda_sessions\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`workshop_details_agenda_sessions_modules_order_idx\` ON \`workshop_details_agenda_sessions_modules\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`workshop_details_agenda_sessions_modules_parent_id_idx\` ON \`workshop_details_agenda_sessions_modules\` (\`_parent_id\`);`)

  await db.run(sql`CREATE TABLE \`workshop_details_agenda_formats\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`format_id\` text,
  	\`title\` text,
  	\`duration\` text,
  	\`audience\` text,
  	\`note\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`workshop_details\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`workshop_details_agenda_formats_order_idx\` ON \`workshop_details_agenda_formats\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`workshop_details_agenda_formats_parent_id_idx\` ON \`workshop_details_agenda_formats\` (\`_parent_id\`);`)

  await db.run(sql`CREATE TABLE \`workshop_details_agenda_formats_modules\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`duration\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`workshop_details_agenda_formats\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`workshop_details_agenda_formats_modules_order_idx\` ON \`workshop_details_agenda_formats_modules\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`workshop_details_agenda_formats_modules_parent_id_idx\` ON \`workshop_details_agenda_formats_modules\` (\`_parent_id\`);`)

  await db.run(sql`ALTER TABLE \`payload_locked_documents_rels\` ADD \`workshop_details_id\` integer REFERENCES workshop_details(id);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_workshop_details_id_idx\` ON \`payload_locked_documents_rels\` (\`workshop_details_id\`);`)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP INDEX IF EXISTS \`payload_locked_documents_rels_workshop_details_id_idx\`;`)
  await db.run(sql`ALTER TABLE \`payload_locked_documents_rels\` DROP COLUMN \`workshop_details_id\`;`)
  await db.run(sql`DROP TABLE \`workshop_details_agenda_formats_modules\`;`)
  await db.run(sql`DROP TABLE \`workshop_details_agenda_formats\`;`)
  await db.run(sql`DROP TABLE \`workshop_details_agenda_sessions_modules\`;`)
  await db.run(sql`DROP TABLE \`workshop_details_agenda_sessions\`;`)
  await db.run(sql`DROP TABLE \`workshop_details_agenda_modules\`;`)
  await db.run(sql`DROP TABLE \`workshop_details_detail_highlights\`;`)
  await db.run(sql`DROP TABLE \`workshop_details\`;`)
  await db.run(sql`DROP TABLE \`workshops_page\`;`)
}
