/**
 * OPERAVA Global Solutions — Privacy-Preserving Telemetry & Third-Party Service Gatekeeper
 * Architecture: Zero tracking before consent. Activates strictly upon verified consent grant
 * and immediately dismantles tracking listeners and purges identifiers upon revocation.
 */
(function(window) {
  'use strict';

  var isAnalyticsActive = false;
  var isMarketingActive = false;

  function generateAnonymousId() {
    return 'oa_' + Math.random().toString(36).substring(2, 11) + Date.now().toString(36);
  }

  function startAnalytics() {
    if (isAnalyticsActive) return;
    isAnalyticsActive = true;

    // Get or initialize anonymous visitor ID
    var anonId = null;
    if (window.OperavaCookies) {
      anonId = window.OperavaCookies.get('operava_analytics_id');
      if (!anonId) {
        anonId = generateAnonymousId();
        window.OperavaCookies.set('operava_analytics_id', anonId, { days: 90, sameSite: 'Lax', path: '/' });
      }

      // Increment pageview count
      var rawCount = window.OperavaCookies.get('operava_pageview_count');
      var count = rawCount ? parseInt(rawCount, 10) + 1 : 1;
      window.OperavaCookies.set('operava_pageview_count', count.toString(), { sameSite: 'Lax', path: '/' });
    }

    // Measure basic Core Web Vitals / performance timings passively
    if (window.performance && window.performance.timing) {
      var timing = window.performance.timing;
      var loadTime = timing.loadEventEnd - timing.navigationStart;
      if (loadTime > 0) {
        // Record aggregated diagnostic metric locally
        if (window.OperavaStorage) {
          window.OperavaStorage.set('perf_summary', {
            path: window.location.pathname,
            loadMs: loadTime,
            ts: Date.now()
          }, 3600, 'session');
        }
      }
    }
  }

  function stopAnalytics() {
    isAnalyticsActive = false;
    if (window.OperavaCookies) {
      window.OperavaCookies.delete('operava_analytics_id', '/');
      window.OperavaCookies.delete('operava_pageview_count', '/');
    }
    if (window.OperavaStorage) {
      window.OperavaStorage.remove('perf_summary', 'session');
    }
  }

  function startMarketing() {
    if (isMarketingActive) return;
    isMarketingActive = true;

    // Read URL campaign params if present (e.g., ref, utm_source)
    if (window.location && window.location.search) {
      var params = new URLSearchParams(window.location.search);
      var source = params.get('utm_source') || params.get('ref');
      if (source && window.OperavaCookies) {
        window.OperavaCookies.set('operava_campaign_id', encodeURIComponent(source), { days: 30, sameSite: 'Lax', path: '/' });
      }
    }
  }

  function stopMarketing() {
    isMarketingActive = false;
    if (window.OperavaCookies) {
      window.OperavaCookies.delete('operava_campaign_id', '/');
    }
  }

  function applyConsentGate(consent) {
    if (!consent) return;

    if (consent.analytics) {
      startAnalytics();
    } else {
      stopAnalytics();
    }

    if (consent.marketing) {
      startMarketing();
    } else {
      stopMarketing();
    }
  }

  // Listen for real-time consent updates
  window.addEventListener('operava:consent-updated', function(event) {
    applyConsentGate(event.detail);
  });

  // Evaluate initial gate state once Consent system is ready
  function initGate() {
    if (window.OperavaConsent) {
      var initialConsent = window.OperavaConsent.getConsent();
      applyConsentGate(initialConsent);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initGate);
  } else {
    initGate();
  }

  window.OperavaTelemetry = {
    getStatus: function() {
      return {
        analyticsActive: isAnalyticsActive,
        marketingActive: isMarketingActive
      };
    }
  };
})(typeof window !== 'undefined' ? window : this);
