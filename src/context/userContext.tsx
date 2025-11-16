'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

// ✅ Context type
type UserContextType = {
  emailUser: string | null;
  setEmailUser: (emailUser: string | null) => void;
};

// ✅ Create context with default undefined
const UserContext = createContext<UserContextType | undefined>(undefined);

// ✅ Provider component
export function UserProvider({ children }: { children: ReactNode }) {
  const [emailUser, setEmailUser] = useState<string | null>(null);

  return (
    <UserContext.Provider value={{ emailUser, setEmailUser }}>
      {children}
    </UserContext.Provider>
  );
}

// ✅ Custom hook — throws error if used outside provider
export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}