class Endereco {

    // CONSTRUCTOR
    constructor(id, cep, logradouro, cidade, estado, pais) {
        this._id = id;
        this._cep = cep;
        this._logradouro = logradouro;
        this._cidade = cidade;
        this._estado = estado;
        this._pais = pais;
    }

    // SETS AND GETTERS

    setId(id) {
        this._id = id;
    }

    getId() {
        return this._id;
    }

    setCep(cep) {
        this._cep = cep;
    }

    getCep() {
        return this._cep;
    }

    setLogradouro(logradouro) [
        this._logradouro = logradouro;
    ]

    getLogradouro() {
        return this._logradouro;
    }

    setCidade(cidade) {
        this._cidade = cidade;
    }

    getCidade() {
        return this._cidade;
    }

    setEstado(estado) {
        this._estado = estado;
    }

    getEstado() {
        return this._estado;
    }

    setPais(pais) {
        this._pais = pais;
    }

    getPais() {
        return this._pais;
    }
}
