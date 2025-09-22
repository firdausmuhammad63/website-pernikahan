// ==================== UTILITY FUNCTIONS ====================
function capitalizeName(name) {
  if (!name) return "";
  return name
    .split(" ")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  let value = urlParams.get(param);
  return value ? capitalizeName(value) : "";
}

// ==================== DYNAMIC META TAGS UPDATE ====================
function updateMetaTags() {
  const namaTamu = getQueryParam("nama") || getQueryParam("to");
  
  if (namaTamu) {
    const newTitle = `Undangan Pernikahan Firdaus & Alma - ${namaTamu}`;
    const newDescription = `Kepada Yth. ${namaTamu}, dengan penuh syukur kami mengundang Anda hadir pada hari bahagia kami, 15 November 2025. Silakan buka undangan untuk informasi lengkap.`;
    
    // Update document title
    document.title = newTitle;
    
    // Helper function untuk update meta tags
    const updateMeta = (selector, attribute, value) => {
      const meta = document.querySelector(selector);
      if (meta) meta.setAttribute(attribute, value);
    };
    
    // Update semua meta tags
    updateMeta('meta[name="title"]', 'content', newTitle);
    updateMeta('meta[name="description"]', 'content', newDescription);
    updateMeta('meta[property="og:title"]', 'content', newTitle);
    updateMeta('meta[property="og:description"]', 'content', newDescription);
    updateMeta('meta[property="twitter:title"]', 'content', newTitle);
    updateMeta('meta[property="twitter:description"]', 'content', newDescription);
    updateMeta('meta[property="whatsapp:title"]', 'content', newTitle);
    updateMeta('meta[property="whatsapp:description"]', 'content', newDescription);
    
    // Update URLs
    const encodedNama = encodeURIComponent(namaTamu);
    const newUrl = `https://firdaus-alma.netlify.app/?nama=${encodedNama}`;
    
    updateMeta('meta[property="og:url"]', 'content', newUrl);
    updateMeta('meta[property="twitter:url"]', 'content', newUrl);
    
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) canonical.href = newUrl;
    
    // Update browser history tanpa reload
    if (window.history && window.history.replaceState) {
      window.history.replaceState({}, newTitle, `?nama=${encodedNama}`);
    }
  }
}

// ==================== COUNTDOWN ====================
const weddingDate = new Date('2025-11-15T09:00:00+07:00'); // Sesuaikan dengan waktu akad

function smoothUpdate(el, value) {
  if (!el) return;
  
  if (el.textContent != value) {
    el.textContent = value;
    el.classList.remove("blink-smooth");
    void el.offsetWidth; // Force reflow
    el.classList.add("blink-smooth");
  }
}

function updateCountdown() {
  const now = new Date();
  const diff = weddingDate - now;
  
  const countdownEl = document.getElementById("countdown");
  if (!countdownEl) return;

  if (diff <= 0) {
    countdownEl.innerHTML = `
      <div class="text-center bg-gradient-to-r from-blue-800 to-green-600 rounded-xl shadow-lg p-6 text-white">
        <div class="text-3xl font-bold">🎉 Hari Ini! 🎉</div>
        <div class="text-sm mt-2">Acara sedang berlangsung</div>
      </div>
    `;
    return;
  }

  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff / 3600000) % 24);
  const minutes = Math.floor((diff / 60000) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  smoothUpdate(document.getElementById("days"), days);
  smoothUpdate(document.getElementById("hours"), hours);
  smoothUpdate(document.getElementById("minutes"), minutes);
  smoothUpdate(document.getElementById("seconds"), seconds);
}

// ==================== NAMA TAMU DISPLAY ====================
function displayNamaTamu() {
  const namaTamu = getQueryParam("nama") || getQueryParam("to");
  const namaTamuEl = document.getElementById("namaTamu");
  
  if (namaTamuEl) {
    if (namaTamu) {
      namaTamuEl.textContent = namaTamu;
      namaTamuEl.style.display = "block";
    } else {
      namaTamuEl.textContent = "Tamu Terhormat";
      namaTamuEl.style.display = "block";
    }
  }
}

// ==================== FADE-IN SCROLL ANIMATION ====================
function initFadeInAnimation() {
  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
      }
    });
  }, { 
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  document.querySelectorAll('.fade-in').forEach(el => {
    fadeObserver.observe(el);
  });
}

