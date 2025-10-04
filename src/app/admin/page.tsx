"use client";

import React, { useEffect, useState } from "react";

export default function AdminPage() {
  const [counts, setCounts] = useState({
    products: 0,
    orders: 0,
    customers: 0,
  });

  useEffect(() => {
    // 👇 Future mein backend se fetch hoga
    setCounts({
      products: 12,
      orders: 5,
      customers: 8,
    });
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Overview</h2>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded shadow">
          <p className="text-gray-500 text-sm">Products</p>
          <h3 className="text-2xl font-bold">{counts.products}</h3>
        </div>

        <div className="bg-white p-6 rounded shadow">
          <p className="text-gray-500 text-sm">Orders</p>
          <h3 className="text-2xl font-bold">{counts.orders}</h3>
        </div>

        <div className="bg-white p-6 rounded shadow">
          <p className="text-gray-500 text-sm">Customers</p>
          <h3 className="text-2xl font-bold">{counts.customers}</h3>
        </div>
      </div>
    </div>
  );
}

