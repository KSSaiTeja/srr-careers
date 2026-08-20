import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

/**
 * Adds editable office locations (address + Google Maps) to Site Settings.
 * Seeds Hyderabad head office and Visakhapatnam branch when the global exists.
 */
export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`site_settings_contact_locations\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`label\` text NOT NULL,
  	\`city\` text NOT NULL,
  	\`phone\` text,
  	\`address\` text NOT NULL,
  	\`phone_href\` text,
  	\`maps_url\` text,
  	\`maps_embed_url\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`site_settings\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX \`site_settings_contact_locations_order_idx\` ON \`site_settings_contact_locations\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`site_settings_contact_locations_parent_id_idx\` ON \`site_settings_contact_locations\` (\`_parent_id\`);`,
  )

  const rows = (await db.all(sql`SELECT \`id\` FROM \`site_settings\` LIMIT 1;`)) as Array<{
    id: number
  }>
  const parentId = rows[0]?.id
  if (parentId == null) return

  const offices = [
    {
      order: 0,
      id: 'hyd-head-office',
      label: 'Head Office',
      city: 'Hyderabad',
      phone: '+91 94904 30555',
      address:
        '304, Swarga Nivas Enclave, East Srinivasa Nagar, Ameerpet, Hyderabad - 500 038, Telangana',
      phoneHref: 'tel:+919490430555',
      mapsUrl:
        'https://www.google.com/maps/place/Swarga+nivas+apartments/@17.4381464,78.4450196,18z/data=!4m6!3m5!1s0x3bcb9140efd379fd:0x4503e74f4dea0d79!8m2!3d17.4382181!4d78.4456419!16s%2Fg%2F11t6mj_k1b?entry=ttu',
      mapsEmbedUrl:
        'https://www.google.com/maps?q=17.4382181,78.4456419&z=18&hl=en&output=embed',
    },
    {
      order: 1,
      id: 'vizag-branch-office',
      label: 'Branch Office',
      city: 'Visakhapatnam',
      phone: '+91 91601 12225',
      address:
        '5-5/1/2, 2nd Floor, Teachers Layout, Sujathanagar, Chinnamushidivada, Pendurthi, Visakhapatnam - 530 051, Andhra Pradesh',
      phoneHref: 'tel:+919160112225',
      mapsUrl: 'https://www.google.com/maps?q=17.7980488,83.2220081&hl=en&z=17',
      mapsEmbedUrl:
        'https://www.google.com/maps?q=17.7980488,83.2220081&z=17&hl=en&output=embed',
    },
  ] as const

  for (const office of offices) {
    await db.run(
      sql`INSERT INTO \`site_settings_contact_locations\`
        (\`_order\`, \`_parent_id\`, \`id\`, \`label\`, \`city\`, \`phone\`, \`address\`, \`phone_href\`, \`maps_url\`, \`maps_embed_url\`)
      VALUES
        (${office.order}, ${parentId}, ${office.id}, ${office.label}, ${office.city}, ${office.phone}, ${office.address}, ${office.phoneHref}, ${office.mapsUrl}, ${office.mapsEmbedUrl});`,
    )
  }
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`site_settings_contact_locations\`;`)
}
