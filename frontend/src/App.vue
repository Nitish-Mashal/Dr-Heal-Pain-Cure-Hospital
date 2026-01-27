<template>
  <div>
    <Navbar />
    <router-view />
    <FloatingEnquiry />
    <BookAppointmentFloat />
    <WhatsappFloat />
    <ScrollToTop />
    <Footer />
  </div>
</template>

<script>
import Navbar from './Navbar/Navbar.vue'
import Footer from './Footer/Footer.vue'
import ScrollToTop from './ScrollToTop.vue';
import WhatsappFloat from './WhatsappFloat.vue';
import BookAppointmentFloat from './BookAppointmentFloat.vue';
import FloatingEnquiry from './FloatingEnquiry.vue';

import { onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

export default {
  components: {
    Navbar,
    Footer,
    ScrollToTop,
    BookAppointmentFloat,
    FloatingEnquiry,
    WhatsappFloat
  },
  setup() {
    const route = useRoute()
    const router = useRouter()

    const baseUrl = "https://drheal.quantumberg.com"

    const updateCanonical = () => {
      const canonicalUrl = baseUrl + router.resolve(route).path

      let link = document.querySelector("link[rel='canonical']")
      if (!link) {
        link = document.createElement("link")
        link.setAttribute("rel", "canonical")
        document.head.appendChild(link)
      }

      link.setAttribute("href", canonicalUrl)
    }

    // Run when App loads
    onMounted(updateCanonical)

    // Run every time the route changes
    watch(route, updateCanonical)
  }
}
</script>
