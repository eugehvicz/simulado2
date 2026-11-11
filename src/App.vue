
<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div id="app">

    <header>
      <div class="logo">
        <div class="logo-icon">🐾</div>
        <div>
          <h1>VetCare</h1>
        </div>
      </div>

      <nav>
        <router-link to="/" class="menu-link">
          Login
        </router-link>

        <router-link to="/cadastro" class="menu-link">
          Cadastro
        </router-link>

        <router-link to="/dashboard" class="menu-link">
          Início
        </router-link>

        <router-link to="/tutores" class="menu-link">
          Tutores
        </router-link>

        <router-link to="/pets" class="menu-link">
          Pets
        </router-link>

        <router-link to="/agendamentos" class="menu-link">
          Agendamentos
        </router-link>
      </nav>
    </header>

    <main>
      <router-view></router-view>
    </main>

    

  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: Arial, sans-serif;
  background-color: #f3f6f4;
  color: #333;
}

header {
  width: 100%;
  min-height: 85px;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px 5%;
  box-shadow: 0 3px 12px rgba(0, 0, 0, 0.08);
  border-bottom: 3px solid #39734d;
  gap: 20px;
  flex-wrap: wrap;
}

.logo {
  display: flex;
  align-items: center;
  gap: 12px;
}

.logo-icon {
  width: 48px;
  height: 48px;
  background-color: #e5f1e8;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 27px;
}

.logo h1 {
  color: #39734d;
  font-size: 25px;
}

.logo span {
  font-size: 12px;
  color: #888;
}

nav {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  flex-wrap: wrap;
}

.menu-link {
  text-decoration: none;
  color: #555;
  font-size: 14px;
  font-weight: bold;
  padding: 11px 15px;
  border-radius: 8px;
  transition: 0.3s;
}

.menu-link:hover {
  background-color: #e5f1e8;
  color: #39734d;
}

.menu-link.router-link-active {
  background-color: #39734d;
  color: white;
}

main {
  min-height: calc(100vh - 145px);
  padding: 20px;
}

footer {
  background-color: white;
  text-align: center;
  padding: 18px;
  color: #888;
  font-size: 12px;
  border-top: 1px solid #e5e5e5;
}

@media (max-width: 800px) {
  header {
    flex-direction: column;
    justify-content: center;
  }

  nav {
    width: 100%;
  }

  .menu-link {
    font-size: 12px;
    padding: 9px;
  }
}
</style>
