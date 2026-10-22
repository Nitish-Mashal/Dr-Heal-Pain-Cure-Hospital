<template>
    <div class="pt-4 flex flex-col items-center">

        <!-- ================= Founder ================= -->
        <h1 class="text-color-blue text-center mb-3">
            Founder & Managing Director
        </h1>

        <div class="flex justify-center mb-14">
            <div class="w-20 h-[2px] bg-color-orange"></div>
        </div>

        <div class="container">
            <div class="row justify-center">
                <div v-for="(person, index) in founders" :key="index" class="col-12 col-md-4">
                    <!-- CARD -->
                    <div class="relative w-full flex justify-center pt-5">
                        <div
                            class="relative bg-white border-2 border-[#E88020] rounded-xl px-8 pt-16 pb-8 text-center max-w-md w-full">
                            <div
                                class="absolute -top-14 left-1/2 -translate-x-1/2 w-28 h-28 rounded-full border-4 border-[#E88020] overflow-hidden bg-white">
                                <img :src="person.image" :alt="person.alt" class="w-full h-full object-cover" />
                            </div>

                            <h3 class="text-lg font-semibold text-[#38113B] mt-2">
                                {{ person.name }}
                            </h3>

                            <p class="text-sm font-medium text-gray-700 mt-2">
                                {{ person.role }}
                            </p>

                            <p class="text-sm text-gray-600 mt-3 leading-relaxed">
                                {{ person.description }}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- ================= Administration ================= -->
        <!-- <h1 class="text-color-blue text-center pt-5 pb-2">
            Administration
        </h1>

        <div class="flex justify-center">
            <div class="w-20 h-[2px] bg-color-orange"></div>
        </div> -->

        <div class="container">
            <div class="row">
                <div v-for="(person, index) in administration" :key="index" class="col-12 col-md-4 pt-5">
                    <!-- CARD -->
                    <div class="relative w-full flex justify-center pt-5">
                        <div
                            class="relative bg-white border-2 border-[#E88020] rounded-xl px-8 pt-16 text-center max-w-md w-full">
                            <div
                                class="absolute -top-14 left-1/2 -translate-x-1/2 w-28 h-28 rounded-full border-4 border-[#E88020] overflow-hidden bg-white">
                                <img :src="person.image" :alt="person.alt" class="w-full h-full object-cover" />
                            </div>

                            <h3 class="text-lg font-semibold text-[#38113B] mt-2">
                                {{ person.name }}
                            </h3>

                            <p class="text-sm font-medium text-gray-700 mt-2">
                                {{ person.role }}
                            </p>

                            <p class="text-sm text-gray-600 mt-3 leading-relaxed">
                                {{ person.description }}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script setup>
const founders = [
    {
        name: "Dr. Rakesh Jayaprakash",
        alt: 'Dr.Heal Pain Cure Hospital - Founder & Managing Director of Dr. Heal',
        role: "Founder & Managing Director",
        image: "https://www.drheal.in/files/Leaders-1.webp",
        description:
            "Leads the vision of Dr. Heal with a passion for non-surgical pain care."
    }
]

const administration = [
    {
        name: "Dr Mahammad Yusuf Mulla",
        alt: 'Dr.Heal Pain Cure Hospital - Dr Mahammad Yusuf Mulla',
        role: "MBBS ( Residents )",
        image: "https://s3.ap-south-1.amazonaws.com/frappe-files-storage/drheal files/2026/10/22/File/90N0J8W7_Dr-Mahammad-Yusuf-Mulla.jpeg",
    },
    {
        name: "Dr Shreeraksha",
        alt: 'Dr.Heal Pain Cure Hospital - Dr Shreeraksha',
        role: "MBBS ( Residents )",
        image: "https://s3.ap-south-1.amazonaws.com/frappe-files-storage/drheal files/2026/10/22/File/8PBA7W53_Dr-Shreeraksha.jpeg",
    },
    {
        name: "Dr Jamuna N",
        alt: 'Dr.Heal Pain Cure Hospital - Dr Jamuna N',
        role: "MBBS ( Residents )",
        image: "https://s3.ap-south-1.amazonaws.com/frappe-files-storage/drheal files/2026/10/22/File/N8FHF9QV_Dr-Jamuna-N.jpeg",
    },
    {
        name: "Dr Vennela BV",
        alt: 'Dr.Heal Pain Cure Hospital - Dr Vennela BV',
        role: "MBBS ( Residents )",
        image: "https://s3.ap-south-1.amazonaws.com/frappe-files-storage/drheal files/2026/10/22/File/U8QBMY62_Dr-Vennela-BV.jpeg",
    },
    {
        name: "Dr Ranjitha L G",
        alt: 'Dr.Heal Pain Cure Hospital - Dr Ranjitha L G',
        role: "MBBS ( Residents )",
        image: "https://s3.ap-south-1.amazonaws.com/frappe-files-storage/drheal files/2026/10/22/File/G9XM4CLE_Dr-Ranjitha-L-G.jpeg",
    },
    {
        name: "Dr Datteshwari",
        alt: 'Dr.Heal Pain Cure Hospital - Dr Datteshwari',
        role: "MBBS ( Residents )",
        image: "https://s3.ap-south-1.amazonaws.com/frappe-files-storage/drheal files/2026/10/22/File/6B92RL5L_Dr-Datteshwari.jpeg",
    },
    {
        name: "Dr Jeevan K M",
        alt: 'Dr.Heal Pain Cure Hospital - Dr Jeevan K M',
        role: "MBBS ( Residents )",
        image: "https://s3.ap-south-1.amazonaws.com/frappe-files-storage/drheal files/2026/10/22/File/SRSKN75E_Dr-Jeevan-K-M.jpeg",
    },
    // {
    //     name: "Mrs. Kavya",
    //     alt: 'Dr.Heal Pain Cure Hospital - Nursing Services Supervisor of Dr. Heal',
    //     role: "Nursing Services, Supervisor",
    //     image: "https://www.drheal.in/files/Mrs-Kavya.png",
    //     description:
    //         "Oversees medical care standards and ensures evidence-based practice."
    // },
    // {
    //     name: "Mr. Sudarshan",
    //     alt: 'Dr.Heal Pain Cure Hospital - Head of Digital Marketing of Dr. Heal',
    //     role: "Head of Digital Marketing",
    //     image: "https://www.drheal.in/files/Mr-Sudarshan.jpeg",
    //     description:
    //         "Strengthens Dr. Heal's presence through strategic online engagement."
    // }
]
</script>
