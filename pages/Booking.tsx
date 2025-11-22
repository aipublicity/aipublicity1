import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Calendar, Clock, CheckCircle, ArrowLeft, Package, Download, Mail, ExternalLink } from 'lucide-react';
import { useContent } from '../context/ContentContext';

const Booking: React.FC = () => {
  const location = useLocation();
  const { content } = useContent();
  const [selectedPackage, setSelectedPackage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    notes: ''
  });

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const pkg = params.get('package');
    if (pkg) {
      setSelectedPackage(pkg);
    }
  }, [location]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Calculate Form Progress based on required fields
  const calculateProgress = () => {
    let filled = 0;
    const requiredFields = ['name', 'email', 'phone', 'date', 'time'];
    
    requiredFields.forEach(field => {
      if (formData[field as keyof typeof formData].trim().length > 0) {
        filled++;
      }
    });
    
    return (filled / requiredFields.length) * 100;
  };

  const progress = calculateProgress();

  const getMeetingDate = () => {
    if (!formData.date || !formData.time) return null;
    
    const [year, month, day] = formData.date.split('-').map(Number);
    const timeParts = formData.time.match(/(\d+):(\d+) (AM|PM)/);
    
    if (!timeParts) return null;
    
    let hours = parseInt(timeParts[1]);
    const minutes = parseInt(timeParts[2]);
    const period = timeParts[3];

    if (period === 'PM' && hours !== 12) hours += 12;
    if (period === 'AM' && hours === 12) hours = 0;

    const date = new Date(year, month - 1, day, hours, minutes);
    return date;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const formBody = new URLSearchParams();
    formBody.append('form-name', 'booking');
    formBody.append('package', selectedPackage);
    Object.keys(formData).forEach(key => {
      formBody.append(key, (formData as any)[key]);
    });

    fetch('/', {
      method: 'POST',
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: formBody.toString()
    })
    .then((response) => {
      if (response.ok) {
        setSubmitted(true);
        window.scrollTo(0, 0);
      } else {
        alert("There was an issue submitting your booking. Please try again.");
      }
    })
    .catch((error) => {
      alert("Network error. Please try again later.");
      console.error(error);
    });
  };

  const addToGoogleCalendar = () => {
    const startDate = getMeetingDate();
    if (!startDate) return;

    const endDate = new Date(startDate.getTime() + 10 * 60000); // 10 minutes duration

    const formatDate = (date: Date) => {
      return date.toISOString().replace(/-|:|\.\d\d\d/g, "");
    };

    const title = `Strategy Call: ${selectedPackage || 'Consultation'} - ${formData.name}`;
    const details = `Client: ${formData.name}\nPhone: ${formData.phone}\nEmail: ${formData.email}\nPackage: ${selectedPackage}\n\nNotes: ${formData.notes}`;
    const location = "Google Meet / Phone";
    
    const url = new URL("https://calendar.google.com/calendar/render");
    url.searchParams.append("action", "TEMPLATE");
    url.searchParams.append("text", title);
    url.searchParams.append("dates", `${formatDate(startDate)}/${formatDate(endDate)}`);
    url.searchParams.append("details", details);
    url.searchParams.append("location", location);
    url.searchParams.append("add", content.contact.email); // Invite owner
    url.searchParams.append("sprop", "name:AI Publicity Media");

    window.open(url.toString(), '_blank');
  };

  const downloadICS = () => {
    const startDate = getMeetingDate();
    if (!startDate) return;
    const endDate = new Date(startDate.getTime() + 10 * 60000);

    const formatDate = (date: Date) => {
      return date.toISOString().replace(/-|:|\.\d\d\d/g, "");
    };

    const icsContent = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//AI Publicity Media//Booking//EN",
      "BEGIN:VEVENT",
      `UID:${Date.now()}@aipublicity.ca`,
      `DTSTAMP:${formatDate(new Date())}`,
      `DTSTART:${formatDate(startDate)}`,
      `DTEND:${formatDate(endDate)}`,
      `SUMMARY:Strategy Call: ${selectedPackage || 'Consultation'}`,
      `DESCRIPTION:Client: ${formData.name}\\nPhone: ${formData.phone}\\nNotes: ${formData.notes}`,
      `ORGANIZER;CN=AI Publicity Media:mailto:${content.contact.email}`,
      `ATTENDEE;RSVP=TRUE:mailto:${formData.email}`,
      "END:VEVENT",
      "END:VCALENDAR"
    ].join("\r\n");

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', 'strategy-call.ics');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Generate simple time slots
  const timeSlots = [
    "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
    "12:00 PM", "12:30 PM", "1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM",
    "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM", "5:00 PM", "5:30 PM",
    "6:00 PM", "6:30 PM", "7:00 PM", "7:30 PM", "8:00 PM"
  ];

  return (
    <div className="py-16 bg-slate-950 min-h-screen flex items-center justify-center px-4">
      <div className="max-w-4xl w-full">
        {!submitted && (
          <div className="mb-8">
            <Link to="/services" className="flex items-center text-slate-400 hover:text-white transition-colors mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Packages
            </Link>
          </div>
        )}

        <div className="bg-slate-900 rounded-2xl border border-white/10 overflow-hidden shadow-2xl">
          
          {/* Progress Bar */}
          {!submitted && (
            <div className="w-full h-1.5 bg-slate-800">
              <div 
                className="h-full bg-gradient-to-r from-purple-500 to-cyan-400 transition-all duration-500 ease-out shadow-[0_0_10px_rgba(34,211,238,0.5)]"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          )}

          {submitted ? (
            <div className="p-8 md:p-12 text-center bg-gradient-to-b from-slate-900 to-slate-950">
              <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
                <CheckCircle className="w-10 h-10 text-green-400" />
              </div>
              
              <h2 className="text-3xl font-bold text-white mb-4">Booking Confirmed!</h2>
              
              <div className="max-w-lg mx-auto bg-slate-800/50 rounded-xl p-6 mb-8 border border-white/5">
                <p className="text-slate-300 text-lg mb-4">
                  We've sent a calendar invitation to <strong>{formData.email}</strong>.
                </p>
                <div className="flex flex-col items-center space-y-2 text-sm text-slate-400">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-2 text-purple-400" />
                    <span>{formData.date} at {formData.time}</span>
                  </div>
                  <div className="flex items-center">
                    <Package className="w-4 h-4 mr-2 text-cyan-400" />
                    <span>{selectedPackage || 'Consultation Call'}</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-md mx-auto mb-8">
                <button 
                  onClick={addToGoogleCalendar}
                  className="flex items-center justify-center space-x-2 px-6 py-4 bg-white text-slate-900 font-bold rounded-xl hover:bg-slate-200 transition-all transform hover:-translate-y-1 shadow-lg"
                >
                  <ExternalLink className="w-5 h-5 text-blue-600" />
                  <span>Add to Google Calendar</span>
                </button>
                
                <button 
                  onClick={downloadICS}
                  className="flex items-center justify-center space-x-2 px-6 py-4 bg-slate-800 text-white font-semibold rounded-xl border border-slate-700 hover:bg-slate-700 transition-all transform hover:-translate-y-1"
                >
                  <Download className="w-5 h-5 text-slate-400" />
                  <span>Download .ics</span>
                </button>
              </div>

              <p className="text-slate-500 text-sm mb-8">
                Can't verify your email? <a href={`mailto:${content.contact.email}`} className="text-cyan-400 hover:underline">Contact us directly</a>.
              </p>

              <Link to="/" className="inline-block px-8 py-3 text-slate-400 hover:text-white transition-colors">
                Return to Home
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3">
              {/* Left Panel: Summary */}
              <div className="bg-gradient-to-br from-purple-900 to-slate-900 p-8 text-white border-r border-white/10 md:col-span-1">
                <h2 className="text-2xl font-bold mb-6">Book Strategy Call</h2>
                
                <div className="space-y-6">
                  <div>
                    <p className="text-purple-200 text-sm uppercase tracking-wider font-semibold mb-2">Selected Package</p>
                    <div className="flex items-center space-x-2 bg-black/20 p-3 rounded-lg">
                      <Package className="w-5 h-5 text-cyan-400" />
                      <span className="font-medium">{selectedPackage || 'General Consultation'}</span>
                    </div>
                  </div>

                  <div>
                    <p className="text-purple-200 text-sm uppercase tracking-wider font-semibold mb-2">Call Duration</p>
                    <div className="flex items-center space-x-2">
                      <Clock className="w-5 h-5 text-cyan-400" />
                      <span>10 Minutes</span>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-white/10">
                    <p className="text-sm text-purple-200 leading-relaxed">
                      We'll discuss your specific needs for the <strong>{selectedPackage}</strong> and how AI Publicity can automate your growth.
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Panel: Form */}
              <div className="p-8 md:col-span-2 bg-slate-900">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <input type="hidden" name="form-name" value="booking" />
                  <input type="hidden" name="package" value={selectedPackage} />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-slate-400 mb-2">Full Name</label>
                      <input 
                        type="text" 
                        name="name"
                        required 
                        className="w-full px-4 py-3 rounded-lg bg-slate-950 border border-slate-800 text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none"
                        placeholder="Jane Doe"
                        value={formData.name}
                        onChange={handleChange}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-400 mb-2">Phone Number</label>
                      <input 
                        type="tel" 
                        name="phone"
                        required 
                        className="w-full px-4 py-3 rounded-lg bg-slate-950 border border-slate-800 text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none"
                        placeholder="+1 (555) 000-0000"
                        value={formData.phone}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-400 mb-2">Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3.5 w-5 h-5 text-slate-500" />
                      <input 
                        type="email" 
                        name="email"
                        required 
                        className="w-full pl-10 pr-4 py-3 rounded-lg bg-slate-950 border border-slate-800 text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none"
                        placeholder="jane@company.com"
                        value={formData.email}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-slate-400 mb-2">Preferred Date</label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-3.5 w-5 h-5 text-slate-500" />
                        <input 
                          type="date" 
                          name="date"
                          required 
                          className="w-full pl-10 pr-4 py-3 rounded-lg bg-slate-950 border border-slate-800 text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none [color-scheme:dark]"
                          value={formData.date}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-400 mb-2">Preferred Time</label>
                      <div className="relative">
                        <Clock className="absolute left-3 top-3.5 w-5 h-5 text-slate-500" />
                        <select 
                          name="time"
                          required
                          className="w-full pl-10 pr-4 py-3 rounded-lg bg-slate-950 border border-slate-800 text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none appearance-none"
                          value={formData.time}
                          onChange={handleChange}
                        >
                          <option value="">Select time...</option>
                          {timeSlots.map(slot => (
                            <option key={slot} value={slot}>{slot}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-400 mb-2">Additional Notes (Optional)</label>
                    <textarea 
                      name="notes"
                      rows={2} 
                      className="w-full px-4 py-3 rounded-lg bg-slate-950 border border-slate-800 text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none resize-none"
                      placeholder="Any specific questions?"
                      value={formData.notes}
                      onChange={handleChange}
                    ></textarea>
                  </div>

                  <button 
                    type="submit" 
                    className={`w-full py-4 rounded-lg text-white font-bold transition-all transform hover:scale-[1.01] ${
                      progress === 100 
                      ? 'bg-gradient-to-r from-cyan-500 to-purple-600 shadow-[0_0_30px_rgba(34,211,238,0.4)] animate-pulse ring-1 ring-cyan-400' 
                      : 'bg-gradient-to-r from-purple-600 to-cyan-600 hover:shadow-[0_0_20px_rgba(34,211,238,0.3)]'
                    }`}
                  >
                    Confirm Booking & Add to Calendar
                  </button>
                  
                  <p className="text-center text-xs text-slate-500 mt-4">
                    A calendar invitation will be created for you and our team.
                  </p>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Booking;