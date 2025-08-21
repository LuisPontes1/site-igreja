/**
 * Map Module
 * Handles Google Maps lazy loading and display
 */

import { qs, on, create } from '../utils/dom.js';

class MapModule {
  constructor() {
    this.container = null;
    this.mapLoaded = false;
    
    // TODO: Replace with your actual church address
    this.CHURCH_ADDRESS = 'Rua Exemplo, 123, Bairro, Cidade - Estado, CEP';
    
    // TODO: Replace with your Google Maps embed URL
    // Go to Google Maps, search for your address, click Share > Embed a map
    // Copy the src URL from the iframe
    this.GOOGLE_MAPS_URL = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3657.0975!2d-46.6333!3d-23.5505!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDMzJzAxLjgiUyA0NsKwMzcnNTkuOSJX!5e0!3m2!1spt-BR!2sbr!4v1234567890123!5m2!1spt-BR!2sbr';
    
    this.init();
  }
  
  init() {
    this.container = qs('#google-maps');
    
    if (!this.container) {
      return;
    }
    
    this.renderMapPlaceholder();
  }
  
  renderMapPlaceholder() {
    // Create map container with placeholder
    const mapContainer = create('div', {
      className: 'map-container'
    });
    
    // Create placeholder content
    const placeholder = create('div', {
      className: 'map-placeholder',
      id: 'map-placeholder'
    });
    
    // Map icon
    const icon = create('div', {
      innerHTML: `
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
        </svg>
      `
    });
    
    // Address info
    const addressInfo = create('div', {}, [
      create('h4', {}, 'Nossa Localização'),
      create('p', {}, this.CHURCH_ADDRESS),
      create('p', {
        style: 'margin-top: 1rem;'
      }, 'Clique no botão abaixo para carregar o mapa interativo')
    ]);
    
    // Load button
    const loadButton = create('button', {
      className: 'btn btn-primary',
      type: 'button'
    }, 'Carregar Mapa');
    
    // Bind load event
    on(loadButton, 'click', () => {
      this.loadMap();
    });
    
    // Assemble placeholder
    placeholder.appendChild(icon);
    placeholder.appendChild(addressInfo);
    placeholder.appendChild(loadButton);
    mapContainer.appendChild(placeholder);
    
    // Add address display below map
    const addressDisplay = this.createAddressDisplay();
    
    this.container.appendChild(mapContainer);
    this.container.appendChild(addressDisplay);
  }
  
  createAddressDisplay() {
    const addressSection = create('div', {
      className: 'contact-info',
      style: 'margin-top: 2rem;'
    });
    
    // Location info
    const locationItem = create('div', {
      className: 'contact-item'
    });
    
    const locationIcon = create('div', {
      className: 'contact-icon',
      innerHTML: `
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
        </svg>
      `
    });
    
    const locationDetails = create('div', {
      className: 'contact-details'
    }, [
      create('h4', {}, 'Endereço'),
      create('p', {}, this.CHURCH_ADDRESS)
    ]);
    
    locationItem.appendChild(locationIcon);
    locationItem.appendChild(locationDetails);
    
    // Directions link
    const directionsItem = create('div', {
      className: 'contact-item'
    });
    
    const directionsIcon = create('div', {
      className: 'contact-icon',
      innerHTML: `
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M21.71 11.29l-9-9a.996.996 0 00-1.41 0l-9 9a.996.996 0 000 1.41l9 9a.996.996 0 001.41 0l9-9a.996.996 0 000-1.41z"/>
        </svg>
      `
    });
    
    const directionsDetails = create('div', {
      className: 'contact-details'
    }, [
      create('h4', {}, 'Como Chegar'),
      create('p', {}, [
        create('a', {
          href: this.getDirectionsUrl(),
          target: '_blank',
          rel: 'noopener',
          style: 'color: var(--color-primary);'
        }, 'Obter direções no Google Maps')
      ])
    ]);
    
    directionsItem.appendChild(directionsIcon);
    directionsItem.appendChild(directionsDetails);
    
    addressSection.appendChild(locationItem);
    addressSection.appendChild(directionsItem);
    
    return addressSection;
  }
  
  loadMap() {
    if (this.mapLoaded) {
      return;
    }
    
    const placeholder = qs('#map-placeholder');
    if (!placeholder) {
      return;
    }
    
    // Show loading state
    this.showLoadingState(placeholder);
    
    // Create iframe
    const iframe = create('iframe', {
      className: 'map-iframe',
      src: this.GOOGLE_MAPS_URL,
      loading: 'lazy',
      allowfullscreen: '',
      referrerpolicy: 'no-referrer-when-downgrade',
      title: 'Localização da Igreja Exemplo'
    });
    
    // Handle iframe load
    on(iframe, 'load', () => {
      this.mapLoaded = true;
      placeholder.remove();
    });
    
    // Handle iframe error
    on(iframe, 'error', () => {
      this.showError(placeholder);
    });
    
    // Add iframe to container
    placeholder.parentElement.appendChild(iframe);
  }
  
  showLoadingState(placeholder) {
    placeholder.innerHTML = `
      <div style="text-align: center; padding: 2rem;">
        <div class="loading" style="width: 2rem; height: 2rem; margin: 0 auto 1rem;"></div>
        <p>Carregando mapa...</p>
      </div>
    `;
  }
  
  showError(placeholder) {
    placeholder.innerHTML = `
      <div style="text-align: center; padding: 2rem;">
        <div style="color: #dc3545; margin-bottom: 1rem;">
          <svg width="2rem" height="2rem" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
          </svg>
        </div>
        <h4>Erro ao carregar mapa</h4>
        <p>Não foi possível carregar o mapa do Google Maps.</p>
        <a href="${this.getDirectionsUrl()}" target="_blank" rel="noopener" class="btn btn-primary" style="margin-top: 1rem;">
          Abrir no Google Maps
        </a>
      </div>
    `;
  }
  
  getDirectionsUrl() {
    // Create Google Maps directions URL
    const encodedAddress = encodeURIComponent(this.CHURCH_ADDRESS);
    return `https://www.google.com/maps/dir/?api=1&destination=${encodedAddress}`;
  }
  
  // Method to update address (for future use)
  updateAddress(newAddress, newMapUrl) {
    this.CHURCH_ADDRESS = newAddress;
    this.GOOGLE_MAPS_URL = newMapUrl;
    
    // Re-render if container exists
    if (this.container) {
      this.container.innerHTML = '';
      this.mapLoaded = false;
      this.renderMapPlaceholder();
    }
  }
}

// Auto-initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new MapModule();
});