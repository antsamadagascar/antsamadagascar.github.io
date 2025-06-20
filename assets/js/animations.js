// animations.js - Gestion des animations et effets visuels

import { typeWriter } from './utils.js';

class Animations {
    constructor() {
        this.init();
    }

    init() {
        this.setupIntersectionObserver();
        this.setupHoverEffects();
        this.setupRippleEffect();
        this.setupTypingEffect();
        this.setupParallaxEffect();
        this.setupLoadingAnimation();
    }

    /**
     * Configuration de l'observateur d'intersection pour les animations d'entrée
     */
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

        // Observation de tous les éléments avec fade-in
        document.querySelectorAll('.fade-in').forEach(el => {
            observer.observe(el);
        });
    }

    /**
     * Effets de hover pour les cartes et éléments interactifs
     */
    setupHoverEffects() {
        this.setupProjectCardHovers();
        this.setupSkillCategoryHovers();
    }

    /**
     * Effets de hover pour les cartes de projet
     */
    setupProjectCardHovers() {
        const hoverConfig = {
            enter: {
                transform: 'translateY(-15px) scale(1.02)',
                boxShadow: '0 25px 50px rgba(0, 212, 255, 0.3)'
            },
            leave: {
                transform: 'translateY(-10px) scale(1)',
                boxShadow: 'var(--shadow-heavy)'
            }
        };

        this.applyHoverEffects('.project-card', hoverConfig);
    }

    /**
     * Effets de hover pour les catégories de compétences
     */
    setupSkillCategoryHovers() {
        const hoverConfig = {
            enter: {
                transform: 'translateY(-15px) rotateX(5deg)',
                boxShadow: '0 20px 40px rgba(0, 212, 255, 0.3)'
            },
            leave: {
                transform: 'translateY(-10px) rotateX(0deg)',
                boxShadow: 'none'
            }
        };

        this.applyHoverEffects('.skill-category', hoverConfig);
    }

    /**
     * Application générique d'effets de hover
     * @param {string} selector - Sélecteur CSS
     * @param {Object} config - Configuration des styles hover
     */
    applyHoverEffects(selector, config) {
        document.querySelectorAll(selector).forEach(element => {
            element.addEventListener('mouseenter', () => {
                Object.assign(element.style, config.enter);
            });
            
            element.addEventListener('mouseleave', () => {
                Object.assign(element.style, config.leave);
            });
        });
    }

    /**
     * Effet ripple pour les boutons
     */
    setupRippleEffect() {
        // Ajout de l'animation CSS
        this.addRippleCSS();

        document.querySelectorAll('.btn').forEach(button => {
            button.addEventListener('click', (e) => {
                this.createRipple(e, button);
            });
        });
    }

    /**
     * Création de l'effet ripple
     * @param {Event} event - Événement de clic
     * @param {HTMLElement} button - Bouton cliqué
     */
    createRipple(event, button) {
        const ripple = document.createElement('div');
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;
        
        ripple.className = 'ripple-effect';
        ripple.style.cssText = `
            left: ${x}px;
            top: ${y}px;
            width: ${size}px;
            height: ${size}px;
        `;
        
        // Préparation du bouton
        button.style.position = 'relative';
        button.style.overflow = 'hidden';
        button.appendChild(ripple);
        
        // Suppression après animation
        setTimeout(() => ripple.remove(), 600);
    }

    /**
     * Ajout des styles CSS pour l'effet ripple
     */
    addRippleCSS() {
        if (document.querySelector('#ripple-styles')) return;

        const style = document.createElement('style');
        style.id = 'ripple-styles';
        style.textContent = `
            .ripple-effect {
                position: absolute;
                border-radius: 50%;
                background-color: rgba(255, 255, 255, 0.3);
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
            }
            
            @keyframes ripple {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }

    /**
     * Effet de typing pour le titre principal
     */
    setupTypingEffect() {
        const titleElement = document.querySelector('.hero h1');
        if (!titleElement) return;

        const originalText = titleElement.textContent;
        
        // Démarrage différé pour l'effet
        setTimeout(() => {
            typeWriter(titleElement, originalText, 100);
        }, 1000);
    }

    /**
     * Effet parallaxe pour le hero
     */
    setupParallaxEffect() {
        const updateParallax = () => {
            const heroBackground = document.querySelector('.hero::before');
            if (heroBackground) {
                const scrolled = window.pageYOffset;
                const parallax = scrolled * 0.5;
                heroBackground.style.transform = `translateY(${parallax}px)`;
            }
        };

        window.addEventListener('scroll', updateParallax, { passive: true });
    }

    /**
     * Animation de chargement de la page
     */
    setupLoadingAnimation() {
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.5s ease-in-out';

        // Affichage progressif au chargement
        window.addEventListener('load', () => {
            setTimeout(() => {
                document.body.style.opacity = '1';
            }, 100);
        });
    }

    /**
     * Ajustements pour mobile
     */
    adjustForMobile() {
        if (window.innerWidth <= 768) {
            // Désactivation des animations complexes sur mobile
            document.querySelectorAll('.project-card').forEach(card => {
                card.style.transform = 'none';
                card.style.transition = 'none';
            });
        }
    }
}

export default Animations;