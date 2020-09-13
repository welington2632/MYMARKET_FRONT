$(document).ready(function () {
    $("#form-login").submit(function (e) { 
        e.preventDefault();
        let email = $("#input-email").val();
        let senha = $("#input-senha").val();

        let usuario = new Usuario();
        usuario.email = email;
        usuario.senha = senha;

        console.log(usuario)

        fetch(`http://localhost:8080/api/autenticar?email=${usuario.email}&senha=${usuario.senha}`).then(response => {
            response.json().then(json => {
                if (json.length <= 0) {
                    alert('Email ou senha inválidos');
                } else {
                   UserManager.setUsuarioLogado(json[0])
                    alert('Você foi logado com sucesso!')
                   if(json[0].tipo == 'atacado') {
                        window.location.href="./logged-area/atacadista/panel.html"
                    } else if (json[0].tipo == 'varejo') {
                        window.location.href="./logged-area/varejista/panel.html"
                    } else {
                        alert('Tipo do usuário não definido!');
                    }
                }

            })
        })
         
    });
});