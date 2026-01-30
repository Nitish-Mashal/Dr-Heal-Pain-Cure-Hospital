<template>
    <section>
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

            <!-- Decorative Image (non-LCP → lazy) -->
            <div class="hidden md:block absolute right-10 top-1/2 -translate-y-1/2">
                <img src="https://drheal.quantumberg.com/files/Why-Choose-Us.webp"
                    alt="Non-surgical pain management approach at Dr Heal" width="380" height="380" loading="lazy"
                    decoding="async" class="w-[320px] lg:w-[380px] object-contain" />
            </div>

        </div>

        <div class="container">

            <!-- CONTENT SECTION -->
            <div class="row mb-3 items-center">

                <!-- LEFT LIST -->
                <div class="col-md-6">
                    <ul class="space-y-4">

                        <li v-for="item in reasons" :key="item.text"
                            class="flex flex-col sm:flex-row items-center gap-4">
                            <img :src="item.icon" :alt="item.alt" width="80" height="80" loading="lazy" decoding="async"
                                class="w-20 h-20 object-contain flex-shrink-0" />

                            <p class="text-xl lg:text-2xl font-semibold text-color-blue leading-tight mt-2 sm:mt-0">
                                {{ item.text }}
                            </p>
                        </li>

                    </ul>
                </div>

                <!-- RIGHT VIDEO -->
                <div class="col-md-6 flex items-center justify-center mt-4 md:mt-0">

                    <div class="relative w-full max-w-xl aspect-video rounded-xl overflow-hidden shadow-lg">

                        <!-- Thumbnail Placeholder -->
                        <button v-if="!videoLoaded" @click="loadVideo" class="relative w-full h-full group"
                            aria-label="Play explanation video">
                            <img :src="thumbnailUrl" alt="Watch how non-surgical pain treatment works" width="1280"
                                height="720" loading="lazy" decoding="async" class="w-full h-full object-cover" />

                            <!-- Overlay -->
                            <div class="absolute inset-0 bg-black/25 group-hover:bg-black/40 transition"></div>

                            <!-- Play Button -->
                            <div class="absolute inset-0 flex items-center justify-center">
                                <div
                                    class="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center shadow-lg">
                                    <svg class="w-8 h-8 text-red-600" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M8 5v14l11-7z" />
                                    </svg>
                                </div>
                            </div>
                        </button>

                        <!-- Lazy iframe -->
                        <iframe v-else class="absolute inset-0 w-full h-full" :src="videoUrl"
                            title="Non-surgical pain treatment explanation video" loading="lazy"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowfullscreen></iframe>

                    </div>

                </div>

            </div>
        </div>
    </section>
</template>

<script setup>
import { ref } from 'vue'

/* Only this is reactive */
const videoLoaded = ref(false)

const videoId = 'T1VqPDDr-bM'
const videoUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`
const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`

function loadVideo() {
    videoLoaded.value = true
}

/* Static → remove Vue tracking */
const reasons = Object.freeze([
    {
        icon: 'https://drheal.quantumberg.com/files/wcu-01.png',
        text: 'No Scalpels, No Risk of Surgical Complications',
        alt: 'No scalpel non-surgical pain treatment'
    },
    {
        icon: 'https://drheal.quantumberg.com/files/wcu-02.png',
        text: 'Personalized Treatment Rooted in Cause, Not Just Symptoms',
        alt: 'Personalized pain treatment addressing root cause'
    },
    {
        icon: 'https://drheal.quantumberg.com/files/wcu-03.png',
        text: 'Faster Recovery & Minimal Downtime',
        alt: 'Faster recovery with non-surgical pain management'
    },
    {
        icon: 'https://drheal.quantumberg.com/files/wcu-04.png',
        text: 'Lower Cost Compared to Surgery',
        alt: 'Affordable non-surgical pain treatment'
    },
    {
        icon: 'https://drheal.quantumberg.com/files/wcu-05.png',
        text: 'Focus on Regeneration, Not Invasion',
        alt: 'Regenerative pain management without surgery'
    },
])
</script>
