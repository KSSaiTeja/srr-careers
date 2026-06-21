import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`blog_posts_blocks_paragraph\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`text\` text NOT NULL,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`blog_posts\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`blog_posts_blocks_paragraph_order_idx\` ON \`blog_posts_blocks_paragraph\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`blog_posts_blocks_paragraph_parent_id_idx\` ON \`blog_posts_blocks_paragraph\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`blog_posts_blocks_paragraph_path_idx\` ON \`blog_posts_blocks_paragraph\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`blog_posts_blocks_heading\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`text\` text NOT NULL,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`blog_posts\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`blog_posts_blocks_heading_order_idx\` ON \`blog_posts_blocks_heading\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`blog_posts_blocks_heading_parent_id_idx\` ON \`blog_posts_blocks_heading\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`blog_posts_blocks_heading_path_idx\` ON \`blog_posts_blocks_heading\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`blog_posts_blocks_quote\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`text\` text NOT NULL,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`blog_posts\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`blog_posts_blocks_quote_order_idx\` ON \`blog_posts_blocks_quote\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`blog_posts_blocks_quote_parent_id_idx\` ON \`blog_posts_blocks_quote\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`blog_posts_blocks_quote_path_idx\` ON \`blog_posts_blocks_quote\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`blog_posts_blocks_list\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`items\` text NOT NULL,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`blog_posts\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`blog_posts_blocks_list_order_idx\` ON \`blog_posts_blocks_list\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`blog_posts_blocks_list_parent_id_idx\` ON \`blog_posts_blocks_list\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`blog_posts_blocks_list_path_idx\` ON \`blog_posts_blocks_list\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`blog_posts_blocks_image\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`image_id\` integer,
  	\`caption\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`blog_posts\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`blog_posts_blocks_image_order_idx\` ON \`blog_posts_blocks_image\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`blog_posts_blocks_image_parent_id_idx\` ON \`blog_posts_blocks_image\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`blog_posts_blocks_image_path_idx\` ON \`blog_posts_blocks_image\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`blog_posts_blocks_image_image_idx\` ON \`blog_posts_blocks_image\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`blog_posts\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`slug\` text NOT NULL,
  	\`meta_title\` text NOT NULL,
  	\`meta_description\` text NOT NULL,
  	\`content_title\` text NOT NULL,
  	\`content_excerpt\` text NOT NULL,
  	\`content_cover_image_id\` integer,
  	\`content_author\` text DEFAULT 'Suresh Kumar' NOT NULL,
  	\`content_author_role\` text DEFAULT 'Lead SAP FICO Trainer',
  	\`content_published_date\` text NOT NULL,
  	\`content_read_time\` text DEFAULT '6 min read',
  	\`content_category\` text DEFAULT 'SAP FICO' NOT NULL,
  	\`content_featured\` integer DEFAULT false,
  	\`content_tags\` text,
  	\`article_table_of_contents\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`content_cover_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`blog_posts_slug_idx\` ON \`blog_posts\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`blog_posts_content_content_cover_image_idx\` ON \`blog_posts\` (\`content_cover_image_id\`);`)
  await db.run(sql`CREATE INDEX \`blog_posts_updated_at_idx\` ON \`blog_posts\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`blog_posts_created_at_idx\` ON \`blog_posts\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`blog_page\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`intro_page_title\` text NOT NULL,
  	\`intro_headline\` text NOT NULL,
  	\`intro_headline_highlight\` text NOT NULL,
  	\`intro_subtext\` text,
  	\`sidebar_search_placeholder\` text DEFAULT 'Search articles',
  	\`sidebar_category_title\` text DEFAULT 'Categories',
  	\`sidebar_recent_title\` text DEFAULT 'Recent Posts',
  	\`sidebar_tags_title\` text DEFAULT 'Popular Tags',
  	\`sidebar_popular_tags\` text,
  	\`updated_at\` text,
  	\`created_at\` text
  );
  `)
  await db.run(sql`ALTER TABLE \`payload_locked_documents_rels\` ADD \`blog_posts_id\` integer REFERENCES blog_posts(id);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_blog_posts_id_idx\` ON \`payload_locked_documents_rels\` (\`blog_posts_id\`);`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`blog_posts_blocks_paragraph\`;`)
  await db.run(sql`DROP TABLE \`blog_posts_blocks_heading\`;`)
  await db.run(sql`DROP TABLE \`blog_posts_blocks_quote\`;`)
  await db.run(sql`DROP TABLE \`blog_posts_blocks_list\`;`)
  await db.run(sql`DROP TABLE \`blog_posts_blocks_image\`;`)
  await db.run(sql`DROP TABLE \`blog_posts\`;`)
  await db.run(sql`DROP TABLE \`blog_page\`;`)
  await db.run(sql`PRAGMA foreign_keys=OFF;`)
  await db.run(sql`CREATE TABLE \`__new_payload_locked_documents_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` integer,
  	\`media_id\` integer,
  	\`course_details_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`payload_locked_documents\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`course_details_id\`) REFERENCES \`course_details\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_payload_locked_documents_rels\`("id", "order", "parent_id", "path", "users_id", "media_id", "course_details_id") SELECT "id", "order", "parent_id", "path", "users_id", "media_id", "course_details_id" FROM \`payload_locked_documents_rels\`;`)
  await db.run(sql`DROP TABLE \`payload_locked_documents_rels\`;`)
  await db.run(sql`ALTER TABLE \`__new_payload_locked_documents_rels\` RENAME TO \`payload_locked_documents_rels\`;`)
  await db.run(sql`PRAGMA foreign_keys=ON;`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_order_idx\` ON \`payload_locked_documents_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_parent_idx\` ON \`payload_locked_documents_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_path_idx\` ON \`payload_locked_documents_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_users_id_idx\` ON \`payload_locked_documents_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_media_id_idx\` ON \`payload_locked_documents_rels\` (\`media_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_course_details_id_idx\` ON \`payload_locked_documents_rels\` (\`course_details_id\`);`)
}
