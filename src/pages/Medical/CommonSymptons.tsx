
import React, { useState } from "react";
import MainLayout from "@/components/ui/MainLayout";

const CommonSymptons = () => {
  const [searchQuery, setSearchQuery] = useState("");

const commonVideos = [
{ id: "2201", description: "Do you have a fever or feel hot and cold?" },
{ id: "2202", description: "Are you coughing?" },
{ id: "2203", description: "Do you feel weak or tired all day?" },
{ id: "2204", description: "Are you vomiting or having loose stools?" },
{ id: "2205", description: "Do your muscles or joints ache badly?" },
{ id: "2206", description: "Is your skin itchy with rashes or bumps?" },
{ id: "2207", description: "Are you sweating a lot at night?" },
{ id: "2208", description: "Do you have a headache that won’t stop?" },
{ id: "2209", description: "Do you feel dizzy or like you might fall?" },
{ id: "2210", description: "Is your stomach swollen or painful?" },
{ id: "2211", description: "Have you lost your appetite for food?" },
{ id: "2212", description: "When you visit the restroom, do you pass bloody or watery stool?" },
{ id: "2213", description: "Do you feel bloated after eating fufu or rice?" },
{ id: "2214", description: "Is your urine dark or very little?" },
{ id: "2215", description: "Are you always thirsty, even after drinking?" },
{ id: "2216", description: "Are you coughing up thick mucus or blood?" },
{ id: "2217", description: "Do you have a runny nose or sore throat?" },
{ id: "2218", description: "Does your chest hurt when breathing deeply?" },
{ id: "2219", description: "Do you feel like you’re burning with fever?" },
{ id: "2220", description: "Is harmattan dust making it hard to breathe?" },
{ id: "2221", description: "Do you have sores or boils on your skin?" },
{ id: "2222", description: "Are your eyes red, sticky, or watery?" },
{ id: "2223", description: "Is there pus or swelling in a cut or wound?" },
{ id: "2224", description: "Do you have a rash like measles or chickenpox?" },
{ id: "2225", description: "Are your feet swollen or itchy (like ground itch)?" },
{ id: "2226", description: "Are you pregnant and feeling faint or sick?" },
{ id: "2227", description: "Is your baby refusing to breastfeed or eat?" },
{ id: "2228", description: "Is your child having frequent diarrhea?" },
{ id: "2229", description: "Are you bleeding too much during your period?" },
{ id: "2230", description: "Does it hurt when you urinate?" },
{ id: "2231", description: "Are you diabetic and feeling shaky or dizzy?" },
{ id: "2232", description: "Do you have high blood pressure with headaches?" },
{ id: "2233", description: "Are you losing weight without trying?" },
{ id: "2234", description: "Do you have malaria symptoms (fever, chills, sweats)?" },
{ id: "2235", description: "Is your face or body swollen (like kidney issues)?" },
{ id: "2236", description: "Are you struggling to sleep at night?" },
{ id: "2237", description: "Do you feel sad, worried, or scared often?" },
{ id: "2238", description: "Are you forgetting things or getting confused?" },
{ id: "2239", description: "Do you have bad dreams or scary thoughts?" },
{ id: "2240", description: "Is your heart beating fast even when resting?" },
{ id: "2241", description: "Did you eat spoiled food or street food lately?" },
{ id: "2242", description: "Are you drinking untreated well or river water?" },
{ id: "2243", description: "Did herbal remedies make you feel worse?" },
{ id: "2244", description: "Are you working in the sun and feeling dizzy?" },
{ id: "2245", description: "Are mosquito bites making you itchy or sick?" },
{ id: "2246", description: "Do you have a stiff neck or back pain?" },
{ id: "2247", description: "Are your hands or feet numb or tingling?" },
{ id: "2248", description: "Do you have trouble swallowing food or water?" },
{ id: "2249", description: "Are your ears painful or leaking fluid?" },
{ id: "2250", description: "Do you have cracks or sores on your lips?" }

];


  const filteredVideos = commonVideos.filter((video) =>
    video.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <MainLayout>
      <div className="p-4 space-y-4 bg-[#fdfaf6] min-h-screen">
        <h1 className="text-xl font-bold text-[#1a1a1a] mb-4 border-l-4 border-[#fcd34d] pl-3">
          Common Symptons Videos
        </h1>

        <input
          type="text"
          placeholder="Search videos..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full p-2 border border-[#ffd54f] rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 bg-white"
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

export default CommonSymptons;