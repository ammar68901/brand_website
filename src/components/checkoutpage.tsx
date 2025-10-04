"use client";

import React, { useState } from "react";
import { useCart } from "@/context/CartContext";
import Image from "next/image";
import Link from "next/link";

export default function CheckoutPage() {
  const { cart, clearCart } = useCart();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Order placed successfully!");
    clearCart();
  };

  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-8">
        {/* Billing Form */}
        <div className="lg:col-span-7 bg-white p-8 rounded-2xl shadow-lg">
          <h2 className="text-3xl font-bold mb-6">Billing & Shipping</h2>
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium text-gray-700">Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-black focus:border-black sm:text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-black focus:border-black sm:text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Address</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-black focus:border-black sm:text-sm"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">City</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-black focus:border-black sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Postal Code</label>
                <input
                  type="text"
                  name="postalCode"
                  value={formData.postalCode}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-black focus:border-black sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Country</label>
              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-black focus:border-black sm:text-sm"
              />
            </div>

            <button
              type="submit"
              className="w-full mt-4 bg-black text-white py-3 rounded-lg font-semibold text-lg hover:bg-gray-900 transition-colors"
            >
              Place Order
            </button>
          </form>
        </div>

        {/* Cart Summary Sidebar */}
        <div className="lg:col-span-5 bg-white p-8 rounded-2xl shadow-lg flex flex-col">
          <h2 className="text-2xl font-bold mb-6">Order Summary</h2>
          <div className="flex-1 overflow-y-auto space-y-4">
            {cart.length === 0 ? (
              <p className="text-gray-500">Your cart is empty.</p>
            ) : (
              cart.map((item) => (
                <div key={item.id} className="flex items-center gap-4 border-b pb-2">
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={60}
                    height={60}
                    className="rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{item.name}</p>
                    <p className="text-sm text-gray-500">
                      {item.quantity} × Rs.{item.price.toLocaleString()}
                    </p>
                  </div>
                  <p className="font-semibold text-gray-900">
                    Rs.{(item.price * item.quantity).toLocaleString()}
                  </p>
                </div>
              ))
            )}
          </div>

          {/* Total & Clear Cart */}
          {cart.length > 0 && (
            <div className="mt-6 space-y-3">
              <div className="flex justify-between font-bold text-lg">
                <span>Total:</span>
                <span>Rs.{totalPrice.toLocaleString()}</span>
              </div>
              <button
                onClick={clearCart}
                className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600"
              >
                Clear Cart
              </button>
            </div>
          )}

          <Link href="/" className="mt-4 block text-center text-sm text-gray-500 hover:underline">
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
