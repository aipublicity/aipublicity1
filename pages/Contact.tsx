import React, { useState } from 'react';
import { Send, Mail, MessageSquare, CheckCircle, Loader2 } from 'lucide-react';
import { useContent } from '../context/ContentContext';

const Contact: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const { content } = useContent();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    // In a real app, this would send data to a backend
  };

  return (
    <div className="py-20 bg-slate-950 min-h-[80vh] flex items-center relative overflow-hidden">
       {/* Background Accents */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-purple-900/10 to-transparent pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Content */}
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">Let's Build Something <span className="text-cyan-400">Incredible</span></h1>
            <p className="text-slate-400 text-lg mb-10 leading-relaxed">
              Ready to scale your business with AI automation and cinematic content? 
              Fill out the form, and our team will get back to you within 24 hours.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-center space-x-4 p-5 rounded-2xl bg-white/5 border border-white/10 group hover:bg-white/10 transition-all hover:-translate-x-[-8px] duration-300 cursor-default">
                <div className="p-3 bg-cyan-500/10 rounded-xl group-hover:bg-cyan-500/20 transition-colors">
                    <Mail className="w-6 h-6 text-cyan-400 group-hover:animate-bounce" />
                </div>
                <div>
                  <p className="text-sm text-slate-500 font-medium mb-1">Email Us</p>
                  <p className="text-white font-bold text-lg">{content.contact.email}</p>
                </div>
              </div>
               <div className="flex items-center space-x-4 p-5 rounded-2xl bg-white/5 border border-white/10 group hover:bg-white/10 transition-all hover:-translate-x-[-8px] duration-300 cursor-default">
                <div className="p-3 bg-purple-500/10 rounded-xl group-hover:bg-purple-500/20 transition-colors">
                    <MessageSquare className="w-6 h-6 text-purple-400 group-hover:animate-tada" />
                </div>
                <div>
                  <p className="text-sm text-slate-500 font-medium mb-1">Live Chat</p>
                  <p className="text-white font-bold text-lg">Available Mon-Fri, 9am-5pm</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="bg-slate-900 p-8 md:p-10 rounded-3xl border border-white/10 shadow-2xl relative group">
             <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-3xl opacity-20 group-hover:opacity-40 transition duration-500 blur"></div>
            <div className="relative bg-slate-900 rounded-2xl h-full">
            {submitted ? (
              <div className="text-center py-12 flex flex-col items-center justify-center h-full">
                <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
                  <CheckCircle className="w-10 h-10 text-green-400" />
                </div>
                <h3 className="text-3xl font-bold text-white mb-3">Message Sent!</h3>
                <p className="text-slate-400 mb-8">We'll be in touch shortly.</p>
                <button onClick={() => setSubmitted(false)} className="text-cyan-400 hover:text-cyan-300 font-semibold hover:underline transition-colors">Send another message</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-400 mb-2">First Name</label>
                    <input type="text" required className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition-all placeholder-slate-600" placeholder="John" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-400 mb-2">Last Name</label>
                    <input type="text" required className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition-all placeholder-slate-600" placeholder="Doe" />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-2">Email Address</label>
                  <input type="email" required className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition-all placeholder-slate-600" placeholder="john@company.com" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-2">Service Interest</label>
                  <div className="relative">
                    <select className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition-all appearance-none">
                        <option>Growth Bundle</option>
                        <option>AI Agent Integration</option>
                        <option>Social Media Management</option>
                        <option>Custom Development</option>
                    </select>
                     <div className="absolute right-4 top-3.5 pointer-events-none text-slate-500">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                     </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-2">Message</label>
                  <textarea rows={4} className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition-all placeholder-slate-600 resize-none" placeholder="Tell us about your project..."></textarea>
                </div>

                <button type="submit" className="w-full py-4 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-xl text-white font-bold text-lg shadow-lg hover:shadow-cyan-500/25 transition-all transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2">
                  <span>Send Message</span>
                  <Send className="w-5 h-5" />
                </button>
              </form>
            )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Contact;