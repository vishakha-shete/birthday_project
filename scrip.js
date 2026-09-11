/* =========================================
   BACKGROUND PARTICLES
========================================= */

const canvas = document.getElementById("bgCanvas");
const ctx = canvas.getContext("2d");

let particles = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

resizeCanvas();

window.addEventListener("resize", resizeCanvas);

for (let i = 0; i < 70; i++) {
  particles.push({
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    size: Math.random() * 2 + 1,
    speed: Math.random() * 0.5 + 0.2,
    opacity: Math.random()
  });
}

function animateParticles() {

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach(p => {

    p.y -= p.speed;

    if (p.y < 0) {
      p.y = canvas.height;
      p.x = Math.random() * canvas.width;
    }

    ctx.beginPath();

    ctx.arc(
      p.x,
      p.y,
      p.size,
      0,
      Math.PI * 2
    );

    ctx.fillStyle =
      `rgba(255,255,255,${p.opacity})`;

    ctx.fill();

  });

  requestAnimationFrame(animateParticles);
}

animateParticles();


/* =========================================
   TYPING EFFECT
========================================= */

const typedText = document.getElementById("typedText");

const messages = [
  "A little surprise made with ♥ by Vishakha...",
  "For my favorite human in this universe...",
  "For the friendship I can never fully explain...",
  "Happy Birthday, Prashuuuu 💗"
];

let messageIndex = 0;
let charIndex = 0;

function typeMessage() {

  const message = messages[messageIndex];

  if (charIndex < message.length) {

    typedText.textContent += message.charAt(charIndex);

    charIndex++;

    setTimeout(typeMessage, 60);

  } else {

    setTimeout(() => {

      typedText.textContent = "";

      charIndex = 0;

      messageIndex =
        (messageIndex + 1) % messages.length;

      typeMessage();

    }, 2000);
  }
}

typedText.textContent = "";
typeMessage();


/* =========================================
   AUTO PLAY BIRTHDAY MUSIC
========================================= */

const music = document.getElementById("bgMusic");
const musicButton = document.getElementById("toggleMusic");

let musicPlaying = false;


/* Try to start music immediately */

window.addEventListener("load", async () => {

  try {

    await music.play();

    musicPlaying = true;

    musicButton.textContent = "🔇 Stop Music";

  } catch (error) {

    /*
      Browser blocked autoplay.
      Start music on the visitor's first interaction.
    */

    const startMusic = async () => {

      try {

        await music.play();

        musicPlaying = true;

        musicButton.textContent = "🔇 Stop Music";

      } catch (error) {
        console.log("Music could not start.");
      }

      document.removeEventListener("click", startMusic);
      document.removeEventListener("touchstart", startMusic);
      document.removeEventListener("keydown", startMusic);

    };

    document.addEventListener("click", startMusic);
    document.addEventListener("touchstart", startMusic);
    document.addEventListener("keydown", startMusic);

  }

});


/* =========================================
   MUSIC BUTTON
========================================= */

musicButton.addEventListener("click", async () => {

  if (!musicPlaying) {

    try {

      await music.play();

      musicPlaying = true;

      musicButton.textContent = "🔇 Stop Music";

    } catch (error) {

      console.log("Unable to play music.");

    }

  } else {

    music.pause();

    musicPlaying = false;

    musicButton.textContent = "🎵 Birthday Music";

  }

});

/* =========================================
   OPEN SURPRISE
========================================= */

const entranceButton =
  document.getElementById("playEntrance");

entranceButton.addEventListener("click", () => {

  document
    .getElementById("secretMessage")
    .scrollIntoView({
      behavior: "smooth"
    });

  createHearts();

});


/* =========================================
   SECRET MESSAGE
========================================= */

const revealButton =
  document.getElementById("revealMessage");

const hiddenMessage =
  document.getElementById("hiddenMessage");

revealButton.addEventListener("click", () => {

  hiddenMessage.classList.add("show");

  revealButton.textContent =
    "I hope you know this already... 🥹💗";

  createHearts();

});


/* =========================================
   WISH WALL
========================================= */

const wishInput =
  document.getElementById("wishInput");

const addWishButton =
  document.getElementById("addWishBtn");

const wishWall =
  document.getElementById("wishWall");

function addWish() {

  const text =
    wishInput.value.trim();

  if (!text) return;

  const wish =
    document.createElement("div");

  wish.className = "wish";

  wish.textContent =
    "💗 " + text;

  wishWall.appendChild(wish);

  wishInput.value = "";

}

addWishButton.addEventListener(
  "click",
  addWish
);

