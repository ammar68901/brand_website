'use client';

import { SignIn } from '@clerk/nextjs';

// Clerk automatically:
// - Redirects signed-in users away from /sign-in
// - Sends users back to original page after login
export default function SignInPage() {
  return (
    <div className="h-[80vh] w-full flex items-center justify-center">
      <SignIn />
    </div>
  );
}