import { useState } from "react";
import { TextField, Button } from "@mui/material";
import { hashPassword, generateToken } from "../auth/authUtils";
import { registerUser } from "../auth/api";

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
    <form onSubmit={handleSubmit}>
      <div>
        <TextField
          required
          label="Name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
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
          Register
        </Button>
      </div>
    </form>
  );
};

export default Registration;
