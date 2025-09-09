// ============================
// MENÚ HAMBURGUESA
// ============================
const mobileMenu = document.getElementById("mobile-menu");
const navMenu = document.querySelector(".nav-menu");

mobileMenu.addEventListener("click", function () {
  mobileMenu.classList.toggle("active");
  navMenu.classList.toggle("active");

  // Animación de icono hamburguesa a X
  const bars = document.querySelectorAll(".bar");
  bars.forEach((bar) => bar.classList.toggle("active"));
});

// Cerrar menú al hacer clic en un enlace
document.querySelectorAll(".nav-menu a").forEach((link) => {
  link.addEventListener("click", () => {
    mobileMenu.classList.remove("active");
    navMenu.classList.remove("active");

    const bars = document.querySelectorAll(".bar");
    bars.forEach((bar) => bar.classList.remove("active"));
  });
});

// ============================
// SCROLL SUAVE
// ============================
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const targetId = this.getAttribute("href");
    if (targetId === "#") return;

    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      // Calculamos la posición considerando la navbar fija
      const navbarHeight = document.getElementById("navbar").offsetHeight;
      const targetPosition = targetElement.offsetTop - navbarHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    }
  });
});

// ============================
// ANIMACIONES AL SCROLL
// ============================
const faders = document.querySelectorAll(".fade-in");

const appearOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const appearOnScroll = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    entry.target.style.opacity = 1;
    entry.target.style.transform = "translateY(0)";
    observer.unobserve(entry.target);
  });
}, appearOptions);

faders.forEach((fader) => {
  appearOnScroll.observe(fader);
});

// ============================
// FORMULARIO DE CONTACTO
// ============================
document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();

  // Obtener valores del formulario
  const nombre = document.getElementById("nombre").value;
  const email = document.getElementById("email").value;
  const telefono = document.getElementById("telefono").value;
  const mensaje = document.getElementById("mensaje").value;

  // Validación básica
  if (!nombre || !email || !mensaje) {
    alert(
      "Por favor completa los campos obligatorios: Nombre, Email y Mensaje"
    );
    return;
  }

  // Crear mensaje para WhatsApp
  const textoWhatsapp = `Hola trenzas, me interesan tus servicios.%0A%0A*Nombre:* ${nombre}%0A*Email:* ${email}%0A*Teléfono:* ${
    telefono || "No proporcionado"
  }%0A*Mensaje:* ${mensaje}`;

  // Abrir WhatsApp
  window.open(`https://wa.me/541176318263?text=${textoWhatsapp}`, "_blank");

  // Mensaje de confirmación
  alert(
    "¡Gracias por tu mensaje! Se abrirá WhatsApp para que puedas enviarnos tu consulta."
  );

  // Limpiar formulario
  this.reset();
});

// ============================
// PARALLAX HEADER
// ============================
const header = document.querySelector("header");

window.addEventListener("scroll", () => {
  const scrollY = window.scrollY;

  // Parallax header (sutil)
  if (header) {
    header.style.transform = `translateY(${scrollY * 0.3}px)`;
  }
});

// ============================
// INICIALIZACIÓN AOS
// ============================
AOS.init({
  duration: 1200,
  once: true,
  mirror: false,
  offset: 100,
});

// ============================
// NAVBAR SCROLL EFFECT
// ============================
window.addEventListener("scroll", function () {
  const navbar = document.getElementById("navbar");
  if (window.scrollY > 100) {
    navbar.style.background = "rgba(74, 20, 140, 0.98)";
    navbar.style.boxShadow = "0 4px 20px rgba(0,0,0,0.1)";
  } else {
    navbar.style.background = "rgba(74, 20, 140, 0.95)";
    navbar.style.boxShadow = "none";
  }
});

// ============================
// PREVENIR IMÁGENES ROTAS - FALLBACK
// ============================
document.addEventListener("DOMContentLoaded", function () {
  const images = document.querySelectorAll("img");

  images.forEach((img) => {
    img.addEventListener("error", function () {
      // Si falla la carga, usar SVG de placeholder
      if (!this.getAttribute("data-fallback-applied")) {
        this.src =
          'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="300" height="300" viewBox="0 0 300 300"><rect width="300" height="300" fill="%23f8e9e9"/><text x="150" y="150" font-family="Arial" font-size="20" fill="%238e24aa" text-anchor="middle">Imagen no disponible</text></svg>';
        this.setAttribute("data-fallback-applied", "true");
      }
    });
  });
});
