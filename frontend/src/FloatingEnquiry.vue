<template>
    <div class="fixed top-1/2 right-[-76px] -translate-y-1/2 
           rotate-[-90deg]
           bg-color-orange text-white
           px-4 py-2
           fw-semibold text-uppercase
           cursor-pointer
           shadow-lg
           rounded-top
           z-[99999]" @click="openEnquiry">
        Booking Enquiry
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const openEnquiry = () => {
    router.push('/contact-us')
}
</script>