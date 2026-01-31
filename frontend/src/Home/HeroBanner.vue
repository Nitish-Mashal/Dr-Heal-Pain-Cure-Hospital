<template>
  <section class="w-full">

    <Carousel :items-to-show="1" :wrap-around="true" :autoplay="3000" :pause-autoplay-on-hover="true" :mouse-drag="true"
      class="w-full">
      <Slide v-for="(banner, index) in banners" :key="index">
        <img :src="banner.src" :srcset="banner.srcset" :alt="banner.alt" width="1920" height="460" sizes="100vw"
          :loading="index === 0 ? 'eager' : 'lazy'" :fetchpriority="index === 0 ? 'high' : 'auto'" decoding="async"
          class="w-full h-[150px] sm:h-[380px] lg:h-[460px] object-contain sm:object-cover" />
      </Slide>

      <template #addons>
        <Navigation />
      </template>
    </Carousel>

    <!-- Lazy sections -->
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
import { ref, onMounted, defineAsyncComponent } from 'vue'
import { Carousel, Slide, Navigation } from 'vue3-carousel'
import 'vue3-carousel/dist/carousel.css'

/* Lazy load below-the-fold sections */
const AboutSection = defineAsyncComponent(() => import('./AboutSection.vue'))
const OurServices = defineAsyncComponent(() => import('./OurServices.vue'))
const ServiceTypes = defineAsyncComponent(() => import('./ServiceTypes.vue'))
const WhyChooseUs = defineAsyncComponent(() => import('./WhyChooseUs.vue'))
const Process = defineAsyncComponent(() => import('./Process.vue'))
const Leaders = defineAsyncComponent(() => import('./Leaders.vue'))
const Booking = defineAsyncComponent(() => import('./Booking.vue'))
const Testimonials = defineAsyncComponent(() => import('./Testimonial.vue'))
const OurBlogs = defineAsyncComponent(() => import('./OurBlogs.vue'))

const banners = ref([])

/* No need to build mobile/tablet URLs, use the same path for all sizes */
function buildSrcSet(url) {
  return url ? url : ''
}

async function loadBanners() {
  try {
    const res = await fetch(
      '/api/method/drheal_frontend.api.banner_image.get_banner_images'
    )
    const json = await res.json()
    const rows = json.message.data || []

    banners.value = rows.map(row => ({
      src: row.upload_image,
      srcset: buildSrcSet(row.upload_image), // same image for all screen sizes
      alt: row.name1 || 'Banner'
    }))
  } catch (e) {
    console.error('Banner API error:', e)
    banners.value = [
      {
        src: '/fallback-banner.webp',
        srcset: '',
        alt: 'Banner'
      }
    ]
  }
}

onMounted(loadBanners)
</script>
