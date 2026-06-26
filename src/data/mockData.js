// ===========================
// DueZero — Mock Data
// ===========================

export const projects = [
  {
    id: 'techcorp-ma',
    name: 'TechCorp Acquisition',
    type: 'M&A Due Diligence',
    company: 'TechCorp Inc.',
    dealSize: '$480M',
    status: 'In Progress',
    progress: 72,
    riskScore: 64,
    riskLevel: 'medium',
    documentsTotal: 247,
    documentsReviewed: 178,
    documentsFlagged: 23,
    lastActivity: '2 hours ago',
    deadline: 'Jul 15, 2026',
    assignees: ['SK', 'MR', 'JL'],
    categories: {
      corporate: { total: 42, reviewed: 38, flagged: 3 },
      contracts: { total: 89, reviewed: 61, flagged: 12 },
      employment: { total: 34, reviewed: 28, flagged: 4 },
      realEstate: { total: 18, reviewed: 15, flagged: 0 },
      compliance: { total: 27, reviewed: 19, flagged: 2 },
      tax: { total: 21, reviewed: 11, flagged: 1 },
      litigation: { total: 9, reviewed: 4, flagged: 1 },
      ip: { total: 7, reviewed: 2, flagged: 0 },
    },
    criticalFindings: [
      {
        id: 'cf-001',
        severity: 'critical',
        category: 'Contracts',
        title: 'Material Adverse Change Clause — Undefined Trigger Events',
        document: 'Master_Services_Agreement_v4.pdf',
        page: 14,
        description: 'The MAC clause in the primary revenue contract lacks specificity around qualifying events, creating potential for dispute or termination without cause.',
        clause: 'Section 12.3(b): "Any event that the Board determines, in its sole discretion, constitutes a material adverse change..."',
        suggestedAction: 'Negotiate specific enumerated MAC triggers with objective thresholds.',
        riskScore: 89,
      },
      {
        id: 'cf-002',
        severity: 'critical',
        category: 'Corporate',
        title: 'Board Consent Missing for Series C Issuance',
        document: 'Cap_Table_v12.xlsx',
        page: null,
        description: 'No board resolution found authorizing the Series C preferred stock issuance of 2,400,000 shares in November 2024.',
        clause: null,
        suggestedAction: 'Obtain retroactive board consent or rescind and re-issue with proper authorization.',
        riskScore: 95,
      },
      {
        id: 'cf-003',
        severity: 'critical',
        category: 'Litigation',
        title: 'Undisclosed Patent Infringement Claim',
        document: 'Litigation_Schedule_2026.pdf',
        page: 3,
        description: 'Active patent infringement claim from Nexus Technologies LLC (Case No. 2025-CV-04471) not disclosed in the data room index.',
        clause: null,
        suggestedAction: 'Require full litigation disclosure and obtain indemnification or price adjustment.',
        riskScore: 91,
      },
    ],
    majorFindings: [
      {
        id: 'mf-001',
        severity: 'major',
        category: 'Employment',
        title: 'Non-Compete Agreements Unenforceable in 3 States',
        document: 'Employee_NCA_Bundle.pdf',
        description: 'Non-compete clauses for 47 employees in California, Minnesota, and North Dakota are void under state law. Key engineers may leave post-close.',
        riskScore: 71,
      },
      {
        id: 'mf-002',
        severity: 'major',
        category: 'Tax',
        title: 'R&D Tax Credit — Potential Clawback Risk',
        document: 'Tax_Returns_2022_2024.pdf',
        description: 'IRS audit trail suggests $2.3M in R&D credits may not meet Section 41 requirements. Potential recapture liability.',
        riskScore: 68,
      },
      {
        id: 'mf-003',
        severity: 'major',
        category: 'Contracts',
        title: 'Change of Control Provisions in Top 5 Contracts',
        document: 'Multiple',
        description: 'All top 5 revenue contracts (representing 67% of ARR) contain change-of-control provisions requiring counterparty consent for the acquisition to proceed.',
        riskScore: 74,
      },
    ],
    minorFindings: [
      { id: 'mnf-001', severity: 'minor', category: 'Corporate', title: 'Annual Report Filing — 12-Day Late Filing (2023)', riskScore: 22 },
      { id: 'mnf-002', severity: 'minor', category: 'Real Estate', title: 'Office Lease Assignment Clause Requires 30-Day Notice', riskScore: 18 },
      { id: 'mnf-003', severity: 'minor', category: 'Compliance', title: 'GDPR Data Processing Agreement — 2 Vendors Missing DPAs', riskScore: 31 },
      { id: 'mnf-004', severity: 'minor', category: 'IP', title: 'Trademark Registration Lapsed in EU (Class 42)', riskScore: 27 },
    ],
    missingDocuments: [
      { category: 'Corporate', name: 'Board Resolutions — FY2023 (Q3 & Q4)', priority: 'high' },
      { category: 'Tax', name: 'State Tax Returns — Delaware, Texas (2024)', priority: 'high' },
      { category: 'Contracts', name: 'Customer SLAs for Enterprise Tier', priority: 'medium' },
      { category: 'Employment', name: 'Offer Letters — C-Suite (Post Series C)', priority: 'medium' },
      { category: 'Compliance', name: 'SOC 2 Type II Report (Current Year)', priority: 'high' },
      { category: 'IP', name: 'Patent Assignment Agreements — 3 Co-Inventors', priority: 'high' },
    ],
    documents: generateDocuments('techcorp-ma'),
  },
  {
    id: 'atlas-series-b',
    name: 'Atlas Ventures Series B',
    type: 'Venture Due Diligence',
    company: 'Atlas Ventures Ltd.',
    dealSize: '$28M',
    status: 'Review',
    progress: 45,
    riskScore: 38,
    riskLevel: 'low',
    documentsTotal: 89,
    documentsReviewed: 40,
    documentsFlagged: 6,
    lastActivity: '1 day ago',
    deadline: 'Aug 2, 2026',
    assignees: ['AL', 'PK'],
    categories: {
      corporate: { total: 18, reviewed: 14, flagged: 1 },
      contracts: { total: 31, reviewed: 14, flagged: 3 },
      employment: { total: 22, reviewed: 9, flagged: 2 },
      realEstate: { total: 4, reviewed: 2, flagged: 0 },
      compliance: { total: 8, reviewed: 1, flagged: 0 },
      tax: { total: 6, reviewed: 0, flagged: 0 },
      litigation: { total: 0, reviewed: 0, flagged: 0 },
      ip: { total: 0, reviewed: 0, flagged: 0 },
    },
    criticalFindings: [],
    majorFindings: [],
    minorFindings: [],
    missingDocuments: [],
    documents: generateDocuments('atlas-series-b'),
  },
  {
    id: 'harbor-realestate',
    name: 'Harbor RE Portfolio',
    type: 'Real Estate Due Diligence',
    company: 'Harbor Capital Group',
    dealSize: '$120M',
    status: 'Flagged',
    progress: 88,
    riskScore: 82,
    riskLevel: 'high',
    documentsTotal: 312,
    documentsReviewed: 274,
    documentsFlagged: 41,
    lastActivity: '30 min ago',
    deadline: 'Jun 30, 2026',
    assignees: ['RJ', 'TC', 'NK', 'SP'],
    categories: {
      corporate: { total: 22, reviewed: 22, flagged: 0 },
      contracts: { total: 67, reviewed: 67, flagged: 8 },
      employment: { total: 14, reviewed: 14, flagged: 1 },
      realEstate: { total: 142, reviewed: 118, flagged: 28 },
      compliance: { total: 31, reviewed: 27, flagged: 3 },
      tax: { total: 22, reviewed: 20, flagged: 1 },
      litigation: { total: 14, reviewed: 6, flagged: 0 },
      ip: { total: 0, reviewed: 0, flagged: 0 },
    },
    criticalFindings: [],
    majorFindings: [],
    minorFindings: [],
    missingDocuments: [],
    documents: generateDocuments('harbor-realestate'),
  },
];

