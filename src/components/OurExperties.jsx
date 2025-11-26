"use client";

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

const OurExpertise = () => {
  // Data for each expertise section
  const expertiseData = [
    {
      image: "/images/expertise.png", // Replace with your image paths
      title: "Quality Accreditation & Certification",
    },
    {
      image: "/images/expertise1.png", // Replace with your image paths
      title: "System & Process Development",
    },
    {
      image: "/images/expertise2.png", // Replace with your image paths
      title: "Patient Experience & Communication",
    },
    {
      image: "/images/expertise3.png", // Replace with your image paths
      title: "Hospital Planning & Designing",
    },
    {
        image: "/images/expertise4.png", // Replace with your image paths
        title: "Equipment Planning & Procurement",
    },
    {
        image: "/images/expertise5.png", // Replace with your image paths
        title: "OT Designing & Restructuring",
    },
    {
      image: "/images/expertise6.png", // Replace with your image paths
      title: "Training & Capacity Building",
    },
    {
      image: "/images/expertise7.png", // Replace with your image paths
      title: "Digital Marketing & Online Positioning",
    },
  ];

  return (
    <div className="mx-auto py-10 px-6 lg:px-40 text-center">
      <h3 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#043C64] mb-8">
        <span className="border-b-4 border-slate-800 pb-2">Our Expertise</span>
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
              <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden flex flex-col">
                {/* Service Image */}
                <div className="w-full h-48 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Service Content */}
                <div className="p-6 grow">
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-800 mb-4">
                    {item.title}
                  </h3>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Desktop: Grid with 4 Columns */}
      <div className="hidden lg:grid grid-cols-4 gap-12 mt-12">
        {expertiseData.map((item, idx) => (
          <div
            key={idx}
            className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden flex flex-col"
          >
            {/* Service Image */}
            <div className="w-full h-48 overflow-hidden">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Service Content */}
            <div className="p-6 grow">
              <h3 className="text-xl sm:text-2xl font-bold text-slate-800 mb-4">
                {item.title}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OurExpertise;
