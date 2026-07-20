<template>
    <section class="container py-5" aria-label="Patient Testimonials">

        <!-- HEADER -->
        <header class="relative mb-10">

            <!-- Center Heading -->
            <div class="text-center">
                <p class="text-color-orange uppercase tracking-widest mb-3">
                    Patient Testimonials
                </p>

                <h2 class="font-semibold text-color-blue">
                    Why Patients Trust Dr Heal Pain Cure Hospital
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
                    Rated Excellent
                </div>

                <div class="flex justify-center gap-1 text-yellow-500 text-xl">
                    <i class="bi bi-star-fill" v-for="i in 5" :key="'star-' + i"></i>
                </div>

                <p class="text-base">
                    Trusted by <strong>7,500+ happy patients</strong> for advanced pain care and non-surgical
                    treatments.
                </p>

                <img src="https://www.drheal.in/files/Google.svg" alt="Google Reviews for Dr Heal Pain Cure Hospital"
                    width="120" height="32" loading="lazy" class="h-8" />

            </aside>

            <!-- CAROUSEL -->
            <div class="w-full md:w-[900px] shrink-0">

                <section class="hidden">
                    <h2>Dr Heal Pain Cure Hospital Reviews</h2>

                    <p>
                        Patients across Bangalore trust Dr Heal Pain Cure Hospital for
                        non-surgical pain treatment, back pain treatment,
                        knee pain treatment, arthritis care, neck pain treatment,
                        and chronic pain management.
                    </p>
                </section>

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
        time: "May 2026",
        review:
            'I received excellent non-surgical treatment for my disc bulge. My back pain improved significantly after the first visit. Thank you to Dr Heal Pain Cure Hospital and the entire medical team for their professional care.',
        expanded: true
    },

    {
        name: 'Nagu rathna',
        initial: 'N',
        time: "May 2026",
        review:
            'I had back pain and knee pain from one year . My pain got improved 100% . Good result thank you so much dr Rakesh and entire team. My pain has got improved in second visit. I’m following diet strictly . I do exercise regularly. Thank you Dr heal',
        expanded: false
    },

    {
        name: 'Thippeswamy Thippeswamy',
        initial: 'T',
        time: "April 2026",
        review:
            'The hospital is clean, well organized, and equipped with modern facilities. The medical team guided us throughout the treatment process with professionalism and care.',
        expanded: false
    },

    {
        name: 'Geetha Sathish',
        initial: 'G',
        time: "May 2026",
        review:
            'I visited Dr Heal Pain Cure Hospital for severe back and knee pain. After following the recommended treatment and exercises, my pain improved considerably. The doctors and staff were supportive throughout my recovery.',
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