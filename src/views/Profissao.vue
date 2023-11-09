<template>
    <div class="card position-absolute w-75 top-50 start-50 translate-middle shadow">
        <div class="card-header text-center">
            <h1>Formulário da profissão</h1>
            <hr/>
            <router-link to="/" class="btn btn-secondary">
                Voltar
            </router-link>
            <hr/>
        </div>
        <div class="card-body">
            <form @submit.prevent="gravar()">
                <div>
                    <label for="codigoProfissao">Código:</label>
                    <input type="text" class="form-control" 
                    readonly v-model="profissao.codigoProfissao"/>
                </div>
                <div class="mt-3">
                    <label for="nomeProfissao">Nome:</label>
                    <input type="text" class="form-control" 
                    required v-model="profissao.nomeProfissao"/>
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
    import ProfissaoService from '../services/ProfissaoService'
    import Swal from 'sweetalert2'
    import router from '../router'

    const codigoProfissao = useRoute().params.codigoProfissao
    const profissaoService = new ProfissaoService()
    const erros = ref(null)
    const profissao = ref({
        codigoProfissao: '',
        nomeProfissao: ''
    })

    onBeforeMount(() => {
        if(codigoProfissao) {
            consultar(codigoProfissao)
        }
    })

    function consultar(codigoProfissao) {
        profissaoService.consultar(codigoProfissao).then((response) => {
            profissao.value = response.data
        }).catch((error) => {
            Swal.fire({title: "Erro", text: error.response.data.mensagem,
            icon: "error", allowOutsideClick: false})
        })
    }

    function gravar() {
        if(profissao.value.codigoProfissao) {
            profissaoService.alterar(profissao.value).then((response) => {
                Swal.fire({title: "Sucesso", text: "Profissão alterada com sucesso",
                icon: "success", allowOutsideClick: false}).then((response) => {
                    if(response.isConfirmed) {
                        router.push("/")
                    }
                })
            }).catch((error) => {
                erros.value = error.response.data.mensagem
                Swal.fire({title: "Erro", text: "Erro ao alterar profissão",
                icon: "error", allowOutsideClick: false})
            })
        } else {
            profissaoService.inserir(profissao.value).then((response) => {
                Swal.fire({title: "Successo", text: "Profissão inserida com sucesso",
                icon: "success", allowOutsideClick: false}).then((response) => {
                    if(response.isConfirmed) {
                        router.push("/")
                    }
                })
            }).catch((error) => {
                erros.value = error.response.data.mensagem
                Swal.fire({title: "Erro", text: "Erro ao inserir profissão",
                icon: "error", allowOutsideClick: false})
            })
        }
    }
</script>