<template>
    <div ref="root" class="lazy-section">
        <component v-if="shouldRender" :is="component" />
    </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps({
    component: {
        type: [Object, Function],
        required: true,
    },
})

const root = ref(null)
const shouldRender = ref(false)
let observer = null

onMounted(() => {
    if (!root.value) return

    const handleIntersect = (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                shouldRender.value = true
                observer?.disconnect()
            }
        })
    }

    if ('IntersectionObserver' in window) {
        observer = new IntersectionObserver(handleIntersect, {
            rootMargin: '250px 0px 250px 0px',
            threshold: 0.01,
        })
        observer.observe(root.value)
    } else {
        shouldRender.value = true
    }
})

onBeforeUnmount(() => {
    observer?.disconnect()
})
</script>
