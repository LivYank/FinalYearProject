import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Settings: React.FC = () => {
  const navigate = useNavigate();
  const [dark, setDark] = useState(
    () => localStorage.getItem("theme") === "dark"
  );
  const [notifications, setNotifications] = useState(
    () => localStorage.getItem("notifications") !== "off"
  );

  const toggleTheme = () => {
    const newTheme = !dark ? "dark" : "light";
    setDark(!dark);
    localStorage.setItem("theme", newTheme);

    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  const toggleNotifications = () => {
    const newStatus = notifications ? "off" : "on";
    setNotifications(!notifications);
    localStorage.setItem("notifications", newStatus);
  };

  const handleResetSettings = () => {
    const confirmReset = window.confirm(
      "This will reset your theme and notification preferences. Continue?"
    );
    if (confirmReset) {
      localStorage.removeItem("theme");
      localStorage.removeItem("notifications");
      setDark(false);
      setNotifications(true);
      document.documentElement.classList.remove("dark");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 p-8 rounded shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-gray-100">
          Settings
        </h2>

        <button
          onClick={toggleTheme}
          className="w-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 py-2 rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition mb-4"
        >
          Switch to {dark ? "Light" : "Dark"} Theme
        </button>

        <button
          onClick={toggleNotifications}
          className="w-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 py-2 rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition mb-4"
        >
          {notifications ? "Disable" : "Enable"} Notifications
        </button>

        <button
          onClick={() =>
            window.open("https://wa.me/233595264721", "_blank")
          }
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition mb-4"
        >
          Contact Us on WhatsApp
        </button>

        <button
          onClick={() => navigate("/about")}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition mb-4"
         >
          About iSpeak GhSL App
        </button>

        <button
          onClick={() => navigate("/home")}
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default Settings;
