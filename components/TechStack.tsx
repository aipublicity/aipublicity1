import React from 'react';

// --- SVG Components ---

const OpenAILogo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a1.54 1.54 0 0 0 .0386.0229V17.63a4.4627 4.4627 0 0 1-4.495 4.8013zm-3.5014-1.6343a4.4674 4.4674 0 0 1-1.6571-5.3435l.1348.0772 4.7813 2.7582a.7951.7951 0 0 0 .7874 0l5.8365-3.3689v2.3324a1.54 1.54 0 0 0 .0338.0252l-6.9361 4.0025a4.444 4.444 0 0 1-2.9808-.4806zm-3.2248-5.9469a4.4712 4.4712 0 0 1 .4766-5.4893l.1364.0757 4.7843 2.7582a.7951.7951 0 0 0 .7874 0l5.8365-3.3689v2.3324a1.54 1.54 0 0 0 .0338.0252l-6.9361 4.0025a4.444 4.444 0 0 1-2.9808-.4806zm1.6498-8.4175a4.4627 4.4627 0 0 1 2.8764 1.0408l-.1419.0804-4.7783 2.7582a.7948.7948 0 0 0-.3927.6813v6.7369l-2.02-1.1686a1.54 1.54 0 0 0-.0386-.0229V6.354a4.4627 4.4627 0 0 1 4.4951-4.8013zm6.7263 4.2566a4.4712 4.4712 0 0 1 1.6571 5.3435l-.1348-.0772-4.7813-2.7582a.7951.7951 0 0 0-.7874 0L5.8365 6.4913V4.1589a1.54 1.54 0 0 0-.0338-.0252l6.9361-4.0025a4.444 4.444 0 0 1 2.9808.4806zm3.2248 5.9469a4.4712 4.4712 0 0 1-.4766 5.4893l-.1364-.0757-4.7843-2.7582a.7951.7951 0 0 0-.7874 0l-5.8365 3.3689v-2.3324a1.54 1.54 0 0 0-.0338-.0252l6.9361-4.0025a4.444 4.444 0 0 1 2.9808.4806z"/>
  </svg>
);

const GeminiLogo = ({ className }: { className?: string }) => (
   <svg viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z"/>
  </svg>
);

const MidjourneyLogo = ({ className }: { className?: string }) => (
   <svg viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
     <path d="M21.18 6.03c-1.85-.6-6.83 1.04-6.83 1.04s-4.73 1.7-6.42 3.97c-1.69 2.27-.55 5.67-.55 5.67s4.59-1.23 9.4-5.71c0 0 1.29-1.19 2.02-2.43.73-1.24 2.38-2.54 2.38-2.54ZM11.9 11.52c-3.66 3.4-5.26 4.4-5.26 4.4s-1.34.57-2.06 1.42c-.72.85-1.76 3.64-1.76 3.64s3.98-1.06 7.59-4.25c3.61-3.19 5.2-6.22 5.2-6.22s-1.16.06-3.71 1.01Z"/>
   </svg>
);

const ElevenLabsLogo = ({ className }: { className?: string }) => (
   <svg viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
    <rect x="6" y="2" width="4" height="20" rx="1"/>
    <rect x="14" y="2" width="4" height="20" rx="1"/>
   </svg>
);

const MetaLogo = ({ className }: { className?: string }) => (
   <svg viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
     <path d="M12 12.05c-1.41 3.15-3.22 5.41-5.6 5.41-2.62 0-4.41-2.19-4.41-5.47 0-3.4 2.09-6.1 4.81-6.1 1.85 0 3.3 1.09 4.24 2.93 1.41-3.03 3.26-5.27 5.63-5.27 2.62 0 4.38 2.08 4.38 5.4 0 3.33-2.01 6.17-4.77 6.17-1.88 0-3.32-1.17-4.28-3.07zm-5.48-3.56c-1.4 0-2.44 1.62-2.44 3.5 0 1.96.93 3.1 2.14 3.1 1.46 0 2.76-1.95 3.63-4.48-.56-1.27-1.67-2.12-3.33-2.12zm9.96 4.02c1.5 0 2.47-1.67 2.47-3.57 0-2.04-.89-3.03-2.1-3.03-1.48 0-2.81 1.92-3.68 4.49.57 1.26 1.66 2.11 3.31 2.11z"/>
   </svg>
);

const TikTokLogo = ({ className }: { className?: string }) => (
   <svg viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.08 6.33 6.33 0 0 0-5.39 10.69 6.33 6.33 0 0 0 10.86-4.42V8.69a8.18 8.18 0 0 0 4.77 1.53v-3.44a4.86 4.86 0 0 1-1.01-.09z"/>
   </svg>
);

