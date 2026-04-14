import { useState } from "react";
import axios from "axios";
import { Card, CardContent, Typography, Button, TextField } from "@mui/material";

export default function Employer() {
  const [hash, setHash] = useState("");

  const verify = async () => {
    const res = await axios.get(`http://localhost:5000/verify/${hash}`);
    alert(res.data.valid ? "Valid Certificate" : "Fake Certificate");
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h5">Verify Certificate</Typography>

        <TextField
          fullWidth
          label="Enter Certificate Hash"
          onChange={(e) => setHash(e.target.value)}
          style={{ marginTop: 20 }}
        />

        <Button variant="contained" onClick={verify} style={{ marginTop: 20 }}>
          Verify
        </Button>
      </CardContent>
    </Card>
  );
}