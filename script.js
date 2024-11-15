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

// Fecha o Navbar caso esteja ativo (menu aberto)
const closeNav = () => {
    if (navbar.classList.contains("active")) {
        navbar.classList.remove("active");
    }
};

// Adiciona eventos de clique nos links do Navbar
// Faz o scroll suave até o elemento alvo e fecha o menu
addEventOnElements(navbarLinks, "click", (event) => {
    event.preventDefault(); // Previne o comportamento padrão do link
    const targetId = event.target.getAttribute("href"); // Obtém o ID do alvo
    const targetElement = document.querySelector(targetId); // Seleciona o alvo no DOM

    if (targetElement) {
        const offset = 100; // Ajuste de deslocamento
        const elementPosition = targetElement.offsetTop - offset; // Calcula a posição
        window.scrollTo({
            top: elementPosition,
            behavior: "smooth" // Rolagem suave
        });
    }
    closeNav(); // Fecha o menu após clicar em um link
});

// ============================
// Animação do Header ao Scroll
// ============================

// Seleciona o cabeçalho
const header = document.querySelector("[data-header]");

// Adiciona a classe "active" ao Header quando o scroll passa de 100px
window.addEventListener("scroll", () => {
    header.classList.toggle("active", window.scrollY > 100);
});

// ============================
// Estrutura de Dados dos Posts
// ============================
/**
 * Contém informações sobre os posts do blog, incluindo título, descrição, e conteúdo adicional.
 */
const postsData = [
    {
        id: 1,
        title: "Comandos Básicos do Git",
        date: "Publicado em: 30/09/2024",
        image: "#",
        description: "Este post apresenta um guia rápido dos comandos mais essenciais do Git para quem está começando.",
        extraContent: `
        <p>Veja abaixo uma lista dos principais comandos básicos do Git, úteis para controle de versão e colaboração:</p>
        <div class="git-command-list">
            <div class="git-command"><code>git init</code><p>Inicia um novo repositório Git no diretório atual.</p></div>
            <div class="git-command"><code>git clone [url]</code><p>Clona um repositório remoto para o seu diretório local.</p></div>
            <div class="git-command"><code>git add [arquivo]</code><p>Adiciona um arquivo específico ao staging, preparando-o para o commit.</p></div>
            <div class="git-command"><code>git commit -m "mensagem"</code><p>Salva as mudanças no repositório local com uma mensagem descritiva.</p></div>
        </div>
        <p>Para mais detalhes, consulte a <a href="https://git-scm.com/doc" target="_blank">documentação oficial do Git</a>.</p>`
    },
    {
        id: 2,
        title: "GitHub - Software Engineering",
        date: "Publicado em: 01/10/2024",
        image: "#",
        description: "Melhores repositórios no GitHub para estudar Ciência da Computação ou Engenharia de Software.",
        extraContent: `<p>Uma análise dos repositórios mais úteis para engenheiros de software.</p>`
    },
    {
        id: 3,
        title: "Introdução ao JavaScript",
        date: "Publicado em: 05/10/2024",
        image: "#",
        description: "Uma introdução ao JavaScript e seus principais conceitos para iniciantes.",
        extraContent: `<p>Este post cobre os conceitos básicos de JavaScript.</p>`
    }
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
            <p class="date">${post.date}</p>
            <img src="${post.image}" alt="${post.title}" class="post-image">
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
                postElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
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
// Inicialização Geral
// ============================
document.addEventListener("DOMContentLoaded", () => {
    renderPosts();
    setupBackToTopButton();
    observePosts();
});