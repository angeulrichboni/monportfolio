import { GoogleGenAI } from "@google/genai";

// Initialize the API client
const apiKey = process.env.API_KEY || ''; // In a real app, strict env check
const ai = new GoogleGenAI({ apiKey });

interface ChatResponse {
  text: string;
  error?: string;
}

/**
 * Service to handle interaction with Google's Gemini models.
 * This demonstrates the integration of GenAI for features like a "Resume Chatbot".
 */
export const geminiService = {
  /**
   * Generates a response based on a user prompt, specifically context-aware for the portfolio.
   */
  async askResumeAssistant(prompt: string): Promise<ChatResponse> {
    try {
      if (!apiKey) {
        console.warn("API Key missing for Gemini Service");
        return { text: "AI Service is currently offline (API Key missing).", error: "Configuration Error" };
      }

      // Use the appropriate model for reasoning
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
        config: {
          systemInstruction: "You are an AI assistant for Alex Chen's portfolio. Answer questions about his skills, projects (Drone Navigation, Spark Sentiment Analysis), and experience professionally.",
          temperature: 0.7,
        }
      });

      return { text: response.text || "I couldn't generate a response." };
    } catch (error) {
      console.error("Gemini API Error:", error);
      return { text: "An error occurred while communicating with the AI.", error: String(error) };
    }
  }
};