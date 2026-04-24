const express = require('express');
const router = express.Router();
const { getGeminiClient } = require('../config/google');

const SYSTEM_PROMPT = `You are MatMitra's Indian Election Education Assistant — a friendly, knowledgeable, and strictly nonpartisan civic education guide for Indian voters. Your name is 'MatMitra AI Sahayak'.

Rules:
- Bilingual: Response in Hindi if user writes in Hindi, otherwise English.
- Nonpartisan: Never express opinions on political parties or candidates.
- Educational: Focus on processes (Form 6, EVM, MCC, VVPAT, etc.).
- Factual: Use official ECI data points.
- Conciseness: Keep responses within 3-5 sentences unless detail is requested.`;

router.post('/', async (req, res) => {
  const { message, history } = req.body;

  try {
    const client = await getGeminiClient();
    // Using gemini-2.5-flash-lite as requested
    const model = client.getGenerativeModel({ 
        model: "gemini-2.5-flash-lite", 
        systemInstruction: SYSTEM_PROMPT 
    });

    const chat = model.startChat({
      history: history || [],
    });

    const result = await chat.sendMessage(message);
    const responseText = result.response.text();

    res.json({ text: responseText });
  } catch (err) {
    console.error('Chat error:', err);
    res.status(500).json({ error: 'Failed to communicate with AI Sahayak', details: err.message });
  }
});

module.exports = router;
