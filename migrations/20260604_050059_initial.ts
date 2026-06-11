import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`users_sessions\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`created_at\` text,
  	\`expires_at\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`users_sessions_order_idx\` ON \`users_sessions\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`users_sessions_parent_id_idx\` ON \`users_sessions\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`users\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`email\` text NOT NULL,
  	\`reset_password_token\` text,
  	\`reset_password_expiration\` text,
  	\`salt\` text,
  	\`hash\` text,
  	\`login_attempts\` numeric DEFAULT 0,
  	\`lock_until\` text
  );
  `)
  await db.run(sql`CREATE INDEX \`users_updated_at_idx\` ON \`users\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`users_created_at_idx\` ON \`users\` (\`created_at\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`users_email_idx\` ON \`users\` (\`email\`);`)
  await db.run(sql`CREATE TABLE \`media\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`alt\` text NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`url\` text,
  	\`thumbnail_u_r_l\` text,
  	\`filename\` text,
  	\`mime_type\` text,
  	\`filesize\` numeric,
  	\`width\` numeric,
  	\`height\` numeric,
  	\`focal_x\` numeric,
  	\`focal_y\` numeric
  );
  `)
  await db.run(sql`CREATE INDEX \`media_updated_at_idx\` ON \`media\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`media_created_at_idx\` ON \`media\` (\`created_at\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`media_filename_idx\` ON \`media\` (\`filename\`);`)
  await db.run(sql`CREATE TABLE \`payload_kv\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`key\` text NOT NULL,
  	\`data\` text NOT NULL
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`payload_kv_key_idx\` ON \`payload_kv\` (\`key\`);`)
  await db.run(sql`CREATE TABLE \`payload_locked_documents\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`global_slug\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_global_slug_idx\` ON \`payload_locked_documents\` (\`global_slug\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_updated_at_idx\` ON \`payload_locked_documents\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_created_at_idx\` ON \`payload_locked_documents\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`payload_locked_documents_rels\` (
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
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_order_idx\` ON \`payload_locked_documents_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_parent_idx\` ON \`payload_locked_documents_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_path_idx\` ON \`payload_locked_documents_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_users_id_idx\` ON \`payload_locked_documents_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_media_id_idx\` ON \`payload_locked_documents_rels\` (\`media_id\`);`)
  await db.run(sql`CREATE TABLE \`payload_preferences\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`key\` text,
  	\`value\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_preferences_key_idx\` ON \`payload_preferences\` (\`key\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_updated_at_idx\` ON \`payload_preferences\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_created_at_idx\` ON \`payload_preferences\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`payload_preferences_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`payload_preferences\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_preferences_rels_order_idx\` ON \`payload_preferences_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_rels_parent_idx\` ON \`payload_preferences_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_rels_path_idx\` ON \`payload_preferences_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_rels_users_id_idx\` ON \`payload_preferences_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`payload_migrations\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text,
  	\`batch\` numeric,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_migrations_updated_at_idx\` ON \`payload_migrations\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`payload_migrations_created_at_idx\` ON \`payload_migrations\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`home_page_problem_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`icon\` text NOT NULL,
  	\`text\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`home_page\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`home_page_problem_items_order_idx\` ON \`home_page_problem_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`home_page_problem_items_parent_id_idx\` ON \`home_page_problem_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`home_page_instructor_features_left\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`description\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`home_page\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`home_page_instructor_features_left_order_idx\` ON \`home_page_instructor_features_left\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`home_page_instructor_features_left_parent_id_idx\` ON \`home_page_instructor_features_left\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`home_page_instructor_features_right\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`description\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`home_page\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`home_page_instructor_features_right_order_idx\` ON \`home_page_instructor_features_right\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`home_page_instructor_features_right_parent_id_idx\` ON \`home_page_instructor_features_right\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`home_page_curriculum_modules\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`num\` text NOT NULL,
  	\`title\` text NOT NULL,
  	\`desc\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`home_page\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`home_page_curriculum_modules_order_idx\` ON \`home_page_curriculum_modules\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`home_page_curriculum_modules_parent_id_idx\` ON \`home_page_curriculum_modules\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`home_page_testimonials_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`role\` text NOT NULL,
  	\`initials\` text NOT NULL,
  	\`quote\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`home_page\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`home_page_testimonials_items_order_idx\` ON \`home_page_testimonials_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`home_page_testimonials_items_parent_id_idx\` ON \`home_page_testimonials_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`home_page\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`hero_badge\` text DEFAULT '#1 SAP FICO TRAINING INSTITUTE',
  	\`hero_title_line1\` text DEFAULT 'Master SAP FICO with',
  	\`hero_title_accent\` text DEFAULT 'S4 HANA',
  	\`hero_primary_cta_label\` text NOT NULL,
  	\`hero_primary_cta_href\` text NOT NULL,
  	\`hero_secondary_cta_label\` text NOT NULL,
  	\`hero_secondary_cta_href\` text NOT NULL,
  	\`hero_image_id\` integer,
  	\`hero_image_alt\` text DEFAULT 'Students learning SAP FICO — two students working on laptops',
  	\`problem_heading_gray\` text DEFAULT 'Does this relatable to your',
  	\`problem_heading_navy\` text DEFAULT 'SAP FICO Journey?',
  	\`mission_eyebrow\` text DEFAULT 'Our Mission',
  	\`mission_heading_gray\` text DEFAULT 'Our focus is simple',
  	\`mission_heading_navy\` text DEFAULT 'Train to deliver.',
  	\`mission_roi_card_label\` text DEFAULT 'RETURN ON INVESTMENT',
  	\`mission_roi_card_value\` text DEFAULT '2.4',
  	\`mission_roi_card_suffix\` text DEFAULT 'x',
  	\`mission_roi_card_description\` text DEFAULT 'Average salary jump within 90 days of placement.',
  	\`mission_roi_card_partners_label\` text DEFAULT '800+ Partners',
  	\`mission_placement_card_top_label\` text DEFAULT 'COHORT PLACEMENT RATE',
  	\`mission_placement_card_top_value\` text DEFAULT '94',
  	\`mission_placement_card_top_suffix\` text DEFAULT '%',
  	\`mission_placement_card_top_description\` text DEFAULT 'Average salary jump within 90 days of placement.',
  	\`mission_alumni_card_body\` text DEFAULT 'We''ve placed 15,000+ consultants worldwide, helping them break into top SAP practices in the industry',
  	\`mission_alumni_card_rating\` text DEFAULT '4.8',
  	\`mission_alumni_card_rating_suffix\` text DEFAULT '/5',
  	\`mission_alumni_card_trusted_by\` text DEFAULT 'TRUSTED BY
  15K+ ALUMNI',
  	\`mission_placement_card_bottom_label\` text DEFAULT 'COHORT PLACEMENT RATE',
  	\`mission_placement_card_bottom_value\` text DEFAULT '94',
  	\`mission_placement_card_bottom_suffix\` text DEFAULT '%',
  	\`mission_placement_card_bottom_description\` text DEFAULT 'Average across the last 4 cohorts — most students receive their first offer within 45 days of graduation.',
  	\`mission_practice_card_label\` text DEFAULT 'FOCUSED PRACTICE',
  	\`mission_practice_card_value\` text DEFAULT '12',
  	\`mission_practice_card_description\` text DEFAULT 'Years on SAP FICO',
  	\`instructor_eyebrow\` text DEFAULT 'ABOUT YOUR INSTRUCTOR',
  	\`instructor_title\` text DEFAULT 'Your personal guide to',
  	\`instructor_title_highlight\` text DEFAULT 'SAP FICO Success',
  	\`instructor_photo_id\` integer,
  	\`instructor_journey_heading\` text DEFAULT 'My Journey:',
  	\`instructor_journey_body\` text DEFAULT 'Meet Mr. Kumar, a highly experienced and passionate SAP FICO S/4HANA trainer associated with SRR Careers as a Full-Time Trainer, trained 250+ professionals across India, UAE, Qatar & Saudi.',
  	\`instructor_skills_heading\` text DEFAULT 'Hands-on SAP Skills',
  	\`instructor_skills_body\` text DEFAULT 'Master SAP FICO with accounting and finance skills.',
  	\`curriculum_eyebrow\` text DEFAULT 'CURRICULUM',
  	\`curriculum_title_line1\` text DEFAULT 'A nine-module journey',
  	\`curriculum_title_line2\` text DEFAULT 'to becoming a',
  	\`curriculum_title_highlight\` text DEFAULT 'S/4 HANA',
  	\`curriculum_title_line2_suffix\` text DEFAULT 'consultant',
  	\`curriculum_cta_eyebrow\` text DEFAULT 'FULL SYLLABUS',
  	\`curriculum_cta_title\` text DEFAULT 'See every topic, every project, every outcome.',
  	\`curriculum_cta_label\` text NOT NULL,
  	\`curriculum_cta_href\` text NOT NULL,
  	\`testimonials_eyebrow\` text DEFAULT 'TESTIMONIALS',
  	\`testimonials_title\` text DEFAULT 'Stories from our',
  	\`testimonials_title_highlight\` text DEFAULT 'satisfied students',
  	\`pre_footer_badge\` text DEFAULT 'LIMITED SEATS — NEXT BATCH',
  	\`pre_footer_heading_line1\` text DEFAULT 'Book your free SAP',
  	\`pre_footer_heading_line2\` text DEFAULT 'S/4 HANA FICO Live Demo',
  	\`pre_footer_description\` text DEFAULT 'Interact live with SAP industry experts. Get the complete roadmap and syllabus. 100% free — no credit card.',
  	\`pre_footer_phone_button_label\` text DEFAULT '98485 40123',
  	\`pre_footer_email_button_label\` text DEFAULT 'Email us',
  	\`updated_at\` text,
  	\`created_at\` text,
  	FOREIGN KEY (\`hero_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`instructor_photo_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`home_page_hero_hero_image_idx\` ON \`home_page\` (\`hero_image_id\`);`)
  await db.run(sql`CREATE INDEX \`home_page_instructor_instructor_photo_idx\` ON \`home_page\` (\`instructor_photo_id\`);`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`users_sessions\`;`)
  await db.run(sql`DROP TABLE \`users\`;`)
  await db.run(sql`DROP TABLE \`media\`;`)
  await db.run(sql`DROP TABLE \`payload_kv\`;`)
  await db.run(sql`DROP TABLE \`payload_locked_documents\`;`)
  await db.run(sql`DROP TABLE \`payload_locked_documents_rels\`;`)
  await db.run(sql`DROP TABLE \`payload_preferences\`;`)
  await db.run(sql`DROP TABLE \`payload_preferences_rels\`;`)
  await db.run(sql`DROP TABLE \`payload_migrations\`;`)
  await db.run(sql`DROP TABLE \`home_page_problem_items\`;`)
  await db.run(sql`DROP TABLE \`home_page_instructor_features_left\`;`)
  await db.run(sql`DROP TABLE \`home_page_instructor_features_right\`;`)
  await db.run(sql`DROP TABLE \`home_page_curriculum_modules\`;`)
  await db.run(sql`DROP TABLE \`home_page_testimonials_items\`;`)
  await db.run(sql`DROP TABLE \`home_page\`;`)
}
