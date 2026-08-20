import * as migration_20260604_050059_initial from './20260604_050059_initial';
import * as migration_20260621_111452_whats_new_page from './20260621_111452_whats_new_page';
import * as migration_20260621_113731_courses_page from './20260621_113731_courses_page';
import * as migration_20260621_115209_our_story_page from './20260621_115209_our_story_page';
import * as migration_20260621_120102_course_details from './20260621_120102_course_details';
import * as migration_20260621_122134_site_settings from './20260621_122134_site_settings';
import * as migration_20260621_124416_blog from './20260621_124416_blog';
import * as migration_20260621_131107_add_course_prices from './20260621_131107_add_course_prices';
import * as migration_20260623_085425_nav_dropdown_children from './20260623_085425_nav_dropdown_children';
import * as migration_20260623_120000_syllabus_notice from './20260623_120000_syllabus_notice';
import * as migration_20260623_130000_home_curriculum_notice from './20260623_130000_home_curriculum_notice';
import * as migration_20260626_120000_demo_class_anchor from './20260626_120000_demo_class_anchor';
import * as migration_20260626_123840_payment_enrollments from './20260626_123840_payment_enrollments';
import * as migration_20260626_130000_enrollment_installment_dates from './20260626_130000_enrollment_installment_dates';
import * as migration_20260626_140000_enrollment_mail_flags from './20260626_140000_enrollment_mail_flags';
import * as migration_20260626_150000_drop_unused_mail_flags from './20260626_150000_drop_unused_mail_flags';
import * as migration_20260701_120000_enrollment_address_lead from './20260701_120000_enrollment_address_lead';
import * as migration_20260714_120000_msme_top_strip from './20260714_120000_msme_top_strip';
import * as migration_20260714_124638_our_team_page from './20260714_124638_our_team_page';
import * as migration_20260714_130648_workshops_cms from './20260714_130648_workshops_cms';
import * as migration_20260714_183000_blog_generate_slug from './20260714_183000_blog_generate_slug';
import * as migration_20260714_190000_courses_listing_nav from './20260714_190000_courses_listing_nav';
import * as migration_20260714_191000_nav_nested_children_rename from './20260714_191000_nav_nested_children_rename';
import * as migration_20260715_060000_workshops_listing_cards from './20260715_060000_workshops_listing_cards';
import * as migration_20260820_120000_contact_locations from './20260820_120000_contact_locations';
import * as migration_20260820_130000_footer_company_blurb from './20260820_130000_footer_company_blurb';

export const migrations = [
  {
    up: migration_20260604_050059_initial.up,
    down: migration_20260604_050059_initial.down,
    name: '20260604_050059_initial',
  },
  {
    up: migration_20260621_111452_whats_new_page.up,
    down: migration_20260621_111452_whats_new_page.down,
    name: '20260621_111452_whats_new_page',
  },
  {
    up: migration_20260621_113731_courses_page.up,
    down: migration_20260621_113731_courses_page.down,
    name: '20260621_113731_courses_page',
  },
  {
    up: migration_20260621_115209_our_story_page.up,
    down: migration_20260621_115209_our_story_page.down,
    name: '20260621_115209_our_story_page',
  },
  {
    up: migration_20260621_120102_course_details.up,
    down: migration_20260621_120102_course_details.down,
    name: '20260621_120102_course_details',
  },
  {
    up: migration_20260621_122134_site_settings.up,
    down: migration_20260621_122134_site_settings.down,
    name: '20260621_122134_site_settings',
  },
  {
    up: migration_20260621_124416_blog.up,
    down: migration_20260621_124416_blog.down,
    name: '20260621_124416_blog',
  },
  {
    up: migration_20260621_131107_add_course_prices.up,
    down: migration_20260621_131107_add_course_prices.down,
    name: '20260621_131107_add_course_prices',
  },
  {
    up: migration_20260623_085425_nav_dropdown_children.up,
    down: migration_20260623_085425_nav_dropdown_children.down,
    name: '20260623_085425_nav_dropdown_children',
  },
  {
    up: migration_20260623_120000_syllabus_notice.up,
    down: migration_20260623_120000_syllabus_notice.down,
    name: '20260623_120000_syllabus_notice',
  },
  {
    up: migration_20260623_130000_home_curriculum_notice.up,
    down: migration_20260623_130000_home_curriculum_notice.down,
    name: '20260623_130000_home_curriculum_notice',
  },
  {
    up: migration_20260626_120000_demo_class_anchor.up,
    down: migration_20260626_120000_demo_class_anchor.down,
    name: '20260626_120000_demo_class_anchor',
  },
  {
    up: migration_20260626_123840_payment_enrollments.up,
    down: migration_20260626_123840_payment_enrollments.down,
    name: '20260626_123840_payment_enrollments',
  },
  {
    up: migration_20260626_130000_enrollment_installment_dates.up,
    down: migration_20260626_130000_enrollment_installment_dates.down,
    name: '20260626_130000_enrollment_installment_dates',
  },
  {
    up: migration_20260626_140000_enrollment_mail_flags.up,
    down: migration_20260626_140000_enrollment_mail_flags.down,
    name: '20260626_140000_enrollment_mail_flags',
  },
  {
    up: migration_20260626_150000_drop_unused_mail_flags.up,
    down: migration_20260626_150000_drop_unused_mail_flags.down,
    name: '20260626_150000_drop_unused_mail_flags',
  },
  {
    up: migration_20260701_120000_enrollment_address_lead.up,
    down: migration_20260701_120000_enrollment_address_lead.down,
    name: '20260701_120000_enrollment_address_lead',
  },
  {
    up: migration_20260714_120000_msme_top_strip.up,
    down: migration_20260714_120000_msme_top_strip.down,
    name: '20260714_120000_msme_top_strip',
  },
  {
    up: migration_20260714_124638_our_team_page.up,
    down: migration_20260714_124638_our_team_page.down,
    name: '20260714_124638_our_team_page',
  },
  {
    up: migration_20260714_130648_workshops_cms.up,
    down: migration_20260714_130648_workshops_cms.down,
    name: '20260714_130648_workshops_cms',
  },
  {
    up: migration_20260714_183000_blog_generate_slug.up,
    down: migration_20260714_183000_blog_generate_slug.down,
    name: '20260714_183000_blog_generate_slug'
  },
  {
    up: migration_20260714_190000_courses_listing_nav.up,
    down: migration_20260714_190000_courses_listing_nav.down,
    name: '20260714_190000_courses_listing_nav',
  },
  {
    up: migration_20260714_191000_nav_nested_children_rename.up,
    down: migration_20260714_191000_nav_nested_children_rename.down,
    name: '20260714_191000_nav_nested_children_rename',
  },
  {
    up: migration_20260715_060000_workshops_listing_cards.up,
    down: migration_20260715_060000_workshops_listing_cards.down,
    name: '20260715_060000_workshops_listing_cards',
  },
  {
    up: migration_20260820_120000_contact_locations.up,
    down: migration_20260820_120000_contact_locations.down,
    name: '20260820_120000_contact_locations',
  },
  {
    up: migration_20260820_130000_footer_company_blurb.up,
    down: migration_20260820_130000_footer_company_blurb.down,
    name: '20260820_130000_footer_company_blurb',
  },
];
