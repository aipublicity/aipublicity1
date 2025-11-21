import React, { useState } from 'react';
import { Calendar, Loader2, CheckCircle, Clock, Video } from 'lucide-react';

const Booking = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    date: '',
    details: ''
  });
  
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting'); 

    const data = new URLSearchParams();
    data.append('form-name', 'booking'); 
    Object.entries(formData).forEach(([key, value]) => data.append(key, value));

    fetch('/', {
      method: 'POST',
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: data.toString()
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Netlify Error: ${response.status}`);
      }
      setStatus('success');
      setFormData({ name: '', email: '', date: '', details: '' });
    })
    .catch((error) => {
      alert("Error: " + error.message);
      setStatus('error');
    });
  };

  if (status === 'success') {
    return (
      <div className="min-h-screen pt-20 px-4 bg-slate-950 text-white flex items-center justify-center">
        <div className="max-w-md w-full bg-slate-900/50 p-8 rounded-2xl border border-purple-500/30 backdrop-blur-sm text-center">
          <div className="w-16 h-16 bg-purple-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-8 h-8 text-purple-400" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-4">Request Received!</h2>
          <p className="text-slate-400 mb-8">We will verify your date and email you a confirmation.</p>
          <button onClick={() => setStatus('idle')} className="px-6 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-white">Book Another</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 px-4 bg-slate-950 text-white relative overflow-hidden">
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-900/20 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-blue-900/20 rounded-full blur-3xl -z-10"></div>

      <div className="max-w-6xl mx-auto py-12">
        <div className="text-center mb-16 animate-fade-in-up">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
            Book a Strategy Call
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Schedule a free consultation to discuss your brand's automation needs.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 space-y-6 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            <div className="p-6 bg-slate-900/50 border border-slate-800 rounded-2xl">
              <Video className="w-8 h-8 text-purple-400 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Video Consultation</h3>
              <p className="text-slate-400 text-sm">We'll meet via Google Meet to discuss your vision face-to-face.</p>
            </div>
            <div className="p-6 bg-slate-900/50 border border-slate-800 rounded-2xl">
              <Clock className="w-8 h-8 text-pink-400 mb-4" />
              <h3 className="text-xl font-semibold mb-2">30 Minutes</h3>
              <p className="text-slate-400 text-sm">A focused session to identify quick wins and long-term strategy.</p>
            </div>
            <div className="p-6 bg-slate-900/50 border border-slate-800 rounded-2xl">
              <Calendar className="w-8 h-8 text-blue-400 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Flexible Scheduling</h3>
              <p className="text-slate-400 text-sm">Pick a time that works for you. We are available globally.</p>
            </div>
          </div>

          <div className="lg:col-span-2 bg-slate-900/60 p-8 rounded-2xl border border-slate-800 backdrop-blur-sm animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* CORE FIX: The hidden form field needed by Netlify */}
              <input type="hidden" name="form-name" value="booking" />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300">Your Name</label>
                  <input required type="text" name="name" value={formData.name} onChange={handleChange} className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-white focus:border-purple-400 focus:ring-1 focus:ring-purple-400 focus:outline-none transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300">Email Address</label>
                  <input required type="email" name="email" value={formData.email} onChange={handleChange} className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-white focus:border-purple-400 focus:ring-1 focus:ring-purple-400 focus:outline-none transition-all" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">Preferred Date & Time</label>
                <input required type="datetime-local" name="date" value={formData.date} onChange={handleChange} className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-white focus:border-purple-400 focus:ring-1 focus:ring-purple-400 focus:outline-none transition-all [color-scheme:dark]" />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">What would you like to discuss?</label>
                <textarea required name="details" value={formData.details} onChange={handleChange} rows={4} className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-white focus:border-purple-400 focus:ring-1 focus:ring-purple-400 focus:outline-none transition-all" placeholder="Tell us about your business goals..."></textarea>
              </div>

              <button type="submit" disabled={status === 'submitting'} className="w-full bg-gradient-to-r from-purple-500 to-pink-600 text-white font-bold py-4 rounded-lg hover:shadow-lg hover:shadow-purple-500/20 transition-all flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed">
                {status === 'submitting' ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Processing...</span>
                  </>
                ) : (
                  <span>Request Booking</span>
                )}
              </button>
              
              {status === 'error' && (
                <p className="text-red-400 text-center text-sm">Error sending request. Try refreshing.</p>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;