// ==================== NAVIGATION ACTIVE STATE ====================
function initNavigationHighlight() {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");
  
  if (sections.length === 0 || navLinks.length === 0) return;

  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.classList.remove("active");
          if (link.getAttribute("href") === `#${entry.target.id}`) {
            link.classList.add("active");
          }
        });
      }
    });
  }, { 
    threshold: 0.3,
    rootMargin: "-20% 0px -20% 0px"
  });

  sections.forEach(section => navObserver.observe(section));
  
  // Handle scroll to top
  window.addEventListener("scroll", () => {
    const scrollPos = window.scrollY;
    const firstSection = sections[0];
    
    if (scrollPos < firstSection.offsetTop - 100) {
      navLinks.forEach(link => link.classList.remove("active"));
      navLinks[0]?.classList.add("active");
    }
  });
}

// ==================== SMOOTH SCROLL ====================
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      
      if (target) {
        const offsetTop = target.offsetTop - 80; // Account for fixed nav
        window.scrollTo({
          top: offsetTop,
          behavior: "smooth"
        });
      }
    });
  });
}

// ==================== SECONDS ANIMATION ====================
function initSecondsAnimation() {
  const secondsEl = document.getElementById("seconds");
  if (secondsEl) {
    setInterval(() => {
      secondsEl.classList.add("opacity-50");
      setTimeout(() => secondsEl.classList.remove("opacity-50"), 300);
    }, 1000);
  }
}

// ==================== RSVP FORM ====================
function initRSVPForm() {
  const form = document.forms['tamu-undangan'];
  const scriptURL = 'https://script.google.com/macros/s/AKfycbzNstAsIRwLfs4FHawQd65x_zSp2zfSpbTffesuBsQg6pzp3cXSAgb2q6ET-BxkoOGw/exec';
  const customAlert = document.getElementById('customAlert');
  const closeAlertBtn = document.getElementById('closeAlert');
  
  if (!form || !customAlert || !closeAlertBtn) return;
  
  const submitBtn = form.querySelector('button[type="submit"]');
  if (!submitBtn) return;

  // Auto-fill nama dari URL parameter
  const namaTamu = getQueryParam("nama") || getQueryParam("to");
  const nameInput = form.querySelector('#rsvpName, input[name="nama"]');
  if (nameInput && namaTamu) {
    nameInput.value = namaTamu;
  }

  function showAlert() {
    customAlert.classList.remove('hidden');
    customAlert.classList.add('flex', 'opacity-100');
    const alertDiv = customAlert.querySelector('div');
    if (alertDiv) {
      alertDiv.style.transform = 'scale(0.9)';
      setTimeout(() => {
        alertDiv.style.transform = 'scale(1)';
      }, 50);
    }
    
    // Auto close after 3 seconds
    setTimeout(closeAlert, 3000);
  }

  function closeAlert() {
    customAlert.classList.add('hide');
    setTimeout(() => {
      customAlert.classList.add('hidden');
      customAlert.classList.remove('flex', 'opacity-100', 'hide');
      
      // ✅ RESET FORM LENGKAP - KOSONGKAN SEMUA FIELD
      resetFormCompletely();
      
    }, 300);
  }

  // ✅ FUNGSI RESET FORM LENGKAP
  function resetFormCompletely() {
    // Reset seluruh form
    form.reset();
    
    // Kosongkan semua input text dan textarea secara manual
    const textInputs = form.querySelectorAll('input[type="text"], input[type="email"], textarea');
    textInputs.forEach(input => {
      input.value = '';
    });
    
    // Reset radio buttons ke default (Hadir)
    const defaultStatusRadio = form.querySelector('input[name="status"][value="hadir"]');
    if (defaultStatusRadio) defaultStatusRadio.checked = true;
    
    // Reset jumlah hadir (uncheck semua)
    const jumlahRadios = form.querySelectorAll('input[name="jumlah hadir"]');
    jumlahRadios.forEach(radio => radio.checked = false);
    
    // Kosongkan textarea pesan
    const messageTextarea = form.querySelector('#rsvpMsg, textarea[name="pesan"]');
    if (messageTextarea) {
      messageTextarea.value = '';
      messageTextarea.textContent = '';
    }
    
    // Re-fill nama dari URL jika ada (hanya nama yang tetap terisi)
    if (nameInput && namaTamu) {
      nameInput.value = namaTamu;
    }
    
    console.log('✅ Form berhasil direset lengkap');
  }

  // Event listeners
  closeAlertBtn.addEventListener('click', closeAlert);
  
  // Close alert when clicking outside
  customAlert.addEventListener('click', (e) => {
    if (e.target === customAlert) closeAlert();
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Disable submit button
    submitBtn.disabled = true;
    submitBtn.innerHTML = `<span class="animate-spin mr-2">⏳</span> Mengirim...`;

    try {
      const formData = new FormData(form);
      
      // Add timestamp
      formData.append('timestamp', new Date().toLocaleString('id-ID'));
      
      // Add URL info
      formData.append('url_source', window.location.href);

      const response = await fetch(scriptURL, { 
        method: 'POST', 
        body: formData 
      });

      if (response.ok) {
        showAlert();
        
        // ✅ LANGSUNG RESET FORM SETELAH SUBMIT BERHASIL
        setTimeout(() => {
          resetFormCompletely();
        }, 500); // Delay sedikit untuk UX yang smooth
        
      } else {
        throw new Error(`Server error: ${response.statusText}`);
      }

    } catch (err) {
      console.error('RSVP Error:', err);
      alert('Maaf, terjadi kesalahan. Silakan coba lagi atau hubungi pengantin.');
    } finally {
      // Re-enable submit button
      submitBtn.disabled = false;
      submitBtn.innerHTML = "Kirim Konfirmasi";
    }
  });

  // ✅ TAMBAHAN: Reset form saat halaman dimuat ulang
  window.addEventListener('load', () => {
    resetFormCompletely();
  });
}

