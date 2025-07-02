"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useAuthStore } from "../../store/auth";
import styles from "./login.module.scss";
import { ClipLoader } from "react-spinners";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const login = useAuthStore((state) => state.login);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    if (username.length < 3 || password.length < 3) {
      setIsSubmitting(false);
      return setError(
        "Имя пользователя и пароль должны быть не короче 3 символов"
      );
    }

    try {
      const res = await axios.post("https://dummyjson.com/auth/login", {
        username,
        password,
      });

      login({
        firstName: res.data.firstName,
        lastName: res.data.lastName,
        email: res.data.email,
        token: res.data.token,
      });

      router.push("/pages/products");
    } catch (err) {
      setError("Неверное имя пользователя или пароль!");
      console.log(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.loginForm}>
      <h2>Login</h2>

      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className={styles.input}
        placeholder="Имя пользователя"
      />

      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className={styles.input}
        placeholder="Пароль"
      />

      <button type="submit" className={styles.button} disabled={isSubmitting}>
        {isSubmitting ? <ClipLoader color="#ffffff" size={20} /> : "Login"}
      </button>

      {error && <p className={styles.error}>{error}</p>}
    </form>
  );
}
