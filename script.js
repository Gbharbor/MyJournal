// Função para adicionar um evento a vários elementos
const addEventOnElements = (elements, eventType, callback) => {
    elements.forEach(element => element.addEventListener(eventType, callback));
};

/* Alternador do navbar no mobile */
const navbar = document.querySelector("[data-navbar]");
const navTogglers = document.querySelectorAll("[data-nav-toggler]");
const navbarLinks = document.querySelectorAll(".navbar-link"); // Seleciona todos os links do menu

const toggleNav = () => navbar.classList.toggle("active");
addEventOnElements(navTogglers, "click", toggleNav);

/* Função para fechar o menu */
const closeNav = () => {
    if (navbar.classList.contains("active")) {
        navbar.classList.remove("active");
    }
};

// Adiciona o evento de clique aos links do menu para fechar o navbar ao selecionar uma opção
addEventOnElements(navbarLinks, "click", (event) => {
    event.preventDefault();
    const targetId = event.target.getAttribute("href");
    const targetElement = document.querySelector(targetId);

    if (targetElement) {
        const offset = 100; // ajuste para a altura do header
        const elementPosition = targetElement.offsetTop - offset;
        window.scrollTo({
            top: elementPosition,
            behavior: "smooth"
        });
    }

    closeNav(); // Fecha o menu após a rolagem
});

/* Animação do Header ao rolar a página */
const header = document.querySelector("[data-header]");
window.addEventListener("scroll", () => {
    header.classList.toggle("active", window.scrollY > 100);
});


/* Função para mostrar o modal de post */
function openModal(postId) {
    const modal = document.getElementById('postModal');
    const modalTitle = document.getElementById('modal-title');
    const modalDate = document.getElementById('modal-date');
    const modalImage = document.getElementById('modal-image');
    const modalDescription = document.getElementById('modal-description');
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
function closeModal() {
    const modal = document.getElementById('postModal');
    modal.style.display = "none";
}

/* Adiciona eventos para abrir o modal ao clicar em "Leia mais" */
document.querySelectorAll('.read-more').forEach(button => {
    button.addEventListener('click', function(event) {
        event.preventDefault();
        const postId = this.closest('.post').getAttribute('data-post-id');
        openModal(postId);
    });
});

/* Fechar o modal ao clicar no botão de fechar */
document.querySelector('.close-button').addEventListener('click', closeModal);

/* Fechar o modal ao clicar fora do conteúdo do modal */
window.addEventListener('click', function(event) {
    const modal = document.getElementById('postModal');
    if (event.target === modal) {
        closeModal();
    }
});

/* Animação para os posts ao rolar a página */
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
