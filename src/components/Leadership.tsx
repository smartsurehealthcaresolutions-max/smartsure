export default function Leadership() {
  return (
    <section className="bg-white py-12 lg:py-20">
      <div className="mx-auto px-4 sm:px-6 lg:px-40">
        {/* Section Title */}
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#043c64] text-center mb-12 lg:mb-16">
          <span className="border-b-4 border-[#043c64] pb-2">Leadership</span>
        </h2>
        
        {/* Leadership Profile */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left - Image */}
          <div className="flex justify-center lg:justify-start">
            <div className="w-full max-w-sm">
              <div className="relative rounded-2xl overflow-hidden shadow-xl bg-linear-to-br from-sky-200 to-sky-300">
                <img 
                  src="leader.png" 
                  alt="Pratiksha Singh - Founder & Director" 
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>
          
          {/* Right - Content */}
          <div className="space-y-6 text-center lg:text-left">
            <div>
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-800 mb-2">
                Pratiksha Singh
              </h3>
              <p className="text-slate-600 text-lg sm:text-2xl font-medium">
                Founder & Director
              </p>
            </div>
            
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
              A postgraduate in Hospital Administration with a fellowship from L 
              V Prasad Eye Institute, Hyderabad, Pratiksha brings over 14 years of 
              experience with leading healthcare organizations such as Bausch 
              & Lomb, Centre for Sight, and Eye Q Hospitals. She specializes in 
              healthcare quality systems, patient communication, and 
              operational excellence, leading SmartSure's mission to deliver 
              sustainable, patient-centered solutions.
            </p>
            
            <blockquote className="border-l-4 border-sky-400 pl-6 py-2">
              <p className="text-sky-400 text-lg sm:text-xl lg:text-2xl font-semibold italic">
                "We empower hospitals to deliver care with quality and compassion."
              </p>
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  );
}