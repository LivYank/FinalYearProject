import MainLayout from "@/components/ui/MainLayout"; 

const medicalSigns = [
  { id: "1000A", description: "This light will feel bright but won’t harm you." },
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
  { id: "100A", description: "Is there a patient recovery room?" }, 
  { id: "101A", description: "Can I get a copy of my test results?" }, 
  { id: "102A", description: "Where is the nearest laundry?" }, 
  { id: "103A", description: "Is there a patient rehabilitation center?" }, 
  
];

const Medical = () => {
  return (
    <MainLayout>
      <div className="p-4 space-y-4">
        <h1 className="text-xl font-bold mb-4">Medical Signs</h1>
        {medicalSigns.map((sign) => (
          <a
            key={sign.id}
            href={`/VideoPage/${sign.id}`} 
            className="block cursor-pointer border rounded-xl p-4 hover:shadow-md transition"
>
            <h2 className="text-lg font-semibold">{sign.description}</h2>
          </a>

        ))}
      </div>
    </MainLayout>
  );
};

export default Medical;

