// DOM Elements
const themeToggle = document.getElementById("theme-toggle")
const menuToggle = document.getElementById("menu-toggle")
const navList = document.querySelector(".nav-list")
const contactForm = document.getElementById("contact-form")

// Theme Toggle
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark")

  // Update icon
  const icon = themeToggle.querySelector("i")
  if (document.body.classList.contains("dark")) {
    icon.classList.remove("fa-moon")
    icon.classList.add("fa-sun")
  } else {
    icon.classList.remove("fa-sun")
    icon.classList.add("fa-moon")
  }

  // Save preference to localStorage
  const theme = document.body.classList.contains("dark") ? "dark" : "light"
  localStorage.setItem("theme", theme)
})

// Check for saved theme preference
if (!localStorage.getItem("theme")) {
    localStorage.setItem("theme", "dark")
}

const savedTheme = localStorage.getItem("theme")
if (savedTheme === "dark") {
  document.body.classList.add("dark")
  const icon = themeToggle.querySelector("i")
  icon.classList.remove("fa-moon")
  icon.classList.add("fa-sun")
}

// Mobile Menu Toggle
menuToggle.addEventListener("click", () => {
  navList.classList.toggle("active")
})

// Close mobile menu when clicking on a link
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    navList.classList.remove("active")
  })
})

// Contact Form Submission
if (contactForm) {
  contactForm.addEventListener("submit", (e) => {

    // Get form data
    const formData = new FormData(contactForm)
    const formValues = Object.fromEntries(formData.entries())

    // Simple validation
    let isValid = true
    for (const [key, value] of Object.entries(formValues)) {
      if (!value.trim()) {
        isValid = false
        const input = document.getElementById(key)
        input.style.borderColor = "red"
      }
    }

    if (isValid) {
      // In a real application, you would send this data to a server
      console.log("Form submitted:", formValues)

      // Show success message
      alert("¡Mensaje enviado con éxito! Te responderé lo antes posible.")

      // Reset form
      contactForm.reset()
    } else {
      alert("Por favor, completa todos los campos del formulario.")
    }
  })

  // Reset validation styling on input
  contactForm.querySelectorAll("input, textarea").forEach((input) => {
    input.addEventListener("input", () => {
      input.style.borderColor = ""
    })
  })
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()

    const targetId = this.getAttribute("href")
    if (targetId === "#") return

    const targetElement = document.querySelector(targetId)
    if (targetElement) {
      const headerHeight = document.querySelector(".header").offsetHeight
      const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      })
    }
  })
})

// Add active class to nav links on scroll
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        const headerHeight = document.querySelector('.header').offsetHeight;
        
        if (window.pageYOffset >= sectionTop - headerHeight - 100) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href').substring(1); // Remove the # from href
        if (href === current) {
            link.classList.add('active');
        }
    });
});

// Animate elements on scroll
const animateOnScroll = () => {
  const elements = document.querySelectorAll(".skill-item, .project-card, .timeline-item")

  elements.forEach((element) => {
    const elementPosition = element.getBoundingClientRect().top
    const windowHeight = window.innerHeight

    if (elementPosition < windowHeight - 100) {
      element.classList.add("animate")
    }
  })
}

// Add animation class
document.addEventListener('DOMContentLoaded', () => {
    // Marcar el enlace activo basado en la URL actual
    const currentLocation = window.location.hash;
    if (currentLocation) {
        const activeLink = document.querySelector(`.nav-link[href="${currentLocation}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }
    } else {
        // Si no hay hash, marcar el primer enlace como activo
        const firstLink = document.querySelector('.nav-link');
        if (firstLink) {
            firstLink.classList.add('active');
        }
    }
    
  // Add animation class to elements
  const skillItems = document.querySelectorAll(".skill-item")
  const projectCards = document.querySelectorAll(".project-card")
  const timelineItems = document.querySelectorAll(".timeline-item")

  // Add animation styles
  const style = document.createElement("style")
  style.textContent = `
    .skill-item, .project-card, .timeline-item {
      opacity: 0;
      transform: translateY(30px);
      transition: opacity 0.7s ease, transform 0.7s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }
    
    .skill-item.animate, .project-card.animate, .timeline-item.animate {
      opacity: 1;
      transform: translateY(0);
    }
    
    .project-card:hover {
      transform: translateY(-8px) scale(1.02);
      box-shadow: 0 15px 25px var(--shadow);
    }
  `
  document.head.appendChild(style)

  // Initial check for elements in viewport
  animateOnScroll()

  // Listen for scroll events
  window.addEventListener("scroll", animateOnScroll)
})