import React from 'react';
import Sidebar from './Sidebar';
import TopBar from './TopBar';
import './AppShell.css';

export default function AppShell({ children, topBarProps = {} }) {
  return (
    <div className="app-shell">
      <Sidebar />
      <div className="app-main">
        <TopBar {...topBarProps} />
        <main className="app-content">
          {children}
        </main>
      </div>
    </div>
  );
}
