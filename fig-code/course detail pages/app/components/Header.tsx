import imgFullMainLogoDark from "../../imports/SapFicoCourseDetailPageDesignDraft/98d53be6d5f35ce85ee43e2d08e5c5af9fe8ef27.png";

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-[25px] bg-[rgba(255,255,255,0.2)]">
      <div className="max-w-[1440px] mx-auto px-[112px] py-[24px]">
        <div className="flex items-center justify-between w-full">
          {/* Logo */}
          <div className="flex gap-[8px] items-center">
            <div className="relative shrink-0 size-[49px]">
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <img alt="SRR Careers Logo" className="absolute h-[177.34%] left-[-74.12%] max-w-none top-[-17.26%] w-[249.03%]" src={imgFullMainLogoDark} />
              </div>
            </div>
            <p className="font-['Inter:Bold',sans-serif] font-bold text-[27.333px] text-black whitespace-nowrap">SRR Careers</p>
          </div>

          {/* Navigation Links */}
          <nav className="flex gap-[56px] items-center px-[40px] py-[16px] rounded-[40px]">
            <a href="#" className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[16px] text-[#101928] hover:text-[#083f88] transition-colors">Home</a>
            <a href="#" className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[16px] text-[#101928] hover:text-[#083f88] transition-colors">Our Story</a>
            <a href="#" className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[16px] text-[#101928] hover:text-[#083f88] transition-colors">Courses</a>
            <a href="#" className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[16px] text-[#101928] hover:text-[#083f88] transition-colors">Blog</a>
            <div className="relative">
              <a href="#" className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[16px] text-[#101928] hover:text-[#083f88] transition-colors">What's New?</a>
              <div className="absolute -right-2 top-0 size-[8px]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8 8">
                  <circle cx="4" cy="4" fill="#D42620" r="4" />
                </svg>
              </div>
            </div>
          </nav>

          {/* CTA Button */}
          <div className="flex gap-[24px] items-center">
            <button className="bg-[#ffd549] px-[24px] py-[16px] rounded-[40px] font-['Inter:Semi_Bold',sans-serif] font-semibold text-[16px] text-black hover:bg-[#ffdd60] transition-colors">
              Book a Demo
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
