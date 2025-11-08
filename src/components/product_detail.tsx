"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import { ShoppingCart, Heart, Star, Clock } from "lucide-react";
import { motion } from "framer-motion";
import axios from "axios";
import { useEffect, useState  } from "react";
import { Product } from "@/data/mainProducts";
import {ProductAnimationLoading} from "./Perfume_loading_Animation";
import { useCart } from "@/context/CartContext";

function formatPKR(value: number) {
  return `Rs. ${value.toLocaleString()}`;
}

export default function ProductDetail() {
  const { id } = useParams();
  const { addToCart } = useCart();

  const [product, useProduct] = useState<Product | any>()
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/perfume/${id}`);
        useProduct(response.data);
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        <ProductAnimationLoading/>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="min-h-screen bg-white text-black px-4 sm:px-6 py-10"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center md:items-start">
        {/* Left: Image */}
        <div className="relative w-full flex justify-center">
          <div className="relative w-[85%] h-[350px] overflow-hidden rounded-2xl shadow-md border bg-gray-50">
            {product && 
            <Image
            src={product.image_url}
            alt={product.name}
            width={600}
            height={350}
            className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
            />
          }
          </div>
        </div>

        {/* Right: Details */}
        <div className="flex flex-col justify-start">
          {/* Title */}
          <h1 className="text-3xl sm:text-4xl font-bold mb-3">
            {product.name}
          </h1>
          {product.description && (
            <p className="text-gray-600 text-base sm:text-lg mb-4">
              {product.description}
            </p>
          )}

          {/* Rating */}
          {/* {typeof product.rating === "number" && ( */}
          {/* //   <div className="flex items-center gap-1 text-yellow-500 mb-4">
          //     {Array.from({ length: 5 }).map((_, i) => (
          //       <Star
          //         key={i}
          //         size={18}
          //         className={(product.rating ?? 0) > i ? "fill-current" : "opacity-30"}
          //       />
          //     ))}
          //     <span className="ml-2 text-gray-600 text-sm">
          //       {product.rating.toFixed(1)} / 5
          //     </span>
          //   </div>
          // )} */}

          {/* Price */}
          <div className="flex items-baseline gap-3 mb-6">
            <div className="text-2xl sm:text-3xl font-bold text-black">
              {formatPKR(product.price)}
            </div>
            {/* {product.compareAtPrice && (
              <div className="text-lg sm:text-xl text-gray-400 line-through">
                {formatPKR(product.compareAtPrice)}
              </div>
            )} */}
          </div>

          {/* Lasting */}
          {/* {product.lasting && (
            <p className="flex items-center gap-2 text-sm text-gray-500 mb-6">
              <Clock size={16} /> Lasting: {product.lasting}
            </p>
          )} */}

          {/* Size */}
          {/* {product.size && (
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-700 mb-2">
                Available Size
              </h3>
              <div className="flex gap-2">
                <span className="px-4 py-2 border border-black rounded-lg text-sm font-medium">
                  {product.size}
                </span>
              </div>
            </div>
          )} */}

          {/* Notes */}
          {/* {product.notes && (
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-700 mb-2">
                Fragrance Notes
              </h3>
              <ul className="text-sm text-gray-600 space-y-1">
                {product.notes.top && (
                  <li>
                    <span className="font-medium text-black">Top Notes:</span>{" "}
                    {product.notes.top.join(", ")}
                  </li>
                )}
                {product.notes.middle && (
                  <li>
                    <span className="font-medium text-black">Middle Notes:</span>{" "}
                    {product.notes.middle.join(", ")}
                  </li>
                )}
                {product.notes.base && (
                  <li>
                    <span className="font-medium text-black">Base Notes:</span>{" "}
                    {product.notes.base.join(", ")}
                  </li>
                )}
              </ul>
            </div>
          )} */}

          {/* Best For */}
          {/* {product.bestFor && (
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-700 mb-2">Best For</h3>
              <p className="text-sm text-gray-600">{product.bestFor}</p>
            </div>
          )} */}

          {/* Suitable For */}
          {product.category && (
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-700 mb-2">Suitable For</h3>
              <p className="text-sm text-gray-600">{product.category}</p>
            </div>
          )}

          {/* Description */}
          <p className="text-gray-700 text-sm sm:text-base leading-relaxed mb-8">
            Experience the luxury of {product.name}. Crafted with premium
            ingredients to ensure a long-lasting fragrance that leaves an
            unforgettable impression. Perfect for both daily wear and special
            occasions.
          </p>

          {/* Buttons */}
          <div className="flex gap-3">
            <button className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-black px-5 py-3 text-sm sm:text-base font-semibold text-white hover:bg-gray-800 transition"
            onClick={(e) => {
                e.preventDefault(); // stop Link navigation
                addToCart({
                  id: product.id.toString(),
                  name: product.name,
                  price: product.price,
                  quantity: 1,
                  image: product.name,
                });
                }}
            >
              <ShoppingCart size={18} 
               
              
              /> Add to Cart
            </button>
            <button className="rounded-xl border border-black p-3 hover:bg-gray-100 transition">
              <Heart size={20} />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}


