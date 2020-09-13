$(document).ready(function () {
    let usuario = UserManager.getUsuarioLogado();

    let url = window.location.href;

    let id = url.split('?')[1].split('=')[1];

    fetch(`http://localhost:8080/api/produto/${id}`, {method: "DELETE"}).then(response => {
        alert('Produto excluido com sucesso!')
        window.location.href = 'listar.html'
    }).catch(erro => {
        alert('Houve algum erro, contate o administrador!');
    })
});