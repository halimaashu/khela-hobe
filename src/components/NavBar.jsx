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
  BiMenu,
  BiX,
  BiUserCircle
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
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
        <div className="flex items-center justify-between h-14 sm:h-16">
          
          {/* Logo Section - Responsive sizing */}
          <Link href="/" className="flex items-center gap-1.5 sm:gap-2 group flex-shrink-0">
            <div className="relative w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 overflow-hidden rounded-lg">
              <Image
                src="/khela-hobe.png"
                alt="Khela Hobe"
                fill
                className="object-contain transition-transform group-hover:scale-105"
                priority
              />
            </div>
            <div className="flex items-baseline">
              <span className="text-base sm:text-lg lg:text-xl font-bold tracking-tight">
                Khela <span className="text-primary">Hobe</span>
              </span>
            </div>
          </Link>

          {/* Desktop Navigation - hidden on mobile/tablet */}
          <div className="hidden lg:flex items-center gap-4 xl:gap-6">
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
              <div className="flex items-center gap-2 xl:gap-3">
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
                      <div className="hidden xl:flex flex-col items-start">
                        <span className="text-sm font-medium truncate max-w-[100px]">
                          {user?.name || "User"}
                        </span>
                        <span className="text-xs text-foreground/50 capitalize">
                          {user?.role || "Member"}
                        </span>
                      </div>
                      <BiDownArrow className="text-foreground/40 group-hover:text-foreground transition-colors text-xs" />
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
                  <Button variant="light" size="sm" className="font-medium text-sm">
                    Log In
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button color="primary" size="sm" className="font-medium text-sm">
                    Sign Up
                  </Button>
                </Link>
                <ThemeSwitch />
              </div>
            )}
          </div>

          {/* Mobile & Tablet Navigation - visible on smaller screens */}
          <div className="flex lg:hidden items-center gap-1.5 sm:gap-2">
            {/* Theme switch for mobile */}
            <div className="hidden xs:block">
              <ThemeSwitch />
            </div>
            
            {/* User avatar for mobile (when logged in) */}
            {user && (
              <div className="block lg:hidden">
                <Dropdown placement="bottom-end">
                  <DropdownTrigger>
                    <Avatar
                      size="sm"
                      className="cursor-pointer ring-2 ring-transparent hover:ring-primary/50 transition-all"
                    >
                      <Avatar.Image
                        alt={user?.name || "User"}
                        referrerPolicy="no-referrer"
                        src={user?.image}
                      />
                      <Avatar.Fallback className="bg-primary/10 text-primary text-xs">
                        {user?.name
                          ?.split(" ")
                          .map((n) => n[0])
                          .join("")
                          .toUpperCase() || "U"}
                      </Avatar.Fallback>
                    </Avatar>
                  </DropdownTrigger>
                  <DropdownMenu 
                    variant="flat"
                    aria-label="Mobile user menu"
                    className="min-w-[200px] p-1"
                  >
                    <DropdownItem key="mobile-profile" className="gap-2">
                      <Link href="/profile" className="flex items-center gap-2">
                        <BiUser className="text-lg" />
                        Profile
                      </Link>
                    </DropdownItem>
                    <DropdownItem key="mobile-divider1" className="h-0.5 my-1 bg-divider" />
                    
                    {navItems.map((item) => (
                      <DropdownItem key={item.href} className="gap-2">
                        <Link href={item.href} className="flex items-center gap-2">
                          <item.icon className="text-lg" />
                          {item.label}
                        </Link>
                      </DropdownItem>
                    ))}
                    
                    {userNavItems.map((item) => (
                      <DropdownItem key={item.href} className="gap-2">
                        <Link href={item.href} className="flex items-center gap-2">
                          <item.icon className="text-lg" />
                          {item.label}
                        </Link>
                      </DropdownItem>
                    ))}
                    
                    <DropdownItem key="mobile-divider2" className="h-0.5 my-1 bg-divider" />
                    <DropdownItem key="mobile-theme" className="gap-2">
                      <div className="flex items-center justify-between w-full">
                        <span>Theme</span>
                        <ThemeSwitch />
                      </div>
                    </DropdownItem>
                    <DropdownItem key="mobile-logout" className="gap-2 text-danger">
                      <LogOutButton />
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </div>
            )}

            {/* Mobile Menu Dropdown - for non-logged in users */}
            {!user && (
              <Dropdown placement="bottom-end">
                <DropdownTrigger>
                  <Button 
                    isIconOnly 
                    variant="light" 
                    size="sm"
                    className="text-foreground/70 hover:text-foreground"
                  >
                    <BiMenu className="text-xl sm:text-2xl" />
                  </Button>
                </DropdownTrigger>
                <DropdownMenu 
                  variant="flat"
                  aria-label="Mobile menu"
                  className="min-w-[220px] sm:min-w-[250px] p-1"
                >
                  {navItems.map((item) => (
                    <DropdownItem key={item.href} className="gap-2">
                      <Link href={item.href} className="flex items-center gap-2">
                        <item.icon className="text-lg" />
                        {item.label}
                      </Link>
                    </DropdownItem>
                  ))}
                  
                  <DropdownItem key="mobile-divider3" className="h-0.5 my-1 bg-divider" />
                  
                  <DropdownItem key="mobile-login" className="gap-2">
                    <Link href="/login" className="flex items-center gap-2">
                      <BiUserCircle className="text-lg" />
                      Log In
                    </Link>
                  </DropdownItem>
                  <DropdownItem key="mobile-signup" className="gap-2">
                    <Link href="/signup" className="flex items-center gap-2 text-primary">
                      <BiUser className="text-lg" />
                      Sign Up
                    </Link>
                  </DropdownItem>
                  
                  <DropdownItem key="mobile-divider4" className="h-0.5 my-1 bg-divider" />
                  <DropdownItem key="mobile-theme-menu" className="gap-2">
                    <div className="flex items-center justify-between w-full">
                      <span>Theme</span>
                      <ThemeSwitch />
                    </div>
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;