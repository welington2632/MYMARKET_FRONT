$(document).ready(function () {

    let usuario = UserManager.getUsuarioLogado();

    fetch(`http://localhost:8080/api/produtos/${usuario.id}`, {method: "GET"}).then(response => {
            response.json().then(json => {
                let produtos = json;
                console.log(produtos);
                ListarProdutos(produtos);
            })
        }).catch(error => {
            alert('Houve algum erro no cadastro do produto!');
            console.log('error: ' + error);
        })

        function ListarProdutos(produtos) {

            produtos.forEach(produto => {
                $('.table-striped tbody').append(`<tr><th>${produto.id}</th><th>${produto.nome}</th><th>${produto.quantidade}</th><th>${produto.valor}</th><th><a id="editar" href="editar.html?id=${produto.id}"><i class="fas fa-pen"></i></a></th><th><a id="excluir" href="excluir.html?id=${produto.id}"><i class="far fa-trash-alt"></i></a></th></tr>`)
            })
        }
});