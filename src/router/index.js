import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/pages/Login'
import Dashboard from '@/components/pages/Dashboard'
import Users from '@/components/pages/Users'
import Filters from '@/components/pages/Filters'
import Listings from '@/components/pages/Listings'
import Organizations from '@/components/pages/Organizations'
import Sponsors from '@/components/pages/Sponsors'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login,
    }, {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard,
      meta: { auth: true }
    }, {
      path: '/users',
      name: 'Users',
      component: Users,
      meta: { auth: true }
    }, {
      path: '/filters',
      name: 'Filters',
      component: Filters,
      meta: { auth: true }
    }, {
      path: '/listings',
      name: 'Listings',
      component: Listings,
      meta: { auth: true }
    }, {
      path: '/organizations',
      name: 'Organizations',
      component: Organizations,
      meta: { auth: true }
    }, {
      path: '/sponsors',
      name: 'Sponsors',
      component: Sponsors,
      meta: { auth: true }
    }
  ],
})
