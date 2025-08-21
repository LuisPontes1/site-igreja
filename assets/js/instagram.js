const INSTAGRAM_REELS_URLS = [
  'https://www.instagram.com/reel/COLOQUE_ID1/',
  'https://www.instagram.com/reel/COLOQUE_ID2/',
  'https://www.instagram.com/reel/COLOQUE_ID3/'
];
const IG_OEMBED_TOKEN = null;
async function loadInstagramReels() {
  const container = document.getElementById('instagram-reels');
  if (!container) return;
  container.innerHTML = '<div class="small muted">Carregando reels...</div>';
  const urls = INSTAGRAM_REELS_URLS.slice(0, 3).filter(Boolean);
  if (!urls.length) { container.innerHTML = '<p class="small muted">Nenhuma URL configurada ainda.</p>'; return; }
  const results = await Promise.all(urls.map(fetchOEmbedSafe));
  container.innerHTML = '';
  results.forEach(html => {
    const wrap = document.createElement('div');
    wrap.className = 'reel-embed';
    wrap.innerHTML = html || 'Não foi possível carregar';
    container.appendChild(wrap);
  });
  ensureInstagramEmbedScript();
}
async function fetchOEmbedSafe(url) {
  try {
    const params = new URLSearchParams({ url, omit_script: 'true', maxwidth: '320', hidecaption: 'true' });
    if (IG_OEMBED_TOKEN) params.append('access_token', IG_OEMBED_TOKEN);
    const endpoint = 'https://graph.facebook.com/v17.0/instagram_oembed?' + params.toString();
    const res = await fetch(endpoint);
    if (!res.ok) throw new Error('HTTP ' + res.status);
    const data = await res.json();
    return data.html;
  } catch (e) { console.warn('Falha ao carregar oEmbed', url, e); return null; }
}
function ensureInstagramEmbedScript() {
  if (document.getElementById('instagram-embed-script')) return;
  const s = document.createElement('script');
  s.id = 'instagram-embed-script';
  s.src = 'https://www.instagram.com/embed.js';
  s.async = true;
  document.body.appendChild(s);
}
document.addEventListener('DOMContentLoaded', loadInstagramReels);
