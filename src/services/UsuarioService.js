import axiosConfig from '../config/AxiosConfig'

class UsuarioService {

    inserir(usuario) {
        return axiosConfig.post("usuario", usuario);
    }

    alterar(usuario) {
        return axiosConfig.put("usuario", usuario);
    }

    listar() {
        return axiosConfig.get("usuario");
    }

    consultar(codigoUsuario) {
        return axiosConfig.get(`usuario/${codigoUsuario}`);
    }

    excluir(codigoUsuario) {
        return axiosConfig.delete(`usuario/${codigoUsuario}`);
    }
}

export default UsuarioService;