import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`courses_page_offerings_courses\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`variant\` text DEFAULT 'consultant' NOT NULL,
  	\`title\` text NOT NULL,
  	\`description\` text NOT NULL,
  	\`duration\` text,
  	\`duration_suffix\` text,
  	\`modules\` text,
  	\`outcome\` text NOT NULL,
  	\`highlights\` text NOT NULL,
  	\`cta_label\` text,
  	\`cta_href\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`courses_page\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`courses_page_offerings_courses_order_idx\` ON \`courses_page_offerings_courses\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`courses_page_offerings_courses_parent_id_idx\` ON \`courses_page_offerings_courses\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`courses_page_track_comparison_tracks\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`badge_variant\` text DEFAULT 'consultant' NOT NULL,
  	\`badge\` text NOT NULL,
  	\`persona_prefix\` text DEFAULT 'The',
  	\`persona\` text NOT NULL,
  	\`persona_description\` text NOT NULL,
  	\`work_label\` text DEFAULT 'you''ll work on',
  	\`work_items\` text NOT NULL,
  	\`tools_label\` text DEFAULT 'TOOLS YOU''LL TOUCH',
  	\`tools\` text NOT NULL,
  	\`outcome_label\` text DEFAULT 'OUTCOME',
  	\`outcome\` text NOT NULL,
  	\`tags\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`courses_page\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`courses_page_track_comparison_tracks_order_idx\` ON \`courses_page_track_comparison_tracks\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`courses_page_track_comparison_tracks_parent_id_idx\` ON \`courses_page_track_comparison_tracks\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`courses_page_faq_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`question\` text NOT NULL,
  	\`answer\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`courses_page\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`courses_page_faq_items_order_idx\` ON \`courses_page_faq_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`courses_page_faq_items_parent_id_idx\` ON \`courses_page_faq_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`courses_page\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`intro_page_title\` text DEFAULT 'Our Programs',
  	\`intro_headline\` text DEFAULT 'Two Tracks. One Obsession.',
  	\`intro_headline_highlight\` text DEFAULT 'FICO done right',
  	\`intro_subtext\` text DEFAULT 'Whether you''re stepping into SAP for the first time or sharpening end-user fluency, every cohort is mentored live by working consultants - never recorded lectures.',
  	\`offerings_eyebrow\` text DEFAULT 'Our Offerings',
  	\`offerings_title\` text DEFAULT 'Pick your',
  	\`offerings_title_highlight\` text DEFAULT 'track.',
  	\`learning_approach_title\` text DEFAULT 'Built for the way',
  	\`learning_approach_title_highlight\` text DEFAULT 'Consultants Learn.',
  	\`learning_approach_description\` text DEFAULT 'Not 200-hour video libraries. A small live cohort, daily mentor reviews, and project tickets straight from real SAP S/4Hana rollouts, implementations & support projects.',
  	\`learning_approach_cta_label\` text DEFAULT 'Explore Curriculum',
  	\`learning_approach_cta_href\` text DEFAULT '/#courses',
  	\`learning_approach_stats_max_seats_value\` text DEFAULT '24',
  	\`learning_approach_stats_max_seats_label\` text DEFAULT 'Max seats per cohort',
  	\`learning_approach_stats_max_seats_description\` text DEFAULT 'Small batches so every learner gets airtime, weekly reviews, and a direct line to the mentor.',
  	\`learning_approach_stats_mentor_led_title\` text DEFAULT 'Mentor-led',
  	\`learning_approach_stats_mentor_led_description\` text DEFAULT 'Every session is live with a working SAP consultant. Questions answered in the moment.',
  	\`learning_approach_stats_rating_value\` text DEFAULT '4.8',
  	\`learning_approach_stats_rating_suffix\` text DEFAULT '/5',
  	\`track_comparison_eyebrow\` text DEFAULT 'which track is for you',
  	\`track_comparison_title\` text DEFAULT 'Which SAP FICO career is',
  	\`track_comparison_title_highlight\` text DEFAULT 'Right for you?',
  	\`faq_eyebrow\` text DEFAULT 'FAQs',
  	\`faq_title\` text DEFAULT 'Questions we hear,',
  	\`faq_highlight\` text DEFAULT 'before the  demo.',
  	\`faq_helper_text\` text DEFAULT 'Can''t find the answer you''re looking for? Drop us a note - a senior counsellor responds within a working day.',
  	\`faq_ask_link_label\` text DEFAULT 'Ask us anything →',
  	\`faq_ask_link_href\` text DEFAULT '#pre-footer',
  	\`updated_at\` text,
  	\`created_at\` text
  );
  `)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`courses_page_offerings_courses\`;`)
  await db.run(sql`DROP TABLE \`courses_page_track_comparison_tracks\`;`)
  await db.run(sql`DROP TABLE \`courses_page_faq_items\`;`)
  await db.run(sql`DROP TABLE \`courses_page\`;`)
}
