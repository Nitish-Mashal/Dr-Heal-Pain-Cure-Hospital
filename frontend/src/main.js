import './index.css'

import { createApp } from 'vue'
import router from './router'
import App from './App.vue'

import { Button, setConfig, frappeRequest, resourcesPlugin } from 'frappe-ui'

// Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

// Element Plus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

// ✅ vue-gtag
import { configure } from 'vue-gtag'

const app = createApp(App)

// Frappe config
setConfig('resourceFetcher', frappeRequest)

// ✅ Google Analytics (replace with your real ID)
configure({
    tagId: 'G-XXXXXXXXXX',
    pageTracker: router, // 🔥 important for SPA routing
})

// Vue plugins
app.use(router)
app.use(ElementPlus)
app.use(resourcesPlugin)

app.component('Button', Button)

app.mount('#app')
