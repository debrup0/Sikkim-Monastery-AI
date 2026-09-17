import express, { Request, Response } from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";

dotenv.config();

const PORT = 3000;

let aiClient: GoogleGenAI | null = null;

function getAiClient(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    aiClient = new GoogleGenAI({
      apiKey: apiKey || "",
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

async function startServer() {
  const app = express();

  // Increase payload limit for image data
  app.use(express.json({ limit: "20mb" }));

  // API Route: Health check
  app.get("/api/health", (_req: Request, res: Response) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  // API Route: Analyze Sikkim Monastery or Artifact
  app.post("/api/analyze", async (req: Request, res: Response) => {
    try {
      const { name, image, additionalContext } = req.body;

      if (!name && !image) {
        return res.status(400).json({
          error: "Please provide either the name of a monastery/artifact/site or upload an image.",
        });
      }

      const ai = getAiClient();
      const parts: any[] = [];

      if (image && image.data) {
        // Strip data url prefix if present
        let base64Data = image.data;
        let mimeType = image.mimeType || "image/jpeg";
        if (base64Data.includes(";base64,")) {
          const split = base64Data.split(";base64,");
          const mimeMatch = split[0].match(/data:(.*?)$/);
          if (mimeMatch) mimeType = mimeMatch[1];
          base64Data = split[1];
        }

        parts.push({
          inlineData: {
            mimeType: mimeType,
            data: base64Data,
          },
        });
      }

      let promptText = `You are an expert cultural guide specializing in the Buddhist monasteries, sacred artifacts, chortens, murals, statues, thangkas, and heritage sites of Sikkim.
Identify and analyze the monastery, artifact, or sacred site ${name ? `"${name}"` : "shown in the image"}${additionalContext ? ` (Additional note: ${additionalContext})` : ""}.

CRITICAL OUTPUT REQUIREMENTS:
Return structured JSON conforming to the exact schema:
1. name: Monastery or artifact title (with Tibetan/Sikkimese honorifics or common transliterations if applicable)
2. location: District and area in Sikkim (e.g. "West Sikkim (Gyalshing District), near Pelling" or "East Sikkim, Gangtok")
3. cultural_meaning: Exactly a 2-sentence breakdown of its historical significance and Buddhist spiritual/cultural lineage (e.g. Nyingma, Kagyu, Chogyal era, Guru Padmasambhava / Lhatsun Chempo connection).
4. visitor_tip: Practical visitor guidance covering best time to visit or local etiquette (such as circumambulating clockwise, photography restrictions inside prayer halls, removing shoes, respectful attire, or festival timings like Losar / Pang Lhabsol / Bumchu).`;

      if (name && !image) {
        promptText += `\nTarget Name/Subject: ${name}`;
      }

      parts.push({ text: promptText });

      const response = await ai.models.generateContent({
        model: "gemini-3.7-flash",
        contents: { parts },
        config: {
          systemInstruction:
            "You are an authoritative, culturally respectful expert guide on Sikkim's Vajrayana Buddhist monasteries, sacred relics, and cultural heritage. Always provide accurate geographical districts in Sikkim and exactly a two-sentence cultural breakdown.",
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              name: {
                type: Type.STRING,
                description: "Monastery or artifact title",
              },
              location: {
                type: Type.STRING,
                description: "District/ area in Sikkim",
              },
              cultural_meaning: {
                type: Type.STRING,
                description:
                  "Exactly 2-sentence breakdown of its historical significance",
              },
              visitor_tip: {
                type: Type.STRING,
                description: "Best time to visit or local etiquette",
              },
            },
            required: ["name", "location", "cultural_meaning", "visitor_tip"],
          },
        },
      });

      const responseText = response.text || "{}";
      const parsedData = JSON.parse(responseText);

      return res.json({
        success: true,
        data: parsedData,
      });
    } catch (error: any) {
      console.error("Error analyzing Sikkim monastery/artifact:", error);
      return res.status(500).json({
        error: error.message || "Failed to analyze monastery or artifact.",
      });
    }
  });

  // Vite middleware in dev, static files in production
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req: Request, res: Response) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Sikkim Monasteries Cultural Guide server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
