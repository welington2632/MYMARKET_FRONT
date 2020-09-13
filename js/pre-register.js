$(document).ready(function () {

    $(".btn-pre-register").click(function (e) { 
        e.preventDefault();
        sessionStorage.setItem("tipo", $(this).attr("id"));
        window.location.href = "register.html";

        $.ajax({
            url : 'http://localhost:8080/api/usuario/',
            dataType : 'json',
            contentType: "application/json",
            type : 'POST',
            data : DataJson,
            beforeSend : function () {
            },
            success : function(retorno){
                alert(retorno);
            },
            error : function(a,b,c){
                alert('Erro: ' + a['status'] + ' ' + c);
            }
         });
    });
});

