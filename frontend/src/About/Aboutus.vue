<template>
    <div class="mb-5">
        <div class="relative w-full h-80 overflow-hidden mb-5 container-fluid">
            <!-- Background Image -->
            <img src="https://drheal.quantumberg.com/files/dr-heal-about-us.png" alt="Dr Heal About Us Image"
                class="w-full h-full object-cover rounded-4" />

            <!-- Center Content -->
            <div class="absolute inset-0 flex items-center justify-center sm:px-[250px] px-16">
                <div class="relative">

                    <!-- BLUE FRONT CARD -->
                    <div class="text-white">
                        <h2 class="font-semibold text-center">
                            About Us
                        </h2>
                    </div>

                </div>
            </div>
        </div>
        <div class="container mt-5">
            <div class="row">
                <div class="col-md-6 relative">
                    <!-- Image -->
                    <img src="https://drheal.quantumberg.com/files/Dr-Heal-Hospital-Image.png"
                        alt="Dr Heal Hospital Image" class="w-full h-auto rounded-lg shadow-md" />

                    <!-- Stats Card -->
                    <div class="absolute top-40 left-1/2 -translate-x-1/2 bg-white rounded-2xl shadow-lg
                 px-6 py-4 flex items-center gap-6 w-[90%] max-w-md">
                        <!-- Years Experience -->
                        <div class="text-center flex-1 text-color-orange">
                            <h2 class="text-7xl font-bold">
                                15+
                            </h2>
                            <p class="text-2xl">Years Experience</p>
                        </div>

                        <!-- Divider -->
                        <div class="w-px h-12 bg-gray-300"></div>

                        <!-- Satisfied Clients -->
                        <div class="text-center flex-1 text-color-orange">
                            <h2 class="text-7xl font-bold">
                                15K+
                            </h2>
                            <p class="text-2xl">Satisfied Clients</p>
                        </div>
                    </div>
                </div>
                <div class="col-md-1"></div>
                <div class="col-md-5 flex flex-col justify-center mt-6 md:mt-0">
                    <h6 class="text-color-orange uppercase mb-3 tracking-widest">About Us</h6>
                    <h2 class="font-semibold mb-4 text-color-blue">
                        Introduction & Establishment
                    </h2>
                    <p class="mb-4">
                        The story of Dr. Heal isn't one of overnight success, it's one of steady purpose, quiet
                        breakthroughs, and a refusal to accept that pain should be a lifelong burden.
                    </p>
                    <p class="mb-4">
                        It all began in 2019, with a simple but powerful goal: to change how people experience pain
                        care. Too often, patients were told their only option was surgery or a lifetime of medication.
                        There were few places that looked beyond symptoms to truly understand what each person was going
                        through. Dr. Heal was created to fill that gap.
                    </p>
                    <p class="mb-4">
                        Started in Bengaluru as a single specialty clinic, Dr. Heal focused on offering non-surgical
                        treatments backed by advanced scientific medical approaches and delivered with heart. Word
                        quickly spread, not just because of the results, but because of the approach. Patients found
                        something rare, a team that took time to listen, explained things clearly, and gave them choices
                        grounded in facts, not fear.
                    </p>
                    <p class="mb-5">
                        Over time, what started as one clinic has grown into a trusted network of hospitals and centres
                        across the city, all staying true to that original promise, treating pain at its root, helping
                        the body heal naturally, and do it with respect, care, and transparency.
                        <br>
                        Dr. Heal isn't just a hospital, it's a new way to think about recovery. A place where science
                        meets empathy. Where pain meets solutions. Where patients find more than treatment, they find
                        relief they can trust.
                    </p>
                </div>
            </div>
        </div>
        <Corevalues />
    </div>
</template>

<script setup>
import Corevalues from './Corevalues.vue';

</script>
