
document.addEventListener('DOMContentLoaded', function() {
  // THEME TOGGLE FUNCTIONALITY
  const themeToggle = document.getElementById('themeToggle');
  const body = document.body;
  if (localStorage.getItem('theme') === 'dark') {
    body.classList.add('dark-theme');
    if (themeToggle) themeToggle.textContent = '☀️';
  } else {
    if (themeToggle) themeToggle.textContent = '🌙';
  }
  if (themeToggle) {
    themeToggle.addEventListener('click', function() {
      body.classList.toggle('dark-theme');
      const isDark = body.classList.contains('dark-theme');
      themeToggle.textContent = isDark ? '☀️' : '🌙';
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });
  }

  // Button Click Interactions (Modal)
  const modal = document.createElement('div');
  modal.id = 'modal';
  modal.className = 'modal';
  modal.innerHTML = `
    <div class="modal-content">
      <span class="modal-close">&times;</span>
      <h2 id="modalTitle">Modal Title</h2>
      <p id="modalMessage">Modal message goes here.</p>
      <button class="modal-btn">Close</button>
    </div>
  `;
  document.body.appendChild(modal);

  const modalElement = document.getElementById('modal');
  const closeBtn = document.querySelector('.modal-close');
  const closeModalBtn = document.querySelector('.modal-btn');

  const buttonMessages = {
    'Learn more': {
      title: 'Learn More',
      message: 'Thank you for your interest! Explore more details about this amazing Apple product.'
    },
    'Shop iPhone': {
      title: 'Shop iPhone',
      message: 'You are being redirected to the iPhone shop. Amazing devices await!'
    },
    'Try it free': {
      title: 'Try Creator Studio',
      message: 'Sign up to try Creator Studio for free for 1 month. Amazing creative tools await!'
    },
    'Buy': {
      title: 'Purchase iPad Air',
      message: 'You are being redirected to complete your iPad Air purchase.'
    },
    'Shop': {
      title: 'Shop Now',
      message: 'You are being redirected to the shop. Check out the latest Apple products!'
    },
    'Shop iPhone': {
      title: 'Subscribe to Shop',
      message: 'Thank you for subscribing! You will receive exclusive deals and updates.'
    },
    'Contact Us': {
      title: 'Contact Us',
      message: 'Our support team will reach out to you shortly. We are here to help!'
    }
  };

  function showModal(buttonText) {
    const message = buttonMessages[buttonText] || {
      title: 'Button Clicked',
      message: `You clicked the "${buttonText}" button.`
    };
    document.getElementById('modalTitle').textContent = message.title;
    document.getElementById('modalMessage').textContent = message.message;
    modalElement.classList.add('show');
  }

  function closeModal() {
    modalElement.classList.remove('show');
  }

  const buttons = document.querySelectorAll('button:not(.hamburger):not(.mobile-close):not(.modal-btn):not(.modal-close)');
  buttons.forEach(button => {
    button.addEventListener('click', function(e) {
      if (!this.classList.contains('icon-btn') && !this.classList.contains('icon-btn1')) {
        e.preventDefault();
        showModal(this.textContent.trim());
      }
    });
  });
  closeBtn.addEventListener('click', closeModal);
  closeModalBtn.addEventListener('click', closeModal);
  modalElement.addEventListener('click', function(e) {
    if (e.target === modalElement) {
      closeModal();
    }
  });
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      closeModal();
    }
  });

  // Mobile sidebar toggle
  const hamburger = document.getElementById('hamburger');
  const mobileSidebar = document.getElementById('mobileSidebar');
  const mobileClose = document.getElementById('mobileClose');
  const overlay = document.getElementById('overlay');

  function openSidebar() {
    if (!mobileSidebar) return;
    mobileSidebar.classList.add('open');
    if (overlay) {
      overlay.hidden = false;
      setTimeout(()=> overlay.classList.add('show'), 10);
    }
    if (hamburger) hamburger.setAttribute('aria-expanded', 'true');
    if (mobileSidebar) mobileSidebar.setAttribute('aria-hidden', 'false');
  }

  function closeSidebar() {
    if (!mobileSidebar) return;
    mobileSidebar.classList.remove('open');
    if (overlay) {
      overlay.classList.remove('show');
      setTimeout(()=> overlay.hidden = true, 280);
    }
    if (hamburger) hamburger.setAttribute('aria-expanded', 'false');
    if (mobileSidebar) mobileSidebar.setAttribute('aria-hidden', 'true');
  }

  hamburger && hamburger.addEventListener('click', openSidebar);
  mobileClose && mobileClose.addEventListener('click', closeSidebar);
  overlay && overlay.addEventListener('click', closeSidebar);

  // Carousel: auto-advance + controls
  const track = document.querySelector('.carousel-track');
  if(track) {
    const slides = Array.from(track.children);
    const nextBtn = document.querySelector('.carousel-btn.next');
    const prevBtn = document.querySelector('.carousel-btn.prev');
    const carousel = document.getElementById('movieCarousel');
    let currentIndex = 0;
    let interval = null;
    const AUTO_MS = 4000;

    function update() {
      const amount = -currentIndex * 100;
      track.style.transform = `translateX(${amount}%)`;
      slides.forEach((s,i)=> s.classList.toggle('current', i===currentIndex));
    }

    function next() { currentIndex = (currentIndex+1)%slides.length; update(); }
    function prev() { currentIndex = (currentIndex-1+slides.length)%slides.length; update(); }

    function start() { stop(); interval = setInterval(next, AUTO_MS); }
    function stop() { if(interval) clearInterval(interval); interval=null; }

    nextBtn && nextBtn.addEventListener('click', ()=>{ next(); start(); });
    prevBtn && prevBtn.addEventListener('click', ()=>{ prev(); start(); });

    carousel && carousel.addEventListener('mouseenter', stop);
    carousel && carousel.addEventListener('mouseleave', start);
    carousel && carousel.addEventListener('touchstart', stop);
    carousel && carousel.addEventListener('touchend', start);

    document.addEventListener('keydown', e => {
      if(!carousel) return;
      if(e.key === 'ArrowLeft') prev();
      if(e.key === 'ArrowRight') next();
    });

    window.addEventListener('load', ()=>{ update(); start(); });
  }
  
});
    function start() { stop(); interval = setInterval(next, AUTO_MS); }
