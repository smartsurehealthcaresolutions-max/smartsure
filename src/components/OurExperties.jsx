"use client";
import React from 'react';
import { Users, Star, Home, Clipboard, Globe, CircleCheck, BadgeCheck, Settings } from 'lucide-react'; // Import icons
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';

const OurExpertise = () => {
    // Data for each expertise section
    const expertiseData = [
        {
            icon: <BadgeCheck className="w-12 bg-[#e8f7ff] rounded-full p-2.5 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 text-[#43bef6] mb-4" />,
            title: "Quality Accreditation & Certification",
            description:
                "Helping hospitals achieve NABH, NABL, and Nursing Excellence certifications with complete end-to-end support.",
        },
        {
            icon: <Settings className="w-12 bg-[#e8f7ff] rounded-full p-2.5 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 text-[#43bef6] mb-4" />,
            title: "System & Process Development",
            description:
                "Building robust healthcare systems and SOPs that improve efficiency, safety, and compliance.",
        },
        {
            icon: <Users className="w-12 bg-[#e8f7ff] rounded-full p-2.5 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 text-[#43bef6] mb-4" />,
            title: "Patient Experience & Communication",
            description:
                "Enhancing patient satisfaction through effective communication, empathy, and service design.",
        },
        {
            icon: <Home className="w-12 bg-[#e8f7ff] rounded-full p-2.5 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 text-[#43bef6] mb-4" />,
            title: "Hospital Planning & Designing",
            description:
                "Designing functional, patient-centric hospital spaces and workflows for better operations.",
        },
        {
            icon: <Star className="w-12 bg-[#e8f7ff] rounded-full p-2.5 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 text-[#43bef6] mb-4" />,
            title: "Training & Capacity Building",
            description:
                "Empowering teams through skill development, internal audits, and leadership training.",
        },
        {
            icon: <Globe className="w-12 bg-[#e8f7ff] rounded-full p-2.5 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 text-[#43bef6] mb-4" />,
            title: "Digital Marketing & Online Positioning",
            description:
                "Strengthening hospital visibility and reputation through targeted digital strategies.",
        },
    ];

    return (
        <div className="mx-auto px-4 py-10 sm:px-6 lg:px-40 text-center">
            <h3 className=" text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#043C64] mb-8">
                <span className="border-b-4 border-slate-800 pb-2">

                Our Expertise
                </span>
            </h3>
            <p className="text-lg sm:text-4xl text-[#4A4A4A] mb-4">
                Expertise Built on 15+ Years of Healthcare Excellence
            </p>
            <p className="text-md sm:text-lg text-[#555555] mb-16">
                “Delivering practical, customized, and sustainable healthcare quality solutions.”
            </p>

            {/* Mobile: Swiper */}
            <div className="block lg:hidden">
                <Swiper
                    modules={[Autoplay, Pagination]}
                    slidesPerView={1}
                    pagination={{ clickable: true }}
                    autoplay={{ delay: 3000, disableOnInteraction: false }}
                    loop={true}
                >
                    {expertiseData.map((item, idx) => (
                        <SwiperSlide key={idx}>
                            <div className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-lg max-w-xs w-full mx-auto">
                                {item.icon}
                                <h4 className="text-xl sm:text-2xl lg:text-3xl font-medium text-[#043C64]">
                                    {item.title}
                                </h4>
                                <p className="text-sm sm:text-md text-[#444444]">
                                    {item.description}
                                </p>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            {/* Desktop: Grid */}
            <div className="hidden lg:grid grid-cols-3 gap-12 mt-12">
                {expertiseData.map((item, idx) => (
                    <div key={idx} className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-xl">
                        {item.icon}
                        <h4 className="text-base font-semibold sm:text-lg lg:text-xl text-[#043C64]">
                            {item.title}
                        </h4>
                        <p className="text-sm text-justify m-2 p-4 sm:text-md text-[#444444]">
                            {item.description}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default OurExpertise;
