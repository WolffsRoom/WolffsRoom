document.addEventListener('DOMContentLoaded', () => {
  // Mobile sidebar toggle
  const menuToggle = document.getElementById('menuToggle');
  const sidebarWolf = document.getElementById('sidebarWolf');
  const sidebarOverlay = document.getElementById('sidebarOverlay');

  if (menuToggle && sidebarWolf && sidebarOverlay) {
    menuToggle.addEventListener('click', () => {
      sidebarWolf.classList.toggle('open');
      sidebarOverlay.classList.toggle('active');
    });

    sidebarOverlay.addEventListener('click', () => {
      sidebarWolf.classList.remove('open');
      sidebarOverlay.classList.remove('active');
    });
  }

  // Theme Toggle (Modo Claro / Modo Escuro)
  const themeToggle = document.getElementById('themeToggle');
  if (themeToggle) {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
      document.body.classList.add('light-mode');
      themeToggle.innerHTML = '<i class="fa-solid fa-moon"></i> Modo Escuro';
    }

    themeToggle.addEventListener('click', () => {
      document.body.classList.toggle('light-mode');
      const isLight = document.body.classList.contains('light-mode');
      localStorage.setItem('theme', isLight ? 'light' : 'dark');
      themeToggle.innerHTML = isLight
        ? '<i class="fa-solid fa-moon"></i> Modo Escuro'
        : '<i class="fa-solid fa-sun"></i> Modo Claro';
    });
  }

  // Delegação global para tornar todos os cards (.card-wolf e .news-card) totalmente clicáveis
  document.addEventListener('click', (e) => {
    const card = e.target.closest('.card-wolf, .news-card');
    if (card) {
      // Se clicou diretamente num elemento interativo interno (ex: botão de lightbox ou link direto), não intercepta
      if (e.target.closest('a') || e.target.closest('button')) {
        return;
      }
      const link = card.querySelector('a[href]');
      if (link && link.getAttribute('href')) {
        window.location.href = link.getAttribute('href');
      }
    }
  });

  // Lightbox Modal para Galeria dos Posts
  const galleryImages = document.querySelectorAll('main img');
  if (galleryImages.length > 0) {
    // Filtrar apenas imagens que pertençam à galeria interna do post
    const filteredImages = Array.from(galleryImages).filter(img => {
      if (img.classList.contains('sidebar-logo-img') || 
          img.classList.contains('sidebar-title-logo-img') || 
          img.classList.contains('footer-wolf-img') || 
          img.classList.contains('footer-main-logo') ||
          img.classList.contains('mini-wolf-icon') ||
          img.closest('.news-thumb') ||
          img.closest('.card-thumb')) {
        return false;
      }
      
      const parentStyle = img.parentElement ? (img.parentElement.getAttribute('style') || '') : '';
      const isGridGallery = parentStyle.includes('grid-template-columns') || 
                            parentStyle.includes('repeat(auto-fit') || 
                            img.parentElement.classList.contains('post-gallery-grid');
      return isGridGallery;
    });

    if (filteredImages.length > 0) {
      filteredImages.forEach((img, index) => {
        img.style.cursor = 'zoom-in';
        img.addEventListener('click', () => openLightbox(index));
      });

      // Elementos da Modal do Lightbox
      let modal = document.querySelector('.lightbox-modal');
      if (!modal) {
        modal = document.createElement('div');
        modal.className = 'lightbox-modal';
        modal.innerHTML = `
          <div class="lightbox-overlay"></div>
          <div class="lightbox-container">
            <button class="lightbox-close" aria-label="Fechar">&times;</button>
            <button class="lightbox-btn lightbox-prev" aria-label="Anterior">&#10094;</button>
            <img src="" alt="Imagem ampliada" class="lightbox-img">
            <button class="lightbox-btn lightbox-next" aria-label="Próxima">&#10095;</button>
            <div class="lightbox-counter"></div>
          </div>
        `;
        document.body.appendChild(modal);
      }

      const lightboxOverlay = modal.querySelector('.lightbox-overlay');
      const lightboxClose = modal.querySelector('.lightbox-close');
      const lightboxImg = modal.querySelector('.lightbox-img');
      const lightboxPrev = modal.querySelector('.lightbox-prev');
      const lightboxNext = modal.querySelector('.lightbox-next');
      const lightboxCounter = modal.querySelector('.lightbox-counter');

      let currentIndex = 0;

      function openLightbox(index) {
        currentIndex = index;
        updateLightbox();
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }

      function closeLightbox() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
      }

      function updateLightbox() {
        const targetImg = filteredImages[currentIndex];
        lightboxImg.src = targetImg.src;
        lightboxImg.alt = targetImg.alt || 'Galeria';
        lightboxCounter.textContent = `${currentIndex + 1} / ${filteredImages.length}`;
      }

      function nextImage() {
        currentIndex = (currentIndex + 1) % filteredImages.length;
        updateLightbox();
      }

      function prevImage() {
        currentIndex = (currentIndex - 1 + filteredImages.length) % filteredImages.length;
        updateLightbox();
      }

      lightboxClose.addEventListener('click', closeLightbox);
      lightboxOverlay.addEventListener('click', closeLightbox);
      lightboxNext.addEventListener('click', nextImage);
      lightboxPrev.addEventListener('click', prevImage);

      document.addEventListener('keydown', (e) => {
        if (!modal.classList.contains('active')) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowRight') nextImage();
        if (e.key === 'ArrowLeft') prevImage();
      });
    }
  }
});
