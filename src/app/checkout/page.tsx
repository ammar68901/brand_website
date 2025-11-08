'use client';

import CheckoutPage from '@/components/checkoutpage';
import { useUser } from '@clerk/nextjs';

export default function Checkout() {
  const { isSignedIn, isLoaded } = useUser();

  if (isLoaded && !isSignedIn) {
    return null; // Middleware will handle redirect
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

  return <CheckoutPage />;
}