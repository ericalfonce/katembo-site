/* ============================================================
   KATEMBO SAFARI — GSAP Animation Engine
   "Antigravity" Motion: Floating, Parallax, Scroll Choreography
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // ─── Detect Reduced Motion Preference ───
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ─── Wait for GSAP to load ───
  const initAnimations = () => {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
      setTimeout(initAnimations, 100);
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    // ─── GSAP Defaults ───
    gsap.defaults({
      ease: 'power3.out',
      duration: 1
    });

    if (!prefersReducedMotion) {
      initHeroAnimations();
      initParallax();
      initScrollReveals();
      initExperienceCards();
      initDifferenceSection();
      initLodgesSection();
      initFooterAnimations();
    } else {
      // Show everything immediately for reduced motion
      gsap.set('.reveal, .reveal-left, .reveal-right, .reveal-scale', {
        opacity: 1,
        x: 0,
        y: 0,
        scale: 1
      });
      gsap.set('.hero__content .section-label, .hero__title, .hero__subtitle, .hero__actions', {
        opacity: 1,
        y: 0
      });
    }
  };

  // ─── 1. Hero Section Animations ───
  function initHeroAnimations() {
    const heroTL = gsap.timeline({ delay: 0.5 });

    heroTL
      .to('.hero__content .section-label', {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out'
      })
      .to('.hero__title', {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: 'power3.out'
      }, '-=0.4')
      .to('.hero__subtitle', {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: 'power2.out'
      }, '-=0.6')
      .to('.hero__actions', {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out'
      }, '-=0.4');
  }

  // ─── 2. Hero Parallax ───
  function initParallax() {
    gsap.to('.hero__bg img', {
      yPercent: 25,
      ease: 'none',
      scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        scrub: 0.8
      }
    });
  }

  // ─── 3. Scroll Reveal Animations ───
  function initScrollReveals() {
    // Reveal from bottom
    gsap.utils.toArray('.reveal').forEach((el, i) => {
      gsap.to(el, {
        opacity: 1,
        y: 0,
        duration: 1,
        delay: i * 0.08,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 88%',
          toggleActions: 'play none none none'
        }
      });
    });

    // Reveal from left
    gsap.utils.toArray('.reveal-left').forEach((el, i) => {
      gsap.to(el, {
        opacity: 1,
        x: 0,
        duration: 1,
        delay: i * 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 88%',
          toggleActions: 'play none none none'
        }
      });
    });

    // Reveal from right
    gsap.utils.toArray('.reveal-right').forEach((el, i) => {
      gsap.to(el, {
        opacity: 1,
        x: 0,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 88%',
          toggleActions: 'play none none none'
        }
      });
    });

    // Reveal with scale
    gsap.utils.toArray('.reveal-scale').forEach(el => {
      gsap.to(el, {
        opacity: 1,
        scale: 1,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 88%',
          toggleActions: 'play none none none'
        }
      });
    });
  }

  // ─── 4. Experience Cards — Staggered Float ───
  function initExperienceCards() {
    const cards = gsap.utils.toArray('.experience-card');

    cards.forEach((card, index) => {
      // Scroll-triggered entrance
      gsap.to(card, {
        opacity: 1,
        y: 0,
        duration: 1,
        delay: index * 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.experiences__grid',
          start: 'top 80%',
          toggleActions: 'play none none none'
        }
      });

      // Subtle parallax on card images
      const img = card.querySelector('.experience-card__image img');
      if (img) {
        gsap.to(img, {
          yPercent: -8,
          ease: 'none',
          scrollTrigger: {
            trigger: card,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1
          }
        });
      }
    });
  }

  // ─── 5. Difference Section — Split Reveal ───
  function initDifferenceSection() {
    // Stats counter animation
    const statNumbers = document.querySelectorAll('.stat__number');
    statNumbers.forEach(stat => {
      const text = stat.textContent;
      const match = text.match(/(\d+)/);
      if (!match) return;

      const endVal = parseInt(match[1]);
      const suffix = text.replace(match[1], '');

      gsap.from(stat, {
        textContent: 0,
        duration: 2.5,
        ease: 'power2.out',
        snap: { textContent: 1 },
        scrollTrigger: {
          trigger: stat,
          start: 'top 90%',
          toggleActions: 'play none none none'
        },
        onUpdate: function() {
          const current = Math.round(gsap.getProperty(stat, 'textContent'));
          stat.textContent = current + suffix;
        }
      });

      // Fix: set final value
      ScrollTrigger.create({
        trigger: stat,
        start: 'top 90%',
        onEnter: () => {
          gsap.delayedCall(2.6, () => {
            stat.textContent = text;
          });
        }
      });
    });

    // Parallax on the visual image
    const diffVisual = document.querySelector('.difference__visual img');
    if (diffVisual) {
      gsap.to(diffVisual, {
        yPercent: -6,
        ease: 'none',
        scrollTrigger: {
          trigger: '.difference',
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.2
        }
      });
    }
  }

  // ─── 6. Lodges Section ───
  function initLodgesSection() {
    // Animate active panel content
    const panels = document.querySelectorAll('.lodge-panel');
    panels.forEach(panel => {
      const reveals = panel.querySelectorAll('.reveal, .reveal-scale');
      reveals.forEach(el => {
        gsap.to(el, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: panel,
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        });
      });
    });
  }

  // ─── 7. Footer Animations ───
  function initFooterAnimations() {
    gsap.from('.footer__top > *', {
      opacity: 0,
      y: 30,
      stagger: 0.12,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.footer',
        start: 'top 85%',
        toggleActions: 'play none none none'
      }
    });

    gsap.from('.footer__bottom', {
      opacity: 0,
      duration: 0.6,
      scrollTrigger: {
        trigger: '.footer__bottom',
        start: 'top 95%',
        toggleActions: 'play none none none'
      }
    });
  }

  // ─── Initialize GSAP ───
  initAnimations();


  /* ============================================================
     INTERACTIVE COMPONENTS — No GSAP required
     ============================================================ */

  // ─── Sticky Navigation State ───
  const navbar = document.getElementById('navbar');
  let lastScrollY = 0;

  const updateNavbar = () => {
    const scrollY = window.scrollY;
    if (scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    lastScrollY = scrollY;
  };

  window.addEventListener('scroll', updateNavbar, { passive: true });
  updateNavbar();

  // ─── Mobile Menu Toggle ───
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('open');
      navToggle.classList.toggle('active');
      navToggle.setAttribute('aria-expanded', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close menu on link click
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        navToggle.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
  }

  // ─── Lodge Tab Switching ───
  const tabs = document.querySelectorAll('.lodge-tab');
  const panels = document.querySelectorAll('.lodge-panel');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.tab;

      // Update tabs
      tabs.forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');

      // Update panels
      panels.forEach(panel => {
        panel.classList.remove('active');
        if (panel.dataset.panel === target) {
          panel.classList.add('active');

          // Re-animate panel content
          if (!prefersReducedMotion && typeof gsap !== 'undefined') {
            const panelReveals = panel.querySelectorAll('.lodge-panel__name, .lodge-panel__location, .lodge-panel__desc, .lodge-panel__features, .lodge-panel__image');
            gsap.from(panelReveals, {
              opacity: 0,
              y: 20,
              stagger: 0.08,
              duration: 0.6,
              ease: 'power3.out'
            });
          }
        }
      });
    });
  });

  // ─── Keyboard Navigation for Tabs ───
  const tabList = document.querySelector('[role="tablist"]');
  if (tabList) {
    tabList.addEventListener('keydown', (e) => {
      const tabArray = Array.from(tabs);
      const currentIndex = tabArray.indexOf(document.activeElement);

      let newIndex;
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        newIndex = (currentIndex + 1) % tabArray.length;
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        newIndex = (currentIndex - 1 + tabArray.length) % tabArray.length;
      } else if (e.key === 'Home') {
        e.preventDefault();
        newIndex = 0;
      } else if (e.key === 'End') {
        e.preventDefault();
        newIndex = tabArray.length - 1;
      }

      if (newIndex !== undefined) {
        tabArray[newIndex].focus();
        tabArray[newIndex].click();
      }
    });
  }

  // ─── Smooth Scroll for Anchor Links ───
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const navHeight = navbar.offsetHeight;
        const targetPosition = target.getBoundingClientRect().top + window.scrollY - navHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: prefersReducedMotion ? 'auto' : 'smooth'
        });
      }
    });
  });

  // ─── Newsletter Form Handler ───
  const newsletterForm = document.querySelector('.footer__newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const emailInput = newsletterForm.querySelector('input[type="email"]');
      const submitBtn = newsletterForm.querySelector('button');

      if (emailInput.value) {
        submitBtn.textContent = 'Subscribed ✓';
        submitBtn.style.background = '#6B8E23';
        emailInput.value = '';

        setTimeout(() => {
          submitBtn.textContent = 'Subscribe';
          submitBtn.style.background = '';
        }, 3000);
      }
    });
  }

  // ─── Intersection Observer for Lazy Performance ───
  if ('IntersectionObserver' in window) {
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.style.opacity = '1';
          imageObserver.unobserve(img);
        }
      });
    }, {
      rootMargin: '200px 0px'
    });

    lazyImages.forEach(img => {
      img.style.opacity = '0';
      img.style.transition = 'opacity 0.6s ease';
      imageObserver.observe(img);
    });
  }
});
