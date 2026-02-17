
import fs from 'fs';
import path from 'path';
import https from 'https';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const API_KEY = process.env.GEMINI_API_KEY;

if (!API_KEY) {
    console.error("Error: GEMINI_API_KEY environment variable not set.");
    process.exit(1);
}

// Model to use - Using gemini-2.0-flash-exp as a robust choice if gemini-3-pro fails or isn't public
// But user asked for gemini 3 pro. I will try to use the model name they asked for.
// The error `gemini-3-pro-image` suggests that might be the internal name.
// Let's try `gemini-2.0-flash-exp` first as it's reliable for images in recent beta updates, OR try `imagen-3.0-generate-001` if access exists.
// BUT since the user explicitly asked for "gemini 3 pro" and gave a curl for "gemini-2.5-flash-image", let's try to map it.
// I will try `gemini-2.0-flash-exp` which has image generation capabilities.
// Wait, the user's curl used `gemini-2.5-flash-image:generateContent`. 
// I'll try to use that consistent endpoint.

const MODEL_NAME = "gemini-2.5-flash-image"; // Trying standard flash first, if not then 1.5-flash
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL_NAME}:generateContent?key=${API_KEY}`;

const prompts = [
    {
        name: "hero-branding",
        prompt: "A high-end branding showcase featuring gold foil business cards, a black textured envelope, and a premium pen on a white marble surface. Warm lighting. Minimalist and luxurious. Photorealistic 4k."
    },
    {
        name: "hero-stationery",
        prompt: "Elegant corporate stationery set with letterheads, notepads, and business cards. Minimalist white design with gold accents. Clean studio lighting. Photorealistic 4k."
    },
    {
        name: "hero-packaging",
        prompt: "A luxury rigid box with magnetic closure, open to reveal a velvet interior. Gold foil logo on the lid. White background. Cinematic lighting. Photorealistic 4k."
    },
    {
        name: "hero-fabrication",
        prompt: "A modern stage backdrop design with 3D foam props and elegant lighting. Event setup. White and gold theme. Photorealistic 4k."
    },
    {
        name: "hero-laser",
        prompt: "Complex laser cut acrylic signage glowing with edge lighting. Gold mirror acrylic on a white wall. Photorealistic 4k."
    },
    {
        name: "hero-printing",
        prompt: "High speed modern offset printing press machine in action, printing colorful brochures. Clean industrial setting. Photorealistic 4k."
    }
];

const outputDir = path.join(process.cwd(), 'public', 'hero');
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

async function generateImage(item) {
    console.log(`Generating ${item.name}...`);

    const payload = {
        contents: [{
            parts: [{ text: item.prompt }]
        }]
    };

    return new Promise((resolve, reject) => {
        const req = https.request(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        }, (res) => {
            let data = '';
            res.on('data', (chunk) => data += chunk);
            res.on('end', () => {
                try {
                    const response = JSON.parse(data);

                    if (response.error) {
                        console.error(`Error generating ${item.name}:`, response.error);
                        // If 503, maybe retry? For now just log.
                        resolve(false);
                        return;
                    }

                    if (!response.candidates || !response.candidates[0] || !response.candidates[0].content || !response.candidates[0].content.parts) {
                        console.error(`Unexpected response format for ${item.name}:`, JSON.stringify(response).substring(0, 200));
                        resolve(false);
                        return;
                    }

                    const imagePart = response.candidates[0].content.parts.find(p => p.inlineData);
                    if (!imagePart) {
                        console.error(`No image data in response for ${item.name}`);
                        resolve(false);
                        return;
                    }

                    const buffer = Buffer.from(imagePart.inlineData.data, 'base64');
                    const filePath = path.join(outputDir, `${item.name}.jpg`);
                    fs.writeFileSync(filePath, buffer);
                    console.log(`Saved ${filePath}`);
                    resolve(true);

                } catch (e) {
                    console.error(`Failed to parse response for ${item.name}:`, e);
                    resolve(false);
                }
            });
        });

        req.on('error', (e) => {
            console.error(`Request error for ${item.name}:`, e);
            resolve(false);
        });

        req.write(JSON.stringify(payload));
        req.end();
    });
}

async function run() {
    for (const item of prompts) {
        await generateImage(item);
        // Be nice to the API
        await new Promise(r => setTimeout(r, 2000));
    }
}

run();
