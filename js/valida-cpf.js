export default function ehUmCPF (campo) {
    const cpf = campo.value.replace(/\.|-/g, ""); //Caso seja inserido ponto e hífen no campo do cpf, vai substituir por uma string vazia
    if(validaNumerosRepetidos(cpf) || validaPrimeiroDigito(cpf) || validaSegundoDigito(cpf)) {
        campo.setCustomValidity('Esse CPF não é válido');
    }
}

function validaNumerosRepetidos(cpf) {
    const numerosRepetidos = [
        '00000000000',
        '11111111111',
        '22222222222',
        '33333333333',
        '44444444444',
        '55555555555',
        '66666666666',
        '77777777777',
        '88888888888',
        '99999999999'
    ]

    return numerosRepetidos.includes(cpf); //Se incluir os numeros repetidos, vai dar true
}

//A verificação do primeiro dígito é feita da seguinte maneira:
//Se recolhe os primeiros nove dígitos e os multiplica por 10 à 2 sequencialmente
//O primeiro dígito vezes 10, o segundo vezes 9, o terceiro vezes 8, até o nono vezes 2
//Depois se soma todos os valores e os multiplica por 10
//Por fim divide o valor por 11 e pega o módulo dele (valor que sobrar na divisão)
//Se o resultado for 10 ou 11, é preciso zerar. Se não for o caso, pode confirmar que o número é válido

function validaPrimeiroDigito(cpf) {
    let soma = 0;
    let multiplicador = 10;

    for(let tamanho = 0; tamanho < 9; tamanho++) {
        soma += cpf[tamanho] * multiplicador;
        multiplicador--;
    }

    soma = (soma * 10) % 11;

    if (soma == 10 || soma == 1) {
        soma = 0;
    }

    return soma != cpf[9];
}

//A verificação do segundo dígito é feita da seguinte maneira:
//Se recolhe os primeiros dez dígitos e os multiplica por 11 à 2 sequencialmente
//O primeiro dígito vezes 11, o segundo vezes 10, o terceiro vezes 9, até o décimo vezes 2
//Depois se soma todos os valores e os multiplica por 10
//Por fim divide o valor por 11 e pega o módulo dele (valor que sobrar na divisão)
//Se o resultado for 10 ou 11, é preciso zerar. Se não for o caso, pode confirmar que o número é válido

function validaSegundoDigito(cpf) {
    let soma = 0;
    let multiplicador = 11;

    for(let tamanho = 0; tamanho < 10; tamanho++) {
        soma += cpf[tamanho] * multiplicador;
        multiplicador--;
    }

    soma = (soma * 10) % 11;

    if (soma == 10 || soma == 1) {
        soma = 0;
    }

    return soma != cpf[10];
}