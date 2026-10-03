import React, { useState } from 'react';
import { 
  X, 
  Sparkles, 
  Check, 
  Crown, 
  Ticket, 
  Zap, 
  ShieldCheck, 
  Download,
  CreditCard,
  Star,
  Loader2,
  AlertCircle,
  Receipt
} from 'lucide-react';
import { startRazorpayCheckout } from '../../utils/razorpay';
import { getCurrentUser } from '../../utils/auth';

interface UpgradeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectOneTimePass: () => void;
  onSelectProSubscription: () => void;
}

export const UpgradeModal: React.FC<UpgradeModalProps> = ({
  isOpen,
  onClose,
  onSelectOneTimePass,
  onSelectProSubscription,
}) => {
  const [selectedOption, setSelectedOption] = useState<'pass' | 'pro'>('pro');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleRazorpayPayment = () => {
    setPaymentError(null);
    setIsProcessing(true);

    const planType = selectedOption === 'pro' ? 'pro_monthly' : 'pass';
    const currentUser = getCurrentUser();

    startRazorpayCheckout({
      planType,
      userId: currentUser?.id,
      userEmail: currentUser?.email,
      userName: currentUser?.name,
      onSuccess: (result) => {
        setIsProcessing(false);
        if (result.isPro) {
          onSelectProSubscription();
        } else {
          onSelectOneTimePass();
        }
      },
      onError: (errMsg) => {
        setIsProcessing(false);
        setPaymentError(errMsg);
      },
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 select-none font-sans animate-in fade-in duration-200">
      <div className="bg-canva-panel border border-canva-border w-full max-w-xl rounded-2xl shadow-2xl overflow-hidden flex flex-col">
        {/* Modal Header */}
        <div className="p-4 border-b border-canva-border flex items-center justify-between bg-canva-sidebar">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-amber-400 to-canva-purple flex items-center justify-center text-black font-bold shadow-md">
              <Crown className="w-4 h-4 fill-black text-black" />
            </div>
            <div>
              <h2 className="font-bold text-sm text-white flex items-center gap-1.5">
                <span>Unlock Clean HD Download</span>
                <span className="text-[10px] bg-amber-400/20 text-amber-400 font-bold px-2 py-0.5 rounded-full border border-amber-400/30">
                  No Watermark
                </span>
              </h2>
              <p className="text-[11px] text-gray-400">
                Remove "RESEARCH RADAR" watermark & export in full resolution via Razorpay
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

        {/* Modal Body: Pricing Options */}
        <div className="p-5 space-y-4 bg-canva-bg">
          {paymentError && (
            <div className="p-3 bg-rose-500/20 border border-rose-500/40 rounded-xl text-rose-300 text-xs flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
              <span>{paymentError}</span>
            </div>
          )}

          {/* Option 1: Pro Subscription Plan (Recommended) */}
          <div
            onClick={() => setSelectedOption('pro')}
            className={`p-4 rounded-2xl border cursor-pointer transition-all relative overflow-hidden ${
              selectedOption === 'pro'
                ? 'bg-gradient-to-r from-canva-purple/20 to-canva-teal/10 border-canva-teal shadow-lg ring-1 ring-canva-teal'
                : 'bg-canva-sidebar border-canva-border hover:border-gray-500'
            }`}
          >
            <span className="absolute top-0 right-0 bg-gradient-to-l from-canva-teal to-canva-purple text-black text-[9px] font-extrabold px-3 py-1 rounded-bl-xl uppercase tracking-wider">
              Best Value
            </span>

            <div className="flex items-start space-x-3">
              <div className={`p-2.5 rounded-xl ${selectedOption === 'pro' ? 'bg-canva-teal text-black' : 'bg-canva-panel text-gray-400'}`}>
                <Crown className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-sm text-white flex items-center gap-1.5">
                    Pro Unlimited Plan
                  </h3>
                  <div className="text-right">
                    <span className="font-extrabold text-base text-canva-teal">₹499</span>
                    <span className="text-[11px] text-gray-400">/mo</span>
                    <span className="block text-[10px] text-emerald-400 font-mono">+ 18% GST (₹89.82)</span>
                  </div>
                </div>
                <p className="text-xs text-gray-300 mt-1">
                  Unlimited clean HD exports, PDF/SVG vector files & all premium AI tools.
                </p>
                <div className="mt-2 flex items-center space-x-4 text-[11px] text-gray-400 font-medium">
                  <span className="flex items-center space-x-1 text-emerald-400">
                    <Check className="w-3.5 h-3.5" /> <span>No Watermark</span>
                  </span>
                  <span className="flex items-center space-x-1 text-emerald-400">
                    <Check className="w-3.5 h-3.5" /> <span>Full 4K HD Export</span>
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Option 2: One-Time Clean Download Pass */}
          <div
            onClick={() => setSelectedOption('pass')}
            className={`p-4 rounded-2xl border cursor-pointer transition-all ${
              selectedOption === 'pass'
                ? 'bg-amber-500/10 border-amber-400 shadow-lg ring-1 ring-amber-400'
                : 'bg-canva-sidebar border-canva-border hover:border-gray-500'
            }`}
          >
            <div className="flex items-start space-x-3">
              <div className={`p-2.5 rounded-xl ${selectedOption === 'pass' ? 'bg-amber-400 text-black' : 'bg-canva-panel text-gray-400'}`}>
                <Ticket className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-sm text-white">
                    One-Time Clean Download Pass
                  </h3>
                  <div className="text-right">
                    <span className="font-extrabold text-base text-amber-400">₹99</span>
                    <span className="text-[11px] text-gray-400"> / single export</span>
                    <span className="block text-[10px] text-amber-300 font-mono">+ 18% GST (₹17.82)</span>
                  </div>
                </div>
                <p className="text-xs text-gray-300 mt-1">
                  Download this current design cleanly without any watermark once.
                </p>
                <div className="mt-2 flex items-center space-x-4 text-[11px] text-gray-400 font-medium">
                  <span className="flex items-center space-x-1 text-amber-400">
                    <Check className="w-3.5 h-3.5" /> <span>Single Clean Pass</span>
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Invoice Price Breakdown Summary */}
          <div className="bg-canva-sidebar p-3.5 rounded-xl border border-canva-border space-y-1.5">
            <div className="flex items-center justify-between text-xs text-gray-400">
              <span className="flex items-center gap-1.5">
                <Receipt className="w-3.5 h-3.5 text-canva-teal" />
                <span>Base Amount ({selectedOption === 'pro' ? 'Pro Monthly' : 'Single Pass'}):</span>
              </span>
              <span className="font-mono text-white font-semibold">
                {selectedOption === 'pro' ? '₹499.00' : '₹99.00'}
              </span>
            </div>

            <div className="flex items-center justify-between text-xs text-gray-400">
              <span>GST (18% Goods & Services Tax):</span>
              <span className="font-mono text-amber-400">
                {selectedOption === 'pro' ? '+ ₹89.82' : '+ ₹17.82'}
              </span>
            </div>

            <div className="pt-2 border-t border-canva-border flex items-center justify-between text-xs font-bold text-white">
              <span>Total Payable Amount:</span>
              <span className="text-sm font-mono text-canva-teal">
                {selectedOption === 'pro' ? '₹588.82' : '₹116.82'}
              </span>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-canva-sidebar border-t border-canva-border flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-medium text-gray-300 hover:bg-canva-hover transition-colors"
          >
            Cancel
          </button>

          <button
            onClick={handleRazorpayPayment}
            disabled={isProcessing}
            className={`px-6 py-2.5 font-bold text-xs rounded-xl shadow-lg transition-all flex items-center space-x-2 ${
              selectedOption === 'pro'
                ? 'bg-gradient-to-r from-canva-purple to-canva-teal hover:opacity-95 text-white shadow-canva-purple/30'
                : 'bg-amber-400 hover:bg-amber-300 text-black shadow-amber-400/20'
            }`}
          >
            {isProcessing ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Opening Razorpay Checkout...</span>
              </>
            ) : selectedOption === 'pro' ? (
              <>
                <CreditCard className="w-4 h-4" />
                <span>Pay ₹588.82 (incl. 18% GST) via Razorpay</span>
              </>
            ) : (
              <>
                <CreditCard className="w-4 h-4" />
                <span>Pay ₹116.82 (incl. 18% GST) via Razorpay</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
