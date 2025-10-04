"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

export default function FooterLinks() {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLLIElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div>
      <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
      <ul className="space-y-2 text-gray-400 text-sm text-center md:text-left">
        <li>
          <Link href="/" className="hover:text-white block">
            Home
          </Link>
        </li>

        {/* ✅ Dropdown Shop Link */}
        <li className="relative" ref={dropdownRef}>
          <button
            onClick={() => setOpen(!open)}
            className="w-full flex items-center justify-center md:justify-start gap-1 hover:text-white transition-colors"
          >
            Shop
            <ChevronDown
              size={14}
              className={`transition-transform ${open ? "rotate-180" : ""}`}
            />
          </button>

          {open && (
            <ul className="absolute md:left-0 md:translate-x-0 left-1/2 -translate-x-1/2 mt-2 w-44 bg-gray-900 border border-gray-700 rounded-lg shadow-lg overflow-hidden">
              <li>
                <Link
                  href="/mens"
                  className="block px-4 py-2 text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
                >
                  Men&rsquo;s
                </Link>
              </li>
              <li>
                <Link
                  href="/womens"
                  className="block px-4 py-2 text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
                >
                  Women&rsquo;s
                </Link>
              </li>
            </ul>
          )}
        </li>

        <li>
          <Link href="/about" className="hover:text-white block">
            About Us
          </Link>
        </li>
        <li>
          <Link href="/contact" className="hover:text-white block">
            Contact
          </Link>
        </li>
      </ul>
    </div>
  );
}
