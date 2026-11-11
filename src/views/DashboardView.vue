
<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const usuario = JSON.parse(localStorage.getItem('usuario') || '{}')

function sair() {
  localStorage.removeItem('usuario')
  localStorage.removeItem('loginHora')
  router.push('/')
}
</script>

<template>
  <div class="dashboard">
    <h1>Clínica Veterinária</h1>

    <h2>Bem-vindo(a), {{ usuario.nome }}!</h2>
    <p>O que deseja acessar?</p>

    <div class="opcoes">
      <router-link to="/tutores" class="card">
        <h3>Tutores</h3>
        <p>Gerenciar tutores cadastrados</p>
      </router-link>

      <router-link to="/pets" class="card">
        <h3>Pets</h3>
        <p>Gerenciar animais cadastrados</p>
      </router-link>

      <router-link to="/agendamentos" class="card">
        <h3>Agendamentos</h3>
        <p>Consultar e atualizar consultas</p>
      </router-link>
    </div>

    <button @click="sair">Sair do sistema</button>
  </div>
</template>

<style scoped>
.dashboard {
  padding: 30px;
  font-family: Arial, sans-serif;
}

h1 {
  color: #39734d;
}

h2 {
  margin-top: 25px;
}

.opcoes {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-top: 30px;
}

.card {
  background: white;
  padding: 25px;
  width: 220px;
  border-radius: 10px;
  box-shadow: 0 0 8px #ccc;
  text-decoration: none;
  color: #333;
}

.card h3 {
  color: #39734d;
}

button {
  margin-top: 30px;
  padding: 12px 25px;
  background: #39734d;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
</style>
