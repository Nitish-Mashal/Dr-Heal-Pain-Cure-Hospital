<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-6 relative">
                <!-- Image -->
                <img src="https://drheal.quantumberg.com/files/Dr-Heal-Hospital-Image.webp" alt="Dr Heal Hospital Image"
                    class="w-full h-auto rounded-lg shadow-md" />

                <!-- Stats Card -->
                <div class="absolute top-40 left-1/2 -translate-x-1/2 bg-white rounded-2xl shadow-lg
                 px-6 py-4 flex items-center gap-6 w-[90%] max-w-md">
                    <!-- Years Experience -->
                    <div class="text-center flex-1 text-color-orange">
                        <h2 class="text-7xl font-bold">
                            {{ years }}+
                        </h2>
                        <p class="text-2xl">Years Experience</p>
                    </div>

                    <!-- Divider -->
                    <div class="w-px h-12 bg-gray-300"></div>

                    <!-- Satisfied Clients -->
                    <div class="text-center flex-1 text-color-orange">
                        <h2 class="text-7xl font-bold">
                            {{ clients }}K+
                        </h2>
                        <p class="text-2xl">Satisfied Clients</p>
                    </div>
                </div>
            </div>
            <div class="col-md-1"></div>
            <div class="col-md-5 flex flex-col justify-center mt-6 md:mt-0">
                <h6 class="text-color-orange uppercase mb-3 tracking-widest pt-4">About Us</h6>
                <h2 class="font-semibold mb-4 text-color-blue">
                    Healing Pain Without Surgery. Restoring Life With Purpose.
                </h2>
                <p class="mb-4">
                    <strong class="text-color-orange">Dr. Heal</strong> was founded with a single, powerful mission — to
                    provide <strong>lasting relief from pain without surgery</strong>. Led by <strong>Dr. Rakesh H.
                        Jayaprakash</strong>, a renowned Interventional Pain Specialist, our approach is rooted in
                    science, compassion, and a deep belief in the body's ability to heal when supported with the right
                    care.
                </p>
                <p class="mb-5">
                    At <strong class="text-color-orange">Dr. Heal</strong>, we don't just treat pain — we treat people.
                    Every treatment plan is customized to the individual, targeting the <strong>underlying
                        cause</strong> rather than masking symptoms. With cutting-edge techniques and holistic care,
                    we've helped thousands rediscover comfort, mobility, and control over their lives.
                </p>
                <div>
                    <router-link to="/about-us">
                        <button class="bg-color-blue text-white px-5 py-2 rounded-lg font-semibold">
                            Read More
                        </button>
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'

const years = ref(0)
const clients = ref(0)

const animateCounter = (refValue, target, duration = 1500) => {
    let start = 0
    const stepTime = Math.abs(Math.floor(duration / target))

    const timer = setInterval(() => {
        start += 1
        refValue.value = start
        if (start >= target) clearInterval(timer)
    }, stepTime)
}

onMounted(() => {
    animateCounter(years, 15)
    animateCounter(clients, 15)
})
</script>