function generateDocuments(projectId) {
  const statuses = ['verified', 'reviewed', 'parsing', 'flagged', 'pending'];
  const categories = ['Corporate', 'Contracts', 'Employment', 'Real Estate', 'Compliance', 'Tax', 'Litigation', 'IP'];
  const docNames = {
    'Corporate': [
      'Certificate_of_Incorporation.pdf',
      'Articles_of_Association_v3.pdf',
      'Shareholder_Register_2024.pdf',
      'Board_Minutes_Q1_2025.pdf',
      'Bylaws_Amended_2023.pdf',
      'Cap_Table_v12.xlsx',
      'Organizational_Chart.pdf',
      'Director_Resolution_2024.pdf',
    ],
    'Contracts': [
      'Master_Services_Agreement_v4.pdf',
      'Enterprise_License_Agreement.pdf',
      'SaaS_Contract_Acme_Corp.pdf',
      'Vendor_Agreement_AWS.pdf',
      'Distribution_Agreement_EU.pdf',
      'NDA_Bundle_2024.pdf',
      'Partnership_Agreement_v2.pdf',
    ],
    'Employment': [
      'CEO_Employment_Agreement.pdf',
      'CTO_Offer_Letter.pdf',
      'Employee_NCA_Bundle.pdf',
      'Equity_Plan_2021.pdf',
      'HR_Policy_Manual_v6.pdf',
      'Severance_Agreements.pdf',
    ],
    'Real Estate': [
      'HQ_Lease_Agreement.pdf',
      'NYC_Office_Sublease.pdf',
      'London_Office_Lease.pdf',
      'Property_Deed_Austin.pdf',
    ],
    'Compliance': [
      'SOC2_Type1_Report.pdf',
      'GDPR_Privacy_Policy.pdf',
      'Data_Processing_Agreements.pdf',
      'ISO27001_Certificate.pdf',
    ],
    'Tax': [
      'Tax_Returns_2022_2024.pdf',
      'State_Tax_Filings.pdf',
      'Transfer_Pricing_Study.pdf',
      'R&D_Tax_Credit_Analysis.pdf',
    ],
    'Litigation': [
      'Litigation_Schedule_2026.pdf',
      'Settlement_Agreement_2024.pdf',
    ],
    'IP': [
      'Patent_Portfolio_Summary.pdf',
      'Trademark_Registrations.pdf',
      'IP_Assignment_Agreements.pdf',
    ],
  };

  const docs = [];
  let id = 1;
  categories.forEach(cat => {
    const names = docNames[cat] || [];
    names.forEach(name => {
      const status = statuses[Math.floor(Math.random() * statuses.length)];
      docs.push({
        id: `${projectId}-doc-${id++}`,
        name,
        category: cat,
        status,
        size: `${(Math.random() * 4 + 0.2).toFixed(1)} MB`,
        pages: Math.floor(Math.random() * 80 + 4),
        uploadedAt: '2026-06-20',
        riskScore: status === 'flagged' ? Math.floor(Math.random() * 40 + 50) : Math.floor(Math.random() * 40),
        clauses: status === 'flagged' || status === 'reviewed' ? generateClauses() : [],
      });
    });
  });
  return docs;
}

