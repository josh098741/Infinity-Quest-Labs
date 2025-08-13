// Navigation Include JavaScript
// This file helps you easily include navigation components in any page

function includeNavigation() {
    // Create the navigation HTML structure
    const navigationHTML = `
        <!-- Side Navigational Tab -->
        <div class="navigational-tab">
            <div class="menu-toggle">
                <i class="fa-solid fa-bars"></i>
            </div>

            <div class="menu">
                <!-- Search Box -->
                <div class="search-box">
                    <i class="fa-solid fa-magnifying-glass"></i>
                    <input type="search" placeholder="Search">
                </div>

                <!-- Navigation Items -->
                <ul class="items">
                    <li class="item" data-page="dashboard.html">
                        <a href="dashboard.html"><i class="fa-solid fa-desktop"></i>DashBoard</a>
                    </li>
                    <li class="item" data-page="Student-Hub.html">
                        <a href="Student-Hub.html"><i class="fa-solid fa-building-columns"></i>Student Hub</a>
                    </li>
                    <li class="item" data-page="Archives.html">
                        <a href="Archives.html"><i class="fa-solid fa-layer-group"></i>Archives</a>
                    </li>
                    <li class="item" data-page="Marketplace.html">
                        <a href="Marketplace.html"><i class="fa-solid fa-cart-shopping"></i>Marketplace</a>
                    </li>
                    <li class="item" data-page="wallet.html">
                        <a href="wallet.html"><i class="fa-solid fa-wallet"></i>Wallet</a>
                    </li>
                </ul>
            </div>
        </div>

        <!-- Header -->
        <div class="header-container">
            <nav class="header-content">
                <!-- Logo -->
                <div class="logo-section">
                    <img src="images/iql2.png" style="width: 70px;" alt="iqls-logo">
                    <h1>IQL</h1>
                </div>

                <!-- Central Navigation -->
                <div class="central-container">
                    <ul class="headers-container">
                        <li class="header-item"><a href="Home.html">Home</a></li>
                        <li class="header-item"><a href="#introduction">Explore</a></li>
                        <li class="header-item"><a href="contacts.html">Contact Us</a></li>
                        <li class="header-item">Premium</li>
                    </ul>
                </div>

                <!-- Profile Area -->
                <div class="profile-area">
                    <i class="fa-solid fa-bell"></i>
                    <i class="fa-solid fa-envelope"></i>
                    <img src="images/josh.jpg" alt="photograph">
                    <i class="fa-solid fa-caret-down"></i>
                </div>
            </nav>
        </div>
    `;

    // Insert the navigation HTML at the beginning of body
    document.body.insertAdjacentHTML('afterbegin', navigationHTML);

    // Add the navigation functionality
    initializeNavigation();
    
    // Set active state based on current page
    setActiveNavigationItem();
}

