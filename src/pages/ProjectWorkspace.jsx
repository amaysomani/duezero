import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ChevronRight, ChevronDown, Building2, FileText, Users,
  Home, Shield, Calculator, Gavel, Lightbulb, Search,
  Upload, Filter, AlertTriangle, CheckCircle, Clock,
  XCircle, BarChart3, FileWarning, ArrowRight, Eye
} from 'lucide-react';
import AppShell from '../components/layout/AppShell';
import Badge from '../components/ui/Badge';
import ProgressBar from '../components/ui/ProgressBar';
import RiskScore from '../components/ui/RiskScore';
import { projects, folderStructure } from '../data/mockData';
import './ProjectWorkspace.css';

const folderIcons = {
  building: Building2, 'file-text': FileText, users: Users,
  home: Home, shield: Shield, calculator: Calculator,
  gavel: Gavel, lightbulb: Lightbulb,
};

const statusConfig = {
  verified: { label: 'Verified', color: 'var(--success)', icon: CheckCircle },
  reviewed: { label: 'Reviewed', color: 'var(--info)', icon: CheckCircle },
  parsing: { label: 'Parsing', color: 'var(--accent)', icon: Clock },
  flagged: { label: 'Flagged', color: 'var(--danger)', icon: AlertTriangle },
  pending: { label: 'Pending', color: 'var(--text-muted)', icon: Clock },
};

