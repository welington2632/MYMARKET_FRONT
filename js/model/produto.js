class Produto  {
    
    ListarProdutos() {
        fetch('http://localhost:8080/api/produtos/', {method: "GET"}).then(response => {
            response.json().then(json => {
                return json;
            })
        }).catch(error => {
            alert('Houve algum erro no cadastro do produto!');
            console.log('error: ' + error);
        })
    }
}