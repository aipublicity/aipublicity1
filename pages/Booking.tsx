import React, { useState } from 'react';
import { Calendar, Loader2, CheckCircle } from 'lucide-react';

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
    <div className="min-h-screen pt-20 px-4 bg-slate-950 text-white">
      <div className="max-w-xl mx-auto py-12">
        <h1 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">Book a Call</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6 bg-slate-900/50 p-8 rounded-2xl border border-slate-800 backdrop-blur-sm">
          <input type="hidden" name="form-name" value="booking" />
          
          <input required type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Your Name" className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-white focus:border-purple-400 focus:outline-none" />
          <input required type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Your Email" className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-white focus:border-purple-400 focus:outline-none" />
          <input required type="datetime-local" name="date" value={formData.date} onChange={handleChange} className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-white focus:border-purple-400 focus:outline-none [color-scheme:dark]" />
          <textarea required name="details" value={formData.details} onChange={handleChange} rows={3} placeholder="Project Details" className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-white focus:border-purple-400 focus:outline-none"></textarea>
          
          <button type="submit" disabled={status === 'submitting'} className="w-full bg-gradient-to-r from-purple-500 to-pink-600 text-white font-bold py-4 rounded-lg hover:shadow-lg hover:shadow-purple-500/20 flex items-center justify-center gap-2">
            {status === 'submitting' ? <Loader2 className="w-5 h-5 animate-spin"/> : <Calendar className="w-5 h-5"/>}
            <span>{status === 'submitting' ? 'Processing...' : 'Request Booking'}</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default Booking;