"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";
import { 
  HiOutlineMail, 
  HiOutlineLockClosed, 
  HiOutlineEye, 
  HiOutlineEyeOff 
} from "react-icons/hi";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";
import { StarFill } from "@gravity-ui/icons";

const LogInPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    const { email, password } = data;

    try {
      const { data: user, error } = await authClient.signIn.email({
        email,
        password,
        rememberMe: true,
        callbackURL: "/",
      });

      if (user) {
        toast.success("Welcome back! Login successful.");
      }
      if (error) {
        toast.error(`Login failed: ${error.message}`);
      }
    } catch (err) {
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "/",
    });
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-slate-50 dark:bg-[#07090e] p-4 md:p-8 transition-colors">
      {/* Main Split Container */}
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-12 rounded-3xl overflow-hidden shadow-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900/90 backdrop-blur-xl">
        
        {/* --- LEFT COLUMN: AUTH FORM --- */}
        <div className="lg:col-span-6 p-8 sm:p-12 md:p-16 flex flex-col justify-between">
          <div>
            {/* Logo & Brand Header */}
            <div className="flex items-center gap-3 mb-8">
              <div className="relative w-10 h-10 overflow-hidden rounded-xl bg-gradient-to-br from-[#ec0000] to-[#ec5300] p-1 shadow-md shadow-[#ec0000]/20">
                <Image
                  src="/khela-hobe.png"
                  alt="Khela Hobe Logo"
                  width={40}
                  height={40}
                  className="w-full h-full object-contain filter brightness-200"
                />
              </div>
              <span className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                khalahobe
              </span>
            </div>

            {/* Welcome Heading */}
            <div className="mb-8">
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                Welcome Back!
              </h1>
              <p className="mt-2 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                Sign in to access your dashboard and continue reserving your favorite sports turfs.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={onSubmit} className="space-y-5">
              {/* Email Input */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                  Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <HiOutlineMail className="text-lg" />
                  </div>
                  <input
                    required
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 rounded-xl text-xs sm:text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:border-[#ec0000] focus:ring-1 focus:ring-[#ec0000] transition-all"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <HiOutlineLockClosed className="text-lg" />
                  </div>
                  <input
                    required
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    className="w-full pl-10 pr-10 py-3 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 rounded-xl text-xs sm:text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:border-[#ec0000] focus:ring-1 focus:ring-[#ec0000] transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                  >
                    {showPassword ? (
                      <HiOutlineEyeOff className="text-lg" />
                    ) : (
                      <HiOutlineEye className="text-lg" />
                    )}
                  </button>
                </div>

                {/* Forgot Password Link */}
                <div className="flex justify-end pt-1">
                  <Link
                    href="/forgot-password"
                    className="text-xs font-semibold text-[#ec0000] hover:text-[#ec5300] hover:underline"
                  >
                    Forgot Password?
                  </Link>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 px-4 bg-gradient-to-r from-[#ec0000] via-[#ec2400] to-[#ec5300] text-white text-xs sm:text-sm font-bold rounded-xl shadow-lg shadow-[#ec0000]/25 hover:shadow-xl hover:shadow-[#ec0000]/35 active:scale-[0.99] transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-70"
              >
                {isLoading ? "Signing In..." : "Sign In"}
              </button>
            </form>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200 dark:border-slate-800" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white dark:bg-slate-900 px-3 text-slate-400 font-bold tracking-wider">
                  OR
                </span>
              </div>
            </div>

            {/* Social Logins */}
            <div className="space-y-3">
              <button
                type="button"
                onClick={handleGoogleLogin}
                className="w-full py-2.5 px-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/80 rounded-xl text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-all flex items-center justify-center gap-2.5 shadow-sm"
              >
                <FcGoogle className="text-xl" />
                <span>Continue with Google</span>
              </button>

              <button
                type="button"
                className="w-full py-2.5 px-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/80 rounded-xl text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-all flex items-center justify-center gap-2.5 shadow-sm"
              >
                <FaApple className="text-xl text-slate-900 dark:text-white" />
                <span>Continue with Apple</span>
              </button>
            </div>
          </div>

          {/* Footer Link */}
          <div className="mt-8 text-center text-xs text-slate-500">
            Don't have an Account?{" "}
            <Link
              href="/signup"
              className="font-bold text-[#ec0000] hover:text-[#ec5300] hover:underline"
            >
              Sign Up
            </Link>
          </div>
        </div>

        {/* --- RIGHT COLUMN: BRAND HERO BANNER --- */}
        <div className="hidden lg:flex lg:col-span-6 relative bg-gradient-to-br from-[#0c0f17] via-[#121624] to-[#07090e] p-12 text-white flex-col justify-between overflow-hidden border-l border-slate-800">
          
          {/* Ambient Glowing Orbs */}
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#ec0000]/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-[#ec5300]/15 rounded-full blur-3xl pointer-events-none" />

          {/* Top Tagline */}
          <div className="relative z-10">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#ec0000]/20 border border-[#ec0000]/40 text-[#ec5300]">
              <StarFill className="w-3 h-3 text-[#ecca00]" />
              Premier Turf Booking
            </span>
          </div>

          {/* Hero Content / Quote */}
          <div className="relative z-10 space-y-6 my-auto">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight">
              Revolutionize Venue Bookings with <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ec0000] via-[#ec5300] to-[#ecca00]">Instant Scheduling</span>
            </h2>

            <blockquote className="border-l-2 border-[#ec0000] pl-4 text-slate-300 text-sm leading-relaxed italic">
              "khalahobe completely transformed how our team books weekly futsal grounds. It's reliable, fast, and eliminates phone call hassles!"
            </blockquote>

            {/* Testimonial User */}
            <div className="flex items-center gap-3 pt-2">
              <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#ec0000] to-[#ecca00] p-[2px]">
                <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center font-bold text-xs text-[#ec5300]">
                  MC
                </div>
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Michael Carter</h4>
                <p className="text-xs text-slate-400">Software Engineer & Team Captain</p>
              </div>
            </div>
          </div>

          {/* Footer Partner Logos Section */}
          <div className="relative z-10 pt-8 border-t border-slate-800/80">
            <p className="text-[10px] uppercase tracking-widest font-bold text-slate-400 mb-4">
              JOIN 10K+ PLAYERS & VENUES
            </p>
            <div className="grid grid-cols-4 gap-4 items-center opacity-60 text-xs font-bold text-slate-300">
              <span>⚽ FUTSAL PRO</span>
              <span>🏏 CRICKET HQ</span>
              <span>🎾 PADEL HUB</span>
              <span>🏀 HOOP ARENA</span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default LogInPage;