function generateClauses() {
  const clauses = [
    {
      id: 'cl-1',
      type: 'critical',
      title: 'Indemnification Clause — Unlimited Liability Cap',
      text: '"Party shall indemnify, defend and hold harmless the other Party from any and all claims, damages, losses and expenses, including reasonable attorneys\' fees, arising out of or relating to...',
      explanation: 'This indemnification clause contains no cap on liability, which is unusual and highly unfavorable. Standard practice limits indemnification to the contract value or a fixed multiple thereof.',
      riskScore: 88,
      suggestedAction: 'Negotiate a liability cap of 2x annual contract value and exclude consequential damages.',
      evidence: ['No liability cap found in Sections 8, 9, or 12', 'No carve-outs for indirect damages', 'Compared against 847 similar contracts'],
    },
    {
      id: 'cl-2',
      type: 'warning',
      title: 'Governing Law — Delaware vs. Counterparty Preference',
      text: '"This Agreement shall be governed by and construed in accordance with the laws of the State of New York..."',
      explanation: 'Counterparty has specified New York law, which may create complications given our client\'s Delaware incorporation and existing legal infrastructure.',
      riskScore: 52,
      suggestedAction: 'Negotiate for Delaware governing law to align with corporate structure.',
      evidence: ['Company incorporated in Delaware', 'Existing contracts use Delaware law', 'NY litigation risk assessment needed'],
    },
    {
      id: 'cl-3',
      type: 'verified',
      title: 'Term and Termination — Standard 30-Day Notice',
      text: '"Either Party may terminate this Agreement upon thirty (30) days\' written notice..."',
      explanation: 'Standard termination clause with appropriate notice period. No unusual provisions detected.',
      riskScore: 15,
      suggestedAction: 'No action required.',
      evidence: ['Meets industry standard', 'Consistent with other contracts in data room'],
    },
  ];
  return clauses.slice(0, Math.floor(Math.random() * 3 + 1));
}

