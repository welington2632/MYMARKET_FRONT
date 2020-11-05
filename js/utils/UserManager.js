class UserManager {

    static getUsuarioLogado() {
        let usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));
        return usuarioLogado;
    }

    static setUsuarioLogado(usuario) {
        //localStorage.setItem('usuarioLogado',usuario);
        localStorage.setItem('usuarioLogado', JSON.stringify(usuario))
        console.log(`usuario logado definido com sucesso!\n${usuario}`)
    }

    static VerificacaoUsuario(paginaPrivada, tiposPermitidos) {
        let usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));
        if (paginaPrivada){
            if (usuarioLogado == undefined) {
                alert('Você precisa estar logado para acessar esta página!');
                window.history.back();

            } else {
                if (!tiposPermitidos.includes(usuarioLogado.tipo)) {
                    alert('Você não tem permissão para acessar esta página!')
                    window.history.back();

                }
            }
        }
    }
}