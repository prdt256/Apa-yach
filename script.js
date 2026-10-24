/**
 * Profile Page Interactivity & Dynamic Features
 */
document.addEventListener('DOMContentLoaded', () => {
  // Theme Switching
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  const themeIcon = themeToggleBtn.querySelector('i');
  
  // Check stored theme or system preference
  const savedTheme = localStorage.getItem('theme') || 
    (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
  
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);

  themeToggleBtn.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
    showToast(`Mode tema diubah ke ${newTheme === 'dark' ? 'Gelap' : 'Terang'}`, 'info');
  });

  function updateThemeIcon(theme) {
    if (theme === 'light') {
      themeIcon.className = 'fa-solid fa-moon';
      themeToggleBtn.setAttribute('title', 'Beralih ke Mode Gelap');
    } else {
      themeIcon.className = 'fa-solid fa-sun';
      themeToggleBtn.setAttribute('title', 'Beralih ke Mode Terang');
    }
  }

  // Tabs Navigation
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabPanes = document.querySelectorAll('.tab-pane');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetTab = btn.getAttribute('data-tab');

      tabBtns.forEach(b => b.classList.remove('active'));
      tabPanes.forEach(p => p.classList.remove('active'));

      btn.classList.add('active');
      const activePane = document.getElementById(`tab-${targetTab}`);
      if (activePane) {
        activePane.classList.add('active');
      }
    });
  });

  // Modal Control (Contact)
  const contactModal = document.getElementById('contact-modal');
  const openModalBtn = document.getElementById('open-contact-btn');
  const closeModalBtn = document.getElementById('close-modal-btn');
  const contactForm = document.getElementById('contact-form');

  if (openModalBtn && contactModal) {
    openModalBtn.addEventListener('click', () => {
      contactModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  }

  if (closeModalBtn && contactModal) {
    closeModalBtn.addEventListener('click', closeModal);
  }

  if (contactModal) {
    contactModal.addEventListener('click', (e) => {
      if (e.target === contactModal) {
        closeModal();
      }
    });
  }

  function closeModal() {
    contactModal.classList.remove('active');
    document.body.style.overflow = '';
  }

  // Handle Contact Form Submit
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const senderName = document.getElementById('sender-name').value;
      closeModal();
      contactForm.reset();
      showToast(`Terima kasih ${senderName}! Pesan Anda telah terkirim.`, 'success');
    });
  }

  // Share / Copy Profile Link
  const shareBtn = document.getElementById('share-profile-btn');
  if (shareBtn) {
    shareBtn.addEventListener('click', async () => {
      const url = window.location.href;
      try {
        if (navigator.clipboard) {
          await navigator.clipboard.writeText(url);
          showToast('Tautan profil berhasil disalin ke clipboard!', 'success');
        } else {
          showToast('Tautan URL siap dibagikan!', 'info');
        }
      } catch (err) {
        showToast('Tautan profil disalin!', 'success');
      }
    });
  }

  // Download CV / Contact Simulation
  const downloadBtn = document.getElementById('download-cv-btn');
  if (downloadBtn) {
    downloadBtn.addEventListener('click', (e) => {
      e.preventDefault();
      showToast('Mengunduh resume / curriculum vitae...', 'success');
    });
  }

  // Toast Notification Helper
  function showToast(message, type = 'success') {
    let container = document.querySelector('.toast-container');
    if (!container) {
      container = document.createElement('div');
      container.className = 'toast-container';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    
    let iconClass = 'fa-check-circle';
    if (type === 'info') iconClass = 'fa-circle-info';
    if (type === 'error') iconClass = 'fa-triangle-exclamation';

    toast.innerHTML = `
      <i class="fa-solid ${iconClass}"></i>
      <span>${message}</span>
    `;

    container.appendChild(toast);

    setTimeout(() => {
      toast.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(15px)';
      setTimeout(() => {
        toast.remove();
      }, 400);
    }, 3200);
  }
});
