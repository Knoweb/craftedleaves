import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  Clock, 
  Calendar, 
  Share2, 
  Check, 
  MessageCircle, 
  ArrowRight, 
  BookOpen, 
  Sparkles, 
  Leaf, 
  RotateCw 
} from 'lucide-react';
import { getArticleBySlug, getArticles, getStrapiMediaUrl } from '../services/strapi';

export default function BlogPostPage({ slug, onBack, onSelectArticle, onInquire }) {
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [relatedArticles, setRelatedArticles] = useState([]);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    getArticleBySlug(slug).then((res) => {
      if (isMounted) {
        setArticle(res.article);
        setLoading(false);

        // Fetch related articles
        getArticles({ category: res.article.category }).then((allRes) => {
          if (isMounted) {
            const filtered = allRes.articles.filter((a) => a.slug !== res.article.slug).slice(0, 3);
            setRelatedArticles(filtered);
          }
        });
      }
    });

    return () => {
      isMounted = false;
    };
  }, [slug]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShareWhatsApp = () => {
    if (!article) return;
    const text = encodeURIComponent(`Read "${article.title}" by Crafted Leaves:\n${window.location.href}`);
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center py-24 space-y-4 bg-[#FCFAF7]">
        <RotateCw className="w-9 h-9 text-[#C59B27] animate-spin" />
        <p className="font-serif italic text-base text-[#616B62]">Opening journal entry...</p>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="max-w-2xl mx-auto py-20 px-4 text-center space-y-4 bg-[#FCFAF7]">
        <h2 className="font-serif text-3xl font-bold text-[#142F1C]">Article Not Found</h2>
        <p className="text-sm text-[#616B62]">The blog post you are looking for may have been moved or updated.</p>
        <button
          onClick={onBack}
          className="px-6 py-2.5 rounded-full bg-[#142F1C] text-[#FAF2DA] text-xs font-bold uppercase tracking-wider cursor-pointer"
        >
          Back to All Blogs
        </button>
      </div>
    );
  }

  // Simple Markdown Parser to render structured headings, quotes, lists, and paragraphs cleanly
  const renderFormattedContent = (rawText) => {
    if (!rawText) return null;
    const lines = rawText.split('\n');
    const elements = [];
    let keyIdx = 0;

    let inTable = false;
    let tableRows = [];

    const flushTable = () => {
      if (tableRows.length > 0) {
        elements.push(
          <div key={`table-${keyIdx++}`} className="overflow-x-auto my-6">
            <table className="w-full text-left text-xs sm:text-sm border border-[#E2D7C3] rounded-xl overflow-hidden">
              <thead className="bg-[#FAF8F3] text-[#142F1C] font-serif font-bold uppercase border-b border-[#E2D7C3]">
                <tr>
                  {tableRows[0].map((cell, i) => (
                    <th key={i} className="p-3 border-r border-[#E2D7C3] last:border-r-0">
                      {cell}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E2D7C3]/60 bg-white">
                {tableRows.slice(1).map((row, rIdx) => (
                  <tr key={rIdx} className="hover:bg-[#FAF8F3]/50">
                    {row.map((cell, cIdx) => (
                      <td key={cIdx} className="p-3 border-r border-[#E2D7C3]/60 last:border-r-0">
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
        tableRows = [];
        inTable = false;
      }
    };

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();

      // Check table markdown | ... |
      if (line.startsWith('|') && line.endsWith('|')) {
        const cells = line.split('|').map((c) => c.trim()).filter((_, idx, arr) => idx > 0 && idx < arr.length);
        // Ignore separator line | :--- | :--- |
        if (cells.some((c) => c.includes('---'))) {
          continue;
        }
        inTable = true;
        tableRows.push(cells);
        continue;
      } else if (inTable) {
        flushTable();
      }

      if (!line) {
        continue;
      }

      // 1. Markdown Images: ![alt](url)
      const imgMatch = line.match(/^!\[(.*?)\]\((.*?)\)$/);
      if (imgMatch) {
        const rawAlt = imgMatch[1] || '';
        const rawUrl = imgMatch[2] || '';
        const resolvedUrl = getStrapiMediaUrl(rawUrl);

        const isRight = rawAlt.toLowerCase().includes('right') || rawAlt.toLowerCase().includes('side');
        const isLeft = rawAlt.toLowerCase().includes('left');
        const isFull = rawAlt.toLowerCase().includes('full') || rawAlt.toLowerCase().includes('wide');
        const cleanAlt = rawAlt.replace(/^(right:|side:|left:|full:|wide:)\s*/i, '').trim();

        if (isRight) {
          // Wrapped float-right card for side-by-side text wrap (like editorial print)
          elements.push(
            <figure key={keyIdx++} className="my-4 md:float-right md:ml-6 md:mb-4 md:max-w-[280px] w-full bg-[#FAF8F3] rounded-2xl overflow-hidden border border-[#E2D7C3] shadow-md p-2">
              <img
                src={resolvedUrl}
                alt={cleanAlt}
                className="w-full h-auto rounded-xl object-cover hover:scale-102 transition-transform duration-300"
                loading="lazy"
              />
              {cleanAlt && (
                <figcaption className="pt-2 px-1 text-center text-[11px] font-serif italic text-[#616B62] leading-snug">
                  {cleanAlt}
                </figcaption>
              )}
            </figure>
          );
        } else if (isLeft) {
          // Wrapped float-left card
          elements.push(
            <figure key={keyIdx++} className="my-4 md:float-left md:mr-6 md:mb-4 md:max-w-[280px] w-full bg-[#FAF8F3] rounded-2xl overflow-hidden border border-[#E2D7C3] shadow-md p-2">
              <img
                src={resolvedUrl}
                alt={cleanAlt}
                className="w-full h-auto rounded-xl object-cover hover:scale-102 transition-transform duration-300"
                loading="lazy"
              />
              {cleanAlt && (
                <figcaption className="pt-2 px-1 text-center text-[11px] font-serif italic text-[#616B62] leading-snug">
                  {cleanAlt}
                </figcaption>
              )}
            </figure>
          );
        } else if (isFull) {
          // Full-width wide banner
          elements.push(
            <figure key={keyIdx++} className="clear-both my-8 rounded-2xl sm:rounded-3xl overflow-hidden border border-[#E2D7C3] shadow-md bg-white">
              <img
                src={resolvedUrl}
                alt={cleanAlt}
                className="w-full h-auto max-h-[500px] object-cover"
                loading="lazy"
              />
              {cleanAlt && (
                <figcaption className="p-3.5 text-center text-xs font-serif italic text-[#616B62] bg-[#FAF8F3] border-t border-[#E2D7C3]/60">
                  {cleanAlt}
                </figcaption>
              )}
            </figure>
          );
        } else {
          // Standard Editorial Image (centered with elegant border and caption)
          elements.push(
            <figure key={keyIdx++} className="my-6 sm:my-8 bg-[#FAF8F3] rounded-2xl overflow-hidden border border-[#E2D7C3] shadow-sm p-2 sm:p-2.5 max-w-lg mx-auto">
              <img
                src={resolvedUrl}
                alt={cleanAlt}
                className="w-full h-auto rounded-xl object-cover"
                loading="lazy"
              />
              {cleanAlt && (
                <figcaption className="pt-2 px-1 text-center text-xs font-serif italic text-[#616B62] leading-snug">
                  {cleanAlt}
                </figcaption>
              )}
            </figure>
          );
        }
        continue;
      }

      // Headings (with clear-both to keep layout pristine)
      if (line.startsWith('### ')) {
        elements.push(
          <h3 key={keyIdx++} className="clear-both font-serif text-xl sm:text-2xl font-bold text-[#142F1C] pt-6 pb-2 border-b border-[#F0E8DC]">
            {line.replace('### ', '')}
          </h3>
        );
      } else if (line.startsWith('## ')) {
        elements.push(
          <h2 key={keyIdx++} className="clear-both font-serif text-2xl sm:text-3xl font-bold text-[#142F1C] pt-8 pb-3">
            {line.replace('## ', '')}
          </h2>
        );
      } else if (line.startsWith('#### ')) {
        elements.push(
          <h4 key={keyIdx++} className="clear-both font-serif text-lg sm:text-xl font-bold text-[#255835] pt-4">
            {line.replace('#### ', '')}
          </h4>
        );
      } else if (line.startsWith('> ')) {
        // Blockquote
        elements.push(
          <blockquote key={keyIdx++} className="my-6 pl-5 py-3 border-l-4 border-[#C59B27] bg-[#FAF8F3] rounded-r-2xl font-serif italic text-base sm:text-lg text-[#142F1C] shadow-xs">
            {line.replace('> ', '')}
          </blockquote>
        );
      } else if (line.startsWith('* ') || line.startsWith('- ')) {
        // Unordered list item
        const text = line.replace(/^[\*\-]\s+/, '');
        elements.push(
          <li key={keyIdx++} className="ml-6 list-disc text-sm sm:text-base text-[#3E473F] leading-relaxed my-1">
            <span dangerouslySetInnerHTML={{ __html: text.replace(/\*\*(.*?)\*\*/g, '<strong class="text-[#142F1C]">$1</strong>') }} />
          </li>
        );
      } else if (/^\d+\.\s/.test(line)) {
        // Numbered list item
        const text = line.replace(/^\d+\.\s+/, '');
        elements.push(
          <li key={keyIdx++} className="ml-6 list-decimal text-sm sm:text-base text-[#3E473F] leading-relaxed my-1">
            <span dangerouslySetInnerHTML={{ __html: text.replace(/\*\*(.*?)\*\*/g, '<strong class="text-[#142F1C]">$1</strong>') }} />
          </li>
        );
      } else if (line === '---') {
        elements.push(<hr key={keyIdx++} className="my-8 border-[#E2D7C3]" />);
      } else {
        // Normal paragraph with bold parsing
        elements.push(
          <p 
            key={keyIdx++} 
            className="text-sm sm:text-base md:text-[1.05rem] text-[#3E473F] leading-relaxed my-4"
            dangerouslySetInnerHTML={{ 
              __html: line
                .replace(/\*\*(.*?)\*\*/g, '<strong class="text-[#142F1C] font-semibold">$1</strong>')
                .replace(/\*(.*?)\*/g, '<em class="italic text-[#8B6810]">$1</em>')
            }}
          />
        );
      }
    }

    if (inTable) {
      flushTable();
    }

    return elements;
  };

  return (
    <div className="bg-[#FCFAF7] py-10 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation Breadcrumb & Back Button */}
        <div className="flex items-center justify-between pb-8 mb-8 border-b border-[#E2D7C3]/80">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white hover:bg-[#EFE8DC] text-[#142F1C] text-xs font-bold uppercase tracking-wider transition-colors border border-[#E2D7C3] shadow-xs cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to All Blogs</span>
          </button>

          <span className="text-xs uppercase tracking-widest text-[#A8811A] font-semibold hidden sm:inline">
            {article.categoryLabel}
          </span>
        </div>

        {/* Article Header */}
        <header className="space-y-4 mb-8 text-center sm:text-left">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 text-xs text-[#8A958C]">
            <span className="px-3 py-1 rounded-full bg-[#C59B27]/12 text-[#84630D] font-bold uppercase tracking-wider">
              {article.categoryLabel}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-[#C59B27]" />
              <span>{article.readTime}</span>
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-[#C59B27]" />
              <span>{article.publishedDate}</span>
            </span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#142F1C] leading-[1.2] tracking-tight">
            {article.title}
          </h1>

          <p className="font-serif italic text-base sm:text-xl text-[#616B62] leading-relaxed pt-1">
            {article.excerpt}
          </p>

          {/* Author Badge & Share Actions */}
          <div className="pt-6 border-t border-[#F0E8DC] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <img
                src={article.author.avatar}
                alt={article.author.name}
                className="w-12 h-12 rounded-full object-cover border-2 border-[#C59B27]/40 shadow-xs"
              />
              <div>
                <span className="block font-bold text-sm text-[#142F1C]">{article.author.name}</span>
                <span className="block text-xs text-[#8A958C]">{article.author.role}</span>
              </div>
            </div>

            {/* Sharing toolbar */}
            <div className="flex items-center gap-2">
              <button
                onClick={handleShareWhatsApp}
                className="px-3.5 py-1.5 rounded-full bg-[#25D366]/15 hover:bg-[#25D366]/25 text-[#128C7E] border border-[#25D366]/30 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                title="Share to WhatsApp"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>Share</span>
              </button>

              <button
                onClick={handleCopyLink}
                className="px-3.5 py-1.5 rounded-full bg-white hover:bg-[#EFE8DC] text-[#142F1C] border border-[#E2D7C3] text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                title="Copy Article Link"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-[#25D366]" />
                    <span className="text-[#25D366]">Copied!</span>
                  </>
                ) : (
                  <>
                    <Share2 className="w-3.5 h-3.5 text-[#8A958C]" />
                    <span>Copy Link</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </header>

        {/* Hero Cover Image */}
        <div className="relative rounded-3xl overflow-hidden my-8 border-2 border-[#E2D7C3] shadow-xl bg-black/5">
          <img
            src={article.coverImage}
            alt={article.title}
            className="w-full max-h-[480px] object-cover"
          />
        </div>

        {/* Article Body Content */}
        <article className="prose prose-stone max-w-none pt-4 pb-12 border-b border-[#E2D7C3]">
          {renderFormattedContent(article.content)}
        </article>

        {/* Tags */}
        {article.tags && article.tags.length > 0 && (
          <div className="py-6 flex flex-wrap items-center gap-2 border-b border-[#E2D7C3]">
            <span className="text-xs font-bold uppercase tracking-wider text-[#8A958C]">Tags:</span>
            {article.tags.map((tag, idx) => (
              <span
                key={idx}
                className="px-3 py-1 rounded-full bg-white border border-[#E2D7C3] text-xs text-[#4C554D]"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Author Bio Box */}
        <div className="my-10 p-6 sm:p-8 rounded-3xl bg-white border border-[#E2D7C3] shadow-md flex flex-col sm:flex-row items-center sm:items-start gap-5">
          <img
            src={article.author.avatar}
            alt={article.author.name}
            className="w-16 h-16 rounded-2xl object-cover border-2 border-[#C59B27]/40 shadow-sm shrink-0"
          />
          <div className="space-y-1.5 text-center sm:text-left">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#A8811A]">About the Author</span>
            <h4 className="font-serif text-lg font-bold text-[#142F1C]">{article.author.name}</h4>
            <p className="text-xs text-[#8A958C]">{article.author.role}</p>
            <p className="text-xs text-[#4C554D] leading-relaxed pt-1">
              Dedicated to preserving the artisanal tea harvesting and peeling traditions of Southern Sri Lanka, honoring the 150-year heritage of Ceylon Camellia sinensis.
            </p>
          </div>
        </div>

        {/* Related Stories */}
        {relatedArticles.length > 0 && (
          <div className="my-14 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-[#A8811A]">Explore More</span>
                <h3 className="font-serif text-2xl font-bold text-[#142F1C]">Related Blogs</h3>
              </div>
              <button
                onClick={onBack}
                className="text-xs font-bold uppercase tracking-wider text-[#C59B27] hover:text-[#142F1C] transition-colors cursor-pointer"
              >
                View All →
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {relatedArticles.map((rel) => (
                <div
                  key={rel.id}
                  onClick={() => onSelectArticle(rel.slug)}
                  className="group bg-white rounded-2xl overflow-hidden border border-[#E2D7C3] hover:border-[#C59B27] p-4 shadow-sm hover:shadow-md transition-all cursor-pointer space-y-3"
                >
                  <img
                    src={rel.coverImage}
                    alt={rel.title}
                    className="w-full h-32 object-cover rounded-xl group-hover:scale-104 transition-transform duration-500"
                  />
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#8A958C] block mb-1">
                      {rel.readTime}
                    </span>
                    <h4 className="font-serif text-sm font-bold text-[#142F1C] group-hover:text-[#255835] transition-colors line-clamp-2">
                      {rel.title}
                    </h4>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Commercial & Inquiry Banner */}
        <div className="bg-[#142F1C] text-white rounded-3xl p-8 sm:p-10 text-center space-y-4 border-2 border-[#C59B27]/40 shadow-xl">
          <span className="text-xs font-bold uppercase tracking-widest text-[#D8AF3E]">Artisanal Tea Inquiry</span>
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white">
            Experience the Taste of These Artisanal Blends
          </h3>
          <p className="text-xs sm:text-sm text-[#DCD1BC] max-w-lg mx-auto leading-relaxed">
            Every blog post reflects real leaves, quills, and spices handcrafted at Bataganvila and Elpitiya. Order custom collections or discuss direct partnerships.
          </p>
          <div className="pt-2">
            <button
              onClick={() => onInquire(article.title)}
              className="px-8 py-3.5 rounded-full bg-[#C59B27] hover:bg-[#D8AF3E] text-[#142F1C] font-bold text-xs uppercase tracking-wider transition-all shadow-md cursor-pointer inline-flex items-center gap-2"
            >
              <span>Inquire About This Collection</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
