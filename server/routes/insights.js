const express = require('express');
const router = express.Router();
const { vertexAI } = require('../config/google');

router.post('/briefing', async (req, res) => {
  const { userData } = req.body; // Expects { quizScore, completedSteps, totalSteps }

  try {
    const model = vertexAI.getGenerativeModel({
      model: 'gemini-1.5-flash',
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

    res.json({ briefing });
  } catch (err) {
    console.error('Insights error:', err);
    res.status(500).json({ error: 'Failed to generate personalized briefing' });
  }
});

module.exports = router;
