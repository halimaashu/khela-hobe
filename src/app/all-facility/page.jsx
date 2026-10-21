import FacilityCrd from "@/components/FacilityCrd";
import React from "react";
import Link from "next/link";
import { 
  Magnifier, 
  Funnel, 
  ArrowRotateRight, 
  Globe, 
  Xmark 
} from "@gravity-ui/icons";

const AllFacilityPage = async ({ searchParams }) => {
  const resolvedParams = await searchParams;
  const search = resolvedParams?.search || "";
  const sport = resolvedParams?.sport || "";

  const params = new URLSearchParams();
  if (search) params.append("search", search);
  if (sport) params.append("sport", sport);

  let data = [];
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/featured?${params.toString()}`,
      { cache: "no-store" }
    );
    if (res.ok) {
      data = await res.json();
    }
  } catch (error) {
    console.error("Failed to fetch facilities:", error);
  }

  const sportsList = [
    "Football",
    "Cricket",
    "Futsal",
    "Badminton",
    "Tennis",
    "Swimming",
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#07090e] text-slate-800 dark:text-slate-100 py-10 px-4 sm:px-6 lg:px-8 transition-colors">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* --- PAGE HEADER & HERO TITLE --- */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ec0000]/10 border border-[#ec0000]/20 text-[#ec0000] dark:text-[#ec5300] text-xs font-bold uppercase tracking-wider mb-3">
              <Globe className="text-sm" />
              <span>Explore Turfs & Arenas</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              All Sports <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ec0000] via-[#ec5300] to-[#ecca00]">Facilities</span>
            </h1>
            <p className="mt-1 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              Discover and book verified grounds across Bangladesh with real-time slot availability.
            </p>
          </div>

          <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-900 px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm w-fit">
            Showing <span className="text-[#ec0000] dark:text-[#ec5300] font-bold">{data.length}</span> grounds available
          </div>
        </div>

        {/* --- SEARCH & FILTER BAR --- */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800 shadow-xl backdrop-blur-md">
          <form className="flex flex-col md:flex-row gap-3 items-center">
            
            {/* Search Input Box */}
            <div className="relative w-full md:flex-1">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Magnifier className="text-base" />
              </div>
              <input
                type="text"
                name="search"
                defaultValue={search}
                placeholder="Search venue by name or location..."
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 rounded-xl text-xs sm:text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:border-[#ec0000] focus:ring-1 focus:ring-[#ec0000] transition-all"
              />
            </div>

            {/* Sport Filter Dropdown */}
            <div className="relative w-full md:w-56">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Funnel className="text-base" />
              </div>
              <select
                name="sport"
                defaultValue={sport}
                className="w-full pl-10 pr-8 py-2.5 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 rounded-xl text-xs sm:text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:border-[#ec0000] focus:ring-1 focus:ring-[#ec0000] transition-all cursor-pointer appearance-none"
              >
                <option value="">All Sports Categories</option>
                {sportsList.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2 w-full md:w-auto">
              <button
                type="submit"
                className="flex-1 md:flex-none px-6 py-2.5 bg-gradient-to-r from-[#ec0000] via-[#ec2400] to-[#ec5300] hover:from-[#ec2400] hover:to-[#ecca00] text-white text-xs sm:text-sm font-bold rounded-xl shadow-lg shadow-[#ec0000]/20 hover:shadow-xl hover:shadow-[#ec0000]/30 transition-all duration-200 flex items-center justify-center gap-2 active:scale-95"
              >
                <Magnifier className="text-sm" />
                <span>Search</span>
              </button>

              {(search || sport) && (
                <Link href="/all-facility" className="shrink-0">
                  <button
                    type="button"
                    title="Reset Filters"
                    className="p-2.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-xl border border-slate-200 dark:border-slate-700 transition-all flex items-center justify-center"
                  >
                    <ArrowRotateRight className="text-base" />
                  </button>
                </Link>
              )}
            </div>

          </form>

          {/* Active Filters Pill Bar */}
          {(search || sport) && (
            <div className="flex flex-wrap items-center gap-2 pt-3 mt-3 border-t border-slate-100 dark:border-slate-800 text-xs">
              <span className="text-slate-400 font-semibold">Active Filters:</span>
              {search && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-medium">
                  Search: "{search}"
                </span>
              )}
              {sport && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ec0000]/10 text-[#ec0000] dark:text-[#ec5300] border border-[#ec0000]/20 font-bold">
                  Sport: {sport}
                </span>
              )}
            </div>
          )}
        </div>

        {/* --- FACILITIES GRID & EMPTY STATE --- */}
        {data.length === 0 ? (
          <div className="p-12 sm:p-16 rounded-3xl bg-white dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800 text-center shadow-lg space-y-4">
            <div className="w-16 h-16 rounded-full bg-[#ec0000]/10 border border-[#ec0000]/20 text-[#ec0000] mx-auto flex items-center justify-center">
              <Xmark className="text-3xl" />
            </div>
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                No Facilities Match Your Search
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
                We couldn't find any venue matching "{search || sport}". Try clearing your filters or searching for another keyword.
              </p>
            </div>
            <Link href="/all-facility" className="inline-block pt-2">
              <button className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold rounded-xl border border-slate-300 dark:border-slate-700 transition-all flex items-center gap-2">
                <ArrowRotateRight className="text-sm" />
                <span>Reset All Filters</span>
              </button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.map((re) => (
              <FacilityCrd key={re._id} re={re} />
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default AllFacilityPage;