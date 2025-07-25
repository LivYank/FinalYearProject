import React, { useState } from "react";
import MainLayout from "@/components/ui/MainLayout";
import { translateToGhSL } from "@/lib/translateToGhSL";

const GSLAlgorithm = () => {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<{ orderedWords: string[]; orderedSigns: string[] } | null>(null);

  const handleTranslate = () => {
    if (!input.trim()) return;
    const translation = translateToGhSL(input);
    setResult(translation);
  };

  return (
    <MainLayout>
      <div className="p-6 max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold text-blue-700 mb-4">Ghanaian Sign Language (GhSL) Translator</h1>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter an English sentence..."
          className="w-full p-2 border border-gray-300 rounded mb-4"
        />
        <button
          onClick={handleTranslate}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Translate
        </button>

        {result && (
          <div className="mt-6">
            <h2 className="text-xl font-semibold">Result</h2>
            <p className="mt-2">
              <strong>Translated Word Order:</strong> {result.orderedWords.join(" → ")}
            </p>
            <div className="mt-4">
              <h3 className="font-semibold">Sign Instructions:</h3>
              <ol className="list-decimal ml-5">
                {result.orderedSigns.map((sign, idx) => (
                  <li key={idx}>{sign}</li>
                ))}
              </ol>
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default GSLAlgorithm;
