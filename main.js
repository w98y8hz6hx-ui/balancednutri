    let currentLang = 'ar';

    // Visitor Tracking
    function initializeStats() {
        // Get or initialize visitor count
        let visitorCount = localStorage.getItem('balancednutri_visitors');
        if (!visitorCount) {
            visitorCount = 1240;
        } else {
            visitorCount = parseInt(visitorCount) + 1;
        }
        localStorage.setItem('balancednutri_visitors', visitorCount);
        
        // Get or initialize consultation count
        let consultationCount = localStorage.getItem('balancednutri_consultations') || 450;
        
        // Get or initialize client count
        let clientCount = localStorage.getItem('balancednutri_clients') || 380;
        
        // Display stats with number formatting
        const visitorCountEl = document.getElementById('visitorCount');
        const consultationCountEl = document.getElementById('consultationCount');
        const clientCountEl = document.getElementById('clientCount');
        
        if (visitorCountEl) {
            visitorCountEl.textContent = parseInt(visitorCount).toLocaleString();
        }
        if (consultationCountEl) {
            consultationCountEl.textContent = parseInt(consultationCount).toLocaleString();
        }
        if (clientCountEl) {
            clientCountEl.textContent = parseInt(clientCount).toLocaleString();
        }
    }

    // Track user interactions
    function trackInteraction(type) {
        if (type === 'consultation') {
            let count = localStorage.getItem('balancednutri_consultations') || 450;
            count = parseInt(count) + 1;
            localStorage.setItem('balancednutri_consultations', count);
            const el = document.getElementById('consultationCount');
            if (el) el.textContent = count.toLocaleString();
        } else if (type === 'client') {
            let count = localStorage.getItem('balancednutri_clients') || 380;
            count = parseInt(count) + 1;
            localStorage.setItem('balancednutri_clients', count);
            const el = document.getElementById('clientCount');
            if (el) el.textContent = count.toLocaleString();
        }
    }

    function toggleLanguage() {
        currentLang = currentLang === 'ar' ? 'en' : 'ar';
        document.documentElement.lang = currentLang;
        document.documentElement.dir = currentLang === 'ar' ? 'rtl' : 'ltr';
        
        // Update all elements with lang-ar and lang-en attributes
        document.querySelectorAll('[lang-ar][lang-en]').forEach(el => {
            const text = currentLang === 'ar' ? el.getAttribute('lang-ar') : el.getAttribute('lang-en');
            if (el.childNodes.length === 1 && el.childNodes[0].nodeType === 3) {
                el.textContent = text;
            } else if (el.tagName === 'BUTTON' || el.tagName === 'A') {
                el.textContent = text;
            } else {
                el.textContent = text;
            }
        });
        
        document.querySelector('.lang-toggle').textContent = currentLang === 'ar' ? 'EN' : 'AR';
    }

    function toggleMenu() {
        const navMenu = document.getElementById('navMenu');
        navMenu.classList.toggle('mobile-open');
    }

    function scrollToSection(sectionId) {
        const element = document.getElementById(sectionId);
        if (element) {
            const offset = 100;
            const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
            window.scrollTo({
                top: elementPosition - offset,
                behavior: 'smooth'
            });
            document.getElementById('navMenu').classList.remove('mobile-open');
            
            // Track interaction when scrolling to contact
            if (sectionId === 'contact') {
                trackInteraction('consultation');
            }
        }
    }

    // Initialize stats on page load
    window.addEventListener('load', initializeStats);
    document.addEventListener('DOMContentLoaded', initializeStats);
