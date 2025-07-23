import React, { useState } from "react";
import { login } from "../../api/adminRequests";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
import "./AdminLogin.scss";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", password: "" });

  
  const [error, setError] = useState("");
  
  const handleSubmit = async (e) => {
      e.preventDefault();
      setError("");

    try {
      const res = await login(form);

      localStorage.setItem("adminToken", res.data.token); // You can use JWT
      message.success("Admin muvaffaqiyatli kirdi!");
      navigate("/admin/dashboard"); // Or wherever your admin panel is
    } catch (err) {
      setError("⚠️ Login yoki parol noto‘g‘ri.");
    }
  };

  return (
    <div className="admin-login">
      <form onSubmit={handleSubmit}>
        <h2>Adminlar uchun kirish</h2>

        <input
          type="text"
          placeholder="Foydalanuvchi nomi"
          value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
          required
        />

        <input
          type="password"
          placeholder="Parol"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
        />

        <button type="submit">🔐 Kirish</button>

        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
};

export default AdminLogin;