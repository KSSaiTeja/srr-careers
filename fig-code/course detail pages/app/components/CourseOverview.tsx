import { Command, Layers } from 'lucide-react';

export function CourseOverview() {
  return (
    <section className="py-[64px] px-[112px] max-w-[1440px] mx-auto">
      <div className="flex gap-[102px] items-end">
        {/* Left Content */}
        <div className="flex flex-col gap-[32px] w-[707px]">
          <div className="flex flex-col gap-[32px]">
            <div className="font-['DM_Serif_Text:Regular',sans-serif] text-[76.87px] leading-[80.7699966430664%]">
              <p className="mb-0 text-black">SAP FICO</p>
              <p className="font-['DM_Serif_Text:Italic',sans-serif] italic text-[#083f88]">Consultant Track</p>
            </div>
            <p className="font-['Geist:Medium',sans-serif] font-medium text-[24px] text-black leading-[1.45]">
              The complete consultant program. Configure SAP FICO from the ground up - organizational structure, GL, AR, AP, Asset Accounting, Taxation (GST & TDS) and full Controlling (CO) including COPA. Built for those targeting implementation, support and consulting roles.
            </p>
          </div>
          <div className="flex gap-[31px] items-center">
            <button className="bg-[#083f88] px-[16px] py-[12px] rounded-[16px] font-['Geist:Regular',sans-serif] font-normal text-[20px] text-white leading-[1.45] hover:bg-[#0a4a9e] transition-colors">
              Book a Free Demo
            </button>
            <button className="bg-[rgba(255,255,255,0.1)] border border-[#083f88] px-[16px] py-[12px] rounded-[16px] font-['Geist:Regular',sans-serif] font-normal text-[20px] text-[#083f88] leading-[1.45] hover:bg-[rgba(8,63,136,0.05)] transition-colors">
              Explore Curriculum
            </button>
          </div>
        </div>

        {/* Right Card - 11 Modules */}
        <div
          className="flex flex-col gap-[10px] h-[259px] p-[16px] rounded-[16px] w-[392px] border border-[#eaeaea]"
          style={{ backgroundImage: "linear-gradient(123.066deg, rgb(8, 63, 136) 0%, rgb(0, 26, 60) 97.528%)" }}
        >
          <div className="h-[96px]" />
          <div className="h-[99px] w-[180px] relative">
            <div className="flex items-baseline gap-2">
              <p className="font-['Inter:Bold',sans-serif] font-bold text-[82px] text-[#ffc31a] leading-[normal]">11</p>
              <p className="font-['Geist:SemiBold',sans-serif] font-semibold text-[24px] text-white leading-[1.45]">Modules</p>
            </div>
          </div>
          <p className="font-['Geist:Regular',sans-serif] font-normal text-[20px] text-[#e3e3e3] leading-[1.45]">
            Mapped to real implementation deliverables. Every concept ends in a working SAP transaction.
          </p>
        </div>
      </div>

      {/* Course Details Cards */}
      <div className="flex gap-[20px] mt-[64px]">
        <div className="bg-white flex flex-col gap-[12px] pl-[16px] pr-[32px] py-[13px] rounded-[12px] w-[289px] border border-[#eaeaea]">
          <div className="flex gap-[4px] items-center">
            <Command className="w-[18px] h-[18px] text-[#083f88]" />
            <p className="font-['Geist:Regular',sans-serif] font-normal text-[16px] text-[#083f88] tracking-[2px] uppercase leading-[normal]">
              Duration
            </p>
          </div>
          <div className="flex gap-[4px] items-center text-black">
            <p className="font-['Geist:SemiBold',sans-serif] font-semibold text-[20px] uppercase leading-[normal]">S/4 Hana</p>
            <p className="font-['Geist:Medium',sans-serif] font-medium text-[10px] uppercase leading-[normal]">•</p>
            <p className="font-['Geist:SemiBold',sans-serif] font-semibold text-[20px] leading-[normal]">Live</p>
          </div>
        </div>

        <div className="bg-white flex flex-col gap-[12px] pl-[16px] pr-[32px] py-[13px] rounded-[12px] w-[289px] border border-[#eaeaea]">
          <div className="flex gap-[4px] items-center">
            <Layers className="w-[18px] h-[18px] text-[#083f88]" />
            <p className="font-['Geist:Regular',sans-serif] font-normal text-[16px] text-[#083f88] tracking-[2px] uppercase leading-[normal]">
              Modules
            </p>
          </div>
          <p className="font-['Geist:SemiBold',sans-serif] font-semibold text-[20px] text-black leading-[normal]">
            11 Modules
          </p>
        </div>

        <div className="bg-white flex flex-col gap-[12px] pl-[16px] pr-[32px] py-[13px] rounded-[12px] w-[289px] border border-[#eaeaea]">
          <div className="flex gap-[4px] items-center">
            <Command className="w-[18px] h-[18px] text-[#083f88]" />
            <p className="font-['Geist:Regular',sans-serif] font-normal text-[16px] text-[#083f88] tracking-[2px] uppercase leading-[normal]">
              Format
            </p>
          </div>
          <div className="flex gap-[4px] items-center text-black">
            <p className="font-['Geist:SemiBold',sans-serif] font-semibold text-[20px] leading-[normal]">Live</p>
            <p className="font-['Geist:Medium',sans-serif] font-medium text-[10px] uppercase leading-[normal]">•</p>
            <p className="font-['Geist:SemiBold',sans-serif] font-semibold text-[20px] leading-[normal]">Mentored cohort</p>
          </div>
        </div>

        <div className="bg-white flex flex-col gap-[12px] pl-[16px] pr-[32px] py-[13px] rounded-[12px] w-[289px] border border-[#eaeaea]">
          <div className="flex gap-[4px] items-center">
            <Command className="w-[18px] h-[18px] text-[#083f88]" />
            <p className="font-['Geist:Regular',sans-serif] font-normal text-[16px] text-[#083f88] tracking-[2px] uppercase leading-[normal]">
              Outcome
            </p>
          </div>
          <p className="font-['Geist:SemiBold',sans-serif] font-semibold text-[20px] text-black leading-[normal]">
            Job-ready FICO Consultant
          </p>
        </div>
      </div>
    </section>
  );
}
