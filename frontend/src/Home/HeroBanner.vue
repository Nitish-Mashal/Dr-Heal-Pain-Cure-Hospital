<template>
  <section class="w-full">
    <Carousel :items-to-show="1" :wrap-around="true" :autoplay="3000" :pause-autoplay-on-hover="true" :mouse-drag="true"
      class="w-full">
      <Slide v-for="(banner, index) in banners" :key="index">
        <img :src="banner.src" :alt="banner.alt" loading="lazy"
          class="w-full h-[150px] sm:h-[380px] lg:h-[460px] object-contain sm:object-cover" />
      </Slide>

      <template #addons>
        <Navigation />
      </template>
    </Carousel>

    <!-- Lazy-loaded sections -->
    <AboutSection />
    <OurServices />
    <ServiceTypes />
    <WhyChooseUs />
    <Process />
    <leaders />
    <Booking />
    <Testimonials />
    <OurBlogs />
  </section>
</template>

<script setup>
import { defineAsyncComponent } from 'vue'
import { Carousel, Slide, Navigation } from 'vue3-carousel'
import 'vue3-carousel/dist/carousel.css'

// Lazy load components
const AboutSection = defineAsyncComponent(() => import('./AboutSection.vue'))
const OurServices = defineAsyncComponent(() => import('./OurServices.vue'))
const ServiceTypes = defineAsyncComponent(() => import('./ServiceTypes.vue'))
const WhyChooseUs = defineAsyncComponent(() => import('./WhyChooseUs.vue'))
const Process = defineAsyncComponent(() => import('./Process.vue'))
const leaders = defineAsyncComponent(() => import('./Leaders.vue'))
const Booking = defineAsyncComponent(() => import('./Booking.vue'))
const Testimonials = defineAsyncComponent(() => import('./Testimonial.vue'))
const OurBlogs = defineAsyncComponent(() => import('./OurBlogs.vue'))

// Banner images
const banners = [
  { src: 'https://drheal.quantumberg.com/files/Hero-Banner-1.webp', alt: 'Hero Banner 1' },
  { src: 'https://drheal.quantumberg.com/files/Hero-Banner-2.webp', alt: 'Hero Banner 2' },
  { src: 'https://drheal.quantumberg.com/files/Hero-Banner-3.webp', alt: 'Hero Banner 3' },
]
</script>
