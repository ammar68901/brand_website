"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

export default function ShopDropdown() {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Shop Button */}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1 text-black hover:text-gray-600 font-medium transition-colors duration-200"
      >
        Shop
        <ChevronDown
          size={16}
          className={`transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {/* Dropdown Menu */}
      {open && (
        <div className="absolute top-full left-0 mt-3 w-48 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden animate-fadeIn">
          <Link
            href="/mens"
            className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
          >
            Men&rsquo;s
          </Link>
          <Link
            href="/womens"
            className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
          >
            Women&rsquo;s
          </Link>
        </div>
      )}

      {/* Animation Keyframes */}
      <style jsx>{`
        @keyframes fadeIn {
          0% {
            opacity: 0;
            transform: translateY(-10px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.25s ease-out;
        }
      `}</style>
    </div>
  );
}
