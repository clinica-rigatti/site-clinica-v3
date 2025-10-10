// Carrossel dos cards do time
// ====================================================
/* Carrossel infinito de cards — versão com dados dinâmicos
   - Cards criados dinamicamente via JavaScript
   - Scroll verdadeiramente infinito
   - Pausa no hover/toque
   - Respeita prefers-reduced-motion
*/

(function () {
  // Dados dos membros da equipe
  const teamMembers = [
    { name: 'DR. LUIZ RIGATTI',   role: 'MÉDICO - CEO',         image: 'https://clinicarigatti.s3.sa-east-1.amazonaws.com/imagens-site-v3/time/rigatti.png'        },
    { name: 'SUELLEN PALMEIRA',   role: 'NUTRICIONISTA',        image: 'https://clinicarigatti.s3.sa-east-1.amazonaws.com/imagens-site-v3/time/suellen.png'        },
    { name: 'GUILHERME SENS',     role: 'NUTRICIONISTA',        image: 'https://clinicarigatti.s3.sa-east-1.amazonaws.com/imagens-site-v3/time/guilherme.png'      },
    { name: 'PÂMELA GUSMÃO',      role: 'ENFERMEIRA',           image: 'https://clinicarigatti.s3.sa-east-1.amazonaws.com/imagens-site-v3/time/pamela.png'         },
    { name: 'IVONETE BENTACK',    role: 'ENFERMEIRA',           image: 'https://clinicarigatti.s3.sa-east-1.amazonaws.com/imagens-site-v3/time/ivonete.png'        },
    { name: 'RENATA CARNEIRO',    role: 'RECEPCIONISTA',        image: 'https://clinicarigatti.s3.sa-east-1.amazonaws.com/imagens-site-v3/time/renata.png'         },
    { name: 'ANDRESSA BENTACK',   role: 'RECEPCIONISTA',        image: 'https://clinicarigatti.s3.sa-east-1.amazonaws.com/imagens-site-v3/time/andressa.png'       },
    { name: 'CAMILA GAITKOSKI',   role: 'FINANCEIRO',           image: 'https://clinicarigatti.s3.sa-east-1.amazonaws.com/imagens-site-v3/time/camila.png'         },
    { name: 'CAMILA RIGATTI',     role: 'ADVOGADA',             image: 'https://clinicarigatti.s3.sa-east-1.amazonaws.com/imagens-site-v3/time/camila-rigatti.png' },
    { name: 'ANDERSON ALVES',     role: 'PROGRAMADOR',          image: 'https://clinicarigatti.s3.sa-east-1.amazonaws.com/imagens-site-v3/time/anderson.png'       },
    { name: 'SAMUEL NUNES',       role: 'PROGRAMADOR',          image: 'https://clinicarigatti.s3.sa-east-1.amazonaws.com/imagens-site-v3/time/samuel.png'         },
    { name: 'ANGELINO GONSALVES', role: 'PROGRAMADOR',          image: 'https://clinicarigatti.s3.sa-east-1.amazonaws.com/imagens-site-v3/time/angelino.png'       },
    { name: 'ADILSON MATHEUS',    role: 'DIRETOR DE OPERAÇÕES', image: 'https://clinicarigatti.s3.sa-east-1.amazonaws.com/imagens-site-v3/time/adilson.png'        },
    { name: 'ANA PAULA AZEVEDO',  role: 'CONFIRMAÇÃO',          image: 'https://clinicarigatti.s3.sa-east-1.amazonaws.com/imagens-site-v3/time/ana.png'            },
    { name: 'CLEIDIANE CUBAS',    role: 'CONCIERGE',            image: 'https://clinicarigatti.s3.sa-east-1.amazonaws.com/imagens-site-v3/time/cleidiane.png'      },
    { name: 'BRUNO LEON',         role: 'RECOMPRA',             image: 'https://clinicarigatti.s3.sa-east-1.amazonaws.com/imagens-site-v3/time/bruno.png'          },
    { name: 'HENRIQUE',           role: 'DIRETOR DE MARKETING', image: 'https://clinicarigatti.s3.sa-east-1.amazonaws.com/imagens-site-v3/time/henrique.png'       },
    { name: 'LUCAS HULSE',        role: 'VIDEOMAKER',           image: 'https://clinicarigatti.s3.sa-east-1.amazonaws.com/imagens-site-v3/time/lucas.png'          },
    { name: 'IGOR',               role: 'DESIGNER',             image: 'https://clinicarigatti.s3.sa-east-1.amazonaws.com/imagens-site-v3/time/igor.png'           }
  ];

  // Array multiplicado para criar o efeito infinito
  const team = [...teamMembers, ...teamMembers, ...teamMembers, ...teamMembers];

  // Cria um card de membro
  function createMemberCard(member) {
    const card = document.createElement('div');
    card.className = 'team-member-card relative w-[206px] min-w-[206px] flex-shrink-0 rounded-lg overflow-hidden bg-gray-900';
    
    card.innerHTML = `
      <img src="${member.image}" alt="${member.name}" class="block w-full h-[243px] object-cover brightness-90">
      <div class="absolute inset-x-0 bottom-0 p-2.5 text-center bg-gradient-to-t from-black/90 to-transparent">
        <h4 class="text-xs font-semibold tracking-wider text-white uppercase">${member.name}</h4>
        <p class="text-xs font-normal tracking-[0.15625rem] text-white uppercase mt-1 opacity-90">${member.role}</p>
      </div>
    `;
    
    return card;
  }

  function setupCarousel(root) {
    const track = root.querySelector('.team-track');
    if (!track) return;

    // Limpa o conteúdo existente
    track.innerHTML = '';

    // Adiciona todos os cards do array multiplicado
    team.forEach(member => {
      track.appendChild(createMemberCard(member));
    });

    console.log('Total de cards criados:', track.children.length);
    console.log('Total de membros originais:', teamMembers.length);

    const SPEED = parseFloat(root.dataset.speed) || 50; // px/s
    let paused = false;
    let position = 0;
    let animationId = null;

    // Calcula a largura de um conjunto original (18 membros) dinamicamente
    function getSetWidth() {
      // Aguarda um frame para garantir que os cards foram renderizados
      const cards = track.children;
      if (cards.length === 0) return 0;
      
      let totalWidth = 0;
      const gap = parseFloat(getComputedStyle(track).gap) || 12;
      
      // Calcula a largura dos primeiros N cards (um conjunto completo)
      for (let i = 0; i < teamMembers.length; i++) {
        if (cards[i]) {
          const cardWidth = cards[i].getBoundingClientRect().width;
          totalWidth += cardWidth + gap;
        }
      }
      
      console.log('Largura calculada de um conjunto:', totalWidth);
      console.log('Cards por conjunto:', teamMembers.length);
      
      return totalWidth;
    }

    let setWidth = 0;

    // Pausa no hover
    root.addEventListener('mouseenter', () => { paused = true; });
    root.addEventListener('mouseleave', () => { paused = false; });

    // Pausa no toque
    root.addEventListener('touchstart', () => { paused = true; }, { passive: true });
    root.addEventListener('touchend', () => { 
      setTimeout(() => { paused = false; }, 200); 
    });

    // Animação principal
    let lastTime = performance.now();
    let resetCount = 0;
    
    function animate(now) {
      const delta = (now - lastTime) / 1000;
      lastTime = now;

      if (!paused && setWidth > 0) {
        position += SPEED * delta;
        
        // Debug: mostra quando está próximo do reset
        const percentComplete = (position / setWidth) * 100;
        if (percentComplete > 95) {
          console.log(`${percentComplete.toFixed(1)}% completo - position: ${position.toFixed(2)}, setWidth: ${setWidth}`);
        }
        
        // Loop infinito: quando completar um conjunto original, volta ao início
        if (position >= setWidth) {
          position = position - setWidth;
          resetCount++;
          console.log(`Reset #${resetCount} - Nova position: ${position.toFixed(2)}`);
        }
        
        // Aplica o transform (move para esquerda)
        track.style.transform = `translateX(-${position}px)`;
      }

      animationId = requestAnimationFrame(animate);
    }

    // Verifica preferência de movimento reduzido
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    function start() {
      if (prefersReducedMotion.matches) {
        if (animationId) cancelAnimationFrame(animationId);
        track.style.transform = 'none';
        root.classList.add('overflow-x-auto');
        root.classList.remove('overflow-hidden');
      } else {
        root.classList.remove('overflow-x-auto');
        root.classList.add('overflow-hidden');
        
        // Calcula setWidth após os cards serem renderizados
        setTimeout(() => {
          setWidth = getSetWidth();
          lastTime = performance.now();
          animationId = requestAnimationFrame(animate);
        }, 200);
      }
    }

    // Reajusta ao redimensionar
    let resizeTimeout;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        if (!prefersReducedMotion.matches) {
          const oldSetWidth = setWidth;
          setWidth = getSetWidth();
          const progress = position / oldSetWidth;
          position = progress * setWidth;
          console.log('Resize - Novo setWidth:', setWidth);
        }
      }, 250);
    });

    // Monitora mudanças na preferência
    if (prefersReducedMotion.addEventListener) {
      prefersReducedMotion.addEventListener('change', start);
    }

    // Inicia
    start();
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

// Menu mobile
// ========================================================
document.addEventListener('DOMContentLoaded', () => {
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileNav = document.getElementById('mobile-nav');
  
  if (mobileMenuBtn && mobileNav) {
    // Garante que o menu inicia fechado usando display none inline
    mobileNav.style.display = 'none';
    
    mobileMenuBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      
      // Toggle display
      if (mobileNav.style.display === 'none') {
        mobileNav.style.display = 'flex';
        console.log('Menu aberto!');
      } else {
        mobileNav.style.display = 'none';
        console.log('Menu fechado!');
      }
    });
    
    // Fecha o menu ao clicar em qualquer link
    mobileNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileNav.style.display = 'none';
      });
    });
    
    // Fecha o menu ao clicar fora dele
    document.addEventListener('click', (e) => {
      if (!mobileMenuBtn.contains(e.target) && !mobileNav.contains(e.target)) {
        mobileNav.style.display = 'none';
      }
    });
  }
});

// Carrossel dos cards de serviços
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

    // mouse
    track.addEventListener('mousedown', (e) => onDown(e.pageX));
    window.addEventListener('mousemove', (e) => onMove(e.pageX, e));
    window.addEventListener('mouseup', onUp);

    // touch
    track.addEventListener('touchstart', (e) => onDown(e.touches[0].pageX), { passive: true });
    track.addEventListener('touchmove', (e) => onMove(e.touches[0].pageX, e), { passive: false });
    window.addEventListener('touchend', onUp);
  }

  function initCarousel(section) {
    const track = section.querySelector('.services');
    const prevBtn = section.querySelector('.services-btn-prev');
    const nextBtn = section.querySelector('.services-btn-next');
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

    // arrastar/"swipe"
    makeDragHandlers(track);

    // estado inicial + ao rolar/resize
    const refresh = () => updateButtons(track, prevBtn, nextBtn);
    track.addEventListener('scroll', refresh, { passive: true });
    window.addEventListener('resize', refresh);
    refresh();
  }

  function initAll() {
    // Busca pela seção que contém os serviços
    const serviceSection = document.querySelector('.services')?.closest('section');
    if (serviceSection) {
      initCarousel(serviceSection);
    }
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

// Carrossel dos cards do time
// ====================================================
/* Carrossel infinito de cards — versão otimizada
   - Scroll suave e verdadeiramente infinito
   - Sem resets ou saltos visuais
   - Pausa no hover/toque
   - Respeita prefers-reduced-motion
*/

(function () {
  function setupCarousel(root) {
    const track = root.querySelector('.team-track');
    if (!track) return;

    const SPEED = parseFloat(root.dataset.speed) || 50; // px/s
    let paused = false;
    let offset = 0;
    let animationId = null;

    // Guarda os cards originais
    const originalCards = Array.from(track.children);
    const originalCount = originalCards.length;

    // Duplica os cards suficientemente para cobrir a tela + buffer
    function setupInfiniteScroll() {
      // Limpa duplicatas existentes
      while (track.children.length > originalCount) {
        track.removeChild(track.lastChild);
      }

      // Calcula quantas cópias precisamos
      // Precisamos cobrir a largura da tela + 2x a largura de um conjunto
      const viewportWidth = root.clientWidth;
      const cardWidth = 206; // largura fixa do card
      const gap = 12; // gap entre cards
      const setWidth = (cardWidth + gap) * originalCount;
      const copiesNeeded = Math.ceil((viewportWidth * 3) / setWidth) + 1;

      // Duplica os conjuntos
      for (let i = 0; i < copiesNeeded; i++) {
        originalCards.forEach(card => {
          const clone = card.cloneNode(true);
          track.appendChild(clone);
        });
      }
    }

    // Calcula a largura de um conjunto completo
    function getSetWidth() {
      const gap = parseFloat(getComputedStyle(track).gap) || 12;
      const cardWidth = 206; // largura fixa
      return (cardWidth + gap) * originalCount;
    }

    // Pausa no hover
    root.addEventListener('mouseenter', () => {
      paused = true;
    });
    
    root.addEventListener('mouseleave', () => {
      paused = false;
    });

    // Pausa no toque mobile
    root.addEventListener('touchstart', () => {
      paused = true;
    }, { passive: true });
    
    root.addEventListener('touchend', () => {
      paused = false;
    });

    // Animação principal - movimento contínuo sem resets
    let lastTime = performance.now();
    
    function animate(currentTime) {
      const deltaTime = (currentTime - lastTime) / 1000;
      lastTime = currentTime;

      if (!paused) {
        // Move continuamente
        offset -= SPEED * deltaTime;
        
        // Calcula a largura de um conjunto
        const setWidth = getSetWidth();
        
        // Quando o offset ultrapassar a largura de um conjunto,
        // fazemos um reset "invisível" ajustando matematicamente
        // Isso funciona porque temos múltiplas cópias idênticas
        while (offset <= -setWidth) {
          offset += setWidth;
        }
        
        // Aplica a transformação
        track.style.transform = `translateX(${offset}px)`;
      }

      animationId = requestAnimationFrame(animate);
    }

    // Verifica preferência de movimento reduzido
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    function start() {
      if (prefersReducedMotion.matches) {
        // Desabilita animação
        if (animationId) {
          cancelAnimationFrame(animationId);
        }
        track.style.transform = 'none';
        root.classList.add('overflow-x-auto');
        root.classList.remove('overflow-hidden');
      } else {
        // Habilita animação
        root.classList.remove('overflow-x-auto');
        root.classList.add('overflow-hidden');
        
        // Setup inicial
        setupInfiniteScroll();
        
        // Aguarda o DOM atualizar
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            lastTime = performance.now();
            animationId = requestAnimationFrame(animate);
          });
        });
      }
    }

    // Reajusta ao redimensionar
    let resizeTimeout;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        if (!prefersReducedMotion.matches) {
          // Para temporariamente
          if (animationId) {
            cancelAnimationFrame(animationId);
          }
          
          // Reconfigura
          setupInfiniteScroll();
          
          // Ajusta offset para estar dentro do range válido
          const setWidth = getSetWidth();
          while (offset <= -setWidth) {
            offset += setWidth;
          }
          
          // Reinicia
          requestAnimationFrame(() => {
            lastTime = performance.now();
            animationId = requestAnimationFrame(animate);
          });
        }
      }, 250);
    });

    // Monitora mudanças na preferência de movimento
    if (prefersReducedMotion.addEventListener) {
      prefersReducedMotion.addEventListener('change', start);
    }

    // Inicializa
    start();
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

