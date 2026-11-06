import React, { useState, useEffect } from 'react';
import { ArrowRight, Compass, ChevronLeft, ChevronRight, Leaf } from 'lucide-react';
import { homeContent, productCategories, signatureCraftContent } from '../data/content';

export default function HomePage({ onNavigateToProducts, onNavigateToAbout, onNavigateToContact }) {
  // High-resolution Sri Lankan tea plantation, terroir & artisanal brew images that cycle smoothly
  const heroSlides = [
    {
      image: '/images/hero-plantation-valley.jpg',
      tag: 'Southern Ceylon Tea Valley • Sinharaja Border',
      position: 'object-center'
    },
    {
      image: '/images/ceylon-golden-sunrise-teacup.jpg',
      tag: 'Golden Ceylon Sunrise & Artisanal Tea Brew',
      position: 'object-[center_58%]'
    },
    {
      image: '/images/sri-lanka-hills.jpg',
      tag: 'Misty Mountain Terroir & Traditional Craft',
      position: 'object-center'
    },
    {
      image: '/images/artisanal-tea-brew-cup.jpg',
      tag: 'Handmade Ceylon Tea Brew & Pure Leaf Essence',
      position: 'object-center'
    }
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-advance slides every 6 seconds with smooth crossfade
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev === 0 ? heroSlides.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  return (
    <div className="space-y-0 bg-[#FCFAF7]">
      
      {/* Full-Bleed Background Slider Hero with Maximum Readability & Cinematic Landscape */}
      <section className="relative min-h-[580px] sm:min-h-[660px] lg:min-h-[720px] flex items-start sm:items-center justify-center overflow-hidden">
        
        {/* Background Image Carousel with Smooth Fade & Vibrant Green Tea Terroir */}
        {heroSlides.map((slide, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              currentSlide === idx ? 'opacity-100 z-0' : 'opacity-0 -z-10'
            }`}
          >
            <img
              src={slide.image}
              alt={slide.tag}
              className={`w-full h-full object-cover ${slide.position || 'object-center'} saturate-135 contrast-[1.06] brightness-[1.03] transition-transform duration-[8000ms] ease-out ${
                currentSlide === idx ? 'scale-105' : 'scale-100'
              }`}
            />
          </div>
        ))}

        {/* Lighter, Greener Cinematic Overlays:
            1. Vertical gradient kept clear in the middle so the vibrant lush green tea hills shine through
            2. Subtle emerald-tinted center radial vignette to keep text crisp without muddying the green landscape
        */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/15 to-[#06150A]/75 z-10 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(6,22,10,0.48)_0%,_rgba(6,22,10,0.12)_55%,_transparent_80%)] z-10 pointer-events-none" />

        {/* Bottom Graceful Transition into Light Parchment Section */}
        <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-[#FCFAF7] via-[#FCFAF7]/40 to-transparent z-10 pointer-events-none" />

        {/* Centered Editorial Content with Elegant, Balanced Luxury Typography */}
        <div className="relative z-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8 lg:pt-10 pb-12 sm:pb-14 text-center text-white">
          
          {/* Subtle Brand Tagline - Slightly Increased */}
          <div className="inline-flex items-center justify-center gap-2 mb-2 sm:mb-3">
            <Leaf className="w-4 h-4 text-[#F3CE65]" />
            <span className="text-xs sm:text-base font-sans font-semibold tracking-[0.24em] uppercase text-[#FAF2DA] drop-shadow-[0_2px_4px_rgba(0,0,0,0.85)]">
              {homeContent.brandName}
            </span>
          </div>

          {/* Balanced Luxury Serif Headline - Moderately Increased */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-[4.2rem] font-serif font-bold text-white tracking-tight leading-[1.12] drop-shadow-[0_4px_18px_rgba(0,0,0,0.92)] max-w-4xl mx-auto">
            The Art of <br className="hidden sm:inline" />
            <span className="text-[#F3CE65] italic font-normal">Handmade</span> Ceylon Tea
          </h1>

          <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-[#C59B27] to-transparent mx-auto mt-3.5 mb-5" />

          {/* Exact Paragraphs from Document - Slightly Increased for Ideal Readability */}
          <div className="space-y-3.5 max-w-3xl mx-auto text-center">
            <p className="text-lg sm:text-xl md:text-[1.32rem] text-white font-medium leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]">
              {homeContent.paragraphs[0]}
            </p>

            <p className="text-sm sm:text-base md:text-[1.05rem] text-white/90 font-sans leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]">
              {homeContent.paragraphs[1]}
            </p>

            <p className="text-base sm:text-xl md:text-2xl font-serif italic text-[#FAF2DA] leading-relaxed drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)] pt-2 max-w-3xl mx-auto">
              {homeContent.paragraphs[2]}
            </p>
          </div>

          {/* Centered Action Buttons with Tasteful Scale & Mobile Responsiveness */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 pt-6 sm:pt-7 max-w-md sm:max-w-none mx-auto">
            <button
              onClick={onNavigateToProducts}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 sm:px-8 py-3.5 sm:py-4 rounded-full bg-[#C59B27] hover:bg-[#D8AF3E] text-[#0A1A0F] font-bold text-xs sm:text-sm uppercase tracking-wider shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer"
            >
              <span>{homeContent.buttons.primary}</span>
              <ArrowRight className="w-4 h-4 text-[#0A1A0F]" />
            </button>

            <button
              onClick={onNavigateToAbout}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 sm:px-8 py-3.5 sm:py-4 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/40 hover:border-white backdrop-blur-md font-semibold text-xs sm:text-sm uppercase tracking-wider transition-all duration-300 cursor-pointer"
            >
              <span>{homeContent.buttons.secondary}</span>
              <Compass className="w-4 h-4 text-[#D8AF3E]" />
            </button>
          </div>

          {/* Clean Minimalist Slide Indicators */}
          <div className="flex items-center justify-center gap-2 mt-8 sm:mt-9">
            {heroSlides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentSlide(i)}
                className={`h-1.5 transition-all duration-500 rounded-full cursor-pointer ${
                  currentSlide === i ? 'w-9 bg-[#C59B27]' : 'w-2.5 bg-white/40 hover:bg-white/80'
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>

        </div>

        {/* Minimalist Side Navigation Arrows */}
        <button
          onClick={handlePrev}
          className="hidden md:flex absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-black/30 hover:bg-black/60 text-white items-center justify-center transition-all backdrop-blur-sm border border-white/20 hover:border-[#C59B27] cursor-pointer"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <button
          onClick={handleNext}
          className="hidden md:flex absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-black/30 hover:bg-black/60 text-white items-center justify-center transition-all backdrop-blur-sm border border-white/20 hover:border-[#C59B27] cursor-pointer"
          aria-label="Next slide"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

      </section>

      {/* 4 Agricultural Heritage Pillars (01 to 04 from Document) */}
      <section className="py-14 sm:py-20 bg-[#FAF8F3] border-b border-[#E2D7C3]/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16 space-y-2.5 sm:space-y-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#A8811A]">Agricultural Heritage</span>
            <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#142F1C]">Explore Our Products</h2>
            <p className="text-lg sm:text-xl font-serif italic text-[#C59B27]">Beyond Tea, Discover the Flavours of Sri Lanka.</p>
            <p className="text-xs sm:text-sm text-[#4C554D] max-w-2xl mx-auto leading-relaxed">
              While artisanal tea remains at the heart of Crafted Leaves, our collection also celebrates other distinctive products of Sri Lankan agricultural heritage.
            </p>
            <div className="w-20 h-0.5 bg-[#C59B27] mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
            {productCategories.map((pillar) => (
              <div
                key={pillar.number}
                className="bg-white rounded-2xl sm:rounded-3xl overflow-hidden border border-[#E2D7C3] shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div className="p-5 sm:p-6 pb-3">
                  <span className="font-serif text-2xl sm:text-3xl font-bold text-[#C59B27] block mb-1.5 sm:mb-2">{pillar.number}.</span>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#142F1C] leading-snug">{pillar.title}</h3>
                </div>

                <div className="h-40 sm:h-44 w-full bg-[#FAF8F3] overflow-hidden">
                  <img src={pillar.image} alt={pillar.title} className="w-full h-full object-cover" />
                </div>

                <div className="p-5 sm:p-6 pt-4 flex-1 flex flex-col justify-between">
                  <p className="text-xs sm:text-sm text-[#4C554D] leading-relaxed mb-5 sm:mb-6">
                    {pillar.description}
                  </p>

                  <button
                    onClick={onNavigateToProducts}
                    className="w-full py-2.5 px-4 rounded-xl bg-[#142F1C] hover:bg-[#C59B27] text-[#FAF2DA] hover:text-[#142F1C] font-semibold text-xs uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
                  >
                    <span>{pillar.buttonText}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Signature Craft Teaser */}
      <section className="py-14 sm:py-20 bg-[#142F1C] text-white border-b border-[#C59B27]/40 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-7 space-y-4">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#D8AF3E]">The Heart of Crafted Leaves</span>
              <h2 className="text-2xl sm:text-4xl font-serif font-bold text-white">
                Our Signature Craft: <br />
                <span className="text-[#C59B27] italic font-normal">Handmade & Artisanal Tea</span>
              </h2>
              <p className="text-base sm:text-lg font-serif italic text-[#FAF2DA]">
                {signatureCraftContent.tagline}
              </p>
              <p className="text-xs sm:text-base text-[#DCD1BC] leading-relaxed">
                {signatureCraftContent.paragraphs[0]}
              </p>
              <p className="text-xs sm:text-base text-[#DCD1BC] leading-relaxed">
                {signatureCraftContent.paragraphs[1]}
              </p>
              
              <div className="pt-2">
                <button
                  onClick={onNavigateToProducts}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#C59B27] hover:bg-[#D8AF3E] text-[#142F1C] font-bold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-md"
                >
                  <span>Explore Signature Craft & Teas</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="bg-[#0D1E12] p-3 sm:p-4 rounded-2xl sm:rounded-3xl border-2 border-[#C59B27]/40 shadow-2xl">
                <img
                  src="/images/tea-liquor-silvertips.jpg"
                  alt="Ceylon Tea Brew"
                  className="w-full h-60 sm:h-72 object-cover rounded-xl sm:rounded-2xl"
                />
                <p className="text-xs text-[#FAF2DA] text-center font-serif italic mt-3 px-2">
                  More than a beverage, every cup represents a connection to the heritage and craftsmanship of Ceylon.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Call to Partner / Contact */}
      <section className="py-12 sm:py-16 bg-[#FAF8F3] text-center border-b border-[#E2D7C3]/60">
        <div className="max-w-4xl mx-auto px-4 space-y-4">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#A8811A]">Global Outreach</span>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#142F1C]">Bringing the Essence of Ceylon to the World</h2>
          <p className="text-xs sm:text-sm text-[#4C554D] max-w-2xl mx-auto leading-relaxed">
            At Crafted Leaves, we aim to share these distinctive products with international markets, connecting the craftsmanship, heritage and natural character of Sri Lanka with consumers and business partners around the world.
          </p>
          <div className="pt-2">
            <button
              onClick={onNavigateToContact}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-[#142F1C] hover:bg-[#C59B27] text-[#FAF2DA] hover:text-[#142F1C] font-bold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-md"
            >
              <span>Partner With Us</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
