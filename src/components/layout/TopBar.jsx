import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, HelpCircle, ChevronRight, Bell, X } from 'lucide-react';
import './TopBar.css';

// Quick-search items across the app
const searchIndex = [
  { label: 'TechCorp Acquisition', sub: 'Project · High Risk', to: '/project/techcorp-ma' },
  { label: 'Atlas Series B',       sub: 'Project · Medium Risk', to: '/project/atlas-series-b' },
  { label: 'Harbor RE Portfolio',  sub: 'Project · Low Risk',    to: '/project/harbor-realestate' },
  { label: 'Master Services Agreement', sub: 'TechCorp Acquisition · Flagged', to: '/project/techcorp-ma/document/techcorp-ma-doc-2' },
  { label: 'TechCorp Due Diligence Report', sub: 'Report',         to: '/project/techcorp-ma/report' },
  { label: 'Dashboard',            sub: 'Page',                    to: '/dashboard' },
  { label: 'Reports',              sub: 'Page',                    to: '/reports' },
  { label: 'Data Rooms',           sub: 'Page',                    to: '/data-rooms' },
  { label: 'Templates',            sub: 'Page',                    to: '/templates' },
  { label: 'Knowledge Base',       sub: 'Page',                    to: '/knowledge' },
  { label: 'Settings',             sub: 'Page',                    to: '/settings' },
];

export default function TopBar({ breadcrumbs = [], actions }) {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [focused, setFocused] = useState(false);

  const results = query.trim().length > 0
    ? searchIndex.filter(item =>
        item.label.toLowerCase().includes(query.toLowerCase()) ||
        item.sub.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  const goTo = (to) => {
    setQuery('');
    setFocused(false);
    navigate(to);
  };

  return (
    <header className="topbar">
      {/* Breadcrumbs */}
      <div className="topbar-breadcrumbs">
        {breadcrumbs.map((crumb, i) => (
          <React.Fragment key={i}>
            {i > 0 && <ChevronRight size={13} className="topbar-sep" />}
            <span className={`topbar-crumb ${i === breadcrumbs.length - 1 ? 'topbar-crumb-active' : ''}`}>
              {crumb}
            </span>
          </React.Fragment>
        ))}
      </div>

      {/* Right side */}
      <div className="topbar-right">

        {/* Search with dropdown */}
        <div className="topbar-search-wrap">
          <div className={`topbar-search ${focused ? 'topbar-search-focused' : ''}`}>
            <Search size={14} className="topbar-search-icon" />
            <input
              className="topbar-search-input"
              placeholder="Search documents, findings..."
              value={query}
              onChange={e => setQuery(e.target.value)}
              onFocus={() => setFocused(true)}
              onBlur={() => setTimeout(() => setFocused(false), 150)}
              onKeyDown={e => {
                if (e.key === 'Escape') { setQuery(''); setFocused(false); }
                if (e.key === 'Enter' && results.length > 0) goTo(results[0].to);
              }}
            />
            {query ? (
              <button className="topbar-search-clear" onClick={() => setQuery('')}><X size={12} /></button>
            ) : (
              <span className="topbar-search-shortcut">⌘K</span>
            )}
          </div>

          {/* Dropdown results */}
          {focused && results.length > 0 && (
            <div className="topbar-search-dropdown">
              {results.map((r, i) => (
                <button key={i} className="topbar-search-result" onMouseDown={() => goTo(r.to)}>
                  <span className="topbar-result-label">{r.label}</span>
                  <span className="topbar-result-sub">{r.sub}</span>
                </button>
              ))}
            </div>
          )}
          {focused && query.trim().length > 0 && results.length === 0 && (
            <div className="topbar-search-dropdown">
              <div className="topbar-search-empty">No results for "{query}"</div>
            </div>
          )}
        </div>

        {/* Custom actions */}
        {actions}

        {/* Notification bell */}
        <button
          className="topbar-icon-btn topbar-notif-btn"
          onClick={() => navigate('/dashboard')}
          title="Notifications"
        >
          <Bell size={16} />
          <span className="topbar-notif-badge" />
        </button>

        {/* Help */}
        <button className="topbar-icon-btn" title="Help">
          <HelpCircle size={16} />
        </button>
      </div>
    </header>
  );
}
