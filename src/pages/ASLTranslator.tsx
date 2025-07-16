
import { useRef, useEffect, useState } from 'react';
import { ArrowLeft, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Link } from 'react-router-dom';

import CameraFeed from '@/components/CameraFeed';
import DetectionResults from '@/components/DetectionResults';
import ImageUpload from '@/components/ImageUpload';

const ASLTranslator = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const [isDetecting, setIsDetecting] = useState(false);
  const [isHandTracked, setIsHandTracked] = useState(false);
  const [detectedSign, setDetectedSign] = useState('');
  const [confidence, setConfidence] = useState(0);
  const [error, setError] = useState('');

  const [videoGestureRecognizer, setVideoGestureRecognizer] = useState<any>(null);
  const [imageGestureRecognizer, setImageGestureRecognizer] = useState<any>(null);

  useEffect(() => {
    const loadModels = async () => {
      try {
        setIsLoading(true);
        const { GestureRecognizer, FilesetResolver } = await import('@mediapipe/tasks-vision');

        const vision = await FilesetResolver.forVisionTasks(
          'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm'
        );

        const recognizerVideo = await GestureRecognizer.createFromOptions(vision, {
          baseOptions: {
            modelAssetPath: `${window.location.origin}/asl_gesture_recognizer.task`,
            delegate: 'GPU',
          },
          runningMode: 'VIDEO',
          numHands: 1,
        });

        const recognizerImage = await GestureRecognizer.createFromOptions(vision, {
          baseOptions: {
            modelAssetPath: `${window.location.origin}/asl_gesture_recognizer.task`,
            delegate: 'GPU',
          },
          runningMode: 'IMAGE',
          numHands: 1,
        });

        setVideoGestureRecognizer(recognizerVideo);
        setImageGestureRecognizer(recognizerImage);
        setError('');
      } catch (err) {
        console.error(err);
        setError('Failed to load gesture recognition model.');
      } finally {
        setIsLoading(false);
      }
    };

    loadModels();
  }, []);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 640, height: 480 },
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.onloadedmetadata = () => {
          setIsStreaming(true);
          processVideo();
        };
      }
    } catch (err) {
      setError('Camera permission denied or unavailable.');
    }
  };

  const stopCamera = () => {
    if (videoRef.current?.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
      tracks.forEach((t) => t.stop());
      videoRef.current.srcObject = null;
    }
    setIsStreaming(false);
    setIsDetecting(false);
    setIsHandTracked(false);
    setDetectedSign('');
    setConfidence(0);
  };

  const handleDetection = (sign: string, conf: number) => {
    setDetectedSign(sign);
    setConfidence(conf);
  };

  const processVideo = () => {
    if (!videoGestureRecognizer || !videoRef.current || !isStreaming) return;

    const video = videoRef.current;

    const detect = () => {
      if (video.readyState >= 2) {
        setIsDetecting(true);
        try {
          const results = videoGestureRecognizer.recognizeForVideo(video, performance.now());
          const handDetected = results.landmarks && results.landmarks.length > 0;
          setIsHandTracked(handDetected);

          if (results.gestures?.length) {
            const gesture = results.gestures[0][0];
            handleDetection(gesture.categoryName, Math.round(gesture.score * 100));
          } else {
            handleDetection(handDetected ? 'Hand detected - no sign' : 'No sign', 0);
          }
        } catch (err) {
          console.error(err);
        }
        setIsDetecting(false);
      }
      if (isStreaming) requestAnimationFrame(detect);
    };

    detect();
  };

  useEffect(() => {
    if (videoGestureRecognizer && isStreaming) {
      processVideo();
    }
  }, [videoGestureRecognizer, isStreaming]);

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <Link to="/">
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">ASL Gesture Translator</h1>
        </div>

        {error && (
          <Alert className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <Tabs defaultValue="camera">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="camera">Live Camera</TabsTrigger>
            <TabsTrigger value="image">Upload Image</TabsTrigger>
          </TabsList>

          <TabsContent value="camera">
            <div className="grid xl:grid-cols-2 gap-4">
              <CameraFeed
                ref={videoRef}
                isStreaming={isStreaming}
                isLoading={isLoading}
                isDetecting={isDetecting}
                onStartCamera={startCamera}
                onStopCamera={stopCamera}
              />
              <DetectionResults
                detectedSign={detectedSign}
                confidence={confidence}
                isHandTracked={isHandTracked}
                isDetecting={isDetecting}
              />
            </div>
          </TabsContent>

          <TabsContent value="image">
            <div className="grid xl:grid-cols-2 gap-4">
              <ImageUpload
                gestureRecognizer={imageGestureRecognizer}
                onDetection={handleDetection}
              />
              <DetectionResults
                detectedSign={detectedSign}
                confidence={confidence}
                isHandTracked={isHandTracked}
                isDetecting={isDetecting}
              />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ASLTranslator;
