
import React, { useState } from "react";
import MainLayout from "@/components/ui/MainLayout";

const ENT = () => {
  const [searchQuery, setSearchQuery] = useState("");

const ENTVideos = [
{ id: "1401", description: "Do you experience strange sound in your ears?" },
{ id: "1402", description: "We need to check for fluid buildup in your middle ear." },
{ id: "1403", description: "Please avoid loud noises to protect your hearing." },
{ id: "1404", description: "Your nasal congestion might be due to allergies." },
{ id: "1405", description: "You have a mild ear infection that requires antibiotics." },
{ id: "1406", description: "We will examine your throat for signs of inflammation." },
{ id: "1407", description: "This nasal spray will help reduce swelling in your sinuses." },
{ id: "1408", description: "Try using a humidifier to relieve dry throat symptoms." },
{ id: "1409", description: "What's the meaning of a humidifier?" },
{ id: "1410", description: "A humidifier is a device designed to increase the moisture level in the air within a room." },
{ id: "1411", description: "Please avoid inserting cotton swabs into your ear canal." },
{ id: "1412", description: "Your tonsils appear swollen; we might need further tests." },
{ id: "1413", description: "Sinus pressure can cause headaches and facial pain." },
{ id: "1414", description: "Do you experience dizziness or balance issues?" },
{ id: "1415", description: "This earwax removal solution should be used as directed." },
{ id: "1416", description: "We need to check your vocal cords for any abnormalities." },
{ id: "1417", description: "Please describe the type of pain you feel in your throat." },
{ id: "1418", description: "Try to breathe through your nose rather than your mouth." },
{ id: "1419", description: "You may need allergy testing to determine the cause of congestion." },
{ id: "1420", description: "Your ear infection is likely caused by a viral infection." },
{ id: "1421", description: "Let’s check for nasal polyps that may be blocking airflow." },
{ id: "1422", description: "You might have a deviated septum causing breathing issues." },
{ id: "1423", description: "Try gargling with warm salt water to ease throat irritation." },
{ id: "1424", description: "Frequent sinus infections may require further evaluation." },
{ id: "1425", description: "Do you have any trouble swallowing food or liquids?" },
{ id: "1426", description: "You should avoid dairy if you have excessive mucus buildup." },
{ id: "1427", description: "This medication will help reduce ear inflammation." },
{ id: "1428", description: "Your symptoms indicate possible laryngitis." },
{ id: "1429", description: "Try steam inhalation to relieve nasal congestion." },
{ id: "1430", description: "We’ll check for ear drainage to rule out an infection." },
{ id: "1431", description: "Do you experience a sensation of fullness in your ears?" },
{ id: "1432", description: "You should avoid sudden changes in altitude to prevent ear pain." },
{ id: "1433", description: "This throat lozenge will help soothe your sore throat." },
{ id: "1434", description: "We need to inspect your nasal passages for obstructions." },
{ id: "1435", description: "Your snoring might be caused by obstructed nasal airflow." },
{ id: "1436", description: "Chronic hoarseness may indicate a vocal cord issue." },
{ id: "1437", description: "Your eardrum appears intact, with no signs of rupture." },
{ id: "1438", description: "Try drinking warm fluids to keep your throat hydrated." },
{ id: "1439", description: "Your balance issues may be linked to an inner ear problem." },
{ id: "1440", description: "Let’s test your ability to detect different sound frequencies." },
{ id: "1441", description: "Do you have a family history of hearing loss?" },
{ id: "1442", description: "Your nasal discharge suggests a possible sinus infection." },
{ id: "1443", description: "Try using a saline rinse to clear your nasal passages." },
{ id: "1444", description: "Your voice sounds hoarse; have you been overusing it?" },
{ id: "1445", description: "This anti-allergy medication should help with your symptoms." },
{ id: "1446", description: "We’ll perform a tympanometry test to check ear pressure." },
{ id: "1447", description: "You may need a minor procedure to remove excess earwax." },
{ id: "1448", description: "Your nasal turbinates appear swollen due to allergies." },
{ id: "1449", description: "Try avoiding caffeine if you experience frequent vertigo." },
{ id: "1450", description: "Frequent nosebleeds may require further examination." }

];


  const filteredVideos = ENTVideos.filter((video) =>
    video.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <MainLayout>
      <div className="p-4 space-y-4 bg-[#fdfaf6] min-h-screen">
        <h1 className="text-xl font-bold text-[#1a1a1a] mb-4 border-l-4 border-[#fcd34d] pl-3">
          ENT(Ear,Nose,Throat) Videos
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

export default ENT;