// Torch AI - Enhanced JavaScript

document.addEventListener('DOMContentLoaded', function() {
  // Scroll Animation System
  const animateOnScroll = () => {
    const elements = document.querySelectorAll('.will-animate');
    
    elements.forEach(element => {
      const elementPosition = element.getBoundingClientRect().top;
      const screenPosition = window.innerHeight / 1.2;
      
      if (elementPosition < screenPosition) {
        element.classList.add('animated');
      }
    });
  }
  
  // Initialize scroll animations
  const initScrollAnimations = () => {
    // Add the will-animate class to elements we want to animate
    const animatableElements = [
      '.hero-content', '.hero-image', 
      '.about-content', '.section-intro',
      '.process-card', '.service-card', 
      '.portfolio-item', '.testimonial-card',
      '.cta-content'
    ];
    
    animatableElements.forEach(selector => {
      document.querySelectorAll(selector).forEach((el, index) => {
        el.classList.add('will-animate');
        // Add delay for staggered animation effect
        el.style.transitionDelay = `${index * 0.1}s`;
      });
    });
    
    // Trigger animations on page load
    setTimeout(animateOnScroll, 100);
    
    // Add scroll event listener
    window.addEventListener('scroll', animateOnScroll);
  }
  
  // Particle background effect for hero section
  const initParticleEffect = () => {
    const heroSection = document.querySelector('.hero');
    if (!heroSection) return;
    
    // Create canvas
    const canvas = document.createElement('canvas');
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '1';
    
    // Insert canvas before the first child of hero section
    heroSection.insertBefore(canvas, heroSection.firstChild);
    
    // Set canvas dimensions
    const setCanvasDimensions = () => {
      canvas.width = heroSection.offsetWidth;
      canvas.height = heroSection.offsetHeight;
    }
    setCanvasDimensions();
    window.addEventListener('resize', setCanvasDimensions);
    
    // Initialize particles
    const ctx = canvas.getContext('2d');
    const particles = [];
    const particleCount = 50;
    
    // Create particles
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2 + 1,
        color: 'rgba(255, 255, 255, 0.2)',
        speedX: Math.random() * 0.5 - 0.25,
        speedY: Math.random() * 0.5 - 0.25,
        opacity: Math.random() * 0.5 + 0.1
      });
    }
    
    // Animation loop
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(particle => {
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.globalAlpha = particle.opacity;
        ctx.fill();
        
        // Update position
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        
        // Boundary check
        if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1;
      });
      
      requestAnimationFrame(animate);
    }
    
    // Start animation if prefers-reduced-motion is not enabled
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      animate();
    }
  }
  
  // Enhanced tab system with fade effects
  const enhanceTabSystem = () => {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.service-tab-content');
    
    if (!tabButtons.length || !tabContents.length) return;
    
    tabButtons.forEach(button => {
      button.addEventListener('click', function() {
        // Remove active class from all buttons and tab contents
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabContents.forEach(content => {
          content.style.opacity = '0';
          setTimeout(() => {
            content.classList.remove('active');
          }, 300);
        });
        
        // Add active class to the clicked button
        this.classList.add('active');
        
        // Show the corresponding tab content with fade effect
        const tabId = this.getAttribute('data-tab');
        const activeContent = document.getElementById(tabId);
        
        if (activeContent) {
          setTimeout(() => {
            activeContent.classList.add('active');
            setTimeout(() => {
              activeContent.style.opacity = '1';
            }, 50);
          }, 300);
        }
      });
    });
  }
  
  // Parallax effect for hero section
  const initParallaxEffect = () => {
    const heroSection = document.querySelector('.hero');
    const heroImage = document.querySelector('.hero-image img');
    
    if (!heroSection || !heroImage) return;
    
    window.addEventListener('mousemove', (e) => {
      const mouseX = e.clientX / window.innerWidth;
      const mouseY = e.clientY / window.innerHeight;
      
      const moveX = mouseX * 20 - 10;
      const moveY = mouseY * 20 - 10;
      
      heroImage.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.05)`;
    });
  }
  
  // Add floating effect to cards
  const enhanceCards = () => {
    const cards = document.querySelectorAll('.service-card, .process-card, .portfolio-item, .testimonial-card');
    
    cards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const moveX = (x - centerX) / 30;
        const moveY = (y - centerY) / 30;
        
        card.style.transform = `translateY(-5px) perspective(1000px) rotateX(${moveY * -1}deg) rotateY(${moveX}deg)`;
      });
      
      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });
    });
  }
  
  // Typewriter effect for hero headline
  const initTypewriterEffect = () => {
    const heroHeadline = document.querySelector('.hero h1');
    if (!heroHeadline) return;
    
    // Store the original text
    const originalText = heroHeadline.innerHTML;
    
    // Check if prefers-reduced-motion is not enabled
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      heroHeadline.innerHTML = '';
      let charIndex = 0;
      
      const typeText = () => {
        if (charIndex < originalText.length) {
          heroHeadline.innerHTML += originalText.charAt(charIndex);
          charIndex++;
          setTimeout(typeText, 50);
        }
      }
      
      // Start typing after a short delay
      setTimeout(typeText, 500);
    }
  }
  
  // Initialize all enhancements
  initScrollAnimations();
  enhanceTabSystem();
  
  // Initialize only if prefers-reduced-motion is not enabled
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    initParticleEffect();
    initParallaxEffect();
    enhanceCards();
    // Uncomment if you want to enable the typewriter effect
    // initTypewriterEffect();
  }
  
  // Enhance hover states for interactive elements
  const buttons = document.querySelectorAll('.btn');
  buttons.forEach(button => {
    button.addEventListener('mouseover', () => {
      button.style.transform = 'translateY(-3px)';
    });
    
    button.addEventListener('mouseout', () => {
      button.style.transform = '';
    });
  });
  
  // Create a subtle hover effect for navigation links
  const navLinks = document.querySelectorAll('.nav-links a');
  navLinks.forEach(link => {
    link.addEventListener('mouseover', () => {
      link.style.transform = 'translateY(-2px) scale(1.05)';
    });
    
    link.addEventListener('mouseout', () => {
      link.style.transform = '';
    });
  });
  
  // Add scroll progress indicator
  const addScrollProgressIndicator = () => {
    const progressBar = document.createElement('div');
    progressBar.style.position = 'fixed';
    progressBar.style.top = '0';
    progressBar.style.left = '0';
    progressBar.style.height = '3px';
    progressBar.style.backgroundColor = 'var(--accent)';
    progressBar.style.zIndex = '1000';
    progressBar.style.width = '0%';
    progressBar.style.transition = 'width 0.1s';
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
      const scrollTotal = document.documentElement.scrollHeight - window.innerHeight;
      const scrollProgress = window.scrollY / scrollTotal;
      progressBar.style.width = `${scrollProgress * 100}%`;
    });
  }
  
  addScrollProgressIndicator();
});
