"use client";
import { authClient } from "@/lib/auth-client";
import {
  Card,
  Calendar,
  DateField,
  DatePicker,
  Label,
  Button,
} from "@heroui/react";
import { redirect } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-toastify";

const BookingCard = ({ data }) => {
  const [date, setDate] = useState(null);
  const realDate = new Date(date);
  const { data: session, isPending, error } = authClient.useSession();
  const user = session?.user;
  // console.log(user," from client site")
  const handleBooking = async () => {
    const bookingData = {
      userId: user?.id,
      facilityId: data?._id,
      date: realDate,
      thumbnail: data?.thumbnail,
      name: data?.name,
      price_per_hour: data?.price_per_hour,
      Status: "booked",
    };
    console.log(bookingData);

    const { data: tokenData } = await authClient.token();
    // console.log(tokenData,"from booking data")
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/booking`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${tokenData?.token}`,
      },
      body: JSON.stringify(bookingData),
    });
    const result = await res.json();
    toast.success("booking success");
    redirect("/all-facility");
  };

  return (
    <div>
      <Card>
        <h1 className="text-xl font-bold">Book It</h1>
        <h1 className="text-xl font-semibold text-[#541A1A] font-serif">
          price per_hour: $ {data?.price_per_hour}
        </h1>
        <DatePicker
          className=""
          name="date"
          value={date}
          onValueChange={setDate}
        >
          <Label>Slot Date</Label>
          <DateField.Group fullWidth>
            <DateField.Input>
              {(segment) => <DateField.Segment segment={segment} />}
            </DateField.Input>
            <DateField.Suffix>
              <DatePicker.Trigger>
                <DatePicker.TriggerIndicator />
              </DatePicker.Trigger>
            </DateField.Suffix>
          </DateField.Group>
          <DatePicker.Popover>
            <Calendar aria-label="Event date">
              <Calendar.Header>
                <Calendar.YearPickerTrigger>
                  <Calendar.YearPickerTriggerHeading />
                  <Calendar.YearPickerTriggerIndicator />
                </Calendar.YearPickerTrigger>
                <Calendar.NavButton slot="previous" />
                <Calendar.NavButton slot="next" />
              </Calendar.Header>
              <Calendar.Grid>
                <Calendar.GridHeader>
                  {(day) => <Calendar.HeaderCell>{day}</Calendar.HeaderCell>}
                </Calendar.GridHeader>
                <Calendar.GridBody>
                  {(date) => <Calendar.Cell date={date} />}
                </Calendar.GridBody>
              </Calendar.Grid>
              <Calendar.YearPickerGrid>
                <Calendar.YearPickerGridBody>
                  {({ year }) => <Calendar.YearPickerCell year={year} />}
                </Calendar.YearPickerGridBody>
              </Calendar.YearPickerGrid>
            </Calendar>
          </DatePicker.Popover>
        </DatePicker>
        <Button
          onClick={handleBooking}
          className="bg-[#541A1A] text-white w-full rounded-md"
        >
          Book Now
        </Button>
      </Card>
    </div>
  );
};

export default BookingCard;
