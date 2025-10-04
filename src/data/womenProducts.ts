// src/data/womenProducts.ts

export type Product = {
  id: string;
  title: string;
  subtitle?: string;
  image: string;
  price: number;
  compareAtPrice?: number;
  badgeText?: string;
  rating?: number;
  lasting?: string;
  size: string; // 👈 size dynamic (5ml, 15ml, 50ml, 100ml etc.)
  notes?: {
    top: string[];
    middle: string[];
    base: string[];
  };
  bestFor?: string; // 👈 e.g. "Casual, Parties"
  suitableFor?: "Men" | "Women" | "Unisex"; // 👈 gender suitability
};

export const womenProducts: Product[] = [
  {
    id: "w1",
    title: "Classic Perfume",
    subtitle: "Luxury Scent",
    image: "/image1.jpg",
    price: 2200,
    compareAtPrice: 3400,
    badgeText: "Sale",
    rating: 4.7,
    lasting: "8 Hours",
    size: "50ml", // 👈 ab size bhi dynamic
    notes: {
      top: ["Rose", "Citrus"],
      middle: ["Jasmine", "Peach"],
      base: ["Vanilla", "Amber"],
    },
    bestFor: "Daily Wear, Parties",
    suitableFor: "Women",
  },
  {
    id: "w2",
    title: "Pocket Perfume Pack",
    subtitle: "Travel Friendly",
    image: "/image2.jpeg",
    price: 1400,
    compareAtPrice: 2100,
    badgeText: "Sale",
    rating: 4.5,
    lasting: "6 Hours",
    size: "15ml",
    notes: {
      top: ["Lemon", "Mandarin"],
      middle: ["Rose"],
      base: ["Musk"],
    },
    bestFor: "Travel, Handbag Use",
    suitableFor: "Women",
  },
  {
    id: "w3",
    title: "Tester Perfume",
    subtitle: "Sample Size",
    image: "/image3.jpeg",
    price: 300,
    compareAtPrice: 500,
    badgeText: "New",
    rating: 4.2,
    lasting: "3 Hours",
    size: "5ml", // 👈 tester ka size
    notes: {
      top: ["Orange Blossom"],
      middle: ["Magnolia"],
      base: ["White Musk"],
    },
    bestFor: "Testing, Gifts",
    suitableFor: "Women",
  },
];
