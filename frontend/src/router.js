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
const ContactUs = () => import('@/pages/ContactUs.vue')
const ThankYou = () => import('@/pages/thankyou.vue')
const TermsAndConditions = () => import('@/pages/TermsAndConditions.vue')
const PrivacyAndPolicy = () => import('@/pages/PrivacyAndPolicy.vue')
const Gallery = () => import('@/Gallery/Gallery.vue')

// Blogs
const BlogsPreview = () => import('@/Blogs/BlogsPreview.vue')
const BlogDetails = () => import('@/Blogs/BlogDetails.vue')

// Careers
const JobListing = () => import('@/Careers/JobListing.vue')
const JobApply = () => import('@/Careers/JobApply.vue')

// ====================================================

const routes = [
  // ================= Pages =================
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: 'Dr Heal Pain Cure Hospital | Advanced Pain Treatment Without Surgery',
      description:
        'Get advanced, non-surgical treatment for back pain, knee pain, sciatica, arthritis & chronic pain at Dr Heal Pain Cure Hospital. Trusted by patients across Karnataka & India.',
      keywords:
        'Dr Heal Pain Cure Hospital, pain cure hospital Bangalore, non surgical pain treatment, chronic pain treatment, back pain treatment Bangalore, knee pain treatment, sciatica treatment, arthritis pain management, pain management hospital, orthopaedic pain treatment, best pain doctor Bangalore, spine pain treatment, joint pain hospital.',
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
      keywords: 'Dr Heal, About US'
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
    component: FacilityDetails,
    meta: {
      title: 'Advanced Diagnostic Facilities | Dr Heal',
      description:
        'Discover Dr Heal’s advanced diagnostic facilities with modern equipment and expert healthcare staff.',
    },
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
    component: ThankYou,
    meta: {
      title: 'Thank You | Dr Heal',
      description:
        'Thank you for choosing Dr Heal. Our team will contact you shortly.',
    },
  },
  {
    path: '/terms-and-conditions',
    name: 'TermsAndConditions',
    component: TermsAndConditions,
    meta: {
      title: 'Terms and Conditions | Dr Heal',
      description:
        'Read the terms and conditions for using Dr Heal’s website and services, including diagnostic tests and healthcare services.',
    },
  },
  {
    path: '/privacy-policy',
    name: 'PrivacyAndPolicy',
    component: PrivacyAndPolicy,
    meta: {
      title: 'Privacy Policy | Dr Heal',
      description:
        'Learn how Dr Heal collects, uses, and protects your personal information while providing diagnostic and healthcare services.',
    },
  },

  // ================= Blogs =================
  {
    path: '/blog',
    name: 'BlogsPreview',
    component: BlogsPreview,
    meta: {
      title: 'Health & Wellness Blog | Dr Heal',
      description:
        'Read expert health tips, diagnostic guides, and wellness articles from Dr Heal.',
    },
  },
  {
    path: '/blogdetails/:slug',
    name: 'BlogDetails',
    component: BlogDetails,
    meta: {
      title: 'Health Articles & Medical Insights | Dr Heal Blog',
      description:
        'Explore informative health articles covering diagnostics, wellness, and preventive healthcare.',
    },
  },

  // ================= Careers =================
  {
    path: '/careers',
    name: 'JobListing',
    component: JobListing,
    meta: {
      title: 'Careers at Dr Heal | Healthcare & Diagnostic Jobs',
      description:
        'Explore job opportunities at Dr Heal and build a career in diagnostics and healthcare.',
    },
  },
  {
    path: '/apply-job',
    name: 'JobApply',
    component: JobApply,
    meta: {
      title: 'Apply for Jobs | Dr Heal Careers',
      description:
        'Apply online for healthcare and diagnostic job openings at Dr Heal.',
    },
  },
  {
    path: '/gallery',
    name: 'Gallery',
    component: Gallery,
    meta: {
      title: 'Gallery | Dr Heal Pain Care Hospital',
      description:
        'Explore the Dr Heal Pain Care Hospital gallery featuring our facilities, advanced treatments, patient care, and medical infrastructure.',
    },
  },

  // ================= Contact =================
  {
    path: '/contact-us',
    name: 'ContactUs',
    component: ContactUs,
    meta: {
      title: 'Contact Dr Heal | Diagnostic Test Booking & Support',
      description:
        'Contact Dr Heal for diagnostic test bookings, home sample collection, and customer support.',
    },
  },
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
  const defaultKeywords =
    'Dr Heal, diagnostic tests, blood test, health checkup, pathology lab, healthcare services'

  // ✅ Title
  document.title = to.meta.title || defaultTitle

  // ✅ Description
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

  // ✅ Keywords
  let keywordsTag = document.querySelector('meta[name="keywords"]')
  if (!keywordsTag) {
    keywordsTag = document.createElement('meta')
    keywordsTag.setAttribute('name', 'keywords')
    document.head.appendChild(keywordsTag)
  }
  keywordsTag.setAttribute(
    'content',
    to.meta.keywords || defaultKeywords
  )

  next()
})

/* =============================================== */

export default router
