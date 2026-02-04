<template>
  <section class="w-full">

    <!-- 🔥 IMMEDIATE HERO IMAGE -->
    <div
      v-if="firstBanner && !carouselReady"
      class="w-full h-[150px] sm:h-[380px] lg:h-[460px] overflow-hidden"
    >
      <component
        :is="firstBanner.link ? 'a' : 'div'"
        :href="firstBanner.link || undefined"
        :target="firstBanner.external_site ? '_blank' : '_self'"
        :rel="firstBanner.external_site ? 'noopener noreferrer' : undefined"
        class="block w-full h-full"
      >
        <img
          :src="firstBanner.upload_image"
          :alt="firstBanner.name1 || 'Banner'"
          width="1920"
          height="460"
          fetchpriority="high"
          decoding="async"
          class="w-full h-full object-contain sm:object-cover"
        />
      </component>
    </div>

    <!-- 🎠 CAROUSEL (hydrates after first image loads) -->
    <el-carousel
      v-if="carouselReady"
      indicator-position="outside"
      :interval="3000"
      :pause-on-hover="true"
      arrow="always"
      class="w-full banner-carousel"
    >
      <el-carousel-item
        v-for="(banner, index) in banners"
        :key="index"
      >
        <component
          :is="banner.link ? 'a' : 'div'"
          :href="banner.link || undefined"
          :target="banner.external_site ? '_blank' : '_self'"
          :rel="banner.external_site ? 'noopener noreferrer' : undefined"
          class="block w-full h-full"
        >
          <img
            :src="banner.upload_image"
            :alt="banner.name1 || 'Banner'"
            width="1920"
            height="460"
            sizes="100vw"
            :loading="index === 0 ? 'eager' : 'lazy'"
            :fetchpriority="index === 0 ? 'high' : 'auto'"
            decoding="async"
            class="w-full h-full object-contain sm:object-cover cursor-pointer"
          />
        </component>
      </el-carousel-item>
    </el-carousel>

    <!-- ⬇️ Rest of the page -->
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
const firstBanner = ref(null)
const carouselReady = ref(false)

async function loadBanners() {
  try {
    const res = await fetch(
      '/api/method/drheal_frontend.api.banner_image.get_banner_images'
    )
    const json = await res.json()

    firstBanner.value = json.message.first_banner
    banners.value = json.message.data || []

    if (!firstBanner.value) return

    // Preload first banner image
    const img = new Image()
    img.src = firstBanner.value.upload_image
    img.fetchPriority = 'high'

    img.onload = () => {
      carouselReady.value = true
    }

  } catch (e) {
    console.error('Banner API error:', e)
  }
}

onMounted(loadBanners)
</script>

<style scoped>
.banner-carousel :deep(.el-carousel__container) {
  height: 150px;
}

@media (min-width: 640px) {
  .banner-carousel :deep(.el-carousel__container) {
    height: 380px;
  }
}

@media (min-width: 1024px) {
  .banner-carousel :deep(.el-carousel__container) {
    height: 460px;
  }
}
</style>
