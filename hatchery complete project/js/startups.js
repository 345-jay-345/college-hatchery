
document.addEventListener('DOMContentLoaded', function() {
    // Sample startup data (in a real scenario, this would come from a backend)
    const startups = [
      {
        id: 1,
        name: "EduSpark",
        logo: "https://placehold.co/150x60?text=EduSpark",
        image: "https://source.unsplash.com/random/600x400/?education,technology",
        category: "edtech",
        stage: "growth",
        program: "acceleration",
        description: "AI-powered adaptive learning platform for competitive exam preparation.",
        funding: "₹1.5 Cr",
        founded: "2020",
        team: 15
      },
      {
        id: 2,
        name: "MediConnect",
        logo: "https://placehold.co/150x60?text=MediConnect",
        image: "https://source.unsplash.com/random/600x400/?healthcare,telemedicine",
        category: "healthtech",
        stage: "early",
        program: "incubation",
        description: "Telemedicine platform connecting rural patients with urban specialists.",
        funding: "₹60 Lakhs",
        founded: "2021",
        team: 8
      },
      {
        id: 3,
        name: "GreenHarvest",
        logo: "https://placehold.co/150x60?text=GreenHarvest",
        image: "https://source.unsplash.com/random/600x400/?agriculture,technology",
        category: "agritech",
        stage: "scaling",
        program: "acceleration",
        description: "IoT-based smart farming solutions for optimizing water usage and increasing crop yields.",
        funding: "₹2 Cr",
        founded: "2019",
        team: 12
      },
      {
        id: 4,
        name: "FinEasy",
        logo: "https://placehold.co/150x60?text=FinEasy",
        image: "https://source.unsplash.com/random/600x400/?finance,app",
        category: "fintech",
        stage: "early",
        program: "incubation",
        description: "Personal finance management app with automated expense tracking and investment recommendations.",
        funding: "₹40 Lakhs",
        founded: "2022",
        team: 6
      },
      {
        id: 5,
        name: "EcoCart",
        logo: "https://placehold.co/150x60?text=EcoCart",
        image: "https://source.unsplash.com/random/600x400/?shopping,sustainable",
        category: "ecommerce",
        stage: "mvp",
        program: "incubation",
        description: "E-commerce platform for sustainable and eco-friendly products with carbon footprint tracking.",
        funding: "₹25 Lakhs",
        founded: "2022",
        team: 5
      },
      {
        id: 6,
        name: "AIAssist",
        logo: "https://placehold.co/150x60?text=AIAssist",
        image: "https://source.unsplash.com/random/600x400/?ai,robot",
        category: "ai",
        stage: "early",
        program: "incubation",
        description: "AI-powered virtual assistant for small businesses to automate customer service and admin tasks.",
        funding: "₹50 Lakhs",
        founded: "2021",
        team: 7
      },
      {
        id: 7,
        name: "SmartHome",
        logo: "https://placehold.co/150x60?text=SmartHome",
        image: "https://source.unsplash.com/random/600x400/?smarthome,iot",
        category: "iot",
        stage: "growth",
        program: "acceleration",
        description: "IoT platform for residential buildings with energy optimization and security features.",
        funding: "₹80 Lakhs",
        founded: "2020",
        team: 10
      },
      {
        id: 8,
        name: "ZeroWaste",
        logo: "https://placehold.co/150x60?text=ZeroWaste",
        image: "https://source.unsplash.com/random/600x400/?recycling,waste",
        category: "sustainability",
        stage: "mvp",
        program: "ideation",
        description: "Platform connecting businesses with surplus materials to recycling and upcycling companies.",
        funding: "₹15 Lakhs",
        founded: "2023",
        team: 4
      },
      {
        id: 9,
        name: "LearnLab",
        logo: "https://placehold.co/150x60?text=LearnLab",
        image: "https://source.unsplash.com/random/600x400/?learning,lab",
        category: "edtech",
        stage: "idea",
        program: "ideation",
        description: "Virtual science lab platform for schools with interactive experiments and 3D simulations.",
        funding: "₹10 Lakhs",
        founded: "2023",
        team: 3
      },
      {
        id: 10,
        name: "FitTech",
        logo: "https://placehold.co/150x60?text=FitTech",
        image: "https://source.unsplash.com/random/600x400/?fitness,tech",
        category: "healthtech",
        stage: "early",
        program: "incubation",
        description: "Personalized fitness and nutrition app with AI-powered coaching and progress tracking.",
        funding: "₹35 Lakhs",
        founded: "2022",
        team: 6
      },
      {
        id: 11,
        name: "RuralPay",
        logo: "https://placehold.co/150x60?text=RuralPay",
        image: "https://source.unsplash.com/random/600x400/?rural,payment",
        category: "fintech",
        stage: "growth",
        program: "acceleration",
        description: "Financial inclusion platform designed for rural India with simplified UPI and banking services.",
        funding: "₹1 Cr",
        founded: "2020",
        team: 9
      },
      {
        id: 12,
        name: "FarmDirect",
        logo: "https://placehold.co/150x60?text=FarmDirect",
        image: "https://source.unsplash.com/random/600x400/?farm,market",
        category: "agritech",
        stage: "mvp",
        program: "incubation",
        description: "Marketplace connecting farmers directly with restaurants and retailers, eliminating middlemen.",
        funding: "₹30 Lakhs",
        founded: "2022",
        team: 5
      }
    ];
  
    // DOM Elements
    const startupsGrid = document.getElementById('startupsGrid');
    const categoryFilter = document.getElementById('categoryFilter');
    const stageFilter = document.getElementById('stageFilter');
    const programFilter = document.getElementById('programFilter');
    const startupSearch = document.getElementById('startupSearch');
    const searchButton = document.getElementById('searchButton');
    const noResults = document.getElementById('noResults');
    const resetFilters = document.getElementById('resetFilters');
    const pagination = document.getElementById('pagination');
  
    // Current filter state
    let filters = {
      category: 'all',
      stage: 'all',
      program: 'all',
      search: ''
    };
  
    // Pagination settings
    const startupsPerPage = 6;
    let currentPage = 1;
  
    // Initialize the startup grid
    function initializeStartups() {
      if (startupsGrid) {
        displayStartups();
      }
      
      // Set up event listeners
      setupEventListeners();
      
      // Handle any direct links to specific startups
      handleDirectLinks();
    }
  
    // Set up event listeners for filters and search
    function setupEventListeners() {
      // Category filter
      if (categoryFilter) {
        categoryFilter.addEventListener('change', function() {
          filters.category = this.value;
          currentPage = 1;
          displayStartups();
        });
      }
      
      // Stage filter
      if (stageFilter) {
        stageFilter.addEventListener('change', function() {
          filters.stage = this.value;
          currentPage = 1;
          displayStartups();
        });
      }
      
      // Program filter
      if (programFilter) {
        programFilter.addEventListener('change', function() {
          filters.program = this.value;
          currentPage = 1;
          displayStartups();
        });
      }
      
      // Search input
      if (startupSearch) {
        startupSearch.addEventListener('keyup', function(event) {
          if (event.key === 'Enter') {
            filters.search = this.value.trim().toLowerCase();
            currentPage = 1;
            displayStartups();
          }
        });
      }
      
      // Search button
      if (searchButton) {
        searchButton.addEventListener('click', function() {
          if (startupSearch) {
            filters.search = startupSearch.value.trim().toLowerCase();
            currentPage = 1;
            displayStartups();
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
        category: 'all',
        stage: 'all',
        program: 'all',
        search: ''
      };
      
      currentPage = 1;
      
      // Reset DOM elements
      if (categoryFilter) categoryFilter.value = 'all';
      if (stageFilter) stageFilter.value = 'all';
      if (programFilter) programFilter.value = 'all';
      if (startupSearch) startupSearch.value = '';
      
      displayStartups();
    }
  
    // Filter startups based on current filters
    function filterStartups() {
      let filteredStartups = [...startups];
      
      // Apply category filter
      if (filters.category !== 'all') {
        filteredStartups = filteredStartups.filter(startup => startup.category === filters.category);
      }
      
      // Apply stage filter
      if (filters.stage !== 'all') {
        filteredStartups = filteredStartups.filter(startup => startup.stage === filters.stage);
      }
      
      // Apply program filter
      if (filters.program !== 'all') {
        filteredStartups = filteredStartups.filter(startup => startup.program === filters.program);
      }
      
      // Apply search filter
      if (filters.search !== '') {
        filteredStartups = filteredStartups.filter(startup => 
          startup.name.toLowerCase().includes(filters.search) || 
          startup.description.toLowerCase().includes(filters.search) ||
          startup.category.toLowerCase().includes(filters.search)
        );
      }
      
      return filteredStartups;
    }
  
    // Display startups in the grid
    function displayStartups() {
      if (!startupsGrid) return;
      
      const filteredStartups = filterStartups();
      
      // Calculate pagination
      const totalPages = Math.ceil(filteredStartups.length / startupsPerPage);
      const startIndex = (currentPage - 1) * startupsPerPage;
      const endIndex = Math.min(startIndex + startupsPerPage, filteredStartups.length);
      const paginatedStartups = filteredStartups.slice(startIndex, endIndex);
      
      // Clear the grid
      startupsGrid.innerHTML = '';
      
      // Show "No Results" if no startups match the filters
      if (filteredStartups.length === 0) {
        if (noResults) noResults.style.display = 'block';
      } else {
        if (noResults) noResults.style.display = 'none';
        
        // Generate startup cards
        paginatedStartups.forEach(startup => {
          const startupCard = document.createElement('div');
          startupCard.classList.add('startup-card');
          
          // Format the stage and program labels
          const stageLabel = formatStageLabel(startup.stage);
          const programLabel = formatProgramLabel(startup.program);
          
          startupCard.innerHTML = `
            <div class="startup-image">
              <img src="${startup.image}" alt="${startup.name}">
              <div class="startup-logo">
                <img src="${startup.logo}" alt="${startup.name} Logo">
              </div>
            </div>
            <div class="startup-content">
              <h3>${startup.name}</h3>
              <div class="startup-tags">
                <span class="tag category-tag">${formatCategoryLabel(startup.category)}</span>
                <span class="tag stage-tag">${stageLabel}</span>
                <span class="tag program-tag">${programLabel}</span>
              </div>
              <p class="startup-description">${startup.description}</p>
              <div class="startup-meta">
                <div class="meta-item">
                  <i class="fas fa-calendar-alt"></i>
                  <span>Founded ${startup.founded}</span>
                </div>
                <div class="meta-item">
                  <i class="fas fa-users"></i>
                  <span>${startup.team} Team Members</span>
                </div>
                <div class="meta-item">
                  <i class="fas fa-rupee-sign"></i>
                  <span>${startup.funding} Funding</span>
                </div>
              </div>
              <a href="#" class="startup-link">View Details <i class="fas fa-arrow-right"></i></a>
            </div>
          `;
          
          startupsGrid.appendChild(startupCard);
        });
      }
      
      // Update pagination
      updatePagination(totalPages);
    }
  
    // Update pagination controls
    function updatePagination(totalPages) {
      if (!pagination) return;
      
      pagination.innerHTML = '';
      
      if (totalPages <= 1) return;
      
      const paginationHTML = `
        <button class="pagination-prev ${currentPage === 1 ? 'disabled' : ''}" 
          ${currentPage === 1 ? 'disabled' : ''}>
          <i class="fas fa-chevron-left"></i> Previous
        </button>
        <div class="pagination-numbers">
          ${generatePageNumbers(totalPages)}
        </div>
        <button class="pagination-next ${currentPage === totalPages ? 'disabled' : ''}"
          ${currentPage === totalPages ? 'disabled' : ''}>
          Next <i class="fas fa-chevron-right"></i>
        </button>
      `;
      
      pagination.innerHTML = paginationHTML;
      
      // Add event listeners to pagination buttons
      const prevButton = pagination.querySelector('.pagination-prev');
      const nextButton = pagination.querySelector('.pagination-next');
      const pageNumbers = pagination.querySelectorAll('.pagination-number');
      
      if (prevButton) {
        prevButton.addEventListener('click', function() {
          if (currentPage > 1) {
            currentPage--;
            displayStartups();
          }
        });
      }
      
      if (nextButton) {
        nextButton.addEventListener('click', function() {
          if (currentPage < totalPages) {
            currentPage++;
            displayStartups();
          }
        });
      }
      
      if (pageNumbers) {
        pageNumbers.forEach(pageNumber => {
          pageNumber.addEventListener('click', function() {
            currentPage = parseInt(this.dataset.page);
            displayStartups();
          });
        });
      }
    }
  
    // Generate page number buttons
    function generatePageNumbers(totalPages) {
      let pageNumbersHTML = '';
      
      // Determine which page numbers to show
      let pagesToShow = [];
      
      if (totalPages <= 7) {
        // Show all pages if there are 7 or fewer
        for (let i = 1; i <= totalPages; i++) {
          pagesToShow.push(i);
        }
      } else {
        // Always show first and last page
        pagesToShow.push(1);
        
        // Show ellipsis and pages around current page
        if (currentPage <= 3) {
          pagesToShow.push(2, 3, 4, '...', totalPages);
        } else if (currentPage >= totalPages - 2) {
          pagesToShow.push('...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
        } else {
          pagesToShow.push('...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
        }
      }
      
      // Generate HTML for page numbers
      pagesToShow.forEach(page => {
        if (page === '...') {
          pageNumbersHTML += '<span class="pagination-dots">...</span>';
        } else {
          pageNumbersHTML += `
            <a href="#" class="pagination-number ${currentPage === page ? 'active' : ''}" 
              data-page="${page}">${page}</a>
          `;
        }
      });
      
      return pageNumbersHTML;
    }
  
    // Format category label
    function formatCategoryLabel(category) {
      const categoryMap = {
        'edtech': 'EdTech',
        'healthtech': 'HealthTech',
        'fintech': 'FinTech',
        'agritech': 'AgriTech',
        'ecommerce': 'E-Commerce',
        'ai': 'AI & ML',
        'iot': 'IoT',
        'sustainability': 'Sustainability',
        'other': 'Other'
      };
      
      return categoryMap[category] || category;
    }
  
    // Format stage label
    function formatStageLabel(stage) {
      const stageMap = {
        'idea': 'Idea Stage',
        'mvp': 'MVP',
        'early': 'Early Traction',
        'growth': 'Growth',
        'scaling': 'Scaling'
      };
      
      return stageMap[stage] || stage;
    }
  
    // Format program label
    function formatProgramLabel(program) {
      const programMap = {
        'ideation': 'Ideation',
        'incubation': 'Incubation',
        'acceleration': 'Acceleration'
      };
      
      return programMap[program] || program;
    }
  
    // Handle direct links to specific startups (e.g., from other pages)
    function handleDirectLinks() {
      const hash = window.location.hash;
      if (hash) {
        const startupId = hash.substring(1);
        const targetStartup = document.getElementById(startupId);
        
        if (targetStartup) {
          setTimeout(() => {
            targetStartup.scrollIntoView({ behavior: 'smooth' });
          }, 500);
        }
      }
    }
  
    // Initialize the page
    initializeStartups();
  });
  