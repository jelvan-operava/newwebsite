# OPERAVA | Operava Global Solutions

Enterprise marketing website and digital platform for **Operava Global Solutions**, an SEC-registered technology, workforce, and talent solutions corporation.

---

## 1. Brand Identity (Mandatory)

| Element | Specification | Notes |
|---------|---------------|-------|
| **Header Brand** | `OPERAVA` | All uppercase with purple accent period (`OPERAVA.`). No tagline in header. |
| **Footer Brand** | `Operava Global Solutions` | Full corporate trade name. |
| **Legal Status** | SEC Reg. No. `2026080262213-03` | Philippine Securities and Exchange Commission registered corporation. |
| **Delivery Model** | 100% Remote Global Delivery | All roles and talent pods operate 100% remotely. |

---

## 2. Directory Structure

The codebase is organized cleanly at the root:

```text
/
├── pages/                  # All HTML pages grouped in one place
│   ├── index.html          # Homepage — Technology, Workforce & Talent Solutions
│   ├── solutions.html      # Complete Services Directory (IT & BPO services)
│   ├── about.html          # Corporate governance & SEC registration
│   ├── careers.html        # Core role tracks & career pathways
│   ├── jobs-global.html    # Global 100% remote job opportunities
│   ├── jobs-us.html        # U.S. & North American job opportunities
│   ├── talent.html         # Enterprise dedicated talent pod requests
│   ├── resume.html         # Candidate profile & resume submission
│   ├── referral.html       # Client & candidate referral program
│   ├── contact.html        # Direct corporate contact & inquiries
│   ├── privacy-policy.html # Data Privacy Policy (RA 10173 compliant)
│   ├── refund-policy.html  # Milestone SOW & billing governance
│   └── terms.html          # Terms & Conditions of engagement
├── public/                 # Static media and branding assets
│   ├── images/             # Logos, hero images, and graphics
│   │   ├── operava-logo.svg
│   │   └── README.md
│   └── icons/              # Favicons and SVG symbols
│       └── favicon.svg     # Signature purple OPERAVA favicon mark
├── api/                    # Modular Express backend API endpoints
│   ├── index.js            # Main API router (/api/*)
│   ├── health.js           # Health status & SEC entity verification
│   ├── contact.js          # Corporate inquiries handler
│   ├── talent.js           # Dedicated talent squad request handler
│   ├── resume.js           # Candidate application handler
│   └── referral.js         # Client & candidate referral handler
├── references/             # Source compliance documents
│   ├── privacy-policy.md
│   └── refundpolicy.md
├── server.js               # Express server (clean routing, public assets, APIs)
├── AGENTS.md               # Mandatory instructions for AI agents and automation
├── DESIGN.md               # Principal-level design system & editorial guidelines
├── metadata.json           # Platform application metadata
└── package.json            # Node.js project manifest & scripts
```

---

## 3. Pages & Clean URL Routing

The Express server (`server.js`) maps requests to the `/pages/` folder, supporting both clean extensionless URLs (e.g. `/about`) and direct file requests (e.g. `/about.html`):

| Page File in `/pages/` | Clean URL Route | Description |
|------------------------|-----------------|-------------|
| `index.html` | `/` | Hero section, interactive talent pod switcher, services snapshot, global delivery hub. |
| `solutions.html` | `/solutions` | Full services catalog covering 8 Technology (IT) disciplines and 8 Business Process (BPO) operations. |
| `about.html` | `/about` | Corporate governance, SEC registration verification, operating model, leadership standards. |
| `careers.html` | `/careers` | Three broad corporate positions: Technology Executive, Customer Service Executive, Business Operations Executive. |
| `jobs-global.html` | `/jobs-global` | 100% remote global engineering and support positions. |
| `jobs-us.html` | `/jobs-us` | U.S. and North American enterprise client alignment positions. |
| `talent.html` | `/talent` | Dedicated talent request form for agile squads, staff augmentation, and managed pods. |
| `resume.html` | `/resume` | Professional candidate portal with evaluation sequences and resume upload. |
| `referral.html` | `/referral` | Enterprise referral network with multi-tier placement incentives. |
| `contact.html` | `/contact` | Corporate contact form, corporate email channels, and SEC registration information. |
| `privacy-policy.html` | `/privacy-policy` | Comprehensive privacy documentation aligned with the Philippine Data Privacy Act of 2012 (RA 10173). |
| `refund-policy.html` | `/refund-policy` | Strict milestones, deliverable acceptance criteria, and refund dispute guidelines. |
| `terms.html` | `/terms` | Official Terms and Conditions governing commercial use and client engagements. |

---

## 4. Backend API Endpoints

All backend endpoints are mounted under `/api` and provide structured JSON responses with audit logging:

### `GET /api/health`
Returns system status, service name, SEC registration number, and server uptime.
```json
{
  "status": "operational",
  "service": "OPERAVA Global Operations API",
  "company": "Operava Global Solutions",
  "secRegistration": "2026080262213-03",
  "uptime": 124.5,
  "timestamp": "2026-09-11T12:51:18.583Z"
}
```

