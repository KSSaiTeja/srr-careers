import { ArrowRight } from 'lucide-react';

export function CTASection() {
  return (
    <section className="py-[64px] px-[112px] max-w-[1440px] mx-auto">
      <div
        className="h-[385px] overflow-hidden rounded-[40px] relative"
        style={{ backgroundImage: "linear-gradient(73.7005deg, rgb(8, 63, 136) 0%, rgb(0, 0, 0) 100%)" }}
      >
        <div className="relative h-full flex flex-col items-center justify-center px-[112px]">
          <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[16px] text-white tracking-[4px] leading-[20px] mb-8">
            NEXT BATCH STARTS SOON
          </p>

          <div className="mb-6">
            <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[48px] text-white leading-[64px]">
              Limited Seats.
            </p>
            <p className="font-['Inter:Semi_Bold_Italic',sans-serif] italic font-semibold text-[48px] text-[#ffc31a] leading-[64px]">
              Reserve yours.
            </p>
          </div>

          <p className="font-['Inter:Medium',sans-serif] font-medium text-[20px] text-[#d8d8d8] text-center leading-[normal] mb-8 max-w-[800px]">
            Book a free live demo of the course - no card, no commitment. Meet your mentor and walk through the curriculum.
          </p>

          <button className="bg-[#ffc31a] flex items-center gap-[8px] px-[24px] py-[14px] rounded-[16px] hover:bg-[#ffce4d] transition-colors">
            <span className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[16px] text-black leading-[20px]">
              Explore Course Details
            </span>
            <ArrowRight className="w-[20px] h-[16px] text-black" />
          </button>
        </div>
      </div>
    </section>
  );
}
