const palavrasEDicas = [
    { palavra: "DINOSSAURO", dica: "Animal pré-histórico gigante." },
    { palavra: "COMPUTADOR", dica: "Usado para programar." },
    { palavra: "PRATELEIRA", dica: "Objeto para guardar livros ou itens." },
    { palavra: "GIRASSOL", dica: "Uma flor que segue o sol." },
    { palavra: "MOTOCICLETA", dica: "Um veículo de duas rodas." },
    { palavra: "CASTELO", dica: "Onde moram reis e rainhas." },
    { palavra: "RELAMPAGO", dica: "Acompanha o trovão." },
    { palavra: "ESCRITORIO", dica: "Lugar de trabalho." },
    { palavra: "AVIADOR", dica: "Piloto de aeronaves." },
    { palavra: "MONTANHA", dica: "Topo elevado da terra." },
    { palavra: "MICROSCOPIO", dica: "Usado para observar microorganismos." },
    { palavra: "TELEFONE", dica: "Equipamento usado para se comunicar à distância." },
    { palavra: "ARCOIRIS", dica: "Fenômeno colorido no céu após a chuva." },
    { palavra: "ALFABETO", dica: "Conjunto de letras." },
    { palavra: "ELEITORAL", dica: "Relacionada à votação." },
    { palavra: "EQUILIBRIO", dica: "Estado de estabilidade." },
    { palavra: "BIBLIOTECA", dica: "Lugar cheio de livros." },
    { palavra: "VULCAO", dica: "Libera lava e fumaça." },
    { palavra: "PLANETA", dica: "Parte do sistema solar." },
    { palavra: "LANTERNA", dica: "Ilumina no escuro." },
    { palavra: "ELEFANTE", dica: "Maior animal terrestre." },
    { palavra: "BRASIL", dica: "País com a maior floresta tropical do mundo." },
    { palavra: "AMARELO", dica: "Cor do sol." },
    { palavra: "LIMONADA", dica: "Bebida feita com frutas cítricas." }
];

let palavraAtual = "";
let dicaAtual = "";
let palavraOculta = [];
let letrasUsadas = [];
let letrasErradas = [];
let erros = 0;

const canvas = document.querySelector("#tabuleiro");
const pincel = canvas.getContext("2d");
const tracinhosDiv = document.querySelector("#tracinhos");
const tecladoVirtual = document.querySelector("#teclado-virtual");
const erradasSpan = document.querySelector("#erradas");

function gerarTeclado() {
    tecladoVirtual.innerHTML = "";
    const letras = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    for (const letra of letras) {
        const botao = document.createElement("button");
        botao.classList.add("tecla");
        botao.textContent = letra;
        botao.addEventListener("click", () => {
            verificarLetra(letra);
        });
        tecladoVirtual.appendChild(botao);
    }
}

function desenhaTracinhos() {
    tracinhosDiv.textContent = palavraOculta.join(" ");
}

function desenhaForcaParte() {
    pincel.strokeStyle = "#ff0066";
    pincel.lineWidth = 4;
    
    switch (erros) {
        case 1:
            pincel.beginPath();
            pincel.moveTo(50, 350);
            pincel.lineTo(150, 350);
            pincel.stroke();
            break;
        case 2:
            pincel.beginPath();
            pincel.moveTo(100, 350);
            pincel.lineTo(100, 50);
            pincel.stroke();
            break;
        case 3:
            pincel.beginPath();
            pincel.moveTo(100, 50);
            pincel.lineTo(250, 50);
            pincel.stroke();
            break;
        case 4:
            pincel.beginPath();
            pincel.moveTo(250, 50);
            pincel.lineTo(250, 100);
            pincel.stroke();
            break;
        case 5:
            pincel.beginPath();
            pincel.arc(250, 125, 25, 0, 2 * Math.PI);
            pincel.stroke();
            break;
        case 6:
            pincel.beginPath();
            pincel.moveTo(250, 150);
            pincel.lineTo(250, 250);
            pincel.stroke();
            break;
        case 7:
            pincel.beginPath();
            pincel.moveTo(250, 170);
            pincel.lineTo(200, 220);
            pincel.stroke();
            break;
        case 8:
            pincel.beginPath();
            pincel.moveTo(250, 170);
            pincel.lineTo(300, 220);
            pincel.stroke();
            break;
        case 9:
            pincel.beginPath();
            pincel.moveTo(250, 250);
            pincel.lineTo(200, 300);
            pincel.stroke();
            break;
        case 10:
            pincel.beginPath();
            pincel.moveTo(250, 250);
            pincel.lineTo(300, 300);
            pincel.stroke();
            document.querySelector("#mensagem").textContent = "Você perdeu! A palavra era: " + palavraAtual;
            break;
    }
}

function iniciarJogo() {
    const sorteio = palavrasEDicas[Math.floor(Math.random() * palavrasEDicas.length)];
    palavraAtual = sorteio.palavra;
    dicaAtual = sorteio.dica;
    palavraOculta = Array(palavraAtual.length).fill("_");
    letrasUsadas = [];
    letrasErradas = [];
    erros = 0;

    document.querySelector(".dica").textContent = `Dica: ${dicaAtual}`;
    document.querySelector("#mensagem").textContent = "";
    erradasSpan.textContent = "";

    pincel.clearRect(0, 0, canvas.width, canvas.height);
    gerarTeclado();
    desenhaTracinhos();
}

function verificarLetra(letra) {
    if (letrasUsadas.includes(letra)) {
        document.querySelector("#mensagem").textContent = "Letra já usada!";
        return;
    }

    letrasUsadas.push(letra);

    if (palavraAtual.includes(letra)) {
        for (let i = 0; i < palavraAtual.length; i++) {
            if (palavraAtual[i] === letra) {
                palavraOculta[i] = letra;
            }
        }
    } else {
        letrasErradas.push(letra);
        erradasSpan.textContent = letrasErradas.join(", ");
        erros++;
        desenhaForcaParte();
    }

    desenhaTracinhos();

    if (!palavraOculta.includes("_")) {
        document.querySelector("#mensagem").textContent = "Parabéns! Você ganhou!";
    }
}

document.querySelector("#reiniciar").addEventListener("click", iniciarJogo);

iniciarJogo();
