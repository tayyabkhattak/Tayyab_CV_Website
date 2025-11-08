// ===========================
// Theme Switcher (Optional)
// ===========================
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.querySelector('.theme-icon');

if (themeToggle && themeIcon) {
    const themes = ['light', 'dark', 'professional'];
    let currentThemeIndex = 0;

    // Load saved theme
    const savedTheme = localStorage.getItem('theme') || 'light';
    const savedThemeIndex = themes.indexOf(savedTheme);
    currentThemeIndex = savedThemeIndex !== -1 ? savedThemeIndex : 0;
    document.documentElement.setAttribute('data-theme', themes[currentThemeIndex]);
    updateThemeIcon();

    // Theme toggle functionality
    themeToggle.addEventListener('click', () => {
        themeToggle.classList.add('rotating');
        
        setTimeout(() => {
            currentThemeIndex = (currentThemeIndex + 1) % themes.length;
            const newTheme = themes[currentThemeIndex];
            
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateThemeIcon();
            
            themeToggle.classList.remove('rotating');
        }, 150);
    });

    function updateThemeIcon() {
        const icons = {
            light: '🌙',
            dark: '🌟',
            professional: '☀️'
        };
        themeIcon.textContent = icons[themes[currentThemeIndex]];
    }
}

// ===========================
// Navigation & Scroll Effects
// ===========================
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const scrollTopBtn = document.getElementById('scroll-top');

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
    // Initialize skill bar fills
    const skillFills = document.querySelectorAll('.skill-fill');
    skillFills.forEach(fill => {
        const width = fill.getAttribute('data-width');
        fill.style.setProperty('--width', width);
    });
    
    // Start counter animation immediately
    setTimeout(() => {
        checkCounters();
    }, 100);
});

// Sticky navbar on scroll
window.addEventListener('scroll', () => {
    if (navbar && window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else if (navbar) {
        navbar.classList.remove('scrolled');
    }

    // Show/hide scroll to top button
    if (scrollTopBtn && window.scrollY > 300) {
        scrollTopBtn.classList.add('visible');
    } else if (scrollTopBtn) {
        scrollTopBtn.classList.remove('visible');
    }

    // Trigger animations on scroll
    if (typeof animateOnScroll === 'function') {
        animateOnScroll();
    }
});

// Mobile menu toggle
if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        
        // Animate hamburger
        const spans = hamburger.querySelectorAll('span');
        if (spans.length >= 3) {
            spans[0].style.transform = navMenu.classList.contains('active') ? 'rotate(-45deg) translate(-5px, 6px)' : '';
            spans[1].style.opacity = navMenu.classList.contains('active') ? '0' : '1';
            spans[2].style.transform = navMenu.classList.contains('active') ? 'rotate(45deg) translate(-5px, -6px)' : '';
        }
    });
}

// Close mobile menu when clicking a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        
        // Reset hamburger animation
        const spans = hamburger.querySelectorAll('span');
        spans[0].style.transform = '';
        spans[1].style.opacity = '1';
        spans[2].style.transform = '';
    });
});

// Smooth scroll for navigation links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 70;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }

        // Update active nav link
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
    });
    
    // Add ripple effect on click
    link.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        ripple.classList.add('ripple');
        this.appendChild(ripple);
        
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// Scroll to top button
if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Update active nav link on scroll
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPosition = window.scrollY + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', updateActiveNavLink);

// ===========================
// Enhanced Hover Effects
// ===========================

// Add ripple effect to all buttons
const buttons = document.querySelectorAll('.btn');
buttons.forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        ripple.classList.add('ripple');
        this.appendChild(ripple);
        
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// Logo TK badge glow effect on hover
const logoText = document.querySelector('.logo-text');
if (logoText) {
    logoText.addEventListener('mouseenter', function() {
        this.style.boxShadow = '0 0 20px rgba(0, 119, 182, 0.6), 0 0 40px rgba(144, 224, 239, 0.4)';
    });
    
    logoText.addEventListener('mouseleave', function() {
        this.style.boxShadow = '';
    });
}

// Parallax effect removed to prevent jitter

// Add hover sound effect (optional - commented out by default)
// Uncomment to enable click sound on nav links
/*
navLinks.forEach(link => {
    link.addEventListener('mouseenter', () => {
        // Play subtle hover sound
        const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBTGH0fPTgjMGHm7A7+OZURE');
        audio.volume = 0.1;
        audio.play();
    });
});
*/

// ===========================
// Counter Animation
// ===========================
function animateCounter(element, target, duration = 2000) {
    if (!element) return;
    
    let start = 0;
    const increment = target / (duration / 16); // 60 FPS
    const shouldHavePlus = target === 8 || target === 50 || target === 1000; // Numbers that should have "+"
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target + (shouldHavePlus ? '+' : '');
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start) + (shouldHavePlus ? '+' : '');
        }
    }, 16);
}

