
<script setup>
import { ref, onMounted } from 'vue'

const pets = ref([])
const tutores = ref([])

const nome = ref('')
const especie = ref('')
const raca = ref('')
const sexo = ref('')
const dataNascimento = ref('')
const tutorId = ref('')

const mensagem = ref('')

const urlPets = 'http://localhost:5111/api/Pet'
const urlTutores = 'http://localhost:5111/api/Tutor'

async function listarPets() {
  try {
    const resposta = await fetch(urlPets)
    pets.value = await resposta.json()
  } catch {
    mensagem.value = 'Erro ao carregar pets.'
  }
}

async function listarTutores() {
  try {
    const resposta = await fetch(urlTutores)
    tutores.value = await resposta.json()
  } catch {
    mensagem.value = 'Erro ao carregar tutores.'
  }
}

async function cadastrarPet() {
  mensagem.value = ''

  try {
    const resposta = await fetch(urlPets, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        nome: nome.value,
        especie: especie.value,
        raca: raca.value,
        sexo: sexo.value,
        dataNascimento: dataNascimento.value || null,
        tutorId: Number(tutorId.value)
      })
    })

    if (!resposta.ok) {
      mensagem.value = await resposta.text()
      return
    }

    alert('Pet cadastrado com sucesso!')

    nome.value = ''
    especie.value = ''
    raca.value = ''
    sexo.value = ''
    dataNascimento.value = ''
    tutorId.value = ''

    listarPets()
  } catch {
    mensagem.value = 'Erro ao cadastrar pet.'
  }
}

async function excluirPet(id) {
  if (!confirm('Deseja realmente excluir este pet?')) return

  try {
    const resposta = await fetch(urlPets + '/' + id, {
      method: 'DELETE'
    })

    if (!resposta.ok) {
      alert(await resposta.text())
      return
    }

    alert('Pet excluído!')
    listarPets()
  } catch {
    alert('Erro ao excluir pet.')
  }
}

onMounted(() => {
  listarPets()
  listarTutores()
})
</script>

<template>
  <div class="pagina">
    <h1>Pets</h1>

    <div class="formulario">
      <h2>Cadastrar pet</h2>

      <form @submit.prevent="cadastrarPet">
        <label>Nome do pet</label>
        <input v-model="nome" required>

        <label>Espécie</label>
        <select v-model="especie" required>
          <option value="">Selecione</option>
          <option value="Cachorro">Cachorro</option>
          <option value="Gato">Gato</option>
          <option value="Outro">Outro</option>
        </select>

        <label>Raça</label>
        <input v-model="raca">

        <label>Sexo</label>
        <select v-model="sexo">
          <option value="">Selecione</option>
          <option value="Macho">Macho</option>
          <option value="Fêmea">Fêmea</option>
        </select>

        <label>Data de nascimento</label>
        <input type="date" v-model="dataNascimento">

        <label>Tutor responsável</label>
        <select v-model="tutorId" required>
          <option value="">Selecione um tutor</option>
          <option
            v-for="tutor in tutores"
            :key="tutor.tutorId"
            :value="tutor.tutorId"
          >
            {{ tutor.nome }}
          </option>
        </select>

        <button type="submit">Cadastrar pet</button>
      </form>

      <p>{{ mensagem }}</p>
    </div>

    <div class="listagem">
      <h2>Pets cadastrados</h2>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Espécie</th>
            <th>Tutor</th>
            <th>Ações</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="pet in pets" :key="pet.petId">
            <td>{{ pet.petId }}</td>
            <td>{{ pet.nome }}</td>
            <td>{{ pet.especie }}</td>
            <td>{{ pet.nomeTutor }}</td>
            <td>
              <button class="excluir" @click="excluirPet(pet.petId)">
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

input, select {
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
