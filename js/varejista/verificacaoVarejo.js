$(document).ready(function () {
    UserManager.VerificacaoUsuario(true, ['varejo']);
    $('.perfil-infos').empty();
    console.log(UserManager.getUsuarioLogado())
    $('.perfil-infos').append(`Bem vindo, <b>${UserManager.getUsuarioLogado().nome}</b>`)
});