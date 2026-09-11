/**
 * OPERAVA Global Solutions — Session & CSRF Architecture
 * Implements server-managed, HttpOnly, SameSite, cryptographic session tokens
 * and anti-CSRF protection for client form submissions.
 */

import crypto from 'crypto';

const SESSION_TTL_MS = 24 * 60 * 60 * 1000; // 24 hours
const SESSIONS = new Map();

// Helper to parse cookies from incoming request headers
export function parseCookies(req) {
  const list = {};
  const rc = req.headers.cookie;
  if (!rc) return list;

  rc.split(';').forEach(cookie => {
    const parts = cookie.split('=');
    const name = parts.shift().trim();
    if (name) {
      try {
        list[name] = decodeURIComponent(parts.join('='));
      } catch (e) {
        list[name] = parts.join('=');
      }
    }
  });

  return list;
}

// Clean up expired sessions periodically
setInterval(() => {
  const now = Date.now();
  for (const [id, session] of SESSIONS.entries()) {
    if (now > session.expiresAt) {
      SESSIONS.delete(id);
    }
  }
}, 60 * 60 * 1000); // Hourly prune

export function createSession() {
  const sessionId = crypto.randomBytes(32).toString('hex');
  const csrfToken = crypto.randomBytes(24).toString('hex');
  const now = Date.now();

  const session = {
    id: sessionId,
    csrfToken,
    created: now,
    expiresAt: now + SESSION_TTL_MS
  };

  SESSIONS.set(sessionId, session);
  return session;
}

export function getSessionFromRequest(req) {
  const cookies = parseCookies(req);
  const sessionId = cookies.operava_session;

  if (sessionId && SESSIONS.has(sessionId)) {
    const session = SESSIONS.get(sessionId);
    if (Date.now() < session.expiresAt) {
      return session;
    }
    SESSIONS.delete(sessionId);
  }

  return null;
}

export function attachSessionCookies(res, session, isSecure) {
  const secureFlag = isSecure ? '; Secure' : '';
  const maxAge = Math.floor((session.expiresAt - Date.now()) / 1000);

  // 1. HttpOnly, SameSite=Lax session identity
  const sessionCookie = `operava_session=${session.id}; Path=/; Max-Age=${maxAge}; HttpOnly; SameSite=Lax${secureFlag}`;

  // 2. Client-accessible CSRF cookie for form verification
  const csrfCookie = `operava_csrf=${session.csrfToken}; Path=/; Max-Age=${maxAge}; SameSite=Lax${secureFlag}`;

  res.setHeader('Set-Cookie', [sessionCookie, csrfCookie]);
}

/**
 * GET /api/session
 * Retrieves active session or provisions a new cryptographic session
 */
export function handleGetSession(req, res) {
  try {
    const isSecure = req.secure || req.headers['x-forwarded-proto'] === 'https';
    let session = getSessionFromRequest(req);

    if (!session) {
      session = createSession();
      attachSessionCookies(res, session, isSecure);
    }

    return res.status(200).json({
      ok: true,
      session: {
        id: session.id.substring(0, 8) + '...', // Mask full token in JSON body
        csrfToken: session.csrfToken,
        created: new Date(session.created).toISOString(),
        expiresAt: new Date(session.expiresAt).toISOString()
      }
    });
  } catch (err) {
    console.error('[Session Error]', err);
    return res.status(500).json({ ok: false, error: 'Failed to process session.' });
  }
}

/**
 * POST /api/session/refresh
 * Refreshes session TTL
 */
export function handleRefreshSession(req, res) {
  try {
    const isSecure = req.secure || req.headers['x-forwarded-proto'] === 'https';
    let session = getSessionFromRequest(req);

    if (!session) {
      session = createSession();
    } else {
      session.expiresAt = Date.now() + SESSION_TTL_MS;
      SESSIONS.set(session.id, session);
    }

    attachSessionCookies(res, session, isSecure);

    return res.status(200).json({
      ok: true,
      session: {
        csrfToken: session.csrfToken,
        expiresAt: new Date(session.expiresAt).toISOString()
      }
    });
  } catch (err) {
    return res.status(500).json({ ok: false, error: 'Session refresh failed.' });
  }
}

/**
 * POST /api/session/logout
 * Terminates session on server and expires cookies
 */
export function handleLogout(req, res) {
  try {
    const cookies = parseCookies(req);
    if (cookies.operava_session) {
      SESSIONS.delete(cookies.operava_session);
    }

    const clearSession = 'operava_session=; Path=/; Max-Age=0; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly; SameSite=Lax';
    const clearCsrf = 'operava_csrf=; Path=/; Max-Age=0; Expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax';

    res.setHeader('Set-Cookie', [clearSession, clearCsrf]);

    return res.status(200).json({
      ok: true,
      message: 'Session terminated successfully.'
    });
  } catch (err) {
    return res.status(500).json({ ok: false, error: 'Logout failed.' });
  }
}

/**
 * Middleware: Verify CSRF token for mutating endpoints
 */
export function verifyCsrf(req, res, next) {
  // Only enforce for state-changing HTTP methods
  if (['POST', 'PUT', 'DELETE', 'PATCH'].includes(req.method)) {
    const submittedToken = req.headers['x-csrf-token'] || (req.body && req.body._csrf);
    const cookies = parseCookies(req);
    const cookieCsrf = cookies.operava_csrf;

    // If a session exists with a CSRF token, verify match
    const session = getSessionFromRequest(req);
    if (session) {
      if (!submittedToken || submittedToken !== session.csrfToken) {
        // If cookie token matches submitted token, also accept
        if (!cookieCsrf || submittedToken !== cookieCsrf) {
          console.warn('[Security Notice] CSRF validation failed for', req.path);
          return res.status(403).json({
            ok: false,
            error: 'Security Validation: Missing or invalid CSRF authorization token.'
          });
        }
      }
    }
  }

  next();
}
