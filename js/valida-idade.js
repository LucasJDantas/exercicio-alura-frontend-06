export default function ehMaiorDeIdade (campo) {
    const dataNascimento = new Date(campo.value);
    if (!validaIdade(dataNascimento)) {
        campo.setCustomValidity('O usuário não é maior de idade');
    }
}

function validaIdade(data) {
    const dataAtual = new Date(); //Data de hoje
    const dataMais18 = new Date(data.getUTCFullYear() + 18, data.getUTCMonth(), data.getUTCDate()); //Data (valor do input) + 18 anos

    return dataAtual >= dataMais18;
}