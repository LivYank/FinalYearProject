
import React, { useState } from "react";
import MainLayout from "@/components/ui/MainLayout";

const Treatment = () => {
  const [searchQuery, setSearchQuery] = useState("");

const treatmentVideos = [
  
  { id: "701", description: "You need a blood test to confirm the diagnosis." },
  { id: "702", description: "This treatment will help reduce inflammation." },
  { id: "703", description: "We will start with a physical examination." },
  { id: "704", description: "I recommend you take this medication twice a day." },
  { id: "705", description: "The doctor will review your test results shortly." },
  { id: "706", description: "Your diagnosis shows that you have a bacterial infection." },
  { id: "707", description: "This treatment should alleviate the pain." },
  { id: "708", description: "We need to monitor your symptoms closely." },
  { id: "709", description: "You will need a follow-up appointment in two weeks." },
  { id: "710", description: "The test results show no signs of infection." },
  { id: "711", description: "You have been diagnosed with hypertension." },
  { id: "712", description: "This medication will help manage your condition." },
  { id: "713", description: "The doctor has prescribed a new treatment plan." },
  { id: "714", description: "You will need to take this medication with food." },
  { id: "715", description: "Your blood pressure is elevated; we need to control it." },
  { id: "716", description: "We have to perform a CT scan to get a clearer picture." },
  { id: "717", description: "The MRI results show some inflammation." },
  { id: "718", description: "You need to rest and drink plenty water." },
  { id: "719", description: "The treatment will begin after your surgery." },
  { id: "720", description: "We need to do some tests to determine the cause of your symptoms." },
  { id: "721", description: "This diagnosis requires immediate treatment." },
  { id: "722", description: "The doctor will explain your treatment options." },
  { id: "723", description: "You need to take this prescription for 10 days." },
  { id: "724", description: "The surgery was successful, and you should recover soon." },
  { id: "725", description: "Your condition has improved with the new treatment." },
  { id: "726", description: "We need to adjust your dosage to avoid side effects." },
  { id: "727", description: "The test results confirm that you have a viral infection." },
  { id: "728", description: "I'll prescribe some antibiotics for your condition." },
  { id: "729", description: "The X-ray shows no fractures." },
  { id: "730", description: "We will monitor your condition to see if it improves." },
  { id: "731", description: "You may need physical therapy after the surgery." },
  { id: "732", description: "The doctor will discuss the potential side effects of this medication." },
  { id: "733", description: "You will need to stay in the hospital overnight." },
  { id: "734", description: "Your diagnosis requires further tests to rule out other conditions." },
  { id: "735", description: "We need to change your medication due to side effects." },
  { id: "736", description: "I'll refer you to a specialist for further evaluation." },
  { id: "737", description: "The doctor will review your condition progress during the next visit." },
  { id: "738", description: "You will need to rest and avoid strenuous activity." },
  { id: "739", description: "This is a long-term treatment plan that may take months." },
  { id: "740", description: "We have to treat this condition with a combination of medications." },
  { id: "741", description: "The doctor has recommended surgery to treat this condition." },
  { id: "742", description: "This therapy will help you recover faster." },
  { id: "743", description: "We will prescribe a painkiller to ease your discomfort." },
  { id: "744", description: "Your symptoms suggest a respiratory infection." },
  { id: "745", description: "You may need an operation to remove the tumor." },
  { id: "746", description: "You should start seeing improvements in a few days." },
  { id: "747", description: "The doctor will monitor your heart rate throughout the treatment." },
  { id: "748", description: "You need to take these medications at specific times of the day." },
  { id: "749", description: "We will run more tests to confirm the diagnosis." },
  { id: "750", description: "You will receive a follow-up call after your appointment." }
];

const filteredVideos = treatmentVideos.filter((video) =>
    video.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <MainLayout>
      <div className="p-4 space-y-4 bg-[#f0fdf4] min-h-screen">
        <h1 className="text-xl font-bold text-[#1a1a1a] mb-4 border-l-4 border-[#4ade80] pl-3">
          Treatment and Diagnosis Videos
        </h1>

        <input
          type="text"
          placeholder="Search videos..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full p-2 border border-[#4ade80] rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 bg-white"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {filteredVideos.map((video) => (
            <a
              key={video.id}
              href={`/VideoPage/${video.id}`}
              className="block border rounded-xl p-4 bg-green-100 hover:scale-[1.01]"
              >
            <h2 className="text-lg font-semibold text-black">{video.description}</h2>
            </a>

          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default Treatment;