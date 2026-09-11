/**
 * POST /api/resume
 * Handles professional candidate application submissions
 */
export function handleResumeSubmission(req, res) {
  try {
    const { firstName, lastName, email, phone, targetRole, linkedinUrl, experienceYears, summary } = req.body || {};

    const fullName = `${firstName || ''} ${lastName || ''}`.trim();
    if (!fullName) {
      return res.status(400).json({
        ok: false,
        error: 'Validation Error: Candidate full name is required.'
      });
    }

    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return res.status(400).json({
        ok: false,
        error: 'Validation Error: A valid email address is required.'
      });
    }

    if (!targetRole || typeof targetRole !== 'string' || !targetRole.trim()) {
      return res.status(400).json({
        ok: false,
        error: 'Validation Error: Target role discipline must be selected.'
      });
    }

    const applicationId = 'OPV-APP-' + Date.now();
    const candidateRecord = {
      id: applicationId,
      fullName,
      email: email.trim().toLowerCase(),
      phone: phone ? phone.trim() : 'Not provided',
      targetRole: targetRole.trim(),
      linkedinUrl: linkedinUrl ? linkedinUrl.trim() : '',
      experienceYears: experienceYears || '3-5 years',
      summary: summary ? summary.trim() : '',
      status: 'APPLICATION_RECEIVED',
      submittedAt: new Date().toISOString()
    };

    console.log(`[OPERAVA AUDIT] Candidate application filed: ${applicationId} (${candidateRecord.fullName} - ${candidateRecord.targetRole})`);

    return res.status(200).json({
      ok: true,
      message: 'Application received. Your profile has been queued for evaluation by our recruitment leadership team.',
      data: {
        applicationId,
        targetRole: candidateRecord.targetRole,
        submittedAt: candidateRecord.submittedAt
      }
    });
  } catch (err) {
    console.error('[OPERAVA ERROR] Resume application failed:', err);
    return res.status(500).json({
      ok: false,
      error: 'An internal error occurred while processing your application.'
    });
  }
}
