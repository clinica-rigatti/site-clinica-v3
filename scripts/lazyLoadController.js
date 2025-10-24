(() => {
  /**
   * Lazy Load Controller - OTIMIZADO
   * Gerencia o carregamento suave de imagens com loading="lazy"
   */

  function init() {
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    if (!lazyImages.length) return;

    // Event delegation é mais performático
    const handleImageLoad = (e) => {
      if (e.target.tagName === 'IMG' && e.target.hasAttribute('loading')) {
        e.target.classList.add('loaded');
      }
    };

    // Um único listener para todas as imagens
    document.addEventListener('load', handleImageLoad, true);

    // Processa imagens já carregadas (cache) em um único loop
    requestIdleCallback(() => {
      lazyImages.forEach(img => {
        if (img.complete && img.naturalHeight !== 0) {
          img.classList.add('loaded');
        }
      });
    }, { timeout: 1000 });
  }

  // Defer initialization
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true, passive: true });
  } else {
    requestIdleCallback(init);
  }
})();
