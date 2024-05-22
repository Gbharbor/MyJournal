// Add event listener on multiple elements
//A função addEventOnElements é uma forma conveniente de adicionar o mesmo evento a vários elementos DOM de uma só vez. Em vez de adicionar o evento individualmente a cada elemento, você pode passar uma lista de elementos e adicionar o evento a todos eles com um único comando.
const addEventOnElements = function (elements, eventType, callback) {
    for (let i = 0, len = elements.length; i < len; i++) {
        elements[i].addEventListener(eventType, callback);
    };
};

/* Mobile navbar toggler */
const navbar = document.querySelector("[data-navbar]");
const navTogglers = document.querySelectorAll("[data-nav-toggler]");
const toggleNav = () => navbar.classList.toggle("active");
addEventOnElements(navTogglers, "click", toggleNav);

//HEADER ANIMATION
//when scrolled down to 100px header will be active
//Este código faz com que a classe "active" seja adicionada ao elemento header quando a página é rolada para baixo mais de 100 pixels. Quando a página é rolada de volta para cima, e a posição de rolagem é 100 pixels ou menos, a classe "active" é removida do elemento header.
//Essa técnica é comum para alterar a aparência de um cabeçalho (header) conforme o usuário rola a página, como adicionar um fundo diferente, alterar a opacidade, ou qualquer outro estilo associado à classe "active".
const header = document.querySelector("[data-header]");
window.addEventListener("scroll", () =>{
    if (window.scrollY > 100) {
        header.classList.add("active");
    } else {
        header.classList.remove("active");
    }
});