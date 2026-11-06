import React from 'react';
import { Leaf, Phone, Mail, MapPin, ArrowUp } from 'lucide-react';
import { companyInfo } from '../data/content';

export default function Footer({ onNavClick }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'products', label: 'Products' },
    { id: 'about', label: 'About Us' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <footer className="bg-[#0D1E12] text-[#FAF8F3] pt-16 pb-12 border-t-2 border-[#C59B27]/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-[#C59B27]/20">
          
          {/* Brand Column */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <img 
                src="/images/logo.png" 
                alt="Crafted Leaves" 
                className="h-12 w-auto object-contain brightness-110"
              />
              <div>
                <span className="block font-serif text-lg font-bold tracking-wider text-white">CRAFTED LEAVES</span>
                <span className="block text-[10px] tracking-widest uppercase text-[#D8AF3E]">Handmade Ceylon Tea</span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-[#DCD1BC] leading-relaxed">
              Inspired by the rich heritage of Southern Sri Lanka, Crafted Leaves brings you the distinctive experience of Handmade and Artisanal Ceylon Tea, Ceylon Cinnamon, Coffee and Spices.
            </p>

            <p className="text-xs text-[#E6C568]">
              Founded in 2024 • Galle & Elpitiya, Southern Sri Lanka
            </p>
          </div>

          {/* Quick Links (Clean 4 tabs) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-serif text-base font-bold text-white uppercase tracking-wider">Navigation</h4>
            <ul className="space-y-2 text-xs text-[#DCD1BC]">
              {navItems.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => onNavClick(item.id)}
                    className="hover:text-[#E6C568] transition-colors text-left cursor-pointer"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Agricultural Heritage */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-serif text-base font-bold text-white uppercase tracking-wider">Our Heritage</h4>
            <ul className="space-y-2 text-xs text-[#DCD1BC]">
              <li>01. Handmade & Artisanal Tea</li>
              <li>02. Ceylon Cinnamon</li>
              <li>03. Sri Lankan Coffee</li>
              <li>04. Authentic Sri Lankan Spices</li>
              <li className="pt-1 text-[#E6C568]">150+ Years Traditional Method</li>
            </ul>
          </div>

          {/* Contact Details from Website */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-serif text-base font-bold text-white uppercase tracking-wider">Contacts</h4>
            <div className="space-y-2.5 text-xs text-[#DCD1BC]">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#C59B27] shrink-0 mt-0.5" />
                <span>{companyInfo.address}</span>
              </div>
              <div className="flex items-start gap-2">
                <Phone className="w-4 h-4 text-[#C59B27] shrink-0 mt-0.5" />
                <div>
                  {companyInfo.phones.map((phone, idx) => (
                    <a
                      key={idx}
                      href={`tel:${phone.replace(/\s+/g, '')}`}
                      className={idx === 0 ? "hover:text-white block font-medium" : "text-[11px] opacity-75 hover:opacity-100 hover:text-[#E6C568] block"}
                    >
                      {phone}
                    </a>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#C59B27] shrink-0" />
                <a href={`mailto:${companyInfo.email}`} className="hover:text-white">
                  {companyInfo.email}
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#DCD1BC]/70">
          <p>© {new Date().getFullYear()} CRAFTED LEAVES (PVT) LTD. All Rights Reserved.</p>
          
          <div className="flex items-center gap-4">
            <button
              onClick={scrollToTop}
              className="p-2 rounded-full bg-[#1C4328] hover:bg-[#C59B27] hover:text-[#142F1C] transition-all cursor-pointer text-white"
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
