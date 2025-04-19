
document.addEventListener('DOMContentLoaded', function() {
  // Handle FAQ toggle functionality
  const faqItems = document.querySelectorAll('.faq-item');
  
  if (faqItems && faqItems.length > 0) {
    faqItems.forEach(item => {
      const question = item.querySelector('.faq-question');
      const answer = item.querySelector('.faq-answer');
      const toggle = item.querySelector('.faq-toggle');
      
      if (question && answer && toggle) {
        question.addEventListener('click', function() {
          // Toggle active class on the item
          const isActive = item.classList.contains('active');
          
          // Close all FAQ items
          faqItems.forEach(faq => {
            faq.classList.remove('active');
            const faqToggle = faq.querySelector('.faq-toggle');
            if (faqToggle) {
              faqToggle.innerHTML = '<i class="fas fa-plus"></i>';
            }
          });
          
          // If current item wasn't active, make it active
          if (!isActive) {
            item.classList.add('active');
            toggle.innerHTML = '<i class="fas fa-minus"></i>';
          }
        });
      }
    });
  }

  // Animation for partner logos
  const partnerLogos = document.querySelectorAll('.partner-logo');
  if (partnerLogos && partnerLogos.length > 0) {
    partnerLogos.forEach((logo, index) => {
      // Add staggered animation delay
      logo.style.opacity = '0';
      logo.style.transform = 'translateY(20px)';
      logo.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
      logo.style.transitionDelay = `${index * 0.1}s`;
      
      // Trigger animation after a short delay
      setTimeout(() => {
        logo.style.opacity = '1';
        logo.style.transform = 'translateY(0)';
      }, 300);
    });
  }

  // Team members hover effect enhancement
  const teamCards = document.querySelectorAll('.team-card');
  if (teamCards && teamCards.length > 0) {
    teamCards.forEach(card => {
      card.addEventListener('mouseenter', function() {
        const socialLinks = this.querySelectorAll('.team-social a');
        socialLinks.forEach((link, index) => {
          link.style.transitionDelay = `${index * 0.05}s`;
        });
      });
      
      card.addEventListener('mouseleave', function() {
        const socialLinks = this.querySelectorAll('.team-social a');
        socialLinks.forEach(link => {
          link.style.transitionDelay = '0s';
        });
      });
    });
  }

  // Smooth scroll for anchor links
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
      }
    });
  });
});
