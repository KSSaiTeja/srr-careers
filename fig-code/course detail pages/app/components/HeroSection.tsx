import { ArrowUpRight } from 'lucide-react';

export function HeroSection() {
  return (
    <section className="pt-[140px] pb-[64px] px-[112px] max-w-[1440px] mx-auto">
      <div className="flex items-start justify-between gap-[102px]">
        {/* Left Content */}
        <div className="flex flex-col gap-[32px] w-[721px]">
          <div className="flex flex-col gap-[24px]">
            <div className="flex flex-col gap-[24px]">
              <p className="font-['Geist:Medium',sans-serif] font-medium text-[20px] text-[#083f88] tracking-[5px] uppercase leading-[16.5px]">
                Journey of SRR Careers
              </p>
              <div className="font-['Geist:SemiBold',sans-serif] font-semibold text-[48px] tracking-[-1.5px]">
                <p className="leading-[63px] mb-0 text-black">Skills at your own</p>
                <p className="leading-[63px] text-[#083f88]">pace & location</p>
              </div>
            </div>
            <p className="font-['Geist:Regular',sans-serif] font-normal text-[24px] text-black leading-[108.73500061035156%]">
              SRR Careers is purely dedicated to SAP FICO S/4 HANA online training. We design our curriculum for freshers, working individuals, and corporate teams - bridging theory with the real-time business decisions you'll make on the job.
            </p>
          </div>
          <button className="bg-[#083f88] flex gap-[8px] items-center px-[16px] py-[12px] rounded-[16px] hover:bg-[#0a4a9e] transition-colors w-fit">
            <span className="font-['Geist:Regular',sans-serif] font-normal text-[20px] text-white leading-[1.45]">
              Book a Free Demo Class
            </span>
            <ArrowUpRight className="w-[32px] h-[32px] text-white" />
          </button>
        </div>

        {/* Right Stats Cards */}
        <div className="flex flex-col gap-0 w-[495px]">
          <div className="flex gap-[28px]">
            <div className="bg-white flex flex-col gap-[12px] p-[24px] rounded-[16px] w-[238px] border border-[rgba(8,63,136,0.2)]">
              <p className="font-['Geist:Bold',sans-serif] font-bold text-[48px] text-[#083f88] leading-[1.414]">39%</p>
              <p className="font-['Geist:Regular',sans-serif] font-normal text-[24px] text-black leading-[1.414]">Faster Promotion</p>
            </div>
            <div className="bg-white flex flex-col gap-[12px] p-[24px] rounded-[16px] w-[239px] border border-[rgba(8,63,136,0.2)] mt-[40px]">
              <p className="font-['Geist:Bold',sans-serif] font-bold text-[48px] text-[#083f88] leading-[1.414]">41%</p>
              <p className="font-['Geist:Regular',sans-serif] font-normal text-[24px] text-black leading-[1.414]">Greater Career</p>
            </div>
          </div>
          <div className="flex gap-[28px] -mt-[24px]">
            <div className="bg-white flex flex-col gap-[12px] p-[24px] rounded-[16px] w-[228px] border border-[rgba(8,63,136,0.2)]">
              <p className="font-['Geist:Bold',sans-serif] font-bold text-[48px] text-[#083f88] leading-[1.414]">35%</p>
              <p className="font-['Geist:Regular',sans-serif] font-normal text-[24px] text-black leading-[1.414]">Problem Solving</p>
            </div>
            <div className="bg-white flex flex-col gap-[12px] p-[24px] rounded-[16px] w-[239px] border border-[rgba(8,63,136,0.2)] mt-[40px]">
              <p className="font-['Geist:Bold',sans-serif] font-bold text-[48px] text-[#083f88] leading-[1.414]">38%</p>
              <p className="font-['Geist:Regular',sans-serif] font-normal text-[24px] text-black leading-[1.414]">Service Level</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
