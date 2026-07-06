import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

/**
 * Adds the `enrollments` collection — the system of record for checkout +
 * payment records (mirrored to the Google Sheet "Enrollments" tab). Scoped to
 * only this collection: unrelated default-value drift from earlier edits is
 * intentionally left out so this migration stays focused and reversible.
 */
export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`enrollments\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`email\` text NOT NULL,
  	\`mobile\` text NOT NULL,
  	\`course_slug\` text NOT NULL,
  	\`course_name\` text,
  	\`plan_type\` text DEFAULT 'single' NOT NULL,
  	\`status\` text DEFAULT 'pending' NOT NULL,
  	\`amount\` numeric NOT NULL,
  	\`first_installment_amount\` numeric,
  	\`currency\` text DEFAULT 'INR',
  	\`order_id\` text NOT NULL,
  	\`payment_id\` text,
  	\`failure_reason\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`enrollments_course_slug_idx\` ON \`enrollments\` (\`course_slug\`);`)
  await db.run(sql`CREATE INDEX \`enrollments_status_idx\` ON \`enrollments\` (\`status\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`enrollments_order_id_idx\` ON \`enrollments\` (\`order_id\`);`)
  await db.run(sql`CREATE INDEX \`enrollments_payment_id_idx\` ON \`enrollments\` (\`payment_id\`);`)
  await db.run(sql`CREATE INDEX \`enrollments_updated_at_idx\` ON \`enrollments\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`enrollments_created_at_idx\` ON \`enrollments\` (\`created_at\`);`)
  await db.run(sql`ALTER TABLE \`payload_locked_documents_rels\` ADD \`enrollments_id\` integer REFERENCES enrollments(id);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_enrollments_id_idx\` ON \`payload_locked_documents_rels\` (\`enrollments_id\`);`)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`enrollments\`;`)
  await db.run(sql`PRAGMA foreign_keys=OFF;`)
  await db.run(sql`CREATE TABLE \`__new_payload_locked_documents_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` integer,
  	\`media_id\` integer,
  	\`course_details_id\` integer,
  	\`blog_posts_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`payload_locked_documents\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`course_details_id\`) REFERENCES \`course_details\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`blog_posts_id\`) REFERENCES \`blog_posts\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_payload_locked_documents_rels\`("id", "order", "parent_id", "path", "users_id", "media_id", "course_details_id", "blog_posts_id") SELECT "id", "order", "parent_id", "path", "users_id", "media_id", "course_details_id", "blog_posts_id" FROM \`payload_locked_documents_rels\`;`)
  await db.run(sql`DROP TABLE \`payload_locked_documents_rels\`;`)
  await db.run(sql`ALTER TABLE \`__new_payload_locked_documents_rels\` RENAME TO \`payload_locked_documents_rels\`;`)
  await db.run(sql`PRAGMA foreign_keys=ON;`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_order_idx\` ON \`payload_locked_documents_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_parent_idx\` ON \`payload_locked_documents_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_path_idx\` ON \`payload_locked_documents_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_users_id_idx\` ON \`payload_locked_documents_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_media_id_idx\` ON \`payload_locked_documents_rels\` (\`media_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_course_details_id_idx\` ON \`payload_locked_documents_rels\` (\`course_details_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_blog_posts_id_idx\` ON \`payload_locked_documents_rels\` (\`blog_posts_id\`);`)
}
