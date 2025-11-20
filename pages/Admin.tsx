import React, { useState, useEffect } from 'react';
import { useContent } from '../context/ContentContext';
import { Save, RotateCcw, LayoutDashboard, Type, MessageSquare, Image as ImageIcon, Lock, Key, LogOut, Loader2, ShieldCheck, AlertTriangle, Mail, Timer } from 'lucide-react';

// Security Constants
const ACCESS_LOCK = "MTFRdmNtamRqdXoxIg=="; // Hash of '00Publicity0!'
const MAX_ATTEMPTS = 3;
const LOCKOUT_DURATION = 30 * 60 * 1000; // 30 minutes

type AuthStep = 'PASSWORD' | '2FA' | 'LOCKED' | 'DASHBOARD';

const Admin: React.FC = () => {
  const { content, updateContent, resetContent } = useContent();
  const [activeTab, setActiveTab] = useState<'hero' | 'about' | 'contact' | 'branding'>('hero');
  const [notification, setNotification] = useState<string | null>(null);

  // Authentication State
  const [authStep, setAuthStep] = useState<AuthStep>('PASSWORD');
  const [inputVal, setInputVal] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  // 2FA State
  const [generatedCode, setGeneratedCode] = useState<string | null>(null);
  
  // Lockout State
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [lockoutEndTime, setLockoutEndTime] = useState<number | null>(null);

  useEffect(() => {
    // Check Session
    const authSession = sessionStorage.getItem('admin_secure_session');
    if (authSession === ACCESS_LOCK) {
      setAuthStep('DASHBOARD');
      return;
    }

    // Check Lockout
    const storedLockout = localStorage.getItem('admin_lock_until');
    const storedAttempts = localStorage.getItem('admin_lock_attempts');
    
    if (storedLockout) {
      const lockoutTime = parseInt(storedLockout);
      if (Date.now() < lockoutTime) {
        setAuthStep('LOCKED');
        setLockoutEndTime(lockoutTime);
      } else {
        // Lockout expired
        localStorage.removeItem('admin_lock_until');
        localStorage.setItem('admin_lock_attempts', '0');
        setFailedAttempts(0);
      }
    } else if (storedAttempts) {
      setFailedAttempts(parseInt(storedAttempts));
    }
  }, []);

  // Handle Failed Attempt
  const recordFailure = () => {
    const newAttempts = failedAttempts + 1;
    setFailedAttempts(newAttempts);
    localStorage.setItem('admin_lock_attempts', newAttempts.toString());

    if (newAttempts >= MAX_ATTEMPTS) {
      const lockUntil = Date.now() + LOCKOUT_DURATION;
      localStorage.setItem('admin_lock_until', lockUntil.toString());
      setLockoutEndTime(lockUntil);
      setAuthStep('LOCKED');
      setErrorMsg('Maximum attempts exceeded. Browser locked.');
    }
  };

  // Password Verification
  const verifyAccess = (input: string): boolean => {
    try {
      const hash = btoa(input.split('').map(c => String.fromCharCode(c.charCodeAt(0) + 1)).join(''));
      return hash === ACCESS_LOCK;
    } catch (e) {
      return false;
    }
  };

  // Send Email Simulation
  const sendVerificationCode = async () => {
    setIsLoading(true);
    // Simulate Network Request
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedCode(code);
    
    // SIMULATED EMAIL SERVICE
    console.group('%c 📧 Email Service Simulation ', 'color: #22d3ee; background: #0f172a; padding: 5px; border-radius: 4px; font-weight: bold;');
    console.log(`%c To: faizbaig2000@gmail.com`, 'color: #94a3b8');
    console.log(`%c Subject: Admin Verification Code`, 'color: #94a3b8');
    console.log(`%c Body: Your verification code is: ${code}`, 'color: #e2e8f0; font-size: 14px; font-weight: bold;');
    console.groupEnd();

    setAuthStep('2FA');
    setInputVal('');
    setErrorMsg('');
    setIsLoading(false);
    alert("Verification code sent to faizbaig2000@gmail.com\n(Check browser console for simulation)");
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (authStep === 'PASSWORD') {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (verifyAccess(inputVal)) {
        // Password Correct - Trigger 2FA
        await sendVerificationCode();
      } else {
        recordFailure();
        setErrorMsg('Access Denied: Invalid Credentials');
        setIsLoading(false);
      }
    } else if (authStep === '2FA') {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));

      if (inputVal === generatedCode) {
        // Success
        setAuthStep('DASHBOARD');
        sessionStorage.setItem('admin_secure_session', ACCESS_LOCK);
        localStorage.setItem('admin_lock_attempts', '0'); // Reset attempts on success
      } else {
        recordFailure();
        setErrorMsg('Invalid Verification Code');
        setIsLoading(false);
      }
    }
  };

  const handleLogout = () => {
    setAuthStep('PASSWORD');
    sessionStorage.removeItem('admin_secure_session');
    setInputVal('');
    setGeneratedCode(null);
  };

  const handleSave = () => {
    setNotification('Changes saved successfully!');
    setTimeout(() => setNotification(null), 3000);
  };

  const tabs = [
    { id: 'hero', label: 'Home Page', icon: LayoutDashboard },
    { id: 'about', label: 'About Page', icon: Type },
    { id: 'contact', label: 'Contact Info', icon: MessageSquare },
    { id: 'branding', label: 'Branding', icon: ImageIcon },
  ];

  // LOCKED SCREEN
  if (authStep === 'LOCKED') {
    return (
       <div className="py-24 px-4 min-h-[60vh] flex items-center justify-center">
         <div className="max-w-md w-full bg-slate-900/80 backdrop-blur-md rounded-3xl border border-red-500/30 p-8 shadow-2xl text-center relative overflow-hidden">
             <div className="absolute inset-0 bg-red-500/5 animate-pulse"></div>
             <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-red-500/20">
                <Lock className="w-10 h-10 text-red-500" />
             </div>
             <h2 className="text-2xl font-bold text-white mb-2">Security Lockout</h2>
             <p className="text-slate-400 mb-6">
               Too many failed attempts. For security reasons, this browser has been locked temporarily.
             </p>
             {lockoutEndTime && (
               <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-950 rounded-lg border border-white/10 text-red-400 font-mono text-sm">
                 <Timer className="w-4 h-4" />
                 <span>Try again after {new Date(lockoutEndTime).toLocaleTimeString()}</span>
               </div>
             )}
         </div>
       </div>
    );
  }

  // LOGIN / 2FA SCREEN
  if (authStep !== 'DASHBOARD') {
    return (
      <div className="py-24 px-4 min-h-[60vh] flex items-center justify-center relative">
        
        {/* Central Card */}
        <div className="max-w-md w-full bg-slate-900/90 backdrop-blur-xl rounded-3xl border border-white/10 p-8 shadow-[0_0_50px_rgba(0,0,0,0.5)] relative z-10">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-cyan-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg p-0.5">
               <div className="w-full h-full bg-slate-900 rounded-[14px] flex items-center justify-center">
                  {authStep === '2FA' ? (
                    <Mail className="w-8 h-8 text-cyan-400 animate-bounce" />
                  ) : (
                    <ShieldCheck className="w-8 h-8 text-purple-400" />
                  )}
               </div>
            </div>
            <h2 className="text-2xl font-bold text-white mb-1">
                {authStep === '2FA' ? 'Verification Required' : 'Admin Portal'}
            </h2>
            <p className="text-slate-400 text-xs uppercase tracking-widest">
                {authStep === '2FA' ? 'Check your email' : 'Secure Access'}
            </p>
          </div>
          
          <form onSubmit={handleLoginSubmit} className="space-y-6">
            <div>
              <div className="relative group">
                {authStep === 'PASSWORD' ? (
                     <Key className={`absolute left-4 top-3.5 w-5 h-5 transition-colors ${errorMsg ? 'text-red-500' : 'text-slate-500 group-focus-within:text-purple-400'}`} />
                ) : (
                     <Lock className={`absolute left-4 top-3.5 w-5 h-5 transition-colors ${errorMsg ? 'text-red-500' : 'text-slate-500 group-focus-within:text-cyan-400'}`} />
                )}
               
                <input
                  type={authStep === 'PASSWORD' ? 'password' : 'text'}
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                  className={`w-full pl-12 pr-4 py-3.5 rounded-xl bg-slate-950 border text-white focus:ring-2 outline-none placeholder-slate-600 transition-all ${errorMsg ? 'border-red-500/50 focus:ring-red-500' : 'border-slate-800 focus:ring-cyan-500 focus:border-transparent'}`}
                  placeholder={authStep === 'PASSWORD' ? 'Enter security key' : 'Enter 6-digit code'}
                  autoFocus
                  disabled={isLoading}
                  maxLength={authStep === '2FA' ? 6 : undefined}
                />
              </div>
              
              {authStep === '2FA' && (
                  <p className="mt-3 text-xs text-slate-500 text-center">
                      Code sent to <span className="text-white">faizbaig2000@gmail.com</span>
                  </p>
              )}

              {errorMsg && (
                <div className="mt-4 text-red-400 text-xs font-bold text-center flex items-center justify-center bg-red-500/10 py-2 rounded-lg border border-red-500/20 animate-shake">
                   <AlertTriangle className="w-3 h-3 mr-2" />
                   {errorMsg}
                </div>
              )}

              {failedAttempts > 0 && (
                  <p className="text-center text-xs text-red-400/70 mt-2">
                      {MAX_ATTEMPTS - failedAttempts} attempt(s) remaining
                  </p>
              )}
            </div>
            
            <button
              type="submit"
              disabled={isLoading || !inputVal}
              className={`w-full py-4 rounded-xl text-white font-bold text-lg shadow-lg transition-all transform flex items-center justify-center gap-2 ${
                  isLoading 
                  ? 'bg-slate-800 cursor-not-allowed opacity-80' 
                  : 'bg-gradient-to-r from-purple-600 to-cyan-600 hover:shadow-cyan-500/25 hover:scale-[1.02] active:scale-[0.98]'
              }`}
            >
              {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Verifying...
                  </>
              ) : (
                  authStep === 'PASSWORD' ? 'Continue' : 'Verify Login'
              )}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // DASHBOARD UI
  return (
    <div className="min-h-screen bg-slate-950 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <div>
             <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
             <div className="flex items-center gap-2 mt-1">
                 <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                 <p className="text-slate-400 text-sm">Secure Session Active</p>
             </div>
          </div>
          <div className="flex items-center space-x-3">
            <button 
              onClick={resetContent}
              className="flex items-center px-4 py-2 bg-slate-800 text-slate-300 rounded-lg hover:bg-red-500/10 hover:text-red-400 transition-colors text-sm border border-white/5 hover:border-red-500/30"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset Defaults
            </button>
            <button 
              onClick={handleLogout}
              className="flex items-center px-4 py-2 bg-slate-800 text-slate-300 rounded-lg hover:bg-slate-700 transition-colors text-sm border border-white/5"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </button>
          </div>
        </div>

        <div className="bg-slate-900 rounded-2xl border border-white/10 overflow-hidden flex flex-col md:flex-row min-h-[600px] shadow-2xl">
          {/* Sidebar */}
          <div className="w-full md:w-64 bg-slate-950/50 border-r border-white/10 p-4">
            <div className="space-y-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-purple-600/20 to-cyan-600/20 text-cyan-400 border border-cyan-500/30'
                      : 'text-slate-400 hover:bg-slate-800 hover:text-white border border-transparent'
                  }`}
                >
                  <tab.icon className={`w-5 h-5 ${activeTab === tab.id ? 'text-cyan-400' : 'text-slate-500'}`} />
                  <span className="font-medium">{tab.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Content Area */}
          <div className="flex-1 p-8 relative">
            {activeTab === 'hero' && (
              <div className="space-y-6 animate-fade-in-up">
                <div className="flex items-center space-x-3 mb-6 pb-6 border-b border-white/5">
                    <div className="p-2 bg-purple-500/10 rounded-lg">
                        <LayoutDashboard className="w-6 h-6 text-purple-400" />
                    </div>
                    <h2 className="text-xl font-bold text-white">Home Hero Section</h2>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-2">Headline</label>
                  <input
                    type="text"
                    value={content.hero.title}
                    onChange={(e) => updateContent('hero', { title: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-slate-950 border border-slate-800 text-white focus:ring-2 focus:ring-cyan-500 outline-none transition-all focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-2">Subtitle</label>
                  <textarea
                    rows={3}
                    value={content.hero.subtitle}
                    onChange={(e) => updateContent('hero', { subtitle: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-slate-950 border border-slate-800 text-white focus:ring-2 focus:ring-cyan-500 outline-none transition-all focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-2">Call to Action Button</label>
                  <input
                    type="text"
                    value={content.hero.ctaText}
                    onChange={(e) => updateContent('hero', { ctaText: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-slate-950 border border-slate-800 text-white focus:ring-2 focus:ring-cyan-500 outline-none transition-all focus:border-transparent"
                  />
                </div>
              </div>
            )}

            {activeTab === 'about' && (
              <div className="space-y-6 animate-fade-in-up">
                <div className="flex items-center space-x-3 mb-6 pb-6 border-b border-white/5">
                    <div className="p-2 bg-purple-500/10 rounded-lg">
                        <Type className="w-6 h-6 text-purple-400" />
                    </div>
                    <h2 className="text-xl font-bold text-white">About Content</h2>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-2">Mission Statement</label>
                  <textarea
                    rows={4}
                    value={content.about.mission}
                    onChange={(e) => updateContent('about', { mission: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-slate-950 border border-slate-800 text-white focus:ring-2 focus:ring-cyan-500 outline-none transition-all focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-2">Vision Statement</label>
                  <textarea
                    rows={4}
                    value={content.about.vision}
                    onChange={(e) => updateContent('about', { vision: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-slate-950 border border-slate-800 text-white focus:ring-2 focus:ring-cyan-500 outline-none transition-all focus:border-transparent"
                  />
                </div>
              </div>
            )}

            {activeTab === 'contact' && (
              <div className="space-y-6 animate-fade-in-up">
                <div className="flex items-center space-x-3 mb-6 pb-6 border-b border-white/5">
                    <div className="p-2 bg-purple-500/10 rounded-lg">
                        <MessageSquare className="w-6 h-6 text-purple-400" />
                    </div>
                    <h2 className="text-xl font-bold text-white">Contact Information</h2>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-2">Email Address</label>
                  <input
                    type="text"
                    value={content.contact.email}
                    onChange={(e) => updateContent('contact', { email: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-slate-950 border border-slate-800 text-white focus:ring-2 focus:ring-cyan-500 outline-none transition-all focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-2">Phone Number</label>
                  <input
                    type="text"
                    value={content.contact.phone}
                    onChange={(e) => updateContent('contact', { phone: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-slate-950 border border-slate-800 text-white focus:ring-2 focus:ring-cyan-500 outline-none transition-all focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-2">Physical Address</label>
                  <input
                    type="text"
                    value={content.contact.address}
                    onChange={(e) => updateContent('contact', { address: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-slate-950 border border-slate-800 text-white focus:ring-2 focus:ring-cyan-500 outline-none transition-all focus:border-transparent"
                  />
                </div>
              </div>
            )}
            
            {activeTab === 'branding' && (
              <div className="space-y-6 animate-fade-in-up">
                <div className="flex items-center space-x-3 mb-6 pb-6 border-b border-white/5">
                    <div className="p-2 bg-purple-500/10 rounded-lg">
                        <ImageIcon className="w-6 h-6 text-purple-400" />
                    </div>
                    <h2 className="text-xl font-bold text-white">Branding & Logos</h2>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-2">Logo URL</label>
                  <input
                    type="text"
                    value={content.branding?.logoUrl || ''}
                    onChange={(e) => updateContent('branding', { logoUrl: e.target.value })}
                    placeholder="https://example.com/my-logo.png"
                    className="w-full px-4 py-3 rounded-lg bg-slate-950 border border-slate-800 text-white focus:ring-2 focus:ring-cyan-500 outline-none mb-4 transition-all focus:border-transparent"
                  />
                  <p className="text-xs text-slate-500">
                    Paste a direct link to your logo image. It will automatically replace the default icon in the navigation and footer.
                  </p>
                </div>
                
                <div className="mt-8">
                    <h3 className="text-sm font-medium text-slate-400 mb-4">Preview</h3>
                    <div className="p-8 bg-slate-950 rounded-xl border border-slate-800 inline-flex flex-col items-center justify-center min-w-[200px]">
                        {content.branding?.logoUrl ? (
                            <img src={content.branding.logoUrl} alt="Logo Preview" className="h-16 w-auto object-contain" />
                        ) : (
                            <div className="text-slate-500 italic text-sm">No logo set</div>
                        )}
                        <span className="text-xs text-slate-600 mt-4">Navbar Size</span>
                    </div>
                </div>
              </div>
            )}

            {/* Save Action Bar */}
            <div className="mt-8 pt-8 border-t border-white/10 flex items-center justify-between">
                <div className="h-6">
                  {notification && (
                      <div className="flex items-center space-x-2 text-green-400 text-sm animate-fade-in-up">
                         <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                         <span>{notification}</span>
                      </div>
                  )}
                </div>
              <button 
                onClick={handleSave}
                className="flex items-center px-8 py-3 bg-gradient-to-r from-purple-600 to-cyan-600 text-white font-bold rounded-xl hover:shadow-[0_0_20px_rgba(34,211,238,0.3)] transition-all transform hover:scale-105"
              >
                <Save className="w-5 h-5 mr-2" />
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;