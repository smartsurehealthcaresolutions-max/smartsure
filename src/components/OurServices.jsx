import { title } from "process";

export default function OurServices() {
  const services = [
    {
      title: "Quality Accreditation support",
      image: "/images/services.webp",
      items: [
        "Gap Analysis & Readiness Assessment",
        "SOP & Manual Development",
        "Training & Internal Audits",
        "Registration & Non-compliance Closure",
        "Post-accreditation Support",
      ],
      secondtitle:"",
      seconditems:[],
    },
    {
      title: "Manpower Recruitment",
      image: "/images/services1.webp",
      items: [
        "Workforce need assessment",
        "Job descriptions & competency mapping",
        "Screening and shortlisting of qualified candidates",
        "Recruitment for nursing, clinical, paramedical & administrative roles"
      ],
      secondtitle:"Training & Capacity Building",
      description:"We deliver practical, role-specific, and NABH-aligned training modules conducted by experienced healthcare professionals and certified trainers.",
      seconditems:["Patient Communication & Customer Service",
        "Nursing Skills & Clinical Protocols",
        "Infection Prevention & Control (IPC)",
        "Life Support Programs: BLS, ACLS, NALS, PALS",
        "Patient Counseling Techniques",
        "Emergency Response & Code Blue/Red Protocols",
        "Department-wise Trainings: ICU, OT, OPD, Pharmacy, Front Office",
        "Soft Skills & Behavioural Training",
        "Leadership Programs for Supervisors & In-charges",
        "POSH Training by Industry-Certified Trainers",
      ],
    },
    {
      title: "Digital Marketing",
      image: "/images/services2.webp",
      items: [
        "Website & Social Media Management",
        "SEO & Google Ads Campaigns",
        "Online Reputation Management",
        "Patient Engagement Campaigns"
      ],
      secondtitle:"",
      seconditems:[],
    }
  ];

  return (
    <section className="bg-slate-100 py-10 px-6 lg:px-8 ">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-800 text-center mb-12 lg:mb-16">
          <span className="border-b-4 border-slate-800 mb-2">Our Services</span>
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
                <h3 className="text-xl sm:text-2xl pt-2 font-bold text-slate-800 mb-4">
                  {service.secondtitle}
                </h3>
                <ul className="space-y-3">
                  {service.seconditems.map((item, itemIndex) => (
                    <li 
                      key={itemIndex}
                      className="flex items-start text-slate-600 text-sm sm:text-base"
                    >
                      <span className="text-sky-400 mr-2 mt-1 shrink-0">●</span>
                      <span>{service.seconditems[itemIndex]}</span>
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