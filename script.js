// DOM Elements
const loadingScreen = document.getElementById('loadingScreen');
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const themeToggle = document.getElementById('themeToggle');
const backToTop = document.getElementById('back-to-top');
const contactForm = document.getElementById('contact-form');


// Loading Screen
window.addEventListener('load', () => {
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
    }, 1000);
});

// Navbar Scroll Effect
let lastScrollTop = 0;
window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Add scrolled class for styling
    if (scrollTop > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // Show/hide back to top button
    if (scrollTop > 300) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
    
    lastScrollTop = scrollTop;
});

// Mobile Navigation Toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Theme Toggle
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
    const icon = themeToggle.querySelector('i');
    
    if (document.body.classList.contains('dark-theme')) {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
        localStorage.setItem('theme', 'dark');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
        localStorage.setItem('theme', 'light');
    }
});

// Load saved theme
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    document.body.classList.add('dark-theme');
    themeToggle.querySelector('i').classList.replace('fa-moon', 'fa-sun');
}

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerHeight = navbar.offsetHeight;
            const elementPosition = target.offsetTop - headerHeight;
            
            window.scrollTo({
                top: elementPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Active Navigation Link
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

function updateActiveNavLink() {
    const scrollPos = window.scrollY + navbar.offsetHeight + 50;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
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

// Typewriter Effect
const texts = [
    'Frontend Developer',
    'React Specialist', 
    
    'JavaScript Expert'
];

let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typedTextElement = document.getElementById('typed-text');

function typeWriter() {
    const currentText = texts[textIndex];
    
    if (isDeleting) {
        typedTextElement.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typedTextElement.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
    }
    
    let typeSpeed = isDeleting ? 50 : 100;
    
    if (!isDeleting && charIndex === currentText.length) {
        typeSpeed = 2000; // Pause at end
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
        typeSpeed = 500; // Pause before starting new text
    }
    
    setTimeout(typeWriter, typeSpeed);
}

// Start typewriter effect
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(typeWriter, 1000);
});

// Skills Animation
const skillsSection = document.getElementById('skills');
const skillBars = document.querySelectorAll('.skill-progress');
let skillsAnimated = false;

function animateSkills() {
    if (skillsAnimated) return;
    
    skillBars.forEach((bar, index) => {
        const width = bar.getAttribute('data-width');
        setTimeout(() => {
            bar.style.width = width + '%';
        }, index * 200);
    });
    
    skillsAnimated = true;
}

// Intersection Observer for Skills Animation
const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateSkills();
        }
    });
}, { threshold: 0.5 });

if (skillsSection) {
    skillsObserver.observe(skillsSection);
}

// Project Filtering
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');
        
        const filterValue = button.getAttribute('data-filter');
        
        projectCards.forEach(card => {
            const cardCategory = card.getAttribute('data-category');
            
            if (filterValue === 'all' || cardCategory === filterValue) {
                card.classList.remove('hidden');
                setTimeout(() => {
                    card.style.display = 'block';
                }, 10);
            } else {
                card.classList.add('hidden');
                setTimeout(() => {
                    if (card.classList.contains('hidden')) {
                        card.style.display = 'none';
                    }
                }, 300);
            }
        });
    });
});

// Contact Form Validation and Submission
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form elements
        const name = document.getElementById('name');
        const email = document.getElementById('email');
        const subject = document.getElementById('subject');
        const message = document.getElementById('message');
        
        // Reset previous errors
        document.querySelectorAll('.form-group').forEach(group => {
            group.classList.remove('error');
        });
        
        let isValid = true;
        
        // Validate name
        if (!name.value.trim()) {
            showError(name, 'Name is required');
            isValid = false;
        }
        
        // Validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email.value.trim()) {
            showError(email, 'Email is required');
            isValid = false;
        } else if (!emailRegex.test(email.value)) {
            showError(email, 'Please enter a valid email');
            isValid = false;
        }
        
        // Validate subject
        if (!subject.value.trim()) {
            showError(subject, 'Subject is required');
            isValid = false;
        }
        
        // Validate message
        if (!message.value.trim()) {
            showError(message, 'Message is required');
            isValid = false;
        } else if (message.value.trim().length < 10) {
            showError(message, 'Message must be at least 10 characters');
            isValid = false;
        }
        
        if (isValid) {
            // Show success message
            showSuccessMessage();
            // Reset form
            contactForm.reset();
        }
    });
}

function showError(input, message) {
    const formGroup = input.closest('.form-group');
    const errorElement = formGroup.querySelector('.error-message');
    
    formGroup.classList.add('error');
    errorElement.textContent = message;
}

function showSuccessMessage() {
    // Create success notification
    const notification = document.createElement('div');
    notification.className = 'success-notification';
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-check-circle"></i>
            <span>Thank you! Your message has been sent successfully.</span>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #10b981, #059669);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 0.75rem;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 5000);
}

// Back to Top Button
backToTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Parallax Effect for Hero Section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroParticles = document.querySelector('.hero-particles');
    
    if (heroParticles) {
        heroParticles.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Animate elements on scroll
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.stat-card, .skill-category, .project-card, .timeline-item');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
};

// Set initial state for animated elements
document.addEventListener('DOMContentLoaded', () => {
    const elements = document.querySelectorAll('.stat-card, .skill-category, .project-card, .timeline-item');
    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
});

window.addEventListener('scroll', animateOnScroll);

// Initialize animations on load
window.addEventListener('load', () => {
    animateOnScroll();
});

// Smooth reveal animation for sections
const revealSections = () => {
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const sectionVisible = 100;
        
        if (sectionTop < window.innerHeight - sectionVisible) {
            section.classList.add('revealed');
        }
    });
};

// Add CSS for section reveal
const style = document.createElement('style');
style.textContent = `
    section {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.8s ease, transform 0.8s ease;
    }
    
    section.revealed {
        opacity: 1;
        transform: translateY(0);
    }
    
    .success-notification .notification-content {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }
    
    .success-notification i {
        font-size: 1.25rem;
    }
`;
document.head.appendChild(style);

window.addEventListener('scroll', revealSections);
window.addEventListener('load', revealSections);

// Add loading animation to buttons
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        if (this.type === 'submit') {
            const originalText = this.innerHTML;
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            this.disabled = true;
            
            setTimeout(() => {
                this.innerHTML = originalText;
                this.disabled = false;
            }, 2000);
        }
    });
});

// Enhanced scroll performance
let ticking = false;

function updateOnScroll() {
    updateActiveNavLink();
    revealSections();
    animateOnScroll();
    ticking = false;
}

function requestTick() {
    if (!ticking) {
        requestAnimationFrame(updateOnScroll);
        ticking = true;
    }
}

window.addEventListener('scroll', requestTick);

// Preload images for better performance
const preloadImages = () => {
    const images = [
        'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400',
        'https://miro.medium.com/v2/resize:fit:1100/format:webp/1*SSdZBBwS99HqZWZ97t7siw.png',
        'https://images.pexels.com/photos/4050302/pexels-photo-4050302.jpeg?auto=compress&cs=tinysrgb&w=500',
        'https://images.pexels.com/photos/3243/pen-calendar-to-do-checklist.jpg?auto=compress&cs=tinysrgb&w=500'
    ];
    
    images.forEach(src => {
        const img = new Image();
        img.src = src;
    });
};

// Initialize preloading
document.addEventListener('DOMContentLoaded', preloadImages);