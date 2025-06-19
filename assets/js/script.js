class PortfolioManager {
    constructor() {
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupIntersectionObserver();
        this.setupScrollEffects();
        this.setupMobileMenu();
        this.setupSmoothScrolling();
        this.setupAnimations();
    }

    // Gestion des événements
    setupEventListeners() {
        window.addEventListener('scroll', this.handleScroll.bind(this));
        window.addEventListener('resize', this.handleResize.bind(this));
        window.addEventListener('load', this.handleLoad.bind(this));
    }

    // Scroll fluide pour les liens de navigation
    setupSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    const offsetTop = target.offsetTop - 80; // Compensation pour la navbar
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // Gestion du scroll
    handleScroll() {
        this.updateNavbarBackground();
        this.updateActiveNavLink();
        this.updateScrollToTopButton();
        this.updateParallaxEffect();
    }

    // Mise à jour du background de la navbar
    updateNavbarBackground() {
        const navbar = document.querySelector('.navbar');
        const scrollY = window.scrollY;
        
        if (scrollY > 100) {
            navbar.style.background = 'rgba(13, 17, 23, 0.98)';
            navbar.style.backdropFilter = 'blur(15px)';
        } else {
            navbar.style.background = 'rgba(13, 17, 23, 0.95)';
            navbar.style.backdropFilter = 'blur(10px)';
        }
    }

    // Mise à jour du lien actif dans la navigation
    updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-links a');
        
        let currentSection = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 150;
            if (window.pageYOffset >= sectionTop) {
                currentSection = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + currentSection) {
                link.classList.add('active');
            }
        });
    }

    // Gestion du bouton scroll-to-top
    updateScrollToTopButton() {
        const scrollButton = document.querySelector('.scroll-top');
        if (window.scrollY > 500) {
            scrollButton.classList.add('visible');
        } else {
            scrollButton.classList.remove('visible');
        }
    }

    // Effet parallaxe pour le hero
    updateParallaxEffect() {
        const heroBackground = document.querySelector('.hero::before');
        if (heroBackground) {
            const scrolled = window.pageYOffset;
            const parallax = scrolled * 0.5;
            heroBackground.style.transform = `translateY(${parallax}px)`;
        }
    }

    // Observateur d'intersection pour les animations
    setupIntersectionObserver() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        document.querySelectorAll('.fade-in').forEach(el => {
            observer.observe(el);
        });
    }

    // Effets de scroll
    setupScrollEffects() {
        // Effet de hover avancé pour les cartes de projet
        document.querySelectorAll('.project-card').forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-15px) scale(1.02)';
                card.style.boxShadow = '0 25px 50px rgba(0, 212, 255, 0.3)';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(-10px) scale(1)';
                card.style.boxShadow = 'var(--shadow-heavy)';
            });
        });

        // Effet de hover pour les catégories de compétences
        document.querySelectorAll('.skill-category').forEach(category => {
            category.addEventListener('mouseenter', () => {
                category.style.transform = 'translateY(-15px) rotateX(5deg)';
                category.style.boxShadow = '0 20px 40px rgba(0, 212, 255, 0.3)';
            });
            
            category.addEventListener('mouseleave', () => {
                category.style.transform = 'translateY(-10px) rotateX(0deg)';
                category.style.boxShadow = 'none';
            });
        });
    }

    // Menu mobile
    setupMobileMenu() {
        const menuToggle = document.querySelector('.mobile-menu-toggle');
        const navLinks = document.querySelector('.nav-links');
        
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = menuToggle.querySelector('i');
            
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });

        // Fermer le menu lors du clic sur un lien
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                const icon = menuToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            });
        });
    }

    // Animations avancées
    setupAnimations() {
        this.setupRippleEffect();
        this.setupTypingEffect();
        this.setupLoadingAnimation();
    }

    // Effet ripple pour les boutons
    setupRippleEffect() {
        document.querySelectorAll('.btn').forEach(button => {
            button.addEventListener('click', (e) => {
                const ripple = document.createElement('div');
                const rect = button.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                
                ripple.style.cssText = `
                    position: absolute;
                    border-radius: 50%;
                    background-color: rgba(255, 255, 255, 0.3);
                    transform: scale(0);
                    animation: ripple 0.6s linear;
                    left: ${x}px;
                    top: ${y}px;
                    width: ${size}px;
                    height: ${size}px;
                    pointer-events: none;
                `;
                
                button.style.position = 'relative';
                button.style.overflow = 'hidden';
                button.appendChild(ripple);
                
                setTimeout(() => ripple.remove(), 600);
            });
        });

        // Animation CSS pour l'effet ripple
        this.addRippleAnimation();
    }

    // Ajout de l'animation CSS ripple
    addRippleAnimation() {
        const style = document.createElement('style');
        style.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }

    // Effet de typing pour le titre
    setupTypingEffect() {
        const titleElement = document.querySelector('.hero h1');
        if (titleElement) {
            const originalText = titleElement.textContent;
            titleElement.textContent = '';
            
            setTimeout(() => {
                this.typeWriter(titleElement, originalText, 100);
            }, 1000);
        }
    }

    // Machine à écrire
    typeWriter(element, text, speed = 100) {
        let i = 0;
        const timer = setInterval(() => {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
            } else {
                clearInterval(timer);
            }
        }, speed);
    }

    // Animation de chargement
    setupLoadingAnimation() {
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.5s ease-in-out';
    }

    // Gestion du redimensionnement
    handleResize() {
        // Réajuster les animations en fonction de la taille d'écran
        if (window.innerWidth <= 768) {
            this.adjustMobileAnimations();
        }
    }

    // Ajustements pour mobile
    adjustMobileAnimations() {
        const projectCards = document.querySelectorAll('.project-card');
        projectCards.forEach(card => {
            card.style.transform = 'none';
            card.style.transition = 'none';
        });
    }

    // Gestion du chargement
    handleLoad() {
        setTimeout(() => {
            document.body.style.opacity = '1';
        }, 100);
    }
}

// Fonction pour scroll vers le haut
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Initialisation du portfolio manager
document.addEventListener('DOMContentLoaded', () => {
    new PortfolioManager();
});

// Gestion des performances
let ticking = false;

function requestTick() {
    if (!ticking) {
        requestAnimationFrame(updateAnimations);
        ticking = true;
    }
}

function updateAnimations() {
    // Mise à jour des animations ici
    ticking = false;
}

// Préchargement des images
function preloadImages() {
    const images = ['assets/images/profile.jpg'];
    images.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

// Gestion des erreurs
window.addEventListener('error', (e) => {
    console.error('Erreur dans le portfolio:', e);
});

// Optimisation des performances
const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

// Initialisation finale
preloadImages();