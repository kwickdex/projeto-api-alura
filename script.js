const containerVideos = document.querySelector(".videos__container");
console.log(containerVideos)

async function buscarEMostrarVideos() {   
    try{
        const busca = await fetch("http://localhost:3000/videos");
        const videos = await busca.json();
        videos.forEach(video => {
            containerVideos.innerHTML += `
                <li class="videos__item">
                    <iframe src="${video.url}" title="${video.titulo}" frameborder="0"allowfullscreen></iframe>
                    <div class="descricao-video">
                        <img class="img-canal" src="${video.imagem}" alt="Logo do Canal">
                        <h3 class="titulo-video">${video.titulo}</h3>
                        <p class="titulo-canal">${video.descricao}</p>
                        <p class="categoria" hidden>${video.categoria}</p>
                     </div>
                </li>
            `;
        })
    }
    catch(error){
        console.error("Something is wrong!!!")
    }
}

buscarEMostrarVideos();

const barraDePesquisa = document.querySelector(".pesquisar__input");

barraDePesquisa.addEventListener("input", filtrarPesquisa);

function filtrarPesquisa(){
    const videos = document.querySelectorAll(".videos__item");
    if(barraDePesquisa != ""){
        videos.forEach((video) => {
            let titulo = video.querySelector(".titulo-video").textContent.toLowerCase();
            let valorFiltro = barraDePesquisa.value.toLowerCase();
            (!titulo.includes(valorFiltro)) ? video.style.display = "none" : video.style.display = "block";
        })
    } else {
        video.style.display = "block";
    }
}

const botaoCategoria = document.querySelectorAll(".superior__item");

botaoCategoria.forEach((botao) => {
    let nomeCategoria = botao.getAttribute("name");
    botao.addEventListener("click", () => filtrarPorCategoria(nomeCategoria))
})

function filtrarPorCategoria(filtro) {
    const videos = document.querySelectorAll(".videos__item");
    videos.forEach((video) =>{
        let categoria = video.querySelector(".categoria").textContent.toLowerCase();
        let valorFiltro = filtro.toLowerCase();
        if (!categoria.includes(valorFiltro) && valorFiltro != 'tudo'){
            video.style.display = "none";
        } else {
            video.style.display = "block";
        }
    })
}