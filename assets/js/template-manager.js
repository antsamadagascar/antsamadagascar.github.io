// template-manager.js - Gestionnaire des templates/partials
export default class TemplateManager {
    constructor() {
        this.templates = new Map();
        this.cache = new Map();
        this.initialized = false;
        
        // Configuration des partials
        this.partials = {
            nav: 'partials/nav.html',
            hero: 'partials/hero.html',
            about: 'partials/about.html',
            skills: 'partials/skills.html',
            projects: 'partials/projects.html',
            education: 'partials/education.html',
            contact: 'partials/contact.html',
            footer: 'partials/footer.html'
        };
        
        this.init();
    }

    /**
     * Initialisation du gestionnaire de templates
     */
    async init() {
        try {
            await this.loadAllPartials();
            await this.renderPage();
            this.initialized = true;
            console.log('✅ Template Manager initialisé');
        } catch (error) {
            console.error('❌ Erreur lors de l\'initialisation du Template Manager:', error);
        }
    }

    /**
     * Chargement de tous les partials
     */
    async loadAllPartials() {
        const loadPromises = Object.entries(this.partials).map(async ([name, path]) => {
            try {
                const content = await this.loadPartial(path);
                this.templates.set(name, content);
                return { name, success: true };
            } catch (error) {
                console.error(`Erreur lors du chargement de ${name}:`, error);
                return { name, success: false, error };
            }
        });

        const results = await Promise.all(loadPromises);
        const failed = results.filter(r => !r.success);
        
        if (failed.length > 0) {
            console.warn('Certains partials n\'ont pas pu être chargés:', failed);
        }
    }

    /**
     * Chargement d'un partial spécifique
     */
    async loadPartial(path) {
        // Vérifier le cache d'abord
        if (this.cache.has(path)) {
            return this.cache.get(path);
        }

        try {
            const response = await fetch(path);
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }
            
            const content = await response.text();
            this.cache.set(path, content);
            return content;
        } catch (error) {
            console.error(`Impossible de charger ${path}:`, error);
            return this.getFallbackContent(path);
        }
    }

    /**
     * Contenu de fallback en cas d'erreur
     */
    getFallbackContent(path) {
        const section = path.split('/').pop().replace('.html', '');
        return `
            <div class="error-placeholder">
                <p>⚠️ Impossible de charger la section "${section}"</p>
                <p>Veuillez vérifier que le fichier ${path} existe.</p>
            </div>
        `;
    }

    /**
     * Rendu de la page complète
     */
    async renderPage() {
        const body = document.body;
        
        // Création de la structure principale
        const structure = this.createPageStructure();
        body.innerHTML = structure;

        // Injection des partials dans leurs conteneurs
        await this.injectPartials();
    }

    /**
     * Création de la structure HTML de base
     */
    createPageStructure() {
        return `
            <!-- Navigation -->
            <div id="nav-container"></div>
            
            <!-- Contenu principal -->
            <main>
                <div id="hero-container"></div>
                <div id="about-container"></div>
                <div id="skills-container"></div>
                <div id="projects-container"></div>
                <div id="education-container"></div>
                <div id="contact-container"></div>
            </main>
            
            <!-- Footer -->
            <div id="footer-container"></div>
            
            <!-- Bouton scroll to top -->
            <button class="scroll-top" onclick="scrollToTop()">
                <i class="fas fa-arrow-up"></i>
            </button>
        `;
    }

    /**
     * Injection des partials dans leurs conteneurs
     */
    async injectPartials() {
        const injections = [
            { container: 'nav-container', template: 'nav' },
            { container: 'hero-container', template: 'hero' },
            { container: 'about-container', template: 'about' },
            { container: 'skills-container', template: 'skills' },
            { container: 'projects-container', template: 'projects' },
            { container: 'education-container', template: 'education' },
            { container: 'contact-container', template: 'contact' },
            { container: 'footer-container', template: 'footer' }
        ];

        injections.forEach(({ container, template }) => {
            const containerElement = document.getElementById(container);
            const templateContent = this.templates.get(template);
            
            if (containerElement && templateContent) {
                containerElement.innerHTML = templateContent;
                this.triggerCustomEvent(`${template}:loaded`, containerElement);
            }
        });
    }

    /**
     * Rechargement d'un partial spécifique
     */
    async reloadPartial(partialName) {
        const path = this.partials[partialName];
        if (!path) {
            console.error(`Partial "${partialName}" non trouvé`);
            return false;
        }

        try {
            // Suppression du cache
            this.cache.delete(path);
            
            // Rechargement
            const content = await this.loadPartial(path);
            this.templates.set(partialName, content);
            
            // Re-injection
            const container = document.getElementById(`${partialName}-container`);
            if (container) {
                container.innerHTML = content;
                this.triggerCustomEvent(`${partialName}:reloaded`, container);
            }
            
            return true;
        } catch (error) {
            console.error(`Erreur lors du rechargement de ${partialName}:`, error);
            return false;
        }
    }

    /**
     * Mise à jour dynamique d'un partial
     */
    updatePartial(partialName, newContent) {
        this.templates.set(partialName, newContent);
        const container = document.getElementById(`${partialName}-container`);
        
        if (container) {
            container.innerHTML = newContent;
            this.triggerCustomEvent(`${partialName}:updated`, container);
        }
    }

    /**
     * Obtention du contenu d'un partial
     */
    getPartial(partialName) {
        return this.templates.get(partialName) || null;
    }

    /**
     * Vérification si un partial est chargé
     */
    isPartialLoaded(partialName) {
        return this.templates.has(partialName);
    }

    /**
     * Déclenchement d'événements personnalisés
     */
    triggerCustomEvent(eventName, element) {
        const event = new CustomEvent(eventName, {
            detail: { element, timestamp: Date.now() }
        });
        document.dispatchEvent(event);
    }

    /**
     * Nettoyage des ressources
     */
    destroy() {
        this.templates.clear();
        this.cache.clear();
        this.initialized = false;
    }

    /**
     * Méthodes utilitaires pour le debug
     */
    getStats() {
        return {
            templatesLoaded: this.templates.size,
            cacheSize: this.cache.size,
            initialized: this.initialized,
            templates: Array.from(this.templates.keys())
        };
    }
}