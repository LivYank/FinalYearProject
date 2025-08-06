
import React, { useState } from "react";
import MainLayout from "@/components/ui/MainLayout";

const General = () => {
  const [searchQuery, setSearchQuery] = useState("");

const generalVideos = [
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
  { id: "1", description: "Where is the hospital entrance?" },
  { id: "2", description: "Can I speak to the receptionist?" },
  { id: "3", description: "What time does the hospital open?" },
  { id: "4", description: "Do I need an appointment to see the doctor?" },
  { id: "5", description: "Is the emergency room open?" },
  { id: "6", description: "Where is the waiting area?" },
  { id: "7", description: "What floor is the pediatric ward on?" },
  { id: "8", description: "Please take a seat in the waiting room." },
  { id: "9", description: "Do you have your health insurance card?" },
  { id: "10A", description: "Can I get directions to the lab?" },
  { id: "11", description: "I am here to visit a patient." },
  { id: "12", description: "What are the visiting hours?" },
  { id: "13", description: "Can I see the doctor now?" },
  { id: "14", description: "Is this the maternity ward?" },
  { id: "15", description: "How long do I have to wait?" },
  { id: "16", description: "Please sign in at the front desk." },
  { id: "17", description: "Where can I find the drugs store?" },
  { id: "18", description: "What is your full name?" },
  { id: "19", description: "Please take a number and wait your turn." },
  { id: "20", description: "Are there elevators in this building?" },
  { id: "21", description: "The cafeteria is on the ground floor." },
  { id: "22", description: "Where is the nearest restroom?" },
  { id: "23", description: "Do you accept walk-in patients (first timers)?" },
  { id: "24", description: "Can I have a copy of my medical records?" },
  { id: "25", description: "What services does this hospital provide?" },
  { id: "26", description: "Do you have a parking space available?" },
  { id: "27", description: "Can I have a wheel chair?" },
  { id: "28", description: "Is the doctor running late?" },
  { id: "29", description: "Please go to Room 5 for your consultation." },
  { id: "30", description: "Where is the radiology department?" },
  { id: "31", description: "Where is the outpatient department (OPD)?" },
  { id: "32", description: "Is this a private or government hospital?" },
  { id: "33", description: "How much is the consultation fee?" },
  { id: "34", description: "I need help filling out this form." },
  { id: "35", description: "Can I have a translator?" },
  { id: "36", description: "The nurse will call you shortly." },
  { id: "37", description: "Who is the doctor on duty?" },
  { id: "38", description: "I am here for a follow-up appointment." },
  { id: "39", description: "Where can I get my blood test done?" },
  { id: "40", description: "What should I do after registration?" }
];


  const filteredVideos = generalVideos.filter((video) =>
    video.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <MainLayout>
      <div className="p-4 space-y-4 bg-[#fef2f2] min-h-screen">
        <h1 className="text-xl font-bold text-[#1a1a1a] mb-4 border-l-4 border-[#f87171] pl-3">
          General Hospital Interactions Videos
        </h1>

        <input
          type="text"
          placeholder="Search videos..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full p-2 border border-[#f87171] rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 bg-white"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {filteredVideos.map((video) => (
            <a
              key={video.id}
              href={`/VideoPage/${video.id}`}
              className="block border rounded-xl p-4 bg-red-100 hover:scale-[1.01]"
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