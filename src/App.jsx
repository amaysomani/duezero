import React from 'react';
import './styles/globals.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import ProjectWorkspace from './pages/ProjectWorkspace';
import DocumentViewer from './pages/DocumentViewer';
import ReportPage from './pages/ReportPage';
import PlaceholderPage from './pages/PlaceholderPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route path="/" element={<LandingPage />} />

        {/* App */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/projects" element={<Dashboard />} />
        <Route path="/project/:id" element={<ProjectWorkspace />} />
        <Route path="/project/:id/document/:docId" element={<DocumentViewer />} />
        <Route path="/project/:id/report" element={<ReportPage />} />

        {/* Sidebar pages — stub until built */}
        <Route path="/data-rooms"  element={<PlaceholderPage title="Data Rooms"   icon="database"    desc="Manage and organize your virtual data rooms across all active matters." />} />
        <Route path="/reports"     element={<PlaceholderPage title="Reports"      icon="bar-chart"   desc="View and download all generated due diligence reports." />} />
        <Route path="/templates"   element={<PlaceholderPage title="Templates"    icon="layout"      desc="Manage due diligence checklists and report templates by deal type." />} />
        <Route path="/knowledge"   element={<PlaceholderPage title="Knowledge Base" icon="book"      desc="AI-curated legal precedents, playbooks, and clause libraries." />} />
        <Route path="/partners"    element={<PlaceholderPage title="Partners"     icon="users"       desc="Manage firm partners, collaborators, and external counsel access." />} />
        <Route path="/settings"    element={<PlaceholderPage title="Settings"     icon="settings"    desc="Account settings, billing, API keys, and team management." />} />

        {/* Fallback — stay inside the app */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
