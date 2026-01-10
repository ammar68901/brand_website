"use client";

import { motion } from "framer-motion";
import { X } from "lucide-react";
import Image from "next/image";
import { CartItem, useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";

type CartSidebarProps = {
  isOpen: boolean;
  onClose: () => void;
};


function isValidUrl(str: string): boolean {
  if (typeof str !== 'string') return false;
  try {
    new URL(str);
    return true;
  } catch {
    return false;
  }
}


export default function CartSidebar({ isOpen, onClose }: CartSidebarProps) {
  const { cart, removeFromCart, clearCart } = useCart();
  const router = useRouter();

  // Function to handle Checkout / Clear Cart actions
  const handleSidebarAction = (action: () => void, navigateTo?: string) => {
    action();         // perform the action
    onClose();        // auto-close sidebar
    if (navigateTo) router.push(navigateTo); // navigate if needed
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: isOpen ? 0 : "100%" }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", stiffness: 120, damping: 20 }}
        className="fixed top-0 right-0 h-full w-80 sm:w-96 bg-white shadow-2xl z-50 p-6 flex flex-col"
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-6 border-b pb-2">
          <h2 className="text-xl font-bold text-gray-900">Your Cart</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-200 transition"
          >
            <X className="w-6 h-6 text-gray-700" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto space-y-4">
          {cart.length === 0 ? (
            <p className="text-gray-500 text-center mt-10">Your cart is empty.</p>
          ) : (
            cart.map((item: CartItem, i) => (
              <div
                key={i}
                className="flex items-center justify-between border-b pb-3"
              >
                <div className="flex items-center gap-3">
                  {item.image && isValidUrl(item.image) ? (
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={80}
                      height={80}
                      className="rounded object-cover"
                    />
                  ) : (
                    <div className="w-20 h-20 bg-gray-200 rounded flex items-center justify-center">
                      🖼️
                    </div>
                  )}
                  <div>
                    <p className="font-medium text-gray-900">{item.name}</p>
                    <p className="text-sm text-gray-500">
                      {item.quantity} × Rs.{item.price.toLocaleString()}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-500 text-sm hover:underline transition"
                >
                  Remove
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="mt-4 space-y-3 border-t pt-4">
            <button
              onClick={() => handleSidebarAction(clearCart)}
              className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition"
            >
              Clear Cart
            </button>
            <button
              onClick={() => handleSidebarAction(() => { }, "/checkout")}
              className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition"
            >
              Checkout
            </button>
          </div>
        )}
      </motion.div>
    </>
  );
}

