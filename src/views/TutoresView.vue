
<script setup>
import { ref, onMounted } from 'vue'

const tutores = ref([])
const busca = ref('')
const nome = ref('')
const cpf = ref('')
const telefone = ref('')
const email = ref('')
const endereco = ref('')
const mensagem = ref('')

const url = 'http://localhost:5111/api/Tutor'

async function listarTutores() {
  try {
    const resposta = await fetch(url + '?busca=' + busca.value)
    tutores.value = await resposta.json()
  } catch {
    mensagem.value = 'Erro ao carregar tutores.'
  }
}

async function cadastrarTutor() {
  mensagem.value = ''

  try {
    const resposta = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        nome: nome.value,
        cpf: cpf.value,
        telefone: telefone.value,
        email: email.value,
        endereco: endereco.value
      })
    })

    if (!resposta.ok) {
      mensagem.value = await resposta.text()
      return
    }

    alert('Tutor cadastrado com sucesso!')

    nome.value = ''
    cpf.value = ''
    telefone.value = ''
    email.value = ''
    endereco.value = ''

    listarTutores()
  } catch {
    mensagem.value = 'Erro ao cadastrar tutor.'
  }
}

async function excluirTutor(id) {
  if (!confirm('Deseja realmente excluir este tutor?')) return

  try {
    const resposta = await fetch(url + '/' + id, {
      method: 'DELETE'
    })

    if (!resposta.ok) {
      alert(await resposta.text())
      return
    }

    alert('Tutor excluído!')
    listarTutores()
  } catch {
    alert('Erro ao excluir tutor.')
  }
}

onMounted(listarTutores)
</script>

<template>
  <div class="pagina">
    <h1>Tutores</h1>

    <div class="formulario">
      <h2>Cadastrar tutor</h2>

      <form @submit.prevent="cadastrarTutor">
        <label>Nome</label>
        <input v-model="nome" required>

        <label>CPF</label>
        <input v-model="cpf" placeholder="Digite somente os números" required>

        <label>Telefone</label>
        <input v-model="telefone" required>

        <label>E-mail</label>
        <input v-model="email" type="email">

        <label>Endereço</label>
        <input v-model="endereco">

        <button type="submit">Cadastrar tutor</button>
      </form>

      <p>{{ mensagem }}</p>
    </div>

    <div class="listagem">
      <h2>Tutores cadastrados</h2>

      <input
        v-model="busca"
        @input="listarTutores"
        placeholder="Pesquisar por nome ou telefone"
      >

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Telefone</th>
            <th>Ações</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="tutor in tutores" :key="tutor.tutorId">
            <td>{{ tutor.tutorId }}</td>
            <td>{{ tutor.nome }}</td>
            <td>{{ tutor.telefone }}</td>
            <td>
              <button class="excluir" @click="excluirTutor(tutor.tutorId)">
                Excluir
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
.pagina {
  padding: 30px;
  font-family: Arial, sans-serif;
}

h1, h2 {
  color: #39734d;
}

.formulario, .listagem {
  background: white;
  padding: 25px;
  margin-top: 20px;
  border-radius: 10px;
  box-shadow: 0 0 8px #ccc;
}

form {
  display: flex;
  flex-direction: column;
  max-width: 500px;
}

label {
  margin-top: 12px;
}

input {
  padding: 10px;
  margin-top: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

button {
  padding: 10px;
  margin-top: 15px;
  background: #39734d;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.excluir {
  background: #c0392b;
  margin: 0;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

th, td {
  padding: 12px;
  border-bottom: 1px solid #ddd;
  text-align: left;
}
</style>
