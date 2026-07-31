// ============================================================
// Heet Patel — Portfolio — shared behavior across all pages
// ============================================================

document.addEventListener('DOMContentLoaded', function () {

  /* ---------- mobile nav toggle ---------- */
  var toggle = document.getElementById('navtoggle');
  var links = document.getElementById('navlinks');
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      links.classList.toggle('open');
    });
  }

  /* ---------- nav: shrink + solidify on scroll ---------- */
  var nav = document.querySelector('.site-nav');
  if (nav) {
    var onScrollNav = function () {
      if (window.scrollY > 12) { nav.classList.add('scrolled'); }
      else { nav.classList.remove('scrolled'); }
    };
    window.addEventListener('scroll', onScrollNav, { passive: true });
    onScrollNav();
  }

  /* ---------- home: terminal-style session log typewriter ---------- */
  var logPanel = document.querySelector('.log-panel');
  if (logPanel) {
    var lines = logPanel.querySelectorAll('.log-line');
    lines.forEach(function (line, i) {
      setTimeout(function () { line.classList.add('show'); }, i * 550);
    });

    /* subtle 3D tilt following the cursor (desktop only) */
    if (window.matchMedia('(pointer: fine)').matches) {
      logPanel.addEventListener('mousemove', function (e) {
        var r = logPanel.getBoundingClientRect();
        var x = (e.clientX - r.left) / r.width - 0.5;
        var y = (e.clientY - r.top) / r.height - 0.5;
        logPanel.style.transform =
          'perspective(700px) rotateX(' + (y * -8) + 'deg) rotateY(' + (x * 10) + 'deg) translateY(-2px)';
      });
      logPanel.addEventListener('mouseleave', function () {
        logPanel.style.transform = 'perspective(700px) rotateX(0) rotateY(0)';
      });
    }
  }

  /* ---------- projects: filter chips ---------- */
  var filterRow = document.querySelector('.filter-row');
  if (filterRow) {
    var chips = filterRow.querySelectorAll('.filter-chip');
    var cards = document.querySelectorAll('.run-card');
    chips.forEach(function (chip) {
      chip.addEventListener('click', function () {
        chips.forEach(function (c) { c.classList.remove('active'); });
        chip.classList.add('active');
        var f = chip.getAttribute('data-filter');
        cards.forEach(function (card) {
          var tags = (card.getAttribute('data-tags') || '').split(',');
          if (f === 'all' || tags.indexOf(f) !== -1) { card.classList.remove('hidden'); }
          else { card.classList.add('hidden'); }
        });
      });
    });
  }

  /* ---------- animated stat counters ---------- */
  function animateCount(el) {
    var target = parseInt(el.getAttribute('data-count'), 10);
    if (isNaN(target)) return;
    var suffix = el.getAttribute('data-suffix') || '';
    var duration = 1100;
    var start = null;
    function step(ts) {
      if (!start) start = ts;
      var progress = Math.min((ts - start) / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(eased * target) + suffix;
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  /* ---------- reveal-on-scroll: generic [data-reveal], run-cards, bars, counters ---------- */
  var revealables = document.querySelectorAll('[data-reveal], .run-card, .bar-row');
  var counters = document.querySelectorAll('[data-count]');

  if ('IntersectionObserver' in window) {
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { entry.target.classList.add('in-view'); }
      });
    }, { threshold: 0.25 });
    revealables.forEach(function (el) { obs.observe(el); });

    if (counters.length) {
      var counterObs = new IntersectionObserver(function (entries, o) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            animateCount(entry.target);
            o.unobserve(entry.target);
          }
        });
      }, { threshold: 0.6 });
      counters.forEach(function (el) { counterObs.observe(el); });
    }
  } else {
    revealables.forEach(function (el) { el.classList.add('in-view'); });
    counters.forEach(function (el) { animateCount(el); });
  }

  /* ---------- scroll-spy: highlight nav link for section in view ---------- */
  var spySections = document.querySelectorAll('main section[id]');
  var spyLinks = document.querySelectorAll('.navlinks a[data-spy]');
  if (spySections.length && spyLinks.length && 'IntersectionObserver' in window) {
    var spyObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var id = entry.target.getAttribute('id');
          spyLinks.forEach(function (l) {
            l.classList.toggle('active', l.getAttribute('href') === '#' + id);
          });
        }
      });
    }, { threshold: 0.5 });
    spySections.forEach(function (s) { spyObs.observe(s); });
  }

});
