import BookingCard from "@/components/BookingCard";
import { auth } from "@/lib/auth";
import { Delete, Star, StarFill } from "@gravity-ui/icons";
import { Button } from "@heroui/react";
import { headers } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import { BiLeftArrow } from "react-icons/bi";
import { CiLocationOn } from "react-icons/ci";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { RiGhostFill } from "react-icons/ri";

const detailPage = async ({ params }) => {
  const { id } = await params;
  const { token } = await auth.api.getToken({ headers: await headers() });
  console.log(token);
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/featured/${id}`,
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
    },
  );
  const data = await res.json();

  return (
    <div className="py-10 ">
      <div className="md:flex gap-10">
        <Image
          src={data?.thumbnail}
          alt={data?.name}
          width={500}
          height={300}
          className="rounded-md shadow-md"
        />
        <div className="space-y-4">
          <h1 className="text-2xl font-bold text-[#810B38]">{data?.name}</h1>
          <div className="flex justify-between items-center">
            <h2 className="text-lg flex font-serif items-center font-bold">
              <CiLocationOn /> {data?.location}
            </h2>
          </div>

          <p className="text-gray-600 flex items-center">
            <StarFill fontSize={50} className="text-yellow-500" />{" "}
            {data?.description}
          </p>
          <div className="flex justify-between items-center">
            <ul>
              <li className="flex items-center gap-2 font-medium">
                <Star className="text-green-500" />
                <Star className="text-green-500" /> Available Slot time
              </li>
              {data?.available_slots.map((slot, index) => (
                <li key={index} className="flex items-center">
                  <RiGhostFill></RiGhostFill>
                  {slot}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center">
        <div className="">
          <Link href="/all-facility">
            <button className="text-[#810B38] flex items-center gap-2">
              <FaLongArrowAltLeft />
              go back
            </button>
          </Link>
          <div className="mt-4 flex items-center gap-4">
            <Button variant="outline" className={" px-10"}>
              update
            </Button>
            <Button
              variant="outline"
              className={"text-red-500 px-10"}
              color="danger"
            >
              <Delete />
            </Button>
          </div>
        </div>
        <div className="rounded-md shadow-md ">
          <BookingCard data={data} />
        </div>
      </div>
    </div>
  );
};

export default detailPage;
