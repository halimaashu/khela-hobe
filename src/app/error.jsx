"use client";
import { Button } from "@heroui/react";
import Link from "next/link";
import React from "react";

const error = () => {
  return (
    <div className="md:w-1/2 mx-auto bg-base-200 shadow-md flex flex-col gap-5 justify-center items-center h-screen">
      <h1 className="text-3xl font-bold text-red-500">Something went wrong!</h1>
      <p className="text-xl font-medium">We're sorry, but an error occurred while loading the page.</p>
      <p className="text-xl font-medium text-gray-500 ">our developer team worked on fixing it.</p>
      <Link href="/">
        <Button className={" bg-[#810B38] w-full rounded-md px-10"}>
          Go Home
        </Button>
      </Link>
    </div>
  );
};

export default error;
