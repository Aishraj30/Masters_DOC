import React, { useState } from 'react';
import { X, Star, Send, CheckCircle2, MessageSquare, Loader2, Sparkles } from 'lucide-react';
import { UserProfile } from '../../utils/auth';

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  designTitle: string;
  exportFormat: string;
  currentUser: UserProfile | null;
}

export const FeedbackModal: React.FC<FeedbackModalProps> = ({
  isOpen,
  onClose,
  designTitle,
  exportFormat,
  currentUser,
}) => {
  const [rating, setRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [comments, setComments] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg('');

    try {
      const response = await fetch('/api/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          rating,
          comments,
          designTitle,
          exportFormat,
          user: currentUser || { name: 'Anonymous', email: 'N/A' },
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setIsSubmitted(true);
        setTimeout(() => {
          setIsSubmitted(false);
          onClose();
        }, 2500);
      } else {
        setErrorMsg(data.message || 'Failed to submit feedback.');
      }
    } catch (err: any) {
      setErrorMsg('Could not submit feedback.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 select-none">
      <div className="bg-canva-panel border border-canva-border w-full max-w-md rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-4 border-b border-canva-border flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-5 h-5 text-canva-teal" />
            <h2 className="font-bold text-base text-white">Export Feedback</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-canva-hover text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        {isSubmitted ? (
          <div className="p-8 flex flex-col items-center text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-1">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-white">Thank You for Your Feedback!</h3>
            <p className="text-xs text-gray-400 max-w-xs">
              Your feedback has been sent to <span className="text-canva-teal font-semibold">inforesearchradar@gmail.com</span> to help us improve RESEARCH RADAR Studio.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-5 space-y-4">
            {/* Celebration Export Notice */}
            <div className="p-3 bg-canva-purple/15 border border-canva-purple/30 rounded-xl text-xs text-purple-200 flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-canva-teal flex-shrink-0" />
              <span>
                Exported <b className="text-white">{designTitle}</b> ({exportFormat.toUpperCase()}) successfully!
              </span>
            </div>

            {/* Rating Stars */}
            <div className="text-center space-y-1">
              <label className="text-xs font-bold text-gray-300 uppercase tracking-wider block">
                How was your experience?
              </label>
              <div className="flex items-center justify-center space-x-1.5 py-2">
                {[1, 2, 3, 4, 5].map((star) => {
                  const isFilled = (hoverRating || rating) >= star;
                  return (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      className="p-1 transition-transform hover:scale-125 focus:outline-none"
                    >
                      <Star
                        className={`w-7 h-7 ${
                          isFilled
                            ? 'text-amber-400 fill-amber-400 drop-shadow-[0_0_8px_rgba(245,158,11,0.5)]'
                            : 'text-gray-600'
                        }`}
                      />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Feedback Comments */}
            <div>
              <label className="text-xs font-bold text-gray-300 uppercase tracking-wider block mb-1">
                Your Feedback & Suggestions
              </label>
              <textarea
                value={comments}
                onChange={(e) => setComments(e.target.value)}
                placeholder="Tell us what you liked or what features you'd like added..."
                rows={3}
                className="w-full bg-canva-sidebar border border-canva-border rounded-xl p-3 text-xs text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-canva-teal font-medium"
              />
            </div>

            {/* User Info Info-box */}
            {currentUser && (
              <div className="text-[11px] text-gray-400 bg-canva-sidebar p-2.5 rounded-xl border border-canva-border flex items-center justify-between">
                <span>Sending as: <b className="text-gray-200">{currentUser.name}</b></span>
                <span className="text-canva-teal font-mono">{currentUser.email}</span>
              </div>
            )}

            {errorMsg && <p className="text-xs text-red-400">{errorMsg}</p>}

            {/* Buttons */}
            <div className="flex items-center justify-end space-x-2 pt-2 border-t border-canva-border">
              <button
                type="button"
                onClick={onClose}
                disabled={isSubmitting}
                className="px-4 py-2 rounded-xl text-xs font-medium text-gray-400 hover:text-white hover:bg-canva-hover transition-colors"
              >
                Skip
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-5 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-canva-purple to-canva-purple-hover hover:opacity-95 text-white shadow-lg shadow-canva-purple/30 transition-all flex items-center space-x-1.5 disabled:opacity-60"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-white" />
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <span>Submit Feedback</span>
                    <Send className="w-3.5 h-3.5 ml-1" />
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
