document.addEventListener("DOMContentLoaded", function () {

  // ================= THEME TOGGLE =================
  const themeToggle = document.getElementById("themeToggle");
  const body = document.body;

  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    body.classList.add("dark-theme");
    if (themeToggle) themeToggle.textContent = "☀️";
  }

  if (themeToggle) {
    themeToggle.addEventListener("click", function () {
      body.classList.toggle("dark-theme");
      const isDark = body.classList.contains("dark-theme");
      themeToggle.textContent = isDark ? "☀️" : "🌙";
      localStorage.setItem("theme", isDark ? "dark" : "light");
    });
  }


  // ================= USERNAME + VISIT COUNT =================
  const usernameInput = document.getElementById("usernameInput");
  const saveUsernameBtn = document.getElementById("saveUsernameBtn");
  const welcomeUser = document.getElementById("welcomeUser");
  const visitDisplay = document.getElementById("visitCountDisplay");

  const savedUsername = localStorage.getItem("username");
  if (savedUsername && welcomeUser) {
    welcomeUser.textContent = `Welcome back, ${savedUsername} 👋`;
  }

  if (saveUsernameBtn) {
    saveUsernameBtn.addEventListener("click", () => {
      const username = usernameInput.value.trim();
      if (username !== "") {
        localStorage.setItem("username", username);
        welcomeUser.textContent = `Welcome, ${username} 👋`;
        usernameInput.value = "";
      }
    });
  }

  let visitCount = localStorage.getItem("visitCount");
  visitCount = visitCount ? parseInt(visitCount) + 1 : 1;
  localStorage.setItem("visitCount", visitCount);

  if (visitDisplay) {
    visitDisplay.textContent = `You have visited this site ${visitCount} times.`;
  }


  // ================= MOBILE SIDEBAR =================
  const hamburger = document.getElementById("hamburger");
  const mobileSidebar = document.getElementById("mobileSidebar");
  const mobileClose = document.getElementById("mobileClose");
  const overlay = document.getElementById("overlay");

  function openSidebar() {
    if (!mobileSidebar) return;
    mobileSidebar.classList.add("open");
    overlay.hidden = false;
    setTimeout(() => overlay.classList.add("show"), 10);
    hamburger.setAttribute("aria-expanded", "true");
  }

  function closeSidebar() {
    if (!mobileSidebar) return;
    mobileSidebar.classList.remove("open");
    overlay.classList.remove("show");
    setTimeout(() => overlay.hidden = true, 280);
    hamburger.setAttribute("aria-expanded", "false");
  }

  hamburger && hamburger.addEventListener("click", openSidebar);
  mobileClose && mobileClose.addEventListener("click", closeSidebar);
  overlay && overlay.addEventListener("click", closeSidebar);


  // ================= CAROUSEL =================
  const track = document.querySelector(".carousel-track");

  if (track) {
    const slides = Array.from(track.children);
    const nextBtn = document.querySelector(".carousel-btn.next");
    const prevBtn = document.querySelector(".carousel-btn.prev");

    let currentIndex = 0;
    let interval = null;
    const AUTO_MS = 4000;

    function update() {
      track.style.transform = `translateX(-${currentIndex * 100}%)`;
    }

    function next() {
      currentIndex = (currentIndex + 1) % slides.length;
      update();
    }

    function prev() {
      currentIndex = (currentIndex - 1 + slides.length) % slides.length;
      update();
    }

    function start() {
      stop();
      interval = setInterval(next, AUTO_MS);
    }

    function stop() {
      if (interval) clearInterval(interval);
    }

    nextBtn && nextBtn.addEventListener("click", () => {
      next();
      start();
    });

    prevBtn && prevBtn.addEventListener("click", () => {
      prev();
      start();
    });

    window.addEventListener("load", () => {
      update();
      start();
    });
  }

});

// ================= BUTTON CLICK INTERACTION =================

const actionButtons = document.querySelectorAll(
  "button:not(.hamburger):not(.mobile-close):not(#themeToggle)"
);

actionButtons.forEach(button => {
  button.addEventListener("click", function (e) {

    const text = this.textContent.trim();

    // Ignore Save button (preferences section)
    if (this.id === "saveUsernameBtn") return;

    e.preventDefault();

    alert(`You clicked "${text}"`);

  });
});