$(document).ready(function () {

    if(!sessionStorage.getItem("tipo")) window.location.href = "pre-register.html";

    $('.cadastro-usuario').submit(function (e) {
        e.preventDefault();
        var formdata = $(".cadastro-usuario").serializeArray();
        var data = {};
        $(formdata).each(function (index, obj) {
            data[obj.name] = obj.value;
        });
        data["tipo"] = sessionStorage.getItem("tipo");

        var DataJson = JSON.stringify(data);
        sessionStorage.setItem("usuario", JSON.stringify(data));
        console.log(DataJson);

        $.ajax({
            url : 'http://localhost:8080/api/usuario/',
            dataType : 'json',
            contentType: "application/json",
            type : 'POST',
            data : DataJson,
            beforeSend : function () {
            },
            success : function(retorno){
                window.location.href = "pre-confirmation.html";
            },
            error : function(a,b,c){
                alert('Erro: ' + a['status'] + ' ' + c);
            }
         });

         
    });
});

