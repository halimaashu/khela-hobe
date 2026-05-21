import { CancelConfirm } from "@/components/CnacelConfirm";
import { getUserData } from "@/lib/getUserData";
import { Button, Card, EmptyState } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { ImFilesEmpty } from "react-icons/im";

const BookingPage = async () => {
  const {token}=await auth.api.getToken({headers:await headers()});
  const user = await getUserData();
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/booking/${user?.id}`, {
    headers: {
      authorization: `Bearer ${token}`
    }
  });
  const bookings = await res.json();

  return (
    <div>
      {bookings?.length > 0 ? (
        <div className="">
          <h1 className="text-2xl font-bold mt-5 mb-10">Booking Page</h1>

          <div className="">
            {bookings.map((booking) => (
              <Card className="mb-4 rounded-md shadow-md" key={booking.userId}>
                <div className="relative w-full h-48">
                  {" "}
                  <Image
                    src={booking?.thumbnail}
                    alt={booking.name}
                    fill
                    className="absolute rounded-md object-cover shadow-md "
                  />
                </div>
                <h2 className="text-xl font-bold mt-4">{booking.name}</h2>
                <h1 className="text-lg font-semibold text-[#541A1A]">
                  ${booking.price_per_hour.toFixed(2)} per hour
                </h1>
                <h2 className="text-md font-normal mt-2">
                  Date: {new Date(booking.date).toLocaleDateString()}
                </h2>
                <h3 className="text-sm text-muted-foreground">
                  Status: {booking.Status}
                </h3>
                <CancelConfirm booking={booking} />
              </Card>
            ))}
          </div>
        </div>
      ) : (
       <div className="py-20 flex justify-center items-center flex-col gap-6">
        
         <h1 className="text-2xl font-bold mt-5 mb-10 flex items-center"><ImFilesEmpty /> No bookings found</h1>
         <p className="text-muted-foreground">
           You have not made any bookings yet.
         </p>
        <Link href="/all-bookings"> <Button className={"bg-[#810B38]"}>Go to Bookings page</Button></Link>
       </div>
      )}
    </div>
  );
};

export default BookingPage;
