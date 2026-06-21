import config from "@payload-config";
import { getPayload } from "payload";
import { seedBlogPage } from "@/payload/seed/seed-blog-page";
import { seedBlogPosts } from "@/payload/seed/seed-blog-posts";
import { seedCourseDetails } from "@/payload/seed/seed-course-details";
import { seedCoursesPage } from "@/payload/seed/seed-courses-page";
import { seedHomePage } from "@/payload/seed/seed-home-page";
import { seedOurStoryPage } from "@/payload/seed/seed-our-story-page";
import { seedSiteSettings } from "@/payload/seed/seed-site-settings";
import { seedWhatsNewPage } from "@/payload/seed/seed-whats-new-page";

const payload = await getPayload({ config });

await seedSiteSettings(payload);
await seedHomePage(payload);
await seedCoursesPage(payload);
await seedOurStoryPage(payload);
await seedCourseDetails(payload);
await seedWhatsNewPage(payload);
await seedBlogPage(payload);
await seedBlogPosts(payload);

payload.logger.info("CMS seed script finished.");
process.exit(0);
