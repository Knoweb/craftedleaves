import React, { useState } from 'react';
import { companyInfo } from '../data/content';
import { MapPin, Phone, Mail, Building2, MessageCircle, Send, CheckCircle2, Loader2, Info } from 'lucide-react';

export default function ContactPage({ prefillProduct }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: prefillProduct ? `Inquiry regarding ${prefillProduct}` : 'Artisanal Tea & Spice Inquiry',
    message: ''
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const triggerMailtoFallback = () => {
    const mailtoUrl = `mailto:${companyInfo.email}?subject=${encodeURIComponent(
      formData.subject
    )}&body=${encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\n\nMessage:\n${formData.message}`
    )}`;
    window.location.href = mailtoUrl;
    setSubmitted(true);
  };

  const handleSubmit = async (e) => {
    // If a Web3Forms access key is configured in content.js, submit via direct JSON API with native CORS
    if (companyInfo.web3FormsKey) {
      e.preventDefault();
      setLoading(true);
      setErrorMsg('');

      try {
        const response = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
          },
          body: JSON.stringify({
            access_key: companyInfo.web3FormsKey,
            name: formData.name,
            email: formData.email,
            phone: formData.phone || 'Not provided',
            subject: formData.subject || 'Crafted Leaves Website Inquiry',
            message: formData.message,
            from_name: 'Crafted Leaves Website Contact Form'
          })
        });

        const data = await response.json();
        if (data.success) {
          setSubmitted(true);
        } else {
          throw new Error(data.message || 'Submission failed');
        }
      } catch (err) {
        console.warn('Web3Forms submission failed, falling back:', err);
        setErrorMsg('Submission issue encountered. You can connect directly via WhatsApp or email.');
      } finally {
        setLoading(false);
      }
    } else {
      // Standard FormSubmit submission via Hidden Iframe
      // IMPORTANT: We do NOT call e.preventDefault() here!
      // The browser natively POSTs the form data to FormSubmit targeting the hidden iframe.
      // Because it is a native HTML form POST to an iframe, browsers do NOT run CORS preflight checks!
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setSubmitted(true);
      }, 1200);
    }
  };

  const handleWhatsApp = () => {
    const text = encodeURIComponent(
      `Hello Crafted Leaves, my name is ${formData.name || 'a visitor'}. Subject: ${formData.subject}. Message: ${formData.message || 'I would like to inquire about your products.'}`
    );
    window.open(`https://wa.me/${companyInfo.whatsapp}?text=${text}`, '_blank');
  };

  return (
    <div className="space-y-0">
      
      {/* Header from Document */}
      <section className="bg-[#FAF8F3] py-12 sm:py-16 lg:py-20 border-b border-[#E2D7C3]/60 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3 sm:space-y-4">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#A8811A]">Connect With Us</span>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-[#142F1C]">
            Partner With Us
          </h1>
          <p className="text-lg sm:text-xl font-serif italic text-[#C59B27]">
            Bringing the Essence of Ceylon to the World
          </p>
          <p className="text-xs sm:text-base text-[#4C554D] max-w-2xl mx-auto leading-relaxed">
            Sri Lanka has a remarkable heritage of producing exceptional tea, cinnamon, coffee and spices. At Crafted Leaves, we aim to share these distinctive products with international markets, connecting the craftsmanship, heritage and natural character of Sri Lanka with consumers and business partners around the world.
          </p>
          <div className="w-20 h-0.5 bg-[#C59B27] mx-auto mt-4" />
        </div>
      </section>

      {/* Main Contact Grid */}
      <section className="py-12 sm:py-16 bg-[#FCFAF7] border-b border-[#E2D7C3]/60">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 items-start">
            
            {/* Left: Contact Info Box */}
            <div className="lg:col-span-5 bg-[#142F1C] text-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-[#C59B27]/40 shadow-xl space-y-6">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#D8AF3E]">Official Contacts</span>
                <h3 className="font-serif text-2xl font-bold text-white mt-1">Crafted Leaves (Pvt) Ltd</h3>
                <p className="text-xs text-[#DCD1BC] mt-1">Southern Sri Lanka</p>
              </div>

              <div className="space-y-4 text-xs sm:text-sm text-[#EDE6D8]">
                {/* Head Office */}
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#1C4328] flex items-center justify-center text-[#E6C568] shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block font-bold text-white">Registered Head Office</span>
                    <span>{companyInfo.address}</span>
                  </div>
                </div>

                {/* Factory */}
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#1C4328] flex items-center justify-center text-[#E6C568] shrink-0 mt-0.5">
                    <Building2 className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block font-bold text-white">Cinnamon & Processing Facility</span>
                    <span>{companyInfo.factoryAddress}</span>
                  </div>
                </div>

                {/* Phones */}
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#1C4328] flex items-center justify-center text-[#E6C568] shrink-0 mt-0.5">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block font-bold text-white">Direct Phone Numbers</span>
                    <div className="space-y-0.5 mt-0.5">
                      {companyInfo.phones.map((p, i) => (
                        <a key={i} href={`tel:${p.replace(/\s+/g, '')}`} className="block hover:text-[#E6C568] transition-colors">
                          {p}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#1C4328] flex items-center justify-center text-[#E6C568] shrink-0 mt-0.5">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block font-bold text-white">Email Address</span>
                    <a href={`mailto:${companyInfo.email}`} className="hover:text-[#E6C568] transition-colors">
                      {companyInfo.email}
                    </a>
                  </div>
                </div>
              </div>

              {/* WhatsApp Button */}
              <div className="pt-3 border-t border-[#C59B27]/30">
                <a
                  href={`https://wa.me/${companyInfo.whatsapp}?text=Hello%20Crafted%20Leaves%2C%20I%20would%20like%20to%20partner%20with%20you.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 rounded-xl bg-[#25D366] hover:bg-[#20ba5c] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Direct WhatsApp Chat</span>
                </a>
              </div>
            </div>

            {/* Right: Clean Inquiry Form */}
            <div className="lg:col-span-7 bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-[#E2D7C3] shadow-lg">
              <div className="mb-6">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#A8811A]">Direct Inquiry</span>
                <h3 className="font-serif text-2xl font-bold text-[#142F1C]">Send a Message</h3>
              </div>

              {submitted ? (
                <div className="py-10 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-[#142F1C] text-[#F3CE65] flex items-center justify-center mx-auto shadow-xl border-2 border-[#C59B27]/40">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="font-serif text-3xl font-bold text-[#142F1C]">Message Sent Successfully</h4>
                  <p className="text-sm sm:text-base text-[#4C554D] max-w-md mx-auto leading-relaxed">
                    Your inquiry has been sent directly to <strong className="text-[#142F1C]">{companyInfo.email}</strong>. We will review your message and respond promptly.
                  </p>

                  <div className="p-4 rounded-2xl bg-[#FAF8F3] border border-[#E2D7C3] max-w-md mx-auto text-left text-xs text-[#616B62] space-y-1.5 shadow-xs">
                    <div className="flex items-center gap-1.5 font-bold text-[#142F1C]">
                      <Info className="w-4 h-4 text-[#C59B27] shrink-0" />
                      <span>One-Time Inbox Verification:</span>
                    </div>
                    <p className="leading-relaxed">
                      If this is the very first inquiry, FormSubmit will send a one-time activation link to <strong>{companyInfo.email}</strong>. Once activated, all future messages will flow directly into your inbox automatically.
                    </p>
                  </div>

                  <div className="pt-3 flex flex-wrap justify-center gap-3">
                    <button
                      onClick={handleWhatsApp}
                      className="px-6 py-2.5 rounded-full bg-[#25D366] hover:bg-[#20ba5c] text-white text-xs font-bold flex items-center gap-2 shadow-md transition-all cursor-pointer"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Follow Up on WhatsApp</span>
                    </button>
                    <button
                      onClick={() => {
                        setSubmitted(false);
                        setFormData({
                          name: '',
                          email: '',
                          phone: '',
                          subject: 'Artisanal Tea & Spice Inquiry',
                          message: ''
                        });
                      }}
                      className="px-6 py-2.5 rounded-full bg-[#FAF8F3] hover:bg-[#EFE8DC] text-[#142F1C] border border-[#E2D7C3] text-xs font-semibold transition-all cursor-pointer"
                    >
                      Send Another Message
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <form
                    action={companyInfo.web3FormsKey ? undefined : `https://formsubmit.co/${companyInfo.email}`}
                    method={companyInfo.web3FormsKey ? undefined : "POST"}
                    target={companyInfo.web3FormsKey ? undefined : "hidden_formsubmit_frame"}
                    onSubmit={handleSubmit}
                    className="space-y-4"
                  >
                    {/* FormSubmit Configuration (only used when submitting directly via FormSubmit) */}
                    {!companyInfo.web3FormsKey && (
                      <>
                        <input
                          type="hidden"
                          name="_subject"
                          value={`New Inquiry from Website: ${formData.subject || 'Artisanal Tea & Spice'}`}
                        />
                        <input type="hidden" name="_template" value="table" />
                        <input type="hidden" name="_captcha" value="false" />
                        <input
                          type="hidden"
                          name="_autoresponse"
                          value={`Thank you for contacting Crafted Leaves (Pvt) Ltd. We have received your message regarding "${formData.subject || 'our products'}" and will get back to you shortly.`}
                        />
                      </>
                    )}

                    {errorMsg && (
                      <div className="p-3 text-xs rounded-xl bg-red-50 text-red-700 border border-red-200">
                        {errorMsg}
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-[#2A332B] uppercase tracking-wider mb-1">
                          Your Name *
                        </label>
                        <input
                          type="text"
                          name="name"
                          required
                          placeholder="e.g. John Doe"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full px-3.5 py-2.5 text-sm rounded-xl bg-[#FAF8F3] border border-[#E2D7C3] focus:border-[#142F1C] focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-[#2A332B] uppercase tracking-wider mb-1">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          name="email"
                          required
                          placeholder="e.g. info@domain.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full px-3.5 py-2.5 text-sm rounded-xl bg-[#FAF8F3] border border-[#E2D7C3] focus:border-[#142F1C] focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-[#2A332B] uppercase tracking-wider mb-1">
                          Phone / WhatsApp
                        </label>
                        <input
                          type="text"
                          name="phone"
                          placeholder="e.g. +94 7X XXX XXXX"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full px-3.5 py-2.5 text-sm rounded-xl bg-[#FAF8F3] border border-[#E2D7C3] focus:border-[#142F1C] focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-[#2A332B] uppercase tracking-wider mb-1">
                          Subject
                        </label>
                        <input
                          type="text"
                          name="subject"
                          value={formData.subject}
                          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                          className="w-full px-3.5 py-2.5 text-sm rounded-xl bg-[#FAF8F3] border border-[#E2D7C3] focus:border-[#142F1C] focus:outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#2A332B] uppercase tracking-wider mb-1">
                        Message *
                      </label>
                      <textarea
                        rows={4}
                        name="message"
                        required
                        placeholder="Please let us know your requirements or questions..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full px-3.5 py-2.5 text-sm rounded-xl bg-[#FAF8F3] border border-[#E2D7C3] focus:border-[#142F1C] focus:outline-none"
                      />
                    </div>

                    <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#142F1C] hover:bg-[#1C4328] disabled:bg-[#142F1C]/70 text-[#FAF2DA] font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md"
                      >
                        {loading ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin text-[#D8AF3E]" />
                            <span>Sending to {companyInfo.email}...</span>
                          </>
                        ) : (
                          <>
                            <Send className="w-4 h-4 text-[#D8AF3E]" />
                            <span>Submit Message</span>
                          </>
                        )}
                      </button>

                      <button
                        type="button"
                        onClick={handleWhatsApp}
                        className="w-full sm:w-auto px-6 py-3 rounded-full bg-[#25D366]/15 hover:bg-[#25D366]/25 text-[#128C7E] font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all border border-[#25D366]/30 cursor-pointer"
                      >
                        <MessageCircle className="w-4 h-4" />
                        <span>WhatsApp Direct</span>
                      </button>
                    </div>
                  </form>

                  {/* Hidden iframe target to capture FormSubmit response without navigating or triggering CORS */}
                  <iframe
                    name="hidden_formsubmit_frame"
                    id="hidden_formsubmit_frame"
                    title="Form Submission Target"
                    style={{ display: 'none', width: 0, height: 0, border: 0 }}
                  />
                </>
              )}
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}

