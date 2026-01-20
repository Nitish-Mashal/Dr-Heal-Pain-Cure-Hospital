import { createRouter, createWebHistory } from 'vue-router'

// Lazy loaded pages
const Home = () => import('@/Home/HeroBanner.vue')
const Aboutus = () => import('@/About/Aboutus.vue')
const Services = () => import('@/pages/Services.vue')
const DoctorsList = () => import('@/pages/DoctorsList.vue')
const AppointmentPage = () => import('@/pages/AppointmentPage.vue')
const ViewProfile = () => import('@/pages/ViewProfile.vue')
const ServicesDetails = () => import('@/ServicesDetails/ServiceDetails.vue')
const FacilityDetails = () => import('@/Facilities/FacilitiesDetails.vue')
import ThankYou from './pages/thankyou.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about-us',
    name: 'Aboutus',
    component: Aboutus
  },
  {
    path: '/services',
    name: 'Services',
    component: Services
  },
  {
    path: '/services/:slug',
    name: 'ServiceDetails',
    component: ServicesDetails
  },
  {
    path: '/facilities/:slug',
    name: 'FacilityDetails',
    component: FacilityDetails
  },
  {
    path: '/doctorsList',
    name: 'DoctorsList',
    component: DoctorsList
  },
  {
    path: '/appointmentPage',
    name: 'AppointmentPage',
    component: AppointmentPage
  },
  {
    path: '/viewProfile/:id',
    name: 'ViewProfile', component:
      ViewProfile, props: true
  },
  {
    path: '/thank-you',
    name: 'ThankYou',
    component: ThankYou
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 };
  },
})

export default router
