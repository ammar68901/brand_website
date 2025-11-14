"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
export default function AdminPage() {


  const [userCount, setUserCount] = useState<number>(0);

  useEffect(() => {
    const fetchCounts = async () => {
      try{
        const res = await axios.get("http://localhost:3000/api/admin/countusers");
        console.log("User count response:", res.data);
        setUserCount(res.data.total_users || 0)
        console.log('try')
      }catch(e:any){
        console.log('error',e)
      }
    }

    fetchCounts()
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Overview</h2>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded shadow">
          <p className="text-gray-500 text-sm">Products</p>
          <h3 className="text-2xl font-bold">2</h3>
        </div>

        <div className="bg-white p-6 rounded shadow">
          <p className="text-gray-500 text-sm">Orders</p>
          <h3 className="text-2xl font-bold">3</h3>
        </div>

        <div className="bg-white p-6 rounded shadow">
          <p className="text-gray-500 text-sm">Customers</p>
          <h3 className="text-2xl font-bold">{userCount}</h3>
        </div>
      </div>
    </div>
  );
}
