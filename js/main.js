// Torch AI - Main JavaScript
document.addEventListener('DOMContentLoaded', function() {
  // Page loader
  window.addEventListener('load', function() {
    const pageLoader = document.querySelector('.page-loader');
    if (pageLoader) {
      pageLoader.classList.add('fade-out');
      setTimeout(function() {
        pageLoader.style.display = 'none';
      }, 600);
    }
  });

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });

  // Header scroll effect
  const header = document.querySelector('header');
  if (header) {
    window.addEventListener('scroll', function() {
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  }
  
  // Services Tabs with enhanced transitions
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.service-tab-content');
  
  if (tabButtons.length && tabContents.length) {
    tabButtons.forEach(button => {
      button.addEventListener('click', function() {
        // Remove active class from all buttons and tab contents
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));
        
        // Add active class to the clicked button with a slight delay for visual effect
        setTimeout(() => {
          this.classList.add('active');
        }, 50);
        
        // Show the corresponding tab content
        const tabId = this.getAttribute('data-tab');
        const activeContent = document.getElementById(tabId);
        if (activeContent) {
          setTimeout(() => {
            activeContent.classList.add('active');
          }, 100);
        }
      });
    });
  }
  
  // Scroll reveal animation
  const revealElements = document.querySelectorAll('.reveal-on-scroll');
  
  function checkScroll() {
    const triggerBottom = window.innerHeight * 0.85;
    
    revealElements.forEach(element => {
      const elementTop = element.getBoundingClientRect().top;
      
      if (elementTop < triggerBottom) {
        element.classList.add('revealed');
      }
    });
  }
  
  // Check for elements in view on load
  window.addEventListener('load', checkScroll);
  
  // Check for elements in view on scroll (with debounce for performance)
  let scrollTimeout;
  window.addEventListener('scroll', function() {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(checkScroll, 10);
  });
  
  // Add responsive adjustments for service showcase
  function adjustServiceShowcase() {
    const serviceShowcases = document.querySelectorAll('.service-showcase');
    if (window.innerWidth < 992) {
      serviceShowcases.forEach(showcase => {
        showcase.style.gridTemplateColumns = '1fr';
      });
    } else {
      serviceShowcases.forEach(showcase => {
        showcase.style.gridTemplateColumns = '1.5fr 1fr';
      });
    }
  }
  
  // Run on load and resize (with debounce for performance)
  adjustServiceShowcase();
  let resizeTimeout;
  window.addEventListener('resize', function() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(adjustServiceShowcase, 100);
  });
  
  // Add hover effects to cards
  const cards = document.querySelectorAll('.process-card, .service-card, .testimonial-card');
  cards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.classList.add('hovered');
    });
    
    card.addEventListener('mouseleave', function() {
      this.classList.remove('hovered');
    });
  });
  
  // Add typing effect to hero headline on page load
  const heroHeadline = document.querySelector('.hero h1 span');
  if (heroHeadline) {
    heroHeadline.classList.add('typing-effect');
    
    // Add glowing effect to the hero CTA button after typing is complete
    setTimeout(() => {
      const heroCta = document.querySelector('.hero-cta .btn');
      if (heroCta) {
        heroCta.classList.add('pulse-attention');
      }
    }, 2500);
  }
  
  // Lazy load images for performance
  if ('loading' in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
      img.src = img.dataset.src;
    });
  } else {
    // Fallback for browsers that don't support lazy loading
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
    document.body.appendChild(script);
  }
  
  // Fix any console errors for network resources
  window.addEventListener('error', function(e) {
    if (e.target.tagName === 'IMG' || e.target.tagName === 'SCRIPT' || e.target.tagName === 'LINK') {
      e.preventDefault();
      console.warn('Resource failed to load:', e.target.src || e.target.href);
    }
  }, true);
  
  // Add accessibility improvements
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
