import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { friendName } = await req.json();

    if (!friendName) {
      return NextResponse.json(
        { error: "Friend name is required" },
        { status: 400 }
      );
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "Gemini API key is not configured in .env.local" },
        { status: 500 }
      );
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      generationConfig: {
        responseMimeType: "application/json"
      }
    });

    const prompt = `
      Write a beautiful, heartwarming 4-line Hindi/Urdu Shayari about friendship.
      You MUST include the name "${friendName}" naturally in the Hindi Shayari text.
      Also provide a short, emotional English translation of the Shayari.
      Return the response strictly as a JSON object with two keys: "shayari" and "translation".
      Example format:
      {
        "shayari": "Dosti ka rishta hai sabse pyara, Rahul tum ho hamara sahara...",
        "translation": "The bond of friendship is the most beautiful, Rahul you are our support..."
      }
    `;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text().trim();
    
    // Parse response
    let data;
    try {
      data = JSON.parse(responseText);
    } catch (parseError) {
      // Fallback clean parser if JSON MimeType fails to strip markdown
      let cleanText = responseText;
      if (cleanText.startsWith("```json")) {
        cleanText = cleanText.replace("```json", "");
      }
      if (cleanText.endsWith("```")) {
        cleanText = cleanText.slice(0, -3);
      }
      data = JSON.parse(cleanText.trim());
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Gemini API error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to generate Shayari" },
      { status: 500 }
    );
  }
}
