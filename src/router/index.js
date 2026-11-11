
import { createRouter, createWebHistory } from 'vue-router'

import LoginView from '../views/LoginView.vue'
import CadastroUsuarioView from '../views/CadastroUsuarioView.vue'
import DashboardView from '../views/DashboardView.vue'
import TutoresView from '../views/TutoresView.vue'
import PetsView from '../views/PetsView.vue'
import AgendamentosView from '../views/AgendamentosView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),

  routes: [
    {
      path: '/',
      name: 'Login',
      component: LoginView
    },
    {
      path: '/cadastro',
      name: 'Cadastro',
      component: CadastroUsuarioView
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: DashboardView
    },
    {
      path: '/tutores',
      name: 'Tutores',
      component: TutoresView
    },
    {
      path: '/pets',
      name: 'Pets',
      component: PetsView
    },
    {
      path: '/agendamentos',
      name: 'Agendamentos',
      component: AgendamentosView
    }
  ]
})

export default router
