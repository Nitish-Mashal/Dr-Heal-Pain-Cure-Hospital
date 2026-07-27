import './index.css'
import { createApp } from 'vue'
import router from './router'
import App from './App.vue'

import 'bootstrap/dist/css/bootstrap.min.css'

const app = createApp(App)

app.use(router)

app.mount('#app')


// That block is a fallback for the first paint.
// It runs after the Vue app mounts and only if the app container is still empty, so the browser still has meaningful content to display immediately instead of a blank or partially rendered screen.It is mainly meant to:
// improve initial render stability,
// help crawlers and bots see useful HTML,
// and reduce the appearance of a “blank page” while the app hydrates.
requestAnimationFrame(() => {
    const appRoot = document.getElementById('app')
    if (appRoot && appRoot.children.length === 0) {
        appRoot.innerHTML = '<main style="max-width: 1120px; margin: 0 auto; padding: 1.5rem 1rem 3rem; font-family: Arial, sans-serif; color: #12324f; line-height: 1.6;"><h1 style="font-size: 2rem; margin-bottom: 0.75rem;">Dr Heal Pain Cure Hospital</h1><p style="font-size: 1.05rem; margin-bottom: 1rem;"><strong>Advanced non-surgical pain treatment</strong> for back pain, neck pain, knee pain, arthritis, sciatica, shoulder pain, joint pain and chronic pain.</p><p style="margin-bottom: 1rem;">Dr Heal provides evidence-based pain management support for patients across Bengaluru with a focus on compassionate, minimally invasive care.</p><ul style="padding-left: 1.25rem; margin-bottom: 1.25rem;"><li>Back pain and spine care</li><li>Neck, shoulder and joint pain treatment</li><li>Knee pain, arthritis and sports injury support</li><li>Chronic pain management and consultation</li></ul><p><a href="/appointment" style="color: #0f4c81; font-weight: 600;">Book an appointment</a> or <a href="/about-us" style="color: #0f4c81; font-weight: 600;">learn more about Dr Heal</a>.</p></main>'
    }
})

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