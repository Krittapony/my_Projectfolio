// =============================================================
// main.js — Navigation, Scroll, Animations, Modal Logic
// =============================================================

// ----- RENDER PROJECT CARDS -----
function renderProjects(filter) {
  filter = filter || 'all';
  var grid = document.getElementById('projects-grid');
  grid.innerHTML = '';
  var list = filter === 'all' ? projects : projects.filter(function(p) { return p.category === filter; });

  list.forEach(function(p, i) {
    var el = document.createElement('article');
    el.className = 'project-card fade-up';
    el.setAttribute('role', 'listitem');
    el.setAttribute('tabindex', '0');
    el.style.transitionDelay = (i * 0.08) + 's';
    el.setAttribute('aria-label', 'โปรเจค: ' + p.title);

    var bc = p.category === 'website' ? 'badge-website' : 'badge-chatbot';
    var bt = p.category === 'website' ? '🌐 เว็บไซต์' : '💬 LINE Chatbot';

    // Use thumbnail image if available, otherwise gradient placeholder
    var thumbHtml = p.thumbnail
      ? '<img src="' + p.thumbnail + '" alt="' + p.title + '" loading="lazy" class="project-thumb-img">'
      : '<div class="project-thumb-placeholder" style="background:' + p.gradient + '" aria-hidden="true">' + p.emoji + '</div>';

    el.innerHTML =
      '<div class="project-thumb">' +
        thumbHtml +
        '<div class="project-overlay" aria-hidden="true"><span class="project-overlay-label">👁 ดูรายละเอียด</span></div>' +
      '</div>' +
      '<div class="project-body">' +
        '<span class="project-category-badge ' + bc + '">' + bt + '</span>' +
        '<h3 class="project-title">' + p.title + '</h3>' +
        '<p class="project-desc">' + p.description + '</p>' +
        '<div class="project-tags">' + p.tags.map(function(t) { return '<span class="project-tag">' + t + '</span>'; }).join('') + '</div>' +
        '<div class="project-actions">' +
          '<button class="btn-action btn-action-detail" onclick="event.stopPropagation();openModal(' + p.id + ')" aria-label="ดูรายละเอียด ' + p.title + '">📖 รายละเอียด</button>' +
        '</div>' +
      '</div>';

    el.addEventListener('click', function() { openModal(p.id); });
    el.addEventListener('keypress', function(e) { if (e.key === 'Enter') openModal(p.id); });
    grid.appendChild(el);
  });

  setTimeout(function() {
    grid.querySelectorAll('.fade-up').forEach(function(el) { el.classList.add('visible'); });
  }, 50);
}

// ----- FILTER TABS -----
document.querySelectorAll('.filter-btn').forEach(function(btn) {
  btn.addEventListener('click', function() {
    document.querySelectorAll('.filter-btn').forEach(function(b) {
      b.classList.remove('active');
      b.setAttribute('aria-selected', 'false');
    });
    this.classList.add('active');
    this.setAttribute('aria-selected', 'true');
    renderProjects(this.dataset.filter);
  });
});

// ----- PROJECT MODAL -----
function openModal(id) {
  var p = null;
  for (var i = 0; i < projects.length; i++) {
    if (projects[i].id === id) { p = projects[i]; break; }
  }
  if (!p) return;

  document.getElementById('modal-title-text').textContent = p.title;

  var badge = document.getElementById('modal-badge');
  badge.textContent = p.category === 'website' ? '🌐 เว็บไซต์' : '💬 LINE Chatbot';
  badge.className = 'project-category-badge ' + (p.category === 'website' ? 'badge-website' : 'badge-chatbot');

  // Gallery: use images array if available, else gradient placeholder
  var imgEl = document.getElementById('modal-image');
  if (p.images && p.images.length > 0) {
    imgEl.innerHTML = '<img src="' + p.images[0] + '" alt="' + p.title + '" style="width:100%;height:100%;object-fit:cover;border-radius:16px;">';
  } else {
    imgEl.innerHTML = '<div style="width:100%;height:100%;background:' + p.gradient + ';display:flex;align-items:center;justify-content:center;font-size:80px;border-radius:16px;">' + p.emoji + '</div>';
  }

  document.getElementById('modal-desc').textContent = p.fullDescription;
  document.getElementById('modal-tags').innerHTML = p.tags.map(function(t) {
    return '<span class="modal-tag">' + t + '</span>';
  }).join('');

  var linkEl = document.getElementById('modal-link');
  linkEl.href = p.liveUrl || '#';

  var bd = document.getElementById('modal-backdrop');
  bd.classList.add('open');
  bd.removeAttribute('aria-hidden');
  document.body.style.overflow = 'hidden';
  setTimeout(function() { document.getElementById('modal-close').focus(); }, 100);
}

