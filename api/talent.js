/**
 * POST /api/talent
 * Handles enterprise dedicated talent and workforce pod requests
 */
export function handleTalentRequest(req, res) {
  try {
    const { company, contactName, email, rolesNeeded, podSize, timeline, notes } = req.body || {};

    if (!company || typeof company !== 'string' || !company.trim()) {
      return res.status(400).json({
        ok: false,
        error: 'Validation Error: Organization / Company name is required.'
      });
    }

    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return res.status(400).json({
        ok: false,
        error: 'Validation Error: A valid enterprise business email is required.'
      });
    }

    if (!rolesNeeded || typeof rolesNeeded !== 'string' || !rolesNeeded.trim()) {
      return res.status(400).json({
        ok: false,
        error: 'Validation Error: Technical or operational roles needed must be specified.'
      });
    }

    const referenceId = 'OPV-POD-' + Date.now();
    const talentRecord = {
      id: referenceId,
      company: company.trim(),
      contactName: contactName ? contactName.trim() : 'Company Representative',
      email: email.trim().toLowerCase(),
      rolesNeeded: rolesNeeded.trim(),
      podSize: podSize || '1-3 Specialists',
      timeline: timeline || 'Immediate (within 1-2 weeks)',
      notes: notes ? notes.trim() : '',
      status: 'UNDER_QUALIFICATION',
      receivedAt: new Date().toISOString()
    };

    console.log(`[OPERAVA AUDIT] Talent pod inquiry received: ${referenceId} for ${talentRecord.company} (${talentRecord.rolesNeeded})`);

    return res.status(200).json({
      ok: true,
      message: 'Talent specification received. An OPERAVA Client Partner will prepare a custom squad structure and statement of work.',
      data: {
        referenceNumber: referenceId,
        company: talentRecord.company,
        timestamp: talentRecord.receivedAt
      }
    });
  } catch (err) {
    console.error('[OPERAVA ERROR] Talent request failed:', err);
    return res.status(500).json({
      ok: false,
      error: 'An internal error occurred while processing your workforce specification.'
    });
  }
}
