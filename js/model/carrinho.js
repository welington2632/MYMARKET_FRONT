class Carrinho {

    constructor(itens, usuario) {
        this._itens = itens;
        this._usuario = usuario;
    }

    setItens(itens) {
        this._itens = itens;
    }

    getItens() {
        return this._itens;
    }

    setUsuario(usuario) {
        this._usuario = usuario;
    }

    getUsuario() {
        return this._usuario;
    }
}