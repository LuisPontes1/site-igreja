/**
 * Menu Module
 * Handles mobile navigation menu toggle and accessibility
 */

import { qs, on, toggleClass, hasClass } from '../utils/dom.js';

class MenuModule {
  constructor() {
    this.toggle = null;
    this.menu = null;
    this.isOpen = false;
    
    this.init();
  }
  
  init() {
    this.toggle = qs('.nav-toggle');
    this.menu = qs('.nav-list');
    
    if (!this.toggle || !this.menu) {
      return;
    }
    
    this.bindEvents();
    this.setInitialState();
  }
  
  bindEvents() {
    // Toggle menu on button click
    on(this.toggle, 'click', (e) => {
      e.preventDefault();
      this.toggleMenu();
    });
    
    // Close menu on escape key
    on(document, 'keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen) {
        this.closeMenu();
        this.toggle.focus();
      }
    });
    
    // Close menu when clicking outside
    on(document, 'click', (e) => {
      if (this.isOpen && !e.target.closest('.nav') && !e.target.closest('.nav-toggle')) {
        this.closeMenu();
      }
    });
    
    // Close menu on window resize (when switching to desktop)
    on(window, 'resize', () => {
      if (window.innerWidth > 767 && this.isOpen) {
        this.closeMenu();
      }
    });
    
    // Handle navigation link clicks
    const navLinks = qs('.nav-list a', this.menu.parentElement);
    if (navLinks) {
      on(this.menu, 'click', (e) => {
        if (e.target.matches('a')) {
          // Close mobile menu when link is clicked
          if (this.isOpen) {
            this.closeMenu();
          }
          
          // Update active state
          this.updateActiveLink(e.target);
        }
      });
    }
  }
  
  setInitialState() {
    // Set initial ARIA attributes
    this.toggle.setAttribute('aria-expanded', 'false');
    this.toggle.setAttribute('aria-controls', 'main-navigation');
    this.menu.setAttribute('id', 'main-navigation');
    
    // Set initial active link based on current page
    this.setActiveLink();
  }
  
  toggleMenu() {
    if (this.isOpen) {
      this.closeMenu();
    } else {
      this.openMenu();
    }
  }
  
  openMenu() {
    this.isOpen = true;
    toggleClass(this.menu, 'active', true);
    this.toggle.setAttribute('aria-expanded', 'true');
    
    // Focus first menu item for accessibility
    const firstLink = qs('a', this.menu);
    if (firstLink) {
      firstLink.focus();
    }
    
    // Prevent body scroll on mobile
    document.body.style.overflow = 'hidden';
  }
  
  closeMenu() {
    this.isOpen = false;
    toggleClass(this.menu, 'active', false);
    this.toggle.setAttribute('aria-expanded', 'false');
    
    // Restore body scroll
    document.body.style.overflow = '';
  }
  
  updateActiveLink(clickedLink) {
    // Remove active class from all links
    const allLinks = qs('.nav-link');
    allLinks.forEach(link => {
      toggleClass(link, 'active', false);
    });
    
    // Add active class to clicked link
    toggleClass(clickedLink, 'active', true);
  }
  
  setActiveLink() {
    const currentPath = window.location.pathname;
    const navLinks = qs('.nav-link');
    
    navLinks.forEach(link => {
      const linkPath = new URL(link.href).pathname;
      
      if (linkPath === currentPath || 
          (currentPath === '/' && link.href.includes('index.html')) ||
          (currentPath.includes('index.html') && linkPath === '/')) {
        toggleClass(link, 'active', true);
      } else {
        toggleClass(link, 'active', false);
      }
    });
  }
}

// Auto-initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new MenuModule();
});