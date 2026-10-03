import React, { useState, useEffect } from 'react';
import { 
  X, 
  ShieldCheck, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Sparkles, 
  Loader2, 
  RefreshCw,
  Search,
  User,
  Check,
  Ban
} from 'lucide-react';

interface DiagramSubmission {
  _id: string;
  title: string;
  svgPath: string;
  strokeColor: string;
  strokeWidth: number;
  creatorName: string;
  creatorEmail: string;
  status: 'pending' | 'approved' | 'rejected';
  isGlobal: boolean;
  createdAt: string;
}

interface AdminDiagramsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDiagramApproved?: () => void;
}

export const AdminDiagramsModal: React.FC<AdminDiagramsModalProps> = ({
  isOpen,
  onClose,
  onDiagramApproved,
}) => {
  const [filterStatus, setFilterStatus] = useState<'pending' | 'approved' | 'rejected' | 'all'>('pending');
  const [diagrams, setDiagrams] = useState<DiagramSubmission[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [actionId, setActionId] = useState<string | null>(null);
  const [feedbackMsg, setFeedbackMsg] = useState<string | null>(null);

  const fetchQueue = async () => {
    setIsLoading(true);
    setFeedbackMsg(null);
    try {
      const res = await fetch(`/api/admin/diagrams?status=${filterStatus}`);
      const data = await res.json();
      if (data.success) {
        setDiagrams(data.diagrams || []);
      }
    } catch (err: any) {
      console.error('Fetch admin queue error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchQueue();
    }
  }, [isOpen, filterStatus]);

  if (!isOpen) return null;

  const handleApproveOrReject = async (diagramId: string, action: 'approve' | 'reject') => {
    setActionId(diagramId);
    setFeedbackMsg(null);
    try {
      const res = await fetch('/api/admin/diagrams', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ diagramId, action }),
      });

      const data = await res.json();
      if (data.success) {
        setFeedbackMsg(data.message);
        // Remove from list or refresh
        fetchQueue();
        if (action === 'approve' && onDiagramApproved) {
          onDiagramApproved();
        }
      }
    } catch (err: any) {
      console.error('Action error:', err);
    } finally {
      setActionId(null);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 select-none font-sans animate-in fade-in duration-200">
      <div className="bg-canva-panel border border-canva-border w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-4 border-b border-canva-border flex items-center justify-between bg-canva-sidebar">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-amber-400 to-canva-purple flex items-center justify-center text-black font-bold shadow-md">
              <ShieldCheck className="w-4 h-4 fill-black text-black" />
            </div>
            <div>
              <h2 className="font-bold text-sm text-white flex items-center gap-2">
                <span>Admin Moderation Queue</span>
                <span className="text-[10px] bg-canva-purple/30 text-canva-teal font-bold px-2 py-0.5 rounded-full border border-canva-purple">
                  Global Library Control
                </span>
              </h2>
              <p className="text-[11px] text-gray-400">
                Review pending line diagrams submitted by users and approve them for the Global Library
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-canva-hover text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter Bar & Refresh */}
        <div className="p-3 bg-canva-bg border-b border-canva-border flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {(['pending', 'approved', 'rejected', 'all'] as const).map((st) => (
              <button
                key={st}
                onClick={() => setFilterStatus(st)}
                className={`px-3 py-1 rounded-lg text-xs font-bold capitalize transition-all ${
                  filterStatus === st
                    ? 'bg-amber-400 text-black shadow'
                    : 'bg-canva-sidebar text-gray-400 hover:text-white border border-canva-border'
                }`}
              >
                {st}
              </button>
            ))}
          </div>

          <button
            onClick={fetchQueue}
            disabled={isLoading}
            className="p-1.5 rounded-lg bg-canva-sidebar hover:bg-canva-hover text-gray-400 hover:text-white border border-canva-border transition-colors flex items-center space-x-1 text-xs"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </button>
        </div>

        {/* Feedback Alert Banner */}
        {feedbackMsg && (
          <div className="mx-4 mt-3 p-2.5 bg-emerald-500/20 border border-emerald-500/40 rounded-xl text-emerald-300 text-xs flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{feedbackMsg}</span>
          </div>
        )}

        {/* Content Body: Grid of Pending Diagrams */}
        <div className="p-4 overflow-y-auto flex-1 bg-canva-bg">
          {isLoading ? (
            <div className="py-20 flex flex-col items-center justify-center space-y-2 text-amber-400">
              <Loader2 className="w-8 h-8 animate-spin" />
              <span className="text-xs font-semibold">Loading submissions...</span>
            </div>
          ) : diagrams.length === 0 ? (
            <div className="py-16 text-center text-gray-500 text-xs space-y-2">
              <Clock className="w-8 h-8 mx-auto text-gray-600 mb-1" />
              <p className="font-semibold text-gray-400">No {filterStatus} diagram submissions found.</p>
              <p className="text-[11px]">When users submit AI/Photo diagrams with unique names, they will appear here for your approval.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {diagrams.map((item) => (
                <div
                  key={item._id}
                  className="bg-canva-sidebar border border-canva-border hover:border-amber-400/50 rounded-2xl p-4 flex items-start space-x-4 transition-all shadow-md"
                >
                  {/* Vector Preview Box */}
                  <div className="w-28 h-28 bg-slate-950 rounded-xl border border-canva-border/60 flex items-center justify-center p-2 shrink-0 relative overflow-hidden">
                    <svg viewBox="0 0 100 100" className="w-full h-full">
                      <path
                        d={item.svgPath}
                        fill="none"
                        stroke={item.strokeColor || '#00c4cc'}
                        strokeWidth={item.strokeWidth || 2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>

                  {/* Metadata & Actions */}
                  <div className="flex-1 min-w-0 space-y-2">
                    <div>
                      <div className="flex items-center justify-between">
                        <h3 className="font-bold text-xs text-white truncate" title={item.title}>
                          {item.title}
                        </h3>
                        <span
                          className={`text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider border ${
                            item.status === 'approved'
                              ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                              : item.status === 'rejected'
                              ? 'bg-rose-500/20 text-rose-400 border-rose-500/30'
                              : 'bg-amber-400/20 text-amber-400 border-amber-400/30'
                          }`}
                        >
                          {item.status}
                        </span>
                      </div>
                      <p className="text-[10px] text-gray-400 mt-0.5 flex items-center gap-1 truncate">
                        <User className="w-3 h-3 text-canva-teal shrink-0" />
                        <span>Submitted by: <b className="text-gray-300">{item.creatorName}</b></span>
                      </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="pt-2 border-t border-canva-border/60 flex items-center gap-2">
                      <button
                        onClick={() => handleApproveOrReject(item._id, 'approve')}
                        disabled={actionId === item._id || item.status === 'approved'}
                        className="flex-1 py-1.5 px-2 rounded-xl text-[11px] font-bold bg-emerald-500 hover:bg-emerald-400 text-black shadow transition-all flex items-center justify-center space-x-1 disabled:opacity-40"
                      >
                        {actionId === item._id ? (
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        ) : (
                          <Check className="w-3.5 h-3.5" />
                        )}
                        <span>{item.status === 'approved' ? 'Approved' : 'Approve Global'}</span>
                      </button>

                      <button
                        onClick={() => handleApproveOrReject(item._id, 'reject')}
                        disabled={actionId === item._id || item.status === 'rejected'}
                        className="py-1.5 px-2.5 rounded-xl text-[11px] font-semibold bg-canva-panel hover:bg-rose-500/20 text-gray-300 hover:text-rose-300 border border-canva-border hover:border-rose-500/40 transition-all flex items-center justify-center space-x-1 disabled:opacity-40"
                      >
                        <Ban className="w-3.5 h-3.5" />
                        <span>Reject</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
