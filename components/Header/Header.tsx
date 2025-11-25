import Link from "next/link";
import React from "react";
import { PowerCircle } from "lucide-react";
import { Button } from "../ui/button";

const navItems = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Services", path: "/services" },
  { label: "Our Benefits", path: "/OurBenefit" },
];

const Header = () => {
  return (
    <div>
      <header className="flex w-full justify-between h-fit py-2 rounded-3xl items-center mt-2 px-2 max-w-7xl bg-white">
        <div className="bg-blue-700 p-2 w-fit rounded-full aspect-square">
          <PowerCircle className="h-4 w-4" />
        </div>
        <ul className="flex gap-4">
          {navItems.map((item) => (
            <li key={item.path}>
              <a
                className="text-bold font-inter text-black/40 hover:text-blue-700 transition-all"
                href={item.path}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
        <Button className="bg-blue-500">
          {" "}
          <Link
            className="text-bold font-inter text-white hover:text-white/40 transition-all"
            href="/contact"
          >
            Contact Us
          </Link>
        </Button>
      </header>
    </div>
  );
};

export default Header;
