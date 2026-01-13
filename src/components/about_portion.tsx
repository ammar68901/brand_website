"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type FAQItem = {
  question: string;
  answer: string;
};

export default function ResponsiveFAQNoScroll() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqItems: FAQItem[] = [
    {
      question: "What makes Khanum perfumes unique?",
      answer:
        "Our perfumes are Extrait de Parfum, which means they have a 30% to 40% oil concentration, making them stronger, richer, and longer-lasting than regular perfumes.",
    },
    {
      question: "How long does a bottle last?",
      answer:
        "On average, a bottle can last up to 2 years if stored properly in a cool, dry place.",
    },
   {
  question: "Is your perfume skin-safe?",
  answer: "Yes! Our perfume is completely skin-safe because we use high-quality ethanol.",
},
{
  question: "How long does your perfume last?",
  answer: "Our perfume lasts for up to 8 hours.",
},

  ];

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="w-full max-w-screen-lg mx-auto mt-12 px-4 sm:px-6 lg:px-8 overflow-x-hidden">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-10 text-center tracking-wide">
        Frequently Asked Questions
      </h1>

      <div className="space-y-4">
        {faqItems.map((item, index) => (
          <div
            key={index}
            className="rounded-lg overflow-hidden border-t  border-gray-300 w-full"
          >
            <button
              onClick={() => toggle(index)}
              className="w-full text-left px-4 sm:px-6 py-4 bg-gray-100 hover:bg-gray-200 flex justify-between items-center text-base sm:text-lg font-semibold transition-colors duration-300"
            >
              <span>{item.question}</span>
              <span className="text-2xl transition-transform duration-300">
                {openIndex === index ? "-" : "+"}
              </span>
            </button>

            <AnimatePresence>
              {openIndex === index && (
                <motion.div
                  initial={{ opacity: 0, maxHeight: 0 }}
                  animate={{ opacity: 1, maxHeight: 500 }} // adjust 500 as needed
                  exit={{ opacity: 0, maxHeight: 0 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="px-4 sm:px-6 py-4 bg-white text-gray-800 text-sm sm:text-base overflow-hidden"
                >
                  {item.answer}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
}
