import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { companyInfo } from '../data/content';

export default function Navbar({ activeTab, onTabChange, onPartnerClick }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'products', label: 'Products' },
    { id: 'about', label: 'About Us' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleSelectTab = (id) => {
    onTabChange(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header 
      className={`sticky top-0 z-50 bg-[#FCFAF7]/95 backdrop-blur-md border-b border-[#E2D7C3]/80 transition-all duration-300 ${
        scrolled ? 'py-2.5 shadow-md' : 'py-3 sm:py-3.5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo with Tasteful, Refined Brand Lockup */}
          <button
            onClick={() => handleSelectTab('home')}
            className="flex items-center gap-2.5 sm:gap-3.5 cursor-pointer group text-left"
          >
            <img 
              src="/images/logo.png" 
              alt="Crafted Leaves" 
              className="h-11 sm:h-14 lg:h-15 w-auto object-contain transition-transform duration-300 group-hover:scale-105 drop-shadow-xs"
            />
            <div className="flex flex-col justify-center border-l border-[#C59B27]/40 pl-2.5 sm:pl-3">
              <span className="block font-serif text-[11px] sm:text-base font-bold tracking-[0.14em] sm:tracking-[0.2em] text-[#142F1C] uppercase leading-tight group-hover:text-[#255835] transition-colors">
                Crafted Leaves
              </span>
              <span className="block font-sans text-[7.5px] sm:text-[10px] tracking-[0.18em] sm:tracking-[0.25em] uppercase text-[#A8811A] font-semibold mt-0.5">
                Handmade Ceylon Tea
              </span>
            </div>
          </button>

          {/* Luxury Floating Capsule Navigation */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-1.5 bg-[#F3EFE6]/80 p-1.5 rounded-full border border-[#E2D7C3]">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleSelectTab(item.id)}
                className={`px-4.5 py-1.5 text-xs lg:text-sm font-semibold rounded-full transition-all duration-300 cursor-pointer ${
                  activeTab === item.id
                    ? 'bg-[#142F1C] text-[#FAF2DA] shadow-md border border-[#C59B27]/30'
                    : 'text-[#3E473F] hover:text-[#142F1C] hover:bg-white/90'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Right Action: Luxury Partner With Us Button */}
          <div className="hidden sm:flex items-center">
            <button
              onClick={onPartnerClick}
              className="group relative inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-[#142F1C] to-[#1E4529] hover:from-[#C59B27] hover:to-[#D8AF3E] text-[#FAF2DA] hover:text-[#0A1A0F] font-bold text-xs uppercase tracking-widest transition-all duration-300 shadow-md hover:shadow-xl hover:-translate-y-0.5 border border-[#C59B27]/50 cursor-pointer"
            >
              <span>PARTNER WITH US</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#C59B27] group-hover:text-[#0A1A0F] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-[#142F1C] hover:bg-[#EFE8DC] transition-colors cursor-pointer"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer with Refined Luxury Styling */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#FCFAF7]/98 backdrop-blur-xl border-b border-[#E2D7C3] px-4 pt-3 pb-6 space-y-2 animate-in fade-in duration-200 shadow-xl">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleSelectTab(item.id)}
              className={`w-full text-left px-4 py-3 rounded-xl text-sm sm:text-base font-semibold flex items-center justify-between transition-colors ${
                activeTab === item.id
                  ? 'bg-[#142F1C] text-[#FAF2DA] shadow-sm'
                  : 'text-[#242A24] hover:bg-[#EFE8DC]'
              }`}
            >
              <span>{item.label}</span>
              {activeTab === item.id && (
                <span className="w-1.5 h-1.5 rounded-full bg-[#C59B27]" />
              )}
            </button>
          ))}

          <div className="pt-3 border-t border-[#E2D7C3] space-y-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onPartnerClick();
              }}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#142F1C] to-[#1E4529] text-[#FAF2DA] font-bold text-xs uppercase tracking-widest text-center shadow-md border border-[#C59B27]/40 flex items-center justify-center gap-1.5"
            >
              <span>PARTNER WITH US</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#C59B27]" />
            </button>
            <div className="flex items-center justify-center gap-4 pt-2 text-[11px] text-[#616B62]">
              <a href="tel:+94716834335" className="hover:text-[#142F1C] font-medium">
                +94 71 683 4335
              </a>
              <span>•</span>
              <a href="tel:+94703798179" className="hover:text-[#142F1C] font-medium">
                +94 70 379 8179
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
