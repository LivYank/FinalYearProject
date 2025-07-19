import { useEffect, useRef, useState } from "react";
import CameraFeed from "@/components/CameraFeed";
import { Button } from "@/components/ui/button";
import { Camera } from "lucide-react";
import { Link } from "react-router-dom";
import DetectionResults from "@/components/DetectionResults";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Home = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  const [gestureRecognizer, setGestureRecognizer] = useState<any>(null);
  const [isStreaming, setIsStreaming] = useState(false);
  const [facingMode, setFacingMode] = useState<"user" | "environment">("environment");
  const [detectedSign, setDetectedSign] = useState<string>("");
  const [confidence, setConfidence] = useState<number>(0);
  const [activeTab, setActiveTab] = useState("camera");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);

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
    <div className="min-h-screen flex flex-col items-center px-4 pb-20 bg-background">
      {/* ✅ Top bar */}
      <header className="flex items-center justify-between w-full max-w-md mb-4">
        <img src="/logo.png" alt="Logo" className="h-8" />
        <h1 className="text-lg font-bold">iSpeak GhSL</h1>
        <Link to="/settings">
          <img src="/settings.png" alt="Settings" className="h-6" />
        </Link>
      </header>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full flex-1 flex flex-col items-center">
        <TabsContent value="camera" className="w-full flex flex-col items-center">
          {gestureRecognizer ? (
            <>
              {/* ✅ Camera box with toggle */}
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

              {/* ✅ Buttons */}
              <div className="flex w-full max-w-md gap-4 mt-4">
                <Button onClick={() => setIsStreaming(true)} className="flex-1">
                  Start Camera
                </Button>
                <Button variant="outline" onClick={() => setIsStreaming(false)} className="flex-1">
                  Stop Camera
                </Button>
              </div>

              {/* ✅ Detection card */}
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
        </TabsContent>

         <TabsContent value="upload" className="w-full flex flex-col items-center px-4 pt-6">
  <h2 className="text-lg font-semibold mb-4">Upload Image</h2>

  <input
    type="file"
    accept="image/*"
    onChange={(e) => {
      const file = e.target.files?.[0];
      if (file) {
        const previewUrl = URL.createObjectURL(file);
        setDetectedSign(""); // clear old result
        setConfidence(0);
        setSelectedImage(previewUrl);
        setImageFile(file);
      }
    }}
    className="mb-4"
  />

  {selectedImage && (
    <img
      src={selectedImage}
      alt="Uploaded preview"
      className="w-64 h-64 object-cover rounded-xl mb-4 border"
    />
  )}

  <Button
    onClick={async () => {
      if (!gestureRecognizer || !selectedImage) return;

      const image = new Image();
      image.src = selectedImage;

      image.onload = async () => {
        try {
          const result = await gestureRecognizer.recognize(image);

          if (result.gestures && result.gestures.length > 0 && result.gestures[0].length > 0) {
            const gesture = result.gestures[0][0];
            setDetectedSign(gesture.categoryName);
            setConfidence(Math.round(gesture.score * 100));
          } else {
            setDetectedSign("No clear sign detected");
            setConfidence(0);
          }
        } catch (err) {
          console.error("Recognition error:", err);
          setDetectedSign("Error occurred during prediction");
          setConfidence(0);
        }
      };
    }}
    className="bg-red-600 text-white px-6 py-2 rounded-lg text-sm shadow"
  >
    Predict Alphabet
  </Button>

  {detectedSign && (
    <div className="mt-4 text-center">
      <p className="font-semibold text-lg">Detected Sign: {detectedSign}</p>
      <p className="text-sm text-muted-foreground">Confidence: {confidence}%</p>
    </div>
  )}
</TabsContent>

        <TabsContent value="info" className="w-full flex justify-center">
          <p className="text-muted-foreground mt-8">ℹ️ GSL Algorithm Info Coming Soon</p>
        </TabsContent>

        {/* ✅ Bottom nav — fixed, compact */}
        <TabsList className="fixed bottom-0 left-0 right-0 bg-white border-t flex justify-around py-2">
          <TabsTrigger value="camera" className="text-sm">Camera</TabsTrigger>
          <TabsTrigger value="upload" className="text-sm">Upload</TabsTrigger>
          <TabsTrigger value="info" className="text-sm">Info</TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
};

export default Home;