import { Button } from "@heroui/react";
import Link from "next/link";

const NotFoundPound = () => {
  return (
    <div className="md:w-1/2 mx-auto bg-base-200 shadow-md flex flex-col gap-5 justify-center items-center h-screen">
      <h1 className="text-6xl font-bold text-green-500">_404</h1>
      <p className="text-2xl font-bold">Page not found</p>
      <p className="text-xl font-medium text-gray-500">
        please go back to the previous page
      </p>
      <Link href="/">
        <Button className={" bg-[#810B38] w-full rounded-md px-10"}>Go Home</Button>
      </Link>
    </div>
  );
};

export default NotFoundPound;
