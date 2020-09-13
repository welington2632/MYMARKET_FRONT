$(document).ready(function () {

    let url = window.location.href;

    let id = url.split('?')[1].split('=')[1];

    fetch(`http://localhost:8080/api/produtos/${id}`, {method: "GET"}).then(response => {
            response.json().then(json => {
                AtualizaCampos(json)
            }).catch(error => {
                alert('Produto não cadastrado, contate um administrador.')
                console.log (error);
            })
        })

        function AtualizaCampos(produtos) {
            produtos.forEach(item => {
                if (item.ativo){$('.lista-atacados').append(`<li>
                <div class="card" style="width: 18rem;"><div class="card-body">
                  <h5 class="card-title">${item.nome}</h5>
                  <h6 class="card-subtitle mb-2 text-muted">R$ ${item.valor}</h6>
                  <p class="card-text">${item.descricao}</p>
                  <a href="produto.html?id=${item.id}" class="card-link">Comprar</a>
                </div>
              </div>
              </li>`)}
            })
        }
});