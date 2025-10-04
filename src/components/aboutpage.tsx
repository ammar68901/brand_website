"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function AboutPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="min-h-screen bg-white text-black px-4 sm:px-8 py-12"
    >
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb */}
        <p className="text-sm text-gray-500 mb-4">
          <Link href="/">Home</Link> /{" "}
          <span className="font-semibold text-black">About</span>
        </p>

        {/* Heading */}
        <h1 className="text-4xl sm:text-5xl font-bold text-center mb-8">
          About <span className="text-gray-700">Hevina&apos;s</span>
        </h1>

        {/* Intro section with image + text */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-16">
          {/* Text */}
          <div>
            <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              At <span className="font-semibold">Hevina’s</span>, our goal is
              simple yet timeless — to bring you{" "}
              <span className="font-medium">long-lasting fragrances</span> that
              not only elevate your presence but also remain{" "}
              <span className="italic">affordable</span>. We craft every perfume
              using premium quality oils blended with{" "}
              <span className="font-medium">skin-safe ethanol</span>, ensuring a
              safe, luxurious, and lasting experience.
            </p>
            <p className="text-gray-600 leading-relaxed">
              We believe that luxury shouldn’t be out of reach. With
              Hevina’s, you don’t just wear a scent —{" "}
              <span className="italic">you wear a statement.</span>
            </p>
          </div>

          {/* Image */}
          <div className="relative w-full h-80 md:h-[450px] rounded-2xl overflow-hidden shadow-lg">
            <Image
              src="/images3.jpeg" 
              alt="Hevina’s Perfume"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Extra Sections */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="p-6 rounded-xl border bg-white shadow-sm hover:shadow-md transition">
            <h3 className="text-xl font-semibold mb-3">Our Story</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Born from a passion for timeless scents, Hevina’s was created to
              redefine elegance. Each fragrance is a journey, blending modern
              craft with classic luxury.
            </p>
          </div>

          <div className="p-6 rounded-xl border bg-white shadow-sm hover:shadow-md transition">
            <h3 className="text-xl font-semibold mb-3">Our Promise</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Every bottle carries a promise of quality, affordability, and
              long-lasting performance — perfumes designed for{" "}
              <span className="font-medium">everyone</span>.
            </p>
          </div>

          <div className="p-6 rounded-xl border bg-white shadow-sm hover:shadow-md transition">
            <h3 className="text-xl font-semibold mb-3">Why Choose Us</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              With carefully selected ingredients and an artistic touch, we
              ensure every fragrance feels premium and unforgettable — without
              the premium price tag.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
