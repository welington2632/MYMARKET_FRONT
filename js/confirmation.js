$(document).ready(function () {
    let arrayURL = window.location.href.split('id=');
    console.log(arrayURL[arrayURL.length-1]);
    let usuarioAtualizado = new Object();
    usuarioAtualizado.id = arrayURL[arrayURL.length-1]
    
    $.ajax({
        url : 'http://localhost:8080/api/usuario/'+usuarioAtualizado.id,
        dataType : 'json',
        contentType: "application/json",
        type : 'GET',
        data : "",
        async: false,
        beforeSend : function () {
        },
        success : function(retorno){
            usuarioAtualizado = retorno;
            usuarioAtualizado.ativo = true;
        },
        error : function(a,b,c){
            alert('Erro: ' + a['status'] + ' ' + c);
        }
     });

     $.ajax({
        url : 'http://localhost:8080/api/usuario/',
        dataType : 'json',
        contentType: "application/json",
        type : 'PUT',
        data : JSON.stringify(usuarioAtualizado),
        beforeSend : function () {
        },
        success : function(retorno){
        },
        error : function(a,b,c){
            alert('Erro: ' + a['status'] + ' ' + c);
        }
     });

     $('.info-text').text('Obrigado por se cadastrar em nosso sistema ' +usuarioAtualizado.nome + ', você já pode efetuar seu login.');
});