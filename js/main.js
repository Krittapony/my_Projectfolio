// =============================================================
// main.js — Navigation, Scroll, Animations, Modal, Slideshow
// =============================================================

// ─── CARD IMAGE SLIDESHOW ────────────────────────────────────
// Each card with multiple images gets an auto-sliding gallery.
// - Auto-advances every 5 seconds
// - Desktop: shows prev/next arrow buttons on hover
// - Mobile: touch swipe supported
var cardSlideshows = {}; // keyed by project id

function buildCardSlideshow(p, thumbEl) {
  var imgs = p.images;
  if (!imgs || imgs.length === 0) return; // gradient placeholder, no slideshow needed
  if (imgs.length === 1) {
    // single image — just render, no controls needed
    thumbEl.innerHTML =
      '<img src="' + imgs[0] + '" alt="' + p.title + '" loading="lazy" class="project-thumb-img">' +
      '<div class="project-overlay" aria-hidden="true"><span class="project-overlay-label">👁 ดูรายละเอียด</span></div>';
    return;
  }

  // Multiple images — build slideshow
  var current = 0;
  var total = imgs.length;
  var timer = null;

  var slidesHtml = imgs.map(function(src, idx) {
    return '<div class="slide' + (idx === 0 ? ' active' : '') + '">' +
      '<img src="' + src + '" alt="' + p.title + ' รูปที่ ' + (idx + 1) + '" loading="lazy">' +
      '</div>';
  }).join('');

  var dotsHtml = imgs.map(function(_, idx) {
    return '<span class="slide-dot' + (idx === 0 ? ' active' : '') + '" data-idx="' + idx + '"></span>';
  }).join('');

  thumbEl.innerHTML =
    '<div class="slideshow">' +
      '<div class="slides-track">' + slidesHtml + '</div>' +
      '<button class="slide-btn slide-btn-prev" aria-label="รูปก่อนหน้า">&#8249;</button>' +
      '<button class="slide-btn slide-btn-next" aria-label="รูปถัดไป">&#8250;</button>' +
      '<div class="slide-dots">' + dotsHtml + '</div>' +
    '</div>' +
    '<div class="project-overlay" aria-hidden="true"><span class="project-overlay-label">👁 ดูรายละเอียด</span></div>';

  var slideshow = thumbEl.querySelector('.slideshow');
  var slides = thumbEl.querySelectorAll('.slide');
  var dots = thumbEl.querySelectorAll('.slide-dot');

  function goTo(idx) {
    slides[current].classList.remove('active');
    dots[current].classList.remove('active');
    current = (idx + total) % total;
    slides[current].classList.add('active');
    dots[current].classList.add('active');
  }

  function next() { goTo(current + 1); }
  function prev() { goTo(current - 1); }

  function startTimer() {
    clearInterval(timer);
    timer = setInterval(next, 5000);
  }
  startTimer();

  // Arrow buttons
  thumbEl.querySelector('.slide-btn-next').addEventListener('click', function(e) {
    e.stopPropagation(); next(); startTimer();
  });
  thumbEl.querySelector('.slide-btn-prev').addEventListener('click', function(e) {
    e.stopPropagation(); prev(); startTimer();
  });

  // Dot buttons
  dots.forEach(function(dot) {
    dot.addEventListener('click', function(e) {
      e.stopPropagation();
      goTo(parseInt(this.dataset.idx));
      startTimer();
    });
  });

  // Touch swipe
  var touchStartX = 0;
  slideshow.addEventListener('touchstart', function(e) {
    touchStartX = e.touches[0].clientX;
  }, { passive: true });
  slideshow.addEventListener('touchend', function(e) {
    var diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      diff > 0 ? next() : prev();
      startTimer();
    }
  }, { passive: true });

  // Pause on hover (desktop)
  slideshow.addEventListener('mouseenter', function() { clearInterval(timer); });
  slideshow.addEventListener('mouseleave', startTimer);

  cardSlideshows[p.id] = { goTo: goTo, next: next, prev: prev };
}

