
document.addEventListener('DOMContentLoaded', function() {
  // Handle "View All Past Events" button functionality
  const viewAllPastEvents = document.querySelector('.past-events .btn-secondary');
  const pastEventCards = document.querySelectorAll('.past-event-card');
  
  // Default number of visible cards
  const defaultVisibleCards = 4;
  let allPastEventsVisible = false;
  
  if (viewAllPastEvents && pastEventCards && pastEventCards.length > defaultVisibleCards) {
    // Initially hide extra past events
    pastEventCards.forEach((card, index) => {
      if (index >= defaultVisibleCards) {
        card.style.display = 'none';
      }
    });
    
    // Toggle visibility on button click
    viewAllPastEvents.addEventListener('click', function(e) {
      e.preventDefault();
      
      if (!allPastEventsVisible) {
        // Show all cards
        pastEventCards.forEach(card => {
          card.style.display = '';
          // Add animation for newly visible cards
          if (card.style.display === 'none') {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            
            // Trigger animation after a tiny delay
            setTimeout(() => {
              card.style.opacity = '1';
              card.style.transform = 'translateY(0)';
            }, 50);
          }
        });
        
        // Update button text
        this.textContent = 'Show Less';
        allPastEventsVisible = true;
      } else {
        // Hide extra cards
        pastEventCards.forEach((card, index) => {
          if (index >= defaultVisibleCards) {
            card.style.display = 'none';
          }
        });
        
        // Update button text
        this.textContent = 'View All Past Events';
        allPastEventsVisible = false;
        
        // Scroll back to the past events section
        document.querySelector('.past-events').scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  }
  
  // Add smooth hover effect to event cards
  const eventCards = document.querySelectorAll('.event-card');
  if (eventCards && eventCards.length > 0) {
    eventCards.forEach(card => {
      card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px)';
        this.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
      });
      
      card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
      });
    });
  }
  
  // Enhanced animation for past event cards
  const pastEvents = document.querySelectorAll('.past-event-card');
  if (pastEvents && pastEvents.length > 0) {
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
      pastEvents.forEach((card, index) => {
        if (isInViewport(card) && !card.classList.contains('animated')) {
          card.classList.add('animated');
          
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, index * 150);
        }
      });
    }
    
    // Initialize cards with starting styles
    pastEvents.forEach(card => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(20px)';
      card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // Run animation on page load and scroll
    animateCardsInView();
    window.addEventListener('scroll', animateCardsInView);
  }
  
  // Calendar Placeholder Interactive Effect
  const calendarPlaceholder = document.querySelector('.calendar-placeholder');
  if (calendarPlaceholder) {
    const calendarIcon = calendarPlaceholder.querySelector('.fa-calendar-alt');
    
    if (calendarIcon) {
      // Add a subtle pulse animation to the calendar icon
      calendarIcon.style.animation = 'pulse 2s infinite';
      
      // Add the CSS for the pulse animation if not present
      if (!document.querySelector('#pulse-animation')) {
        const style = document.createElement('style');
        style.id = 'pulse-animation';
        style.textContent = `
          @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.1); }
            100% { transform: scale(1); }
          }
        `;
        document.head.appendChild(style);
      }
    }
  }
  
  // Newsletter form validation
  const newsletterForm = document.querySelector('.newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const emailInput = this.querySelector('input[type="email"]');
      if (emailInput && emailInput.value.trim() !== '') {
        // Show success message
        const successMessage = document.createElement('div');
        successMessage.className = 'form-success';
        successMessage.textContent = 'Thanks for subscribing! You will receive updates about our upcoming events.';
        successMessage.style.color = '#28a745';
        successMessage.style.marginTop = '10px';
        successMessage.style.padding = '10px';
        
        // Remove any existing messages
        const existingMessage = newsletterForm.querySelector('.form-success');
        if (existingMessage) {
          existingMessage.remove();
        }
        
        // Add the success message
        newsletterForm.appendChild(successMessage);
        
        // Reset the form
        emailInput.value = '';
      }
    });
  }
  
  // Initialize counter for upcoming events
  function initializeCountdowns() {
    const eventDates = document.querySelectorAll('.event-date');
    
    if (eventDates && eventDates.length > 0) {
      eventDates.forEach(dateElement => {
        const monthEl = dateElement.querySelector('.event-month');
        const dayEl = dateElement.querySelector('.event-day');
        
        if (monthEl && dayEl) {
          const month = monthEl.textContent;
          const day = parseInt(dayEl.textContent);
          
          // Create a date object for the event
          const monthIndex = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].indexOf(month);
          
          if (monthIndex !== -1) {
            const currentYear = new Date().getFullYear();
            const eventDate = new Date(currentYear, monthIndex, day);
            const currentDate = new Date();
            
            // Calculate days remaining
            const timeDiff = eventDate.getTime() - currentDate.getTime();
            const daysRemaining = Math.ceil(timeDiff / (1000 * 3600 * 24));
            
            // Only show countdown for future events
            if (daysRemaining > 0) {
              // Create countdown element
              const countdownEl = document.createElement('div');
              countdownEl.className = 'event-countdown';
              countdownEl.innerHTML = `<span>${daysRemaining}</span> days left`;
              countdownEl.style.fontSize = '0.8rem';
              countdownEl.style.marginTop = '5px';
              countdownEl.style.textAlign = 'center';
              countdownEl.style.backgroundColor = 'rgba(255,255,255,0.2)';
              countdownEl.style.borderRadius = '4px';
              countdownEl.style.padding = '2px 0';
              
              // Add to date element
              dateElement.appendChild(countdownEl);
            }
          }
        }
      });
    }
  }
  
  // Call the countdown function
  initializeCountdowns();
});
