"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Avatar, Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@heroui/react";
import { 
  BiDownArrow, 
  BiHome, 
  BiBuilding, 
  BiPlus, 
  BiBook, 
  BiBriefcase,
  BiUser,
  BiMenu,
  BiX
} from "react-icons/bi";
import LogOutButton from "./LogOutButton";
import { ThemeSwitch } from "./ThemeSwitch";

export const NavBarView = ({ user = null }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
    <nav className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur-md border-b border-divider shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo Section */}
          <Link href="/" className="flex items-center gap-2 group flex-shrink-0 z-50">
            <div className="relative w-9 h-9 overflow-hidden rounded-lg">
              <Image
                src="/khela-hobe.png"
                alt="Khela Hobe"
                fill
                className="object-contain transition-transform group-hover:scale-105"
                priority
              />
            </div>
            <span className="text-lg md:text-xl font-bold tracking-tight text-foreground">
              Khela <span className="text-primary">Hobe</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-6">
            <ul className="flex items-center gap-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="px-3 py-2 rounded-xl text-sm font-medium text-foreground/70 hover:text-foreground hover:bg-content2 transition-all duration-200 flex items-center gap-1.5"
                    >
                      <Icon className="text-base" />
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>

            <div className="w-px h-5 bg-divider" />

            {/* Desktop Profiles/Auth */}
            <div className="flex items-center gap-4">
              <ThemeSwitch />
              {user ? (
                <Dropdown placement="bottom-end" backdrop="blur">
                  <DropdownTrigger>
                    <div className="flex items-center gap-2 cursor-pointer group py-1.5 px-2 rounded-xl hover:bg-content2 transition-colors">
                      <Avatar
                        size="sm"
                        name={user?.name || undefined}
                        src={user?.image || undefined}
                        className="ring-2 ring-transparent transition-all group-hover:ring-primary/50"
                      />
                      <div className="flex flex-col items-start max-w-[120px]">
                        <span className="text-sm font-medium truncate w-full">
                          {user?.name || "User"}
                        </span>
                        <span className="text-xs text-foreground/50 capitalize">
                          {user?.role || "Member"}
                        </span>
                      </div>
                      <BiDownArrow className="text-foreground/40 group-hover:text-foreground transition-colors text-[10px]" />
                    </div>
                  </DropdownTrigger>
                  
                  {/* FIX applied: Ensuring strict usage of DropdownItem structures for all navigation elements */}
                  <DropdownMenu variant="flat" aria-label="User menu container" className="w-56">
                    <DropdownItem key="profile" startContent={<BiUser className="text-lg" />}>
                      <Link href="/profile" className="w-full h-full block">Profile</Link>
                    </DropdownItem>
                    
                    {userNavItems.map((item) => {
                      const Icon = item.icon;
                      return (
                        <DropdownItem key={item.href} startContent={<Icon className="text-lg" />}>
                          <Link href={item.href} className="w-full h-full block">{item.label}</Link>
                        </DropdownItem>
                      );
                    })}
                    
                    <DropdownItem key="logout" className="text-danger" color="danger">
                      <div className="w-full h-full">
                        <LogOutButton />
                      </div>
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              ) : (
                <div className="flex items-center gap-2">
                  <Button as={Link} href="/login" variant="light" size="sm" className="font-medium text-sm rounded-xl">
                    Log In
                  </Button>
                  <Button as={Link} href="/signup" color="primary" size="sm" className="font-medium text-sm rounded-xl shadow-md shadow-primary/20">
                    Sign Up
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Hamburger Icon Toggle */}
          <div className="flex lg:hidden items-center gap-3">
            <ThemeSwitch />
            <Button
              isIconOnly
              variant="light"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-foreground/80 z-50 rounded-xl"
              aria-label="Toggle navigation menu"
            >
              {isMenuOpen ? <BiX className="text-2xl" /> : <BiMenu className="text-2xl" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Slide down Native Mobile / Tablet Drawer Overlay */}
      <div 
        className={`absolute top-full left-0 w-full bg-background border-b border-divider shadow-xl transition-all duration-300 ease-in-out transform origin-top lg:hidden ${
          isMenuOpen ? "opacity-100 scale-y-100 visible" : "opacity-0 scale-y-95 invisible pointer-events-none"
        }`}
      >
        <div className="px-4 pt-3 pb-6 space-y-3 max-h-[calc(100vh-4rem)] overflow-y-auto">
          {user && (
            <div className="flex items-center gap-3 p-3 bg-content2/50 rounded-xl mb-2">
              <Avatar
                size="md"
                name={user?.name || undefined}
                src={user?.image || undefined}
              />
              <div>
                <h4 className="text-sm font-semibold text-foreground">{user?.name || "User"}</h4>
                <p className="text-xs text-foreground/50 capitalize">{user?.role || "Member"}</p>
              </div>
            </div>
          )}

          {/* Standard Navigation Options */}
          <div className="space-y-1">
            <p className="text-xs font-semibold text-foreground/40 uppercase tracking-wider px-3 mb-1">Navigation</p>
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-base font-medium text-foreground/80 hover:text-foreground hover:bg-content2 transition-all"
                >
                  <Icon className="text-xl text-primary" />
                  {item.label}
                </Link>
              );
            })}
          </div>

          {/* Logged In Features Wrapper */}
          {user && (
            <div className="space-y-1 pt-2 border-t border-divider">
              <p className="text-xs font-semibold text-foreground/40 uppercase tracking-wider px-3 mb-1">Workspace</p>
              <Link
                href="/profile"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-base font-medium text-foreground/80 hover:text-foreground hover:bg-content2 transition-all"
              >
                <BiUser className="text-xl text-primary" />
                Profile
              </Link>
              {userNavItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-base font-medium text-foreground/80 hover:text-foreground hover:bg-content2 transition-all"
                  >
                    <Icon className="text-xl text-primary" />
                    {item.label}
                  </Link>
                );
              })}
              <div className="pt-2 px-3">
                <LogOutButton />
              </div>
            </div>
          )}

          {/* Logged Out Guest CTA Buttons */}
          {!user && (
            <div className="grid grid-cols-2 gap-2 pt-4 border-t border-divider">
              <Button as={Link} href="/login" onClick={() => setIsMenuOpen(false)} variant="bordered" className="w-full font-medium rounded-xl">
                Log In
              </Button>
              <Button as={Link} href="/signup" onClick={() => setIsMenuOpen(false)} color="primary" className="w-full font-medium rounded-xl">
                Sign Up
              </Button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBarView;