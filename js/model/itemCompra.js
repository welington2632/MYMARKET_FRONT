export default class itemCompra {
    constructor(produto, quantidade) {
        this._produto = produto;
        this._quantidade = quantidade
    }

    setProduto(produto) {
        this._produto = produto;
    }
    
    getProduto() {
        return this._produto;
    }

    setQuantidade(quantidade) {
        this._quantidade = quantidade;
    }

    getQuantidade() {
        return this._quantidade;
    }
}