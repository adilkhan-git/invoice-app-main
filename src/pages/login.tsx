import { useState } from "react";
import { TextField, Button } from "@mui/material";
import { generateToken, comparePasswords } from "../auth/authUtils";

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
    <form onSubmit={handleSubmit}>
      <div>
        <TextField
          required
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <TextField
          required
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      {error && <div>{error}</div>}
      <div>
        <Button variant="contained" type="submit" color="primary">
          Login
        </Button>
      </div>
    </form>
  );
};

export default Login;
