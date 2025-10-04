"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import Image from "next/image";

type Order = {
  id: string;
  date: string;
  total: string;
  status: "pending" | "shipped" | "delivered" | "cancelled";
  items: { name: string; quantity: number; price: string; image: string }[];
};

const mockOrders: Order[] = [
  {
    id: "ORD-1001",
    date: "2025-09-20",
    total: "PKR 5,800",
    status: "delivered",
    items: [
      {
        name: "Luxury Oud Perfume",
        quantity: 1,
        price: "PKR 3,000",
        image: "/image1.jpg",
      },
      {
        name: "Floral EDP",
        quantity: 2,
        price: "PKR 2,800",
        image: "/perfume2.jpg",
      },
    ],
  },
  {
    id: "ORD-1002",
    date: "2025-09-25",
    total: "PKR 2,500",
    status: "pending",
    items: [
      {
        name: "Citrus Fresh Perfume",
        quantity: 1,
        price: "PKR 2,500",
        image: "/perfume3.jpg",
      },
    ],
  },
];

export default function MyOrdersPage() {
  const [orders] = useState<Order[]>(mockOrders);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "shipped":
        return "bg-blue-100 text-blue-800";
      case "delivered":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6 text-center">My Orders</h1>

      <Tabs defaultValue="all" className="w-full">
        {/* Tabs Header */}
        <TabsList className="flex flex-wrap justify-center gap-2 mb-8">
          <TabsTrigger value="all">All Orders</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="shipped">Shipped</TabsTrigger>
          <TabsTrigger value="delivered">Delivered</TabsTrigger>
        </TabsList>

        {/* Orders Content */}
        {["all", "pending", "shipped", "delivered"].map((tab) => (
          <TabsContent key={tab} value={tab}>
            {orders.filter((o) => tab === "all" || o.status === tab).length === 0 ? (
              <p className="text-center text-gray-500">No orders found.</p>
            ) : (
              <div className="space-y-6">
                {orders
                  .filter((order) => tab === "all" || order.status === tab)
                  .map((order) => (
                    <Card
                      key={order.id}
                      className="shadow-sm rounded-xl border border-gray-200 hover:shadow-md transition"
                    >
                      <CardContent className="p-6">
                        {/* Header */}
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5">
                          <div>
                            <p className="font-semibold text-lg">
                              Order #{order.id}
                            </p>
                            <p className="text-sm text-gray-500">{order.date}</p>
                          </div>
                          <Badge className={`${getStatusColor(order.status)} px-3 py-1`}>
                            {order.status.charAt(0).toUpperCase() +
                              order.status.slice(1)}
                          </Badge>
                        </div>

                        {/* Items */}
                        <div className="space-y-4">
                          {order.items.map((item, i) => (
                            <div
                              key={i}
                              className="flex flex-col sm:flex-row sm:items-center gap-4 border-b pb-4"
                            >
                              <Image
                                width={80}
                                height={80}
                                src={item.image}
                                alt={item.name}
                                className="w-20 h-20 rounded-lg object-cover"
                              />
                              <div className="flex-1">
                                <p className="font-medium">{item.name}</p>
                                <p className="text-sm text-gray-500">
                                  Qty: {item.quantity}
                                </p>
                              </div>
                              <p className="font-semibold">{item.price}</p>
                            </div>
                          ))}
                        </div>

                        {/* Footer */}
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mt-5">
                          <p className="font-bold text-lg">
                            Total: <span className="text-black">{order.total}</span>
                          </p>
                          <button className="px-5 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition">
                            View Details
                          </button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
