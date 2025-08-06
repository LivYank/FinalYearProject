import { useState } from "react";
import MainLayout from "@/components/ui/MainLayout";

const visionVideos = [
  { id: "1000A", description: "This light will feel bright but won’t harm you." },
];

const Vision = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredVideos = visionVideos.filter((video) =>
    video.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <MainLayout>
      <div className="p-4 space-y-4">
        <h1 className="text-xl font-bold text-[#1a1a1a]">Emergency Videos</h1>

        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search videos..."
          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-300"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {/* Video List */}
        <div className="space-y-4 max-h-[75vh] overflow-y-auto pr-1">
          {filteredVideos.length > 0 ? (
            filteredVideos.map((video) => (
              <a
                key={video.id}
                href={`/VideoPage/${video.id}`}
                className="block cursor-pointer border rounded-xl p-4 bg-yellow-100 hover:shadow-md transition"
              >
                <p className="text-sm text-black">{video.description}</p>
              </a>
            ))
          ) : (
            <p className="text-sm text-gray-500">No videos match your search.</p>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default Vision;
