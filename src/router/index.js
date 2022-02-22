import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/pages/login',
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('@/views/dashboard/Dashboard.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/manage-account',
    name: 'manage-account',
    component: () => import('@/views/accounts/Manage-accounts.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/pages/account-settings/:id',
    name: 'pages-account-settings',
    component: () => import('@/views/pages/account-settings/AccountSettings.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/manage-cars/:id',
    name: 'manage-cars',
    component: () => import('@/views/valeting/manage-cars.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/list-cars/:id',
    name: 'list-cars',
    component: () => import('@/views/valeting/service-cars'),
    meta: { requiresAuth: true }
  },
  {
    path: '/pages/login',
    name: 'pages-login',
    component: () => import('@/views/pages/Login.vue'),
    meta: {
      layout: 'blank',
    },
  },
  {
    path: '/pages/register',
    name: 'pages-register',
    component: () => import('@/views/pages/Register.vue'),
    meta: {
      layout: 'blank',
    },
  },
  {
    path: '/error-404',
    name: 'error-404',
    component: () => import('@/views/Error.vue'),
    meta: {
      layout: 'blank',
    },
  },
  {
    path: '*',
    redirect: 'error-404',
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (localStorage.getItem('isLogin') !== 'true') {
      next({
        path: '/pages/login',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  } else {
    next() // make sure to always call next()!
  }
})

export default router
