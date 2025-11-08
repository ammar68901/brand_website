'use client';
import { SignIn, useUser } from '@clerk/nextjs';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function SignInPage() {
  const { isSignedIn } = useUser();
  const router = useRouter();

  useEffect(() => {
    // Agar user already signed in hai, hum redirect kar denge client-side
    if (isSignedIn) {
      // change the path as you want (e.g. '/my-orders' or '/')
      router.replace('/');
    }
  }, [isSignedIn, router]);

  // Show nothing (or a loader) while redirecting
  if (isSignedIn) return null;

  return <SignIn />;
}