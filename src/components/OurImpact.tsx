import { Award, RefreshCw, Users, Monitor } from 'lucide-react';

export default function OurImpact() {
  const highlights = [
    {
      icon: Award,
      text: "NABH and Nursing Excellence accreditation readiness"
    },
    {
      icon: RefreshCw,
      text: "Process redesign and hospital system development"
    },
    {
      icon: Users,
      text: "Manpower planning, recruitment, and training support"
    },
    {
      icon: Monitor,
      text: "Digital strategy and online positioning for healthcare institutions"
    }
  ];

  return (
    <section className="bg-white py-12 sm:py-16 lg:py-24 px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-800 text-center mb-12 lg:mb-16">
          <span className="border-b-4 border-slate-800 pb-2">Our Impact</span>
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            {/* Description */}
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
              SmartSure has successfully partnered with hospitals and eye care centres across{' '}
              <span className="font-bold text-slate-800">Rajasthan, Haryana, Punjab, Madhya Pradesh,</span> and{' '}
              <span className="font-bold text-slate-800">Chhattisgarh</span> — helping them strengthen quality systems, streamline operations, and achieve accreditation excellence.
            </p>
            
            {/* Impact Highlights Title */}
            <h3 className="text-xl sm:text-2xl font-bold text-sky-400">
              Impact Highlights:
            </h3>
            
            {/* Highlights List */}
            <div className="space-y-4">
              {highlights.map((highlight, index) => {
                const IconComponent = highlight.icon;
                return (
                  <div 
                    key={index}
                    className="flex items-start gap-4 group"
                  >
                    <div className="shrink-0 w-10 h-10 rounded-lg bg-sky-50 flex items-center justify-center group-hover:bg-sky-100 transition-colors duration-200">
                      <IconComponent className="text-sky-400" size={20} strokeWidth={2} />
                    </div>
                    <p className="text-slate-600 text-sm sm:text-base pt-2">
                      {highlight.text}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
          
          {/* Right Map Image */}
          <div className="flex justify-center lg:justify-end">
            <div className="w-full max-w-md">
              <img 
                src="images/map.webp" 
                alt="India map showing SmartSure's impact across states" 
                className="w-full h-auto object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}