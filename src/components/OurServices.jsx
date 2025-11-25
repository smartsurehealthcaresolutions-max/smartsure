export default function OurServices() {
  const services = [
    {
      title: "Quality Accreditation support",
      image: "services.png",
      items: [
        "Gap Analysis & Readiness Assessment",
        "SOP & Manual Development",
        "Training & Internal Audits",
        "Registration & Non-compliance Closure",
        "Post-accreditation Support"
      ]
    },
    {
      title: "Manpower Recruitment & Training",
      image: "services1.png",
      items: [
        "Workforce Mapping & Planning",
        "Recruitment & Selection Support",
        "Training & Capacity Building",
        "Staffing for Administrators, Nursing & Paramedical"
      ]
    },
    {
      title: "Digital Marketing",
      image: "services2.png",
      items: [
        "Website & Social Media Management",
        "SEO & Google Ads Campaigns",
        "Online Reputation Management",
        "Patient Engagement Campaigns"
      ]
    }
  ];

  return (
    <section className="bg-slate-100  mt-22.5 sm:mt-25">
      <div className="max-w-7xl py-6 mx-auto">
        {/* Section Title */}
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-800 text-center mb-12 lg:mb-16">
          <span className="border-b-4 border-slate-800 pb-2">Our Services</span>
        </h2>
        
        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <div 
              key={index}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden flex flex-col"
            >
              {/* Service Image */}
              <div className="w-full h-48 overflow-hidden">
                <img 
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Service Content */}
              <div className="p-6 grow">
                <h3 className="text-xl sm:text-2xl font-bold text-slate-800 mb-4">
                  {service.title}
                </h3>
                
                <ul className="space-y-3">
                  {service.items.map((item, itemIndex) => (
                    <li 
                      key={itemIndex}
                      className="flex items-start text-slate-600 text-sm sm:text-base"
                    >
                      <span className="text-sky-400 mr-2 mt-1 shrink-0">●</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}