<template>
    <div class="container mt-4">
        <div class="row">
            <!-- IMAGE COLUMN -->
            <div class="col-md-6 relative">

                <!-- About Image (loads immediately) -->
                <img src="https://www.drheal.in/files/Dr-Heal-Pain-Cure-Hospital-Image.webp"
                    alt="Dr.Heal Pain Cure Hospital - Hospital Image" width="900" height="700" decoding="async"
                    fetchpriority="high" class="w-full h-auto rounded-lg shadow-md" />

                <!-- Stats Card -->
                <div class="absolute top-20 md:top-40 left-1/2 -translate-x-1/2 bg-white rounded-2xl shadow-lg
    px-6 py-4 flex items-center gap-6 w-[90%] max-w-md">

                    <!-- Patients Treated -->
                    <div class="text-center flex-1 text-color-orange">
                        <h2 class="text-5xl md:text-6xl font-bold">
                            {{ patientsTreated }}K+
                        </h2>
                        <p class="text-lg md:text-xl">Patients Treated</p>
                    </div>

                    <div class="w-px h-12 bg-gray-300"></div>

                    <!-- Satisfied Patients -->
                    <div class="text-center flex-1 text-color-orange">
                        <h2 class="text-5xl md:text-6xl font-bold">
                            {{ satisfaction }}%
                        </h2>
                        <p class="text-lg md:text-xl">Satisfied Patients</p>
                    </div>

                </div>
            </div>

            <div class="col-md-1"></div>

            <!-- TEXT COLUMN -->
            <div ref="textBlock" class="col-md-5 flex flex-col justify-center mt-6 md:mt-0">

                <h6 class="text-color-orange uppercase mb-3 tracking-widest pt-4">
                    About Us
                </h6>

                <h4 class="font-semibold mb-4 text-color-blue">
                    Dr Heal Pain Cure Hospital - Advanced Pain Care & Non-Surgical Treatment. Restoring Life With
                    Purpose.
                </h4>

                <p class="mb-4">
                    <strong class="text-color-orange">Dr. Heal</strong> was founded with a mission —
                    lasting relief from pain without surgery.
                    Led by <strong>Dr. Rakesh H. Jayaprakash</strong>.
                </p>

                <p class="mb-5">
                    We treat the <strong>root cause</strong>, not just symptoms,
                    using precision pain care and holistic recovery.
                </p>

                <router-link to="/about-us">
                    <button class="bg-color-blue text-white px-5 py-2 rounded-lg font-semibold">
                        Read More
                    </button>
                </router-link>

            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const patientsTreated = ref(0)
const satisfaction = ref(0)
const textBlock = ref(null)

let observer = null
const timers = []

const animateCounter = (refValue, target, duration = 1500) => {
    let start = 0
    const stepTime = Math.max(16, duration / target)

    const timer = setInterval(() => {
        start++
        refValue.value = start

        if (start >= target) {
            clearInterval(timer)
        }
    }, stepTime)

    timers.push(timer)
}

onMounted(() => {
    observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            animateCounter(patientsTreated, 80)
            animateCounter(satisfaction, 85)
            observer.disconnect()
        }
    }, { threshold: 0.3 })

    if (textBlock.value) {
        observer.observe(textBlock.value)
    }
})

onUnmounted(() => {
    if (observer) observer.disconnect()
    timers.forEach(timer => clearInterval(timer))
})
</script>