// ─── RENDER PROJECT CARDS ────────────────────────────────────
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

    var bc = p.category === 'website' ? 'badge-website' : p.category === 'chatbot' ? 'badge-chatbot' : 'badge-excel';
    var bt = p.category === 'website' ? '🌐 เว็บไซต์' : p.category === 'chatbot' ? '💬 LINE Chatbot' : '📝 สูตร Excel';

    el.innerHTML =
      '<div class="card-shine" aria-hidden="true"></div>' +
      '<div class="project-thumb" id="thumb-' + p.id + '">' +
        // Thumb content built below via buildCardSlideshow or placeholder
      '</div>' +
      '<div class="project-body">' +
        '<span class="project-category-badge ' + bc + '">' + bt + '</span>' +
        '<h3 class="project-title">' + p.title + '</h3>' +
        '<p class="project-desc">' + p.description + '</p>' +
        '<div class="project-tags">' + p.tags.map(function(t) { return '<span class="project-tag">' + t + '</span>'; }).join('') + '</div>' +
        '<div class="project-actions">' +
          '<button class="btn-action-detail" onclick="event.stopPropagation();openModal(' + p.id + ')" aria-label="ดูรายละเอียด ' + p.title + '">📖 รายละเอียด</button>' +
        '</div>' +
      '</div>';

    grid.appendChild(el);

    // Build thumb / slideshow
    var thumbEl = el.querySelector('#thumb-' + p.id);
    if (p.images && p.images.length > 0) {
      buildCardSlideshow(p, thumbEl);
    } else {
      // Gradient placeholder
      thumbEl.innerHTML =
        '<div class="project-thumb-placeholder" style="background:' + p.gradient + '" aria-hidden="true">' + p.emoji + '</div>' +
        '<div class="project-overlay" aria-hidden="true"><span class="project-overlay-label">👁 ดูรายละเอียด</span></div>';
    }

    el.addEventListener('click', function() { openModal(p.id); });
    el.addEventListener('keypress', function(e) { if (e.key === 'Enter') openModal(p.id); });
  });

  setTimeout(function() {
    grid.querySelectorAll('.fade-up').forEach(function(el) { el.classList.add('visible'); });
    grid.querySelectorAll('.fade-up:not(.visible)').forEach(function(el) { fadeObserver.observe(el); });
  }, 50);

  initCard3DTilt();
}

// ─── FILTER TABS ─────────────────────────────────────────────
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

// ─── MODAL GALLERY SLIDESHOW ─────────────────────────────────
var modalCurrentIdx = 0;
var modalImages = [];

function buildModalGallery(p) {
  var imgEl = document.getElementById('modal-image');
  modalImages = p.images || [];
  modalCurrentIdx = 0;

  if (modalImages.length === 0) {
    // Gradient placeholder
    imgEl.innerHTML =
      '<div style="width:100%;height:100%;background:' + p.gradient + ';display:flex;align-items:center;justify-content:center;font-size:80px;border-radius:16px;">' + p.emoji + '</div>';
    document.getElementById('modal-gallery-controls').style.display = 'none';
    return;
  }

  showModalImage(0);

  if (modalImages.length > 1) {
    document.getElementById('modal-gallery-controls').style.display = 'flex';
    updateModalDots();
  } else {
    document.getElementById('modal-gallery-controls').style.display = 'none';
  }
}

function showModalImage(idx) {
  modalCurrentIdx = (idx + modalImages.length) % modalImages.length;
  var imgEl = document.getElementById('modal-image');
  imgEl.innerHTML =
    '<img src="' + modalImages[modalCurrentIdx] + '" alt="รูปที่ ' + (modalCurrentIdx + 1) + '" style="max-width:100%;max-height:100%;width:auto;height:auto;object-fit:contain;border-radius:16px;">';
  updateModalDots();
}

function updateModalDots() {
  var container = document.getElementById('modal-dots');
  container.innerHTML = '';
  modalImages.forEach(function(_, i) {
    var dot = document.createElement('span');
    dot.className = 'modal-dot' + (i === modalCurrentIdx ? ' active' : '');
    dot.addEventListener('click', function() { showModalImage(i); });
    container.appendChild(dot);
  });
  var counter = document.getElementById('modal-counter');
  if (counter) counter.textContent = modalImages.length > 1 ? (modalCurrentIdx + 1) + ' / ' + modalImages.length : '';
}

document.getElementById('modal-prev').addEventListener('click', function() {
  showModalImage(modalCurrentIdx - 1);
});
document.getElementById('modal-next').addEventListener('click', function() {
  showModalImage(modalCurrentIdx + 1);
});

