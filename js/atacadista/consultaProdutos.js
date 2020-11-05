$(document).ready(function () {
    UserManager.VerificacaoUsuario(true, 'atacado');
    console.log(UserManager.getUsuarioLogado())
    AtualizarListaProdutos(UserManager.getUsuarioLogado().id)

});

function AtualizarListaProdutos(id_usuario) {
    $.ajax({
        url: `http://localhost:8080/api/produto/vendedor/${id_usuario}`,
        dataType: 'json',
        contentType: "application/json",
        type: 'GET',
        beforeSend: function () {
        },
        success: function (retorno) {
            console.log('produtos: ', retorno)
            ExibirLista(retorno);
        },
        error: function (error) {

        }
    });
}

function ExibirLista(produtos) {
    $('div.listagem-produtos').empty();
    $.each(produtos, function (indexArray, produto) { 
         $('div.listagem-produtos').append(`
         <div class="produto" id="${produto.id}">
                   <img src="${produto.url_imagem}" alt="${produto.nome}">
                   <div class="infos-produto">
                       <span class="sub" id="titulo">${produto.nome}</span>
                       <span class="sub" id="valor">R$ ${produto.valor}</span>
                       <span class="sub" id="categoria">${produto.subcategoria != null?produto.subcategoria.descricao:""}</span>
                       <span class="sub" id="estoque">${produto.quantidade_estoque}</span>
                   </div>
                   <div class="control-buttons">
                       <a id="editar" href="edicaoProduto.html?id=${produto.id}">Editar</a>
                       <a id="excluir" onclick="ExcluirProduto(${produto.id})">Excluir</a>
                   </div>
               </div>
        `)
    });
}

function ExcluirProduto (id) {
    console.log('chamou excluir ', id)
    $.ajax({
        type: "DELETE",
        url: `http://localhost:8080/api/produto/${id}`,
        contentType: "application/json",

        beforeSend: function () {

        },
        success: function (retorno) {
            $(`.produto#${id}`).remove();
            alert("Produto excluido com sucesso!");
        },
        error: function (erro) {
            alert("Houve um erro ao puxar as categorias do servidor, por favor contacte um administrador");
            console.log('Erro : ', erro)
        }
    });
}