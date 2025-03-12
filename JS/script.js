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

// contacto Form Submission
if (contactoForm) {
  contactoForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(contactoForm);
    const formValues = Object.fromEntries(formData.entries());

    let isValid = true;
    Object.entries(formValues).forEach(([key, value]) => {
      const input = document.getElementById(key);
      if (!value.trim()) {
        isValid = false;
        input.style.borderColor = "red";
      }
    });

    if (isValid) {
      alert("¡Mensaje enviado con éxito! Te responderé lo antes posible.");
      contactoForm.reset();
    } else {
      alert("Por favor, completa todos los campos del formulario.");
    }
  });

  contactoForm.querySelectorAll("input, textarea").forEach((input) => {
    input.addEventListener("input", () => {
      input.style.borderColor = "";
    });
  });
}

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
