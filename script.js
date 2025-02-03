// ============================
// Função para adicionar eventos a múltiplos elementos
// ============================
/**
 * Adiciona eventos a uma lista de elementos.
 * @param {NodeList} elements - Lista de elementos DOM.
 * @param {string} eventType - Tipo de evento (ex.: "click").
 * @param {function} callback - Função a ser executada no evento.
 */
const addEventOnElements = (elements, eventType, callback) => {
    elements.forEach(element => element.addEventListener(eventType, callback));
};

// ============================
// Alternador do Navbar no Mobile
// ============================

// Seleciona os elementos do Navbar e botões de alternância
const navbar = document.querySelector("[data-navbar]");
const navTogglers = document.querySelectorAll("[data-nav-toggler]");
const navbarLinks = document.querySelectorAll(".navbar-link");

// Alterna a classe "active" para abrir/fechar o menu
const toggleNav = () => navbar.classList.toggle("active");

// Adiciona o evento de clique aos botões de alternância
addEventOnElements(navTogglers, "click", toggleNav);

// Fecha o Navbar caso esteja ativo (menu aberto) após clicar em um link
const closeNav = () => {
    if (navbar.classList.contains("active")) {
        navbar.classList.remove("active");
    }
};

// Adiciona eventos de clique nos links do Navbar
addEventOnElements(navbarLinks, "click", (event) => {
    event.preventDefault(); // Previne o comportamento padrão do link
    const targetId = event.target.getAttribute("href"); // Obtém o ID do alvo
    const targetElement = document.querySelector(targetId); // Seleciona o alvo no DOM

    if (targetElement) {
        const offset = 100; // Ajuste de deslocamento para header fixo
        const elementPosition = targetElement.offsetTop - offset;
        window.scrollTo({
            top: elementPosition,
            behavior: "smooth" // Rolagem suave
        });
    }
    closeNav(); // Fecha o menu após clicar no link
});

// ============================
// Animação do Header ao Scroll
// ============================

// Seleciona o cabeçalho para manipulação de classes
const header = document.querySelector("[data-header]");

// Adiciona a classe "active" ao Header quando o scroll passa de 100px
window.addEventListener("scroll", () => {
    header.classList.toggle("active", window.scrollY > 100);
});

// ============================
// Estrutura de Dados dos Posts
// ============================
/**
 * Contém informações sobre os posts do blog, incluindo título, descrição e conteúdo adicional.
 */
const postsData = [
    {
        id: 1,
        title: "Principais Tecnologias:",
        date: "Publicado em: 19/11/2024",
        description:  `
        <div class="technologies-icons">
            <i class="fab fa-js-square" style="color: #f7df1e;" title="JavaScript"></i>
            <i class="fab fa-html5" style="color: #e34f26;" title="HTML"></i>
            <i class="fab fa-css3-alt" style="color: #2965f1;" title="CSS"></i>
            <i class="fab fa-cuttlefish" style="color: #00599c;" title="C++/C"></i>
            <i class="fab fa-git-alt" style="color: #f34f29;" title="Git"></i>
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
                    Jogo da Memória.
                </li>
                <li>
                    <i class="fas fa-images" style="color: #2965f1;"></i>
                    Galeria com Filtros
                </li>
                <li>
                    <i class="fas fa-tv" style="color: #1f4b8e;"></i>
                    Clonagem de Paginas.
                </li>
            </ul>
        </div>
        `
    },
    // Outros posts
];

// ============================
// Renderização dos Posts
// ============================
/**
 * Renderiza os posts na página usando os dados de `postsData`.
 */
function renderPosts() {
    const postContainer = document.getElementById("postContainer");

    if (!postContainer) {
        console.error("Elemento 'postContainer' não encontrado no HTML.");
        return;
    }

    postsData.forEach(post => {
        const postElement = document.createElement("article");
        postElement.classList.add("post");
        postElement.setAttribute("data-post-id", post.id);
        postElement.innerHTML = `
            <h2>${post.title}</h2>
            <p>${post.description}</p>
            <div class="extra-content">${post.extraContent}</div>
            <a href="#" class="read-more">Leia mais <span>▼</span></a>
        `;

        const readMoreButton = postElement.querySelector('.read-more');
        const extraContent = postElement.querySelector('.extra-content');

        // Alterna a exibição do conteúdo extra
        readMoreButton.addEventListener('click', (event) => {
            event.preventDefault();

            if (!extraContent.classList.contains('show')) {
                extraContent.classList.add('show');
                readMoreButton.innerHTML = 'Leia menos <span>▲</span>';
            } else {
                extraContent.classList.remove('show');
                readMoreButton.innerHTML = 'Leia mais <span>▼</span>';
                postElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });

        postContainer.appendChild(postElement);
    });
}

// ============================
// Botão "Voltar ao Topo"
// ============================
/**
 * Configura a funcionalidade do botão "Voltar ao Topo".
 */
function setupBackToTopButton() {
    const backToTopButton = document.getElementById("backToTop");

    if (!backToTopButton) {
        console.error("Elemento 'backToTop' não encontrado no HTML.");
        return;
    }

    // Mostra ou oculta o botão com base na rolagem
    window.addEventListener("scroll", () => {
        backToTopButton.classList.toggle("show", window.scrollY > 300);
    });

    // Rola suavemente até o topo ao clicar no botão
    backToTopButton.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
}

// ============================
// Animação dos Posts ao Scroll
// ============================
/**
 * Usa Intersection Observer para exibir os posts de forma sutil ao rolar a página.
 */
function observePosts() {
    const posts = document.querySelectorAll('.post');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    posts.forEach(post => observer.observe(post));
}

// ============================
// Carrossel para Projetos
// ============================
/**
 * Adiciona funcionalidade de navegação ao carrossel.
 */
const carousels = document.querySelectorAll('.carousel');

carousels.forEach((carousel) => {
    const images = carousel.querySelectorAll('.carousel-images .project-image-link');
    const prevButton = carousel.querySelector('.carousel-control.prev');
    const nextButton = carousel.querySelector('.carousel-control.next');
    const totalSlides = images.length;
    let currentSlide = 0;

    // Atualiza o slide visível
    function updateSlide() {
        const offset = -(currentSlide * 100);
        const carouselImages = carousel.querySelector('.carousel-images');
        carouselImages.style.transform = `translateX(${offset}%)`;
    }

    // Navegação "Próximo"
    nextButton.addEventListener('click', () => {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateSlide();
    });

    // Navegação "Anterior"
    prevButton.addEventListener('click', () => {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        updateSlide();
    });
});

// ============================
// Inicialização Geral
// ============================
document.addEventListener("DOMContentLoaded", () => {
    renderPosts();
    setupBackToTopButton();
    observePosts();
});