import { Router } from 'express';
import { getHealth } from './health.js';
import { handleContact } from './contact.js';
import { handleTalentRequest } from './talent.js';
import { handleResumeSubmission } from './resume.js';
import { handleReferral } from './referral.js';
import { handleGetSession, handleRefreshSession, handleLogout, verifyCsrf } from './session.js';

const router = Router();

// System status & verification
router.get('/health', getHealth);

// Session & CSRF lifecycle
router.get('/session', handleGetSession);
router.post('/session/refresh', handleRefreshSession);
router.post('/session/logout', handleLogout);

// Apply CSRF validation middleware to state-changing forms
router.use(verifyCsrf);

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
