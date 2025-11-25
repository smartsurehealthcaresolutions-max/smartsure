'use client';

import React, { useState } from 'react';
import { Github, Linkedin, Mail, Copy } from 'lucide-react';
import Confetti from 'react-confetti';
import { useWindowSize } from '@react-hook/window-size';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EMAIL = 'anujsingh.devx@gmail.com';

const Contact = () => {
    const [form, setForm] = useState({ name: '', email: '', message: '', company: '' });
    const [submitted, setSubmitted] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [width, height] = useWindowSize();

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(EMAIL);
            toast.success('Email copied!');
        } catch {
            toast.info('Select and copy the address manually.');
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
            toast.error('Please fill in all fields.');
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(form.email.trim())) {
            toast.error('Please enter a valid email address.');
            return;
        }

        if (form.company?.trim()) {
            setSubmitted(true);
            setForm({ name: '', email: '', message: '', company: '' });
            toast.success('🎉 Your message has been sent!');
            return;
        }

        try {
            setSubmitting(true);
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: form.name.trim(),
                    email: form.email.trim(),
                    query: form.message.trim(),
                }),
            });

            if (!res.ok) {
                const data = await res.json().catch(() => ({}));
                throw new Error(data.message || 'Failed to send message');
            }

            if (document.activeElement instanceof HTMLElement) {
                document.activeElement.blur();
            }

            setSubmitted(true);
            toast.success('🎉 Your message has been sent!');
            setForm({ name: '', email: '', message: '', company: '' });
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
            id="contact"
            aria-labelledby="contact-heading"
        >
            {submitted && (
                <Confetti width={width} height={height} recycle={false} numberOfPieces={150} />
            )}

           
            <p className="text-lg text-center sm:text-2xl text-[#4A4A4A] mb-4">
                Send Us a Message
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

                        {(['name', 'email'] as const).map((field) => (
                            <div key={field} className="relative w-full">
                                <label
                                    htmlFor={field}
                                    className={`absolute left-4 top-4 pointer-events-none font-medium select-none transition-all ${form[field].length > 0 ? 'scale-75 -translate-y-7 text-[#ccc]' : 'text-[#ccc]'} `}
                                >
                                    {field.charAt(0).toUpperCase() + field.slice(1)}
                                </label>

                                <input
                                    type={field === 'email' ? 'email' : 'text'}
                                    name={field}
                                    id={field}
                                    value={form[field]}
                                    onChange={handleChange}
                                    placeholder=" "
                                    className="w-full p-4 rounded bg-[#ffffff] border border-[#d9d9d9] text-black placeholder-transparent focus:outline-none focus:border-black transition-all"
                                    aria-required="true"
                                    required
                                    autoComplete={field === 'email' ? 'email' : 'name'}
                                />
                            </div>
                        ))}

                        <div className="relative w-full">
                            <label
                                htmlFor="message"
                                className={`absolute left-4 top-4 pointer-events-none font-medium select-none transition-all ${form.message.length > 0 ? 'scale-75 -translate-y-7 text-[#ccc]' : 'text-[#ccc]'} `}
                            >
                                Message
                            </label>

                            <textarea
                                name="message"
                                id="message"
                                rows={5}
                                value={form.message}
                                onChange={handleChange}
                                placeholder=" "
                                className="w-full p-4 rounded bg-[#ffffff] border border-[#d9d9d9] text-black placeholder-transparent resize-none focus:outline-none focus:border-black transition-all"
                                aria-required="true"
                                required
                                autoComplete="off"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={submitting}
                            className={`bg-[#43bef6] mx-auto text-white hover:cursor-pointer px-8 py-3 rounded-full font-semibold shadow-lg focus:outline-none focus-visible:ring-4 transition-all ${submitting ? 'opacity-70 cursor-not-allowed' : 'hover:scale-105 '}`}
                            aria-label="Send Message"
                        >
                            {submitting ? 'Sending…' : 'Send Message'}
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
