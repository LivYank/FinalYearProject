import React, { useState } from "react";
import MainLayout from "@/components/ui/MainLayout";
import dictionary from "@/assets/dictionary.json";

const STOP_WORDS = ["the", "is", "am", "are", "to", "in", "at", "on", "a", "an", "will"];
const TYPE_ORDER = ["time", "topic", "comment", "verb"];

const GSLAlgorithm = () => {
  const [input, setInput] = useState("");
  const [orderedSigns, setOrderedSigns] = useState<string[]>([]);
  const [orderedWords, setOrderedWords] = useState<string[]>([]);
  const [gptTranslation, setGptTranslation] = useState("");
  const [gptPOS, setGptPOS] = useState("");
  const [gptSignInstructions, setGptSignInstructions] = useState<string[]>([]);

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

    // GPT translation with dictionary and POS tagging
    try {
      const tokens = tokenize(input);
      const relevantEntries = Object.entries(dictionary).filter(([word]) =>
        tokens.includes(word)
      );

      const dictionaryContent = relevantEntries
        .map(([word, { sign, type }]) => `${word}: ${sign} (${type})`)
        .join('\n') || "No relevant dictionary entries found.";

      const prompt = `
You are a Ghanaian Sign Language (GhSL) translator. Translate the English sentence into GhSL, adhering to the Time → Topic → Comment structure. Follow these grammar rules:
1) WH-questions at end or start+end.
2) Negation comes immediately after.
3) Remove 'to be' verbs.
4) Topicalization: topic before comment.
5) Cause before effect.
6) Real-time sequence.
7) General to specific.
8) Time at the beginning.

Use dictionary below to translate known words. For unknown, use: Fingerspell: [WORD].

GhSL Dictionary:
${dictionaryContent}

Input Sentence: ${input}
Tokens with Part of Speech: (Provide your analysis here)
Translated Sentence: 
Sign Instructions: (List each word with its corresponding sign instruction)
      `;

      const response = await fetch("/.netlify/functions/openai-proxy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [
            { role: "system", content: prompt },
            { role: "user", content: "Proceed with the translation, part of speech analysis, and sign instructions." }
          ]
        })
      });

      const res = await response.json();
      const fullContent: string = res.choices[0].message.content || "";

      // Extract POS and Sign Instructions if possible
      const posMatch = fullContent.match(/Tokens with Part of Speech:(.*?)Translated Sentence:/s);
      const signMatch = fullContent.match(/Sign Instructions:(.*)/s);

      setGptTranslation(fullContent);
      setGptPOS(posMatch ? posMatch[1].trim() : "");
      setGptSignInstructions(signMatch ? signMatch[1].trim().split("\n").filter(line => line.trim()) : []);
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
            <p className="bg-yellow-100 p-3 rounded text-sm text-black whitespace-pre-line">
              {gptTranslation}
            </p>

            {gptPOS && (
              <div className="mt-4 text-black">
                <h3 className="font-semibold">Part of Speech Analysis:</h3>
                <p className="bg-white p-2 rounded border">{gptPOS}</p>
              </div>
            )}

            {gptSignInstructions.length > 0 && (
              <div className="mt-4 text-black">
                <h3 className="font-semibold">Sign Instructions:</h3>
                <ol className="list-decimal ml-5">
                  {gptSignInstructions.map((inst, idx) => (
                    <li key={idx}>{inst}</li>
                  ))}
                </ol>
              </div>
            )}
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default GSLAlgorithm;
