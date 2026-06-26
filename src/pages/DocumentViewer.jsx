import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ChevronLeft, ChevronRight, ZoomIn, ZoomOut, RotateCw,
  AlertTriangle, CheckCircle, Info, ExternalLink, Copy,
  Sparkles, Shield, ArrowLeft, Maximize2, FileText
} from 'lucide-react';
import AppShell from '../components/layout/AppShell';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import { projects } from '../data/mockData';
import './DocumentViewer.css';

const clauseTypeConfig = {
  critical: { color: 'var(--danger)', bg: 'rgba(220,38,38,0.08)', border: 'rgba(220,38,38,0.25)', icon: AlertTriangle, label: 'Critical Risk' },
  warning: { color: 'var(--warning)', bg: 'rgba(250,204,21,0.08)', border: 'rgba(250,204,21,0.25)', icon: Info, label: 'Warning' },
  verified: { color: 'var(--success)', bg: 'rgba(22,163,74,0.08)', border: 'rgba(22,163,74,0.25)', icon: CheckCircle, label: 'Verified' },
};

// Simulated PDF page content
const pdfPages = [
  {
    page: 1,
    title: 'MASTER SERVICES AGREEMENT',
    content: [
      { text: 'This Master Services Agreement ("Agreement") is entered into as of November 15, 2023, by and between TechCorp Inc., a Delaware corporation ("Company"), and Acme Enterprises LLC, a New York limited liability company ("Client").' },
      { text: '', spacer: true },
      { text: '1. SERVICES', bold: true },
      { text: 'Company shall provide Client with software-as-a-service solutions as described in applicable Order Forms executed by the parties, each of which is incorporated herein by reference ("Services").' },
      { text: '', spacer: true },
      { text: '2. PAYMENT TERMS', bold: true },
      { text: 'Client shall pay all fees specified in the applicable Order Form within thirty (30) days of the invoice date. Late payments shall accrue interest at the rate of 1.5% per month or the maximum rate permitted by law, whichever is less.' },
      { text: '', spacer: true },
      { text: '3. INTELLECTUAL PROPERTY', bold: true },
      { text: 'All intellectual property rights in the Services and related documentation shall remain the exclusive property of Company. Client receives only a limited, non-exclusive, non-transferable license to use the Services during the Term.' },
    ],
  },
  {
    page: 2,
    title: 'ARTICLE 8 — INDEMNIFICATION',
    content: [
      { text: '8. INDEMNIFICATION', bold: true },
      { text: '', spacer: true },
      { text: '8.1 General Indemnification. Each party ("Indemnifying Party") shall indemnify, defend and hold harmless the other Party and its officers, directors, employees, agents, and successors from and against any and all claims, damages, losses, costs, and expenses, including reasonable attorneys\' fees, arising out of or relating to:', clauseHighlight: 'critical' },
      { text: '(a) any breach of this Agreement by the Indemnifying Party;', indent: true },
      { text: '(b) any negligence or willful misconduct of the Indemnifying Party;', indent: true },
      { text: '(c) any infringement of third-party intellectual property rights.', indent: true },
      { text: '', spacer: true },
      { text: '8.2 Indemnification Procedure. The Indemnified Party shall: (i) promptly notify the Indemnifying Party in writing of any claim; (ii) grant the Indemnifying Party sole control of the defense and settlement; and (iii) provide reasonable assistance at the Indemnifying Party\'s expense.' },
      { text: '', spacer: true },
      { text: '9. LIMITATION OF LIABILITY', bold: true },
      { text: '9.1 NOTWITHSTANDING ANYTHING TO THE CONTRARY IN THIS AGREEMENT, NEITHER PARTY SHALL BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, PUNITIVE, OR CONSEQUENTIAL DAMAGES ARISING OUT OF OR RELATED TO THIS AGREEMENT.', clauseHighlight: 'warning' },
    ],
  },
  {
    page: 14,
    title: 'ARTICLE 12 — TERMINATION & MAC CLAUSE',
    content: [
      { text: '12. TERM AND TERMINATION', bold: true },
      { text: '', spacer: true },
      { text: '12.1 Term. This Agreement shall commence on the Effective Date and continue for an initial term of three (3) years unless earlier terminated in accordance with this Article 12.' },
      { text: '', spacer: true },
      { text: '12.2 Termination for Convenience. Either Party may terminate this Agreement upon sixty (60) days\' prior written notice to the other Party.' },
      { text: '', spacer: true },
      { text: '12.3 Material Adverse Change.', bold: true },
      { text: '(a) The Company may immediately terminate this Agreement without penalty upon written notice to Client if any event or circumstance occurs that the Company\'s Board of Directors determines, in its sole and absolute discretion, constitutes a Material Adverse Change.', clauseHighlight: 'critical' },
      { text: '(b) "Material Adverse Change" means any event that the Board determines, in its sole discretion, constitutes a material adverse change with respect to the business, operations, financial condition, properties, or prospects of Client, without limitation.', clauseHighlight: 'critical' },
      { text: '', spacer: true },
      { text: '12.4 Effect of Termination. Upon any termination of this Agreement, all rights granted to Client hereunder shall immediately terminate, and Client shall promptly return or destroy all Company confidential information.' },
      { text: '', spacer: true },
      { text: '13. GOVERNING LAW', bold: true },
      { text: 'This Agreement shall be governed by and construed in accordance with the laws of the State of New York, without regard to its conflict of law provisions.', clauseHighlight: 'warning' },
    ],
  },
];

