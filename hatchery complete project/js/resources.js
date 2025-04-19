
document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const categoryTabs = document.querySelectorAll('.category-tab');
    const resourceCards = document.querySelectorAll('.resource-card');
    const resourceSearch = document.getElementById('resourceSearch');
    const searchButton = document.getElementById('searchButton');
    const noResults = document.getElementById('noResults');
    const resetFilters = document.getElementById('resetFilters');
    
    // Current filter state
    let activeCategory = 'all';
    let searchQuery = '';
    
    // Initialize the page
    function initializeResources() {
      // Set up event listeners
      setupEventListeners();
      
      // Handle any URL parameters or hash values
      handleUrlParameters();
    }
    
    // Set up event listeners
    function setupEventListeners() {
      // Category tabs
      if (categoryTabs && categoryTabs.length > 0) {
        categoryTabs.forEach(tab => {
          tab.addEventListener('click', function() {
            activeCategory = this.getAttribute('data-category');
            
            // Update active tab
            categoryTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            // Filter resources
            filterResources();
          });
        });
      }
      
      // Search input
      if (resourceSearch) {
        resourceSearch.addEventListener('keyup', function(event) {
          if (event.key === 'Enter') {
            searchQuery = this.value.trim().toLowerCase();
            filterResources();
          }
        });
      }
      
      // Search button
      if (searchButton) {
        searchButton.addEventListener('click', function() {
          if (resourceSearch) {
            searchQuery = resourceSearch.value.trim().toLowerCase();
            filterResources();
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
      activeCategory = 'all';
      searchQuery = '';
      
      // Reset DOM elements
      if (resourceSearch) resourceSearch.value = '';
      
      // Update active tab
      if (categoryTabs && categoryTabs.length > 0) {
        categoryTabs.forEach(tab => {
          if (tab.getAttribute('data-category') === 'all') {
            tab.classList.add('active');
          } else {
            tab.classList.remove('active');
          }
        });
      }
      
      // Show all resources
      filterResources();
    }
    
    // Filter resources based on active category and search query
    function filterResources() {
      if (!resourceCards || resourceCards.length === 0) return;
      
      let visibleCount = 0;
      
      resourceCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        let cardContent = card.textContent.toLowerCase();
        
        // Check if card matches the active category
        const matchesCategory = activeCategory === 'all' || cardCategory.includes(activeCategory);
        
        // Check if card matches the search query
        const matchesSearch = searchQuery === '' || cardContent.includes(searchQuery);
        
        // Show/hide card based on filters
        if (matchesCategory && matchesSearch) {
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
    
    // Handle URL parameters or hash values for direct links
    function handleUrlParameters() {
      // Check for hash in URL (e.g., #guides)
      const hash = window.location.hash;
      if (hash) {
        const category = hash.substring(1);
        const categoryTab = document.querySelector(`.category-tab[data-category="${category}"]`);
        
        if (categoryTab) {
          categoryTab.click();
        }
      }
      
      // Check for search query in URL parameters
      const urlParams = new URLSearchParams(window.location.search);
      const searchParam = urlParams.get('search');
      
      if (searchParam) {
        if (resourceSearch) {
          resourceSearch.value = searchParam;
          searchQuery = searchParam.toLowerCase();
          filterResources();
        }
      }
    }
    
    // Initialize the page
    initializeResources();
  });
  