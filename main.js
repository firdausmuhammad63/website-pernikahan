// ==================== COUNTDOWN ====================
const weddingDate = new Date('2025-11-15T08:00:00+07:00');
function updateCountdown() {
  const now = new Date();
  const diff = weddingDate - now;

  if (diff <= 0) {
    document.getElementById("countdown").innerHTML = "Hari ini!";
    return;
  }

  const d = Math.floor(diff / 86400000);
  const h = Math.floor((diff / 3600000) % 24);
  const m = Math.floor((diff / 60000) % 60);
  const s = Math.floor((diff / 1000) % 60);

  document.getElementById("days").innerText = d;
  document.getElementById("hours").innerText = h;
  document.getElementById("minutes").innerText = m;
  document.getElementById("seconds").innerText = s;
}
setInterval(updateCountdown, 1000);
updateCountdown();

// ==================== FADE-IN SCROLL ====================
const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('show');
  });
}, { threshold: 0.1 });

document.querySelectorAll('.fade-in').forEach(el => fadeObserver.observe(el));

// ==================== HIGHLIGHT NAV ACTIVE ====================
document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");

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
  }, { threshold: 0.3 });

  sections.forEach(section => navObserver.observe(section));

  // ========= Fungsi ambil query param dari URL ==========
  function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
  }

  // Ambil nama dari URL (contoh: ?to=Rizki%20Amin)
  const nama = getQueryParam("to");
  if (nama) {
    document.getElementById("namaTamu").innerText = nama;
  }
});

// ====================== SECONDS ANIMATION =======================
const secondsEl = document.getElementById("seconds");
if (secondsEl) {
  setInterval(() => {
    secondsEl.classList.add("opacity-50");
    setTimeout(() => secondsEl.classList.remove("opacity-50"), 300);
  }, 1000);
}

// =================== FOOTER NAMA TAMU UNDANGAN ==================
function capitalizeName(name) {
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

document.getElementById("namaTamu").textContent =
  "" + getQueryParam("nama");

// ==================== RSVP ====================
const form = document.forms['tamu-undangan'];
const scriptURL = 'https://script.google.com/macros/s/AKfycbzNstAsIRwLfs4FHawQd65x_zSp2zfSpbTffesuBsQg6pzp3cXSAgb2q6ET-BxkoOGw/exec';
const customAlert = document.getElementById('customAlert');
const closeAlertBtn = document.getElementById('closeAlert');
const submitBtn = form.querySelector('button[type="submit"]');

function showAlert() {
  customAlert.classList.remove('hidden');
  customAlert.classList.add('flex', 'opacity-100');
  customAlert.querySelector('div').style.transform = 'scale(0.9)';
  setTimeout(() => {
    customAlert.querySelector('div').style.transform = 'scale(1)';
  }, 20);
}

function closeAlert() {
  customAlert.classList.add('hide');
  setTimeout(() => {
    customAlert.classList.add('hidden');
    customAlert.classList.remove('flex', 'opacity-100', 'hide');
    form.reset();
    form.querySelector('input[name="status"][value="hadir"]').checked = true;
  }, 300);
}

closeAlertBtn.addEventListener('click', closeAlert);

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  submitBtn.disabled = true;
  submitBtn.innerHTML = `<span class="animate-spin mr-2">⏳</span> Mengirim...`;

  try {
    const formData = new FormData(form);
    const statusValue = formData.get('status');
    formData.set('status', statusValue);

    const response = await fetch(scriptURL, { method: 'POST', body: formData });

    if (response.ok) {
      showAlert();
      submitBtn.disabled = false;
      submitBtn.innerHTML = "Konfirmasi";
      form.reset();
      form.querySelector('input[name="status"][value="hadir"]').checked = true;
    } else {
      console.error('Error server', response.statusText);
      alert('Gagal mengirim data ke server.');
      submitBtn.disabled = false;
      submitBtn.innerHTML = "Konfirmasi";
    }

  } catch (err) {
    console.error('Error koneksi', err);
    alert('Terjadi error koneksi.');
    submitBtn.disabled = false;
    submitBtn.innerHTML = "Konfirmasi";
  }
});

// ==================== SMOOTH SCROLL ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      window.scrollTo({
        top: target.offsetTop - 50,
        behavior: "smooth"
      });
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          navLinks.forEach((link) => {
            link.classList.remove("active");
            if (link.getAttribute("href") === `#${entry.target.id}`) {
              link.classList.add("active");
            }
          });
        }
      });
    },
    { threshold: 0.5, rootMargin: "-20% 0px -20% 0px" }
  );

  sections.forEach((section) => observer.observe(section));
});

window.addEventListener("scroll", () => {
  const scrollPos = window.scrollY;
  const firstSection = document.querySelectorAll("section[id]")[0];
  const navLinks = document.querySelectorAll(".nav-link");
  if (scrollPos < firstSection.offsetTop) {
    navLinks.forEach(link => link.classList.remove("active"));
    navLinks[0].classList.add("active");
  }
});

