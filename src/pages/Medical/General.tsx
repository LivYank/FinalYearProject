
import React, { useState } from "react";
import MainLayout from "@/components/ui/MainLayout";

const General = () => {
  const [searchQuery, setSearchQuery] = useState("");

const generalVideos = [
  { id: "10A", description: "Can I get directions to the lab?" },
  { id: "100A", description: "Is there a patient recovery room?" }, 
  { id: "101A", description: "Can I get a copy of my test results?" }, 
  { id: "102A", description: "Where is the nearest laundry?" }, 
  { id: "103A", description: "Is there a patient rehabilitation center?" },
  { id: "104A", description: "Please take a seat." },
  { id: "105A", description: "Walk to the far end." },
  { id: "106A", description: "Is there any queit room?" },
  { id: "107A", description: "The security guard is at the entrance" },
  { id: "108A", description: "Please follow the nurse to the examination room." },
  { id: "109A", description: "You can wait here until we are ready for you." }, 
];


  const filteredVideos = generalVideos.filter((video) =>
    video.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <MainLayout>
      <div className="p-4 space-y-4 bg-[#fdfaf6] min-h-screen">
        <h1 className="text-xl font-bold text-[#1a1a1a] mb-4 border-l-4 border-[#fcd34d] pl-3">
          General Hospital Interaction Videos
        </h1>

        <input
          type="text"
          placeholder="Search videos..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full p-2 border border-[#ffd54f] rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#43a047] bg-white"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {filteredVideos.map((video) => (
            <a
              key={video.id}
              href={`/VideoPage/${video.id}`}
              className="block border rounded-xl p-4 bg-yellow-100 hover:scale-[1.01]"
            >
              <h2 className="text-lg font-semibold text-black">{video.description}</h2>
            </a>
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default General;