export default function ProjectWorkspace() {
  const { id } = useParams();
  const navigate = useNavigate();
  const project = projects.find(p => p.id === id) || projects[0];

  const [expandedFolders, setExpandedFolders] = useState(['corporate', 'contracts']);
  const [selectedFolder, setSelectedFolder] = useState('contracts');
  const [searchDoc, setSearchDoc] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const toggleFolder = (folderId) => {
    setExpandedFolders(prev =>
      prev.includes(folderId) ? prev.filter(f => f !== folderId) : [...prev, folderId]
    );
  };

  const selectFolder = (folderId) => {
    setSelectedFolder(folderId);
    if (!expandedFolders.includes(folderId)) {
      setExpandedFolders(prev => [...prev, folderId]);
    }
  };

  const filteredDocs = project.documents.filter(doc => {
    const categoryMatch = selectedFolder === 'all' ||
      doc.category.toLowerCase() === selectedFolder.toLowerCase() ||
      folderStructure.find(f => f.id === selectedFolder)?.label.toLowerCase() === doc.category.toLowerCase() ||
      folderStructure.find(f => f.children?.some(c => c.id === selectedFolder))?.label.toLowerCase() === doc.category.toLowerCase();
    const searchMatch = doc.name.toLowerCase().includes(searchDoc.toLowerCase());
    const statusMatch = filterStatus === 'all' || doc.status === filterStatus;
    return categoryMatch && searchMatch && statusMatch;
  });

  const displayedDocs = filteredDocs.slice(0, 20);

  return (
    <AppShell topBarProps={{
      breadcrumbs: ['Projects', project.name],
      actions: (
        <div style={{ display: 'flex', gap: '8px' }}>
          <button className="ws-action-btn" onClick={() => navigate(`/project/${id}/report`)}>
            <BarChart3 size={14} /> Generate Report
          </button>
          <button className="ws-action-btn ws-action-primary">
            <Upload size={14} /> Upload Docs
          </button>
        </div>
      )
    }}>
      <div className="workspace">

        {/* Left panel — Folder Tree */}
        <div className="ws-left">
          <div className="ws-panel-header">
            <span className="ws-panel-title">Data Room</span>
            <button className="ws-panel-icon-btn">
              <Upload size={13} />
            </button>
          </div>

          {/* All documents */}
          <button
            className={`folder-item folder-all ${selectedFolder === 'all' ? 'folder-item-active' : ''}`}
            onClick={() => selectFolder('all')}
          >
            <FileText size={14} className="folder-item-icon" />
            <span>All Documents</span>
            <span className="folder-count">{project.documentsTotal}</span>
          </button>

          <div className="folder-divider" />

          {folderStructure.map((folder) => {
            const Icon = folderIcons[folder.icon] || FileText;
            const isExpanded = expandedFolders.includes(folder.id);
            const isActive = selectedFolder === folder.id;
            const catData = Object.entries(project.categories).find(
              ([k]) => k.toLowerCase() === folder.id.toLowerCase().replace(/[^a-z]/g, '')
            )?.[1];

            return (
              <div key={folder.id} className="folder-group">
                <button
                  className={`folder-item ${isActive ? 'folder-item-active' : ''}`}
                  onClick={() => { selectFolder(folder.id); toggleFolder(folder.id); }}
                >
                  <span
                    className="folder-expand-icon"
                    onClick={(e) => { e.stopPropagation(); toggleFolder(folder.id); }}
                  >
                    {isExpanded ? <ChevronDown size={12} /> : <ChevronRight size={12} />}
                  </span>
                  <Icon size={14} className="folder-item-icon" style={{ color: folder.color }} />
                  <span className="folder-item-label">{folder.label}</span>
                  <div className="folder-item-right">
                    {catData?.flagged > 0 && (
                      <span className="folder-flag-badge">{catData.flagged}</span>
                    )}
                    <span className="folder-count">{catData?.total || 0}</span>
                  </div>
                </button>

                {isExpanded && folder.children && (
                  <div className="folder-children">
                    {folder.children.map(child => (
                      <button
                        key={child.id}
                        className={`folder-child-item ${selectedFolder === child.id ? 'folder-item-active' : ''}`}
                        onClick={() => selectFolder(child.id)}
                      >
                        {child.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Center panel — Document List */}
        <div className="ws-center">
          <div className="ws-center-header">
            <div className="ws-center-title-row">
              <h2 className="ws-center-title">
                {folderStructure.find(f => f.id === selectedFolder)?.label || 'All Documents'}
              </h2>
              <span className="ws-center-count">{filteredDocs.length} documents</span>
            </div>

            {/* Search & Filter */}
            <div className="ws-filters">
              <div className="ws-search">
                <Search size={13} />
                <input
                  value={searchDoc}
                  onChange={e => setSearchDoc(e.target.value)}
                  placeholder="Search documents..."
                  className="ws-search-input"
                />
              </div>
              <div className="ws-status-filters">
                {['all', 'flagged', 'verified', 'reviewed', 'parsing', 'pending'].map(s => (
                  <button
                    key={s}
                    className={`ws-status-pill ${filterStatus === s ? 'ws-status-pill-active' : ''}`}
                    onClick={() => setFilterStatus(s)}
                  >
                    {s === 'all' ? 'All' : s.charAt(0).toUpperCase() + s.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Progress bar */}
          <div className="ws-progress-row">
            <span className="ws-progress-label">
              <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{project.documentsReviewed}</span>
              {' '}of {project.documentsTotal} reviewed
            </span>
            <ProgressBar value={project.documentsReviewed} max={project.documentsTotal} height={3} />
            <span className="ws-progress-pct">{Math.round((project.documentsReviewed / project.documentsTotal) * 100)}%</span>
          </div>

          {/* Document list */}
          <div className="doc-list">
            {displayedDocs.map((doc) => {
              const StatusIcon = statusConfig[doc.status]?.icon || Clock;
              return (
                <div
                  key={doc.id}
                  className="doc-item"
                  onClick={() => navigate(`/project/${id}/document/${doc.id}`)}
                >
                  <div className="doc-item-left">
                    <div className={`doc-status-icon doc-status-${doc.status}`}>
                      <StatusIcon size={13} />
                    </div>
                    <div className="doc-info">
                      <span className="doc-name">{doc.name}</span>
                      <div className="doc-meta">
                        <span>{doc.category}</span>
                        <span className="doc-meta-dot">·</span>
                        <span>{doc.pages} pages</span>
                        <span className="doc-meta-dot">·</span>
                        <span>{doc.size}</span>
                      </div>
                    </div>
                  </div>
                  <div className="doc-item-right">
                    {doc.status === 'flagged' && (
                      <span className="doc-risk-chip">{doc.riskScore}</span>
                    )}
                    <Badge variant={doc.status} size="sm">{statusConfig[doc.status]?.label}</Badge>
                    <button className="doc-view-btn" onClick={e => { e.stopPropagation(); navigate(`/project/${id}/document/${doc.id}`); }}>
                      <Eye size={12} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right panel — Risk Summary */}
        <div className="ws-right">
          <div className="ws-panel-header">
            <span className="ws-panel-title">Risk Overview</span>
          </div>

          {/* Overall risk score */}
          <div className="risk-overview-card">
            <RiskScore score={project.riskScore} size="lg" />
            <div className="risk-overview-divider" />
            <div className="risk-overview-stats">
              <div className="risk-stat">
                <span className="risk-stat-val" style={{ color: 'var(--danger)' }}>{project.criticalFindings.length}</span>
                <span className="risk-stat-label">Critical</span>
              </div>
              <div className="risk-stat">
                <span className="risk-stat-val" style={{ color: 'var(--warning)' }}>{project.majorFindings.length}</span>
                <span className="risk-stat-label">Major</span>
              </div>
              <div className="risk-stat">
                <span className="risk-stat-val" style={{ color: 'var(--info)' }}>{project.minorFindings.length}</span>
                <span className="risk-stat-label">Minor</span>
              </div>
            </div>
          </div>

          {/* Critical Findings */}
          <div className="risk-panel-section">
            <div className="risk-section-header">
              <span className="risk-section-title">Critical Findings</span>
              <Badge variant="critical" size="sm">{project.criticalFindings.length}</Badge>
            </div>
            {project.criticalFindings.length === 0 ? (
              <div className="risk-empty">
                <CheckCircle size={16} style={{ color: 'var(--success)' }} />
                <span>No critical findings</span>
              </div>
            ) : (
              <div className="risk-findings-list">
                {project.criticalFindings.slice(0, 3).map((f) => (
                  <div
                    key={f.id}
                    className="risk-finding-item risk-finding-critical"
                    onClick={() => navigate(`/project/${id}/document/${project.documents.find(d => d.name === f.document)?.id || project.documents[1]?.id}`)}
                  >
                    <div className="risk-finding-header">
                      <AlertTriangle size={12} style={{ color: 'var(--danger)', flexShrink: 0 }} />
                      <span className="risk-finding-title">{f.title}</span>
                    </div>
                    <span className="risk-finding-doc">{f.document}</span>
                    <div className="risk-finding-score">
                      <div className="risk-score-bar">
                        <div className="risk-score-fill" style={{ width: `${f.riskScore}%`, background: 'var(--danger)' }} />
                      </div>
                      <span style={{ color: 'var(--danger)', fontSize: '11px', fontWeight: 700 }}>{f.riskScore}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Missing Documents */}
          <div className="risk-panel-section">
            <div className="risk-section-header">
              <span className="risk-section-title">Missing Documents</span>
              <Badge variant="warning" size="sm">{project.missingDocuments.length}</Badge>
            </div>
            {project.missingDocuments.length === 0 ? (
              <div className="risk-empty">
                <CheckCircle size={16} style={{ color: 'var(--success)' }} />
                <span>All documents received</span>
              </div>
            ) : (
              <div className="risk-missing-list">
                {project.missingDocuments.slice(0, 4).map((m, i) => (
                  <div key={i} className="risk-missing-item">
                    <FileWarning size={12} style={{ color: m.priority === 'high' ? 'var(--danger)' : 'var(--warning)', flexShrink: 0 }} />
                    <div className="risk-missing-info">
                      <span className="risk-missing-name">{m.name}</span>
                      <span className="risk-missing-cat">{m.category}</span>
                    </div>
                    <Badge variant={m.priority} size="sm">{m.priority}</Badge>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Recommendations */}
          <div className="risk-panel-section">
            <div className="risk-section-header">
              <span className="risk-section-title">Top Recommendations</span>
            </div>
            <div className="recommendations-list">
              {project.criticalFindings.slice(0, 2).map((f, i) => (
                <div key={i} className="recommendation-item">
                  <span className="recommendation-num">{i + 1}</span>
                  <p className="recommendation-text">{f.suggestedAction}</p>
                </div>
              ))}
              {project.criticalFindings.length === 0 && (
                <div className="risk-empty">
                  <CheckCircle size={16} style={{ color: 'var(--success)' }} />
                  <span>No immediate actions required</span>
                </div>
              )}
            </div>
          </div>

          {/* Generate Report CTA */}
          <button
            className="ws-report-btn"
            onClick={() => navigate(`/project/${id}/report`)}
          >
            <BarChart3 size={14} />
            View Full Report
            <ArrowRight size={13} />
          </button>
        </div>

      </div>
    </AppShell>
  );
}