// Carrossel dos antes e depois
// ==============================
// Configuração do carrossel
const images = [
  { src: 'https://clinicarigatti.s3.sa-east-1.amazonaws.com/imagens-site-v3/antes-e-depois/antes-e-depois-1.png', alt: 'Resultado 1' },
  { src: 'https://clinicarigatti.s3.sa-east-1.amazonaws.com/imagens-site-v3/antes-e-depois/antes-e-depois-2.png', alt: 'Resultado 2' },
  { src: 'https://clinicarigatti.s3.sa-east-1.amazonaws.com/imagens-site-v3/antes-e-depois/antes-e-depois-3.png', alt: 'Resultado 3' },
  { src: 'https://clinicarigatti.s3.sa-east-1.amazonaws.com/imagens-site-v3/antes-e-depois/antes-e-depois-4.png', alt: 'Resultado 4' },
  { src: 'https://clinicarigatti.s3.sa-east-1.amazonaws.com/imagens-site-v3/antes-e-depois/antes-e-depois-5.png', alt: 'Resultado 5' },
  { src: 'https://clinicarigatti.s3.sa-east-1.amazonaws.com/imagens-site-v3/antes-e-depois/antes-e-depois-6.png', alt: 'Resultado 6' },
  { src: 'https://clinicarigatti.s3.sa-east-1.amazonaws.com/imagens-site-v3/antes-e-depois/antes-e-depois-7.png', alt: 'Resultado 7' },
  { src: 'https://clinicarigatti.s3.sa-east-1.amazonaws.com/imagens-site-v3/antes-e-depois/antes-e-depois-8.png', alt: 'Resultado 8' },
  { src: 'https://clinicarigatti.s3.sa-east-1.amazonaws.com/imagens-site-v3/antes-e-depois/antes-e-depois-9.png', alt: 'Resultado 9' }
];

