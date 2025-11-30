"use client";

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay, Pagination } from 'swiper/modules';

const Testimonial = () => {

  const testimonials = [
    {
      image: '/images/testimonial.webp',
      alt: 'Certificate 1',
    },
    {
      image: '/images/testimonial1.webp', 
      alt: 'Certificate 2',
    },
    {
      image: '/images/testimonial2.webp', 
      alt: 'Certificate 3',
    },
    {
      image: '/images/testimonial3.webp', 
      alt: 'Certificate 4',
    },
     {
      image: '/images/testimonial4.webp', 
      alt: 'Certificate 5',
    },
  ];

  return (
    <section className="bg-slate-100 py-10 px-6 lg:px-8 ">
    <div className="max-w-7xl mx-auto text-center">
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-800 text-center mb-10">
          <span className="border-b-4 border-slate-800 mb-2">Testimonials</span>
        </h2>
      <p className="text-lg sm:text-4xl text-[#4A4A4A] mb-4">
        See What Our Clients Have to Say
      </p>
      <p className="text-md sm:text-lg text-[#555555] mb-16">
        “Verified and trusted certificates and recommendations”
      </p>

      {/* Swiper for Mobile and Desktop */}
      <div className="block lg:hidden">
        {/* Mobile: Swiper */}
        <Swiper
          modules={[Autoplay, Pagination]}
          slidesPerView={1}
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          loop={true}
        >
          {testimonials.map((testimonial, idx) => (
            <SwiperSlide key={idx}>
              <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
                <div className="w-full overflow-hidden">
                  <img
                    src={testimonial.image}
                    alt={testimonial.alt}
                    className="w-full h-full object-contain" // Ensure full image visibility without cropping
                  />
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="hidden lg:block">
        {/* Desktop: Swiper */}
        <Swiper
          modules={[Autoplay, Pagination]}
          slidesPerView={1}
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          loop={true}
        >
          {testimonials.map((testimonial, idx) => (
            <SwiperSlide key={idx}>
              <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden max-w-md mx-auto">
                <div className="w-full overflow-hidden">
                  <img
                    src={testimonial.image}
                    alt={testimonial.alt}
                    className="w-full h-full object-contain" // Ensure full image visibility without cropping
                  />
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
    </section>
  );
};

export default Testimonial;
