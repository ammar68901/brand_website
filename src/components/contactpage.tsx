"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";


export default function ContactPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="min-h-screen bg-white text-black px-4 py-12"
    >
           {/* Breadcrumb */}
        <p className="text-sm text-gray-500 mb-4">
          <Link href="/">Home</Link> /{" "}
          <span className="font-semibold text-black">Contact</span>
        </p>
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
     
        
        {/* Left side: Image */}
        <div className="relative w-full h-80 md:h-[500px] rounded-2xl overflow-hidden shadow-md">
          <Image
            src="/aboutpic.jpeg" // apni image ka path dal do
            alt="Khanum"
            fill
            className="object-cover"
          />
        </div>

        {/* Right side: Text + Form placeholder */}
        <div className="space-y-6">
          <h1 className="text-4xl sm:text-5xl font-bold">Contact Us</h1>
          <p className="text-gray-600 text-sm sm:text-base">
            Have a question or need help? We’d love to hear from you.  
            Reach out through the details below, or fill in the form.
          </p>

          {/* Contact details */}
          <div className="space-y-3 text-sm sm:text-base">
            <p><span className="font-semibold">📍 Address:</span> Karachi, Pakistan</p>
            <p><span className="font-semibold">📞 Phone:</span> +92 309 9857806</p>
            <p><span className="font-semibold">✉️ Email:</span> khanumfragrance@gmail.com</p>
          </div>

         
         
        </div>
      </div>
    </motion.div>
  );
}