// Trigger counter animation when hero section is visible
let countersAnimated = false;

function checkCounters() {
    if (countersAnimated) return;
    
    const hero = document.querySelector('.hero');
    if (!hero) {
        console.log('Hero section not found');
        return;
    }
    
    const heroPosition = hero.getBoundingClientRect();

    if (heroPosition.top < window.innerHeight && heroPosition.bottom >= 0) {
        // Only select stat numbers in the hero section
        const statNumbers = hero.querySelectorAll('.stat-number');
        console.log('Found', statNumbers.length, 'stat numbers in hero');
        
        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-target'));
            if (!isNaN(target)) {
                console.log('Animating counter to:', target);
                animateCounter(stat, target);
            }
        });
        countersAnimated = true;
    }
}

// Trigger counters on scroll and load
window.addEventListener('scroll', checkCounters);
window.addEventListener('load', checkCounters);

// ===========================
// Skill Bars Animation
// ===========================
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.progress');
    const aboutSection = document.querySelector('.about');
    
    if (!aboutSection) return;
    
    const aboutPosition = aboutSection.getBoundingClientRect();
    
    if (aboutPosition.top < window.innerHeight && aboutPosition.bottom >= 0) {
        skillBars.forEach(bar => {
            if (!bar.classList.contains('animated')) {
                const progress = bar.getAttribute('data-progress');
                bar.style.width = progress + '%';
                bar.classList.add('animated');
            }
        });
    }
}

window.addEventListener('scroll', animateSkillBars);
window.addEventListener('load', animateSkillBars);

// ===========================
// About Section Stats Animation
// ===========================
let aboutStatsAnimated = false;

function animateAboutStats() {
    if (aboutStatsAnimated) return;
    
    const aboutSection = document.querySelector('.about');
    if (!aboutSection) return;
    
    const aboutPosition = aboutSection.getBoundingClientRect();
    
    if (aboutPosition.top < window.innerHeight - 100 && aboutPosition.bottom >= 0) {
        const aboutStatNumbers = aboutSection.querySelectorAll('.stat-number');
        aboutStatNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-target'));
            if (!isNaN(target) && stat.textContent === '0') { // Only animate if not already animated
                animateCounter(stat, target);
            }
        });
        aboutStatsAnimated = true;
    }
}

window.addEventListener('scroll', animateAboutStats);
window.addEventListener('load', animateAboutStats);

// ===========================
// Timeline Animation
// ===========================
function animateTimeline() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    timelineItems.forEach(item => {
        const itemPosition = item.getBoundingClientRect();
        
        if (itemPosition.top < window.innerHeight - 100) {
            item.classList.add('visible');
        }
    });
}

window.addEventListener('scroll', animateTimeline);
window.addEventListener('load', animateTimeline);

// ===========================
// Scroll Animations
// ===========================
function animateOnScroll() {
    const elements = document.querySelectorAll('.service-card, .timeline-item');
    
    elements.forEach(element => {
        const position = element.getBoundingClientRect();
        
        if (position.top < window.innerHeight - 100 && position.bottom >= 0) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
}

// Set initial state for animated elements
document.addEventListener('DOMContentLoaded', () => {
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s ease';
    });
});

// ===========================
// Testimonials Slider
// ===========================
const testimonialCards = document.querySelectorAll('.testimonial-card');
const testimonialPrev = document.getElementById('testimonial-prev');
const testimonialNext = document.getElementById('testimonial-next');
const testimonialDotsContainer = document.getElementById('testimonial-dots');

let currentTestimonial = 0;

// Create dots
testimonialCards.forEach((_, index) => {
    const dot = document.createElement('div');
    dot.classList.add('testimonial-dot');
    if (index === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToTestimonial(index));
    testimonialDotsContainer.appendChild(dot);
});

const testimonialDots = document.querySelectorAll('.testimonial-dot');

function showTestimonial(index) {
    testimonialCards.forEach(card => card.classList.remove('active'));
    testimonialDots.forEach(dot => dot.classList.remove('active'));
    
    testimonialCards[index].classList.add('active');
    testimonialDots[index].classList.add('active');
    currentTestimonial = index;
}

function nextTestimonial() {
    currentTestimonial = (currentTestimonial + 1) % testimonialCards.length;
    showTestimonial(currentTestimonial);
}

function prevTestimonial() {
    currentTestimonial = (currentTestimonial - 1 + testimonialCards.length) % testimonialCards.length;
    showTestimonial(currentTestimonial);
}

function goToTestimonial(index) {
    showTestimonial(index);
}

