import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/components/pages/Login'
import LoginForgot from '@/components/pages/login/Forgot'
import LoginReset from '@/components/pages/login/Reset'
import LoginUser from '@/components/pages/login/User'
import LoginSuccess from '@/components/pages/login/Success'

import Dashboard from '@/components/pages/Dashboard'
import Users from '@/components/pages/Users'
import Filters from '@/components/pages/Filters'
import Flagged from '@/components/pages/Flagged'
import Organizations from '@/components/pages/Organizations'
import Sponsors from '@/components/pages/Sponsors'

const Logout = {
  name: 'Logout',
  mounted () {
    this.$router.push({
      path: '/login',
    })
  }
}

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login,
      children: [
        {
          path: '*',
          name: 'User',
          component: LoginUser,
        }, {
          path: 'forgot',
          name: 'Forgot',
          component: LoginForgot,
        }, {
          path: 'reset',
          name: 'Reset',
          component: LoginReset,
        }, {
          path: 'success',
          name: 'Success',
          component: LoginSuccess,
        }
      ]
    }, {
      path: '/logout',
      name: 'Logout',
      component: Logout,
    }, {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard,
      meta: {
        requiredAuth: true,
      }
    }, {
      path: '/users',
      name: 'Users',
      component: Users,
      meta: {
        requiredAuth: true,
      }
    }, {
      path: '/filters',
      name: 'Filters',
      component: Filters,
      meta: {
        requiredAuth: true,
      }
    }, {
      path: '/flagged',
      name: 'Flagged',
      component: Flagged,
      meta: {
        requiredAuth: true,
      }
    }, {
      path: '/organizations',
      name: 'Organizations',
      component: Organizations,
      meta: {
        requiredAuth: true,
      }
    }, {
      path: '/sponsors',
      name: 'Sponsors',
      component: Sponsors,
      meta: {
        requiredAuth: true,
      }
    }
  ],
})
