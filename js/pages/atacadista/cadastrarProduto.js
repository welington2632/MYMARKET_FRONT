$(document).ready(function () {

    let usuario = UserManager.getUsuarioLogado();

    $('.form-cadastro').submit(function (e) { 
        e.preventDefault();

        let produto = {
            nome: $('#nome').val(),
            descricao: $('#descricao').val(),
            valor: $('#valor').val(),
            quantidade: $('#qtde-estoque').val(),
            ativo: $('#ativo').prop('checked'),
            usuario: {
                id: usuario.id
            }
        }

        console.log(JSON.stringify(produto))

        fetch('http://localhost:8080/api/produto/', {method: "POST",headers: { "Content-Type": "application/json"}, body: JSON.stringify(produto)}).then(response => {
            response.json().then(json => {
                alert('Produto cadastrado com sucesso!');
            })
        }).catch(error => {
            alert('Houve algum erro no cadastro do produto!');
            console.log('error: ' + error);
        })
    });
    
});