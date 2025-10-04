"use client";

import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import Image from "next/image";

export default function HeroSlider() {
  const slides = [
    {
      src: "/images3.jpeg",
      title: "Luxury Perfumes",
      desc: "Discover timeless fragrances crafted for elegance & charm.",
    },
    {
      src: "/image2.jpeg",
      title: "New Arrivals",
      desc: "Fresh scents to inspire confidence every day.",
    },
    {
      src: "/image1.jpg",
      title: "Exclusive Collection",
      desc: "Experience rare fragrances that define your personality.",
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="w-full relative">
      <Swiper
        spaceBetween={0}
        slidesPerView={1}
        loop={true}
        autoplay={{ delay: 3500, disableOnInteraction: false }}
        modules={[Autoplay]}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        className="h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-[75vh]"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative h-full">
              <Image
                src={slide.src}
                alt={slide.title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-center text-white px-4 z-10">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-extrabold mb-3 sm:mb-4 md:mb-6 drop-shadow-lg animate-fadeIn">
                  {slide.title}
                </h1>
                <p className="text-sm sm:text-base md:text-lg lg:text-lg mb-3 sm:mb-4 md:mb-6 max-w-xl animate-fadeIn delay-300">
                  {slide.desc}
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* White Dots Navigation */}
      <div className="absolute bottom-5 flex justify-center gap-4 w-full z-20">
        {slides.map((_, idx) => (
          <div
            key={idx}
            className={`w-3 h-3 rounded-full transition-all ${
              idx === activeIndex
                ? "bg-white scale-125 shadow-lg"
                : "bg-white/50 scale-100"
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
}
