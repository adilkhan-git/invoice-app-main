import { useState } from "react";
import { TextField, Button } from "@mui/material";
import { generateToken, comparePasswords } from "../auth/authUtils";
import styles from "../styles/login.module.css";

interface User {
  id: number;
  name: string;
  email: string;
  password: string;
}

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // проверка, что поля email и password заполнены
    if (!email || !password) {
      setError("Email and password are required");
      return;
    }

    try {
      // получение данных пользователя из файла db.json
      const response = await fetch("http://localhost:8000/users");
      const users: User[] = await response.json();
      const user = users.find((user) => user.email === email);
      if (!user) {
        setError("Invalid email or password");
        return;
      }

      // сравнение введенного пароля с зашифрованным
      const isMatch = await comparePasswords(email, password, user.password);

      if (!isMatch) {
        setError("Invalid email or password");
        return;
      }

      // генерация токена
      const token = await generateToken(email); // use await here
      // сохранение токена в локальном хранилище
      localStorage.setItem("token", token);
      // перенаправление на страницу Home
      window.location.href = "/";
    } catch (err) {
      console.error(err);
      setError("An error occurred");
    }
  };

  return (
    <div className={styles.form_login}>
      <h1>Log in</h1>

      <form onSubmit={handleSubmit}>
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
        <div className={styles.login}>
          <Button variant="contained" type="submit" color="primary">
            Login
          </Button>
        </div>
        <div className={styles.register}>
          <Button
            size="small"
            variant="contained"
            color="secondary"
            onClick={() => {
              window.location.href = "/registration";
            }}
          >
            No account? Register!
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Login;