const track = document.getElementById('resultsTrack');
const prevBtn = document.querySelector('section[class*="bg-pearl"] button[aria-label="Anterior"]');
const nextBtn = document.querySelector('section[class*="bg-pearl"] button[aria-label="Próximo"]');

let currentIndex = 0;
let isAnimating = false;

// Inicializa o carrossel
function initResultsCarousel() {
  if (!track) return;
  
  // Cria array com imagens duplicadas para efeito infinito
  const extendedImages = [...images, ...images, ...images];
  
  extendedImages.forEach((img, index) => {
    const imgElement = document.createElement('img');
    imgElement.src = img.src;
    imgElement.alt = img.alt;
    imgElement.className = 'shadow-[0_4px_10px_10px_rgba(0,0,0,0.3)] rounded-[10px] object-cover flex-shrink-0 cursor-pointer transition-all duration-1000';
    
    track.appendChild(imgElement);
  });

  // Posiciona no conjunto do meio (primeira imagem do meio)
  currentIndex = images.length;
  updateResultsCarousel(false);
}

// Atualiza posição e classes do carrossel
function updateResultsCarousel(animate = true) {
  const allImages = track.querySelectorAll('img');
  
  if (!animate) {
    track.classList.remove('duration-1000', 'transition-transform');
    track.style.transition = 'none';
  } else {
    track.classList.add('duration-1000', 'transition-transform');
    track.style.transition = 'transform 1s ease';
  }

  // Define os tamanhos base (sem scale)
  const sizes = {
    small: { width: 299, height: 373 },
    medium: { width: 317, height: 396 },
    large: { width: 351, height: 439 }
  };

  // Detecta se é mobile
  const isMobile = window.innerWidth <= 768;
  if (isMobile) {
    sizes.small = { width: 200, height: 250 };
    sizes.medium = { width: 220, height: 275 };
    sizes.large = { width: 240, height: 300 };
  }

  // Primeiro atualiza as classes para calcular os tamanhos corretos
  allImages.forEach((img, index) => {
    const relativePos = index - currentIndex;

    // Remove todas as classes de tamanho anteriores
    img.classList.remove(
      'w-[299px]', 'h-[373px]', 
      'w-[317px]', 'h-[396px]', 
      'w-[351px]', 'h-[439px]',
      'opacity-60', 'opacity-75', 'scale-105',
      'max-md:w-[200px]', 'max-md:h-[250px]', 
      'max-md:w-[220px]', 'max-md:h-[275px]', 
      'max-md:w-[240px]', 'max-md:h-[300px]'
    );

    // Adiciona as classes apropriadas baseado na posição
    if (relativePos === 0) {
      // Imagem central (grande)
      img.classList.add('w-[351px]', 'h-[439px]', 'scale-105', 'max-md:w-[240px]', 'max-md:h-[300px]');
    } else if (relativePos === -1 || relativePos === 1) {
      // Imagens ao lado (médias)
      img.classList.add('w-[317px]', 'h-[396px]', 'opacity-75', 'max-md:w-[220px]', 'max-md:h-[275px]');
    } else {
      // Imagens nas extremidades (pequenas)
      img.classList.add('w-[299px]', 'h-[373px]', 'opacity-60', 'max-md:w-[200px]', 'max-md:h-[250px]');
    }
  });

  // Aguarda para garantir que as classes foram aplicadas
  setTimeout(() => {
    // Calcula o deslocamento centralizado usando tamanhos fixos
    const container = track.parentElement;
    const containerWidth = container.offsetWidth;
    
    let offset = 0;
    const gap = 20; // gap entre as imagens
    
    // Soma a largura de todas as imagens antes da imagem central
    for (let i = 0; i < currentIndex; i++) {
      const relativePos = i - currentIndex;
      let imgWidth;
      
      if (relativePos === 0) {
        imgWidth = sizes.large.width;
      } else if (relativePos === -1 || relativePos === 1) {
        imgWidth = sizes.medium.width;
      } else {
        imgWidth = sizes.small.width;
      }
      
      offset += imgWidth + gap;
    }
    
    // Adiciona metade da largura da imagem central (sem considerar o scale)
    offset += sizes.large.width / 2;
    
    // Subtrai metade da largura do container para centralizar
    offset -= containerWidth / 2;

    track.style.transform = `translateX(-${offset}px)`;
  }, animate ? 0 : 50);
}

