$(document).ready(function () {
    var url_atual = window.location.href.split('descricao=');
    var descricao = url_atual[url_atual.length - 1]
    if (url_atual.length > 1 && descricao != "") {
        atualizarTituloPesquisa(descricao)
        consultarCategoria(descricao)
    } else {
        SemDescricao();
    }
});

async function consultarCategoria(descricao) {
    try {
        var categorias = await requestCategoriaComDescricao(descricao);
        if (categorias.length > 0) {
            AtualizarExibicaoCategorias(categorias)
        } else {
            $('section#resultado > h4').text(`Nenhuma categoria encontrada para "${descricao}"`)
            $('section#resultado > .box').css('background-color', 'transparent')
        }
    } catch (error) {
        console.log('erro : ', error)
    }

}

function atualizarTituloPesquisa (texto) {
$('section#resultado > h4').text(`Categorias com "${texto}"`)
}

function AtualizarExibicaoCategorias (categorias) {
    $('.box ul').empty();
    categorias.forEach(categoria => {
        $('.box ul').append(`
        <a href="./resultado-subcategoria.html?id=${categoria.id}">
        <img src="${categoria.imagem != null?categoria.imagem:'../../img/sem imagem.png'}" alt="categoria.png">
        <span>${categoria.descricao}</span>
        </a>`);
    });
}

function SemDescricao() {
    $('section#resultado').empty();
    console.log('url inválida, é necessário uma descricao')

}