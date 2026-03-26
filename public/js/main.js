/**
 * KLASSIC FITNESS — main.js
 * Core interactive functionality: navbar, countdown, form, mobile menu, etc.
 */

/* ============================================
   1. NAVBAR — scroll behavior
   ============================================ */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    // Add scrolled class for backdrop blur
    if (scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Hide/show on scroll direction
    if (scrollY > 300) {
      if (scrollY > lastScroll) {
        navbar.style.transform = 'translateY(-100%)';
      } else {
        navbar.style.transform = 'translateY(0)';
      }
    } else {
      navbar.style.transform = 'translateY(0)';
    }

    lastScroll = scrollY;
  }, { passive: true });
}

/* ============================================
   2. MOBILE MENU
   ============================================ */
function initMobileMenu() {
  const btn = document.getElementById('mobile-menu-btn');
  const menu = document.getElementById('mobile-menu');
  const bars = btn?.querySelectorAll('.menu-bar');
  let isOpen = false;

  if (!btn || !menu) return;

  btn.addEventListener('click', () => {
    isOpen = !isOpen;
    menu.classList.toggle('hidden', !isOpen);

    // Animate hamburger → X
    if (bars) {
      if (isOpen) {
        bars[0].style.transform = 'translateY(8px) rotate(45deg)';
        bars[1].style.opacity = '0';
        bars[2].style.transform = 'translateY(-8px) rotate(-45deg)';
      } else {
        bars[0].style.transform = '';
        bars[1].style.opacity = '1';
        bars[2].style.transform = '';
      }
    }
  });

  // Close on link click
  menu.querySelectorAll('.mobile-menu-link').forEach(link => {
    link.addEventListener('click', () => {
      isOpen = false;
      menu.classList.add('hidden');
      if (bars) {
        bars[0].style.transform = '';
        bars[1].style.opacity = '1';
        bars[2].style.transform = '';
      }
    });
  });
}

/* ============================================
   3. COUNTDOWN TIMER
   ============================================ */
function initCountdownTimer() {
  const hoursEl = document.getElementById('cd-hours');
  const minutesEl = document.getElementById('cd-minutes');
  const secondsEl = document.getElementById('cd-seconds');

  if (!hoursEl || !minutesEl || !secondsEl) return;

  // Set deadline: end of today midnight
  const now = new Date();
  const deadline = new Date();
  deadline.setHours(23, 59, 59, 0);

  // If past midnight, add 24hrs
  if (now > deadline) deadline.setDate(deadline.getDate() + 1);

  let prevSeconds = -1;

  function updateTimer() {
    const diff = deadline - new Date();
    if (diff <= 0) {
      // Reset timer for next day
      deadline.setDate(deadline.getDate() + 1);
      return;
    }

    const h = Math.floor(diff / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    const s = Math.floor((diff % 60000) / 1000);

    const pad = n => String(n).padStart(2, '0');

    hoursEl.textContent = pad(h);
    minutesEl.textContent = pad(m);

    if (s !== prevSeconds) {
      // Flip animation on seconds change
      secondsEl.classList.remove('flip');
      void secondsEl.offsetWidth; // reflow
      secondsEl.classList.add('flip');
      secondsEl.textContent = pad(s);
      prevSeconds = s;
    }
  }

  updateTimer();
  setInterval(updateTimer, 1000);
}

/* ============================================
   4. SPOTS COUNTER — fake social proof
   ============================================ */
function initSpotsCounter() {
  const counters = document.querySelectorAll('#spots-counter, #offer-spots');
  let spots = 20;

  // Simulate spots decreasing
  function decreaseSpot() {
    if (spots > 12) {
      spots--;
      counters.forEach(el => {
        if (el) {
          el.textContent = el.id === 'offer-spots' ? `${spots} spots` : `${spots} Left`;
          // Flash animation
          el.style.transform = 'scale(1.2)';
          el.style.color = '#FF2E2E';
          setTimeout(() => {
            el.style.transform = '';
          }, 300);
        }
      });
    }
  }

  // Decrease every 3-7 minutes randomly
  const randomInterval = () => Math.floor(Math.random() * 4 + 3) * 60 * 1000;
  setTimeout(function tick() {
    decreaseSpot();
    setTimeout(tick, randomInterval());
  }, randomInterval());
}

/* ============================================
   5. STICKY CTA BAR — show after hero
   ============================================ */
function initStickyCTA() {
  const bar = document.getElementById('sticky-cta');
  if (!bar) return;

  const hero = document.getElementById('hero');
  if (!hero) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) {
        bar.classList.add('visible');
      } else {
        bar.classList.remove('visible');
      }
    });
  }, { threshold: 0.1 });

  observer.observe(hero);
}

/* ============================================
   6. LEAD FORM SUBMISSION
   ============================================ */
