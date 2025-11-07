'use client';
import MyOrdersPage from '@/components/order_page';
import { useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

export default function MyOrders() {
  const router = useRouter();
  const { isSignedIn, isLoaded } = useUser();

  useEffect(() => {
    // wait until Clerk state is loaded
    if (!isLoaded) return;

    // agar user signed in nahi hai to sign-in page pe bhej do
    if (!isSignedIn) {
      router.replace('/sign-in');
    }
  }, [isLoaded, isSignedIn, router]);

  // show nothing while Clerk is loading or while redirecting
  if (!isLoaded || !isSignedIn) return null;

  return <MyOrdersPage />;
}