// Menu mobile
// ========================================================
document.addEventListener('DOMContentLoaded', () => {
  // Mobile menu toggle
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileNav = document.querySelector('.header__nav-mobile');
  if (mobileMenuBtn && mobileNav) {
    mobileMenuBtn.addEventListener('click', () => {
      // mobileMenuBtn.classList.toggle('hidden');
      mobileNav.classList.toggle('hidden');
    });
    document.querySelectorAll('.header__nav-link').forEach(link => {
      link.addEventListener('click', () => {
        // mobileMenuBtn.classList.remove('hidden');
        mobileNav.classList.toggle('hidden');
      });
    });
    document.addEventListener('click', e => {
      if (!mobileMenuBtn.contains(e.target) && !mobileNav.contains(e.target)) {
        // mobileMenuBtn.classList.remove('hidden');
        mobileNav.classList.add('hidden');
      }
    });
  }
});

// Carrosel dos cards de serviços
// ====================================================
(() => {
  const TOLERANCE = 1; // margem p/ cálculo de extremos

  function getStep(track) {
    const card = track.querySelector('.service-card');
    if (!card) return track.clientWidth * 0.9; // fallback
    const rect = card.getBoundingClientRect();
    const styles = getComputedStyle(track);
    const gap = parseFloat(styles.columnGap || styles.gap || 0);
    return rect.width + gap;
  }

  function updateButtons(track, prevBtn, nextBtn) {
    // desabilita quando está no começo/fim
    const maxScroll = track.scrollWidth - track.clientWidth;
    if (prevBtn) prevBtn.disabled = track.scrollLeft <= TOLERANCE;
    if (nextBtn) nextBtn.disabled = track.scrollLeft >= maxScroll - TOLERANCE;
  }

  function makeDragHandlers(track) {
    let isDown = false, startX = 0, scrollLeft = 0;

    const onDown = (clientX) => {
      isDown = true;
      track.classList.add('grabbing');
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
      track.classList.remove('grabbing');
    };

    // mouse
    track.addEventListener('mousedown', (e) => onDown(e.pageX));
    window.addEventListener('mousemove', (e) => onMove(e.pageX, e));
    window.addEventListener('mouseup', onUp);

    // touch
    track.addEventListener('touchstart', (e) => onDown(e.touches[0].pageX), { passive: true });
    track.addEventListener('touchmove', (e) => onMove(e.touches[0].pageX, e), { passive: false });
    window.addEventListener('touchend', onUp);
  }

  function initCarousel(root) {
    const track = root.querySelector('.services');
    const prevBtn = root.querySelector('.services-btn.prev');
    const nextBtn = root.querySelector('.services-btn.next');
    if (!track) return;

    const scrollByStep = (dir) => {
      const step = getStep(track);
      track.scrollBy({ left: dir * step, behavior: 'smooth' });
    };

    // botões
    if (prevBtn) prevBtn.addEventListener('click', () => scrollByStep(-1));
    if (nextBtn) nextBtn.addEventListener('click', () => scrollByStep(1));

    // teclado (acessibilidade)
    track.setAttribute('tabindex', '0');
    track.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') { e.preventDefault(); scrollByStep(-1); }
      if (e.key === 'ArrowRight') { e.preventDefault(); scrollByStep(1); }
    });

    // arrastar/“swipe”
    makeDragHandlers(track);

    // estado inicial + ao rolar/resize
    const refresh = () => updateButtons(track, prevBtn, nextBtn);
    track.addEventListener('scroll', refresh, { passive: true });
    window.addEventListener('resize', refresh);
    refresh();
  }

  function initAll() {
    document.querySelectorAll('.services-carousel').forEach(initCarousel);
  }

  // auto-init quando o DOM estiver pronto
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAll);
  } else {
    initAll();
  }

  // opcional: expõe para reinit manual (ex.: conteúdo dinâmico)
  window.RigattiServicesCarouselInit = initAll;
})();

// Carrosel dos cards do time
// ====================================================
/* Carrossel infinito de cards — versão para arquivo externo
   - Suporta múltiplos carrosséis (.team-carousel) na mesma página
   - O primeiro item que sai vira o último, sem “pulos”
   - Pausa no hover/toque, respeita prefers-reduced-motion
   - Ajuste de velocidade por data-speed (px/s)
*/

