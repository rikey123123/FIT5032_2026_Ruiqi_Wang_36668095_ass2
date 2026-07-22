import { createRouter, createWebHistory } from 'vue-router'
import AccountView from '../views/AccountView.vue'
import AdminView from '../views/AdminView.vue'
import HelpView from '../views/HelpView.vue'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import NotFoundView from '../views/NotFoundView.vue'
import RegisterView from '../views/RegisterView.vue'
import ResourcesView from '../views/ResourcesView.vue'
import SupportView from '../views/SupportView.vue'

const routes = [
  { path: '/', name: 'home', component: HomeView },
  { path: '/support', name: 'support', component: SupportView },
  { path: '/resources', name: 'resources', component: ResourcesView },
  { path: '/register', name: 'register', component: RegisterView },
  { path: '/login', name: 'login', component: LoginView },
  { path: '/account', name: 'account', component: AccountView },
  { path: '/admin', name: 'admin', component: AdminView },
  { path: '/help', name: 'help', component: HelpView },
  { path: '/:pathMatch(.*)*', name: 'not-found', component: NotFoundView },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
