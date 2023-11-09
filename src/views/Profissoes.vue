<template>
    <div class="card position-absolute w-75 top-50 start-50 translate-middle shadow">
        <div class="card-header text-center">
            <h1>Profissões</h1>
            <hr/>
            <router-link to="/profissao" class="btn btn-primary">
                Nova profissão
            </router-link>

            <router-link to="/" class="btn btn-primary ms-5">
                Consultar Usuários
            </router-link>

            <router-link to="/usuario" class="btn btn-primary ms-5">
                Novo Usuário
            </router-link>
            <hr/>
        </div>
        <div class="card-body">
            <table class="table text-center">
                <thead>
                    <tr>
                        <th>Código</th>
                        <th>Nome</th>
                        <th colspan="2">Ações</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="profissao in profissoes">
                        <td>{{ profissao.codigoProfissao }}</td>
                        <td>{{ profissao.nomeProfissao }}</td>
                        <td>
                            <button class="btn btn-primary" @click="consultar(profissao.codigoProfissao)">Consultar</button>
                        </td>
                        <td>
                            <button class="btn btn-danger" @click="excluir(profissao.codigoProfissao)">Excluir</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div class="card-header text-center">
            <router-link to="/" class="btn btn-secondary ms-5">
                Voltar
            </router-link>
            <hr/>
        </div>
    </div>
</template>

<script setup>
    import Swal from 'sweetalert2'
    import ProfissaoService from '../services/ProfissaoService'
    import { ref, onBeforeMount } from 'vue'
    import router from '../router'

    const profissaoService = new ProfissaoService()
    const profissoes = ref([])

    onBeforeMount(() => {
        listar()
    })

    function listar() {
        profissaoService.listar().then((response) => {
            profissoes.value = response.data
        }).catch((error) => {
            Swal.fire({title: "Erro", 
            text: "Erro ao listar profissões", icon: "error",
            allowOutsideClick: false})
        })
    }

    function excluir(codigoProfissao) {
        Swal.fire({title: "Atenção", 
        text: "Deseja realmente excluir esta profissão?",
        icon: "question", confirmButtonText: "Sim",
        cancelButtonText: "Não", showCancelButton: true,
        confirmButtonColor: "green", cancelButtonColor: "red",
        allowOutsideClick: false}).then((response) => {
            if(response.isConfirmed) {
                profissaoService.excluir(codigoProfissao)
                .then((response) => {
                    Swal.fire({title: "Sucesso",
                    text: "Profissão excluída com sucesso!",
                    icon: "success"}).then((response) => {
                        if(response.isConfirmed) {
                            listar()
                        }
                    })
                }).catch((error) => {
                    Swal.fire({title: "Erro",
                    text: "Erro ao excluir da profissão",
                    icon: "error"})
                })
            }
        })
    }

    function consultar(codigoProfissao) {
        router.push(`/profissao/${codigoProfissao}`)
    }
</script>