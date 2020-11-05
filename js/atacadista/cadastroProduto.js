$(document).ready(function () {
    UserManager.VerificacaoUsuario(true, ['atacado']);
    $('form').submit(function (e) { 
        e.preventDefault();
        CadastrarProduto();
    });
    AtualizarSubcategorias();
});

function AtualizarSubcategorias () {
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
            },
            error: function (erro) {
                alert("Houve um erro ao puxar as categorias do servidor, por favor contacte um administrador");
                console.log('Erro : ', erro)
            }
        });
}

function CadastrarProduto () {
    var produto = FormJson.ConvertFormJson($('form'));
    if (produto.ativo == 'on') produto.ativo = true;
    let vendedor = {
        id: UserManager.getUsuarioLogado().id
    }
    let subcategoria = {
        id: $('select#subcategoria').val()
    }
    produto.subcategoria = subcategoria;
    produto.vendedor = vendedor;
    produto.data_cadastrado = new Date();
    console.log(JSON.stringify(produto))
    $.ajax({
        type: "POST",
        url: "http://localhost:8080/api/produto/",
        dataType: 'json',
        contentType: "application/json",
        data: JSON.stringify(produto),
        beforeSend: function () {

        },
        success: function (retorno) {
            alert("Produto cadastrado com sucesso!");
            window.location.href = "./produtos.html"
        },
        error: function (erro) {
            alert("Houve um erro ao puxar as categorias do servidor, por favor contacte um administrador");
            console.log('Erro : ', erro)
        }
    });
}