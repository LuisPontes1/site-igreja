function validateContact(e) {
  e.preventDefault();
  const form = e.target;
  const status = document.getElementById('form-status');
  status.textContent = 'Enviando...';
  setTimeout(() => {
    status.textContent = 'Mensagem enviada! Obrigado pelo contato.';
    form.reset();
  }, 800);
  return false;
}
const observer = 'IntersectionObserver' in window ? new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('fade-in');
      observer.unobserve(entry.target);
    }
  });
}) : null;
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('section').forEach(sec => observer && observer.observe(sec));
});