export default function DocumentViewer() {
  const { id, docId } = useParams();
  const navigate = useNavigate();
  const project = projects.find(p => p.id === id) || projects[0];
  const doc = project.documents.find(d => d.id === docId) || project.documents[0];
  const clauses = doc?.clauses || projects[0].documents.find(d => d.clauses?.length > 0)?.clauses || [];

  const [currentPage, setCurrentPage] = useState(1);
  const [selectedClause, setSelectedClause] = useState(clauses[0] || null);
  const [hoveredClause, setHoveredClause] = useState(null);
  const pdfPage = pdfPages.find(p => p.page === currentPage) || pdfPages[0];

  return (
    <AppShell topBarProps={{
      breadcrumbs: ['Projects', project.name, 'Document Viewer'],
      actions: (
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <button className="dv-action-btn" onClick={() => navigate(`/project/${id}`)}>
            <ArrowLeft size={13} /> Back to Workspace
          </button>
          <button className="dv-action-btn dv-action-report" onClick={() => navigate(`/project/${id}/report`)}>
            <FileText size={13} /> View Report
          </button>
        </div>
      )
    }}>
      <div className="doc-viewer">

        {/* Left — PDF Viewer */}
        <div className="dv-left">
          {/* PDF Toolbar */}
          <div className="dv-toolbar">
            <div className="dv-toolbar-left">
              <button className="dv-tool-btn" onClick={() => setCurrentPage(p => Math.max(1, p - 1))}>
                <ChevronLeft size={14} />
              </button>
              <span className="dv-page-info">
                Page <strong>{currentPage === 1 ? 1 : currentPage === 2 ? 2 : 14}</strong> of 47
              </span>
              <button className="dv-tool-btn" onClick={() => setCurrentPage(p => p < 3 ? p + 1 : p)}>
                <ChevronRight size={14} />
              </button>
            </div>
            <div className="dv-doc-name">
              <FileText size={13} />
              <span>{doc?.name || 'Master_Services_Agreement_v4.pdf'}</span>
            </div>
            <div className="dv-toolbar-right">
              <button className="dv-tool-btn"><ZoomOut size={14} /></button>
              <span className="dv-zoom">100%</span>
              <button className="dv-tool-btn"><ZoomIn size={14} /></button>
              <button className="dv-tool-btn"><RotateCw size={14} /></button>
              <button className="dv-tool-btn"><Maximize2 size={14} /></button>
            </div>
          </div>

          {/* PDF Content */}
          <div className="dv-pdf-wrap">
            <div className="dv-pdf-page">
              {/* Page header */}
              <div className="pdf-page-header">
                <span className="pdf-page-num">Page {currentPage === 1 ? 1 : currentPage === 2 ? 2 : 14}</span>
                <span className="pdf-page-name">{pdfPage.title}</span>
              </div>

              {/* Content */}
              <div className="pdf-content">
                {pdfPage.content.map((line, i) => {
                  if (line.spacer) return <div key={i} className="pdf-spacer" />;

                  if (line.clauseHighlight) {
                    const config = clauseTypeConfig[line.clauseHighlight];
                    const isHovered = hoveredClause === `${i}`;
                    return (
                      <div
                        key={i}
                        className={`pdf-clause pdf-clause-${line.clauseHighlight} ${line.indent ? 'pdf-indent' : ''} ${isHovered ? 'pdf-clause-hovered' : ''}`}
                        style={{ borderColor: config.border }}
                        onMouseEnter={() => setHoveredClause(`${i}`)}
                        onMouseLeave={() => setHoveredClause(null)}
                        onClick={() => {
                          const matchingClause = clauses.find(c => c.type === line.clauseHighlight);
                          if (matchingClause) setSelectedClause(matchingClause);
                        }}
                      >
                        <span className="pdf-clause-marker" style={{ background: config.color }}>
                          <config.icon size={9} color="#fff" />
                        </span>
                        <span className="pdf-clause-text">{line.text}</span>
                        {isHovered && (
                          <div className="pdf-clause-tooltip">
                            <span className="pdf-tooltip-label" style={{ color: config.color }}>{config.label}</span>
                            <span className="pdf-tooltip-action">Click to analyze →</span>
                          </div>
                        )}
                      </div>
                    );
                  }

                  return (
                    <p key={i} className={`pdf-para ${line.bold ? 'pdf-bold' : ''} ${line.indent ? 'pdf-indent' : ''}`}>
                      {line.text}
                    </p>
                  );
                })}
              </div>

              {/* Page number */}
              <div className="pdf-page-footer">{currentPage === 1 ? 1 : currentPage === 2 ? 2 : 14}</div>
            </div>

            {/* Page tabs */}
            <div className="dv-page-tabs">
              {[1, 2, 14].map((pg, i) => (
                <button
                  key={pg}
                  className={`dv-page-tab ${currentPage === (i + 1) ? 'dv-page-tab-active' : ''}`}
                  onClick={() => setCurrentPage(i + 1)}
                >
                  {pg}
                  {i === 2 && <span className="dv-page-tab-flag" />}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right — AI Analysis Panel */}
        <div className="dv-right">
          <div className="dv-right-header">
            <div className="dv-right-title">
              <Sparkles size={15} style={{ color: 'var(--accent)' }} />
              <span>AI Analysis</span>
            </div>
            <Badge variant="parsing" size="sm" dot>Analyzing</Badge>
          </div>

          {/* Document summary */}
          <div className="dv-summary-card">
            <div className="dv-summary-row">
              <span className="dv-summary-label">Document Risk</span>
              <span className="dv-summary-val" style={{
                color: (doc?.riskScore || 75) >= 75 ? 'var(--danger)' :
                  (doc?.riskScore || 75) >= 50 ? 'var(--warning)' : 'var(--success)'
              }}>
                {doc?.riskScore || 75}/100
              </span>
            </div>
            <div className="dv-summary-bar">
              <div
                className="dv-summary-fill"
                style={{
                  width: `${doc?.riskScore || 75}%`,
                  background: (doc?.riskScore || 75) >= 75 ? 'var(--danger)' :
                    (doc?.riskScore || 75) >= 50 ? 'var(--warning)' : 'var(--success)',
                }}
              />
            </div>
            <div className="dv-summary-meta">
              <span>{clauses.length} clause{clauses.length !== 1 ? 's' : ''} flagged</span>
              <span>·</span>
              <span>{doc?.pages || 47} pages</span>
              <span>·</span>
              <span>{doc?.category || 'Contracts'}</span>
            </div>
          </div>

          {/* Clause list */}
          <div className="dv-clause-tabs">
            {clauses.length === 0 ? (
              // Show default clauses from page 14
              [
                { id: 'demo-1', type: 'critical', title: 'MAC Clause — Undefined Trigger Events', riskScore: 89 },
                { id: 'demo-2', type: 'warning', title: 'Governing Law — New York vs Delaware', riskScore: 52 },
                { id: 'demo-3', type: 'verified', title: 'Termination Notice — Standard 60-Day', riskScore: 15 },
              ].map((c) => {
                const config = clauseTypeConfig[c.type];
                return (
                  <button
                    key={c.id}
                    className={`clause-tab ${selectedClause?.id === c.id ? 'clause-tab-active' : ''}`}
                    style={selectedClause?.id === c.id ? { borderColor: config.border, background: config.bg } : {}}
                    onClick={() => setSelectedClause(c)}
                  >
                    <config.icon size={12} style={{ color: config.color, flexShrink: 0 }} />
                    <span className="clause-tab-title">{c.title}</span>
                    <span className="clause-tab-score" style={{ color: config.color }}>{c.riskScore}</span>
                  </button>
                );
              })
            ) : (
              clauses.map((c) => {
                const config = clauseTypeConfig[c.type] || clauseTypeConfig.verified;
                return (
                  <button
                    key={c.id}
                    className={`clause-tab ${selectedClause?.id === c.id ? 'clause-tab-active' : ''}`}
                    style={selectedClause?.id === c.id ? { borderColor: config.border, background: config.bg } : {}}
                    onClick={() => setSelectedClause(c)}
                  >
                    <config.icon size={12} style={{ color: config.color, flexShrink: 0 }} />
                    <span className="clause-tab-title">{c.title}</span>
                    <span className="clause-tab-score" style={{ color: config.color }}>{c.riskScore}</span>
                  </button>
                );
              })
            )}
          </div>

          {/* Selected clause detail */}
          {(() => {
            const activeClause = selectedClause || {
              id: 'demo-1',
              type: 'critical',
              title: 'MAC Clause — Undefined Trigger Events',
              text: '"Material Adverse Change" means any event that the Board determines, in its sole discretion, constitutes a material adverse change with respect to the business, operations, financial condition, properties, or prospects of Client, without limitation.',
              explanation: 'This MAC clause is dangerously broad. The definition of "Material Adverse Change" grants the counterparty unilateral discretion to terminate without any objective standard or threshold. This creates a significant termination risk with no predictability for your client.',
              riskScore: 89,
              suggestedAction: 'Negotiate specific enumerated MAC triggers with objective financial thresholds (e.g., >30% revenue decline, insolvency, regulatory action). Remove "sole discretion" language entirely.',
              evidence: [
                'No objective threshold defined',
                '"Sole discretion" language grants unilateral power',
                'No cure period provided',
                'Compared against 847 similar contracts in DueZero database',
              ],
            };
            const config = clauseTypeConfig[activeClause.type] || clauseTypeConfig.critical;

            return (
              <div className="clause-detail">
                {/* Header */}
                <div className="clause-detail-header" style={{ borderColor: config.border, background: config.bg }}>
                  <div className="clause-detail-title-row">
                    <config.icon size={14} style={{ color: config.color, flexShrink: 0 }} />
                    <span className="clause-detail-title">{activeClause.title}</span>
                  </div>
                  <div className="clause-risk-badge" style={{ background: config.bg, borderColor: config.border }}>
                    <span style={{ color: config.color }}>Risk Score: <strong>{activeClause.riskScore || 89}</strong>/100</span>
                  </div>
                </div>

                {/* Extracted text */}
                <div className="clause-section">
                  <p className="clause-section-label">
                    <FileText size={11} /> Extracted Clause
                  </p>
                  <blockquote className="clause-quote" style={{ borderLeftColor: config.color }}>
                    {activeClause.text || '"Material Adverse Change" means any event that the Board determines, in its sole discretion, constitutes a material adverse change...'}
                    <button className="clause-copy-btn">
                      <Copy size={11} />
                    </button>
                  </blockquote>
                </div>

                {/* AI Explanation */}
                <div className="clause-section">
                  <p className="clause-section-label">
                    <Sparkles size={11} /> AI Explanation
                  </p>
                  <p className="clause-explanation">
                    {activeClause.explanation || 'This clause contains significant legal risk. The broad discretion granted to the counterparty creates unpredictability and potential for abuse. Standard market practice requires objective thresholds and defined trigger events.'}
                  </p>
                </div>

                {/* Evidence */}
                <div className="clause-section">
                  <p className="clause-section-label">
                    <Shield size={11} /> Evidence
                  </p>
                  <ul className="clause-evidence-list">
                    {(activeClause.evidence || [
                      'No objective threshold defined',
                      '"Sole discretion" grants unilateral power',
                      'No cure period provided',
                      'Flagged against 847 similar contracts',
                    ]).map((e, i) => (
                      <li key={i} className="clause-evidence-item">
                        <span className="clause-evidence-dot" style={{ background: config.color }} />
                        {e}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Suggested Action */}
                <div className="clause-section clause-action-section">
                  <p className="clause-section-label">
                    <CheckCircle size={11} /> Suggested Action
                  </p>
                  <div className="clause-action-box">
                    <p className="clause-action-text">
                      {activeClause.suggestedAction || 'Negotiate specific enumerated MAC triggers with objective financial thresholds. Remove "sole discretion" language and add a 30-day cure period.'}
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="clause-actions">
                  <button className="clause-action-btn clause-action-approve">
                    <CheckCircle size={13} /> Accept Finding
                  </button>
                  <button className="clause-action-btn clause-action-flag">
                    <AlertTriangle size={13} /> Escalate
                  </button>
                  <button className="clause-action-btn">
                    <ExternalLink size={13} /> Add to Report
                  </button>
                </div>
              </div>
            );
          })()}
        </div>

      </div>
    </AppShell>
  );
}
