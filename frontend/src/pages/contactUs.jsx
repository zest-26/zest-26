import React, { useState } from "react";
import SEO from '@/components/SEO';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();
    form.append("name", formData.name);
    form.append("email", formData.email);
    form.append("message", formData.message);

    try {
      await fetch(
        "https://script.google.com/macros/s/AKfycbzU5NPLC735DUfqhMV6gt-oEIYnOcLK8dtcsVkT8tqSjGfuwMd_I_sur9yDAENZoa_h/exec",
        {
          method: "POST",
          body: form,
        }
      );

      alert("Message sent 🚀");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      alert("Submission failed ❌");
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-gradient-to-br from-gray-900 via-black to-orange-950 overflow-hidden flex items-center justify-center p-4 sm:p-6 md:p-8">
      <SEO title="Contact Us" description="Get in touch with the COEP ZEST 2026 team for any queries or collaborations." />

      {/* Animated background orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-orange-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-600/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Main container */}
      <div className="relative z-10 w-full mt-20 mb:mt-30 max-w-2xl">

        {/* Header section */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-3 sm:mb-4">
            Contact{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">
              Us
            </span>
          </h1>
          <p className="text-gray-400 text-sm sm:text-base md:text-lg max-w-md mx-auto px-4">
            Have a question or want to work together? Drop us a message and we'll get back to you soon.
          </p>
        </div>

        {/* Form container */}
        <div className="relative">
          {/* Glow effect */}
          <div className="absolute -inset-1 bg-gradient-to-r from-orange-600 to-orange-400 rounded-2xl blur-lg opacity-30"></div>

          {/* Form card */}
          <div className="relative bg-black/40 backdrop-blur-xl border border-orange-500/30 rounded-2xl p-6 sm:p-8 md:p-10 shadow-2xl">
            <div className="space-y-5 sm:space-y-6">

              {/* Full Name */}
              <div className="group">
                <label className="block text-orange-400 text-sm font-semibold mb-2 transition-all group-focus-within:text-orange-300">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className="w-full h-12 sm:h-14 bg-white/5 backdrop-blur-sm border border-orange-500/40 rounded-xl px-4 sm:px-5 text-white placeholder-gray-500 outline-none transition-all duration-300 focus:bg-white/10 focus:border-orange-400 focus:ring-2 focus:ring-orange-400/50 focus:shadow-[0_0_20px_rgba(251,146,60,0.3)] hover:border-orange-400/60"
                />
              </div>

              {/* Email */}
              <div className="group">
                <label className="block text-orange-400 text-sm font-semibold mb-2 transition-all group-focus-within:text-orange-300">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  className="w-full h-12 sm:h-14 bg-white/5 backdrop-blur-sm border border-orange-500/40 rounded-xl px-4 sm:px-5 text-white placeholder-gray-500 outline-none transition-all duration-300 focus:bg-white/10 focus:border-orange-400 focus:ring-2 focus:ring-orange-400/50 focus:shadow-[0_0_20px_rgba(251,146,60,0.3)] hover:border-orange-400/60"
                />
              </div>

              {/* Message */}
              <div className="group">
                <label className="block text-orange-400 text-sm font-semibold mb-2 transition-all group-focus-within:text-orange-300">
                  Your Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us what's on your mind..."
                  rows="5"
                  className="w-full bg-white/5 backdrop-blur-sm border border-orange-500/40 rounded-xl px-4 sm:px-5 py-3 sm:py-4 text-white placeholder-gray-500 outline-none transition-all duration-300 focus:bg-white/10 focus:border-orange-400 focus:ring-2 focus:ring-orange-400/50 focus:shadow-[0_0_20px_rgba(251,146,60,0.3)] hover:border-orange-400/60 resize-none"
                />
              </div>

              {/* Submit button */}
              <button
                onClick={handleSubmit}
                className="w-full h-12 sm:h-14 bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-500 hover:to-orange-400 text-white font-bold rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(251,146,60,0.5)] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2 focus:ring-offset-black/50"
              >
                Send Message
              </button>
            </div>

            {/* Decorative corner accents */}
            <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-orange-500/50 rounded-tl-2xl"></div>
            <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-orange-500/50 rounded-br-2xl"></div>
          </div>
        </div>


      </div>
    </div>
  );
};

export default ContactUs;