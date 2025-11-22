import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, Video, Bot, Zap, Share2, PenTool, Cpu, Tag, ArrowDown } from 'lucide-react';
import { SERVICES_LIST, PRICING_SOCIAL, PRICING_AI_AGENT, PRICING_BUNDLES } from '../constants';
import { PricingTier } from '../types';
import ProjectTimeline from '../components/ProjectTimeline';

const iconMap: any = {
  Video: Video,
  Bot: Bot,
  Zap: Zap,
  Share2: Share2,
  PenTool: PenTool,
  Cpu: Cpu,
};

const Services: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'social' | 'ai' | 'bundles'>('bundles');

  const renderPricingCard = (tier: PricingTier) => (
    <div 
      key={tier.name} 
      className={`relative flex flex-col p-8 rounded-2xl border ${
        tier.highlight 
          ? 'bg-slate-900/80 border-cyan-500/50 shadow-[0_0_30px_rgba(34,211,238,0.15)] md:-translate-y-4 z-10' 
          : 'bg-slate-950/50 border-white/10'
      } transition-all duration-500 hover:border-cyan-500/50 group hover:-translate-y-6 hover:shadow-[0_10px_40px_-10px_rgba(34,211,238,0.2)]`}
    >
      {tier.highlight && (
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-cyan-500 to-blue-500 text-slate-950 text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider shadow-lg animate-pulse">
          Most Popular
        </div>
      )}
      
      {/* Black Friday Badge */}
      <div className="absolute -top-3 right-4 bg-red-600 text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-lg flex items-center gap-1 animate-bounce">
         <Tag className="w-3 h-3" />
         20% OFF
      </div>

      <div className="mb-6">
        <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors duration-300">{tier.name}</h3>
        <div className="mt-4 flex items-baseline text-white flex-wrap gap-3">
          <span className="text-4xl font-extrabold tracking-tight group-hover:scale-105 transition-transform origin-left duration-300">{tier.price}</span>
          {tier.originalPrice && (
            <span className="text-lg text-slate-500 line-through decoration-red-500/50 decoration-2">{tier.originalPrice}</span>
          )}
        </div>
        
        <div className="mt-2 text-xs text-green-400 font-semibold flex items-center gap-1">
           <Check className="w-3 h-3" />
           Lock in this price for 1 year!
        </div>

        {tier.setupFee && (
            <p className="mt-2 text-sm text-slate-400">{tier.setupFee}</p>
        )}
      </div>
      <ul className="flex-1 space-y-4 mb-8">
        {tier.features.map((feature, index) => (
          <li key={index} className="flex items-start group/item">
            <div className="flex-shrink-0">
              <div className="p-1 rounded-full bg-cyan-500/10 group-hover/item:bg-cyan-500/20 transition-colors">
                <Check className="h-4 w-4 text-cyan-400 group-hover/item:scale-110 transition-transform" />
              </div>
            </div>
            <p className="ml-3 text-sm text-slate-300 leading-snug group-hover/item:text-white transition-colors">{feature}</p>
          </li>
        ))}
      </ul>
      <Link 
        to={`/booking?package=${encodeURIComponent(tier.name)}`}
        className={`relative overflow-hidden block w-full text-center py-3.5 px-4 rounded-lg font-bold transition-all duration-300 transform group-hover:scale-[1.02] ${
          tier.highlight
            ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-slate-950 hover:shadow-[0_0_20px_rgba(34,211,238,0.5)]'
            : 'bg-slate-800 text-white hover:bg-slate-700 hover:text-cyan-400 border border-transparent hover:border-cyan-500/30'
        }`}
      >
        <span className="relative z-10">Claim Offer</span>
      </Link>
    </div>
  );

  return (
    <div className="py-16 bg-slate-950">
      {/* Services Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Our Expertise</h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            Comprehensive solutions bridging the gap between traditional media and artificial intelligence.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES_LIST.map((service, index) => {
            const Icon = iconMap[service.iconName] || Zap;
            return (
              <div 
                key={index} 
                className="p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-lg transition-all duration-300 group hover:scale-105 hover:border-cyan-400 hover:shadow-[0_0_30px_rgba(34,211,238,0.15)]"
              >
                <div className="w-14 h-14 rounded-2xl bg-slate-800/50 border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500 group-hover:bg-gradient-to-br group-hover:from-purple-600/20 group-hover:to-blue-600/20 group-hover:border-purple-500/30">
                    <Icon className="w-7 h-7 text-purple-500 group-hover:text-cyan-400 transition-colors duration-300" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors">{service.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed group-hover:text-slate-300 transition-colors">{service.description}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Pricing Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
           <div className="inline-block mb-4 px-4 py-1 bg-red-600/20 border border-red-500/50 rounded-full">
              <span className="text-red-400 font-bold text-sm tracking-wide uppercase">Limited Time Offer</span>
           </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Black Friday Pricing</h2>
          <p className="text-slate-300 max-w-xl mx-auto mb-8">
            Book before <span className="text-cyan-400 font-bold">December 9th</span> to lock in 20% off your monthly rate for an entire year.
          </p>
          
          {/* Tabs */}
          <div className="flex flex-col items-center">
            <div className="inline-flex p-1.5 space-x-2 bg-slate-900 rounded-2xl border border-white/10">
              {(['social', 'ai', 'bundles'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-2.5 text-sm font-bold rounded-xl transition-all duration-300 ${
                    activeTab === tab
                      ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg scale-105'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  {tab === 'social' ? 'Social Media' : tab === 'ai' ? 'AI Agents' : 'Growth Bundles'}
                </button>
              ))}
            </div>

            {/* Blueprint Notification Hint */}
            <button 
              onClick={() => document.getElementById('blueprint')?.scrollIntoView({ behavior: 'smooth' })}
              className="mt-5 flex items-center gap-2 text-xs md:text-sm text-slate-400 hover:text-cyan-400 transition-colors animate-pulse hover:animate-none group"
            >
               <ArrowDown className="w-4 h-4 text-cyan-400 group-hover:translate-y-1 transition-transform" />
               <span>
                 Scroll down to view the <span className="font-bold text-cyan-400">{activeTab === 'social' ? 'Viral Blueprint' : activeTab === 'ai' ? 'Efficiency Blueprint' : 'Domination Blueprint'}</span>
               </span>
            </button>
          </div>
        </div>

        {/* Pricing Grids */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start perspective-1000">
          {activeTab === 'social' && PRICING_SOCIAL.map(renderPricingCard)}
          {activeTab === 'ai' && PRICING_AI_AGENT.map(renderPricingCard)}
          {activeTab === 'bundles' && PRICING_BUNDLES.map(renderPricingCard)}
        </div>

        {/* Roadmap Section */}
        <div id="blueprint" className="scroll-mt-32">
           <ProjectTimeline activeTab={activeTab} />
        </div>

        <div className="mt-20 text-center bg-gradient-to-r from-slate-900 to-slate-950 p-10 rounded-3xl border border-white/5 hover:border-cyan-500/30 transition-all duration-500 group hover:shadow-[0_0_50px_rgba(124,58,237,0.1)]">
          <div className="inline-block p-3 rounded-full bg-white/5 mb-4 group-hover:bg-cyan-500/20 transition-colors">
             <Cpu className="w-6 h-6 text-cyan-400 group-hover:animate-spin-slow" />
          </div>
          <h3 className="text-2xl font-bold text-white mb-3">Need a Custom Enterprise Solution?</h3>
          <p className="text-slate-400 mb-8 max-w-xl mx-auto">We build bespoke AI infrastructures, custom agent workflows, and full-scale media production pipelines for large organizations.</p>
          <Link to="/contact" className="inline-flex items-center text-cyan-400 font-bold hover:text-cyan-300 group-hover:translate-x-2 transition-transform">
             <span>Contact Sales Team</span>
             <Zap className="w-4 h-4 ml-2 group-hover:animate-pulse" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Services;