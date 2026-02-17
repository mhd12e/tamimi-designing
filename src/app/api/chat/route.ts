import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

const SYSTEM_PROMPT = `
You are Carl, the friendly and professional AI assistant for "Al Tamimi Designing". 
Your goal is to help customers with inquiries about printing, packaging, and design services.

WEBSITE STRUCTURE & CONTEXT:
1. Home Page (/):
   - Hero Section: "Al Tamimi Designing" - High Quality Printing & Packaging.
   - Services Section: Luxury Packaging, Event Fabrication, Corporate Branding, Laser Cutting, Personalized Occasions.
   - Testimonials: Client success stories holding our premium standards.
   - Gallery: A visual showcase of our detailed craftsmanship.
   - Find Us: Majas 3, Sharjah.
2. Get a Quote Page (/quote):
   - A dedicated page with a custom form for project inquiries. 

BUSINESS DETAILS:
- Name: Al Tamimi Designing L.L.C.
- Location: Majas 3, Sharjah, UAE.
- Contact: +971 6 556 0227
- History: Recently rebranded from "Noor Al Khan Printing" to "Al Tamimi Designing" to reflect our expansion into luxury packaging and events. We are the same trusted team, just elevated.
- Services: 
  * Luxury Packaging: Rigid boxes, boutique bags, food packaging.
  * Event Fabrication: 3D foam props, stage backdrops, photo booths.
  * Corporate Branding: Business cards, uniforms, gifts.
  * Laser Cutting: Acrylic signage, wood engraving, neon signs.
  * Occasions: Wedding invitations, graduation sashes, party favors.
  * Printing Press: Digital & Offset printing, large format.

RESPONSE FORMAT (JSON ONLY):
{
  "message": "Your text response here (can use **markdown** for bold/lists)",
  "type": "string" | "choose",
  "options": ["Option 1", "Option 2", "Other"] // Required ONLY if type is "choose"
}

GUIDELINES:
- Be concise, helpful, and premium.
- **PRIORITIZE "choose" type**: Use buttons for menus, service lists, or navigation.
- **THE "OTHER" RULE**: Every "choose" type response MUST include "Other" as the VERY LAST option.
- **HANDLING "OTHER"**: If the user selects "Other", acknowledge it and ask them to type their specific request. For this follow-up, you MUST use "type": "string" to enable their text input.
- Use "type": "string" for direct answers to specific questions or when the user needs to provide free-text details.
- Never name yourself AI. Your name is Carl.
- If unsure, provide the email info@altamimidesigning.com or invite them to the office.
`;

export async function POST(req: Request) {
    if (!process.env.GEMINI_API_KEY) {
        return NextResponse.json({ error: "Gemini API key not configured" }, { status: 500 });
    }

    try {
        const { messages } = await req.json();
        const apiKey = (process.env.GEMINI_API_KEY || "").trim();

        if (!apiKey) {
            return NextResponse.json({ error: "Missing API Key" }, { status: 400 });
        }

        const localGenAI = new GoogleGenerativeAI(apiKey);

        // Use gemini-2.0-flash
        const model = localGenAI.getGenerativeModel({
            model: "gemini-2.0-flash",
            generationConfig: {
                responseMimeType: "application/json",
            }
        });

        // Gemini history MUST start with 'user' role. 
        const history = messages.slice(0, -1);
        const firstUserIndex = history.findIndex((m: any) => m.role === "user");
        const validHistory = firstUserIndex !== -1 ? history.slice(firstUserIndex) : [];

        const chat = model.startChat({
            history: validHistory.map((m: any) => ({
                role: m.role === "user" ? "user" : "model",
                parts: [{ text: m.content }],
            })),
            generationConfig: {
                maxOutputTokens: 1000,
            }
        });

        const lastMessage = messages[messages.length - 1].content;
        const fullPrompt = `${SYSTEM_PROMPT}\n\nUser: ${lastMessage}`;

        const result = await chat.sendMessage(fullPrompt);
        let responseText = result.response.text();

        // Robust Parsing: Clean up potential markdown wrappers
        try {
            // Remove markdown code block markers if they exist
            const cleanJson = responseText.replace(/```json\n?|```/g, "").trim();
            const parsed = JSON.parse(cleanJson);
            return NextResponse.json(parsed);
        } catch (e) {
            console.error("JSON Parse Error. Raw text:", responseText);
            // Fallback for non-JSON or partial failures
            return NextResponse.json({
                message: responseText.replace(/```json\n?|```/g, "").trim(),
                type: "string"
            });
        }

    } catch (error: any) {
        console.error("Chat API Error:", error);
        return NextResponse.json({ error: error.message || "Failed to fetch response" }, { status: 500 });
    }
}
