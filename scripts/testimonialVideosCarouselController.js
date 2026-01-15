(() => {
  // Array de vídeos de depoimentos
  const testimonialVideos = [
    { videoId: '8QZBoXdy8Rs', title: 'Depoimento 1' },
    { videoId: '6PniZF-UvjM', title: 'Depoimento 2' },
    { videoId: 'WmTOAEk5oNw', title: 'Depoimento 3' },
    { videoId: '4HuxiJ9oFTY', title: 'Depoimento 4' },
    { videoId: 'GYwUzWv9d3Q', title: 'Depoimento 5' },
    { videoId: 'nG-9m9bvDG0', title: 'Depoimento 6' },
    { videoId: 'DWpP2Zr3XMI', title: 'Depoimento 7' },
    { videoId: '99yYtDsgYt4', title: 'Depoimento 8' },
    { videoId: 'lHXBHiO25kQ', title: 'Depoimento 9' },
    { videoId: 'GZOKIJGp2hY', title: 'Depoimento 10' }
  ];

  let currentIndex = 0;
  let isAnimating = false;
  let trackWidth = 0;
  let itemWidth = 0;
  let gap = 0;

  const track = document.getElementById('testimonialTrack');
  const prevBtn = document.querySelector('.testimonial-btn-prev');
  const nextBtn = document.querySelector('.testimonial-btn-next');

  function createVideoElement(video) {
    const videoWrapper = document.createElement('div');
    videoWrapper.className = 'testimonial-video-item';

    const liteYoutube = document.createElement('lite-youtube');
    liteYoutube.setAttribute('videoid', video.videoId);
    liteYoutube.setAttribute('params', 'controls=0&modestbranding=1&rel=0&showinfo=0&enablejsapi=1');
    liteYoutube.classList.add('testimonial-video');

    // Adiciona listener de clique para rastrear quando o vídeo é ativado
    liteYoutube.addEventListener('click', function() {
      // Marca como ativo com atributo personalizado
      liteYoutube.setAttribute('data-video-playing', 'true');
    });

    videoWrapper.appendChild(liteYoutube);
    return videoWrapper;
  }


  function calculateDimensions() {
    const firstItem = track.querySelector('.testimonial-video-item');
    if (!firstItem) return;

    itemWidth = firstItem.offsetWidth;
    const computedStyle = window.getComputedStyle(track);
    gap = parseFloat(computedStyle.gap) || 20;
    trackWidth = (itemWidth + gap) * testimonialVideos.length;
  }

  function cloneSlides() {
    // Remove clones existentes
    const clones = track.querySelectorAll('[data-clone]');
    clones.forEach(clone => clone.remove());

    const allItems = Array.from(track.children);

    // Cria clones no final
    allItems.forEach(item => {
      const clone = item.cloneNode(true);
      clone.setAttribute('data-clone', 'end');
      track.appendChild(clone);
    });

    // Cria clones no início
    allItems.reverse().forEach(item => {
      const clone = item.cloneNode(true);
      clone.setAttribute('data-clone', 'start');
      track.insertBefore(clone, track.firstChild);
    });
  }


  function pauseAllVideos() {
    // Busca todos os lite-youtube que foram marcados como tocando
    const playingVideos = track.querySelectorAll('lite-youtube[data-video-playing="true"]');

    playingVideos.forEach((liteYoutube) => {
      // Simplesmente remove o atributo para resetar o estado
      liteYoutube.removeAttribute('data-video-playing');
      liteYoutube.classList.remove('lyt-activated');

      // Tenta remover iframe se existir
      const iframe = liteYoutube.querySelector('iframe');
      if (iframe && iframe.parentNode) {
        iframe.remove();
      }
    });
  }

  function updateVideoStates() {
    // Pausa todos os vídeos antes de mudar
    pauseAllVideos();

    // Desabilita/habilita vídeos baseado na posição
    const allItems = track.querySelectorAll('.testimonial-video-item');
    const centerIndex = currentIndex + testimonialVideos.length;

    allItems.forEach((item, index) => {
      const video = item.querySelector('lite-youtube');
      if (!video) return;

      if (index === centerIndex) {
        // Vídeo centralizado - pode ser reproduzido
        video.style.pointerEvents = 'auto';
        video.style.opacity = '1';
        item.classList.add('active-video');
        item.classList.remove('inactive-video');
      } else {
        // Vídeos laterais - não podem ser reproduzidos
        video.style.pointerEvents = 'none';
        video.style.opacity = '0.7';
        item.classList.remove('active-video');
        item.classList.add('inactive-video');
      }
    });
  }

  function updatePosition(animate = true) {
    if (!track) return;

    calculateDimensions();

    if (animate) {
      track.classList.remove('no-transition');
    } else {
      track.classList.add('no-transition');
    }

    // Calcula a largura do container
    const container = track.parentElement;
    const containerWidth = container.offsetWidth;

    // Posição base = (index atual + quantidade de vídeos originais) * (largura do item + gap)
    // O +testimonialVideos.length é porque temos clones no início
    const basePosition = (currentIndex + testimonialVideos.length) * (itemWidth + gap);

    // Centraliza: subtrai metade da largura do container e adiciona metade do card
    const centerOffset = (containerWidth / 2) - (itemWidth / 2);

    const position = -(basePosition - centerOffset);
    track.style.transform = `translateX(${position}px)`;

    // Update video states
    updateVideoStates();

    // Força reflow para garantir que a transição seja aplicada
    if (!animate) {
      void track.offsetHeight;
    }
  }


  function checkInfiniteLoop() {
    // Se passou do final, volta pro início sem animação
    if (currentIndex >= testimonialVideos.length) {
      setTimeout(() => {
        currentIndex = 0;
        updatePosition(false);
      }, 500);
    }

    // Se passou do início, vai pro final sem animação
    if (currentIndex < 0) {
      setTimeout(() => {
        currentIndex = testimonialVideos.length - 1;
        updatePosition(false);
      }, 500);
    }
  }

  function nextSlide() {
    if (isAnimating) return;
    isAnimating = true;

    currentIndex++;
    updatePosition(true);
    checkInfiniteLoop();

    setTimeout(() => {
      isAnimating = false;
    }, 500);
  }

  function prevSlide() {
    if (isAnimating) return;
    isAnimating = true;

    currentIndex--;
    updatePosition(true);
    checkInfiniteLoop();

    setTimeout(() => {
      isAnimating = false;
    }, 500);
  }


  function init() {
    if (!track) return;

    // Criar vídeos originais
    testimonialVideos.forEach((video) => {
      const videoElement = createVideoElement(video);
      track.appendChild(videoElement);
    });

    // Aguarda as imagens carregarem
    setTimeout(() => {
      calculateDimensions();
      cloneSlides();
      updatePosition(false);
    }, 100);

    // Event listeners
    if (prevBtn) {
      prevBtn.addEventListener('click', prevSlide);
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', nextSlide);
    }

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      const section = track.closest('section');
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const isInView = rect.top < window.innerHeight && rect.bottom > 0;
      if (!isInView) return;

      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        prevSlide();
      }
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        nextSlide();
      }
    });

    // Touch/swipe support
    let touchStartX = 0;
    let touchEndX = 0;

    track.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    track.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      const swipeThreshold = 50;

      if (touchEndX < touchStartX - swipeThreshold) {
        nextSlide();
      }
      if (touchEndX > touchStartX + swipeThreshold) {
        prevSlide();
      }
    }, { passive: true });

    // Recalcular ao redimensionar
    let resizeTimeout;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        calculateDimensions();
        cloneSlides();
        updatePosition(false);
      }, 250);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
