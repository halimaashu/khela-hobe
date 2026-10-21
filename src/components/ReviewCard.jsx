import React from "react";
import { Card } from "@heroui/react";
import Marquee from "react-fast-marquee";
import { PiUserFill, PiQuotesFill } from "react-icons/pi";
import { StarFill } from "@gravity-ui/icons";

const reviews = [
  {
    id: 1,
    name: "Rahim Ahmed",
    role: "Regular Turf Bookings",
    avatar: "RA",
    rating: 5,
    review:
      "Amazing booking experience! The turf quality was excellent and the entire slot reservation process took less than a minute.",
  },
  {
    id: 2,
    name: "Sakib Hasan",
    role: "Football Captain",
    avatar: "SH",
    rating: 5,
    review:
      "Khalahobe made it so effortless to coordinate our weekly 7-a-side matches. Highly recommended for sports groups!",
  },
  {
    id: 3,
    name: "Nusrat Jahan",
    role: "Badminton Enthusiast",
    avatar: "NJ",
    rating: 5,
    review:
      "Super clean UI and smooth booking experience. Instant confirmation and secure payment options made my day.",
  },
  {
    id: 4,
    name: "Tanvir Islam",
    role: "Cricket Tournament Host",
    avatar: "TI",
    rating: 5,
    review:
      "Found top-quality nearby cricket grounds quickly with clear slot visibility. An indispensable platform for sports lovers.",
  },
  {
    id: 5,
    name: "Mim Akter",
    role: "Weekend Player",
    avatar: "MA",
    rating: 5,
    review:
      "Responsive design on mobile and straightforward checkout. Really impressed with how smooth everything works.",
  },
  {
    id: 6,
    name: "Ashraful Karim",
    role: "Futsal League Admin",
    avatar: "AK",
    rating: 5,
    review:
      "Customer support was incredibly fast and helpful when we needed to reschedule. Instant confirmation is a game changer!",
  },
];

const ReviewCard = () => {
  return (
    <section className="py-20 relative overflow-hidden bg-slate-50 dark:bg-[#0a0c10] transition-colors duration-300">
      {/* Background Decorative Ambient Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-gradient-to-r from-[#ec0000]/10 via-[#ec5300]/10 to-[#ecca00]/10 blur-3xl pointer-events-none rounded-full" />

      <div className="container mx-auto px-4 mb-12 text-center relative z-10">
        {/* Section Pill Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ec0000]/10 border border-[#ec0000]/20 text-[#ec0000] dark:text-[#ec5300] text-xs font-bold uppercase tracking-wider mb-4">
          <StarFill className="w-3.5 h-3.5 text-[#ec9b00]" />
          <span>Client Testimonials</span>
        </div>

        {/* Section Heading */}
        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100">
          What Our Players <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ec0000] via-[#ec5300] to-[#ecca00]">Say About Us</span>
        </h2>
        <p className="mt-3 text-sm md:text-base text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
          Trusted by thousands of players and turf organizers across the country.
        </p>
      </div>

      {/* Marquee Slider Section with Soft Gradient Edge Fade */}
      <div className="relative w-full overflow-hidden">
        {/* Left & Right Edge Fades for Smooth Infinite Scroll Effect */}
        <div className="absolute top-0 bottom-0 left-0 w-16 md:w-32 z-20 pointer-events-none bg-gradient-to-r from-slate-50 dark:from-[#0a0c10] to-transparent" />
        <div className="absolute top-0 bottom-0 right-0 w-16 md:w-32 z-20 pointer-events-none bg-gradient-to-l from-slate-50 dark:from-[#0a0c10] to-transparent" />

        <Marquee pauseOnHover speed={40} gradient={false}>
          {reviews.map((review) => (
            <Card
              key={review.id}
              className="mx-4 my-4 w-[320px] md:w-[380px] p-6 rounded-2xl transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-[#ec0000]/10
                /* Light Mode Styling */
                bg-white/90 border border-slate-200/80 shadow-md backdrop-blur-md text-slate-800
                /* Dark Mode Styling */
                dark:bg-slate-900/80 dark:border-slate-800/80 dark:shadow-slate-950/60 dark:text-slate-100 flex flex-col justify-between"
            >
              <div>
                {/* Header: Stars & Quote Icon */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1">
                    {[...Array(review.rating)].map((_, i) => (
                      <StarFill
                        key={i}
                        className="w-4 h-4 text-amber-400 fill-amber-400"
                      />
                    ))}
                  </div>
                  <PiQuotesFill className="text-2xl text-[#ec0000]/30 dark:text-[#ec5300]/30" />
                </div>

                {/* Review Paragraph */}
                <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300 italic mb-6">
                  "{review.review}"
                </p>
              </div>

              {/* User Bio Footer */}
              <div className="flex items-center gap-3 pt-4 border-t border-slate-100 dark:border-slate-800/80">
                {/* User Avatar Circle */}
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#ec0000] via-[#ec5300] to-[#ec9b00] p-[2px] shrink-0">
                  <div className="w-full h-full rounded-full bg-white dark:bg-slate-900 flex items-center justify-center font-bold text-xs text-[#ec0000] dark:text-[#ec5300]">
                    {review.avatar || <PiUserFill className="text-lg" />}
                  </div>
                </div>

                {/* User Details */}
                <div className="overflow-hidden">
                  <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 truncate">
                    {review.name}
                  </h3>
                  <p className="text-xs font-medium text-slate-400 dark:text-slate-500 truncate">
                    {review.role}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </Marquee>
      </div>
    </section>
  );
};

export default ReviewCard;