// Navega para o próximo
function nextSlide() {
  if (isAnimating) return;
  isAnimating = true;

  currentIndex++;
  updateResultsCarousel();

  setTimeout(() => {
    // Se chegou no final do segundo conjunto, volta pro meio sem animação
    if (currentIndex >= images.length * 2) {
      currentIndex = images.length;
      updateResultsCarousel(false);
    }
    isAnimating = false;
  }, 500);
}

// Navega para o anterior
function prevSlide() {
  if (isAnimating) return;
  isAnimating = true;

  currentIndex--;
  updateResultsCarousel();

  setTimeout(() => {
    // Se chegou no início do primeiro conjunto, pula pro meio sem animação
    if (currentIndex < images.length) {
      currentIndex = images.length * 2 - 1;
      updateResultsCarousel(false);
    }
    isAnimating = false;
  }, 500);
}

// Event listeners
if (nextBtn && prevBtn && track) {
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
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initResultsCarousel);
  } else {
    initResultsCarousel();
  }

  // Recalcula posições ao redimensionar a janela
  window.addEventListener('resize', () => {
    if (track.children.length > 0) {
      updateResultsCarousel(false);
    }
  });
}

// Carregamento dos vídeos do YouTube
// ===================================
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
    console.log("Vídeos carregados do S3:", data);

    // Valida se há vídeos no JSON
    if (!data || data.length === 0) {
      console.warn('Nenhum vídeo encontrado no JSON');
      return;
    }

    // Seleciona a grade de vídeos
    const videoGrid = document.querySelector('.grid.grid-cols-2');
    
    if (!videoGrid) {
      console.error('Grade de vídeos não encontrada');
      return;
    }

    // Seleciona todas as imagens dentro da grade
    const mediaItems = videoGrid.querySelectorAll('img');

    // Para cada vídeo retornado, atualiza a imagem correspondente
    data.forEach((video, index) => {
      if (mediaItems[index]) {
        const thumbnail = video.snippet.thumbnails.high.url;
        const videoTitle = video.snippet.title;
        const videoId = video.id.videoId;
        console.log("videoId =>", videoId);
        
        // Cria um link para envolver a imagem
        const link = document.createElement('a');
        link.href = `https://www.youtube.com/watch?v=${videoId}`;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        link.className = 'block'; // Tailwind class
        link.title = videoTitle;
        
        // Atualiza os atributos da imagem
        mediaItems[index].src = thumbnail;
        mediaItems[index].alt = videoTitle;
        
        // Envolve a imagem com o link
        const parent = mediaItems[index].parentNode;
        parent.insertBefore(link, mediaItems[index]);
        link.appendChild(mediaItems[index]);
        
        console.log(`Vídeo ${index + 1} carregado: ${videoTitle}`);
      }
    });

    console.log(`Total de ${data.length} vídeos carregados com sucesso`);

  } catch (error) {
    console.error('Erro ao carregar vídeos do YouTube:', error);
    // Mantém os placeholders em caso de erro
  }
}

