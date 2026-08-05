<template>
  <section class="w-full" aria-labelledby="hero-heading">

    <!-- ================= SEO CONTENT ================= -->
    <header class="sr-only">
      <h1 id="hero-heading">
        Dr Heal Pain Cure Hospital | Advanced Non-Surgical Pain Treatment | Best Pain Cure Hospital in Bangalore | Top
        Pain Cure Hospital in Bangalore | Best Pain Treatment Hospital in Bangalore | Best Pain Management Hospital in
        Bangalore
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
              decoding="async" sizes="100vw" class="w-full h-full object-cover" />

          </picture>

          <figcaption class="sr-only">
            {{ getBannerAlt(firstBanner) }}
          </figcaption>

        </figure>

      </component>
    </div>

    <!-- ================= CAROUSEL ================= -->

    <section v-else-if="carouselReady && activeBanner" class="w-full banner-carousel" aria-label="Featured banners"
      @mouseenter="pauseCarousel" @mouseleave="startCarousel">
      <component :is="activeBanner.link ? 'a' : 'div'" :href="activeBanner.link || undefined"
        :target="activeBanner.external_site ? '_blank' : '_self'"
        :rel="activeBanner.external_site ? 'noopener noreferrer' : undefined" class="block w-full h-full">
        <figure>
          <picture>
            <source media="(max-width:639px)"
              :srcset="activeBanner.upload_mobile_image || activeBanner.upload_desktop_image" />
            <source media="(min-width:640px)"
              :srcset="activeBanner.upload_desktop_image || activeBanner.upload_mobile_image" />
            <img :src="resolveBannerImage(activeBanner)" :alt="getBannerAlt(activeBanner)"
              :title="getBannerAlt(activeBanner)" width="1351" height="400" sizes="100vw"
              :loading="activeSlide === 0 ? 'eager' : 'lazy'" :fetchpriority="activeSlide === 0 ? 'high' : 'auto'"
              decoding="async" class="w-full h-full object-cover cursor-pointer" />
          </picture>
          <figcaption class="sr-only">{{ getBannerAlt(activeBanner) }}</figcaption>
        </figure>
      </component>

      <template v-if="banners.length > 1">
        <button class="banner-carousel__arrow banner-carousel__arrow--previous" type="button"
          aria-label="Previous banner" @click="previousSlide">‹</button>
        <button class="banner-carousel__arrow banner-carousel__arrow--next" type="button" aria-label="Next banner"
          @click="nextSlide">›</button>
        <div class="banner-carousel__indicators" aria-label="Banner navigation">
          <button v-for="(_, index) in banners" :key="index" class="banner-carousel__indicator" type="button"
            :class="{ 'is-active': index === activeSlide }" :aria-label="`Show banner ${index + 1}`"
            :aria-current="index === activeSlide ? 'true' : undefined" @click="goToSlide(index)"></button>
        </div>
      </template>
    </section>

    <!-- Reserve the exact final banner area while the API and LCP image load.
         This prevents the sections below from being pushed down. -->
    <div v-else class="w-full hero-banner hero-banner--placeholder" aria-hidden="true"></div>

    <!-- ================= REST OF THE PAGE ================= -->

    <LazySection :component="AboutSection" />
    <LazySection :component="OurServices" />
    <LazySection :component="ServiceTypes" />
    <LazySection :component="WhyChooseUs" />
    <LazySection :component="Process" />
    <LazySection :component="Leaders" />
    <LazySection :component="Booking" />
    <LazySection :component="FAQSection" />
    <LazySection :component="Testimonials" />
    <LazySection :component="OurBlogs" />

  </section>
</template>

<script setup>
import {
  ref,
  computed,
  onMounted,
  onUnmounted,
  defineAsyncComponent
} from 'vue'

import LazySection from '@/components/LazySection.vue'

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

const FAQSection = defineAsyncComponent(() =>
  import('./FAQSection.vue')
)

