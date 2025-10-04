// src/data/menProducts.ts
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
  size: string; // 👈 yeh naya field (e.g. "50ml", "5ml", "100ml")
  notes?: {
    top: string[];
    middle: string[];
    base: string[];
  };
  bestFor?: string; // 👈 e.g. "Office, Daily Wear"
  suitableFor?: "Men" | "Women" | "Unisex"; // 👈 gender suitability
};

export const menProducts: Product[] = [
  {
    id: "m1",
    title: "Classic Perfume",
    subtitle: "Luxury Scent",
    image: "/image1.jpg",
    price: 2200,
    compareAtPrice: 3400,
    badgeText: "Sale",
    rating: 4.7,
    lasting: "8 Hours",
    size: "50ml", // 👈 ab yeh dynamic hai
    notes: {
      top: ["Citrus", "Bergamot"],
      middle: ["Lavender", "Spice"],
      base: ["Woody", "Amber"],
    },
    bestFor: "Office, Evening Parties",
    suitableFor: "Men",
  },
  {
    id: "m2",
    title: "Pocket Perfume Pack",
    subtitle: "Travel Friendly",
    image: "/image2.jpeg",
    price: 1400,
    compareAtPrice: 2100,
    badgeText: "Sale",
    rating: 4.5,
    lasting: "6 Hours",
    size: "15ml", // 👈 travel pack ke liye chhota size
    notes: {
      top: ["Lemon", "Mint"],
      middle: ["Green Apple"],
      base: ["Musk"],
    },
    bestFor: "Travel, Casual Use",
    suitableFor: "Men",
  },
  {
    id: "m3",
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
      top: ["Orange Zest"],
      middle: ["Rose"],
      base: ["Vanilla"],
    },
    bestFor: "Testing, Gift Sample",
    suitableFor: "Men",
  },
];

