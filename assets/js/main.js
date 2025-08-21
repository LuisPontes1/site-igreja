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
  initScrollSpy();
});

// ScrollSpy simples para destacar link ativo no menu
function initScrollSpy() {
  const links = Array.from(document.querySelectorAll('.nav__list a[href^="#"]'));
  if (!links.length) return;
  const sections = links
    .map(l => document.querySelector(l.getAttribute('href')))
    .filter(Boolean);
  let ticking = false;
  function onScroll() {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        const fromTop = window.scrollY + 120; // compensar header
        let current = null;
        for (const sec of sections) {
          if (sec.offsetTop <= fromTop && (sec.offsetTop + sec.offsetHeight) > fromTop) {
            current = sec; break;
          }
        }
        links.forEach(a => a.classList.toggle('active', current && a.getAttribute('href') === '#' + current.id));
        ticking = false;
      });
      ticking = true;
    }
  }
  window.addEventListener('scroll', onScroll, { passive:true });
  onScroll();
}
