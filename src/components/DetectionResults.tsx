
import { CheckCircle, Eye, EyeOff } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface DetectionResultsProps {
  detectedSign: string;
  confidence: number;
  isHandTracked: boolean;
  isDetecting: boolean;
}

const DetectionResults = ({ detectedSign, confidence, isHandTracked, isDetecting }: DetectionResultsProps) => {
  return (
    <Card>
      <CardHeader className="pb-4">
        <CardTitle className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
          <span className="text-lg sm:text-2xl">Detection Results</span>
          <div className="flex items-center gap-2">
            {isHandTracked ? (
              <div className="flex items-center gap-1 text-green-600 text-xs sm:text-sm">
                <Eye className="h-3 w-3 sm:h-4 sm:w-4" />
                Hand Tracked
              </div>
            ) : (
              <div className="flex items-center gap-1 text-gray-500 text-xs sm:text-sm">
                <EyeOff className="h-3 w-3 sm:h-4 sm:w-4" />
                No Hand
              </div>
            )}
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 sm:space-y-6">
          <div className="text-center">
            <div className="text-4xl sm:text-6xl font-bold mb-2 text-primary">
              {detectedSign && detectedSign !== 'No sign detected' ? detectedSign : '?'}
            </div>
            <p className="text-sm sm:text-lg text-muted-foreground">
              {detectedSign || 'Waiting for detection...'}
            </p>
            {isDetecting && (
              <div className="mt-2 text-xs sm:text-sm text-blue-600 flex items-center justify-center gap-1">
                <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
                Processing gesture...
              </div>
            )}
          </div>
          
          {confidence > 0 && (
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs sm:text-sm font-medium">Confidence</span>
                <span className="text-xs sm:text-sm text-muted-foreground flex items-center gap-1">
                  {confidence}%
                  {confidence > 80 && <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-green-600" />}
                </span>
              </div>
              <div className="w-full bg-secondary rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-300 ${
                    confidence > 80 ? 'bg-green-500' : 
                    confidence > 60 ? 'bg-yellow-500' : 'bg-red-500'
                  }`}
                  style={{ width: `${confidence}%` }}
                />
              </div>
            </div>
          )}

          <div className="border-t pt-4">
            <h3 className="font-semibold mb-2 text-sm sm:text-base">Supported Signs</h3>
            <div className="grid grid-cols-4 sm:grid-cols-4 gap-1 sm:gap-2">
              {['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'].map((letter) => (
                <div 
                  key={letter} 
                  className={`p-1 sm:p-2 text-center rounded border transition-colors text-sm sm:text-base ${
                    detectedSign === letter 
                      ? 'bg-primary text-primary-foreground border-primary' 
                      : 'bg-secondary'
                  }`}
                >
                  {letter}
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DetectionResults;
