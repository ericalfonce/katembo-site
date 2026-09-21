/* ============================================================
   KATEMBO SAFARI — SITE SCRIPTS
   Header, mobile menu, reveals, listing cards, detail renderer,
   stay filters, enquiry wizard and honest (mailto) forms.
   Load AFTER data.js on every page.
   ============================================================ */
(function () {
  'use strict';

  var KATEMBO = window.KATEMBO;
  var doc = document;
  var NL = String.fromCharCode(10);
  var prefersReducedMotion = window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function qs(sel, ctx) { return (ctx || doc).querySelector(sel); }
  function qsa(sel, ctx) { return Array.prototype.slice.call((ctx || doc).querySelectorAll(sel)); }

  function escapeHTML(str) {
    return String(str == null ? '' : str)
      .split('&').join('&amp;')
      .split('<').join('&lt;')
      .split('>').join('&gt;')
      .split('"').join('&quot;')
      .split("'").join('&#39;');
  }

  function assetPath(p) {
    if (!p) return '';
    if (p.indexOf('//') === 0) return p;
    if (p.indexOf('http:') === 0 || p.indexOf('https:') === 0) return p;
    return '/' + p;
  }

  function setMeta(attr, key, value) {
    var el = doc.querySelector('meta[' + attr + '="' + key + '"]');
    if (!el) {
      el = doc.createElement('meta');
      el.setAttribute(attr, key);
      doc.head.appendChild(el);
    }
    el.setAttribute('content', value);
  }

  function setCanonical(url) {
    var el = qs('link[rel="canonical"]');
    if (!el) {
      el = doc.createElement('link');
      el.setAttribute('rel', 'canonical');
      doc.head.appendChild(el);
    }
    el.setAttribute('href', url);
  }

  function breadcrumbHTML(parts) {
    var bc = doc.createElement('nav');
    bc.className = 'breadcrumb';
    bc.setAttribute('aria-label', 'Breadcrumb');
    var i, link;
    for (i = 0; i < parts.length; i++) {
      if (i > 0) {
        var sep = doc.createElement('span');
        sep.className = 'breadcrumb__sep';
        sep.textContent = '/';
        sep.setAttribute('aria-hidden', 'true');
        bc.appendChild(sep);
      }
      link = doc.createElement('a');
      link.href = parts[i].href;
      link.textContent = parts[i].label;
      if (i === parts.length - 1) link.setAttribute('aria-current', 'page');
      bc.appendChild(link);
    }
    return bc;
  }

  function arrowSvg() {
    return '<svg class="btn__arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" ' +
      'stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
      '<path d="M5 12h14M12 5l7 7-7 7"/></svg>';
  }

  /* ---------- shared card ------------- */
  function cardHTML(item, opts) {
    var o = opts || {};
    var href = o.base + (item.slug === 'detail' ? '' : item.slug);
    var meta = o.meta || '';
    var tag = o.tag || '';
    var tall = o.tall ? ' card__media--tall' : '';
    return (
      '<a class="card card--linked" href="' + escapeHTML(href) + '" aria-label="' + escapeHTML((o.ariaLabel || '') + item.title) + '">' +
        '<div class="card__media' + tall + '">' +
          '<img src="' + escapeHTML(assetPath(item.image)) + '" alt="' + escapeHTML(o.alt || item.title) + '" loading="lazy">' +
          (tag ? '<span class="card__tag">' + escapeHTML(tag) + '</span>' : '') +
        '</div>' +
        '<div class="card__body">' +
          (meta ? '<p class="card__meta">' + escapeHTML(meta) + '</p>' : '') +
          '<h3 class="card__title">' + escapeHTML(item.title) + '</h3>' +
          '<p class="card__text">' + escapeHTML(item.description || item.intro || '') + '</p>' +
          '<span class="card__link">' + escapeHTML(o.cta || 'Discover') + arrowSvg() + '</span>' +
        '</div>' +
      '</a>'
    );
  }

  function renderCardsInto(container, items, opts) {
    var o = opts || {};
    var grid = doc.createElement('div');
    grid.className = 'grid ' + (o.columns || 'grid--3');
    items.forEach(function (item) {
      var itemOpts = {};
      var key;
      for (key in o) itemOpts[key] = o[key];
      if (o.metaFn) itemOpts.meta = o.metaFn(item);
      grid.insertAdjacentHTML('beforeend', cardHTML(item, itemOpts));
      if (o.categoryFn) {
        var last = grid.lastElementChild;
        var cat = o.categoryFn(item);
        if (cat) last.setAttribute('data-category', cat);
      }
    });
    container.appendChild(grid);
  }

  /* ============================================================
     HEADER + MOBILE MENU
     ============================================================ */
  function initHeader() {
    var header = qs('.site-header');
    var toggle = qs('#navToggle');
    var nav = qs('#primaryNav');
    if (!header) return;

    var updateScrolled = function () {
      header.classList.toggle('is-scrolled', window.scrollY > 24);
    };
    updateScrolled();
    window.addEventListener('scroll', updateScrolled, { passive: true });

    var parts = window.location.pathname.split('/').filter(Boolean);
    var path = '/' + parts.join('/');
    var pathLower = path.toLowerCase();
    if (nav) {
      qsa('.nav__link', nav).forEach(function (link) {
        var href = link.getAttribute('href') || '';
        var isActive = false;
        if (href === '/') {
          isActive = pathLower === '/' || pathLower === '/index.html';
        } else {
          isActive = pathLower === href.toLowerCase() || pathLower.indexOf(href.toLowerCase()) === 0;
        }
        if (isActive) link.classList.add('is-active');
      });
    }

    if (toggle && nav) {
      var closeMenu = function () {
        nav.classList.remove('is-open');
        toggle.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.setAttribute('aria-label', 'Open menu');
        document.body.style.overflow = '';
      };

      toggle.addEventListener('click', function () {
        var isOpen = !nav.classList.contains('is-open');
        nav.classList.toggle('is-open', isOpen);
        toggle.classList.toggle('is-open', isOpen);
        toggle.setAttribute('aria-expanded', String(isOpen));
        toggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
        document.body.style.overflow = isOpen ? 'hidden' : '';
        if (isOpen) toggle.focus();
      });

      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && nav.classList.contains('is-open')) closeMenu();
      });

      qsa('a', nav).forEach(function (link) {
        link.addEventListener('click', function () { if (nav.classList.contains('is-open')) closeMenu(); });
      });
    }
  }

  /* ============================================================
     REVEAL ON SCROLL
     ============================================================ */
  function initReveals() {
    var els = qsa('.reveal');
    if (!els.length) return;
    if (prefersReducedMotion || typeof IntersectionObserver === 'undefined') {
      els.forEach(function (el) { el.classList.add('is-visible'); });
      return;
    }
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.06 });
    els.forEach(function (el) { observer.observe(el); });
  }

  /* ============================================================
     SHARED PAGE TOUCH-UPS
     ============================================================ */
  function initShared() {
    var year = qs('#year');
    if (year) year.textContent = new Date().getFullYear();

    var socialsEl = qs('.footer__socials');
    if (socialsEl && KATEMBO && KATEMBO.siteConfig.socials.length) {
      var icons = {
        Instagram: '<rect x="2" y="2" width="20" height="20" rx="5"></rect>' +
          '<path d="M16 11.37a4 4 0 1 1-5.5-5.1 4 4 0 0 1 5.5 5.1z"></path>' +
          '<line x1="17.5" y1="6.5" x2="17.5" y2="6.51"></line>',
        Facebook: '<path d="M14 8h3V4h-3a4 4 0 0 0-4 4v3H7v4h3v8h4v-8h3l1-4h-4V8z"></path>',
        YouTube: '<path d="M22.5 6.4a2.8 2.8 0 0 0-2-2C18.9 4 12 4 12 4s-6.9 0-8.5.4a2.8 2.8 0 0 0-2 2A29 29 0 0 0 1 11.8a29 29 0 0 0 .5 5.4 2.8 2.8 0 0 0 2 2C5.1 19.6 12 19.6 12 19.6s6.9 0 8.5-.4a2.8 2.8 0 0 0 2-2 29 29 0 0 0 .5-5.4 29 29 0 0 0-.5-5.4z"></path>' +
          '<polygon points="9.8 15 15.5 11.75 9.8 8.5 9.8 15"></polygon>',
        X: '<path d="M4 4l16 16M20 4L4 20"></path>' +
          '<path d="M4 4l11.7 16h4.3L8.3 4z"></path>' +
          '<path d="M20 4L8.3 20H4L15.7 4z"></path>'
      };
      var any = false;
      KATEMBO.siteConfig.socials.forEach(function (s) {
        if (!s.url) return;
        any = true;
        var a = doc.createElement('a');
        a.href = s.url;
        a.setAttribute('aria-label', s.name);
        a.setAttribute('target', '_blank');
        a.setAttribute('rel', 'noopener noreferrer');
        a.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" ' +
          'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + (icons[s.name] || '') + '</svg>';
        socialsEl.appendChild(a);
      });
      if (!any) socialsEl.setAttribute('hidden', '');
    }
  }

  /* ============================================================
     NEWSLETTER — composes a real email; never fakes success.
     ============================================================ */
  function initNewsletter() {
    var form = qs('.footer__form');
    if (!form || !KATEMBO) return;
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var input = qs('input[type="email"]', form);
      var noteBox = qs('.form-note', form);
      var email = (input && input.value.trim()) || '';
      if (!email || !input.checkValidity()) {
        if (input) input.focus();
        return;
      }
      var subject = encodeURIComponent('Katembo Safari Field Notes subscription request');
      var body = encodeURIComponent('Please add me to the Field Notes newsletter.' + NL + NL + 'Email: ' + email);
      var a = doc.createElement('a');
      a.href = 'mailto:' + KATEMBO.siteConfig.email + '?subject=' + subject + '&body=' + body;
      doc.body.appendChild(a);
      a.click();
      a.remove();
      if (noteBox) {
        noteBox.innerHTML = 'Your email app has opened with the subscription request. Press send there to complete it, and Katembo Safari will reply personally.';
        noteBox.removeAttribute('hidden');
      }
      input.value = '';
    });
  }

  /* ============================================================
     CONTACT FORM — composes a real email with validation.
     ============================================================ */
  function setFieldError(el, msg) {
    var field = el.closest('.field');
    if (!field) return;
    field.classList.add('has-error');
    var err = qs('.field__error', field);
    if (err) err.textContent = msg;
    el.setAttribute('aria-invalid', 'true');
    if (typeof el.setCustomValidity === 'function') el.setCustomValidity(msg);
  }

  function clearFieldError(el) {
    var field = el.closest('.field');
    if (!field) return;
    field.classList.remove('has-error');
    var err = qs('.field__error', field);
    if (err) err.textContent = '';
    el.removeAttribute('aria-invalid');
    if (typeof el.setCustomValidity === 'function') el.setCustomValidity('');
  }

  function initContactForm() {
    var form = qs('#contactForm');
    if (!form || !KATEMBO) return;
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = qs('#contactName', form);
      var email = qs('#contactEmail', form);
      var message = qs('#contactMessage', form);
      var note = qs('#contactNote', form);
      var valid = true;

      if (!name.value.trim()) { setFieldError(name, 'Please tell us your name.'); valid = false; } else { clearFieldError(name); }
      if (!email.value.trim() || !email.checkValidity()) { setFieldError(email, 'Please enter a valid email address.'); valid = false; } else { clearFieldError(email); }
      if (!message.value.trim()) { setFieldError(message, 'Please add a short message.'); valid = false; } else { clearFieldError(message); }

      if (!valid) {
        if (note) note.setAttribute('hidden', '');
        return;
      }

      var subject = encodeURIComponent('Katembo Safari — message from ' + name.value.trim());
      var body = encodeURIComponent(
        'Name: ' + name.value.trim() + NL +
        'Email: ' + email.value.trim() + NL + NL +
        message.value.trim()
      );
      var a = doc.createElement('a');
      a.href = 'mailto:' + KATEMBO.siteConfig.email + '?subject=' + subject + '&body=' + body;
      doc.body.appendChild(a);
      a.click();
      a.remove();
      if (note) {
        note.innerHTML = 'Your email app has opened with the message prepared. Press send there and we will reply as soon as we can.';
        note.removeAttribute('hidden');
      }
      form.reset();
    });

    qsa('input, textarea', form).forEach(function (el) {
      el.addEventListener('blur', function () {
        if (!el.value.trim()) setFieldError(el, el.getAttribute('data-error') || 'This field is required.');
        else clearFieldError(el);
      });
    });
  }

  /* ============================================================
     STAYS FILTER
     ============================================================ */
  function initFilters() {
    var pills = qsa('.filter-pill');
    if (!pills.length) return;
    var grid = qs('[data-filterable]');
    if (!grid) return;

    pills.forEach(function (pill) {
      pill.addEventListener('click', function () {
        pills.forEach(function (p) {
          p.classList.remove('is-active');
          p.setAttribute('aria-pressed', 'false');
        });
        pill.classList.add('is-active');
        pill.setAttribute('aria-pressed', 'true');
        var filter = pill.getAttribute('data-filter');
        qsa('[data-category]', grid).forEach(function (item) {
          var show = filter === 'all' || item.getAttribute('data-category') === filter;
          item.hidden = !show;
        });
      });
    });
  }

  /* ============================================================
     SHARED LISTING RENDERERS
     ============================================================ */
  var RENDERERS = {
    journeys: {
      base: '/journeys/',
      label: 'Journeys',
      cta: 'Discover',
      metaFn: function (item) {
        return (item.duration || '') + ' · ' + (item.bestSeason ? item.bestSeason.label : '');
      }
    },
    destinations: {
      base: '/destinations/',
      label: 'Destinations',
      cta: 'Explore',
      metaFn: function (item) { return item.region || ''; }
    },
    experiences: {
      base: '/experiences/',
      label: 'Experiences',
      cta: 'View Experience',
      metaFn: function (item) { return item.type || ''; }
    },
    stays: {
      base: '/stays/',
      label: 'Places to Stay',
      cta: 'View Stay',
      metaFn: function (item) { return item.type + ' · ' + (item.location || ''); },
      categoryFn: function (item) { return item.type; }
    }
  };

  function initListing(collection) {
    var container = qs('[data-listing="' + collection + '"]');
    if (!container || !KATEMBO) return;
    var R = RENDERERS[collection];
    if (!R) return;
    var items = KATEMBO[collection].slice();
    var limit = parseInt(container.getAttribute('data-limit') || '0', 10);
    if (limit > 0) items = items.slice(0, limit);
    renderCardsInto(container, items, {
      base: R.base,
      columns: container.getAttribute('data-columns') || 'grid--3',
      tall: container.getAttribute('data-tall') === 'true',
      cta: R.cta,
      metaFn: R.metaFn,
      categoryFn: R.categoryFn,
      ariaLabel: ''
    });
  }

  /* ============================================================
     DETAIL RENDERERS
     ============================================================ */
  function resolveSlug() {
    var params = new URLSearchParams(window.location.search);
    var p = params.get('slug');
    if (p) return p;
    var seg = window.location.pathname.split('/').filter(Boolean).pop();
    if (!seg || seg === 'detail.html' || seg === 'index.html' || seg === 'index') return null;
    return decodeURIComponent(seg);
  }

  function ctaButton(label, href) {
    return '<a class="btn btn--primary" style="margin-top:1.6rem" href="' + escapeHTML(href) + '">' +
      escapeHTML(label) + arrowSvg() + '</a>';
  }

  function entitySchema(collection, item) {
    var base = KATEMBO.siteConfig.baseUrl;
    var url = base + RENDERERS[collection].base + item.slug;
    var crumbs = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: base + '/' },
        { '@type': 'ListItem', position: 2, name: RENDERERS[collection].label, item: base + RENDERERS[collection].base },
        { '@type': 'ListItem', position: 3, name: item.title, item: url }
      ]
    };
    var graph = crumbs;
    if (collection === 'destinations') {
      graph = {
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'TouristDestination',
            name: item.title,
            description: item.overview,
            url: url,
            image: base + assetPath(item.image)
          },
          crumbs
        ]
      };
    }
    var out = '<script type="application/ld+json">' + JSON.stringify(graph) + '<' + '/script>';
    return out;
  }

  var DETAIL = {
    journeys: {
      eyebrow: function (item) { return 'Private Journeys — ' + (item.destinations || []).join(' & '); },
      titleSuffix: 'Journey',
      main: function (item) {
        var h = '<div class="prose">';
        h += '<h2>The Journey</h2><p>' + escapeHTML(item.overview) + '</p>';
        if (item.itinerary && item.itinerary.length) {
          h += '<h2>Journey Outline</h2><div class="itinerary">';
          item.itinerary.forEach(function (d) {
            h += '<div class="itinerary__day"><h3>' + escapeHTML(d.heading) + '</h3><p>' + escapeHTML(d.text) + '</p></div>';
          });
          h += '</div><p style="color:var(--stone);font-size:.9rem">Itineraries are indicative — every Katembo journey is tailored to your dates, pace and interests.</p>';
        }
        if (item.highlights && item.highlights.length) {
          h += '<h2>Highlights</h2><ul class="check-list">' + item.highlights.map(function (x) { return '<li>' + escapeHTML(x) + '</li>'; }).join('') + '</ul>';
        }
        h += '</div>';
        return h;
      },
      aside: function (item) {
        var h = '<div class="fact-sheet"><h2 class="fact-sheet__title">At a Glance</h2><div class="fact-list">';
        h += '<div class="fact-row"><span class="fact-row__label">Duration</span><span class="fact-row__value">' + escapeHTML(item.duration) + '</span></div>';
        if (item.destinations) h += '<div class="fact-row"><span class="fact-row__label">Destinations</span><span class="fact-row__value">' + item.destinations.map(function (d) { return escapeHTML(d); }).join(', ') + '</span></div>';
        if (item.bestSeason) h += '<div class="fact-row"><span class="fact-row__label">Best Time</span><span class="fact-row__value">' + escapeHTML(item.bestSeason.label) + '<br>' + escapeHTML(item.bestSeason.note) + '</span></div>';
        if (item.accommodation) h += '<div class="fact-row"><span class="fact-row__label">Accommodation</span><span class="fact-row__value">' + escapeHTML(item.accommodation.title) + '<br>' + escapeHTML(item.accommodation.note) + '</span></div>';
        h += '</div></div>';
        h += '<p style="font-size:.8rem;color:var(--stone);margin-top:1rem">Pricing depends on season, dates and travel style. Share your plans and we will compose a personal quote.</p>';
        h += ctaButton('Request a Tailored Quote', '/plan.html?journey=' + item.slug +
          '&destination=' + encodeURIComponent((item.destinations || [''])[0]));
        return h;
      },
      related: function (item) { return KATEMBO.relatedFrom(KATEMBO.journeys, item.related); },
      relatedHead: 'Continue Exploring',
      relatedCta: 'Discover'
    },
    destinations: {
      eyebrow: function (item) { return item.region || 'Destinations'; },
      titleSuffix: 'Destination',
      main: function (item) {
        var h = '<div class="prose">';
        h += '<h2>Introduction</h2><p>' + escapeHTML(item.overview) + '</p>';
        var wildlife = item.wildlife;
        if (typeof wildlife === 'string') wildlife = [wildlife];
        if (wildlife && wildlife.length) {
          h += '<h2>Wildlife</h2><ul class="check-list">' + wildlife.map(function (x) { return '<li>' + escapeHTML(x) + '</li>'; }).join('') + '</ul>';
        }
        if (item.landscapes && item.landscapes.length) {
          h += '<h2>Landscapes</h2><ul class="check-list">' + item.landscapes.map(function (x) { return '<li>' + escapeHTML(x) + '</li>'; }).join('') + '</ul>';
        }
        h += '</div>';
        return h;
      },
      aside: function (item) {
        var h = '<div class="fact-sheet"><h2 class="fact-sheet__title">Planning</h2><div class="fact-list">';
        if (item.bestTime) h += '<div class="fact-row"><span class="fact-row__label">Best Time to Visit</span><span class="fact-row__value">' + escapeHTML(item.bestTime) + '</span></div>';
        if (item.experiences && item.experiences.length) {
          h += '<div class="fact-row"><span class="fact-row__label">Experiences Here</span><span class="fact-row__value">' + item.experiences.map(function (name) {
            var key = name.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
            var hit = KATEMBO.experiences.filter(function (e) { return e.slug === key; })[0];
            var href = hit ? hit.slug : key;
            var label = hit ? hit.title : name;
            return '<a href="/experiences/' + escapeHTML(href) + '" style="color:var(--gold-ink)">' + escapeHTML(label) + '</a>';
          }).join('<br>') + '</span></div>';
        }
        if (item.relatedJourneys && item.relatedJourneys.length) {
          var js = KATEMBO.relatedFrom(KATEMBO.journeys, item.relatedJourneys);
          h += '<div class="fact-row"><span class="fact-row__label">Suggested Journeys</span><span class="fact-row__value">' + js.map(function (j) {
            return '<a href="/journeys/' + j.slug + '" style="color:var(--gold-ink)">' + escapeHTML(j.title) + '</a>';
          }).join('<br>') + '</span></div>';
        }
        h += '</div></div>';
        h += ctaButton('Plan Your Safari', '/plan.html?destination=' + encodeURIComponent(item.title));
        return h;
      },
      related: function (item) { return KATEMBO.relatedFrom(KATEMBO.journeys, item.relatedJourneys); },
      relatedHead: 'Journeys Here',
      relatedCta: 'View Journey'
    },
    experiences: {
      eyebrow: function (item) { return item.type || 'Experiences'; },
      titleSuffix: 'Experience',
      main: function (item) {
        var h = '<div class="prose">';
        h += '<h2>Overview</h2><p>' + escapeHTML(item.overview) + '</p>';
        if (item.highlights && item.highlights.length) {
          h += '<h2>What to Expect</h2><ul class="check-list">' + item.highlights.map(function (x) { return '<li>' + escapeHTML(x) + '</li>'; }).join('') + '</ul>';
        }
        h += '</div>';
        return h;
      },
      aside: function (item) {
        var h = '<div class="fact-sheet"><h2 class="fact-sheet__title">Worth Knowing</h2><div class="fact-list">';
        if (item.duration) h += '<div class="fact-row"><span class="fact-row__label">Typical Duration</span><span class="fact-row__value">' + escapeHTML(item.duration) + '</span></div>';
        if (item.bestFor) h += '<div class="fact-row"><span class="fact-row__label">Best For</span><span class="fact-row__value">' + escapeHTML(item.bestFor) + '</span></div>';
        h += '</div></div>';
        h += ctaButton('Plan Your Safari', '/plan.html?destination=Serengeti&experience=' + item.slug);
        return h;
      },
      related: function (item) { return KATEMBO.relatedFrom(KATEMBO.experiences, item.related); },
      relatedHead: 'More Experiences',
      relatedCta: 'View Experience'
    },
    stays: {
      eyebrow: function (item) { return item.type || 'Places to Stay'; },
      titleSuffix: 'Stay',
      main: function (item) {
        var h = '<div class="prose">';
        h += '<h2>Overview</h2><p>' + escapeHTML(item.overview) + '</p>';
        if (item.features && item.features.length) {
          h += '<h2>Highlights</h2><ul class="check-list">' + item.features.map(function (x) { return '<li>' + escapeHTML(x) + '</li>'; }).join('') + '</ul>';
        }
        h += '<p style="color:var(--stone);font-size:.9rem">Property details are provided for orientation. Availability, facilities and features should be confirmed with Katembo Safari at the time of booking.</p>';
        h += '</div>';
        return h;
      },
      aside: function (item) {
        var h = '<div class="fact-sheet"><h2 class="fact-sheet__title">Details</h2><div class="fact-list">';
        h += '<div class="fact-row"><span class="fact-row__label">Type</span><span class="fact-row__value">' + escapeHTML(item.type) + '</span></div>';
        if (item.location) h += '<div class="fact-row"><span class="fact-row__label">Location</span><span class="fact-row__value">' + escapeHTML(item.location) + '</span></div>';
        h += '</div></div>';
        h += ctaButton('Enquire About This Stay', '/plan.html?destination=' + encodeURIComponent(item.title));
        return h;
      },
      related: function (item) { return KATEMBO.stays.filter(function (s) { return s.slug !== item.slug; }); },
      relatedHead: 'Other Stays',
      relatedCta: 'View Stay'
    }
  };

  function initDetail() {
    if (!KATEMBO) return;
    var collection = doc.body.getAttribute('data-collection');
    if (!collection || !DETAIL[collection]) return;
    var D = DETAIL[collection];
    var slug = resolveSlug();
    var item = slug ? KATEMBO.bySlug(KATEMBO[collection], slug) : undefined;

    var notFound = qs('[data-detail-notfound]');
    var root = qs('[data-detail-root]');
    if (notFound) notFound.hidden = true;

    if (!item) {
      if (notFound) {
        notFound.hidden = false;
        var bcSlot = qs('[data-breadcrumb]');
        if (bcSlot) {
          bcSlot.replaceWith(breadcrumbHTML([
            { href: '/', label: 'Home' },
            { href: RENDERERS[collection].base, label: RENDERERS[collection].label },
            { href: window.location.href, label: 'Not found' }
          ]));
        }
        var tl = qs('title');
        if (tl) tl.textContent = 'Not found — Katembo Safari';
        setMeta('name', 'description', 'The page you were looking for could not be found.');
      }
      if (root) root.hidden = true;
      return;
    }

    if (root) root.hidden = false;
    if (notFound) notFound.hidden = true;

    var img = qs('[data-detail-image]');
    if (img) { img.src = assetPath(item.image); img.alt = item.title + ' — Katembo Safari'; }
    var eyebrowEl = qs('[data-detail-eyebrow]');
    if (eyebrowEl) eyebrowEl.textContent = D.eyebrow(item);
    var titleEl = qs('[data-detail-title]');
    if (titleEl) titleEl.textContent = item.title;
    var ledeEl = qs('[data-detail-lede]');
    if (ledeEl) ledeEl.textContent = item.description || item.intro || '';

    var bcSlot = qs('[data-breadcrumb]');
    if (bcSlot) {
      bcSlot.replaceWith(breadcrumbHTML([
        { href: '/', label: 'Home' },
        { href: RENDERERS[collection].base, label: RENDERERS[collection].label },
        { href: KATEMBO.siteConfig.baseUrl + RENDERERS[collection].base + item.slug, label: item.title }
      ]));
    }

    doc.title = item.title + ' — ' + D.titleSuffix + ' — ' + KATEMBO.siteConfig.name;
    setMeta('name', 'description', item.description || item.intro || '');
    setMeta('property', 'og:title', item.title + ' — ' + KATEMBO.siteConfig.name);
    setMeta('property', 'og:description', item.description || item.intro || '');
    setCanonical(KATEMBO.siteConfig.baseUrl + RENDERERS[collection].base + item.slug);

    var asideSlot = qs('[data-detail-aside]');
    if (asideSlot) asideSlot.innerHTML = D.aside(item);
    var proseSlot = qs('[data-detail-prose]');
    if (proseSlot) proseSlot.innerHTML = D.main(item);

    var gallerySlot = qs('[data-detail-gallery]');
    if (gallerySlot && item.gallery && item.gallery.length) {
      gallerySlot.innerHTML = item.gallery.map(function (src, i) {
        return '<figure><img src="' + escapeHTML(assetPath(src)) + '" alt="' + escapeHTML(item.title) +
          ' gallery image ' + (i + 1) + '" loading="lazy"></figure>';
      }).join('');
    }

    var relatedSlot = qs('[data-detail-related]');
    if (relatedSlot) {
      var wrap = doc.createElement('div');
      renderCardsInto(wrap, D.related(item).slice(0, 3), {
        base: RENDERERS[collection].base,
        columns: 'grid--3',
        cta: D.relatedCta,
        metaFn: RENDERERS[collection].metaFn
      });
      relatedSlot.replaceWith(wrap);
    }

    var schemaEl = doc.createElement('div');
    schemaEl.innerHTML = entitySchema(collection, item);
    var node = schemaEl.firstChild;
    if (node) doc.head.appendChild(node);
  }

  /* ============================================================
     ENQUIRY WIZARD (Plan Your Safari)
     ============================================================ */
  var wizardSteps = [
    { id: 'destination', title: 'Dream Destination', kind: 'single', optionsKey: 'destinations' },
    { id: 'period', title: 'Travel Period', kind: 'single', optionsKey: 'travelPeriods' },
    { id: 'travellers', title: 'Who Is Travelling', kind: 'single', optionsKey: 'travellers' },
    { id: 'style', title: 'Trip Style', kind: 'single', optionsKey: 'styles' },
    { id: 'duration', title: 'How Long', kind: 'single', optionsKey: 'durations' },
    { id: 'budget', title: 'Budget Range', kind: 'single', optionsKey: 'budgets' },
    { id: 'interests', title: 'What Beckons', kind: 'multi', optionsKey: 'interests' },
    { id: 'contact', title: 'Your Details', kind: 'fields' },
    { id: 'message', title: 'Anything Else', kind: 'message' }
  ];

  function choiceGroupHTML(step, selected) {
    var options = KATEMBO.enquiry[step.optionsKey] || [];
    var h = '<fieldset class="choice-group">';
    h += '<legend class="sr-only">' + escapeHTML(step.title) + '</legend>';
    options.forEach(function (opt) {
      var checked = (selected.indexOf(opt) !== -1) ? ' checked' : '';
      h += '<label class="choice' + (checked ? ' is-selected' : '') + '">' +
        '<input type="' + (step.kind === 'multi' ? 'checkbox' : 'radio') + '" name="wz_' + step.id +
        '" value="' + escapeHTML(opt) + '"' + checked + '>' +
        '<span class="choice__mark" aria-hidden="true"></span>' +
        '<span class="choice__label">' + escapeHTML(opt) + '</span>' +
        '</label>';
    });
    h += '</fieldset>';
    h += '<p class="form-note form-note--error" data-wz-error="' + step.id + '" hidden></p>';
    return h;
  }

  function fieldsHTML() {
    return (
      '<div class="field">' +
        '<label class="field__label" for="wzName">Full name <span class="req" aria-hidden="true">*</span></label>' +
        '<input class="input" id="wzName" name="wzName" type="text" autocomplete="name" data-error="Please tell us your name." aria-describedby="wzNameErr">' +
        '<p class="field__error" id="wzNameErr"></p>' +
      '</div>' +
      '<div class="field">' +
        '<label class="field__label" for="wzEmail">Email address <span class="req" aria-hidden="true">*</span></label>' +
        '<input class="input" id="wzEmail" name="wzEmail" type="email" autocomplete="email" data-error="Please enter a valid email address." aria-describedby="wzEmailErr">' +
        '<p class="field__error" id="wzEmailErr"></p>' +
      '</div>' +
      '<div class="field">' +
        '<label class="field__label" for="wzPhone">Phone or WhatsApp <span class="req" aria-hidden="true">*</span></label>' +
        '<input class="input" id="wzPhone" name="wzPhone" type="tel" autocomplete="tel" data-error="A phone or WhatsApp number helps us reach you quickly." aria-describedby="wzPhoneErr">' +
        '<p class="field__error" id="wzPhoneErr"></p>' +
      '</div>'
    );
  }

  function buildWizardPanels() {
    var panels = qs('[data-wizard-panels]');
    if (!panels) return;
    var params = new URLSearchParams(window.location.search);
    var preselect = {};
    var dest = params.get('destination');
    var journeySlug = params.get('journey');
    if (journeySlug && KATEMBO.bySlug(KATEMBO.journeys, journeySlug)) {
      dest = KATEMBO.bySlug(KATEMBO.journeys, journeySlug).destinations[0];
    }
    if (dest) preselect.destination = dest;
    var interestSlug = params.get('experience');
    if (interestSlug) {
      var exp = KATEMBO.bySlug(KATEMBO.experiences, interestSlug);
      if (exp) preselect.interests = [exp.title];
      if (!dest) preselect.destination = 'Serengeti';
    }

    wizardSteps.forEach(function (step, index) {
      var panel = doc.createElement('div');
      panel.className = 'step-panel';
      panel.hidden = index !== 0;
      panel.setAttribute('data-step', step.id);

      var inner = '<p class="eyebrow">Step ' + (wizardSteps.indexOf(step) + 1) + ' of ' + wizardSteps.length + '</p>' +
        '<h2 class="step-panel__title">' + escapeHTML(step.title) + '</h2>' +
        '<p class="step-panel__hint">' + escapeHTML(step.hint || 'We will only use these details to shape your proposal.') + '</p>';

      if (step.kind === 'single' || step.kind === 'multi') {
        inner += choiceGroupHTML(step, preselect[step.id] ? [preselect[step.id]] : []);
      } else if (step.kind === 'fields') {
        inner += fieldsHTML();
      } else {
        inner += '<div class="field">' +
          '<label class="field__label" for="wzMessage">Anything else we should know?</label>' +
          '<textarea class="textarea" id="wzMessage" name="wzMessage" placeholder="Children’s ages, dietary needs, celebrations, flights — or simply leave this blank."></textarea>' +
        '</div>';
      }

      panel.innerHTML = inner;
      panels.appendChild(panel);
    });

    var first = qs('.step-panel', panels);
    if (preselect.destination) {
      var firstCheck = qs('input[type="radio"][value="' + escapeHTML(preselect.destination) + '"]', first);
      if (firstCheck) firstCheck.checked = true;
    }
  }

  function inviteSelectionStyling() {
    qsa('[data-wizard-panels] .choice input').forEach(function (input) {
      input.addEventListener('change', function () {
        var label = input.closest('.choice');
        if (input.type === 'radio') {
          qsa('input[name="' + input.name + '"]').forEach(function (r) {
            var l = r.closest('.choice');
            if (l) l.classList.toggle('is-selected', r.checked);
          });
        } else {
          label.classList.toggle('is-selected', input.checked);
        }
        var panel = qs('[data-step="' + label.closest('.step-panel').getAttribute('data-step') + '"]');
        var err = qs('[data-wz-error]', panel);
        if (err) err.hidden = true;
      });
    });
  }

  function validateStep(step) {
    var panel = qs('[data-step="' + step.id + '"]');
    var err = qs('[data-wz-error="' + step.id + '"]');
    if (step.kind === 'single' || step.kind === 'multi') {
      var checks = qsa('input[type="radio"]:checked, input[type="checkbox"]:checked', panel);
      if (!checks.length) {
        if (err) { err.textContent = 'Please make at least one choice to continue.'; err.hidden = false; }
        return false;
      }
      if (err) err.hidden = true;
      return true;
    }
    if (step.kind === 'fields') {
      var name = qs('#wzName', panel);
      var email = qs('#wzEmail', panel);
      var phone = qs('#wzPhone', panel);
      var ok = true;
      if (!name.value.trim()) { setFieldError(name, 'Please tell us your name.'); ok = false; } else { clearFieldError(name); }
      if (!email.value.trim() || !email.checkValidity()) { setFieldError(email, 'Please enter a valid email address.'); ok = false; } else { clearFieldError(email); }
      if (!phone.value.trim()) { setFieldError(phone, 'A phone or WhatsApp number helps us reach you quickly.'); ok = false; } else { clearFieldError(phone); }
      return ok;
    }
    return true;
  }

  function wizardValues() {
    var values = {};
    wizardSteps.forEach(function (step) {
      var panel = qs('[data-step="' + step.id + '"]');
      if (!panel) return;
      if (step.kind === 'single') {
        var r = qs('input[type="radio"]:checked', panel);
        values[step.id] = r ? r.value : '';
      } else if (step.kind === 'multi') {
        values[step.id] = qsa('input[type="checkbox"]:checked', panel).map(function (c) { return c.value; });
      } else if (step.kind === 'fields') {
        values[step.id] = {
          name: (qs('#wzName', panel).value || '').trim(),
          email: (qs('#wzEmail', panel).value || '').trim(),
          phone: (qs('#wzPhone', panel).value || '').trim()
        };
      } else {
        values[step.id] = (qs('#wzMessage', panel).value || '').trim();
      }
    });
    return values;
  }

  function labelOf(step, values) {
    var v = values[step.id];
    if (step.kind === 'fields') {
      return v.name + ' · ' + v.email + (v.phone ? ' · ' + v.phone : '');
    }
    if (step.kind === 'multi') return v.join(', ') || '—';
    return v || '—';
  }

  function initWizard() {
    var form = qs('#enquiryForm');
    if (!form || !KATEMBO) return;

    buildWizardPanels();
    inviteSelectionStyling();

    var panels = qs('[data-wizard-panels]');
    var allPanels = qsa('.step-panel', panels);
    var fill = qs('[data-wizard-fill]');
    var stepLabel = qs('[data-wizard-step]');
    var live = qs('[data-wizard-live]');
    var backBtn = qs('[data-wizard-back]');
    var nextBtn = qs('[data-wizard-next]');
    var submitBtn = qs('[data-wizard-submit]');
    var TOTAL_STEPS = wizardSteps.length + 1;
    var FINAL_INDEX = TOTAL_STEPS - 1;
    var current = 0;

    function setProgress() {
      var pct = Math.round((current / FINAL_INDEX) * 100);
      if (fill) fill.style.width = pct + '%';
      if (stepLabel) stepLabel.textContent = 'Step ' + (current + 1) + ' of ' + TOTAL_STEPS;
      if (live) {
        live.textContent = 'Step ' + (current + 1) + ' of ' + TOTAL_STEPS + '. ' +
          (current === FINAL_INDEX ? 'Review your safari' : wizardSteps[current].title);
      }
    }

    function showPanel(i) {
      current = Math.max(0, Math.min(FINAL_INDEX, i));
      if (current === FINAL_INDEX) renderReview();
      allPanels.forEach(function (p, n) { p.hidden = n !== current; });
      var rev = qs('[data-step="review"]', panels);
      if (rev) rev.hidden = current !== FINAL_INDEX;
      if (backBtn) backBtn.hidden = current === 0;
      if (nextBtn) {
        nextBtn.hidden = current === FINAL_INDEX;
        nextBtn.textContent = current === FINAL_INDEX - 1 ? 'Review your safari' : 'Continue';
      }
      if (submitBtn) submitBtn.hidden = current !== FINAL_INDEX;
      setProgress();
      var focusTarget = current === FINAL_INDEX
        ? backBtn
        : qs('.input, .choice input, .textarea', allPanels[current]);
      if (focusTarget) focusTarget.focus();
    }

    if (nextBtn) nextBtn.addEventListener('click', function () {
      if (validateStep(wizardSteps[current])) showPanel(current + 1);
    });

    if (backBtn) backBtn.addEventListener('click', function () { showPanel(current - 1); });

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (current === FINAL_INDEX || validateStep(wizardSteps[current])) {
        if (current === FINAL_INDEX) composeAndSend();
        else showPanel(current + 1);
      }
    });

    showPanel(0);
  }

  function renderReview() {
    var panels = qs('[data-wizard-panels]');
    var review = qs('[data-step="review"]');
    if (!review) {
      review = doc.createElement('div');
      review.className = 'step-panel';
      review.hidden = true;
      review.setAttribute('data-step', 'review');
      panels.appendChild(review);
    }
    var values = wizardValues();
    var rows = wizardSteps.filter(function (s) {
      return s.kind !== 'message' || values[s.id];
    }).map(function (s) {
      return '<dt>' + escapeHTML(s.title) + '</dt><dd>' + escapeHTML(labelOf(s, values)) + '</dd>';
    });
    review.innerHTML =
      '<p class="eyebrow">Final step</p>' +
      '<h2 class="step-panel__title">Your Safari, in Short</h2>' +
      '<p class="step-panel__hint">A summary of your request. Review it, then send — your email app will open with everything prepared.</p>' +
      '<dl class="wizard__review">' + rows.join('') + '</dl>' +
      '<p class="form-note form-note--info">This form prepares the enquiry and opens your email app. To accept enquiries without an email step, connect a form backend (for example Formspree, Resend or a serverless function) to the same payload — see implementation_plan.md.</p>';
  }

  function composeAndSend() {
    var values = wizardValues();
    var lines = [];
    lines.push('New Katembo Safari enquiry');
    lines.push('');
    wizardSteps.forEach(function (s) {
      if (s.kind === 'fields') {
        lines.push(s.title + ': ' + values[s.id].name + ' / ' + values[s.id].email + ' / ' + values[s.id].phone);
      } else if (s.kind === 'multi') {
        lines.push(s.title + ': ' + values[s.id].join(', '));
      } else {
        if (s.id === 'message' && !values[s.id]) return;
        lines.push(s.title + ': ' + values[s.id]);
      }
    });

    var subject = encodeURIComponent('Safari enquiry — ' + (values.destination || 'new request'));
    var body = encodeURIComponent(lines.join(NL));
    var mail = 'mailto:' + KATEMBO.siteConfig.email + '?subject=' + subject + '&body=' + body;

    var a = doc.createElement('a');
    a.href = mail;
    doc.body.appendChild(a);
    a.click();
    a.remove();

    var form = qs('#enquiryForm');
    var done = qs('[data-wizard-done]');
    if (form) form.hidden = true;
    if (done) {
      done.hidden = false;
      var copyBtn = qs('[data-wizard-copy]');
      if (copyBtn) {
        copyBtn.addEventListener('click', function () {
          var summary = lines.join(NL);
          if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(summary).then(function () {
              copyBtn.textContent = 'Copied';
              setTimeout(function () { copyBtn.textContent = 'Copy summary'; }, 2500);
            });
          } else {
            var ta = doc.createElement('textarea');
            ta.value = summary;
            doc.body.appendChild(ta);
            ta.select();
            try { doc.execCommand('copy'); } catch (ignore) { }
            ta.remove();
            copyBtn.textContent = 'Copied';
            setTimeout(function () { copyBtn.textContent = 'Copy summary'; }, 2500);
          }
        });
      }
    }
  }

  /* ============================================================
     BOOT
     ============================================================ */
  function init() {
    ['journeys', 'destinations', 'experiences', 'stays'].forEach(function (c) {
      initListing(c);
    });
    initHeader();
    initReveals();
    initShared();
    initNewsletter();
    initContactForm();
    initFilters();
    initDetail();
    initWizard();
  }

  if (doc.readyState === 'loading') {
    doc.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();