"use client";
// Because its a client side component.
import { AlignJustify } from "lucide-react";

import React from "react";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import Link from "next/link";

export default function Header() {
  const menuItems = [
    {
      label: "Home",
      path: "/",
      show: true,
    },
    {
      label: "Login",
      path: "/sign-in",
      show: true,
    },
    {
      label: "Register",
      path: "/sign-up",
      show: true,
    },
  ];
  return (
    <div>
      <header className="flex h-16 w-full shrink-0 items-center">
        <Sheet>
          <SheetTrigger asChild>
            <Button className="lg:hidden">
              <AlignJustify className="h-6 w-6" />
              <span className="sr-only">Toggle Navigation Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <Link className="mr-6 hidden lg:flex" href={"#"}>
              <h3>JOBQUEST</h3>
            </Link>
            <div className="grid gap-2 py-6">
              {menuItems.map((menuItem, index) =>
                menuItem.show ? (
                  <Link
                    href={menuItem.path}
                    key={index}
                    className="flex w-full items-center py-2 text-lg font-semibold"
                  >
                    {menuItem.label}
                  </Link>
                ) : null
              )}
            </div>
          </SheetContent>
        </Sheet>
        <Link className="hidden lg:flex mr-6" href={"/"}>
          JOBQUEST
        </Link>
        <nav className="ml-auto hidden lg:flex gap-6">
          {menuItems.map((menuItem, index) =>
            menuItem.show ? (
              <Link
                href={menuItem.path}
                key={index}
                className="group inline-flex h-9 w-max items-center rounded-md bg-white px-4 py-2 text-sm font-medium"
              >
                {menuItem.label}
              </Link>
            ) : null
          )}
        </nav>
      </header>
    </div>
  );
}
