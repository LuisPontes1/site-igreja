document.addEventListener('DOMContentLoaded', () => {
  const includeTargets = document.querySelectorAll('[data-include]');
  includeTargets.forEach(async el => {
    const path = el.getAttribute('data-include');
    try {
      const res = await fetch(path);
      if (!res.ok) throw new Error(res.status + ' ' + res.statusText);
      el.innerHTML = await res.text();
      if (path.includes('header')) initNav();
      if (path.includes('footer')) setYear();
    } catch (e) {
      el.innerHTML = '<div class="small muted">Erro ao carregar componente.</div>';
      console.error('Include error', path, e);
    }
  });
});
function initNav() {
  const toggle = document.querySelector('.nav__toggle');
  const list = document.getElementById('nav-menu');
  if (!toggle || !list) return;
  toggle.addEventListener('click', () => {
    const open = list.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
  });
  list.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    list.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
  }));
}
function setYear() {
  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
}
