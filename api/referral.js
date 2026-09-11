/**
 * POST /api/referral
 * Handles client and talent referral submissions
 */
export function handleReferral(req, res) {
  try {
    const { referrerName, referrerEmail, referralType, candidateName, candidateEmail, notes } = req.body || {};

    if (!referrerName || typeof referrerName !== 'string' || !referrerName.trim()) {
      return res.status(400).json({
        ok: false,
        error: 'Validation Error: Referrer full name is required.'
      });
    }

    if (!referrerEmail || typeof referrerEmail !== 'string' || !referrerEmail.includes('@')) {
      return res.status(400).json({
        ok: false,
        error: 'Validation Error: Referrer email address is required.'
      });
    }

    if (!candidateName || typeof candidateName !== 'string' || !candidateName.trim()) {
      return res.status(400).json({
        ok: false,
        error: 'Validation Error: Name of the referred candidate or enterprise client is required.'
      });
    }

    const referralId = 'OPV-REF-' + Date.now();
    const referralRecord = {
      id: referralId,
      referrerName: referrerName.trim(),
      referrerEmail: referrerEmail.trim().toLowerCase(),
      referralType: referralType || 'Talent Referral',
      candidateName: candidateName.trim(),
      candidateEmail: candidateEmail ? candidateEmail.trim().toLowerCase() : '',
      notes: notes ? notes.trim() : '',
      status: 'LOGGED_FOR_REVIEW',
      submittedAt: new Date().toISOString()
    };

    console.log(`[OPERAVA AUDIT] Referral logged: ${referralId} from ${referralRecord.referrerName} for ${referralRecord.candidateName}`);

    return res.status(200).json({
      ok: true,
      message: 'Referral successfully registered. Thank you for connecting talent or enterprise partners to OPERAVA.',
      data: {
        referralId,
        referrer: referralRecord.referrerName,
        timestamp: referralRecord.submittedAt
      }
    });
  } catch (err) {
    console.error('[OPERAVA ERROR] Referral registration failed:', err);
    return res.status(500).json({
      ok: false,
      error: 'An internal error occurred while registering your referral.'
    });
  }
}
