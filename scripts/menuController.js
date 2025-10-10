document.addEventListener('DOMContentLoaded', function() {
  const menuToggle = document.getElementById('menuToggle');
  const menuToggleDesktop = document.getElementById('menuToggleDesktop');
  const menuOverlay = document.getElementById('menuOverlay');
  const menuClose = document.getElementById('menuClose');
    
  let isMenuOpen = false;

  function toggleMenu() {
    isMenuOpen = !isMenuOpen;
    
    if (isMenuOpen) {
      openMenu();
    } else {
      closeMenu();
    }
  }

  function openMenu() {
    if (!menuOverlay) return;
    
    menuOverlay.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }
    
  function closeMenu() {
    if (!menuOverlay) return;
    
    menuOverlay.classList.add('hidden');
    document.body.style.overflow = '';
  }
    
  if (menuToggle) {
    menuToggle.addEventListener('click', toggleMenu);
  }
  
  if (menuToggleDesktop) {
    menuToggleDesktop.addEventListener('click', toggleMenu);
  }
  
  if (menuClose) {
    menuClose.addEventListener('click', toggleMenu);
  }
    
  if (menuOverlay) {
    menuOverlay.addEventListener('click', (e) => {
      if (e.target === menuOverlay) {
        toggleMenu();
      }
    });

    const menuLinks = menuOverlay.querySelectorAll('nav a');
    menuLinks.forEach(link => {
      link.addEventListener('click', toggleMenu);
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isMenuOpen) {
      toggleMenu();
    }
  });
});