/**
 * OPERAVA Global Solutions — First-Party Cookie Manager
 * Architecture: Centralized cookie manipulation with strict security attributes
 * (Secure, SameSite=Lax, Path=/), categorized definitions, and consent enforcement.
 * Note: HttpOnly session cookies are set and managed server-side.
 */
(function(window) {
  'use strict';

  var COOKIE_TAXONOMY = {
    operava_session: { category: 'essential', description: 'Cryptographic session identifier (HttpOnly on server)', duration: 'Session / 24 hours' },
    operava_csrf: { category: 'essential', description: 'Anti-cross-site-request-forgery token', duration: 'Session / 24 hours' },
    operava_consent: { category: 'essential', description: 'Records user cookie and privacy preferences', duration: '180 days' },
    operava_theme: { category: 'preferences', description: 'Remembers user visual display preference', duration: '365 days' },
    operava_reduced_motion: { category: 'preferences', description: 'Remembers user motion reduction preference', duration: '365 days' },
    operava_analytics_id: { category: 'analytics', description: 'First-party privacy-preserving visitor identifier', duration: '90 days' },
    operava_pageview_count: { category: 'analytics', description: 'Session page count for usability diagnostics', duration: 'Session' },
    operava_campaign_id: { category: 'marketing', description: 'Attribution channel indicator', duration: '30 days' }
  };

  var OperavaCookies = {
    TAXONOMY: COOKIE_TAXONOMY,

    get: function(name) {
      if (!name || typeof document === 'undefined') return null;
      var encodedName = encodeURIComponent(name);
      var cookies = document.cookie ? document.cookie.split('; ') : [];
      for (var i = 0; i < cookies.length; i++) {
        var parts = cookies[i].split('=');
        if (parts[0] === encodedName) {
          try {
            return decodeURIComponent(parts.slice(1).join('='));
          } catch (e) {
            return parts.slice(1).join('=');
          }
        }
      }
      return null;
    },

    set: function(name, value, options) {
      if (!name || typeof document === 'undefined') return false;
      options = options || {};

      var cookieStr = encodeURIComponent(name) + '=' + encodeURIComponent(value);

      // Max-Age or Expires
      if (typeof options.maxAge === 'number') {
        cookieStr += '; Max-Age=' + options.maxAge;
      } else if (options.expires instanceof Date) {
        cookieStr += '; Expires=' + options.expires.toUTCString();
      } else if (typeof options.days === 'number') {
        var exp = new Date();
        exp.setDate(exp.getDate() + options.days);
        cookieStr += '; Expires=' + exp.toUTCString();
      }

      // Path: default to root
      var path = options.path || '/';
      cookieStr += '; Path=' + path;

      // Domain
      if (options.domain) {
        cookieStr += '; Domain=' + options.domain;
      }

      // SameSite: default to Lax for security & usability
      var sameSite = options.sameSite || 'Lax';
      cookieStr += '; SameSite=' + sameSite;

      // Secure: enable on HTTPS or when window.location.protocol is https:
      var isSecure = options.secure !== undefined ? options.secure : (window.location && window.location.protocol === 'https:');
      if (isSecure) {
        cookieStr += '; Secure';
      }

      document.cookie = cookieStr;
      return true;
    },

    delete: function(name, path, domain) {
      if (!name || typeof document === 'undefined') return;
      var targetPath = path || '/';
      var cookieStr = encodeURIComponent(name) + '=; Max-Age=0; Expires=Thu, 01 Jan 1970 00:00:00 GMT; Path=' + targetPath;
      if (domain) {
        cookieStr += '; Domain=' + domain;
      }
      document.cookie = cookieStr;
    },

    has: function(name) {
      return this.get(name) !== null;
    },

    getAll: function() {
      if (typeof document === 'undefined') return {};
      var result = {};
      var cookies = document.cookie ? document.cookie.split('; ') : [];
      for (var i = 0; i < cookies.length; i++) {
        if (!cookies[i]) continue;
        var parts = cookies[i].split('=');
        var name = '';
        var val = '';
        try {
          name = decodeURIComponent(parts[0]);
          val = decodeURIComponent(parts.slice(1).join('='));
        } catch (e) {
          name = parts[0];
          val = parts.slice(1).join('=');
        }
        if (name) {
          result[name] = val;
        }
      }
      return result;
    },

    getCategory: function(name) {
      if (COOKIE_TAXONOMY[name]) {
        return COOKIE_TAXONOMY[name].category;
      }
      return 'unknown';
    },

    purgeCategory: function(category) {
      if (!category || category === 'essential') return;
      var all = this.getAll();
      var self = this;
      Object.keys(all).forEach(function(cookieName) {
        var tax = COOKIE_TAXONOMY[cookieName];
        if (tax && tax.category === category) {
          self.delete(cookieName, '/');
        }
      });
    }
  };

  window.OperavaCookies = OperavaCookies;
})(typeof window !== 'undefined' ? window : this);
