<template>
    <section class="container py-5" aria-label="Patient Testimonials">

        <!-- HEADER -->
        <header class="text-center mb-10">
            <p class="text-color-orange uppercase tracking-widest mb-3">
                Testimonial
            </p>
            <h2 class="font-semibold text-color-blue">
                Reviews From Our Patients
            </h2>
        </header>

        <div class="flex flex-col md:flex-row gap-8 items-stretch justify-center">

            <!-- LEFT SUMMARY -->
            <aside class="w-full md:w-[260px] shrink-0
              flex flex-col justify-center items-center
              text-center space-y-2
              min-h-[220px]">

                <div class="font-bold text-3xl">
                    EXCELLENT
                </div>

                <div class="flex justify-center gap-1 text-yellow-500 text-xl">
                    <i class="bi bi-star-fill" v-for="i in 5" :key="'star-' + i"></i>
                </div>

                <p class="text-base">
                    Based on <strong>3185 reviews</strong>
                </p>

                <img src="https://drheal.quantumberg.com/files/Google.svg" alt="Google Reviews" width="120" height="32"
                    loading="lazy" class="h-8" />

            </aside>

            <!-- CAROUSEL -->
            <div class="w-full md:w-[900px] shrink-0">

                <Carousel :items-to-show="3" :items-to-scroll="1" :wrap-around="true" :breakpoints="carouselBreakpoints"
                    :mouse-drag="true" :autoplay="4500" :pause-autoplay-on-hover="true" snap-align="start" :gap="20"
                    class="pb-10">

                    <Slide v-for="item in testimonials" :key="item.name + item.time">
                        <article class="bg-gray-100 p-6 rounded-xl h-[220px] flex flex-col">

                            <!-- USER -->
                            <div class="flex items-center gap-3 mb-2">
                                <div
                                    class="h-10 w-10 rounded-full bg-green-600 text-white flex items-center justify-center font-bold">
                                    {{ item.initial }}
                                </div>

                                <div>
                                    <div class="font-semibold">{{ item.name }}</div>
                                    <div class="text-sm text-gray-500">{{ item.time }}</div>
                                </div>
                            </div>

                            <!-- STARS -->
                            <div class="text-yellow-500 flex gap-1 mb-2" aria-hidden="true">
                                <i class="bi bi-star-fill" v-for="i in 5" :key="'rstar-' + i"></i>
                            </div>

                            <!-- REVIEW -->
                            <p class="text-gray-700 text-sm flex-1" :class="{ 'line-clamp-3': !item.expanded }">
                                {{ item.review }}
                            </p>

                            <button @click="item.expanded = !item.expanded"
                                class="text-sm text-gray-500 mt-2 text-left hover:underline">
                                {{ item.expanded ? 'Show less' : 'Read more' }}
                            </button>

                        </article>
                    </Slide>

                    <template #addons>
                        <Navigation />
                    </template>

                </Carousel>

            </div>
        </div>

    </section>
</template>

<script setup>
import { Carousel, Slide, Navigation } from "vue3-carousel"
import "vue3-carousel/dist/carousel.css"

/* Static + pre-expanded state */
const testimonials = Object.freeze([
    {
        name: "Vijay Kumar",
        initial: "V",
        time: "6 months ago",
        review: "I'm Vijayakumar 57 years. Since 15yrs I'm suffering from RA positive...",
        expanded: false
    },
    {
        name: "Chandru Gowda C R",
        initial: "C",
        time: "6 months ago",
        review: "My sis name is bagyamma r. She is taking back pain treatment...",
        expanded: false
    },
    {
        name: "Kantha M",
        initial: "K",
        time: "6 months ago",
        review: "I had knee pain. My pain is cured. I am very happy...",
        expanded: false
    }
])

const carouselBreakpoints = {
    0: { itemsToShow: 1 },
    768: { itemsToShow: 2 },
    1024: { itemsToShow: 3 }
}
</script>
