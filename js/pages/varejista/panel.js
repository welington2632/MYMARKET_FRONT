$(document).ready(function () {
    console.log('rodou panel varejo')
    let atacadistas = [];
    fetch('http://localhost:8080/api/usuarios/', {method: "GET",headers: { "Content-Type": "application/json"}}).then(response => {
            response.json().then(json => {
                atacadistas = json;
                exibirListaAtacadistas(atacadistas)
            })
        }).catch(error => {
            alert('Houve algum erro no cadastro do produto!');
            console.log('error: ' + error);
        })

        function exibirListaAtacadistas(atacadistas) {
            atacadistas.forEach(item => {
                if (item.tipo == 'atacado') $('.lista-atacados').append(`<li class="item-user"><i class="fas fa-user"></i><span>${item.nome}</span><a href="listagem-produtos.html?id=${item.id}" class="btn btn-primary">Contatar</a></li>`)
            })
        }
});