<template>
    <section class="container py-5" aria-label="Patient Testimonials">

        <!-- HEADER -->
        <header class="relative mb-10">

            <!-- Center Heading -->
            <div class="text-center">
                <p class="text-color-orange uppercase tracking-widest mb-3">
                    Testimonial
                </p>

                <h2 class="font-semibold text-color-blue">
                    Reviews From Our Patients
                </h2>
            </div>

            <!-- Right Aligned View All -->
            <div class="absolute right-0 top-1/2 -translate-y-1/2 hidden md:block">
                <a href="https://www.google.com/search?q=dr+heal&rlz=1C1CHBF_enIN1023IN1023&oq=dr+heal&gs_lcrp=EgZjaHJvbWUqDwgAECMYJxjjAhiABBiKBTIPCAAQIxgnGOMCGIAEGIoFMhUIARAuGCcYrwEYxwEYgAQYigUYjgUyBwgCEAAYgAQyBwgDEAAYgAQyEAgEEC4YrwEYxwEYgAQYjgUyBggFEEUYPDIGCAYQRRg8MgYIBxBFGDzSAQgyNDE3ajBqN6gCALACAA&sourceid=chrome&ie=UTF-8#lrd=0x3bae15e5a9ccd0f3:0x87e7bbc43256eaa0,1,,,,"
                    target="_blank" rel="noopener noreferrer"
                    class="text-color-blue font-semibold no-underline hover:underline">
                    View All Reviews →
                </a>
            </div>

        </header>

        <div class="flex flex-col md:flex-row gap-8 items-stretch justify-center text-gray-700">

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
                    Based on <strong>6,500+ reviews</strong>
                </p>

                <img src="https://www.drheal.in/files/Google.svg" alt="Dr.Heal Pain Cure Hospital - Google Reviews"
                    width="120" height="32" loading="lazy" class="h-8" />

            </aside>

            <!-- CAROUSEL -->
            <div class="w-full md:w-[900px] shrink-0">

                <Carousel :items-to-show="3" :items-to-scroll="1" :wrap-around="true" :breakpoints="carouselBreakpoints"
                    :mouse-drag="true" :autoplay="4500" :pause-autoplay-on-hover="true" snap-align="start" :gap="20"
                    class="pb-10">

                    <Slide v-for="item in testimonials" :key="item.name + item.time">

                        <article class="bg-gray-100 p-6 rounded-xl flex flex-col transition-all duration-300 h-full"
                            :class="item.expanded
                                ? 'min-h-[220px]'
                                : 'min-h-[220px]'">

                            <!-- USER -->
                            <div class="flex items-center gap-3 mb-2">

                                <div
                                    class="h-10 w-10 rounded-full bg-green-600 text-white flex items-center justify-center font-bold">
                                    {{ item.initial }}
                                </div>

                                <div>
                                    <div class="font-semibold">
                                        {{ item.name }}
                                    </div>

                                    <div class="text-sm text-gray-500">
                                        {{ item.time }}
                                    </div>
                                </div>

                            </div>

                            <!-- STARS -->
                            <div class="text-yellow-500 flex gap-1 mb-2" aria-hidden="true">
                                <i class="bi bi-star-fill" v-for="i in 5" :key="'rstar-' + i"></i>
                            </div>

                            <!-- REVIEW -->
                            <p class="text-gray-700 text-sm flex-1">

                                {{
                                    item.expanded
                                        ? item.review
                                        : item.review.slice(0, 120) +
                                        (item.review.length > 120 ? '...' : '')
                                }}

                            </p>

                            <!-- BUTTON -->
                            <button v-if="item.review.length > 120" @click="toggleExpand(item)"
                                class="text-sm text-gray-500 mt-3 text-left hover:underline">

                                {{
                                    item.expanded
                                        ? 'Show less'
                                        : 'Read more'
                                }}

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
import { ref } from 'vue'

import {
    Carousel,
    Slide,
    Navigation
} from 'vue3-carousel'

import 'vue3-carousel/dist/carousel.css'

/* ---------------- TESTIMONIALS ---------------- */

const testimonials = ref([
    {
        name: 'Lohith.m Muniraju V',
        initial: 'L',
        time: '2 months ago',
        review:
            'Good experience. My disc bulge got improved 30% after the first visit. Thank you Dr Rakesh and Dr heal staffs for the good response. Treatment is excellent. Excellent care towards all the patients. Thank you',
        expanded: true
    },

    {
        name: 'Nagu rathna',
        initial: 'N',
        time: '2 months ago',
        review:
            'I had back pain and knee pain from one year . My pain got improved 100% . Good result thank you so much dr Rakesh and entire team. My pain has got improved in second visit. I’m following diet strictly . I do exercise regularly. Thank you Dr heal',
        expanded: false
    },

    {
        name: 'Thippeswamy Thippeswamy',
        initial: 'T',
        time: '3 months ago',
        review:
            'Very good hospital facilities. My Experience was good at this hospital. The staffs guided us properly when we visited this hospital. Thank you for guiding us in this huge crowd. Dr Rakesh spoke to us well. Thank you Dr Rakesh Sir for your care and concern about the patients',
        expanded: false
    },

    {
        name: 'Geetha Sathish',
        initial: 'G',
        time: '2 months ago',
        review:
            'Very good result. My neck pain has improved 60% after the treatment here. Thank you Dr Rakesh and all the team of Dr heal hospital.',
        expanded: false
    }
])

/* ---------------- TOGGLE ---------------- */

function toggleExpand(item) {
    item.expanded = !item.expanded
}

/* ---------------- BREAKPOINTS ---------------- */

const carouselBreakpoints = {
    0: {
        itemsToShow: 1
    },

    768: {
        itemsToShow: 2
    },

    1024: {
        itemsToShow: 3
    }
}
</script>

<style scoped>
/* ---------------- CARD HEIGHT FIX ---------------- */

.carousel__slide {
    align-items: stretch;
}

.carousel__viewport {
    overflow: visible;
}

/* ---------------- NAVIGATION ---------------- */

:deep(.carousel__prev),
:deep(.carousel__next) {
    background: white;
    border-radius: 9999px;
    width: 40px;
    height: 40px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.15);
}

/* ---------------- MOBILE ---------------- */

@media (max-width: 767px) {

    :deep(.carousel__prev) {
        left: -10px;
    }

    :deep(.carousel__next) {
        right: -10px;
    }
}
</style>