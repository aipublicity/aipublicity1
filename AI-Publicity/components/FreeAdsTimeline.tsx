import React, { useEffect, useState } from 'react';
import { ScanEye, Palette, Wand2, Rocket, Heart } from 'lucide-react';

const TIMELINE_STEPS = [
  {
    title: "Selection & Vision",
    desc: "We review every application to find unique local stories. If selected, we review your brand to understand your message and target audience.",
    icon: ScanEye
  },
  {
    title: "Style Selection",
    desc: "We don't just film; we create worlds. We select a distinct AI visual style for your ad, ranging from 3D Animation (Pixar-style) and Brick-Motion (Lego-style) to Cyberpunk or Anime.",
    icon: Palette
  },
  {
    title: "Generation & Viral Polish",
    desc: "We generate the custom animations, add professional AI voiceovers, and apply viral-style editing and captions to ensure the video holds attention.",
    icon: Wand2
  },
  {
    title: "The Dual-Network Launch",
    desc: "We publish the video using the \"Collab\" feature, instantly broadcasting it to both our followers and yours. Plus, we send you the final video file to keep forever.",
    icon: Rocket
  }
];

const FreeAdsTimeline: React.FC = () => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
  }, []);

  return (
    <div className="py-24 relative overflow-hidden">
       {/* Background glow */}
       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="text-center mb-16 relative z-10">
         <h3 className={`text-3xl md:text-4xl font-bold text-white mb-4 transition-all duration-500 transform ${animate ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
           The Process
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
            {TIMELINE_STEPS.map((step, idx) => {
              const Icon = step.icon;
              const delay = 200 + (idx * 150); // Staggered delay
              
              return (
                <div 
                  key={idx} 
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

        {/* Community Mission Footer */}
         <div className={`mt-8 p-8 text-center relative transition-all duration-1000 delay-700 ${animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-900/20 to-transparent blur-xl"></div>
            <div className="relative z-10">
                <div className="inline-block p-3 mb-4 rounded-full bg-purple-500/10 border border-purple-500/20 animate-pulse">
                   <Heart className="w-5 h-5 text-purple-400 fill-purple-400/20" />
                </div>
                <h4 className="text-lg md:text-xl font-medium text-white italic leading-relaxed max-w-2xl mx-auto">
                  "We are building a stronger local economy, one story at a time. We invest in you so we all rise together."
                </h4>
            </div>
         </div>

      </div>
    </div>
  );
};

export default FreeAdsTimeline;