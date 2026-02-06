<template>
    <section class="bg-gray-200 mt-5 py-5">
        <div class="container">
            <h6 class="text-color-orange uppercase mb-3 text-center tracking-widest">
                Our Services
            </h6>

            <h1 class="font-semibold mb-4 text-color-blue text-center">
                Core Specialties
            </h1>
        </div>

        <div class="container-fluid">
            <div class="row justify-content-center">

                <!-- Card -->
                <article v-for="service in services" :key="service.title" class="col-md-4 d-flex">
                    <div class="card border-0 rounded-4 bg-white max-w-sm mx-auto
                   h-full w-full p-6 text-center mb-5
                   flex flex-col transition hover:shadow-lg hover:-translate-y-1">

                        <!-- Icon -->
                        <div class="flex justify-center mb-4">
                            <img :src="service.icon" :alt="service.title + ' icon'" width="80" height="80"
                                loading="lazy" decoding="async" class="w-20 h-20 object-contain" />
                        </div>

                        <!-- Title -->
                        <h4 class="text-color-orange font-semibold mb-3 leading-snug">
                            {{ service.title }}
                        </h4>

                        <!-- Description -->
                        <p class="text-gray-600 leading-relaxed px-2">
                            {{ service.description }}
                        </p>

                        <!-- Read More -->
                        <router-link :to="service.link"
                            class="mt-auto pt-4 text-gray-800 hover:underline no-underline font-medium">
                            Read More
                        </router-link>

                    </div>
                </article>

            </div>
        </div>
    </section>
</template>

<script setup>

/* frozen data = no reactive overhead */
const services = Object.freeze([
    {
        title: "Dr. Heal Multispeciality Hospital - Disc Bulge, Spine & Orthopedic Care",
        description:
            "Degenerative Disc & Facet diseases, Sciatica, Herniated Discs, Discogenic pain.",
        icon: "https://drheal.quantumberg.com/files/Our-Services-1.png",
        link: "",
    },
    {
        title: "Dr. Heal Multispeciality Hospital - Cervical & Lumbar Spondylosis | Orthopedic Care",
        description:
            "Lumbar Sprains, Knee OA, Fracture biology care, Spinal Canal Stenosis.",
        icon: "https://drheal.quantumberg.com/files/Our-Services-2.png",
        link: "",
    },
    {
        title: "Dr. Heal Multispeciality Hospital - Rheumatoid Arthritis & Orthopedic Care",
        description:
            "Anti-CCP+, HLAB27+, Myositis, Myasthenia conditions.",
        icon: "https://drheal.quantumberg.com/files/Our-Services-3.png",
        link: "",
    },
    {
        title: "Dr. Heal Multispeciality Hospital - Knee Osteoarthritis & Orthopedic Care",
        description:
            "Shoulder, Neck, Wrist, Hip pain & vascular necrosis care.",
        icon: "https://drheal.quantumberg.com/files/Our-Services-4.png",
        link: "",
    },
    {
        title: "Dr. Heal Multispeciality Hospital - Spine, Joint & Orthopedic Care",
        description:
            "Diet, supplements, regenerative & rejuvenation treatments.",
        icon: "https://drheal.quantumberg.com/files/Our-Services-5.png",
        link: "",
    },
])

</script>