// Executa quando o DOM estiver pronto
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', loadYouTubeVideos);
} else {
  loadYouTubeVideos();
}

// Animação suave dos labels dos inputs do formulário
// ===================================================
document.addEventListener('DOMContentLoaded', () => {
  const formGroups = document.querySelectorAll('#contato .relative');
  
  formGroups.forEach(group => {
    const input = group.querySelector('input');
    const label = group.querySelector('label');
    
    if (!input || !label) return;
    
    // Função para animar label para cima
    function floatLabel() {
      label.classList.remove('top-4', 'left-8', 'text-base', 'opacity-70');
      label.classList.add('-top-2.5', 'left-7', 'text-[11px]', 'opacity-100', 'bg-pearl', 'px-2');
    }
    
    // Função para voltar label para posição inicial
    function sinkLabel() {
      label.classList.remove('-top-2.5', 'left-7', 'text-[11px]', 'opacity-100', 'bg-pearl', 'px-2');
      label.classList.add('top-4', 'left-8', 'text-base', 'opacity-70');
    }
    
    // Verifica se já tem valor ao carregar a página
    if (input.value) {
      floatLabel();
    }
    
    // Ao focar no input
    input.addEventListener('focus', () => {
      floatLabel();
    });
    
    // Ao perder o foco
    input.addEventListener('blur', () => {
      if (!input.value) {
        sinkLabel();
      }
    });
    
    // Ao digitar (para casos de autocomplete)
    input.addEventListener('input', () => {
      if (input.value) {
        floatLabel();
      }
    });
  });
});

