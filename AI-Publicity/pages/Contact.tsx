import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CheckCircle, Package, Clock, Instagram, Home, ArrowRight } from 'lucide-react';
import { useContent } from '../context/ContentContext';
import confetti from 'canvas-confetti';

// Custom TikTok Icon
const TikTokIcon = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
);

const Contact: React.FC = () => {
  const { content } = useContent();
  const location = useLocation();
  const navigate = useNavigate();
  const packageName = location.state?.packageName;
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  useEffect(() => {
    // Load Calendly script
    const script = document.createElement('script');
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    document.body.appendChild(script);

    // Event Listener for Calendly Booking Success
    const handleCalendlyEvent = (e: MessageEvent) => {
        if (e.data.event && e.data.event === 'calendly.event_scheduled') {
            setShowSuccessModal(true);
            triggerConfetti();
            // @ts-ignore
            window.fbq('track', 'Lead');
        }
    };

    window.addEventListener('message', handleCalendlyEvent);

    return () => {
      // Cleanup
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
      window.removeEventListener('message', handleCalendlyEvent);
    };
  }, []);

  const triggerConfetti = () => {
    const duration = 5 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 60 };

    const randomInRange = (min: number, max: number) => {
      return Math.random() * (max - min) + min;
    }

    const interval: any = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      // since particles fall down, start a bit higher than random
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
    }, 250);
  };

  return (
    <div className="min-h-screen bg-slate-950 pt-32 pb-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden flex items-center">
       {/* Background Accents */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
         <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[100px] animate-pulse duration-[5000ms]"></div>
         <div className="absolute bottom-[10%] right-[10%] w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-[100px] animate-pulse duration-[4000ms] delay-1000"></div>
      </div>
      
      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-xl animate-fade-in-up">
            <div className="max-w-lg w-full bg-gradient-to-br from-slate-900 to-slate-950 border border-white/10 rounded-3xl p-8 md:p-12 shadow-[0_0_50px_rgba(34,211,238,0.2)] text-center relative overflow-hidden">
                {/* Glow */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-cyan-500/20 blur-3xl pointer-events-none"></div>
                
                <div className="relative z-10">
                    <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6 ring-1 ring-green-500/50 animate-bounce">
                        <CheckCircle className="w-10 h-10 text-green-400" />
                    </div>
                    
                    <h2 className="text-4xl font-extrabold text-white mb-2">You're Booked! 🎉</h2>
                    <p className="text-slate-400 text-lg mb-8">
                        Please check your email for the calendar invite.
                    </p>

                    <div className="bg-white/5 rounded-2xl p-6 border border-white/5 mb-8">
                        <p className="text-sm font-semibold text-slate-300 mb-4 uppercase tracking-wide">
                            While you wait, stay updated:
                        </p>
                        <div className="flex justify-center gap-6">
                            <a 
                                href="https://www.instagram.com/ai.publicity" 
                                target="_blank" 
                                rel="noreferrer"
                                className="flex flex-col items-center gap-2 group"
                            >
                                <div className="w-12 h-12 bg-slate-900 border border-white/10 rounded-xl flex items-center justify-center group-hover:bg-pink-500/20 group-hover:border-pink-500/50 transition-all group-hover:-translate-y-1">
                                    <Instagram className="w-6 h-6 text-slate-400 group-hover:text-pink-500" />
                                </div>
                                <span className="text-xs text-slate-500 group-hover:text-white transition-colors">Instagram</span>
                            </a>
                            <a 
                                href="https://www.tiktok.com/@ai.publicity" 
                                target="_blank" 
                                rel="noreferrer"
                                className="flex flex-col items-center gap-2 group"
                            >
                                <div className="w-12 h-12 bg-slate-900 border border-white/10 rounded-xl flex items-center justify-center group-hover:bg-cyan-500/20 group-hover:border-cyan-500/50 transition-all group-hover:-translate-y-1">
                                    <TikTokIcon className="w-6 h-6 text-slate-400 group-hover:text-cyan-400" />
                                </div>
                                <span className="text-xs text-slate-500 group-hover:text-white transition-colors">TikTok</span>
                            </a>
                        </div>
                    </div>

                    <button 
                        onClick={() => navigate('/')}
                        className="w-full py-4 rounded-xl font-bold bg-gradient-to-r from-purple-600 to-cyan-600 text-white shadow-lg hover:shadow-cyan-500/30 hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
                    >
                        <span>Back to Home</span>
                        <ArrowRight className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto w-full relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        
        {/* Left Column: Value Prop or Booking Details */}
        <div className="flex flex-col justify-center space-y-10 order-1 lg:order-none">
          
          {packageName ? (
            // Booking Details Card (When coming from Services)
            <div className="animate-fade-in-up bg-slate-900/50 backdrop-blur-xl border border-white/10 p-8 rounded-3xl relative overflow-hidden group">
                {/* Glow */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl -mr-16 -mt-16 pointer-events-none"></div>

                <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-6">
                        <span className="flex h-2 w-2 rounded-full bg-cyan-400 animate-pulse"></span>
                        <span className="text-xs font-bold tracking-widest text-slate-400 uppercase">Selected Package</span>
                    </div>

                    <div className="flex items-start gap-4 mb-8">
                        <div className="p-3 bg-gradient-to-br from-purple-600/20 to-blue-600/20 border border-white/10 rounded-xl">
                            <Package className="w-8 h-8 text-cyan-400" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-white mb-1">{packageName}</h2>
                            <div className="flex items-center gap-2 text-slate-400 text-sm">
                                <Clock className="w-4 h-4" />
                                <span>30 Minute Session</span>
                            </div>
                        </div>
                    </div>

                    <p className="text-slate-300 leading-relaxed border-l-2 border-purple-500/30 pl-4 mb-8">
                        We'll discuss your specific needs for the <span className="text-white font-semibold">{packageName}</span> and how AI Publicity can automate your growth.
                    </p>
                    
                    <div className="pt-6 border-t border-white/5 flex items-center gap-2 text-sm text-slate-500">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span>Strategy Call reserved for serious inquiries</span>
                    </div>
                </div>
            </div>
          ) : (
            // Default Value Prop
            <>
              <div className="animate-fade-in-up">
                 <div className="inline-flex items-center space-x-2 bg-slate-900 border border-cyan-500/30 rounded-full px-4 py-1.5 mb-6 shadow-[0_0_15px_rgba(34,211,238,0.2)]">
                   <span className="flex h-2 w-2 rounded-full bg-cyan-400 animate-pulse"></span>
                   <span className="text-sm text-cyan-300 font-bold tracking-wide uppercase">Strategy Session</span>
                 </div>
                 
                 <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-tight">
                   Unlock Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">AI Advantage</span>
                 </h1>
                 <p className="text-slate-300 text-lg md:text-xl leading-relaxed max-w-lg">
                   Book a free 30-minute strategy call to see how we can automate your growth.
                 </p>
              </div>

              <ul className="space-y-6 animate-fade-in-up" style={{animationDelay: '100ms'}}>
                {[
                  "Comprehensive Brand Audit",
                  "Custom AI Implementation Roadmap",
                  "Clear Pricing & ROI Projections"
                ].map((item, i) => (
                  <li key={i} className="flex items-center space-x-4 group">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-slate-900 border border-cyan-500/20 flex items-center justify-center group-hover:border-cyan-500/50 group-hover:scale-110 transition-all duration-300 shadow-lg shadow-cyan-500/10">
                      <CheckCircle className="w-6 h-6 text-cyan-400" />
                    </div>
                    <span className="text-lg text-white font-medium group-hover:text-cyan-100 transition-colors">{item}</span>
                  </li>
                ))}
              </ul>
              
              <div className="pt-6 border-t border-white/10 animate-fade-in-up" style={{animationDelay: '200ms'}}>
                <p className="text-slate-500 italic">
                  "No pressure. No obligation. Just strategy."
                </p>
              </div>
            </>
          )}
        </div>

        {/* Right Column: Calendar Widget */}
        <div className="relative order-2 lg:order-none animate-fade-in-up" style={{animationDelay: '300ms'}}>
           {/* Glow Effect */}
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-cyan-500/20 blur-3xl rounded-full pointer-events-none"></div>

           {/* Glassmorphism Card */}
           <div className="relative bg-slate-900/50 backdrop-blur-xl border border-slate-700 rounded-3xl overflow-hidden shadow-2xl">
              {/* Calendly Inline Widget */}
              <div 
                className="calendly-inline-widget" 
                data-url="https://calendly.com/faizbaig2000/30-minute-strategy-call?hide_event_type_details=1&hide_gdpr_banner=1&background_color=020617&text_color=ffffff&primary_color=22d3ee" 
                style={{ minWidth: '320px', height: '700px', width: '100%' }} 
              />
           </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;