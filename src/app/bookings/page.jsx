import { auth } from "@/lib/auth";
import { CancelConfirm } from "@/components/CnacelConfirm";
import { getUserData } from "@/lib/getUserData";
import { headers } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import {
  Ticket,
  Calendar,
  Clock,
  CircleCheckFill,
  Xmark,
  ArrowRotateRight,
  ShieldCheck,
} from "@gravity-ui/icons";

const BookingPage = async () => {
  let token = "";
  try {
    const sessionToken = await auth.api.getToken({ headers: await headers() });
    token = sessionToken?.token || "";
  } catch (err) {
    console.error("Error fetching auth token:", err);
  }

  const user = await getUserData();

  let bookings = [];
  if (user?.id) {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/booking/${user?.id}`,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
          cache: "no-store",
        }
      );
      if (res.ok) {
        bookings = await res.json();
      }
    } catch (error) {
      console.error("Error fetching user bookings:", error);
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#07090e] text-slate-800 dark:text-slate-100 py-10 px-4 sm:px-6 lg:px-8 transition-colors">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* --- PAGE HEADER --- */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ec0000]/10 border border-[#ec0000]/20 text-[#ec0000] dark:text-[#ec5300] text-xs font-bold uppercase tracking-wider mb-3">
              <Ticket className="text-sm" />
              <span>Reservation History</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              My Turf <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ec0000] via-[#ec5300] to-[#ecca00]">Bookings</span>
            </h1>
            <p className="mt-1 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              Manage your upcoming venue reservations and review slot receipts.
            </p>
          </div>

          <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-900 px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm w-fit">
            Total Reservations: <span className="text-[#ec0000] dark:text-[#ec5300] font-bold">{bookings?.length || 0}</span>
          </div>
        </div>

        {/* --- BOOKINGS GRID & EMPTY STATE --- */}
        {bookings && bookings.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bookings.map((booking) => {
              const bookingDate = booking?.date
                ? new Date(booking.date).toLocaleDateString("en-US", {
                    weekday: "short",
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })
                : "Scheduled Date";

              const isConfirmed =
                booking?.Status?.toLowerCase() === "confirmed" ||
                booking?.Status?.toLowerCase() === "approved";

              return (
                <div
                  key={booking?._id}
                  className="group relative overflow-hidden rounded-3xl bg-white dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800 shadow-xl hover:shadow-2xl hover:shadow-[#ec0000]/10 transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    {/* Thumbnail Image Box */}
                    <div className="relative w-full aspect-[16/10] overflow-hidden bg-slate-100 dark:bg-slate-800">
                      <Image
                        src={booking?.thumbnail || "/placeholder-turf.jpg"}
                        alt={booking?.name || "Booked Turf"}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                      {/* Status Badge Over Image */}
                      <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2 z-10">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-bold backdrop-blur-md shadow-sm border flex items-center gap-1.5 ${
                            isConfirmed
                              ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/40"
                              : "bg-amber-500/20 text-amber-300 border-amber-500/40"
                          }`}
                        >
                          <span
                            className={`w-2 h-2 rounded-full ${
                              isConfirmed ? "bg-emerald-400 animate-pulse" : "bg-amber-400"
                            }`}
                          />
                          {booking?.Status || "Confirmed"}
                        </span>

                        <span className="px-3 py-1 rounded-full text-xs font-bold bg-black/50 text-white backdrop-blur-md border border-white/20">
                          ৳ {booking?.price_per_hour?.toFixed(2) || "1,200"} / hr
                        </span>
                      </div>

                      {/* Venue Title over Bottom Image */}
                      <div className="absolute bottom-3 left-3 right-3 z-10">
                        <h3 className="text-lg font-extrabold text-white tracking-tight line-clamp-1 drop-shadow-md">
                          {booking?.name || "Sports Arena Ground"}
                        </h3>
                      </div>
                    </div>

                    {/* Booking Details Card Body */}
                    <div className="p-5 space-y-3">
                      {/* Scheduled Date */}
                      <div className="flex items-center gap-2 text-xs font-semibold text-slate-600 dark:text-slate-300">
                        <Calendar className="text-[#ec0000] text-sm shrink-0" />
                        <span>Date: {bookingDate}</span>
                      </div>

                      {/* Slot Time */}
                      {booking?.slot && (
                        <div className="flex items-center gap-2 text-xs font-semibold text-slate-600 dark:text-slate-300">
                          <Clock className="text-[#ec5300] text-sm shrink-0" />
                          <span>Slot Time: {booking.slot}</span>
                        </div>
                      )}

                      {/* Verification Guarantee Pill */}
                      <div className="pt-1 flex items-center gap-1.5 text-[11px] text-slate-400">
                        <ShieldCheck className="text-emerald-500 text-sm shrink-0" />
                        <span>Instant Ground Reservation Guaranteed</span>
                      </div>
                    </div>
                  </div>

                  {/* Card Actions Footer */}
                  <div className="p-5 pt-0">
                    <div className="h-px w-full bg-slate-100 dark:bg-slate-800 mb-4" />
                    <div className="flex items-center justify-between gap-3">
                      <CancelConfirm booking={booking} />
                      <Link
                        href={`/all-facility/${booking?._id}`}
                        className="text-xs font-bold text-[#ec0000] dark:text-[#ec5300] hover:underline"
                      >
                        View Ground
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* EMPTY STATE CARD */
          <div className="p-12 sm:p-16 rounded-3xl bg-white dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800 text-center shadow-xl space-y-5 max-w-xl mx-auto">
            <div className="w-16 h-16 rounded-full bg-[#ec0000]/10 border border-[#ec0000]/20 text-[#ec0000] mx-auto flex items-center justify-center">
              <Ticket className="text-3xl" />
            </div>
            
            <div className="space-y-1">
              <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">
                No Bookings Found
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                You haven't reserved any sports turfs or grounds yet. Ready to get in the game?
              </p>
            </div>

            <Link href="/all-facility" className="inline-block pt-2">
              <button className="px-6 py-3 bg-gradient-to-r from-[#ec0000] via-[#ec2400] to-[#ec5300] hover:from-[#ec2400] hover:to-[#ecca00] text-white text-xs font-bold rounded-xl shadow-lg shadow-[#ec0000]/25 transition-all flex items-center gap-2 active:scale-95">
                <CircleCheckFill className="text-sm" />
                <span>Explore Available Facilities</span>
              </button>
            </Link>
          </div>
        )}

      </div>
    </div>
  );
};

export default BookingPage;