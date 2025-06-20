// utils.js - Fonctions utilitaires réutilisables

/**
 * Debounce - Limite l'exécution d'une fonction
 * @param {Function} func - Fonction à debouncer
 * @param {number} wait - Délai d'attente en ms
 * @returns {Function} Fonction debouncée
 */
export const debounce = (func, wait) => {
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

/**
 * Throttle - Limite l'exécution d'une fonction avec requestAnimationFrame
 * @param {Function} callback - Fonction à throttler
 * @returns {Function} Fonction throttlée
 */
export const throttle = (callback) => {
    let ticking = false;
    return function(...args) {
        if (!ticking) {
            requestAnimationFrame(() => {
                callback.apply(this, args);
                ticking = false;
            });
            ticking = true;
        }
    };
};

/**
 * Précharge les images
 * @param {string[]} imagePaths - Tableau des chemins d'images
 */
export const preloadImages = (imagePaths) => {
    imagePaths.forEach(src => {
        const img = new Image();
        img.src = src;
    });
};

/**
 * Scroll fluide vers un élément
 * @param {string} targetSelector - Sélecteur de l'élément cible
 * @param {number} offset - Décalage en pixels (défaut: 80)
 */
export const smoothScrollTo = (targetSelector, offset = 80) => {
    const target = document.querySelector(targetSelector);
    if (target) {
        const offsetTop = target.offsetTop - offset;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
};

/**
 * Scroll vers le haut de la page
 */
export const scrollToTop = () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
};

/**
 * Effet typewriter sur un élément
 * @param {HTMLElement} element - Élément cible
 * @param {string} text - Texte à taper
 * @param {number} speed - Vitesse en ms (défaut: 100)
 */
export const typeWriter = (element, text, speed = 100) => {
    let i = 0;
    element.textContent = '';
    
    const timer = setInterval(() => {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
        } else {
            clearInterval(timer);
        }
    }, speed);
};

/**
 * Gestionnaire d'erreurs global
 */
export const setupErrorHandling = () => {
    window.addEventListener('error', (e) => {
        console.error('Erreur dans le portfolio:', e);
    });
};