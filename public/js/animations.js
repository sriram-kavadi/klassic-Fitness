/**
 * KLASSIC FITNESS — animations.js
 * GSAP-powered premium animations for maximum impact and conversion
 */

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, TextPlugin);

/* ============================================
   1. PAGE ENTRY — Curtain Reveal
   ============================================ */
function initPageCurtain() {
  const curtain = document.getElementById('page-curtain');
  if (!curtain) return;

  gsap.timeline()
    .to(curtain, {
      scaleY: 0,
      transformOrigin: 'top',
      duration: 0.9,
      ease: 'power4.inOut',
      delay: 0.1
    })
    .set(curtain, { display: 'none' })
    .add(() => initHeroAnimation(), '-=0.2');
}

/* ============================================
   2. HERO ANIMATIONS
   ============================================ */
function initHeroAnimation() {
  gsap.set('.stat-card', { opacity: 1 });
  const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

  // Eyebrow
  tl.from('.hero-eyebrow', { opacity: 0, x: -30, duration: 0.6 })

  // Headlines — stagger
  .from('.hero-line-1', { opacity: 0, y: 80, duration: 0.8, skewY: 3 }, '-=0.2')
  .from('.hero-line-2', { opacity: 0, y: 80, duration: 0.8, skewY: 3 }, '-=0.5')
  .from('.hero-line-3', { opacity: 0, y: 80, duration: 0.8, skewY: 3 }, '-=0.5')

  // Sub text
  .from('.hero-sub', { opacity: 0, y: 30, duration: 0.7 }, '-=0.4')

  // Offer box with scale
  .from('.hero-offer', { opacity: 0, y: 30, scale: 0.95, duration: 0.7 }, '-=0.3')

  // CTAs
  .from('.hero-ctas', { opacity: 0, y: 20, duration: 0.6 }, '-=0.3')

  // Trust
  .from('.hero-trust', { opacity: 0, y: 20, duration: 0.6 }, '-=0.3')

  // Right stats — stagger from right
  .from('.stat-card', {
    opacity: 0, x: 60, duration: 0.7,
    stagger: 0.15, ease: 'power3.out'
  }, '-=0.8');
}

/* ============================================
   3. SCROLL REVEAL — Generic sections
   ============================================ */
function initScrollReveals() {
  // Reveal section elements
  gsap.utils.toArray('.reveal-section').forEach(el => {
    gsap.fromTo(el,
      { opacity: 0, y: 50 },
      {
        opacity: 1, y: 0, duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      }
    );
  });
}

/* ============================================
   4. SECTION HEADERS — Split text effect
   ============================================ */
function initSectionHeaders() {
  gsap.utils.toArray('h2').forEach(h2 => {
    gsap.fromTo(h2,
      { opacity: 0, y: 60 },
      {
        opacity: 1, y: 0, duration: 1,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: h2,
          start: 'top 88%',
          toggleActions: 'play none none none'
        }
      }
    );
  });
}

/* ============================================
   5. PROGRAM CARDS — Stagger on scroll
   ============================================ */
function initProgramCards() {
  gsap.fromTo('.program-card',
    { opacity: 0, y: 60, scale: 0.95 },
    {
      opacity: 1, y: 0, scale: 1,
      duration: 0.7,
      stagger: 0.12,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '#programs',
        start: 'top 75%',
        toggleActions: 'play none none none'
      }
    }
  );
}

/* ============================================
   6. TRANSFORM CARDS — stagger + hover
   ============================================ */
function initTransformCards() {
  gsap.fromTo('.transform-card',
    { opacity: 0, y: 50, scale: 0.9 },
    {
      opacity: 1, y: 0, scale: 1,
      duration: 0.6,
      stagger: 0.1,
      ease: 'back.out(1.2)',
      scrollTrigger: {
        trigger: '#social-proof',
        start: 'top 80%',
        toggleActions: 'play none none none'
      }
    }
  );
}

/* ============================================
   7. TRAINER CARDS — slide up stagger
   ============================================ */
function initTrainerCards() {
  gsap.fromTo('.trainer-card',
    { opacity: 0, y: 70 },
    {
      opacity: 1, y: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '#trainers',
        start: 'top 78%',
        toggleActions: 'play none none none'
      }
    }
  );
}

