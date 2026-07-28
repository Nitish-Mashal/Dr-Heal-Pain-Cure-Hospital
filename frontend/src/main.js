import './index.css'
import { createApp } from 'vue'
import router from './router'
import App from './App.vue'

import 'bootstrap/dist/css/bootstrap.min.css'

const app = createApp(App)

app.use(router)

app.mount('#app')

// Preserve a readable HTML fallback for crawlers and AI systems even when
// interactive app rendering is delayed or partially unavailable.
if (!document.querySelector('#app')?.textContent?.trim()) {
    document.querySelector('#app')?.setAttribute('data-render-fallback', 'true')
}

const loadNonCriticalFeatures = () => {
    if ('requestIdleCallback' in window) {
        requestIdleCallback(() => {
            import('bootstrap/dist/js/bootstrap.bundle.min.js').catch(() => { })
            if ('serviceWorker' in navigator) {
                navigator.serviceWorker.register('/service-worker.js').catch(() => { })
            }
        })
    } else {
        window.setTimeout(() => {
            import('bootstrap/dist/js/bootstrap.bundle.min.js').catch(() => { })
            if ('serviceWorker' in navigator) {
                navigator.serviceWorker.register('/service-worker.js').catch(() => { })
            }
        }, 2000)
    }
}

window.addEventListener('load', loadNonCriticalFeatures)