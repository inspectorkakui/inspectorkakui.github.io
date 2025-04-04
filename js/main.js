// Torch AI - Main JavaScript
document.addEventListener('DOMContentLoaded', function() {
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
  
  // Services Tabs
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.service-tab-content');
  
  if (tabButtons.length && tabContents.length) {
    tabButtons.forEach(button => {
      button.addEventListener('click', function() {
        // Remove active class from all buttons and tab contents
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));
        
        // Add active class to the clicked button
        this.classList.add('active');
        
        // Show the corresponding tab content
        const tabId = this.getAttribute('data-tab');
        const activeContent = document.getElementById(tabId);
        if (activeContent) {
          activeContent.classList.add('active');
        }
      });
    });
  }
  
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
  
  // Run on load and resize
  adjustServiceShowcase();
  window.addEventListener('resize', adjustServiceShowcase);
});
