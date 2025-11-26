"use client";

import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

type Product = {
  id: number; // number, kyunki DB se number aata hai
  name: string;
  price: string; // "3040.00" → string (PostgreSQL NUMERIC se aata hai)
  stock: number; // 4 → number (boolean nahi)
  brand?: string;
  category?: string;
  image_url?: string;
};

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]); //  Initial value + type

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const res = await axios.get("/api/perfumes");
        const data: Product[] = res.data; //  Type-safe
        
        setProducts(data); //  State update
      } catch (e: any) {
        toast.error("Error fetching products", e.message);
      }
    };
    fetchAllProducts();
  }, []);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Products</h2>
        <Link
          href="/admin-role/products/new"
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg shadow hover:bg-indigo-700 transition"
        >
          + Add Product
        </Link>
      </div>

      <div className="overflow-x-auto rounded-lg shadow">
        <table className="w-full bg-white border border-gray-200 rounded-lg">
          <thead>
            <tr className="bg-gray-100 text-left text-gray-700 uppercase text-sm">
              <th className="p-3">Image</th>
              <th className="p-3">Name</th>
              <th className="p-3">Price</th>
              <th className="p-3">Stock</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.length > 0 ? (
              products.map((p) => (
                <tr key={p.id} className="hover:bg-gray-100 transition">
                  <td className="p-3 font-medium">
                      
                    {p.image_url ? (
                      <img
                        src={p.image_url}
                        alt={p.name}
                        width={50}
                        height={50}
                        className="object-cover w-12 h-12 rounded"
                      />
                    ) : (
                      <div className="w-12 h-12 bg-gray-200 flex items-center justify-center rounded">
                        <span className="text-gray-500 text-sm">No Image</span>
                      </div>
                    )}
                  </td>
                  <td className="p-3 font-medium">
                    {p.name}
                  </td>
                  <td className="p-3">
                    PKR {Number(p.price).toLocaleString()}
                  </td>
                  <td className="p-3">
                    {p.stock > 0 ? (
                      <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-700 font-medium">
                        Available ({p.stock})
                      </span>
                    ) : (
                      <span className="px-2 py-1 text-xs rounded-full bg-red-100 text-red-700 font-medium">
                        Out of Stock
                      </span>
                    )}
                  </td>
                  <td className="p-3 flex justify-center gap-3">
                    <Link
                      href={`/admin-role/products/${p.id}`}
                      className="px-3 py-1 text-sm rounded bg-blue-100 text-blue-700 hover:bg-blue-200 transition"
                    >
                      Edit
                    </Link>
                    {/* Uncomment when delete is ready */}
                    {/* <button
                      onClick={() => handleDelete(p.id)}
                      className="px-3 py-1 text-sm rounded bg-red-100 text-red-700 hover:bg-red-200 transition"
                    >
                      Delete
                    </button> */}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="p-3 text-center text-gray-500">
                  Loading products...
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
