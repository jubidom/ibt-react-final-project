import { useAppContext } from "../../context/AppContext";
import styles from "./AuthForm.module.css";
import { useState } from "react";

export default function AuthForm() {
  const { authMode, toggleAuthMode, isAuthOpen, closeAuth } = useAppContext();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (authMode === "register") {
      if (formData.password !== formData.confirmPassword) {
        alert("Passwords do not match!");
        return;
      }
      console.log("Registering user:", {
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password,
      });
    } else {
      console.log("Logging in with:", {
        email: formData.email,
        password: formData.password,
      });
    }

    // Reset form fields (optional)
    setFormData({
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    });

    closeAuth();
  };

  if (!isAuthOpen) return null;

  return (
    <div className={styles.overlay} onClick={closeAuth}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <h2>{authMode === "login" ? "Login" : "Register"}</h2>

        <form onSubmit={handleSubmit}>
          {authMode === "register" && (
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
          )}

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          {authMode === "register" && (
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          )}

          <button type="submit">
            {authMode === "login" ? "Login" : "Register"}
          </button>
        </form>

        <p onClick={() => toggleAuthMode()} className={styles.switchMode}>
          {authMode === "login"
            ? "Don't have an account? Register"
            : "Already have an account? Login"}
        </p>

        <button onClick={closeAuth} className={styles.closeBtn}>
          ✖
        </button>
      </div>
    </div>
  );
}
