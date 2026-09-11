import { Router } from 'express';
import { getHealth } from './health.js';
import { handleContact } from './contact.js';
import { handleTalentRequest } from './talent.js';
import { handleResumeSubmission } from './resume.js';
import { handleReferral } from './referral.js';

const router = Router();

// System status & verification
router.get('/health', getHealth);

// Inquiries & forms
router.post('/contact', handleContact);
router.post('/talent', handleTalentRequest);
router.post('/resume', handleResumeSubmission);
router.post('/referral', handleReferral);

// 404 for unknown API routes
router.use('*', (req, res) => {
  res.status(404).json({
    ok: false,
    error: `API endpoint ${req.originalUrl} not found.`
  });
});

export default router;
