// Função para mostrar o modal
function openModal(projectId) {
    const modal = document.getElementById('projectModal');
    const modalTitle = document.getElementById('modal-title');
    const modalImage = document.getElementById('modal-image');
    const modalDescription = document.getElementById('modal-description');
    const modalLink = document.getElementById('modal-link');

    // Dados do projeto (simulação, você pode substituir por dados reais)
    const projects = {
        1: {
            title: "Título do Projeto 1",
            image: "project1.jpg",
            description: "Descrição completa do Projeto 1. Este projeto envolve...",
            link: "https://link-do-projeto1.com"
        },
        2: {
            title: "Título do Projeto 2",
            image: "project2.jpg",
            description: "Descrição completa do Projeto 2. Este projeto envolve...",
            link: "https://link-do-projeto2.com"
        },
        3: {
            title: "Título do Projeto 3",
            image: "project3.jpg",
            description: "Descrição completa do Projeto 3. Este projeto envolve...",
            link: "https://link-do-projeto3.com"
        }
    };

    // Preencher o modal com os dados do projeto
    const project = projects[projectId];
    modalTitle.textContent = project.title;
    modalImage.src = project.image;
    modalImage.alt = project.title;
    modalDescription.textContent = project.description;
    modalLink.querySelector('a').href = project.link; // Definindo o link do projeto

    modal.style.display = "block"; // Exibir o modal
}

// Função para fechar o modal
function closeModal() {
    const modal = document.getElementById('projectModal');
    modal.style.display = "none"; // Ocultar o modal
}

// Adicionar eventos para os botões de "Ver Mais"
document.querySelectorAll('.view-more').forEach(button => {
    button.addEventListener('click', function(event) {
        event.preventDefault(); // Evitar o comportamento padrão do link
        const projectId = this.closest('.project').getAttribute('data-project-id');
        openModal(projectId); // Abrir o modal com o ID do projeto
    });
});

// Evento para fechar o modal ao clicar no botão de fechar
document.querySelector('.close-button').addEventListener('click', closeModal);

// Fechar o modal ao clicar fora do conteúdo do modal
window.addEventListener('click', function(event) {
    const modal = document.getElementById('projectModal');
    if (event.target === modal) {
        closeModal();
    }
});

// Animação para os projetos ao entrar na tela
const projects = document.querySelectorAll('.project');
window.addEventListener('scroll', function() {
    projects.forEach(project => {
        const projectPosition = project.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.5;
        if (projectPosition < screenPosition) {
            project.style.opacity = '1'; // Torna o projeto visível
        }
    });
});
