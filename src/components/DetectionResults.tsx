import { Eye, EyeOff } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface DetectionResultsProps {
  detectedSign: string;
  isHandTracked: boolean;
  isDetecting: boolean;
}

const DetectionResults = ({
  detectedSign,
  isHandTracked,
  isDetecting,
}: DetectionResultsProps) => {
  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
          {isHandTracked ? (
            <span className="flex items-center text-green-600">
              <Eye className="w-4 h-4 mr-1" /> Hand Tracked
            </span>
          ) : (
            <span className="flex items-center text-gray-500">
              <EyeOff className="w-4 h-4 mr-1" /> No Hand
            </span>
          )}
        </CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col items-center">
        <div className="w-24 h-24 sm:w-32 sm:h-32 flex items-center justify-center border-4 border-black rounded-lg bg-yellow-300 text-black text-5xl sm:text-6xl font-bold">
          {detectedSign || '?'}
        </div>

        {isDetecting && (
          <p className="mt-2 text-sm text-red-600">Detecting gesture...</p>
        )}

        <div className="mt-6 w-full">
          <h3 className="text-sm font-semibold mb-2 text-center">
            Supported Signs
          </h3>
          <div className="grid grid-cols-8 gap-1 text-xs">
            {[...'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'].map((char) => (
              <span
                key={char}
                className={`p-1 border rounded ${
                  detectedSign === char
                    ? 'bg-green-600 text-white border-green-600'
                    : 'bg-white text-black'
                }`}
              >
                {char}
              </span>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DetectionResults;
