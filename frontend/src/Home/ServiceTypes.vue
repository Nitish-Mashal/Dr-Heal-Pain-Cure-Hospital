<template>
    <section class="container mx-auto py-5">
        <div class="grid md:grid-cols-3 gap-6">

            <div v-for="(service, index) in services" :key="index" class="max-w-md mx-auto">
                <div class="relative rounded-3xl overflow-hidden shadow-lg">

                    <!-- Background Image -->
                    <img :src="service.image" :alt="service.title" class="w-full h-[420px] object-cover" />

                    <!-- Overlay -->
                    <div class="absolute inset-0 bg-black/25"></div>

                    <!-- Content -->
                    <div class="absolute bottom-0 p-6 text-white z-10">
                        <h3 class="font-semibold mb-2">
                            {{ service.title }}
                        </h3>

                        <p class="text-2xl leading-relaxed mb-4 max-w-xs">
                            {{ service.description }}
                        </p>
                    </div>

                    <!-- Arrow Button -->
                    <button @click="goTo(service.link)" class="absolute bottom-6 right-6 z-10
                   w-12 h-12 rounded-full
                   bg-color-orange hover:bg-orange-600
                   flex items-center justify-center
                   transition">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-white" fill="none"
                            viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                        </svg>
                    </button>

                </div>
            </div>

        </div>
    </section>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const services = [
    {
        title: 'Home Visits',
        description:
            'We bring expert orthopedic care to your home – convenient, safe, and tailored to your recovery needs.',
        image: '/files/Services-Types-1.jpg',
        link: '/home-visits',
    },
    {
        title: 'Online Consultation',
        description:
            'Connect with orthopedic specialists online for quick, reliable diagnosis and treatment guidance.',
        image: '/files/Services-Types-2.jpg',
        link: '/online-consultation',
    },
    {
        title: 'Quality Healthcare',
        description:
            'Experience top-tier orthopedic treatment backed by expert doctors, modern technology, and personalized care.',
        image: '/files/Services-Types-3.jpg',
        link: '/physiotherapy',
    },
]

const goTo = (link) => {
    router.push(link)
}
</script>
