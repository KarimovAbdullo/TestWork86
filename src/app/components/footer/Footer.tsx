"use client";
import { useAuthStore } from "../../store/auth";
import styles from "./Footer.module.scss";

export default function Footer() {
  const user = useAuthStore((state) => state.user);
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <p>
        {year} {user ? `Logged as ${user.email}` : ""}
      </p>
    </footer>
  );
}