// ==================== PERFORMANCE OPTIMIZATION ====================
function preloadImages() {
  const imageUrls = [
    'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?q=80&w=1600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1626247299010-209ebe85fe9d?q=80&w=1470&auto=format&fit=crop',
    './img/F-NEW.png'
  ];
  
  imageUrls.forEach(url => {
    const img = new Image();
    img.src = url;
  });
}

// ==================== ERROR HANDLING ====================
function handleErrors() {
  window.addEventListener('error', (e) => {
    console.error('JavaScript Error:', e.error);
  });
  
  window.addEventListener('unhandledrejection', (e) => {
    console.error('Unhandled Promise Rejection:', e.reason);
  });
}

// ==================== INITIALIZATION ====================
document.addEventListener("DOMContentLoaded", () => {
  try {
    // Core functions
    updateMetaTags();
    displayNamaTamu();
    
    // UI Animations
    initFadeInAnimation();
    initNavigationHighlight();
    initSmoothScroll();
    initSecondsAnimation();
    
    // Form handling
    initRSVPForm();
    
    // Performance
    preloadImages();
    
    // Error handling
    handleErrors();
    
    console.log('✅ Wedding invitation initialized successfully');
    
  } catch (error) {
    console.error('❌ Initialization error:', error);
  }
});

// Start countdown immediately
updateCountdown();
setInterval(updateCountdown, 1000);

// ==================== ADDITIONAL FEATURES ====================

// Lazy loading untuk gambar
function initLazyLoading() {
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.classList.remove('lazy');
            imageObserver.unobserve(img);
          }
        }
      });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
      imageObserver.observe(img);
    });
  }
}

// Service Worker untuk caching (optional)
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(registration => {
        console.log('SW registered: ', registration);
      })
      .catch(registrationError => {
        console.log('SW registration failed: ', registrationError);
      });
  });
}

// Analytics tracking (optional)
function trackEvent(eventName, parameters = {}) {
  if (typeof gtag !== 'undefined') {
    gtag('event', eventName, parameters);
  }
  console.log('Event tracked:', eventName, parameters);
}

// Track important interactions
document.addEventListener('click', (e) => {
  if (e.target.matches('.nav-link')) {
    trackEvent('navigation_click', { section: e.target.getAttribute('href') });
  }
  
  if (e.target.matches('a[href*="maps.app.goo.gl"]')) {
    trackEvent('maps_click', { location: 'wedding_venue' });
  }
});

// Export functions for external use if needed
window.WeddingApp = {
  updateMetaTags,
  displayNamaTamu,
  getQueryParam,
  capitalizeName,
  trackEvent
};
