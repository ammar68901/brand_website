"use client";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useCart } from "@/context/CartContext"; // 
import { useUser } from "@/context/userContext";
import axios from "axios";
import { motion } from "framer-motion";
import { ShoppingCart, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import CartSidebar from "./CartSidebar"; // 
import ShopDropdown from "./shopbtnInNav";
import { Button } from "./ui/button";
export default function Navbar() {

  const router = useRouter()
  const [menuOpen, setMenuOpen] = useState(false); // mobile menu
  const [cartOpen, setCartOpen] = useState(false); // cart sidebar
  const { cart } = useCart();
  const {emailUser,setEmailUser} = useUser()
      useEffect(()=> {
      const fetchUserDetail = async ()=> {
        try {
          const res = await axios.get('http://localhost:3000/api/me')
          setEmailUser(res.data.email)

          if(res.status === 401){
            router.push('/login')
          } 
          if (res.status === 404){
            router.push('/register')
          }
        } catch (error:any) {
          toast.error("error",error.message)
        }
      }
  
      fetchUserDetail()
    },[])
  
    const handleLOgout = async()=> {
      try{
        const res = await axios.post("/api/auth/logout")
        toast.success("Logout Success")
        if (res.status == 200){
          router.push('/login')
        }
        console.log(res.data)
      }catch(e){
        toast.error('something went wrong')
      }
    }
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  // console.log(user)
  return (
    <nav className="w-full border-b border-gray-200 bg-white shadow-sm relative z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Desktop Navbar */}
        <div className="hidden md:flex items-center justify-between h-16">
          {/* Left side: Shop & Search */}
          <div className="flex items-center space-x-6">
            <ShopDropdown />

           
          </div>

          {/* Center: Logo */}
          <div className="text-5xl font-bold text-black"><Link href={'/'}>Hevina&apos;s</Link></div>

          {/* Right side: Cart */}
          <div className="flex items-center justify-center gap-5">
            <button
              onClick={() => setCartOpen(true)} // 👈 open sidebar
              className="relative"
            >
              <ShoppingCart className="w-6 h-6 text-black hover:text-gray-600" />
              <span className="absolute -top-2 -right-2 bg-black text-white text-xs rounded-full px-1">
                {cartCount}
              </span>
            </button>
           
            <div>
              {emailUser ? (
                <>
                <Avatar>
                <AvatarFallback>{emailUser?.toUpperCase().split("")[0]}</AvatarFallback>
              </Avatar>
                </>
              ):(<><Link href={'/login'}>Login</Link></>)}
            </div>
            <div>
              {emailUser && (
                <Button onClick={handleLOgout}>
                  logout
                </Button>
              )}
            </div>
              
          </div>
        </div>

        {/* Mobile Navbar */}
        <div className="flex md:hidden items-center justify-between h-16">
          {/* Hamburger */}
          <button onClick={() => setMenuOpen(!menuOpen)}>
            <div className="flex flex-col gap-1">
              <span className="w-6 h-[3px] bg-black rounded"></span>
              <span className="w-6 h-[3px] bg-black rounded"></span>
              <span className="w-6 h-[3px] bg-black rounded"></span>
            </div>
          </button>

          {/* Logo */}
          <div className="text-4xl font-bold text-black">Hevina&apos;s</div>

          {/* Search + Cart */}
          <div className="flex items-center space-x-4">
           
            <button
              onClick={() => setCartOpen(true)} // 👈 mobile bhi
              className="relative"
            >
              <ShoppingCart className="w-6 h-6 text-black" />
              <span className="absolute -top-2 -right-2 bg-black text-white text-xs rounded-full px-1">
                {cartCount}
              </span>
            </button>
            <div>
              {emailUser ? (
                <>
                <Avatar>
                <AvatarFallback>{emailUser?.toUpperCase().split("")[0]}</AvatarFallback>
              </Avatar>
                </>
              ):(<><Link href={'/login'}>Login</Link></>)}
            </div>
             
          </div>
        </div>
      </div>

      {/* Mobile Sidebar (menu) */}
      {menuOpen && (
        <div
          className="fixed top-0 left-0 w-full h-full bg-black/10 z-40"
          onClick={() => setMenuOpen(false)}
        ></div>
      )}
      <motion.div
        initial={{ x: "-100%" }}
        animate={{ x: menuOpen ? 0 : "-100%" }}
        transition={{ type: "spring", stiffness: 100, damping: 15 }}
        className="fixed top-0 left-0 h-full w-64 backdrop-blur-md bg-white/90 text-black p-6 flex flex-col gap-6 shadow-xl z-50"
      >
        <button
          onClick={() => setMenuOpen(false)}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-200 transition"
        >
          <X className="w-6 h-6 text-black" />
        </button>

        <nav className="flex flex-col gap-6 mt-12 text-lg">
          <Link href="/mens" onClick={() => setMenuOpen(false)} className="relative group">
            Mens
            <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-black transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <Link href="/womens" onClick={() => setMenuOpen(false)} className="relative group">
            Womens
            <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-black transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <Link href="/about" onClick={() => setMenuOpen(false)} className="relative group">
            About Us
            <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-black transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <div>
              {emailUser && (
                <Button onClick={handleLOgout}>
                  logout
                </Button>
              )}
            </div>
          <div>
            <p className="mb-2">Contact</p>
            <div className="flex flex-col text-sm gap-1">
              <a href="mailto:abc@gmail.com" className="hover:underline">abc@gmail.com</a>
              <a href="tel:+1234567890" className="hover:underline">+123 456 7890</a>
            </div>
          </div>
        </nav>
      </motion.div>

      {/* Cart Sidebar (our new one) */}
      <CartSidebar isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </nav>
  );
}

