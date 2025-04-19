
document.addEventListener('DOMContentLoaded', function() {
  // FAQ Category Filtering
  const categoryTabs = document.querySelectorAll('.category-tab');
  const faqCategories = document.querySelectorAll('.faq-category');
  const faqItems = document.querySelectorAll('.faq-item');
  const noResults = document.getElementById('noResults');
  
  // Handle category tab clicks
  if (categoryTabs && categoryTabs.length > 0) {
    categoryTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        // Remove active class from all tabs
        categoryTabs.forEach(t => t.classList.remove('active'));
        
        // Add active class to clicked tab
        tab.classList.add('active');
        
        // Get selected category
        const category = tab.getAttribute('data-category');
        
        // Filter FAQ items
        if (category) {
          filterFaqItems(category, '');
        }
      });
    });
    
    // Initialize the first category tab as active if none are active
    if (!document.querySelector('.category-tab.active') && categoryTabs.length > 0) {
      categoryTabs[0].click();
    }
  }
  
  // FAQ Accordion functionality
  if (faqItems && faqItems.length > 0) {
    faqItems.forEach(item => {
      const question = item.querySelector('.faq-question');
      
      if (question) {
        question.addEventListener('click', () => {
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
  
  // Search functionality
  const searchInput = document.getElementById('faqSearch');
  
  if (searchInput) {
    searchInput.addEventListener('input', function() {
      const searchQuery = this.value.trim().toLowerCase();
      const activeCategory = document.querySelector('.category-tab.active');
      const categoryValue = activeCategory ? activeCategory.getAttribute('data-category') : 'all';
      
      // Filter FAQ items based on search query and active category
      filterFaqItems(categoryValue, searchQuery);
    });
  }
  
  // Filter FAQ items based on category and search query
  function filterFaqItems(category, searchQuery) {
    let visibleItems = 0;
    
    // Show/hide FAQ categories based on active category
    if (faqCategories && faqCategories.length > 0) {
      if (category === 'all') {
        faqCategories.forEach(cat => {
          cat.style.display = '';
        });
      } else {
        faqCategories.forEach(cat => {
          if (cat.id === category) {
            cat.style.display = '';
          } else {
            cat.style.display = 'none';
          }
        });
      }
    }
    
    // Filter FAQ items based on search query
    if (faqItems && faqItems.length > 0) {
      faqItems.forEach(item => {
        const itemCategory = item.getAttribute('data-category');
        const questionElement = item.querySelector('.faq-question h3');
        const answerElement = item.querySelector('.faq-answer');
        
        if (!questionElement || !answerElement) return;
        
        const questionText = questionElement.textContent.toLowerCase();
        const answerText = answerElement.textContent.toLowerCase();
        const matchesCategory = category === 'all' || itemCategory === category;
        const matchesSearch = searchQuery === '' || 
                          questionText.includes(searchQuery) || 
                          answerText.includes(searchQuery);
        
        if (matchesCategory && matchesSearch) {
          item.style.display = '';
          visibleItems++;
        } else {
          item.style.display = 'none';
        }
      });
    }
    
    // Show/hide no results message
    if (noResults) {
      if (visibleItems === 0) {
        noResults.style.display = 'block';
      } else {
        noResults.style.display = 'none';
      }
    }
  }
  
  // Handle hash links in URL for direct access to specific categories
  function handleHashLinks() {
    const hash = window.location.hash;
    
    if (hash) {
      const categoryId = hash.substring(1);
      const categoryTab = document.querySelector(`.category-tab[data-category="${categoryId}"]`);
      
      if (categoryTab) {
        categoryTab.click();
        
        // Scroll to the category
        setTimeout(() => {
          const categoryElement = document.getElementById(categoryId);
          if (categoryElement) {
            const header = document.querySelector('.header');
            const headerHeight = header ? header.offsetHeight : 0;
            const tabsElement = document.querySelector('.faq-categories');
            const tabsHeight = tabsElement ? tabsElement.offsetHeight : 0;
            const targetPosition = categoryElement.getBoundingClientRect().top + window.pageYOffset - headerHeight - tabsHeight - 20;
            
            window.scrollTo({
              top: targetPosition,
              behavior: 'smooth'
            });
          }
        }, 300);
      }
    }
  }
  
  // Call handleHashLinks on page load
  handleHashLinks();
  
  // Also listen for hash changes
  window.addEventListener('hashchange', handleHashLinks);
});
