// DOM Elements
const themeToggle = document.getElementById("cambio-tema");
const menuToggle = document.getElementById("cambio-menu");
const navList = document.querySelector(".lista-nav");
const contactoForm = document.getElementById("contacto-form");
const navLinks = document.querySelectorAll(".nav-link");
const nameElement = document.querySelector(".perfil-title span");
const projectCards = document.querySelectorAll(".project-card");
const sections = document.querySelectorAll("section");

// Theme Toggle
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("oscuro");
  
  const icon = themeToggle.querySelector("i");
  icon.classList.toggle("fa-moon", !document.body.classList.contains("oscuro"));
  icon.classList.toggle("fa-sun", document.body.classList.contains("oscuro"));

  localStorage.setItem("theme", document.body.classList.contains("oscuro") ? "oscuro" : "claro");
});

if (!localStorage.getItem("theme")) {
  localStorage.setItem("theme", "oscuro");
}

if (localStorage.getItem("theme") === "oscuro") {
  document.body.classList.add("oscuro");
  const icon = themeToggle.querySelector("i");
  icon.classList.replace("fa-moon", "fa-sun");
}

// Mobile Menu Toggle
menuToggle.addEventListener("click", () => {
  navList.classList.toggle("active");
});

document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    navList.classList.remove("active");
  });
});

// =============================================
// MANEJO DEL FORMULARIO (AÑADIR AL FINAL DE TU JS)
// =============================================
document.getElementById("contacto-form")?.addEventListener("submit", function(e) {
  e.preventDefault();
  
  // 1. Validación rápida (puedes personalizar esto)
  const name = this.name.value.trim();
  const email = this.email.value.trim();
  const subject = this.subject.value.trim();
  const message = this.message.value.trim();

  if (!name || !subject || !message) {
    alert("⚠️ Completa todos los campos.");
    return;
  }

  if (!email.includes("@") || !email.includes(".")) {
    alert("📧 Email no válido. Revísalo, por favor.");
    return;
  }

  // 2. Enviar el formulario (a FormSubmit)
  this.submit(); // Esto conserva tu configuración actual (action, method, hidden inputs)

  // 3. (Opcional) Feedback visual al usuario
  const btn = this.querySelector("button[type='submit']");
  if (btn) {
    btn.textContent = "Enviado ✓";
    btn.disabled = true;
  }
});

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const targetElement = document.querySelector(this.getAttribute("href"));
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - document.querySelector(".header").offsetHeight,
        behavior: "smooth",
      });
    }
  });
});

// Animaciones con scroll
const scrollReveal = () => {
  sections.forEach((section) => {
    section.querySelectorAll(".reveal-on-scroll").forEach((el) => {
      if (el.getBoundingClientRect().top < window.innerHeight - 100) {
        el.style.opacity = 1;
        el.style.transform = "translateY(0)";
        el.style.transition = "opacity 0.3s ease-out, transform 0.3s ease-out";
      }
    });
  });
};

sections.forEach(section => {
  section.querySelectorAll("* > *").forEach(el => {
    el.classList.add("reveal-on-scroll");
    el.style.opacity = "0";
    el.style.transform = "translateY(20px)";
  });
});

// Efecto máquina de escribir en el nombre
const typeWriterEffect = () => {
  if (!nameElement) return;
  const text = nameElement.textContent;
  nameElement.textContent = "";
  let index = 0;

  const writeText = () => {
    if (index < text.length) {
      nameElement.textContent += text.charAt(index);
      index++;
      setTimeout(writeText, 50);
    }
  };

  writeText();
};

// Event listeners
window.addEventListener("scroll", scrollReveal);
document.addEventListener("DOMContentLoaded", () => {
  scrollReveal();
  typeWriterEffect();
});
