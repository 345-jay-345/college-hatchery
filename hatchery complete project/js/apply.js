
document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const programButtons = document.querySelectorAll('.select-program-btn');
    const programCards = document.querySelectorAll('.program-card');
    const applicationForm = document.getElementById('applicationForm');
    const selectedProgramText = document.getElementById('selectedProgram');
    const programTypeField = document.getElementById('programType');
    const applicationSuccess = document.getElementById('applicationSuccess');
    const faqItems = document.querySelectorAll('.faq-item');
    const industrySelect = document.getElementById('industry');
    const otherIndustryField = document.getElementById('otherIndustryField');
    
    // Initialize the application page
    function initializeApplyPage() {
      // Set up program selection
      setupProgramSelection();
      
      // Set up form submission
      setupFormSubmission();
      
      // Set up FAQ accordion functionality
      setupFaqAccordion();
      
      // Set up conditional fields
      setupConditionalFields();
      
      // Check URL parameters for pre-selected program
      checkUrlParameters();
    }
    
    // Set up program selection functionality
    function setupProgramSelection() {
      if (!programButtons || programButtons.length === 0) return;
      
      programButtons.forEach(button => {
        button.addEventListener('click', function() {
          const programType = this.getAttribute('data-program');
          
          // Update selected program
          if (selectedProgramText) {
            selectedProgramText.textContent = getProgramName(programType);
          }
          
          // Update hidden field value
          if (programTypeField) {
            programTypeField.value = programType;
          }
          
          // Update active program card
          if (programCards && programCards.length > 0) {
            programCards.forEach(card => {
              card.classList.remove('active');
            });
            
            const selectedCard = document.getElementById(`${programType}Card`);
            if (selectedCard) {
              selectedCard.classList.add('active');
            }
          }
          
          // Scroll to application form
          if (applicationForm) {
            applicationForm.scrollIntoView({ behavior: 'smooth' });
          }
        });
      });
    }
    
    // Get program name from program type
    function getProgramName(programType) {
      switch(programType) {
        case 'ideation':
          return 'Ideation Program';
        case 'incubation':
          return 'Incubation Program';
        case 'acceleration':
          return 'Acceleration Program';
        default:
          return 'your selected program';
      }
    }
    
    // Set up form submission
    function setupFormSubmission() {
      const applicationForm = document.getElementById('startupApplicationForm');
      
      if (applicationForm) {
        applicationForm.addEventListener('submit', function(event) {
          // Prevent default form submission
          event.preventDefault();
          
          // Normally here you would send form data to the server
          // For demo purposes, we'll just show success message
          
          // Hide the form
          this.style.display = 'none';
          
          // Show success message
          if (applicationSuccess) {
            applicationSuccess.style.display = 'block';
            applicationSuccess.scrollIntoView({ behavior: 'smooth' });
          }
        });
      }
    }
    
    // Set up FAQ accordion functionality
    function setupFaqAccordion() {
      if (!faqItems || faqItems.length === 0) return;
      
      faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        if (question) {
          question.addEventListener('click', function() {
            // Toggle active class on the clicked item
            item.classList.toggle('active');
            
            // Update icon
            const icon = question.querySelector('.faq-toggle i');
            if (icon) {
              if (item.classList.contains('active')) {
                icon.className = 'fas fa-minus';
              } else {
                icon.className = 'fas fa-plus';
              }
            }
          });
        }
      });
      
      // Initialize the first FAQ item as active
      if (faqItems.length > 0) {
        faqItems[0].classList.add('active');
        const firstIcon = faqItems[0].querySelector('.faq-toggle i');
        if (firstIcon) {
          firstIcon.className = 'fas fa-minus';
        }
      }
    }
    
    // Set up conditional fields
    function setupConditionalFields() {
      // Show "Other Industry" field when "Other" is selected
      if (industrySelect) {
        industrySelect.addEventListener('change', function() {
          if (this.value === 'other' && otherIndustryField) {
            otherIndustryField.style.display = 'block';
          } else if (otherIndustryField) {
            otherIndustryField.style.display = 'none';
          }
        });
      }
    }
    
    // Check URL parameters for pre-selected program
    function checkUrlParameters() {
      const urlParams = new URLSearchParams(window.location.search);
      const programParam = urlParams.get('program');
      
      if (programParam) {
        const programButton = document.querySelector(`.select-program-btn[data-program="${programParam}"]`);
        
        if (programButton) {
          // Simulate a click on the button
          programButton.click();
        }
      }
    }
    
    // Initialize the page
    initializeApplyPage();
  });
  