/**
 * OPERAVA Global Solutions — Privacy, Storage & Cache Diagnostics Utility
 * Architecture: Audit and introspection tool for security, privacy compliance,
 * cookie categorization, storage quotas, and Service Worker status.
 */
(function(window) {
  'use strict';

  var OperavaPrivacyDiagnostics = {
    runAudit: function(logToConsole) {
      var shouldLog = logToConsole !== false;

      // 1. Consent Status
      var consent = window.OperavaConsent ? window.OperavaConsent.getConsent() : null;

      // 2. Cookie Audit
      var rawCookies = window.OperavaCookies ? window.OperavaCookies.getAll() : {};
      var cookieAudit = [];
      var taxonomy = window.OperavaCookies ? window.OperavaCookies.TAXONOMY : {};

      Object.keys(rawCookies).forEach(function(cookieName) {
        var tax = taxonomy[cookieName] || { category: 'unclassified', description: 'Third-party or external cookie', duration: 'Unknown' };
        cookieAudit.push({
          name: cookieName,
          category: tax.category,
          purpose: tax.description,
          duration: tax.duration,
          isHttpOnlyProtected: cookieName === 'operava_session'
        });
      });

      // 3. Storage Audit
      var storageMeta = window.OperavaStorage ? window.OperavaStorage.getDiagnostics() : {};

      // 4. Telemetry Gatekeeper Status
      var telemetryStatus = window.OperavaTelemetry ? window.OperavaTelemetry.getStatus() : { analyticsActive: false, marketingActive: false };

      // 5. Service Worker Status
      var swStatus = 'unsupported';
      if ('serviceWorker' in navigator) {
        swStatus = navigator.serviceWorker.controller ? 'active (controlling page)' : 'registered / idle';
      }

      // 6. Cache Audit
      var auditPromise = (window.OperavaCache ? window.OperavaCache.getCacheStatus() : Promise.resolve({ caches: [] }))
        .then(function(cacheStatus) {
          var report = {
            timestamp: new Date().toISOString(),
            consent: {
              version: consent ? consent.version : 'not initialized',
              essential: consent ? Boolean(consent.essential) : true,
              preferences: consent ? Boolean(consent.preferences) : false,
              analytics: consent ? Boolean(consent.analytics) : false,
              marketing: consent ? Boolean(consent.marketing) : false,
              timestamp: consent ? consent.timestamp : null
            },
            cookies: cookieAudit,
            storage: {
              localStorageKeys: storageMeta.localKeys || [],
              sessionStorageKeys: storageMeta.sessionKeys || []
            },
            serviceWorker: swStatus,
            caches: cacheStatus.caches || [],
            telemetryGates: telemetryStatus
          };

          if (shouldLog) {
            console.group('%c OPERAVA Privacy & Storage Diagnostics %c', 'background:#0A1628;color:#FFFFFF;font-weight:bold;padding:4px 8px;border-radius:4px;', '');
            console.log('Consent State:', report.consent);
            console.log('Cookies Detected (%d):', report.cookies.length, report.cookies);
            console.log('Namespaced Storage:', report.storage);
            console.log('Service Worker:', report.serviceWorker);
            console.log('Active Caches:', report.caches);
            console.log('Optional Services Gate:', report.telemetryGates);
            console.groupEnd();
          }

          return report;
        });

      return auditPromise;
    }
  };

  window.OperavaPrivacyDiagnostics = OperavaPrivacyDiagnostics;
})(typeof window !== 'undefined' ? window : this);
