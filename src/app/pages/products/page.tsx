"use client";

import { useEffect } from "react";
import axios from "axios";
import { useAuthStore } from "../../store/auth";
import { useProductStore } from "../../store/products";
import styles from "./products.module.scss";
import { ClipLoader } from "react-spinners";
import { API_ENDPOINTS } from "../../constants/api";

export default function ProductsPage() {
  const user = useAuthStore((state) => state.user);
  const { products, loading, setProducts, setLoading } = useProductStore();

  useEffect(() => {
    setLoading(true);
    axios
      .get(API_ENDPOINTS.PRODUCTS)
      .then((res) => setProducts(res.data.products))
      .finally(() => setLoading(false));
  }, [setLoading, setProducts]);

  if (loading)
    return (
      <div className={styles.spinnerWrapper}>
        <ClipLoader color="#f02c56" size={70} />
      </div>
    );

  return (
    <div className={styles.grid}>
      {products.map((product) => (
        <div key={product.id} className={styles.card}>
          <img
            src={product.thumbnail}
            alt={product.title}
            className={styles.image}
          />
          <h3 className={styles.title}>{product.title}</h3>
          <p className={styles.category}>{product.category}</p>
          <p className={styles.price}>${product.price}</p>
          {user && <button className={styles.button}>Add to cart</button>}
        </div>
      ))}
    </div>
  );
}
