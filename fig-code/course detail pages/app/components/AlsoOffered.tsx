import { ArrowRight } from 'lucide-react';

export function AlsoOffered() {
  return (
    <section className="py-[64px] px-[112px] max-w-[1440px] mx-auto">
      <div className="bg-white border border-[#e3e3f2] rounded-[30px] p-[33px] flex items-center justify-between">
        <div className="flex flex-col gap-[10px]">
          <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[16px] text-[#5a637b] tracking-[1.98px] uppercase leading-[16.5px]">
            Also offered
          </p>
          <p className="font-['Inter:Bold',sans-serif] font-bold text-[24px] text-[#0b1023] tracking-[-0.48px] leading-[32px]">
            SAP FICO - End User Track
          </p>
        </div>

        <button className="bg-[#083f88] flex items-center gap-[8px] px-[24px] py-[14px] rounded-[16px] hover:bg-[#0a4a9e] transition-colors">
          <span className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[16px] text-[#fdfdff] leading-[20px]">
            Explore Course Details
          </span>
          <ArrowRight className="w-[20px] h-[16px] text-[#FDFDFF]" />
        </button>
      </div>
    </section>
  );
}
