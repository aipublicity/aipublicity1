import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, PlayCircle, Cpu, TrendingUp, Sparkles, Target, Lightbulb } from 'lucide-react';
import { useContent } from '../context/ContentContext';
import TechStack from '../components/TechStack';

const TypewriterText = () => {
  const words = [
    "Coffee Shops", "Realtors", "Gyms", "Restaurants", "Startups",
    "Creators", "Dentists", "Law Firms", "E-commerce", "Local Biz", "YOU"
  ];
  
  const [text, setText] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  
  useEffect(() => {
    const currentWord = words[wordIndex];
    const isLastWord = wordIndex === words.length - 1; // "YOU"
    
    // Dynamic timing logic
    let timeoutSpeed = 50;

    if (isDeleting) {
      // Deleting Phase
      // If it's the last word ("YOU"), delete slower. 
      // For "scramble" words, delete quickly but smoothly.
      timeoutSpeed = isLastWord ? 100 : 30; 
    } else {
      // Typing Phase
      // If it's "YOU", type deliberately slow (natural). 
      // For "scramble" words, type briskly but readable.
      timeoutSpeed = isLastWord ? 200 : 60; 
    }

    // Pause logic at full word
    if (!isDeleting && text === currentWord) {
       if (isLastWord) {
         timeoutSpeed = 5000; // Freeze 5s on "YOU"
       } else {
         timeoutSpeed = 800; // Pause slightly on words to make them readable
       }
    } else if (isDeleting && text === '') {
       timeoutSpeed = 200; // Slight pause before starting next word
    }

    const timer = setTimeout(() => {
      if (!isDeleting && text === currentWord) {
        setIsDeleting(true);
      } else if (isDeleting && text === '') {
        setIsDeleting(false);
        setWordIndex((prev) => (prev + 1) % words.length);
      } else {
        const nextText = isDeleting 
          ? currentWord.substring(0, text.length - 1)
          : currentWord.substring(0, text.length + 1);
        setText(nextText);
      }
    }, timeoutSpeed);

    return () => clearTimeout(timer);
  }, [text, isDeleting, wordIndex]);

  return (
    <span className="inline-flex items-center justify-center whitespace-nowrap leading-none pt-2 pb-2">
       <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 font-extrabold">
        {text || '\u00A0'}
       </span>
       <span className="text-cyan-400 animate-pulse ml-1">|</span>
    </span>
  );
};