/* ============================================
   8. GALLERY — masonry reveal
   ============================================ */
function initGallery() {
  gsap.fromTo('.gallery-item',
    { opacity: 0, scale: 0.85, y: 40 },
    {
      opacity: 1, scale: 1, y: 0,
      duration: 0.7,
      stagger: { each: 0.1, from: 'start' },
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '#gallery',
        start: 'top 80%',
        toggleActions: 'play none none none'
      }
    }
  );
}

/* ============================================
   9. OFFER SECTION — perks pop-in
   ============================================ */
function initOfferSection() {
  gsap.fromTo('.offer-perk',
    { opacity: 0, y: 30, scale: 0.9 },
    {
      opacity: 1, y: 0, scale: 1,
      duration: 0.6,
      stagger: 0.1,
      ease: 'back.out(1.5)',
      scrollTrigger: {
        trigger: '#offer',
        start: 'top 78%',
        toggleActions: 'play none none none'
      }
    }
  );

  // Countdown digits drop-in
  gsap.fromTo('.countdown-digit',
    { opacity: 0, y: -30, rotationX: 90 },
    {
      opacity: 1, y: 0, rotationX: 0,
      duration: 0.7,
      stagger: 0.15,
      ease: 'back.out(1.4)',
      scrollTrigger: {
        trigger: '.countdown-wrap',
        start: 'top 80%',
        toggleActions: 'play none none none'
      }
    }
  );
}

/* ============================================
   10. STATS COUNTER ANIMATION
   ============================================ */
function initCounterAnimation() {
  const counters = document.querySelectorAll('.stat-card [class*="text-brand"]');
  counters.forEach(counter => {
    const text = counter.innerText;
    const num = parseInt(text.replace(/\D/g, ''));
    if (!num) return;

    ScrollTrigger.create({
      trigger: counter,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        const obj = { val: 0 };
        gsap.to(obj, {
          val: num, duration: 1.5, ease: 'power2.out',
          onUpdate: () => {
            counter.innerText = text.replace(/\d+/, Math.floor(obj.val));
          }
        });
      }
    });
  });
}

/* ============================================
   11. FORM SECTION — stagger fields
   ============================================ */
function initFormAnimation() {
  gsap.fromTo('.form-group',
    { opacity: 0, x: -30 },
    {
      opacity: 1, x: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '#lead-form',
        start: 'top 78%',
        toggleActions: 'play none none none'
      }
    }
  );

  // Steps
  gsap.fromTo('[data-step]',
    { opacity: 0, x: -20 },
    {
      opacity: 1, x: 0,
      duration: 0.5,
      stagger: 0.1,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '#lead-form',
        start: 'top 75%',
        toggleActions: 'play none none none'
      }
    }
  );
}

/* ============================================
   12. FINAL CTA — explosive reveal
   ============================================ */
function initFinalCTA() {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: '#final-cta',
      start: 'top 80%',
      toggleActions: 'play none none none'
    }
  });

  tl.fromTo('#final-cta h2',
    { opacity: 0, scale: 0.8 },
    { opacity: 1, scale: 1, duration: 0.9, ease: 'power4.out' }
  )
  .fromTo('#final-cta p',
    { opacity: 0, y: 30 },
    { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, '-=0.4'
  )
  .fromTo('#final-cta .flex a',
    { opacity: 0, y: 20, scale: 0.9 },
    { opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.1, ease: 'back.out(1.3)' }, '-=0.3'
  );
}

/* ============================================
   13. HORIZONTAL PROGRESS BAR ANIMATION
   ============================================ */
function initProgressBar() {
  const fill = document.querySelector('.progress-fill');
  if (!fill) return;

  ScrollTrigger.create({
    trigger: fill,
    start: 'top 90%',
    once: true,
    onEnter: () => {
      gsap.fromTo(fill, { width: '0%' }, { width: '85%', duration: 1.5, ease: 'power3.out' });
    }
  });
}

/* ============================================
   14. TESTIMONIALS AUTO-SCROLL
   ============================================ */
