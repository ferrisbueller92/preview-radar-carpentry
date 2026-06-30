/* RADAR Carpentry — interactions: nav scroll-state, mobile drawer, scroll reveal */
(function () {
  'use strict';

  var nav = document.getElementById('nav');
  var toggle = document.getElementById('navToggle');
  var drawer = document.getElementById('navDrawer');

  /* nav: solid background once scrolled past hero threshold */
  var onScroll = function () {
    if (window.scrollY > 40) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* mobile drawer */
  if (toggle) {
    toggle.addEventListener('click', function () {
      nav.classList.toggle('open');
      document.body.style.overflow = nav.classList.contains('open') ? 'hidden' : '';
    });
  }
  if (drawer) {
    drawer.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') {
        nav.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  }

  /* contact form — composes an email to RADAR (no backend needed for prototype) */
  var form = document.getElementById('quoteForm');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = (form.elements.name && form.elements.name.value || '').trim();
      var email = (form.elements.email && form.elements.email.value || '').trim();
      var phone = (form.elements.phone && form.elements.phone.value || '').trim();
      var msg = (form.elements.message && form.elements.message.value || '').trim();
      var note = document.getElementById('formNote');
      var subject = 'Quote request — ' + (name || 'website enquiry');
      var body =
        'Name: ' + name + '\n' +
        'Email: ' + email + '\n' +
        'Phone: ' + phone + '\n\n' +
        (msg || '');
      window.location.href = 'mailto:info@radarcarpentry.com.au?subject=' +
        encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
      if (note) note.textContent = 'Opening your email app — just hit send and we’ll be in touch.';
    });
  }

  /* scroll reveal */
  var reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && reveals.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.14, rootMargin: '0px 0px -8% 0px' });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('in'); });
  }
})();
