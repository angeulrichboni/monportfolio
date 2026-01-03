import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: import.meta.env.VITE_GROQ_API_KEY,
  dangerouslyAllowBrowser: true 
});

const MODEL = 'llama-3.1-8b-instant';

export const translateText = async (text: string, targetLang: 'en' | 'fr'): Promise<string> => {
  if (!text) return "";
  try {
    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `Translate the following text to ${targetLang === 'en' ? 'English' : 'French'}. Return ONLY the translation.`
        },
        { role: "user", content: text }
      ],
      model: MODEL,
    });
    return completion.choices[0]?.message?.content || "";
  } catch (error) {
    console.error("Translation error:", error);
    return text;
  }
};
