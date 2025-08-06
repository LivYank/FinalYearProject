import MainLayout from "@/components/ui/MainLayout";
import { Link } from "react-router-dom";

const categories = [
  { title: "General hospital interactions", path: "/Medical/General" },
  { title: "Ophthalmology & Vision Care", path: "/Medical/Vision" },
  { title: "Prescriptions", path: "/Medical/Prescriptions" },
  { title: "Medical emergencies", path: "/Medical/Emergency" },
  { title: "Pharmacy interactions", path: "/Medical/Pharmacy" },
  { title: "Treatment and diagnosis", path: "/Medical/Treatment" },
];

const Medical = () => {
  return (
    <MainLayout>
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-6 text-[#1a1a1a]">
          Medical Videos
        </h1>
        <div className="grid grid-cols-2 gap-4">
          {categories.map((cat) => (
            <Link
              key={cat.title}
              to={cat.path}
              className="flex items-center justify-center bg-[#fff3e0] p-4 min-h-[160px] rounded-xl border border-[#e0cfc2] shadow-sm hover:shadow-md transition"
            >
              <h2 className="text-base font-semibold text-[#333] text-center leading-snug">
                {cat.title}
              </h2>
            </Link>
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default Medical;
