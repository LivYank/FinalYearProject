
import MainLayout from "@/components/ui/MainLayout"; // Adjust path if needed
import { useParams } from "react-router-dom";

const VideoPage = () => {
  const { id } = useParams();

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Video for Sign ID: {id}</h1>
      <video width="100%" controls>
        <source src={`/SignTalkDataset/${id}.mp4`} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};
export default VideoPage;

