import { useState } from "react";
import emsiLogo from "@/assets/Emsi-logo-colorless.svg";
import { ALink } from "@/layout/ALink";
import { Button } from "@/layout/Button";
import { Input } from "@/layout/Input";
import { Navlink } from "@/layout/Navlink";

const SearchIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="11" cy="11" r="8"></circle>
    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
  </svg>
);

const MenuIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="3" y1="12" x2="21" y2="12"></line>
    <line x1="3" y1="6" x2="21" y2="6"></line>
    <line x1="3" y1="18" x2="21" y2="18"></line>
  </svg>
);

const CloseIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-[#ccd0da] bg-[#eff1f5]/80 backdrop-blur-md dark:border-[#313244] dark:bg-[#11111b]/90">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          <div className="flex shrink-0 items-center">
            <ALink
              to="/"
              variant="base"
              className="flex items-center justify-center p-1 transition-transform hover:scale-105"
            >
              <img
                src={emsiLogo}
                alt="EMSI Logo"
                className="h-10 w-auto object-contain brightness-110 contrast-125 dark:invert dark:sepia-[.20] dark:hue-rotate-[200deg] dark:brightness-200"
              />
            </ALink>
          </div>

          <div className="hidden md:flex md:items-center md:gap-6">
            <Navlink to="/">Components</Navlink>
            <Navlink to="/docs">Documentation</Navlink>
            <Navlink to="/blog">Blog</Navlink>
          </div>

          <div className="hidden md:flex md:items-center md:gap-4 flex-1 justify-end">
            <div className="w-64">
              <Input
                type="text"
                placeholder="Search documentation..."
                inputSize="sm"
                iconLeft={SearchIcon}
                fullWidth
              />
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm">
                Log in
              </Button>
              <Button variant="primary" size="sm">
                Sign up
              </Button>
            </div>
          </div>

          <div className="flex items-center md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? CloseIcon : MenuIcon}
            </Button>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-[#ccd0da] dark:border-[#313244] bg-[#eff1f5] dark:bg-[#1e1e2e]">
          <div className="space-y-1 px-4 pb-3 pt-2">
            <div className="block py-2">
              <Navlink to="/components">Components</Navlink>
            </div>
            <div className="block py-2">
              <Navlink to="/docs">Documentation</Navlink>
            </div>
            <div className="block py-2">
              <Navlink to="/blog">Blog</Navlink>
            </div>
          </div>
          <div className="border-t border-[#ccd0da] dark:border-[#313244] p-4 space-y-4">
            <Input
              type="text"
              placeholder="Search..."
              inputSize="md"
              iconLeft={SearchIcon}
              fullWidth
            />
            <div className="flex flex-col gap-2">
              <Button variant="ghost" fullWidth>
                Log in
              </Button>
              <Button variant="primary" fullWidth>
                Sign up
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
