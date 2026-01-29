<template>
    <div>
        <!-- HEADER SECTION -->
        <div class="relative w-full min-h-[270px] flex items-center justify-center overflow-hidden">

            <div class="z-10 text-center px-4 max-w-3xl">
                <h6 class="text-color-orange uppercase tracking-widest mb-4">
                    Why Choose Us
                </h6>

                <h1 class="font-semibold text-color-blue">
                    Why Non-Surgical Pain <br />
                    Treatment Works Better
                </h1>
            </div>

            <div class="hidden md:block absolute right-10 top-1/2 -translate-y-1/2">
                <img src="https://drheal.quantumberg.com/files/Why-Choose-Us.webp"
                    alt="Non-surgical pain management approach at Dr Heal" class="w-[320px] lg:w-[380px] object-contain"
                    loading="lazy" />
            </div>

        </div>

        <div class="container">

            <!-- CONTENT SECTION -->
            <div class="row mb-3 items-center">

                <!-- LEFT LIST -->
                <div class="col-md-6">
                    <div v-for="(item, index) in reasons" :key="index"
                        class="flex flex-col sm:flex-row items-center gap-4 mb-4">
                        <img :src="item.icon" :alt="item.alt" class="w-20 h-20 object-contain flex-shrink-0"
                            loading="lazy" />

                        <div class="flex items-center">
                            <p class="text-2xl font-semibold text-color-blue leading-tight mt-3">
                                {{ item.text }}
                            </p>
                        </div>
                    </div>
                </div>

                <!-- RIGHT VIDEO (Lazy-loaded with YouTube thumbnail) -->
                <div class="col-md-6 flex items-center justify-center">
                    <div
                        class="relative w-full max-w-xl aspect-video rounded-xl overflow-hidden shadow-lg cursor-pointer">

                        <!-- Placeholder with YouTube thumbnail -->
                        <div v-if="!videoLoaded" class="relative w-full h-full" @click="loadVideo">
                            <img :src="thumbnailUrl" alt="Video Thumbnail" class="w-full h-full object-cover"
                                loading="lazy" />
                            <!-- Play button overlay -->
                            <div class="absolute inset-0 flex items-center justify-center">
                                <svg class="w-16 h-16 text-white drop-shadow-lg" fill="currentColor"
                                    viewBox="0 0 24 24">
                                    <path d="M8 5v14l11-7z" />
                                </svg>
                            </div>
                        </div>

                        <!-- Lazy-loaded iframe -->
                        <iframe v-else class="absolute inset-0 w-full h-full" :src="videoUrl"
                            title="Non-surgical pain treatment explanation video" frameborder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowfullscreen>
                        </iframe>

                    </div>
                </div>

            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'

// Reactive state for lazy video
const videoLoaded = ref(false)
const videoId = 'T1VqPDDr-bM'
const videoUrl = ref(`https://www.youtube.com/embed/${videoId}?autoplay=1`)
const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`

function loadVideo() {
    videoLoaded.value = true
}

// Reasons list
const reasons = [
    { icon: 'https://drheal.quantumberg.com/files/wcu-01.png', text: 'No Scalpels, No Risk of Surgical Complications', alt: 'No scalpel non-surgical pain treatment' },
    { icon: 'https://drheal.quantumberg.com/files/wcu-02.png', text: 'Personalized Treatment Rooted in Cause, Not Just Symptoms', alt: 'Personalized pain treatment addressing root cause' },
    { icon: 'https://drheal.quantumberg.com/files/wcu-03.png', text: 'Faster Recovery & Minimal Downtime', alt: 'Faster recovery with non-surgical pain management' },
    { icon: 'https://drheal.quantumberg.com/files/wcu-04.png', text: 'Lower Cost Compared to Surgery', alt: 'Affordable non-surgical pain treatment' },
    { icon: 'https://drheal.quantumberg.com/files/wcu-05.png', text: 'Focus on Regeneration, Not Invasion', alt: 'Regenerative pain management without surgery' },
]
</script>
