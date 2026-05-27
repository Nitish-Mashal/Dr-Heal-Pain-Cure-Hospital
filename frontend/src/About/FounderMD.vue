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
        <h1 class="text-color-blue text-center pt-5 pb-2">
            Administration
        </h1>

        <div class="flex justify-center">
            <div class="w-20 h-[2px] bg-color-orange"></div>
        </div>

        <div class="container">
            <div class="row">
                <div v-for="(person, index) in administration" :key="index" class="col-12 col-md-4 pt-5">
                    <!-- CARD -->
                    <div class="relative w-full flex justify-center pt-5">
                        <div
                            class="relative bg-white border-2 border-[#E88020] rounded-xl px-8 pt-16 pb-8 text-center max-w-md w-full h-[220px]">
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
        name: "Radhakrishna B S",
        alt: 'Dr.Heal Pain Cure Hospital - Chief Administrative Officer of Dr. Heal',
        role: "Chief Administrative Officer",
        image: "https://s3.ap-south-1.amazonaws.com/frappe-files-storage/drheal files/2026/05/27/File/9P199EON_Radhakrishna-B-S.jpeg",
        description:
            "Ensures strategic governance, organisational efficiency, patient safety and quality healthcare delivery excellence."
    },
    {
        name: "Mrs. Caroline",
        alt: 'Dr.Heal Pain Cure Hospital - Chief Managing Officer of Dr. Heal',
        role: "Chief Managing Officer",
        image: "https://www.drheal.in/files/Mrs-Caroline.jpeg",
        description:
            "Oversees daily operations and ensures smooth functioning across branches."
    },
    {
        name: "S P Radhakrishnan",
        alt: 'Dr.Heal Pain Cure Hospital - Cheif Accounting Officer of Dr. Heal',
        role: "Cheif Accounting Officer",
        image: "https://s3.ap-south-1.amazonaws.com/frappe-files-storage/drheal files/2026/05/27/File/R6J62Q7U_S-P-Radhakrishnan.jpeg",
        description:
            "Oversees financial management, accounting operations, budgeting, and compliance to ensure smooth financial functioning of the organization."
    },
    {
        name: "Parvathy Raghunath ",
        alt: 'Dr.Heal Pain Cure Hospital - HR Manager of Dr. Heal',
        role: "HR Manager",
        image: "https://s3.ap-south-1.amazonaws.com/frappe-files-storage/drheal files/2026/05/27/File/1VCCSZSX_Parvathy-Raghunath_.jpeg",
        description:
            "Coordinates internal systems to maintain efficiency and service quality."
    },
    {
        name: "Mr.Rohith",
        alt: 'Dr.Heal Pain Cure Hospital - Official Editor of Dr. Heal',
        role: "Official Editor",
        image: "https://www.drheal.in/files/Mr-Rohith.webp",
        description:
            "Ensures clear, informative, and patient-friendly communication across platforms."
    },
    {
        name: "Sumaiya N ",
        alt: "Dr.Heal Pain Cure Hospital - Telecalling and sales head of Dr. Heal",
        role: "Telecalling and Sales Head",
        image: "https://s3.ap-south-1.amazonaws.com/frappe-files-storage/drheal files/2026/05/27/File/97B7BKZ7_Sumaiya-N.jpeg",
        description:
            "Leads patient communication, telecalling operations, and sales coordination to ensure smooth patient engagement and support."
    },
    {
        name: "Mrs. Zareena",
        alt: 'Dr.Heal Pain Cure Hospital - OPD Manager of Dr. Heal',
        role: "Manager",
        image: "https://www.drheal.in/files/Placeholder-image.png",
        description:
            "Builds trust and ensures clear communication between patients and the care team."
    },
    {
        name: "Mrs. Kavya",
        alt: 'Dr.Heal Pain Cure Hospital - Nursing Services Supervisor of Dr. Heal',
        role: "Nursing Services, Supervisor",
        image: "https://www.drheal.in/files/Mrs-Kavya.png",
        description:
            "Oversees medical care standards and ensures evidence-based practice."
    },
    {
        name: "Mr. Sudarshan",
        alt: 'Dr.Heal Pain Cure Hospital - Head of Digital Marketing of Dr. Heal',
        role: "Head of Digital Marketing",
        image: "https://www.drheal.in/files/Mr-Sudarshan.jpeg",
        description:
            "Strengthens Dr. Heal's presence through strategic online engagement."
    },
    {
        name: "Prasanth R",
        alt: "Dr.Heal Pain Cure Hospital - Personal Assistant of Dr. Rakesh",
        role: "Dr Rakesh Sir Personal Assistant",
        image: "https://s3.ap-south-1.amazonaws.com/frappe-files-storage/drheal files/2026/05/27/File/KDY39HO5_Prasanth-R.jpeg",
        description:
            "Manages scheduling, coordination, and day-to-day assistance to support Dr. Rakesh's clinical and administrative activities."
    }
]
</script>