// Touch swipe on modal gallery
var modalTouchStartX = 0;
document.getElementById('modal-image').addEventListener('touchstart', function(e) {
  modalTouchStartX = e.touches[0].clientX;
}, { passive: true });
document.getElementById('modal-image').addEventListener('touchend', function(e) {
  var diff = modalTouchStartX - e.changedTouches[0].clientX;
  if (Math.abs(diff) > 40) { diff > 0 ? showModalImage(modalCurrentIdx + 1) : showModalImage(modalCurrentIdx - 1); }
}, { passive: true });

// ─── OPEN / CLOSE MODAL ──────────────────────────────────────
function openModal(id) {
  var p = null;
  for (var i = 0; i < projects.length; i++) {
    if (projects[i].id === id) { p = projects[i]; break; }
  }
  if (!p) return;

  document.getElementById('modal-title-text').textContent = p.title;
  var badge = document.getElementById('modal-badge');
  badge.textContent = p.category === 'website' ? '🌐 เว็บไซต์' : p.category === 'chatbot' ? '💬 LINE Chatbot' : '📝 สูตร Excel';
  badge.className = 'project-category-badge ' + (p.category === 'website' ? 'badge-website' : p.category === 'chatbot' ? 'badge-chatbot' : 'badge-excel');

  buildModalGallery(p);

  document.getElementById('modal-desc').textContent = p.fullDescription;
  document.getElementById('modal-tags').innerHTML = p.tags.map(function(t) {
    return '<span class="modal-tag">' + t + '</span>';
  }).join('');

  // Conditional liveUrl button
  var liveBtn = document.getElementById('modal-link');
  if (p.showLiveUrl && p.liveUrl) {
    liveBtn.href = p.liveUrl;
    liveBtn.style.display = 'inline-flex';
  } else {
    liveBtn.style.display = 'none';
  }

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

// ─── QR MODAL ────────────────────────────────────────────────
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

// ─── KEYBOARD ────────────────────────────────────────────────
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') { closeModal(); closeQR(); }
  if (document.getElementById('modal-backdrop').classList.contains('open')) {
    if (e.key === 'ArrowRight') showModalImage(modalCurrentIdx + 1);
    if (e.key === 'ArrowLeft')  showModalImage(modalCurrentIdx - 1);
  }
});

// ─── COPY LINE ID ─────────────────────────────────────────────
function copyLineId() {
  var msg = document.getElementById('copied-msg');
  function showMsg() {
    msg.classList.add('show');
    setTimeout(function() { msg.classList.remove('show'); }, 2000);
  }
  var lineId = 'menmen@3258';
  if (navigator.clipboard) {
    navigator.clipboard.writeText(lineId).then(showMsg).catch(function() {
      fallbackCopy(lineId); showMsg();
    });
  } else { fallbackCopy(lineId); showMsg(); }
}
function copyEmail() {
  var msg = document.getElementById('copied-email-msg');
  function showMsg() {
    msg.classList.add('show');
    setTimeout(function() { msg.classList.remove('show'); }, 2000);
  }
  var email = 'Krittaporn.03work@gmail.com';
  if (navigator.clipboard) {
    navigator.clipboard.writeText(email).then(showMsg).catch(function() {
      fallbackCopy(email); showMsg();
    });
  } else { fallbackCopy(email); showMsg(); }
}
function fallbackCopy(text) {
  var ta = document.createElement('textarea');
  ta.value = text;
  document.body.appendChild(ta); ta.select(); document.execCommand('copy'); document.body.removeChild(ta);
}

