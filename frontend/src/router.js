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
const SendResume = () => import('@/Careers/sendresume.vue')
const WorkWithUs = () => import('@/Careers/workwithus.vue')
const SubmitJob = () => import('@/Careers/submitJob.vue')

// ====================================================

const routes = [
  // ================= Pages =================
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: 'Dr Heal Pain Hospital | Non-Surgical Treatment',

      description:
        'Dr Heal Pain Cure Hospital provides advanced pain care and non-surgical treatment for back pain, knee pain, arthritis, sciatica, neck pain and chronic pain.',

      keywords:
        'Dr Heal Pain Cure Hospital, pain management hospital Bangalore, non surgical pain treatment, back pain treatment, knee pain treatment, arthritis treatment, neck pain, spine pain, sciatica treatment, chronic pain specialist',
    },
  },
  {
    path: '/about-us',
    name: 'Aboutus',
    component: Aboutus,
    meta: {
      title: 'About Dr Heal Pain Cure Hospital | Expert Pain Care',

      description:
        'Learn about Dr Heal Pain Cure Hospital, our experienced doctors, advanced pain management treatments, mission, and patient-focused healthcare.',

      keywords:
        'about Dr Heal, pain management hospital, pain specialists, experienced doctors, pain clinic Bangalore, healthcare hospital'
    },
  },
  {
    path: '/services',
    name: 'Services',
    component: Services,
    meta: {
      title: 'Pain Management Services | Dr Heal Pain Cure Hospital',

      description:
        'Explore advanced pain management services including back pain, knee pain, arthritis, neck pain, joint pain, and spine care.',

      keywords:
        'pain management services, back pain treatment, knee pain treatment, arthritis treatment, neck pain treatment, spine treatment, joint pain treatment'
    },
  },
  {
    path: '/services/:slug',
    name: 'ServiceDetails',
    component: ServiceDetails,
    meta: {
      title: 'Pain Treatment Services | Dr Heal Pain Cure Hospital',

      description:
        'Know more about our advanced pain treatment procedures, benefits, and non-surgical therapies offered by Dr Heal Pain Cure Hospital.',

      keywords:
        'pain treatment, non surgical therapy, pain procedures, chronic pain treatment, pain management'
    }
  },
  {
    path: '/facilities/:slug',
    name: 'FacilityDetails',
    component: FacilityDetails,
    meta: {
      title: 'Modern Facilities | Dr Heal Pain Cure Hospital',

      description:
        'Discover our world-class facilities, advanced equipment, patient care services, and comfortable treatment environment.',

      keywords:
        'hospital facilities, advanced pain treatment, patient care, pain hospital Bangalore'
    },
  },
  {
    path: '/doctors-list',
    name: 'DoctorsList',
    component: DoctorsList,
    meta: {
      title: 'Pain Specialists & Doctors | Dr Heal Pain Cure Hospital',

      description:
        'Meet experienced pain management specialists and doctors dedicated to providing advanced non-surgical pain treatments.',

      keywords:
        'pain specialists, doctors, pain management experts, spine specialists, arthritis doctor, knee pain doctor'
    },
  },
  {
    path: '/appointment',
    name: 'AppointmentPage',
    component: AppointmentPage,
    meta: {
      title: 'Book Appointment | Dr Heal Pain Cure Hospital',

      description:
        'Book an appointment online with our experienced pain specialists for expert diagnosis and advanced pain treatment.',

      keywords:
        'book appointment, pain specialist appointment, doctor consultation, online appointment, pain clinic'
    },
  },
  {
    path: '/viewProfile/:id',
    name: 'ViewProfile',
    component: ViewProfile,
    props: true,
    meta: {
      title: 'Doctor Profile | Dr Heal Pain Cure Hospital',

      description:
        'View doctor qualifications, experience, specialties, and consultation timings at Dr Heal Pain Cure Hospital.',

      keywords:
        'doctor profile, pain specialist, consultation, healthcare doctor'
    },
  },
  {
    path: '/thank-you',
    name: 'ThankYou',
    component: ThankYou,
    meta: {
      title: 'Thank You | Dr Heal Pain Cure Hospital',

      description:
        'Thank you for contacting Dr Heal Pain Cure Hospital. Our team will connect with you shortly.',

      keywords:
        'thank you, appointment confirmation, patient enquiry'
    }
  },
  {
    path: '/terms-and-conditions',
    name: 'TermsAndConditions',
    component: TermsAndConditions,
    meta: {
      title: 'Terms & Conditions | Dr Heal Pain Cure Hospital',

      description:
        'Review the terms and conditions governing the use of Dr Heal Pain Cure Hospital’s website and healthcare services.',

      keywords:
        'terms and conditions, website policy, healthcare terms'
    },
  },
  {
    path: '/privacy-policy',
    name: 'PrivacyAndPolicy',
    component: PrivacyAndPolicy,
    meta: {
      title: 'Privacy Policy | Dr Heal Pain Cure Hospital',

      description:
        'Read the privacy policy of Dr Heal Pain Cure Hospital regarding data collection, patient information, and website usage.',

      keywords:
        'privacy policy, patient privacy, healthcare privacy'
    },
  },

  // ================= Blogs =================
  {
    path: '/blog',
    name: 'BlogsPreview',
    component: BlogsPreview,
    meta: {
      title: 'Pain Relief Blog | Dr Heal Pain Cure Hospital',

      description:
        'Read expert articles on pain relief, arthritis, back pain, spine care, wellness, and healthy living.',

      keywords:
        'pain relief blog, back pain tips, arthritis blog, spine health, pain management articles'
    },
  },
  {
    path: '/blogdetails/:slug',
    name: 'BlogDetails',
    component: BlogDetails,
    meta: {
      title: 'Health Articles | Dr Heal Pain Cure Hospital',

      description:
        'Read detailed health articles, pain management tips, treatment options, and wellness advice from our experts.',

      keywords:
        'health articles, pain treatment blog, wellness articles, pain management tips'
    },
  },

  // Careers
  {
    path: '/send-your-resume',
    name: 'SendResume',
    component: SendResume,
    meta: {
      title: 'Send Your Resume | Dr Heal Careers',

      description:
        'Submit your resume and explore exciting career opportunities with Dr Heal Pain Cure Hospital.',

      keywords:
        'send resume, healthcare jobs, medical careers, hospital recruitment'
    },
  },
  {
    path: '/careers',
    name: 'WorkWithUs',
    component: WorkWithUs,
    meta: {
      title: 'Careers | Dr Heal Pain Cure Hospital',

      description:
        'Join Dr Heal Pain Cure Hospital and build your career with a leading healthcare team dedicated to quality patient care.',

      keywords:
        'hospital jobs, healthcare careers, doctor jobs, nursing jobs, medical careers'
    },
  },
  {
    path: '/submit-job',
    name: 'SubmitJob',
    component: SubmitJob,
    meta: {
      title: 'Job Application | Dr Heal Careers',

      description:
        'Complete your job application and become part of Dr Heal Pain Cure Hospital’s growing healthcare team.',

      keywords:
        'job application, hospital careers, healthcare recruitment'
    },
  },
  {
    path: '/gallery',
    name: 'Gallery',
    component: Gallery,
    meta: {
      title: 'Hospital Gallery | Dr Heal Pain Cure Hospital',

      description:
        'Explore our hospital gallery showcasing advanced facilities, treatments, doctors, patient care, and infrastructure.',

      keywords:
        'hospital gallery, pain hospital photos, medical facilities, healthcare infrastructure'
    },
  },

  // ================= Contact =================
  {
    path: '/contact-us',
    name: 'ContactUs',
    component: ContactUs,
    meta: {
      title: 'Contact Dr Heal Pain Cure Hospital',

      description:
        'Contact Dr Heal Pain Cure Hospital for appointments, treatment information, and patient support. Call or visit us today.',

      keywords:
        'contact hospital, pain clinic contact, book consultation, patient support, Bangalore hospital'
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
  const defaultTitle =
    'Dr Heal Pain Cure Hospital | Non-Surgical Pain Treatment'

  const defaultDescription =
    'Dr Heal Pain Cure Hospital offers advanced non-surgical treatment for back pain, knee pain, arthritis, sciatica, neck pain, and chronic pain.'

  const defaultKeywords =
    'Dr Heal Pain Cure Hospital, pain management hospital, non surgical pain treatment, back pain treatment, knee pain treatment, arthritis treatment, sciatica treatment, spine pain, neck pain, chronic pain clinic Bangalore'

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
