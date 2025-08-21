/**
 * Instagram Reels Module
 * Handles displaying Instagram Reels with lazy loading
 */

import { qs, qsa, create, loadScript } from '../utils/dom.js';

class InstaReelsModule {
  constructor() {
    this.container = null;
    this.instagramLoaded = false;
    
    // TODO: Replace with your actual Instagram Reels URLs
    this.REELS_URLS = [
      'https://www.instagram.com/reel/example1/',
      'https://www.instagram.com/reel/example2/',
      'https://www.instagram.com/reel/example3/'
    ];
    
    this.init();
  }
  
  init() {
    this.container = qs('#instagram-reels');
    
    if (!this.container) {
      return;
    }
    
    this.renderReels();
  }
  
  renderReels() {
    // Create grid container
    const grid = create('div', {
      className: 'reels-grid'
    });
    
    this.REELS_URLS.forEach((url, index) => {
      const reelCard = this.createReelCard(url, index);
      grid.appendChild(reelCard);
    });
    
    this.container.appendChild(grid);
    
    // Add load button for Instagram embeds
    const loadButton = create('button', {
      className: 'btn btn-primary btn-lg',
      type: 'button'
    }, 'Carregar Reels do Instagram');
    
    loadButton.addEventListener('click', () => {
      this.loadInstagramEmbeds();
      loadButton.remove();
    });
    
    this.container.appendChild(loadButton);
  }
  
  createReelCard(url, index) {
    const card = create('div', {
      className: 'card reel-card',
      'data-reel-url': url,
      'data-reel-index': index
    });
    
    // Create placeholder content
    const placeholder = create('div', {
      className: 'reel-placeholder'
    });
    
    // Instagram icon (using a simple SVG)
    const icon = create('div', {
      innerHTML: `
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
        </svg>
      `
    });
    
    const text = create('p', {}, 'Reel do Instagram');
    const subtitle = create('small', {}, `#${index + 1}`);
    
    placeholder.appendChild(icon);
    placeholder.appendChild(text);
    placeholder.appendChild(subtitle);
    card.appendChild(placeholder);
    
    return card;
  }
  
  async loadInstagramEmbeds() {
    if (this.instagramLoaded) {
      return;
    }
    
    try {
      // Load Instagram embed script
      await loadScript('https://www.instagram.com/embed.js');
      this.instagramLoaded = true;
      
      // Replace placeholder cards with actual embeds
      const reelCards = qsa('.reel-card', this.container);
      
      reelCards.forEach((card, index) => {
        const url = card.dataset.reelUrl;
        this.replaceWithEmbed(card, url, index);
      });
      
      // Process embeds after DOM updates
      setTimeout(() => {
        if (window.instgrm && window.instgrm.Embeds) {
          window.instgrm.Embeds.process();
        }
      }, 100);
      
    } catch (error) {
      console.error('Failed to load Instagram embeds:', error);
      this.showError();
    }
  }
  
  replaceWithEmbed(card, url, index) {
    // TODO: For demo purposes, we'll show a more detailed placeholder
    // In production, you would create actual Instagram blockquote elements
    // according to Instagram's embed documentation
    
    const embedPlaceholder = create('div', {
      className: 'reel-placeholder',
      style: 'background: linear-gradient(45deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%); color: white;'
    });
    
    const content = create('div', {
      innerHTML: `
        <div style="text-align: center; padding: 2rem;">
          <h4 style="margin-bottom: 1rem; color: white;">Instagram Reel</h4>
          <p style="margin-bottom: 1rem; opacity: 0.9; color: white;">
            TODO: Este será substituído pelo embed real do Instagram
          </p>
          <small style="opacity: 0.8; color: white;">
            URL: ${url}
          </small>
          <div style="margin-top: 1rem;">
            <a href="${url}" target="_blank" rel="noopener" style="color: white; text-decoration: underline;">
              Ver no Instagram
            </a>
          </div>
        </div>
      `
    });
    
    embedPlaceholder.appendChild(content);
    
    // Clear card and add new content
    card.innerHTML = '';
    card.appendChild(embedPlaceholder);
    
    // Add loaded class for styling
    card.classList.add('reel-loaded');
  }
  
  showError() {
    const errorMessage = create('div', {
      className: 'alert alert-error',
      innerHTML: `
        <strong>Erro ao carregar Reels</strong><br>
        Não foi possível carregar os Reels do Instagram. 
        <a href="https://instagram.com/TODO_SEU_HANDLE" target="_blank" rel="noopener">
          Visite nosso Instagram
        </a>
      `
    });
    
    this.container.appendChild(errorMessage);
  }
  
  // Method to update reels URLs (for future use)
  updateReels(newUrls) {
    this.REELS_URLS = newUrls;
    
    // Clear container and re-render
    this.container.innerHTML = '';
    this.instagramLoaded = false;
    this.renderReels();
  }
  
  // TODO: Method to fetch reels from serverless function
  async fetchReelsFromAPI() {
    try {
      // Example API call - replace with your serverless function
      const response = await fetch('/api/instagram-reels');
      const data = await response.json();
      
      if (data.success && data.reels) {
        this.updateReels(data.reels);
      }
    } catch (error) {
      console.error('Failed to fetch reels from API:', error);
    }
  }
}

// Auto-initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new InstaReelsModule();
});