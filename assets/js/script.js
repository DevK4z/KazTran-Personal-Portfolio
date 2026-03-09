document.addEventListener("DOMContentLoaded", () => {
  const particlesContainer = document.getElementById("particles")
  const particleCount = 30

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement("div")
    particle.className = "particle"
    particle.style.left = Math.random() * 100 + "%"
    particle.style.animationDuration = Math.random() * 20 + 15 + "s"
    particle.style.animationDelay = Math.random() * 10 + "s"
    particle.style.width = Math.random() * 4 + 2 + "px"
    particle.style.height = particle.style.width
    particlesContainer.appendChild(particle)
  }

  const typingElement = document.getElementById("typingName")
  const textToType = "Kaz Tran"
  let charIndex = 0

  function typeText() {
    if (charIndex < textToType.length) {
      typingElement.textContent += textToType.charAt(charIndex)
      charIndex++
      setTimeout(typeText, 100)
    } else {
      typingElement.style.borderRight = "none"
    }
  }

  setTimeout(typeText, 500)

  // Music Player – floating button toggles mute
  const bgMusic = document.getElementById("bgMusic")
  const musicPlayerBtn = document.getElementById("musicPlayerBtn")
  const muteOverlay = document.getElementById("muteOverlay")

  bgMusic.volume = 0.3

  // Auto-play on first user interaction (browsers block autoplay)
  function startPlayback() {
    bgMusic.play().catch(() => { })
    document.removeEventListener("click", startPlayback)
    document.removeEventListener("touchstart", startPlayback)
  }
  document.addEventListener("click", startPlayback)
  document.addEventListener("touchstart", startPlayback)

  // Tap floating button → mute / unmute
  musicPlayerBtn.addEventListener("click", () => {
    bgMusic.muted = !bgMusic.muted
    muteOverlay.classList.toggle("hidden", !bgMusic.muted)
    musicPlayerBtn.style.opacity = bgMusic.muted ? "0.6" : "1"
  })

  // Cursor glow effect
  const cursorGlow = document.querySelector(".cursor-glow")

  document.addEventListener("mousemove", (e) => {
    cursorGlow.style.left = e.clientX + "px"
    cursorGlow.style.top = e.clientY + "px"
  })

  const revealElements = document.querySelectorAll(".reveal")
  const revealItems = document.querySelectorAll(".reveal-item")

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active")
        }
      })
    },
    { threshold: 0.1, rootMargin: "-50px" },
  )

  revealElements.forEach((el) => revealObserver.observe(el))

  const itemObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add("visible")
          }, index * 100)
        }
      })
    },
    { threshold: 0.1 },
  )

  revealItems.forEach((el) => itemObserver.observe(el))

  const counters = document.querySelectorAll(".counter")

  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const target = Number.parseInt(entry.target.dataset.target)
          const counterValue = entry.target.querySelector(".counter-value")
          let current = 0
          const increment = target / 50
          const duration = 1500
          const stepTime = duration / 50

          const updateCounter = () => {
            current += increment
            if (current < target) {
              counterValue.textContent = Math.floor(current).toLocaleString()
              setTimeout(updateCounter, stepTime)
            } else {
              counterValue.textContent = target >= 1000 ? (target / 1000).toFixed(1) + "k" : target
            }
          }

          updateCounter()
          counterObserver.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.5 },
  )

  counters.forEach((counter) => counterObserver.observe(counter))

  const tiltCards = document.querySelectorAll(".tilt-card")

  tiltCards.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      const centerX = rect.width / 2
      const centerY = rect.height / 2
      const rotateX = (y - centerY) / 20
      const rotateY = (centerX - x) / 20

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`
    })

    card.addEventListener("mouseleave", () => {
      card.style.transform = "perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)"
    })
  })

  const magneticButtons = document.querySelectorAll(".magnetic-button")

  magneticButtons.forEach((button) => {
    button.addEventListener("mousemove", (e) => {
      const rect = button.getBoundingClientRect()
      const x = e.clientX - rect.left - rect.width / 2
      const y = e.clientY - rect.top - rect.height / 2

      button.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`
    })

    button.addEventListener("mouseleave", () => {
      button.style.transform = "translate(0, 0)"
    })
  })

  const rippleButtons = document.querySelectorAll(".ripple-button")

  rippleButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      const rect = button.getBoundingClientRect()
      const ripple = document.createElement("span")
      ripple.className = "ripple"
      ripple.style.left = e.clientX - rect.left + "px"
      ripple.style.top = e.clientY - rect.top + "px"
      button.appendChild(ripple)

      setTimeout(() => ripple.remove(), 600)
    })
  })

  // Active navigation on scroll
  const sections = document.querySelectorAll(".section")
  const navLinks = document.querySelectorAll(".nav-link")

  const observerOptions = {
    root: null,
    rootMargin: "-20% 0px -70% 0px",
    threshold: 0,
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const sectionId = entry.target.getAttribute("id")

        navLinks.forEach((link) => {
          link.classList.remove("active")
          if (link.getAttribute("data-section") === sectionId) {
            link.classList.add("active")
          }
        })
      }
    })
  }, observerOptions)

  sections.forEach((section) => {
    observer.observe(section)
  })

  // Smooth scroll for navigation links
  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault()
      const targetId = link.getAttribute("href")
      const targetSection = document.querySelector(targetId)

      if (targetSection) {
        targetSection.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      }
    })
  })

  const scrollToTopBtn = document.getElementById("scrollToTop")
  const scrollProgress = document.getElementById("scrollProgress")

  // Show/hide button based on scroll position
  function updateScrollButton() {
    const scrollTop = window.scrollY
    const docHeight = document.documentElement.scrollHeight - window.innerHeight
    const scrollPercent = (scrollTop / docHeight) * 100

    // Show button after scrolling 300px
    if (scrollTop > 300) {
      scrollToTopBtn.classList.add("visible")
    } else {
      scrollToTopBtn.classList.remove("visible")
    }

    // Update circular progress indicator (100 - percent because stroke-dashoffset works inversely)
    const scrollOffset = 100 - scrollPercent
    scrollProgress.style.setProperty("--scroll-progress", scrollOffset)
  }

  // Smooth scroll to top with animation
  function scrollToTop() {
    scrollToTopBtn.classList.add("launching")

    // Easing function for smooth scroll
    const scrollDuration = 800
    const scrollStart = window.scrollY
    const startTime = performance.now()

    function easeOutCubic(t) {
      return 1 - Math.pow(1 - t, 3)
    }

    function animateScroll(currentTime) {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / scrollDuration, 1)
      const easeProgress = easeOutCubic(progress)

      window.scrollTo(0, scrollStart * (1 - easeProgress))

      if (progress < 1) {
        requestAnimationFrame(animateScroll)
      } else {
        scrollToTopBtn.classList.remove("launching")
      }
    }

    requestAnimationFrame(animateScroll)
  }

  window.addEventListener("scroll", updateScrollButton, { passive: true })
  scrollToTopBtn.addEventListener("click", scrollToTop)

  // Initial check
  updateScrollButton()
})
