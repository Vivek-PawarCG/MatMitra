const express = require('express');
const router = express.Router();
const { z } = require('zod');
const { vertexAI } = require('../config/google');

const BriefingSchema = z.object({
  userData: z.object({
    quizScore: z.number().min(0).max(7),
    completedSteps: z.number().min(0).max(8),
    totalSteps: z.number().min(1)
  })
});

/**
 * @route POST /api/insights/briefing
 * @desc  Generate a personalized civic readiness briefing using Vertex AI
 * @access Public
 */
router.post('/briefing', async (req, res) => {
  if (!vertexAI) {
    return res.status(500).json({
      error: 'Vertex AI is not configured',
      details: 'PROJECT_ID is missing in server environment.'
    });
  }

  try {
    const { userData } = BriefingSchema.parse(req.body);

    const model = vertexAI.getGenerativeModel({
      model: 'gemini-2.5-flash-lite',
    });

    const prompt = `Analyze this voter's civic readiness data and provide a professional, encouraging personalized briefing.
    
    Voter Data:
    - Quiz Score: ${userData.quizScore}/7
    - Steps Completed: ${userData.completedSteps}/${userData.totalSteps}
    
    Output format:
    1. A "Civic Readiness Score" (Low/Medium/High).
    2. 3 Key actions they still need to take based on the remaining steps.
    3. A brief encouragement note in the spirit of "Mera Vote, Mera Adhikar".
    
    Keep it formal but inspiring.`;

    const result = await model.generateContent(prompt);
    const briefing = result.response.candidates[0].content.parts[0].text;

    res.status(200).json({ briefing });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return res.status(400).json({ error: 'Invalid data', details: err.errors });
    }
    console.error('Insights error:', err);
    res.status(500).json({ error: 'Failed to generate personalized briefing', details: err.message });
  }
});

module.exports = router;
