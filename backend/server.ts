import express from "express";
import cors from "cors";
import { GoogleGenAI } from "@google/genai";
import { BIO, SKILLS, EXPERIENCES } from "./src/constants.js";

async function startServer() {
  const app = express();
  const PORT = process.env.PORT || 3001;

  app.use(cors());
  app.use(express.json());

  // Gemini Setup
  const apiKey = process.env.GEMINI_API_KEY;
  const genAI = apiKey ? new GoogleGenAI({ apiKey }) : null;

  app.post("/api/chat", async (req, res) => {
    const { message } = req.body;

    if (!genAI) {
      return res.status(500).json({ error: "Gemini API key not configured" });
    }

    try {
      const response = await genAI.models.generateContent({ 
        model: "gemini-2.5-flash",
        contents: message,
        config: {
          systemInstruction: `
            You are an AI assistant for a Senior Full Stack Developer.
            The developer's name is "Dev Portfolio".
            Tech stack: Java, Node.js, React, Vue.
            Bio: ${BIO}
            Skills: ${SKILLS.map(s => `${s.name} (${s.level}%)`).join(', ')}
            Experience: ${EXPERIENCES.map(e => `${e.role} at ${e.company} (${e.period})`).join('; ')}
            
            Instructions:
            - Be professional, helpful, and concise.
            - If asked about projects or experience, refer to the provided info.
            - If you don't know the answer, politely state that you can only discuss the developer's professional portfolio.
            - Keep answers under 3 sentences.
          `
        }
      });

      const text = response.text;

      res.json({ reply: text || "Não consegui processar sua mensagem." });
    } catch (error) {
      console.error("Gemini Error:", error);
      res.status(500).json({ reply: "Estou tendo problemas para me conectar agora. Tente mais tarde." });
    }
  });

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`API Server running on http://localhost:${PORT}`);
  });
}

startServer();