(function () {
  function setupCarousel(root) {
    const track = root.querySelector('.team-track');
    if (!track) return;

    let SPEED = parseFloat(root.dataset.speed) || 60; // px/s
    let paused = false;

    // pausa no hover/mouse
    root.addEventListener('mouseenter', () => (paused = true));
    root.addEventListener('mouseleave', () => (paused = false));

    // pausa em toque
    root.addEventListener(
      'touchstart',
      () => {
        paused = true;
      },
      { passive: true }
    );
    root.addEventListener('touchend', () => {
      paused = false;
    });

    function getGap() {
      const s = getComputedStyle(track);
      return parseFloat(s.gap) || 0;
    }
    function itemFullWidth(el) {
      return el.getBoundingClientRect().width + getGap();
    }

    // Evita clonar infinitamente: guarda quantos itens eram “originais”
    const originalCount = track.children.length;

    function totalWidth() {
      return Array.from(track.children).reduce((acc, el) => acc + itemFullWidth(el), 0);
    }

    function fillIfNeeded() {
      const needWidth = root.clientWidth * 2; // dupla cobertura
      let tot = totalWidth();
      let i = 0;
      while (tot < needWidth && i < 200) {
        const clone = track.children[i % originalCount].cloneNode(true);
        track.appendChild(clone);
        tot += itemFullWidth(clone);
        i++;
      }
    }

    // loop
    let last = performance.now();
    let offset = 0; // translateX acumulado negativo

    function step(now) {
      const dt = (now - last) / 1000;
      last = now;

      if (!paused) {
        offset -= SPEED * dt;
        track.style.transform = `translateX(${offset}px)`;

        // recicla enquanto o primeiro item saiu totalmente
        let first = track.firstElementChild;
        while (first) {
          const w = itemFullWidth(first);
          if (Math.abs(offset) >= w) {
            track.appendChild(first); // primeiro vira o último
            offset += w; // corrige o translate para evitar salto
            track.style.transform = `translateX(${offset}px)`;
            first = track.firstElementChild;
            continue;
          }
          break;
        }
      }

      requestAnimationFrame(step);
    }

    // resize: reavalia cobertura
    let resizeRAF;
    function onResize() {
      cancelAnimationFrame(resizeRAF);
      resizeRAF = requestAnimationFrame(() => {
        fillIfNeeded();
      });
    }
    window.addEventListener('resize', onResize);

    // acessibilidade
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    function applyReducedMotion(e) {
      if (e.matches) {
        track.style.transform = 'none';
        root.style.overflowX = 'auto';
        return true;
      } else {
        root.style.overflowX = 'hidden';
        return false;
      }
    }

    if (!applyReducedMotion(mq)) {
      fillIfNeeded();
      requestAnimationFrame((t) => {
        last = t;
        requestAnimationFrame(step);
      });
    }
    mq.addEventListener?.('change', applyReducedMotion);
  }

  function init() {
    document.querySelectorAll('.team-carousel').forEach(setupCarousel);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

// Carrosel dos antes e depois
// ==============================
// Configuração do carrossel
const images = [
  { src: 'images/antes-e-depois-1.png', alt: 'Resultado 1' },
  { src: 'images/antes-e-depois-2.png', alt: 'Resultado 2' },
  { src: 'images/antes-e-depois-3.png', alt: 'Resultado 3' },
  { src: 'images/antes-e-depois-4.png', alt: 'Resultado 4' },
  { src: 'images/antes-e-depois-5.png', alt: 'Resultado 5' },
  { src: 'images/antes-e-depois-6.png', alt: 'Resultado 6' },
  { src: 'images/antes-e-depois-7.png', alt: 'Resultado 7' },
  { src: 'images/antes-e-depois-8.png', alt: 'Resultado 8' },
  { src: 'images/antes-e-depois-9.png', alt: 'Resultado 9' }
];

const track = document.getElementById('resultsTrack');
const prevBtn = document.querySelector('.results__button--prev');
const nextBtn = document.querySelector('.results__button--next');

let currentIndex = 0;
let isAnimating = false;

// Classes de tamanho para o padrão de 5 imagens
const sizeClasses = ['small', 'medium', 'large', 'medium', 'small'];

// Inicializa o carrossel
function initCarousel() {
  // Cria array com imagens duplicadas para efeito infinito
  const extendedImages = [...images, ...images, ...images];
  
  extendedImages.forEach((img, index) => {
    const imgElement = document.createElement('img');
    imgElement.src = img.src;
    imgElement.alt = img.alt;
    imgElement.className = 'results__image';
    
    track.appendChild(imgElement);
  });

  // Posiciona no conjunto do meio (primeira imagem do meio)
  currentIndex = images.length;
  updateCarousel(false);
}

// Atualiza posição e classes do carrossel
function updateCarousel(animate = true) {
  const allImages = track.querySelectorAll('.results__image');
  
  if (!animate) {
    track.style.transition = 'none';
  } else {
    track.style.transition = 'transform 1s ease';
  }

  // Primeiro atualiza as classes para calcular os tamanhos corretos
  allImages.forEach((img, index) => {
    const relativePos = index - currentIndex;
    let sizeClass;

    if (relativePos === 0) {
      sizeClass = 'large';
    } else if (relativePos === -1 || relativePos === 1) {
      sizeClass = 'medium';
    } else {
      sizeClass = 'small';
    }

    img.className = `results__image results__image--${sizeClass}`;
  });

  // Aguarda um frame para garantir que os tamanhos foram aplicados
  requestAnimationFrame(() => {
    // Calcula o deslocamento centralizado
    // Queremos centralizar a imagem 'large' na tela
    const container = document.querySelector('.results__container');
    const containerWidth = container.offsetWidth;
    
    let offset = 0;
    
    // Soma a largura de todas as imagens antes da imagem central
    for (let i = 0; i < currentIndex; i++) {
      const img = allImages[i];
      offset += img.offsetWidth + 20; // width + gap
    }
    
    // Adiciona metade da largura da imagem central
    const centralImage = allImages[currentIndex];
    offset += Math.ceil(centralImage.offsetWidth / 2);
    
    // Subtrai metade da largura do container para centralizar
    offset -= containerWidth / 2;

    track.style.transform = `translateX(-${offset}px)`;
  });
}

// Navega para o próximo
function nextSlide() {
  if (isAnimating) return;
  isAnimating = true;

  currentIndex++;
  updateCarousel();

  setTimeout(() => {
    // Se chegou no final do segundo conjunto, volta pro meio sem animação
    if (currentIndex >= images.length * 2) {
      currentIndex = images.length;
      updateCarousel(false);
    }
    isAnimating = false;
  }, 500);
}

// Navega para o anterior
function prevSlide() {
  if (isAnimating) return;
  isAnimating = true;

  currentIndex--;
  updateCarousel();

  setTimeout(() => {
    // Se chegou no início do primeiro conjunto, pula pro meio sem animação
    if (currentIndex < images.length) {
      currentIndex = images.length * 2 - 1;
      updateCarousel(false);
    }
    isAnimating = false;
  }, 500);
}

// Event listeners
nextBtn.addEventListener('click', nextSlide);
prevBtn.addEventListener('click', prevSlide);

// Suporte para teclado
document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowLeft') prevSlide();
  if (e.key === 'ArrowRight') nextSlide();
});

// Suporte para touch/swipe em mobile
let touchStartX = 0;
let touchEndX = 0;

track.addEventListener('touchstart', (e) => {
  touchStartX = e.changedTouches[0].screenX;
});

track.addEventListener('touchend', (e) => {
  touchEndX = e.changedTouches[0].screenX;
  handleSwipe();
});

function handleSwipe() {
  if (touchEndX < touchStartX - 50) nextSlide();
  if (touchEndX > touchStartX + 50) prevSlide();
}

// Inicializa ao carregar
initCarousel();

// Recalcula posições ao redimensionar a janela
window.addEventListener('resize', () => {
  updateCarousel(false);
});


// URL do arquivo JSON no S3
const S3_JSON_URL = 'https://clinicarigatti.s3.sa-east-1.amazonaws.com/scripts/videos.json';

// Função para buscar os vídeos do S3
async function loadYouTubeVideos() {
  try {
    const response = await fetch(S3_JSON_URL);

    if (!response.ok) {
      throw new Error(`Erro ao buscar vídeos do S3: ${response.status}`);
    }

    const data = await response.json();
    console.log("data =>", data);

    // Valida se há vídeos no JSON
    if (!data || data.length === 0) {
      console.warn('Nenhum vídeo encontrado no JSON');
      return;
    }

    // Seleciona todos os elementos de imagem da grade
    const mediaItems = document.querySelectorAll('.media-grid__item');

    // Para cada vídeo retornado, atualiza a imagem correspondente
    data.forEach((video, index) => {
      if (mediaItems[index]) {
        const thumbnail = video.snippet.thumbnails.high.url;
        const videoTitle = video.snippet.title;
        const videoId = video.id.videoId;
        
        // Atualiza a imagem
        mediaItems[index].src = thumbnail;
        mediaItems[index].alt = videoTitle;
        
        // Adiciona link para o vídeo
        const link = document.createElement('a');
        link.href = `https://www.youtube.com/watch?v=${videoId}`;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        
        // Envolve a imagem com o link
        mediaItems[index].parentNode.insertBefore(link, mediaItems[index]);
        link.appendChild(mediaItems[index]);
      }
    });

  } catch (error) {
    console.error('Erro ao carregar vídeos do YouTube:', error);
  }
}

// Executa quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', loadYouTubeVideos);