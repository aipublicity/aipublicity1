import React, { useState } from 'react';
import { Send, Heart, Users, Video, TrendingUp, Instagram, CheckCircle, ArrowRight } from 'lucide-react';
import FreeAdsTimeline from '../components/FreeAdsTimeline';

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

const FreeAds: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    socialHandle: '',
    email: '',
    phone: '',
    businessType: '',
    budget: '',
    goals: '',
    additionalInfo: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Calculate Form Progress based on required fields
  const calculateProgress = () => {
    let filled = 0;
    const requiredFields = ['name', 'email', 'phone', 'businessType', 'budget', 'goals'];
    
    requiredFields.forEach(field => {
      if (formData[field as keyof typeof formData].trim().length > 0) {
        filled++;
      }
    });
    
    return (filled / requiredFields.length) * 100;
  };

  const progress = calculateProgress();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const encode = (data: Record<string, string>) => {
      return Object.keys(data)
        .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
        .join("&");
    };

    fetch('/', {
      method: 'POST',
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode({
        "form-name": "free-ads",
        "bot-field": "", // Explicitly include the honeypot field
        ...formData
      })
    })
    .then((response) => {
      if (response.ok) {
        setSubmitted(true);
        window.scrollTo(0, 0);
      } else {
        alert("There was an issue submitting your application. Please try again.");
      }
    })
    .catch((error) => {
      alert("Network error. Please try again later.");
      console.error(error);
    });
  };

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Hero Section */}
      <div className="relative py-24 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
            <div className="absolute top-[-10%] left-[20%] w-96 h-96 bg-purple-600/10 rounded-full blur-3xl animate-pulse duration-[5000ms]"></div>
            <div className="absolute bottom-[10%] right-[10%] w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl animate-pulse duration-[4000ms] delay-1000"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center space-x-2 bg-purple-500/10 border border-purple-500/20 rounded-full px-4 py-1.5 mb-8 shadow-[0_0_15px_rgba(168,85,247,0.2)]">
            <Heart className="w-4 h-4 text-purple-400 animate-beat" />
            <span className="text-sm text-purple-300 font-bold">Community Initiative</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight mb-6 drop-shadow-xl">
            Free Ads
          </h1>
          
          <p className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto mb-10 leading-relaxed">
            Helping local businesses grow, one free ad at a time. We are building a community of like-minded entrepreneurs who support each other and rise together.
          </p>
        </div>
      </div>

      {/* Info / Value Props */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-slate-900/50 p-8 rounded-3xl border border-white/5 text-center group hover:border-cyan-500/30 transition-all duration-500 hover:bg-slate-900 hover:-translate-y-2 hover:shadow-lg">
            <div className="w-16 h-16 bg-cyan-500/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-cyan-500/20 transition-colors">
              <Video className="w-8 h-8 text-cyan-400 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-300 transition-colors">High-Quality Production</h3>
            <p className="text-slate-400 leading-relaxed">Professional, cinematic ad created specifically for your brand, completely free of charge.</p>
          </div>
          
          <div className="bg-slate-900/50 p-8 rounded-3xl border border-white/5 text-center group hover:border-purple-500/30 transition-all duration-500 hover:bg-slate-900 hover:-translate-y-2 hover:shadow-lg">
            <div className="w-16 h-16 bg-purple-500/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-purple-500/20 transition-colors">
              <Users className="w-8 h-8 text-purple-400 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3 group-hover:text-purple-300 transition-colors">Community Growth</h3>
            <p className="text-slate-400 leading-relaxed">Join a network of business owners. We limit this to one video per business to maximize our reach.</p>
          </div>

          <div className="bg-slate-900/50 p-8 rounded-3xl border border-white/5 text-center group hover:border-blue-500/30 transition-all duration-500 hover:bg-slate-900 hover:-translate-y-2 hover:shadow-lg">
            <div className="w-16 h-16 bg-blue-500/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-500/20 transition-colors">
              <TrendingUp className="w-8 h-8 text-blue-400 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-300 transition-colors">Tangible Results</h3>
            <p className="text-slate-400 leading-relaxed">Designed to generate leads, followers, and real impact for your local business.</p>
          </div>
        </div>
      </div>
      
      {/* Process Timeline */}
      <FreeAdsTimeline />

      {/* Form Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="bg-slate-900 rounded-3xl border border-white/10 overflow-hidden shadow-2xl relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-[2rem] opacity-20 group-hover:opacity-30 transition duration-1000 blur-lg"></div>
          <div className="relative bg-slate-900 rounded-3xl h-full flex flex-col">
            
          {/* Progress Bar */}
          {!submitted && (
            <div className="w-full h-1.5 bg-slate-800">
              <div 
                className="h-full bg-gradient-to-r from-purple-500 to-cyan-400 transition-all duration-500 ease-out shadow-[0_0_10px_rgba(34,211,238,0.5)]"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          )}

          <div className="bg-gradient-to-r from-purple-900/80 to-slate-900 p-10 text-center border-b border-white/10">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">Get Featured Today</h2>
            <p className="text-slate-300 text-lg">Apply now to be the next business featured in our Free Ads Series.</p>
          </div>
          
          <div className="p-8 md:p-12">
            {submitted ? (
               <div className="text-center py-12 flex flex-col items-center">
                <div className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
                  <CheckCircle className="w-12 h-12 text-green-400" />
                </div>
                <h3 className="text-3xl font-bold text-white mb-4">Application Received!</h3>
                <p className="text-slate-400 max-w-md mx-auto mb-8 text-lg leading-relaxed">
                  Thank you for applying. We will review your business details and reach out if you are selected for the next slot in our series!
                </p>
                
                {/* Instagram Accelerator Section */}
                <div className="max-w-md w-full bg-gradient-to-br from-slate-800/50 to-purple-900/20 rounded-2xl p-6 border border-purple-500/30 mb-10 animate-fade-in-up relative overflow-hidden group/insta">
                   <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 via-pink-500/5 to-purple-500/5 opacity-0 group-hover/insta:opacity-100 transition-opacity duration-500"></div>
                   <div className="relative z-10 flex flex-col items-center">
                      <a 
                        href="https://www.instagram.com/ai.publicity/" 
                        target="_blank" 
                        rel="noreferrer"
                        className="w-16 h-16 mb-4 bg-gradient-to-tr from-yellow-500 via-red-500 to-purple-600 rounded-2xl shadow-lg flex items-center justify-center hover:scale-110 hover:rotate-3 transition-all duration-300"
                      >
                        <Instagram className="w-8 h-8 text-white" />
                      </a>
                      <p className="text-slate-200 text-center leading-relaxed">
                        To speed up your application, please follow us on Instagram{' '}
                        <a 
                          href="https://www.instagram.com/ai.publicity/" 
                          target="_blank" 
                          rel="noreferrer"
                          className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-pink-500 hover:from-orange-300 hover:to-pink-400 transition-all"
                        >
                           @AI.Publicity
                        </a>
                        {' '}and send us a DM saying <span className="font-bold text-white italic">"Applied"</span>
                      </p>
                   </div>
                </div>

                <button onClick={() => setSubmitted(false)} className="text-cyan-400 font-semibold hover:underline hover:text-cyan-300 transition-colors">Submit another application</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                <input type="hidden" name="form-name" value="free-ads" />
                
                {/* Personal Info */}
                <div className="space-y-4">
                    <h4 className="text-sm uppercase tracking-wider text-slate-500 font-semibold flex items-center gap-2">
                        <span className="w-8 h-[1px] bg-slate-700"></span> Personal Details
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-slate-400 mb-2">Full Name</label>
                        <input 
                        type="text" 
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white focus:ring-2 focus:ring-cyan-500 outline-none transition-all placeholder-slate-600" 
                        placeholder="Your Name" 
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-400 mb-2">
                        <span className="flex items-center gap-1">
                            Social Username <span className="text-slate-600 text-xs">(Optional)</span>
                        </span>
                        </label>
                        <div className="relative">
                            <div className="absolute left-3 top-3.5 text-slate-500">@</div>
                            <input 
                            type="text" 
                            name="socialHandle"
                            value={formData.socialHandle}
                            onChange={handleChange}
                            className="w-full pl-8 pr-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white focus:ring-2 focus:ring-cyan-500 outline-none transition-all placeholder-slate-600" 
                            placeholder="instagram_handle" 
                            />
                        </div>
                    </div>
                    </div>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-slate-400 mb-2">Email Address</label>
                            <input 
                            type="email" 
                            name="email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white focus:ring-2 focus:ring-cyan-500 outline-none transition-all placeholder-slate-600" 
                            placeholder="you@company.com" 
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-400 mb-2">Phone Number</label>
                            <input 
                            type="tel" 
                            name="phone"
                            required
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white focus:ring-2 focus:ring-cyan-500 outline-none transition-all placeholder-slate-600" 
                            placeholder="+1 (555) 000-0000" 
                            />
                        </div>
                    </div>
                </div>

                {/* Business Info */}
                <div className="space-y-4">
                     <h4 className="text-sm uppercase tracking-wider text-slate-500 font-semibold flex items-center gap-2">
                        <span className="w-8 h-[1px] bg-slate-700"></span> Business Details
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-slate-400 mb-2">Type of Business</label>
                            <input 
                            type="text" 
                            name="businessType"
                            required
                            value={formData.businessType}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white focus:ring-2 focus:ring-cyan-500 outline-none transition-all placeholder-slate-600" 
                            placeholder="e.g. Coffee Shop, Real Estate, Gym" 
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-400 mb-2">Estimated Marketing Budget</label>
                            <div className="relative">
                                <select 
                                    name="budget"
                                    required
                                    value={formData.budget}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white focus:ring-2 focus:ring-cyan-500 outline-none transition-all appearance-none"
                                >
                                    <option value="">Select a range...</option>
                                    <option value="$0 - $500/mo">$0 - $500/mo</option>
                                    <option value="$500 - $1,000/mo">$500 - $1,000/mo</option>
                                    <option value="$1,000 - $3,000/mo">$1,000 - $3,000/mo</option>
                                    <option value="$3,000+/mo">$3,000+/mo</option>
                                </select>
                                <div className="absolute right-4 top-3.5 pointer-events-none text-slate-500">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Goals & Questions */}
                <div className="space-y-4">
                     <h4 className="text-sm uppercase tracking-wider text-slate-500 font-semibold flex items-center gap-2">
                        <span className="w-8 h-[1px] bg-slate-700"></span> Your Vision
                    </h4>
                    <div>
                    <label className="block text-sm font-medium text-slate-400 mb-2">Marketing Goals</label>
                    <textarea 
                        name="goals"
                        required
                        value={formData.goals}
                        onChange={handleChange}
                        rows={3}
                        className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white focus:ring-2 focus:ring-cyan-500 outline-none transition-all placeholder-slate-600 resize-none" 
                        placeholder="e.g. Get more leads, Increase brand awareness, Grow followers..." 
                    ></textarea>
                    </div>

                    <div>
                    <label className="block text-sm font-medium text-slate-400 mb-2">Anything else we should know?</label>
                    <textarea 
                        name="additionalInfo"
                        value={formData.additionalInfo}
                        onChange={handleChange}
                        rows={3}
                        className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white focus:ring-2 focus:ring-cyan-500 outline-none transition-all placeholder-slate-600 resize-none" 
                        placeholder="Tell us about your business story..." 
                    ></textarea>
                    </div>
                </div>

                <button 
                  type="submit" 
                  className={`w-full py-4 rounded-xl text-white font-bold text-lg transition-all transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 group ${
                    progress === 100 
                    ? 'bg-gradient-to-r from-cyan-500 to-purple-600 shadow-[0_0_30px_rgba(34,211,238,0.4)] animate-pulse ring-1 ring-cyan-400' 
                    : 'bg-gradient-to-r from-purple-600 to-cyan-600 shadow-xl hover:shadow-purple-500/25'
                  }`}
                >
                  <span>Submit Application</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <p className="text-xs text-slate-500 text-center mt-2">
                  Limited to one free video per business. By submitting, you agree to our community guidelines.
                </p>
              </form>
            )}
          </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FreeAds;