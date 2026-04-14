import React, { useEffect, useRef } from "react";
import * as faceapi from "face-api.js";
import { Button, Card, CardContent, Typography } from "@mui/material";


export default function FaceLogin({ setUser }) {
  const videoRef = useRef();

  useEffect(() => {
    loadModels();
    startVideo();
  }, []);

  const startVideo = () => {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(stream => videoRef.current.srcObject = stream);
  };

  const loadModels = async () => {
    const MODEL_URL = "/models";

    await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
    await faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL);
    await faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL);
  };

  const login = async () => {
    alert("Login Success");
    setUser("student");
  };

  return (
    <Card>
      <CardContent style={{ textAlign: "center" }}>
        <Typography variant="h5">Face Login</Typography>

        <video ref={videoRef} autoPlay width="100%" style={{ marginTop: 20 }} />

        <Button variant="contained" color="primary" onClick={login} style={{ marginTop: 20 }}>
          Login
        </Button>
      </CardContent>
    </Card>
  );
}