// Função para adicionar um evento a múltiplos elementos
// Útil para atribuir o mesmo evento a vários botões, links, etc.
const addEventOnElements = (elements, eventType, callback) => {
    elements.forEach(element => element.addEventListener(eventType, callback));
};

/* Alternador do navbar no mobile */
// Seleciona o navbar e elementos que acionam a abertura/fechamento do menu no mobile
const navbar = document.querySelector("[data-navbar]");
const navTogglers = document.querySelectorAll("[data-nav-toggler]");
const navbarLinks = document.querySelectorAll(".navbar-link"); // Seleciona todos os links do menu

// Função para alternar a visibilidade do menu
const toggleNav = () => navbar.classList.toggle("active");
addEventOnElements(navTogglers, "click", toggleNav);

/* Função para fechar o menu */
// Fecha o menu caso ele esteja ativo
const closeNav = () => {
    if (navbar.classList.contains("active")) {
        navbar.classList.remove("active");
    }
};

// Adiciona o evento de clique aos links do menu
// Fecha o navbar ao selecionar uma opção e realiza scroll suave até o alvo
addEventOnElements(navbarLinks, "click", (event) => {
    event.preventDefault();
    const targetId = event.target.getAttribute("href");
    const targetElement = document.querySelector(targetId);

    if (targetElement) {
        const offset = 100; // Ajuste para compensar a altura do header
        const elementPosition = targetElement.offsetTop - offset;
        window.scrollTo({
            top: elementPosition,
            behavior: "smooth"
        });
    }

    closeNav(); // Fecha o menu após o clique em uma opção
});

/* Animação do Header ao rolar a página */
// Adiciona uma classe ao header quando o usuário rola a página para baixo
const header = document.querySelector("[data-header]");
window.addEventListener("scroll", () => {
    header.classList.toggle("active", window.scrollY > 100);
});

/* Função para mostrar o modal de post */
// Exibe o modal com informações do post clicado usando o postId para identificar o conteúdo
function openModal(postId) {
    const modal = document.getElementById('postModal');
    const modalTitle = document.getElementById('modal-title');
    const modalDate = document.getElementById('modal-date');
    const modalImage = document.getElementById('modal-image');
    const modalDescription = document.getElementById('modal-description');

    // Dados dos posts, associados a cada postId
    const posts = {
        1: {
            title: "Welcome to my new world: first posts bout GIT.GITHUB",
            date: "Publicado em: 30/09/2024",
            image: "image1.jpg",
            description: "Resumo completo e prático para entender de vez como utilizar as principais funcionalidades do git & github."
        },
        2: {
            title: "Explorando JavaScript: Truques e Dicas Essenciais",
            date: "Publicado em: 15/10/2024",
            image: "image2.jpg",
            description: "Descubra truques e dicas de JavaScript que ajudam a otimizar o desenvolvimento e trazer maior eficiência ao seu código."
        },
        3: {
            title: "CSS Avançado: Transformando seu Design com Animações",
            date: "Publicado em: 01/11/2024",
            image: "image3.jpg",
            description: "Aprenda como usar animações CSS para melhorar a experiência do usuário, tornando seu design mais dinâmico e interativo."
        }
    };

    // Verifica se o postId existe e atualiza o conteúdo do modal
    const post = posts[postId];
    if (post) {
        modalTitle.textContent = post.title;
        modalDate.textContent = post.date;
        modalImage.src = post.image;
        modalImage.alt = post.title;
        modalDescription.textContent = post.description;
        modal.style.display = "block";
    }
}

/* Função para fechar o modal */
// Oculta o modal quando acionado
function closeModal() {
    const modal = document.getElementById('postModal');
    modal.style.display = "none";
}

/* Animação para os posts ao rolar a página */
// Adiciona a classe 'show' aos posts à medida que eles entram na área visível da tela
const posts = document.querySelectorAll('.post');
window.addEventListener('scroll', function() {
    posts.forEach(post => {
        const postPosition = post.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.5;
        if (postPosition < screenPosition) {
            post.classList.add('show');
        }
    });
});

document.querySelectorAll('.read-more').forEach(button => {
    button.addEventListener('click', function(event) {
        event.preventDefault();

        const post = this.closest('.post');
        const extraContent = post.querySelector('.extra-content');

        // Alterna a exibição do conteúdo extra
        if (extraContent) {
            extraContent.classList.toggle('expanded');

            // Alterna o texto e a seta
            if (extraContent.classList.contains('expanded')) {
                this.innerHTML = 'Leia menos <span>▲</span>';
            } else {
                this.innerHTML = 'Leia mais <span>▼</span>';
            }
            
            // Rola suavemente de volta para o início do post expandido
            post.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// Exibir o botão ao rolar para baixo
const backToTopButton = document.getElementById("backToTop");

window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
        backToTopButton.classList.add("show");
    } else {
        backToTopButton.classList.remove("show");
    }
});

// Rolar suavemente até o topo ao clicar
backToTopButton.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});