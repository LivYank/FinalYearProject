
import { useRef, forwardRef } from 'react';
import { Camera, Square, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface CameraFeedProps {
  isStreaming: boolean;
  isLoading: boolean;
  isDetecting: boolean;
  onStartCamera: () => void;
  onStopCamera: () => void;
}

const CameraFeed = forwardRef<HTMLVideoElement, CameraFeedProps>(({ 
  isStreaming, 
  isLoading, 
  isDetecting,
  onStartCamera, 
  onStopCamera 
}, ref) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  return (
    <Card>
      <CardHeader className="pb-4">
        <CardTitle className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
          <div className="flex items-center gap-2">
            <Camera className="h-4 w-4 sm:h-5 sm:w-5" />
            <span className="text-lg sm:text-2xl">Camera Feed</span>
          </div>
          {isDetecting && (
            <div className="flex items-center gap-2 text-xs sm:text-sm text-primary">
              <Loader2 className="h-3 w-3 sm:h-4 sm:w-4 animate-spin" />
              Detecting...
            </div>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative bg-black rounded-lg overflow-hidden aspect-video">
          <video
            ref={ref}
            autoPlay
            playsInline
            muted
            className="w-full h-full object-cover"
          />
          <canvas
            ref={canvasRef}
            className="absolute top-0 left-0 w-full h-full"
          />
          {!isStreaming && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-white px-4">
                <Square className="h-8 w-8 sm:h-12 sm:w-12 mx-auto mb-2 sm:mb-4 opacity-50" />
                <p className="text-sm sm:text-base">Camera not active</p>
              </div>
            </div>
          )}
        </div>
        
        <div className="flex flex-col sm:flex-row gap-2 mt-4">
          <Button 
            onClick={onStartCamera} 
            disabled={isStreaming || isLoading}
            className="flex-1 text-sm sm:text-base"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-3 w-3 sm:h-4 sm:w-4 animate-spin" />
                Loading Model...
              </>
            ) : (
              'Start Camera'
            )}
          </Button>
          <Button 
            onClick={onStopCamera} 
            disabled={!isStreaming}
            variant="outline"
            className="flex-1 text-sm sm:text-base"
          >
            Stop Camera
          </Button>
        </div>
      </CardContent>
    </Card>
  );
});

CameraFeed.displayName = 'CameraFeed';

export default CameraFeed;
