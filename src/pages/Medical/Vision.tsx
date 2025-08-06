import React, { useState } from "react";
import MainLayout from "@/components/ui/MainLayout";

const Vision = () => {
  const [searchQuery, setSearchQuery] = useState("");

const visionVideos = [
  { id: "1000A", description: "This light will feel bright but won’t harm you." },
  { id: "901", description: "My eyes hurt when I look at light." },
  { id: "902", description: "Everything looks blurry, even with my glasses." },
  { id: "903", description: "My eyes feel dry and itchy all day." },
  { id: "904", description: "I see black spots floating in my vision." },
  { id: "905", description: "My eyes water a lot, especially outside." },
  { id: "906", description: "I can’t see clearly at night anymore." },
  { id: "907", description: "My eyelids are swollen and red." },
  { id: "908", description: "There’s a burning feeling in my eyes." },
  { id: "909", description: "I feel like there’s sand in my eyes." },
  { id: "910", description: "Bright lights make my head ache." },
  { id: "911", description: "When did your eye problem start?" },
  { id: "912", description: "Do you use eye drops or medications?" },
  { id: "913", description: "Have you been rubbing your eyes a lot?" },
  { id: "914", description: "Do you wear contact lenses or glasses?" },
  { id: "915", description: "Does anyone in your family have eye issues?" },
  { id: "916", description: "Have you had eye surgery before?" },
  { id: "917", description: "Are you allergic to any medicines?" },
  { id: "918", description: "Do you spend hours on phones or computers?" },
  { id: "919", description: "Does your vision get worse in the evening?" },
  { id: "920", description: "Have you noticed any vision changes?" },
  { id: "921", description: "Sit here and cover your left eye with your hand." },
  { id: "922", description: "Look straight ahead at the chart on the wall." },
  { id: "923", description: "Follow my finger with your eyes, don’t move your head." },
  { id: "924", description: "Let me shine a light to check your pupils." },
  { id: "925", description: "Blink slowly while I examine your eyelids." },
  { id: "926", description: "I’ll put drops in your eyes to numb them." },
  { id: "927", description: "This machine will check your eye pressure—stay still." },
  { id: "928", description: "Look to the left, then right, then up and down." },
  { id: "929", description: "Read the smallest line you can see on the chart." },
  { id: "930", description: "I’ll use a microscope to see inside your eye." },
  { id: "931", description: "Your eyes are strained from too much screen time." },
  { id: "932", description: "You have an infection—antibiotic drops will help." },
  { id: "933", description: "Your cornea has a small scratch—it needs care." },
  { id: "934", description: "You’re developing cataracts; surgery can fix this." },
  { id: "935", description: "Your eye pressure is high—this is called glaucoma." },
  { id: "936", description: "You need stronger glasses for reading." },
  { id: "937", description: "Your eyes are dry—use artificial tears daily." },
  { id: "938", description: "You have an allergy causing redness and itching." },
  { id: "939", description: "Your vision issue is due to diabetes—control sugar." },
  { id: "940", description: "Your eyes are healthy—no serious problems found." },
  { id: "941", description: "Use these drops twice a day for one week." },
  { id: "942", description: "Wear sunglasses whenever you go outside." },
  { id: "943", description: "Avoid rubbing your eyes—it makes it worse." },
  { id: "944", description: "Come back in two weeks for a follow-up." },
  { id: "945", description: "Stop using expired contact lenses." },
  { id: "946", description: "Apply this ointment to your eyelids at night." },
  { id: "947", description: "Drink more water to keep your eyes moist." },
  { id: "948", description: "Limit screen time and take breaks every hour." },
  { id: "949", description: "Use a clean cloth to wipe your eyes daily." },
  { id: "950", description: "Buy glasses with blue light protection." }

];

const filteredVideos = visionVideos.filter((video) =>
    video.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <MainLayout>
      <div className="p-4 space-y-4 bg-[#fef2f2] min-h-screen">
        <h1 className="text-xl font-bold text-[#1a1a1a] mb-4 border-l-4 border-[#f87171] pl-3">
          Ophthalmology & Vision Care Videos
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

export default Vision;