<template>
    <div class="card position-absolute w-75 top-50 start-50 translate-middle shadow">
        <div class="card-header text-center">
            <h1>Usuários</h1>
            <hr/>
                <router-link to="/usuario" class="btn btn-primary">
                    Novo Usuário
                </router-link>
                
                <router-link to="/profissoes" class="btn btn-primary ms-5">
                    Consultar Profissões
                </router-link>

                <router-link to="/profissao" class="btn btn-primary ms-5">
                    Nova Profissão
                </router-link>
            <hr/>
            
        </div>
        <div class="card-body">
            <table class="table text-center">
                <thead>
                    <tr>
                        <th>Código</th>
                        <th>Nome</th>
                        <th>Profissão</th>
                        <th colspan="2">Data de Nascimento</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="usuario in usuarios">
                        <td>{{ usuario.codigoUsuario }}</td>
                        <td>{{ usuario.nomeUsuario }}</td>
                        <td>{{ usuario.profissaoUsuario }}</td>
                        <td>{{ usuario.dataNascimento }}</td>
                        <td>
                            <button class="btn btn-primary" @click="consultar(usuario.codigoUsuario)">Consultar</button>
                        </td>
                        <td>
                            <button class="btn btn-danger" @click="excluir(usuario.codigoUsuario)">Excluir</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script setup>
    import Swal from 'sweetalert2'
    import UsuarioService from '../services/UsuarioService'
    import { ref, onBeforeMount } from 'vue'
    import router from '../router'

    const usuarioService = new UsuarioService()
    const usuarios = ref([])

</script>