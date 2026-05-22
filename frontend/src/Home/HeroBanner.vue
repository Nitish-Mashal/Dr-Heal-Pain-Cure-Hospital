<template>
  <section class="w-full">

    <!-- 🔥 IMMEDIATE HERO IMAGE -->
    <div v-if="firstBanner && !carouselReady" class="w-full overflow-hidden hero-banner">
      <component :is="firstBanner.link ? 'a' : 'div'" :href="firstBanner.link || undefined"
        :target="firstBanner.external_site ? '_blank' : '_self'"
        :rel="firstBanner.external_site ? 'noopener noreferrer' : undefined" class="block w-full h-full">
        <img :src="resolveBannerImage(firstBanner)" :alt="getBannerAlt(firstBanner)" width="1351" height="400"
          fetchpriority="high" decoding="async" class="w-full h-full object-contain" />
      </component>
    </div>

    <!-- 🎠 CAROUSEL -->
    <el-carousel v-if="carouselReady" indicator-position="outside" :interval="3000" :pause-on-hover="true"
      arrow="always" class="w-full banner-carousel">
      <el-carousel-item v-for="(banner, index) in banners" :key="index">
        <component :is="banner.link ? 'a' : 'div'" :href="banner.link || undefined"
          :target="banner.external_site ? '_blank' : '_self'"
          :rel="banner.external_site ? 'noopener noreferrer' : undefined" class="block w-full h-full">
          <img :src="resolveBannerImage(banner)" :alt="getBannerAlt(banner)" width="1351" height="400" sizes="100vw"
            :loading="index === 0 ? 'eager' : 'lazy'" :fetchpriority="index === 0 ? 'high' : 'auto'" decoding="async"
            class="w-full h-full object-contain cursor-pointer" />
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
import {
  ref,
  onMounted,
  onUnmounted,
  defineAsyncComponent
} from 'vue'

/* ---------------- Lazy Sections ---------------- */
const AboutSection = defineAsyncComponent(() =>
  import('./AboutSection.vue')
)

const OurServices = defineAsyncComponent(() =>
  import('./OurServices.vue')
)

const ServiceTypes = defineAsyncComponent(() =>
  import('./ServiceTypes.vue')
)

const WhyChooseUs = defineAsyncComponent(() =>
  import('./WhyChooseUs.vue')
)

const Process = defineAsyncComponent(() =>
  import('./Process.vue')
)

const Leaders = defineAsyncComponent(() =>
  import('./Leaders.vue')
)

const Booking = defineAsyncComponent(() =>
  import('./Booking.vue')
)

const Testimonials = defineAsyncComponent(() =>
  import('./Testimonial.vue')
)

const OurBlogs = defineAsyncComponent(() =>
  import('./OurBlogs.vue')
)

/* ---------------- State ---------------- */
const banners = ref([])
const firstBanner = ref(null)
const carouselReady = ref(false)

/* ---------------- Cache Version ---------------- */
const cacheKey = ref(Date.now())

/* ---------------- Screen Detection ---------------- */
const isMobile = ref(window.innerWidth < 640)

function handleResize() {
  isMobile.value = window.innerWidth < 640
}

onMounted(() => {
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})

/* ---------------- Image Resolver ---------------- */
function resolveBannerImage(banner) {
  if (!banner) return null

  let image = isMobile.value
    ? (
      banner.upload_mobile_image ||
      banner.upload_desktop_image
    )
    : (
      banner.upload_desktop_image ||
      banner.upload_mobile_image
    )

  // 🔥 Prevent browser cache
  return image
    ? `${image}${image.includes('?') ? '&' : '?'}v=${cacheKey.value}`
    : null
}

/* ---------------- ALT TEXT ---------------- */
function getBannerAlt(banner) {
  if (!banner) {
    return 'Dr.Heal Pain Cure Hospital'
  }

  const title =
    banner.name1 ||
    banner.meta_title ||
    banner.title

  return title
    ? `Dr.Heal Pain Cure Hospital - ${title}`
    : 'Dr.Heal Pain Cure Hospital'
}

/* ---------------- API ---------------- */
async function loadBanners() {
  try {

    // 🔥 Refresh cache key every request
    cacheKey.value = Date.now()

    const res = await fetch(
      `/api/method/drheal_frontend.api.banner_image.get_banner_images?v=${cacheKey.value}`,
      {
        cache: 'no-store'
      }
    )

    const json = await res.json()

    firstBanner.value = json.message.first_banner
    banners.value = json.message.data || []

    if (!firstBanner.value) return

    /* 🔥 Preload first banner */
    const img = new Image()

    img.src = resolveBannerImage(firstBanner.value)

    if (img.complete) {
      carouselReady.value = true
    } else {
      img.onload = () => {
        carouselReady.value = true
      }
    }

  } catch (e) {
    console.error('Banner API error:', e)
  }
}

onMounted(loadBanners)
</script>

<style scoped>
/* ---------------- HERO SECTION ---------------- */

.hero-banner {
  aspect-ratio: 1351 / 400;
}

/* ---------------- CAROUSEL ---------------- */

.banner-carousel :deep(.el-carousel__container) {
  aspect-ratio: 1351 / 400;
  height: auto;
}

/* ---------------- IMAGE ---------------- */

.banner-carousel img,
.hero-banner img {
  display: block;
  width: 100%;
  height: 100%;
}

/* ---------------- MOBILE ---------------- */

@media (max-width: 639px) {

  .hero-banner {
    aspect-ratio: 1351 / 400;
  }

  .banner-carousel :deep(.el-carousel__container) {
    aspect-ratio: 1351 / 400;
  }
}
</style>