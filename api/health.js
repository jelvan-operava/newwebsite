/**
 * GET /api/health
 * System health and corporate verification endpoint
 */
export function getHealth(req, res) {
  res.status(200).json({
    status: 'operational',
    service: 'OPERAVA Global Operations API',
    company: 'Operava Global Solutions',
    secRegistration: '2026080262213-03',
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
}
