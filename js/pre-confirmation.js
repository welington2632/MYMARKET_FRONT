$(document).ready(function () {
    let usuario = JSON.parse(sessionStorage.getItem("usuario"));
    console.log(usuario);
    $(".info-text").text("Enviamos um email de confirmação para "+ usuario.email+" por favor verifique sua identidade.");
});