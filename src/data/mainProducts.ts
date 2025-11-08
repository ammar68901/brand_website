// src/data/mainProducts.ts
export type Product = {
  id: string;
  name: string;
  description?: string;
  image_url: string;
  price: number;
  brande: string
  category?: "Men" | "Women" | "Unisex";
};

export const mainProducts: Product[] = [
  {
    id: "p1",
    name: "Classic Perfume",
    image_url: "/image1.jpg",
    description: "A timeless scent for every occasion.",
    price: 2200,
    brande: "Hevina's",
    category: "Men",
  },
  {
    id: "p2",
    name: "Pocket Perfume Pack",
    image_url: "/image2.jpeg",
    description: "Convenient and stylish pocket-sized perfumes.",
    price: 1400,
    category: "Men",
    brande: "Hevina's",
  },
];
