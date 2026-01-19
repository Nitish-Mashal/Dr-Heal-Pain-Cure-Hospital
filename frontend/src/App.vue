<template>
  <div>
    <Navbar />
    <router-view />
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

import { onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

export default {
  components: {
    Navbar,
    Footer,
    ScrollToTop,
    WhatsappFloat
  },
}
</script>
