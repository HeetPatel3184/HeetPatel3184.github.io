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

  /* ---------- home: terminal-style session log typewriter ---------- */
  var logPanel = document.querySelector('.log-panel');
  if (logPanel) {
    var lines = logPanel.querySelectorAll('.log-line');
    lines.forEach(function (line, i) {
      setTimeout(function () {
        line.classList.add('show');
      }, i * 550);
    });
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
          if (f === 'all' || tags.indexOf(f) !== -1) {
            card.classList.remove('hidden');
          } else {
            card.classList.add('hidden');
          }
        });
      });
    });
  }

  /* ---------- reveal-on-scroll: sparklines + skill bars ---------- */
  var revealables = document.querySelectorAll('.run-card, .bar-row');
  if ('IntersectionObserver' in window && revealables.length) {
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
        }
      });
    }, { threshold: 0.3 });
    revealables.forEach(function (el) { obs.observe(el); });
  } else {
    revealables.forEach(function (el) { el.classList.add('in-view'); });
  }

});
