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
    data.append('form-name', 'contact'); // MATCHES HIDDEN FORM IN INDEX.HTML
    Object.entries(formData).forEach(([key, value]) => data.append(key, value));

    fetch('/', {
      method: 'POST',
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: data.toString()
    })
    .then(() => {
      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    })
    .catch((error) => {
      console.error("Form error:", error);
      setStatus('error');
    });
  };

  if (status === 'success') {
    return (
      <div className="min-h-screen pt-20 px-4 bg-slate-950 text-white flex items-center justify-center">
        <div className="max-w-md w-full bg-slate-900/50 p-8 rounded-2xl border border-cyan-500/30 backdrop-blur-sm text-center animate-fade-in-up">
          <div className="w-16 h-16 bg-cyan-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-8 h-8 text-cyan-400" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-4">Message Sent!</h2>
          <p className="text-slate-400 mb-8">
            Thank you for contacting AI Publicity. We have received your message and will respond shortly.
          </p>
          <button 
            onClick={() => setStatus('idle')}
            className="px-6 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-white transition-colors"
          >
            Send Another Message
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 px-4 bg-slate-950 text-white relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-900/20 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-900/20 rounded-full blur-3xl -z-10"></div>

      <div className="max-w-7xl mx-auto py-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        
        {/* Left Column: Info */}
        <div className="space-y-8 animate-fade-in-up">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              Let's Build Something<br />Extraordinary
            </h1>
            <p className="text-lg text-slate-400 leading-relaxed">
              Ready to automate your growth and dominate your niche? Reach out to us for a consultation, partnership inquiries, or just to say hello.
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex items-start space-x-4 p-4 rounded-xl bg-slate-900/50 border border-slate-800">
              <Mail className="w-6 h-6 text-cyan-400 mt-1" />
              <div>
                <h3 className="font-semibold text-white">Email Us</h3>
                <p className="text-slate-400">faizbaig2000@gmail.com</p>
              </div>
            </div>
            <div className="flex items-start space-x-4 p-4 rounded-xl bg-slate-900/50 border border-slate-800">
              <Phone className="w-6 h-6 text-purple-400 mt-1" />
              <div>
                <h3 className="font-semibold text-white">Call Us</h3>
                <p className="text-slate-400">+1 (365) 866-8824</p>
              </div>
            </div>
            <div className="flex items-start space-x-4 p-4 rounded-xl bg-slate-900/50 border border-slate-800">
              <MapPin className="w-6 h-6 text-pink-400 mt-1" />
              <div>
                <h3 className="font-semibold text-white">Location</h3>
                <p className="text-slate-400">Toronto, Canada</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Form */}
        <div className="bg-slate-900/60 p-8 rounded-2xl border border-slate-800 backdrop-blur-sm animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* NETLIFY REQUIRED HIDDEN INPUT */}
            <input type="hidden" name="form-name" value="contact" />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">Name</label>
                <input
                  required
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-white focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 focus:outline-none transition-all"
                  placeholder="John Doe"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">Email</label>
                <input
                  required
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-white focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 focus:outline-none transition-all"
                  placeholder="john@example.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">Subject</label>
              <input
                required
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-white focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 focus:outline-none transition-all"
                placeholder="Project Inquiry"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">Message</label>
              <textarea
                required
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-white focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 focus:outline-none transition-all"
                placeholder="Tell us about your project..."
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={status === 'submitting'}
              className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold py-4 rounded-lg hover:shadow-lg hover:shadow-cyan-500/20 transition-all flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {status === 'submitting' ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Sending...</span>
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  <span>Send Message</span>
                </>
              )}
            </button>
            
            {status === 'error' && (
              <p className="text-red-400 text-center text-sm">Something went wrong. Please try again.</p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;