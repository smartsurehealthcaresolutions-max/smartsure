import { ShieldCheck, Users, Star } from 'lucide-react';
export default function WhoWeAre() {
    return (
        <section className="bg-[#f8fbfd] px-6 py-10 lg:px-8">
            <div className="max-w-7xl mx-auto">

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                    {/* Left Image Section */}
                    <div className="order-2 lg:order-1">
                        <div className="w-full  max-w-4xl">
                            <img
                                src="/images/abouts.webp"
                                alt="Healthcare team collaboration"
                                className="w-full h-full object-cover  "
                            />
                        </div>
                    </div>

                    {/* Right Content Section */}
                    <div className=" order-1 lg:order-2 space-y-6 lg:space-y-8">
                        <h3 className="text-2xl sm:text-3xl lg:text-4xl text-[#0E2B5C] font-medium">
                            Building Healthier Futures Together
                        </h3>

                        <p className="text-slate-600 text-base sm:text-lg lg:text-2xl leading-relaxed">
                            At SmartSure Healthcare Solutions, we combine compassion with
                            technology to deliver reliable and effective health consulting
                            services. Our team works closely with hospitals and healthcare
                            providers to create impactful patient outcomes.
                        </p>

                    </div>
                </div>
                {/* Core Values Section */}
                <div className="mt-16 text-center">
                    
                    <h3 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-[#043C64] mb-6">
                        Our Core Values
                    </h3>
                    <div className="grid grid-cols-3 gap-6 lg:gap-12">
                       
                        <div className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-lg">
                            <ShieldCheck className="text-[#43bef6] w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 mb-4" />
                            <h4 className="text-base sm:text-lg lg:text-xl font-medium text-[#0E2B5C]">
                                Integrity
                            </h4>
                        </div>
                      
                        <div className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-lg">
                            <Users className="text-[#43bef6] w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 mb-4" />
                            <h4 className="text-base sm:text-lg lg:text-xl font-medium text-[#0E2B5C]">
                                Collaboration
                            </h4>
                        </div>
                 
                        <div className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-lg">
                            <Star className="text-[#43bef6] w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 mb-4" />
                            <h4 className="text-base sm:text-lg lg:text-xl font-medium text-[#0E2B5C]">
                                Excellence
                            </h4>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}
