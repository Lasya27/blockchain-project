import React, { useState } from "react";
import { Container } from "@mui/material";
import FaceLogin from "./pages/FaceLogin";
import Admin from "./pages/AdminDashboard";
import Student from "./pages/StudentDashboard";
import Employer from "./pages/EmployerDashboard";

function App() {
  const [user, setUser] = useState(null);

  let content;

  if (!user) content = <FaceLogin setUser={setUser} />;
  else if (user === "admin") content = <Admin />;
  else if (user === "student") content = <Student />;
  else content = <Employer />;

  return (
    <Container maxWidth="md" style={{ marginTop: "40px" }}>
      {content}
    </Container>
  );
}

export default App;