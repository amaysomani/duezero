import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowRight, Shield, Zap, FileSearch, Building2, Users,
  AlertTriangle, CheckCircle, BarChart3, FileText,
  ChevronRight, Star, Lock, Globe
} from 'lucide-react';
import AnimatedCounter from '../components/ui/AnimatedCounter';
import './LandingPage.css';

const features = [
  { icon: FileSearch, title: 'AI Document Parsing', desc: 'Ingests thousands of PDFs, Word, and Excel files in minutes. Extracts clauses, dates, parties, and obligations automatically.' },
  { icon: AlertTriangle, title: 'Clause Detection', desc: 'Identifies MAC clauses, indemnification caps, change-of-control provisions, and 200+ other critical legal constructs.' },
  { icon: Building2, title: 'Corporate Structure Mapping', desc: 'Automatically maps ownership hierarchies, subsidiary relationships, and cap table structures across jurisdictions.' },
  { icon: BarChart3, title: 'Shareholding Analysis', desc: 'Validates cap tables, detects dilution anomalies, missing authorizations, and pre-emptive rights violations.' },
  { icon: Shield, title: 'Litigation Detection', desc: 'Cross-references disclosed litigation against public records to surface undisclosed claims and material exposures.' },
  { icon: CheckCircle, title: 'Compliance Review', desc: 'Checks against GDPR, SOX, FCPA, and sector-specific regulatory frameworks automatically.' },
  { icon: Users, title: 'Employment Review', desc: 'Analyzes non-competes, equity plans, key-person agreements, and executive compensation for enforceability and risk.' },
  { icon: Globe, title: 'Real Estate Review', desc: 'Reviews lease assignments, encumbrances, zoning compliance, and title defects across multi-property portfolios.' },
  { icon: Lock, title: 'IP & Technology Review', desc: 'Validates patent ownership chains, identifies open-source license conflicts, and flags IP assignment gaps.' },
  { icon: Zap, title: 'Risk Scoring', desc: 'Every document, clause, and finding receives an institutional-grade risk score with evidence-backed reasoning.' },
  { icon: FileText, title: 'Cross-Document Verification', desc: 'Detects inconsistencies across documents — mismatched dates, conflicting representations, missing counterpart signatures.' },
  { icon: Star, title: 'Automated Report Generation', desc: 'Produces partner-ready due diligence reports in PDF and DOCX with one click. Structured by deal type and jurisdiction.' },
];

const workflowSteps = [
  { step: '01', title: 'Upload Data Room', desc: 'Drag-and-drop your entire data room. Supports PDF, DOCX, XLSX, and ZIP archives up to 50GB.' },
  { step: '02', title: 'AI Categorization', desc: 'DueZero automatically classifies every document into Corporate, Contracts, Employment, Tax, and 5 other categories.' },
  { step: '03', title: 'Checklist Matching', desc: 'Maps your documents against a deal-type-specific checklist and surfaces missing items instantly.' },
  { step: '04', title: 'Risk Detection', desc: 'AI analyzes every clause against 400+ risk patterns and flags critical, major, and minor issues with evidence.' },
  { step: '05', title: 'Report Generation', desc: 'Generates a structured due diligence report organized by risk severity, category, and recommended actions.' },
  { step: '06', title: 'Partner Review', desc: 'Attorneys review AI findings, add annotations, and approve sections with full audit trail.' },
  { step: '07', title: 'Download & Deliver', desc: 'Export partner-ready reports in PDF or DOCX with your firm\'s branding applied automatically.' },
];

const clients = ['Kirkland & Ellis', 'Blackstone', 'KKR', 'Goldman Sachs', 'Latham & Watkins', 'Sequoia Capital', 'JPMorgan'];

const stats = [
  { value: 50000, suffix: '+', label: 'Documents Analyzed' },
  { value: 200, suffix: '+', label: 'Firms Worldwide' },
  { value: 98, suffix: '%', label: 'Accuracy Rate' },
  { value: 85, suffix: '%', label: 'Time Saved' },
];

