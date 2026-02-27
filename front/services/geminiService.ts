import { GoogleGenAI } from "@google/genai";
import { PROFILE, PROJECTS, EXPERIENCE, EDUCATION, SKILLS } from '../constants';

const API_KEY = process.env.API_KEY || ''; // Ensure this is set in your environment
const ai = new GoogleGenAI({ apiKey: API_KEY });

// Construct a system prompt containing the architect's data
const systemInstruction = `
Eres el asistente virtual IA del portafolio del Arquitecto ${PROFILE.name}.
Tu objetivo es responder preguntas de posibles clientes, reclutadores o estudiantes sobre la carrera, proyectos y estilo de Mateo.
Usa la siguiente información como tu base de conocimiento (Ground Truth):

Perfil: ${JSON.stringify(PROFILE)}
Experiencia: ${JSON.stringify(EXPERIENCE)}
Educación: ${JSON.stringify(EDUCATION)}
Habilidades: ${JSON.stringify(SKILLS)}
Proyectos Destacados: ${JSON.stringify(PROJECTS.map(p => ({ title: p.title, description: p.description, tech: p.tags })))}

Reglas:
1. Responde siempre de manera profesional, educada y concisa.
2. Si te preguntan por contacto, da el email o teléfono del perfil.
3. Si te preguntan algo que no está en la información, responde que no tienes ese dato pero sugieres contactar directamente al arquitecto.
4. Mantén un tono elegante y sofisticado, acorde a un arquitecto moderno.
5. Responde en el idioma en que te pregunten (detecta si es Inglés o Español).
`;

export const sendMessageToGemini = async (history: {role: 'user' | 'model', content: string}[], message: string) => {
  try {
    if (!API_KEY) {
      return "Lo siento, la API Key no está configurada en este demo.";
    }

    const model = 'gemini-3-flash-preview'; 

    // Convert history to format expected by GoogleGenAI if necessary, 
    // but for simple single-turn or manual history management with generateContent, 
    // we can just append the new message to a chat session.
    
    // Using chat for context retention
    const chat = ai.chats.create({
      model: model,
      config: {
        systemInstruction: systemInstruction,
      },
      history: history.map(h => ({
        role: h.role,
        parts: [{ text: h.content }]
      }))
    });

    const result = await chat.sendMessage({
      message: message
    });

    return result.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Tuve un problema técnico momentáneo. Por favor intenta de nuevo.";
  }
};
