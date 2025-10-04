
"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function StaggeredVIPMarquee() {
  const marqueeRef = useRef<HTMLDivElement>(null);

  const phrases = [
    "Long Lasting EDP Perfume",
    "High Quality",
    "Luxury Fragrance",
    "Premium",
    "Exclusive Scents",
  ];

  const generateRowContent = () => {
    const row: string[] = [];
    const repeat = 3; // make seamless loop
    for (let i = 0; i < repeat; i++) {
      row.push(...phrases.sort(() => Math.random() - 0.5));
    }
    return row;
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      const marquees = marqueeRef.current!.querySelectorAll(".marquee-content");

      marquees.forEach((marquee, i) => {
        const el = marquee as HTMLElement;
        const width = el.scrollWidth / 2;

        // Duplicate content for seamless looping
        el.innerHTML += el.innerHTML;

        // Animate
        gsap.to(el, {
          x: -width,
          duration: 20 + i * 5, // different speed per row
          ease: "none",
          repeat: -1,
        });
      });
    }, marqueeRef);

    return () => ctx.revert();
  }, []);

  const renderRow = (rowIdx: number) => {
    const translateY = rowIdx % 2 === 0 ? "0px" : "12px"; // stagger vertical offset
    const direction = rowIdx % 2 === 0 ? 1 : -1; // alternate directions for pro look

    return (
      <div
        key={rowIdx}
        className="marquee flex mb-6 overflow-hidden"
        style={{ transform: `translateY(${translateY})` }}
      >
        <div
          className="marquee-content flex gap-56 whitespace-nowrap"
          style={{ flexDirection: direction === 1 ? "row" : "row-reverse" }}
        >
          {generateRowContent().map((phrase, idx) => (
            <span
              key={idx}
              className="text-white font-extrabold text-2xl md:text-4xl"
            >
              {phrase}
            </span>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="overflow-hidden bg-gray-900 py-6" ref={marqueeRef}>
      {[0, 1, 2].map((rowIdx) => renderRow(rowIdx))}
    </div>
  );
}

