// Evento para o botão de busca
document.querySelector(".busca button").addEventListener('click', buscarClima);

// Evento para pressionar "Enter" no campo de entrada
document.querySelector('#searchInput').addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        event.preventDefault(); // Evita o comportamento padrão de envio do formulário
        buscarClima(); // Dispara a função de busca
    }
});

// Função de busca para reutilizar no botão e no evento "Enter"
async function buscarClima() {
    let input = document.querySelector('#searchInput').value.trim(); // Captura o valor do input
    console.log(input); // Exibe no console o valor digitado pelo usuário

    // Verifica se o campo de input não está vazio
    if (input !== '') { 
        showWarning('Carregando...'); // Exibe a mensagem "Carregando..."

        // Monta a URL para a chamada à API com a cidade informada e a chave da API
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(input)}&appid=42b86d7bc31feccaa916054357552bee&units=metric&lang=pt_br`; 

        try {
            // Faz a requisição à API
            let results = await fetch(url);
            let json = await results.json(); // Converte o resultado para JSON
            console.log(json); // Exibe o JSON no console para depuração

            // Verifica se a resposta é válida (código 200)
            if (json.cod === 200) { 
                // Se válido, exibe as informações de clima e limpa o aviso
                showWarning(''); 
                showInfo({
                    name: json.name,
                    country: json.sys.country, 
                    temp: json.main.temp, 
                    tempIcon: json.weather[0].icon, 
                    windSpeed: json.wind.speed, 
                    //windAngle: json.wind.deg 
                });
            } else if (json.cod === "404") {
                // Se a cidade não for encontrada, exibe aviso de erro
                showWarning('Não encontramos essa localização.');
                clearInfo();
            } else {
                // Exibe uma mensagem genérica para outros tipos de erro
                showWarning('Erro ao buscar informações.');
                clearInfo();
            }
        } catch (error) {
            // Em caso de erro na requisição, exibe o erro
            showWarning('Erro ao buscar informações. Verifique a cidade e tente novamente.');
            clearInfo();
        }
    } else {
        // Exibe aviso para entrada vazia e limpa resultados
        showWarning('Por favor, digite uma cidade!');
        clearInfo(); 
    }
}

// Função para exibir mensagens de aviso
function showWarning(msg) {
    document.querySelector('.aviso').innerHTML = msg;
}

// Função para exibir informações do clima
function showInfo(json) {
    // Atualiza o conteúdo com os dados de clima
    document.querySelector('.titulo').innerHTML = `${json.name}, ${json.country}`;
    document.querySelector('.tempInfo').innerHTML = `${json.temp} <sup>ºC</sup>`;
    document.querySelector('.ventoInfo').innerHTML = `${json.windSpeed} <span>km/h</span>`;
    document.querySelector('.temp img').setAttribute('src', `http://openweathermap.org/img/wn/${json.tempIcon}@2x.png`);
    //document.querySelector('.ventoPonto').style.transform = `rotate(${json.windAngle - 90}deg)`;

    // Torna a caixa de resultados visível
    document.querySelector('.resultado').style.display = 'block';
}

// Função para limpar informações exibidas
function clearInfo() {
    document.querySelector('.resultado').style.display = 'none'; // Oculta a área de resultados
}

// Efeito para placeholder do campo de busca ao focar e desfocar
const searchInput = document.getElementById('searchInput');

searchInput.addEventListener('focus', () => {
    searchInput.setAttribute('data-placeholder', searchInput.getAttribute('placeholder'));
    searchInput.setAttribute('placeholder', ''); 
});

searchInput.addEventListener('blur', () => {
    searchInput.setAttribute('placeholder', searchInput.getAttribute('data-placeholder')); 
});