const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxCaption = document.getElementById("lightboxCaption");
const closeButton = document.getElementById("lightboxClose");
const prevButton = document.getElementById("lightboxPrev");
const nextButton = document.getElementById("lightboxNext");

const projectImages = Array.from(
  document.querySelectorAll(".project-image img"),
);

let currentImageIndex = 0;

function getProjectTitle(index) {
  const card = projectImages[index].closest(".project-card");
  const overlay = card?.querySelector(".project-overlay span");

  return overlay ? overlay.textContent.trim() : `Проект ${index + 1}`;
}

function showImage(index) {
  currentImageIndex = (index + projectImages.length) % projectImages.length;

  const image = projectImages[currentImageIndex];

  lightboxImage.src = image.src;
  lightboxImage.alt = image.alt || getProjectTitle(currentImageIndex);
  lightboxCaption.textContent = getProjectTitle(currentImageIndex);
}

function openLightbox(index) {
  if (projectImages.length === 0) return;

  showImage(index);
  lightbox.classList.add("is-open");
  lightbox.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
  closeButton.focus();
}

function closeLightbox() {
  lightbox.classList.remove("is-open");
  lightbox.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

projectImages.forEach((image, index) => {
  image.style.cursor = "zoom-in";

  image.addEventListener("click", () => {
    openLightbox(index);
  });
});

closeButton.addEventListener("click", closeLightbox);

prevButton.addEventListener("click", () => {
  showImage(currentImageIndex - 1);
});

nextButton.addEventListener("click", () => {
  showImage(currentImageIndex + 1);
});

lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) {
    closeLightbox();
  }
});

document.addEventListener("keydown", (event) => {
  if (!lightbox.classList.contains("is-open")) return;

  if (event.key === "Escape") {
    closeLightbox();
  }

  if (event.key === "ArrowLeft") {
    showImage(currentImageIndex - 1);
  }

  if (event.key === "ArrowRight") {
    showImage(currentImageIndex + 1);
  }
});

const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");

if (contactForm && formStatus) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!contactForm.reportValidity()) {
      return;
    }

    const submitButton = contactForm.querySelector(".contact-submit");

    formStatus.textContent =
      "Спасибо! Демонстрационная заявка успешно оформлена.";

    formStatus.style.color = "#65765e";

    if (submitButton) {
      submitButton.textContent = "Заявка оформлена ✓";
      submitButton.disabled = true;
    }

    contactForm.reset();
  });
}
