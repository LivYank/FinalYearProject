import * as React from "react";
import { cn } from "@/lib/utils";
import { Home, Upload, ActivitySquare, Stethoscope } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

const tabs = [
  { label: "Camera", path: "/home", icon: <Home /> },
  { label: "Dataset", path: "/iSPEAK-Dataset", icon: <Upload /> },
  { label: "GSL Algorithm", path: "/gsl-algorithm", icon: <ActivitySquare /> },
  { label: "Medical", path: "/medical", icon: <Stethoscope /> },
];

const MainLayout = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { children: React.ReactNode }
>(({ className, children, ...props }, ref) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div
      ref={ref}
      className={cn("flex flex-col min-h-screen", className)}
      {...props}
    >
      {/* Main content */}
      <div className="flex-grow">{children}</div>

      {/* Fixed bottom navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t flex justify-around items-center h-16 shadow-md z-10">
        {tabs.map((tab) => (
          <button
            key={tab.path}
            onClick={() => navigate(tab.path)}
            className={cn(
              "flex flex-col items-center text-xs",
              location.pathname === tab.path
                ? "text-blue-500"
                : "text-gray-500"
            )}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
});

MainLayout.displayName = "MainLayout";

export default MainLayout;
