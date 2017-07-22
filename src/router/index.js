import Vue from 'vue'
import Router from 'vue-router'

import GlobalContainer from '@/containers/Global'
import SchoolAdminContainer from '@/containers/SchoolAdmin'
import EventManagerContainer from '@/containers/EventManager'
import CreateEvent from '@/pages/organization/CreateEvent'

import Schools from '@/pages/global/Schools'
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
      path: '/global',
      name: 'Global Admin',
      component: GlobalContainer,
      meta: {
        requiredAuth: true,
      },
      children: [
        {
          path: 'schools',
          name: 'School Dashboard',
          component: Schools,
        }, {
          path: 'schools/create',
          name: 'Create school',
          component: CreateSchool,
        }
      ]
    }, {
      path: '/school/:schoolName/event-manager',
      name: 'EventManager',
      component: EventManagerContainer,
      meta: {
        requiredAuth: true,
        noNavbar: true,
      },
      children: [
        {
          path: '',
          name: 'Events',
          component: EventManager
        }, {
          path: 'create',
          alias: 'edit',
          name: 'CreateEvent',
          component: CreateEvent,
        }
      ]
    }, {
      path: '/school/:schoolName',
      name: 'University',
      component: SchoolAdminContainer,
      meta: {
        requiredAuth: true,
        noNavbar: true,
      },
      children: [
        {
          path: 'dashboard',
          name: 'Dashboard',
          component: Dashboard,
        }, {
          path: 'events',
          name: 'Events',
          component: Events,
        }, {
          path: 'users',
          name: 'Users',
          component: Users,
        }, {
          path: 'listings',
          name: 'Listings',
          component: Listings,
        }, {
          path: 'filters',
          name: 'Filters',
          component: Filters,
        }, {
          path: 'organizations',
          name: 'Organizations',
          component: Organizations,
        }, {
          path: 'sponsors',
          name: 'Sponsors',
          component: Sponsors,
        }
      ],
    }
  ],
})
