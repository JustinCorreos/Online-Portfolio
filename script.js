// Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu on link click
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Scroll to Top Button
const scrollToTopBtn = document.createElement('button');
scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
scrollToTopBtn.className = 'scroll-to-top';
document.body.appendChild(scrollToTopBtn);

const scrollToTop = () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
};

scrollToTopBtn.addEventListener('click', scrollToTop);

// Show/hide scroll to top button
window.addEventListener('scroll', () => {
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollPosition > 300) {
        scrollToTopBtn.style.display = 'block';
    } else {
        scrollToTopBtn.style.display = 'none';
    }
    
    // Add scroll effect to navbar
    const navbar = document.querySelector('.navbar');
    if (scrollPosition > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Project Filtering
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to clicked button
        button.classList.add('active');
        
        const filter = button.getAttribute('data-filter');
        
        // Hide all project cards
        projectCards.forEach(card => {
            card.style.display = 'none';
        });
        
        // Show matching project cards
        if (filter === 'all') {
            projectCards.forEach(card => {
                card.style.display = 'block';
            });
        } else {
            projectCards.forEach(card => {
                if (card.classList.contains(filter)) {
                    card.style.display = 'block';
                }
            });
        }
    });
});

// Form Validation and Submission
const contactForm = document.querySelector('.contact-form');
const formFields = contactForm.querySelectorAll('input, textarea');

// Form validation
const validateForm = () => {
    let isValid = true;
    
    formFields.forEach(field => {
        if (field.value.trim() === '') {
            showError(field, 'This field is required');
            isValid = false;
        } else {
            clearError(field);
        }
    });
    
    return isValid;
};

// Show error message
const showError = (field, message) => {
    const errorElement = field.parentElement.querySelector('.error-message');
    
    if (!errorElement) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.style.color = '#e74c3c';
        errorDiv.style.fontSize = '0.875rem';
        errorDiv.style.marginTop = '5px';
        errorDiv.style.fontWeight = '500';
        field.parentElement.appendChild(errorDiv);
    }
    
    field.parentElement.querySelector('.error-message').textContent = message;
    field.style.borderColor = '#e74c3c';
};

// Clear error message
const clearError = (field) => {
    const errorElement = field.parentElement.querySelector('.error-message');
    if (errorElement) {
        errorElement.remove();
    }
    field.style.borderColor = '#ecf0f1';
};

// Real-time validation
formFields.forEach(field => {
    field.addEventListener('blur', () => {
        if (field.value.trim() !== '') {
            clearError(field);
        }
    });
});

// Form submission
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    if (validateForm()) {
        // Simulate form submission
        const formData = new FormData(contactForm);
        const data = {};
        
        formData.forEach((value, key) => {
            data[key] = value;
        });
        
        // Show success message
        showSuccessMessage();
        
        // Reset form
        contactForm.reset();
        
        // Clear any remaining error messages
        formFields.forEach(field => clearError(field));
    }
});

// Show success message
const showSuccessMessage = () => {
    const successMessage = document.createElement('div');
    successMessage.className = 'success-message';
    successMessage.style.cssText = `
        background: #27ae60;
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        text-align: center;
        margin-bottom: 20px;
        font-weight: 500;
        box-shadow: 0 4px 15px rgba(39, 174, 96, 0.3);
    `;
    successMessage.textContent = 'Message sent successfully! I will get back to you soon.';
    
    contactForm.insertBefore(successMessage, contactForm.firstChild);
    
    // Remove success message after 5 seconds
    setTimeout(() => {
        successMessage.remove();
    }, 5000);
};

// Animate sections on scroll
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.animate');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
};

// Initial animation
document.addEventListener('DOMContentLoaded', () => {
    const elements = document.querySelectorAll('.animate');
    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'all 0.6s ease';
    });
    
    // Trigger animation on scroll
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll();
});

// Add hover effects for project cards
projectCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-5px)';
        card.style.boxShadow = '0 15px 35px rgba(0,0,0,0.15)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
        card.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
    });
});

// Add typing effect for hero name
const heroName = document.querySelector('.name');
const originalText = heroName.textContent;
const typingSpeed = 100;
let charIndex = 0;

