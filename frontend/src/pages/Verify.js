import { useState } from "react";
import axios from "axios";

export default function Verify() {
  const [hash, setHash] = useState("");

  const verify = async () => {
    const res = await axios.get(`http://localhost:5000/verify/${hash}`);
    alert(res.data.valid ? "✅ Valid Certificate" : "❌ Fake Certificate");
  };

  return (
    <div>
      <h2>Verify Certificate</h2>

      <input
        placeholder="Enter Certificate Hash"
        onChange={(e) => setHash(e.target.value)}
      />

      <button onClick={verify}>Verify</button>
    </div>
  );
}