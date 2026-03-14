// ==============================
// Helpers
// ==============================
const qs = (selector, scope = document) => scope.querySelector(selector);
const qsa = (selector, scope = document) => [...scope.querySelectorAll(selector)];

const addEventOnElements = (elements, eventType, callback) => {
  elements.forEach((element) => element.addEventListener(eventType, callback));
};

// ==============================
// Elementos principais
// ==============================
const navbar = qs("[data-navbar]");
const navTogglers = qsa("[data-nav-toggler]");
const navbarLinks = qsa(".navbar-link");
const header = qs("[data-header]");
const backToTopButton = qs("#backToTop");
const postContainer = qs("#postContainer");

// ==============================
// Navegação
// ==============================
function closeNav() {
  if (!navbar) return;
  navbar.classList.remove("active");
}

function toggleNav() {
  if (!navbar) return;
  navbar.classList.toggle("active");
}

function scrollToSection(targetSelector, offset = 100) {
  const targetElement = qs(targetSelector);

  if (!targetElement) return;

  const elementPosition = targetElement.offsetTop - offset;

  window.scrollTo({
    top: elementPosition,
    behavior: "smooth",
  });
}

function setupNavigation() {
  if (!navbar) return;

  addEventOnElements(navTogglers, "click", toggleNav);

  addEventOnElements(navbarLinks, "click", (event) => {
    const href = event.currentTarget.getAttribute("href");

    if (!href || !href.startsWith("#")) return;

    event.preventDefault();
    scrollToSection(href);
    closeNav();
  });
}

// ==============================
// Header e botão voltar ao topo
// ==============================
function handleScrollEffects() {
  if (header) {
    header.classList.toggle("active", window.scrollY > 100);
  }

  if (backToTopButton) {
    backToTopButton.classList.toggle("show", window.scrollY > 300);
  }
}

function setupBackToTopButton() {
  if (!backToTopButton) return;

  backToTopButton.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}

// ==============================
// Dados dos posts
// ==============================
const postsData = [
  {
    id: 1,
    title: "Principais Tecnologias",
    description: `
    <div class="technologies-icons">
    <i class="fab fa-cuttlefish" style="color:#00599C;" title="C/C++"></i>
    <i class="fab fa-react" style="color:#61DBFB;" title="React"></i>
    <i class="devicon-typescript-plain" style="color:#3178C6;" title="TypeScript"></i>
    <i class="fab fa-node-js" style="color:#68A063;" title="Node.js"></i>
    <i class="devicon-tailwindcss-plain" style="color:#38BDF8;" title="Tailwind"></i>
  </div>
    `,
    extraContent: `
      <p>Exemplos de projetos que podem ser criados com essas tecnologias:</p>
      <div class="projects-list-container">
        <ul class="projects-list">
          <li>
            <i class="fas fa-clock" style="color: #4a90e2;"></i>
            Relógio Digital
          </li>
          <li>
            <i class="fas fa-calculator" style="color: #f7df1e;"></i>
            Calculadora Simples
          </li>
          <li>
            <i class="fas fa-gamepad" style="color: #e34f26;"></i>
            Jogo da Memória
          </li>
          <li>
            <i class="fas fa-images" style="color: #2965f1;"></i>
            Galeria com Filtros
          </li>
          <li>
            <i class="fas fa-tv" style="color: #1f4b8e;"></i>
            Clonagem de Páginas
          </li>
        </ul>
      </div>
    `,
  },
];

// ==============================
// Posts
// ==============================
function createPostElement(post) {
  const postElement = document.createElement("article");
  postElement.classList.add("post");
  postElement.setAttribute("data-post-id", post.id);

  postElement.innerHTML = `
    <h3>${post.title}</h3>
    <div class="post-description">${post.description}</div>
    <div class="extra-content">${post.extraContent}</div>
    <a href="#" class="read-more">Leia mais <span>▼</span></a>
  `;

  const readMoreButton = qs(".read-more", postElement);
  const extraContent = qs(".extra-content", postElement);

  if (readMoreButton && extraContent) {
    readMoreButton.addEventListener("click", (event) => {
      event.preventDefault();

      const isExpanded = extraContent.classList.contains("show");

      extraContent.classList.toggle("show", !isExpanded);
      readMoreButton.innerHTML = isExpanded
        ? 'Leia mais <span>▼</span>'
        : 'Leia menos <span>▲</span>';

      if (isExpanded) {
        postElement.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  }

  return postElement;
}

function renderPosts() {
  if (!postContainer) return;

  postContainer.innerHTML = "";

  postsData.forEach((post) => {
    const postElement = createPostElement(post);
    postContainer.appendChild(postElement);
  });
}

// ==============================
// Observer dos posts
// ==============================
function observePosts() {
  const posts = qsa(".post");

  if (!posts.length) return;

  const observer = new IntersectionObserver(
    (entries, currentObserver) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        entry.target.classList.add("show");
        currentObserver.unobserve(entry.target);
      });
    },
    { threshold: 0.2 }
  );

  posts.forEach((post) => observer.observe(post));
}

// ==============================
// Carrossel
// ==============================
function setupCarousel(carousel) {
  const carouselImages = qs(".carousel-images", carousel);
  const images = qsa(".carousel-images .project-image-link", carousel);
  const prevButton = qs(".carousel-control.prev", carousel);
  const nextButton = qs(".carousel-control.next", carousel);

  if (!carouselImages || !images.length || !prevButton || !nextButton) return;

  let currentSlide = 0;
  const totalSlides = images.length;

  function updateSlide() {
    const offset = -(currentSlide * 100);
    carouselImages.style.transform = `translateX(${offset}%)`;
  }

  nextButton.addEventListener("click", () => {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateSlide();
  });

  prevButton.addEventListener("click", () => {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    updateSlide();
  });
}

function setupCarousels() {
  const carousels = qsa(".carousel");
  carousels.forEach(setupCarousel);
}

// ==============================
// Inicialização
// ==============================
document.addEventListener("DOMContentLoaded", () => {
  setupNavigation();
  renderPosts();
  observePosts();
  setupCarousels();
  setupBackToTopButton();
  handleScrollEffects();

  window.addEventListener("scroll", handleScrollEffects);
});