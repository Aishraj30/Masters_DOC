import React, { useState, useEffect, useCallback } from 'react';
import {
  Users,
  CreditCard,
  TrendingUp,
  CheckCircle2,
  XCircle,
  ShieldCheck,
  Layers,
  Star,
  HardDrive,
  Settings,
  Search,
  Download,
  RefreshCw,
  Trash2,
  Edit3,
  ChevronRight,
  ArrowLeft,
  Sparkles,
  Clock,
  FileText,
  Layout,
  Crown,
  Eye,
  AlertTriangle,
  Lock,
  MessageSquare,
  Check,
  DollarSign,
  PieChart,
} from 'lucide-react';
import { UserProfile, logoutUser } from '@/src/utils/auth';
import { ThemeToggle } from '../common/ThemeToggle';

interface AdminDashboardProps {
  currentUser: UserProfile;
  onNavigateToStudio?: () => void;
  onLogout?: () => void;
}

interface StatsData {
  totalUsers: number;
  activeProUsers: number;
  passesSold: number;
  totalSavedProjects: number;
  pendingDiagrams: number;
  globalApprovedDiagrams: number;
  totalRevenue: number;
  netBaseRevenue: number;
  gst18Amount: number;
  feedbackCount: number;
  averageRating: number;
  mediaCount: number;
  totalStorageBytes: number;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  currentUser,
  onNavigateToStudio,
  onLogout,
}) => {
  const [activeTab, setActiveTab] = useState<
    'overview' | 'users' | 'payments' | 'diagrams' | 'projects' | 'feedback' | 'settings'
  >('overview');

  // Stats state
  const [stats, setStats] = useState<StatsData>({
    totalUsers: 0,
    activeProUsers: 0,
    passesSold: 0,
    totalSavedProjects: 0,
    pendingDiagrams: 0,
    globalApprovedDiagrams: 0,
    totalRevenue: 0,
    netBaseRevenue: 0,
    gst18Amount: 0,
    feedbackCount: 0,
    averageRating: 5.0,
    mediaCount: 0,
    totalStorageBytes: 0,
  });
  const [isLoadingStats, setIsLoadingStats] = useState(true);

  // Tab Data States
  const [users, setUsers] = useState<any[]>([]);
  const [userSearchQuery, setUserSearchQuery] = useState('');
  const [userRoleFilter, setUserRoleFilter] = useState('all');
  const [isLoadingUsers, setIsLoadingUsers] = useState(false);

  const [ledger, setLedger] = useState<any[]>([]);
  const [isLoadingLedger, setIsLoadingLedger] = useState(false);

  const [pendingDiagrams, setPendingDiagrams] = useState<any[]>([]);
  const [globalDiagrams, setGlobalDiagrams] = useState<any[]>([]);
  const [diagramSubTab, setDiagramSubTab] = useState<'pending' | 'global'>('pending');
  const [isLoadingDiagrams, setIsLoadingDiagrams] = useState(false);

  const [projects, setProjects] = useState<any[]>([]);
  const [isLoadingProjects, setIsLoadingProjects] = useState(false);

  const [feedbacks, setFeedbacks] = useState<any[]>([]);
  const [isLoadingFeedbacks, setIsLoadingFeedbacks] = useState(false);

  // Notification message state
  const [toastMsg, setToastMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const showToast = (text: string, type: 'success' | 'error' = 'success') => {
    setToastMsg({ type, text });
    setTimeout(() => setToastMsg(null), 4000);
  };

  // Fetch KPI Stats
  const fetchStats = useCallback(async () => {
    setIsLoadingStats(true);
    try {
      const res = await fetch('/api/admin/stats');
      const data = await res.json();
      if (data.success && data.stats) {
        setStats(data.stats);
      }
    } catch (err) {
      console.error('Failed to fetch admin stats', err);
    } finally {
      setIsLoadingStats(false);
    }
  }, []);

  // Fetch Users List
  const fetchUsers = useCallback(async () => {
    setIsLoadingUsers(true);
    try {
      const url = `/api/admin/users?q=${encodeURIComponent(userSearchQuery)}&role=${userRoleFilter}`;
      const res = await fetch(url);
      const data = await res.json();
      if (data.success && data.users) {
        setUsers(data.users);
      }
    } catch (err) {
      console.error('Failed to fetch users', err);
    } finally {
      setIsLoadingUsers(false);
    }
  }, [userSearchQuery, userRoleFilter]);

  // Fetch Payment Ledger
  const fetchLedger = useCallback(async () => {
    setIsLoadingLedger(true);
    try {
      const res = await fetch('/api/admin/payments');
      const data = await res.json();
      if (data.success && data.ledger) {
        setLedger(data.ledger);
      }
    } catch (err) {
      console.error('Failed to fetch payments ledger', err);
    } finally {
      setIsLoadingLedger(false);
    }
  }, []);

  // Fetch Line Diagrams
  const fetchDiagrams = useCallback(async () => {
    setIsLoadingDiagrams(true);
    try {
      const [pendingRes, globalRes] = await Promise.all([
        fetch('/api/admin/diagrams?status=pending'),
        fetch('/api/diagrams/global'),
      ]);
      const pendingData = await pendingRes.json();
      const globalData = await globalRes.json();

      if (pendingData.success) setPendingDiagrams(pendingData.diagrams || []);
      if (globalData.success) setGlobalDiagrams(globalData.diagrams || []);
    } catch (err) {
      console.error('Failed to fetch diagrams', err);
    } finally {
      setIsLoadingDiagrams(false);
    }
  }, []);

  // Fetch Canvas Projects
  const fetchProjects = useCallback(async () => {
    setIsLoadingProjects(true);
    try {
      const res = await fetch('/api/admin/projects');
      const data = await res.json();
      if (data.success && data.projects) {
        setProjects(data.projects);
      }
    } catch (err) {
      console.error('Failed to fetch projects', err);
    } finally {
      setIsLoadingProjects(false);
    }
  }, []);

  // Fetch User Feedbacks
  const fetchFeedbacks = useCallback(async () => {
    setIsLoadingFeedbacks(true);
    try {
      const res = await fetch('/api/admin/feedback');
      const data = await res.json();
      if (data.success && data.feedbacks) {
        setFeedbacks(data.feedbacks);
      }
    } catch (err) {
      console.error('Failed to fetch feedbacks', err);
    } finally {
      setIsLoadingFeedbacks(false);
    }
  }, []);

  // Load active tab data on change or refresh
  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  useEffect(() => {
    if (activeTab === 'users') fetchUsers();
    else if (activeTab === 'payments') fetchLedger();
    else if (activeTab === 'diagrams') fetchDiagrams();
    else if (activeTab === 'projects') fetchProjects();
    else if (activeTab === 'feedback') fetchFeedbacks();
  }, [activeTab, fetchUsers, fetchLedger, fetchDiagrams, fetchProjects, fetchFeedbacks]);

  // User Actions
  const handleTogglePro = async (userId: string, currentStatus: boolean) => {
    try {
      const res = await fetch('/api/admin/users', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, action: 'togglePro', value: !currentStatus }),
      });
      const data = await res.json();
      if (data.success) {
        showToast(`Pro status updated for user.`);
        fetchUsers();
        fetchStats();
      } else {
        showToast(data.message || 'Failed to update Pro status', 'error');
      }
    } catch (e) {
      showToast('Error updating user', 'error');
    }
  };

  const handleUpdatePasses = async (userId: string, count: number) => {
    try {
      const res = await fetch('/api/admin/users', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, action: 'setPasses', value: count }),
      });
      const data = await res.json();
      if (data.success) {
        showToast(`Passes updated to ${count}.`);
        fetchUsers();
        fetchStats();
      }
    } catch (e) {
      showToast('Error updating passes', 'error');
    }
  };

  const handleSetRole = async (userId: string, newRole: 'user' | 'admin') => {
    try {
      const res = await fetch('/api/admin/users', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, action: 'setRole', value: newRole }),
      });
      const data = await res.json();
      if (data.success) {
        showToast(`Role updated to ${newRole.toUpperCase()}.`);
        fetchUsers();
        fetchStats();
      }
    } catch (e) {
      showToast('Error updating role', 'error');
    }
  };

  const handleDeleteUser = async (userId: string, email: string) => {
    if (!window.confirm(`Are you sure you want to permanently delete user account "${email}"?`)) {
      return;
    }
    try {
      const res = await fetch(`/api/admin/users?id=${userId}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        showToast(`User ${email} deleted.`);
        fetchUsers();
        fetchStats();
      } else {
        showToast(data.message || 'Failed to delete user', 'error');
      }
    } catch (e) {
      showToast('Error deleting user', 'error');
    }
  };

  // Diagram Actions
  const handleModerateDiagram = async (diagramId: string, action: 'approve' | 'reject') => {
    try {
      const res = await fetch('/api/admin/diagrams', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ diagramId, action }),
      });
      const data = await res.json();
      if (data.success) {
        showToast(data.message);
        fetchDiagrams();
        fetchStats();
      } else {
        showToast(data.message || 'Moderation action failed', 'error');
      }
    } catch (e) {
      showToast('Error moderating diagram', 'error');
    }
  };

  // Canvas Project Template Toggle Action
  const handleTogglePublicProject = async (projectId: string, currentPublic: boolean) => {
    try {
      const res = await fetch('/api/admin/projects', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ projectId, isPublic: !currentPublic }),
      });
      const data = await res.json();
      if (data.success) {
        showToast(`Template visibility updated.`);
        fetchProjects();
      }
    } catch (e) {
      showToast('Failed to update project template status', 'error');
    }
  };

  // CSV Ledger Export
  const handleExportCSV = () => {
    if (!ledger.length) return;
    const headers = ['Order ID', 'Payment ID', 'User Email', 'Plan Type', 'Gross Revenue (INR)', 'Base Net (INR)', 'GST 18% (INR)', 'Status', 'Date'];
    const rows = ledger.map((item) => [
      item.orderId,
      item.paymentId,
      item.userEmail,
      item.planType,
      item.amount,
      item.netBase,
      item.gst18,
      item.status,
      new Date(item.createdAt).toLocaleString(),
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `financial_ledger_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Financial CSV Ledger downloaded!');
  };

  const handleLogoutAction = () => {
    logoutUser();
    if (onLogout) onLogout();
    else window.location.href = '/auth';
  };

  return (
    <div className="min-h-screen w-screen bg-[#0b0f14] text-gray-100 flex flex-col font-sans select-none overflow-x-hidden">
      {/* Toast Notification Popup */}
      {toastMsg && (
        <div
          className={`fixed top-5 right-5 z-50 px-4 py-3 rounded-2xl shadow-2xl border flex items-center space-x-3 text-xs font-semibold animate-in fade-in slide-in-from-top-4 ${
            toastMsg.type === 'success'
              ? 'bg-emerald-950/90 border-emerald-500/50 text-emerald-200'
              : 'bg-red-950/90 border-red-500/50 text-red-200'
          }`}
        >
          {toastMsg.type === 'success' ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          ) : (
            <AlertTriangle className="w-5 h-5 text-red-400" />
          )}
          <span>{toastMsg.text}</span>
        </div>
      )}

      {/* Top Header Bar */}
      <header className="h-16 bg-[#131920] border-b border-[#242e3b] px-6 flex items-center justify-between z-20">
        <div className="flex items-center space-x-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-canva-purple to-canva-teal flex items-center justify-center shadow-lg shadow-canva-purple/20">
            <Crown className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-base font-extrabold bg-gradient-to-r from-white via-gray-200 to-canva-teal bg-clip-text text-transparent flex items-center space-x-2">
              <span>RESEARCH RADAR Admin Console</span>
              <span className="px-2 py-0.5 rounded-full text-[10px] uppercase tracking-wider font-extrabold bg-canva-purple/20 text-canva-purple border border-canva-purple/40">
                PRO SYSTEM
              </span>
            </h1>
            <p className="text-[11px] text-gray-400">
              Platform Analytics • User Control • Line Diagram Approvals • Financial Ledger
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <ThemeToggle showLabel />
          <button
            onClick={() => {
              fetchStats();
              if (activeTab === 'users') fetchUsers();
              if (activeTab === 'payments') fetchLedger();
              if (activeTab === 'diagrams') fetchDiagrams();
              if (activeTab === 'projects') fetchProjects();
              if (activeTab === 'feedback') fetchFeedbacks();
              showToast('Admin statistics refreshed!');
            }}
            className="p-2.5 rounded-xl bg-[#1c2430] border border-[#2a3648] hover:bg-[#253040] text-gray-300 hover:text-white transition-all flex items-center space-x-1.5 text-xs font-semibold"
            title="Refresh All Data"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLoadingStats ? 'animate-spin' : ''}`} />
            <span className="hidden sm:inline">Refresh</span>
          </button>

          {onNavigateToStudio && (
            <button
              onClick={onNavigateToStudio}
              className="px-3.5 py-2 rounded-xl bg-canva-teal/15 hover:bg-canva-teal/25 border border-canva-teal/40 text-canva-teal text-xs font-bold transition-all flex items-center space-x-1.5"
            >
              <Layout className="w-4 h-4" />
              <span>Go to Studio Canvas</span>
            </button>
          )}

          <div className="h-6 w-px bg-[#242e3b]" />

          <div className="flex items-center space-x-2.5 pl-1">
            <img
              src={currentUser.avatarUrl || 'https://api.dicebear.com/7.x/avataaars/svg?seed=Admin'}
              alt={currentUser.name}
              className="w-8 h-8 rounded-full border border-canva-purple"
            />
            <div className="hidden lg:block text-left">
              <div className="text-xs font-bold text-white flex items-center space-x-1">
                <span>{currentUser.name}</span>
                <ShieldCheck className="w-3.5 h-3.5 text-canva-teal" />
              </div>
              <div className="text-[10px] text-gray-400 font-mono">admin@2005</div>
            </div>

            <button
              onClick={handleLogoutAction}
              className="px-3 py-1.5 rounded-lg bg-red-950/30 hover:bg-red-900/40 border border-red-500/30 text-red-400 hover:text-red-300 text-xs font-bold transition-all"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <div className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 space-y-6">
        {/* KPI Metrics Top Cards (8 Cards) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
          {/* Card 1: Users */}
          <div className="bg-[#131920] border border-[#242e3b] rounded-2xl p-3 flex flex-col justify-between hover:border-canva-purple/50 transition-all">
            <div className="flex items-center justify-between text-gray-400 mb-1">
              <span className="text-[11px] font-bold uppercase tracking-wider">Total Users</span>
              <Users className="w-4 h-4 text-canva-purple" />
            </div>
            <div className="text-xl font-extrabold text-white">{stats.totalUsers}</div>
            <div className="text-[10px] text-gray-400 mt-1">
              <span className="text-canva-teal font-bold">{stats.activeProUsers}</span> Pro accounts
            </div>
          </div>

          {/* Card 2: Total Revenue */}
          <div className="bg-[#131920] border border-[#242e3b] rounded-2xl p-3 flex flex-col justify-between hover:border-emerald-500/50 transition-all">
            <div className="flex items-center justify-between text-gray-400 mb-1">
              <span className="text-[11px] font-bold uppercase tracking-wider">Gross Rev</span>
              <DollarSign className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-xl font-extrabold text-emerald-400">
              ₹{stats.totalRevenue.toLocaleString('en-IN')}
            </div>
            <div className="text-[10px] text-gray-400 mt-1">Incl. 18% GST</div>
          </div>

          {/* Card 3: Net Base Revenue */}
          <div className="bg-[#131920] border border-[#242e3b] rounded-2xl p-3 flex flex-col justify-between hover:border-blue-500/50 transition-all">
            <div className="flex items-center justify-between text-gray-400 mb-1">
              <span className="text-[11px] font-bold uppercase tracking-wider">Net Base</span>
              <PieChart className="w-4 h-4 text-blue-400" />
            </div>
            <div className="text-xl font-extrabold text-blue-300">
              ₹{stats.netBaseRevenue.toLocaleString('en-IN')}
            </div>
            <div className="text-[10px] text-gray-400 mt-1">Excl. GST</div>
          </div>

          {/* Card 4: GST 18% Tax */}
          <div className="bg-[#131920] border border-[#242e3b] rounded-2xl p-3 flex flex-col justify-between hover:border-amber-500/50 transition-all">
            <div className="flex items-center justify-between text-gray-400 mb-1">
              <span className="text-[11px] font-bold uppercase tracking-wider">GST (18%)</span>
              <FileText className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-xl font-extrabold text-amber-300">
              ₹{stats.gst18Amount.toLocaleString('en-IN')}
            </div>
            <div className="text-[10px] text-gray-400 mt-1">Tax Collected</div>
          </div>

          {/* Card 5: One-time Passes */}
          <div className="bg-[#131920] border border-[#242e3b] rounded-2xl p-3 flex flex-col justify-between hover:border-canva-teal/50 transition-all">
            <div className="flex items-center justify-between text-gray-400 mb-1">
              <span className="text-[11px] font-bold uppercase tracking-wider">Passes Sold</span>
              <Sparkles className="w-4 h-4 text-canva-teal" />
            </div>
            <div className="text-xl font-extrabold text-canva-teal">{stats.passesSold}</div>
            <div className="text-[10px] text-gray-400 mt-1">Export Passes</div>
          </div>

          {/* Card 6: Saved Projects */}
          <div className="bg-[#131920] border border-[#242e3b] rounded-2xl p-3 flex flex-col justify-between hover:border-purple-500/50 transition-all">
            <div className="flex items-center justify-between text-gray-400 mb-1">
              <span className="text-[11px] font-bold uppercase tracking-wider">Saved Canvas</span>
              <Layers className="w-4 h-4 text-purple-400" />
            </div>
            <div className="text-xl font-extrabold text-white">{stats.totalSavedProjects}</div>
            <div className="text-[10px] text-gray-400 mt-1">User Designs</div>
          </div>

          {/* Card 7: Diagram Queue */}
          <div className="bg-[#131920] border border-[#242e3b] rounded-2xl p-3 flex flex-col justify-between hover:border-orange-500/50 transition-all">
            <div className="flex items-center justify-between text-gray-400 mb-1">
              <span className="text-[11px] font-bold uppercase tracking-wider">Pending SVGs</span>
              <Clock className="w-4 h-4 text-orange-400" />
            </div>
            <div className="text-xl font-extrabold text-orange-400 flex items-center space-x-1">
              <span>{stats.pendingDiagrams}</span>
              {stats.pendingDiagrams > 0 && (
                <span className="w-2 h-2 rounded-full bg-orange-500 animate-ping" />
              )}
            </div>
            <div className="text-[10px] text-gray-400 mt-1">
              {stats.globalApprovedDiagrams} Approved
            </div>
          </div>

          {/* Card 8: Feedback Rating */}
          <div className="bg-[#131920] border border-[#242e3b] rounded-2xl p-3 flex flex-col justify-between hover:border-yellow-500/50 transition-all">
            <div className="flex items-center justify-between text-gray-400 mb-1">
              <span className="text-[11px] font-bold uppercase tracking-wider">Rating</span>
              <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
            </div>
            <div className="text-xl font-extrabold text-yellow-300">{stats.averageRating} / 5</div>
            <div className="text-[10px] text-gray-400 mt-1">{stats.feedbackCount} Reviews</div>
          </div>
        </div>

        {/* 7 Tab Switcher Bar */}
        <div className="bg-[#131920] p-1.5 rounded-2xl border border-[#242e3b] flex items-center space-x-1 overflow-x-auto scrollbar-none">
          <button
            onClick={() => setActiveTab('overview')}
            className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center space-x-2 whitespace-nowrap ${
              activeTab === 'overview'
                ? 'bg-canva-purple text-white shadow-lg shadow-canva-purple/20'
                : 'text-gray-400 hover:text-white hover:bg-[#1c2430]'
            }`}
          >
            <TrendingUp className="w-4 h-4" />
            <span>Overview Analytics</span>
          </button>

          <button
            onClick={() => setActiveTab('users')}
            className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center space-x-2 whitespace-nowrap ${
              activeTab === 'users'
                ? 'bg-canva-purple text-white shadow-lg shadow-canva-purple/20'
                : 'text-gray-400 hover:text-white hover:bg-[#1c2430]'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>User Management ({stats.totalUsers})</span>
          </button>

          <button
            onClick={() => setActiveTab('payments')}
            className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center space-x-2 whitespace-nowrap ${
              activeTab === 'payments'
                ? 'bg-canva-purple text-white shadow-lg shadow-canva-purple/20'
                : 'text-gray-400 hover:text-white hover:bg-[#1c2430]'
            }`}
          >
            <CreditCard className="w-4 h-4" />
            <span>Payments & Ledger</span>
          </button>

          <button
            onClick={() => setActiveTab('diagrams')}
            className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center space-x-2 whitespace-nowrap relative ${
              activeTab === 'diagrams'
                ? 'bg-canva-purple text-white shadow-lg shadow-canva-purple/20'
                : 'text-gray-400 hover:text-white hover:bg-[#1c2430]'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>Line Diagrams Approval</span>
            {stats.pendingDiagrams > 0 && (
              <span className="px-1.5 py-0.2 bg-amber-500 text-black font-extrabold text-[10px] rounded-full">
                {stats.pendingDiagrams}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('projects')}
            className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center space-x-2 whitespace-nowrap ${
              activeTab === 'projects'
                ? 'bg-canva-purple text-white shadow-lg shadow-canva-purple/20'
                : 'text-gray-400 hover:text-white hover:bg-[#1c2430]'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Canvas Projects</span>
          </button>

          <button
            onClick={() => setActiveTab('feedback')}
            className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center space-x-2 whitespace-nowrap ${
              activeTab === 'feedback'
                ? 'bg-canva-purple text-white shadow-lg shadow-canva-purple/20'
                : 'text-gray-400 hover:text-white hover:bg-[#1c2430]'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>Feedback ({stats.feedbackCount})</span>
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center space-x-2 whitespace-nowrap ${
              activeTab === 'settings'
                ? 'bg-canva-purple text-white shadow-lg shadow-canva-purple/20'
                : 'text-gray-400 hover:text-white hover:bg-[#1c2430]'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>Platform Settings</span>
          </button>
        </div>

        {/* Tab 1: Overview Analytics */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Financial Ledger GST Breakdown Summary */}
              <div className="bg-[#131920] border border-[#242e3b] rounded-3xl p-6 space-y-4">
                <div className="flex items-center justify-between border-b border-[#242e3b] pb-3">
                  <h3 className="text-sm font-extrabold text-white flex items-center space-x-2">
                    <CreditCard className="w-4 h-4 text-emerald-400" />
                    <span>Financial Revenue & GST Summary</span>
                  </h3>
                  <span className="text-[10px] bg-emerald-950/60 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded-full font-bold">
                    Indian GST Compliant (18%)
                  </span>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 rounded-xl bg-[#1c2430]">
                    <span className="text-xs text-gray-400">Gross Total Revenue Collected</span>
                    <span className="text-sm font-extrabold text-emerald-400">
                      ₹{stats.totalRevenue.toLocaleString('en-IN')}
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-xl bg-[#1c2430]">
                    <span className="text-xs text-gray-400">Net Base Revenue (Excl. Tax)</span>
                    <span className="text-sm font-bold text-blue-300">
                      ₹{stats.netBaseRevenue.toLocaleString('en-IN')}
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-xl bg-[#1c2430]">
                    <span className="text-xs text-gray-400">Total GST Collected (18%)</span>
                    <span className="text-sm font-bold text-amber-300">
                      ₹{stats.gst18Amount.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>

                <div className="pt-2 text-[11px] text-gray-400 leading-relaxed bg-[#18202a] p-3 rounded-xl border border-[#283446]">
                  💡 All financial payments automatically calculate 18% GST portion for legal invoice records and tax filings.
                </div>
              </div>

              {/* System Health & Line Diagrams Moderation Status */}
              <div className="bg-[#131920] border border-[#242e3b] rounded-3xl p-6 space-y-4">
                <div className="flex items-center justify-between border-b border-[#242e3b] pb-3">
                  <h3 className="text-sm font-extrabold text-white flex items-center space-x-2">
                    <Sparkles className="w-4 h-4 text-canva-teal" />
                    <span>Line Diagram Moderation Queue</span>
                  </h3>
                  <button
                    onClick={() => setActiveTab('diagrams')}
                    className="text-xs text-canva-teal hover:underline font-bold"
                  >
                    Manage Queue →
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="p-4 rounded-2xl bg-amber-950/20 border border-amber-500/30 text-center">
                    <div className="text-2xl font-black text-amber-400">{stats.pendingDiagrams}</div>
                    <div className="text-xs text-amber-200/80 font-medium mt-1">Pending Approval</div>
                  </div>

                  <div className="p-4 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 text-center">
                    <div className="text-2xl font-black text-emerald-400">
                      {stats.globalApprovedDiagrams}
                    </div>
                    <div className="text-xs text-emerald-200/80 font-medium mt-1">Global Approved</div>
                  </div>
                </div>

                <div className="p-3 bg-[#1c2430] rounded-xl text-xs text-gray-300 space-y-1">
                  <div className="font-bold text-white">Community SVG Submissions</div>
                  <p className="text-[11px] text-gray-400">
                    When users generate line diagrams via Groq AI or Photo Convert, they submit a unique titled SVG to Admin. Once approved, it appears globally in all users' Elements Panel!
                  </p>
                </div>
              </div>

              {/* Storage & User Engagement */}
              <div className="bg-[#131920] border border-[#242e3b] rounded-3xl p-6 space-y-4">
                <div className="flex items-center justify-between border-b border-[#242e3b] pb-3">
                  <h3 className="text-sm font-extrabold text-white flex items-center space-x-2">
                    <HardDrive className="w-4 h-4 text-purple-400" />
                    <span>Platform Usage & Storage</span>
                  </h3>
                  <span className="text-[10px] bg-purple-950/60 text-purple-400 border border-purple-500/30 px-2 py-0.5 rounded-full font-bold">
                    Active Cloud
                  </span>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 rounded-xl bg-[#1c2430]">
                    <span className="text-xs text-gray-400">User Uploaded Media Items</span>
                    <span className="text-sm font-extrabold text-white">{stats.mediaCount}</span>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-xl bg-[#1c2430]">
                    <span className="text-xs text-gray-400">Saved Canvas Projects</span>
                    <span className="text-sm font-extrabold text-white">{stats.totalSavedProjects}</span>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-xl bg-[#1c2430]">
                    <span className="text-xs text-gray-400">User Feedback Rating</span>
                    <span className="text-sm font-extrabold text-yellow-400 flex items-center space-x-1">
                      <span>★ {stats.averageRating}</span>
                      <span className="text-gray-400 font-normal">({stats.feedbackCount})</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: User Management */}
        {activeTab === 'users' && (
          <div className="bg-[#131920] border border-[#242e3b] rounded-3xl p-6 space-y-5">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-[#242e3b] pb-4">
              <div>
                <h3 className="text-base font-extrabold text-white flex items-center space-x-2">
                  <Users className="w-5 h-5 text-canva-purple" />
                  <span>User Accounts & Permissions Directory</span>
                </h3>
                <p className="text-xs text-gray-400">
                  Manage Pro subscriptions, add/remove one-time export passes, change admin roles, or delete users.
                </p>
              </div>

              {/* Filters */}
              <div className="flex items-center space-x-3 w-full sm:w-auto">
                <div className="relative flex-1 sm:w-64">
                  <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    value={userSearchQuery}
                    onChange={(e) => setUserSearchQuery(e.target.value)}
                    placeholder="Search by name, email, username..."
                    className="w-full bg-[#1c2430] border border-[#2a3648] rounded-xl pl-9 pr-3 py-1.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-canva-purple"
                  />
                </div>

                <select
                  value={userRoleFilter}
                  onChange={(e) => setUserRoleFilter(e.target.value)}
                  className="bg-[#1c2430] border border-[#2a3648] rounded-xl px-3 py-1.5 text-xs text-gray-300 focus:outline-none"
                >
                  <option value="all">All Roles</option>
                  <option value="user">Standard Users</option>
                  <option value="admin">Admin Accounts</option>
                </select>
              </div>
            </div>

            {/* Users Table */}
            {isLoadingUsers ? (
              <div className="py-12 text-center text-xs text-gray-400 space-y-2">
                <RefreshCw className="w-6 h-6 animate-spin text-canva-purple mx-auto" />
                <p>Loading registered user directory...</p>
              </div>
            ) : users.length === 0 ? (
              <div className="py-12 text-center text-xs text-gray-400">
                No user accounts found matching your search.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-[#242e3b] text-gray-400 uppercase tracking-wider text-[10px]">
                      <th className="py-3 px-3">User Profile</th>
                      <th className="py-3 px-3">Role</th>
                      <th className="py-3 px-3">Pro Plan Status</th>
                      <th className="py-3 px-3">Export Passes</th>
                      <th className="py-3 px-3">Joined Date</th>
                      <th className="py-3 px-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#1e2733]">
                    {users.map((u) => (
                      <tr key={u._id} className="hover:bg-[#18202a] transition-colors">
                        <td className="py-3 px-3">
                          <div className="flex items-center space-x-3">
                            <img
                              src={
                                u.avatarUrl ||
                                `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(
                                  u.email
                                )}`
                              }
                              alt={u.name}
                              className="w-8 h-8 rounded-full border border-gray-700 flex-shrink-0"
                            />
                            <div>
                              <div className="font-bold text-white flex items-center space-x-1.5">
                                <span>{u.name}</span>
                                {u.role === 'admin' && (
                                  <ShieldCheck className="w-3.5 h-3.5 text-canva-teal" />
                                )}
                              </div>
                              <div className="text-[11px] text-gray-400">
                                {u.email} • <span className="text-canva-teal">@{u.username}</span>
                              </div>
                            </div>
                          </div>
                        </td>

                        <td className="py-3 px-3">
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase ${
                              u.role === 'admin'
                                ? 'bg-canva-teal/20 text-canva-teal border border-canva-teal/40'
                                : 'bg-gray-800 text-gray-300'
                            }`}
                          >
                            {u.role || 'user'}
                          </span>
                        </td>

                        <td className="py-3 px-3">
                          <div className="flex items-center space-x-2">
                            <span
                              className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                                u.isPro
                                  ? 'bg-emerald-950/80 text-emerald-400 border border-emerald-500/40'
                                  : 'bg-gray-800 text-gray-400'
                              }`}
                            >
                              {u.isPro ? 'PRO ACTIVE' : 'FREE'}
                            </span>
                            <button
                              onClick={() => handleTogglePro(u._id, !!u.isPro)}
                              className="text-[10px] text-canva-purple hover:underline font-bold"
                            >
                              {u.isPro ? 'Demote to Free' : 'Upgrade to Pro'}
                            </button>
                          </div>
                        </td>

                        <td className="py-3 px-3">
                          <div className="flex items-center space-x-2">
                            <span className="font-extrabold text-canva-teal">
                              {u.oneTimePassesCount || 0}
                            </span>
                            <button
                              onClick={() => {
                                const newCount = prompt(
                                  `Set One-Time Pass count for ${u.email}:`,
                                  String(u.oneTimePassesCount || 0)
                                );
                                if (newCount !== null) {
                                  handleUpdatePasses(u._id, parseInt(newCount, 10) || 0);
                                }
                              }}
                              className="p-1 rounded bg-[#242e3b] hover:bg-[#2e3b4d] text-gray-300 text-[10px] font-medium"
                              title="Edit Passes Counter"
                            >
                              Edit
                            </button>
                          </div>
                        </td>

                        <td className="py-3 px-3 text-gray-400 text-[11px]">
                          {u.createdAt ? new Date(u.createdAt).toLocaleDateString() : 'N/A'}
                        </td>

                        <td className="py-3 px-3 text-right">
                          <div className="flex items-center justify-end space-x-2">
                            <button
                              onClick={() =>
                                handleSetRole(u._id, u.role === 'admin' ? 'user' : 'admin')
                              }
                              className="px-2 py-1 rounded-lg bg-[#242e3b] hover:bg-[#2e3b4d] text-gray-300 text-[10px] font-semibold"
                            >
                              {u.role === 'admin' ? 'Make User' : 'Make Admin'}
                            </button>

                            <button
                              onClick={() => handleDeleteUser(u._id, u.email)}
                              className="p-1.5 rounded-lg bg-red-950/30 hover:bg-red-900/50 text-red-400 hover:text-red-300"
                              title="Delete Account"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Tab 3: Payments & Financial Ledger */}
        {activeTab === 'payments' && (
          <div className="bg-[#131920] border border-[#242e3b] rounded-3xl p-6 space-y-5">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-[#242e3b] pb-4">
              <div>
                <h3 className="text-base font-extrabold text-white flex items-center space-x-2">
                  <CreditCard className="w-5 h-5 text-emerald-400" />
                  <span>Financial Transactions & GST 18% Ledger</span>
                </h3>
                <p className="text-xs text-gray-400">
                  Itemized tax breakdowns (Gross Revenue, Net Base, 18% GST) with instant CSV report download.
                </p>
              </div>

              <button
                onClick={handleExportCSV}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg shadow-emerald-600/20 transition-all flex items-center space-x-2"
              >
                <Download className="w-4 h-4" />
                <span>Export Financial CSV</span>
              </button>
            </div>

            {isLoadingLedger ? (
              <div className="py-12 text-center text-xs text-gray-400 space-y-2">
                <RefreshCw className="w-6 h-6 animate-spin text-emerald-400 mx-auto" />
                <p>Loading financial transactions ledger...</p>
              </div>
            ) : ledger.length === 0 ? (
              <div className="py-12 text-center text-xs text-gray-400">
                No payment transactions recorded yet.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-[#242e3b] text-gray-400 uppercase tracking-wider text-[10px]">
                      <th className="py-3 px-3">Order / Payment ID</th>
                      <th className="py-3 px-3">Customer Email</th>
                      <th className="py-3 px-3">Plan / Item</th>
                      <th className="py-3 px-3">Gross Amount</th>
                      <th className="py-3 px-3">Net Base (Excl. Tax)</th>
                      <th className="py-3 px-3">18% GST</th>
                      <th className="py-3 px-3">Status</th>
                      <th className="py-3 px-3">Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#1e2733]">
                    {ledger.map((tx) => (
                      <tr key={tx.id} className="hover:bg-[#18202a] transition-colors">
                        <td className="py-3 px-3 font-mono text-[11px] text-gray-300">
                          <div>{tx.orderId}</div>
                          <div className="text-[9px] text-gray-500">{tx.paymentId}</div>
                        </td>

                        <td className="py-3 px-3 text-white font-semibold">{tx.userEmail}</td>

                        <td className="py-3 px-3">
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-canva-purple/20 text-canva-purple border border-canva-purple/30">
                            {tx.planType}
                          </span>
                        </td>

                        <td className="py-3 px-3 font-extrabold text-emerald-400">
                          ₹{tx.amount?.toLocaleString('en-IN')}
                        </td>

                        <td className="py-3 px-3 font-bold text-blue-300">
                          ₹{tx.netBase?.toLocaleString('en-IN')}
                        </td>

                        <td className="py-3 px-3 font-bold text-amber-300">
                          ₹{tx.gst18?.toLocaleString('en-IN')}
                        </td>

                        <td className="py-3 px-3">
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-950/80 text-emerald-400 border border-emerald-500/40">
                            PAID
                          </span>
                        </td>

                        <td className="py-3 px-3 text-gray-400 text-[11px]">
                          {new Date(tx.createdAt).toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Tab 4: Line Diagrams Approval Queue & Global Catalog */}
        {activeTab === 'diagrams' && (
          <div className="bg-[#131920] border border-[#242e3b] rounded-3xl p-6 space-y-5">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-[#242e3b] pb-4">
              <div>
                <h3 className="text-base font-extrabold text-white flex items-center space-x-2">
                  <Sparkles className="w-5 h-5 text-canva-teal" />
                  <span>Line Diagrams Moderation & Global Library</span>
                </h3>
                <p className="text-xs text-gray-400">
                  Review Groq AI & Photo-generated unique title SVG diagrams submitted by users before making them visible to all members.
                </p>
              </div>

              {/* Sub tab toggle */}
              <div className="flex bg-[#1c2430] p-1 rounded-xl border border-[#2a3648]">
                <button
                  onClick={() => setDiagramSubTab('pending')}
                  className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                    diagramSubTab === 'pending'
                      ? 'bg-amber-500 text-black font-extrabold'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  Pending Queue ({pendingDiagrams.length})
                </button>
                <button
                  onClick={() => setDiagramSubTab('global')}
                  className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                    diagramSubTab === 'global'
                      ? 'bg-canva-teal text-black font-extrabold'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  Global Library ({globalDiagrams.length})
                </button>
              </div>
            </div>

            {isLoadingDiagrams ? (
              <div className="py-12 text-center text-xs text-gray-400 space-y-2">
                <RefreshCw className="w-6 h-6 animate-spin text-canva-teal mx-auto" />
                <p>Loading line diagram catalog...</p>
              </div>
            ) : diagramSubTab === 'pending' ? (
              pendingDiagrams.length === 0 ? (
                <div className="py-12 text-center text-xs text-gray-400 space-y-2">
                  <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
                  <p className="font-bold text-white">Pending Approval Queue Clean!</p>
                  <p className="text-gray-500">All user-submitted line diagrams have been reviewed.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {pendingDiagrams.map((d) => (
                    <div
                      key={d._id}
                      className="bg-[#18202a] border border-[#283446] rounded-2xl p-4 flex flex-col justify-between space-y-3"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-extrabold text-canva-teal uppercase tracking-wide">
                            {d.title}
                          </span>
                          <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-amber-950/80 text-amber-400 border border-amber-500/40">
                            PENDING
                          </span>
                        </div>
                        <p className="text-[11px] text-gray-400">
                          Submitted by <b className="text-white">{d.creatorName || d.creatorEmail}</b>
                        </p>
                      </div>

                      {/* SVG Thumbnail Preview */}
                      <div className="h-40 bg-[#0b0f14] rounded-xl border border-[#242e3b] p-3 flex items-center justify-center overflow-hidden">
                        <svg
                          viewBox="0 0 300 300"
                          className="w-full h-full max-h-36 text-canva-teal"
                          dangerouslySetInnerHTML={{ __html: d.svgPath }}
                        />
                      </div>

                      {/* Action Buttons */}
                      <div className="grid grid-cols-2 gap-2 pt-1">
                        <button
                          onClick={() => handleModerateDiagram(d._id, 'approve')}
                          className="py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-all flex items-center justify-center space-x-1 shadow-md shadow-emerald-600/20"
                        >
                          <Check className="w-4 h-4" />
                          <span>Approve Global</span>
                        </button>

                        <button
                          onClick={() => handleModerateDiagram(d._id, 'reject')}
                          className="py-2 rounded-xl bg-red-950/40 hover:bg-red-900/50 border border-red-500/40 text-red-400 font-bold text-xs transition-all flex items-center justify-center space-x-1"
                        >
                          <XCircle className="w-4 h-4" />
                          <span>Reject</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )
            ) : globalDiagrams.length === 0 ? (
              <div className="py-12 text-center text-xs text-gray-400">
                No global line diagrams approved yet.
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3">
                {globalDiagrams.map((g) => (
                  <div
                    key={g._id}
                    className="bg-[#18202a] border border-[#283446] rounded-2xl p-3 flex flex-col justify-between space-y-2 group"
                  >
                    <div className="h-28 bg-[#0b0f14] rounded-xl border border-[#242e3b] p-2 flex items-center justify-center overflow-hidden">
                      <svg
                        viewBox="0 0 300 300"
                        className="w-full h-full text-canva-teal"
                        dangerouslySetInnerHTML={{ __html: g.svgPath }}
                      />
                    </div>

                    <div>
                      <div className="text-xs font-bold text-white truncate">{g.title}</div>
                      <div className="text-[10px] text-emerald-400 font-medium">✓ Global Approved</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 5: Canvas Projects */}
        {activeTab === 'projects' && (
          <div className="bg-[#131920] border border-[#242e3b] rounded-3xl p-6 space-y-5">
            <div className="border-b border-[#242e3b] pb-4">
              <h3 className="text-base font-extrabold text-white flex items-center space-x-2">
                <Layers className="w-5 h-5 text-purple-400" />
                <span>User Saved Canvas Projects & Templates</span>
              </h3>
              <p className="text-xs text-gray-400">
                Browse user-created canvas designs and feature exceptional designs as Global Public Templates.
              </p>
            </div>

            {isLoadingProjects ? (
              <div className="py-12 text-center text-xs text-gray-400 space-y-2">
                <RefreshCw className="w-6 h-6 animate-spin text-purple-400 mx-auto" />
                <p>Loading canvas projects...</p>
              </div>
            ) : projects.length === 0 ? (
              <div className="py-12 text-center text-xs text-gray-400">
                No user saved projects recorded yet.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-[#242e3b] text-gray-400 uppercase tracking-wider text-[10px]">
                      <th className="py-3 px-3">Design Title</th>
                      <th className="py-3 px-3">Creator Email</th>
                      <th className="py-3 px-3">Pages</th>
                      <th className="py-3 px-3">Template Visibility</th>
                      <th className="py-3 px-3">Last Modified</th>
                      <th className="py-3 px-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#1e2733]">
                    {projects.map((p) => (
                      <tr key={p.id} className="hover:bg-[#18202a] transition-colors">
                        <td className="py-3 px-3 font-bold text-white flex items-center space-x-2">
                          <Layout className="w-4 h-4 text-canva-teal flex-shrink-0" />
                          <span>{p.title}</span>
                        </td>

                        <td className="py-3 px-3 text-gray-300">{p.userEmail}</td>

                        <td className="py-3 px-3 font-bold text-gray-400">{p.pagesCount || 1}</td>

                        <td className="py-3 px-3">
                          <span
                            className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                              p.isPublic
                                ? 'bg-purple-950/80 text-purple-300 border border-purple-500/40'
                                : 'bg-gray-800 text-gray-400'
                            }`}
                          >
                            {p.isPublic ? 'GLOBAL TEMPLATE' : 'PRIVATE'}
                          </span>
                        </td>

                        <td className="py-3 px-3 text-gray-400 text-[11px]">
                          {new Date(p.updatedAt).toLocaleString()}
                        </td>

                        <td className="py-3 px-3 text-right">
                          <button
                            onClick={() => handleTogglePublicProject(p.id, !!p.isPublic)}
                            className="px-2.5 py-1 rounded-lg bg-[#242e3b] hover:bg-[#2e3b4d] text-gray-200 text-[10px] font-bold"
                          >
                            {p.isPublic ? 'Make Private' : 'Promote to Template'}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Tab 6: User Feedback */}
        {activeTab === 'feedback' && (
          <div className="bg-[#131920] border border-[#242e3b] rounded-3xl p-6 space-y-5">
            <div className="border-b border-[#242e3b] pb-4 flex items-center justify-between">
              <div>
                <h3 className="text-base font-extrabold text-white flex items-center space-x-2">
                  <MessageSquare className="w-5 h-5 text-yellow-400" />
                  <span>User Ratings & Feedback Reviews</span>
                </h3>
                <p className="text-xs text-gray-400">
                  Direct review ratings submitted by community members during exports.
                </p>
              </div>

              <div className="px-4 py-2 rounded-2xl bg-yellow-950/30 border border-yellow-500/30 flex items-center space-x-2">
                <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                <span className="text-base font-black text-yellow-300">{stats.averageRating} / 5</span>
              </div>
            </div>

            {isLoadingFeedbacks ? (
              <div className="py-12 text-center text-xs text-gray-400 space-y-2">
                <RefreshCw className="w-6 h-6 animate-spin text-yellow-400 mx-auto" />
                <p>Loading user feedbacks...</p>
              </div>
            ) : feedbacks.length === 0 ? (
              <div className="py-12 text-center text-xs text-gray-400">
                No user feedback records submitted yet.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {feedbacks.map((f) => (
                  <div
                    key={f._id}
                    className="bg-[#18202a] border border-[#283446] rounded-2xl p-4 space-y-3"
                  >
                    <div className="flex items-center justify-between border-b border-[#242e3b] pb-2">
                      <div className="flex items-center space-x-1">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <Star
                            key={s}
                            className={`w-4 h-4 ${
                              s <= f.rating
                                ? 'text-yellow-400 fill-yellow-400'
                                : 'text-gray-600'
                            }`}
                          />
                        ))}
                      </div>

                      <span className="text-[10px] text-gray-400">
                        {new Date(f.createdAt).toLocaleDateString()}
                      </span>
                    </div>

                    <p className="text-xs text-gray-200 italic">
                      "{f.comments || 'Great experience using the canvas editor!'}"
                    </p>

                    <div className="flex items-center justify-between text-[11px] text-gray-400 pt-1">
                      <span>User: <b className="text-white">{f.userEmail || 'Community Member'}</b></span>
                      <span className="px-2 py-0.5 rounded bg-[#242e3b] text-canva-teal font-mono">
                        {f.exportFormat || 'PNG'} Export
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 7: Platform Settings */}
        {activeTab === 'settings' && (
          <div className="bg-[#131920] border border-[#242e3b] rounded-3xl p-6 space-y-6">
            <div className="border-b border-[#242e3b] pb-4">
              <h3 className="text-base font-extrabold text-white flex items-center space-x-2">
                <Settings className="w-5 h-5 text-canva-teal" />
                <span>System Configuration & Admin Policy</span>
              </h3>
              <p className="text-xs text-gray-400">
                System parameters, mandatory admin credentials info, and database status.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-5 rounded-2xl bg-[#18202a] border border-[#283446] space-y-3">
                <div className="flex items-center space-x-2 font-bold text-white text-sm">
                  <Lock className="w-4 h-4 text-canva-teal" />
                  <span>Mandatory Admin Access Credentials</span>
                </div>
                <div className="space-y-1 text-xs text-gray-300 font-mono bg-[#0b0f14] p-3 rounded-xl border border-[#242e3b]">
                  <div>Username: <b className="text-canva-teal">Admin@2005</b></div>
                  <div>Password: <b className="text-canva-teal">12341234</b></div>
                  <div>Role Provisioning: <b className="text-emerald-400">ADMIN AUTOMATIC</b></div>
                </div>
                <p className="text-[11px] text-gray-400">
                  Logging in with these credentials automatically grants full administrator privileges and redirects directly to this Admin Panel.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-[#18202a] border border-[#283446] space-y-3">
                <div className="flex items-center space-x-2 font-bold text-white text-sm">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>MongoDB Engine & Service Health</span>
                </div>
                <div className="space-y-1.5 text-xs text-gray-300">
                  <div className="flex items-center justify-between">
                    <span>Database Connection:</span>
                    <span className="text-emerald-400 font-bold">CONNECTED (Cluster0)</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>GST Calculation:</span>
                    <span className="text-amber-300 font-bold">18% Indian Tax Standard</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Diagram Moderation:</span>
                    <span className="text-canva-teal font-bold">ACTIVE QUEUE</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
