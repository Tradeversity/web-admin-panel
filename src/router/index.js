import Vue from 'vue'
import Router from 'vue-router'

import Super from '@/pages/global/Schools'
import CreateSchool from '@/pages/global/CreateSchool'

import EventManager from '@/pages/organization/Events'

import Login from '@/pages/Login'
import LoginForgot from '@/pages/login/Forgot'
import LoginReset from '@/pages/login/Reset'
import LoginUser from '@/pages/login/User'
import LoginSuccess from '@/pages/login/Success'

import Dashboard from '@/pages/school/Dashboard'
import Users from '@/pages/school/Users'
import Listings from '@/pages/school/Listings'
import Filters from '@/pages/school/Filters'
import Events from '@/pages/school/Events'
import Organizations from '@/pages/school/Organizations'
import Sponsors from '@/pages/school/Sponsors'

const Logout = {
  name: 'Logout',
  template: '<p>Logging out...</p>',
  created () {
    this.$router.push({
      path: '/login',
    })
  }
}

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '*',
      name: 'redirect',
      redirect: '/login',
    }, {
      path: '/login',
      // name: 'Login',
      component: Login,
      children: [
        {
          path: '',
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
      path: '/super',
      name: 'Super',
      component: Super,
      meta: {
        requiredAuth: true,
        noNavbar: true,
      }
    }, {
      path: '/super/create-school',
      name: 'Create School',
      component: CreateSchool,
    }, {
      path: '/school/:schoolName/event-manager',
      name: 'EventManager',
      component: EventManager,
      meta: {
        requiredAuth: true,
        noNavbar: true,
      }
    }, {
      path: '/school/:schoolName/events',
      name: 'Events',
      component: Events,
      meta: {
        requiredAuth: true,
      }
    }, {
      path: '/school/:schoolName/dashboard',
      name: 'Dashboard',
      component: Dashboard,
      meta: {
        requiredAuth: true,
      }
    }, {
      path: '/school/:schoolName/users',
      name: 'Users',
      component: Users,
      meta: {
        requiredAuth: true,
      }
    }, {
      path: '/school/:schoolName/listings',
      name: 'Listings',
      component: Listings,
      meta: {
        requiredAuth: true,
      }
    }, {
      path: '/school/:schoolName/filters',
      name: 'Filters',
      component: Filters,
      meta: {
        requiredAuth: true,
      }
    },
    // }, {
    //   path: '/school/:schoolName/flagged',
    //   name: 'Flagged',
    //   component: Flagged,
    //   meta: {
    //     requiredAuth: true,
    //   }
    // }, {
    {
      path: '/school/:schoolName/organizations',
      name: 'Organizations',
      component: Organizations,
      meta: {
        requiredAuth: true,
      }
    }, {
      path: '/school/:schoolName/sponsors',
      name: 'Sponsors',
      component: Sponsors,
      meta: {
        requiredAuth: true,
      }
    }
  ],
})