// ─── FISH BURST ON PROFILE CLICK ─────────────────────────────
(function () {
  var profileEl = document.getElementById('hero-profile-img');
  if (!profileEl) return;
  profileEl.style.cursor = 'pointer';
  var fishTypes = ['🐟', '🐠', '🐡'];

  profileEl.addEventListener('click', function () {
    var rect = profileEl.getBoundingClientRect();
    var cx = rect.left + rect.width / 2;
    var cy = rect.top  + rect.height / 2;
    for (var i = 0; i < 3; i++) {
      spawnFish(cx, cy, fishTypes[i], i);
    }
  });

  function spawnFish(cx, cy, emoji, idx) {
    var el = document.createElement('span');
    el.className = 'fish-emoji';
    el.textContent = emoji;

    // Spread 3 fish evenly with some randomness
    var baseAngle = -110 + idx * 70;                          // -110°, -40°, 30°
    var angle = (baseAngle + (Math.random() * 40 - 20)) * (Math.PI / 180);
    var dist  = 110 + Math.random() * 80;
    var dx    = Math.cos(angle) * dist;
    var dy    = Math.sin(angle) * dist;
    var dur   = 3.4 + Math.random() * 0.6; //3.4 - 4s

    el.style.left = cx + 'px';
    el.style.top  = cy + 'px';
    el.style.marginLeft = '-15px';
    el.style.marginTop  = '-15px';
    el.style.setProperty('--fish-x', dx + 'px');
    el.style.setProperty('--fish-y', dy + 'px');
    el.style.setProperty('--fish-dur', dur + 's');
    // Mirror fish heading right so they always "face" swim direction
    if (dx > 0) el.style.transform = 'scaleX(-1)';

    document.body.appendChild(el);
    setTimeout(function () { el.remove(); }, (dur + 0.15) * 1000);
  }
})();

// ─── HAMBURGER MENU ──────────────────────────────────────────
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
  if (isOpen) { closeMobileMenu(); }
  else {
    hamburger.classList.add('open');
    mobileMenu.classList.add('open');
    menuOverlay.classList.add('open');
    hamburger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }
});
menuOverlay.addEventListener('click', closeMobileMenu);

// ─── NAVBAR: DYNAMIC COLOR ───────────────────────────────────
// ตอนอยู่บนสุด (hero section = gradient พื้นหลัง) → ตัวอักษรขาว
// หลัง scroll → พื้นหลังขาว blur + ตัวอักษรสีธีม
var navbar = document.getElementById('navbar');
window.addEventListener('scroll', function() {
  if (window.scrollY > 20) {
    navbar.classList.add('scrolled');
    navbar.classList.remove('on-hero');
  } else {
    navbar.classList.remove('scrolled');
    navbar.classList.add('on-hero');
  }
}, { passive: true });
// เริ่มต้นบน hero
navbar.classList.add('on-hero');

// ─── ACTIVE NAV HIGHLIGHT ────────────────────────────────────
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

// ─── SCROLL FADE-IN ANIMATIONS ───────────────────────────────
var fadeObserver = new IntersectionObserver(function(entries) {
  entries.forEach(function(entry) {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      fadeObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -48px 0px' });
document.querySelectorAll('.fade-up').forEach(function(el) { fadeObserver.observe(el); });

// ─── PARALLAX: HERO BACKGROUND ───────────────────────────────
var heroBgParallax = document.querySelector('.hero-bg-parallax');
var parallaxTicking = false;
var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!prefersReducedMotion && heroBgParallax) {
  window.addEventListener('scroll', function() {
    if (!parallaxTicking) {
      requestAnimationFrame(function() {
        heroBgParallax.style.transform = 'translateY(' + (window.scrollY * 0.35) + 'px)';
        parallaxTicking = false;
      });
      parallaxTicking = true;
    }
  }, { passive: true });
}

// ─── 3D CARD TILT ─────────────────────────────────────────────
function initCard3DTilt() {
  if (prefersReducedMotion) return;
  if (window.matchMedia('(pointer: coarse)').matches) return; // skip on mobile/touch

  document.querySelectorAll('.project-card').forEach(function(card) {
    card.addEventListener('mousemove', function(e) {
      var rect = card.getBoundingClientRect();
      var x = e.clientX - rect.left;
      var y = e.clientY - rect.top;
      var cx = rect.width / 2;
      var cy = rect.height / 2;
      var rx = ((y - cy) / cy) * -6;
      var ry = ((x - cx) / cx) * 6;
      card.style.transform = 'perspective(900px) rotateX(' + rx + 'deg) rotateY(' + ry + 'deg) translateZ(10px)';
      var shine = card.querySelector('.card-shine');
      if (shine) {
        var px = (x / rect.width) * 100;
        var py = (y / rect.height) * 100;
        shine.style.background = 'radial-gradient(circle at ' + px + '% ' + py + '%, rgba(255,255,255,0.2) 0%, transparent 65%)';
        shine.style.opacity = '1';
      }
    });

    card.addEventListener('mouseleave', function() {
      card.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
      var shine = card.querySelector('.card-shine');
      if (shine) shine.style.opacity = '0';
    });
  });
}

// ─── INIT ─────────────────────────────────────────────────────
renderProjects();
