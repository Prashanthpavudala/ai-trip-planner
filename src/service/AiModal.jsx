import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";

const apiKey = "AIzaSyAD9mjmOW2MkcCc9PweO_t9vnXe3aRzpP4";
export const generateTripPlan = async (finalPrompt) => {
    try {
      const genAI = new GoogleGenerativeAI(apiKey);
 
      const model = genAI.getGenerativeModel({
        model: "gemini-2.0-flash-thinking-exp-01-21", // Gemini Flash 1.5
      });

      const result = await model.generateContent({
        contents: [{ role: "user", parts: [{ text: finalPrompt }] }],
      });
    
      let responseText = result?.response?.text() || "";
      responseText = responseText.replace(/```json|```/g, "").trim(); 

    
      try {
        return JSON.parse(responseText);
      } catch (jsonParseError) {
        console.error("Error parsing JSON response:", jsonParseError);
        console.warn("Response is not valid JSON. Returning raw text.");
        return { error: "Invalid JSON Response", text: responseText }; 
      }

    } catch (error) {
      console.error("Error generating trip plan:", error);
      throw error;
    }
  };