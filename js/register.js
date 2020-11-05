$(document).ready(function () {

    listarUfs();

    $('input#cep').change(function (e) {
        e.preventDefault();
        preencherCampos($(this).val());
    });

    $("input#txtCNPJ").mask('00.000.000/0000-00', { reverse: true });
    $("input#cep").mask('00000-000');
    if (!sessionStorage.getItem("tipo")) window.location.href = "pre-register.html";

    $('select#uf').change(function (e) { 
        e.preventDefault();
        AtualizarCidades($(this).val());
    });

    $('.cadastro-usuario').submit(function (e) {
        e.preventDefault();
        var formdata = $(".cadastro-usuario").serializeArray();
        var data = {};
        $(formdata).each(function (index, obj) {
            data[obj.name] = obj.value;
        });
        data["tipo"] = sessionStorage.getItem("tipo");
        data.url = gerarConfirmationHTML();

        var DataJson = JSON.stringify(data);
        sessionStorage.setItem("usuario", JSON.stringify(data));
        console.log(DataJson);

        $.ajax({
            url: 'http://localhost:8080/api/usuario/',
            dataType: 'json',
            contentType: "application/json",
            type: 'POST',
            data: DataJson,
            beforeSend: function () {
            },
            success: function (retorno) {
                finalizarCadastro()
            },
            error: function (a, b, c) {
                if (a.status != 200) {
                    alert("Houve um erro na aplicação, por favor contacte um administrador");
                    console.error("Erro gerado : ", a);
                } else {
                    $('span#aviso-email').css('display', 'block');
                }
            }
        });
        // 1 - Split
        // 2 - Remove último item
        // 3 - Constroi de novo com confirmation.html no final
        // 4 - adiciona ?id=${retorno.id}

    });
});

function finalizarCadastro() {
    window.location.href = "pre-confirmation.html";
}

function gerarConfirmationHTML() {
    let currentURL = document.location.href;
    let splitURL = currentURL.split('/');
    splitURL.pop();
    let newURL = '';
    splitURL.forEach(element => {
        newURL += element + '/';
    });
    newURL += 'confirmation.html?id=';
    return newURL;
}

function listarUfs() {
    $.ajax({
        url: 'https://servicodados.ibge.gov.br/api/v1/localidades/estados',
        dataType: 'json',
        contentType: "application/json",
        type: 'GET',
        beforeSend: function () {
        },
        success: function (retorno) {
            retorno.forEach(uf => {
                $("select#uf").append(`<option value="${uf.sigla}">${uf.sigla}</option>`)
            });
        },
        error: function (a, b, c) {
            if (a.status != 200) {
                alert("Houve um erro na aplicação, por favor contacte um administrador");
                console.error("Erro gerado : ", a);
            }
        }
    });
}

function preencherCidades(cidades) {
    $('select#cidade').empty();
    cidades.forEach(cidade => {
        $('select#cidade').append(`<option value="${cidade.nome}">${cidade.nome}</option>`)
    })
}

function AtualizarCidades(uf) {
    fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/microrregioes`).then(response => {
        response.json().then(dados => {
            preencherCidades(dados)
        })
    })
}

function preencherCampos(cep) {
    $.ajax({
        url: `https://viacep.com.br/ws/${cep}/json/`,
        dataType: 'json',
        contentType: "application/json",
        type: 'GET',
        beforeSend: function () {
        },
        success: function (retorno) {
            if (!retorno.erro) {
                $("input#logradouro").val(retorno.logradouro)
                var select = document.querySelector('select#uf')
                var index = 0;
                $.each($('select#uf option'), function (indexArray, elemento) {
                    if (elemento.value == retorno.uf) {
                        index = indexArray;
                    }
                });
                select.selectedIndex = index;
                fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${retorno.uf}/microrregioes`)
                    .then(response => {
                        response.json().then(dados => {
                            preencherCidades(dados)
                            select = document.querySelector('select#cidade');
                            index = 0;
                            $.each($('select#cidade option'), function (indexArray, elemento) {
                                if (elemento.value == retorno.localidade) {
                                    index = indexArray;
                                }
                            });
                            select.selectedIndex = index;
                        })
                    })
            } else {
                console.log('retornou erro')
            }
        },
        error: function (error) {
            console.log('Ocorreu um erro: ', error);
        }
    });
}
