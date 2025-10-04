
"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

export default function PerfumeBanner() {
  const { scrollY } = useScroll(); // useScroll instead of deprecated useViewportScroll
  const scale = useTransform(scrollY, [0, 300], [1, 1.05]); // Scroll par image zoom

  return (
    <motion.div
      style={{ scale }}
      className="relative w-full h-[250px] md:h-[300px] overflow-hidden"
    >
      <Image
        src="/images3.jpeg"
        alt="Perfume Bundle"
        fill
        className="object-cover"
      />

      <div className="absolute inset-0 flex flex-col justify-center items-start px-6 md:px-20">
        <motion.h1
          initial={{ x: -50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="text-white text-2xl md:text-4xl font-bold mb-2"
        >
          Try Over This Bundle
        </motion.h1>

        <motion.p
          initial={{ x: -50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="text-white text-base md:text-xl mb-4"
        >
          Explore our premium perfumes collection in one exclusive bundle!
        </motion.p>

        <motion.button
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="bg-white text-black font-semibold px-5 py-2 rounded-md shadow-lg"
        >
          Buy Bundle Perfumes
        </motion.button>
      </div>
    </motion.div>
  );
}
