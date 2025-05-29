import ehUmCPF from "./valida-cpf.js";
import ehMaiorDeIdade from "./valida-idade.js";
 
const camposDoFormulario = document.querySelectorAll("[required]"); //Retorna um array com os elementos que tenham o atributo required
const formulario = document.querySelector("[data-formulario]");

formulario.addEventListener("submit", (e) => {
    e.preventDefault();

    const listaRespostas = { //Pegou todos os valores dos inputs
        "nome": e.target.elements["nome"].value,
        "email": e.target.elements["email"].value,
        "rg": e.target.elements["rg"].value,
        "cpf": e.target.elements["cpf"].value,
        "aniversario": e.target.elements["aniversario"].value
    }

    localStorage.setItem("cadastro", JSON.stringify(listaRespostas)); //Salvou o conteúdo na localStorage

    window.location.href ='./abrir-conta-form-2.html'; //Ao apertar o submit, vai para esse página
})

//Cada campo do formulário capturado com a referência será um (campo)
camposDoFormulario.forEach((campo) => {
    campo.addEventListener("blur", () => verificaCampo(campo));    
    campo.addEventListener("invalid", evento => evento.preventDefault()); //Evita a mensagem de erro padrão do navegador
})

const tiposDeErro = [
    'valueMissing', //Nada dentro do campo
    'typeMismatch', //Valor diferente do esperado. Ex.: email espera a estrutura nome@email
    'patternMismatch', //Padrão diferente do esperado. Ex.: CPF com uma estrutura diferente da definida
    'tooShort', //Muito curto
    'customError' //Lógica pro cpf, validação de idade
]

const mensagens = {
    nome: {
        valueMissing: "O campo de nome não pode estar vazio.",
        patternMismatch: "Por favor, preencha um nome válido.",
        tooShort: "Por favor, preencha um nome válido."
    },
    email: {
        valueMissing: "O campo de e-mail não pode estar vazio.",
        typeMismatch: "Por favor, preencha um email válido.",
        tooShort: "Por favor, preencha um e-mail válido."
    },
    rg: {
        valueMissing: "O campo de RG não pode estar vazio.",
        patternMismatch: "Por favor, preencha um RG válido.",
        tooShort: "O campo de RG não tem caractéres suficientes."
    },
    cpf: {
        valueMissing: 'O campo de CPF não pode estar vazio.',
        patternMismatch: "Por favor, preencha um CPF válido.",
        customError: "O CPF digitado não existe.",
        tooShort: "O campo de CPF não tem caractéres suficientes."
    },
    aniversario: {
        valueMissing: 'O campo de data de nascimento não pode estar vazio.',
        customError: 'Você deve ser maior que 18 anos para se cadastrar.'
    },
    termos: {
        valueMissing: 'Você deve aceitar nossos termos antes de continuar.',
    }
}

function verificaCampo(campo) {
    let mensagem = "";
    campo.setCustomValidity("");
    if (campo.name == "cpf" && campo.value.length >= 11) {
        ehUmCPF(campo);
    }
    if (campo.name == "aniversario" && campo.value != ""){
        ehMaiorDeIdade(campo);
    }

    tiposDeErro.forEach(erro => {
        if(campo.validity[erro]) {
            mensagem = mensagens[campo.name][erro];
            console.log(mensagem);
        }
    })

    const mensagemErro = campo.parentNode.querySelector('.mensagem-erro'); //Seleciona o campo do input selecionado
    const validadorDeInput = campo.checkValidity();

    if(!validadorDeInput) {
        mensagemErro.textContent = mensagem;
    } else {
        mensagemErro.textContent = "";
    }
}

