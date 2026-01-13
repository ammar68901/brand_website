"use client";

import { SiFacebook, SiInstagram, } from "react-icons/si";
import { MdEmail, MdPhone } from "react-icons/md";
import Link from "next/link";
import FooterLinks from "./shopbtnInFooter";

export default function Footer() {
  return (
    <footer className="bg-black text-white py-10 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Brand Name */}
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold">Khanum</h2>
          <p className="text-gray-400 text-sm mt-1">
            Luxury Fragrance • Premium Quality
          </p>
        </div>

        {/* Footer Links */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center sm:text-left">
          {/* Quick Links */}
         <FooterLinks />


          {/* Customer Support */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Customer Support</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><Link href="#" className="hover:text-white">FAQs</Link></li>
              <li><Link href="#" className="hover:text-white">Shipping Policy</Link></li>
              <li><Link href="#" className="hover:text-white">Return Policy</Link></li>
              <li><Link href="#" className="hover:text-white">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Get in Touch</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li className="flex justify-center sm:justify-start items-center gap-2">
                <MdEmail size={16} /> khanumfragrance@gmail.com
              </li>
              <li className="flex justify-center sm:justify-start items-center gap-2">
                <MdPhone size={16} /> +92 309 9857806
              </li>
            </ul>
          </div>
        </div>

        {/* Social Media */}
        <div className="flex justify-center sm:justify-between items-center mt-10 flex-wrap gap-4">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Khanum. All Rights Reserved.
          </p>
          <div className="flex gap-4">
            <a href="https://www.instagram.com/khanumfragrance?igsh=OXJqZGxqazYyZDd5" className="hover:text-gray-300"><SiInstagram size={18} /></a>
            <a href="#" className="hover:text-gray-300"><SiFacebook size={18} /></a>
            
          </div>
        </div>
      </div>
    </footer>
  );
}

