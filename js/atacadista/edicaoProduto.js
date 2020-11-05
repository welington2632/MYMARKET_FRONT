$(document).ready(function () {
    var url_atual = window.location.href.split('=');
    var id = url_atual[url_atual.length - 1]
    AtualizarSubcategorias(id);

    $('button[type="submit"]').click(function (e) { 
        e.preventDefault();
        AtualizarProduto(id);
    });
});

function preencherInputs (id) {
    $.ajax({
        type: "GET",
        url: `http://localhost:8080/api/produto/${id}`,
        contentType: "application/json",
        beforeSend: function () {

        },
        success: function (retorno) {
            console.log(retorno)
            $('input#nome').val(retorno.nome)
            $('input#valor').val(retorno.valor)
            $('input#quantidade_estoque').val(retorno.quantidade_estoque)
            retorno.ativo == true?$('input#ativo').prop("checked", true):"";
            var select = document.querySelector('select#subcategoria')
            var index = 0;
                $.each($('select#subcategoria option'), function (indexArray, elemento) {
                    if (elemento.value == retorno.subcategoria.id) {
                        index = indexArray;
                    }
                });
                console.log('index : ', index)
            select.selectedIndex = index;
            $('input#url_imagem').val(retorno.url_imagem);
            $('textarea#descricao').val(retorno.descricao);


        },
        error: function (erro) {
            alert("Houve um erro ao puxar as categorias do servidor, por favor contacte um administrador");
            console.log('Erro : ', erro)
        }
    });
}


function AtualizarSubcategorias (id) {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/api/subcategorias/",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (retorno) {
            $('select#subcategoria').empty();
            $('select#subcategoria').append('<option value="" disabled selected="">Selecione a categoria</option>')
            $.each(retorno, function (indexArray, subcategoria) { 
                $('select#subcategoria').append(`<option value="${subcategoria.id}">${subcategoria.descricao}</option>`)
            });
            preencherInputs(id);
        },
        error: function (erro) {
            alert("Houve um erro ao puxar as categorias do servidor, por favor contacte um administrador");
            console.log('Erro : ', erro)
        }
    });
}

function AtualizarProduto(id) {
    console.log("Chamou atualizar")
    var produto = FormJson.ConvertFormJson($('form'));
    produto.id = id;
    if (produto.ativo == 'on') produto.ativo = true;
    let vendedor = {
        id: UserManager.getUsuarioLogado().id
    }
    let subcategoria = {
        id: $('select#subcategoria').val()
    }
    produto.subcategoria = subcategoria;
    produto.vendedor = vendedor;
    console.log(JSON.stringify(produto))
    $.ajax({
        type: 'PUT',
        url: `http://localhost:8080/api/produto/`,
        data: JSON.stringify(produto),
        contentType: "application/json",
        success: function (response) {
            alert("Produto alterado com sucesso!");
            window.location.href = "./produtos.html"
        }
    });

}