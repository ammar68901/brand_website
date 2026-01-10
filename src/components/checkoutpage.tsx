"use client";

import React, { useState } from "react";
import { useCart } from "@/context/CartContext";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { useRouter } from 'next/navigation';
import toast from "react-hot-toast";



export default function CheckoutPage() {
  const { cart, clearCart } = useCart();
  const router = useRouter();
  const [isLoading, setIsloading] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    customer_name: "",
    address: "",
    city: "",
    postalCode: "",
    number: 0,
  });

  function isValidUrl(str: string): boolean {
    if (typeof str !== "string" || !str.trim()) return false;
    try {
      new URL(str);
      return true;
    } catch {
      return false;
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const placedOrder = async () => {
  try {
    setIsloading(true);
    const payload: { [key: string]: any } = {
      formData: {
        customer_name: formData.customer_name,
        address: formData.address,
        city: formData.city,
        postalCode: formData.postalCode,
        number: formData.number.toString(),
      },
    };

    cart.forEach((item, index) => {
      payload[index] = {
        id: item.id,
        name: item.name,
        price: item.price.toString(),
        quantity: item.quantity,
      };
    });

    const response = await axios.post("/api/orders", payload);

    toast.success("Order placed successfully!");

    //  Form data ko reset karein
    setFormData({
      customer_name: "",
      address: "",
      city: "",
      postalCode: "",
      number: 0,
    });
    if (response.status === 201 && response?.data.success === true){
      router.push('/my-orders');
    }
    clearCart(); //  Cart bhi clear karein
  } catch (error: any) {
    console.error("Order error:", error.response?.data || error.details.message);
    toast.error("Failed to place order check phone number Address postal code.");
  } finally {
    setIsloading(false);
  }
};
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    placedOrder(); //  Form submit ko directly call karein
  };

  const totalPrice = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      {isLoading ? (
        <>Loading</>
      ) : (
        <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-8">
          {/* Billing Form */}

          <div className="lg:col-span-7 bg-white p-8 rounded-2xl shadow-lg">
            <h2 className="text-3xl font-bold mb-6">Billing & Shipping</h2>
            <form className="space-y-5" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <input
                  type="text"
                  name="customer_name"
                  value={formData.customer_name}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-black focus:border-black sm:text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Address
                </label>
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
                  <label className="block text-sm font-medium text-gray-700">
                    City
                  </label>
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
                  <label className="block text-sm font-medium text-gray-700">
                    Postal Code
                  </label>
                  <input
                    type="text"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-black focus:border-black sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Postal Code
                  </label>
                  <input
                    type="number"
                    name="number"
                    value={formData.number}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-black focus:border-black sm:text-sm"
                  />
                </div>
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
                  <div
                    key={item.id}
                    className="flex items-center gap-4 border-b pb-2"
                  >
                    {item.image && isValidUrl(item.image) ? (
                      <Image
                        src={item.image}
                        alt={item.name}
                        width={60}
                        height={60}
                        className="rounded-lg object-cover"
                      />
                    ) : (
                      <div className="w-15 h-15 bg-gray-200 rounded flex items-center justify-center">
                        🖼️
                      </div>
                    )}
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

            <Link
              href="/"
              className="mt-4 block text-center text-sm text-gray-500 hover:underline"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
