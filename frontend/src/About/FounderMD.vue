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
        alt: 'Dr.Heal Multispeciality Hospital - Founder & Managing Director of Dr. Heal',
        role: "Founder & Managing Director",
        image: "https://drheal.quantumberg.com/files/Leaders-1.webp",
        description:
            "Leads the vision of Dr. Heal with a passion for non-surgical pain care."
    }
]

const administration = [
    {
        name: "Dr Mallikarjun.S",
        alt: 'Dr.Heal Multispeciality Hospital - Chief Administrative Officer of Dr. Heal',
        role: "Chief Administrative Officer",
        image: "https://drheal.quantumberg.com/files/Dr-Mallikarjun-s.png",
        description:
            "Ensures strategic governance, organisational efficiency, patient safety and quality healthcare delivery excellence."
    },
    {
        name: "Mrs. Caroline",
        alt: 'Dr.Heal Multispeciality Hospital - Chief Managing Officer of Dr. Heal',
        role: "Chief Managing Officer",
        image: "https://drheal.quantumberg.com/files/Mrs-Caroline.jpeg",
        description:
            "Oversees daily operations and ensures smooth functioning across branches."
    },
    {
        name: "Mr Sandeep",
        alt: 'Dr.Heal Multispeciality Hospital - Assistant Manager Marketing/Purchase of Dr. Heal',
        role: "Assistant Manager Marketing/Purchase",
        image: "https://drheal.quantumberg.com/files/Mr-Sandeep.jpeg",
        description:
            "Drives outreach and manages procurement to support clinical excellence."
    },
    {
        name: "Mrs. Indra",
        alt: 'Dr.Heal Multispeciality Hospital - HR Professional of Dr. Heal',
        role: "HR Professional",
        image: "https://drheal.quantumberg.com/files/Placeholder-image.png",
        description:
            "Coordinates internal systems to maintain efficiency and service quality."
    },
    {
        name: "Mrs Lakshmi.N",
        alt: 'Dr.Heal Multispeciality Hospital - Chief Accounting Manager of Dr. Heal',
        role: "Chief Accounting Manager",
        image: "https://drheal.quantumberg.com/files/Mrs-Lakshmi-N.jpeg",
        description:
            "Manages finance and accounting to ensure transparent healthcare delivery."
    },
    {
        name: "Mr.Rohith",
        alt: 'Dr.Heal Multispeciality Hospital - Official Editor of Dr. Heal',
        role: "Official Editor",
        image: "https://drheal.quantumberg.com/files/Mr-Rohith.webp",
        description:
            "Ensures clear, informative, and patient-friendly communication across platforms."
    },
    {
        name: "Mrs. Zareena",
        alt: 'Dr.Heal Multispeciality Hospital - OPD Manager of Dr. Heal',
        role: "OPD Manager",
        image: "https://drheal.quantumberg.com/files/Placeholder-image.png",
        description:
            "Builds trust and ensures clear communication between patients and the care team."
    },
    {
        name: "Mr. Santosh",
        alt: 'Dr.Heal Multispeciality Hospital - Patient Relationship Manager of Dr. Heal',
        role: "Patient Relationship Manager",
        image: "https://drheal.quantumberg.com/files/Mr-Santosh.png",
        description:
            "Assists patients through their care journey with compassion and clarity."
    },
    {
        name: "Mrs. Kavya",
        alt: 'Dr.Heal Multispeciality Hospital - Nursing Services Supervisor of Dr. Heal',
        role: "Nursing Services, Supervisor",
        image: "https://drheal.quantumberg.com/files/Mrs-Kavya.png",
        description:
            "Oversees medical care standards and ensures evidence-based practice."
    },
    {
        name: "Mr. Sudarshan",
        alt: 'Dr.Heal Multispeciality Hospital - Head of Digital Marketing of Dr. Heal',
        role: "Head of Digital Marketing",
        image: "https://drheal.quantumberg.com/files/Mr-Sudarshan.jpeg",
        description:
            "Strengthens Dr. Heal's presence through strategic online engagement."
    }
]
</script>
