import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { createPinia } from 'pinia'
import Notifications from '@kyvg/vue3-notification'

import CoreuiVue from '@coreui/vue'
import CIcon from '@coreui/icons-vue'
import { iconsSet as icons } from '@/assets/icons'
import DocsCallout from '@/components/DocsCallout'
import DocsExample from '@/components/DocsExample'

import VueMobileDetection from "vue-mobile-detection";

import { MonthPicker } from 'vue-month-picker'
import { MonthPickerInput } from 'vue-month-picker'

import 'jquery'
import vSelect from 'vue-select'
import 'vue-select/dist/vue-select.css';

import ScrollTop from '@/components/icon/ScrollTop.vue'

import acl from './acl';

// toast
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
const options = {};

import {
    cilPlus,
    cilTrash,
    cilMusicNote,
    cilAddressBook,
    cilCalendar,
    cilCalendarCheck,
    cilLightbulb,
    cilPhone,
    cilClipboard,
    cilNoteAdd,
    cilCloudDownload,
    cilCog,
    cilCheckCircle,
    cilCircle,
    cilViewModule,
    cilScreenSmartphone,
    cilChevronCircleUpAlt,
    cilInfo,
    cilReportSlash,
    cilHistory,
} from '@coreui/icons'

  const iconsi = {
    cilPlus,
    cilTrash,
    cilMusicNote,
    cilAddressBook,
    cilCalendar,
    cilCalendarCheck,
    cilLightbulb,
    cilPhone,
    cilClipboard,
    cilNoteAdd,
    cilCloudDownload,
    cilCog,
    cilCheckCircle,
    cilCircle,
    cilViewModule,
    cilScreenSmartphone,
    cilChevronCircleUpAlt,
    cilInfo,
    cilReportSlash,
    cilHistory,
}

const pinia = createPinia()
const app = createApp(App)

app.use(CoreuiVue)
app.use(store)
app.use(router)
app.use(pinia)
app.use(Notifications)
app.provide('icons', Object.assign(icons, iconsi))
app.component('CIcon', CIcon)
app.component('DocsCallout', DocsCallout)
app.component('DocsExample', DocsExample)
app.use(VueMobileDetection);
app.component('v-select', vSelect)
app.use(MonthPicker)
app.use(MonthPickerInput)
app.use(Toast, options);
app.component('ScrollTop', ScrollTop)
app.use(acl);

app.mount('#app')
