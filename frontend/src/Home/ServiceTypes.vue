<template>
    <section class="container mx-auto py-5">
        <div class="grid md:grid-cols-3 gap-6">

            <article v-for="service in services" :key="service.link" class="max-w-md mx-auto">
                <router-link :to="service.link" class="block group relative rounded-3xl overflow-hidden shadow-lg">

                    <!-- Background Image -->
                    <img :src="service.image" :alt="service.title" width="600" height="420" loading="lazy"
                        decoding="async" class="w-full h-[420px] object-cover
                   transition-transform duration-500
                   group-hover:scale-105" />

                    <!-- Overlay -->
                    <div class="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition"></div>

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
                    <span class="absolute bottom-6 right-6 z-10
                   w-12 h-12 rounded-full
                   bg-color-orange group-hover:bg-orange-600
                   flex items-center justify-center
                   transition" aria-hidden="true">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-white" fill="none"
                            viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                        </svg>
                    </span>

                </router-link>
            </article>

        </div>
    </section>
</template>

<script setup>

/* static → remove reactivity overhead */
const services = Object.freeze([
    {
        title: 'Home Visits',
        description:
            'We bring expert orthopedic care to your home – convenient, safe, and tailored to your recovery needs.',
        image: 'https://drheal.quantumberg.com/files/Services-Types-1.webp',
        link: '/home-visits',
    },
    {
        title: 'Online Consultation',
        description:
            'Connect with orthopedic specialists online for quick, reliable diagnosis and treatment guidance.',
        image: 'https://drheal.quantumberg.com/files/Services-Types-2.webp',
        link: '/online-consultation',
    },
    {
        title: 'Quality Healthcare',
        description:
            'Experience top-tier orthopedic treatment backed by expert doctors, modern technology, and personalized care.',
        image: 'https://drheal.quantumberg.com/files/Services-Types-3.webp',
        link: '/physiotherapy',
    },
])

</script>
