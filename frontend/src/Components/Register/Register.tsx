import { useState } from "react";
import { FaUser, FaLock } from "react-icons/fa";

import "./Register.css";
import { signUp } from "../../services/api";

const Register = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("As senhas não coincidem.");
      return;
    }

    try {
      const response = await signUp(name, email, password);

      alert("Usuário criado com sucesso!");
      console.log("Usuário criado", response);
    } catch (error: any) {
      console.error("Erro:", error.response?.data || error.message);
      alert(`Erro: ${error.response?.data.message}`);
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <h1>Crie sua conta</h1>

        <div className="input-field">
          <input
            type="text"
            placeholder="Nome"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <FaUser className="icon" />
        </div>

        <div className="input-field">
          <input
            type="email"
            placeholder="E-mail"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <FaUser className="icon" />
        </div>

        <div className="input-field">
          <input
            type="password"
            placeholder="Senha"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <FaLock className="icon" />
        </div>

        <div className="input-field">
          <input
            type="password"
            placeholder="Confirmar Senha"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <FaLock className="icon" />
        </div>

        <button type="submit">Criar</button>

        <div className="signup-link">
          <p>
            Já possui uma conta? <a href="/">Login</a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Register;
