import { useState } from "react";
import { FaUser, FaLock } from "react-icons/fa";

import "./Register.css";
import { signUp } from "../../services/api";

const Login = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    try {
      const response = await signUp(name, email, password);
  
      alert("Usuário criado com sucesso!");
      console.log("Usuario criado", response);
    } catch (error: any) {
      console.error("Erro:", error.response?.data || error.message);
      alert(`Error: ${error.response?.data.message}`);
    }
  };
  
  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <h1>Acesse o sistema</h1>
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
            type="text"
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
        <button type="submit">Criar</button>
        <div className="signup-link">
          <p>
            Já possui uma conta? <a href="/">Login</a>{" "}
          </p>
        </div>
      </form>
    </div>
  )
}

export default Login
