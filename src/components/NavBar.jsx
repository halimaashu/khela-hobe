import { getUserData } from "@/lib/getUserData";
import { NavBarView } from "./NavBarView";
import React from "react";

const NavBar = async () => {
  // Fetching Server Data cleanly without dealing with Client DOM State conflicts
  const user = await getUserData();

  return <NavBarView user={user} />;
};

export default NavBar;