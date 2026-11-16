import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Clock, 
  Calendar, 
  ArrowRight, 
  BookOpen, 
  Leaf, 
  Sparkles, 
  Tag, 
  Database, 
  CheckCircle2, 
  RotateCw 
} from 'lucide-react';
import { blogCategories } from '../data/blogData';
import { getArticles } from '../services/strapi';

export default function BlogPage({ onSelectArticle, onNavigateToContact }) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isLiveStrapi, setIsLiveStrapi] = useState(false);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    getArticles({ category: selectedCategory, search: searchQuery }).then((res) => {
      if (isMounted) {
        setArticles(res.articles);
        setIsLiveStrapi(res.isLiveStrapi);
        setLoading(false);
      }
    });

    return () => {
      isMounted = false;
    };
  }, [selectedCategory, searchQuery]);

  const featuredArticle = articles.find((a) => a.featured) || articles[0];
  const gridArticles = articles.filter((a) => a.id !== featuredArticle?.id);

  return (
    <div className="space-y-0 bg-[#FCFAF7]">
      
      {/* Botanical Luxury Editorial Header */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#F7F3EB] via-[#FAF7F0] to-[#FCFAF7] py-14 sm:py-20 lg:py-24 text-center">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(197,155,39,0.08)_0%,_transparent_65%)] pointer-events-none" />
        
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EFE8DC] border border-[#C59B27]/40 text-[#142F1C] shadow-xs">
            <BookOpen className="w-3.5 h-3.5 text-[#255835]" />
            <span className="text-xs font-semibold uppercase tracking-wider text-[#A8811A]">The Crafted Leaves Blog</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold text-[#142F1C] tracking-tight leading-[1.15]">
            Blogs & Insights from Ceylon
          </h1>

          <p className="text-lg sm:text-2xl font-serif italic text-[#C59B27]">
            Heritage, Botanical Terroirs & The Ritual of Ceylon Craft
          </p>

          <p className="text-xs sm:text-base text-[#4C554D] max-w-2xl mx-auto leading-relaxed">
            Immerse yourself in authentic perspectives on traditional seedling harvesting, true Ceylon cinnamon cultivation, water chemistry, and the biodiversity of the UNESCO Sinharaja border.
          </p>

          {/* CMS Connection Indicator */}
          <div className="pt-2 flex items-center justify-center">
            {isLiveStrapi ? (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold bg-[#25D366]/15 text-[#128C7E] border border-[#25D366]/30">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Connected to Live Strapi CMS</span>
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold bg-[#C59B27]/12 text-[#8B6810] border border-[#C59B27]/25">
                <Sparkles className="w-3 h-3 text-[#C59B27]" />
                <span>Artisanal Curated Edition • Strapi Ready</span>
              </span>
            )}
          </div>
        </div>
      </section>

      {/* Filter Tabs & Search Bar */}
      <section className="sticky top-16 z-30 bg-[#FCFAF7]/95 backdrop-blur-md py-3.5 sm:py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
            
            {/* Category Filter Pills - Clean, unified single row */}
            <div className="flex items-center gap-2">
              {blogCategories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 sm:px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer whitespace-nowrap ${
                    selectedCategory === cat.id
                      ? 'bg-[#142F1C] text-[#FAF2DA] shadow-md border border-[#C59B27]/40 scale-102'
                      : 'bg-white text-[#4C554D] hover:text-[#142F1C] hover:bg-[#EFE8DC] border border-[#E2D7C3]'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Instant Search Bar */}
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 text-[#8B6810] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search blogs, tea..."
                className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm rounded-full bg-white border border-[#E2D7C3] focus:border-[#C59B27] focus:outline-none shadow-xs text-[#142F1C] placeholder-[#8A958C]"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#8A958C] hover:text-[#142F1C] cursor-pointer"
                >
                  ✕
                </button>
              )}
            </div>

          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="py-12 sm:py-16 bg-[#FCFAF7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          {loading ? (
            <div className="py-20 text-center space-y-3">
              <RotateCw className="w-8 h-8 text-[#C59B27] animate-spin mx-auto" />
              <p className="text-sm font-serif italic text-[#616B62]">Loading blogs from Ceylon...</p>
            </div>
          ) : articles.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center border border-[#E2D7C3] max-w-xl mx-auto space-y-4 shadow-sm">
              <BookOpen className="w-10 h-10 text-[#C59B27] mx-auto opacity-70" />
              <h3 className="font-serif text-2xl font-bold text-[#142F1C]">No Blogs Found</h3>
              <p className="text-xs sm:text-sm text-[#616B62]">
                We couldn't find any articles matching your search criteria. Try a different category or search term.
              </p>
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setSearchQuery('');
                }}
                className="px-6 py-2.5 rounded-full bg-[#142F1C] text-[#FAF2DA] text-xs font-bold uppercase tracking-wider hover:bg-[#C59B27] transition-all cursor-pointer"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className={`grid gap-6 sm:gap-8 ${
              articles.length === 1 ? 'max-w-2xl mx-auto' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
            }`}>
              {articles.map((article) => (
                <article
                  key={article.id}
                  onClick={() => onSelectArticle(article.slug)}
                  className="group bg-white rounded-2xl sm:rounded-3xl overflow-hidden border border-[#E2D7C3] hover:border-[#C59B27]/70 shadow-sm hover:shadow-xl transition-all duration-500 cursor-pointer flex flex-col justify-between hover:-translate-y-1.5"
                >
                  <div>
                    {/* Cover Photo */}
                    <div className="relative h-56 sm:h-64 w-full overflow-hidden bg-[#FAF8F3]">
                      <img
                        src={article.coverImage}
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-700 ease-out"
                      />
                      <div className="absolute top-3 left-3 bg-[#142F1C]/90 backdrop-blur-xs text-[#FAF2DA] text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border border-[#C59B27]/40 shadow-xs">
                        {article.categoryLabel}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 sm:p-7 space-y-3">
                      <div className="flex items-center gap-3 text-xs text-[#8A958C]">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-[#C59B27]" />
                          <span>{article.readTime}</span>
                        </span>
                        <span>•</span>
                        <span>{article.publishedDate}</span>
                      </div>

                      <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#142F1C] leading-snug group-hover:text-[#255835] transition-colors line-clamp-2">
                        {article.title}
                      </h3>

                      <p className="text-xs sm:text-sm text-[#4C554D] leading-relaxed line-clamp-3">
                        {article.excerpt}
                      </p>
                    </div>
                  </div>

                  {/* Bottom Author & Read Link */}
                  <div className="px-6 sm:px-7 pb-6 pt-3 border-t border-[#F0E8DC] flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <img
                        src={article.author.avatar}
                        alt={article.author.name}
                        className="w-8 h-8 rounded-full object-cover border border-[#C59B27]/40"
                      />
                      <span className="text-xs font-semibold text-[#142F1C]">
                        {article.author.name}
                      </span>
                    </div>

                    <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#C59B27] group-hover:text-[#142F1C] transition-colors">
                      <span>Read Article</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </article>
              ))}
            </div>
          )}

          {/* Bottom Journal Callout & Partnership Invitation */}
          <div className="bg-[#142F1C] text-white rounded-3xl p-8 sm:p-12 border-2 border-[#C59B27]/40 shadow-xl relative overflow-hidden">
            <div className="relative z-10 max-w-3xl mx-auto text-center space-y-4">
              <span className="text-xs font-bold uppercase tracking-widest text-[#D8AF3E]">Knowledge & Craftsmanship</span>
              <h2 className="font-serif text-2xl sm:text-4xl font-bold text-white">
                Share in the Legacy of Ceylon Artisanal Tea
              </h2>
              <p className="text-xs sm:text-sm text-[#DCD1BC] leading-relaxed max-w-xl mx-auto">
                Are you a fine tea curator, hotelier, or specialty retailer seeking to offer your patrons genuine single-estate handmade Ceylon teas and handcrafted spices?
              </p>
              <div className="pt-2">
                <button
                  onClick={onNavigateToContact}
                  className="px-8 py-3.5 rounded-full bg-[#C59B27] hover:bg-[#D8AF3E] text-[#142F1C] font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-md hover:shadow-lg cursor-pointer inline-flex items-center gap-2"
                >
                  <span>Connect With Our Master Tea Makers</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