function initLeadForm() {
  const form = document.getElementById('lead-capture-form');
  if (!form) return;

  const submitBtn = document.getElementById('form-submit-btn');
  const btnText = document.getElementById('btn-text');
  const successDiv = document.getElementById('form-success');
  const successMsg = document.getElementById('success-message');
  const errorGlobal = document.getElementById('form-error-global');
  const errorMsg = document.getElementById('error-message');

  // Real-time validation
  const nameInput = document.getElementById('form-name');
  const phoneInput = document.getElementById('form-phone');
  const goalSelect = document.getElementById('form-goal');

  function showFieldError(input, message) {
    const group = input.closest('.form-group');
    const errorEl = group?.querySelector('.form-error');
    if (errorEl) {
      errorEl.textContent = message;
      errorEl.classList.remove('hidden');
    }
    input.style.borderColor = '#FF2E2E';
    input.style.boxShadow = '0 0 0 3px rgba(255,46,46,0.2)';
  }

  function clearFieldError(input) {
    const group = input.closest('.form-group');
    const errorEl = group?.querySelector('.form-error');
    if (errorEl) {
      errorEl.textContent = '';
      errorEl.classList.add('hidden');
    }
    input.style.borderColor = '';
    input.style.boxShadow = '';
  }

  nameInput?.addEventListener('input', () => {
    if (nameInput.value.trim().length >= 2) clearFieldError(nameInput);
  });

  phoneInput?.addEventListener('input', () => {
    // Only allow digits
    phoneInput.value = phoneInput.value.replace(/\D/g, '');
    if (/^[6-9]\d{9}$/.test(phoneInput.value)) clearFieldError(phoneInput);
  });

  goalSelect?.addEventListener('change', () => {
    if (goalSelect.value) clearFieldError(goalSelect);
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Hide previous messages
    successDiv?.classList.add('hidden');
    errorGlobal?.classList.add('hidden');

    // Client-side validation
    let valid = true;

    if (!nameInput?.value.trim() || nameInput.value.trim().length < 2) {
      showFieldError(nameInput, 'Please enter your full name (min 2 characters).');
      valid = false;
    }

    if (!phoneInput?.value || !/^[6-9]\d{9}$/.test(phoneInput.value.trim())) {
      showFieldError(phoneInput, 'Enter a valid 10-digit mobile number.');
      valid = false;
    }

    if (!goalSelect?.value) {
      showFieldError(goalSelect, 'Please select your fitness goal.');
      valid = false;
    }

    if (!valid) {
      // Shake form
      gsap.fromTo(form,
        { x: -8 },
        { x: 0, duration: 0.5, ease: 'elastic.out(1, 0.3)',
          keyframes: [{ x: -8 }, { x: 8 }, { x: -5 }, { x: 5 }, { x: 0 }] }
      );
      return;
    }

    // Loading state
    submitBtn.disabled = true;
    btnText.innerHTML = '<span class="spinner"></span> Submitting...';

    try {
      const response = await fetch('/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: nameInput.value.trim(),
          phone: phoneInput.value.trim(),
          goal: goalSelect.value
        })
      });

      const data = await response.json();

      if (data.success) {
        // Success state
        btnText.innerHTML = '✅ Done! We\'ll WhatsApp you shortly';
        submitBtn.style.background = '#16a34a';

        successMsg.textContent = data.message;
        successDiv?.classList.remove('hidden');

        // Animate success
        gsap.fromTo(successDiv,
          { opacity: 0, scale: 0.9, y: 10 },
          { opacity: 1, scale: 1, y: 0, duration: 0.5, ease: 'back.out(1.4)' }
        );

        // Confetti-like animation
        fireSuccessEffect();

        // Reset form after 5s
        setTimeout(() => {
          form.reset();
          submitBtn.disabled = false;
          submitBtn.style.background = '';
          btnText.innerHTML = `Get My FREE Trial Pass <svg class="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>`;
          successDiv?.classList.add('hidden');
        }, 5000);

      } else {
        // Server validation errors
        if (data.errors?.length) {
          errorMsg.textContent = data.errors[0];
          errorGlobal?.classList.remove('hidden');
        }
        submitBtn.disabled = false;
        btnText.innerHTML = 'Get My FREE Trial Pass →';
      }

    } catch (err) {
      console.error('Form error:', err);
      errorMsg.textContent = 'Something went wrong. Please call us directly!';
      errorGlobal?.classList.remove('hidden');
      submitBtn.disabled = false;
      btnText.innerHTML = 'Get My FREE Trial Pass →';
    }
  });
}

/* ============================================
   7. SUCCESS CONFETTI EFFECT
   ============================================ */
