const toggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('#navigation');
document.documentElement.classList.add('nav-ready');
const mobileNavigation = matchMedia('(max-width: 760px)');
function closeNavigation(restoreFocus = false) {
  nav.classList.remove('open');
  toggle.setAttribute('aria-expanded', 'false');
  if (restoreFocus) toggle.focus();
}
mobileNavigation.addEventListener('change', () => closeNavigation());
document.addEventListener('click', event => {
  if (nav.classList.contains('open') && !event.target.closest('header')) closeNavigation();
});
toggle.addEventListener('click', () => {
  const expanded = toggle.getAttribute('aria-expanded') !== 'true';
  toggle.setAttribute('aria-expanded', String(expanded));
  nav.classList.toggle('open', expanded);
});
nav.addEventListener('click', event => {
  if (event.target.closest('a')) { nav.classList.remove('open'); toggle.setAttribute('aria-expanded', 'false'); }
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && nav.classList.contains('open')) { nav.classList.remove('open'); toggle.setAttribute('aria-expanded', 'false'); toggle.focus(); }
});
document.querySelector('#full-menu').addEventListener('click', event => {
  const button = event.currentTarget;
  const expanded = button.getAttribute('aria-expanded') !== 'true';
  button.setAttribute('aria-expanded', String(expanded));
  document.querySelector('#menu-details').hidden = !expanded;
  button.innerHTML = expanded ? 'Close menu details <span>−</span>' : 'See the full menu <span>→</span>';
});
document.querySelector('#directions').addEventListener('click', () => {
  document.querySelector('#visit-status').textContent = 'Directions are pending: a verified business address has not been supplied. Please check back once the location is confirmed.';
});
