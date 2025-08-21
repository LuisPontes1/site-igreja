/**
 * Main JavaScript Entry Point
 * Coordinates all modules and handles global functionality
 */

import { ready } from './utils/dom.js';

// Import all modules
import './modules/menu.js';
import './modules/contato.js';
import './modules/insta-reels.js';
import './modules/mapa.js';

class App {
  constructor() {
    this.modules = new Map();
    this.init();
  }
  
  init() {
    // Wait for DOM to be ready
    ready(() => {
      this.initializeApp();
    });
  }
  
  initializeApp() {
    console.log('Igreja Exemplo - Website initialized');
    
    // Add smooth scrolling for anchor links
    this.initSmoothScrolling();
    
    // Add scroll-to-top functionality
    this.initScrollToTop();
    
    // Add keyboard navigation improvements
    this.initKeyboardNavigation();
    
    // Add loading performance monitoring
    this.monitorPerformance();
  }
  
  initSmoothScrolling() {
    // Handle smooth scrolling for internal anchor links
    document.addEventListener('click', (e) => {
      const link = e.target.closest('a[href^="#"]');
      
      if (link && link.getAttribute('href') !== '#') {
        const targetId = link.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
          e.preventDefault();
          
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
          
          // Update URL without triggering navigation
          history.pushState(null, null, link.getAttribute('href'));
        }
      }
    });
  }
  
  initScrollToTop() {
    // Create scroll-to-top button
    const scrollButton = document.createElement('button');
    scrollButton.className = 'scroll-to-top';
    scrollButton.innerHTML = '↑';
    scrollButton.setAttribute('aria-label', 'Voltar ao topo');
    scrollButton.style.cssText = `
      position: fixed;
      bottom: 2rem;
      right: 2rem;
      width: 3rem;
      height: 3rem;
      border-radius: 50%;
      background: var(--color-primary);
      color: white;
      border: none;
      font-size: 1.5rem;
      cursor: pointer;
      opacity: 0;
      visibility: hidden;
      transition: all 0.3s ease;
      z-index: 1000;
      box-shadow: var(--shadow-lg);
    `;
    
    document.body.appendChild(scrollButton);
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 300) {
        scrollButton.style.opacity = '1';
        scrollButton.style.visibility = 'visible';
      } else {
        scrollButton.style.opacity = '0';
        scrollButton.style.visibility = 'hidden';
      }
    });
    
    // Handle click
    scrollButton.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
  
  initKeyboardNavigation() {
    // Add keyboard navigation for better accessibility
    document.addEventListener('keydown', (e) => {
      // Skip to main content with Ctrl/Cmd + /
      if ((e.ctrlKey || e.metaKey) && e.key === '/') {
        e.preventDefault();
        const main = document.querySelector('main');
        if (main) {
          main.focus();
          main.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
    
    // Improve focus visibility
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
      }
    });
    
    document.addEventListener('mousedown', () => {
      document.body.classList.remove('keyboard-navigation');
    });
    
    // Add styles for keyboard navigation
    const style = document.createElement('style');
    style.textContent = `
      .keyboard-navigation *:focus {
        outline: 2px solid var(--color-primary) !important;
        outline-offset: 2px !important;
      }
    `;
    document.head.appendChild(style);
  }
  
  monitorPerformance() {
    // Log performance metrics
    window.addEventListener('load', () => {
      if ('performance' in window) {
        const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
        console.log(`Page load time: ${loadTime}ms`);
        
        // Log largest contentful paint if available
        if ('PerformanceObserver' in window) {
          const observer = new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
              console.log(`LCP: ${entry.startTime}ms`);
            }
          });
          observer.observe({ entryTypes: ['largest-contentful-paint'] });
        }
      }
    });
  }
  
  // Utility method to register custom modules
  registerModule(name, moduleInstance) {
    this.modules.set(name, moduleInstance);
  }
  
  // Utility method to get a registered module
  getModule(name) {
    return this.modules.get(name);
  }
}

// Initialize the app
const app = new App();

// Expose app instance globally for debugging/extensions
window.IgrejaApp = app;

// TODO: Add service worker registration for PWA functionality
// if ('serviceWorker' in navigator) {
//   window.addEventListener('load', () => {
//     navigator.serviceWorker.register('/sw.js')
//       .then(registration => {
//         console.log('SW registered: ', registration);
//       })
//       .catch(registrationError => {
//         console.log('SW registration failed: ', registrationError);
//       });
//   });
// }