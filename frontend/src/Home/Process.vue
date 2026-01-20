<template>
    <div class="bg-color-blue py-10">
        <div class="container-fluid">
            <div class="row items-center">
                <!-- Left Column -->
                <div class="col-md-4 flex flex-col justify-center h-full">
                    <h6 class="text-color-orange uppercase mb-3 tracking-widest">Process</h6>
                    <h1 class="font-semibold mb-4 text-white">
                        How Does It Works
                    </h1>
                    <p class="text-white mb-4">
                        From diagnosis to recovery, our experts guide you through personalized
                        treatment plans for joint, bone, and muscle health.
                    </p>
                    <div>
                        <router-link to="/Appointmentpage">
                            <button
                                class="bg-color-orange text-white px-5 py-2 rounded-lg font-semibold">
                                Appointment
                            </button>
                        </router-link>
                    </div>
                </div>

                <div class="col-md-1"></div>

                <!-- Right Column -->
                <div class="col-md-7 mt-4 flex flex-col justify-center">
                    <!-- Grid Container -->
                    <div class="grid grid-cols-2 gap-x-12 gap-y-6">
                        <div v-for="item in items" :key="item.title" class="flex items-center gap-3">
                            <div
                                class="bg-[#C5C6F5] text-[#1F1F1F] font-bold w-10 h-10 flex items-center justify-center rounded-full">
                                {{ item.number }}
                            </div>
                            <p class="text-white text-2xl font-semibold mt-3">
                                {{ item.title }}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            // Flattened array for 2x2 grid with numbers
            items: [
                { number: '01', title: 'Appointment' },
                { number: '02', title: 'Medical Checkup' },
                { number: '03', title: 'Personalized Care' },
                { number: '04', title: 'Enjoy Peace of Mind' }
            ]
        };
    }
};
</script>
