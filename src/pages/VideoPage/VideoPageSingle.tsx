import MainLayout from "@/components/ui/MainLayout"; // Layout wrapper
import { useParams } from "react-router-dom";

const VideoPage = () => {
  const { id } = useParams();

  return (
    <MainLayout>
      <div className="min-h-screen bg-[#fff8f0] flex flex-col items-center justify-start py-10 px-4">
        <div className="w-full max-w-2xl bg-white rounded-2xl shadow-md p-6">
          <h1 className="text-2xl font-bold text-[#6a1b1a] mb-6 text-center">
            Sign Video: {id}
          </h1>
          <video className="w-full rounded-lg shadow" controls>
            <source src={`/SignTalkDataset/${id}.mp4`} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </MainLayout>
  );
};

export default VideoPage;