const typeWriter = () => {
    if (charIndex < originalText.length) {
        heroName.textContent = originalText.substring(0, charIndex + 1);
        charIndex++;
        setTimeout(typeWriter, typingSpeed);
    }
};

// Trigger typing effect when hero section is visible
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            heroName.textContent = '';
            charIndex = 0;
            typeWriter();
            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.5
});

if (heroName) {
    observer.observe(heroName.parentElement.parentElement);
}

// Add scroll reveal for skills
const skillsGrid = document.querySelector('.skills-grid');
if (skillsGrid) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillItems = entry.target.querySelectorAll('.skill-item');
                skillItems.forEach((item, index) => {
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, index * 200);
                });
            }
        });
    }, {
        threshold: 0.3
    });
    
    observer.observe(skillsGrid);
}

// Add smooth loading for images
const images = document.querySelectorAll('img');
images.forEach(img => {
    img.style.opacity = '0';
    img.style.transition = 'opacity 0.5s ease';
    
    img.addEventListener('load', () => {
        img.style.opacity = '1';
    });
    
    // Show placeholder while loading
    img.style.background = '#f8f9fa';
    img.style.backgroundSize = 'contain';
    img.style.backgroundPosition = 'center';
    img.style.backgroundRepeat = 'no-repeat';
});

// Add dark mode toggle
const darkModeToggle = document.createElement('button');
darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
darkModeToggle.className = 'dark-mode-toggle';
darkModeToggle.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: rgba(0,0,0,0.8);
    color: white;
    border: none;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.2rem;
    z-index: 1000;
    transition: all 0.3s ease;
    box-shadow: 0 4px 15px rgba(0,0,0,0.3);
`;

document.body.appendChild(darkModeToggle);

const enableDarkMode = () => {
    document.body.classList.add('dark-mode');
    localStorage.setItem('dark-mode', 'enabled');
    darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
};

const disableDarkMode = () => {
    document.body.classList.remove('dark-mode');
    localStorage.setItem('dark-mode', 'disabled');
    darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
};

// Check for saved preference
const savedMode = localStorage.getItem('dark-mode');
if (savedMode === 'enabled') {
    enableDarkMode();
} else {
    disableDarkMode();
}

darkModeToggle.addEventListener('click', () => {
    if (document.body.classList.contains('dark-mode')) {
        disableDarkMode();
    } else {
        enableDarkMode();
    }
});

// Add dark mode styles
const darkModeStyles = `
    .dark-mode {
        background: #1a1a1a !important;
        color: #f0f0f0 !important;
    }
    
    .dark-mode .hero {
        background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
    }
    
    .dark-mode .hero-text h1,
    .dark-mode .hero-text h2,
    .dark-mode .hero-text p {
        color: #ecf0f1 !important;
    }
    
    .dark-mode .navbar {
        background: rgba(0,0,0,0.95) !important;
        backdrop-filter: blur(10px);
    }
    
    .dark-mode .nav-link {
        color: #ecf0f1 !important;
    }
    
    .dark-mode .nav-link:hover::after {
        background: #3498db !important;
    }
    
    .dark-mode .about,
    .dark-mode .projects,
    .dark-mode .contact {
        background: #2c3e50 !important;
    }
    
    .dark-mode .section-header h2,
    .dark-mode .section-header p {
        color: #ecf0f1 !important;
    }
    
    .dark-mode .btn-primary,
    .dark-mode .btn-secondary {
        color: #ecf0f1 !important;
    }
    
    .dark-mode .btn-primary:hover {
        background: #ecf0f1 !important;
        color: #2c3e50 !important;
    }
    
    .dark-mode .project-card {
        background: #34495e !important;
        color: #ecf0f1 !important;
    }
    
    .dark-mode .project-overlay {
        background: linear-gradient(135deg, #3498db 0%, #2980b9 100%) !important;
    }
    
    .dark-mode .project-tech i {
        color: #ecf0f1 !important;
    }
    
    .dark-mode .contact-form input,
    .dark-mode .contact-form textarea {
        background: #34495e !important;
        border-color: #555 !important;
        color: #ecf0f1 !important;
    }
    
    .dark-mode .contact-form input:focus,
    .dark-mode .contact-form textarea:focus {
        border-color: #3498db !important;
    }
`;

const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = darkModeStyles;
document.head.appendChild(styleSheet);