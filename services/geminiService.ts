import { GoogleGenAI } from "@google/genai";
import { SYSTEM_INSTRUCTION } from "../constants";
import { AnalysisResponse, RiskSummaryItem } from "../types";

const API_KEY = process.env.API_KEY || '';

const ai = new GoogleGenAI({ apiKey: API_KEY });

export const analyzeFeature = async (featureDescription: string): Promise<AnalysisResponse> => {
  if (!API_KEY) {
    throw new Error("API Key is missing. Please ensure process.env.API_KEY is set.");
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: featureDescription,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.4, // Lower temperature for more analytical/consistent results
      },
    });

    const fullText = response.text || "No response generated.";
    
    // Parse the JSON block out of the markdown response
    const jsonRegex = /```json\s*([\s\S]*?)\s*```/;
    const match = fullText.match(jsonRegex);
    
    let riskData: RiskSummaryItem[] = [];
    let markdownReport = fullText;

    if (match && match[1]) {
      try {
        riskData = JSON.parse(match[1]);
        // Remove the JSON block and the header from the display text
        markdownReport = fullText
          .replace(match[0], '')
          .replace('# Risk Prioritization Summary JSON', '')
          .trim();
      } catch (e) {
        console.error("Failed to parse Risk JSON", e);
      }
    }

    return {
      markdownReport,
      riskData
    };

  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    throw error;
  }
};