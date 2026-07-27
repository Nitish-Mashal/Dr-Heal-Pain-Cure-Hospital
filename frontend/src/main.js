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

const loadNonCriticalFeatures = () => {
    import('bootstrap/dist/js/bootstrap.bundle.min.js').catch(() => { })

    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/service-worker.js').catch(() => { })
    }
}

window.addEventListener('load', loadNonCriticalFeatures)