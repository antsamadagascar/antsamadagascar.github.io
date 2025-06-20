// main.js - Point d'entrée principal de l'application

import PortfolioManager from './portfolio-manager.js';

/**
 * Configuration globale de l'application
 */
const APP_CONFIG = {
    version: '1.0.0',
    debug: false, // Mis  à true pour le debug
    features: {
        animations: true,
        parallax: true,
        typewriter: true,
        rippleEffect: true
    }
};

/**
 * Initialisation de l'application
 */
class App {
    constructor() {
        this.portfolioManager = null;
        this.isReady = false;
    }

    /**
     * Démarrage de l'application
     */
    async start() {
        try {
            // Attendre que le DOM soit prêt
            await this.waitForDOM();
            
            // Initialisation du gestionnaire de portfolio
            this.portfolioManager = new PortfolioManager();
            
            // Marque l'application comme prête
            this.isReady = true;
            
            // Log de démarrage
            this.logStartup();
            
        } catch (error) {
            console.error('Erreur lors du démarrage de l\'application:', error);
        }
    }

    /**
     * Attendre que le DOM soit complètement chargé
     */
    waitForDOM() {
        return new Promise((resolve) => {
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', resolve);
            } else {
                resolve();
            }
        });
    }

    /**
     * Log des informations de démarrage
     */
    logStartup() {
        if (APP_CONFIG.debug) {
            console.group(' Portfolio App Started');
            console.log('Version:', APP_CONFIG.version);
            console.log('Features:', APP_CONFIG.features);
            console.log('DOM Ready:', this.isReady);
            console.log('Portfolio Manager:', this.portfolioManager?.initialized);
            console.groupEnd();
        }
    }

    /**
     * Méthode pour redémarrer l'application
     */
    restart() {
        if (this.portfolioManager) {
            this.portfolioManager.destroy();
        }
        this.start();
    }
}

// Création et démarrage de l'application
const app = new App();
app.start();

// Export pour usage externe si nécessaire
window.PortfolioApp = app;

// Gestion des erreurs non capturées
window.addEventListener('unhandledrejection', (event) => {
    console.error('Promise rejetée non gérée:', event.reason);
});

// Hot reload pour le développement (optionnel)
if (APP_CONFIG.debug && 'serviceWorker' in navigator) {
    // Logique de hot reload 
    console.log('Mode debug activé');
}