
import { useRef, useEffect, useState } from 'react';
import { AlertCircle, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Link } from 'react-router-dom';
import CameraFeed from '@/components/CameraFeed';
import DetectionResults from '@/components/DetectionResults';
import ImageUpload from '@/components/ImageUpload';
import VideoUpload from '@/components/VideoUpload';

const ASLTranslator = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const [isDetecting, setIsDetecting] = useState(false);
  const [isHandTracked, setIsHandTracked] = useState(false);
  const [detectedSign, setDetectedSign] = useState<string>('');
  const [confidence, setConfidence] = useState<number>(0);
  const [error, setError] = useState<string>('');
  const [videoGestureRecognizer, setVideoGestureRecognizer] = useState<any>(null);
  const [imageGestureRecognizer, setImageGestureRecognizer] = useState<any>(null);
  const [lastDetectionTime, setLastDetectionTime] = useState<number>(0);

  // Persist predictions for 3 seconds
  const PREDICTION_PERSIST_TIME = 3000;

  // Initialize MediaPipe Gesture Recognizers
  useEffect(() => {
    const initializeGestureRecognizers = async () => {
      try {
        setIsLoading(true);
        console.log('Starting to initialize gesture recognizers...');
        
        // Import MediaPipe tasks
        const { GestureRecognizer, FilesetResolver } = await import('@mediapipe/tasks-vision');
        console.log('MediaPipe tasks imported successfully');
        
        // Initialize the task
        const vision = await FilesetResolver.forVisionTasks(
          "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
        );
        console.log('Vision tasks initialized');
        
        // Create gesture recognizer for video processing
        const videoRecognizer = await GestureRecognizer.createFromOptions(vision, {
          baseOptions: {
            modelAssetPath: `${window.location.origin}/asl_gesture_recognizer.task`,
            delegate: "GPU"
          },
          runningMode: "VIDEO",
          numHands: 1
        });
        console.log('Video gesture recognizer created successfully');
        
        // Create gesture recognizer for image processing
        const imageRecognizer = await GestureRecognizer.createFromOptions(vision, {
          baseOptions: {
            modelAssetPath: `${window.location.origin}/asl_gesture_recognizer.task`,
            delegate: "GPU"
          },
          runningMode: "IMAGE",
          numHands: 1
        });
        console.log('Image gesture recognizer created successfully');
        
        setVideoGestureRecognizer(videoRecognizer);
        setImageGestureRecognizer(imageRecognizer);
        setError('');
      } catch (err) {
        console.error('Failed to initialize gesture recognizers:', err);
        setError('Failed to load the gesture recognition model. Please make sure the model file is properly uploaded to the public folder.');
      } finally {
        setIsLoading(false);
      }
    };

    initializeGestureRecognizers();
  }, []);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { width: 640, height: 480 } 
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.addEventListener('loadedmetadata', () => {
          setIsStreaming(true);
          processVideo();
        });
      }
    } catch (err) {
      setError('Failed to access camera. Please allow camera permissions.');
    }
  };

  const stopCamera = () => {
    if (videoRef.current?.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
    setIsStreaming(false);
    setIsDetecting(false);
    setIsHandTracked(false);
    setDetectedSign('');
    setConfidence(0);
    setLastDetectionTime(0);
  };

  const handleDetection = (sign: string, conf: number) => {
    setDetectedSign(sign);
    setConfidence(conf);
    setLastDetectionTime(Date.now());
  };

  const processVideo = () => {
    if (!videoGestureRecognizer || !videoRef.current || !isStreaming) return;

    const video = videoRef.current;
    
    const detectGesture = () => {
      if (video.readyState >= 2) {
        setIsDetecting(true);
        try {
          const results = videoGestureRecognizer.recognizeForVideo(video, performance.now());
          console.log('Recognition results:', results);
          
          // Check if hand is tracked
          const handDetected = results.landmarks && results.landmarks.length > 0;
          setIsHandTracked(handDetected);
          
          if (results.gestures && results.gestures.length > 0) {
            const gesture = results.gestures[0][0];
            console.log('Detected gesture:', gesture.categoryName, 'with confidence:', gesture.score);
            handleDetection(gesture.categoryName, Math.round(gesture.score * 100));
          } else {
            // Only update if no recent detection or if it's been a while
            const timeSinceLastDetection = Date.now() - lastDetectionTime;
            if (timeSinceLastDetection > PREDICTION_PERSIST_TIME) {
              handleDetection(handDetected ? 'Hand detected - no sign recognized' : 'No sign detected', 0);
            }
          }
        } catch (err) {
          console.error('Error processing video:', err);
        }
        setIsDetecting(false);
      }
      
      if (isStreaming) {
        requestAnimationFrame(detectGesture);
      }
    };
    
    detectGesture();
  };

  useEffect(() => {
    if (videoGestureRecognizer && isStreaming) {
      processVideo();
    }
  }, [videoGestureRecognizer, isStreaming]);

  return (
    <div className="min-h-screen bg-background p-2 sm:p-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6 sm:mb-8">
          <Link to="/">
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
          </Link>
          <div className="flex-1">
            <h1 className="text-2xl sm:text-4xl font-bold">ASL Gesture Recognition</h1>
            <p className="text-sm sm:text-xl text-muted-foreground mt-1">
              Recognize American Sign Language letters A through H
            </p>
          </div>
        </div>

        {error && (
          <Alert className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <Tabs defaultValue="camera" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="camera">Live Camera</TabsTrigger>
            <TabsTrigger value="image">Upload Image</TabsTrigger>
            <TabsTrigger value="video">Upload Video</TabsTrigger>
          </TabsList>
          
          <TabsContent value="camera">
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-8">
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
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-8">
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
          
          <TabsContent value="video">
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-8">
              <VideoUpload
                gestureRecognizer={videoGestureRecognizer}
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

        <div className="mt-6 sm:mt-8 text-center text-xs sm:text-sm text-muted-foreground space-y-2">
          <p>Make sure your hand is clearly visible for best results.</p>
          <p>Hold your sign steady - predictions will persist for a few seconds.</p>
        </div>
      </div>
    </div>
  );
};

export default ASLTranslator;
