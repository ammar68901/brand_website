// src/app/men/page.tsx
"use client";

import { useCart } from "@/context/CartContext"; // ✅ Cart context
import { useSidebar } from "@/context/SidebarContext"; // ✅ Sidebar context
import { Product } from "@/data/mainProducts";
import axios from "axios";
import { Heart, ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ProductAnimationLoading } from "./Perfume_loading_Animation";


function formatPKR(value: number) {
  return `Rs. ${value.toLocaleString()}`;
}

// function discountPercent(price?: number, compareAt?: number) {
//   if (!price || !compareAt || compareAt <= price) return null;
//   const pct = Math.round(((compareAt - price) / compareAt) * 100);
//   return `-${pct}%`;
// }

function ProductCard({ product }: { product: Product }) {
  const [isWishlisted, setWishlisted] = useState(false);
  // onst pct = discountPercent(product.price, product.compareAtPrice);

  // ✅ Use Cart & Sidebar
  const { addToCart } = useCart();
  const { openSidebar } = useSidebar();

  return (
    <Link href={`/product_detail/${product.id}`} className="block">
      <div className="group relative flex flex-col overflow-hidden rounded-xl border border-black bg-white text-black shadow-sm hover:shadow-lg transition-shadow duration-300 cursor-pointer">

        {/* Image */}
        <div className="relative aspect-[4/5] overflow-hidden">
          <Image
            width={400}
            height={400}
            src={product.image_url}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {/* Badge */}
          {/* {(product.badgeText || pct) && (
            <div className="absolute left-2 top-2 flex gap-1 flex-wrap">
              {product.badgeText && (
                <span className="rounded-full bg-black/70 text-white px-2 py-0.5 text-[10px] sm:text-xs font-medium">
                  {product.badgeText}
                </span>
              )}
              {pct && (
                <span className="rounded-full bg-red-500 px-2 py-0.5 text-[10px] sm:text-xs font-semibold text-white">
                  {pct}
                </span>
              )}
            </div>
          )} */}
        </div>

        {/* Details */}
        <div className="p-3 sm:p-4 flex flex-col flex-1">
          <h3 className="line-clamp-1 text-xs sm:text-sm md:text-base font-semibold">
            {product.name}
          </h3>
          {product.description && (
            <p className="line-clamp-1 text-[10px] sm:text-xs text-gray-600">
              {product.description}
            </p>
          )}

          {/* Lasting */}
          {/* {product.lasting && (
            <p className="flex items-center gap-1 text-[10px] sm:text-xs text-gray-500 mt-1">
              <Clock size={12} /> Lasting: {product.lasting}
            </p>
          )} */}

          {/* Rating */}
          {/* {typeof product.rating === "number" && (
            <div className="flex items-center gap-1 text-yellow-500 mt-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={12}
                  className={(product.rating ?? 0) > i ? "fill-current" : "opacity-30"}
                />
              ))}
              <span className="ml-1 text-[10px] sm:text-xs text-gray-500">
                {product.rating.toFixed(1)}
              </span>
            </div>
          )} */}

          {/* Price */}
          <div className="mt-1 flex items-baseline gap-2">
            <div className="text-sm sm:text-base md:text-lg font-bold">
              {formatPKR(product.price)}
            </div>
            {/* {product.compareAtPrice && (
              <div className="text-[10px] sm:text-xs md:text-sm text-gray-500 line-through">
                {formatPKR(product.compareAtPrice)}
              </div>
            )} */}
          </div>

          {/* Buttons */}
          <div className="mt-3 flex gap-2">
            <button
              className="flex-1 flex items-center justify-center gap-1 rounded-lg bg-black px-2 py-1.5 text-xs font-semibold text-white hover:bg-gray-800"
              onClick={(e) => {
                e.preventDefault(); // stop Link navigation
                addToCart({
                  id: product.id.toString(),
                  name: product.name,
                  price: product.price,
                  quantity: 1,
                  image: product.image_url,
                });
                openSidebar(); // ✅ sidebar open
              }}
            >
              <ShoppingCart size={14} /> Add
            </button>

            <button
              onClick={(e) => {
                e.preventDefault();
                setWishlisted(!isWishlisted);
              }}
              className={`rounded-lg border border-black p-1.5 ${isWishlisted ? "bg-red-500 text-white" : "bg-white hover:bg-gray-100"
                }`}
            >
              <Heart size={16} className={isWishlisted ? "fill-white" : ""} />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default function MenProductsPage() {




  const [menProductsList, setMenProductsList] = useState<Product[] | []>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  useEffect(() => {
    const fetchMenProducts = async () => {
      try {
        const response = await axios.get("/api/perfumes/", {
          params: { category: "male" },
        });
        setMenProductsList(response.data);
      } catch (error) {
        console.error("Error fetching men's products:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchMenProducts();
  }, []);



  return (

    <div className="min-h-screen bg-white px-3 sm:px-4 py-10 text-black">
      <div className="mx-auto max-w-7xl">
        {/* Breadcrumb */}
        <p className="text-sm text-gray-500 mb-4">
          <Link href="/">Home</Link> /{" "}
          <span className="font-semibold text-black">Men&apos;s</span>
        </p>

        {/* Heading */}
        <h2 className="text-4xl sm:text-5xl font-bold mb-6 text-center">
          Men&apos;s Products
        </h2>

        {/* Grid */}
        {isLoading ? (<ProductAnimationLoading />) : (

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6 justify-center items-center">
            {menProductsList.map((p: Product) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}


