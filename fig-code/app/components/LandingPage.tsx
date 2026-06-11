import { Link } from "react-router";
import svgPaths from "../../imports/HomePageDesignDraft/svg-hhm9qm0dke";
import imgFullMainLogoDark from "../../imports/HomePageDesignDraft/98d53be6d5f35ce85ee43e2d08e5c5af9fe8ef27.png";
import imgHeroImage from "../../imports/HomePageDesignDraft/9b8a2cbf0cbd293e7764ab649d902ee79cc5de1d.png";
import imgInstructorImage from "../../imports/HomePageDesignDraft/7a560bff0e9bdb7d8a447996c9d2ffc845e9c6e4.png";
import imgDemoImage from "../../imports/HomePageDesignDraft/40a8bb4851f0f5d22c898f6e88f418171d5e1dd7.png";
import MissionSection from "./MissionSection";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Background Gradient */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <svg className="absolute -left-32 -top-20 w-full h-auto" fill="none" preserveAspectRatio="none" viewBox="0 0 2342.8 1782.8">
          <g filter="url(#filter0_f)">
            <path d={svgPaths.p29ec0500} fill="#F3EFFB" />
          </g>
          <g filter="url(#filter1_f)">
            <path d={svgPaths.p38390500} fill="#FEF5E2" />
          </g>
          <defs>
            <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="989.8" id="filter0_f" width="1576.8" x="766" y="793">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
              <feGaussianBlur result="effect1_foregroundBlur" stdDeviation="128.95" />
            </filter>
            <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="1243.8" id="filter1_f" width="1673.8" x="0" y="0">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
              <feGaussianBlur result="effect1_foregroundBlur" stdDeviation="128.95" />
            </filter>
          </defs>
        </svg>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-white/20 border-b border-white/30">
        <div className="max-w-7xl mx-auto px-6 lg:px-28 py-6">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="relative w-12 h-12">
                <img alt="SRR Careers Logo" className="w-full h-full object-contain" src={imgFullMainLogoDark} />
              </div>
              <span className="text-2xl font-bold">SRR Careers</span>
            </div>

            {/* Navigation */}
            <nav className="hidden lg:flex items-center gap-14 bg-white/10 px-10 py-4 rounded-full">
              <Link to="/" className="font-semibold text-blue-900">Home</Link>
              <Link to="/our-story" className="font-semibold text-gray-900 hover:text-blue-900 transition">Our Story</Link>
              <Link to="/courses" className="font-semibold text-gray-900 hover:text-blue-900 transition">Courses</Link>
              <a href="#blog" className="font-semibold text-gray-900 hover:text-blue-900 transition">Blog</a>
              <div className="relative">
                <Link to="/whats-new" className="font-semibold text-gray-900 hover:text-blue-900 transition">What's New?</Link>
                <div className="absolute -top-1 -right-2 w-2 h-2 bg-red-600 rounded-full"></div>
              </div>
            </nav>

            {/* CTA Button */}
            <button className="bg-[#ffd549] hover:bg-[#ffc519] px-6 py-4 rounded-full font-semibold transition">
              Book a Demo
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className="relative overflow-visible">
        {/* Content Container - Centered */}
        <div className="flex flex-col items-center">
          {/* Badge */}
          <div className="bg-[#fff3da] border border-[#ffd549] px-6 py-2.5 rounded-[44px] inline-flex mt-8 mb-8">
            <span className="font-semibold text-[#7c5f00] text-base tracking-[2.56px]" style={{ fontFeatureSettings: "'cv01', 'cv03', 'cv04'" }}>
              #1 SAP FICO TRAINING INSTITUTE
            </span>
          </div>

          {/* Hero Title */}
          <div className="relative text-center mb-8">
            <h1 className="text-5xl sm:text-6xl lg:text-[76.87px] leading-[1.45] mb-0" style={{ fontFamily: "'DM Serif Text', serif" }}>
              Master SAP FICO with
            </h1>
            <div className="relative inline-block">
              <h1 className="italic text-5xl sm:text-6xl lg:text-[76.87px] leading-[1.45] text-[#083f88]" style={{ fontFamily: "'DM Serif Text', serif" }}>
                S4 HANA
              </h1>
              {/* Yellow underline decoration - positioned below the text */}
              <div className="absolute left-1/2 -translate-x-1/2 w-[320px] h-[11px] -bottom-2">
                <svg className="w-full h-full" fill="none" preserveAspectRatio="none" viewBox="0 0 320.425 16.786">
                  <path d={svgPaths.p7dc7a80} fill="#FFD549" />
                </svg>
              </div>
            </div>
          </div>

          {/* Hero CTAs - Above Image */}
          <div className="flex flex-wrap justify-center gap-8 mb-12 relative z-10">
            <button className="bg-[#083f88] hover:bg-[#062f6a] text-white px-6 py-3 rounded-2xl text-xl transition">
              Explore Curriculum
            </button>
            <button className="bg-white/10 backdrop-blur-sm border-2 border-[#083f88] text-[#083f88] hover:bg-[#083f88] hover:text-white px-6 py-3 rounded-2xl text-xl transition">
              Speak with an Expert
            </button>
          </div>
        </div>

        {/* Hero Image - Full Viewport Width with Gradient Mask */}
        <div className="relative w-screen -mx-[50vw] left-1/2 right-1/2">
          <div
            className="w-full aspect-[1672/641] relative overflow-hidden"
            style={{
              maskImage: `linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 40%, rgba(0,0,0,0.8) 70%, rgba(0,0,0,0) 100%)`,
              WebkitMaskImage: `linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 40%, rgba(0,0,0,0.8) 70%, rgba(0,0,0,0) 100%)`
            }}
          >
            <img
              alt="Students learning SAP FICO - Two students working on laptops"
              className="w-full h-full object-cover object-center"
              style={{
                transform: 'scale(1.5) translateY(-20%)',
                transformOrigin: 'center top'
              }}
              src={imgHeroImage}
            />
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-20 bg-white/50">
        <div className="max-w-7xl mx-auto px-6 lg:px-28">
          <div className="text-center mb-16">
            <p className="text-gray-500 text-5xl font-semibold mb-4">Does this relatable to your</p>
            <h2 className="text-5xl font-semibold text-[#083f88]">SAP FICO Journey?</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: svgPaths.p26938900, text: "Overwhelmed by complex SAP navigation and system processes?" },
              { icon: svgPaths.p1b6ba900, text: "Unsure how to configure key settings in SAP?" },
              { icon: svgPaths.p29ecad80, text: "Finding it difficult to apply theoretical knowledge" },
              { icon: svgPaths.pe376300, text: "Lacking confidence in your ability to troubleshoot SAP errors?" },
              { icon: svgPaths.p33616a00, text: "Missing hands-on experience with SAP project implementation?" },
              { icon: svgPaths.p1b6ba900, text: "Concerned about keeping up with the latest SAP updates" }
            ].map((item, index) => (
              <div key={index} className="flex flex-col items-center text-center gap-5 p-6 rounded-xl hover:shadow-lg transition">
                <div className="w-9 h-9">
                  <svg className="w-full h-full" fill="none" viewBox="0 0 32.26 32.26">
                    <path d={item.icon} stroke="#083F88" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2507" />
                  </svg>
                </div>
                <p className="text-base font-medium leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section - Exact Figma Implementation */}
      <MissionSection />

      {/* Instructor Section */}
      <section id="story" className="py-20 bg-white/50">
        <div className="max-w-7xl mx-auto px-6 lg:px-28">
          <div className="text-center mb-16">
            <p className="text-[#083f88] text-xl font-medium tracking-widest mb-6">ABOUT YOUR INSTRUCTOR</p>
            <h2 className="text-5xl font-semibold mb-2">Your personal guide to</h2>
            <h2 className="text-5xl font-semibold text-[#083f88]">SAP FICO Success</h2>
          </div>

          <div className="flex flex-col lg:flex-row items-start gap-12 max-w-5xl mx-auto">
            {/* Left Features */}
            <div className="flex flex-col gap-16">
              <div className="flex flex-col gap-5">
                <svg className="w-7 h-7" fill="none" viewBox="0 0 23.8738 26.2611">
                  <path d={svgPaths.p15fd8010} stroke="#6B7280" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.38737" />
                </svg>
                <h3 className="text-2xl font-bold text-gray-900">Accounting Expertise</h3>
                <p className="text-gray-600">Solid SAP FICO foundation.</p>
              </div>
              <div className="flex flex-col gap-5">
                <svg className="w-7 h-7" fill="none" viewBox="0 0 23.8738 26.2611">
                  <path d={svgPaths.p15fd8010} stroke="#6B7280" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.38737" />
                </svg>
                <h3 className="text-2xl font-bold text-gray-900">Finance Insights</h3>
                <p className="text-gray-600">Practical finance exposure.</p>
              </div>
            </div>

            {/* Center - Instructor Card */}
            <div className="bg-gradient-to-b from-gray-100 to-white border-2 border-white rounded-3xl p-6 shadow-lg flex-shrink-0 max-w-sm">
              <img alt="Instructor" className="w-full h-48 object-cover rounded-2xl mb-6" src={imgInstructorImage} />
              <div className="space-y-6">
                <div>
                  <h4 className="font-bold text-lg mb-2">My Journey:</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Meet Mr. Kumar, a highly experienced and passionate SAP FICO S/4HANA trainer associated with SRR Careers as a Full-Time Trainer, trained 250+ professionals across India, UAE, Qatar & Saudi.
                  </p>
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-2">Hands-on SAP Skills</h4>
                  <p className="text-gray-600 text-sm">Master SAP FICO with accounting and finance skills.</p>
                </div>
                <button className="bg-gray-600 hover:bg-gray-700 p-2 rounded-lg transition">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 21.388 20.4158">
                    <path d={svgPaths.p3d4ce700} stroke="#F9FAFB" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.94437" />
                    <path d={svgPaths.p33f36700} stroke="#F9FAFB" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.94437" />
                    <path d={svgPaths.p63afcc0} stroke="#F9FAFB" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.94437" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Right Features */}
            <div className="flex flex-col gap-16">
              <div className="flex flex-col gap-5">
                <svg className="w-7 h-7" fill="none" viewBox="0 0 23.8738 26.2611">
                  <path d={svgPaths.p15fd8010} stroke="#6B7280" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.38737" />
                </svg>
                <h3 className="text-2xl font-bold text-gray-900">In-depth Knowledge</h3>
                <p className="text-gray-600">Deep subject insights.</p>
              </div>
              <div className="flex flex-col gap-5">
                <svg className="w-7 h-7" fill="none" viewBox="0 0 23.8738 26.2611">
                  <path d={svgPaths.p15fd8010} stroke="#6B7280" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.38737" />
                </svg>
                <h3 className="text-2xl font-bold text-gray-900">Quality Training</h3>
                <p className="text-gray-600">Commitment to top-notch training.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Curriculum Section */}
      <section id="courses" className="py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-28">
          <div className="text-center mb-16">
            <p className="text-[#083f88] text-xl font-medium tracking-widest mb-6">CURRICULUM</p>
            <h2 className="text-5xl font-semibold mb-2">A nine-module journey</h2>
            <h2 className="text-5xl font-semibold">
              to becoming a <span className="text-[#083f88]">S/4 HANA</span> consultant
            </h2>
          </div>

          <div className="space-y-0">
            {[
              { num: "01", title: "SAP & ERP Fundamentals", desc: "Core concepts, navigation, and the SAP landscape." },
              { num: "02", title: "Organizational Structure", desc: "Company codes, business areas, and chart of accounts." },
              { num: "03", title: "Financial Accounting (FI)", desc: "General ledger, journal entries, and reporting." },
              { num: "04", title: "Accounts Payable (AP)", desc: "Vendor master, invoices, and payment processing." },
              { num: "05", title: "Accounts Receivable (AR)", desc: "Customer master, billing, and collections." },
              { num: "06", title: "Asset Accounting (AA)", desc: "Asset lifecycle, depreciation, and reporting." },
              { num: "07", title: "Controlling (CO)", desc: "Cost centers, profit centers, and internal orders." },
              { num: "08", title: "Integration MM / SD / HR", desc: "End-to-end cross-module business flows." },
              { num: "09", title: "Real-Time Scenarios", desc: "Hands-on projects mirroring live SAP environments." }
            ].map((module, index) => (
              <div key={index} className="grid grid-cols-[80px_1fr] gap-10 py-5 border-b border-gray-200">
                <div className="text-gray-500 font-bold text-xs tracking-wider">{module.num}</div>
                <div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-2">{module.title}</h3>
                  <p className="text-gray-600">{module.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 bg-white border border-gray-200 rounded-3xl p-8 flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm tracking-widest mb-2">FULL SYLLABUS</p>
              <h3 className="text-2xl font-bold">See every topic, every project, every outcome.</h3>
            </div>
            <button className="bg-[#083f88] hover:bg-[#062f6a] text-white px-6 py-3.5 rounded-2xl font-semibold flex items-center gap-2 transition">
              View course detail
              <svg className="w-5 h-4" fill="none" viewBox="0 0 20 16">
                <path d={svgPaths.p2dbb6bc0} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                <path d={svgPaths.pfcbae00} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white/50">
        <div className="max-w-7xl mx-auto px-6 lg:px-28">
          <div className="text-center mb-16">
            <p className="text-[#083f88] text-xl font-medium tracking-widest mb-6">TESTIMONIALS</p>
            <h2 className="text-5xl font-semibold mb-2">Stories from our</h2>
            <h2 className="text-5xl font-semibold text-[#083f88]">satisfied students</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: "Rahul S.", role: "SAP FICO Consultant", initials: "RS", quote: "SRR Careers gave me a rock-solid foundation in FICO. The integration with MM and SD modules clicked for me only because of how Kumar sir teaches with live data." },
              { name: "Sneha R.", role: "Finance Manager", initials: "SR", quote: "Within 3 months I switched from core accounting to an SAP consultant role. The placement team genuinely fought for me until I landed the offer." },
              { name: "Ananya P.", role: "S/4 HANA Analyst", initials: "AP", quote: "Cost center accounting and product costing felt intimidating — until I saw the real client scenarios SRR walks you through. Precise, practical, career-changing." }
            ].map((testimonial, index) => (
              <div key={index} className="bg-white border border-gray-200/60 rounded-3xl p-8 shadow-sm hover:shadow-md transition relative">
                <div className="absolute top-6 right-6 w-10 h-10 opacity-10">
                  <svg fill="none" viewBox="0 0 40 40">
                    <path d={svgPaths.pd890480} stroke="#371ECB" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.33333" />
                    <path d={svgPaths.p10272e00} stroke="#371ECB" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.33333" />
                  </svg>
                </div>

                <div className="flex gap-1 mb-5">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-4 h-4" fill="none" viewBox="0 0 16 16">
                      <path d={svgPaths.p31f67000} fill="#FFC31A" stroke="#FFC31A" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                    </svg>
                  ))}
                </div>

                <p className="text-gray-700 leading-relaxed mb-6">{testimonial.quote}</p>

                <div className="pt-6 border-t border-gray-200 flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#371ECB] to-[#6D49F4] flex items-center justify-center">
                    <span className="text-white font-bold text-sm">{testimonial.initials}</span>
                  </div>
                  <div>
                    <p className="font-semibold text-sm">{testimonial.name}</p>
                    <p className="text-gray-600 text-xs">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="bg-gradient-to-br from-[#083f88] to-[#00193b] rounded-[40px] p-12 lg:p-24 relative overflow-hidden shadow-2xl">
            <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-white/10 rounded-full blur-3xl"></div>

            <div className="relative z-10 max-w-md">
              <div className="inline-block bg-white/10 border border-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
                <span className="text-white text-xs font-semibold tracking-widest">LIMITED SEATS — NEXT BATCH</span>
              </div>

              <h2 className="text-white text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                Book your free SAP<br />S/4 HANA FICO Live Demo
              </h2>

              <p className="text-white/90 mb-8 leading-relaxed">
                Interact live with SAP industry experts. Get the complete roadmap and syllabus. 100% free — no credit card.
              </p>

              <div className="flex flex-wrap gap-4 mt-10">
                <button className="bg-white hover:bg-gray-100 text-[#371ecb] px-6 py-3 rounded-full font-semibold flex items-center gap-2 shadow-lg transition">
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 14.3934 14.3934">
                    <path d={svgPaths.p11694a00} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.19945" />
                  </svg>
                  80913 45674
                </button>
                <button className="border border-white/30 hover:bg-white/10 text-white px-6 py-3 rounded-full font-semibold flex items-center gap-2 transition">
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 14.3934 14.3934">
                    <path d={svgPaths.p35601c80} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.19945" />
                    <path d={svgPaths.p29a84240} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.19945" />
                  </svg>
                  Email us
                </button>
              </div>
            </div>

            <div className="absolute bottom-0 right-0 w-[460px] h-[420px] hidden lg:block">
              <img alt="Demo preview" className="w-full h-full object-cover rounded-[31px]" src={imgDemoImage} />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#f4f3ff]/40 border-t border-gray-200 py-14">
        <div className="max-w-7xl mx-auto px-6 lg:px-28">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
            {/* Company Info */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="relative w-9 h-9">
                  <img alt="SRR Careers Logo" className="w-full h-full object-contain" src={imgFullMainLogoDark} />
                </div>
                <span className="text-xl font-bold">SRR Careers</span>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">
                A dedicated finishing school for SAP S/4 HANA FICO consultants. Live mentors, real client scenarios, lifetime career support.
              </p>
            </div>

            {/* Explore */}
            <div>
              <h3 className="font-bold text-sm mb-5">Explore</h3>
              <ul className="space-y-2.5 text-sm text-gray-600">
                <li><Link to="/" className="hover:text-gray-900">Home</Link></li>
                <li><Link to="/our-story" className="hover:text-gray-900">About</Link></li>
                <li><Link to="/courses" className="hover:text-gray-900">Courses</Link></li>
                <li><a href="#blog" className="hover:text-gray-900">Blog</a></li>
                <li><a href="#contact" className="hover:text-gray-900">Contact</a></li>
              </ul>
            </div>

            {/* Course */}
            <div>
              <h3 className="font-bold text-sm mb-5">Course</h3>
              <ul className="space-y-2.5 text-sm text-gray-600">
                <li><Link to="/courses" className="hover:text-gray-900">S/4 HANA FICO</Link></li>
              </ul>
            </div>

            {/* Social */}
            <div>
              <h3 className="font-bold text-sm mb-5">Social</h3>
              <ul className="space-y-2.5 text-sm text-gray-600">
                <li><a href="#linkedin" className="hover:text-gray-900">LinkedIn</a></li>
                <li><a href="#twitter" className="hover:text-gray-900">Twitter</a></li>
                <li><a href="#facebook" className="hover:text-gray-900">Facebook</a></li>
              </ul>
            </div>
          </div>

          <div className="pt-6 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4 text-gray-600 text-xs">
            <p>© 2026 SRR Careers. All rights reserved.</p>
            <p>Crafted with care for future SAP consultants.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
