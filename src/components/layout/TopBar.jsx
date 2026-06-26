import React from 'react';
import { Search, HelpCircle, ChevronRight } from 'lucide-react';
import './TopBar.css';

export default function TopBar({ breadcrumbs = [], actions }) {
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
        {/* Search */}
        <div className="topbar-search">
          <Search size={14} className="topbar-search-icon" />
          <input
            className="topbar-search-input"
            placeholder="Search documents, findings..."
          />
          <span className="topbar-search-shortcut">⌘K</span>
        </div>

        {/* Custom actions */}
        {actions}

        {/* Help */}
        <button className="topbar-icon-btn">
          <HelpCircle size={16} />
        </button>
      </div>
    </header>
  );
}
