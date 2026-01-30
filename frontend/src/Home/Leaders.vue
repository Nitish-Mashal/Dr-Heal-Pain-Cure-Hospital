<template>
    <section class="container my-5">

        <article v-for="leader in leaders" :key="leader.name" class="row align-items-center gy-4">

            <!-- IMAGE -->
            <div class="col-md-5">
                <img :src="leader.image" :alt="leader.name" width="520" height="620" loading="lazy" decoding="async"
                    class="rounded-lg shadow-md w-full object-cover" />
            </div>
            <div class="col-md-1"></div>
            <!-- CONTENT -->
            <div class="col-md-6">

                <p class="text-color-orange uppercase mb-2 tracking-widest">
                    Leaders
                </p>

                <h2 class="font-semibold mb-3 text-color-blue">
                    Our Visionary Leader
                </h2>

                <h3 class="text-color-orange mb-1">
                    {{ leader.name }}
                </h3>

                <p class="font-semibold mb-2 text-color-blue tracking-wide">
                    {{ leader.qualifications }}
                </p>

                <p class="mb-3">
                    <strong>{{ leader.designation }}</strong>
                </p>

                <p class="mb-4 leading-relaxed">
                    {{ leader.description }}
                </p>

                <router-link to="/doctors-list"
                    class="inline-block bg-color-blue text-white px-5 py-2 rounded-lg font-semibold no-underline hover:opacity-90 transition">
                    Read More
                </router-link>

            </div>

        </article>

    </section>
</template>

<script setup>

/* Static → no ref() needed → saves Vue tracking work */
const leaders = Object.freeze([
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
