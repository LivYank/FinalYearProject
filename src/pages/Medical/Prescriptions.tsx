import React, { useState } from "react";
import MainLayout from "@/components/ui/MainLayout";

const Prescriptions = () => {
  const [searchQuery, setSearchQuery] = useState("");

const prescriptionsVideos = [
  { id: "1001D", description: "Take one tablet every morning with food." },
  { id: "1002B", description: "This medication should be taken twice a day." },
  { id: "1003D", description: "You will need to take these pills for 7 days." },
  { id: "1004D", description: "Please take this medicine before meals." },
  { id: "1005B", description: "This prescription is for a 30-day supply." },
  { id: "1006D", description: "Ensure you complete the entire course of antibiotics." },
  { id: "1007B", description: "Take one pill every 12 hours." },
  { id: "1008D", description: "Follow the prescribed dosage and do not exceed it." },
  { id: "1009B", description: "This is an over-the-counter medication; no prescription required." },
  { id: "1010B", description: "This medication may cause drowsiness." },
  { id: "1011D", description: "Take the medicine with plenty of water." },
  { id: "1012B", description: "You should take these capsules after meals." },
  { id: "1013D", description: "This medication can cause nausea, so take it with food." },
  { id: "1014B", description: "This is a refill for your prescription." },
  { id: "1015D", description: "Pick up your prescription from the pharmacy." },
  { id: "1016B", description: "This medication will help control your blood sugar." },
  { id: "1017D", description: "Store this medication in a cool, dry place." },
  { id: "1018B", description: "Take one tablet each evening before bedtime." },
  { id: "1019D", description: "This prescription is for pain relief." },
  { id: "1020B", description: "The doctor has prescribed a topical cream." },
  { id: "1021D", description: "Take this medication regularly for optimal results" },
  { id: "1022B", description: "Your medication will be ready shortly at the pharmacy." },
  { id: "1023D", description: "Store the medicine in the refrigerator." },
  { id: "1024B", description: "This prescription is for your asthma inhaler." },
  { id: "1025D", description: "Do not crush or chew these tablets." },
  { id: "1026B", description: "Take the prescribed dosage at the same time daily." },
  { id: "1027D", description: "Avoid alcohol while on this medication." },
  { id: "1028B", description: "Take this medication with food to prevent stomach upset." },
  { id: "1029D", description: "You need a new prescription for your eye drops." },
  { id: "1030B", description: "This is a 90-day prescription supply." },
  { id: "1031D", description: "An antibiotic has been prescribed for your infection." },
  { id: "1032B", description: "Bring the empty bottle to refill your prescription." },
  { id: "1033D", description: "This medication is for short-term use." },
  { id: "1034B", description: "Take these pills on an empty stomach." },
  { id: "1035D", description: "Avoid taking this medication if pregnant." },
  { id: "1036B", description: "Take one pill every 8 hours as directed." },
  { id: "1037D", description: "Your doctor has written a prescription for a steroid cream." },
  { id: "1038B", description: "This prescription is for your high blood pressure." },
  { id: "1039D", description: "This medication will reduce your cholesterol." },
  { id: "1040B", description: "Take this medication for at least two weeks.." },
  { id: "1041D", description: "An antiviral has been prescribed for your symptoms." },
  { id: "1042B", description: "Follow the dosage instructions carefully." },
  { id: "1043D", description: "If you miss a dose, take it as soon as possible." },
  { id: "1044B", description: "This medication provides relief from allergy symptoms." },
  { id: "1045D", description: "Do not drive while taking this medication." },
  { id: "1046B", description: "This prescription is for anti-inflammatory medication." },
  { id: "1047D", description: "This will help relieve pain post-surgery." },
  { id: "1048B", description: "Dispose of any unused medication properly." },
  { id: "1049D", description: "Consult your doctor immediately if side effects occur." },
  { id: "1050B", description: "This is for your insomnia treatment.." },
  { id: "1051D", description: "Take with a full glass of water." },
  { id: "1052B", description: "This prescription is for a 60-day supply." },
  { id: "1053B", description: "Take 1 tablet every 8 hours for fever or pain. Do not exceed 3 tablets daily." },
  { id: "1054D", description: "Take this medication with breakfast." },
  { id: "1055D", description: "This prescription is for thyroid medication." },
  { id: "1056B", description: "Take with food to avoid nausea." },
  { id: "1057B", description: "Take 2 tablets daily for 3 days. Finish all doses even if you feel better." },
  { id: "1058D", description: "This medication should be taken before bedtime." },
  { id: "1059D", description: "This prescription is for antidepressants." },
  { id: "1060B", description: "Take with a snack to prevent stomach upset." },
  { id: "1061D", description: "A calcium supplement has been prescribed." },
  { id: "1062B", description: "Take this with lunch." },
  { id: "1063D", description: "This is for antihistamines." },
  { id: "1064B", description: "Drink a full glass of water to avoid dehydration." },
  { id: "1065D", description: "A multivitamin has been prescribed for overall health." },
  { id: "1066B", description: "Take this medication with dinner." },
  { id: "1067D", description: "This is for blood." },
  { id: "1068B", description: "Take this with food to prevent heartburn." },
  { id: "1069D", description: "A laxative has been prescribed for constipation." },
  { id: "1070B", description: "Take this with a snack to avoid dizziness." },
  { id: "1071D", description: "This is for antifungal treatment." },
  { id: "1072B", description: "Take with food to prevent stomach cramps." },
  { id: "1073D", description: "A sedative has been prescribed for anxiety." },
  { id: "1074B", description: "Drink plenty of water to avoid kidney issues." },
  { id: "1075D", description: "This prescription is for cold." },
  { id: "1076B", description: "Take with food to prevent nausea." },
  { id: "1077D", description: "A muscle relaxant has been prescribed for back pain." },
  { id: "1078B", description: "Take this with a snack to avoid stomach upset." },
  { id: "1079D", description: "This prescription is for anti-nausea medication." },
  { id: "1080B", description: "Take with food to avoid dizziness." },
  { id: "1081D", description: "Mix 1 packet in clean water. Drink 1 glass after every loose stool." },
  { id: "1082B", description: "Drink plenty of water to avoid kidney issues." },
  { id: "1083D", description: "Give the child 5ml (1 teaspoon) every morning with breakfast." },
  { id: "1084B", description: "Take with food to prevent stomach pain." },
  { id: "1085D", description: "Swallow 1 tablet now. Repeat every 6 months." },
  { id: "1086B", description: "Take with a snack to avoid nausea." },
  { id: "1087D", description: "This is for anti-anxiety medication." },
  { id: "1088B", description: "Take with food to prevent heartburn." },
  { id: "1089D", description: "Take 2 teaspoons (10ml) every 6 hours. Do not mix with alcohol." },
  { id: "1090B", description: "Drink plenty of water to avoid kidney issues." },
  { id: "1091D", description: "Rub gently on the rash twice daily. Wash hands before and after." },
  { id: "1092B", description: "Take with food to prevent stomach cramps." },
  { id: "1093D", description: "Take 1 tablet every 12 hours for 7 days to treat infections." },
  { id: "1094B", description: "Take with a snack to avoid dizziness." },
  { id: "1095B", description: "This prescription is for anti-inflammatory treatment." },
  { id: "1096D", description: "Take with food to prevent nausea." },
  { id: "1097B", description: "A painkiller has been prescribed for chronic pain." },
  { id: "1098D", description: "Drink plenty of water to avoid dehydration." },
  { id: "1099B", description: "Eat oranges if tablets run out." },
];

const filteredVideos = prescriptionsVideos.filter((video) =>
    video.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <MainLayout>
      <div className="p-4 space-y-4 bg-[#fdfaf6] min-h-screen">
        <h1 className="text-xl font-bold text-[#1a1a1a] mb-4 border-l-4 border-[#fcd34d] pl-3">
          Prescription Videos
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

export default Prescriptions;