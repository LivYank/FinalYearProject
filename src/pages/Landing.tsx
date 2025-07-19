import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Landing: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      const token = localStorage.getItem("token");
      navigate("/home" , { replace: true });
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white px-4 text-center">
      <img
        src="/logo.png"
        alt="iSPEAK GhSL Logo"
        className="w-48 h-48 mb-8"
      />
      <h1 className="text-3xl font-bold text-red-600 mb-4">
        iSpeak GhSL
      </h1>
      <p className="text-base text-black max-w-xs">
        Bridging Voices, Breaking Barriers
        <br />
        Let’s communicate in Ghanaian Sign Language
      </p>
    </div>
  );
};

export default Landing;

  