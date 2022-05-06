
let order = []; //Setar as ordens aleatórias do jogo
let clickedOrder = [] //Setar a ordem dos cliques
let score = 0;

//Cada ponto/cor terá uma ordem diferente

//0 = verde
//1 = vermelho
//2 = amarelo
//3 = azul

const blue = document.querySelector('.blue'); //Recuperando a classe
const red = document.querySelector('.red');
const green = document.querySelector('.green');
const yellow = document.querySelector('.yellow'); 

//Cria ordem aleatória de cores
//Sortear números entre 0 e 3
let shuffleOrder = () => { //Arrow
    let colorOrder = Math.floor(Math.random() * 4); //Armazenar a ordem das cores. Números aleatórios de 0 a 3 com math.random * 4
    order[order.length] = colorOrder; //Atribuindo o índice com a cor que sair na função do colorOrder    //Atribuir o número gera ao próximo número que virá
    clickedOrder = [];

    //Percorrer o array e executar o que for colocado dentro do for
    for(let i in order) {
        let elementColor = createColorElement(order[i]); //Guardar cada cor no índice i de acordo com otamanho da order.
        lightColor(elementColor, Number(i) + 1); //Esse numberi + 1 vai fazer com que ele traga o número + 1 para poder existir na lista de cores. Essa função que vem com ele resgata o elementColor.

    }
}

//Acende a proxima cor
let lightColor = (element, number) => { //Função para executar os botões com a opacidade.
    number = number * 500;
    setTimeout(() => { //Função nativa que configura o tempo das execuções do código.
        element.classList.add('selected'); //Executar a classe selected,a dicionando ela no tempo certo
    }, number - 250); //Executa um código dentro do tempo passado 
    
    setTimeout(() => { 
        element.classList.remove('selected'); //Remover a classe selected dentro do tempo estabelecido
    });
}

//Função para checar se a order clicada pelo usuário foi a mesma executada pelo programa. 
let checkOrder = () => { 
    for(let i in clickedOrder) {
        if(clickedOrder[i] != order[i]) {
            gameOver();
            break;
        }
    }
    if(clickedOrder.length == order.length) {
        alert('Pontuação: ' + score + '\nVocê acertou! Iniciando próximo nível...' );
        nextLevel(); 
    }
}

//Função para o clique do usuário 
let click = (color) => {
    clickedOrder[clickedOrder.length] = color;
    createColorElement(color).classList.add('selected'); //Selecionando o vetor referente ao clique.

    setTimeout(() => { 
    createColorElement(color).classList.remove('selected'); 

    checkOrder(); //Comparar o clique com o que o jogo pediu
    }, 250);

}

//Função que retorna a cor
let createColorElement = (color) => { //Parâmetro será substituído por order[i]
    if(color == 0) {
        return green;
    } else if(color == 1) {
        return red;
    } else if (color == 2) {
        return yellow;
    } else if(color == 3) {
        return blue;
    }
}

//Função para próximo nível do jogo 
let nextLevel = () => {
    score++;
    shuffleOrder();
}

//Função para game over 
let gameOver = () => {
    alert('Pontuação: ' + score + ' Você perdeu!\nClique em OK para iniciar um novo jogo.');
    //Zerando os elementos para iniciar um novo jogo.
    order = [];
    clickedOrder = [];

    playGame();
}

//Função de início do jogo
let playgame = () => {
    alert('Bem-vindo ao genius! Iniciando novo jogo!');
    score = 0; 

    nextLevel();
}

//Funções de callback para unir a função onclick com a click, que criamos.
//Eventos de clique para as cores.
green.onclick = () => click(0);
red.onclick = () => click(1);
yellow.onclick = () => click(2);
blue.onclick = () => click(3);

//Início do jogo.
playgame();