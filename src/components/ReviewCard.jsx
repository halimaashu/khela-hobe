import { Card } from "@heroui/react";
import React from "react";

import Marquee from "react-fast-marquee";
import { PiUserFill } from "react-icons/pi";
import { merienda } from "./Banner";
const reviews = [
  {
    id: 1,
    name: "Rahim Ahmed",
    review:
      "Amazing booking experience! The turf quality was excellent and the process was super easy.",
  },
  {
    id: 2,
    name: "Sakib Hasan",
    review:
      "Khela Hobe made it simple to book our weekly football match. Highly recommended!",
  },
  {
    id: 3,
    name: "Nusrat Jahan",
    review:
      "Very clean UI and smooth experience. Loved the online payment system.",
  },
  {
    id: 4,
    name: "Tanvir Islam",
    review:
      "Found nearby cricket grounds quickly. Great platform for sports lovers.",
  },
  {
    id: 5,
    name: "Mim Akter",
    review: "Responsive design and easy booking system. Really helpful app.",
  },
  {
    id: 6,
    name: "Ashraful Karim",
    review:
      "Customer support was very fast and friendly. Booking confirmed instantly.",
  },
];
const ReviewCard = () => {
    return (
        <div className="py-20 bg-base-200">
            <h1 className={`text-3xl font-bold text-center mb-8 ${merienda.className}`}>What Our Users Say</h1>
      <Marquee pauseOnHover>
        {reviews.map((review) => (
          <Card className="bg-[#810B38] text-white mr-5 max-w-96 mb-10" key={review.id}>

            <h3 className="text-lg font-bold"><PiUserFill /> {review.name}</h3>
            <p className="text-sm">{review.review}</p>
          </Card>
        ))}
      </Marquee>
    </div>
    );
};

export default ReviewCard;