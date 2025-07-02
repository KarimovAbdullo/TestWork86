import { create } from "zustand";

interface Product {
  id: number;
  title: string;
  category: string;
  price: number;
  thumbnail: string;
}

interface ProductState {
  products: Product[];
  loading: boolean;
  setProducts: (products: Product[]) => void;
  setLoading: (loading: boolean) => void;
}

export const useProductStore = create<ProductState>((set) => ({
  products: [],
  loading: true,
  setProducts: (products) => set({ products }),
  setLoading: (loading) => set({ loading }),
}));
