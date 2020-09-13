export default class UserManager {

    static getUsuarioLogado() {
        let usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));
        console.log('retornando usuario logado : ' + usuarioLogado.id)
        return usuarioLogado;
    }

    static exibirInfosUsuario() {
        console.log(localStorage.getItem('usuarioLogado'));
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
                window.location.href = 'login.html';
            } else {
                if (!tiposPermitidos.include(usuarioLogado.tipo)) {
                    alert('Você não tem permissão para acessar esta página!')
                    window.location.href = 'index.html';
                }
            }
        }
    }
}