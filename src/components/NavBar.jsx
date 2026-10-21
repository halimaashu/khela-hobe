import { getUserData } from "@/lib/getUserData";
import NavBarView from "./NavBarView";

const NavBar = async () => {
  const user = await getUserData();
  return <NavBarView user={user} />;
};

export default NavBar;