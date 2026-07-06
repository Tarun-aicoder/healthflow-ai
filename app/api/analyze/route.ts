import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
});

export async function POST(req: Request) {
  try {
    const patientData = await req.json();

    const prompt = `
You are a healthcare AI assistant.

Analyze this patient:

${JSON.stringify(patientData)}

Return ONLY valid JSON in this format:

{
  "riskExplanation": "...",
  "recommendation": "...",
  "revenueImpact": "..."
}
`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    return NextResponse.json({
      result: response.text,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