export const activities = [
  { id: 1, type: 'flagged', message: 'AI flagged critical issue in Master Services Agreement', project: 'TechCorp Acquisition', time: '2 min ago', icon: 'alert' },
  { id: 2, type: 'upload', message: 'Board Minutes Q1 2025 uploaded and queued for analysis', project: 'TechCorp Acquisition', time: '18 min ago', icon: 'upload' },
  { id: 3, type: 'complete', message: 'Employment agreement bundle analysis complete — 4 issues found', project: 'TechCorp Acquisition', time: '1 hour ago', icon: 'check' },
  { id: 4, type: 'report', message: 'Interim due diligence report generated', project: 'Atlas Ventures Series B', time: '3 hours ago', icon: 'file' },
  { id: 5, type: 'upload', message: '14 property deeds uploaded to Real Estate folder', project: 'Harbor RE Portfolio', time: '5 hours ago', icon: 'upload' },
  { id: 6, type: 'flagged', message: 'Undisclosed litigation matter detected', project: 'Harbor RE Portfolio', time: '1 day ago', icon: 'alert' },
];

export const riskHeatmapData = [
  { category: 'Corporate', critical: 2, major: 1, minor: 2 },
  { category: 'Contracts', critical: 1, major: 3, minor: 4 },
  { category: 'Employment', critical: 0, major: 2, minor: 3 },
  { category: 'Real Estate', critical: 0, major: 1, minor: 1 },
  { category: 'Compliance', critical: 0, major: 0, minor: 2 },
  { category: 'Tax', critical: 0, major: 1, minor: 1 },
  { category: 'Litigation', critical: 1, major: 0, minor: 0 },
  { category: 'IP', critical: 0, major: 0, minor: 1 },
];

export const statsData = {
  documentsReviewed: 4821,
  issuesFlagged: 312,
  reportsGenerated: 47,
  activeProjects: 8,
  riskScore: 61,
};

export const folderStructure = [
  {
    id: 'corporate',
    label: 'Corporate',
    icon: 'building',
    color: '#3B82F6',
    children: [
      { id: 'corp-incorp', label: 'Incorporation Docs' },
      { id: 'corp-board', label: 'Board Resolutions' },
      { id: 'corp-shareholder', label: 'Shareholder Agreements' },
      { id: 'corp-captable', label: 'Cap Table' },
    ],
  },
  {
    id: 'contracts',
    label: 'Contracts',
    icon: 'file-text',
    color: '#D4AF37',
    children: [
      { id: 'cont-customer', label: 'Customer Contracts' },
      { id: 'cont-vendor', label: 'Vendor Agreements' },
      { id: 'cont-nda', label: 'NDAs' },
      { id: 'cont-partnership', label: 'Partnerships' },
    ],
  },
  {
    id: 'employment',
    label: 'Employment',
    icon: 'users',
    color: '#8B5CF6',
    children: [
      { id: 'emp-offers', label: 'Offer Letters' },
      { id: 'emp-equity', label: 'Equity Plans' },
      { id: 'emp-nca', label: 'Non-Competes' },
    ],
  },
  {
    id: 'realestate',
    label: 'Real Estate',
    icon: 'home',
    color: '#10B981',
    children: [
      { id: 're-leases', label: 'Leases' },
      { id: 're-deeds', label: 'Property Deeds' },
    ],
  },
  {
    id: 'compliance',
    label: 'Compliance',
    icon: 'shield',
    color: '#F59E0B',
    children: [
      { id: 'comp-gdpr', label: 'GDPR / Privacy' },
      { id: 'comp-soc', label: 'SOC2 / ISO' },
    ],
  },
  {
    id: 'tax',
    label: 'Tax',
    icon: 'calculator',
    color: '#EF4444',
    children: [
      { id: 'tax-federal', label: 'Federal Returns' },
      { id: 'tax-state', label: 'State Filings' },
    ],
  },
  {
    id: 'litigation',
    label: 'Litigation',
    icon: 'gavel',
    color: '#DC2626',
    children: [
      { id: 'lit-active', label: 'Active Cases' },
      { id: 'lit-settled', label: 'Settlements' },
    ],
  },
  {
    id: 'ip',
    label: 'IP',
    icon: 'lightbulb',
    color: '#06B6D4',
    children: [
      { id: 'ip-patents', label: 'Patents' },
      { id: 'ip-trademarks', label: 'Trademarks' },
    ],
  },
];

export const reportSections = [
  'Executive Summary',
  'Overall Risk Assessment',
  'Critical Risks',
  'Major Risks',
  'Minor Risks',
  'Missing Documents',
  'Corporate Structure',
  'Contracts Review',
  'Employment Review',
  'Real Estate Review',
  'IP & Technology',
  'Compliance & Regulatory',
  'Litigation Matters',
  'Tax Analysis',
  'Recommendations',
];
