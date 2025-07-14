import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup: React.FC = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !email || !acceptedTerms) {
      alert("Please fill in all fields and accept the terms.");
      return;
    }

    // ✅ Store dummy token — in real app, get this from your backend or Google auth!
    localStorage.setItem("token", "dummy_token");
    localStorage.setItem("userName", name);
    localStorage.setItem("userEmail", email);

    // ✅ Redirect to home
    navigate("/home");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <div className="flex justify-end mb-4">
          <img src="/logo.png" alt="Logo" className="w-12 h-12" />
        </div>
        <h2 className="text-2xl font-bold text-green-600 mb-6 text-center">
          Create Account
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 border border-green-600 rounded-md focus:outline-none"
          />
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border border-green-600 rounded-md focus:outline-none"
          />
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="terms"
              checked={acceptedTerms}
              onChange={(e) => setAcceptedTerms(e.target.checked)}
              className="accent-green-600"
            />
            <label htmlFor="terms" className="text-sm">
              I read and understood the{" "}
              <span className="text-green-600">terms & policy</span>.
            </label>
          </div>
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded-md shadow-md hover:bg-green-700"
          >
            Sign up
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm mb-2">or</p>
          <button
            onClick={() => {
              // Here you’d call Google OAuth logic instead
              localStorage.setItem("token", "google_token");
              navigate("/home");
            }}
            className="flex items-center justify-center w-full border border-gray-300 rounded-md py-3 hover:bg-gray-100"
          >
            <img
              src="/google-icon.png"
              alt="Google"
              className="w-5 h-5 mr-2"
            />
            Sign in with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signup;
