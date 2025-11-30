"use client";
import React, { useState } from 'react';
import Link from 'next/link';

const NAV_ITEMS = [
  { label: 'Home', href: '/' },
  { label: 'About us', href: '/about' },
  { label: 'Our Services', href: '/services' },
  { label: 'Testimonials', href: '/testimonial' },
  { label: 'Career', href: '/career' },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="bg-white sticky w-full z-20 top-0 font-poppins start-0 border-b border-default">
      <div className="flex flex-wrap items-center justify-between mx-auto px-1 sm:px-4 sm:py-1.25">
        {/* Hamburger Menu Button (now on the left side) */}
        <div className="lg:hidden absolute right-4">
          <button onClick={() => setMobileOpen(true)} className="text-black">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>

        {/* Logo */}
        <Link href="/" passHref className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src="/images/logo.webp" alt="SmartSure Logo" height={90} width={90} />
          <div className="leading-tight">
            <p className="text-[#043B5C] text-2xl">SmartSure</p>
            <p className="text-[12px] text-[#475467] -mt-1">Healthcare Solutions</p>
          </div>
        </Link>

        {/* Navigation Links */}
        <nav className="items-center justify-between hidden w-full lg:flex md:w-auto md:order-1">
          <ul className="flex text-2xl flex-col p-4 md:p-0 mt-4 font-medium border border-default rounded-base bg-neutral-secondary-soft md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-neutral-primary text-[#333333]">
            {NAV_ITEMS.map(({ label, href }) => (
              <li key={label}>
                <Link href={href} className="block py-2 px-3 bg-brand rounded-sm md:bg-transparent md:text-fg-brand md:p-0" aria-current="page">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Contact Button */}
        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          <button type="button" className="text-black bg-brand hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium font-medium leading-5 rounded-base text-sm px-3 py-2 focus:outline-none">
            <Link href="#contact" className="hidden  ml-4 text-xl lg:inline-block px-5 py-2 text-white bg-[#222222] rounded-full font-semibold hover:bg-white hover:text-[#222222] hover:border-black hover:border transition">
              Contact
            </Link>
          </button>
        </div>
      </div>



      {/* Slide-in Menu for Mobile */}
      <div
        className={`fixed top-0 right-0 z-50 w-64 bg-white text-[#333333] shadow-lg h-full transform transition-transform duration-300 ease-in-out ${mobileOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
      >
        <div className="flex justify-end p-4">
          <button onClick={() => setMobileOpen(false)} aria-label="Close menu">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 text-[#333333]">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        <ul className="flex flex-col gap-6 px-6 text-lg">
          {NAV_ITEMS.map(({ label, href }) => (
            <li key={label}>
              <Link href={href} onClick={() => setMobileOpen(false)} className="block py-2 px-3 text-[#333333] hover:text-teal-500">
                {label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Move the Contact button to the bottom of the menu */}
        <div className="mt-auto p-6">
          <button type="button" className="text-black bg-brand hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-3 py-2 focus:outline-none">
            <Link href="#contact" className="text-xl inline-block px-5 py-2 text-white bg-[#222222] rounded-full font-semibold hover:bg-teal-600 transition">
              Contact
            </Link>
          </button>
        </div>
      </div>

      {/* Overlay to close menu when clicked outside */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-40"
          onClick={() => setMobileOpen(false)}
        />
      )}
    </nav>
  );
};

export default Navbar;
