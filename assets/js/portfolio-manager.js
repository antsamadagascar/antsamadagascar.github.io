// portfolio-manager.js - Gestionnaire principal du portfolio

import Navigation from './navigation.js';
import Animations from './animations.js';
import { preloadImages, setupErrorHandling, debounce } from './utils.js';

class PortfolioManager {
    constructor() {
        this.navigation = null;
        this.animations = null;
        this.isInitialized = false;
        
        this.init();
    }

    /**
     * Initialisation principale
     */
    async init() {
        try {
            // Configuration des gestionnaires d'erreurs
            setupErrorHandling();
            
            // Préchargement des ressources
            await this.preloadResources();
            
            // Initialisation des modules
            this.initializeModules();
            
            // Configuration des événements globaux
            this.setupGlobalEvents();
            
            this.isInitialized = true;
            console.log('Portfolio Manager initialisé avec succès');
            
        } catch (error) {
            console.error('Erreur lors de l\'initialisation:', error);
        }
    }

    /**
     * Préchargement des ressources
     */
    async preloadResources() {
        const imagesToPreload = [
            'assets/images/profile.jpg',
            // image hafa 
        ];
        
        preloadImages(imagesToPreload);
    }

    /**
     * Initialisation des modules
     */
    initializeModules() {
        // Initialisation de la navigation
        this.navigation = new Navigation();
        
        // Initialisation des animations
        this.animations = new Animations();
    }

    /**
     * Configuration des événements globaux
     */
    setupGlobalEvents() {
        // Gestionnaire de redimensionnement avec debouncing
        const debouncedResize = debounce(() => {
            this.handleResize();
        }, 250);
        
        window.addEventListener('resize', debouncedResize);
        
        // Gestionnaire de visibilité de la page
        document.addEventListener('visibilitychange', () => {
            this.handleVisibilityChange();
        });
    }

    /**
     * Gestion du redimensionnement
     */
    handleResize() {
        if (!this.isInitialized) return;
        
        // Ajustements pour mobile
        if (this.animations) {
            this.animations.adjustForMobile();
        }
        
        // Réinitialisation des calculs de position si nécessaire
        this.recalculatePositions();
    }

    /**
     * Gestion du changement de visibilité
     */
    handleVisibilityChange() {
        if (document.hidden) {
            // Pause des animations coûteuses
            this.pauseExpensiveAnimations();
        } else {
            // Reprise des animations
            this.resumeAnimations();
        }
    }

    /**
     * Pause des animations coûteuses
     */
    pauseExpensiveAnimations() {
        // Logique pour mettre en pause les animations (en cours)
        console.log('Pause des animations');
    }

    /**
     * Reprise des animations
     */
    resumeAnimations() {
        // Logique pour reprendre les animations (encours)
        console.log('Reprise des animations');
    }

    /**
     * Recalcul des positions après redimensionnement
     */
    recalculatePositions() {
        // Forcer le recalcul des positions des éléments fixes
        if (this.navigation) {
            this.navigation.updateActiveNavLink();
        }
    }

    /**
     * Méthode de nettoyage (si nécessaire)
     */
    destroy() {
        // Nettoyage des event listeners et autres ressources
        this.isInitialized = false;
        console.log('Portfolio Manager détruit');
    }

    /**
     * Getter pour vérifier l'état d'initialisation
     */
    get initialized() {
        return this.isInitialized;
    }
}

// Export par défaut
export default PortfolioManager;