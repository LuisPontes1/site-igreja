/**
 * Contact Module
 * Handles contact form validation and submission
 */

import { qs, qsa, on, addClass, removeClass, create } from '../utils/dom.js';

class ContactModule {
  constructor() {
    this.form = null;
    this.submitButton = null;
    this.isSubmitting = false;
    
    this.init();
  }
  
  init() {
    this.form = qs('#contact-form');
    
    if (!this.form) {
      return;
    }
    
    this.submitButton = qs('[type="submit"]', this.form);
    this.bindEvents();
  }
  
  bindEvents() {
    // Form submission
    on(this.form, 'submit', (e) => {
      e.preventDefault();
      this.handleSubmit();
    });
    
    // Real-time validation on input change
    const inputs = qsa('input, textarea', this.form);
    inputs.forEach(input => {
      on(input, 'blur', () => this.validateField(input));
      on(input, 'input', () => this.clearFieldError(input));
    });
  }
  
  async handleSubmit() {
    if (this.isSubmitting) {
      return;
    }
    
    // Validate all fields
    const isValid = this.validateForm();
    
    if (!isValid) {
      this.focusFirstError();
      return;
    }
    
    this.isSubmitting = true;
    this.setLoadingState(true);
    
    try {
      // TODO: Replace with actual API endpoint
      // For now, simulate submission
      await this.simulateSubmission();
      
      this.showSuccess();
      this.resetForm();
    } catch (error) {
      console.error('Form submission error:', error);
      this.showError('Erro ao enviar mensagem. Tente novamente.');
    } finally {
      this.isSubmitting = false;
      this.setLoadingState(false);
    }
  }
  
  validateForm() {
    const inputs = qsa('input[required], textarea[required]', this.form);
    let isValid = true;
    
    inputs.forEach(input => {
      if (!this.validateField(input)) {
        isValid = false;
      }
    });
    
    // Validate email format
    const emailInput = qs('input[type="email"]', this.form);
    if (emailInput && emailInput.value) {
      if (!this.validateEmail(emailInput.value)) {
        this.setFieldError(emailInput, 'Por favor, insira um email válido.');
        isValid = false;
      }
    }
    
    return isValid;
  }
  
  validateField(field) {
    this.clearFieldError(field);
    
    if (field.hasAttribute('required') && !field.value.trim()) {
      this.setFieldError(field, 'Este campo é obrigatório.');
      return false;
    }
    
    if (field.type === 'email' && field.value && !this.validateEmail(field.value)) {
      this.setFieldError(field, 'Por favor, insira um email válido.');
      return false;
    }
    
    return true;
  }
  
  validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  
  setFieldError(field, message) {
    addClass(field, 'is-invalid');
    
    // Remove existing error message
    const existingError = field.parentElement.querySelector('.form-error');
    if (existingError) {
      existingError.remove();
    }
    
    // Add new error message
    const errorElement = create('span', {
      className: 'form-error',
      'aria-live': 'polite'
    }, message);
    
    field.parentElement.appendChild(errorElement);
    
    // Set ARIA attributes
    field.setAttribute('aria-invalid', 'true');
    field.setAttribute('aria-describedby', field.id + '-error');
    errorElement.id = field.id + '-error';
  }
  
  clearFieldError(field) {
    removeClass(field, 'is-invalid');
    field.removeAttribute('aria-invalid');
    field.removeAttribute('aria-describedby');
    
    const errorElement = field.parentElement.querySelector('.form-error');
    if (errorElement) {
      errorElement.remove();
    }
  }
  
  focusFirstError() {
    const firstErrorField = qs('.is-invalid', this.form);
    if (firstErrorField) {
      firstErrorField.focus();
    }
  }
  
  setLoadingState(loading) {
    if (!this.submitButton) return;
    
    if (loading) {
      this.submitButton.disabled = true;
      this.submitButton.innerHTML = '<span class="loading"></span>Enviando...';
    } else {
      this.submitButton.disabled = false;
      this.submitButton.innerHTML = 'Enviar Mensagem';
    }
  }
  
  async simulateSubmission() {
    // TODO: Replace with actual API call to serverless function
    // Example: await fetch('/api/contact', { method: 'POST', body: formData })
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Simulate occasional errors for testing
    if (Math.random() < 0.1) {
      throw new Error('Simulated network error');
    }
    
    console.log('Form data would be sent:', this.getFormData());
  }
  
  getFormData() {
    const formData = new FormData(this.form);
    const data = {};
    
    for (const [key, value] of formData.entries()) {
      data[key] = value;
    }
    
    return data;
  }
  
  showSuccess() {
    this.showMessage('Mensagem enviada com sucesso! Entraremos em contato em breve.', 'success');
  }
  
  showError(message) {
    this.showMessage(message, 'error');
  }
  
  showMessage(message, type) {
    // Remove existing alerts
    const existingAlert = qs('.alert', this.form.parentElement);
    if (existingAlert) {
      existingAlert.remove();
    }
    
    // Create new alert
    const alert = create('div', {
      className: `alert alert-${type}`,
      'aria-live': 'polite'
    }, message);
    
    this.form.parentElement.insertBefore(alert, this.form);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
      if (alert.parentElement) {
        alert.remove();
      }
    }, 5000);
    
    // Scroll alert into view
    alert.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }
  
  resetForm() {
    this.form.reset();
    
    // Clear any remaining validation states
    const inputs = qsa('input, textarea', this.form);
    inputs.forEach(input => {
      this.clearFieldError(input);
    });
  }
}

// Auto-initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new ContactModule();
});