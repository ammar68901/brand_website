"use client";

import React, { useState } from "react";

type Order = {
  id: string;
  customer: string;
  total: number;
  status: "Pending" | "Delivered";
};

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([
    { id: "101", customer: "Ali Khan", total: 5000, status: "Pending" },
    { id: "102", customer: "Sara Ahmed", total: 3200, status: "Delivered" },
    { id: "103", customer: "Bilal Hussain", total: 2100, status: "Pending" },
  ]);

  const handleStatusChange = (id: string, newStatus: "Pending" | "Delivered") => {
    setOrders(
      orders.map((order) =>
        order.id === id ? { ...order, status: newStatus } : order
      )
    );
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Orders</h2>

      <table className="w-full bg-white rounded shadow">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-3">Order ID</th>
            <th className="p-3">Customer</th>
            <th className="p-3">Total (PKR)</th>
            <th className="p-3">Status</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id} className="border-t">
              <td className="p-3">{order.id}</td>
              <td className="p-3">{order.customer}</td>
              <td className="p-3">PKR {order.total}</td>
              <td className="p-3">
                <span
                  className={`px-2 py-1 rounded text-sm ${
                    order.status === "Pending"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-green-100 text-green-700"
                  }`}
                >
                  {order.status}
                </span>
              </td>
              <td className="p-3">
                <select
                  value={order.status}
                  onChange={(e) =>
                    handleStatusChange(order.id, e.target.value as "Pending" | "Delivered")
                  }
                  className="border rounded px-2 py-1"
                >
                  <option value="Pending">Pending</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
