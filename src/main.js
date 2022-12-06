import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import user from './services/User'
import { createPinia } from 'pinia'
import Notifications from '@kyvg/vue3-notification'

import CoreuiVue from '@coreui/vue'
import CIcon from '@coreui/icons-vue'
import { iconsSet as icons } from '@/assets/icons'
import DocsCallout from '@/components/DocsCallout'
import DocsExample from '@/components/DocsExample'

const pinia = createPinia()
const app = createApp(App)

app.use(CoreuiVue)
app.use(store)
app.use(router)
app.use(pinia)
app.use(Notifications)

app.provide('icons', icons)
app.component('CIcon', CIcon)
app.component('DocsCallout', DocsCallout)
app.component('DocsExample', DocsExample)


app.mount('#app')
