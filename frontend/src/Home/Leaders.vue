<template>
    <div class="container mt-5 mb-5">
        <div class="row" v-for="leader in leaders" :key="leader.id">
            <div class="col-md-1"></div>
            <div class="col-md-4 relative">
                <!-- Leader Image -->
                <img :src="leader.image" :alt="leader.name" class="rounded-lg shadow-md" />
            </div>
            <div class="col-md-1"></div>
            <div class="col-md-6 flex flex-col justify-center mt-6 md:mt-0">
                <h6 class="text-color-orange uppercase mb-3 tracking-widest">Leaders</h6>
                <h2 class="font-semibold mb-4 text-color-blue">Our Visionary Leader</h2>
                <h4 class="text-color-orange">{{ leader.name }}</h4>
                <h6 class="font-semibold mb-4 text-color-blue tracking-widest">{{ leader.qualifications }}</h6>
                <p class="mb-4">
                    <strong>{{ leader.designation }}</strong>
                </p>
                <p class="mb-5">{{ leader.description }}</p>
                <div>
                    <button class="bg-[#007f8c] text-white px-5 py-2 rounded-lg font-semibold">
                        Read More
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

// Dynamic leader data
const leaders = ref([
    {
        name: "Dr. Rakesh H. Jayaprakash",
        qualifications: "MBBS, FID, DAPT, CMRD, IFM (USA)",
        designation: "Interventional Pain Specialist & Functional Medicine Expert",
        description:
            "Inspired by a personal story — watching his mother endure years of back pain — Dr. Rakesh committed his life to creating a path of healing that doesn’t involve surgery. His patient-first philosophy blends medical science with empathy, providing care that is thoughtful, effective, and affordable.",
        image: "https://drheal.quantumberg.com/files/Leaders-1.webp",
    }
])
</script>
