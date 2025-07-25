import dictionary from "@/assets/dictionary.json";

const STOP_WORDS = ["the", "is", "am", "are", "to", "in", "at", "on", "a", "an", "will"];
const TYPE_ORDER = ["time", "object", "noun", "verb"];

export function tokenize(sentence: string): string[] {
  return sentence
    .toLowerCase()
    .replace(/[.,!?]/g, "")
    .split(" ")
    .filter(word => !STOP_WORDS.includes(word));
}

export function classifyWords(tokens: string[]) {
  let usedWords = new Set<string>();
  let types: any = { time: null, object: null, noun: null, verb: null, others: [] };
  let words: any = { time: null, object: null, noun: null, verb: null, others: [] };

  for (let word of tokens) {
    const entry = dictionary[word];
    if (!entry) {
      types.others.push(`Fingerspell: ${word.toUpperCase()}`);
      words.others.push(word);
      continue;
    }

    const { type, sign } = entry;
    const typeList = type.split("/");
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
        const entry = dictionary[word];
        if (entry && entry.type.split("/").includes(slot)) {
          types[slot] = entry.sign;
          words[slot] = word;
          usedWords.add(word);
          break;
        }
      }
    }
  }

  return { ...types, words };
}

export function translateToGhSL(sentence: string) {
  const tokens = tokenize(sentence);
  const { time, object, noun, verb, others, words } = classifyWords(tokens);

  const usedSet = new Set<string>();
  const orderedSigns = [time, object, noun, verb, ...others].filter(sign => {
    if (!sign || usedSet.has(sign)) return false;
    usedSet.add(sign);
    return true;
  });

  const wordUsed = new Set<string>();
  const orderedWords = [words.time, words.object, words.noun, words.verb, ...words.others].filter(word => {
    if (!word || wordUsed.has(word)) return false;
    wordUsed.add(word);
    return true;
  });

  return {
    orderedWords,
    orderedSigns
  };
}