function initializeNavigation() {
    const menuIcon = document.querySelector(".fa-bars");
    const navTab = document.querySelector(".navigational-tab");

    if (menuIcon && navTab) {
        // Function to open the navigation sidebar
        function openNavigation() {
            if (!navTab.classList.contains("open")) {
                navTab.classList.add("open");
                menuIcon.classList.remove("fa-bars");
                menuIcon.classList.add("fa-xmark");
            }
        }

        // Function to close the navigation sidebar
        function closeNavigation() {
            if (navTab.classList.contains("open")) {
                navTab.classList.remove("open");
                menuIcon.classList.remove("fa-xmark");
                menuIcon.classList.add("fa-bars");
            }
        }

        // Function to toggle the navigation sidebar
        function toggleNavigation() {
            navTab.classList.toggle("open");

            if (navTab.classList.contains("open")) {
                menuIcon.classList.remove("fa-bars");
                menuIcon.classList.add("fa-xmark");
            } else {
                menuIcon.classList.remove("fa-xmark");
                menuIcon.classList.add("fa-bars");
            }
        }

        // Menu toggle button click handler
        menuIcon.addEventListener("click", function () {
            toggleNavigation();
        });

        // Add click event listeners to navigation item icons
        setTimeout(function() {
            const navItems = document.querySelectorAll('.navigational-tab .items .item a');
            
            navItems.forEach(function(item) {
                const icon = item.querySelector('i');
                if (icon) {
                    // Add click handler to the icon specifically
                    icon.addEventListener('click', function(e) {
                        e.preventDefault(); // Prevent immediate navigation
                        
                        // Open the navigation sidebar
                        openNavigation();
                        
                        // Get the parent link's href
                        const href = item.getAttribute('href');
                        
                        // Navigate to the link after a short delay to show the opened nav
                        if (href && href !== '' && href !== '#') {
                            setTimeout(function() {
                                window.location.href = href;
                            }, 300); // 300ms delay to show the animation
                        }
                    });
                    
                    // Add hover effect to show it's clickable
                    icon.style.cursor = 'pointer';
                    icon.style.transition = 'transform 0.2s ease';
                    
                    icon.addEventListener('mouseenter', function() {
                        this.style.transform = 'scale(1.1)';
                    });
                    
                    icon.addEventListener('mouseleave', function() {
                        this.style.transform = 'scale(1)';
                    });
                }
                
                // Also add click handler to the entire nav item for normal navigation
                item.addEventListener('click', function(e) {
                    // If the click is on the icon, let the icon handler deal with it
                    if (e.target.tagName === 'I') {
                        return;
                    }
                    
                    // For text clicks, just navigate normally
                    const href = this.getAttribute('href');
                    if (href && href !== '' && href !== '#') {
                        // Brief delay to allow any animations
                        setTimeout(function() {
                            window.location.href = href;
                        }, 100);
                    }
                });
            });
        }, 100);
        
        // Close sidebar when clicking outside on mobile
        document.addEventListener('click', function(event) {
            const isClickInsideNav = navTab.contains(event.target);
            const isClickInsideToggle = document.querySelector('.menu-toggle').contains(event.target);
            
            if (window.innerWidth <= 768 && navTab.classList.contains('open') && 
                !isClickInsideNav && !isClickInsideToggle) {
                closeNavigation();
            }
        });

        // Add keyboard support - press 'Escape' to close navigation
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape') {
                closeNavigation();
            }
        });

        // Highlight active navigation item based on current page
        function highlightActiveNavItem() {
            const currentPage = window.location.pathname.split('/').pop();
            const navItems = document.querySelectorAll('.navigational-tab .items .item a');
            
            navItems.forEach(function(item) {
                const href = item.getAttribute('href');
                if (href === currentPage) {
                    item.parentElement.classList.add('active');
                } else {
                    item.parentElement.classList.remove('active');
                }
            });
        }

        // Call highlight function
        setTimeout(highlightActiveNavItem, 200);
    }
}

function setActiveNavigationItem() {
    // Get the current page filename
    const currentPage = window.location.pathname.split('/').pop();
    
    // Remove active class from all items
    const allItems = document.querySelectorAll('.navigational-tab .menu .items .item');
    allItems.forEach(item => item.classList.remove('active'));
    
    // Find and set active item based on current page
    let activeItem = null;
    
    // Direct filename match
    activeItem = document.querySelector(`[data-page="${currentPage}"]`);
    
    // If no direct match, try alternative matches based on page content or title
    if (!activeItem) {
        const pageTitle = document.title.toLowerCase();
        
        if (pageTitle.includes('dashboard')) {
            activeItem = document.querySelector('[data-page="dashboard.html"]');
        } else if (pageTitle.includes('student') || pageTitle.includes('hub')) {
            activeItem = document.querySelector('[data-page="Student-Hub.html"]');
        } else if (pageTitle.includes('marketplace') || pageTitle.includes('market')) {
            activeItem = document.querySelector('[data-page="Marketplace.html"]');
        } else if (pageTitle.includes('archive')) {
            activeItem = document.querySelector('[data-page="archives"]');
        } else if (pageTitle.includes('setting')) {
            activeItem = document.querySelector('[data-page="settings"]');
        }
    }
    
    // Apply active class if item found
    if (activeItem) {
        activeItem.classList.add('active');
    }
}

// Function to manually set active navigation item (for use in individual pages)
function setActiveNavigation(pageName) {
    // Remove active class from all items
    const allItems = document.querySelectorAll('.navigational-tab .menu .items .item');
    allItems.forEach(item => item.classList.remove('active'));
    
    // Set active class on specified page
    const activeItem = document.querySelector(`[data-page="${pageName}"]`);
    if (activeItem) {
        activeItem.classList.add('active');
    }
}

// Auto-include navigation when the page loads
document.addEventListener('DOMContentLoaded', includeNavigation);
