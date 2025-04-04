// Torch AI - Main JavaScript
document.addEventListener('DOMContentLoaded', function() {
  // Page loader with faster fade-out
  window.addEventListener('load', function() {
    const pageLoader = document.querySelector('.page-loader');
    if (pageLoader) {
      setTimeout(function() {
        pageLoader.classList.add('fade-out');
        setTimeout(function() {
          pageLoader.style.display = 'none';
        }, 400); // Reduced time for better UX
      }, 200); // Small delay to ensure content is ready
    }
  });

  // Optimized smooth scrolling with IntersectionObserver
  const scrollLinks = document.querySelectorAll('a[href^="#"]');
  scrollLinks.forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        // Use smooth scroll with better performance
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });

  // Header scroll effect with performance optimization
  const header = document.querySelector('header');
  let scrolled = false;
  let ticking = false;
  
  if (header) {
    window.addEventListener('scroll', function() {
      scrolled = window.scrollY > 50;
      
      if (!ticking) {
        window.requestAnimationFrame(function() {
          if (scrolled) {
            header.classList.add('scrolled');
          } else {
            header.classList.remove('scrolled');
          }
          ticking = false;
        });
        
        ticking = true;
      }
    });
  }
  
  // Services Tabs with enhanced transitions and performance
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.service-tab-content');
  
  if (tabButtons.length && tabContents.length) {
    tabButtons.forEach(button => {
      button.addEventListener('click', function() {
        // Optimize this by caching active elements
        const currentActive = document.querySelector('.tab-btn.active');
        const currentContent = document.querySelector('.service-tab-content.active');
        const tabId = this.getAttribute('data-tab');
        const targetContent = document.getElementById(tabId);
        
        if (currentActive) currentActive.classList.remove('active');
        if (currentContent) currentContent.classList.remove('active');
        
        // Use requestAnimationFrame for smoother UI updates
        requestAnimationFrame(() => {
          this.classList.add('active');
          if (targetContent) {
            targetContent.classList.add('active');
          }
        });
      });
    });
  }
  
  // Scroll reveal animation with IntersectionObserver for better performance
  const revealElements = document.querySelectorAll('.reveal-on-scroll');
  
  if (revealElements.length) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          revealObserver.unobserve(entry.target); // Stop observing once revealed
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -50px 0px'
    });
    
    revealElements.forEach(element => {
      revealObserver.observe(element);
    });
  }
  
  // Service showcase responsiveness with ResizeObserver
  const serviceShowcases = document.querySelectorAll('.service-showcase');
  
  if (serviceShowcases.length) {
    const updateLayout = () => {
      serviceShowcases.forEach(showcase => {
        showcase.style.gridTemplateColumns = window.innerWidth < 992 ? '1fr' : '1.5fr 1fr';
      });
    };
    
    // Run once on load
    updateLayout();
    
    // Better than resize event
    if ('ResizeObserver' in window) {
      const resizeObserver = new ResizeObserver(updateLayout);
      serviceShowcases.forEach(showcase => resizeObserver.observe(showcase));
    } else {
      // Fallback for older browsers
      let resizeTimeout;
      window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(updateLayout, 100);
      });
    }
  }
  
  // Optimize image loading
  if ('loading' in HTMLImageElement.prototype) {
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    lazyImages.forEach(img => {
      if (img.dataset.src) {
        img.src = img.dataset.src;
      }
    });
  } else {
    // Fallback for browsers that don't support lazy loading
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
    document.body.appendChild(script);
  }
  
  // Error handling for resources
  window.addEventListener('error', function(e) {
    if (e.target.tagName === 'IMG' || e.target.tagName === 'SCRIPT' || e.target.tagName === 'LINK') {
      e.preventDefault();
      console.warn('Resource failed to load:', e.target.src || e.target.href);
    }
  }, true);
  
  // Accessibility improvements
  const focusableElements = document.querySelectorAll('a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])');
  focusableElements.forEach(el => {
    if (!el.getAttribute('aria-label') && !el.textContent.trim()) {
      const prevText = el.querySelector('i')?.getAttribute('title') || 
                      el.querySelector('img')?.getAttribute('alt') || 
                      'Interactive element';
      el.setAttribute('aria-label', prevText);
    }
  });
});
