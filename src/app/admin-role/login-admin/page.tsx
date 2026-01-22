"use client";

import { EyeClosed, EyeIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";
export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [togglePass, setTogglePass] = useState(false);
  const adminLogin = async () => {
    try {
      const res = await fetch("/api/admin/log-in", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", //  Zaroori
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      if(res.ok && res.status === 200){
        router.push("/admin-role");
        toast.success("Login Successful admin");
      }else{
        toast.error(res.statusText as unknown as string || "Login failed" );

      }
    } catch (error: unknown) {
      console.error("Login error:", error);
      // Error handling
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    adminLogin();
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded p-8 w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6 text-center">Admin Login</h2>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-indigo-300"
            />
          </div>

            <label className="block text-sm font-medium mb-1">Password</label>
          <div className="w-full flex items-center justify-between gap-2">
            <div className="flex items-center justify-center gap-2">
            {togglePass ? (
               <input
              type="text"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-indigo-300"
              />
            ) : (
               <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-indigo-300"
              />
            ) }
              </div>

            <span onClick={()=> setTogglePass((prev) => !prev)} className="cursor-pointer p-2 border rounded bg-gray-100">
              {togglePass ? <EyeIcon/> : <EyeClosed/>}
            </span>
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