const StripeLogo = ({ className }: { className?: string }) => (
   <svg viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M10.2 21.5c-3 0-4.5-.8-4.5-.8l.5-3.3s1.3.4 2.7.4c1.1 0 1.6-.3 1.6-.8 0-.5-.4-.7-1.5-.9-3.4-.7-4.9-2-4.9-4.1 0-2.5 2.3-4.3 5.6-4.3 2.6 0 4 .6 4 .6l-.4 3.2s-1.2-.4-2.5-.4c-1 0-1.4.3-1.4.7 0 .4.4.6 1.6.9 3.3.7 4.7 2.1 4.7 4.1 0 2.7-2.5 4.4-5.5 4.4z"/>
   </svg>
);

const ZapierLogo = ({ className }: { className?: string }) => (
   <svg viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M13 2L11 2L11 9.17L5.92 4.09L4.5 5.5L9.58 10.58L2.5 10.58L2.5 12.58L9.58 12.58L4.5 17.66L5.92 19.07L11 13.99L11 21.16L13 21.16L13 13.99L18.08 19.07L19.5 17.66L14.42 12.58L21.5 12.58L21.5 10.58L14.42 10.58L19.5 5.5L18.08 4.09L13 9.17L13 2Z"/>
   </svg>
);

const RunwayLogo = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
        <path d="M6 4v16h4v-6h1.5l3.5 6h4.5l-4-6.5c1.8-.5 3-2.2 3-4.2 0-2.9-2.4-5.3-5.3-5.3H6zm4 3h3.3c1.3 0 2.3 1 2.3 2.3S14.6 11.6 13.3 11.6H10V7z"/>
    </svg>
);

const TechStack: React.FC = () => {
  const partners = [
    { name: 'OpenAI', component: OpenAILogo, color: 'hover:text-teal-400', fontClass: 'font-sans tracking-tight' },
    { name: 'Google Gemini', component: GeminiLogo, color: 'hover:text-blue-400', fontClass: 'font-sans' },
    { name: 'Midjourney', component: MidjourneyLogo, color: 'hover:text-white', fontClass: 'font-serif tracking-widest' },
    { name: 'ElevenLabs', component: ElevenLabsLogo, color: 'hover:text-white', fontClass: 'font-sans tracking-tighter font-light' },
    { name: 'Meta', component: MetaLogo, color: 'hover:text-blue-500', fontClass: 'font-sans tracking-tight font-bold' },
    { name: 'TikTok', component: TikTokLogo, color: 'hover:text-pink-500', fontClass: 'font-sans font-bold' },
    { name: 'Stripe', component: StripeLogo, color: 'hover:text-indigo-400', fontClass: 'font-sans font-bold tracking-tight' },
    { name: 'Zapier', component: ZapierLogo, color: 'hover:text-orange-500', fontClass: 'font-sans font-medium' },
    { name: 'Runway', component: RunwayLogo, color: 'hover:text-yellow-400', fontClass: 'font-sans tracking-widest uppercase font-bold' },
  ];

  // Quadruple the content to ensure it covers large screens seamlessly
  const scrollContent = [...partners, ...partners, ...partners, ...partners];

  return (
    <section className="py-10 bg-slate-950 border-b border-white/5 relative overflow-hidden">
       {/* Title */}
       <div className="text-center mb-10 px-4 relative z-20">
          <p className="text-[10px] md:text-xs font-bold tracking-[0.3em] text-slate-500 uppercase">
            Powered by World-Class Technology
          </p>
       </div>

       {/* Marquee Container */}
       <div className="relative flex overflow-hidden group py-4">
          
          {/* Fade Edges */}
          <div className="absolute left-0 top-0 bottom-0 w-12 md:w-32 bg-gradient-to-r from-slate-950 to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-12 md:w-32 bg-gradient-to-l from-slate-950 to-transparent z-10 pointer-events-none"></div>

          {/* Scrolling Track */}
          <div className="flex animate-marquee space-x-16 px-8 w-max">
             {scrollContent.map((Partner, idx) => (
               <div 
                 key={`${Partner.name}-${idx}`} 
                 className={`flex flex-col items-center justify-center min-w-[100px] md:min-w-[120px] space-y-3 cursor-default transition-all duration-300 text-slate-600 ${Partner.color} hover:scale-110 opacity-70 hover:opacity-100`}
               >
                  <Partner.component className="w-8 h-8 md:w-10 md:h-10" />
                  <span className={`text-[10px] md:text-xs whitespace-nowrap ${Partner.fontClass}`}>
                    {Partner.name}
                  </span>
               </div>
             ))}
          </div>
       </div>

       <style>{`
         @keyframes marquee {
           0% { transform: translateX(0); }
           100% { transform: translateX(-50%); }
         }
         .animate-marquee {
           animation: marquee 60s linear infinite;
         }
       `}</style>
    </section>
  );
};

export default TechStack;