$(document).ready(function () {
    
    // Verifica se o usuário está logado
   // UserManager.VerificacaoUsuario(true, ['atacado'])

    // Pega o usuário do banco de dados local
    let usuario = UserManager.getUsuarioLogado();

    let url = window.location.href;

    let id = url.split('?')[1].split('=')[1];

    fetch(`http://localhost:8080/api/produto/${id}`, {method: "GET"}).then(response => {
            response.json().then(json => {
                AtualizaCampos(json)
            }).catch(error => {
                alert('Produto não cadastrado, contate um administrador.')
                console.log (error);
            })
        })

    function AtualizaCampos(produto) {
        $('#nome').val(produto.nome);
        $('#descricao').val(produto.descricao)
        $('#valor').val(produto.valor)
        $('#qtde-estoque').val(produto.quantidade)
        $('#ativo').prop('checked', usuario.ativo)
    }

    $('.form-editar').submit(function (e) { 
        e.preventDefault();
        let produto = {
            id: id,
            nome: $('#nome').val(),
            descricao: $('#descricao').val(),
            valor: $('#valor').val(),
            quantidade: $('#qtde-estoque').val(),
            ativo: $('#ativo').prop('checked'),
            usuario: {
                id: usuario.id
            }
        }

        fetch('http://localhost:8080/api/produto/', {method: "PUT",headers: { "Content-Type": "application/json"}, body: JSON.stringify(produto)}).then(response => {
            response.json().then(json => {
                alert('Produto atualizado com sucesso!');
                window.location.href = 'listar.html'
            })
        }).catch(error => {
            alert('Houve algum erro, contacte o administrador do sistema!');
            console.log('error: ' + error);
        })
    });

});