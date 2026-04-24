const express = require('express');
const router = express.Router();
const { z } = require('zod');
const { getGeminiClient } = require('../config/google');

/**
 * System Instructions for MatMitra AI Sahayak
 */
const SYSTEM_PROMPT = `You are MatMitra's Indian Election Education Assistant — a friendly, knowledgeable, and strictly nonpartisan civic education guide for Indian voters. Your name is 'MatMitra AI Sahayak'.

Rules:
- Bilingual: Response in Hindi if user writes in Hindi, otherwise English.
- Nonpartisan: Never express opinions on political parties or candidates.
- Educational: Focus on processes (Form 6, EVM, MCC, VVPAT, etc.).
- Factual: Use official ECI data points.
- Conciseness: Keep responses within 3-5 sentences unless detail is requested.`;

/**
 * Zod Schema for Chat Request Validation
 * Ensures message is non-empty and history follows correct structure.
 */
const ChatSchema = z.object({
  message: z.string().trim().min(1).max(500),
  history: z.array(z.object({
    role: z.enum(['user', 'model']),
    parts: z.array(z.object({
      text: z.string()
    }))
  })).optional()
});

/**
 * @route POST /api/chat
 * @desc  Communicate with Gemini AI Sahayak
 * @access Public
 */
router.post('/', async (req, res) => {
  try {
    // 1. Validate Input
    const { message, history } = ChatSchema.parse(req.body);

    // 2. Initialize Gemini
    const client = await getGeminiClient();
    const model = client.getGenerativeModel({ 
      model: "gemini-1.5-flash-lite", 
      systemInstruction: SYSTEM_PROMPT 
    });

    const chat = model.startChat({
      history: history || [],
    });

    // 3. Send Message & Stream (Simplified for this version)
    const result = await chat.sendMessage(message);
    const responseText = result.response.text();

    res.status(200).json({ text: responseText });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return res.status(400).json({ error: 'Invalid input', details: err.errors });
    }
    console.error('Chat error:', err);
    res.status(500).json({ error: 'Failed to communicate with AI Sahayak', details: err.message });
  }
});

module.exports = router;
