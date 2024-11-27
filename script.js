const perguntas = [
    {
        pergunta: "Qual o maior animal do mundo?",
        resposta: [
            { text: "Tubarão", correct: false },
            { text: "Baleia azul", correct: true },
            { text: "Elefante", correct: false },
            { text: "Girafa", correct: false }
        ]
    },
    {
        pergunta: "Qual é o menor país do mundo?",
        resposta: [
            { text: "Cidade do Vaticano", correct: true },
            { text: "Butão", correct: false },
            { text: "Nepal", correct: false },
            { text: "Sri Lanka", correct: false }
        ]
    },
    {
        pergunta: "Qual é o maior deserto do mundo?",
        resposta: [
            { text: "Caálari", correct: false },
            { text: "Gobi", correct: false },
            { text: "Saara", correct: false },
            { text: "Antártida", correct: true }
        ]
    },
    {
        pergunta: "Qual é o menor continente do mundo?",
        resposta: [
            { text: "Ásia", correct: false },
            { text: "Áustralia", correct: true },
            { text: "Ártico", correct: false },
            { text: "África", correct: false }
        ]
    }
];

const perguntaElement = document.getElementById("pergunta"); //perguntaElement: Acessa o elemento HTML com o id "pergunta", onde a pergunta será exibida.//
const respostaBotao = document.getElementById("botao-resposta"); //respostaBotao: Acessa o elemento HTML com o id "botao-resposta", onde os botões de respostas serão criados e adicionados.//
const proximoButton = document.getElementById("proximo-btn"); //proximoButton: Acessa o botão HTML com o id "proximo-btn", que será usado para avançar para a próxima pergunta.//

let currentPerguntaIndex = 0; //currentPerguntaIndex: Controle que indica qual pergunta está sendo mostrada no momento. Inicialmente, começa em 0 (primeira pergunta).//
let score = 0; //A variável para armazenar a pontuação do usuário. Começa com 0.//

function startQuiz() {
    currentPerguntaIndex = 0; //Reseta o índice da pergunta para a primeira pergunta//
    score = 0; //Reseta a pontuação para 0//
    proximoButton.innerHTML = "Próximo"; //Configura o texto do botão "Próximo" (botão que o usuário clica para avançar para a próxima pergunta)//
    showPergunta(); //Chama a função showPergunta() que irá exibir a pergunta e as opções de resposta.//
}

function showPergunta() { //A função showPergunta percorreria o array perguntas e exibiria a pergunta e suas opções de resposta.//
    resetState(); //Chama a função resetState() para limpar qualquer estado anterior (como botões de respostas ou ocultar o botão de próximo)//
    let currentPergunta = perguntas[currentPerguntaIndex]; //Acessa a pergunta atual (no array perguntas), usando o índice currentPerguntaIndex//
    let perguntaNo = currentPerguntaIndex + 1; //Calcula o número da pergunta, pois o índice começa em 0 (então a pergunta 1 será mostrada como "1").
    perguntaElement.innerHTML = perguntaNo + ". " + currentPergunta.pergunta; //Exibe a pergunta no elemento HTML com id "pergunta"//

    currentPergunta.resposta.forEach(answer => { //Para cada resposta possível (no array resposta), o código cria um botão para mostrar ao usuário//
        const button = document.createElement("button"); //Cria um novo elemento button para cada resposta.//
        button.innerHTML = answer.text; //Define o texto do botão com a resposta (answer.text)//
        button.classList.add("btn"); //Adiciona a classe CSS "btn" ao botão, para estilizar o botão de acordo com as regras definidas no CSS//
        respostaBotao.appendChild(button); //Adiciona o botão criado ao elemento HTML respostaBotao (onde as respostas serão exibidas)//
        if(answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    })
}

function resetState() {
    proximoButton.style.display = "none"; //Esconde o botão "Próximo" enquanto as respostas estão sendo exibidas.//
    while (respostaBotao.firstChild) {
        respostaBotao.removeChild(respostaBotao.firstChild);
    }
} //Limpa todas as respostas anteriores removendo todos os filhos (botões) do elemento respostaBotao antes de exibir novas respostas. Isso garante que apenas as respostas da pergunta atual apareçam//

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(respostaBotao.children).forEach(button => {
        if(button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    proximoButton.style.display = "block";
}

function showScore() {
    resetState();
    perguntaElement.innerHTML = `Você acertou ${score} de ${perguntas.length}!`;
    proximoButton.innerHTML = "Jogue novamente";
    proximoButton.style.display = "block";
}

function handleProximoButton() {
    currentPerguntaIndex++;
    if(currentPerguntaIndex < perguntas.length) {
        showPergunta();
    }else{
        showScore();
    }
}

proximoButton.addEventListener("click", ()=>{
    if(currentPerguntaIndex < perguntas.length) {
        handleProximoButton();
    }else{
        startQuiz();
    }
})

startQuiz();