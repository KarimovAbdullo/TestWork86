export const BASE_URL = "https://dummyjson.com";

export const API_ENDPOINTS = {
  LOGIN: `${BASE_URL}/auth/login`,
  PRODUCTS: `${BASE_URL}/products?limit=12`,
  getProductById: (id: number) => `${BASE_URL}/products/${id}`,
};