### `POST /api/contact`
Receives general and commercial inquiries.
- **Request Body:**
  ```json
  {
    "name": "Jane Doe",
    "email": "jane@enterprise.com",
    "company": "Enterprise Corp",
    "subject": "Dedicated Engineering Pod",
    "message": "We require a squad of 4 senior full-stack engineers."
  }
  ```
- **Response:** `200 OK` with unique reference number (`OPV-MSG-...`).

### `POST /api/talent`
Receives client talent pod requirements.
- **Request Body:**
  ```json
  {
    "company": "Fintech Global Inc",
    "contactName": "John Smith",
    "email": "jsmith@fintech.com",
    "rolesNeeded": "Software Engineering & Cloud Architecture",
    "podSize": "4-8 Specialists",
    "timeline": "Immediate (within 1-2 weeks)",
    "notes": "Timezone overlap with US Eastern required."
  }
  ```
- **Response:** `200 OK` with qualification ticket (`OPV-POD-...`).

### `POST /api/resume`
Receives candidate career applications.
- **Request Body:**
  ```json
  {
    "firstName": "Maria",
    "lastName": "Santos",
    "email": "maria.santos@domain.com",
    "phone": "+63 917 123 4567",
    "targetRole": "OPERAVA Technology Executive",
    "linkedinUrl": "https://linkedin.com/in/mariasantos",
    "experienceYears": "5+ years",
    "summary": "Full-stack cloud architect specializing in distributed systems."
  }
  ```
- **Response:** `200 OK` with candidate application ID (`OPV-APP-...`).

### `POST /api/referral`
Receives client and talent referrals.
- **Request Body:**
  ```json
  {
    "referrerName": "Alex Chen",
    "referrerEmail": "alex.chen@domain.com",
    "referralType": "Talent Referral",
    "candidateName": "David Cruz",
    "candidateEmail": "david.cruz@domain.com",
    "notes": "Senior DevOps Specialist with AWS certification."
  }
  ```
- **Response:** `200 OK` with referral reference ID (`OPV-REF-...`).

---

## 5. Design System & Editorial Rules

The site follows a **principal-level editorial standard** documented in **[`DESIGN.md`](./DESIGN.md)**:

### 5.1 Layout & Spacing
- **Premium Full-Width:** The viewport is utilized edge-to-edge with fluid gutters (`clamp(24px, 5vw, 80px)`). The site is **never** wrapped in a narrow centered shell (e.g. `max-width: 1200px; margin: 0 auto` on the body/main).
- **Prose Measure:** Long-form body copy is constrained to comfortable readability (`38rem`–`42rem`), while structure, grids, and dividers remain full-width.
- **Left-Aligned Hierarchy:** Primary headlines and content are left-aligned by default. Centering is reserved for specific visual focal points.

### 5.2 Visual Tokens
```css
:root {
  --ink: #0c0a14;             /* Primary text and dark brand surfaces */
  --muted: #6b6578;           /* Secondary copy and metadata */
  --line: #e8e4ef;            /* Subtle hairlines and dividers */
  --surface: #f7f5fa;         /* Alternate section backgrounds */
  --purple: #6d28d9;          /* Accent color and primary CTA fill */
  --purple-deep: #1e0b3a;     /* Dark brand header / page hero canvas */
  --purple-light: #f5f0ff;    /* Soft purple highlight */
  --gutter: clamp(24px, 5vw, 80px); /* Responsive horizontal page padding */
  --fd: 'Roboto Condensed', sans-serif; /* Display font for headings */
  --fb: 'Montserrat', sans-serif;       /* Body font for prose */
}
```

### 5.3 Anti-Patterns Strictly Forbidden
- Card-wrapping everything (features, stats, testimonials, jobs).
- Center-aligning all headers, paragraphs, and buttons.
- Repeating identical 3-column card grids site-wide.
- Unsolicited decorative pills, badges, or fake partner logo rows.
- Generic SaaS marketing fluff.

---

## 6. Running Locally & Development

### Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm** or **bun**

### Installation & Execution
```bash
# Clone the repository
git clone <repository-url>
cd operava-website

# Install dependencies
npm install

# Start the development server (runs on Port 3000)
npm run dev
# or
npm start
```

Access the application in your browser:
- **Web App:** `http://localhost:3000/`
- **Services Directory:** `http://localhost:3000/solutions`
- **Health Endpoint:** `http://localhost:3000/api/health`

---

## 7. Mandatory AI & Developer Instructions

All automated agents, contributors, and developers must follow:
1. **[`AGENTS.md`](./AGENTS.md)** — Non-negotiable brand, architectural rules, and change checklists.
2. **[`DESIGN.md`](./DESIGN.md)** — Layout rules, typography scale, visual tokens, and anti-patterns.
