/**
 * OPERAVA Global Solutions — Search API
 * Provides fast, indexed discovery across Services, Careers & Opportunities,
 * and Official Documentation/Legal Policies.
 */

const SEARCH_INDEX = [
  // ==========================================
  // SERVICES & SOLUTIONS
  // ==========================================
  {
    id: 'svc-software-dev',
    title: 'Enterprise Architecture & Custom Software Development',
    category: 'services',
    categoryLabel: 'Services',
    url: 'service-detail.html?service=software-development',
    description: 'Custom software platforms, distributed microservices, backend APIs, enterprise architecture, and dedicated engineering pods.',
    badge: 'Technology',
    tags: ['software', 'architecture', 'backend', 'microservices', 'api', 'engineering', 'python', 'typescript', 'go', 'java', 'systems']
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

  // ==========================================
  // CAREERS & OPPORTUNITIES
  // ==========================================
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

  // ==========================================
  // DOCUMENTATION & POLICIES
  // ==========================================
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

/**
 * Searches the index based on query, optional category filter, and limit.
 */
export function querySearchIndex(rawQuery, rawCategory = 'all', limit = 12) {
  const query = (rawQuery || '').trim().toLowerCase();
  const category = (rawCategory || 'all').trim().toLowerCase();
  const maxLimit = Math.min(Math.max(1, parseInt(limit, 10) || 12), 30);

  // If query is empty, return popular / quick discovery items
  if (!query) {
    const highlights = SEARCH_INDEX.filter(item => {
      if (category !== 'all' && item.category !== category) return false;
      return true;
    }).slice(0, maxLimit);

    return {
      total: highlights.length,
      results: highlights
    };
  }

  const queryTerms = query.split(/\s+/).filter(Boolean);

  const scored = [];

  for (const item of SEARCH_INDEX) {
    // Check category filter
    if (category !== 'all' && item.category !== category) {
      continue;
    }

    let score = 0;
    const titleLower = item.title.toLowerCase();
    const descLower = item.description.toLowerCase();
    const badgeLower = item.badge.toLowerCase();
    const tagsLower = item.tags.map(t => t.toLowerCase());

    // 1. Exact query matches
    if (titleLower === query) {
      score += 150;
    } else if (titleLower.includes(query)) {
      score += 80;
    }

    if (badgeLower === query) {
      score += 50;
    }

    if (tagsLower.includes(query)) {
      score += 60;
    }

    if (descLower.includes(query)) {
      score += 30;
    }

    // 2. Individual term matches
    let matchedAllTerms = true;
    for (const term of queryTerms) {
      let termMatched = false;

      if (titleLower.includes(term)) {
        score += 25;
        termMatched = true;
      }
      if (tagsLower.some(t => t.includes(term))) {
        score += 20;
        termMatched = true;
      }
      if (badgeLower.includes(term)) {
        score += 15;
        termMatched = true;
      }
      if (descLower.includes(term)) {
        score += 10;
        termMatched = true;
      }

      if (!termMatched) {
        matchedAllTerms = false;
      }
    }

    // Boost items matching all terms
    if (matchedAllTerms && queryTerms.length > 1) {
      score += 40;
    }

    if (score > 0) {
      scored.push({ item, score });
    }
  }

  scored.sort((a, b) => b.score - a.score);
  const results = scored.slice(0, maxLimit).map(entry => entry.item);

  return {
    total: results.length,
    results
  };
}

/**
 * Express Route Handler: GET /api/search
 */
export function handleSearch(req, res) {
  try {
    const q = (req.query.q || '').slice(0, 100);
    const category = (req.query.category || 'all').slice(0, 20);
    const limit = parseInt(req.query.limit, 10) || 12;

    const { total, results } = querySearchIndex(q, category, limit);

    return res.status(200).json({
      ok: true,
      query: q,
      category,
      total,
      results
    });
  } catch (error) {
    console.error('[Search API Error]', error);
    return res.status(500).json({
      ok: false,
      error: 'An internal error occurred while processing the search request.'
    });
  }
}
