import React from 'react';
import Image from 'next/image'; 

const MainComponent = () => {
    return (
        <section className="flex flex-col md:flex-row items-center justify-between p-8 md:p-16 bg-[#f0f9ff]">
           
            {/* Text Section */}
            <div className="text-center md:text-left md:w-1/2">
                <h1 className="text-4xl font-bold text-[#043B5C] mb-4">
                    Empowering<span className="text-blue-500">hospitals</span> and <br />health care <span className="text-blue-500">professionals.</span>.
                </h1>
                <p className="text-lg text-[#475467] mb-6">
                    Helping healthcare organizations achieve sustainable excellence.
                </p>

                <div className="flex justify-center md:justify-start gap-4">
                    <button className="bg-brand text-white rounded-full px-6 py-3 hover:bg-teal-600 transition">
                        <a href="/services">Our Services</a>
                    </button>
                    <button className="bg-[#222222] text-white rounded-full px-6 py-3 hover:bg-teal-600 transition">
                        <a href="/contact">Contact us</a>
                    </button>
                </div>
            </div>

             <div className="w-full md:w-1/2 mb-8 md:mb-0 flex justify-center">
                <Image 
                    src="/mainimage.png" 
                    alt="Healthcare Professional"
                    width={400}
                    height={500}
                    className="rounded-lg"
                />
            </div>
        </section>
    );
};

export default MainComponent;
