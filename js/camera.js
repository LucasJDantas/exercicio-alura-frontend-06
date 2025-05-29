const botaoIniciarCamera = document.querySelector("[data-video-botao]"); //Imagem Botão para habilitar a câmera
const campoCamera = document.querySelector("[data-camera]"); //Div que contém a câmera
const video = document.querySelector("[data-video]"); //Vídeo 

const botaoTirarFoto = document.querySelector("[data-tirar-foto]"); //Botão
const canvas = document.querySelector("[data-video-canvas]"); //Canvas - onde a foto vai
const mensagem = document.querySelector("[data-mensagem"); //Mensagem de pronto
let imagemUrl = ""; //Imagem que será tirada na câmera

const botaoEnviarFoto = document.querySelector("[data-enviar]"); 

//Função assíncrona pois depende da validação/permissão do usuário para funcionar
botaoIniciarCamera.addEventListener("click", async function () {
    const iniciarVideo = await navigator.mediaDevices //Método padrão que pede para o navegador acessar a câmera
    .getUserMedia({video: true, audio: false}) //Solicitou somente o vídeo

    botaoIniciarCamera.style.display = "none"; //Esconde o botão da câmera
    campoCamera.style.display = "block"; //Mostra a câmera

    video.srcObject = iniciarVideo; //A tag recebe como origem o navigator
})

botaoTirarFoto.addEventListener("click", function() {
    //Pega o canvas no formato 2d, desenha a imagem com base no vídeo e aplica o formato do canvas estabelecido no HTML
    canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
    //Pega a imagem gerada no canvas e converte para uma URL para ser salva
    imagemUrl = canvas.toDataURL("image/jpeg");

    campoCamera.style.display = "none"; //Escondeu a câmera
    mensagem.style.display = "block"; //Mostra a mensagem de foto tirada
})

botaoEnviarFoto.addEventListener("click", () => {
    const receberDadosExistentes = localStorage.getItem("cadastro"); //Pegou os elementos do form da localStorage
    const converteRetorno = JSON.parse(receberDadosExistentes); //

    converteRetorno.imagem = imagemUrl; //Criou o atributo imagem dentro do retorno, que recebeu a imagem tirada

    localStorage.setItem('cadastro', JSON.stringify(converteRetorno)); //Manda pra localStorage os itens junto com a imagem

    window.location.href = "./abrir-conta-form-3.html" //Vai para a próxima página
})