wishInput.addEventListener(
  "keydown",
  event => {

    if (event.key === "Enter") {
      addWish();
    }

  }
);


/* =========================================
   SLIDESHOW
========================================= */

const slides =
  document.querySelectorAll(".slide");

const nextButton =
  document.getElementById("nextSlide");

const prevButton =
  document.getElementById("prevSlide");

const counter =
  document.getElementById("slideCounter");

let currentSlide = 0;

function showSlide(index) {

  slides.forEach(slide => {
    slide.classList.remove("active");
  });

  slides[index].classList.add("active");

  counter.textContent =
    `${index + 1} / ${slides.length}`;

}

nextButton.addEventListener("click", () => {

  currentSlide++;

  if (currentSlide >= slides.length) {
    currentSlide = 0;
  }

  showSlide(currentSlide);

});

prevButton.addEventListener("click", () => {

  currentSlide--;

  if (currentSlide < 0) {
    currentSlide = slides.length - 1;
  }

  showSlide(currentSlide);

});


/* Automatic slideshow */

setInterval(() => {

  currentSlide++;

  if (currentSlide >= slides.length) {
    currentSlide = 0;
  }

  showSlide(currentSlide);

}, 4000);


/* =========================================
   MAGICAL SURPRISE
========================================= */

const surpriseButton =
  document.getElementById("surpriseBtn");

const finalSurprise =
  document.getElementById("finalSurprise");

surpriseButton.addEventListener("click", () => {

  finalSurprise.classList.add("show");

  setTimeout(() => {

    finalSurprise.scrollIntoView({
      behavior: "smooth"
    });

  }, 200);

  createHearts();

});


/* =========================================
   PASSWORD → BIRTHDAY LETTER
========================================= */

const passwordForm =
  document.getElementById("passwordForm");

const passwordInput =
  document.getElementById("passwordInput");

const passwordMessage =
  document.getElementById("passwordMessage");

const birthdayLetter =
  document.getElementById("birthdayLetter");


/* YOUR SECRET WORD */

const MAGIC_WORD = "prashu";


passwordForm.addEventListener("submit", event => {

  event.preventDefault();


  const entered =
    passwordInput.value
      .trim()
      .toLowerCase();


  /* =========================================
     CORRECT PASSWORD
  ========================================== */

  if (entered === MAGIC_WORD) {

    passwordMessage.textContent =
      "✨ You found it... this one is only for you. 💗";


    /* Hide password form */

    passwordForm.style.display = "none";


    /* Show birthday letter */

    birthdayLetter.classList.add("show");


    /* Celebration */

    createHearts();


    /* Scroll to letter */

    setTimeout(() => {

      birthdayLetter.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });

    }, 400);


  }


  /* =========================================
     WRONG PASSWORD
  ========================================== */

  else {

    passwordMessage.textContent =
      "Nopeee 👀 That's not it... try again, my girl! 💗";


    passwordInput.value = "";

    passwordInput.focus();

  }

});


/* =========================================
   IMAGE LIGHTBOX
========================================= */

const lightbox =
  document.getElementById("lightbox");

const lightboxImage =
  document.getElementById("lightboxImage");

const closeLightbox =
  document.getElementById("lightboxClose");

const galleryImages =
  document.querySelectorAll(".gallery-image");

galleryImages.forEach(image => {

  image.addEventListener("click", () => {

    lightboxImage.src =
      image.src;

    lightbox.classList.add("show");

  });

});

closeLightbox.addEventListener(
  "click",
  () => {

    lightbox.classList.remove("show");

  }
);

lightbox.addEventListener(
  "click",
  event => {

    if (event.target === lightbox) {

      lightbox.classList.remove("show");

    }

  }
);


/* =========================================
   FLOATING HEARTS
========================================= */

function createHearts() {

  for (let i = 0; i < 15; i++) {

    const heart =
      document.createElement("div");

    heart.textContent =
      ["💗", "💕", "💖", "✨", "💝"][
        Math.floor(Math.random() * 5)
      ];

    heart.style.position = "fixed";

    heart.style.left =
      Math.random() * 100 + "%";

    heart.style.bottom = "-30px";

    heart.style.fontSize =
      Math.random() * 20 + 15 + "px";

    heart.style.zIndex = "99999";

    heart.style.pointerEvents = "none";

    heart.style.transition =
      "transform 4s ease, opacity 4s ease";

    document.body.appendChild(heart);

    requestAnimationFrame(() => {

      heart.style.transform =
        `translateY(-${window.innerHeight + 100}px) rotate(${Math.random() * 360}deg)`;

      heart.style.opacity = "0";

    });

    setTimeout(() => {

      heart.remove();

    }, 4500);

  }

}