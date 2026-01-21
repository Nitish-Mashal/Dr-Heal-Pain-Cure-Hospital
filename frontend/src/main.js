import './index.css'

import { createApp } from 'vue'
import router from './router'
import App from './App.vue'

import { Button, setConfig, frappeRequest, resourcesPlugin } from 'frappe-ui'

// ✅ Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css'

// ✅ Bootstrap JS (for dropdowns, modals, collapse)
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

// Element Plus imports
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

let app = createApp(App)

setConfig('resourceFetcher', frappeRequest)

app.use(router)

// ✅ Element Plus
app.use(ElementPlus)

app.use(resourcesPlugin)

app.component('Button', Button)
app.mount('#app')
