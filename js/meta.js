/**
 * Torch AI - SEO Metadata Management
 * Centralized SEO metadata for consistent implementation
 */

const siteMetadata = {
  // Site-wide defaults
  siteName: "Torch AI",
  siteDescription: "Affordable prompt engineering services for small businesses and entrepreneurs | Torch AI",
  siteURL: "https://inspectorkakui.github.io/",
  siteLogo: "images/logo-enhanced.svg",
  siteFavicon: "images/favicon.svg",
  siteLanguage: "en",
  siteLocale: "en_US",
  siteType: "website",
  siteAuthor: "Torch AI Prompt Engineering",
  
  // Social media
  twitterHandle: "@TorchAIPrompts",
  twitterCardType: "summary_large_image",
  
  // Contact information
  businessEmail: "torchpromptsai@proton.me",
  
  // Keywords by page
  globalKeywords: [
    "prompt engineering", "AI prompts", "small business AI", "AI assistant", 
    "content creation AI", "customer service AI", "affordable prompt engineering"
  ],
  
  // Pages configuration
  pages: {
    home: {
      title: "Torch AI | Affordable Prompt Engineering Services for Small Businesses",
      description: "Transform your business with AI-powered prompt engineering. Save time and improve consistency with custom prompt templates designed for small businesses.",
      canonicalURL: "https://inspectorkakui.github.io/"
    },
    services: {
      title: "Services & Pricing | Torch AI Prompt Engineering",
      description: "Explore our prompt engineering services: Small Business AI Assistant Kit, Content Creator's Toolkit, and Customer Service Response Framework. Affordable solutions from $50-300.",
      canonicalURL: "https://inspectorkakui.github.io/services-and-pricing.html"
    },
    caseStudy: {
      title: "Case Study: Small Business Content Transformation | Torch AI",
      description: "Discover how our prompt engineering solution helped a small business increase their online engagement by 200% and save 10 hours per week.",
      canonicalURL: "https://inspectorkakui.github.io/case-study.html"
    }
  }
};

/**
 * Generate HTML meta tags for SEO
 * @param {string} pageName - The page identifier in the siteMetadata.pages object
 * @returns {string} HTML string with all meta tags
 */
function generateMetaTags(pageName) {
  const page = siteMetadata.pages[pageName];
  const tags = [];
  
  // Basic meta tags
  tags.push(`<meta name="description" content="${page.description}">`);
  tags.push(`<meta name="keywords" content="${siteMetadata.globalKeywords.join(', ')}">`);
  tags.push(`<meta name="author" content="${siteMetadata.siteAuthor}">`);
  
  // Canonical URL
  tags.push(`<link rel="canonical" href="${page.canonicalURL}">`);
  
  // OpenGraph tags
  tags.push(`<meta property="og:title" content="${page.title}">`);
  tags.push(`<meta property="og:description" content="${page.description}">`);
  tags.push(`<meta property="og:url" content="${page.canonicalURL}">`);
  tags.push(`<meta property="og:type" content="${siteMetadata.siteType}">`);
  tags.push(`<meta property="og:site_name" content="${siteMetadata.siteName}">`);
  tags.push(`<meta property="og:locale" content="${siteMetadata.siteLocale}">`);
  
  // Twitter tags
  tags.push(`<meta name="twitter:card" content="${siteMetadata.twitterCardType}">`);
  tags.push(`<meta name="twitter:site" content="${siteMetadata.twitterHandle}">`);
  tags.push(`<meta name="twitter:title" content="${page.title}">`);
  tags.push(`<meta name="twitter:description" content="${page.description}">`);
  
  // Structured data
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": siteMetadata.siteName,
    "description": page.description,
    "url": page.canonicalURL,
    "email": siteMetadata.businessEmail,
    "offers": {
      "@type": "Offer",
      "priceRange": "$50-$300"
    },
    "serviceType": "Prompt Engineering Services"
  };
  
  tags.push(`<script type="application/ld+json">${JSON.stringify(structuredData)}</script>`);
  
  return tags.join('\n  ');
}

// Expose function globally
window.generateMetaTags = generateMetaTags;
