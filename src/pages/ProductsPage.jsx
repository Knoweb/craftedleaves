import React, { useState } from 'react';
import { 
  productCategories, 
  documentProducts, 
  signatureCraftContent 
} from '../data/content';
import { ArrowRight, Leaf, Sparkles, Filter, Check } from 'lucide-react';

export default function ProductsPage({ onInquireProduct }) {
  const [selectedCat, setSelectedCat] = useState('all');

  const filterTabs = [
    { id: 'all', label: 'All Products' },
    { id: 'tea', label: 'Handmade & Flavoured Tea' },
    { id: 'cinnamon', label: 'Ceylon Cinnamon' },
    { id: 'coffee', label: 'Sri Lankan Coffee' },
    { id: 'spices', label: 'Authentic Spices' },
  ];

  // Distinct rich themes & color accents for the 4 agricultural pillars
  const pillarThemes = {
    tea: {
      badge: 'Southern Terroir',
      badgeStyle: 'bg-[#142F1C]/10 text-[#142F1C] border-[#142F1C]/20',
      borderStyle: 'border-[#142F1C]/25 hover:border-[#142F1C]',
      gradient: 'from-[#142F1C]/60 via-transparent to-transparent',
      btnStyle: 'bg-[#142F1C] hover:bg-[#1E4529] text-[#FAF2DA]',
      glowColor: 'group-hover:shadow-[#142F1C]/15'
    },
    cinnamon: {
      badge: 'C5 Handcrafted Quills',
      badgeStyle: 'bg-[#743820]/10 text-[#743820] border-[#743820]/25',
      borderStyle: 'border-[#743820]/25 hover:border-[#743820]',
      gradient: 'from-[#743820]/60 via-transparent to-transparent',
      btnStyle: 'bg-[#743820] hover:bg-[#934928] text-[#FAF2DA]',
      glowColor: 'group-hover:shadow-[#743820]/15'
    },
    coffee: {
      badge: 'Tropical Highlands',
      badgeStyle: 'bg-[#4A2E1B]/10 text-[#4A2E1B] border-[#4A2E1B]/25',
      borderStyle: 'border-[#4A2E1B]/25 hover:border-[#4A2E1B]',
      gradient: 'from-[#4A2E1B]/60 via-transparent to-transparent',
      btnStyle: 'bg-[#4A2E1B] hover:bg-[#633E24] text-[#FAF2DA]',
      glowColor: 'group-hover:shadow-[#4A2E1B]/15'
    },
    spices: {
      badge: 'Southern Harvest',
      badgeStyle: 'bg-[#A8811A]/10 text-[#84630D] border-[#A8811A]/25',
      borderStyle: 'border-[#C59B27]/35 hover:border-[#A8811A]',
      gradient: 'from-[#A8811A]/60 via-transparent to-transparent',
      btnStyle: 'bg-[#2A4720] hover:bg-[#C59B27] text-[#FAF2DA] hover:text-[#0A1A0F]',
      glowColor: 'group-hover:shadow-[#A8811A]/15'
    }
  };

  const displayedProducts = documentProducts.filter((p) => {
    if (selectedCat === 'all') return true;
    return p.category === selectedCat;
  });

  return (
    <div className="space-y-0 bg-[#FCFAF7]">
      
      {/* Products Page Header with Botanical Luxury Aesthetics */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#F7F3EB] via-[#FAF7F0] to-[#FCFAF7] py-12 sm:py-16 lg:py-20 border-b border-[#E2D7C3]/80 text-center">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(197,155,39,0.08)_0%,_transparent_65%)] pointer-events-none" />
        
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3 sm:space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EFE8DC] border border-[#C59B27]/40 text-[#142F1C]">
            <Leaf className="w-3.5 h-3.5 text-[#255835]" />
            <span className="text-xs font-semibold uppercase tracking-wider text-[#A8811A]">Curated Collection</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold text-[#142F1C] tracking-tight">
            Explore Our Products
          </h1>

          <p className="text-lg sm:text-2xl font-serif italic text-[#C59B27]">
            Beyond Tea, Discover the Flavours of Sri Lanka.
          </p>

          <p className="text-xs sm:text-base text-[#4C554D] max-w-2xl mx-auto leading-relaxed">
            While artisanal tea remains at the heart of Crafted Leaves, our collection also celebrates other distinctive products of Sri Lankan agricultural heritage.
          </p>

          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#C59B27] to-transparent mx-auto mt-4" />
        </div>
      </section>

      {/* 4 Agricultural Heritage Pillars (01 to 04 from Document) with Premium Colored Cards & Photography */}
      <section className="py-12 sm:py-16 lg:py-20 bg-[#FCFAF7] border-b border-[#E2D7C3]/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-[#A8811A]">Four Distinctive Expressions</span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#142F1C] mt-1">Sri Lankan Agricultural Heritage</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 lg:gap-8">
            {productCategories.map((cat) => {
              const theme = pillarThemes[cat.categoryKey] || pillarThemes.tea;

              return (
                <div 
                  key={cat.number} 
                  className={`group relative bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 border-2 transition-all duration-500 flex flex-col justify-between shadow-md hover:shadow-2xl hover:-translate-y-2 overflow-hidden ${theme.borderStyle} ${theme.glowColor}`}
                >
                  <div>
                    {/* Top Card Bar: Number + Category Badge */}
                    <div className="flex items-center justify-between pb-3 border-b border-[#EFE8DC]">
                      <span className="font-serif text-3xl sm:text-4xl font-extrabold text-[#C59B27] tracking-tight">
                        {cat.number}.
                      </span>
                      <span className={`text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border ${theme.badgeStyle}`}>
                        {theme.badge}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#142F1C] pt-3.5 leading-snug group-hover:text-[#255835] transition-colors">
                      {cat.title}
                    </h3>

                    {/* High-Resolution Category Image with Smooth Zoom Effect */}
                    <div className="relative h-44 sm:h-52 w-full rounded-2xl overflow-hidden my-4 bg-[#F5EFE6] border border-[#E8DFC9] shadow-inner">
                      <img
                        src={cat.image}
                        alt={cat.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                      />
                      <div className={`absolute inset-0 bg-gradient-to-t ${theme.gradient} opacity-35 pointer-events-none`} />
                    </div>

                    {/* Exact Description from Document */}
                    <p className="text-xs sm:text-sm text-[#4C554D] leading-relaxed">
                      {cat.description}
                    </p>
                  </div>

                  {/* Styled Action Button */}
                  <button
                    onClick={() => {
                      setSelectedCat(cat.categoryKey);
                      const el = document.getElementById('products-grid');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className={`mt-5 sm:mt-6 w-full py-3 sm:py-3.5 px-4 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-300 shadow-md group-hover:shadow-lg cursor-pointer ${theme.btnStyle}`}
                  >
                    <span>{cat.buttonText}</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Products Showcase with Photos from Page 2 */}
      <section id="products-grid" className="py-14 sm:py-20 bg-[#FAF8F3] border-b border-[#E2D7C3]/60 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10 space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-[#A8811A]">Product Portfolio</span>
            <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#142F1C]">Artisanal Tea & Heritage Products</h2>
            <p className="text-xs sm:text-sm text-[#4C554D]">Carefully crafted in Southern Sri Lanka, packaged for discerning global tea enthusiasts.</p>
          </div>

          {/* Luxury Floating Category Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-3 mb-10 sm:mb-14">
            {filterTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedCat(tab.id)}
                className={`px-3.5 sm:px-6 py-2 sm:py-3 rounded-full text-[11px] sm:text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                  selectedCat === tab.id
                    ? 'bg-[#142F1C] text-[#FAF2DA] shadow-lg border border-[#C59B27]/40 scale-105'
                    : 'bg-white text-[#4C554D] hover:text-[#142F1C] hover:bg-[#EFE8DC] border border-[#E2D7C3] shadow-xs'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Products Grid with Refined Luxury Packaging Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-8">
            {displayedProducts.map((prod) => (
              <div
                key={prod.id}
                className="group bg-white rounded-2xl sm:rounded-3xl overflow-hidden border border-[#E2D7C3] hover:border-[#C59B27]/70 shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col justify-between hover:-translate-y-1.5"
              >
                {/* Product Image */}
                <div className="relative h-56 sm:h-64 w-full overflow-hidden bg-[#FAF8F3] p-5 sm:p-6 flex items-center justify-center border-b border-[#F0E8DC]">
                  <img
                    src={prod.image}
                    alt={prod.title}
                    className="max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-105"
                  />
                  {prod.liquorImage && (
                    <div className="absolute top-3 right-3 bg-white/95 p-1 rounded-full shadow-md border border-[#E2D7C3]" title="Brewed Liquor">
                      <img src={prod.liquorImage} alt="Liquor" className="w-6 h-6 sm:w-7 sm:h-7 rounded-full object-cover" />
                    </div>
                  )}
                </div>

                {/* Details */}
                <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#A8811A] block mb-1.5">
                      {prod.pack}
                    </span>
                    <h3 className="font-serif text-lg font-bold text-[#142F1C] leading-snug group-hover:text-[#255835] transition-colors">
                      {prod.title}
                    </h3>
                    <p className="text-xs text-[#616B62] mt-2.5 leading-relaxed">
                      {prod.summary}
                    </p>
                  </div>

                  <button
                    onClick={() => onInquireProduct(prod.title)}
                    className="mt-5 sm:mt-6 w-full py-3 px-4 rounded-xl bg-[#142F1C] hover:bg-[#C59B27] text-[#FAF2DA] hover:text-[#142F1C] font-semibold text-xs uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-1.5 cursor-pointer shadow-sm hover:shadow-md"
                  >
                    <span>Inquire About This Product</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Our Signature Craft: Handmade & Artisanal Tea (Strictly from Document Page 3) */}
      <section className="py-14 sm:py-20 bg-[#142F1C] text-white border-b border-[#C59B27]/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14 space-y-2.5 sm:space-y-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#D8AF3E]">Mastery & Heritage</span>
            <h2 className="text-2xl sm:text-4xl font-serif font-bold text-white">
              {signatureCraftContent.title}
            </h2>
            <p className="text-base sm:text-lg font-serif italic text-[#FAF2DA]">
              {signatureCraftContent.tagline}
            </p>
            <div className="w-20 h-0.5 bg-[#C59B27] mx-auto mt-2" />
          </div>

          {/* 2-Column: Exact Text + 5 Cups Photo from Page 3 */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 items-center max-w-6xl mx-auto">
            
            <div className="lg:col-span-7 space-y-4 text-xs sm:text-base text-[#DCD1BC] leading-relaxed">
              {signatureCraftContent.paragraphs.map((p, idx) => (
                <p 
                  key={idx} 
                  className={idx === signatureCraftContent.paragraphs.length - 1 ? "font-serif text-base sm:text-lg font-bold text-[#FAF2DA] pt-2" : ""}
                >
                  {p}
                </p>
              ))}
            </div>

            {/* Photo of 5 Tea Liquors from Page 3 */}
            <div className="lg:col-span-5">
              <div className="bg-[#0D1E12] rounded-2xl sm:rounded-3xl p-3.5 sm:p-4 border-2 border-[#C59B27]/40 shadow-2xl space-y-3">
                <div className="grid grid-cols-5 gap-1 sm:gap-1.5 rounded-xl overflow-hidden bg-black/40 p-1.5 sm:p-2">
                  <img src="/images/tea-liquor-silvertips.jpg" alt="Silver Tips" className="w-full h-16 sm:h-20 md:h-24 object-cover rounded" title="Silver Tips White Tea" />
                  <img src="/images/tea-liquor-golden.jpg" alt="Golden Pekoe" className="w-full h-16 sm:h-20 md:h-24 object-cover rounded" title="Artisanal Pekoe" />
                  <img src="/images/tea-liquor-amber.jpg" alt="FBOP" className="w-full h-16 sm:h-20 md:h-24 object-cover rounded" title="Flowery Broken Orange Pekoe" />
                  <img src="/images/tea-liquor-red.jpg" alt="Flavoured Tea" className="w-full h-16 sm:h-20 md:h-24 object-cover rounded" title="Flavoured Infusion" />
                  <img src="/images/tea-liquor-dark.jpg" alt="Dark Reserve" className="w-full h-16 sm:h-20 md:h-24 object-cover rounded" title="Southern Heritage Dark Reserve" />
                </div>
                <div className="text-center px-1 py-1">
                  <span className="text-[9px] sm:text-[10px] uppercase font-bold tracking-widest text-[#C59B27] block">
                    The Five Liquors of Ceylon
                  </span>
                  <p className="text-[11px] sm:text-xs text-[#FAF2DA] font-serif italic mt-0.5">
                    Traditional seedling teas displaying the spectrum of natural Ceylon character
                  </p>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

    </div>
  );
}

