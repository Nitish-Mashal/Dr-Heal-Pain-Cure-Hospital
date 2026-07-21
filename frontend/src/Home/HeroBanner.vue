<template>
  <section class="w-full" aria-labelledby="hero-heading">

    <!-- ================= SEO CONTENT ================= -->
    <header class="sr-only">
      <h1 id="hero-heading">
        Dr Heal Pain Cure Hospital | Advanced Non-Surgical Pain Treatment
      </h1>

      <p>
        Dr Heal Pain Cure Hospital provides advanced non-surgical treatment for
        back pain, knee pain, arthritis, neck pain, sciatica, shoulder pain,
        joint pain and chronic pain using modern pain management techniques.
      </p>

      <h2>Our Pain Management Services</h2>

      <ul>
        <li>Back Pain Treatment</li>
        <li>Neck Pain Treatment</li>
        <li>Knee Pain Treatment</li>
        <li>Shoulder Pain Treatment</li>
        <li>Arthritis Treatment</li>
        <li>Sciatica Treatment</li>
        <li>Joint Pain Treatment</li>
        <li>Chronic Pain Treatment</li>
      </ul>
    </header>

    <!-- ================= HERO IMAGE ================= -->

    <div v-if="firstBanner && !carouselReady" class="w-full overflow-hidden hero-banner">
      <component :is="firstBanner.link ? 'a' : 'div'" :href="firstBanner.link || undefined"
        :target="firstBanner.external_site ? '_blank' : '_self'"
        :rel="firstBanner.external_site ? 'noopener noreferrer' : undefined" class="block w-full h-full">

        <figure>

          <picture>

            <source media="(max-width:639px)"
              :srcset="firstBanner.upload_mobile_image || firstBanner.upload_desktop_image" />

            <source media="(min-width:640px)"
              :srcset="firstBanner.upload_desktop_image || firstBanner.upload_mobile_image" />

            <img :src="resolveBannerImage(firstBanner)" :alt="getBannerAlt(firstBanner)"
              :title="getBannerAlt(firstBanner)" width="1351" height="400" loading="eager" fetchpriority="high"
              decoding="async" sizes="100vw" class="w-full h-full object-contain" />

          </picture>

          <figcaption class="sr-only">
            {{ getBannerAlt(firstBanner) }}
          </figcaption>

        </figure>

      </component>
    </div>

    <!-- ================= CAROUSEL ================= -->

    <el-carousel v-if="carouselReady && banners.length" indicator-position="outside" :interval="3000"
      :pause-on-hover="true" arrow="always" class="w-full banner-carousel">

      <el-carousel-item v-for="(banner, index) in banners" :key="index">

        <component :is="banner.link ? 'a' : 'div'" :href="banner.link || undefined"
          :target="banner.external_site ? '_blank' : '_self'"
          :rel="banner.external_site ? 'noopener noreferrer' : undefined" class="block w-full h-full">

          <figure>

            <picture>

              <source media="(max-width:639px)" :srcset="banner.upload_mobile_image || banner.upload_desktop_image" />

              <source media="(min-width:640px)" :srcset="banner.upload_desktop_image || banner.upload_mobile_image" />

              <img :src="resolveBannerImage(banner)" :alt="getBannerAlt(banner)" :title="getBannerAlt(banner)"
                width="1351" height="400" sizes="100vw" :loading="index === 0 ? 'eager' : 'lazy'"
                :fetchpriority="index === 0 ? 'high' : 'auto'" decoding="async"
                class="w-full h-full object-cover cursor-pointer" />

            </picture>

            <figcaption class="sr-only">
              {{ getBannerAlt(banner) }}
            </figcaption>

          </figure>

        </component>

      </el-carousel-item>

    </el-carousel>

    <!-- ================= REST OF THE PAGE ================= -->

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

/* ================= Lazy Sections ================= */

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

/* ---------------- Resize ---------------- */
function handleResize() {
  isMobile.value = window.innerWidth < 640
}

/* ---------------- Banner Image ---------------- */
function resolveBannerImage(banner) {
  if (!banner) return null

  const image = isMobile.value
    ? (banner.upload_mobile_image || banner.upload_desktop_image)
    : (banner.upload_desktop_image || banner.upload_mobile_image)

  if (!image) return null

  return `${image}${image.includes('?') ? '&' : '?'}v=${cacheKey.value}`
}

/* ---------------- Banner Alt ---------------- */
function getBannerAlt(banner) {
  if (!banner) {
    return 'Dr Heal Pain Hospital'
  }

  return (
    banner.meta_title ||
    banner.name1 ||
    banner.title ||
    'Dr Heal Pain Hospital'
  )
}

/* ---------------- Preload Hero Image ---------------- */
function preloadHeroImage() {
  if (!firstBanner.value) {
    carouselReady.value = true
    return
  }

  const img = new Image()

  img.src = resolveBannerImage(firstBanner.value)

  img.onload = () => {
    carouselReady.value = true
  }

  img.onerror = () => {
    carouselReady.value = true
  }

  if (img.complete) {
    carouselReady.value = true
  }
}

/* ---------------- API ---------------- */
async function loadBanners() {
  try {
    cacheKey.value = Date.now()

    const response = await fetch(
      `/api/method/drheal_frontend.api.banner_image.get_banner_images?v=${cacheKey.value}`,
      {
        cache: 'no-store'
      }
    )

    const { message } = await response.json()

    firstBanner.value = message?.first_banner || null
    banners.value = message?.data || []

    preloadHeroImage()

  } catch (error) {
    console.error('Banner API Error:', error)

    carouselReady.value = true
  }
}

/* ---------------- Lifecycle ---------------- */
onMounted(() => {
  handleResize()

  window.addEventListener('resize', handleResize)

  loadBanners()
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})
</script>

<style scoped>
/* ---------------- Screen Reader Only ---------------- */

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  white-space: nowrap;
  border: 0;
  clip: rect(0, 0, 0, 0);
}

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