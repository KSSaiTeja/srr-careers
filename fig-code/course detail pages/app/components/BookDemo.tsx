import { Phone, Mail } from 'lucide-react';
import imgImage6 from "../../imports/SapFicoCourseDetailPageDesignDraft/40a8bb4851f0f5d22c898f6e88f418171d5e1dd7.png";

export function BookDemo() {
  return (
    <section className="py-[64px] px-[112px] max-w-[1440px] mx-auto">
      <div
        className="relative overflow-hidden px-[48px] py-[95.5px] rounded-[40px] shadow-[0px_20px_60px_-20px_rgba(55,30,203,0.35)] max-w-[1152px] mx-auto"
        style={{ backgroundImage: "linear-gradient(139.926deg, rgb(8, 63, 136) 0%, rgb(0, 25, 59) 100%)" }}
      >
        {/* Background Blur Effect */}
        <div
          className="absolute -bottom-[80px] -left-[80px] w-[288px] h-[288px] rounded-full bg-[rgba(255,255,255,0.1)] blur-[32px]"
        />

        {/* Left Content */}
        <div className="relative z-10 flex flex-col gap-[17.992px] w-[439px]">
          {/* Badge */}
          <div className="backdrop-blur-[3.598px] bg-[rgba(255,255,255,0.1)] border-[0.9px] border-[rgba(255,255,255,0.2)] px-[15.293px] py-[6.298px] rounded-full w-fit">
            <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[10.795px] text-[#f7f8fc] tracking-[0.5398px] uppercase leading-[14.393px]">
              LIMITED SEATS — NEXT BATCH
            </p>
          </div>

          {/* Heading */}
          <div className="font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold text-[43.18px] text-[#f7f8fc] tracking-[-0.8636px] leading-[53.975px]">
            <p className="mb-0">Book your free SAP</p>
            <p>S/4 HANA FICO Live Demo</p>
          </div>

          {/* Description */}
          <p className="font-['Inter:Regular',sans-serif] font-normal text-[16.193px] text-white leading-[25.189px]">
            Interact live with SAP industry experts. Get the complete roadmap and syllabus. 100% free — no credit card.
          </p>

          {/* CTA Buttons */}
          <div className="flex gap-[14.393px] pt-[10.795px]">
            <button className="bg-white shadow-[0px_3.598px_17.992px_-7.197px_rgba(55,30,203,0.12)] flex items-center gap-[7.197px] px-[21.59px] py-[10.795px] rounded-full hover:bg-[#f5f5f5] transition-colors">
              <Phone className="w-[14.393px] h-[14.393px] text-[#371ecb]" />
              <span className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[12.594px] text-[#371ecb] leading-[17.992px]">
                80913 45674
              </span>
            </button>

            <button className="border-[0.9px] border-[rgba(255,255,255,0.3)] flex items-center gap-[7.197px] px-[22.49px] py-[11.695px] rounded-full hover:bg-[rgba(255,255,255,0.1)] transition-colors">
              <Mail className="w-[14.393px] h-[14.393px] text-[#f7f8fc]" />
              <span className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[12.594px] text-[#f7f8fc] leading-[17.992px]">
                Email us
              </span>
            </button>
          </div>
        </div>

        {/* Right Image */}
        <div className="absolute top-1/2 -translate-y-1/2 left-[648px] w-[456px] h-[417px] rounded-[31px] overflow-hidden">
          <img
            alt="SAP FICO Demo Preview"
            className="absolute h-[107.91%] left-[-1.18%] max-w-none top-[-5.04%] w-[102.57%]"
            src={imgImage6}
          />
        </div>
      </div>
    </section>
  );
}
