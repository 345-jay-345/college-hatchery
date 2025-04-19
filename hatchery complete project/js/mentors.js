
document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const expertiseFilter = document.getElementById('expertiseFilter');
    const industryFilter = document.getElementById('industryFilter');
    const mentorSearch = document.getElementById('mentorSearch');
    const searchButton = document.getElementById('searchButton');
    const mentorCards = document.querySelectorAll('.mentor-card');
    const noResults = document.getElementById('noResults');
    const resetFilters = document.getElementById('resetFilters');
    
    // Testimonial slider
    const testimonialSlides = document.querySelectorAll('.testimonial-slide');
    const prevButton = document.getElementById('prevTestimonial');
    const nextButton = document.getElementById('nextTestimonial');
    let currentSlide = 0;
    
    // Current filter state
    let filters = {
      expertise: 'all',
      industry: 'all',
      search: ''
    };
    
    // Initialize the page
    function initializeMentors() {
      // Set up filter event listeners
      setupFilterListeners();
      
      // Set up testimonial slider
      setupTestimonialSlider();
    }
    
    // Set up event listeners for filters
    function setupFilterListeners() {
      // Expertise filter
      if (expertiseFilter) {
        expertiseFilter.addEventListener('change', function() {
          filters.expertise = this.value;
          filterMentors();
        });
      }
      
      // Industry filter
      if (industryFilter) {
        industryFilter.addEventListener('change', function() {
          filters.industry = this.value;
          filterMentors();
        });
      }
      
      // Search input
      if (mentorSearch) {
        mentorSearch.addEventListener('keyup', function(event) {
          if (event.key === 'Enter') {
            filters.search = this.value.trim().toLowerCase();
            filterMentors();
          }
        });
      }
      
      // Search button
      if (searchButton) {
        searchButton.addEventListener('click', function() {
          if (mentorSearch) {
            filters.search = mentorSearch.value.trim().toLowerCase();
            filterMentors();
          }
        });
      }
      
      // Reset filters
      if (resetFilters) {
        resetFilters.addEventListener('click', function() {
          resetAllFilters();
        });
      }
    }
    
    // Reset all filters
    function resetAllFilters() {
      filters = {
        expertise: 'all',
        industry: 'all',
        search: ''
      };
      
      // Reset DOM elements
      if (expertiseFilter) expertiseFilter.value = 'all';
      if (industryFilter) industryFilter.value = 'all';
      if (mentorSearch) mentorSearch.value = '';
      
      filterMentors();
    }
    
    // Filter mentors based on active filters
    function filterMentors() {
      if (!mentorCards || mentorCards.length === 0) return;
      
      let visibleCount = 0;
      
      mentorCards.forEach(card => {
        const cardExpertise = card.getAttribute('data-expertise') || '';
        const cardIndustry = card.getAttribute('data-industry') || '';
        const cardContent = card.textContent.toLowerCase();
        
        // Check if card matches the expertise filter
        const matchesExpertise = filters.expertise === 'all' || cardExpertise.includes(filters.expertise);
        
        // Check if card matches the industry filter
        const matchesIndustry = filters.industry === 'all' || cardIndustry.includes(filters.industry);
        
        // Check if card matches the search query
        const matchesSearch = filters.search === '' || cardContent.includes(filters.search);
        
        // Show/hide card based on filters
        if (matchesExpertise && matchesIndustry && matchesSearch) {
          card.style.display = '';
          visibleCount++;
        } else {
          card.style.display = 'none';
        }
      });
      
      // Show/hide "No Results" message
      if (noResults) {
        if (visibleCount === 0) {
          noResults.style.display = 'block';
        } else {
          noResults.style.display = 'none';
        }
      }
    }
    
    // Set up testimonial slider functionality
    function setupTestimonialSlider() {
      if (!testimonialSlides || testimonialSlides.length === 0) return;
      
      // Show first slide by default
      showSlide(0);
      
      // Next button click
      if (nextButton) {
        nextButton.addEventListener('click', function() {
          showSlide(currentSlide + 1);
        });
      }
      
      // Previous button click
      if (prevButton) {
        prevButton.addEventListener('click', function() {
          showSlide(currentSlide - 1);
        });
      }
      
      // Auto-rotate slides if more than one exists
      if (testimonialSlides.length > 1) {
        setInterval(() => {
          showSlide(currentSlide + 1);
        }, 5000);
      }
    }
    
    // Show testimonial slide
    function showSlide(index) {
      if (!testimonialSlides || testimonialSlides.length === 0) return;
      
      // Hide all slides
      testimonialSlides.forEach(slide => slide.classList.remove('active'));
      
      // Calculate new index with wrapping
      currentSlide = (index + testimonialSlides.length) % testimonialSlides.length;
      
      // Show current slide
      testimonialSlides[currentSlide].classList.add('active');
    }
    
    // Initialize the page
    initializeMentors();
  });