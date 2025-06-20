// navigation.js - Gestion de la navigation et du menu

import { smoothScrollTo, throttle } from './utils.js';

class Navigation {
    constructor() {
        this.navbar = document.querySelector('.navbar');
        this.navLinks = document.querySelectorAll('.nav-links a');
        this.sections = document.querySelectorAll('section[id]');
        this.scrollButton = document.querySelector('.scroll-top');
        
        this.init();
    }

    init() {
        this.setupSmoothScrolling();
        this.setupScrollHandlers();
        this.setupMobileMenu();
        this.setupScrollToTopButton();
    }

    /**
     * Configuration du scroll fluide pour les liens
     */
    setupSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const href = anchor.getAttribute('href');
                smoothScrollTo(href);
            });
        });
    }

    /**
     * Gestionnaires de scroll avec throttling
     */
    setupScrollHandlers() {
        const throttledScrollHandler = throttle(() => {
            this.updateNavbarBackground();
            this.updateActiveNavLink();
            this.updateScrollToTopButton();
        });

        window.addEventListener('scroll', throttledScrollHandler);
    }

    /**
     * Mise à jour du background de la navbar selon le scroll
     */
    updateNavbarBackground() {
        if (!this.navbar) return;
        
        const scrollY = window.scrollY;
        const isScrolled = scrollY > 100;
        
        this.navbar.style.background = isScrolled 
            ? 'rgba(13, 17, 23, 0.98)' 
            : 'rgba(13, 17, 23, 0.95)';
        this.navbar.style.backdropFilter = isScrolled 
            ? 'blur(15px)' 
            : 'blur(10px)';
    }

    /**
     * Mise à jour du lien actif dans la navigation
     */
    updateActiveNavLink() {
        let currentSection = '';
        
        this.sections.forEach(section => {
            const sectionTop = section.offsetTop - 150;
            if (window.pageYOffset >= sectionTop) {
                currentSection = section.getAttribute('id');
            }
        });
        
        this.navLinks.forEach(link => {
            const isActive = link.getAttribute('href') === '#' + currentSection;
            link.classList.toggle('active', isActive);
        });
    }

    /**
     * Gestion du bouton scroll-to-top
     */
    updateScrollToTopButton() {
        if (!this.scrollButton) return;
        
        const isVisible = window.scrollY > 500;
        this.scrollButton.classList.toggle('visible', isVisible);
    }

    setupScrollToTopButton() {
        if (this.scrollButton) {
            this.scrollButton.addEventListener('click', () => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
        }
    }

    /**
     * Configuration du menu mobile
     */
    setupMobileMenu() {
        const menuToggle = document.querySelector('.mobile-menu-toggle');
        const navLinks = document.querySelector('.nav-links');
        
        if (!menuToggle || !navLinks) return;

        // Toggle du menu
        menuToggle.addEventListener('click', () => {
            this.toggleMobileMenu(navLinks, menuToggle);
        });

        // Fermeture du menu lors du clic sur un lien
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                this.closeMobileMenu(navLinks, menuToggle);
            });
        });
    }

    /**
     * Bascule l'état du menu mobile
     */
    toggleMobileMenu(navLinks, menuToggle) {
        navLinks.classList.toggle('active');
        const icon = menuToggle.querySelector('i');
        
        if (navLinks.classList.contains('active')) {
            icon.classList.replace('fa-bars', 'fa-times');
        } else {
            icon.classList.replace('fa-times', 'fa-bars');
        }
    }

    /**
     * Ferme le menu mobile
     */
    closeMobileMenu(navLinks, menuToggle) {
        navLinks.classList.remove('active');
        const icon = menuToggle.querySelector('i');
        icon.classList.replace('fa-times', 'fa-bars');
    }
}

export default Navigation;