import { fallbackArticles } from '../data/blogData';

// Configurable Strapi CMS endpoint via Vite environment variable
const STRAPI_BASE_URL = import.meta.env.VITE_STRAPI_URL || 'http://localhost:1337';

/**
 * Helper to normalize Strapi media URLs (supports both relative /uploads and external CDN URLs)
 */
export function getStrapiMediaUrl(mediaObj) {
  if (!mediaObj) return null;
  const url = typeof mediaObj === 'string'
    ? mediaObj
    : (mediaObj.url || mediaObj.data?.attributes?.url || mediaObj.attributes?.url);
  if (!url) return null;
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }
  const cleanUrl = url.startsWith('/') ? url : `/${url}`;
  return `${STRAPI_BASE_URL}${cleanUrl}`;
}

/**
 * Normalizes a raw Strapi article entity into a clean, predictable shape
 */
function normalizeStrapiArticle(item) {
  // Supports both Strapi v4 ({ id, attributes: { ... } }) and Strapi v5 ({ id, documentId, ... })
  const attrs = item.attributes || item;
  const coverMedia = attrs.coverImage || attrs.cover || attrs.image;

  return {
    id: item.id || attrs.id,
    slug: attrs.slug || String(item.id),
    title: attrs.title || 'Untitled Article',
    category: attrs.category?.toLowerCase() || 'tea-craft',
    categoryLabel: attrs.categoryLabel || attrs.category || 'Tea Craft',
    excerpt: attrs.excerpt || attrs.summary || '',
    content: attrs.content || attrs.body || '',
    coverImage: getStrapiMediaUrl(coverMedia) || '/images/tea-harvest.jpg',
    readTime: attrs.readTime || `${attrs.readingTime || 5} min read`,
    publishedDate: attrs.publishedAt
      ? new Date(attrs.publishedAt).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })
      : 'Recently Published',
    author: {
      name: attrs.authorName || attrs.author?.name || 'Crafted Leaves Master Craftsman',
      role: attrs.authorRole || attrs.author?.role || 'Head of Tea Heritage',
      avatar: getStrapiMediaUrl(attrs.authorAvatar || attrs.author?.avatar) || '/images/hero-hand-leaf.jpg'
    },
    featured: Boolean(attrs.featured),
    tags: Array.isArray(attrs.tags)
      ? attrs.tags
      : typeof attrs.tags === 'string'
      ? attrs.tags.split(',').map((t) => t.trim())
      : ['Ceylon Tea', 'Artisanal Craft']
  };
}

/**
 * Fetch articles with optional category filter and search query.
 * Falls back to curated static articles if Strapi is not running or network fails.
 */
export async function getArticles({ category = 'all', search = '' } = {}) {
  try {
    const queryParams = new URLSearchParams();
    queryParams.append('populate', '*');
    queryParams.append('sort[0]', 'publishedAt:desc');

    if (category && category !== 'all') {
      queryParams.append('filters[category][$eq]', category);
    }
    if (search && search.trim()) {
      queryParams.append('filters[title][$containsi]', search.trim());
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3500); // 3.5s timeout for snappy UI

    const response = await fetch(`${STRAPI_BASE_URL}/api/articles?${queryParams.toString()}`, {
      headers: {
        Accept: 'application/json'
      },
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`Strapi response status: ${response.status}`);
    }

    const json = await response.json();
    const rawList = json.data || [];

    if (rawList.length > 0) {
      const liveArticles = rawList.map(normalizeStrapiArticle);
      return {
        articles: liveArticles,
        isLiveStrapi: true
      };
    }

    // If Strapi returns an empty array, fall back to curated articles
    return filterFallbackArticles({ category, search });
  } catch (error) {
    // Graceful fallback to static curated data so user experience is always flawless
    return filterFallbackArticles({ category, search });
  }
}

/**
 * Fetch a single article by slug.
 */
export async function getArticleBySlug(slug) {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3500);

    const response = await fetch(
      `${STRAPI_BASE_URL}/api/articles?filters[slug][$eq]=${encodeURIComponent(slug)}&populate=*`,
      {
        headers: { Accept: 'application/json' },
        signal: controller.signal
      }
    );

    clearTimeout(timeoutId);

    if (response.ok) {
      const json = await response.json();
      const rawItem = json.data?.[0];
      if (rawItem) {
        return {
          article: normalizeStrapiArticle(rawItem),
          isLiveStrapi: true
        };
      }
    }
  } catch (error) {
    // Fall back to local data
  }

  const fallback = fallbackArticles.find((a) => a.slug === slug);
  return {
    article: fallback || fallbackArticles[0],
    isLiveStrapi: false
  };
}

function filterFallbackArticles({ category = 'all', search = '' }) {
  let list = [...fallbackArticles];

  if (category && category !== 'all') {
    list = list.filter((a) => a.category === category);
  }

  if (search && search.trim()) {
    const q = search.toLowerCase().trim();
    list = list.filter(
      (a) =>
        a.title.toLowerCase().includes(q) ||
        a.excerpt.toLowerCase().includes(q) ||
        a.tags.some((t) => t.toLowerCase().includes(q))
    );
  }

  return {
    articles: list,
    isLiveStrapi: false
  };
}

