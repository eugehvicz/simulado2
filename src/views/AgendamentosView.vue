
<script setup>
import { ref, onMounted } from 'vue'

const agendamentos = ref([])
const pets = ref([])

const dataAgendamento = ref('')
const motivo = ref('')
const status = ref('Agendado')
const petId = ref('')

const mensagem = ref('')

const urlAgendamentos = 'http://localhost:5111/api/Agendamento'
const urlPets = 'http://localhost:5111/api/Pet'


async function listarAgendamentos() {
  try {
    const resposta = await fetch(urlAgendamentos)
    agendamentos.value = await resposta.json()
  } catch {
    mensagem.value = 'Erro ao carregar agendamentos.'
  }
}


async function listarPets() {
  try {
    const resposta = await fetch(urlPets)
    pets.value = await resposta.json()
  } catch {
    mensagem.value = 'Erro ao carregar pets.'
  }
}


async function cadastrarAgendamento() {
  mensagem.value = ''

  try {
    const resposta = await fetch(urlAgendamentos, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        dataAgendamento: dataAgendamento.value,
        motivo: motivo.value,
        status: status.value,
        petId: Number(petId.value)
      })
    })

    if (!resposta.ok) {
      mensagem.value = await resposta.text()
      return
    }

    alert('Agendamento cadastrado com sucesso!')

    dataAgendamento.value = ''
    motivo.value = ''
    status.value = 'Agendado'
    petId.value = ''

    listarAgendamentos()

  } catch {
    mensagem.value = 'Erro ao cadastrar agendamento.'
  }
}


async function editarData(agendamento) {
  const novaData = prompt(
    'Digite a nova data e horário (AAAA-MM-DDTHH:mm):',
    agendamento.dataAgendamento.substring(0, 16)
  )

  if (!novaData) return

  const pet = pets.value.find(
    p => p.nome === agendamento.nomePet
  )

  if (!pet) {
    alert('Não foi possível identificar o pet.')
    return
  }

  try {
    const resposta = await fetch(
      urlAgendamentos + '/' + agendamento.agendamentoId,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          dataAgendamento: novaData,
          motivo: '',
          status: agendamento.status,
          petId: pet.petId
        })
      }
    )

    if (!resposta.ok) {
      alert(await resposta.text())
      return
    }

    alert('Data atualizada com sucesso!')
    listarAgendamentos()

  } catch {
    alert('Erro ao atualizar agendamento.')
  }
}



async function excluirAgendamento(id) {
  if (!confirm('Deseja realmente excluir este agendamento?')) return

  try {
    const resposta = await fetch(urlAgendamentos + '/' + id, {
      method: 'DELETE'
    })

    if (!resposta.ok) {
      alert(await resposta.text())
      return
    }

    alert('Agendamento excluído!')
    listarAgendamentos()

  } catch {
    alert('Erro ao excluir agendamento.')
  }
}

// Formatar data
function formatarData(data) {
  return new Date(data).toLocaleString('pt-BR')
}

onMounted(() => {
  listarAgendamentos()
  listarPets()
})
</script>

