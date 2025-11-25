import { MapPin, Mail } from 'lucide-react';

export default function Footer() {
  const quickLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About Us', href: '#about' },
    { name: 'Our Services', href: '#services' },
    { name: 'How We Work', href: '#how-we-work' },
    { name: 'Career', href: '#career' },
    { name: 'Contact Us', href: '#contact' }
  ];

  return (
    <footer className="bg-white py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-8xl p-4 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 mb-12">
          {/* Left Column - Logo and Tagline */}
          <div className="space-y-4">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 flex items-center justify-center">
                <img src="/logo.png" alt="SmartSure Logo" height={70} width={70} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-800">SmartSure</h3>
                <p className="text-sm text-slate-600">Healthcare Solutions</p>
              </div>
            </div>
            
            {/* Tagline */}
            <p className="text-slate-600 text-sm leading-relaxed">
              "Empowering hospitals to deliver care with quality, compassion, and confidence."
            </p>
          </div>
          
          {/* Middle Column - Quick Links */}
          <div>
            <h4 className="text-lg font-bold text-slate-800 mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href}
                    className="text-slate-600 hover:text-sky-500 transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Right Column - Contact Info */}
          <div className="space-y-4">
            {/* Location */}
            <div className="flex items-start gap-3">
              <MapPin className="text-sky-500 shrink-0 mt-1" size={20} />
              <div>
                <p className="text-sm font-semibold text-slate-800 mb-1">Based in India</p>
                <p className="text-sm text-slate-600">
                  Serving Pan-India Healthcare Institutions
                </p>
              </div>
            </div>
            
            {/* Email */}
            <div className="flex items-start gap-3">
              <Mail className="text-sky-500 shrink-0 mt-1" size={20} />
              <a 
                href="mailto:info@smartsurehealthcaresolution.com"
                className="text-sm text-slate-600 hover:text-sky-500 transition-colors duration-200 break-all"
              >
                info@smartsurehealthcaresolution.com
              </a>
            </div>
          </div>
        </div>
        
        {/* Copyright */}
        <div>
          <p className="text-center text-sm text-slate-500">
            © 2025 SmartSure Healthcare Solutions. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}