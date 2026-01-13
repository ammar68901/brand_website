"use client";

import { useCart } from "@/context/CartContext";
import { useSidebar } from "@/context/SidebarContext";
import { Product } from "@/data/mainProducts";
import axios from "axios";
import { motion } from "framer-motion";
import { Heart, ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Perfume_loading_Animation from "./Perfume_loading_Animation";
import { toast } from "react-hot-toast";

function formatPKR(value: number) {
  return `Rs. ${value.toLocaleString()}`;
}

function discountPercent(price?: number, compareAt?: number) {
  if (!price || !compareAt || compareAt <= price) return null;
  const pct = Math.round(((compareAt - price) / compareAt) * 100);
  return `-${pct}%`;
}
// const [perfumeData, setPerfumeData] = useState<Product[]|any>([]);

//   const get_perfume_data = async() => {
//     try{
//       const response = await axios.get(`http://localhost:3001/api/perfumes/`);
//       setPerfumeData(response.data);  
//     }catch(error){
//     }
//   }

//   useEffect(() => {
//     get_perfume_data();
//   }, []);

function ProductCard({ product }: { product: Product }) {
  const [isWishlisted, setWishlisted] = useState(false);
  const pct = discountPercent(product.price, product.price);
  const { addToCart } = useCart();
  const { setSidebarOpen } = useSidebar();
  


  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.image_url,
    });
    setSidebarOpen(true); // open sidebar
    toast.success("Added to cart successfully 🛒", {
  style: {
    background: "#000",
    color: "#fff",
    borderRadius: "12px",
    padding: "12px 16px",
  },
  iconTheme: {
    primary: "#fff",
    secondary: "#000",
  },
});

  };

  return (
    <Link href={`/product_detail/${product.id}`} className="block">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="group relative flex flex-col overflow-hidden rounded-xl border border-black bg-white text-black shadow-sm hover:shadow-lg transition-shadow duration-300 cursor-pointer"
      >
        {/* Image */}
        <div className="relative aspect-[4/5] overflow-hidden">
        {product.image_url &&
          <Image
          width={400}
          height={400}
          src={product.image_url || "/placeholder.png"}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        }
         
              {pct && (
                <span className="rounded-full bg-red-500 px-2 py-0.5 text-[10px] sm:text-xs font-semibold text-white">
                  {pct}
                </span>
              )}
        </div>

        {/* Details */}
        <div className="p-3 sm:p-4 flex flex-col flex-1">
          <h3 className="line-clamp-1 text-xs sm:text-sm md:text-base font-semibold">
            {product.name}
          </h3>
         

          

          {/* Price */}
          
          <div className="mt-1 flex items-center gap-2">
            <span className="text-sm sm:text-base md:text-lg font-bold">
              {formatPKR(product.price)}
            </span>
          </div>
          {/* Add + Wishlist */}
          <div className="mt-3 flex gap-2">
            <button
              className="flex-1 flex items-center justify-center gap-1 rounded-lg bg-black px-2 py-1.5 text-xs font-semibold text-white hover:bg-gray-800"
              onClick={handleAddToCart}
              
            >
              <ShoppingCart size={14} /> Add
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                setWishlisted(!isWishlisted);
              }}
              className={`rounded-lg border border-black p-1.5 ${
                isWishlisted ? "bg-red-500 text-white" : "bg-white hover:bg-gray-100"
              }`}
            >
              <Heart size={16} className={isWishlisted ? "fill-white" : ""} />
            </button>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}

export default function ProductGrid() {
const [perfumeData, setPerfumeData] = useState<Product[]>([]);
const [isLoading, setIsLoading] = useState<boolean>(true);
  const get_perfume_data = async() => {
    try{
      const response = await axios.get(`/api/perfumes/`);
      setPerfumeData(response.data);  
    }catch(error){
      console.log(error);
      setIsLoading(false);
    }finally{
      setIsLoading(false);
    }
  }

  useEffect(() => {
    get_perfume_data();
  }, []);
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="min-h-screen bg-white px-3 sm:px-4 py-10 text-black"
    >
      <div className="mx-auto max-w-7xl">
        <h2 className="text-4xl sm:text-5xl font-bold mb-5 text-center">
          Trending Now
        </h2>
        {isLoading ? (
          <Perfume_loading_Animation/>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6 justify-center items-center">
          {perfumeData?.map((p:Product) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
      </div>
      </motion.div>
  );
}







