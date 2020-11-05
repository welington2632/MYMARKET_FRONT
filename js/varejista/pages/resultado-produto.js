$(document).ready(function () {
    let id = getCurrentId();
    if (id != undefined) {
        carregarPagina(id);
    } else {
        limparTelaProdutos();
    }
});

function consultarProdutoPorSubcategoria (id) {
    return $.ajax({
        type: "GET",
        dataType: "json",
        url: `http://localhost:8080/api/produtos/subcategoria/${id}`
    });
}

function consultarProdutosMaisVendidosPorSubcategoria (id) {
    return $.ajax({
        type: "GET",
        dataType: "json",
        url: `http://localhost:8080/api/produtos/subcategoria/${id}/maisvendidos`
    });
}

function consultarSubCategoria (id) {
    return $.ajax({
        type: "GET",
        dataType: "json",
        url: `http://localhost:8080/api/subcategoria/${id}`
    });
}


async function carregarPagina (subcategoria) {
    let produtos = await consultarProdutoPorSubcategoria(subcategoria);
    if (produtos.length > 0) {
        $('h4#resultado').text(produtos[0].subcategoria.descricao);
        carregarProdutos(produtos);
        let produtosMaisVendidos = await consultarProdutosMaisVendidosPorSubcategoria(subcategoria);
        carregarMaisVendidos(produtosMaisVendidos)
    } else {
        limparTelaProdutos(subcategoria);
    }
}

async function limparTelaProdutos (id) {
    if (id == undefined || id <= 0 || id == '' || isNaN(id)) {
        $('h4#resultado').text("Nenhum produto encontrado para esta subcategoria!");
    } else {
        let subcategoria = await consultarSubCategoria(id);
        if (subcategoria != null) {
            $('h4#resultado').text(`Nenhum produto encontrado para a subcategoria : ${subcategoria.descricao}`);
        } else {
            $('h4#resultado').text("Nenhum produto encontrado para esta subcategoria!");
        }
    }
    $('section#mais-vendidas').remove();
    $('section#vitrine-produto').remove();
}

function carregarProdutos (produtos) {
    $('section#vitrine-produto > div').empty();
    produtos.forEach(produto => {
        $('section#vitrine-produto > div').append(`
        <div class="produto-spot">
                    <img src="../../img/cadeira.png" alt="">
                    <div class="detalhes">
                        <h4 class="titulo">${produto.nome}</h4>
                        <span class="empresa">${produto.vendedor.nome}</span>
                        <span class="endereco">${produto.vendedor.logradouro}, ${produto.vendedor.numero} - ${produto.vendedor.cep} ${produto.vendedor.cidade}/${produto.vendedor.uf}</span>
                        <span class="valor">R$ ${produto.valor} / unidade</span>
                        <a href="./detalhes-produto.html?id=${produto.id}" class="comprar">Comprar</a>
                    </div>
        </div>
        `)
    });
}

function carregarMaisVendidos(produtos) {
    $('section#mais-vendidas .section-box').empty();
    produtos.forEach(produto => {
        $('section#mais-vendidas .section-box').append(`
        <div class="produto-spot" id="${produto.id}">
                    <img src="../../img/cadeira.png" alt="">
                    <div class="detalhes">
                        <h4 class="titulo">${produto.nome}</h4>
                        <span class="empresa">${produto.vendedor.nome}</span>
                        <span class="endereco">${produto.vendedor.logradouro}, ${produto.vendedor.numero} - ${produto.vendedor.cep} ${produto.vendedor.cidade}/${produto.vendedor.uf}</span>
                        <span class="valor">R$ ${produto.valor} / unidade</span>
                        <a href="./detalhes-produto.html?id=${produto.id}" class="comprar">Comprar</a>
                    </div>
        </div>
        `)
    });
    $('section#mais-vendidas .section-box').slick({
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
      }); 
}

function erroPagina () {

}

function getCurrentId() {
    var url_atual = window.location.href.split('id=');
    var id = url_atual[url_atual.length - 1]
    if (url_atual.length <= 1 || id == '' || id <= 0 || isNaN(id)) {
        return undefined;
    }  else {
        return id;
    }
}