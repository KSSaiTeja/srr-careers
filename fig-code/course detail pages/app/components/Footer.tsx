import imgFullMainLogoDark from "../../imports/SapFicoCourseDetailPageDesignDraft/98d53be6d5f35ce85ee43e2d08e5c5af9fe8ef27.png";

export function Footer() {
  return (
    <footer className="bg-[rgba(244,243,255,0.4)] border-t border-[#e3e3f2] py-[57px] px-[112px]">
      <div className="max-w-[1280px] mx-auto">
        {/* Main Footer Content */}
        <div className="grid grid-cols-4 gap-x-[40px] gap-y-[40px] mb-[48px]">
          {/* Column 1 - Logo & Description */}
          <div className="flex flex-col gap-[16px]">
            <div className="flex gap-[5.821px] items-center">
              <div className="relative shrink-0 size-[35.656px]">
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  <img alt="SRR Careers Logo" className="absolute h-[177.34%] left-[-74.12%] max-w-none top-[-17.26%] w-[249.03%]" src={imgFullMainLogoDark} />
                </div>
              </div>
              <p className="font-['Inter:Bold',sans-serif] font-bold text-[19.89px] text-black">SRR Careers</p>
            </div>
            <p className="font-['Inter:Regular',sans-serif] font-normal text-[14px] text-[#5a637b] leading-[20px] max-w-[320px]">
              A dedicated finishing school for SAP S/4 HANA FICO consultants. Live mentors, real client scenarios, lifetime career support.
            </p>
          </div>

          {/* Column 2 - Explore */}
          <div className="flex flex-col gap-[20px]">
            <p className="font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold text-[14px] text-[#0b1023] tracking-[-0.28px] leading-[20px]">
              Explore
            </p>
            <div className="flex flex-col gap-[10px]">
              <a href="#" className="font-['Inter:Regular',sans-serif] font-normal text-[14px] text-[#5a637b] leading-[20px] hover:text-[#083f88] transition-colors">
                Home
              </a>
              <a href="#" className="font-['Inter:Regular',sans-serif] font-normal text-[14px] text-[#5a637b] leading-[20px] hover:text-[#083f88] transition-colors">
                About
              </a>
              <a href="#" className="font-['Inter:Regular',sans-serif] font-normal text-[14px] text-[#5a637b] leading-[20px] hover:text-[#083f88] transition-colors">
                Course
              </a>
              <a href="#" className="font-['Inter:Regular',sans-serif] font-normal text-[14px] text-[#5a637b] leading-[20px] hover:text-[#083f88] transition-colors">
                Blog
              </a>
              <a href="#" className="font-['Inter:Regular',sans-serif] font-normal text-[14px] text-[#5a637b] leading-[20px] hover:text-[#083f88] transition-colors">
                Contact
              </a>
            </div>
          </div>

          {/* Column 3 - Course */}
          <div className="flex flex-col gap-[20px]">
            <p className="font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold text-[14px] text-[#0b1023] tracking-[-0.28px] leading-[20px]">
              Course
            </p>
            <div className="flex flex-col gap-[10px]">
              <a href="#" className="font-['Inter:Regular',sans-serif] font-normal text-[14px] text-[#5a637b] leading-[20px] hover:text-[#083f88] transition-colors">
                S/4 HANA FICO
              </a>
              <a href="#" className="font-['Inter:Regular',sans-serif] font-normal text-[14px] text-[#5a637b] leading-[20px] hover:text-[#083f88] transition-colors">
                Certification Prep
              </a>
              <a href="#" className="font-['Inter:Regular',sans-serif] font-normal text-[14px] text-[#5a637b] leading-[20px] hover:text-[#083f88] transition-colors">
                Book Live Demo
              </a>
            </div>
          </div>

          {/* Column 4 - Contact */}
          <div className="flex flex-col gap-[20px]">
            <p className="font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold text-[14px] text-[#0b1023] tracking-[-0.28px] leading-[20px]">
              Contact
            </p>
            <div className="flex flex-col gap-[10px]">
              <a href="tel:+918091345674" className="font-['Inter:Regular',sans-serif] font-normal text-[14px] text-[#5a637b] leading-[20px] hover:text-[#083f88] transition-colors">
                +91 80913 45674
              </a>
              <a href="mailto:kumar@moriyaedu.com" className="font-['Inter:Regular',sans-serif] font-normal text-[14px] text-[#5a637b] leading-[20px] hover:text-[#083f88] transition-colors">
                kumar@moriyaedu.com
              </a>
              <a href="#whatsapp" className="font-['Inter:Regular',sans-serif] font-normal text-[14px] text-[#5a637b] leading-[20px] hover:text-[#083f88] transition-colors">
                WhatsApp us
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-[#e3e3f2] pt-[25px] flex items-center justify-between">
          <p className="font-['Inter:Regular',sans-serif] font-normal text-[12px] text-[#5a637b] leading-[16px]">
            © 2026 SRR Careers. All rights reserved.
          </p>
          <p className="font-['Inter:Regular',sans-serif] font-normal text-[12px] text-[#5a637b] leading-[16px]">
            Crafted with care for future SAP consultants.
          </p>
        </div>
      </div>
    </footer>
  );
}
