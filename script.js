const menuButton = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
const greeter = document.querySelector("#greeter");
const greeterClose = document.querySelector("#greeter-close");
const greeterLaunch = document.querySelector("#greeter-launch");
const voiceButton = document.querySelector("#voice-button");
const greeting = "Hello, I'm Raghu. Welcome to my profile! How are you ,Feel free to explore .";

if (menuButton && navLinks) {
  menuButton.addEventListener("click", () => {
    const isOpen = menuButton.getAttribute("aria-expanded") === "true";
    menuButton.setAttribute("aria-expanded", String(!isOpen));
    menuButton.setAttribute("aria-label", isOpen ? "Open menu" : "Close menu");
    navLinks.classList.toggle("is-open", !isOpen);
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.setAttribute("aria-label", "Open menu");
      navLinks.classList.remove("is-open");
    });
  });
}

if (greeter && greeterClose && greeterLaunch) {
  greeterClose.addEventListener("click", () => greeter.classList.add("is-closed"));
  greeterLaunch.addEventListener("click", () => greeter.classList.remove("is-closed"));
}

if (voiceButton) {
  if (!("speechSynthesis" in window)) {
    voiceButton.disabled = true;
    voiceButton.textContent = "VOICE NOT AVAILABLE IN THIS BROWSER";
  } else {
    voiceButton.addEventListener("click", () => {
      window.speechSynthesis.cancel();
      const spokenGreeting = new SpeechSynthesisUtterance(greeting);
      spokenGreeting.lang = "en-IN";
      spokenGreeting.rate = 0.96;
      spokenGreeting.pitch = 1.04;
      spokenGreeting.onend = () => {
        voiceButton.innerHTML = "<span>▶</span> HEAR MY WELCOME";
        voiceButton.setAttribute("aria-pressed", "false");
      };
      voiceButton.innerHTML = "<span>■</span> PLAYING WELCOME";
      voiceButton.setAttribute("aria-pressed", "true");
      window.speechSynthesis.speak(spokenGreeting);
    });
  }
}

document.querySelector("#year").textContent = new Date().getFullYear();
