/**
 * POST /api/contact
 * Handles corporate contact inquiries
 */
export function handleContact(req, res) {
  try {
    const { name, email, company, subject, message } = req.body || {};

    if (!name || typeof name !== 'string' || !name.trim()) {
      return res.status(400).json({
        ok: false,
        error: 'Validation Error: Full name is required.'
      });
    }

    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return res.status(400).json({
        ok: false,
        error: 'Validation Error: A valid corporate email address is required.'
      });
    }

    if (!message || typeof message !== 'string' || message.trim().length < 5) {
      return res.status(400).json({
        ok: false,
        error: 'Validation Error: Message content must be at least 5 characters.'
      });
    }

    const submissionId = 'OPV-MSG-' + Date.now();
    const submissionRecord = {
      id: submissionId,
      name: name.trim(),
      email: email.trim().toLowerCase(),
      company: company ? company.trim() : 'Not Specified',
      subject: subject ? subject.trim() : 'General Inquiry',
      message: message.trim(),
      receivedAt: new Date().toISOString(),
      status: 'RECEIVED'
    };

    console.log(`[OPERAVA AUDIT] Contact inquiry received: ${submissionId} from ${submissionRecord.email}`);

    return res.status(200).json({
      ok: true,
      message: 'Inquiry received successfully. An OPERAVA solutions director will respond within 24 business hours.',
      data: {
        referenceNumber: submissionId,
        timestamp: submissionRecord.receivedAt
      }
    });
  } catch (err) {
    console.error('[OPERAVA ERROR] Contact submission failed:', err);
    return res.status(500).json({
      ok: false,
      error: 'An internal server error occurred while processing your inquiry.'
    });
  }
}
