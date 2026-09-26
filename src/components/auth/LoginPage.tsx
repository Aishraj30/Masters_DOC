import React, { useState, useEffect, useRef } from 'react';
import { Palette, Lock, User, Eye, EyeOff, ShieldCheck, AlertCircle, ArrowRight, Mail, Phone, AtSign, Loader2, KeyRound, CheckCircle2, RotateCcw } from 'lucide-react';
import { loginUserApi, registerUserApi, loginWithGoogleApi, sendOtpApi, verifyOtpApi, UserProfile } from '../../utils/auth';

declare global {
  interface Window {
    google?: any;
  }
}

interface LoginPageProps {
  onLoginSuccess: (user: UserProfile) => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onLoginSuccess }) => {
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [signupStep, setSignupStep] = useState<'form' | 'otp'>('form');

  // Form Fields
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [emailOrUser, setEmailOrUser] = useState('');
  const [password, setPassword] = useState('');
  const [otpCode, setOtpCode] = useState('');

  // UI State
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const [timer, setTimer] = useState(300); // 5 minutes timer
  const isGoogleInitialized = useRef(false);

  useEffect(() => {
    let countdown: any;
    if (signupStep === 'otp' && timer > 0) {
      countdown = setInterval(() => setTimer((prev) => prev - 1), 1000);
    }
    return () => clearInterval(countdown);
  }, [signupStep, timer]);

  useEffect(() => {
    const googleClientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
    if (!googleClientId) return;

    const handleCredentialResponse = async (response: any) => {
      setIsLoading(true);
      setErrorMsg('');
      try {
        const res = await loginWithGoogleApi(response.credential);
        if (res.success && res.user) {
          onLoginSuccess(res.user);
        } else {
          setErrorMsg(res.message || 'Google authentication failed.');
        }
      } catch (err: any) {
        setErrorMsg('Failed to process Google authentication.');
      } finally {
        setIsLoading(false);
      }
    };

    const loadGoogleScript = () => {
      if (window.google?.accounts?.id && !isGoogleInitialized.current) {
        window.google.accounts.id.initialize({
          client_id: googleClientId,
          callback: handleCredentialResponse,
        });
        isGoogleInitialized.current = true;

        const btnContainer = document.getElementById('googleSignInBtn');
        if (btnContainer) {
          btnContainer.innerHTML = '';
          window.google.accounts.id.renderButton(btnContainer, {
            theme: 'outline',
            size: 'large',
            width: '380',
            text: 'continue_with',
            shape: 'pill',
          });
        }
      }
    };

    if (typeof window !== 'undefined') {
      if (!window.google) {
        const script = document.createElement('script');
        script.src = 'https://accounts.google.com/gsi/client';
        script.async = true;
        script.defer = true;
        script.onload = loadGoogleScript;
        document.body.appendChild(script);
      } else {
        loadGoogleScript();
      }
    }
  }, [onLoginSuccess]);

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!name.trim()) {
      setErrorMsg('Full Name is required.');
      return;
    }
    if (!username.trim()) {
      setErrorMsg('Username is required.');
      return;
    }
    if (!email.trim()) {
      setErrorMsg('Email Address is mandatory.');
      return;
    }
    if (!phoneNumber.trim()) {
      setErrorMsg('Phone Number is required.');
      return;
    }
    if (!password || password.length < 6) {
      setErrorMsg('Password must be at least 6 characters long.');
      return;
    }

    setIsSendingOtp(true);
    try {
      const res = await sendOtpApi(email);
      if (res.success) {
        setSuccessMsg(res.message || `Verification code sent to ${email}`);
        setSignupStep('otp');
        setTimer(300);
      } else {
        setErrorMsg(res.message || 'Failed to send OTP code.');
      }
    } catch (err: any) {
      setErrorMsg('Could not send verification code.');
    } finally {
      setIsSendingOtp(false);
    }
  };

  const handleVerifyOtpAndRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!otpCode || otpCode.trim().length < 6) {
      setErrorMsg('Please enter the 6-digit verification code.');
      return;
    }

    setIsLoading(true);
    try {
      // 1. Verify OTP first
      const verifyRes = await verifyOtpApi(email, otpCode.trim());
      if (!verifyRes.success) {
        setErrorMsg(verifyRes.message || 'Invalid or expired OTP code.');
        setIsLoading(false);
        return;
      }

      // 2. Register user in MongoDB
      const regRes = await registerUserApi(name, username, email, phoneNumber, password);
      if (regRes.success && regRes.user) {
        onLoginSuccess(regRes.user);
      } else {
        setErrorMsg(regRes.message || 'Failed to complete registration.');
      }
    } catch (err: any) {
      setErrorMsg('An unexpected error occurred during verification.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignInSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setIsLoading(true);

    try {
      const res = await loginUserApi(emailOrUser, password);
      if (res.success && res.user) {
        onLoginSuccess(res.user);
      } else {
        setErrorMsg(res.message || 'Invalid login credentials.');
      }
    } catch (err: any) {
      setErrorMsg('An unexpected error occurred during login.');
    } finally {
      setIsLoading(false);
    }
  };

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="min-h-screen w-screen bg-canva-bg text-gray-100 flex flex-col items-center justify-center p-4 relative overflow-y-auto select-none">
      {/* Background Decorative Blobs */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-canva-purple/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-canva-teal/20 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md bg-canva-panel border border-canva-border rounded-3xl shadow-2xl overflow-hidden p-6 sm:p-8 z-10 space-y-5 my-8">
        {/* Brand Header */}
        <div className="flex flex-col items-center text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-canva-purple via-canva-teal to-blue-500 flex items-center justify-center shadow-xl shadow-canva-purple/30 mb-1">
            <Palette className="w-6 h-6 text-white" />
          </div>

          <h1 className="text-2xl font-extrabold bg-gradient-to-r from-white via-gray-200 to-canva-teal bg-clip-text text-transparent tracking-tight">
            RESEARCH RADAR Studio
          </h1>
          <p className="text-xs text-gray-400 font-medium">
            Creative Graphic Design & Document Suite
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex bg-canva-sidebar p-1 rounded-xl border border-canva-border">
          <button
            type="button"
            onClick={() => {
              setMode('signin');
              setSignupStep('form');
              setErrorMsg('');
              setSuccessMsg('');
            }}
            disabled={isLoading || isSendingOtp}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
              mode === 'signin'
                ? 'bg-canva-purple text-white shadow-md'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => {
              setMode('signup');
              setSignupStep('form');
              setErrorMsg('');
              setSuccessMsg('');
            }}
            disabled={isLoading || isSendingOtp}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
              mode === 'signup'
                ? 'bg-canva-purple text-white shadow-md'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Create Account
          </button>
        </div>

        {/* Google Login Button Container */}
        {mode === 'signin' && (
          <>
            <div className="flex justify-center w-full">
              <div id="googleSignInBtn" className="w-full flex justify-center"></div>
            </div>

            <div className="flex items-center my-2">
              <div className="flex-grow border-t border-canva-border"></div>
              <span className="px-3 text-[11px] text-gray-500 uppercase tracking-widest font-semibold">
                Or with email
              </span>
              <div className="flex-grow border-t border-canva-border"></div>
            </div>
          </>
        )}

        {/* Error Alert Message */}
        {errorMsg && (
          <div className="p-3 bg-red-950/40 border border-red-500/40 rounded-xl text-red-300 text-xs flex items-center space-x-2 animate-in fade-in">
            <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Success Alert Message */}
        {successMsg && (
          <div className="p-3 bg-emerald-950/40 border border-emerald-500/40 rounded-xl text-emerald-300 text-xs flex items-center space-x-2 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Sign In Form */}
        {mode === 'signin' && (
          <form onSubmit={handleSignInSubmit} className="space-y-3.5">
            <div>
              <label className="text-xs font-bold text-gray-300 uppercase tracking-wider block mb-1">
                Email Address or Username
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  value={emailOrUser}
                  onChange={(e) => setEmailOrUser(e.target.value)}
                  placeholder="Enter your email or username"
                  required
                  disabled={isLoading}
                  className="w-full bg-canva-sidebar border border-canva-border rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-canva-teal font-medium disabled:opacity-50"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-gray-300 uppercase tracking-wider block mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  required
                  disabled={isLoading}
                  className="w-full bg-canva-sidebar border border-canva-border rounded-xl pl-10 pr-10 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-canva-teal font-medium disabled:opacity-50"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isLoading}
                  className="absolute right-3.5 top-3 text-gray-400 hover:text-white"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-gradient-to-r from-canva-purple to-canva-purple-hover hover:opacity-95 text-white font-bold rounded-xl text-xs transition-all shadow-lg shadow-canva-purple/30 flex items-center justify-center space-x-2 transform hover:scale-[1.01] mt-2 disabled:opacity-60"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-white" />
                  <span>Signing in...</span>
                </>
              ) : (
                <>
                  <span>Sign In to Studio</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        )}

        {/* Sign Up Step 1: User Information Form */}
        {mode === 'signup' && signupStep === 'form' && (
          <form onSubmit={handleSendOtp} className="space-y-3.5">
            {/* Full Name */}
            <div>
              <label className="text-xs font-bold text-gray-300 uppercase tracking-wider block mb-1">
                Full Name
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your full name"
                  required
                  disabled={isSendingOtp}
                  className="w-full bg-canva-sidebar border border-canva-border rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-canva-teal font-medium disabled:opacity-50"
                />
              </div>
            </div>

            {/* Username Field */}
            <div>
              <label className="text-xs font-bold text-gray-300 uppercase tracking-wider block mb-1">
                Username <span className="text-canva-teal text-[10px] lowercase font-normal">(unique)</span>
              </label>
              <div className="relative">
                <AtSign className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value.toLowerCase().replace(/\s+/g, ''))}
                  placeholder="e.g. aish30"
                  required
                  disabled={isSendingOtp}
                  className="w-full bg-canva-sidebar border border-canva-border rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-canva-teal font-medium disabled:opacity-50"
                />
              </div>
            </div>

            {/* Mandatory Email Field */}
            <div>
              <label className="text-xs font-bold text-gray-300 uppercase tracking-wider block mb-1">
                Email Address <span className="text-red-400 text-[10px]">* (mandatory)</span>
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@domain.com"
                  required
                  disabled={isSendingOtp}
                  className="w-full bg-canva-sidebar border border-canva-border rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-canva-teal font-medium disabled:opacity-50"
                />
              </div>
            </div>

            {/* Phone Number Field */}
            <div>
              <label className="text-xs font-bold text-gray-300 uppercase tracking-wider block mb-1">
                Phone Number <span className="text-red-400 text-[10px]">*</span>
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
                <input
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="+91 9876543210"
                  required
                  disabled={isSendingOtp}
                  className="w-full bg-canva-sidebar border border-canva-border rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-canva-teal font-medium disabled:opacity-50"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="text-xs font-bold text-gray-300 uppercase tracking-wider block mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password (min 6 characters)"
                  required
                  disabled={isSendingOtp}
                  className="w-full bg-canva-sidebar border border-canva-border rounded-xl pl-10 pr-10 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-canva-teal font-medium disabled:opacity-50"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isSendingOtp}
                  className="absolute right-3.5 top-3 text-gray-400 hover:text-white"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Submit Button to Send Verification OTP */}
            <button
              type="submit"
              disabled={isSendingOtp}
              className="w-full py-3 bg-gradient-to-r from-canva-purple to-canva-purple-hover hover:opacity-95 text-white font-bold rounded-xl text-xs transition-all shadow-lg shadow-canva-purple/30 flex items-center justify-center space-x-2 transform hover:scale-[1.01] mt-2 disabled:opacity-60"
            >
              {isSendingOtp ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-white" />
                  <span>Sending Verification Code...</span>
                </>
              ) : (
                <>
                  <span>Send Email OTP Code</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        )}

        {/* Sign Up Step 2: 6-Digit OTP Verification Screen */}
        {mode === 'signup' && signupStep === 'otp' && (
          <form onSubmit={handleVerifyOtpAndRegister} className="space-y-4">
            <div className="text-center space-y-1">
              <div className="w-12 h-12 rounded-full bg-canva-teal/10 text-canva-teal flex items-center justify-center mx-auto mb-2 border border-canva-teal/30">
                <KeyRound className="w-6 h-6" />
              </div>
              <h3 className="text-sm font-bold text-white">Enter 6-Digit Code</h3>
              <p className="text-xs text-gray-400">
                A verification code was sent to <b className="text-canva-teal">{email}</b>
              </p>
            </div>

            <div>
              <label className="text-xs font-bold text-gray-300 uppercase tracking-wider block mb-1 text-center">
                Verification Code
              </label>
              <input
                type="text"
                maxLength={6}
                value={otpCode}
                onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, ''))}
                placeholder="123456"
                required
                disabled={isLoading}
                className="w-full bg-canva-sidebar border border-canva-teal/60 rounded-xl px-4 py-3 text-center text-xl tracking-[8px] text-canva-teal font-extrabold focus:outline-none focus:ring-2 focus:ring-canva-teal font-mono placeholder-gray-600 disabled:opacity-50"
              />
            </div>

            <div className="flex items-center justify-between text-xs text-gray-400 pt-1">
              <span>Code expires in: <b className="text-amber-400 font-mono">{formatTimer(timer)}</b></span>

              <button
                type="button"
                onClick={handleSendOtp as any}
                disabled={isSendingOtp || timer > 270}
                className="text-canva-teal hover:underline font-bold flex items-center space-x-1 disabled:opacity-50"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Resend Code</span>
              </button>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-gradient-to-r from-canva-purple to-canva-purple-hover hover:opacity-95 text-white font-bold rounded-xl text-xs transition-all shadow-lg shadow-canva-purple/30 flex items-center justify-center space-x-2 transform hover:scale-[1.01] mt-2 disabled:opacity-60"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-white" />
                  <span>Verifying Code & Creating Account...</span>
                </>
              ) : (
                <>
                  <span>Verify & Create Account</span>
                  <CheckCircle2 className="w-4 h-4" />
                </>
              )}
            </button>

            <button
              type="button"
              onClick={() => setSignupStep('form')}
              className="w-full text-center text-xs text-gray-500 hover:text-gray-300 pt-1 block"
            >
              ← Back to registration details
            </button>
          </form>
        )}

        {/* Security Footer Badge */}
        <div className="pt-3 border-t border-canva-border flex items-center justify-center space-x-2 text-[11px] text-gray-500 font-mono">
          <ShieldCheck className="w-4 h-4 text-canva-teal" />
          <span>Encrypted Session • Multi-User Studio</span>
        </div>
      </div>
    </div>
  );
};
