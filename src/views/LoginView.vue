
<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const email = ref('')
const senha = ref('')
const mensagem = ref('')

async function fazerLogin() {
  mensagem.value = ''

  try {
    const resposta = await fetch('http://localhost:5111/api/Login/entrar', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email.value,
        senha: senha.value
      })
    })

    if (!resposta.ok) {
      mensagem.value = 'E-mail ou senha incorretos.'
      return
    }

    const dados = await resposta.json()

    localStorage.setItem('usuario', JSON.stringify(dados))
    localStorage.setItem('loginHora', Date.now().toString())

    router.push('/dashboard')

  } catch (erro) {
    mensagem.value = 'Não foi possível conectar com o servidor.'
  }
}
</script>

<template>
  <div class="login">
    <div class="caixa">
      <h1>Clínica Veterinária</h1>
      <h2>Entrar</h2>

      <form @submit.prevent="fazerLogin">
        <label>E-mail</label>
        <input
          type="email"
          v-model="email"
          placeholder="Digite seu e-mail"
          required
        >

        <label>Senha</label>
        <input
          type="password"
          v-model="senha"
          placeholder="Digite sua senha"
          required
        >

        <button type="submit">Entrar</button>

        <p>{{ mensagem }}</p>
      </form>

      <router-link to="/cadastro">
        Não tenho cadastro
      </router-link>
    </div>
  </div>
</template>

<style scoped>
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 85vh;
  font-family: Arial, sans-serif;
}

.caixa {
  background-color: white;
  padding: 35px;
  width: 350px;
  border-radius: 10px;
  box-shadow: 0 0 10px #ccc;
  text-align: center;
}

h1 {
  color: #39734d;
  font-size: 24px;
}

h2 {
  margin-bottom: 25px;
}

form {
  display: flex;
  flex-direction: column;
  text-align: left;
}

label {
  margin-bottom: 5px;
}

input {
  padding: 11px;
  margin-bottom: 18px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

button {
  padding: 12px;
  background-color: #39734d;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-bottom: 15px;
}

button:hover {
  background-color: #285a3a;
}

p {
  color: red;
}

a {
  color: #39734d;
}
</style>
