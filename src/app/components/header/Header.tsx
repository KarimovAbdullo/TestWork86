"use client";

import Link from "next/link";
import styles from "./Header.module.scss";
import { FaEnvelope, FaUser } from "react-icons/fa";
import { useAuthStore } from "@/app/store/auth";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();
  const { user, logout } = useAuthStore((state) => state);

  const handleLogout = () => {
    logout();
  };

  return (
    <header className={styles.header}>
      {pathname !== "/pages/login" && (
        <div className={styles.topBar}>
          <div className={styles.contactInfo}>
            {user && (
              <>
                <FaEnvelope />
                <span>{user.email}</span>
              </>
            )}
          </div>

          {user ? (
            <div className={styles.userWrapper}>
              <span className={styles.login}>
                {user.firstName} {user.lastName}
              </span>
              <button className={styles.login} onClick={handleLogout}>
                <FaUser />
                Logout
              </button>
            </div>
          ) : (
            <Link href="/pages/login" className={styles.login}>
              <FaUser />
              Login
            </Link>
          )}
        </div>
      )}

      <div className={styles.logoSection}>
        <h1 className={styles.logo}>
          Test Shop<span className={styles.dot}>.</span>
        </h1>
      </div>

      {pathname !== "/pages/login" && (
        <nav className={styles.navbar}>
          <ul>
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="#">Hot Deals</Link>
            </li>
            <li>
              <Link href="#">Categories</Link>
            </li>
            <li>
              <Link href="#">Laptops</Link>
            </li>
            <li>
              <Link href="#">Smartphones</Link>
            </li>
            <li>
              <Link href="#">Cameras</Link>
            </li>
            <li>
              <Link href="#">Accessories</Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
