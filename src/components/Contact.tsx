'use client';

import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Confetti from 'react-confetti';
import { useWindowSize } from '@react-hook/window-size';

const EMAIL = process.env.NEXT_PUBLIC_EMAIL;

type FormState = {
  name: string;
  email: string;
  company: string;
  file: File | null;
  phone: string;
};

const Contact: React.FC = () => {
  const [width, height] = useWindowSize();
  const [form, setForm] = useState<FormState>({
    name: '',
    email: '',
    company: '',
    file: null,
    phone: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Handle input change
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const target = e.target as HTMLInputElement | HTMLTextAreaElement;
    const name = target.name;

    if (name === 'file') {
      const input = target as HTMLInputElement;
      setForm((prev) => ({
        ...prev,
        file: input.files ? input.files[0] : null,
      }));
    } else {
      const value = target.value;
      setForm((prev) => ({ ...prev, [name]: value } as FormState));
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!form.name.trim() || !form.email.trim() || !form.phone.trim()) {
      toast.error('Please fill in all fields.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email.trim())) {
      toast.error('Please enter a valid email address.');
      return;
    }

    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(form.phone.trim())) {
      toast.error('Please enter a valid 10-digit phone number.');
      return;
    }

    // File size validation (max 5 MB)
    if (form.file && form.file.size > 5 * 1024 * 1024) {
      toast.error('File size exceeds the 5 MB limit.');
      return;
    }

    try {
      setSubmitting(true);
      const formData = new FormData();
      formData.append('name', form.name.trim());
      formData.append('email', form.email.trim());
      formData.append('phone', form.phone.trim());

      if (form.file) {
        formData.append('attachment', form.file);
      }

      const res = await fetch('/api/contact', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.message || 'Failed to send message');
      }

      setSubmitted(true);
      toast.success('🎉 Your message has been sent!');
      setForm({ name: '', email: '', company: '', file: null, phone: '' });
    } catch (err) {
      if (err instanceof Error) toast.error(err.message || 'Something went wrong.');
      else toast.error('Something went wrong.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section
      className="bg-[#f8fbfd] text-[#043C64] pb-10 px-6 sm:px-10 md:px-20 relative overflow-hidden"
      aria-labelledby="contact-heading"
    >
      {submitted && (
        <Confetti width={width} height={height} recycle={false} numberOfPieces={150} />
      )}

      <p className="text-lg text-center sm:text-2xl text-[#4A4A4A] mb-4">
        Send Us your resume by filling the form below
      </p>
      <div className="max-w-xl mx-auto shadow-lg bg-white p-8 rounded-lg">
        {/* Contact Form */}
        {!submitted && (
          <form
            onSubmit={handleSubmit}
            className="space-y-8 flex flex-col items-center justify-center"
            noValidate
            aria-live="assertive"
            aria-atomic="true"
            autoComplete="on"
          >
            {/* Honeypot */}
            <div className="hidden" aria-hidden="true">
              <label htmlFor="company">Company</label>
              <input
                type="text"
                id="company"
                name="company"
                value={form.company}
                onChange={handleChange}
                tabIndex={-1}
                autoComplete="off"
              />
            </div>

            {(['name', 'email', 'phone'] as const).map((field) => (
              <div key={field} className="relative w-full">
                <label
                  htmlFor={field}
                  className={`absolute left-4 top-4 pointer-events-none font-medium select-none transition-all ${form[field].length > 0
                    ? 'scale-75 -translate-y-7 text-[#ccc]'
                    : 'text-[#ccc]'
                    }`}
                >
                  {field.charAt(0).toUpperCase() + field.slice(1)}
                </label>

                <input
                  type={field === 'email' ? 'email' : field === 'phone' ? 'tel' : 'text'}
                  name={field}
                  id={field}
                  value={form[field]}
                  onChange={handleChange}
                  placeholder=" "
                  className="w-full p-4 rounded bg-[#ffffff] border border-[#d9d9d9] text-black placeholder-transparent focus:outline-none focus:border-black transition-all"
                  aria-required="true"
                  required
                  autoComplete={field === 'email' ? 'email' : field === 'phone' ? 'tel' : 'name'}
                />
              </div>
            ))}

            <div className="w-full text-[#666] font-medium">
              Upload your resume
            </div>

            <div className="relative w-full">
              <label
                htmlFor="file"
                className="absolute left-4 top-4 pointer-events-none font-medium select-none transition-all text-[#ccc]"
              >

              </label>
              <input
                type="file"
                name="file"
                id="file"
                accept=".pdf,.docx,.txt,.jpg,.webp,.jpeg"
                onChange={handleChange}
                className="w-full p-4 rounded bg-[#ffffff] border border-[#d9d9d9] text-black focus:outline-none focus:border-black transition-all"
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className={`bg-[#43bef6] mx-auto text-white hover:cursor-pointer px-8 py-3 rounded-full font-semibold shadow-lg focus:outline-none focus-visible:ring-4 transition-all ${submitting ? 'opacity-70 cursor-not-allowed' : 'hover:scale-105'
                }`}
              aria-label="Send Message"
            >
              {submitting ? 'Sending…' : 'Send Resume'}
            </button>
          </form>
        )}

        <ToastContainer
          position="bottom-center"
          autoClose={3500}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </div>
    </section>
  );
};

export default Contact;
