"use client";

import React, { useState } from "react";

type Customer = {
  id: string;
  name: string;
  email: string;
  orders: number;
};

export default function CustomersPage() {
  const [customers] = useState<Customer[]>([
    { id: "1", name: "Ali Khan", email: "ali@example.com", orders: 3 },
    { id: "2", name: "Sara Ahmed", email: "sara@example.com", orders: 5 },
    { id: "3", name: "Bilal Hussain", email: "bilal@example.com", orders: 2 },
  ]);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Customers</h2>

      <table className="w-full bg-white rounded shadow">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-3">Name</th>
            <th className="p-3">Email</th>
            <th className="p-3">Total Orders</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <tr key={customer.id} className="border-t">
              <td className="p-3">{customer.name}</td>
              <td className="p-3">{customer.email}</td>
              <td className="p-3">{customer.orders}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
