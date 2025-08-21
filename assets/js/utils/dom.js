/**
 * DOM Utility Functions
 * Provides common DOM manipulation utilities
 */

/**
 * Query selector - returns first matching element
 * @param {string} selector - CSS selector
 * @param {Element} context - Optional context element
 * @returns {Element|null}
 */
export function qs(selector, context = document) {
  return context.querySelector(selector);
}

/**
 * Query selector all - returns NodeList of matching elements
 * @param {string} selector - CSS selector
 * @param {Element} context - Optional context element
 * @returns {NodeList}
 */
export function qsa(selector, context = document) {
  return context.querySelectorAll(selector);
}

/**
 * Add event listener with optional delegation
 * @param {Element|string} element - Element or CSS selector
 * @param {string} event - Event type
 * @param {Function} handler - Event handler function
 * @param {boolean|object} options - Event listener options
 */
export function on(element, event, handler, options = false) {
  const target = typeof element === 'string' ? qs(element) : element;
  if (target) {
    target.addEventListener(event, handler, options);
  }
}

/**
 * Remove event listener
 * @param {Element|string} element - Element or CSS selector
 * @param {string} event - Event type
 * @param {Function} handler - Event handler function
 * @param {boolean|object} options - Event listener options
 */
export function off(element, event, handler, options = false) {
  const target = typeof element === 'string' ? qs(element) : element;
  if (target) {
    target.removeEventListener(event, handler, options);
  }
}

/**
 * Create element with optional attributes and children
 * @param {string} tag - HTML tag name
 * @param {object} attributes - Attributes to set
 * @param {string|Element|Array} children - Children to append
 * @returns {Element}
 */
export function create(tag, attributes = {}, children = []) {
  const element = document.createElement(tag);
  
  // Set attributes
  Object.entries(attributes).forEach(([key, value]) => {
    if (key === 'className' || key === 'class') {
      element.className = value;
    } else if (key.startsWith('data-')) {
      element.setAttribute(key, value);
    } else if (key in element) {
      element[key] = value;
    } else {
      element.setAttribute(key, value);
    }
  });
  
  // Append children
  const childArray = Array.isArray(children) ? children : [children];
  childArray.forEach(child => {
    if (typeof child === 'string') {
      element.appendChild(document.createTextNode(child));
    } else if (child instanceof Element) {
      element.appendChild(child);
    }
  });
  
  return element;
}

/**
 * Toggle class on element
 * @param {Element|string} element - Element or CSS selector
 * @param {string} className - Class name to toggle
 * @param {boolean} force - Optional force add/remove
 */
export function toggleClass(element, className, force) {
  const target = typeof element === 'string' ? qs(element) : element;
  if (target) {
    return target.classList.toggle(className, force);
  }
}

/**
 * Add class to element
 * @param {Element|string} element - Element or CSS selector
 * @param {string} className - Class name to add
 */
export function addClass(element, className) {
  const target = typeof element === 'string' ? qs(element) : element;
  if (target) {
    target.classList.add(className);
  }
}

/**
 * Remove class from element
 * @param {Element|string} element - Element or CSS selector
 * @param {string} className - Class name to remove
 */
export function removeClass(element, className) {
  const target = typeof element === 'string' ? qs(element) : element;
  if (target) {
    target.classList.remove(className);
  }
}

/**
 * Check if element has class
 * @param {Element|string} element - Element or CSS selector
 * @param {string} className - Class name to check
 * @returns {boolean}
 */
export function hasClass(element, className) {
  const target = typeof element === 'string' ? qs(element) : element;
  return target ? target.classList.contains(className) : false;
}

/**
 * Load script dynamically
 * @param {string} src - Script source URL
 * @param {object} options - Script options
 * @returns {Promise}
 */
export function loadScript(src, options = {}) {
  return new Promise((resolve, reject) => {
    // Check if script is already loaded
    if (qs(`script[src="${src}"]`)) {
      resolve();
      return;
    }
    
    const script = create('script', {
      src,
      async: options.async !== false,
      defer: options.defer || false,
      type: options.type || 'text/javascript',
      ...options.attributes
    });
    
    script.onload = resolve;
    script.onerror = reject;
    
    document.head.appendChild(script);
  });
}

/**
 * Wait for DOM to be ready
 * @param {Function} callback - Function to execute when DOM is ready
 */
export function ready(callback) {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', callback);
  } else {
    callback();
  }
}

/**
 * Debounce function execution
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @param {boolean} immediate - Execute immediately
 * @returns {Function}
 */
export function debounce(func, wait, immediate = false) {
  let timeout;
  
  return function executedFunction(...args) {
    const later = () => {
      timeout = null;
      if (!immediate) func(...args);
    };
    
    const callNow = immediate && !timeout;
    
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    
    if (callNow) func(...args);
  };
}

/**
 * Throttle function execution
 * @param {Function} func - Function to throttle
 * @param {number} limit - Limit time in milliseconds
 * @returns {Function}
 */
export function throttle(func, limit) {
  let inThrottle;
  
  return function executedFunction(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}