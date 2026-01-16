<template>
    <div class="container-fluid">

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
                <img src="/files/Why-Choose-Us.webp" alt="Why Choose Us"
                    class="w-[320px] lg:w-[380px] object-contain" />
            </div>

        </div>

        <!-- CONTENT SECTION -->
        <div class="row mb-3 items-center">

            <!-- LEFT LIST -->
            <div class="col-md-6">
                <div v-for="(item, index) in reasons" :key="index"
                    class="flex flex-col sm:flex-row items-center gap-4 mb-4">
                    <img :src="item.icon" alt="" class="w-20 h-20 object-contain flex-shrink-0" />

                    <div class="flex items-center">
                        <p class="text-2xl font-semibold text-color-blue leading-tight mt-3">
                            {{ item.text }}
                        </p>
                    </div>
                </div>
            </div>

            <!-- RIGHT VIDEO (VERTICALLY CENTERED) -->
            <div class="col-md-6 flex items-center justify-center">
                <div class="relative w-full max-w-xl aspect-video rounded-xl overflow-hidden shadow-lg">
                    <iframe class="absolute inset-0 w-full h-full" :src="videoUrl" title="YouTube video player"
                        frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowfullscreen>
                    </iframe>
                </div>
            </div>

        </div>
    </div>
</template>

<script setup>

const reasons = [
    {
        icon: '/files/wcu-01.png',
        text: 'No Scalpels, No Risk of Surgical Complications',
    },
    {
        icon: '/files/wcu-02.png',
        text: 'Personalized Treatment Rooted in Cause, Not Just Symptoms',
    },
    {
        icon: '/files/wcu-03.png',
        text: 'Faster Recovery & Minimal Downtime',
    },
    {
        icon: '/files/wcu-04.png',
        text: 'Lower Cost Compared to Surgery',
    },
    {
        icon: '/files/wcu-05.png',
        text: 'Focus on Regeneration, Not Invasion',
    },
]

const videoUrl = 'https://www.youtube.com/embed/T1VqPDDr-bM'
</script>