// Função para mostrar o modal
function openModal(postId) {
    const modal = document.getElementById('postModal');
    const modalTitle = document.getElementById('modal-title');
    const modalDate = document.getElementById('modal-date');
    const modalImage = document.getElementById('modal-image');
    const modalDescription = document.getElementById('modal-description');

    // Dados do post (simulação, você pode substituir por dados reais)
    const posts = {
        1: {
            title: "Título do Post 1",
            date: "Publicado em: 01/01/2024",
            image: "image1.jpg",
            description: "Descrição completa do Post 1. Lorem ipsum dolor sit amet."
        },
        2: {
            title: "Título do Post 2",
            date: "Publicado em: 02/01/2024",
            image: "image2.jpg",
            description: "Descrição completa do Post 2. Lorem ipsum dolor sit amet."
        },
        3: {
            title: "Título do Post 3",
            date: "Publicado em: 03/01/2024",
            image: "image3.jpg",
            description: "Descrição completa do Post 3. Lorem ipsum dolor sit amet."
        }
    };

    // Preencher o modal com os dados do post
    const post = posts[postId];
    modalTitle.textContent = post.title;
    modalDate.textContent = post.date;
    modalImage.src = post.image;
    modalImage.alt = post.title;
    modalDescription.textContent = post.description;

    modal.style.display = "block"; // Exibir o modal
}

// Função para fechar o modal
function closeModal() {
    const modal = document.getElementById('postModal');
    modal.style.display = "none"; // Ocultar o modal
}

// Adicionar eventos para os botões de "Leia mais"
document.querySelectorAll('.read-more').forEach(button => {
    button.addEventListener('click', function(event) {
        event.preventDefault(); // Evitar o comportamento padrão do link
        const postId = this.closest('.post').getAttribute('data-post-id');
        openModal(postId); // Abrir o modal com o ID do post
    });
});

// Evento para fechar o modal ao clicar no botão de fechar
document.querySelector('.close-button').addEventListener('click', closeModal);

// Fechar o modal ao clicar fora do conteúdo do modal
window.addEventListener('click', function(event) {
    const modal = document.getElementById('postModal');
    if (event.target === modal) {
        closeModal();
    }
});

// Animação para os posts ao entrar na tela
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
