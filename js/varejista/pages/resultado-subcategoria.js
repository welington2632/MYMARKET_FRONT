$(document).ready(function () {
    var url_atual = window.location.href.split('id=');
    var id = url_atual[url_atual.length - 1]
    if (url_atual.length > 1) {
        atualizarSubcategoria(id);
    } else {
        SubcategoriasNaoEncontradas();
    }
});

function consultarSubcategoriaPorIdCategoria (id) {
    return $.ajax({
        type: "GET",
        dataType: "json",
        url: `http://localhost:8080/api/subcategorias/categoria/${id}`
    });
}

function consultarCategoria (id) {
    return $.ajax({
        type: "GET",
        dataType: "json",
        url: `http://localhost:8080/api/categoria/${id}`
    });
}

async function atualizarSubcategoria(id) {
    var subcategorias = await consultarSubcategoriaPorIdCategoria(id);
    if (subcategorias.length <= 0) {
        SubcategoriasNaoEncontradas(id);
    } else {
        $('section#resultado > h4').text(`Subcategorias de ${subcategorias[0].categoria.descricao}`)
        $('.box ul').empty();
        subcategorias.forEach(subcategoria => {
            $('.box ul').append(`
            <a href="./resultado-produto.html?id=${subcategoria.id}">
            <img src="${subcategoria.imagem != null?subcategoria.imagem:'../../img/sem imagem.png'}" alt="categoria.png">
            <span>${subcategoria.descricao}</span>
            </a>`);
        });
    }
}

async function SubcategoriasNaoEncontradas(id) {
    $('div.box').remove();
    console.log('id subcategoria : ', id)
    if (id == undefined || id <= 0 || id == '' || isNaN(id)) {
        $('section#resultado > h4').text(`Nenhuma subcategoria encontrada para esta categoria!`)
    } else {
        let categoria = await consultarCategoria(id);
        if (categoria != null) {
            $('section#resultado > h4').text(`Nenhuma subcategoria encontrada para a categoria : ${categoria.descricao}`)
        } else {
            $('section#resultado > h4').text(`Nenhuma subcategoria encontrada para esta categoria!`)
        }
    }
}