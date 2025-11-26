"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import axios from "axios";
import { useEffect, useState } from "react";
import { ProductAnimationLoading } from "./Perfume_loading_Animation";
import Link from "next/link";
// Adjusted type to match real API
type Order = {
  id: number;
  customer_name: string;
  phone: string;
  address: string;
  city: string;
  postal_code: string;
  quantity: number;
  total_price: string; // e.g. "3040.00"
  status: "pending" | "shipped" | "delivered" | "cancelled";
  created_at: string; // ISO date
  perfume_name: string;
  perfume_image: string;
  perfume_unit_price: string;
};

export default function MyOrdersPage() {
  const [orders, setOrders] = useState<any[]>([{}]);
  const [loading, setLoading] = useState(true);
  const [perfumeDetail, setPerfumeDetail] = useState<any>(null);
  const [perfumeId, setPerfumeId] = useState<number | null>(null);
  const [OrderDetailLoading, setOrderDetailLoading] = useState(true);
  const fetchOrders = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/my-order"); //  updated endpoint
      // const transformed = res.data.data.map(transformOrder);
      setOrders(res.data.data);
    } catch (error) {
      console.error("Failed to fetch orders:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchOrderDetails = async () => {
    try {
      if (perfumeId) {
        const response = await axios.get(
          `http://localhost:3000/api/perfume/${perfumeId}`
        );
        const perfume = response.data;
        setPerfumeDetail(perfume);
      }
    } catch (error) {
      console.error("Failed to fetch perfume details:", error);
      alert("Failed to load perfume details");
    } finally {
      setOrderDetailLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
    fetchOrderDetails();
  }, []);

  useEffect(() => {
    fetchOrderDetails();
  }, [perfumeId]);

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

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-10 text-center">
        <ProductAnimationLoading />
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6 text-center">My Orders</h1>

      {/* <Tabs defaultValue="all" className="w-full">
        <TabsList className="flex flex-wrap justify-center gap-2 mb-8">
          <TabsTrigger value="all">All Orders</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="shipped">Shipped</TabsTrigger>
          <TabsTrigger value="delivered">Delivered</TabsTrigger>
        </TabsList>

        {(["all", "pending", "shipped", "delivered"] as const).map((tab) => (
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
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5">
                          <div>
                            <p className="font-semibold text-lg">Order #{order.id}</p>
                            <p className="text-sm text-gray-500">{order.date}</p>
                          </div>
                          <Badge className={`${getStatusColor(order.status)} px-3 py-1`}>
                            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                          </Badge>
                        </div>

                        <div className="space-y-4">
                          {order.items.map((item, i) => (
                            <div
                              key={i}
                              className="flex flex-col sm:flex-row sm:items-center gap-4 border-b pb-4"
                            >
                              <Image
                                width={80}
                                height={80}
                                src={'https://imgs.search.brave.com/R7uReGAqG637SQ7QMh_dvr76581f6rwWkAhO5ZZGyq0/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pbG92/ZXBlcmZ1bWUudXMv/Y2RuL3Nob3AvY29s/bGVjdGlvbnMvdW9t/by1ncmVlbi1zdHJh/dmFnYW56YS1mcmFn/cmFuY2UtcmV2aWV3/LWUxNzA5NzY1MTI0/ODUyLndlYnA_dj0x/NzQ4MzEyNDgyJndp/ZHRoPTM4NDA'}
                                alt={item.name}
                                className="w-20 h-20 rounded-lg object-cover"
                                unoptimized // if image is from external URL
                              />
                              <div className="flex-1">
                                <p className="font-medium">{item.name}</p>
                                <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                              </div>
                              <p className="font-semibold">{item.total}</p>
                            </div>
                          ))}
                        </div>

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
      </Tabs> */}
      <div>
        {orders.length === 0 ? (
          <>
          <div className=" flex-l items-center justify-center ">

          <p className="text-center text-gray-500">No orders found.

          </p>
          </div>
          <div className="w-full h-full flex items-center justify-center gap-3">
            <div>
          <Link className="text-blue-400" href={'/mens'}>Men Perfumes</Link>
            </div>
              <div>

          <Link className="text-red-500" href={'/womens'}>Women Perfumes</Link>
              </div>
          </div>
          </>

        ) : (
          orders.map((order) => (
            <Card
              key={order.id}
              className="shadow-sm rounded-xl border border-gray-200 hover:shadow-md transition mb-4"
            >
              <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5">
                  <div>
                    <p className="font-semibold text-lg">Order #{order.id}</p>
                    <p className="text-sm text-gray-500">
                      {new Date(order.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  <Badge
                    className={`${getStatusColor(order.status)} px-3 py-1`}
                  >
                    {order.status.charAt(0).toUpperCase() +
                      order.status.slice(1)}
                  </Badge>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h3 className="font-medium mb-2">Customer Details</h3>
                      <p className="text-sm text-gray-600">
                        Name: {order.customer_name}
                      </p>
                      <p className="text-sm text-gray-600">
                        Phone: {order.phone}
                      </p>
                    </div>
                    <div>
                      <h3 className="font-medium mb-2">Shipping Address</h3>
                      <p className="text-sm text-gray-600">{order.address}</p>
                      <p className="text-sm text-gray-600">
                        {order.city}, {order.postal_code}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mt-5">
                  <div>
                    <p className="text-sm text-gray-600">
                      Quantity: {order.quantity}
                    </p>
                    <p className="font-bold text-lg">
                      Total:{" "}
                      <span className="text-black">
                        PKR {Number(order.total_price).toLocaleString()}
                      </span>
                    </p>
                  </div>
                  <>
                    <Dialog>
                      <DialogTrigger
                        onClick={() => setPerfumeId(order?.perfume_id)}
                      >
                        Product Details
                      </DialogTrigger>
                      {OrderDetailLoading ? (
                        <>Loading</>
                      ) : (
                        <DialogContent>
                          <DialogHeader>
                            <img
                              src={perfumeDetail?.image_url}
                              alt={perfumeDetail?.name || "Perfume Image"}
                              width={"80"}
                              height={"80"}
                            />
                            <DialogTitle>{perfumeDetail?.name} </DialogTitle>
                            <DialogDescription>
                              {perfumeDetail?.description}

                              <p className="mt-2">
                                Price: PKR{" "}
                                {Number(perfumeDetail?.price).toLocaleString()}
                              </p>
                              <p> {perfumeDetail?.category}</p>
                            </DialogDescription>
                          </DialogHeader>
                        </DialogContent>
                      )}
                    </Dialog>
                  </>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
