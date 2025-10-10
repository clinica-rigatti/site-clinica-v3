(() => {
  const TOLERANCE = 1;

  function getStep(track) {
    const card = track.querySelector('.service-card');
    if (!card) return track.clientWidth * 0.9;
    const rect = card.getBoundingClientRect();
    const styles = getComputedStyle(track);
    const gap = parseFloat(styles.columnGap || styles.gap || 0);
    return rect.width + gap;
  }

  function updateButtons(track, prevBtn, nextBtn) {
    const maxScroll = track.scrollWidth - track.clientWidth;
    if (prevBtn) {
      prevBtn.disabled = track.scrollLeft <= TOLERANCE;
      if (track.scrollLeft <= TOLERANCE) {
        prevBtn.classList.add('opacity-50', 'cursor-not-allowed');
      } else {
        prevBtn.classList.remove('opacity-50', 'cursor-not-allowed');
      }
    }
    if (nextBtn) {
      nextBtn.disabled = track.scrollLeft >= maxScroll - TOLERANCE;
      if (track.scrollLeft >= maxScroll - TOLERANCE) {
        nextBtn.classList.add('opacity-50', 'cursor-not-allowed');
      } else {
        nextBtn.classList.remove('opacity-50', 'cursor-not-allowed');
      }
    }
  }

  function makeDragHandlers(track) {
    let isDown = false, startX = 0, scrollLeft = 0;

    const onDown = (clientX) => {
      isDown = true;
      track.classList.add('cursor-grabbing');
      track.classList.remove('cursor-grab');
      startX = clientX - track.getBoundingClientRect().left;
      scrollLeft = track.scrollLeft;
    };

    const onMove = (clientX, e) => {
      if (!isDown) return;
      e && e.preventDefault();
      const x = clientX - track.getBoundingClientRect().left;
      const walk = (x - startX);
      track.scrollLeft = scrollLeft - walk;
    };

    const onUp = () => {
      isDown = false;
      track.classList.remove('cursor-grabbing');
      track.classList.add('cursor-grab');
    };

    track.addEventListener('mousedown', (e) => onDown(e.pageX));
    window.addEventListener('mousemove', (e) => onMove(e.pageX, e));
    window.addEventListener('mouseup', onUp);

    track.addEventListener('touchstart', (e) => onDown(e.touches[0].pageX), { passive: true });
    track.addEventListener('touchmove', (e) => onMove(e.touches[0].pageX, e), { passive: false });
    window.addEventListener('touchend', onUp);
  }

  function initCarousel(container) {
    const track = container.querySelector('.services');
    const prevBtn = container.querySelector('.services-btn-prev');
    const nextBtn = container.querySelector('.services-btn-next');
    
    if (!track) return;

    const scrollByStep = (dir) => {
      const step = getStep(track);
      track.scrollBy({ left: dir * step, behavior: 'smooth' });
    };

    if (prevBtn) prevBtn.addEventListener('click', () => scrollByStep(-1));
    if (nextBtn) nextBtn.addEventListener('click', () => scrollByStep(1));

    track.setAttribute('tabindex', '0');
    track.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') { e.preventDefault(); scrollByStep(-1); }
      if (e.key === 'ArrowRight') { e.preventDefault(); scrollByStep(1); }
    });

    makeDragHandlers(track);

    const refresh = () => updateButtons(track, prevBtn, nextBtn);
    track.addEventListener('scroll', refresh, { passive: true });
    window.addEventListener('resize', refresh);
    refresh();
  }

  function initAll() {
    const container = document.querySelector('.services')?.closest('.relative');
    if (container) {
      initCarousel(container);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAll);
  } else {
    initAll();
  }

  window.RigattiServicesCarouselInit = initAll;
})();