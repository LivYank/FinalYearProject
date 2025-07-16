
import { useState, useRef } from 'react';
import { Upload, Image, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

interface Props {
  gestureRecognizer: any;
  onDetection: (sign: string, confidence: number) => void;
}

const ImageUpload = ({ gestureRecognizer, onDetection }: Props) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const imageRef = useRef<HTMLImageElement>(null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const processImage = () => {
    if (!gestureRecognizer || !imageRef.current) return;

    setIsProcessing(true);
    try {
      const results = gestureRecognizer.recognize(imageRef.current);
      if (results.gestures?.length) {
        const gesture = results.gestures[0][0];
        onDetection(gesture.categoryName, Math.round(gesture.score * 100));
      } else {
        const handDetected = results.landmarks && results.landmarks.length > 0;
        onDetection(handDetected ? 'Hand detected - no sign' : 'No sign', 0);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <Upload className="h-5 w-5 inline mr-2" />
          Upload Image
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Input type="file" accept="image/*" onChange={handleFile} />
        {selectedImage && (
          <>
            <div className="mt-4">
              <img ref={imageRef} src={selectedImage} alt="Uploaded" className="w-full rounded" />
            </div>
            <Button onClick={processImage} disabled={isProcessing || !gestureRecognizer} className="mt-4">
              {isProcessing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <Image className="mr-2 h-4 w-4" />
                  Detect Sign
                </>
              )}
            </Button>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default ImageUpload;
