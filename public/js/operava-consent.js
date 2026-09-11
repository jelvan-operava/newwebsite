/**
 * OPERAVA Global Solutions — First-Party Consent Management System
 * Architecture: Consent versioning, accessible preference center dialog,
 * automated category purging on revocation, and event broadcast.
 */
(function(window) {
  'use strict';

  var CONSENT_VERSION = '1.0';
  var STORAGE_KEY = 'consent';
  var COOKIE_NAME = 'operava_consent';

  var DEFAULT_CONSENT = {
    version: CONSENT_VERSION,
    essential: true,
    preferences: false,
    analytics: false,
    marketing: false,
    timestamp: null,
    source: 'website'
  };

  var activeTriggerEl = null;

  function loadSavedConsent() {
    var stored = null;
    if (window.OperavaStorage) {
      stored = window.OperavaStorage.get(STORAGE_KEY, null, 'local');
    }

    if (!stored && window.OperavaCookies) {
      var raw = window.OperavaCookies.get(COOKIE_NAME);
      if (raw) {
        try {
          stored = JSON.parse(raw);
        } catch (e) {}
      }
    }

    if (stored && typeof stored === 'object' && stored.version === CONSENT_VERSION) {
      return stored;
    }

    // If version is mismatched or no stored decision, return null to prompt user
    return null;
  }

  function persistConsent(data) {
    data.version = CONSENT_VERSION;
    data.timestamp = new Date().toISOString();
    data.source = 'website';

    // 1. Store in client storage
    if (window.OperavaStorage) {
      window.OperavaStorage.set(STORAGE_KEY, data, 180 * 86400, 'local');
    }

    // 2. Set first-party cookie for server synchronization
    if (window.OperavaCookies) {
      window.OperavaCookies.set(COOKIE_NAME, JSON.stringify({
        v: data.version,
        e: data.essential ? 1 : 0,
        p: data.preferences ? 1 : 0,
        a: data.analytics ? 1 : 0,
        m: data.marketing ? 1 : 0,
        t: data.timestamp
      }), { days: 180, sameSite: 'Lax', path: '/' });
    }

    // 3. Enforce category purging on newly rejected categories
    if (!data.preferences && window.OperavaCookies) {
      window.OperavaCookies.purgeCategory('preferences');
    }
    if (!data.analytics && window.OperavaCookies) {
      window.OperavaCookies.purgeCategory('analytics');
    }
    if (!data.marketing && window.OperavaCookies) {
      window.OperavaCookies.purgeCategory('marketing');
    }

    // 4. Dispatch system-wide consent event
    try {
      var event = new CustomEvent('operava:consent-updated', { detail: data });
      window.dispatchEvent(event);
    } catch (e) {}

    return data;
  }

  var OperavaConsent = {
    VERSION: CONSENT_VERSION,

    getConsent: function() {
      var saved = loadSavedConsent();
      return saved || Object.assign({}, DEFAULT_CONSENT);
    },

    hasConsent: function(category) {
      if (category === 'essential') return true;
      var consent = this.getConsent();
      return Boolean(consent[category]);
    },

    hasDecided: function() {
      return loadSavedConsent() !== null;
    },

    acceptAll: function() {
      var fullConsent = {
        essential: true,
        preferences: true,
        analytics: true,
        marketing: true
      };
      persistConsent(fullConsent);
      this.hideBanner();
      this.closePreferences();
      return fullConsent;
    },

    rejectOptional: function() {
      var minimalConsent = {
        essential: true,
        preferences: false,
        analytics: false,
        marketing: false
      };
      persistConsent(minimalConsent);
      this.hideBanner();
      this.closePreferences();
      return minimalConsent;
    },

    savePreferences: function(prefs) {
      var newConsent = {
        essential: true,
        preferences: Boolean(prefs.preferences),
        analytics: Boolean(prefs.analytics),
        marketing: Boolean(prefs.marketing)
      };
      persistConsent(newConsent);
      this.hideBanner();
      this.closePreferences();
      return newConsent;
    },

    showBanner: function() {
      var banner = document.getElementById('operava-consent-banner');
      if (banner) {
        banner.classList.add('is-active');
        document.body.classList.add('operava-consent-active');
      }
    },

    hideBanner: function() {
      var banner = document.getElementById('operava-consent-banner');
      if (banner) {
        banner.classList.remove('is-active');
        document.body.classList.remove('operava-consent-active');
      }
    },

    openPreferences: function(triggerEl) {
      activeTriggerEl = triggerEl || document.activeElement;
      var modal = document.getElementById('operava-pref-modal');
      if (!modal) return;

      var current = this.getConsent();

      var prefToggle = document.getElementById('operava-toggle-pref');
      var anaToggle = document.getElementById('operava-toggle-ana');
      var mktToggle = document.getElementById('operava-toggle-mkt');

      if (prefToggle) prefToggle.checked = Boolean(current.preferences);
      if (anaToggle) anaToggle.checked = Boolean(current.analytics);
      if (mktToggle) mktToggle.checked = Boolean(current.marketing);

      modal.classList.add('is-open');
      modal.setAttribute('aria-hidden', 'false');

      // Trap focus
      var closeBtn = document.getElementById('operava-modal-close');
      if (closeBtn) {
        setTimeout(function() { closeBtn.focus(); }, 100);
      }
    },

    closePreferences: function() {
      var modal = document.getElementById('operava-pref-modal');
      if (!modal) return;

      modal.classList.remove('is-open');
      modal.setAttribute('aria-hidden', 'true');

      if (activeTriggerEl && typeof activeTriggerEl.focus === 'function') {
        try { activeTriggerEl.focus(); } catch (e) {}
        activeTriggerEl = null;
      }
    },

    resetConsent: function() {
      if (window.OperavaStorage) {
        window.OperavaStorage.remove(STORAGE_KEY, 'local');
      }
      if (window.OperavaCookies) {
        window.OperavaCookies.delete(COOKIE_NAME, '/');
      }
      this.showBanner();
    }
  };

  // Build UI Elements if not present in DOM
  function injectConsentUI() {
    if (document.getElementById('operava-consent-banner')) return;

    // 1. Bottom Banner HTML
    var bannerEl = document.createElement('section');
    bannerEl.id = 'operava-consent-banner';
    bannerEl.className = 'operava-consent-banner';
    bannerEl.setAttribute('role', 'region');
    bannerEl.setAttribute('aria-label', 'Cookie and Privacy Notice');
    bannerEl.innerHTML = [
      '<div class="operava-consent-content">',
      '  <div class="operava-consent-text">',
      '    <h3 class="operava-consent-title">Your privacy matters.</h3>',
      '    <p class="operava-consent-desc">',
      '      OPERAVA uses essential cookies and client technologies to keep this website secure, functional, and reliable. ',
      '      With your permission, we may also use optional technologies to understand website usage and improve your experience. ',
      '      Learn more in our <a href="/privacy-policy.html">Privacy Policy</a>.',
      '    </p>',
      '  </div>',
      '  <div class="operava-consent-actions">',
      '    <button type="button" class="operava-btn operava-btn-secondary" id="operava-banner-reject">Reject Optional</button>',
      '    <button type="button" class="operava-btn operava-btn-secondary" id="operava-banner-pref">Manage Preferences</button>',
      '    <button type="button" class="operava-btn operava-btn-primary" id="operava-banner-accept">Accept All</button>',
      '  </div>',
      '</div>'
    ].join('\n');

    // 2. Preference Center Modal HTML
    var modalEl = document.createElement('div');
    modalEl.id = 'operava-pref-modal';
    modalEl.className = 'operava-modal-backdrop';
    modalEl.setAttribute('role', 'dialog');
    modalEl.setAttribute('aria-modal', 'true');
    modalEl.setAttribute('aria-hidden', 'true');
    modalEl.setAttribute('aria-labelledby', 'operava-pref-title');
    modalEl.innerHTML = [
      '<div class="operava-modal-dialog">',
      '  <div class="operava-modal-header">',
      '    <div class="operava-modal-header-text">',
      '      <h2 id="operava-pref-title">Cookie &amp; Privacy Preferences</h2>',
      '      <p>Configure how OPERAVA uses cookies and client storage technologies on your device.</p>',
      '    </div>',
      '    <button type="button" class="operava-modal-close-btn" id="operava-modal-close" aria-label="Close preferences dialog">✕</button>',
      '  </div>',
      '  <div class="operava-modal-body">',
      '    <!-- Essential -->',
      '    <div class="operava-pref-category">',
      '      <div class="operava-pref-category-header">',
      '        <div class="operava-pref-category-title">',
      '          <span>Essential Technologies</span>',
      '        </div>',
      '        <span class="operava-badge-always-active">Always Active</span>',
      '      </div>',
      '      <p class="operava-pref-category-desc">These technologies are strictly necessary for system security, session integrity, form submission validation, and core platform operation.</p>',
      '    </div>',
      '    <!-- Preferences -->',
      '    <div class="operava-pref-category">',
      '      <div class="operava-pref-category-header">',
      '        <label for="operava-toggle-pref" class="operava-pref-category-title">',
      '          <span>Interface &amp; Preference Settings</span>',
      '        </label>',
      '        <label class="operava-switch">',
      '          <input type="checkbox" id="operava-toggle-pref" aria-label="Enable Interface and Preference Settings">',
      '          <span class="operava-switch-slider"></span>',
      '        </label>',
      '      </div>',
      '      <p class="operava-pref-category-desc">These technologies remember your visual and accessibility choices (such as motion sensitivity settings) to maintain a consistent experience across visits.</p>',
      '    </div>',
      '    <!-- Analytics -->',
      '    <div class="operava-pref-category">',
      '      <div class="operava-pref-category-header">',
      '        <label for="operava-toggle-ana" class="operava-pref-category-title">',
      '          <span>Performance &amp; Usage Analytics</span>',
      '        </label>',
      '        <label class="operava-switch">',
      '          <input type="checkbox" id="operava-toggle-ana" aria-label="Enable Performance and Usage Analytics">',
      '          <span class="operava-switch-slider"></span>',
      '        </label>',
      '      </div>',
      '      <p class="operava-pref-category-desc">These first-party technologies help us aggregate anonymous traffic metrics, assess page loading performance, and identify areas for system improvement.</p>',
      '    </div>',
      '    <!-- Marketing -->',
      '    <div class="operava-pref-category">',
      '      <div class="operava-pref-category-header">',
      '        <label for="operava-toggle-mkt" class="operava-pref-category-title">',
      '          <span>Marketing &amp; Attribution</span>',
      '        </label>',
      '        <label class="operava-switch">',
      '          <input type="checkbox" id="operava-toggle-mkt" aria-label="Enable Marketing and Attribution Technologies">',
      '          <span class="operava-switch-slider"></span>',
      '        </label>',
      '      </div>',
      '      <p class="operava-pref-category-desc">These technologies evaluate marketing channel effectiveness and campaign attribution without sharing individual profile data with commercial brokers.</p>',
      '    </div>',
      '  </div>',
      '  <div class="operava-modal-footer">',
      '    <div class="operava-modal-footer-left">',
      '      <button type="button" class="operava-btn operava-btn-secondary" id="operava-modal-reject">Reject Optional</button>',
      '    </div>',
      '    <div class="operava-modal-footer-right">',
      '      <button type="button" class="operava-btn operava-btn-secondary" id="operava-modal-save">Save Preferences</button>',
      '      <button type="button" class="operava-btn operava-btn-primary" id="operava-modal-accept">Accept All</button>',
      '    </div>',
      '  </div>',
      '</div>'
    ].join('\n');

    document.body.appendChild(bannerEl);
    document.body.appendChild(modalEl);

    // Event Bindings
    document.getElementById('operava-banner-accept').addEventListener('click', function() {
      OperavaConsent.acceptAll();
    });

    document.getElementById('operava-banner-reject').addEventListener('click', function() {
      OperavaConsent.rejectOptional();
    });

    document.getElementById('operava-banner-pref').addEventListener('click', function(e) {
      OperavaConsent.openPreferences(e.currentTarget);
    });

    document.getElementById('operava-modal-close').addEventListener('click', function() {
      OperavaConsent.closePreferences();
    });

    document.getElementById('operava-modal-reject').addEventListener('click', function() {
      OperavaConsent.rejectOptional();
    });

    document.getElementById('operava-modal-accept').addEventListener('click', function() {
      OperavaConsent.acceptAll();
    });

    document.getElementById('operava-modal-save').addEventListener('click', function() {
      var prefChecked = document.getElementById('operava-toggle-pref').checked;
      var anaChecked = document.getElementById('operava-toggle-ana').checked;
      var mktChecked = document.getElementById('operava-toggle-mkt').checked;

      OperavaConsent.savePreferences({
        preferences: prefChecked,
        analytics: anaChecked,
        marketing: mktChecked
      });
    });

    // Close on backdrop click
    modalEl.addEventListener('click', function(e) {
      if (e.target === modalEl) {
        OperavaConsent.closePreferences();
      }
    });

    // Close on Escape key
    window.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && modalEl.classList.contains('is-open')) {
        OperavaConsent.closePreferences();
      }
    });

    // Bind all persistent trigger buttons in page/footer
    bindPersistentTriggers();
  }

  function bindPersistentTriggers() {
    var triggers = document.querySelectorAll('.privacy-settings-trigger, [data-operava-privacy-trigger]');
    triggers.forEach(function(btn) {
      btn.addEventListener('click', function(e) {
        e.preventDefault();
        OperavaConsent.openPreferences(btn);
      });
    });
  }

  // Initialize on DOMContentLoaded or immediate if ready
  function init() {
    injectConsentUI();
    if (!OperavaConsent.hasDecided()) {
      OperavaConsent.showBanner();
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  window.OperavaConsent = OperavaConsent;
})(typeof window !== 'undefined' ? window : this);