testimonialNext.addEventListener('click', nextTestimonial);
testimonialPrev.addEventListener('click', prevTestimonial);

// Auto-slide testimonials every 5 seconds
let testimonialInterval = setInterval(nextTestimonial, 5000);

// Pause auto-slide on hover
const testimonialSlider = document.querySelector('.testimonials-slider');
testimonialSlider.addEventListener('mouseenter', () => {
    clearInterval(testimonialInterval);
});

testimonialSlider.addEventListener('mouseleave', () => {
    testimonialInterval = setInterval(nextTestimonial, 5000);
});

// Keyboard navigation for testimonials
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        prevTestimonial();
    } else if (e.key === 'ArrowRight') {
        nextTestimonial();
    }
});

// ===========================
// Contact Form Handling
// ===========================
const contactForm = document.getElementById('contact-form');
const formMessage = document.getElementById('form-message');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        company: document.getElementById('company').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value
    };
    
    // Show loading state
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const originalButtonText = submitButton.innerHTML;
    submitButton.innerHTML = '<span>Sending...</span>';
    submitButton.disabled = true;
    
    // Simulate form submission (replace with actual backend call)
    try {
        // In a real application, you would send this data to your backend
        // await fetch('/api/contact', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify(formData)
        // });
        
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Show success message
        formMessage.textContent = 'Thank you for your message! I will get back to you soon.';
        formMessage.classList.remove('error');
        formMessage.classList.add('success');
        
        // Reset form
        contactForm.reset();
        
        // Hide message after 5 seconds
        setTimeout(() => {
            formMessage.style.display = 'none';
        }, 5000);
        
    } catch (error) {
        // Show error message
        formMessage.textContent = 'Sorry, something went wrong. Please try again or email me directly.';
        formMessage.classList.remove('success');
        formMessage.classList.add('error');
    } finally {
        // Restore button
        submitButton.innerHTML = originalButtonText;
        submitButton.disabled = false;
    }
});

// Form validation
const formInputs = contactForm.querySelectorAll('input, textarea');
formInputs.forEach(input => {
    input.addEventListener('blur', () => {
        if (input.hasAttribute('required') && !input.value.trim()) {
            input.style.borderColor = '#ef4444';
        } else {
            input.style.borderColor = '';
        }
    });
    
    input.addEventListener('input', () => {
        if (input.style.borderColor === 'rgb(239, 68, 68)') {
            input.style.borderColor = '';
        }
    });
});

// ===========================
// Intersection Observer for Animations
// ===========================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.service-card, .timeline-item');
    animatedElements.forEach(element => {
        observer.observe(element);
    });
});

// ===========================
// Loading Animation
// ===========================
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// ===========================
// Smooth Reveal on Load
// ===========================
document.addEventListener('DOMContentLoaded', () => {
    // Add initial animations
    const heroElements = document.querySelectorAll('.hero-subtitle, .hero-title, .hero-description, .hero-stats, .hero-buttons');
    heroElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            element.style.transition = 'all 0.8s ease';
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, 100 * index);
    });
});

// ===========================
// Parallax Effect (Optional)
// ===========================
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    
    if (hero && scrolled < window.innerHeight) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// ===========================
// Easter Egg - Konami Code
// ===========================
let konamiCode = [];
const konamiPattern = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-10);
    
    if (konamiCode.join(',') === konamiPattern.join(',')) {
        document.body.style.animation = 'rainbow 2s linear infinite';
        setTimeout(() => {
            document.body.style.animation = '';
        }, 5000);
    }
});

// ===========================
// Performance Optimization
// ===========================
// Debounce scroll events for better performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debounce to scroll-heavy functions
const optimizedScrollHandler = debounce(() => {
    updateActiveNavLink();
    animateSkillBars();
    animateTimeline();
    checkCounters();
}, 50);

window.addEventListener('scroll', optimizedScrollHandler);

// ===========================
// Console Message
// ===========================
console.log('%c👋 Hello there!', 'font-size: 20px; font-weight: bold; color: #2563eb;');
console.log('%cLooking for a skilled Network Infrastructure Specialist?', 'font-size: 14px; color: #64748b;');
console.log('%cLet\'s connect: tayyab.khattak@infinityservicesoy.com', 'font-size: 14px; color: #2563eb;');

// ===========================
// Utility Functions
// ===========================
// Check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Get scroll percentage
function getScrollPercentage() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    return (scrollTop / scrollHeight) * 100;
}

// Log page performance
window.addEventListener('load', () => {
    const perfData = window.performance.timing;
    const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
    console.log(`%cPage loaded in ${pageLoadTime}ms`, 'color: #10b981; font-weight: bold;');
});
