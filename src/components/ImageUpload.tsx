import { useRef, useState, useEffect } from "react";

interface ImageUploadProps {
  gestureRecognizer: any;
  onDetection: (sign: string, conf: number) => void;
}

const ImageUpload = ({ gestureRecognizer, onDetection }: ImageUploadProps) => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const [imageBitmap, setImageBitmap] = useState<ImageBitmap | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = async () => {
      const result = reader.result as string;
      setImageSrc(result);

      // Load image into an HTMLImageElement
      const img = new Image();
      img.src = result;

      img.onload = async () => {
        const bitmap = await createImageBitmap(img);
        setImageBitmap(bitmap);
      };
    };
    reader.readAsDataURL(file);
  };

  const handleDetect = async () => {
    if (!gestureRecognizer || !imageBitmap) return;

    const results = await gestureRecognizer.recognize(imageBitmap, performance.now());

    if (results.gestures && results.gestures.length > 0) {
      const gesture = results.gestures[0][0];
      onDetection(gesture.categoryName, Math.round(gesture.score * 100));
    }
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      {imageSrc && (
        <>
          <img ref={imageRef} src={imageSrc} alt="Uploaded" className="w-full rounded-lg" />
          <button onClick={handleDetect} className="mt-2 px-4 py-1 bg-blue-600 text-white rounded">
            Detect
          </button>
        </>
      )}
    </div>
  );
};

export default ImageUpload;
