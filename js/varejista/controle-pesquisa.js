$(document).ready(function () {
    preencherCategorias();
    ajustarAutoComplete();

    $('i.fa-search').click(function (e) { 
        e.preventDefault();
        pesquisarCategoria();
    });
});


function requestCategoria() {
    return $.ajax({
        type: "GET",
        url: "http://localhost:8080/api/categorias/",
        dataType: "json"
    });
}

function requestCategoriaComDescricao (texto) {
    return $.ajax({
        type: "GET",
        dataType: "json",
        url: `http://localhost:8080/api/categoria/descricao/${texto}`
    });
}


async function preencherCategorias() {
    limparCategoriasSugeridas();
    let categorias = []
    try {
        categorias = await requestCategoria();
    } catch (erro) {
        console.log(erro)
    }

    console.log(categorias)

    $.each(categorias, function (indexArray, categoria) { 
         $('.carousel-categorias').append(`<div><a href="./resultado-subcategoria.html?id=${categoria.id}">${categoria.descricao}</a></div>`)
    });

    $('.carousel-categorias').slick({
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
      });
}

async function ajustarAutoComplete () {
    let input = $('input[type="text"]');
    let data = [];
    try {
        data = await requestCategoria();
    } catch (error) {
        console.log('error : ', error);
        alert("Houve um erro ao consultar as categorias, por favor consulte o administrador do sistema");
    }
    let descricoes = [];
    data.forEach(element => {
        descricoes.push(element.descricao);
    });
    AutoComplete.AutoCompletar(input, descricoes);
}

function limparCategoriasSugeridas () {
    $('.carousel-categorias').empty();
}

function pesquisarCategoria () {
    let texto = $('input[type="text"]').val();
    window.location.href = `./resultado-categoria.html?descricao=${texto}`;
}

