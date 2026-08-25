// Seleção dos elementos do DOM
const numeroSenha = document.querySelector('.parametro-senha__texto');
const botoes = document.querySelectorAll('.parametro-senha__botao');
const campoSenha = document.querySelector('#campo-senha');
const checkbox = document.querySelectorAll('.checkbox');
const forcaSenha = document.querySelector('.forca');
const valorEntropia = document.querySelector('.entropia');

// Declaração do tamanho padrão e dos caracteres disponíveis
let tamanhoSenha = 12;
numeroSenha.textContent = tamanhoSenha;

const letrasMaiusculas = 'ABCDEFGHIJKLMNOPQRSTUVXYWZ';
const letrasMinusculas = 'abcdefghijklmnopqrstuvxywz';
const numeros = '0123456789';
const simbolos = '!@%*?';

// Eventos dos botões de diminuir e aumentar o tamanho da senha
botoes[0].onclick = diminuiTamanho;
botoes[1].onclick = aumentaTamanho;

function diminuiTamanho() {
    if (tamanhoSenha > 1) {
        tamanhoSenha--;
    }
    numeroSenha.textContent = tamanhoSenha;
    geraSenha();
}

function aumentaTamanho() {
    if (tamanhoSenha < 20) {
        tamanhoSenha++;
    }
    numeroSenha.textContent = tamanhoSenha;
    geraSenha();
}

// Eventos de clique para cada checkbox
for (let i = 0; i < checkbox.length; i++) {
    checkbox[i].onclick = geraSenha;
}

// Função principal de geração de senha
function geraSenha() {
    let alfabeto = '';

    if (checkbox[0].checked) {
        alfabeto = alfabeto + letrasMaiusculas;
    }
    if (checkbox[1].checked) {
        alfabeto = alfabeto + letrasMinusculas;
    }
    if (checkbox[2].checked) {
        alfabeto = alfabeto + numeros;
    }
    if (checkbox[3].checked) {
        alfabeto = alfabeto + simbolos;
    }

    let senha = '';
    for (let i = 0; i < tamanhoSenha; i++) {
        let numeroAleatorio = Math.random() * alfabeto.length;
        numeroAleatorio = Math.floor(numeroAleatorio);
        senha = senha + alfabeto[numeroAleatorio];
    }

    campoSenha.value = senha;
    classificaSenha(alfabeto.length);
}

// Função para classificar a força com base na entropia
function classificaSenha(tamanhoAlfabeto) {
    // Cálculo da entropia: H = L * log2(N)
    let entropia = tamanhoSenha * Math.log2(tamanhoAlfabeto);

    forcaSenha.classList.remove('fraca', 'media', 'forte');

    // Classificação baseada nos bits de entropia
    if (entropia > 57) {
        forcaSenha.classList.add('forte');
    } else if (entropia > 35 && entropia < 57) {
        forcaSenha.classList.add('media');
    } else if (entropia <= 35) {
        forcaSenha.classList.add('fraca');
    }

    // Cálculo e exibição da estimativa em dias
    const dias = Math.floor(2 ** entropia / (100e6 * 60 * 60 * 24));
    valorEntropia.textContent = "Um computador pode levar até " + dias + " dias para descobrir essa senha.";
}

// Executa a primeira geração ao carregar a página
geraSenha();