const OurBlogs = defineAsyncComponent(() =>
  import('./OurBlogs.vue')
)

/* ---------------- State ---------------- */
const banners = ref([])
const firstBanner = ref(null)
const carouselReady = ref(false)
const activeSlide = ref(0)
let carouselTimer

const activeBanner = computed(() => banners.value[activeSlide.value] || null)

/* ---------------- Screen Detection ---------------- */
const isMobile = ref(window.innerWidth < 640)

/* ---------------- Resize ---------------- */
function handleResize() {
  isMobile.value = window.innerWidth < 640
}

function pauseCarousel() {
  window.clearInterval(carouselTimer)
}

function startCarousel() {
  pauseCarousel()
  if (banners.value.length > 1) {
    carouselTimer = window.setInterval(nextSlide, 3000)
  }
}

function goToSlide(index) {
  activeSlide.value = index
  startCarousel()
}

function nextSlide() {
  activeSlide.value = (activeSlide.value + 1) % banners.value.length
  startCarousel()
}

function previousSlide() {
  activeSlide.value = (activeSlide.value - 1 + banners.value.length) % banners.value.length
  startCarousel()
}

/* ---------------- Banner Image ---------------- */
function resolveBannerImage(banner) {
  if (!banner) return null

  const image = isMobile.value
    ? (banner.upload_mobile_image || banner.upload_desktop_image)
    : (banner.upload_desktop_image || banner.upload_mobile_image)

  if (!image) return null

  return image
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
    startCarousel()
    return
  }

  const img = new Image()

  img.src = resolveBannerImage(firstBanner.value)

  img.onload = () => {
    carouselReady.value = true
    startCarousel()
  }

  img.onerror = () => {
    carouselReady.value = true
    startCarousel()
  }

  if (img.complete) {
    carouselReady.value = true
    startCarousel()
  }
}

/* ---------------- API ---------------- */
async function loadBanners() {
  try {
    const response = await fetch(
      '/api/method/drheal_frontend.api.banner_image.get_banner_images',
      {
        cache: 'default'
      }
    )

    const { message } = await response.json()

    firstBanner.value = message?.first_banner || null
    banners.value = message?.data || []

    preloadHeroImage()

  } catch (error) {
    console.error('Banner API Error:', error)

    carouselReady.value = true
    startCarousel()
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
  pauseCarousel()
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

.hero-banner--placeholder {
  background: #f3f8fa;
}

/* ---------------- CAROUSEL ---------------- */

.banner-carousel {
  aspect-ratio: 1351 / 400;
  overflow: hidden;
  position: relative;
}

/* ---------------- IMAGE ---------------- */

.banner-carousel img,
.hero-banner img {
  display: block;
  width: 100%;
  height: 100%;
}

.banner-carousel__arrow {
  align-items: center;
  background: rgb(23 50 77 / 35%);
  border: 0;
  border-radius: 50%;
  color: #fff;
  cursor: pointer;
  display: flex;
  font-size: 2rem;
  height: 2.25rem;
  justify-content: center;
  line-height: 1;
  padding: 0;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 2.25rem;
}

.banner-carousel__arrow--previous {
  left: 1rem;
}

.banner-carousel__arrow--next {
  right: 1rem;
}

.banner-carousel__indicators {
  bottom: 0.75rem;
  display: flex;
  gap: 0.45rem;
  justify-content: center;
  left: 0;
  position: absolute;
  right: 0;
}

.banner-carousel__indicator {
  background: rgb(255 255 255 / 55%);
  border: 0;
  border-radius: 50%;
  cursor: pointer;
  height: 0.45rem;
  padding: 0;
  width: 0.45rem;
}

.banner-carousel__indicator.is-active {
  background: #fff;
}

/* ---------------- MOBILE ---------------- */

@media (max-width: 639px) {

  .hero-banner {
    aspect-ratio: 1351 / 400;
  }

}
</style>
