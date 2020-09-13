class Usuario {

    constructor(id, nome, email, cnpj, senha, tipo, ativo, endereco) {
        this._id = id;
        this._nome = nome;
        this._email = email;
        this._cnpj = cnpj;
        this._senha = senha;
        this._tipo = tipo;
        this._ativo = ativo;
        this._endereco = endereco;
    }

    // SETTERS AND GETTERS

    setId(id) {
        this._id = id;
    }

    getId() {
        return this._id;
    }

    setNome(nome) {
        this._nome = nome;
    }

    getNome() {
        return this._nome;
    }

    setEmail(email) {
        this._email = email;
    }

    getEmail() {
        return this._email;
    }

    setCnpj(cnpj) {
        this._cnpj = cnpj;
    }

    getCnpj() {
        return this._cnpj;
    }

    setSenha(senha) {
        this._senha = senha;
    }

    getSenha() {
        return this._senha;
    }

    setTipo(tipo) {
        this._tipo = tipo;
    }

    getTipo() {
        return this._tipo;
    }

    setAtivo(ativo) {
        this._ativo = ativo;
    }

    getAtivo() {
        return this._ativo;
    }

    setEndereco(endereco) {
        this._endereco = endereco;
    }

    getEndereco() {
        return this._endereco;
    }

}