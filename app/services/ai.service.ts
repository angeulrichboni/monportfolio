import apiClient from "@/app/lib/api-client";

interface TranslateResponse {
    original_text: string;
    translated_text: string;
    source_lang: string;
    target_lang: string;
}

export const AIService = {
    /**
     * Translate text using the backend AI service (Groq)
     * @param text - Text to translate
     * @param sourceLang - Source language (default: "fr")
     * @param targetLang - Target language (default: "en")
     * @returns Translated text
     */
    translate: async (
        text: string,
        sourceLang: string = "fr",
        targetLang: string = "en"
    ): Promise<string> => {
        if (!text || !text.trim()) {
            return "";
        }

        const response = await apiClient.post<TranslateResponse>("/ai/translate", {
            text,
            source_lang: sourceLang,
            target_lang: targetLang
        });

        return response.data.translated_text;
    }
};
