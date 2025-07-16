import { useEffect } from "react";

interface CameraFeedProps {
  gestureRecognizer: any;
  onDetection: (sign: string, conf: number) => void;
  videoRef: React.RefObject<HTMLVideoElement>;
  isStreaming: boolean;
  setIsStreaming: (value: boolean) => void;
  facingMode: "user" | "environment";
}

const CameraFeed = ({
  gestureRecognizer,
  onDetection,
  videoRef,
  isStreaming,
  setIsStreaming,
  facingMode,
}: CameraFeedProps) => {
  useEffect(() => {
    if (!isStreaming) return;

    const startCamera = async () => {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode },
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }

      processVideo();
    };

    const processVideo = () => {
      if (!gestureRecognizer || !videoRef.current) return;

      const video = videoRef.current;

      const detect = () => {
        if (video.readyState >= 2) {
          const results = gestureRecognizer.recognizeForVideo(video, performance.now());
          if (results.gestures && results.gestures.length > 0) {
            const gesture = results.gestures[0][0];
            onDetection(gesture.categoryName, Math.round(gesture.score * 100));
          }
        }

        if (isStreaming) {
          requestAnimationFrame(detect);
        }
      };

      detect();
    };

    startCamera();

    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
        tracks.forEach((track) => track.stop());
      }
      setIsStreaming(false);
    };
  }, [gestureRecognizer, isStreaming, facingMode]);

  return <video ref={videoRef} className="w-full rounded-lg" autoPlay playsInline muted />;
};

export default CameraFeed;

