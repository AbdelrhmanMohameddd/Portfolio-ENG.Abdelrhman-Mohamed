// ==========================================
// TYPING ANIMATION
// ==========================================

const typingText = document.getElementById('typing-text');
const typingOptions = [
    "Flutter Developer",
    "UI/UX Designer",
    "Flutter Instructor",
    "Backend Developer"
];
let currentOptionIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
    if (!typingText) return;
    
    const currentOption = typingOptions[currentOptionIndex];
    const currentText = currentOption.substring(0, charIndex);
    typingText.textContent = currentText;
    
    if (!isDeleting && charIndex < currentOption.length) {
        charIndex++;
        setTimeout(typeEffect, 100);
    } else if (isDeleting && charIndex > 0) {
        charIndex--;
        setTimeout(typeEffect, 50);
    } else if (charIndex === currentOption.length) {
        setTimeout(() => {
            isDeleting = true;
            typeEffect();
        }, 2000);
    } else {
        isDeleting = false;
        currentOptionIndex = (currentOptionIndex + 1) % typingOptions.length;
        setTimeout(typeEffect, 500);
    }
}

// Start typing animation when page loads
window.addEventListener('load', () => {
    setTimeout(typeEffect, 1000);
});

// ==========================================
// SCROLL REVEAL ANIMATION
// ==========================================

const revealElements = document.querySelectorAll('.reveal');

function checkReveal() {
    const windowHeight = window.innerHeight;
    const revealPoint = 150;

    revealElements.forEach((element) => {
        const elementTop = element.getBoundingClientRect().top;
        
        if (elementTop < windowHeight - revealPoint) {
            element.classList.add('active');
        }
    });
}

// Check on scroll and on load
window.addEventListener('scroll', checkReveal);
window.addEventListener('load', checkReveal);

// Timeline items reveal animation
const timelineItems = document.querySelectorAll('.timeline-item');

function checkTimelineReveal() {
    const windowHeight = window.innerHeight;
    const revealPoint = 150;

    timelineItems.forEach((item) => {
        const itemTop = item.getBoundingClientRect().top;
        
        if (itemTop < windowHeight - revealPoint) {
            item.classList.add('reveal');
        }
    });
}

window.addEventListener('scroll', checkTimelineReveal);
window.addEventListener('load', checkTimelineReveal);

// ==========================================
// NAVBAR SCROLL EFFECT
// ==========================================

const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ==========================================
// ACTIVE NAV LINK ON SCROLL
// ==========================================

const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section[id]');

function setActiveNavLink() {
    const scrollY = window.pageYOffset;

    sections.forEach((section) => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach((link) => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', setActiveNavLink);

// ==========================================
// SMOOTH SCROLLING FOR NAV LINKS
// ==========================================

navLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);

        if (targetSection) {
            const navHeight = navbar.offsetHeight;
            const targetPosition = targetSection.offsetTop - navHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });

            // Close mobile menu if open
            const navMenu = document.getElementById('nav-menu');
            const navToggle = document.getElementById('nav-toggle');
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            }
        }
    });
});

// ==========================================
// MOBILE MENU TOGGLE
// ==========================================

const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');

if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });
}

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    }
});

// ==========================================
// SCROLL PROGRESS INDICATOR
// ==========================================

const scrollProgress = document.querySelector('.scroll-progress');

window.addEventListener('scroll', () => {
    if (scrollProgress) {
        const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        scrollProgress.style.width = `${scrolled}%`;
    }
});

// ==========================================
// MOUSE GLOW EFFECT
// ==========================================

const mouseGlow = document.querySelector('.mouse-glow');

document.addEventListener('mousemove', (e) => {
    if (mouseGlow) {
        mouseGlow.style.left = `${e.clientX}px`;
        mouseGlow.style.top = `${e.clientY}px`;
        mouseGlow.classList.add('active');
    }
});

document.addEventListener('mouseleave', () => {
    if (mouseGlow) {
        mouseGlow.classList.remove('active');
    }
});

// ==========================================
// ANIMATED COUNTER FOR EXPERIENCE
// ==========================================

const experienceNumber = document.querySelector('.experience-number');

