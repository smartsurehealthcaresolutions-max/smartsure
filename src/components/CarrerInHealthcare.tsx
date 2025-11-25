import { Mail } from 'lucide-react';

export default function CareerInHealthcare() {
  return (
    <section className="bg-gray-50 py-12 sm:py-16 lg:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl py-6 mx-auto">
        {/* Section Title */}
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-800 text-center mb-12 lg:mb-16">
          <span className="border-b-4 border-slate-800 pb-2">Contact Us</span>
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Image */}
          <div className="order-2 lg:order-1">
            <div className="w-full max-w-4xl">
              <img 
                src="carrer.png" 
                alt="Healthcare professionals team" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          
          {/* Right Content */}
          <div className="order-1 lg:order-2 space-y-6">
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-800 leading-tight">
              Shape Your Future in Healthcare
            </h3>
            
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
              Are you passionate about making a difference in people's lives?
            </p>
            
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed text-justify">
              Whether you're a fresher or have completed your +2, SmartSure guides you toward the right path in the healthcare field — from academic programs to job opportunities across hospitals and healthcare institutions.
            </p>
            
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed text-justify">
              Build your career with expert mentorship and industry connections that help you grow with confidence.
            </p>
            
            {/* Contact Email */}
            <div className="pt-4">
              <a 
                href="mailto:info@smartsurehealthcaresolution.com"
                className="inline-flex items-center gap-3 text-slate-700 hover:text-sky-500 transition-colors duration-200 group"
              >
                <div className="w-10 h-10 rounded-full bg-sky-100 group-hover:bg-sky-200 flex items-center justify-center transition-colors duration-200">
                  <Mail className="text-sky-500" size={20} />
                </div>
                <span className="text-base sm:text-lg font-medium">
                  info@smartsurehealthcaresolution.com
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}