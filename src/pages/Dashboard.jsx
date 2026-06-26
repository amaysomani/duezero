import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Plus, ArrowRight, TrendingUp, AlertTriangle,
  FileText, CheckCircle, Clock, Upload, BarChart3
} from 'lucide-react';
import AppShell from '../components/layout/AppShell';
import AnimatedCounter from '../components/ui/AnimatedCounter';
import ProgressBar from '../components/ui/ProgressBar';
import Badge from '../components/ui/Badge';
import RiskScore from '../components/ui/RiskScore';
import { projects, activities, riskHeatmapData, statsData } from '../data/mockData';
import './Dashboard.css';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell
} from 'recharts';

const statCards = [
  { label: 'Documents Reviewed', value: statsData.documentsReviewed, icon: FileText,    suffix: '', color: 'var(--accent)',  to: '/project/techcorp-ma' },
  { label: 'Issues Flagged',      value: statsData.issuesFlagged,     icon: AlertTriangle,suffix: '', color: 'var(--danger)', to: '/project/techcorp-ma/document/techcorp-ma-doc-2' },
  { label: 'Reports Generated',   value: statsData.reportsGenerated,  icon: BarChart3,   suffix: '', color: 'var(--info)',   to: '/project/techcorp-ma/report' },
  { label: 'Active Projects',     value: statsData.activeProjects,    icon: TrendingUp,  suffix: '', color: 'var(--success)',to: '/projects' },
];

const activityIcons = {
  flagged: <AlertTriangle size={14} />,
  upload: <Upload size={14} />,
  complete: <CheckCircle size={14} />,
  report: <FileText size={14} />,
};

