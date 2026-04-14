// Login.js
import React, { useState } from "react";
import axios from "axios";

export default function Login({ setUser }) {
  const [data, setData] = useState({ username: "", password: "" });

  const login = async () => {
    const res = await axios.post("http://localhost:5000/login", data);
    if (res.data.success) {
      setUser(res.data.role);
    } else {
      alert("Invalid login");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <input placeholder="username"
        onChange={(e)=>setData({...data, username:e.target.value})}/>
      <input placeholder="password"
        type="password"
        onChange={(e)=>setData({...data, password:e.target.value})}/>
      <button onClick={login}>Login</button>
    </div>
  );
}