// src/data/mainProducts.ts
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
  bestFor?: string;
  suitableFor?: "Men" | "Women" | "Unisex";
};

export const mainProducts: Product[] = [
  {
    id: "p1",
    title: "Classic Perfume",
    subtitle: "Luxury Scent",
    image: "/image1.jpg",
    price: 2200,
    compareAtPrice: 3400,
    badgeText: "Sale",
    rating: 4.7,
    lasting: "8 Hours",
    size: "50ml",
    notes: {
      top: ["Citrus", "Lavender"],
      middle: ["Spice", "Rose"],
      base: ["Amber", "Musk"],
    },
    bestFor: "Daily Wear, Office",
    suitableFor: "Men",
  },
  {
    id: "p2",
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
      top: ["Mint", "Bergamot"],
      middle: ["Green Apple"],
      base: ["Cedarwood"],
    },
    bestFor: "Travel, On-the-go",
    suitableFor: "Men",
  },
  {
    id: "p3",
    title: "Deep Oud Perfume",
    subtitle: "Long Lasting",
    image: "/images3.jpeg",
    price: 2300,
    compareAtPrice: 3600,
    badgeText: "Sale",
    rating: 4.8,
    lasting: "12 Hours",
    size: "50ml",
    notes: {
      top: ["Oud", "Saffron"],
      middle: ["Patchouli"],
      base: ["Woody", "Amber"],
    },
    bestFor: "Parties, Evening Wear",
    suitableFor: "Women",
  },
  {
    id: "p4",
    title: "Royal Musk",
    subtitle: "Premium Fragrance",
    image: "/image2.jpeg",
    price: 2500,
    compareAtPrice: 3800,
    badgeText: "Sale",
    rating: 4.6,
    lasting: "10 Hours",
    size:"100ml",
    notes: {
      top: ["White Musk"],
      middle: ["Floral Accord"],
      base: ["Ambergris"],
    },
    bestFor: "Special Occasions, Weddings",
    suitableFor: "Women",
  },
];
