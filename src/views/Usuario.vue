<template>
    <div class="card position-absolute w-75 top-50 start-50 translate-middle shadow">
        <div class="card-header text-center">
            <h1>Formulário do Usuário</h1>
            <hr/>
            <router-link to="/" class="btn btn-secondary">
                Voltar
            </router-link>
            <hr/>
        </div>
        <div class="card-body">
            <form @submit.prevent="gravar()">
                <div>
                    <label for="codigoUsuario">Código:</label>
                    <input type="text" class="form-control" readonly v-model="usuario.codigoUsuario"/>
                </div>
                <div class="mt-3">
                    <label for="nomeUsuario">Nome:</label>
                    <input type="text" class="form-control" required v-model="usuario.nomeUsuario"/>
                </div>

                <div class="mt-3">
                    <label for="profissaoUsuario">Profissão:</label>
                    <select class="form-control" required v-model="usuario.profissaoUsuario">
                        <option v-for="profissao in profissoes" :key="profissao.id" :value="profissao.id">
                            {{ profissao.nomeProfissao }}
                        </option>
                    </select>
                </div>

                <div class="mt-3">
                    <label for="dataNascimento">Data de Nascimento:</label>
                    <input type="date" class="form-control" required v-model="usuario.dataNascimento"/>
                </div>
                <div class="mt-3 text-center">
                    <button type="submit" class="btn btn-success">Gravar</button>
                </div>
            </form>
        </div>
    </div>
</template>


<script setup>
    import { useRoute } from 'vue-router'
    import { ref, onBeforeMount } from 'vue'
    import UsuarioService from '../services/UsuarioService'
    import Swal from 'sweetalert2'
    import router from '../router'

    import ProfissaoService from '../services/ProfissaoService'
    const profissaoService = new ProfissaoService()
    
    const profissoes = ref([])
    
    onBeforeMount(() => {
        listar()
    })

    function listar() {
        profissaoService.listar().then((response) => {
            profissoes.value = response.data
        }).catch((error) => {
            Swal.fire({ title: "Erro", 
                        text: "Erro ao listar profissões", 
                        icon: "error",
                        allowOutsideClick: false 
            })
        })
    }

    const codigoUsuario = useRoute().params.codigoUsuario
    const usuarioService = new UsuarioService()
    const erros = ref(null)
    const usuario = ref({
        codigoUsuario: '',
        nomeUsuario: '',
        profissaoUsuario: '',
        dataNascimento: ''
    })

    onBeforeMount(() => {
        if(codigoUsuario) {
            consultar(codigoUsuario)
        }
    })

    function consultar(codigoUsuario) {
        usuarioService.consultar(codigoUsuario).then((response) => {
            usuario.value = response.data
        }).catch((error) => {
            Swal.fire({title: "Erro", text: error.response.data.mensagem,
            icon: "error", allowOutsideClick: false})
        })
    }

    function gravar() {
        if(usuario.value.codigoUsuario) {
            usuarioService.alterar(usuario.value).then((response) => {
                Swal.fire({title: "Sucesso", text: "Usuário alterado com sucesso",
                icon: "success", allowOutsideClick: false}).then((response) => {
                    if(response.isConfirmed) {
                        router.push("/")
                    }
                })
            }).catch((error) => {
                erros.value = error.response.data.mensagem
                Swal.fire({title: "Erro", text: "Erro ao alterar usuário",
                icon: "error", allowOutsideClick: false})
            })
        } else {
            usuarioService.inserir(usuario.value).then((response) => {
                Swal.fire({title: "Successo", text: "Usuário inserido com sucesso",
                icon: "success", allowOutsideClick: false}).then((response) => {
                    if(response.isConfirmed) {
                        router.push("/")
                    }
                })
            }).catch((error) => {
                erros.value = error.response.data.mensagem
                Swal.fire({title: "Erro", text: "Erro ao inserir usuário",
                icon: "error", allowOutsideClick: false})
            })
        }
    }
</script>
