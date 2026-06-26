import React, { useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Download, FileText, AlertTriangle, CheckCircle, Info,
  Building2, Users, Home, Shield, Calculator, Gavel,
  Lightbulb, ArrowLeft, ExternalLink, ChevronRight, BarChart3,
  FileWarning, TrendingUp, Lock
} from 'lucide-react';
import AppShell from '../components/layout/AppShell';
import Badge from '../components/ui/Badge';
import RiskScore from '../components/ui/RiskScore';
import ProgressBar from '../components/ui/ProgressBar';
import { projects, reportSections } from '../data/mockData';
import './ReportPage.css';

const sectionIcons = {
  'Executive Summary': BarChart3,
  'Overall Risk Assessment': TrendingUp,
  'Critical Risks': AlertTriangle,
  'Major Risks': Info,
  'Minor Risks': Info,
  'Missing Documents': FileWarning,
  'Corporate Structure': Building2,
  'Contracts Review': FileText,
  'Employment Review': Users,
  'Real Estate Review': Home,
  'IP & Technology': Lightbulb,
  'Compliance & Regulatory': Shield,
  'Litigation Matters': Gavel,
  'Tax Analysis': Calculator,
  'Recommendations': CheckCircle,
};

export default function ReportPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const project = projects.find(p => p.id === id) || projects[0];
  const [activeSection, setActiveSection] = useState(reportSections[0]);
  const contentRef = useRef(null);

  const scrollToSection = (section) => {
    setActiveSection(section);
    const el = document.getElementById(`section-${section.replace(/\s+/g, '-').toLowerCase()}`);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const today = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <AppShell topBarProps={{
      breadcrumbs: ['Projects', project.name, 'Due Diligence Report'],
      actions: (
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <button className="report-action-btn" onClick={() => navigate(`/project/${id}`)}>
            <ArrowLeft size={13} /> Back to Workspace
          </button>
          <button className="report-action-btn report-action-docx">
            <FileText size={13} /> Export DOCX
          </button>
          <button className="report-action-btn report-action-pdf">
            <Download size={13} /> Download PDF
          </button>
        </div>
      )
    }}>
      <div className="report-layout">

        {/* Left ToC */}
        <div className="report-toc">
          <div className="report-toc-header">
            <span className="report-toc-title">Table of Contents</span>
          </div>
          {reportSections.map((section, i) => {
            const Icon = sectionIcons[section] || FileText;
            const isActive = activeSection === section;
            return (
              <button
                key={section}
                className={`toc-item ${isActive ? 'toc-item-active' : ''}`}
                onClick={() => scrollToSection(section)}
              >
                <span className="toc-num">{String(i + 1).padStart(2, '0')}</span>
                <Icon size={13} className="toc-icon" />
                <span className="toc-label">{section}</span>
                {section === 'Critical Risks' && project.criticalFindings.length > 0 && (
                  <Badge variant="critical" size="sm">{project.criticalFindings.length}</Badge>
                )}
                {section === 'Missing Documents' && project.missingDocuments.length > 0 && (
                  <Badge variant="warning" size="sm">{project.missingDocuments.length}</Badge>
                )}
              </button>
            );
          })}

          {/* Confidentiality notice */}
          <div className="report-confidential">
            <Lock size={11} />
            <span>Confidential & Privileged</span>
          </div>
        </div>

        {/* Main report content */}
        <div className="report-main" ref={contentRef}>

          {/* Report title */}
          <div className="report-title-block">
            <div className="report-firm-logo">
              <div className="firm-logo-mark">D</div>
              <div className="firm-logo-text">
                <span className="firm-name">DueZero AI</span>
                <span className="firm-tagline">Legal Due Diligence Platform</span>
              </div>
            </div>
            <h1 className="report-main-title">Legal Due Diligence Report</h1>
            <div className="report-meta-grid">
              <div className="report-meta-item">
                <span className="report-meta-key">Target Company</span>
                <span className="report-meta-val">{project.company}</span>
              </div>
              <div className="report-meta-item">
                <span className="report-meta-key">Transaction Type</span>
                <span className="report-meta-val">{project.type}</span>
              </div>
              <div className="report-meta-item">
                <span className="report-meta-key">Deal Size</span>
                <span className="report-meta-val">{project.dealSize}</span>
              </div>
              <div className="report-meta-item">
                <span className="report-meta-key">Report Date</span>
                <span className="report-meta-val">{today}</span>
              </div>
              <div className="report-meta-item">
                <span className="report-meta-key">Documents Reviewed</span>
                <span className="report-meta-val">{project.documentsReviewed} of {project.documentsTotal}</span>
              </div>
              <div className="report-meta-item">
                <span className="report-meta-key">Analysis Engine</span>
                <span className="report-meta-val">DueZero AI v3.2</span>
              </div>
            </div>
            <div className="report-classification">
              <Lock size={12} />
              ATTORNEY-CLIENT PRIVILEGED · CONFIDENTIAL · FOR INTERNAL USE ONLY
            </div>
          </div>

          {/* Executive Summary */}
          <section id="section-executive-summary" className="report-section">
            <div className="rs-header">
              <h2 className="rs-title">Executive Summary</h2>
              <div className="rs-badge-row">
                <Badge variant={project.riskLevel} size="md">Overall: {project.riskLevel} risk</Badge>
              </div>
            </div>
            <div className="rs-exec-grid">
              <div className="rs-exec-text">
                <p className="rs-para">
                  This Legal Due Diligence Report has been prepared in connection with the proposed {project.type.toLowerCase()} of {project.company}. DueZero AI has reviewed {project.documentsReviewed} documents across {Object.keys(project.categories).length} legal categories, comprising {project.documentsTotal} total documents in the Virtual Data Room.
                </p>
                <p className="rs-para">
                  The review has identified <strong style={{ color: 'var(--danger)' }}>{project.criticalFindings.length} critical findings</strong>, <strong style={{ color: 'var(--warning)' }}>{project.majorFindings.length} major findings</strong>, and <strong style={{ color: 'var(--info)' }}>{project.minorFindings.length} minor findings</strong> that require attention prior to transaction close. Additionally, {project.missingDocuments.length} documents have been identified as missing from the data room.
                </p>
                <p className="rs-para">
                  The overall transaction risk is assessed as <strong style={{ color: project.riskScore >= 75 ? 'var(--danger)' : project.riskScore >= 50 ? 'var(--warning)' : 'var(--success)' }}>{project.riskLevel.toUpperCase()}</strong> with a risk score of {project.riskScore}/100. The most significant issues relate to {project.criticalFindings[0]?.category || 'Corporate'} matters and require immediate legal counsel review.
                </p>
              </div>
              <div className="rs-exec-score">
                <RiskScore score={project.riskScore} size="lg" />
                <div className="rs-score-breakdown">
                  {[
                    { label: 'Documents Complete', value: Math.round((project.documentsReviewed / project.documentsTotal) * 100) },
                    { label: 'Risks Resolved', value: 34 },
                    { label: 'Confidence Score', value: 91 },
                  ].map(({ label, value }) => (
                    <div key={label} className="rs-mini-stat">
                      <div className="rs-mini-label">{label}</div>
                      <ProgressBar value={value} height={3} />
                      <span className="rs-mini-val">{value}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Overall Risk Assessment */}
          <section id="section-overall-risk-assessment" className="report-section">
            <div className="rs-header">
              <h2 className="rs-title">Overall Risk Assessment</h2>
            </div>
            <div className="rs-risk-summary-grid">
              {Object.entries(project.categories).map(([key, val]) => {
                const totalRisk = val.flagged;
                const riskLevel = totalRisk >= 3 ? 'high' : totalRisk >= 1 ? 'medium' : 'low';
                const label = key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1');
                return (
                  <div key={key} className="rs-cat-card">
                    <div className="rs-cat-header">
                      <span className="rs-cat-label">{label}</span>
                      <Badge variant={riskLevel} size="sm">{riskLevel}</Badge>
                    </div>
                    <ProgressBar value={val.reviewed} max={val.total} height={3} />
                    <div className="rs-cat-meta">
                      <span>{val.reviewed}/{val.total} reviewed</span>
                      {val.flagged > 0 && (
                        <span style={{ color: 'var(--danger)' }}>{val.flagged} flagged</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Critical Risks */}
          <section id="section-critical-risks" className="report-section">
            <div className="rs-header rs-header-critical">
              <div>
                <h2 className="rs-title">Critical Risks</h2>
                <p className="rs-subtitle">Issues requiring immediate attention and may impact transaction feasibility</p>
              </div>
              <Badge variant="critical" size="lg">{project.criticalFindings.length} findings</Badge>
            </div>

            {project.criticalFindings.length === 0 ? (
              <div className="rs-empty-state">
                <CheckCircle size={24} style={{ color: 'var(--success)' }} />
                <p>No critical findings identified</p>
              </div>
            ) : (
              <div className="rs-findings-list">
                {project.criticalFindings.map((f, i) => (
                  <div key={f.id} className="rs-finding rs-finding-critical">
                    <div className="rs-finding-header">
                      <div className="rs-finding-num-badge">
                        <AlertTriangle size={12} />
                        Critical Finding {i + 1}
                      </div>
                      <div className="rs-finding-score-chip" style={{
                        background: 'var(--danger-dim)',
                        color: 'var(--danger)',
                        border: '1px solid rgba(220,38,38,0.25)'
                      }}>
                        Risk Score: {f.riskScore}/100
                      </div>
                    </div>
                    <h3 className="rs-finding-title">{f.title}</h3>
                    <div className="rs-finding-meta">
                      <Badge variant="default" size="sm">{f.category}</Badge>
                      {f.document && (
                        <span className="rs-finding-doc">
                          <FileText size={11} /> {f.document}{f.page ? ` · Page ${f.page}` : ''}
                        </span>
                      )}
                    </div>
                    <p className="rs-finding-desc">{f.description}</p>
                    {f.clause && (
                      <blockquote className="rs-finding-quote">
                        "{f.clause}"
                      </blockquote>
                    )}
                    <div className="rs-finding-action">
                      <div className="rs-action-label">
                        <CheckCircle size={12} /> Recommended Action
                      </div>
                      <p className="rs-action-text">{f.suggestedAction}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Major Risks */}
          <section id="section-major-risks" className="report-section">
            <div className="rs-header">
              <div>
                <h2 className="rs-title">Major Risks</h2>
                <p className="rs-subtitle">Significant issues that should be resolved or mitigated prior to close</p>
              </div>
              <Badge variant="major" size="lg">{project.majorFindings.length} findings</Badge>
            </div>
            <div className="rs-findings-list">
              {project.majorFindings.map((f, i) => (
                <div key={f.id} className="rs-finding rs-finding-major">
                  <div className="rs-finding-header">
                    <div className="rs-finding-num-badge rs-badge-major">
                      <Info size={12} />
                      Major Finding {i + 1}
                    </div>
                    <div className="rs-finding-score-chip" style={{
                      background: 'var(--warning-dim)',
                      color: 'var(--warning)',
                      border: '1px solid rgba(250,204,21,0.25)'
                    }}>
                      Risk Score: {f.riskScore}/100
                    </div>
                  </div>
                  <h3 className="rs-finding-title">{f.title}</h3>
                  <div className="rs-finding-meta">
                    <Badge variant="default" size="sm">{f.category}</Badge>
                    {f.document && (
                      <span className="rs-finding-doc">
                        <FileText size={11} /> {f.document}
                      </span>
                    )}
                  </div>
                  <p className="rs-finding-desc">{f.description}</p>
                </div>
              ))}
              {project.majorFindings.length === 0 && (
                <div className="rs-empty-state">
                  <CheckCircle size={24} style={{ color: 'var(--success)' }} />
                  <p>No major findings identified</p>
                </div>
              )}
            </div>
          </section>

          {/* Minor Risks */}
          <section id="section-minor-risks" className="report-section">
            <div className="rs-header">
              <div>
                <h2 className="rs-title">Minor Risks</h2>
                <p className="rs-subtitle">Items to note and monitor, but not transaction-blocking</p>
              </div>
              <Badge variant="minor" size="lg">{project.minorFindings.length} findings</Badge>
            </div>
            <div className="rs-minor-table">
              <div className="rs-table-header">
                <span>Category</span>
                <span>Finding</span>
                <span>Risk Score</span>
              </div>
              {project.minorFindings.map((f) => (
                <div key={f.id} className="rs-table-row">
                  <Badge variant="default" size="sm">{f.category}</Badge>
                  <span className="rs-table-finding">{f.title}</span>
                  <span className="rs-table-score" style={{ color: 'var(--info)' }}>{f.riskScore}</span>
                </div>
              ))}
              {project.minorFindings.length === 0 && (
                <div className="rs-empty-state">
                  <CheckCircle size={24} style={{ color: 'var(--success)' }} />
                  <p>No minor findings identified</p>
                </div>
              )}
            </div>
          </section>

          {/* Missing Documents */}
          <section id="section-missing-documents" className="report-section">
            <div className="rs-header">
              <div>
                <h2 className="rs-title">Missing Documents</h2>
                <p className="rs-subtitle">Documents requested but not yet received in the data room</p>
              </div>
              <Badge variant="warning" size="lg">{project.missingDocuments.length} missing</Badge>
            </div>
            <div className="rs-missing-grid">
              {project.missingDocuments.map((m, i) => (
                <div key={i} className="rs-missing-card">
                  <div className="rs-missing-header">
                    <FileWarning size={14} style={{ color: m.priority === 'high' ? 'var(--danger)' : 'var(--warning)' }} />
                    <Badge variant={m.priority} size="sm">{m.priority} priority</Badge>
                  </div>
                  <p className="rs-missing-name">{m.name}</p>
                  <span className="rs-missing-cat">{m.category}</span>
                </div>
              ))}
              {project.missingDocuments.length === 0 && (
                <div className="rs-empty-state">
                  <CheckCircle size={24} style={{ color: 'var(--success)' }} />
                  <p>All documents received</p>
                </div>
              )}
            </div>
          </section>

          {/* Recommendations */}
          <section id="section-recommendations" className="report-section">
            <div className="rs-header">
              <h2 className="rs-title">Recommendations</h2>
              <p className="rs-subtitle">Priority actions for transaction counsel and management</p>
            </div>
            <div className="rs-recommendations">
              {[
                ...project.criticalFindings.map((f, i) => ({
                  priority: 'Immediate',
                  title: f.title,
                  action: f.suggestedAction,
                  color: 'var(--danger)',
                })),
                ...project.majorFindings.map((f, i) => ({
                  priority: 'Pre-Close',
                  title: f.title,
                  action: `Address ${f.category.toLowerCase()} matter before transaction closes.`,
                  color: 'var(--warning)',
                })),
                {
                  priority: 'Post-Close',
                  title: 'Ongoing Compliance Monitoring',
                  action: 'Establish a 90-day post-close integration checklist covering all flagged compliance, employment, and IP matters.',
                  color: 'var(--info)',
                },
              ].map((rec, i) => (
                <div key={i} className="rs-rec-item">
                  <div className="rs-rec-priority" style={{ color: rec.color }}>
                    <span className="rs-rec-dot" style={{ background: rec.color }} />
                    {rec.priority}
                  </div>
                  <div className="rs-rec-content">
                    <p className="rs-rec-title">{rec.title}</p>
                    <p className="rs-rec-action">{rec.action}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Footer */}
          <div className="report-footer">
            <div className="report-footer-left">
              <div className="firm-logo-mark">D</div>
              <div>
                <p className="report-footer-title">DueZero AI Due Diligence Platform</p>
                <p className="report-footer-sub">This report was generated using AI-assisted analysis and is subject to attorney review. All findings should be verified by qualified legal counsel before reliance.</p>
              </div>
            </div>
            <div className="report-footer-right">
              <p className="report-footer-date">{today}</p>
              <p className="report-footer-conf">CONFIDENTIAL</p>
            </div>
          </div>

        </div>
      </div>

      {/* Fixed download bar */}
      <div className="download-bar">
        <div className="download-bar-left">
          <span className="download-bar-title">{project.name} — Due Diligence Report</span>
          <span className="download-bar-meta">{today} · {project.documentsReviewed} documents reviewed</span>
        </div>
        <div className="download-bar-actions">
          <button className="download-btn-docx">
            <FileText size={14} />
            Export DOCX
          </button>
          <button className="download-btn-pdf">
            <Download size={14} />
            Download PDF
          </button>
        </div>
      </div>
    </AppShell>
  );
}