function initTestimonialsScroll() {
  const track = document.getElementById('testimonials-track');
  if (!track) return;

  const cards = track.querySelectorAll('.testimonial-card');
  const totalCards = cards.length / 2; // halved because we doubled them
  const cardWidth = 320 + 20; // card width + gap

  let currentX = 0;
  const speed = 0.5;
  let paused = false;

  track.addEventListener('mouseenter', () => paused = true);
  track.addEventListener('mouseleave', () => paused = false);

  function animate() {
    if (!paused) {
      currentX -= speed;
      if (Math.abs(currentX) >= totalCards * cardWidth) {
        currentX = 0;
      }
      track.style.transform = `translateX(${currentX}px)`;
    }
    requestAnimationFrame(animate);
  }
  animate();
}

/* ============================================
   15. CURSOR GLOW EFFECT
   ============================================ */
function initCursorGlow() {
  if (window.innerWidth < 768) return; // Skip on mobile

  const glow = document.createElement('div');
  glow.className = 'cursor-glow';
  document.body.appendChild(glow);

  document.addEventListener('mousemove', e => {
    glow.style.left = e.clientX + 'px';
    glow.style.top = e.clientY + 'px';
  });
}

/* ============================================
   16. MAGNETIC BUTTON EFFECT
   ============================================ */
function initMagneticButtons() {
  if (window.innerWidth < 768) return;

  document.querySelectorAll('.cta-primary').forEach(btn => {
    btn.addEventListener('mousemove', e => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      gsap.to(btn, { x: x * 0.2, y: y * 0.2, duration: 0.3, ease: 'power2.out' });
    });
    btn.addEventListener('mouseleave', () => {
      gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.5)' });
    });
  });
}

/* ============================================
   17. PARALLAX HERO GLOW
   ============================================ */
function initParallax() {
  if (window.innerWidth < 768) return;

  const glow = document.querySelector('.hero-glow');
  if (!glow) return;

  document.addEventListener('mousemove', e => {
    const x = (e.clientX / window.innerWidth - 0.5) * 40;
    const y = (e.clientY / window.innerHeight - 0.5) * 40;
    gsap.to(glow, { x, y, duration: 1.5, ease: 'power2.out' });
  });
}

/* ============================================
   18. SCROLL PROGRESS INDICATOR
   ============================================ */
function initScrollProgress() {
  const bar = document.createElement('div');
  bar.style.cssText = `
    position: fixed; top: 0; left: 0; height: 2px;
    background: linear-gradient(90deg, #FF2E2E, #FF8C00);
    z-index: 9998; width: 0%; transition: width 0.1s linear;
    box-shadow: 0 0 10px rgba(255,46,46,0.6);
  `;
  document.body.appendChild(bar);

  window.addEventListener('scroll', () => {
    const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    bar.style.width = scrolled + '%';
  });
}

/* ============================================
   19. SPOTLIGHT HOVER on program cards
   ============================================ */
function initCardSpotlight() {
  document.querySelectorAll('.program-card, .trainer-card, .transform-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      card.style.setProperty('--mouse-x', x + '%');
      card.style.setProperty('--mouse-y', y + '%');
      card.style.background = `radial-gradient(circle at ${x}% ${y}%, rgba(255,46,46,0.08) 0%, #111111 60%)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.background = '';
    });
  });
}

/* ============================================
   20. SECTION BACKGROUND PARALLAX
   ============================================ */
function initSectionParallax() {
  gsap.utils.toArray('section').forEach(section => {
    gsap.fromTo(section.querySelector('.absolute[class*="blur"]'),
      { y: 0 },
      {
        y: -50,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      }
    );
  });
}

/* ============================================
   INIT ALL
   ============================================ */
document.addEventListener('DOMContentLoaded', () => {
  initPageCurtain();
  initScrollReveals();
  initSectionHeaders();
  initProgramCards();
  initTransformCards();
  initTrainerCards();
  initGallery();
  initOfferSection();
  initCounterAnimation();
  initFormAnimation();
  initFinalCTA();
  initProgressBar();
  initTestimonialsScroll();
  initCursorGlow();
  initMagneticButtons();
  initParallax();
  initScrollProgress();
  initCardSpotlight();

  // Refresh ScrollTrigger after all init
  setTimeout(() => ScrollTrigger.refresh(), 300);
});
