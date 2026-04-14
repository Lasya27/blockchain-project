import { Card, CardContent, Typography, Button } from "@mui/material";
import axios from "axios";

export default function Admin() {

  const upload = async (e) => {
    const form = new FormData();
    form.append("file", e.target.files[0]);

    const res = await axios.post("http://localhost:5000/upload", form);

    alert("Certificate Issued!");
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h5">Admin Dashboard</Typography>

        <input type="file" onChange={upload} />

        <Button variant="contained" style={{ marginTop: 20 }}>
          Upload Certificate
        </Button>
      </CardContent>
    </Card>
  );
}