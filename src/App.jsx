import React, { useState } from 'react';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import Footer from './components/Footer';
import { MessageCircle } from 'lucide-react';
import { companyInfo } from './data/content';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [inquiryProduct, setInquiryProduct] = useState('');

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleProductInquire = (productTitle) => {
    setInquiryProduct(productTitle);
    setActiveTab('contact');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#FCFAF7] text-[#242A24] font-sans selection:bg-[#2D5A34] selection:text-[#FAF2DA] flex flex-col justify-between">
      
      {/* Sleek, Clean Header with only 4 essential tabs */}
      <Navbar
        activeTab={activeTab}
        onTabChange={handleTabChange}
        onPartnerClick={() => handleTabChange('contact')}
      />

      {/* Main Page View */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <HomePage
            onNavigateToProducts={() => handleTabChange('products')}
            onNavigateToAbout={() => handleTabChange('about')}
            onNavigateToContact={() => handleTabChange('contact')}
          />
        )}

        {activeTab === 'products' && (
          <ProductsPage
            onInquireProduct={handleProductInquire}
          />
        )}

        {activeTab === 'about' && (
          <AboutPage
            onPartnerClick={() => handleTabChange('contact')}
          />
        )}

        {activeTab === 'contact' && (
          <ContactPage
            prefillProduct={inquiryProduct}
          />
        )}
      </main>

      {/* Clean Footer */}
      <Footer
        onNavClick={handleTabChange}
      />

      {/* Floating Active WhatsApp Circular Action Button with Mobile-Optimized Placement */}
      <div className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-40 group">
        
        {/* Pulsing Ambient Active Rings */}
        <span className="absolute -inset-1.5 rounded-full bg-[#25D366]/40 animate-ping pointer-events-none" />
        <span className="absolute -inset-2.5 rounded-full bg-[#25D366]/20 animate-pulse pointer-events-none" />

        {/* Hover Tooltip (Hidden on mobile touch devices) */}
        <div className="hidden lg:group-hover:flex items-center absolute right-16 top-1/2 -translate-y-1/2 whitespace-nowrap bg-[#142F1C] text-[#FAF2DA] text-xs font-semibold px-3.5 py-2 rounded-xl shadow-2xl border border-[#C59B27]/40 pointer-events-none transition-all duration-300">
          <span>Chat with us on WhatsApp</span>
          <span className="w-2 h-2 bg-[#142F1C] border-t border-r border-[#C59B27]/40 rotate-45 absolute -right-1" />
        </div>

        {/* Main Circular Button with Official WhatsApp Icon */}
        <a
          href={`https://wa.me/${companyInfo.whatsapp}?text=Hello%20Crafted%20Leaves%2C%20I%20am%20visiting%20your%20website%20and%20would%20like%20to%20learn%20more.`}
          target="_blank"
          rel="noopener noreferrer"
          className="relative w-13 h-13 sm:w-15 sm:h-15 rounded-full bg-[#25D366] hover:bg-[#20ba5c] text-white flex items-center justify-center shadow-[0_8px_25px_rgba(37,211,102,0.45)] hover:shadow-[0_12px_30px_rgba(37,211,102,0.6)] transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer border-2 border-white"
          title="Direct WhatsApp Chat"
          aria-label="Direct WhatsApp Chat"
        >
          {/* Official WhatsApp Speech Bubble + Handset SVG */}
          <svg className="w-6.5 h-6.5 sm:w-8 sm:h-8 fill-white" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
          </svg>
        </a>

      </div>

    </div>
  );
}
