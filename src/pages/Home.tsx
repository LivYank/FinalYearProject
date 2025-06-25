
import { ArrowRight, Hand, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
            ASL Recognition App
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Transform your hand gestures into recognized American Sign Language letters
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="text-center">
            <CardHeader>
              <Hand className="h-12 w-12 mx-auto mb-4 text-primary" />
              <CardTitle>Real-time Detection</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Uses advanced MediaPipe technology to detect hand gestures in real-time
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <Zap className="h-12 w-12 mx-auto mb-4 text-primary" />
              <CardTitle>AI Powered</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Custom trained model specifically for ASL letters A through H
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <ArrowRight className="h-12 w-12 mx-auto mb-4 text-primary" />
              <CardTitle>Easy to Use</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Simply show your hand to the camera and see instant recognition results
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="text-center">
          <Link to="/asl-translator">
            <Button size="lg" className="text-lg px-8 py-6">
              Start ASL Translation
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>

        <div className="mt-12 text-center">
          <h2 className="text-2xl font-bold mb-6">Supported Signs</h2>
          <div className="grid grid-cols-4 md:grid-cols-8 gap-4">
            {['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'].map((letter) => (
              <div 
                key={letter} 
                className="p-4 text-center rounded-lg border bg-secondary text-2xl font-bold"
              >
                {letter}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
