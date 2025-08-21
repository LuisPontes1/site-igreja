const CHURCH_COORDS = { lat: -23.55052, lng: -46.633308 };
function initMap() {
  const mapEl = document.getElementById('map');
  if (!mapEl || !window.google) return;
  const map = new google.maps.Map(mapEl, { center: CHURCH_COORDS, zoom: 15 });
  const marker = new google.maps.Marker({ position: CHURCH_COORDS, map, title: 'Igreja Esperança Viva' });
  const info = new google.maps.InfoWindow({ content: '<strong>Igreja Esperança Viva</strong><br/>Rua Exemplo, 123' });
  marker.addListener('click', () => info.open({ map, anchor: marker }));
}
window.initMap = initMap;