// menu.js - Script de controle do menu hambúrguer
// Aguarda o carregamento completo do DOM antes de executar
document.addEventListener('DOMContentLoaded', function() {
    
    // Seleção de elementos
    const menuToggle = document.getElementById('menuToggle');
    const menuToggleDesktop = document.getElementById('menuToggleDesktop');
    const menuOverlay = document.getElementById('menuOverlay');
    const menuClose = document.getElementById('menuClose');
    const line1 = document.getElementById('line1');
    const line2 = document.getElementById('line2');
    const line3 = document.getElementById('line3');
    const line1Desktop = document.getElementById('line1Desktop');
    const line2Desktop = document.getElementById('line2Desktop');
    const line3Desktop = document.getElementById('line3Desktop');
    
    let isMenuOpen = false;

    /**
     * Alterna o estado do menu (aberto/fechado)
     */
    function toggleMenu() {
        isMenuOpen = !isMenuOpen;
        
        if (isMenuOpen) {
            openMenu();
        } else {
            closeMenu();
        }
    }

    /**
     * Abre o menu e anima o hambúrguer para X
     */
    function openMenu() {
        if (!menuOverlay) return;
        
        menuOverlay.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
        
        // Anima hambúrguer para X (mobile)
        // animateHamburgerToX(line1, line2, line3);
        
        // Anima hambúrguer para X (desktop)
        // animateHamburgerToX(line1Desktop, line2Desktop, line3Desktop);
    }

    /**
     * Fecha o menu e restaura o hambúrguer
     */
    function closeMenu() {
        if (!menuOverlay) return;
        
        menuOverlay.classList.add('hidden');
        document.body.style.overflow = '';
        
        // Volta hambúrguer ao normal (mobile)
        // resetHamburger(line1, line2, line3);
        
        // Volta hambúrguer ao normal (desktop)
        // resetHamburger(line1Desktop, line2Desktop, line3Desktop);
    }

    // /**
    //  * Anima as linhas do hambúrguer para formar um X
    //  * @param {HTMLElement} line1 - Primeira linha
    //  * @param {HTMLElement} line2 - Segunda linha
    //  * @param {HTMLElement} line3 - Terceira linha
    //  */
    // function animateHamburgerToX(line1, line2, line3) {
    //     if (line1 && line2 && line3) {
    //         line1.style.transform = 'rotate(45deg) translateY(10px)';
    //         line2.style.opacity = '0';
    //         line3.style.transform = 'rotate(-45deg) translateY(-10px)';
    //     }
    // }

    // /**
    //  * Restaura as linhas do hambúrguer ao estado original
    //  * @param {HTMLElement} line1 - Primeira linha
    //  * @param {HTMLElement} line2 - Segunda linha
    //  * @param {HTMLElement} line3 - Terceira linha
    //  */
    // function resetHamburger(line1, line2, line3) {
    //     if (line1 && line2 && line3) {
    //         line1.style.transform = '';
    //         line2.style.opacity = '1';
    //         line3.style.transform = '';
    //     }
    // }

    // Event Listeners
    
    // Botão hambúrguer mobile
    if (menuToggle) {
        menuToggle.addEventListener('click', toggleMenu);
    }
    
    // Botão hambúrguer desktop
    if (menuToggleDesktop) {
        menuToggleDesktop.addEventListener('click', toggleMenu);
    }
    
    // Botão fechar do menu
    if (menuClose) {
        menuClose.addEventListener('click', toggleMenu);
    }
    
    // Fecha menu ao clicar no overlay (fundo escuro)
    if (menuOverlay) {
        menuOverlay.addEventListener('click', (e) => {
            if (e.target === menuOverlay) {
                toggleMenu();
            }
        });

        // Fecha menu ao clicar em qualquer link do menu
        const menuLinks = menuOverlay.querySelectorAll('nav a');
        menuLinks.forEach(link => {
            link.addEventListener('click', toggleMenu);
        });
    }

    // Fecha menu ao pressionar ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && isMenuOpen) {
            toggleMenu();
        }
    });

});
