import BookingCard from "@/components/BookingCard";
import { auth } from "@/lib/auth";
import {
  ArrowLeft,
  LocationPin,
  Clock,
  TrashBin,
  PencilToSquare,
  StarFill,
  ShieldCheck,
  CircleCheckFill,
  LocationArrowFill,
} from "@gravity-ui/icons";
import { headers } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const DetailPage = async ({ params }) => {
  const { id } = await params;
  
  // Safe token retrieval
  let token = "";
  try {
    const sessionToken = await auth.api.getToken({ headers: await headers() });
    token = sessionToken?.token || "";
  } catch (err) {
    console.error("Session token error:", err);
  }

  let data = null;
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/featured/${id}`,
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
        cache: "no-store",
      }
    );
    if (res.ok) {
      data = await res.json();
    }
  } catch (error) {
    console.error("Error fetching facility details:", error);
  }

  if (!data) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center p-6 bg-slate-50 dark:bg-[#07090e]">
        <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">
          Facility Not Found
        </h2>
        <p className="text-slate-500 text-sm mb-6">
          The venue you are looking for might have been moved or deleted.
        </p>
        <Link href="/all-facility">
          <button className="px-5 py-2.5 bg-[#ec0000] text-white text-xs font-bold rounded-xl flex items-center gap-2">
            <ArrowLeft className="text-sm" /> Back to Facilities
          </button>
        </Link>
      </div>
    );
  }

  const {
    name = "Premium Turf Arena",
    thumbnail = "/placeholder-turf.jpg",
    location = "Dhaka, Bangladesh",
    description = "State-of-the-art facility equipped with professional lighting, FIFA-certified turf, and full amenities.",
    available_slots = [],
    price = "৳ 1,200 / hr",
    rating = 4.9,
    facility_type = "Football & Futsal",
  } = data;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#07090e] text-slate-800 dark:text-slate-100 py-8 px-4 sm:px-6 lg:px-8 transition-colors">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* --- TOP NAVIGATION BAR --- */}
        <div className="flex items-center justify-between">
          <Link href="/all-facility">
            <button className="group inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-700 dark:text-slate-200 hover:text-[#ec0000] dark:hover:text-[#ec5300] hover:border-[#ec0000]/30 shadow-sm transition-all">
              <ArrowLeft className="text-base group-hover:-translate-x-1 transition-transform" />
              <span>Back to Facilities</span>
            </button>
          </Link>

          {/* Admin Management Actions */}
          <div className="flex items-center gap-2">
            <button className="px-3.5 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:text-[#ec0000] text-xs font-bold rounded-xl shadow-sm transition-all flex items-center gap-1.5">
              <PencilToSquare className="text-sm" />
              <span className="hidden sm:inline">Edit Facility</span>
            </button>
            <button className="px-3.5 py-2 bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 hover:bg-rose-500 hover:text-white text-xs font-bold rounded-xl transition-all flex items-center gap-1.5">
              <TrashBin className="text-sm" />
              <span className="hidden sm:inline">Delete</span>
            </button>
          </div>
        </div>

        {/* --- MAIN HERO CONTENT SECTION --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT 7 COLS: VENUE DETAILS & GALLERY */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Image Box */}
            <div className="relative w-full aspect-[16/10] rounded-3xl overflow-hidden shadow-2xl border border-slate-200/80 dark:border-slate-800 bg-slate-200 dark:bg-slate-900">
              <Image
                src={thumbnail}
                alt={name}
                fill
                priority
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              
              {/* Badges Over Image */}
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-2 z-10">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-black/60 backdrop-blur-md text-white border border-white/20 flex items-center gap-1.5">
                  <ShieldCheck className="text-emerald-400 text-sm" />
                  Verified Venue
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#ec0000] text-white shadow-lg">
                  {facility_type}
                </span>
              </div>

              {/* Price & Title Banner over Bottom Image */}
              <div className="absolute bottom-4 left-4 right-4 z-10 text-white">
                <p className="text-xs font-semibold text-amber-300 uppercase tracking-wider mb-1 flex items-center gap-1">
                  <StarFill className="text-amber-400 text-xs" /> {rating} Rating
                </p>
                <h1 className="text-2xl sm:text-3xl font-black tracking-tight drop-shadow-md">
                  {name}
                </h1>
              </div>
            </div>

            {/* Location & Overview Card */}
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800 shadow-xl space-y-4">
              <div className="flex items-center gap-2 text-sm font-semibold text-slate-500 dark:text-slate-400 border-b border-slate-100 dark:border-slate-800 pb-3">
                <LocationArrowFill className="text-lg text-[#ec0000] shrink-0" />
                <span>{location}</span>
              </div>

              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-2">
                  About This Facility
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {description}
                </p>
              </div>

              {/* Facility Highlights Pill Badges */}
              <div className="pt-2 flex flex-wrap gap-2 text-xs font-semibold">
                <span className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                  <CircleCheckFill className="text-emerald-500 text-sm" /> Floodlights Available
                </span>
                <span className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                  <CircleCheckFill className="text-emerald-500 text-sm" /> Changing Rooms
                </span>
                <span className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                  <CircleCheckFill className="text-emerald-500 text-sm" /> Free Parking
                </span>
              </div>
            </div>

            {/* Available Slot Chips Grid */}
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800 shadow-xl space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-2">
                  <Clock className="text-[#ec5300] text-base" />
                  <span>Available Slot Schedule</span>
                </h3>
                <span className="text-xs text-slate-400 font-medium">
                  {available_slots.length} Slots Open
                </span>
              </div>

              {available_slots.length === 0 ? (
                <p className="text-xs text-slate-400 italic py-2">
                  No open slots found for today.
                </p>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {available_slots.map((slot, index) => (
                    <div
                      key={index}
                      className="px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2 hover:border-[#ec0000] hover:text-[#ec0000] transition-colors cursor-pointer"
                    >
                      <Clock className="text-xs text-[#ec2400]" />
                      <span>{slot}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>

          {/* RIGHT 5 COLS: STICKY BOOKING CARD */}
          <div className="lg:col-span-5 lg:sticky lg:top-8">
            <div className="rounded-3xl shadow-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden">
              <BookingCard data={data} />
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default DetailPage;