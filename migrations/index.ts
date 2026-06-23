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
    name: '20260623_085425_nav_dropdown_children'
  },
  {
    up: migration_20260623_120000_syllabus_notice.up,
    down: migration_20260623_120000_syllabus_notice.down,
    name: '20260623_120000_syllabus_notice'
  },
  {
    up: migration_20260623_130000_home_curriculum_notice.up,
    down: migration_20260623_130000_home_curriculum_notice.down,
    name: '20260623_130000_home_curriculum_notice'
  },
];
