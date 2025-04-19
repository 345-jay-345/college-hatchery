
document.addEventListener('DOMContentLoaded', function() {
  // Mobile Menu Toggle
  const mobileMenuToggle = document.getElementById('mobileMenuToggle');
  const navLinks = document.getElementById('navLinks');
  
  if (mobileMenuToggle && navLinks) {
    mobileMenuToggle.addEventListener('click', function() {
      navLinks.classList.toggle('active');
      
      // Toggle menu icon
      const bars = mobileMenuToggle.querySelectorAll('.bar');
      if (bars && bars.length > 0) {
        bars.forEach(bar => bar.classList.toggle('open'));
      }
    });
  }
  
  // Handle 404 Page Current Path
  const currentPathElement = document.getElementById('currentPath');
  if (currentPathElement) {
    currentPathElement.textContent = window.location.pathname;
  }
  
  // Sticky Header on Scroll
  const header = document.querySelector('.header');
  
  if (header) {
    window.addEventListener('scroll', function() {
      if (window.scrollY > 50) {
        header.classList.add('sticky');
      } else {
        header.classList.remove('sticky');
      }
    });
  }
  
  // Smooth Scroll for Anchor Links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      
      // Skip for links with # only or if target doesn't exist
      if (targetId === '#' || !document.querySelector(targetId)) {
        return;
      }
      
      e.preventDefault();
      
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
        
        // If mobile menu is open, close it
        if (navLinks && navLinks.classList.contains('active')) {
          navLinks.classList.remove('active');
          
          // Reset menu icon
          if (mobileMenuToggle) {
            const bars = mobileMenuToggle.querySelectorAll('.bar');
            if (bars && bars.length > 0) {
              bars.forEach(bar => bar.classList.remove('open'));
            }
          }
        }
      }
    });
  });
  
  // Set active nav link based on current page
  const setActiveNavLink = function() {
    const currentPage = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
      const linkPath = link.getAttribute('href');
      
      // Remove any active classes first
      link.classList.remove('active');
      
      // Check if the current page matches the link path
      if (linkPath && (
          currentPage === linkPath || 
          (currentPage.includes(linkPath) && linkPath !== '/' && linkPath !== '/index.html') ||
          (currentPage === '/' || currentPage === '/index.html' || currentPage === '') && (linkPath === 'index.html' || linkPath === '/'))) {
        link.classList.add('active');
      }
    });
  };
  
  // Call setActiveNavLink on page load
  setActiveNavLink();
  
  // Form Validation Enhancement
  document.querySelectorAll('form').forEach(form => {
    if (!form) return;
    
    const requiredInputs = form.querySelectorAll('[required]');
    
    requiredInputs.forEach(input => {
      // Add visual indicator for required fields
      const label = input.previousElementSibling;
      if (label && label.tagName === 'LABEL') {
        if (!label.textContent.includes('*')) {
          label.textContent += ' *';
        }
      }
      
      // Custom validation styling
      input.addEventListener('invalid', function() {
        this.classList.add('input-error');
      });
      
      input.addEventListener('input', function() {
        this.classList.remove('input-error');
      });
    });
  });
  
  // Add CSS for error styling if not already in stylesheet
  if (!document.querySelector('#error-styles')) {
    const style = document.createElement('style');
    style.id = 'error-styles';
    style.textContent = `
      .input-error {
        border-color: var(--danger-color) !important;
      }
    `;
    document.head.appendChild(style);
  }
  
  // Initialize animations for elements when they come into view
  const animateOnScroll = function() {
    const elements = document.querySelectorAll('.animate-on-scroll');
    
    elements.forEach(element => {
      const elementPosition = element.getBoundingClientRect().top;
      const screenPosition = window.innerHeight / 1.2;
      
      if (elementPosition < screenPosition) {
        element.classList.add('animated');
      }
    });
  };
  
  // Add CSS for animations if not already in stylesheet
  if (!document.querySelector('#animation-styles')) {
    const style = document.createElement('style');
    style.id = 'animation-styles';
    style.textContent = `
      .animate-on-scroll {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.5s ease, transform 0.5s ease;
      }
      
      .animate-on-scroll.animated {
        opacity: 1;
        transform: translateY(0);
      }
    `;
    document.head.appendChild(style);
  }
  
  // Add animation class to common elements
  const animationElements = [
    '.section-header',
    '.cta-content',
    '.featured-startup',
    '.startup-card',
    '.program-card',
    '.benefit-card',
    '.story-card',
    '.contact-card',
    '.criteria-card',
    '.timeline-item'
  ];
  
  animationElements.forEach(selector => {
    document.querySelectorAll(selector).forEach((element, index) => {
      if (element) {
        element.classList.add('animate-on-scroll');
        // Add delay for staggered animation
        element.style.transitionDelay = `${index * 0.1}s`;
      }
    });
  });
  
  // Run animation check on scroll
  window.addEventListener('scroll', animateOnScroll);
  
  // Run once on page load
  animateOnScroll();
});
