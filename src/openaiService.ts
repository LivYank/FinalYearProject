// src/openaiService.ts
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY, // or your key directly, but .env is better
  dangerouslyAllowBrowser: true,
});

export const translateToEnglish = async (sign: string) => {
  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'You are an assistant that helps translate Ghanaian Sign Language characters to English.',
        },
        {
          role: 'user',
          content: `Translate: ${sign}`,
        },
      ],
    });

    return completion.choices[0].message.content;
  } catch (error) {
    console.error('OpenAI error:', error);
    return 'Error translating.';
  }
};
