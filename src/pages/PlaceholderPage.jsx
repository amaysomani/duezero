import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Database, BarChart3, Layout, Book, Users, Settings,
  ArrowRight, Plus, Sparkles
} from 'lucide-react';
import AppShell from '../components/layout/AppShell';
import './PlaceholderPage.css';

const iconMap = {
  database: Database,
  'bar-chart': BarChart3,
  layout: Layout,
  book: Book,
  users: Users,
  settings: Settings,
};

const comingSoonFeatures = {
  'Data Rooms': [
    'Drag-and-drop multi-file upload',
    'Automatic folder categorization',
    'Access control & watermarking',
    'Version history & audit trail',
  ],
  'Reports': [
    'All generated reports in one place',
    'Filter by project, date, risk level',
    'Batch download PDF / DOCX',
    'Report comparison across deals',
  ],
  'Templates': [
    'M&A, PE, VC, Real Estate templates',
    'Custom checklist builder',
    'Clause library management',
    'Jurisdiction-specific templates',
  ],
  'Knowledge Base': [
    'AI-curated legal precedent library',
    'Deal-type playbooks',
    'Clause risk benchmarking',
    'Regulatory update feed',
  ],
  'Partners': [
    'Invite and manage firm members',
    'External counsel access control',
    'Role-based permissions',
    'Activity and audit logs',
  ],
  'Settings': [
    'Account and billing management',
    'API key management',
    'SSO and SAML configuration',
    'White-label report branding',
  ],
};

export default function PlaceholderPage({ title, icon, desc }) {
  const navigate = useNavigate();
  const Icon = iconMap[icon] || Settings;
  const features = comingSoonFeatures[title] || [];

  return (
    <AppShell topBarProps={{ breadcrumbs: [title] }}>
      <div className="placeholder-page">
        <div className="placeholder-content">

          {/* Icon */}
          <div className="placeholder-icon">
            <Icon size={28} />
          </div>

          {/* Badge */}
          <div className="placeholder-badge">
            <Sparkles size={12} />
            Coming Soon
          </div>

          {/* Title */}
          <h1 className="placeholder-title">{title}</h1>
          <p className="placeholder-desc">{desc}</p>

          {/* Feature list */}
          {features.length > 0 && (
            <div className="placeholder-features">
              <p className="placeholder-features-label">What's being built</p>
              <ul className="placeholder-feature-list">
                {features.map((f, i) => (
                  <li key={i} className="placeholder-feature-item">
                    <span className="placeholder-feature-dot" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* CTA */}
          <div className="placeholder-actions">
            <button
              className="placeholder-btn-primary"
              onClick={() => navigate('/dashboard')}
            >
              Go to Dashboard
              <ArrowRight size={15} />
            </button>
            <button
              className="placeholder-btn-secondary"
              onClick={() => navigate('/project/techcorp-ma')}
            >
              <Plus size={14} />
              Open Active Project
            </button>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