function closeModal() {
  var bd = document.getElementById('modal-backdrop');
  bd.classList.remove('open');
  bd.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

document.getElementById('modal-close').addEventListener('click', closeModal);
document.getElementById('modal-backdrop').addEventListener('click', function(e) {
  if (e.target === this) closeModal();
});

// ----- QR MODAL -----
function openQR() {
  document.getElementById('qr-modal').classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeQR() {
  document.getElementById('qr-modal').classList.remove('open');
  document.body.style.overflow = '';
}
document.getElementById('qr-modal').addEventListener('click', function(e) {
  if (e.target === this) closeQR();
});

// ----- KEYBOARD NAVIGATION -----
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') { closeModal(); closeQR(); }
});

// ----- COPY LINE ID -----
function copyLineId() {
  var msg = document.getElementById('copied-msg');
  function showMsg() {
    msg.classList.add('show');
    setTimeout(function() { msg.classList.remove('show'); }, 2000);
  }
  if (navigator.clipboard) {
    navigator.clipboard.writeText('@your-line-id').then(showMsg).catch(function() {
      var ta = document.createElement('textarea');
      ta.value = '@your-line-id';
      document.body.appendChild(ta); ta.select(); document.execCommand('copy'); document.body.removeChild(ta);
      showMsg();
    });
  } else {
    var ta = document.createElement('textarea');
    ta.value = '@your-line-id';
    document.body.appendChild(ta); ta.select(); document.execCommand('copy'); document.body.removeChild(ta);
    showMsg();
  }
}

// ----- HAMBURGER MENU -----
var hamburger = document.getElementById('hamburger');
var mobileMenu = document.getElementById('mobile-menu');
var menuOverlay = document.getElementById('menu-overlay');

function closeMobileMenu() {
  hamburger.classList.remove('open');
  mobileMenu.classList.remove('open');
  menuOverlay.classList.remove('open');
  hamburger.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
}

hamburger.addEventListener('click', function() {
  var isOpen = mobileMenu.classList.contains('open');
  if (isOpen) {
    closeMobileMenu();
  } else {
    hamburger.classList.add('open');
    mobileMenu.classList.add('open');
    menuOverlay.classList.add('open');
    hamburger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }
});
menuOverlay.addEventListener('click', closeMobileMenu);

// ----- NAVBAR SCROLL -----
var navbar = document.getElementById('navbar');
window.addEventListener('scroll', function() {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

// ----- ACTIVE NAV HIGHLIGHT (Intersection Observer) -----
var navObserver = new IntersectionObserver(function(entries) {
  entries.forEach(function(entry) {
    if (entry.isIntersecting) {
      document.querySelectorAll('.nav-links a').forEach(function(link) {
        var active = link.getAttribute('href') === '#' + entry.target.id;
        link.classList.toggle('active', active);
        link.setAttribute('aria-current', active ? 'page' : 'false');
      });
    }
  });
}, { threshold: 0.3, rootMargin: '-80px 0px -60% 0px' });

document.querySelectorAll('section[id]').forEach(function(s) { navObserver.observe(s); });

// ----- SCROLL FADE-IN ANIMATIONS (Intersection Observer) -----
var fadeObserver = new IntersectionObserver(function(entries) {
  entries.forEach(function(entry) {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      fadeObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -48px 0px' });

document.querySelectorAll('.fade-up').forEach(function(el) { fadeObserver.observe(el); });

// ----- INIT -----
renderProjects();

// Re-observe dynamically added cards
setTimeout(function() {
  document.querySelectorAll('.fade-up:not(.visible)').forEach(function(el) { fadeObserver.observe(el); });
}, 100);
