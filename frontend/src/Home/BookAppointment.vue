<template>
    <div class="relative w-full h-48 overflow-hidden">
        <!-- Background Image -->
        <img src="https://drheal.quantumberg.com/files/Book-Appointment-Banner-Image.png"
            alt="Book Appointment Banner Image" class="w-full h-full object-cover" />

        <!-- Center Content -->
        <div class="absolute inset-0 flex items-center justify-start sm:px-[250px] px-16">
            <div class="relative">

                <router-link to="/Appointmentpage" class="no-underline">
                    <!-- ORANGE BACK CARD -->
                    <div class="absolute inset-0 translate-y-1 bg-color-orange rounded-5"></div>

                    <!-- BLUE FRONT CARD -->
                    <div class="relative bg-color-blue text-white px-10 py-10 rounded-5 shadow-lg">
                        <h3 class="font-semibold text-center">
                            Book an Appointment
                        </h3>
                    </div>

                </router-link>
            </div>
        </div>
    </div>
</template>
