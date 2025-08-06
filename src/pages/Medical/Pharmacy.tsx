
import React, { useState } from "react";
import MainLayout from "@/components/ui/MainLayout";

const Pharmacy = () => {
  const [searchQuery, setSearchQuery] = useState("");

const pharmacyVideos = [
  { id: "1501", description: "Can you please fill this prescription for me?" },
{ id: "1502", description: "I need to pick up my medication from the pharmacy." },
{ id: "1503", description: "Do you have this medication in stock?" },
{ id: "1504", description: "Could you inform me about the side effects of this drug?" },
{ id: "1505", description: "How often should I take this medication?" },
{ id: "1506", description: "I need a refill for my prescription." },
{ id: "1507", description: "Please check if my insurance covers this medication." },
{ id: "1508", description: "Can you provide me with a generic version of this drug?" },
{ id: "1509", description: "How long will it take to prepare my prescription?" },
{ id: "1510", description: "Can I take this medication along with my other prescriptions?" },
{ id: "1511", description: "Is this medication available over the counter?" },
{ id: "1512", description: "I need to pick up my child's prescription." },
{ id: "1513", description: "Please check if there are any drug interactions with my current medications." },
{ id: "1514", description: "Can you explain how to properly store this medication?" },
{ id: "1515", description: "How should I take this medicine to avoid stomach upset?" },
{ id: "1516", description: "Does this medication have any alcohol restrictions?" },
{ id: "1517", description: "Could you explain the dosage instructions for this medicine?" },
{ id: "1518", description: "Is this medication safe during pregnancy?" },
{ id: "1519", description: "Do I need a prescription for this medicine?" },
{ id: "1520", description: "Can you assist me in finding a pain reliever for my condition?" },
{ id: "1521", description: "Is this medication covered under my insurance plan?" },
{ id: "1522", description: "I’m looking for medication to treat my allergies." },
{ id: "1523", description: "Can you recommend something for my cold?" },
{ id: "1524", description: "I need to check if my prescription is ready for pickup." },
{ id: "1525", description: "Are there any warnings regarding food interactions with this medication?" },
{ id: "1526", description: "Can I take this medication if I am breastfeeding?" },
{ id: "1527", description: "Please provide a list of all possible side effects." },
{ id: "1528", description: "Is this medication safe for someone with high blood pressure?" },
{ id: "1529", description: "When should I take this medicine after a meal?" },
{ id: "1530", description: "Can I return the medication if it's not the one I ordered?" },
{ id: "1531", description: "Can you give me something to relieve my headache?" },
{ id: "1532", description: "Please explain the instructions for taking this antibiotic." },
{ id: "1533", description: "I need to make sure this drug doesn’t interfere with my heart medication." },
{ id: "1534", description: "Where can I find a pharmacy that delivers my medication?" },
{ id: "1535", description: "Can you provide a medication for my chronic pain?" },
{ id: "1536", description: "I need to renew my prescription for my blood pressure medication." },
{ id: "1537", description: "Please provide me with a consultation about my new prescription." },
{ id: "1538", description: "Is it okay to take this medicine with my daily vitamins?" },
{ id: "1539", description: "Is it safe to use this medication long-term?" },
{ id: "1540", description: "How should I dispose of any leftover medication?" },
{ id: "1541", description: "Can you help me find a more affordable option for my prescription?" },
{ id: "1542", description: "I need to verify the dosage before using this medication." },
{ id: "1543", description: "Can you recommend medicine for my sore throat?" },
{ id: "1544", description: "I’m not sure if I’m allergic to this drug, should I stop taking it?" },
{ id: "1545", description: "Can you suggest an alternative if this medicine isn't available?" },
{ id: "1546", description: "Do I need a special prescription for this condition?" },
{ id: "1547", description: "Please remind me of the refill schedule for this medication?" },
{ id: "1548", description: "Is there a difference between this brand and generic versions?" },
{ id: "1549", description: "This prescription is for your headache" },
{ id: "1550", description: "I need assistance with filling a new prescription for my diabetes medication." }

];

const filteredVideos = pharmacyVideos.filter((video) =>
    video.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <MainLayout>
      <div className="p-4 space-y-4 bg-[#fdfaf6] min-h-screen">
        <h1 className="text-xl font-bold text-[#1a1a1a] mb-4 border-l-4 border-[#fcd34d] pl-3">
          Pharmacy Interactions Videos
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

export default Pharmacy;