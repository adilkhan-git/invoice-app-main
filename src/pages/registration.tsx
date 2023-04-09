import { useState } from "react";
import { TextField, Button } from "@mui/material";
import { hashPassword, generateToken } from "../auth/authUtils";
import { registerUser } from "../auth/api";
import styles from "../styles/registartion.module.css";

const Registration = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // проверка, что поля name, email и password заполнены
    if (!name || !email || !password) {
      setError("All fields are required");
      return;
    }

    try {
      // регистрация пользователя
      const token = await registerUser(name, email, password);
      // перенаправление на страницу Login
      window.location.href = "/login";
    } catch (err) {
      console.error(err);
      setError("An error occurred");
    }
  };

  return (
    <div className={styles.form_register}>
      <h1>Registration</h1>
      <form onSubmit={handleSubmit}>
        <div className={styles.name}>
          <TextField
            required
            label="Name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className={styles.email}>
          <TextField
            required
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className={styles.password}>
          <TextField
            required
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && <div>{error}</div>}
        <div className={styles.button}>
          <Button variant="contained" type="submit" color="primary">
            Register
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Registration;
