const images = [
  { src: 'https://clinicarigatti.s3.sa-east-1.amazonaws.com/imagens-site-v3/antes-e-depois/antes-e-depois-9.webp', alt: 'Resultado 9' },
  { src: 'https://clinicarigatti.s3.sa-east-1.amazonaws.com/imagens-site-v3/antes-e-depois/antes-e-depois-2.webp', alt: 'Resultado 2' },
  { src: 'https://clinicarigatti.s3.sa-east-1.amazonaws.com/imagens-site-v3/antes-e-depois/antes-e-depois-5.webp', alt: 'Resultado 5' },
  { src: 'https://clinicarigatti.s3.sa-east-1.amazonaws.com/imagens-site-v3/antes-e-depois/antes-e-depois-1.webp', alt: 'Resultado 1' },
  { src: 'https://clinicarigatti.s3.sa-east-1.amazonaws.com/imagens-site-v3/antes-e-depois/antes-e-depois-3.webp', alt: 'Resultado 3' },
  { src: 'https://clinicarigatti.s3.sa-east-1.amazonaws.com/imagens-site-v3/antes-e-depois/antes-e-depois-4.webp', alt: 'Resultado 4' },
  { src: 'https://clinicarigatti.s3.sa-east-1.amazonaws.com/imagens-site-v3/antes-e-depois/antes-e-depois-6.webp', alt: 'Resultado 6' },
  { src: 'https://clinicarigatti.s3.sa-east-1.amazonaws.com/imagens-site-v3/antes-e-depois/antes-e-depois-7.webp', alt: 'Resultado 7' },
  { src: 'https://clinicarigatti.s3.sa-east-1.amazonaws.com/imagens-site-v3/antes-e-depois/antes-e-depois-8.webp', alt: 'Resultado 8' }
];

const track = document.getElementById('resultsTrack');
const carouselContainer = track?.parentElement?.parentElement;
const prevBtn = carouselContainer?.querySelector('button[aria-label="Anterior"]');
const nextBtn = carouselContainer?.querySelector('button[aria-label="Próximo"]');

let currentIndex = 0;
let isAnimating = false;

function initResultsCarousel() {
  if (!track) return;
  
  const extendedImages = [...images, ...images, ...images];
  
  extendedImages.forEach((img, index) => {
    const imgElement = document.createElement('img');
    imgElement.src = img.src;
    imgElement.alt = img.alt;
    imgElement.className = 'shadow-[0_4px_10px_10px_rgba(0,0,0,0.3)] rounded-[10px] object-cover flex-shrink-0 cursor-pointer transition-all duration-1000';
    
    track.appendChild(imgElement);
  });

  currentIndex = images.length;
  updateResultsCarousel(false);
}

function updateResultsCarousel(animate = true) {
  const allImages = track.querySelectorAll('img');
  
  if (!animate) {
    track.classList.remove('duration-1000', 'transition-transform');
    track.style.transition = 'none';
  } else {
    track.classList.add('duration-1000', 'transition-transform');
    track.style.transition = 'transform 1s ease';
  }

  const sizes = {
    small: { width: 299, height: 373 },
    medium: { width: 317, height: 396 },
    large: { width: 351, height: 439 }
  };

  const isMobile = window.innerWidth <= 768;
  if (isMobile) {
    sizes.small = { width: 200, height: 250 };
    sizes.medium = { width: 220, height: 275 };
    sizes.large = { width: 240, height: 300 };
  }

  // Batch DOM read BEFORE any writes
  const container = track.parentElement;
  const containerWidth = container.offsetWidth;

  allImages.forEach((img, index) => {
    const relativePos = index - currentIndex;

    img.classList.remove(
      'w-[299px]', 'h-[373px]',
      'w-[317px]', 'h-[396px]',
      'w-[351px]', 'h-[439px]',
      'opacity-60', 'opacity-75', 'scale-105',
      'max-md:w-[200px]', 'max-md:h-[250px]',
      'max-md:w-[220px]', 'max-md:h-[275px]',
      'max-md:w-[240px]', 'max-md:h-[300px]'
    );

    if (relativePos === 0) {
      img.classList.add('w-[351px]', 'h-[439px]', 'scale-105', 'max-md:w-[240px]', 'max-md:h-[300px]');
    } else if (relativePos === -1 || relativePos === 1) {
      img.classList.add('w-[317px]', 'h-[396px]', 'opacity-75', 'max-md:w-[220px]', 'max-md:h-[275px]');
    } else {
      img.classList.add('w-[299px]', 'h-[373px]', 'opacity-60', 'max-md:w-[200px]', 'max-md:h-[250px]');
    }
  });

  setTimeout(() => {
    
    let offset = 0;
    const gap = 20;
    
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
    
    offset += sizes.large.width / 2;
    
    offset -= containerWidth / 2;

    track.style.transform = `translateX(-${offset}px)`;
  }, animate ? 0 : 50);
}

function nextSlide() {
  if (isAnimating) return;
  isAnimating = true;

  currentIndex++;
  updateResultsCarousel();

  setTimeout(() => {
    if (currentIndex >= images.length * 2) {
      currentIndex = images.length;
      updateResultsCarousel(false);
    }
    isAnimating = false;
  }, 500);
}

function prevSlide() {
  if (isAnimating) return;
  isAnimating = true;

  currentIndex--;
  updateResultsCarousel();

  setTimeout(() => {
    if (currentIndex < images.length) {
      currentIndex = images.length * 2 - 1;
      updateResultsCarousel(false);
    }
    isAnimating = false;
  }, 500);
}

if (nextBtn && prevBtn && track) {
  nextBtn.addEventListener('click', nextSlide);
  prevBtn.addEventListener('click', prevSlide);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') prevSlide();
    if (e.key === 'ArrowRight') nextSlide();
  });

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

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initResultsCarousel);
  } else {
    initResultsCarousel();
  }

  window.addEventListener('resize', () => {
    if (track.children.length > 0) {
      updateResultsCarousel(false);
    }
  });
}