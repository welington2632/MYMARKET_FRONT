$(document).ready(function () {
    let carrinho = JSON.parse(localStorage.getItem('carrinho'));
    console.log(carrinho)
    if (carrinho != null) {
        let total = 0;
        carrinho._itens.forEach(item => {
            $('.lista-atacados').append(`<li>
            <div class="card" style="width: 18rem;">
                <div class="card-body-carrinho">
              <h5 class="card-title">${item._produto.nome} (${item._quantidade})</h5>
              <h6 class="card-subtitle mb-2 text-muted">Valor unitário : ${item._produto.valor}</h6>
              <p class="card-text"> Valor total : ${item._produto.valor *item._quantidade }</p>
            </div>
          </div>
          </li>`)
          total += item._produto.valor * item._quantidade;
        })
        $('#total').text(`R$ ${total}`)
    } else {
        $('.lista-atacados').append(`<li>
            <div class="card" style="width: 18rem;">
                <div class="card-body-carrinho">
              <h5 class="card-title">Carrinho vazio!</h5>
            </div>
          </div>
          </li>`)
          $('#total').text(``)
          $('#finalizar-compra').css('display', 'none');
    }

    $('#finalizar-compra').click(function (e) { 
        e.preventDefault();
        alert('Compra finalizada com sucesso!');
        localStorage.removeItem('carrinho')
        window.location.reload();   
    });
});