function fireSuccessEffect() {
  const colors = ['#FF2E2E', '#FF8C00', '#FFD700', '#00C851', '#ffffff'];
  const container = document.getElementById('lead-capture-form');
  if (!container) return;

  for (let i = 0; i < 30; i++) {
    const dot = document.createElement('div');
    const color = colors[Math.floor(Math.random() * colors.length)];
    dot.style.cssText = `
      position: absolute; width: 8px; height: 8px;
      background: ${color}; border-radius: 50%;
      pointer-events: none; z-index: 100;
      left: ${Math.random() * 100}%;
      top: ${Math.random() * 100}%;
    `;
    container.style.position = 'relative';
    container.appendChild(dot);

    gsap.fromTo(dot,
      { opacity: 1, scale: 0, x: 0, y: 0 },
      {
        opacity: 0, scale: 1,
        x: (Math.random() - 0.5) * 200,
        y: (Math.random() - 0.5) * 200,
        duration: 1 + Math.random(),
        ease: 'power2.out',
        onComplete: () => dot.remove()
      }
    );
  }
}

/* ============================================
   8. SMOOTH ANCHOR SCROLLING
   ============================================ */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const href = anchor.getAttribute('href');
      if (href === '#') return;

      const target = document.querySelector(href);
      if (!target) return;

      e.preventDefault();

      const navbarHeight = document.getElementById('navbar')?.offsetHeight || 80;
      const targetY = target.getBoundingClientRect().top + window.scrollY - navbarHeight;

      window.scrollTo({ top: targetY, behavior: 'smooth' });
    });
  });
}

/* ============================================
   9. WHATSAPP BUTTON — show after 3s delay
   ============================================ */
function initWhatsappFloat() {
  const btn = document.getElementById('whatsapp-float');
  if (!btn) return;

  btn.style.opacity = '0';
  btn.style.transform = 'scale(0) translateY(20px)';
  btn.style.transition = 'all 0.5s cubic-bezier(0.23, 1, 0.32, 1)';

  setTimeout(() => {
    btn.style.opacity = '1';
    btn.style.transform = 'scale(1) translateY(0)';
  }, 3000);

  // Pulse reminder every 30s
  setInterval(() => {
    gsap.fromTo(btn,
      { scale: 1 },
      { scale: 1.2, duration: 0.3, yoyo: true, repeat: 3, ease: 'power2.inOut' }
    );
  }, 30000);
}

/* ============================================
   10. ACTIVE NAV LINK — on scroll
   ============================================ */
function initActiveNavLinks() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.classList.remove('text-white');
          link.classList.add('text-gray-400');
          if (link.getAttribute('href') === `#${entry.target.id}`) {
            link.classList.remove('text-gray-400');
            link.classList.add('text-white');
          }
        });
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(s => observer.observe(s));
}

/* ============================================
   11. LAZY LOAD IMAGES
   ============================================ */
function initLazyLoad() {
  if ('IntersectionObserver' in window) {
    const imgObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
          }
          imgObserver.unobserve(img);
        }
      });
    });

    document.querySelectorAll('img[data-src]').forEach(img => imgObserver.observe(img));
  }
}

/* ============================================
   12. URGENCY NOTIFICATION TOAST
   ============================================ */
function initUrgencyToasts() {
  const messages = [
    '🔥 Ravi from Hyderabad just signed up for a free trial!',
    '⚡ 3 spots claimed in the last hour!',
    '💪 Priya just lost 4kg in her first month!',
    '🎯 Only 18 spots left this month!',
    '🏆 Arjun just completed his 90-day transformation!',
  ];

  let index = 0;

  function showToast() {
    const toast = document.createElement('div');
    toast.style.cssText = `
      position: fixed; bottom: 100px; left: 20px;
      background: #111; border: 1px solid #1E1E1E;
      border-left: 3px solid #FF2E2E;
      color: #fff; padding: 14px 18px;
      border-radius: 10px; font-size: 13px;
      font-family: 'DM Sans', sans-serif;
      max-width: 280px; z-index: 9000;
      box-shadow: 0 8px 32px rgba(0,0,0,0.6);
      pointer-events: none;
    `;
    toast.textContent = messages[index % messages.length];
    index++;
    document.body.appendChild(toast);

    gsap.fromTo(toast,
      { opacity: 0, x: -40, scale: 0.9 },
      {
        opacity: 1, x: 0, scale: 1,
        duration: 0.5, ease: 'back.out(1.4)',
        onComplete: () => {
          gsap.to(toast, {
            opacity: 0, x: -20, duration: 0.4,
            delay: 4, ease: 'power2.in',
            onComplete: () => toast.remove()
          });
        }
      }
    );
  }

  // First toast after 10s, then every 25s
  setTimeout(() => {
    showToast();
    setInterval(showToast, 25000);
  }, 10000);
}

/* ============================================
   13. SCROLL-TRIGGERED NUMBER TICKER in hero
   ============================================ */
function initHeroTicker() {
  // Already handled in animations.js counters
}

/* ============================================
   INIT ALL
   ============================================ */
document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initMobileMenu();
  initCountdownTimer();
  initSpotsCounter();
  initStickyCTA();
  initLeadForm();
  initSmoothScroll();
  initWhatsappFloat();
  initActiveNavLinks();
  initLazyLoad();
  initUrgencyToasts();
});