function animateCounter() {
    if (!experienceNumber) return;

    const target = parseInt(experienceNumber.getAttribute('data-target'));
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;

    const updateCounter = () => {
        current += step;
        if (current < target) {
            experienceNumber.textContent = Math.floor(current) + '+';
            requestAnimationFrame(updateCounter);
        } else {
            experienceNumber.textContent = target + '+';
        }
    };

    // Trigger when element is visible
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting && current === 0) {
                updateCounter();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    observer.observe(experienceNumber);
}

window.addEventListener('load', animateCounter);

// ==========================================
// BUTTON RIPPLE EFFECT
// ==========================================

const buttons = document.querySelectorAll('.btn');

buttons.forEach((button) => {
    button.addEventListener('click', function(e) {
        const ripple = this.querySelector('.btn-ripple');
        
        if (ripple) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            ripple.style.width = `${this.offsetWidth}px`;
            ripple.style.height = `${this.offsetWidth}px`;

            ripple.style.animation = 'none';
            setTimeout(() => {
                ripple.style.animation = '';
            }, 10);
        }
    });
});

// ==========================================
// CONTACT FORM HANDLING (Front-end only)
// ==========================================

const contactForm = document.getElementById('contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const fullName = document.getElementById('full-name').value;
        const emailAddress = document.getElementById('email-address').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;

        // Front-end validation
        if (fullName && emailAddress && subject && message) {
            // Create mailto link (since this is front-end only)
            const emailSubject = encodeURIComponent(subject);
            const body = encodeURIComponent(`Name: ${fullName}\nEmail: ${emailAddress}\n\nMessage:\n${message}`);
            const mailtoLink = `mailto:abdelrhman.mohamed@ieee.org?subject=${emailSubject}&body=${body}`;
            
            window.location.href = mailtoLink;
            
            // Reset form after a delay
            setTimeout(() => {
                contactForm.reset();
            }, 1000);
        }
    });
}

// ==========================================
// FLOATING ICONS ANIMATION
// ==========================================

const floatingIcons = document.querySelectorAll('.icon');

floatingIcons.forEach((icon, index) => {
    // Add random delay for more organic movement
    const delay = index * 2;
    icon.style.animationDelay = `${-delay}s`;
});

// ==========================================
// GLASS CARD HOVER ENHANCEMENT
// ==========================================

const glassCards = document.querySelectorAll('.glass-card');

glassCards.forEach((card) => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px) scale(1.02)';
    });

    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// ==========================================
// PROJECT CARD HOVER EFFECTS
// ==========================================

const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach((card) => {
    card.addEventListener('mouseenter', function() {
        const techTags = this.querySelectorAll('.tech-tag');
        techTags.forEach((tag, index) => {
            setTimeout(() => {
                tag.style.transform = 'scale(1.1)';
            }, index * 50);
        });
    });

    card.addEventListener('mouseleave', function() {
        const techTags = this.querySelectorAll('.tech-tag');
        techTags.forEach((tag) => {
            tag.style.transform = 'scale(1)';
        });
    });
});

// ==========================================
// PERFORMANCE OPTIMIZATION
// ==========================================

// Throttle scroll events
function throttle(func, wait) {
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

// Apply throttling to scroll events
const optimizedScroll = throttle(() => {
    checkReveal();
    setActiveNavLink();
}, 100);

window.addEventListener('scroll', optimizedScroll);

// ==========================================
// INITIALIZATION
// ==========================================

// Set initial scroll progress
if (scrollProgress) {
    scrollProgress.style.width = '0%';
}

// Set initial navbar state
if (window.scrollY > 100 && navbar) {
    navbar.classList.add('scrolled');
}

// Initialize reveal on load
document.addEventListener('DOMContentLoaded', () => {
    checkReveal();
    setActiveNavLink();
});

// ==========================================
// DARK / LIGHT MODE TOGGLE
// ==========================================

const themeToggle = document.getElementById('theme-toggle');
const themeIcon = themeToggle?.querySelector('.theme-icon');
const body = document.body;

// Check for saved theme preference or default to dark mode
const savedTheme = localStorage.getItem('theme') || 'dark';
if (savedTheme === 'light') {
    body.classList.add('light-mode');
    if (themeIcon) themeIcon.textContent = '☀️';
}

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        body.classList.toggle('light-mode');
        const isLightMode = body.classList.contains('light-mode');
        
        if (themeIcon) {
            themeIcon.textContent = isLightMode ? '☀️' : '🌙';
        }
        
        // Save theme preference
        localStorage.setItem('theme', isLightMode ? 'light' : 'dark');
    });
}
