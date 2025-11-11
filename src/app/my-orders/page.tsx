'use client';

import MyOrdersPage from '@/components/order_page';
import { useUser } from '@clerk/nextjs';

export default function MyOrders() {
  const { isSignedIn, isLoaded } = useUser();

  // Optional: Agar Clerk error ho toh handle karein
  if (isLoaded && !isSignedIn) {
    // Clerk middleware ne already redirect kiya hota hai
    // Lekin agar koi direct URL access kare, toh safe guard
    return null; // Clerk will redirect via middleware
  }

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-gray-200 border-t-zinc-500 rounded-full animate-spin mx-auto mb-4"></div>
          <h1 className="text-2xl font-semibold text-gray-700">Loading...</h1>
        </div>
      </div>
    );
  }

  return <MyOrdersPage />;
}