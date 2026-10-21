import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import {
  ShieldCheck,
  Envelope,
  Calendar,
  Ticket,
  Pencil,
  Clock,
  StarFill,
  Person,
  ArrowRight,
} from "@gravity-ui/icons";

const ProfilePage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const user = session?.user;

  // Format creation date safely
  const formattedCreatedDate = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "Member";

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#07090e] text-slate-800 dark:text-slate-100 py-10 px-4 sm:px-6 lg:px-8 transition-colors">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* --- PROFILE HEADER CARD --- */}
        <div className="relative overflow-hidden rounded-3xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 shadow-xl backdrop-blur-xl">
          
          {/* Header Cover Banner with Brand Gradient */}
          <div className="h-40 md:h-52 w-full bg-gradient-to-r from-[#ec0000] via-[#ec5300] to-[#ecca00] relative overflow-hidden">
            <div className="absolute inset-0 bg-black/10 dark:bg-black/30" />
            <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />
          </div>

          {/* User Details Bar */}
          <div className="px-6 md:px-10 pb-8 pt-0 relative">
            <div className="flex flex-col sm:flex-row items-center sm:items-end justify-between gap-6 -mt-16 sm:-mt-20 mb-6">
              
              {/* Avatar Container */}
              <div className="relative group">
                <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-full p-1 bg-white dark:bg-slate-900 shadow-2xl overflow-hidden ring-4 ring-[#ec0000]/20">
                  {user?.image ? (
                    <Image
                      src={user.image}
                      alt={user.name || "User Profile"}
                      width={144}
                      height={144}
                      className="w-full h-full object-cover rounded-full"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-[#ec0000] to-[#ecca00] flex items-center justify-center font-extrabold text-3xl text-white">
                      {user?.name?.charAt(0) || "U"}
                    </div>
                  )}
                </div>

                {/* Verification Badge Icon */}
                {user?.emailVerified && (
                  <div
                    className="absolute bottom-1 right-1 bg-emerald-500 text-white p-1.5 rounded-full border-2 border-white dark:border-slate-900 shadow-md"
                    title="Email Verified"
                  >
                    <ShieldCheck className="text-base" />
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3">
                <Link href="/profile/edit">
                  <button className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700/80 text-slate-800 dark:text-slate-200 text-xs font-bold rounded-xl border border-slate-300 dark:border-slate-700 transition-all flex items-center gap-2">
                    <Pencil className="text-sm" />
                    <span>Edit Profile</span>
                  </button>
                </Link>

                <Link href="/all-facility">
                  <button className="px-4 py-2.5 bg-gradient-to-r from-[#ec0000] to-[#ec5300] hover:from-[#ec2400] hover:to-[#ecca00] text-white text-xs font-bold rounded-xl shadow-lg shadow-[#ec0000]/20 transition-all flex items-center gap-2">
                    <Ticket className="text-sm" />
                    <span>Book New Slot</span>
                  </button>
                </Link>
              </div>
            </div>

            {/* Name & Bio */}
            <div className="text-center sm:text-left space-y-2">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 dark:text-white">
                  {user?.name || "Khalahobe Player"}
                </h1>
                {user?.emailVerified && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                    <Person className="text-xs" />
                    Verified Player
                  </span>
                )}
              </div>

              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 flex items-center justify-center sm:justify-start gap-2">
                <Envelope className="text-base text-[#ec0000]" />
                {user?.email}
              </p>
            </div>

          </div>
        </div>

        {/* --- STATS SUMMARY GRID --- */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800 shadow-md flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#ec0000]/10 border border-[#ec0000]/20 flex items-center justify-center text-[#ec0000]">
              <Ticket className="text-2xl" />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Total Bookings</p>
              <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">12 Slots</h3>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800 shadow-md flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#ec5300]/10 border border-[#ec5300]/20 flex items-center justify-center text-[#ec5300]">
              <Clock className="text-2xl" />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Upcoming Match</p>
              <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">Friday, 8 PM</h3>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800 shadow-md flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#ecca00]/10 border border-[#ecca00]/20 flex items-center justify-center text-[#ecca00]">
              <StarFill className="text-xl text-[#ecca00]" />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Loyalty Points</p>
              <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">450 PTS</h3>
            </div>
          </div>
        </div>

        {/* --- ACCOUNT DETAILS CARD --- */}
        <div className="p-6 md:p-8 rounded-3xl bg-white dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800 shadow-lg space-y-6">
          <h2 className="text-lg font-bold border-l-4 border-[#ec0000] pl-3 text-slate-900 dark:text-white">
            Account Details
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm">
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60 space-y-1">
              <span className="text-slate-400 font-semibold block text-xs">User ID</span>
              <p className="font-mono font-medium text-slate-800 dark:text-slate-200 break-all">
                {user?.id || "N/A"}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60 space-y-1">
              <span className="text-slate-400 font-semibold block text-xs">Member Since</span>
              <p className="font-medium text-slate-800 dark:text-slate-200 flex items-center gap-2">
                <Calendar className="text-[#ec2400]" />
                {formattedCreatedDate}
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ProfilePage;