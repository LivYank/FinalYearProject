'use client';

import { useEffect, useRef, useState } from "react";
import CameraFeed from "@/components/CameraFeed";
import { Button } from "@/components/ui/button";
import { Camera } from "lucide-react";
import { Link } from "react-router-dom";
import DetectionResults from "@/components/DetectionResults";
import MainLayout from "../components/ui/MainLayout";

const Home = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  const [gestureRecognizer, setGestureRecognizer] = useState<any>(null);
  const [isStreaming, setIsStreaming] = useState(false);
  const [facingMode, setFacingMode] = useState<"user" | "environment">("environment");
  const [detectedSign, setDetectedSign] = useState<string>("");
  const [confidence, setConfidence] = useState<number>(0);

  useEffect(() => {
    const loadModel = async () => {
      const { FilesetResolver, GestureRecognizer } = await import("@mediapipe/tasks-vision");
      const vision = await FilesetResolver.forVisionTasks(
        "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
      );
      const recognizer = await GestureRecognizer.createFromOptions(vision, {
        baseOptions: {
          modelAssetPath: `${window.location.origin}/asl_gesture_recognizer.task`,
          delegate: "GPU",
        },
        runningMode: "VIDEO",
        numHands: 1,
      });
      setGestureRecognizer(recognizer);
    };
    loadModel();
  }, []);

  const handleDetection = (sign: string, conf: number) => {
    setDetectedSign(sign);
    setConfidence(conf);
  };

  const toggleFacingMode = () => {
    setFacingMode(prev => (prev === "user" ? "environment" : "user"));
  };

  return (
    <MainLayout>
      <div className="min-h-screen flex flex-col items-center px-4 pb-20 bg-background">
        {/* ✅ Top bar */}
        <header className="flex items-center justify-between w-full max-w-md mb-4">
          <img src="/logo.png" alt="Logo" className="h-8" />
          <h1 className="text-lg font-bold">iSpeak GhSL</h1>
          <Link to="/settings">
            <img src="/settings.png" alt="Settings" className="h-6" />
          </Link>
        </header>

        {/* ✅ Camera Content */}
        {gestureRecognizer ? (
          <>
            <div className="relative w-full max-w-md rounded-lg overflow-hidden border shadow">
              <CameraFeed
                gestureRecognizer={gestureRecognizer}
                onDetection={handleDetection}
                videoRef={videoRef}
                isStreaming={isStreaming}
                setIsStreaming={setIsStreaming}
                facingMode={facingMode}
              />
              <button
                onClick={toggleFacingMode}
                className="absolute top-2 right-2 bg-white rounded-full p-2 shadow"
              >
                <Camera className="h-5 w-5" />
              </button>
            </div>

            <div className="flex w-full max-w-md gap-4 mt-4">
              <Button onClick={() => setIsStreaming(true)} className="flex-1">
                Start Camera
              </Button>
              <Button variant="outline" onClick={() => setIsStreaming(false)} className="flex-1">
                Stop Camera
              </Button>
            </div>

            <div className="w-full max-w-md mt-4">
              <DetectionResults
                detectedSign={detectedSign}
                confidence={confidence}
                isHandTracked={!!detectedSign}
                isDetecting={isStreaming}
              />
            </div>
          </>
        ) : (
          <p className="text-center mt-8">Loading model...</p>
        )}
      </div>
    </MainLayout>
  );
};

export default Home;


