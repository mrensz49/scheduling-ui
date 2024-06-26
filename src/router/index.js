import { h, resolveComponent } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import acl from '../acl';

import DefaultLayout from '@/layouts/DefaultLayout'

const routes = [
  {
    path: '/auth',
    redirect: '/pages/404',
    name: 'Auth',
    component: {
      render() {
        return h(resolveComponent('router-view'))
      },
    },
    children: [
      {
        path: 'login',
        name: 'Login',
        component: () => import('@/views/auth/Login'),
      },
      {
        path: 'register',
        name: 'Register',
        component: () => import('@/views/auth/Register'),
      },
      {
        path: 'forgot-password',
        name: 'ForgotPassword',
        component: () => import('@/views/auth/ForgotPassword'),
      },
      {
        path: 'password-reset/:token/:email',
        name: 'ResetPassword',
        component: () => import('@/views/auth/ResetPassword'),
      },
      {
        path: 'verify-email/:id/:hash',
        name: 'VerifyEmail',
        component: () => import('@/views/auth/VerifyEmail'),
      },
    ],
  },

  {
    path: '/member',
    redirect: '/pages/404',
    name: 'Member',
    component: DefaultLayout,
    children: [
      {
        path: 'add',
        name: 'Add Member',
        component: () => import('@/views/members/Add'),
      },
      {
        path: 'view',
        name: 'View Members',
        component: () => import('@/views/members/View'),
      },
      {
        path: 'view-edit/:id',
        name: 'View Member',
        component: () => import('@/views/members/ViewEdit'),
      },
      {
        path: 'group',
        name: 'Group',
        component: () => import('@/views/members/Group'),
      },
      {
        path: 'position/:id',
        name: 'Position',
        component: () => import('@/views/members/Position'),
      },
      {
        path: 'contact',
        name: 'Contact',
        component: () => import('@/views/members/Contact'),
      },
    ]
  },

  {
    path: '/schedule',
    redirect: '/pages/404',
    name: 'Schedule',
    component: DefaultLayout,
    children: [
      {
        path: 'midweek',
        name: 'Midweek',
        component: () => import('@/views/schedule/Midweek.vue'),
      },
    ]
  },

  {
    path: '/reports',
    redirect: '/pages/404',
    name: 'Reports',
    component: DefaultLayout,
    children: [
      {
        path: 'monthly-reports',
        name: 'Monthly Reports',
        component: () => import('@/views/reports/MonthlyReportsFS.vue'),
      },
      {
        path: 'field-service/:year/:month',
        name: 'Field Service',
        component: () => import('@/views/reports/FieldService'),
      },
    ]
  },

  {
    path: '/setup',
    name: 'Setup',
    component: DefaultLayout,
    children: [
      {
        path: 'songs-meeting',
        name: 'Meetings Song',
        component: () => import('@/views/setup/SongsMeeting'),
      },
      {
        path: 'treasures',
        name: 'Bahandi Gikan sa Pulong sa Diyos',
        component: () => import('@/views/setup/Treasures'),
      },
      {
        path: 'effective-ministry',
        name: 'Magmaepektibo sa Ministeryo',
        component: () => import('@/views/setup/EffectiveMinistry'),
      },
      {
        path: 'ministries',
        name: 'Effective Ministries',
        component: () => import('@/views/setup/Ministries'),
      },
      {
        path: 'christian-living',
        name: 'Christian Living',
        component: () => import('@/views/setup/ChristianLiving'),
      },
      {
        path: 'users',
        name: 'UsersRole',
        component: () => import('@/views/setup/Users'),
      },
      {
        path: 'admin/users',
        name: 'Admin / Users',
        component: () => import('@/views/setup/admin/Users'),
      },
      {
        path: 'admin/users-activity',
        name: 'Admin / Users Activity',
        component: () => import('@/views/setup/admin/UserActivity'),
      },
    ]
  },


  {
    path: '/settings',
    name: 'Settings',
    component: DefaultLayout,
    children: [
      {
        path: 'profile',
        name: 'Profile',
        component: () => import('@/views/settings/Profile'),
      },
    ]
  },

  {
    path: '/generate',
    name: 'Generate',
    component: DefaultLayout,
    children: [
      {
        path: 'information',
        name: 'Information',
        component: () => import('@/views/generate/Information'),
      },
      {
        path: 'publishers',
        name: 'Publishers',
        component: () => import('@/views/generate/Publishers'),
      },
      {
        path: 'pioneers',
        name: 'Pioneers',
        component: () => import('@/views/generate/Pioneers'),
      },
    ]
  },

    {
    path: '/others',
    name: 'Others',
    component: DefaultLayout,
    children: [
      {
        path: 'unchecked-members',
        name: 'Unchecked Members',
        component: () => import('@/views/others/UncheckedMembers'),
      },
    ]
  },

  {
    path: '/dashboard',
    name: 'Home',
    component: DefaultLayout,
    redirect: '/dashboard',
    children: [
      {
        path: '/dashboard?refresh=1',
        name: 'Dashboard',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
          import(/* webpackChunkName: "dashboard" */ '@/views/Dashboard.vue'),
      },

      {
        path: '/dashboard',
        name: 'Dashboard',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
          import(/* webpackChunkName: "dashboard" */ '@/views/Dashboard.vue'),
      },
    ]
  },

  {
    path: '/',
    name: 'Index',
    redirect: '/index',
    children: [
      {
        path: '/index',
        name: 'Index',
        component: () =>
          import(/* webpackChunkName: "dashboard" */ '@/views/Index.vue'),
      },
    ]
  },

  // {
  //   path: '/',
  //   name: 'Home',
  //   component: DefaultLayout,
  //   redirect: '/dashboard',
  //   children: [
  //     {
  //       path: '/dashboard',
  //       name: 'Dashboard',
  //       // route level code-splitting
  //       // this generates a separate chunk (about.[hash].js) for this route
  //       // which is lazy-loaded when the route is visited.
  //       component: () =>
  //         import(/* webpackChunkName: "dashboard" */ '@/views/Dashboard.vue'),
  //     },
  //     {
  //       path: '/theme',
  //       name: 'Theme',
  //       redirect: '/theme/typography',
  //     },
  //     {
  //       path: '/theme/colors',
  //       name: 'Colors',
  //       component: () => import('@/views/theme/Colors.vue'),
  //     },
  //     {
  //       path: '/theme/typography',
  //       name: 'Typography',
  //       component: () => import('@/views/theme/Typography.vue'),
  //     },
  //     {
  //       path: '/base',
  //       name: 'Base',
  //       component: {
  //         render() {
  //           return h(resolveComponent('router-view'))
  //         },
  //       },
  //       redirect: '/base/breadcrumbs',
  //       children: [
  //         {
  //           path: '/base/accordion',
  //           name: 'Accordion',
  //           component: () => import('@/views/base/Accordion.vue'),
  //         },
  //         {
  //           path: '/base/breadcrumbs',
  //           name: 'Breadcrumbs',
  //           component: () => import('@/views/base/Breadcrumbs.vue'),
  //         },
  //         {
  //           path: '/base/cards',
  //           name: 'Cards',
  //           component: () => import('@/views/base/Cards.vue'),
  //         },
  //         {
  //           path: '/base/carousels',
  //           name: 'Carousels',
  //           component: () => import('@/views/base/Carousels.vue'),
  //         },
  //         {
  //           path: '/base/collapses',
  //           name: 'Collapses',
  //           component: () => import('@/views/base/Collapses.vue'),
  //         },
  //         {
  //           path: '/base/list-groups',
  //           name: 'List Groups',
  //           component: () => import('@/views/base/ListGroups.vue'),
  //         },
  //         {
  //           path: '/base/navs',
  //           name: 'Navs',
  //           component: () => import('@/views/base/Navs.vue'),
  //         },
  //         {
  //           path: '/base/paginations',
  //           name: 'Paginations',
  //           component: () => import('@/views/base/Paginations.vue'),
  //         },
  //         {
  //           path: '/base/placeholders',
  //           name: 'Placeholders',
  //           component: () => import('@/views/base/Placeholders.vue'),
  //         },
  //         {
  //           path: '/base/popovers',
  //           name: 'Popovers',
  //           component: () => import('@/views/base/Popovers.vue'),
  //         },
  //         {
  //           path: '/base/progress',
  //           name: 'Progress',
  //           component: () => import('@/views/base/Progress.vue'),
  //         },
  //         {
  //           path: '/base/spinners',
  //           name: 'Spinners',
  //           component: () => import('@/views/base/Spinners.vue'),
  //         },
  //         {
  //           path: '/base/tables',
  //           name: 'Tables',
  //           component: () => import('@/views/base/Tables.vue'),
  //         },
  //         {
  //           path: '/base/tooltips',
  //           name: 'Tooltips',
  //           component: () => import('@/views/base/Tooltips.vue'),
  //         },
  //       ],
  //     },
  //     {
  //       path: '/buttons',
  //       name: 'Buttons',
  //       component: {
  //         render() {
  //           return h(resolveComponent('router-view'))
  //         },
  //       },
  //       redirect: '/buttons/standard-buttons',
  //       children: [
  //         {
  //           path: '/buttons/standard-buttons',
  //           name: 'Buttons',
  //           component: () => import('@/views/buttons/Buttons.vue'),
  //         },
  //         {
  //           path: '/buttons/dropdowns',
  //           name: 'Dropdowns',
  //           component: () => import('@/views/buttons/Dropdowns.vue'),
  //         },
  //         {
  //           path: '/buttons/button-groups',
  //           name: 'Button Groups',
  //           component: () => import('@/views/buttons/ButtonGroups.vue'),
  //         },
  //       ],
  //     },
  //     {
  //       path: '/forms',
  //       name: 'Forms',
  //       component: {
  //         render() {
  //           return h(resolveComponent('router-view'))
  //         },
  //       },
  //       redirect: '/forms/form-control',
  //       children: [
  //         {
  //           path: '/forms/form-control',
  //           name: 'Form Control',
  //           component: () => import('@/views/forms/FormControl.vue'),
  //         },
  //         {
  //           path: '/forms/select',
  //           name: 'Select',
  //           component: () => import('@/views/forms/Select.vue'),
  //         },
  //         {
  //           path: '/forms/checks-radios',
  //           name: 'Checks & Radios',
  //           component: () => import('@/views/forms/ChecksRadios.vue'),
  //         },
  //         {
  //           path: '/forms/range',
  //           name: 'Range',
  //           component: () => import('@/views/forms/Range.vue'),
  //         },
  //         {
  //           path: '/forms/input-group',
  //           name: 'Input Group',
  //           component: () => import('@/views/forms/InputGroup.vue'),
  //         },
  //         {
  //           path: '/forms/floating-labels',
  //           name: 'Floating Labels',
  //           component: () => import('@/views/forms/FloatingLabels.vue'),
  //         },
  //         {
  //           path: '/forms/layout',
  //           name: 'Layout',
  //           component: () => import('@/views/forms/Layout.vue'),
  //         },
  //         {
  //           path: '/forms/validation',
  //           name: 'Validation',
  //           component: () => import('@/views/forms/Validation.vue'),
  //         },
  //       ],
  //     },
  //     {
  //       path: '/charts',
  //       name: 'Charts',
  //       component: () => import('@/views/charts/Charts.vue'),
  //     },
  //     {
  //       path: '/icons',
  //       name: 'Icons',
  //       component: {
  //         render() {
  //           return h(resolveComponent('router-view'))
  //         },
  //       },
  //       redirect: '/icons/coreui-icons',
  //       children: [
  //         {
  //           path: '/icons/coreui-icons',
  //           name: 'CoreUI Icons',
  //           component: () => import('@/views/icons/CoreUIIcons.vue'),
  //         },
  //         {
  //           path: '/icons/brands',
  //           name: 'Brands',
  //           component: () => import('@/views/icons/Brands.vue'),
  //         },
  //         {
  //           path: '/icons/flags',
  //           name: 'Flags',
  //           component: () => import('@/views/icons/Flags.vue'),
  //         },
  //       ],
  //     },
  //     {
  //       path: '/notifications',
  //       name: 'Notifications',
  //       component: {
  //         render() {
  //           return h(resolveComponent('router-view'))
  //         },
  //       },
  //       redirect: '/notifications/alerts',
  //       children: [
  //         {
  //           path: '/notifications/alerts',
  //           name: 'Alerts',
  //           component: () => import('@/views/notifications/Alerts.vue'),
  //         },
  //         {
  //           path: '/notifications/badges',
  //           name: 'Badges',
  //           component: () => import('@/views/notifications/Badges.vue'),
  //         },
  //         {
  //           path: '/notifications/modals',
  //           name: 'Modals',
  //           component: () => import('@/views/notifications/Modals.vue'),
  //         },
  //       ],
  //     },
  //     {
  //       path: '/widgets',
  //       name: 'Widgets',
  //       component: () => import('@/views/widgets/Widgets.vue'),
  //     },
  //   ],
  // },
  // {
  //   path: '/pages',
  //   redirect: '/pages/404',
  //   name: 'Pages',
  //   component: {
  //     render() {
  //       return h(resolveComponent('router-view'))
  //     },
  //   },
  //   children: [
  //     {
  //       path: '404',
  //       name: 'Page404',
  //       component: () => import('@/views/pages/Page404'),
  //     },
  //     {
  //       path: '500',
  //       name: 'Page500',
  //       component: () => import('@/views/pages/Page500'),
  //     },
  //     {
  //       path: 'login',
  //       name: 'Login Pages',
  //       component: () => import('@/views/pages/Login'),
  //     },
  //     {
  //       path: 'register',
  //       name: 'Register Pages',
  //       component: () => import('@/views/pages/Register'),
  //     },
  //   ],
  // },
]

const router = createRouter({
  // history: createWebHistory(),
  hash: false,
  history: createWebHashHistory(process.env.BASE_URL),
  routes,
  acl,
  scrollBehavior() {
    // always scroll to top
    return { top: 0 }
  },
})

export default router
