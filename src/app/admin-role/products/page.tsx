"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";

type Product = {
  id: string;
  title: string;
  price: number;
  inStock: boolean;
};

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([
    { id: "1", title: "Perfume A", price: 2000, inStock: true },
    { id: "2", title: "Perfume B", price: 2500, inStock: false },
    { id: "3", title: "Perfume C", price: 1800, inStock: true },
  ]);

  useEffect(()=>{
    const fetchallProducts = async()=>{
      try{
        const res = await axios.get("http://localhost:3000/api/perfumes");
        const data = await res.data;
        console.log('Fetched products:', data);
      } catch(e:any){
        console.log('Error fetching products:', e); 
      } 
    }
    fetchallProducts()
  })

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this product?")) {
      setProducts(products.filter((p) => p.id !== id));
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Products</h2>
        <Link
          href="/admin/products/new"
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg shadow hover:bg-indigo-700 transition"
        >
          + Add Product
        </Link>
      </div>

      {/* Products Table */}
      <div className="overflow-x-auto rounded-lg shadow">
        <table className="w-full bg-white border border-gray-200 rounded-lg">
          <thead>
            <tr className="bg-gray-100 text-left text-gray-700 uppercase text-sm">
              <th className="p-3">Name</th>
              <th className="p-3">Price</th>
              <th className="p-3">Stock</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p, index) => (
              <tr
                key={p.id}
                className={`${
                  index % 2 === 0 ? "bg-gray-50" : "bg-white"
                } hover:bg-gray-100 transition`}
              >
                <td className="p-3 font-medium">{p.title}</td>
                <td className="p-3">PKR {p.price}</td>
                <td className="p-3">
                  {p.inStock ? (
                    <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-700 font-medium">
                      Available
                    </span>
                  ) : (
                    <span className="px-2 py-1 text-xs rounded-full bg-red-100 text-red-700 font-medium">
                      Out of Stock
                    </span>
                  )}
                </td>
                <td className="p-3 flex justify-center gap-3">
                  <Link
                    href={`/admin/products/${p.id}`}
                    className="px-3 py-1 text-sm rounded bg-blue-100 text-blue-700 hover:bg-blue-200 transition"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(p.id)}
                    className="px-3 py-1 text-sm rounded bg-red-100 text-red-700 hover:bg-red-200 transition"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

