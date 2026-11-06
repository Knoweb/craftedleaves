import React from 'react';
import { aboutContent } from '../data/content';
import { 
  Sparkles, 
  Eye, 
  Target, 
  ArrowRight, 
  Check, 
  Leaf, 
  Compass, 
  Award, 
  ShieldCheck, 
  Globe, 
  MapPin, 
  Clock 
} from 'lucide-react';

export default function AboutPage({ onPartnerClick }) {
  return (
    <div className="space-y-0 bg-[#FCFAF7]">
      
      {/* Luxury Botanical Header */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#F7F3EB] via-[#FAF7F0] to-[#FCFAF7] py-20 lg:py-24 border-b border-[#E2D7C3]/80 text-center">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(197,155,39,0.08)_0%,_transparent_65%)] pointer-events-none" />
        
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#EFE8DC] border border-[#C59B27]/40 text-[#142F1C] shadow-xs">
            <Leaf className="w-3.5 h-3.5 text-[#255835]" />
            <span className="text-xs font-semibold uppercase tracking-wider text-[#A8811A]">Our Heritage & Purpose</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-serif font-bold text-[#142F1C] leading-[1.15] tracking-tight">
            Rooted in Southern Sri Lanka. <br />
            <span className="italic font-normal text-[#C59B27]">Inspired by the Art of Tea.</span>
          </h1>

          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#C59B27] to-transparent mx-auto mt-4" />
        </div>
      </section>

      {/* Main Narrative: Origin Story & Authentic Photo Feature */}
      <section className="py-20 bg-[#FCFAF7] border-b border-[#E2D7C3]/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left Column: Narrative with Rich Typography */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#A8811A]">
                <span>Brand Story</span>
                <span className="w-8 h-px bg-[#C59B27]" />
                <span>Est. 2024</span>
              </div>

              <div className="space-y-4 text-base sm:text-lg text-[#3E473F] leading-relaxed">
                {aboutContent.introParagraphs.map((para, i) => (
                  <p 
                    key={i} 
                    className={
                      i === 0 
                        ? "text-xl sm:text-2xl font-serif text-[#142F1C] font-semibold leading-relaxed border-l-4 border-[#C59B27] pl-4 py-1"
                        : "text-[#4C554D]"
                    }
                  >
                    {para}
                  </p>
                ))}
              </div>

              {/* Heritage Fact Badges with Responsive Mobile Sizing */}
              <div className="grid grid-cols-3 gap-2 sm:gap-4 pt-6 border-t border-[#E2D7C3]">
                <div className="bg-white p-2.5 sm:p-4 rounded-xl sm:rounded-2xl border border-[#E2D7C3] shadow-xs text-center sm:text-left">
                  <span className="font-serif text-lg sm:text-2xl lg:text-3xl font-bold text-[#142F1C] block leading-tight">2024</span>
                  <span className="text-[8px] sm:text-[10px] uppercase font-bold text-[#A8811A] tracking-wider block mt-1">Founded in Ceylon</span>
                </div>
                <div className="bg-white p-2.5 sm:p-4 rounded-xl sm:rounded-2xl border border-[#E2D7C3] shadow-xs text-center sm:text-left">
                  <span className="font-serif text-lg sm:text-2xl lg:text-3xl font-bold text-[#142F1C] block leading-tight">150+</span>
                  <span className="text-[8px] sm:text-[10px] uppercase font-bold text-[#A8811A] tracking-wider block mt-1">Years Perfected Craft</span>
                </div>
                <div className="bg-white p-2.5 sm:p-4 rounded-xl sm:rounded-2xl border border-[#E2D7C3] shadow-xs text-center sm:text-left">
                  <span className="font-serif text-base sm:text-2xl lg:text-3xl font-bold text-[#142F1C] block leading-tight">Sinharaja</span>
                  <span className="text-[8px] sm:text-[10px] uppercase font-bold text-[#A8811A] tracking-wider block mt-1">Rainforest Terroir</span>
                </div>
              </div>
            </div>

            {/* Right Column: Visual Collage with Authentic Facility & Plucking Photos */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                
                {/* Main Card */}
                <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border-2 border-[#E2D7C3] shadow-2xl bg-white group">
                  <img 
                    src="/images/tea-harvest.jpg" 
                    alt="Authentic Ceylon Tea Harvest" 
                    className="w-full h-72 sm:h-96 object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />
                  
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <span className="text-[9px] sm:text-[10px] uppercase font-bold tracking-widest text-[#FAF2DA] bg-[#142F1C]/80 px-2.5 py-0.5 rounded-full border border-[#C59B27]/40">
                      Traditional Seedling Tea Plucking
                    </span>
                    <p className="text-xs sm:text-sm font-serif italic text-[#FAF2DA] mt-1.5 drop-shadow-sm">
                      Handpicked with precision by generations of skilled Southern artisans.
                    </p>
                  </div>
                </div>

                {/* Floating Facility Badge - Responsive positioning without viewport overflow */}
                <div className="relative sm:absolute sm:-bottom-6 sm:-left-6 mt-3 sm:mt-0 bg-[#142F1C] text-white p-3.5 sm:p-5 rounded-2xl border border-[#C59B27]/50 shadow-xl max-w-full sm:max-w-xs flex items-center gap-3.5">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#255835] flex items-center justify-center text-[#E6C568] shrink-0">
                    <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-[#D8AF3E]" />
                  </div>
                  <div>
                    <span className="block text-xs font-bold uppercase tracking-wider text-[#FAF2DA]">Southern Province</span>
                    <span className="block text-[10px] sm:text-[11px] text-[#CBBFA8]">Bataganvila, Galle & Elpitiya Facility</span>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Vision & Mission: Side-by-Side Presentation Cards with Rich Colors */}
      <section className="py-14 sm:py-20 bg-[#FAF8F3] border-b border-[#E2D7C3]/60">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14 space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-[#A8811A]">Purpose & Ambition</span>
            <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#142F1C]">Guiding Our Future</h2>
            <div className="w-20 h-0.5 bg-[#C59B27] mx-auto mt-2" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-10">
            
            {/* Vision Card (Deep Forest Luxury) */}
            <div className="group relative bg-[#0F2516] text-white rounded-2xl sm:rounded-3xl p-6 sm:p-10 border-2 border-[#C59B27]/50 shadow-xl hover:shadow-2xl transition-all duration-500 flex flex-col justify-between hover:-translate-y-1.5 overflow-hidden">
              <div className="absolute -right-12 -top-12 w-48 h-48 bg-[#C59B27]/10 rounded-full blur-2xl pointer-events-none" />
              
              <div>
                <div className="flex items-center justify-between mb-5 sm:mb-6 pb-4 border-b border-white/10">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-[#1C4328] border border-[#C59B27]/40 flex items-center justify-center shadow-inner">
                      <Eye className="w-5 h-5 sm:w-6 sm:h-6 text-[#F3CE65]" />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-[#C59B27] block">Strategic Horizon</span>
                      <h3 className="font-serif text-xl sm:text-2xl font-bold tracking-wider uppercase text-white">Our Vision</h3>
                    </div>
                  </div>
                  <span className="text-3xl font-serif italic font-bold text-[#C59B27]/40">“</span>
                </div>

                <blockquote className="font-serif text-base sm:text-xl italic text-[#FAF2DA] leading-relaxed relative z-10">
                  “{aboutContent.vision}”
                </blockquote>
              </div>

              <div className="pt-5 sm:pt-6 mt-5 sm:mt-6 border-t border-white/10 flex items-center gap-2 text-[11px] sm:text-xs font-semibold uppercase tracking-widest text-[#D8AF3E]">
                <Globe className="w-4 h-4 text-[#C59B27]" />
                <span>Global Leader in Artisanal Ceylon Heritage</span>
              </div>
            </div>

            {/* Mission Card (Warm Champagne Luxury) */}
            <div className="group relative bg-white text-[#142F1C] rounded-2xl sm:rounded-3xl p-6 sm:p-10 border-2 border-[#E2D7C3] hover:border-[#C59B27] shadow-xl hover:shadow-2xl transition-all duration-500 flex flex-col justify-between hover:-translate-y-1.5 overflow-hidden">
              <div className="absolute -right-12 -top-12 w-48 h-48 bg-[#255835]/5 rounded-full blur-2xl pointer-events-none" />
              
              <div>
                <div className="flex items-center justify-between mb-5 sm:mb-6 pb-4 border-b border-[#F0E8DC]">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-[#142F1C] border border-[#C59B27]/40 flex items-center justify-center shadow-md">
                      <Target className="w-5 h-5 sm:w-6 sm:h-6 text-[#F3CE65]" />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-[#A8811A] block">Operational Core</span>
                      <h3 className="font-serif text-xl sm:text-2xl font-bold tracking-wider uppercase text-[#142F1C]">Our Mission</h3>
                    </div>
                  </div>
                  <span className="text-3xl font-serif italic font-bold text-[#C59B27]/40">“</span>
                </div>

                <blockquote className="font-serif text-sm sm:text-lg italic text-[#2D382F] leading-relaxed relative z-10">
                  “{aboutContent.mission}”
                </blockquote>
              </div>

              <div className="pt-5 sm:pt-6 mt-5 sm:mt-6 border-t border-[#F0E8DC] flex items-center gap-2 text-[11px] sm:text-xs font-semibold uppercase tracking-widest text-[#255835]">
                <ShieldCheck className="w-4 h-4 text-[#255835]" />
                <span>Tradition, Sustainability & Community Impact</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* The Heritage Behind Our Tea: Sinharaja Terroir Spotlight */}
      <section className="py-14 sm:py-20 bg-[#FCFAF7] border-b border-[#E2D7C3]/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-center">
            
            {/* Left: Landscape Photography */}
            <div className="lg:col-span-6 relative order-2 lg:order-1">
              <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border-2 border-[#E2D7C3] shadow-2xl group bg-[#FAF8F3]">
                <img 
                  src="/images/hero-plantation-valley.jpg" 
                  alt="Sinharaja Border Valley Terroir" 
                  className="w-full h-64 sm:h-[400px] object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent pointer-events-none" />
                
                <div className="absolute bottom-4 sm:bottom-5 left-4 sm:left-5 right-4 sm:right-5 text-white">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#142F1C]/80 border border-[#C59B27]/40 text-xs font-bold uppercase tracking-widest text-[#FAF2DA] mb-2 backdrop-blur-xs">
                    <Leaf className="w-3.5 h-3.5 text-[#C59B27]" />
                    <span>Sinharaja UNESCO Biosphere Border</span>
                  </div>
                  <p className="text-xs sm:text-sm font-serif italic text-white/90">
                    A rare micro-climate with mineral-rich southern soils that impart distinct, complex character to every tea bud.
                  </p>
                </div>
              </div>
            </div>

            {/* Right: Heritage Editorial Content */}
            <div className="lg:col-span-6 space-y-6 text-left order-1 lg:order-2">
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-widest text-[#A8811A]">Terroir & Nature</span>
                <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#142F1C]">
                  {aboutContent.heritageTitle}
                </h2>
                <div className="w-16 h-1 bg-[#C59B27] mt-2" />
              </div>

              <div className="space-y-4 text-base sm:text-lg text-[#4C554D] leading-relaxed">
                {aboutContent.heritageParagraphs.map((hp, i) => (
                  <p key={i}>
                    {hp}
                  </p>
                ))}
              </div>

              {/* Terroir Highlights */}
              <div className="space-y-3 pt-2">
                <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-white border border-[#E2D7C3] shadow-xs">
                  <div className="w-8 h-8 rounded-full bg-[#142F1C]/10 text-[#142F1C] flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-4 h-4 text-[#255835]" />
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-[#142F1C] text-base">Tropical Coastal Plains & Lowlands</h4>
                    <p className="text-xs text-[#616B62]">Nurturing teas with rich amber depth, robust malt notes, and natural honey fragrance.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-white border border-[#E2D7C3] shadow-xs">
                  <div className="w-8 h-8 rounded-full bg-[#C59B27]/15 text-[#A8811A] flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-4 h-4 text-[#A8811A]" />
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-[#142F1C] text-base">Southern Edge of Sinharaja Rainforest</h4>
                    <p className="text-xs text-[#616B62]">Sheltered rain mist and lush biodiversity that create a distinct agricultural sanctuary.</p>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* Our Craftsmanship: 3 Elevated Pillars with Colors & Icons */}
      <section className="py-14 sm:py-20 bg-[#FAF8F3] border-b border-[#E2D7C3]/60">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-12">
          
          <div className="text-center space-y-2.5 sm:space-y-3 max-w-2xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-widest text-[#A8811A]">Attention to Detail</span>
            <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#142F1C]">
              {aboutContent.craftsmanshipTitle}
            </h2>
            <p className="text-xs sm:text-base text-[#616B62]">
              {aboutContent.craftsmanshipSubtitle}
            </p>
            <div className="w-20 h-0.5 bg-[#C59B27] mx-auto mt-2" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
            {aboutContent.craftsmanshipItems.map((item, idx) => {
              // Bespoke color accents for the 3 craftsmanship pillars
              const cardAccents = [
                {
                  accent: 'border-[#142F1C]/25 hover:border-[#142F1C]',
                  tagBg: 'bg-[#142F1C]/8 text-[#142F1C]',
                  numColor: 'text-[#142F1C]',
                  iconBg: 'bg-[#142F1C] text-[#FAF2DA]'
                },
                {
                  accent: 'border-[#743820]/25 hover:border-[#743820]',
                  tagBg: 'bg-[#743820]/8 text-[#743820]',
                  numColor: 'text-[#743820]',
                  iconBg: 'bg-[#743820] text-[#FAF2DA]'
                },
                {
                  accent: 'border-[#C59B27]/35 hover:border-[#C59B27]',
                  tagBg: 'bg-[#C59B27]/12 text-[#8B6810]',
                  numColor: 'text-[#C59B27]',
                  iconBg: 'bg-[#C59B27] text-[#0A1A0F]'
                }
              ];
              const acc = cardAccents[idx] || cardAccents[0];

              return (
                <div 
                  key={idx} 
                  className={`group bg-white p-6 sm:p-8 rounded-2xl sm:rounded-3xl border-2 transition-all duration-500 shadow-md hover:shadow-2xl hover:-translate-y-2 flex flex-col justify-between ${acc.accent}`}
                >
                  <div>
                    <div className="flex items-center justify-between pb-3.5 sm:pb-4 border-b border-[#F0E8DC]">
                      <span className={`font-serif text-2xl sm:text-3xl font-extrabold ${acc.numColor}`}>
                        0{idx + 1}.
                      </span>
                      <span className={`text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full ${acc.tagBg}`}>
                        Heritage Craft
                      </span>
                    </div>

                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#142F1C] pt-4 sm:pt-5 mb-2.5 sm:mb-3 group-hover:text-[#255835] transition-colors leading-snug">
                      {item.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-[#4C554D] leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  <div className="pt-5 sm:pt-6 mt-5 sm:mt-6 border-t border-[#F0E8DC] flex items-center gap-2 text-xs font-semibold text-[#8B6810]">
                    <Award className="w-4 h-4 text-[#C59B27]" />
                    <span>Generations of Master Craft</span>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* Our Philosophy: 4 Guiding Principles with Dark Luxury Prestige Aesthetic */}
      <section className="py-14 sm:py-20 bg-[#0E2013] text-white border-b border-[#C59B27]/40 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,_rgba(197,155,39,0.06)_0%,_transparent_70%)] pointer-events-none" />
        
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-12">
          
          <div className="text-center space-y-2.5 sm:space-y-3 max-w-2xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-widest text-[#D8AF3E]">Guiding Principles</span>
            <h2 className="text-2xl sm:text-4xl font-serif font-bold text-white">
              {aboutContent.philosophyTitle}
            </h2>
            <div className="w-20 h-0.5 bg-[#C59B27] mx-auto mt-2" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 lg:gap-8">
            {aboutContent.philosophyItems.map((phil, idx) => (
              <div 
                key={idx} 
                className="group bg-[#152F1C]/90 p-5 sm:p-8 rounded-2xl sm:rounded-3xl border border-[#C59B27]/30 hover:border-[#C59B27] shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 flex items-start gap-4 sm:gap-5"
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-[#1C4328] border border-[#C59B27]/40 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-[#F3CE65]" />
                </div>

                <div className="space-y-1.5 sm:space-y-2">
                  <h3 className="font-serif text-lg sm:text-2xl font-bold text-[#FAF2DA] group-hover:text-[#F3CE65] transition-colors">
                    {phil.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#DCD1BC] leading-relaxed">
                    {phil.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Our Promise & Global Vision Call to Action */}
      <section className="py-14 sm:py-20 lg:py-24 bg-[#FCFAF7] border-b border-[#E2D7C3]/60 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-14">
          
          {/* Commitment to Quality Promise */}
          <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-12 border-2 border-[#E2D7C3] hover:border-[#C59B27]/50 shadow-xl transition-all space-y-5 sm:space-y-6 text-left relative overflow-hidden">
            <div className="flex items-center gap-3 pb-4 border-b border-[#F0E8DC]">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#142F1C] flex items-center justify-center text-[#F3CE65] shadow-xs shrink-0">
                <ShieldCheck className="w-5 h-5 text-[#F3CE65]" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#A8811A] block">Uncompromising Standard</span>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#142F1C]">{aboutContent.promiseTitle}</h3>
              </div>
            </div>

            <div className="space-y-3.5 sm:space-y-4 text-xs sm:text-base text-[#4C554D] leading-relaxed">
              {aboutContent.promiseParagraphs.map((pp, i) => (
                <p 
                  key={i} 
                  className={i === aboutContent.promiseParagraphs.length - 1 ? "font-serif text-base sm:text-xl font-bold text-[#142F1C] pt-2 border-t border-[#F0E8DC]" : ""}
                >
                  {pp}
                </p>
              ))}
            </div>
          </div>

          {/* Bringing Essence of Ceylon to the World */}
          <div className="space-y-6 pt-6">
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-widest text-[#A8811A]">Global Outreach</span>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#142F1C]">
                {aboutContent.essenceTitle}
              </h2>
              <div className="w-20 h-0.5 bg-[#C59B27] mx-auto mt-2" />
            </div>

            <div className="space-y-4 text-base sm:text-lg text-[#4C554D] max-w-3xl mx-auto leading-relaxed">
              {aboutContent.essenceParagraphs.map((ep, i) => (
                <p key={i}>{ep}</p>
              ))}
            </div>

            <div className="pt-6">
              <button
                onClick={onPartnerClick}
                className="group inline-flex items-center gap-3 px-9 py-4 rounded-full bg-gradient-to-r from-[#142F1C] to-[#1E4529] hover:from-[#C59B27] hover:to-[#D8AF3E] text-[#FAF2DA] hover:text-[#0A1A0F] font-bold text-xs uppercase tracking-widest transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-0.5 border border-[#C59B27]/50 cursor-pointer"
              >
                <span>{aboutContent.partnerButton}</span>
                <ArrowRight className="w-4 h-4 text-[#C59B27] group-hover:text-[#0A1A0F] group-hover:translate-x-1 transition-all" />
              </button>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
