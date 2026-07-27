import './index.css'
import { createApp } from 'vue'
import router from './router'
import App from './App.vue'

import { Button, setConfig, frappeRequest, resourcesPlugin } from 'frappe-ui'
import 'bootstrap/dist/css/bootstrap.min.css'

const app = createApp(App)

setConfig('resourceFetcher', frappeRequest)

app.use(router)
app.use(resourcesPlugin)
app.component('Button', Button)

app.mount('#app')

// Preserve a readable HTML fallback for crawlers and AI systems even when
// interactive app rendering is delayed or partially unavailable.
if (!document.querySelector('#app')?.textContent?.trim()) {
    document.querySelector('#app')?.setAttribute('data-render-fallback', 'true')
}

// Bootstrap interactive JavaScript is retained, but does not block first paint.
window.addEventListener('load', () => {
    import('bootstrap/dist/js/bootstrap.bundle.min.js')
})