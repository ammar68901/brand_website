"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";

export default function EditProductPage() {
  const { id } = useParams();
  const router = useRouter();

  // Dummy initial data (future mein API se fetch hoga)
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState<number | "">("");
  const [inStock, setInStock] = useState(true);

  useEffect(() => {
    // ⚡ Future mein backend se fetch by id
    // Abhi dummy fill
    setTitle("Perfume " + id);
    setPrice(2500);
    setInStock(true);
  }, [id]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const updatedProduct = {
      id,
      title,
      price,
      inStock,
    };

    console.log("Updated Product:", updatedProduct);
    alert("✅ Product updated successfully!");
    router.push("/admin/products");
  };

  return (
    <div className="max-w-xl mx-auto bg-white shadow-lg rounded-xl p-8">
      <h2 className="text-3xl font-bold mb-6 text-center text-indigo-700">
        ✏️ Edit Product
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Product Name */}
        <div>
          <label className="block text-sm font-semibold mb-2">
            Product Name
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full border-2 rounded-lg px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            placeholder="Enter product name"
          />
          <p className="text-xs text-gray-500 mt-1">
            Example: Perfume A, Perfume B
          </p>
        </div>

        {/* Price */}
        <div>
          <label className="block text-sm font-semibold mb-2">Price (PKR)</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            required
            className="w-full border-2 rounded-lg px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            placeholder="Enter price in PKR"
          />
          <p className="text-xs text-gray-500 mt-1">Only numeric values</p>
        </div>

        {/* Stock */}
        <div>
          <label className="block text-sm font-semibold mb-2">Stock Status</label>
          <select
            value={inStock ? "yes" : "no"}
            onChange={(e) => setInStock(e.target.value === "yes")}
            className="w-full border-2 rounded-lg px-4 py-3 text-lg bg-white focus:outline-none focus:ring-2 focus:ring-indigo-400"
          >
            <option value="yes">✅ Available</option>
            <option value="no">❌ Out of Stock</option>
          </select>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white text-lg font-semibold py-3 rounded-lg shadow hover:bg-indigo-700 transition"
        >
          💾 Update Product
        </button>
      </form>
    </div>
  );
}

