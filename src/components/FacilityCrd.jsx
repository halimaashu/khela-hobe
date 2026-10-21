import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Card } from "@heroui/react";
import { ArrowChevronRight, StarFill } from "@gravity-ui/icons";
import { CiLocationOn } from "react-icons/ci";
import { BiTimeFive } from "react-icons/bi";

const FacilityCard = ({ re }) => {
  if (!re) return null;

  // Extract or set fallback values
  const {
    _id,
    name = "Premium Turf Arena",
    thumbnail = "/placeholder-turf.jpg",
    location = "Dhaka, Bangladesh",
    facility_type = "Football & Cricket",
    price = "৳ 1,200 / hr",
    rating = 4.8,
    isAvailable = true,
  } = re;

  return (
    <Card
      className="group relative overflow-hidden rounded-2xl transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-[#ec0000]/20
        /* Light Theme Styles */
        bg-white/80 border border-slate-200/80 shadow-md backdrop-blur-md
        /* Dark Theme Styles */
        dark:bg-slate-900/80 dark:border-slate-800 dark:shadow-slate-950/50"
    >
      {/* --- Image Section with Aspect Ratio & Badges --- */}
      <div className="relative w-full aspect-[16/10] overflow-hidden bg-slate-100 dark:bg-slate-800">
        <Image
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          src={thumbnail}
          alt={name}
          fill
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />

        {/* Dynamic Dark Gradient Overlay for Contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/20 opacity-80 transition-opacity duration-300 group-hover:opacity-90" />

        {/* Top Badges: Facility Type & Status */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2 z-10">
          <span className="px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-md bg-black/40 text-white border border-white/20 shadow-sm flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            {facility_type}
          </span>

          <span
            className={`px-2.5 py-1 rounded-full text-xs font-bold backdrop-blur-md shadow-sm border ${
              isAvailable
                ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/40"
                : "bg-rose-500/20 text-rose-300 border-rose-500/40"
            }`}
          >
            {isAvailable ? "Available Now" : "Booked"}
          </span>
        </div>

        {/* Bottom Image Overlay: Price Tag */}
        <div className="absolute bottom-3 left-3 z-10">
          <div className="px-3 py-1 rounded-lg bg-gradient-to-r from-[#ec0000] to-[#ec5300] text-white font-extrabold text-sm shadow-lg flex items-center gap-1">
            {price}
          </div>
        </div>
      </div>

      {/* --- Card Body / Content Section --- */}
      <div className="p-5 flex flex-col justify-between space-y-4">
        {/* Title and Rating */}
        <div>
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-lg font-bold tracking-tight text-slate-900 dark:text-slate-100 line-clamp-1 group-hover:text-[#ec0000] dark:group-hover:text-[#ec5300] transition-colors">
              {name}
            </h3>

            {/* Rating Badge */}
            <div className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 text-xs font-bold shrink-0">
              <StarFill className="w-3.5 h-3.5 fill-current text-amber-500" />
              <span>{rating}</span>
            </div>
          </div>

          {/* Location with Icon */}
          <p className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-slate-500 dark:text-slate-400">
            <CiLocationOn className="text-base text-[#ec2400] shrink-0" />
            <span className="line-clamp-1">{location}</span>
          </p>
        </div>

        {/* Divider */}
        <div className="h-px w-full bg-slate-100 dark:bg-slate-800" />

        {/* Footer Actions &CTA */}
        <div className="flex items-center justify-between pt-1">
          <div className="flex items-center gap-1 text-xs text-slate-400 dark:text-slate-500">
            <BiTimeFive className="text-sm" />
            <span>Instant confirmation</span>
          </div>

          {/* Call To Action Link */}
          <Link href={`/all-facility/${_id}`} className="inline-block">
            <button className="relative group/btn overflow-hidden px-4 py-2 rounded-xl text-xs font-bold text-white transition-all duration-300 bg-gradient-to-r from-[#ec0000] via-[#ec2400] to-[#ec5300] hover:shadow-lg hover:shadow-[#ec0000]/30 active:scale-95 flex items-center gap-2">
              <span>Book Now</span>
              <ArrowChevronRight
                className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1"
              />
            </button>
          </Link>
        </div>
      </div>
    </Card>
  );
};

export default FacilityCard;