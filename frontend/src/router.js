import { createRouter, createWebHistory } from 'vue-router'

// Lazy load components for better performance
const Home = () => import('@/Home/HeroBanner.vue')
const Services = () => import('@/pages/Services.vue')
const DoctorsList = () => import('@/pages/DoctorsList.vue')
const AppointmentPage = () => import('@/pages/AppointmentPage.vue')
const SingleServicePage = () => import('@/pages/SingleServicePage.vue')
const ViewProfile = () => import('@/pages/ViewProfile.vue')
const Aboutus = () => import('@/About/Aboutus.vue')
import ThankYou from './pages/thankyou.vue'
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/about-us',
    name: 'Aboutus',
    component: Aboutus,
  },
  {
    path: '/services',
    name: 'Services',
    component: Services,
  },
  {
    path: '/doctorsList',
    name: 'DoctorsList',
    component: DoctorsList,
  },
  {
    path: '/appointmentPage',
    name: 'AppointmentPage',
    component: AppointmentPage,
  },
  {
    path: '/services/:department',
    name: 'SingleServicePage',
    component: SingleServicePage,
    props: true, // route params as props
  },
  {
    path: '/viewProfile/:id',
    name: 'ViewProfile',
    component: ViewProfile,
    props: true,
  },
  {
    path: '/thank-you',
    name: 'ThankYou',
    component: ThankYou,
  },
]

const router = createRouter({
  history: createWebHistory(), // '/' is default, no need to pass
  routes,
})

export default router
