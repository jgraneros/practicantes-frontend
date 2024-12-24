import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import DashboardView from '../views/DashboardView.vue'

const routes = [
  {
    path: '/',
    name: 'Login',
    component: LoginView,
  }, {
    path: '/dashboard',
    name: 'Dashboard',
    component: DashboardView,
  }
]



const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('token');

  if (to.path === '/dashboard' && !isAuthenticated) {
      next('/'); 
  } else {
      next();
  }
});


export default router
