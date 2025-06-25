
import { useState, useRef, useEffect } from 'react';
import { Upload, Video, Loader2, Play, Pause } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

interface VideoUploadProps {
  gestureRecognizer: any;
  onDetection: (sign: string, confidence: number) => void;
}

const VideoUpload = ({ gestureRecognizer, onDetection }: VideoUploadProps) => {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const processingRef = useRef<boolean>(false);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('video/')) {
      const url = URL.createObjectURL(file);
      setSelectedVideo(url);
      setIsPlaying(false);
    }
  };

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const processVideoFrame = () => {
    if (!gestureRecognizer || !videoRef.current || processingRef.current) return;

    const video = videoRef.current;
    if (video.readyState >= 2 && !video.paused) {
      try {
        const results = gestureRecognizer.recognizeForVideo(video, performance.now());
        console.log('Video frame recognition results:', results);
        
        if (results.gestures && results.gestures.length > 0) {
          const gesture = results.gestures[0][0];
          onDetection(gesture.categoryName, Math.round(gesture.score * 100));
        } else {
          const handDetected = results.landmarks && results.landmarks.length > 0;
          onDetection(handDetected ? 'Hand detected - no sign recognized' : 'No sign detected', 0);
        }
      } catch (err) {
        console.error('Error processing video frame:', err);
      }
    }

    if (isPlaying && !video.paused) {
      requestAnimationFrame(processVideoFrame);
    }
  };

  const startProcessing = () => {
    setIsProcessing(true);
    processingRef.current = true;
    if (videoRef.current) {
      videoRef.current.play();
      setIsPlaying(true);
      processVideoFrame();
    }
  };

  const stopProcessing = () => {
    setIsProcessing(false);
    processingRef.current = false;
    if (videoRef.current) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  useEffect(() => {
    if (isPlaying && gestureRecognizer) {
      processVideoFrame();
    }
  }, [isPlaying, gestureRecognizer]);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      const handleEnded = () => {
        setIsPlaying(false);
        setIsProcessing(false);
        processingRef.current = false;
      };

      video.addEventListener('ended', handleEnded);
      return () => video.removeEventListener('ended', handleEnded);
    }
  }, [selectedVideo]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Upload className="h-5 w-5" />
          Upload Video
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <Input
              ref={fileInputRef}
              type="file"
              accept="video/*"
              onChange={handleFileSelect}
              className="cursor-pointer"
            />
          </div>
          
          {selectedVideo && (
            <div className="space-y-4">
              <div className="relative bg-black rounded-lg overflow-hidden aspect-video">
                <video
                  ref={videoRef}
                  src={selectedVideo}
                  className="w-full h-full object-contain"
                  controls={false}
                />
              </div>
              
              <div className="flex gap-2">
                <Button
                  onClick={togglePlayPause}
                  disabled={isProcessing}
                  variant="outline"
                  className="flex-1"
                >
                  {isPlaying ? (
                    <>
                      <Pause className="mr-2 h-4 w-4" />
                      Pause
                    </>
                  ) : (
                    <>
                      <Play className="mr-2 h-4 w-4" />
                      Play
                    </>
                  )}
                </Button>
                
                <Button
                  onClick={isProcessing ? stopProcessing : startProcessing}
                  disabled={!gestureRecognizer}
                  className="flex-1"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Stop Processing
                    </>
                  ) : (
                    <>
                      <Video className="mr-2 h-4 w-4" />
                      Start Detection
                    </>
                  )}
                </Button>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default VideoUpload;
