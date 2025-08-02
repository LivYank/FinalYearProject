import React, { useState } from "react";
import MainLayout from "@/components/ui/MainLayout";
import dictionary from "@/assets/dictionary.json";
import OpenAI from "openai";

const STOP_WORDS = ["the", "is", "am", "are", "to", "in", "at", "on", "a", "an", "will"];
const TYPE_ORDER = ["time", "topic", "comment", "verb"];

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
    let types: Record<string, any> = {
      time: null,
      topic: null,
      comment: null,
      verb: null,
      others: []
    };
    let words: Record<string, any> = {
      time: null,
      topic: null,
      comment: null,
      verb: null,
      others: []
    };

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

    return { types, words };
  };

  const handleTranslate = async () => {
    if (!input.trim()) return;

    const tokens = tokenize(input);
    const { types, words } = classifyWords(tokens);

    const usedSet = new Set();
    const signs = [
      types.time,
      types.topic,
      types.comment,
      types.verb,
      ...types.others
    ].filter(sign => {
      if (!sign || usedSet.has(sign)) return false;
      usedSet.add(sign);
      return true;
    });

    const wordSet = new Set();
    const wordOrder = [
      words.time,
      words.topic,
      words.comment,
      words.verb,
      ...words.others
    ].filter(word => {
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
            content: `You are a Ghanaian Sign Language (GhSL) translator. Translate any English sentence using these rules:

1. Time → Topic → Comment order
2. Topic-Comment: Topic first, then comment.
3. Verb Tense: Use base verb, set tense using time indicators at the start.
4. Negation: Place NOT/NEGATION after verb or item.
5. WH-Questions: Place WH-word at end or both start/end.
6. Cause-Effect: State cause before effect.
7. Chronological Order: Sign events in sequence.
8. General → Specific: Scene setting.
9. Description: Adjective before noun.

Examples:
- "I went to the library yesterday" → "YESTERDAY LIBRARY I GO"
- "What is your name?" → "YOUR NAME WHAT"
- "I don’t have any pets" → "PET HAVE NOT"

Translate this:
            `,
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
      <div className="p-6 max-w-3xl mx-auto bg-[#fffbe6] rounded-xl border border-yellow-600 shadow-md">
        <h1 className="text-3xl font-bold text-red-600 mb-4">🇬🇭 Ghanaian Sign Language (GhSL) Translator</h1>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter an English sentence..."
          className="w-full p-3 border-2 border-green-600 rounded mb-4 focus:outline-none focus:ring focus:ring-green-400"
        />
        <button
          onClick={handleTranslate}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
        >
          Translate
        </button>

        {orderedWords.length > 0 && (
          <div className="mt-6">
            <h2 className="text-xl font-semibold text-green-700">Manual Translation</h2>
            <p className="mt-2 text-black">
              <strong>Word Order:</strong> {orderedWords.join(" → ")}
            </p>
            <div className="mt-4">
              <h3 className="font-semibold">Sign Instructions:</h3>
              <ol className="list-decimal ml-5 text-black">
                {orderedSigns.map((sign, idx) => (
                  <li key={idx}>{sign}</li>
                ))}
              </ol>
            </div>
          </div>
        )}

        {gptTranslation && (
          <div className="mt-6">
            <h2 className="text-xl font-semibold text-yellow-700">GPT-Assisted Translation</h2>
            <p className="bg-yellow-100 p-3 rounded text-sm text-black">
              {gptTranslation}
            </p>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default GSLAlgorithm;
