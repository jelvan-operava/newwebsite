/**
 * OPERAVA Global Solutions — Universal Site Search
 * Instant client-side indexing with real-time /api/search synchronization.
 * Supports Services, Careers & Opportunities, and Documentation/Legal Frameworks.
 */

(function() {
  'use strict';

  // Core Static Fallback & Instant Index (0ms responsiveness)
  const LOCAL_INDEX = [
    // Services
    {
      id: 'svc-software-dev',
      title: 'Enterprise Architecture & Custom Software Development',
      category: 'services',
      categoryLabel: 'Services',
      url: 'service-detail.html?service=software-development',
      description: 'Custom software platforms, distributed microservices, backend APIs, enterprise architecture, and dedicated engineering pods.',
      badge: 'Technology',
      tags: ['software', 'architecture', 'backend', 'microservices', 'api', 'engineering', 'python', 'typescript', 'systems']
    },
    {
      id: 'svc-web-mobile',
      title: 'Web & Mobile Application Development',
      category: 'services',
      categoryLabel: 'Services',
      url: 'service-detail.html?service=web-mobile-development',
      description: 'High-performance web applications, cross-platform mobile apps, Progressive Web Apps (PWAs), responsive interfaces, and modern UI engineering.',
      badge: 'Digital Engineering',
      tags: ['web', 'mobile', 'apps', 'react', 'nextjs', 'flutter', 'ios', 'android', 'pwa', 'frontend', 'ui', 'ux']
    },
    {
      id: 'svc-saas-platform',
      title: 'SaaS & Multi-Tenant Platform Engineering',
      category: 'services',
      categoryLabel: 'Services',
      url: 'service-detail.html?service=saas-platform',
      description: 'Multi-tenant cloud architecture, automated subscription billing, enterprise role-based access control (RBAC), and continuous delivery.',
      badge: 'Cloud & SaaS',
      tags: ['saas', 'cloud', 'multi-tenant', 'billing', 'stripe', 'subscription', 'platform', 'aws', 'gcp', 'docker', 'kubernetes', 'devops']
    },
    {
      id: 'svc-it-systems',
      title: 'IT Systems Integration & Workflow Automation',
      category: 'services',
      categoryLabel: 'Services',
      url: 'service-detail.html?service=it-systems',
      description: 'Workflow automation, legacy modernization, bidirectional ERP and CRM connectors, middleware pipelines, and executive dashboards.',
      badge: 'Enterprise Systems',
      tags: ['systems', 'integration', 'workflow', 'automation', 'erp', 'crm', 'apis', 'middleware', 'data', 'migration']
    },
    {
      id: 'svc-customer-service',
      title: 'Customer Service & Technical Support (BPO)',
      category: 'services',
      categoryLabel: 'Services',
      url: 'service-detail.html?service=customer-service',
      description: '24/7 omnichannel customer service, Tier 1–3 technical helpdesk, customer experience management, Zendesk integration, and QA monitoring.',
      badge: 'Support & BPO',
      tags: ['customer service', 'support', 'helpdesk', 'bpo', 'tier 1', 'tier 2', 'tier 3', 'voice', 'chat', 'email', 'zendesk', 'omnichannel']
    },
    {
      id: 'svc-dedicated-pods',
      title: 'Dedicated Remote Engineering & Delivery Pods',
      category: 'services',
      categoryLabel: 'Services',
      url: 'talent.html',
      description: 'Turnkey remote technical pods comprising technical leads, senior developers, QA engineers, and operations managers under formal SOWs.',
      badge: 'Workforce',
      tags: ['pods', 'talent', 'staffing', 'augmentation', 'remote workforce', 'engineering pod', 'sow', 'developers']
    },
    {
      id: 'svc-solutions-overview',
      title: 'All OPERAVA Services & Capabilities Directory',
      category: 'services',
      categoryLabel: 'Services',
      url: 'solutions.html',
      description: 'Comprehensive directory of Technology, Digital Engineering, and Managed Business Process solutions.',
      badge: 'Solutions',
      tags: ['solutions', 'services', 'directory', 'overview', 'capabilities', 'catalog']
    },

    // Careers
    {
      id: 'car-overview',
      title: 'Global Careers Overview & Professional Pathways',
      category: 'careers',
      categoryLabel: 'Careers',
      url: 'careers.html',
      description: 'Explore remote career opportunities across Technology, Customer Support, and Business Operations. 100% remote delivery model.',
      badge: 'Careers',
      tags: ['careers', 'jobs', 'hiring', 'remote work', 'employment', 'tracks', 'culture', 'benefits']
    },
    {
      id: 'car-global-jobs',
      title: 'Global Job Directory & Open Vacancies',
      category: 'careers',
      categoryLabel: 'Careers',
      url: 'jobs-global.html',
      description: 'Search active remote openings for Software Developers, Cloud Engineers, QA Automation Specialists, and Technical Support Leads.',
      badge: 'Open Roles',
      tags: ['global jobs', 'job openings', 'vacancies', 'roles', 'apply', 'engineering jobs', 'remote jobs']
    },
    {
      id: 'car-us-jobs',
      title: 'U.S. & North American Opportunities',
      category: 'careers',
      categoryLabel: 'Careers',
      url: 'jobs-us.html',
      description: 'Regional career pathways and cross-border enterprise initiatives for U.S. and North American client accounts.',
      badge: 'Regional',
      tags: ['us jobs', 'north america', 'regional', 'international', 'cross-border', 'client engagements']
    },
    {
      id: 'car-resume',
      title: 'Submit Resume & Candidate Profile Intake',
      category: 'careers',
      categoryLabel: 'Careers',
      url: 'resume.html',
      description: 'Submit your resume and professional portfolio for immediate evaluation and placement into dedicated delivery pods.',
      badge: 'Application',
      tags: ['submit resume', 'resume', 'cv', 'application', 'intake', 'candidate', 'profile', 'apply']
    },
    {
      id: 'car-referral',
      title: 'Referral Program & Placement Rewards',
      category: 'careers',
      categoryLabel: 'Careers',
      url: 'referral.html',
      description: 'Introduce qualified tech or operations professionals or enterprise client opportunities and earn placement rewards.',
      badge: 'Referrals',
      tags: ['referral', 'refer a friend', 'placement reward', 'bonus', 'rewards', 'network', 'partner']
    },
    {
      id: 'car-tech-track',
      title: 'Technology & Software Engineering Track',
      category: 'careers',
      categoryLabel: 'Careers',
      url: 'careers.html#technology-track',
      description: 'Roles in full-stack web development, cloud DevOps, API integration, data engineering, and technical architecture.',
      badge: 'Track',
      tags: ['tech track', 'engineering track', 'developer', 'frontend', 'backend', 'fullstack', 'devops']
    },
    {
      id: 'car-support-track',
      title: 'Customer Service & Technical Support Track',
      category: 'careers',
      categoryLabel: 'Careers',
      url: 'careers.html#support-track',
      description: 'Specialized opportunities in frontline customer care, technical troubleshooting, tier 2/3 helpdesk, and team leadership.',
      badge: 'Track',
      tags: ['support track', 'helpdesk', 'customer support', 'bpo track', 'tier 2', 'tier 3', 'service']
    },

    // Documentation & Policies
    {
      id: 'doc-service-specs',
      title: 'Service Specifications & Operational SLA Standards',
      category: 'documentation',
      categoryLabel: 'Documentation',
      url: 'service-detail.html',
      description: 'Detailed technical specifications, 4-phase delivery frameworks, Core Web Vitals performance budgets, and operational SLAs.',
      badge: 'Specifications',
      tags: ['specifications', 'service specs', 'sla', 'performance', 'standards', 'delivery process', 'core web vitals']
    },
    {
      id: 'doc-sec-registration',
      title: 'Philippine SEC Corporate Registration & Statutory Statement',
      category: 'documentation',
      categoryLabel: 'Documentation',
      url: 'about.html#sec-registration',
      description: 'Official Operava Global Solutions SEC Registration No. 2026080262213-03. Corporate standing, executive leadership, and legal jurisdiction.',
      badge: 'Statutory',
      tags: ['sec', 'registration', 'legal entity', 'incorporation', 'statutory', 'philippines', 'corporate', 'compliance']
    },
    {
      id: 'doc-privacy-policy',
      title: 'Privacy Policy & Privacy Notice (RA 10173)',
      category: 'documentation',
      categoryLabel: 'Documentation',
      url: 'privacy-policy.html',
      description: 'Comprehensive data privacy framework under Republic Act No. 10173 (Philippine Data Privacy Act of 2012) and National Privacy Commission regulations.',
      badge: 'Legal',
      tags: ['privacy', 'privacy policy', 'data privacy', 'ra 10173', 'npc', 'gdpr', 'data protection', 'confidentiality']
    },
    {
      id: 'doc-terms',
      title: 'Terms and Conditions & Commercial Framework',
      category: 'documentation',
      categoryLabel: 'Documentation',
      url: 'terms.html',
      description: 'Official 40+ section commercial governance covering website usage, software deliverables, IP assignments, warranties, and liability limitations.',
      badge: 'Legal',
      tags: ['terms', 'terms and conditions', 'contract', 'ip rights', 'intellectual property', 'commercial agreement', 'sow']
    },
    {
      id: 'doc-refund-policy',
      title: 'Authoritative Refund & Billing Resolution Policy',
      category: 'documentation',
      categoryLabel: 'Documentation',
      url: 'refund-policy.html',
      description: 'Authoritative 49-section rules for cancellation terms, service credits, billing error dispute remedies, and resolution frameworks.',
      badge: 'Billing',
      tags: ['refund', 'refund policy', 'billing', 'cancellation', 'service credits', 'disputes', 'payments', 'invoices']
    },
    {
      id: 'doc-cookies-storage',
      title: 'Cookie, Local Storage & Telemetry Governance',
      category: 'documentation',
      categoryLabel: 'Documentation',
      url: 'privacy-policy.html#cookie-inventory',
      description: 'Detailed inventory of first-party cookies, local storage keys, diagnostic telemetry mechanisms, and consent revocation.',
      badge: 'Compliance',
      tags: ['cookies', 'localstorage', 'telemetry', 'consent', 'tracking', 'privacy preferences']
    },
    {
      id: 'doc-contact-directory',
      title: 'Corporate Contact Directory & Inquiries',
      category: 'documentation',
      categoryLabel: 'Documentation',
      url: 'contact.html',
      description: 'Direct communication channels for Client Partnerships, Talent Acquisition, Technical Support, and Legal & Compliance.',
      badge: 'Directory',
      tags: ['contact', 'email', 'phone', 'offices', 'support', 'inquiries', 'partnerships']
    }
  ];

  let activeCategory = 'all';
  let activeFocusIndex = -1;
  let debounceTimer = null;
  let lastTriggerElement = null;

  // DOM Elements
  let overlayEl = null;
  let inputEl = null;
  let clearBtn = null;
  let closeBtn = null;
  let bodyEl = null;
  let tabsWrapEl = null;

  /**
   * Escape HTML entities to prevent XSS
   */
  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  /**
   * Highlights search terms in target text
   */
  function highlightMatches(text, query) {
    if (!query || !text) return escapeHtml(text);
    const escaped = escapeHtml(text);
    const terms = query.trim().split(/\s+/).filter(Boolean);
    if (!terms.length) return escaped;

    const pattern = terms.map(t => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|');
    const regex = new RegExp(`(${pattern})`, 'gi');
    return escaped.replace(regex, '<mark>$1</mark>');
  }

  /**
   * Local Search matching algorithm
   */
  function performLocalSearch(query, category) {
    const q = (query || '').trim().toLowerCase();
    const cat = (category || 'all').toLowerCase();

    if (!q) {
      return LOCAL_INDEX.filter(item => cat === 'all' || item.category === cat);
    }

    const terms = q.split(/\s+/).filter(Boolean);
    const scored = [];

    for (const item of LOCAL_INDEX) {
      if (cat !== 'all' && item.category !== cat) {
        continue;
      }

      let score = 0;
      const titleLower = item.title.toLowerCase();
      const descLower = item.description.toLowerCase();
      const badgeLower = item.badge.toLowerCase();
      const tagsLower = item.tags.map(t => t.toLowerCase());

      if (titleLower === q) score += 150;
      else if (titleLower.includes(q)) score += 80;

      if (tagsLower.includes(q)) score += 60;
      if (descLower.includes(q)) score += 30;

      for (const term of terms) {
        if (titleLower.includes(term)) score += 30;
        if (tagsLower.some(t => t.includes(term))) score += 20;
        if (badgeLower.includes(term)) score += 15;
        if (descLower.includes(term)) score += 10;
      }

      if (score > 0) {
        scored.push({ item, score });
      }
    }

    scored.sort((a, b) => b.score - a.score);
    return scored.map(entry => entry.item);
  }

  /**
   * Count results by category for badges
   */
  function computeCategoryCounts(query) {
    const q = (query || '').trim().toLowerCase();
    const counts = { all: 0, services: 0, careers: 0, documentation: 0 };

    LOCAL_INDEX.forEach(item => {
      let matches = true;
      if (q) {
        const terms = q.split(/\s+/).filter(Boolean);
        const titleLower = item.title.toLowerCase();
        const descLower = item.description.toLowerCase();
        const tagsLower = item.tags.join(' ').toLowerCase();
        matches = terms.some(t => titleLower.includes(t) || descLower.includes(t) || tagsLower.includes(t));
      }

      if (matches) {
        counts.all++;
        if (counts[item.category] !== undefined) {
          counts[item.category]++;
        }
      }
    });

    return counts;
  }

  /**
   * Render Category Tabs
   */
  function updateCategoryTabs(query) {
    if (!tabsWrapEl) return;
    const counts = computeCategoryCounts(query);

    const categories = [
      { id: 'all', label: 'All', count: counts.all },
      { id: 'services', label: 'Services', count: counts.services },
      { id: 'careers', label: 'Careers', count: counts.careers },
      { id: 'documentation', label: 'Documentation', count: counts.documentation }
    ];

    tabsWrapEl.innerHTML = categories.map(cat => `
      <button type="button" class="operava-category-tab ${activeCategory === cat.id ? 'is-active' : ''}" data-category="${cat.id}">
        <span>${cat.label}</span>
        <span class="operava-category-count">${cat.count}</span>
      </button>
    `).join('');

    // Attach click listeners to tabs
    tabsWrapEl.querySelectorAll('.operava-category-tab').forEach(btn => {
      btn.addEventListener('click', () => {
        activeCategory = btn.getAttribute('data-category');
        updateCategoryTabs(inputEl ? inputEl.value : '');
        executeSearch(inputEl ? inputEl.value : '');
      });
    });
  }

  /**
   * Render Search Results List
   */
  function renderResults(results, query) {
    if (!bodyEl) return;
    activeFocusIndex = -1;

    const trimmed = (query || '').trim();

    // 1. If query is empty: Show Discovery view + Top Highlights
    if (!trimmed) {
      bodyEl.innerHTML = `
        <div class="operava-search-discovery">
          <div class="operava-discovery-title">Quick Discovery</div>
          <div class="operava-discovery-chips">
            <button type="button" class="operava-chip" data-search="Software Development">Software Development</button>
            <button type="button" class="operava-chip" data-search="Remote Engineering Pods">Remote Engineering Pods</button>
            <button type="button" class="operava-chip" data-search="Global Careers">Global Careers</button>
            <button type="button" class="operava-chip" data-search="Submit Resume">Submit Resume</button>
            <button type="button" class="operava-chip" data-search="SEC Registration">SEC Corporate Statement</button>
            <button type="button" class="operava-chip" data-search="Privacy Policy">Privacy Policy (RA 10173)</button>
            <button type="button" class="operava-chip" data-search="Refund Policy">Refund Policy</button>
            <button type="button" class="operava-chip" data-search="Service Level Agreements">SLA Standards</button>
          </div>
        </div>
        <div style="padding: 0 0.5rem 0.5rem;">
          <div class="operava-discovery-title" style="padding-left: 0.5rem; margin-bottom: 0.5rem;">Recommended Topics</div>
          <ul class="operava-results-list" role="listbox" id="operava-results-list">
            ${results.slice(0, 8).map((item, idx) => renderResultItem(item, '', idx)).join('')}
          </ul>
        </div>
      `;

      // Attach chip click handlers
      bodyEl.querySelectorAll('.operava-chip').forEach(chip => {
        chip.addEventListener('click', () => {
          const q = chip.getAttribute('data-search');
          if (inputEl) {
            inputEl.value = q;
            inputEl.focus();
            if (clearBtn) clearBtn.style.display = 'inline-flex';
            updateCategoryTabs(q);
            executeSearch(q);
          }
        });
      });

      attachResultItemListeners();
      return;
    }

    // 2. Empty results state
    if (!results.length) {
      bodyEl.innerHTML = `
        <div class="operava-search-empty">
          <h3>No matching results</h3>
          <p>No matches found for "<strong>${escapeHtml(trimmed)}</strong>" in ${activeCategory === 'all' ? 'any category' : activeCategory}.</p>
          <div style="margin-top: 1rem;">
            <p style="font-size: 0.8125rem; color: var(--muted, #505e73);">Try searching for:</p>
            <div class="operava-discovery-chips" style="justify-content: center; margin-top: 0.5rem;">
              <button type="button" class="operava-chip" data-search="Software">Software</button>
              <button type="button" class="operava-chip" data-search="Jobs">Jobs</button>
              <button type="button" class="operava-chip" data-search="Resume">Resume</button>
              <button type="button" class="operava-chip" data-search="SLA">SLA</button>
              <button type="button" class="operava-chip" data-search="Privacy">Privacy</button>
            </div>
          </div>
        </div>
      `;

      bodyEl.querySelectorAll('.operava-chip').forEach(chip => {
        chip.addEventListener('click', () => {
          const q = chip.getAttribute('data-search');
          if (inputEl) {
            inputEl.value = q;
            inputEl.focus();
            if (clearBtn) clearBtn.style.display = 'inline-flex';
            updateCategoryTabs(q);
            executeSearch(q);
          }
        });
      });
      return;
    }

    // 3. Render matching results list
    bodyEl.innerHTML = `
      <ul class="operava-results-list" role="listbox" id="operava-results-list">
        ${results.map((item, idx) => renderResultItem(item, trimmed, idx)).join('')}
      </ul>
    `;

    attachResultItemListeners();
  }

  /**
   * Template for a single search result item
   */
  function renderResultItem(item, query, idx) {
    const titleHtml = highlightMatches(item.title, query);
    const descHtml = highlightMatches(item.description, query);

    return `
      <li role="option" id="operava-result-${idx}" aria-selected="false">
        <a href="${item.url}" class="operava-result-item" data-cat="${item.category}" data-index="${idx}">
          <div class="operava-result-header">
            <h4 class="operava-result-title">${titleHtml}</h4>
            <span class="operava-result-badge">${escapeHtml(item.badge || item.categoryLabel)}</span>
          </div>
          <p class="operava-result-desc">${descHtml}</p>
          <div class="operava-result-url">${escapeHtml(item.url)} →</div>
        </a>
      </li>
    `;
  }

  /**
   * Attach keyboard and hover listeners to rendered items
   */
  function attachResultItemListeners() {
    const items = bodyEl.querySelectorAll('.operava-result-item');
    items.forEach(item => {
      item.addEventListener('mouseenter', () => {
        const index = parseInt(item.getAttribute('data-index'), 10);
        setActiveItem(index);
      });
    });
  }

  /**
   * Highlights active keyboard selected item
   */
  function setActiveItem(index) {
    const items = bodyEl.querySelectorAll('.operava-result-item');
    if (!items.length) return;

    items.forEach((item, i) => {
      if (i === index) {
        item.classList.add('is-focused');
        item.scrollIntoView({ block: 'nearest' });
      } else {
        item.classList.remove('is-focused');
      }
    });

    activeFocusIndex = index;
  }

  /**
   * Execute Search: Instant local fallback + Server API synchronization
   */
  function executeSearch(query) {
    const trimmed = (query || '').trim();

    // 1. Instant local render (0ms response)
    const localResults = performLocalSearch(trimmed, activeCategory);
    renderResults(localResults, trimmed);

    // 2. In background, fetch /api/search to sync with server
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      const url = `/api/search?q=${encodeURIComponent(trimmed)}&category=${encodeURIComponent(activeCategory)}&limit=15`;
      fetch(url)
        .then(res => res.ok ? res.json() : null)
        .then(data => {
          if (data && data.ok && Array.isArray(data.results)) {
            // Only update if input hasn't changed in the meantime
            if (inputEl && inputEl.value.trim() === trimmed) {
              renderResults(data.results, trimmed);
            }
          }
        })
        .catch(() => {
          // Keep local results if network error
        });
    }, 150);
  }

  /**
   * Open Search Modal Overlay
   */
  function openSearch(initialQuery = '') {
    createSearchModal();
    if (!overlayEl) return;

    overlayEl.classList.add('is-open');
    document.body.style.overflow = 'hidden';

    if (inputEl) {
      if (initialQuery) {
        inputEl.value = initialQuery;
      }
      inputEl.focus();
      inputEl.select();

      if (clearBtn) {
        clearBtn.style.display = inputEl.value ? 'inline-flex' : 'none';
      }

      updateCategoryTabs(inputEl.value);
      executeSearch(inputEl.value);
    }
  }

  /**
   * Close Search Modal Overlay
   */
  function closeSearch() {
    if (!overlayEl) return;
    overlayEl.classList.remove('is-open');
    document.body.style.overflow = '';

    if (lastTriggerElement && typeof lastTriggerElement.focus === 'function') {
      lastTriggerElement.focus();
    }
  }

  /**
   * Create Search Modal DOM once
   */
  function createSearchModal() {
    if (overlayEl) return;

    overlayEl = document.createElement('div');
    overlayEl.className = 'operava-search-overlay';
    overlayEl.id = 'operava-search-overlay';
    overlayEl.setAttribute('role', 'dialog');
    overlayEl.setAttribute('aria-modal', 'true');
    overlayEl.setAttribute('aria-label', 'Site Search');

    overlayEl.innerHTML = `
      <div class="operava-search-modal">
        <!-- Input Row -->
        <div class="operava-search-input-row">
          <svg class="operava-search-input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input type="text" class="operava-search-input" id="operava-search-input" placeholder="Search services, career opportunities, documentation..." autocomplete="off" spellcheck="false" role="combobox" aria-expanded="true" aria-controls="operava-results-list">
          <button type="button" class="operava-search-clear" id="operava-search-clear" aria-label="Clear query" style="display:none;">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
          <button type="button" class="operava-search-close-btn" id="operava-search-close" aria-label="Close search (Escape)">ESC</button>
        </div>

        <!-- Categories Row -->
        <div class="operava-search-categories" id="operava-search-categories"></div>

        <!-- Results Body -->
        <div class="operava-search-body" id="operava-search-body"></div>

        <!-- Shortcuts Footer -->
        <div class="operava-search-footer">
          <div class="operava-search-shortcuts">
            <span class="operava-search-shortcut-item"><kbd>↑</kbd><kbd>↓</kbd> Navigate</span>
            <span class="operava-search-shortcut-item"><kbd>↵</kbd> Select</span>
            <span class="operava-search-shortcut-item"><kbd>ESC</kbd> Close</span>
          </div>
          <div>OPERAVA Knowledge Index</div>
        </div>
      </div>
    `;

    document.body.appendChild(overlayEl);

    // Cache elements
    inputEl = overlayEl.querySelector('#operava-search-input');
    clearBtn = overlayEl.querySelector('#operava-search-clear');
    closeBtn = overlayEl.querySelector('#operava-search-close');
    bodyEl = overlayEl.querySelector('#operava-search-body');
    tabsWrapEl = overlayEl.querySelector('#operava-search-categories');

    // Input event
    inputEl.addEventListener('input', () => {
      const val = inputEl.value;
      clearBtn.style.display = val ? 'inline-flex' : 'none';
      updateCategoryTabs(val);
      executeSearch(val);
    });

    // Clear event
    clearBtn.addEventListener('click', () => {
      inputEl.value = '';
      inputEl.focus();
      clearBtn.style.display = 'none';
      updateCategoryTabs('');
      executeSearch('');
    });

    // Close button
    closeBtn.addEventListener('click', closeSearch);

    // Click outside modal
    overlayEl.addEventListener('click', (e) => {
      if (e.target === overlayEl) {
        closeSearch();
      }
    });

    // Keyboard navigation inside modal
    inputEl.addEventListener('keydown', (e) => {
      const items = bodyEl.querySelectorAll('.operava-result-item');
      if (!items.length) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        const next = (activeFocusIndex + 1) % items.length;
        setActiveItem(next);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        const prev = activeFocusIndex <= 0 ? items.length - 1 : activeFocusIndex - 1;
        setActiveItem(prev);
      } else if (e.key === 'Enter') {
        if (activeFocusIndex >= 0 && items[activeFocusIndex]) {
          e.preventDefault();
          items[activeFocusIndex].click();
        }
      } else if (e.key === 'Escape') {
        e.preventDefault();
        closeSearch();
      }
    });
  }

  /**
   * Initialize Triggers and Header Search Component
   */
  function initHeaderSearch() {
    // 1. Search buttons/triggers in nav
    document.querySelectorAll('[data-operava-search-trigger], #header-search-btn, #header-search-mobile-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        lastTriggerElement = btn;
        openSearch();
      });
    });

    // 2. Global shortcut '/' or 'Cmd+K' / 'Ctrl+K'
    document.addEventListener('keydown', (e) => {
      // Don't trigger if user is already typing in an input, textarea, or contenteditable
      const target = e.target;
      const isInput = target && (
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.tagName === 'SELECT' ||
        target.isContentEditable
      );

      if (isInput && overlayEl && overlayEl.classList.contains('is-open')) {
        // Allow ESC inside search input to close
        if (e.key === 'Escape') {
          closeSearch();
        }
        return;
      }

      if (isInput) return;

      // Press '/' to search
      if (e.key === '/' && !e.ctrlKey && !e.metaKey && !e.altKey) {
        e.preventDefault();
        lastTriggerElement = document.activeElement;
        openSearch();
      }

      // Press 'Cmd+K' or 'Ctrl+K' to search
      if ((e.ctrlKey || e.metaKey) && (e.key === 'k' || e.key === 'K')) {
        e.preventDefault();
        lastTriggerElement = document.activeElement;
        openSearch();
      }

      // Global Escape to close
      if (e.key === 'Escape' && overlayEl && overlayEl.classList.contains('is-open')) {
        closeSearch();
      }
    });
  }

  // Auto-init on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initHeaderSearch);
  } else {
    initHeaderSearch();
  }

  // Expose global API on window
  window.OperavaSearch = {
    open: openSearch,
    close: closeSearch
  };

})();
