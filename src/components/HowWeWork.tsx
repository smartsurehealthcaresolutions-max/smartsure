import { Brain, Calendar, CheckSquare, TrendingUp, ArrowRight } from 'lucide-react';

export default function HowWeWork() {
  const steps = [
    {
      icon: Brain,
      title: "Understand",
      description: "We begin by assessing your hospital's existing systems, processes, and goals to identify key improvement areas"
    },
    {
      icon: Calendar,
      title: "Plan",
      description: "Our experts design a customized roadmap — with defined goals, timelines, and actionable milestones."
    },
    {
      icon: CheckSquare,
      title: "Implement",
      description: "We provide hands-on support through SOP development, training, and internal audits to ensure seamless execution."
    },
    {
      icon: TrendingUp,
      title: "Sustain",
      description: "We help your team build capacity and monitor performance to sustain long-term quality improvement."
    }
  ];

  return (
    <section className="bg-gray-50 py-12 sm:py-16 lg:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-800 text-center mb-6">
          <span className="border-b-4 border-slate-800 pb-2">How We Work</span>
        </h2>
        
        {/* Subtitle */}
        <p className="text-slate-600 text-center text-base sm:text-lg lg:text-xl mb-12 lg:mb-16 max-w-3xl mx-auto">
          A proven 4-step framework for sustainable healthcare quality improvement.
        </p>
        
        {/* Steps Grid */}
        <div className="relative">
          {/* Desktop Arrow Lines */}
          <div className="hidden lg:flex absolute top-1/3 left-0 right-0 items-center justify-between px-12 pointer-events-none">
            <div className="flex-1 flex items-center justify-around">
              <ArrowRight className="text-gray-300" size={32} />
              <ArrowRight className="text-gray-300" size={32} />
              <ArrowRight className="text-gray-300" size={32} />
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-4 relative">
            {steps.map((step, index) => {
              const IconComponent = step.icon;
              return (
                <div 
                  key={index}
                  className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 p-6 flex flex-col items-center text-center"
                >
                  {/* Icon */}
                  <div className="w-20 h-20 rounded-full bg-sky-100 flex items-center justify-center mb-6">
                    <IconComponent className="text-sky-400" size={40} strokeWidth={1.5} />
                  </div>
                  
                  {/* Title */}
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-800 mb-4">
                    {step.title}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                    {step.description}
                  </p>
                  
                  {/* Mobile Arrow */}
                  {index < steps.length - 1 && (
                    <div className="lg:hidden mt-6">
                      <ArrowRight className="text-gray-300" size={24} />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}