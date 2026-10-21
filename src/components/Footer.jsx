'use client'
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Separator } from "@heroui/react";
import { 
  FaFacebookF, 
  FaInstagram, 
  FaWhatsapp, 
  FaLinkedinIn, 
  FaYoutube, 
  FaXTwitter 
} from "react-icons/fa6";
import { 
  HiOutlineMail, 
  HiOutlinePhone, 
  HiOutlineLocationMarker, 
  HiOutlinePaperAirplane 
} from "react-icons/hi";

const Footer = () => {
  const socialLinks = [
    {
      name: "Facebook",
      href: "https://www.facebook.com/ashik.rahman.322962",
      icon: FaFacebookF,
      hoverBg: "hover:bg-blue-600 hover:text-white",
    },
    {
      name: "Instagram",
      href: "https://instagram.com",
      icon: FaInstagram,
      hoverBg: "hover:bg-gradient-to-tr hover:from-amber-500 hover:via-rose-500 hover:to-purple-600 hover:text-white",
    },
    {
      name: "WhatsApp",
      href: "https://wa.me/+8801975665249",
      icon: FaWhatsapp,
      hoverBg: "hover:bg-emerald-500 hover:text-white",
    },
    {
      name: "LinkedIn",
      // https://www.linkedin.com/in/ashkrahman/
      href: "https://www.linkedin.com/in/ashkrahman/",
      icon: FaLinkedinIn,
      hoverBg: "hover:bg-sky-600 hover:text-white",
    },
    {
      name: "YouTube",
      href: "https://youtube.com",
      icon: FaYoutube,
      hoverBg: "hover:bg-red-600 hover:text-white",
    },
    {
      name: "X (Twitter)",
      href: "https://x.com/AshikurRahmJR",
      icon: FaXTwitter,
      hoverBg: "hover:bg-slate-900 dark:hover:bg-white dark:hover:text-black hover:text-white",
    },
  ];

  const quickLinks = [
    { label: "Find Turfs", href: "/facilities" },
    { label: "Book Slot", href: "/booking" },
    { label: "Pricing & Plans", href: "/pricing" },
    { label: "Owner Portal", href: "/partner" },
    { label: "About Us", href: "/about" },
  ];

  const legalLinks = [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Refund Policy", href: "/refund" },
    { label: "Support & FAQs", href: "/faq" },
  ];

  return (
    <footer className="relative bg-slate-900 text-slate-200 dark:bg-[#07090e] border-t border-slate-800 transition-colors duration-300 overflow-hidden">
      {/* Glow Accent Ambient Lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-gradient-to-r from-[#ec0000]/10 via-[#ec5300]/20 to-[#ecca00]/10 blur-3xl pointer-events-none" />

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 mb-12">
          
          {/* Column 1: Brand & Bio (4 cols) */}
          <div className="lg:col-span-4 space-y-4 text-left">
            <Link href="/" className="inline-flex items-center gap-3 group">
              <div className="relative w-10 h-10 overflow-hidden rounded-xl bg-gradient-to-br from-[#ec0000] to-[#ec5300] p-1 shadow-lg shadow-[#ec0000]/20">
                <Image
                  src="/khela-hobe.png"
                  alt="Khela Hobe Logo"
                  width={40}
                  height={40}
                  className="w-full h-full object-contain filter brightness-200"
                />
              </div>
              <span className="text-2xl font-black tracking-tight text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#ec0000] group-hover:to-[#ecca00] transition-all">
                khalahobe
              </span>
            </Link>

            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              The premier playground and sports turf booking platform. Play your favorite games without the booking hassle — instantly reserves turfs, venues & courts.
            </p>

            {/* Contact Details */}
            <div className="pt-2 space-y-2 text-xs text-slate-400">
              <p className="flex items-center gap-2">
                <HiOutlineLocationMarker className="text-base text-[#ec2400] shrink-0" />
                Dhaka, Bangladesh
              </p>
              <p className="flex items-center gap-2">
                <HiOutlineMail className="text-base text-[#ec2400] shrink-0" />
                support@khalahobe.com
              </p>
              <p className="flex items-center gap-2">
                <HiOutlinePhone className="text-base text-[#ec2400] shrink-0" />
                +880 1700-000000
              </p>
            </div>
          </div>

          {/* Column 2: Quick Links (2 cols) */}
          <div className="lg:col-span-2 text-left">
            <h3 className="text-sm font-bold uppercase tracking-wider text-white mb-4 border-l-2 border-[#ec0000] pl-2">
              Explore
            </h3>
            <ul className="space-y-2.5 text-sm">
              {quickLinks.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-slate-400 hover:text-white hover:translate-x-1 inline-block transition-all duration-200"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Legal & Support (2 cols) */}
          <div className="lg:col-span-2 text-left">
            <h3 className="text-sm font-bold uppercase tracking-wider text-white mb-4 border-l-2 border-[#ec5300] pl-2">
              Support
            </h3>
            <ul className="space-y-2.5 text-sm">
              {legalLinks.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-slate-400 hover:text-white hover:translate-x-1 inline-block transition-all duration-200"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Newsletter & Social Networks (4 cols) */}
          <div className="lg:col-span-4 text-left space-y-5">
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-white mb-2 border-l-2 border-[#ecca00] pl-2">
                Stay In The Game
              </h3>
              <p className="text-xs text-slate-400 mb-3">
                Subscribe for exclusive discount codes and ground availability alerts.
              </p>
              
              {/* Newsletter Input Box */}
              <form onSubmit={(e) => e.preventDefault()} className="flex items-center gap-2">
                <div className="relative flex-1">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full bg-slate-800/90 border border-slate-700/80 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#ec0000] transition-colors"
                  />
                </div>
                <button
                  type="submit"
                  className="px-4 py-2 bg-gradient-to-r from-[#ec0000] to-[#ec5300] hover:from-[#ec2400] hover:to-[#ecca00] text-white text-xs font-bold rounded-xl shadow-lg transition-all duration-200 shrink-0 flex items-center gap-1.5 active:scale-95"
                >
                  <span>Join</span>
                  <HiOutlinePaperAirplane className="text-xs rotate-45" />
                </button>
              </form>
            </div>

            {/* Social Icons Strip */}
            <div>
              <p className="text-xs font-semibold text-slate-300 mb-3">Connect with us</p>
              <div className="flex flex-wrap items-center gap-2">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.name}
                      className={`w-9 h-9 rounded-xl bg-slate-800 border border-slate-700/60 flex items-center justify-center text-slate-400 text-sm transition-all duration-300 hover:scale-110 ${social.hoverBg}`}
                    >
                      <Icon />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

        </div>

        {/* Separator Line */}
        <Separator className="bg-slate-800/80 my-8" />

        {/* Bottom Bar: Copyright & Badge */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Khela Hobe Inc. All rights reserved.</p>
          
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              All Systems Operational
            </span>
            <span>•</span>
            <span className="text-slate-400">
              Crafted with <span className="text-[#ec0000]">♥</span> for Sports Enthusiasts
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;