export default function LandingPage() {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const heroRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep(s => (s + 1) % workflowSteps.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="landing">
      {/* Nav */}
      <nav className="landing-nav">
        <div className="landing-nav-inner">
          <div className="landing-nav-logo">
            <div className="landing-logo-mark">D</div>
            <span className="landing-logo-name">DueZero</span>
          </div>
          <div className="landing-nav-links">
            <a href="#features">Features</a>
            <a href="#workflow">How it Works</a>
            <a href="#pricing">Pricing</a>
            <a href="#about">About</a>
          </div>
          <div className="landing-nav-actions">
            <button className="landing-nav-signin" onClick={() => navigate('/dashboard')}>Sign In</button>
            <button className="landing-nav-cta" onClick={() => navigate('/dashboard')}>
              Start Diligence <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="hero" ref={heroRef}>
        {/* Background grid */}
        <div className="grid-lines" />

        {/* Floating document cards */}
        <div className="hero-floaters">
          <div className="floater floater-1">
            <div className="floater-icon">📄</div>
            <div className="floater-text">
              <span className="floater-title">MAC Clause Detected</span>
              <span className="floater-sub">Master Services Agreement · p.14</span>
            </div>
            <span className="floater-badge floater-critical">Critical</span>
          </div>
          <div className="floater floater-2">
            <div className="floater-icon">🏢</div>
            <div className="floater-text">
              <span className="floater-title">Corp Structure Mapped</span>
              <span className="floater-sub">7 entities · 3 jurisdictions</span>
            </div>
            <span className="floater-badge floater-success">✓ Verified</span>
          </div>
          <div className="floater floater-3">
            <div className="floater-icon">⚖️</div>
            <div className="floater-text">
              <span className="floater-title">Undisclosed Litigation</span>
              <span className="floater-sub">Case No. 2025-CV-04471</span>
            </div>
            <span className="floater-badge floater-danger">High Risk</span>
          </div>
          <div className="floater floater-4">
            <div className="floater-icon">📊</div>
            <div className="floater-text">
              <span className="floater-title">Report Generated</span>
              <span className="floater-sub">247 docs · 23 flags · PDF ready</span>
            </div>
            <span className="floater-badge floater-accent">Ready</span>
          </div>
        </div>

        {/* Hero content */}
        <div className="ai-orb-container">
          <div className="ai-orb">
            <div className="ai-orb-core"></div>
            <div className="ai-orb-ring"></div>
            <div className="ai-orb-ring-2"></div>
          </div>
        </div>

        <div className="hero-content">


          <h1 className="hero-headline">
            Institutional-Grade<br />
            Due Diligence.<br />
            <span className="gradient-text">Automated.</span>
          </h1>

          <p className="hero-sub">
            Upload your company's Virtual Data Room. Our AI reviews thousands<br />
            of legal documents, detects legal risks, and produces partner-ready<br />
            due diligence reports in hours — not weeks.
          </p>

          <div className="hero-actions">
            <button className="hero-btn-primary" onClick={() => navigate('/dashboard')}>
              Start Diligence
              <ArrowRight size={16} />
            </button>
            <button className="hero-btn-secondary" onClick={() => navigate('/dashboard')}>
              <FileText size={16} />
              Upload Data Room
            </button>
          </div>

          <div className="hero-meta">
            <span className="hero-meta-item">
              <CheckCircle size={13} />
              No credit card required
            </span>
            <span className="hero-meta-dot" />
            <span className="hero-meta-item">
              <Lock size={13} />
              SOC 2 Type II Certified
            </span>
            <span className="hero-meta-dot" />
            <span className="hero-meta-item">
              <Shield size={13} />
              Attorney-Client Privileged
            </span>
          </div>
        </div>

        {/* Hero gradient */}
        <div className="hero-glow" />
      </section>

      {/* Client logos */}
      <section className="clients">
        <p className="clients-label">Trusted by the world's leading legal and financial institutions</p>
        <div className="clients-track">
          {[...clients, ...clients].map((c, i) => (
            <span key={i} className="client-name">{c}</span>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="stats-section" id="about">
        {stats.map((s, i) => (
          <div key={i} className="stat-card">
            <div className="stat-value">
              <AnimatedCounter target={s.value} suffix={s.suffix} />
            </div>
            <div className="stat-label">{s.label}</div>
          </div>
        ))}
      </section>

      {/* Features */}
      <section className="features-section" id="features">
        <div className="section-header">
          <p className="section-eyebrow">Capabilities</p>
          <h2 className="section-title">Everything you need for<br />institutional-grade diligence</h2>
          <p className="section-sub">Built for M&A, private equity, venture capital, and corporate legal teams</p>
        </div>
        <div className="features-grid">
          {features.map(({ icon: Icon, title, desc }, i) => (
            <div key={i} className="feature-card">
              <div className="feature-icon">
                <Icon size={20} />
              </div>
              <h3 className="feature-title">{title}</h3>
              <p className="feature-desc">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Workflow */}
      <section className="workflow-section" id="workflow">
        <div className="section-header">
          <p className="section-eyebrow">Process</p>
          <h2 className="section-title">From upload to report<br />in hours, not weeks</h2>
        </div>
        <div className="workflow-layout">
          <div className="workflow-steps">
            {workflowSteps.map(({ step, title, desc }, i) => (
              <div
                key={i}
                className={`workflow-step ${activeStep === i ? 'workflow-step-active' : ''}`}
                onClick={() => setActiveStep(i)}
              >
                <div className="workflow-step-num">{step}</div>
                <div className="workflow-step-content">
                  <h4 className="workflow-step-title">{title}</h4>
                  {activeStep === i && (
                    <p className="workflow-step-desc">{desc}</p>
                  )}
                </div>
                {activeStep === i && <ChevronRight size={16} className="workflow-step-arrow" />}
              </div>
            ))}
          </div>
          <div className="workflow-preview">
            <div className="workflow-preview-card">
              <div className="workflow-preview-header">
                <div className="workflow-preview-dots">
                  <span /><span /><span />
                </div>
                <span className="workflow-preview-title">DueZero · {workflowSteps[activeStep].title}</span>
              </div>
              <div className="workflow-preview-body">
                <div className="workflow-step-icon-lg">
                  {['📤', '🤖', '✅', '🎯', '📋', '👁️', '📥'][activeStep]}
                </div>
                <p className="workflow-preview-desc">{workflowSteps[activeStep].desc}</p>
                <div className="workflow-progress-bar">
                  <div
                    className="workflow-progress-fill"
                    style={{ width: `${((activeStep + 1) / workflowSteps.length) * 100}%` }}
                  />
                </div>
                <div className="workflow-progress-label">
                  Step {activeStep + 1} of {workflowSteps.length}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="landing-cta">
        <div className="landing-cta-inner">
          <h2 className="landing-cta-title">Ready to transform your<br />due diligence process?</h2>
          <p className="landing-cta-sub">Join 200+ firms using DueZero for faster, more accurate legal due diligence.</p>
          <div className="landing-cta-actions">
            <button className="hero-btn-primary" onClick={() => navigate('/dashboard')}>
              Get Started Free
              <ArrowRight size={16} />
            </button>
            <button className="hero-btn-secondary">Schedule a Demo</button>
          </div>
        </div>
        <div className="landing-cta-glow" />
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <div className="footer-logo">
          <div className="landing-logo-mark">D</div>
          <span className="landing-logo-name">DueZero</span>
        </div>
        <p className="footer-copy">© 2026 DueZero Technologies Inc. · Attorney-Client Privileged Platform</p>
        <div className="footer-links">
          <a href="#">Privacy</a>
          <a href="#">Terms</a>
          <a href="#">Security</a>
          <a href="#">Contact</a>
        </div>
      </footer>
    </div>
  );
}
