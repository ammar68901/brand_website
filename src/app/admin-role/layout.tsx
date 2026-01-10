
import React, { ReactNode } from "react";
import Sidebar from "@/components/admin/Sidebar";
import Topbar from "@/components/admin/Topbar";
import { Toaster } from "react-hot-toast";
export default async function AdminLayout({ children }: { children: ReactNode }) {
  
 
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Topbar />
        <main className="p-6 bg-gray-50 flex-1">{children}</main>
        <Toaster/>
      </div>
    </div>
  );
}
