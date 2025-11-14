"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewProductPage() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState<number | "">("");
  const [inStock, setInStock] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newProduct = {
      id: Date.now().toString(), // abhi dummy ID
      title,
      price,
      inStock,
    };

    console.log("New product added:", newProduct);

    // Future mein yeh backend par save hoga
    alert("✅ Product added successfully!");

    router.push("/admin/products"); // form submit ke baad list par redirect
  };

  return (
    <div className="max-w-lg bg-white shadow rounded p-6">
      <h2 className="text-2xl font-bold mb-6">Add New Product</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Product Name */}
        <div>
          <label className="block text-sm font-medium mb-1">Product Name</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-indigo-300"
          />
        </div>

        {/* Price */}
        <div>
          <label className="block text-sm font-medium mb-1">Price (PKR)</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            required
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-indigo-300"
          />
        </div>

        {/* Stock */}
        <div>
          <label className="block text-sm font-medium mb-1">In Stock?</label>
          <select
            value={inStock ? "yes" : "no"}
            onChange={(e) => setInStock(e.target.value === "yes")}
            className="w-full border rounded px-3 py-2"
          >
            <option value="yes">Available</option>
            <option value="no">Out of Stock</option>
          </select>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700"
        >
          Save Product
        </button>
      </form>
    </div>
  );
}
