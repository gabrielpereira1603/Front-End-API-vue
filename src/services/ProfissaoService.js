import axiosConfig from '../config/AxiosConfig'

class ProfissaoService {

    inserir(profissao) {
        return axiosConfig.post("profissao", profissao);
    }

    alterar(profissao) {
        return axiosConfig.put("profissao", profissao);
    }

    listar() {
        return axiosConfig.get("profissao");
    }

    consultar(codigoProfissao) {
        return axiosConfig.get(`profissao/${codigoProfissao}`);
    }

    excluir(codigoProfissao) {
        return axiosConfig.delete(`profissao/${codigoProfissao}`);
    }
}

export default ProfissaoService;