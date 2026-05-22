import { getUserData } from "@/lib/getUserData";
import { Avatar, Button } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { BiDownArrow } from "react-icons/bi";
import LogOutButton from "./LogOutButton";
import { ThemeSwitch } from "./ThemeSwitch";



const NavBar = async () => {
  const user = await getUserData();
  console.log(user);
  return (
    <nav className="flex items-center justify-between p-3 shadow-lg">
      <div className="flex items-center gap-1">
        <Image
          src={"/khela-hobe.png"}
          alt="Khela Hobe"
          width={100}
          height={50}
        />
        <h1 className="text-2xl font-bold">
          Khela <span className="text-[#810B38]">Hobe</span>
        </h1>
      </div>
      <ul className="hidden items-center gap-3 font-semibold  md:flex">
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/all-facility">All Facility</Link>
        </li>
       <h1><ThemeSwitch/></h1>
      </ul>

      <div className="hidden md:flex flex-col">
        {user ? (
          <div className="flex items-center gap-3 ">
            <Avatar>
              <Avatar.Image
                alt="John Doe"
                referrerPolicy="no-referrer"
                src={user?.image}
              />
              <Avatar.Fallback>
                {user?.name
                  ?.split(" ")
                  .map((n) => n[0])
                  .join("")}
              </Avatar.Fallback>
            </Avatar>
            <div className=" dropdown dropdown-end">
              <div tabIndex={0} role="button" className=" m-1">
                <BiDownArrow />
              </div>
              <ul
                tabIndex="-1"
                className="dropdown-content menu  rounded-box z-1 w-52 p-2 shadow-sm"
              >
                <li>
                  <Link href="/add-facility">Add Facility</Link>
                </li>
                <li>
                  <Link href="/bookings">bookings</Link>
                </li>
                <li>
                  <Link href="/">Manage My Facilities</Link>
                </li>
                <li>
                  <LogOutButton />
                </li>
              </ul>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Link href="/login">
              <Button variant="ghost">Login</Button>
            </Link>
            <Link href="/signup">
              <Button className={"bg-[#810B38]"}>Sign Up</Button>
            </Link>
          </div>
        )}
      </div>
      <div className="flex flex-col md:hidden">
        {user ? (
          <div className="flex items-center gap-3 ">
            <Avatar>
              <Avatar.Image
                alt="John Doe"
                referrerPolicy="no-referrer"
                src={user?.image}
              />
              <Avatar.Fallback>
                {user?.name
                  ?.split(" ")
                  .map((n) => n[0])
                  .join("")}
              </Avatar.Fallback>
            </Avatar>
            <div className=" dropdown dropdown-end">
              <div tabIndex={0} role="button" className=" m-1">
                <BiDownArrow />
              </div>
              <ul
                tabIndex="-1"
                className="dropdown-content menu  rounded-box z-1 w-52 p-2 shadow-sm"
              >
                <li>
                  <Link href="/">Home</Link>
                </li>
                <li>
                  <Link href="/all-facility">All Facility</Link>
                </li>
                <li>
                  <Link href="/add-facility">Add Facility</Link>
                </li>
                <li>
                  <Link href="/bookings">bookings</Link>
                </li>
                <li>
                  <Link href="/manage-facilities">Manage My Facilities</Link>
                </li>
                <LogOutButton />
              </ul>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Link href="/login">
              <Button variant="ghost">Login</Button>
            </Link>
            <Link href="/signup">
              <Button className={"bg-[#810B38]"}>Sign Up</Button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
