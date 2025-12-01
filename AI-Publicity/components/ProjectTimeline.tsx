import React, { useEffect, useState } from 'react';
import { Search, FileText, Video, Share2, GitMerge, Cpu, Network, Zap, BarChart, Rocket, Settings } from 'lucide-react';

type TabType = 'social' | 'ai' | 'bundles';

interface ProjectTimelineProps {
  activeTab: TabType;
}

// Define data content
const TIMELINE_DATA = {
  social: {
    title: "The Viral Blueprint",
    steps: [
      { title: "Brand & Niche Audit", desc: "We analyze your presence and identify \"blue ocean\" gaps.", icon: Search },
      { title: "Data-Driven Scripting", desc: "We script based on algorithmic trends and high-performing hooks.", icon: FileText },
      { title: "Cinematic Production", desc: "We produce 4K visuals that elevate your brand authority.", icon: Video },
      { title: "Distribution & Engagement", desc: "We handle posting and community management while you grow.", icon: Share2 },
    ]
  },
  ai: {
    title: "The Efficiency Blueprint",
    steps: [
      { title: "Workflow Discovery", desc: "We map your business processes to find costly bottlenecks.", icon: Search },
      { title: "Agent Architecture", desc: "We build custom AI agents trained on your brand's voice.", icon: Cpu },
      { title: "Integration & Testing", desc: "We connect AI to your CRM, Calendar, and Email.", icon: Network },
      { title: "Go Live", desc: "Your business runs on autopilot 24/7.", icon: Zap },
    ],
    stat: "Did you know? Businesses using AI Agents save 20+ hours/week and reduce overhead by 30%."
  },
  bundles: {
    title: "The Domination Blueprint",
    steps: [
      { title: "The Master Strategy", desc: "Aligning content strategy with your sales funnel.", icon: GitMerge },
      { title: "Infrastructure Setup", desc: "Building AI sales agents while producing or generating launch content.", icon: Settings },
      { title: "The Dual Launch", desc: "Viral content drives traffic; AI agents capture and close leads.", icon: Rocket },
      { title: "Scaling & Optimization", desc: "Monthly data reviews to double down on revenue drivers.", icon: BarChart },
    ]
  }
};

const ProjectTimeline: React.FC<ProjectTimelineProps> = ({ activeTab }) => {
  const data = TIMELINE_DATA[activeTab];
  const [animate, setAnimate] = useState(false);

  // Reset animation on tab change
  useEffect(() => {
    setAnimate(false);
    const timer = setTimeout(() => setAnimate(true), 50);
    return () => clearTimeout(timer);
  }, [activeTab]);

  return (
    <div className="py-24 relative overflow-hidden">
       {/* Background glow */}
       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="text-center mb-16 relative z-10">
         <h3 className={`text-3xl md:text-4xl font-bold text-white mb-4 transition-all duration-500 transform ${animate ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
           {data.title}
         </h3>
         <div className={`w-24 h-1 bg-gradient-to-r from-cyan-400 to-purple-500 mx-auto rounded-full transition-all duration-700 delay-100 ${animate ? 'w-24 opacity-100' : 'w-0 opacity-0'}`}></div>
      </div>

      <div className="max-w-3xl mx-auto px-4 relative z-10">
        <div className="relative pl-4 md:pl-0">
          
          {/* Vertical Line Container */}
          <div className="absolute left-8 md:left-8 top-4 bottom-0 w-0.5 bg-slate-800/50 rounded-full overflow-hidden">
             {/* Animated Gradient Line */}
             <div className={`absolute top-0 left-0 w-full bg-gradient-to-b from-cyan-500 via-purple-500 to-cyan-500 transition-all duration-[1500ms] ease-in-out ${animate ? 'h-full' : 'h-0'}`}></div>
          </div>

          <div className="space-y-12 pb-12">
            {data.steps.map((step, idx) => {
              const Icon = step.icon;
              const delay = 200 + (idx * 150); // Staggered delay
              
              return (
                <div 
                  key={`${activeTab}-${idx}`} 
                  className={`relative flex items-start group transition-all duration-500`}
                  style={{ 
                    transitionDelay: `${delay}ms`,
                    opacity: animate ? 1 : 0,
                    transform: animate ? 'translateX(0)' : 'translateX(20px)'
                  }}
                >
                   {/* Node */}
                   <div className="absolute left-0 md:left-0 w-16 h-16 flex items-start justify-center pt-1">
                      <div className={`w-4 h-4 rounded-full bg-slate-950 border-2 border-cyan-500 z-10 transition-all duration-500 ${animate ? 'shadow-[0_0_15px_rgba(34,211,238,0.6)] scale-100' : 'scale-0'}`}></div>
                   </div>

                   {/* Content Card */}
                   <div className="ml-16 md:ml-20 w-full p-6 md:p-8 bg-slate-900/40 backdrop-blur-md border border-white/5 rounded-2xl hover:border-cyan-500/30 hover:bg-slate-900/60 transition-all duration-300 group-hover:-translate-y-1 shadow-lg">
                      <div className="flex items-center gap-4 mb-3">
                         <div className="p-2.5 rounded-xl bg-gradient-to-br from-white/5 to-white/0 border border-white/5 group-hover:border-cyan-500/20 transition-colors">
                            <Icon className="w-5 h-5 text-cyan-400" />
                         </div>
                         <h4 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">{step.title}</h4>
                      </div>
                      <p className="text-slate-400 text-sm md:text-base leading-relaxed border-l-2 border-white/5 pl-4 group-hover:border-purple-500/30 transition-colors">
                        {step.desc}
                      </p>
                   </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* ROI Box for AI Tab */}
        {activeTab === 'ai' && (data as any).stat && (
           <div 
             className={`mt-4 p-6 rounded-2xl bg-gradient-to-r from-cyan-900/20 to-purple-900/20 border border-cyan-500/30 flex flex-col sm:flex-row items-center gap-4 transition-all duration-700 delay-700 ${animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
           >
              <div className="p-3 bg-cyan-500/10 rounded-full shrink-0 border border-cyan-500/20">
                 <Zap className="w-6 h-6 text-cyan-400 animate-pulse" />
              </div>
              <div className="text-center sm:text-left">
                <p className="text-cyan-100 text-sm md:text-base font-medium italic leading-relaxed">
                  "{(data as any).stat}"
                </p>
              </div>
           </div>
        )}
      </div>
    </div>
  );
};

export default ProjectTimeline;