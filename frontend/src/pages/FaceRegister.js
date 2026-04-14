import React, { useRef, useState } from "react";
import * as faceapi from "face-api.js";
import { saveUserFace } from "../utils/faceUtils";

export default function FaceRegister() {
  const videoRef = useRef();
  const [username, setUsername] = useState("");

  const startVideo = () => {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(stream => videoRef.current.srcObject = stream);
  };

  const registerFace = async () => {
    const detection = await faceapi.detectSingleFace(
      videoRef.current,
      new faceapi.TinyFaceDetectorOptions()
    ).withFaceLandmarks().withFaceDescriptor();

    if (!detection) {
      alert("No face detected ❌");
      return;
    }

    saveUserFace(username, detection.descriptor);

    alert(`Face Registered for ${username} ✅`);
  };

  return (
    <div>
      <h2>Register Face</h2>

      <input
        placeholder="Enter username (admin/student/employer)"
        onChange={(e) => setUsername(e.target.value)}
      />

      <video ref={videoRef} autoPlay width="300" />

      <br />
      <button onClick={startVideo}>Start Camera</button>
      <button onClick={registerFace}>Register Face</button>
    </div>
  );
}