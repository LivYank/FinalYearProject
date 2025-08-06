
import React, { useState } from "react";
import MainLayout from "@/components/ui/MainLayout";

const NursingCare = () => {
  const [searchQuery, setSearchQuery] = useState("");

const nursingVideos = [
{ id: "1701", description: "How are you feeling today?" },
{ id: "1702", description: "I'm going to check your vital signs." },
{ id: "1703", description: "Please let me know if you experience any pain." },
{ id: "1704", description: "I'll help you get comfortable in bed." },
{ id: "1705", description: "You need to take your medication now." },
{ id: "1706", description: "Let me know if you need assistance with anything." },
{ id: "1707", description: "I will monitor your blood pressure regularly." },
{ id: "1708", description: "Are you experiencing any discomfort?" },
{ id: "1709", description: "Please take deep breaths for me." },
{ id: "1710", description: "I'm going to change your dressing now." },
{ id: "1711", description: "Let me know if the pain gets worse." },
{ id: "1712", description: "I will help you with your physical therapy exercises." },
{ id: "1713", description: "You need to stay hydrated and drink plenty of water." },
{ id: "1714", description: "Please take a seat and rest for a while." },
{ id: "1715", description: "It's important to follow your aftercare instructions carefully." },
{ id: "1716", description: "I'll be back shortly to check on you." },
{ id: "1717", description: "Can you rate your pain on a scale from 1 to 10?" },
{ id: "1718", description: "I need to take a blood sample for testing." },
{ id: "1719", description: "I'm going to help you with your mobility exercises." },
{ id: "1720", description: "Please lie down and relax while I take your temperature." },
{ id: "1721", description: "I'll be administering your daily medications now." },
{ id: "1722", description: "Do you need help using the restroom?" },
{ id: "1723", description: "I will assist you in changing your position to prevent bedsores." },
{ id: "1724", description: "I'm going to check your wound for any signs of infection." },
{ id: "1725", description: "Let me know if you feel dizzy or lightheaded." },
{ id: "1726", description: "I will keep an eye on your oxygen levels." },
{ id: "1727", description: "Please let me know if you need to adjust your position." },
{ id: "1728", description: "We need to monitor your blood sugar levels throughout the day." },
{ id: "1729", description: "I will help you with your meals and ensure you get proper nutrition." },
{ id: "1730", description: "You need to take short walks to improve your circulation." },
{ id: "1731", description: "I'll be helping you with your personal hygiene today." },
{ id: "1732", description: "I'm going to give you a shot to relieve the pain." },
{ id: "1733", description: "Let me know if you feel any discomfort while I clean your wound." },
{ id: "1734", description: "I'll help you get dressed and ready for your physical therapy session." },
{ id: "1735", description: "I need to check your IV line for any signs of infection." },
{ id: "1736", description: "I'll be here if you need anything, just call me." },
{ id: "1737", description: "Are you experiencing any shortness of breath?" },
{ id: "1738", description: "I will assist you with your breathing exercises." },
{ id: "1739", description: "You need to stay in bed for the next few hours to rest." },
{ id: "1740", description: "I'll make sure you're comfortable before I leave." },
{ id: "1741", description: "It's important to stay active to speed up your recovery." },
{ id: "1742", description: "I'm going to take your blood pressure now." },
{ id: "1743", description: "Please keep your wound clean and dry to reduce infection." },
{ id: "1744", description: "I will check your pulse and respiratory rate." },
{ id: "1745", description: "Let me know if you need any help with your medications." },
{ id: "1746", description: "I'll assist you with positioning to prevent any complications." },
{ id: "1747", description: "Your recovery is going well; keep following the care plan." },
{ id: "1748", description: "Let me know if you feel nauseous or unwell." },
{ id: "1749", description: "I will monitor your heart rate and temperature regularly." },
{ id: "1750", description: "It's important to stay positive and follow your care plan closely." }

];


  const filteredVideos = nursingVideos.filter((video) =>
    video.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <MainLayout>
      <div className="p-4 space-y-4 bg-[#fef2f2] min-h-screen">
        <h1 className="text-xl font-bold text-[#1a1a1a] mb-4 border-l-4 border-[#f87171] pl-3">
          Nursing/Patient Care Videos
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

export default NursingCare;