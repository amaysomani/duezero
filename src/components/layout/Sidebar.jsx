import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, FolderOpen, FileText, BookOpen,
  Users, Settings, ChevronRight, Plus, Zap,
  LogOut, Bell, Command
} from 'lucide-react';
import { UserButton } from '@clerk/clerk-react';
import './Sidebar.css';

const navItems = [
  { label: 'Dashboard', icon: LayoutDashboard, to: '/dashboard' },
  { label: 'Projects', icon: FolderOpen, to: '/projects' },
  { label: 'Data Rooms', icon: FileText, to: '/data-rooms' },
  { label: 'Reports', icon: BookOpen, to: '/reports' },
  { label: 'Templates', icon: Command, to: '/templates' },
  { label: 'Knowledge Base', icon: Zap, to: '/knowledge' },
  { label: 'Partners', icon: Users, to: '/partners' },
];

const recentProjects = [
  { id: 'techcorp-ma', name: 'TechCorp Acquisition', color: '#DC2626' },
  { id: 'atlas-series-b', name: 'Atlas Series B', color: '#16A34A' },
  { id: 'harbor-realestate', name: 'Harbor RE Portfolio', color: '#FACC15' },
];

export default function Sidebar() {
  const navigate = useNavigate();

  return (
    <aside className="sidebar">
      {/* Logo */}
      <div className="sidebar-logo" onClick={() => navigate('/dashboard')}>
        <div className="sidebar-logo-mark">
          <span>D</span>
        </div>
        <div className="sidebar-logo-text">
          <span className="sidebar-logo-name">DueZero</span>
          <span className="sidebar-logo-tagline">AI Due Diligence</span>
        </div>
      </div>

      {/* New Project CTA */}
      <div className="sidebar-cta">
        <button className="sidebar-new-btn" onClick={() => navigate('/dashboard')}>
          <Plus size={14} />
          <span>New Project</span>
        </button>
      </div>

      {/* Divider */}
      <div className="sidebar-divider" />

      {/* Navigation */}
      <nav className="sidebar-nav">
        <p className="sidebar-section-label">Workspace</p>
        {navItems.map(({ label, icon: Icon, to }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) => `sidebar-item ${isActive ? 'sidebar-item-active' : ''}`}
          >
            <Icon size={16} />
            <span>{label}</span>
            {label === 'Projects' && (
              <span className="sidebar-item-badge">3</span>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-divider" />

      {/* Recent Projects */}
      <div className="sidebar-recent">
        <p className="sidebar-section-label">Recent Projects</p>
        {recentProjects.map((p) => (
          <button
            key={p.id}
            className="sidebar-recent-item"
            onClick={() => navigate(`/project/${p.id}`)}
          >
            <span className="sidebar-recent-dot" style={{ background: p.color }} />
            <span className="sidebar-recent-name">{p.name}</span>
            <ChevronRight size={12} className="sidebar-recent-arrow" />
          </button>
        ))}
      </div>

      {/* Bottom */}
      <div className="sidebar-bottom">
        <div className="sidebar-divider" />
        <button className="sidebar-item sidebar-item-notifications">
          <Bell size={16} />
          <span>Notifications</span>
          <span className="sidebar-notif-dot" />
        </button>
        <NavLink
          to="/settings"
          className={({ isActive }) => `sidebar-item ${isActive ? 'sidebar-item-active' : ''}`}
        >
          <Settings size={16} />
          <span>Settings</span>
        </NavLink>
        {/* User */}
        <div className="sidebar-user clerk-sidebar-user">
          <UserButton showName />
        </div>
      </div>
    </aside>
  );
}
