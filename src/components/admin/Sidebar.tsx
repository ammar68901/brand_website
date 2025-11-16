"use client";

import React from "react";
import Link from "next/link";

export default function Sidebar() {
  const items = [
    { href: "/admin-role", label: "Dashboard" },
    { href: "/admin-role/products", label: "Products" },
    { href: "/admin-role/orders", label: "Orders" },
    { href: "/admin-role/customers", label: "Customers" },
  ];

  return (
    <aside className="w-64 bg-white shadow-md min-h-screen p-4">
      <h2 className="text-2xl font-bold mb-6">Admin</h2>
      <nav className="flex flex-col gap-2">
        {items.map((it) => (
          <Link
            key={it.href}
            href={it.href}
            className="px-3 py-2 rounded hover:bg-gray-200"
          >
            {it.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
