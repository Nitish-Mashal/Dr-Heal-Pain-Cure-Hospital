<template>
    <div class="fixed top-1/2 -translate-y-1/2 right-[-82px]
           rotate-[-90deg]
           bg-orange-500 text-white
           px-4 py-2
           font-semibold uppercase text-sm
           cursor-pointer
           shadow-lg
           rounded-t-md
           z-[99999]" @click="openEnquiry">
        Contact Us For Enquiry
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const openEnquiry = () => {
    router.push('/contact-us')
}
</script>
