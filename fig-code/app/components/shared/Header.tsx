import { Link } from "react-router";
import imgFullMainLogoDark from "../../../imports/HomePageDesignDraft/98d53be6d5f35ce85ee43e2d08e5c5af9fe8ef27.png";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-white/20 border-b border-white/30">
      <div className="max-w-7xl mx-auto px-6 lg:px-28 py-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="relative w-12 h-12">
              <img
                alt="SRR Careers Logo"
                className="w-full h-full object-contain"
                src={imgFullMainLogoDark}
              />
            </div>
            <span className="text-2xl font-bold">SRR Careers</span>
          </Link>

          {/* Navigation */}
          <nav className="hidden lg:flex items-center gap-14 bg-white/10 px-10 py-4 rounded-full">
            <Link to="/" className="font-semibold text-gray-900 hover:text-blue-900 transition">
              Home
            </Link>
            <Link to="/our-story" className="font-semibold text-gray-900 hover:text-blue-900 transition">
              Our Story
            </Link>
            <a href="#courses" className="font-semibold text-gray-900 hover:text-blue-900 transition">
              Courses
            </a>
            <a href="#blog" className="font-semibold text-gray-900 hover:text-blue-900 transition">
              Blog
            </a>
            <div className="relative">
              <a href="#news" className="font-semibold text-gray-900 hover:text-blue-900 transition">
                What's New?
              </a>
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
  );
}
