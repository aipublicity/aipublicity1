import React from 'react';
import { useContent } from '../context/ContentContext';
import { Target, Lightbulb, Instagram, Heart, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

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

const About: React.FC = () => {
  const { content } = useContent();

  return (
    <div className="py-20 bg-slate-950">
      {/* Intro */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-20">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-8">We Are <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">AI Publicity Media</span></h1>
        <p className="text-xl text-slate-300 leading-relaxed">
          We are a forward-thinking agency at the intersection of creativity and technology. 
          We don't just create content; we engineer influence using the world's most advanced AI tools.
        </p>
      </div>

      {/* Mission & Vision */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="p-10 rounded-3xl bg-gradient-to-br from-purple-900/20 to-slate-900 border border-purple-500/20 group hover:border-purple-500/40 transition-colors duration-500 hover:shadow-[0_0_30px_rgba(168,85,247,0.15)]">
            <div className="flex items-center space-x-4 mb-6">
              <div className="p-3 rounded-full bg-purple-500/10 group-hover:bg-purple-500/20 transition-colors border border-purple-500/20 group-hover:scale-110 duration-300">
                <Target className="w-8 h-8 text-purple-400 group-hover:rotate-[360deg] transition-transform duration-700 ease-in-out" />
              </div>
              <h2 className="text-2xl font-bold text-white">Our Mission</h2>
            </div>
            <p className="text-slate-300 text-lg leading-relaxed">
              {content.about.mission}
            </p>
          </div>

          <div className="p-10 rounded-3xl bg-gradient-to-br from-cyan-900/20 to-slate-900 border border-cyan-500/20 group hover:border-cyan-500/40 transition-colors duration-500 hover:shadow-[0_0_30px_rgba(34,211,238,0.15)]">
            <div className="flex items-center space-x-4 mb-6">
              <div className="p-3 rounded-full bg-cyan-500/10 group-hover:bg-cyan-500/20 transition-colors border border-cyan-500/20 group-hover:scale-110 duration-300">
                <Lightbulb className="w-8 h-8 text-cyan-400 group-hover:animate-pulse" />
              </div>
              <h2 className="text-2xl font-bold text-white">Our Vision</h2>
            </div>
            <p className="text-slate-300 text-lg leading-relaxed">
              {content.about.vision}
            </p>
          </div>
        </div>
      </div>

      {/* Community Initiative */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="bg-slate-900 rounded-3xl border border-white/10 p-8 md:p-12 flex flex-col md:flex-row items-center gap-12 group hover:border-white/20 transition-colors relative overflow-hidden">
           <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-purple-500/10 to-transparent rounded-bl-full pointer-events-none"></div>
          
          <div className="flex-1 relative z-10">
            <div className="inline-flex items-center space-x-2 bg-purple-500/20 border border-purple-500/30 rounded-full px-3 py-1 mb-6">
              <Heart className="w-4 h-4 text-purple-400 animate-pulse" />
              <span className="text-sm text-purple-300 font-medium">Community First</span>
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">Free Ads</h2>
            <p className="text-slate-300 leading-relaxed mb-6">
              We believe in the power of community. That's why we launched our <strong>Free Ads Series</strong>—an initiative designed to help local businesses gain visibility without the barrier of cost. We select one business at a time to receive a professional, high-impact video ad, completely free of charge.
            </p>
            <p className="text-slate-300 leading-relaxed mb-8">
              Our goal is to build a network of like-minded entrepreneurs who support each other's growth. By elevating one another, we create a thriving ecosystem where quality products and services get the spotlight they deserve.
            </p>
            <Link 
              to="/free-ads"
              className="inline-flex items-center font-bold text-cyan-400 hover:text-cyan-300 transition-colors group/link"
            >
              <span className="border-b border-cyan-400/30 group-hover/link:border-cyan-400 pb-0.5 transition-colors">Learn more about the program</span>
              <ArrowRight className="w-4 h-4 ml-2 group-hover/link:translate-x-1 transition-transform" />
            </Link>
          </div>
           <div className="flex-1 flex justify-center w-full">
             <div className="w-full max-w-sm aspect-video rounded-2xl bg-gradient-to-tr from-purple-600 to-blue-600 flex items-center justify-center opacity-90 shadow-[0_0_50px_rgba(124,58,237,0.3)] group-hover:scale-105 transition-transform duration-500 rotate-2 group-hover:rotate-0">
                <div className="text-center">
                   <span className="text-white font-bold text-3xl block mb-2">Empowering</span>
                   <span className="text-white font-light text-2xl block">Local Growth</span>
                </div>
             </div>
           </div>
        </div>
      </div>

      {/* Connect Socials */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center py-16 border-t border-white/10">
          <h2 className="text-2xl font-bold text-white mb-10">Follow Our Journey</h2>
          <div className="flex justify-center items-center gap-12">
            <a 
              href="https://www.instagram.com/ai.publicity" 
              target="_blank" 
              rel="noreferrer" 
              className="group flex flex-col items-center space-y-3 text-slate-400 hover:text-pink-500 transition-colors"
            >
              <div className="w-20 h-20 rounded-3xl bg-slate-900 border border-white/10 flex items-center justify-center group-hover:border-pink-500/50 group-hover:bg-pink-500/10 transition-all group-hover:-translate-y-2 group-hover:shadow-[0_0_20px_rgba(236,72,153,0.3)]">
                <Instagram className="w-10 h-10 group-hover:scale-110 transition-transform duration-300" />
              </div>
              <span className="text-sm font-bold tracking-wide">Instagram</span>
            </a>

            <a 
              href="https://www.tiktok.com/@ai.publicity" 
              target="_blank" 
              rel="noreferrer" 
              className="group flex flex-col items-center space-y-3 text-slate-400 hover:text-cyan-400 transition-colors"
            >
               <div className="w-20 h-20 rounded-3xl bg-slate-900 border border-white/10 flex items-center justify-center group-hover:border-cyan-500/50 group-hover:bg-cyan-400/10 transition-all group-hover:-translate-y-2 group-hover:shadow-[0_0_20px_rgba(34,211,238,0.3)]">
                <TikTokIcon className="w-10 h-10 group-hover:scale-110 transition-transform duration-300" />
              </div>
              <span className="text-sm font-bold tracking-wide">TikTok</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;