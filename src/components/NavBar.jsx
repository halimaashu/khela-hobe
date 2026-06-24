import { getUserData } from "@/lib/getUserData";
import { Avatar, Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { 
  BiDownArrow, 
  BiHome, 
  BiBuilding, 
  BiPlus, 
  BiBook, 
  BiBriefcase,
  BiLogOut,
  BiUser,
  BiMenu 
} from "react-icons/bi";
import LogOutButton from "./LogOutButton";
import { ThemeSwitch } from "./ThemeSwitch";

const NavBar = async () => {
  const user = await getUserData();

  // Navigation items for better maintainability
  const navItems = [
    { href: "/", label: "Home", icon: BiHome },
    { href: "/all-facility", label: "All Facilities", icon: BiBuilding },
  ];

  const userNavItems = [
    { href: "/add-facility", label: "Add Facility", icon: BiPlus },
    { href: "/bookings", label: "My Bookings", icon: BiBook },
    { href: "/manage-facilities", label: "Manage Facilities", icon: BiBriefcase },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-divider shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo Section */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="relative w-10 h-10 overflow-hidden rounded-lg">
              <Image
                src="/khela-hobe.png"
                alt="Khela Hobe"
                fill
                className="object-contain transition-transform group-hover:scale-105"
              />
            </div>
            <div className="flex items-baseline">
              <span className="text-xl font-bold tracking-tight">
                Khela <span className="text-primary">Hobe</span>
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {/* Main Nav Links */}
            <ul className="flex items-center gap-1">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="px-3 py-2 rounded-lg text-sm font-medium text-foreground/70 hover:text-foreground hover:bg-content2 transition-all duration-200"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="w-px h-6 bg-divider" />

            {/* User Section */}
            {user ? (
              <div className="flex items-center gap-3">
                <Dropdown placement="bottom-end">
                  <DropdownTrigger>
                    <div className="flex items-center gap-2 cursor-pointer group">
                      <Avatar
                        size="sm"
                        className="ring-2 ring-transparent transition-all group-hover:ring-primary/50"
                      >
                        <Avatar.Image
                          alt={user?.name || "User"}
                          referrerPolicy="no-referrer"
                          src={user?.image}
                        />
                        <Avatar.Fallback className="bg-primary/10 text-primary">
                          {user?.name
                            ?.split(" ")
                            .map((n) => n[0])
                            .join("")
                            .toUpperCase() || "U"}
                        </Avatar.Fallback>
                      </Avatar>
                      <div className="flex flex-col items-start">
                        <span className="text-sm font-medium truncate max-w-[100px]">
                          {user?.name || "User"}
                        </span>
                        <span className="text-xs text-foreground/50">
                          {user?.role || "Member"}
                        </span>
                      </div>
                      <BiDownArrow className="text-foreground/40 group-hover:text-foreground transition-colors" />
                    </div>
                  </DropdownTrigger>
                  <DropdownMenu 
                    variant="flat"
                    aria-label="User menu"
                    className="min-w-[200px] p-1"
                  >
                    <DropdownItem key="profile" className="gap-2">
                      <Link href="/profile" className="flex items-center gap-2">
                        <BiUser className="text-lg" />
                        Profile
                      </Link>
                    </DropdownItem>
                    <DropdownItem key="divider1" className="h-0.5 my-1 bg-divider" />
                    
                    {userNavItems.map((item) => (
                      <DropdownItem key={item.href} className="gap-2">
                        <Link href={item.href} className="flex items-center gap-2">
                          <item.icon className="text-lg" />
                          {item.label}
                        </Link>
                      </DropdownItem>
                    ))}
                    
                    <DropdownItem key="divider2" className="h-0.5 my-1 bg-divider" />
                    <DropdownItem key="theme" className="gap-2">
                      <div className="flex items-center justify-between w-full">
                        <span>Theme</span>
                        <ThemeSwitch />
                      </div>
                    </DropdownItem>
                    <DropdownItem key="logout" className="gap-2 text-danger">
                      <LogOutButton />
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link href="/login">
                  <Button variant="light" size="sm" className="font-medium">
                    Log In
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button color="primary" size="sm" className="font-medium">
                    Sign Up
                  </Button>
                </Link>
                <ThemeSwitch />
              </div>
            )}
          </div>

          {/* Mobile Navigation */}
          <div className="flex md:hidden items-center gap-2">
            {!user && <ThemeSwitch />}
            
            <Dropdown placement="bottom-end">
              <DropdownTrigger>
                <Button 
                  isIconOnly 
                  variant="light" 
                  size="sm"
                  className="text-foreground/70 hover:text-foreground"
                >
                  <BiMenu className="text-2xl" />
                </Button>
              </DropdownTrigger>
              <DropdownMenu 
                variant="flat"
                aria-label="Mobile menu"
                className="min-w-[250px] p-1"
              >
                {/* Main Nav Links */}
                {navItems.map((item) => (
                  <DropdownItem key={item.href} className="gap-2">
                    <Link href={item.href} className="flex items-center gap-2">
                      <item.icon className="text-lg" />
                      {item.label}
                    </Link>
                  </DropdownItem>
                ))}

                {user && (
                  <>
                    <DropdownItem key="divider3" className="h-0.5 my-1 bg-divider" />
                    
                    {/* User Profile Info */}
                    <DropdownItem key="user-info" className="gap-2 cursor-default">
                      <div className="flex items-center gap-2">
                        <Avatar size="sm">
                          <Avatar.Image
                            alt={user?.name || "User"}
                            referrerPolicy="no-referrer"
                            src={user?.image}
                          />
                          <Avatar.Fallback className="bg-primary/10 text-primary">
                            {user?.name
                              ?.split(" ")
                              .map((n) => n[0])
                              .join("")
                              .toUpperCase() || "U"}
                          </Avatar.Fallback>
                        </Avatar>
                        <div className="flex flex-col">
                          <span className="text-sm font-medium">{user?.name}</span>
                          <span className="text-xs text-foreground/50">{user?.email}</span>
                        </div>
                      </div>
                    </DropdownItem>

                    <DropdownItem key="divider4" className="h-0.5 my-1 bg-divider" />

                    {userNavItems.map((item) => (
                      <DropdownItem key={item.href} className="gap-2">
                        <Link href={item.href} className="flex items-center gap-2">
                          <item.icon className="text-lg" />
                          {item.label}
                        </Link>
                      </DropdownItem>
                    ))}
                  </>
                )}

                {user && (
                  <>
                    <DropdownItem key="divider5" className="h-0.5 my-1 bg-divider" />
                    <DropdownItem key="theme-mobile" className="gap-2">
                      <div className="flex items-center justify-between w-full">
                        <span>Theme</span>
                        <ThemeSwitch />
                      </div>
                    </DropdownItem>
                    <DropdownItem key="logout-mobile" className="gap-2 text-danger">
                      <LogOutButton />
                    </DropdownItem>
                  </>
                )}
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;