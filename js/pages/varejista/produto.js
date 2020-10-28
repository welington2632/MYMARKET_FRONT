$(document).ready(function () {


    let url = window.location.href;

    let id = url.split('?')[1].split('=')[1];

    let produto;

    fetch(`http://localhost:8080/api/produto/${id}`, {method: "GET"}).then(response => {
            response.json().then(json => {
                console.log(json)
                produto = json;
                $('#adicionar-carrinho').css('display', 'initial');
                AtualizaCampos(json)
            }).catch(error => {
                alert('Produto não cadastrado, contate um administrador.')
                console.log (error);
            })
        })

        function AtualizaCampos(produto) {
            $('#titulo').text(produto.nome);
            $('#descricao').text(produto.descricao);
            $('#estoque').text('Quantidade em estoque : ' + produto.quantidade);
            $('#valor').text('R$ ' + produto.valor);
        }

        $('#voltar').click(function (e) { 
            e.preventDefault();
            window.history.back();
        });

        $('#adicionar-carrinho').click(function (e) { 
            e.preventDefault();
            alert("Produto adicionado com sucesso!")
            let usuario = UserManager.getUsuarioLogado();
            let item = [new itemCompra(produto,1)]
            if (localStorage.getItem('carrinho') == null) {
                let carrinho = new Carrinho(item, usuario);
                localStorage.setItem('carrinho',JSON.stringify(carrinho))
                console.log('carrinho criado com sucesso!')
            } else {
                let carrinho = JSON.parse(localStorage.getItem('carrinho'));
                let possuiNoArray = false;
                carrinho._itens.forEach(item => {
                    if (item._produto.id == produto.id) {
                        item._quantidade++;
                        possuiNoArray = true;
                        return;
                    } 
                })
                if (!possuiNoArray) carrinho._itens.push(new itemCompra(produto, 1))
                localStorage.setItem('carrinho', JSON.stringify(carrinho));
                console.log(carrinho);
            }
        });
}); 