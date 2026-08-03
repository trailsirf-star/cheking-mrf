const express = require('express');
const { chat, health } = require('../services/ai.service');

const router = express.Router();

router.get('/health', (_req, res) => {
    res.json(health());
});

router.post('/chat', async (req, res) => {
    try {
        const response = await chat(req.body || {}, req.user || {});
        res.json(response);
    } catch (err) {
        const statusCode = Number(err?.statusCode || 500);
        const safeMessage = statusCode === 400
            ? err.message
            : statusCode === 503
                ? 'AI service is not configured'
                : 'AI service is temporarily unavailable';
        console.error('[AI] /api/ai/chat failed:', err.message);
        res.status(statusCode).json({
            success: false,
            message: safeMessage
        });
    }
});

module.exports = router;
