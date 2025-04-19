
document.addEventListener('DOMContentLoaded', function() {
  // Program Tabs Functionality
  const tabButtons = document.querySelectorAll('.program-tab-button');
  const tabPanes = document.querySelectorAll('.program-tab-pane');
  
  if (tabButtons && tabButtons.length > 0 && tabPanes && tabPanes.length > 0) {
    tabButtons.forEach(button => {
      button.addEventListener('click', function() {
        // Get the tab to activate
        const tabToActivate = this.getAttribute('data-tab');
        
        // Remove active class from all buttons and panes
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabPanes.forEach(pane => pane.classList.remove('active'));
        
        // Add active class to current button and corresponding pane
        this.classList.add('active');
        document.getElementById(tabToActivate).classList.add('active');
      });
    });
  }
  
  // FAQ Toggle Functionality
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
  
  // Check for hash in URL to activate specific tab
  function handleUrlHash() {
    const hash = window.location.hash.substring(1);
    if (hash) {
      const tabButton = document.querySelector(`.program-tab-button[data-tab="${hash}"]`);
      if (tabButton) {
        tabButton.click();
      }
    }
  }
  
  // Handle hash on page load
  handleUrlHash();
  
  // Handle hash change
  window.addEventListener('hashchange', handleUrlHash);
  
  // Animation for benefit cards
  const benefitCards = document.querySelectorAll('.benefit-card');
  if (benefitCards && benefitCards.length > 0) {
    // Function to check if element is in viewport
    function isInViewport(element) {
      const rect = element.getBoundingClientRect();
      return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
      );
    }
    
    // Function to animate cards when they come into view
    function animateCardsInView() {
      benefitCards.forEach((card, index) => {
        if (isInViewport(card)) {
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, index * 100);
        }
      });
    }
    
    // Initialize cards with starting styles
    benefitCards.forEach(card => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(20px)';
      card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // Run animation on page load and scroll
    animateCardsInView();
    window.addEventListener('scroll', animateCardsInView);
  }
  
  // Enhance the program tab transitions
  const programTabPanes = document.querySelectorAll('.program-tab-pane');
  if (programTabPanes && programTabPanes.length > 0) {
    programTabPanes.forEach(pane => {
      const image = pane.querySelector('.program-tab-image');
      const details = pane.querySelector('.program-tab-details');
      
      if (image && details) {
        // Add transition styles
        image.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        details.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        
        // Add observer to animate when visible
        const observer = new IntersectionObserver(entries => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              image.style.opacity = '1';
              image.style.transform = 'translateX(0)';
              
              setTimeout(() => {
                details.style.opacity = '1';
                details.style.transform = 'translateX(0)';
              }, 200);
            } else {
              image.style.opacity = '0.5';
              image.style.transform = 'translateX(-20px)';
              details.style.opacity = '0.5';
              details.style.transform = 'translateX(20px)';
            }
          });
        }, { threshold: 0.3 });
        
        observer.observe(pane);
      }
    });
  }
});
