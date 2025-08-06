
import MainLayout from "@/components/ui/MainLayout";

const emergencyVideos = [
  { id: "EM001", title: "First Aid Basics", description: "Learn how to handle emergencies before help arrives." },
  { id: "EM002", title: "CPR Training", description: "How to perform CPR on adults and children." },
  { id: "EM003", title: "Emergency Room Tour", description: "What to expect during an ER visit." },
];

const Emergency = () => {
  return (
    <MainLayout>
      <div className="p-4 space-y-4">
        <h1 className="text-xl font-bold mb-4 text-[#1a1a1a]">Emergency Videos</h1>
        {emergencyVideos.map((video) => (
          <a
            key={video.id}
            href={`/VideoPage/${video.id}`}
            className="block cursor-pointer border rounded-xl p-4 bg-[#fff3e0] hover:shadow-md transition"
          >
            <h2 className="text-lg font-semibold">{video.title}</h2>
            <p className="text-sm text-gray-700">{video.description}</p>
          </a>
        ))}
      </div>
    </MainLayout>
  );
};

export default Emergency;