const activityColors = {
  flagged: 'var(--danger)',
  upload: 'var(--accent)',
  complete: 'var(--success)',
  report: 'var(--info)',
};

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="chart-tooltip">
        <p className="chart-tooltip-label">{label}</p>
        {payload.map((p, i) => (
          <p key={i} style={{ color: p.fill }}>
            {p.name}: <strong>{p.value}</strong>
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <AppShell topBarProps={{ breadcrumbs: ['Dashboard'] }}>
      <div className="dashboard">

        {/* Header */}
        <div className="dashboard-header">
          <div>
            <h1 className="dashboard-title">Good morning, Saket.</h1>
            <p className="dashboard-sub">Here's an overview of your active due diligence matters.</p>
          </div>
          <button className="dashboard-new-btn" onClick={() => navigate('/project/techcorp-ma')}>
            <Plus size={16} />
            Open Project
          </button>
        </div>

        {/* Stat Cards */}
        <div className="stats-grid">
          {statCards.map(({ label, value, icon: Icon, suffix, color, to }, i) => (
            <div
              key={i}
              className="stat-card-dash"
              style={{ cursor: 'pointer' }}
              onClick={() => navigate(to || '/dashboard')}
            >
              <div className="stat-card-left">
                <p className="stat-card-label">{label}</p>
                <p className="stat-card-value" style={{ color }}>
                  <AnimatedCounter target={value} suffix={suffix} />
                </p>
              </div>
              <div className="stat-card-icon" style={{ background: `${color}15`, borderColor: `${color}30` }}>
                <Icon size={20} style={{ color }} />
              </div>
            </div>
          ))}
        </div>

        {/* Main grid */}
        <div className="dashboard-grid">

          {/* Recent Projects */}
          <div className="dashboard-section projects-section">
            <div className="section-row">
              <h2 className="section-heading">Recent Projects</h2>
              <button className="section-link" onClick={() => navigate('/projects')}>View all <ArrowRight size={13} /></button>
            </div>
            <div className="projects-list">
              {projects.map((p) => (
                <div key={p.id} className="project-row" onClick={() => navigate(`/project/${p.id}`)}>
                  <div className="project-row-left">
                    <div className="project-row-icon" style={{
                      background: p.riskLevel === 'high' ? 'var(--danger-dim)' :
                        p.riskLevel === 'medium' ? 'var(--warning-dim)' : 'var(--success-dim)'
                    }}>
                      <FileText size={16} style={{
                        color: p.riskLevel === 'high' ? 'var(--danger)' :
                          p.riskLevel === 'medium' ? 'var(--warning)' : 'var(--success)'
                      }} />
                    </div>
                    <div className="project-row-info">
                      <div className="project-row-name-row">
                        <span className="project-row-name">{p.name}</span>
                        <Badge variant={p.riskLevel} size="sm">{p.riskLevel} risk</Badge>
                      </div>
                      <span className="project-row-meta">{p.type} · {p.dealSize} · Due {p.deadline}</span>
                      <ProgressBar value={p.progress} height={3} />
                    </div>
                  </div>
                  <div className="project-row-right">
                    <RiskScore score={p.riskScore} size="sm" showLabel={false} />
                    <div className="project-row-stats">
                      <span className="project-stat">{p.documentsReviewed}<span className="project-stat-label"> reviewed</span></span>
                      <span className="project-stat project-stat-flagged">{p.documentsFlagged}<span className="project-stat-label"> flagged</span></span>
                    </div>
                    <ArrowRight size={14} className="project-row-arrow" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Activity Feed */}
          <div className="dashboard-section activity-section">
            <div className="section-row">
              <h2 className="section-heading">Activity</h2>
              <span className="activity-live">
                <span className="live-dot" />
                Live
              </span>
            </div>
            <div className="activity-list">
              {activities.map((a) => (
                <div
                  key={a.id}
                  className="activity-item"
                  style={{ cursor: 'pointer' }}
                  onClick={() => {
                    const proj = projects.find(p => p.name === a.project);
                    if (proj) navigate(`/project/${proj.id}`);
                  }}
                >
                  <div className="activity-icon" style={{
                    background: `${activityColors[a.type]}15`,
                    color: activityColors[a.type],
                  }}>
                    {activityIcons[a.type]}
                  </div>
                  <div className="activity-content">
                    <p className="activity-message">{a.message}</p>
                    <p className="activity-meta">{a.project} · {a.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Risk Heatmap */}
          <div className="dashboard-section heatmap-section">
            <div className="section-row">
              <h2 className="section-heading">Risk Distribution</h2>
              <div className="chart-legend">
                <span className="legend-item legend-critical">Critical</span>
                <span className="legend-item legend-major">Major</span>
                <span className="legend-item legend-minor">Minor</span>
              </div>
            </div>
            <div className="chart-wrap">
              <ResponsiveContainer width="100%" height={240}>
                <BarChart data={riskHeatmapData} barGap={3} barCategoryGap="30%">
                  <XAxis
                    dataKey="category"
                    tick={{ fill: 'var(--text-muted)', fontSize: 11, fontFamily: 'Inter' }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fill: 'var(--text-muted)', fontSize: 11, fontFamily: 'Inter' }}
                    axisLine={false}
                    tickLine={false}
                    width={20}
                  />
                  <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.02)' }} />
                  <Bar dataKey="critical" name="Critical" fill="var(--danger)" radius={[3, 3, 0, 0]} />
                  <Bar dataKey="major" name="Major" fill="var(--warning)" radius={[3, 3, 0, 0]} />
                  <Bar dataKey="minor" name="Minor" fill="var(--info)" radius={[3, 3, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Pending Reviews */}
          <div className="dashboard-section pending-section">
            <div className="section-row">
              <h2 className="section-heading">Pending Reviews</h2>
              <Badge variant="warning" size="sm">7 pending</Badge>
            </div>
            <div className="pending-list">
              {[
                { doc: 'Master_Services_Agreement_v4.pdf', projectId: 'techcorp-ma',     docId: 'techcorp-ma-doc-2',  project: 'TechCorp Acquisition', due: 'Today',    priority: 'critical' },
                { doc: 'Cap_Table_v12.xlsx',                projectId: 'techcorp-ma',     docId: 'techcorp-ma-doc-6',  project: 'TechCorp Acquisition', due: 'Today',    priority: 'critical' },
                { doc: 'CEO_Employment_Agreement.pdf',      projectId: 'techcorp-ma',     docId: 'techcorp-ma-doc-17', project: 'TechCorp Acquisition', due: 'Tomorrow', priority: 'major'    },
                { doc: 'SOC2_Type1_Report.pdf',             projectId: 'atlas-series-b',  docId: 'atlas-series-b-doc-1',project: 'Atlas Series B',       due: 'Jun 28',  priority: 'minor'    },
                { doc: 'HQ_Lease_Agreement.pdf',            projectId: 'harbor-realestate',docId: 'harbor-realestate-doc-1', project: 'Harbor RE Portfolio', due: 'Jun 29', priority: 'major' },
                { doc: 'Litigation_Schedule_2026.pdf',      projectId: 'harbor-realestate',docId: 'harbor-realestate-doc-1', project: 'Harbor RE Portfolio', due: 'Jun 30', priority: 'critical' },
                { doc: 'Tax_Returns_2022_2024.pdf',         projectId: 'techcorp-ma',     docId: 'techcorp-ma-doc-22', project: 'TechCorp Acquisition', due: 'Jul 1',   priority: 'major'    },
              ].map((item, i) => (
                <div
                  key={i}
                  className="pending-item"
                  onClick={() => navigate(`/project/${item.projectId}/document/${item.docId}`)}
                >
                  <div className="pending-item-left">
                    <Badge variant={item.priority} size="sm">{item.priority}</Badge>
                    <div className="pending-item-info">
                      <span className="pending-item-name">{item.doc}</span>
                      <span className="pending-item-project">{item.project}</span>
                    </div>
                  </div>
                  <div className="pending-item-right">
                    <span className="pending-due">
                      <Clock size={11} />
                      {item.due}
                    </span>
                    <ArrowRight size={12} className="pending-arrow" />
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </AppShell>
  );
}
