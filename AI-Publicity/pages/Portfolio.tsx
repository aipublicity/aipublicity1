import React from 'react';
import { PORTFOLIO_ITEMS } from '../constants';

const Portfolio: React.FC = () => {
  return (
    <div className="py-20 bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">Featured Projects</h1>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            A collection of AI-generated campaigns, cinematic productions, and automation workflows.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PORTFOLIO_ITEMS.map((item) => (
            <div key={item.id} className="group relative overflow-hidden rounded-2xl bg-slate-900 border border-white/5">
              <div className="aspect-w-16 aspect-h-12 overflow-hidden">
                <img 
                  src={item.imageUrl} 
                  alt={item.title} 
                  className="object-cover w-full h-64 transform group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent opacity-80"></div>
              <div className="absolute bottom-0 left-0 p-6 w-full">
                <span className="text-cyan-400 text-xs font-bold uppercase tracking-wider mb-1 block">
                  {item.category}
                </span>
                <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                  {item.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-16 flex justify-center">
           <button className="px-8 py-3 border border-white/20 rounded-full text-white hover:bg-white/10 transition-colors">
             Load More Projects
           </button>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
