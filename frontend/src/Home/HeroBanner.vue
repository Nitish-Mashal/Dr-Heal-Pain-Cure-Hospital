<template>
  <section class="w-full">

    <Carousel :items-to-show="1" :wrap-around="true" :autoplay="3000" :pause-autoplay-on-hover="true" :mouse-drag="true"
      class="w-full hero-carousel">
      <Slide v-for="(banner, index) in banners" :key="index">
        <img :src="banner.src" :alt="banner.alt" width="1920" height="460" :loading="index === 0 ? 'eager' : 'lazy'"
          :fetchpriority="index === 0 ? 'high' : 'auto'" decoding="async" class="hero-img" />
      </Slide>

      <template #addons>
        <Navigation />
      </template>
    </Carousel>

    <AboutSection />
    <OurServices />
    <ServiceTypes />
    <WhyChooseUs />
    <Process />
    <Leaders />
    <Booking />
    <Testimonials />
    <OurBlogs />

  </section>
</template>

<script setup>
import { defineAsyncComponent } from 'vue'
import { Carousel, Slide, Navigation } from 'vue3-carousel'

const AboutSection = defineAsyncComponent(() => import('./AboutSection.vue'))
const OurServices = defineAsyncComponent(() => import('./OurServices.vue'))
const ServiceTypes = defineAsyncComponent(() => import('./ServiceTypes.vue'))
const WhyChooseUs = defineAsyncComponent(() => import('./WhyChooseUs.vue'))
const Process = defineAsyncComponent(() => import('./Process.vue'))
const Leaders = defineAsyncComponent(() => import('./Leaders.vue'))
const Booking = defineAsyncComponent(() => import('./Booking.vue'))
const Testimonials = defineAsyncComponent(() => import('./Testimonial.vue'))
const OurBlogs = defineAsyncComponent(() => import('./OurBlogs.vue'))

const banners = [
  { src: 'https://drheal.quantumberg.com/files/Hero-Banner-1.webp', alt: 'Hero Banner 1' },
  { src: 'https://drheal.quantumberg.com/files/Hero-Banner-2.webp', alt: 'Hero Banner 2' },
  { src: 'https://drheal.quantumberg.com/files/Hero-Banner-3.webp', alt: 'Hero Banner 3' },
]
</script>

<style>
.hero-carousel {
  min-height: 460px;
}

.hero-img {
  width: 100%;
  height: 460px;
  object-fit: cover;
}
</style>
