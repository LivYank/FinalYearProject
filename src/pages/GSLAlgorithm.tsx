import React, { useState } from "react";
import MainLayout from "@/components/ui/MainLayout";
import dictionary from "@/assets/dictionary.json"; 
import OpenAI from "openai";

const STOP_WORDS = ["the", "is", "am", "are", "to", "in", "at", "on", "a", "an", "will"];
const TYPE_ORDER = ["object", "noun", "verb", "time"];

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

const GSLAlgorithm = () => {
  const [input, setInput] = useState("");
  const [orderedSigns, setOrderedSigns] = useState<string[]>([]);
  const [orderedWords, setOrderedWords] = useState<string[]>([]);
  const [gptTranslation, setGptTranslation] = useState("");

  const tokenize = (sentence: string) => {
    return sentence
      .toLowerCase()
      .replace(/[.,!?]/g, "")
      .split(" ")
      .filter(word => !STOP_WORDS.includes(word));
  };

  const classifyWords = (tokens: string[]) => {
    let usedWords = new Set();
    let types: Record<string, any> = { time: null, object: null, noun: null, verb: null, others: [] };
    let words: Record<string, any> = { time: null, object: null, noun: null, verb: null, others: [] };

    for (let word of tokens) {
      const entry = (dictionary as any)[word];
      if (!entry) {
        types.others.push(`Fingerspell: ${word.toUpperCase()}`);
        words.others.push(word);
        continue;
      }

      const { type, sign } = entry;
      const typeList = type.split('/');
      let assigned = false;

      for (let t of typeList) {
        if (TYPE_ORDER.includes(t) && !types[t]) {
          types[t] = sign;
          words[t] = word;
          usedWords.add(word);
          assigned = true;
          break;
        }
      }

      if (!assigned) {
        types.others.push(sign);
        words.others.push(word);
      }
    }

    for (let slot of TYPE_ORDER) {
      if (!types[slot]) {
        for (let word of tokens) {
          if (usedWords.has(word)) continue;
          const entry = (dictionary as any)[word];
          if (entry && entry.type.split('/').includes(slot)) {
            types[slot] = entry.sign;
            words[slot] = word;
            usedWords.add(word);
            break;
          }
        }
      }
    }

    return { types, words };
  };

  const handleTranslate = async () => {
    if (!input.trim()) return;

    const tokens = tokenize(input);
    const { types, words } = classifyWords(tokens);

    const usedSet = new Set();
    const signs = [types.time, types.object, types.noun, types.verb, ...types.others].filter(sign => {
      if (!sign || usedSet.has(sign)) return false;
      usedSet.add(sign);
      return true;
    });

    const wordSet = new Set();
    const wordOrder = [words.time, words.object, words.noun, words.verb, ...words.others].filter(word => {
      if (!word || wordSet.has(word)) return false;
      wordSet.add(word);
      return true;
    });

    setOrderedSigns(signs);
    setOrderedWords(wordOrder);

    try {
      const res = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: `You are a Ghanaian Sign Language (GhSL) translator. Your job is to translate any English sentence into correct GhSL structure.

                      Use this format:
                    - Use Time → Topic → Comment order
                    - Remove filler or helper words (like "am", "is", "are", etc.)
                    - Output the GhSL equivalent in basic English word order used in signs.

                      Examples:
                    - "I am going to school today" → "Today school go I"
                    - "She is cooking rice" → "Rice cook she"
                    - "I am sick" → "Sick I"

                    Now translate the following:`,
          },
          {
            role: "user",
            content: input,
          },
        ],
      });

      setGptTranslation(res.choices[0].message.content || "");
    } catch (error: any) {
      console.error("GPT Error:", error.message);
      setGptTranslation("Error fetching GPT translation.");
    }
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

        {orderedWords.length > 0 && (
          <div className="mt-6">
            <h2 className="text-xl font-semibold">Manual Translation</h2>
            <p className="mt-2">
              <strong>Translated Word Order:</strong> {orderedWords.join(" → ")}
            </p>
            <div className="mt-4">
              <h3 className="font-semibold">Sign Instructions:</h3>
              <ol className="list-decimal ml-5">
                {orderedSigns.map((sign, idx) => (
                  <li key={idx}>{sign}</li>
                ))}
              </ol>
            </div>
          </div>
        )}

        {gptTranslation && (
          <div className="mt-6">
            <h2 className="text-xl font-semibold">GPT-Assisted Translation</h2>
            <p className="bg-gray-100 p-3 rounded text-sm">{gptTranslation}</p>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default GSLAlgorithm;
