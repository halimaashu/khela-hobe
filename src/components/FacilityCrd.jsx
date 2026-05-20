import {
  ArrowChevronRight,
  LocationArrowFill,
  StarFill,
} from "@gravity-ui/icons";
import { Card } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { CiLocationOn } from "react-icons/ci";

const FacilityCrd = ({ re }) => {
  return (
    <Card className="rounded-md border  border-[#810B38] hover:shadow-lg">
      <div className="relative w-full h-48">
        <Image
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          src={re.thumbnail}
          alt={re.name}
          fill
          className="absolute rounded-md"
        />
      </div>
      <h1 className="text-xl font-bold">{re.name}</h1>
      <h2 className="text-lg flex items-center">
        <CiLocationOn /> {re.location}
      </h2>
      <h1 className="text-gray-500 flex items-center-safe gap-1">
        <StarFill className="text-green-500" />{" "}
        <StarFill className="text-green-500" /> {re.facility_type}
      </h1>
     <Link href={`/all-facility/${re._id}`}> <button className="text-[#541A1A] underline flex items-center gap-3">
        Book Now{" "}
        <span className="-rotate-45">
          <ArrowChevronRight fontSize={20} />
        </span>
      </button></Link>
    </Card>
  );
};

export default FacilityCrd;
