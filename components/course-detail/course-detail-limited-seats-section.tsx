import { CourseDetailSection } from "@/components/course-detail/course-detail-section";
import { EnrollButton } from "@/components/checkout/enroll-button";
import { formatINR } from "@/lib/payment/format";
import type { CourseDetailContent } from "@/lib/constants/course-detail-content";
import type { CheckoutProduct } from "@/lib/payment/types";

type CourseDetailLimitedSeatsSectionProps = {
  content: CourseDetailContent["limitedSeatsCta"];
  product: CheckoutProduct;
};

export function CourseDetailLimitedSeatsSection({
  content,
  product,
}: CourseDetailLimitedSeatsSectionProps) {
  return (
    <CourseDetailSection className="py-12 sm:py-16">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-navy to-black px-5 py-12 sm:rounded-[40px] sm:px-10 sm:py-16 md:px-12 md:py-20">
        <div className="relative mx-auto flex max-w-[800px] flex-col items-center text-center">
          <p className="mb-8 break-words text-center text-sm font-semibold uppercase tracking-[2px] text-white sm:text-base sm:tracking-[4px]">
            {content.eyebrow}
          </p>
          <div className="mb-6">
            <p className="text-3xl font-semibold leading-tight text-white sm:text-4xl md:text-[48px] md:leading-[64px]">
              {content.titleLine1}
            </p>
            <p className="text-3xl font-semibold italic leading-tight text-brand-gold sm:text-4xl md:text-[48px] md:leading-[64px]">
              {content.titleLine2}
            </p>
          </div>
          <p className="mb-8 max-w-[800px] break-words px-2 text-lg font-medium text-[#d8d8d8] sm:px-0 sm:text-xl">
            {content.description}
          </p>
          <EnrollButton
            product={product}
            label={`${content.ctaLabel} · ${formatINR(product.amount)}`}
            tone="gold"
          />
        </div>
      </div>
    </CourseDetailSection>
  );
}
