import React from 'react';
import './styles/globals.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import ProjectWorkspace from './pages/ProjectWorkspace';
import DocumentViewer from './pages/DocumentViewer';
import ReportPage from './pages/ReportPage';
import PlaceholderPage from './pages/PlaceholderPage';

import { SignedIn, SignedOut, RedirectToSignIn } from '@clerk/clerk-react';

const ProtectedRoute = ({ children }) => {
  return (
    <>
      <SignedIn>
        {children}
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  );
};

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route path="/" element={<LandingPage />} />

        {/* App (Protected) */}
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/projects" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/project/:id" element={<ProtectedRoute><ProjectWorkspace /></ProtectedRoute>} />
        <Route path="/project/:id/document/:docId" element={<ProtectedRoute><DocumentViewer /></ProtectedRoute>} />
        <Route path="/project/:id/report" element={<ProtectedRoute><ReportPage /></ProtectedRoute>} />

        {/* Sidebar pages — stub until built */}
        <Route path="/data-rooms"  element={<ProtectedRoute><PlaceholderPage title="Data Rooms"   icon="database"    desc="Manage and organize your virtual data rooms across all active matters." /></ProtectedRoute>} />
        <Route path="/reports"     element={<ProtectedRoute><PlaceholderPage title="Reports"      icon="bar-chart"   desc="View and download all generated due diligence reports." /></ProtectedRoute>} />
        <Route path="/templates"   element={<ProtectedRoute><PlaceholderPage title="Templates"    icon="layout"      desc="Manage due diligence checklists and report templates by deal type." /></ProtectedRoute>} />
        <Route path="/knowledge"   element={<ProtectedRoute><PlaceholderPage title="Knowledge Base" icon="book"      desc="AI-curated legal precedents, playbooks, and clause libraries." /></ProtectedRoute>} />
        <Route path="/partners"    element={<ProtectedRoute><PlaceholderPage title="Partners"     icon="users"       desc="Manage firm partners, collaborators, and external counsel access." /></ProtectedRoute>} />
        <Route path="/settings"    element={<ProtectedRoute><PlaceholderPage title="Settings"     icon="settings"    desc="Account settings, billing, API keys, and team management." /></ProtectedRoute>} />

        {/* Fallback — stay inside the app */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