<template>
  <div class="pagina">

    <h1>Agendamentos</h1>
    <p class="descricao">Gerencie as consultas da clínica veterinária.</p>

    <!-- Cadastro -->
    <div class="formulario">
      <h2>Novo agendamento</h2>

      <form @submit.prevent="cadastrarAgendamento">

        <div class="campo">
          <label>Pet</label>

          <select v-model="petId" required>
            <option value="">Selecione um pet</option>

            <option
              v-for="pet in pets"
              :key="pet.petId"
              :value="pet.petId"
            >
              {{ pet.nome }} - {{ pet.nomeTutor }}
            </option>
          </select>
        </div>

        <div class="campo">
          <label>Data e horário</label>

          <input
            type="datetime-local"
            v-model="dataAgendamento"
            required
          >
        </div>

        <div class="campo">
          <label>Motivo da consulta</label>

          <input
            type="text"
            v-model="motivo"
            placeholder="Ex: Consulta de rotina"
          >
        </div>

        <div class="campo">
          <label>Status</label>

          <select v-model="status" required>
            <option value="Agendado">Agendado</option>
            <option value="Confirmado">Confirmado</option>
            <option value="Concluído">Concluído</option>
            <option value="Cancelado">Cancelado</option>
          </select>
        </div>

        <button type="submit" :disabled="pets.length === 0">
          Cadastrar agendamento
        </button>

        <p v-if="pets.length === 0" class="aviso">
          Cadastre um pet antes de realizar um agendamento.
        </p>

      </form>

      <p class="mensagem">{{ mensagem }}</p>
    </div>

    <!-- Listagem -->
    <div class="listagem">

      <h2>Consultas cadastradas</h2>

      <div class="tabela">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Data e horário</th>
              <th>Pet</th>
              <th>Tutor</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>

          <tbody>
            <tr
              v-for="agendamento in agendamentos"
              :key="agendamento.agendamentoId"
            >
              <td>{{ agendamento.agendamentoId }}</td>

              <td>
                {{ formatarData(agendamento.dataAgendamento) }}
              </td>

              <td>{{ agendamento.nomePet }}</td>

              <td>{{ agendamento.nomeTutor }}</td>

              <td>
                <span class="status">
                  {{ agendamento.status }}
                </span>
              </td>

              <td>
                <button
                  class="editar"
                  @click="editarData(agendamento)"
                >
                  Editar data
                </button>

                <button
                  class="excluir"
                  @click="excluirAgendamento(agendamento.agendamentoId)"
                >
                  Excluir
                </button>
              </td>
            </tr>

            <tr v-if="agendamentos.length === 0">
              <td colspan="6" class="vazio">
                Nenhum agendamento cadastrado.
              </td>
            </tr>
          </tbody>
        </table>
      </div>

    </div>

  </div>
</template>

<style scoped>
.pagina {
  padding: 30px;
  font-family: Arial, sans-serif;
}

h1 {
  color: #39734d;
  font-size: 28px;
}

h2 {
  color: #39734d;
  margin-bottom: 20px;
}

.descricao {
  color: #777;
  margin-top: 8px;
}

.formulario,
.listagem {
  background-color: white;
  padding: 25px;
  margin-top: 25px;
  border-radius: 12px;
  box-shadow: 0 3px 12px rgba(0, 0, 0, 0.06);
}

form {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 18px;
}

.campo {
  display: flex;
  flex-direction: column;
}

label {
  margin-bottom: 8px;
  font-weight: bold;
  color: #444;
}

input,
select {
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 7px;
  outline: none;
  font-size: 14px;
}

input:focus,
select:focus {
  border-color: #39734d;
}

button {
  padding: 12px 18px;
  border: none;
  border-radius: 7px;
  background-color: #39734d;
  color: white;
  cursor: pointer;
  font-weight: bold;
  transition: 0.3s;
}

button:hover {
  opacity: 0.85;
}

button:disabled {
  background-color: #999;
  cursor: not-allowed;
}

form > button {
  align-self: end;
}

.mensagem {
  color: #c0392b;
  margin-top: 12px;
}

.aviso {
  color: #c0392b;
  align-self: center;
}

.tabela {
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 15px;
}

th {
  background-color: #e5f1e8;
  color: #39734d;
}

th,
td {
  padding: 14px;
  border-bottom: 1px solid #eee;
  text-align: left;
  white-space: nowrap;
}

.status {
  background-color: #e5f1e8;
  color: #39734d;
  padding: 6px 10px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: bold;
}

.editar {
  background-color: #39734d;
  margin-right: 5px;
}

.excluir {
  background-color: #c0392b;
}

.vazio {
  text-align: center;
  color: #888;
}

@media (max-width: 700px) {
  .pagina {
    padding: 15px;
  }

  form {
    grid-template-columns: 1fr;
  }
}
</style>
