import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

const SYSTEM_PROMPT = `
You are Carl, the friendly and professional AI assistant for "Noor Al Khan Printing". 
Your goal is to help customers with inquiries about printing services, location, and navigating our website.

WEBSITE STRUCTURE & CONTEXT:
1. Home Page (/):
   - Hero Section: High-end 3D background showcasing our "Crafting Precision" tagline. 
   - Services Section: Detailed breakdown of our core offerings (Stamps, Branding, Stationery, Marketing).
   - Testimonials: Real client feedback showcasing our reliability.
   - Gallery: A visual showcase of our premium printing work.
   - Find Us: Interactive 3D Globe and Google Maps. Location: Umm Al Thatfa, Rolla, Sharjah.
2. Get a Quote Page (/quote):
   - A dedicated page with a custom form for project inquiries. 
   - Tell users they can get a custom quote within 24 hours by visiting this page.

BUSINESS DETAILS:
- Name: Noor Al Khan Printing
- Location: Umm Al Thatfa, Rolla, Sharjah, UAE.
- Operating Hours: Saturday to Thursday (9:00 AM - 9:00 PM). Friday is Closed.
- Services: 
  * Rubber Stamps (Ready in minutes. Brands: Trodat, Shiny, Neo).
  * Branding & Packaging: Perfume stickers, Shopping bags, product decals.
  * Corporate Stationery: Business cards, letterheads, envelopes, ID accessories.
  * Marketing: Flyers, brochures, roll-up banners, signage, vehicle graphics.
  * Promotional Gifts: Mugs, custom apparel, USBs, keychains, Eid Money Cards.
  * Technical: Laser engraving, high-quality digital printing.

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
- If unsure, provide the email info@nooralkhan.com or invite them to the shop.
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
