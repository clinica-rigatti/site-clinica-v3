(function () {
  const teamMembers = [
    { name: 'DR. LUIZ RIGATTI',   role: 'MÉDICO - CEO',         image: 'https://clinicarigatti.s3.sa-east-1.amazonaws.com/imagens-site-v3/time/rigatti.webp'        },
    { name: 'SUELLEN PALMEIRA',   role: 'NUTRICIONISTA',        image: 'https://clinicarigatti.s3.sa-east-1.amazonaws.com/imagens-site-v3/time/suellen.webp'        },
    { name: 'GUILHERME SENS',     role: 'NUTRICIONISTA',        image: 'https://clinicarigatti.s3.sa-east-1.amazonaws.com/imagens-site-v3/time/guilherme.webp'      },
    { name: 'PÂMELA GUSMÃO',      role: 'ENFERMEIRA',           image: 'https://clinicarigatti.s3.sa-east-1.amazonaws.com/imagens-site-v3/time/pamela.webp'         },
    { name: 'IVONETE BENTACK',    role: 'ENFERMEIRA',           image: 'https://clinicarigatti.s3.sa-east-1.amazonaws.com/imagens-site-v3/time/ivonete.webp'        },
    { name: 'RENATA CARNEIRO',    role: 'RECEPCIONISTA',        image: 'https://clinicarigatti.s3.sa-east-1.amazonaws.com/imagens-site-v3/time/renata.webp'         },
    { name: 'ANDRESSA BENTACK',   role: 'RECEPCIONISTA',        image: 'https://clinicarigatti.s3.sa-east-1.amazonaws.com/imagens-site-v3/time/andressa.webp'       },
    { name: 'CAMILA GAITKOSKI',   role: 'FINANCEIRO',           image: 'https://clinicarigatti.s3.sa-east-1.amazonaws.com/imagens-site-v3/time/camila.webp'         },
    { name: 'CAMILA RIGATTI',     role: 'ADVOGADA',             image: 'https://clinicarigatti.s3.sa-east-1.amazonaws.com/imagens-site-v3/time/camila-rigatti.webp' },
    { name: 'ANDERSON ALVES',     role: 'ENGENHEIRO DE IA',     image: 'https://clinicarigatti.s3.sa-east-1.amazonaws.com/imagens-site-v3/time/anderson.webp'       },
    { name: 'SAMUEL NUNES',       role: 'PROGRAMADOR',          image: 'https://clinicarigatti.s3.sa-east-1.amazonaws.com/imagens-site-v3/time/samuel.webp'         },
    { name: 'ANGELINO GONSALVES', role: 'PROGRAMADOR',          image: 'https://clinicarigatti.s3.sa-east-1.amazonaws.com/imagens-site-v3/time/angelino.webp'       },
    { name: 'JOÃO PILLON',        role: 'PROGRAMADOR',          image: 'https://clinicarigatti.s3.sa-east-1.amazonaws.com/imagens-site-v3/time/joao-pillon.webp'    },
    { name: 'ADILSON MATHEUS',    role: 'DIRETOR DE OPERAÇÕES', image: 'https://clinicarigatti.s3.sa-east-1.amazonaws.com/imagens-site-v3/time/adilson.webp'        },
    { name: 'ANA PAULA AZEVEDO',  role: 'CONFIRMAÇÃO',          image: 'https://clinicarigatti.s3.sa-east-1.amazonaws.com/imagens-site-v3/time/ana.webp'            },
    { name: 'CLEIDIANE CUBAS',    role: 'CONCIERGE',            image: 'https://clinicarigatti.s3.sa-east-1.amazonaws.com/imagens-site-v3/time/cleidiane.webp'      },
    { name: 'BRUNO LEON',         role: 'RECOMPRA',             image: 'https://clinicarigatti.s3.sa-east-1.amazonaws.com/imagens-site-v3/time/bruno.webp'          },
    { name: 'LARISSA PADULA',     role: 'SOCIAL MEDIA',         image: 'https://clinicarigatti.s3.sa-east-1.amazonaws.com/imagens-site-v3/time/larissa-padula.webp' },
    { name: 'LUCAS HULSE',        role: 'VIDEOMAKER',           image: 'https://clinicarigatti.s3.sa-east-1.amazonaws.com/imagens-site-v3/time/lucas.webp'          },
    { name: 'IGOR',               role: 'DESIGNER',             image: 'https://clinicarigatti.s3.sa-east-1.amazonaws.com/imagens-site-v3/time/igor.webp'           }
  ];

  const team = [...teamMembers, ...teamMembers, ...teamMembers, ...teamMembers];

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

    track.innerHTML = '';

    team.forEach(member => {
      track.appendChild(createMemberCard(member));
    });

    console.log('Total de cards criados:', track.children.length);
    console.log('Total de membros originais:', teamMembers.length);

    const SPEED = parseFloat(root.dataset.speed) || 50; // px/s
    let paused = false;
    let position = 0;
    let animationId = null;

    function getSetWidth() {
      const cards = track.children;
      if (cards.length === 0) return 0;
      
      let totalWidth = 0;
      const gap = parseFloat(getComputedStyle(track).gap) || 12;
      
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

    root.addEventListener('mouseenter', () => { paused = true; });
    root.addEventListener('mouseleave', () => { paused = false; });

    root.addEventListener('touchstart', () => { paused = true; }, { passive: true });
    root.addEventListener('touchend', () => { 
      setTimeout(() => { paused = false; }, 200); 
    });

    let lastTime = performance.now();
    let resetCount = 0;
    
    function animate(now) {
      const delta = (now - lastTime) / 1000;
      lastTime = now;

      if (!paused && setWidth > 0) {
        position += SPEED * delta;
        
        const percentComplete = (position / setWidth) * 100;
        if (percentComplete > 95) {
          // console.log(`${percentComplete.toFixed(1)}% completo - position: ${position.toFixed(2)}, setWidth: ${setWidth}`);
        }
        
        if (position >= setWidth) {
          position = position - setWidth;
          resetCount++;
          console.log(`Reset #${resetCount} - Nova position: ${position.toFixed(2)}`);
        }
        
        track.style.transform = `translateX(-${position}px)`;
      }

      animationId = requestAnimationFrame(animate);
    }

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
        
        setTimeout(() => {
          setWidth = getSetWidth();
          lastTime = performance.now();
          animationId = requestAnimationFrame(animate);
        }, 200);
      }
    }

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

    if (prefersReducedMotion.addEventListener) {
      prefersReducedMotion.addEventListener('change', start);
    }

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