const Home: React.FC = () => {
  const { content } = useContent();

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className={`relative py-24 lg:py-36 overflow-hidden bg-gradient-to-br ${content.colors.primary}`}>
        {/* Abstract Shapes Background - Animated */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
          <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse duration-[4000ms]"></div>
          <div className="absolute bottom-[-10%] left-[-10%] w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000 duration-[5000ms]"></div>
          <div className="absolute top-[40%] left-[40%] w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-500 duration-[3000ms]"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center space-x-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 mb-8 backdrop-blur-md shadow-lg animate-fade-in-up">
            <span className="flex h-2.5 w-2.5 rounded-full bg-cyan-400 animate-ping"></span>
            <span className="text-sm text-cyan-300 font-bold tracking-wide">AI-Powered Social Media Agency</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight mb-8 leading-tight drop-shadow-2xl">
            <span className="block mb-2 md:mb-4">We Automate Growth for</span>
            {/* Fixed height container to prevent layout shift */}
            <div className="flex justify-center items-center h-[1.5em] overflow-hidden">
              <TypewriterText />
            </div>
          </h1>
          
          <p className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto mb-12 leading-relaxed font-light">
            {content.hero.subtitle}
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <Link 
              to="/contact" 
              className="group relative w-full sm:w-auto px-8 py-4 rounded-full bg-cyan-500 text-slate-950 font-bold text-lg overflow-hidden transition-all transform hover:scale-105 shadow-[0_0_30px_rgba(34,211,238,0.4)] flex items-center justify-center gap-2"
            >
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:animate-shimmer"></span>
              <span className="relative flex items-center gap-2">
                Book an Appointment
                <Calendar className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />
              </span>
            </Link>
             <Link 
              to="/services" 
              className="group w-full sm:w-auto px-8 py-4 rounded-full bg-slate-900/50 border border-white/10 text-white font-semibold text-lg hover:bg-slate-800 hover:border-white/30 transition-all flex items-center justify-center gap-2 backdrop-blur-sm"
            >
              View Our Services
              <Sparkles className="w-5 h-5 text-slate-400 group-hover:text-white transition-colors" />
            </Link>
          </div>
        </div>
      </section>

      {/* Tech Stack Marquee */}
      <TechStack />

      {/* Mission & Vision Section (Consolidated from About Page) */}
      <section className="py-24 bg-slate-900/30 border-y border-white/5 relative overflow-hidden">
         <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-b from-purple-900/10 to-transparent rounded-full blur-3xl pointer-events-none -mr-48 -mt-48"></div>
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Why <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">AI Publicity</span>?</h2>
              <p className="text-slate-400 max-w-2xl mx-auto text-lg leading-relaxed">
                 We are a forward-thinking agency at the intersection of creativity and technology. We don't just create content; we engineer influence using the world's most advanced AI tools.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
              {/* Mission Card */}
              <div className="p-10 rounded-3xl bg-slate-950/60 backdrop-blur-md border border-white/10 hover:border-purple-500/30 transition-all duration-500 group hover:shadow-[0_0_30px_rgba(168,85,247,0.1)]">
                 <div className="flex items-center space-x-4 mb-6">
                    <div className="p-3 rounded-full bg-purple-500/10 group-hover:bg-purple-500/20 transition-colors border border-purple-500/20 group-hover:scale-110 duration-300">
                      <Target className="w-8 h-8 text-purple-400 group-hover:rotate-[360deg] transition-transform duration-700 ease-in-out" />
                    </div>
                    <h3 className="text-2xl font-bold text-white">Our Mission</h3>
                 </div>
                 <p className="text-slate-300 leading-relaxed text-lg">
                    {content.about.mission}
                 </p>
              </div>

              {/* Vision Card */}
              <div className="p-10 rounded-3xl bg-slate-950/60 backdrop-blur-md border border-white/10 hover:border-cyan-500/30 transition-all duration-500 group hover:shadow-[0_0_30px_rgba(34,211,238,0.1)]">
                 <div className="flex items-center space-x-4 mb-6">
                    <div className="p-3 rounded-full bg-cyan-500/10 group-hover:bg-cyan-500/20 transition-colors border border-cyan-500/20 group-hover:scale-110 duration-300">
                      <Lightbulb className="w-8 h-8 text-cyan-400 group-hover:animate-pulse" />
                    </div>
                    <h3 className="text-2xl font-bold text-white">Our Vision</h3>
                 </div>
                 <p className="text-slate-300 leading-relaxed text-lg">
                    {content.about.vision}
                 </p>
              </div>
            </div>
         </div>
      </section>

      {/* Quick Features */}
      <section className="py-24 bg-slate-950 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            
            <div className="p-8 rounded-3xl bg-gradient-to-b from-slate-900 to-slate-950 border border-white/5 hover:border-purple-500/50 transition-all duration-500 group hover:-translate-y-2 hover:shadow-[0_10px_40px_-15px_rgba(168,85,247,0.3)]">
              <div className="w-14 h-14 rounded-2xl bg-purple-500/10 flex items-center justify-center mb-6 group-hover:bg-purple-500/20 transition-colors border border-purple-500/20 group-hover:scale-110 duration-500">
                <Cpu className="w-7 h-7 text-purple-400 group-hover:animate-spin-slow transition-transform" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-purple-400 transition-colors">AI Agent Integration</h3>
              <p className="text-slate-400 leading-relaxed">
                Deploy intelligent voice and chat agents that handle inbound calls, appointment bookings, and lead qualification 24/7.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-gradient-to-b from-slate-900 to-slate-950 border border-white/5 hover:border-cyan-500/50 transition-all duration-500 group hover:-translate-y-2 hover:shadow-[0_10px_40px_-15px_rgba(34,211,238,0.3)]">
              <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 flex items-center justify-center mb-6 group-hover:bg-cyan-500/20 transition-colors border border-cyan-500/20 group-hover:scale-110 duration-500">
                <TrendingUp className="w-7 h-7 text-cyan-400 group-hover:scale-110 group-hover:-rotate-12 transition-transform duration-300" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-cyan-400 transition-colors">Viral Growth Bundles</h3>
              <p className="text-slate-400 leading-relaxed">
                Combine cinematic video production with daily AI-driven posting schedules to dominate TikTok and Instagram algorithms.
              </p>
            </div>

             <div className="p-8 rounded-3xl bg-gradient-to-b from-slate-900 to-slate-950 border border-white/5 hover:border-blue-500/50 transition-all duration-500 group hover:-translate-y-2 hover:shadow-[0_10px_40px_-15px_rgba(59,130,246,0.3)]">
              <div className="w-14 h-14 rounded-2xl bg-blue-500/10 flex items-center justify-center mb-6 group-hover:bg-blue-500/20 transition-colors border border-blue-500/20 group-hover:scale-110 duration-500">
                <PlayCircle className="w-7 h-7 text-blue-400 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-blue-400 transition-colors">Cinematic Production</h3>
              <p className="text-slate-400 leading-relaxed">
                High-end video production meets style transfer technology. We create visual identities that are impossible to ignore.
              </p>
            </div>

          </div>
        </div>
      </section>
      
      {/* CTA Strip */}
      <section className="py-20 border-t border-white/10 bg-slate-900/30 relative overflow-hidden">
         <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 to-blue-900/20 animate-pulse"></div>
         <div className="max-w-5xl mx-auto px-4 text-center relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">Ready to revolutionize your media presence?</h2>
            <Link to="/contact" className="inline-flex items-center justify-center px-10 py-4 border border-transparent text-lg font-bold rounded-full text-white bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 shadow-lg hover:shadow-purple-500/50 transform hover:scale-105 transition-all duration-300">
                Get a Free Consultation
            </Link>
         </div>
      </section>
    </div>
  );
};

export default Home;