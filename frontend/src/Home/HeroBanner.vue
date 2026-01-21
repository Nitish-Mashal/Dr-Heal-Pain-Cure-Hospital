<template>
  <section class="w-full">
    <Carousel :items-to-show="1" :wrap-around="true" :autoplay="3000" :pause-autoplay-on-hover="true" :mouse-drag="true"
      class="w-full">
      <!-- Slides -->
      <Slide v-for="(banner, index) in banners" :key="index">
        <img :src="banner.src" :alt="banner.alt" class="w-full h-[150px] sm:h-[380px] lg:h-[460px] object-contain sm:object-cover" />
      </Slide>

      <!-- Navigation Arrows -->
      <template #addons>
        <Navigation />
      </template>
    </Carousel>

    <!-- Other Sections -->
    <AboutSection />
    <OurServices />
    <ServiceTypes />
    <WhyChooseUs />
    <Process />
    <leaders />
    <Booking />
    <BookAppointment />
    <Testimonials />
    <OurBlogs />

  </section>
</template>

<script setup>
// Components Import
import AboutSection from './AboutSection.vue'
import OurServices from './OurServices.vue'
import ServiceTypes from './ServiceTypes.vue'
import WhyChooseUs from './WhyChooseUs.vue'
import Process from './Process.vue'
import leaders from './Leaders.vue'
import Booking from './Booking.vue'
import BookAppointment from './BookAppointment.vue'
import Testimonials from './Testimonial.vue'
import OurBlogs from './OurBlogs.vue'

// Package Import
import { Carousel, Slide, Navigation } from 'vue3-carousel'
import 'vue3-carousel/dist/carousel.css'

const banners = [
  {
    src: 'https://drheal.quantumberg.com/files/Hero-Banner-1.webp',
    alt: 'Hero Banner 1',
  },
  {
    src: 'https://drheal.quantumberg.com/files/Hero-Banner-2.webp',
    alt: 'Hero Banner 2',
  },
  {
    src: 'https://drheal.quantumberg.com/files/Hero-Banner-3.webp',
    alt: 'Hero Banner 3',
  },
]
</script>
