export function lockScroll() {
  const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
  document.body.style.overflow = 'hidden';
  document.body.style.position = 'fixed';
  document.body.style.top = `-${scrollPosition}px`;
  document.body.style.width = '100%';
  document.body.setAttribute('data-scroll-position', scrollPosition.toString());
}

export function unlockScroll() {
  const scrollPosition = parseInt(document.body.getAttribute('data-scroll-position') || '0', 10);
  document.body.style.overflow = '';
  document.body.style.position = '';
  document.body.style.top = '';
  document.body.style.width = '';
  window.scrollTo(0, scrollPosition);
  document.body.removeAttribute('data-scroll-position');
}