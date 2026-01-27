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
      } else {
        mobileNav.style.display = 'none';
      }
    });

    mobileNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileNav.style.display = 'none';
      });
    });

    document.addEventListener('click', (e) => {
      if (!mobileMenuBtn.contains(e.target) && !mobileNav.contains(e.target)) {
        mobileNav.style.display = 'none';
      }
    });
  }
});