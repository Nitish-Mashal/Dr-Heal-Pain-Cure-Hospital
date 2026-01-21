import { createRouter, createWebHistory } from 'vue-router'

// ================= Lazy Loaded Pages =================
const Home = () => import('@/Home/HeroBanner.vue')
const Aboutus = () => import('@/About/Aboutus.vue')
const Services = () => import('@/pages/Services.vue')
const ServiceDetails = () => import('@/ServicesDetails/ServiceDetails.vue')
const FacilityDetails = () => import('@/Facilities/FacilitiesDetails.vue')
const DoctorsList = () => import('@/pages/DoctorsList.vue')
const AppointmentPage = () => import('@/pages/AppointmentPage.vue')
const ViewProfile = () => import('@/pages/ViewProfile.vue')
const ServicesDetails = () => import('@/ServicesDetails/ServiceDetails.vue')
const FacilityDetails = () => import('@/Facilities/FacilitiesDetails.vue')
import ThankYou from './pages/thankyou.vue'
import TermsAndConditions from './pages/TermsAndConditions.vue'
import PrivacyAndPolicy from './pages/PrivacyAndPolicy.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: 'Dr Heal | Diagnostic Tests & Healthcare Services',
      description:
        'Dr Heal provides trusted diagnostic tests, health checkups, and home sample collection services across India.',
    },
  },
  {
    path: '/about-us',
    name: 'Aboutus',
    component: Aboutus,
    meta: {
      title: 'About Dr Heal | Trusted Diagnostic Healthcare Provider',
      description:
        'Know more about Dr Heal, our mission, vision, and commitment to accurate diagnostics and patient care.',
    },
  },
  {
    path: '/services',
    name: 'Services',
    component: Services,
    meta: {
      title: 'Diagnostic Services | Blood Tests & Health Checkups – Dr Heal',
      description:
        'Explore Dr Heal diagnostic services including blood tests, health checkups, and preventive screenings.',
    },
  },
  {
    path: '/services/:slug',
    name: 'ServiceDetails',
    component: ServiceDetails,
    meta: {
      title: 'Diagnostic Test Details | Dr Heal',
      description:
        'Get complete details about Dr Heal diagnostic tests, preparation guidelines, and health benefits.',
    },
  },
  {
    path: '/facilities/:slug',
    name: 'FacilityDetails',
    component: FacilityDetails
  },
  {
    path: '/doctors-list',
    name: 'DoctorsList',
    component: DoctorsList,
    meta: {
      title: 'Our Doctors | Expert Healthcare Professionals – Dr Heal',
      description:
        'Meet experienced doctors and healthcare professionals at Dr Heal.',
    },
  },
  {
    path: '/appointment',
    name: 'AppointmentPage',
    component: AppointmentPage,
    meta: {
      title: 'Book Appointment Online | Dr Heal Diagnostics',
      description:
        'Book diagnostic tests and consultations easily with Dr Heal’s online appointment system.',
    },
  },
  {
    path: '/viewProfile/:id',
    name: 'ViewProfile',
    component: ViewProfile,
    props: true,
    meta: {
      title: 'Doctor Profile | Dr Heal',
      description:
        'View detailed doctor profiles including experience and consultation details at Dr Heal.',
    },
  },
  {
    path: '/thank-you',
    name: 'ThankYou',
    component: ThankYou
  },
  {
    path: '/terms-and-conditions',
    name: 'TermsAndConditions',
    component: TermsAndConditions
  },
  {
    path: '/privacy-policy',
    name: PrivacyAndPolicy,
    component: PrivacyAndPolicy
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  },
})

/* ================= SEO HANDLER ================= */
router.beforeEach((to, from, next) => {
  const defaultTitle = 'Dr Heal | Diagnostic Tests & Healthcare Services'
  const defaultDescription =
    'Dr Heal provides trusted diagnostic tests, health checkups, and home sample collection services across India.'

  document.title = to.meta.title || defaultTitle

  let descriptionTag = document.querySelector('meta[name="description"]')

  if (!descriptionTag) {
    descriptionTag = document.createElement('meta')
    descriptionTag.setAttribute('name', 'description')
    document.head.appendChild(descriptionTag)
  }

  descriptionTag.setAttribute(
    'content',
    to.meta.description || defaultDescription
  )

  next()
})
/* =============================================== */

export default router

