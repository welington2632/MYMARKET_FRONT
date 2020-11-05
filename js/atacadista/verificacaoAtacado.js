$(document).ready(function () {
    UserManager.VerificacaoUsuario(true, ['atacado']);
    $('.perfil-infos').empty();
    console.log(UserManager.getUsuarioLogado())
    $('.perfil-infos').append(`Bem vindo, <b>${UserManager.getUsuarioLogado().nome}</b>`)
});