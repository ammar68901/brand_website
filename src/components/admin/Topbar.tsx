"use client";

import React from "react";

export default function Topbar() {
  return (
    <header className="bg-white shadow px-6 py-4 flex justify-between items-center">
      <h1 className="text-xl font-semibold">Dashboard</h1>
      <div className="text-sm text-gray-600">Hello, Admin 👋</div>
    </header>
  );
}
