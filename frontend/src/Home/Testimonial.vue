<template>
    <div class="container py-5">
        <!-- HEADER -->
        <div class="text-center mb-10">
            <h6 class="text-color-orange uppercase tracking-widest mb-3">Testimonial</h6>
            <h1 class="font-semibold text-color-blue">Reviews From Our Patients</h1>
        </div>

        <!-- CONTENT -->
        <div class="flex flex-col md:flex-row gap-8 items-start">
            <!-- LEFT FIXED SECTION -->
            <div class="w-full md:w-1/4 md:sticky md:top-20 flex flex-col items-center text-center gap-2">
                <!-- Title -->
                <div class="font-bold text-3xl">EXCELLENT</div>

                <!-- Stars -->
                <div class="flex gap-1 text-yellow-500 text-xl">
                    <i class="bi bi-star-fill" v-for="i in 5" :key="i"></i>
                </div>

                <!-- Review text -->
                <div class="text-base">
                    Based on <strong>3185 reviews</strong>
                </div>

                <!-- Google Logo -->
                <img src="/files/Google.svg" alt="Google" class="h-8" />
            </div>

            <!-- RIGHT CAROUSEL -->
            <div class="w-full md:w-3/4">
                <Carousel :items-to-show="3" :items-to-scroll="1" :wrap-around="true" :breakpoints="carouselBreakpoints"
                    :mouse-drag="true" :autoplay="3000" :pause-autoplay-on-hover="true" :snap-align="'start'"
                    class="pb-10" :gap="20">
                    <Slide v-for="(item, index) in testimonials" :key="index">
                        <div class="bg-gray-100 p-6 rounded-xl h-full">
                            <div class="flex items-center gap-3 ">
                                <div
                                    class="h-10 w-10 rounded-full bg-green-600 text-white flex items-center justify-center font-bold">
                                    {{ item.initial }}
                                </div>
                                <div>
                                    <div class="font-semibold">{{ item.name }}</div>
                                    <div class="text-sm text-gray-500">{{ item.time }}</div>
                                </div>
                            </div>

                            <div class="text-yellow-500 mb-2 flex gap-1">
                                <i class="bi bi-star-fill " v-for="i in 5" :key="i"></i>
                            </div>

                            <p class="text-gray-700 text-sm line-clamp-3">{{ item.review }}</p>
                            <span class="text-sm text-gray-500 cursor-pointer">Read more</span>
                        </div>
                    </Slide>

                    <!-- Navigation arrows -->
                    <template #addons>
                        <Navigation />
                    </template>
                </Carousel>
            </div>
        </div>
    </div>
</template>

<script setup>
import { Carousel, Slide, Navigation } from "vue3-carousel";
import "vue3-carousel/dist/carousel.css";

const testimonials = [
    { name: "Vijay Kumar", initial: "V", time: "6 months ago", review: "I'm Vijayakumar 57 years. Since 15yrs I'm suffering from RA positive..." },
    { name: "Chandru Gowda C R", initial: "C", time: "6 months ago", review: "My sis name is bagyamma r. She is taking back pain treatment..." },
    { name: "Vijay Kumar", initial: "V", time: "6 months ago", review: "I'm Vijayakumar 57 years. Since 15yrs I'm suffering from RA positive..." },
    { name: "Chandru Gowda C R", initial: "C", time: "6 months ago", review: "My sis name is bagyamma r. She is taking back pain treatment..." },
    { name: "Kantha M", initial: "K", time: "6 months ago", review: "I had knee pain. My pain is cured. I am very happy..." }
];

const carouselBreakpoints = {
    0: { itemsToShow: 1, itemsToScroll: 1 },
    768: { itemsToShow: 2, itemsToScroll: 1 },
    1024: { itemsToShow: 3, itemsToScroll: 1 }
};
</script>
