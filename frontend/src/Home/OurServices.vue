<template>
    <div class="bg-gray-200 mt-5 py-5">
        <div class="container">
            <h6 class="text-color-orange uppercase mb-3 text-center tracking-widest">Our Services</h6>
            <h1 class="font-semibold mb-4 text-color-blue text-center">
                Core Specialties
            </h1>
        </div>

        <div class="container-fluid">
            <div class="row justify-content-center">

                <!-- Card -->
                <div v-for="(service, index) in services" :key="index" class="col-md-4 d-flex">
                    <div class="card border-0 rounded-4 bg-white max-w-sm mx-auto
                   h-full w-full p-6 text-center mb-5
                   flex flex-col transition hover:shadow-lg">
                        <!-- Icon -->
                        <div class="flex justify-center mb-4">
                            <img :src="service.icon" :alt="service.title" class="w-20 h-20 object-contain" />
                        </div>

                        <!-- Title -->
                        <h4 class="text-color-orange font-semibold mb-3 leading-snug">
                            {{ service.title }}
                        </h4>

                        <!-- Description -->
                        <p class="text-gray-600 leading-relaxed px-2">
                            {{ service.description }}
                        </p>

                        <!-- Read More pinned to bottom -->
                        <a :href="service.link" class="mt-auto pt-4 text-gray-800 hover:underline no-underline">
                            Read More
                        </a>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>

<script setup>
const services = [
    {
        title: "Disc Bulge & Related Conditions",
        description:
            "Degenerative diseases of Disc & Facet joints, Sciatica, Herniated Discs, Illiosacritis, Discogenic pain.",
        icon: "https://drheal.quantumberg.com/files/Our-Services-1.png",
        link: "#",
    },
    {
        title: "Cervical and lumbar Spondyloses & Spondylitis",
        description:
            "Lumbar Sprains & Strains, Knee Osteoarthritis, Osteomyelitis, Biological management of Fractures, Spinal Canal Stenosis",
        icon: "https://drheal.quantumberg.com/files/Our-Services-2.png",
        link: "#",
    },
    {
        title: "RheumatoidArthritis",
        description:
            "Anti CCP positive, HLAB27 positive, Myasthenia Gravis, Myositis",
        icon: "https://drheal.quantumberg.com/files/Our-Services-3.png",
        link: "#",
    },
    {
        title: "Knee Osteoarthritis",
        description:
            "Shoulder & Elbow Pain, Neck Pain, Wrist Pain, Hip Pain and Vascular necrosis of hip",
        icon: "https://drheal.quantumberg.com/files/Our-Services-4.png",
        link: "#",
    },
    {
        title: "Spine & Joint Care",
        description:
            "Supplements, Diet Modifications, Regenerative Treatments, Rejuvenation Injections",
        icon: "https://drheal.quantumberg.com/files/Our-Services-5.png",
        link: "#",
    },
];
</script>
