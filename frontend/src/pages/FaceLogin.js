import React, { useEffect, useRef } from "react";
import * as faceapi from "face-api.js";
import { Button, Card, CardContent, Typography } from "@mui/material";
import { getAllUsers } from "../utils/faceUtils";

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
    const users = getAllUsers();

    const detection = await faceapi.detectSingleFace(
      videoRef.current,
      new faceapi.TinyFaceDetectorOptions()
    ).withFaceLandmarks().withFaceDescriptor();

    let bestMatch = null;
    let minDistance = 1;

    for (let username in users) {
      const stored = new Float32Array(users[username]);

      const distance = faceapi.euclideanDistance(
        detection.descriptor,
        stored
      );

      if (distance < minDistance) {
        minDistance = distance;
        bestMatch = username;
      }
    }

    if (minDistance < 0.5) {
      alert(`Welcome ${bestMatch}`);
      setUser(bestMatch);
    } else {
      alert("Face not recognized");
    }
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