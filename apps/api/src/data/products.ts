export interface Product {
  id: string;
  category:
    | "Laptop"
    | "Monitor"
    | "Keyboard"
    | "Mouse"
    | "Headphones"
    | "Webcam";
  brand: string;
  name: string;
  price: number;
  rating: number;
  warranty: number;
  stock: number;
  tags: string[];
}

export const products: Product[] = [
  // =============================
  // Laptops
  // =============================
  {
    id: "lap-1",
    category: "Laptop",
    brand: "Dell",
    name: "Dell Inspiron 15",
    price: 55000,
    rating: 4.5,
    warranty: 2,
    stock: 12,
    tags: ["developer", "office", "coding"],
  },

  {
    id: "lap-2",
    category: "Laptop",
    brand: "Lenovo",
    name: "Lenovo IdeaPad Slim 5",
    price: 62000,
    rating: 4.7,
    warranty: 2,
    stock: 8,
    tags: ["developer", "coding"],
  },

  {
    id: "lap-3",
    category: "Laptop",
    brand: "HP",
    name: "HP Pavilion 15",
    price: 58000,
    rating: 4.4,
    warranty: 1,
    stock: 15,
    tags: ["office", "developer"],
  },

  // =============================
  // Monitors
  // =============================
  {
    id: "mon-1",
    category: "Monitor",
    brand: "LG",
    name: 'LG 24" IPS',
    price: 11000,
    rating: 4.7,
    warranty: 3,
    stock: 20,
    tags: ["developer", "office"],
  },

  {
    id: "mon-2",
    category: "Monitor",
    brand: "Samsung",
    name: 'Samsung 27" FHD',
    price: 14500,
    rating: 4.6,
    warranty: 3,
    stock: 10,
    tags: ["developer", "design"],
  },

  // =============================
  // Keyboard
  // =============================
  {
    id: "key-1",
    category: "Keyboard",
    brand: "Logitech",
    name: "MX Keys Mini",
    price: 8500,
    rating: 4.9,
    warranty: 2,
    stock: 18,
    tags: ["developer", "wireless"],
  },

  {
    id: "key-2",
    category: "Keyboard",
    brand: "Redragon",
    name: "K552 Mechanical",
    price: 3500,
    rating: 4.6,
    warranty: 1,
    stock: 22,
    tags: ["gaming", "developer"],
  },

  // =============================
  // Mouse
  // =============================
  {
    id: "mouse-1",
    category: "Mouse",
    brand: "Logitech",
    name: "MX Master 3S",
    price: 8500,
    rating: 4.9,
    warranty: 2,
    stock: 10,
    tags: ["developer", "wireless"],
  },

  {
    id: "mouse-2",
    category: "Mouse",
    brand: "Logitech",
    name: "M331 Silent",
    price: 1300,
    rating: 4.5,
    warranty: 1,
    stock: 30,
    tags: ["office"],
  },

  // =============================
  // Webcam
  // =============================
  {
    id: "cam-1",
    category: "Webcam",
    brand: "Logitech",
    name: "C920 HD",
    price: 6500,
    rating: 4.8,
    warranty: 2,
    stock: 12,
    tags: ["meeting", "developer"],
  },

  // =============================
  // Headphones
  // =============================
  {
    id: "head-1",
    category: "Headphones",
    brand: "Sony",
    name: "WH-CH520",
    price: 4500,
    rating: 4.7,
    warranty: 1,
    stock: 25,
    tags: ["meeting", "wireless"],
  },
];
