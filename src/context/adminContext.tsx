'use client'

import React, { createContext, useContext, useState, useEffect } from "react";

export type adminContextType = {
    isAdminLoggedIn: boolean;
    id: number | null;
    email: string | null;
    setAdminLoggedIn: (loggedIn: boolean, id: number | null, email: string | null) => void;
}


const AdminContext = createContext<adminContextType | undefined>(undefined);

export function AdminProvider({ children }: { children: React.ReactNode }) {
    const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(false);
    const [id, setId] = useState<number | null>(null);
    const [email, setEmail] = useState<string | null>(null);

    const setAdminLoggedIn = (loggedIn: boolean, adminId: number | null, adminEmail: string | null) => {
        setIsAdminLoggedIn(loggedIn);
        setId(adminId);
        setEmail(adminEmail);
    }
    return (
        <AdminContext.Provider value={{ isAdminLoggedIn, id, email, setAdminLoggedIn }}>
            {children}
        </AdminContext.Provider>
    );
}

export function useAdmin() {
    const context = useContext(AdminContext);
    if (context === undefined) {
        throw new Error("useAdmin must be used within an AdminProvider");
    }  
    return context;
}