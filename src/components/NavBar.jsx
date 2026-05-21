import { getUserData } from "@/lib/getUserData";
import { Avatar, Button } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { BiDownArrow } from "react-icons/bi";
import LogOutButton from "../../LogOutButton";

const NavBar = async () => {
 const user =await getUserData();
 console.log(user);
  return (
    <nav className="flex items-center justify-between p-3 shadow-lg">
      <div className="flex items-center gap-1">
        <Image src={"/khela-hobe.png"} alt="Khela Hobe" width={100} height={50} />
        <h1 className="text-2xl font-bold">
        Khela <span className="text-[#810B38]">Hobe</span>
      </h1>
      </div>
      <ul className=" items-center gap-3 font-semibold hidden md:flex">
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
      </ul>

<div className="">{
  user?<div className="flex items-center gap-3 ">
        <Avatar>
          <Avatar.Image
            alt="John Doe"
            referrerPolicy="no-referrer"
            src={user?.image}
          />
          <Avatar.Fallback>{user?.name?.split(" ").map((n) => n[0]).join("")}</Avatar.Fallback>
        </Avatar>
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn m-1">
           profile <BiDownArrow/>
          </div>
          <ul
            tabIndex="-1"
            className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
          >
            <li>
              <a>Item 1</a>
            </li>
            <li>
              <a>Item 2</a>
            </li>
             <LogOutButton/>
          </ul>
         
        </div>
        
      </div>:<div className="flex items-center gap-2">
        <Link href="/login">
          <Button variant="ghost">Login</Button>
        </Link>
        <Link href="/signup">
          <Button className={"bg-[#810B38]"}>Sign Up</Button>
        </Link>
      </div>}</div>
      


      


    </nav>
  );
};

export default NavBar;
