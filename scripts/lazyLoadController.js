(() => {
  /**
   * Lazy Load Controller
   * Gerencia o carregamento suave de imagens com loading="lazy"
   * Adiciona animação de fade-in quando as imagens são carregadas
   */

  function init() {
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');

    if (!lazyImages.length) return;

    // Para cada imagem lazy
    lazyImages.forEach(img => {
      // Se a imagem já está carregada (do cache)
      if (img.complete && img.naturalHeight !== 0) {
        img.classList.add('loaded');
      } else {
        // Adiciona listener para quando carregar
        img.addEventListener('load', function onLoad() {
          this.classList.add('loaded');
          this.removeEventListener('load', onLoad);
        }, { once: true });

        // Fallback para erros de carregamento
        img.addEventListener('error', function onError() {
          this.classList.add('loaded');
          this.removeEventListener('error', onError);
        }, { once: true });
      }
    });
  }

  // Inicializa quando o DOM estiver pronto
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
