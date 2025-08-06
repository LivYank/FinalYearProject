
import React, { useState } from "react";
import MainLayout from "@/components/ui/MainLayout";

const Emergency = () => {
  const [searchQuery, setSearchQuery] = useState("");

const emergencyVideos = [

  { id: "1201", description: "Call an ambulance immediately; this is a medical emergency." },
  { id: "1202", description: "The patient is in critical condition and needs urgent care." },
  { id: "1203", description: "We need to stabilize the patient before transport." },
  { id: "1204", description: "The patient is experiencing chest pain; we need to act quickly." },
  { id: "1205", description: "Please check the patient's vital signs and report them to me." },
  { id: "1206", description: "We need to stop the bleeding immediately." },
  { id: "1207", description: "Is there any difficulty breathing?" },
  { id: "1208", description: "The patient is having a seizure; hold them gently to prevent injury." },
  { id: "1209", description: "Administer CPR if the patient is unresponsive and not breathing." },
  { id: "1210", description: "We need to assess the airway, breathing, and circulation." },
  { id: "1211", description: "The patient is in shock; start IV fluids right away." },
  { id: "1212", description: "Is the patient conscious? We need to monitor their condition." },
  { id: "1213", description: "We need to perform an emergency surgery." },
  { id: "1214", description: "The patient has a deep wound; apply pressure to control the bleeding." },
  { id: "1215", description: "The patient has severe burns; we need to cool the area immediately." },
  { id: "1216", description: "Please administer oxygen to the patient right away." },
  { id: "1217", description: "We need to transport the patient to the ER urgently." },
  { id: "1218", description: "Stay calm and try to breathe slowly." },
  { id: "1219", description: "The patient has lost consciousness; we need to assess their airway." },
  { id: "1220", description: "There's been a car accident; we need to assess the injuries immediately." },
  { id: "1221", description: "The patient is in pain; give them pain relief immediately." },
  { id: "1222", description: "Apply firm pressure to stop the bleeding." },
  { id: "1223", description: "The patient is vomiting blood; prepare for immediate intervention." },
  { id: "1224", description: "We need to control the patient's bleeding before moving the patient." },
  { id: "1225", description: "Please lie down and keep your feet elevated." },
  { id: "1226", description: "Is the patient allergic to any medications? This could complicate things." },
  { id: "1227", description: "The patient's heart rate is dangerously low." },
  { id: "1228", description: "We need to clear the airway to prevent suffocation." },
  { id: "1229", description: "Move the injured person only if it's necessary." },
  { id: "1230", description: "Perform CPR if there is no pulse." },
  { id: "1231", description: "The patient has a broken bone." },
  { id: "1232", description: "Perform CPR if there is no pulse." },
  { id: "1233", description: "There's a fire in the building; we need to evacuate immediately." },
  { id: "1234", description: "This is a stroke; we need to act within the first few hours." },
  { id: "1235", description: "Keep the person warm and comfortable." },
  { id: "1236", description: "The patient is showing signs of a heart attack, prepare for emergency treatment." },
  { id: "1237", description: "We need to perform a quick scan to assess internal injuries." },
  { id: "1238", description: "The patient is bleeding from their head, apply a sterile dressing." },
  { id: "1239", description: "If exposed to chemicals, remove contaminated clothing and rinse skin." },
  { id: "1240", description: "If a child is choking, give back blows between the shoulder blades." },
  { id: "1241", description: "We need to stabilize the patient's condition before surgery." },
  { id: "1242", description: "The patient has been electrocuted, and we need to check for burns." },
  { id: "1243", description: "The patient has a suspected spinal injury; do not move them." },
  { id: "1244", description: "The patient is in severe pain; administer pain management immediately." },
  { id: "1245", description: "Stay with the person and monitor their condition." },
  { id: "1246", description: "If someone is in shock, keep them lying down and calm." },
  { id: "1247", description: "Wash a cut with soap and water before covering it." },
  { id: "1248", description: "Call the emergency room, the patient is in critical condition." },
  { id: "1249", description: "We need to administer fluids to prevent dehydration." },
  { id: "1250", description: "Avoid touching a burn with bare hands." }

];

const filteredVideos = emergencyVideos.filter((video) =>
    video.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <MainLayout>
      <div className="p-4 space-y-4 bg-[#f0fdf4] min-h-screen">
        <h1 className="text-xl font-bold text-[#1a1a1a] mb-4 border-l-4 border-[#4ade80] pl-3">
          Medical Emergencies Videos
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

export default Emergency;