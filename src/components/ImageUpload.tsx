
import { useState, useRef } from 'react';
import { Upload, Image, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

interface ImageUploadProps {
  gestureRecognizer: any;
  onDetection: (sign: string, confidence: number) => void;
}

const ImageUpload = ({ gestureRecognizer, onDetection }: ImageUploadProps) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const processImage = async () => {
    if (!gestureRecognizer || !imageRef.current) return;

    setIsProcessing(true);
    try {
      const results = gestureRecognizer.recognize(imageRef.current);
      console.log('Image recognition results:', results);
      
      if (results.gestures && results.gestures.length > 0) {
        const gesture = results.gestures[0][0];
        onDetection(gesture.categoryName, Math.round(gesture.score * 100));
      } else {
        const handDetected = results.landmarks && results.landmarks.length > 0;
        onDetection(handDetected ? 'Hand detected - no sign recognized' : 'No sign detected', 0);
      }
    } catch (err) {
      console.error('Error processing image:', err);
      onDetection('Error processing image', 0);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Upload className="h-5 w-5" />
          Upload Image
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <Input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="cursor-pointer"
            />
          </div>
          
          {selectedImage && (
            <div className="space-y-4">
              <div className="relative bg-black rounded-lg overflow-hidden aspect-video">
                <img
                  ref={imageRef}
                  src={selectedImage}
                  alt="Selected image"
                  className="w-full h-full object-contain"
                  crossOrigin="anonymous"
                />
              </div>
              
              <Button
                onClick={processImage}
                disabled={isProcessing || !gestureRecognizer}
                className="w-full"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing Image...
                  </>
                ) : (
                  <>
                    <Image className="mr-2 h-4 w-4" />
                    Detect Sign in Image
                  </>
                )}
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ImageUpload;
