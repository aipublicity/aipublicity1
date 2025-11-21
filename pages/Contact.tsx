import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Loader2, CheckCircle } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');

    const data = new URLSearchParams();
    data.append('form-name', 'contact'); 
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
      setFormData({ name: '', email: '', subject: '', message: '' });
    })
    .catch((error) => {
      alert("Error: " + error.message); // This will tell us if it fails!
      setStatus('error');
    });
  };

  if (status === 'success') {
    return (
      <div className="min-h-screen pt-20 px-4 bg-slate-950 text-white flex items-center justify-center">
        <div className="max-w-md w-full bg-slate-900/50 p-8 rounded-2xl border border-cyan-500/30 backdrop-blur-sm text-center">
          <div className="w-16 h-16 bg-cyan-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-8 h-8 text-cyan-400" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-4">Message Sent!</h2>
          <p className="text-slate-400 mb-8">We have received your message.</p>
          <button onClick={() => setStatus('idle')} className="px-6 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-white">Send Another</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 px-4 bg-slate-950 text-white">
      <div className="max-w-7xl mx-auto py-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        <div className="space-y-8">
           <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">Contact Us</h1>
           <p className="text-slate-400">Ready to automate your growth? Reach out to us.</p>
           <div className="space-y-4 text-slate-400">
             <div className="flex items-center gap-4"><Mail className="w-5 h-5 text-cyan-400"/> faizbaig2000@gmail.com</div>
             <div className="flex items-center gap-4"><Phone className="w-5 h-5 text-purple-400"/> +1 (365) 866-8824</div>
             <div className="flex items-center gap-4"><MapPin className="w-5 h-5 text-pink-400"/> Toronto, Canada</div>
           </div>
        </div>

        <div className="bg-slate-900/60 p-8 rounded-2xl border border-slate-800 backdrop-blur-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            <input type="hidden" name="form-name" value="contact" />
            <input required type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-white focus:border-cyan-400 focus:outline-none" />
            <input required type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-white focus:border-cyan-400 focus:outline-none" />
            <input required type="text" name="subject" value={formData.subject} onChange={handleChange} placeholder="Subject" className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-white focus:border-cyan-400 focus:outline-none" />
            <textarea required name="message" value={formData.message} onChange={handleChange} rows={4} placeholder="Message" className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-white focus:border-cyan-400 focus:outline-none"></textarea>
            
            <button type="submit" disabled={status === 'submitting'} className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold py-4 rounded-lg hover:shadow-lg hover:shadow-cyan-500/20 flex items-center justify-center gap-2">
              {status === 'submitting' ? <Loader2 className="w-5 h-5 animate-spin"/> : <Send className="w-5 h-5"/>}
              <span>{status === 'submitting' ? 'Sending...' : 'Send Message'}</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;