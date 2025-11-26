export default function HealthcareHero() {
    return (
        <section className="relative bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto ">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                    {/* Left Content */}
                    <div className="space-y-6 lg:space-y-8 text-center lg:text-left order-2 lg:order-1">
                        <h1 className="text-3xl sm:text-4xl lg:text-[44px] font-bold leading-tight">
                            <span className="text-[#043B5C]">Empowering <br /> </span>
                            <span className="text-[#43BEF6]">hospitals </span>
                            <span className="text-[#043B5C]">and <br /> healthcare <br /></span>
                            <span className="text-[#43BEF6]">professionals.</span>
                        </h1>

                        <p className="text-[#475467] text-base sm:text-lg lg:text-xl max-w-xl mx-auto lg:mx-0">
                            Helping healthcare organizations achieve sustainable excellence.
                        </p>

                        <div className="flex flex-col m-4 text-xl sm:flex-row gap-4 justify-center lg:justify-start">
                            <button className="bg-[#43BEF6] hover:bg-[#36a3db] text-white font-semibold px-8 py-3 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl">
                                Our Services
                            </button>
                            <button className="bg-white hover:bg-slate-50 text-slate-700 font-semibold px-8 py-3 rounded-lg border-2 border-slate-300 transition-colors duration-200">
                                Contact us
                            </button>
                        </div>
                    </div>

                    {/* Right Image Section */}
                    <div className="relative order-1 lg:order-2">
                        
                        {/* Doctor Image Placeholder */}
                        <div className="relative z-10 flex justify-center lg:justify-end">
                            <div className="w-full">
                                <img
                                    src="/images/mainimage.png"
                                    alt="Healthcare professional"
                                    className="w-full h-auto object-cover"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
