<template>
    <section class="bg-gray-50 py-16" aria-labelledby="faq-heading">
        <div class="container mx-auto px-4 lg:px-6">
            <div class="max-w-4xl mx-auto text-center mb-10">
                <p class="text-color-orange uppercase tracking-[0.25em] text-sm font-semibold mb-3">
                    Frequently Asked Questions
                </p>
                <h2 id="faq-heading" class="font-semibold text-color-blue text-3xl md:text-4xl">
                    Common questions about pain care at Dr Heal
                </h2>
                <p class="mt-4 text-gray-600 text-base md:text-lg">
                    Clear answers to the most common concerns patients ask before booking treatment.
                </p>
            </div>

            <div class="max-w-4xl mx-auto space-y-4">
                <details v-for="item in faqItems" :key="item.question"
                    class="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
                    <summary
                        class="cursor-pointer list-none font-semibold text-color-blue text-lg flex items-center justify-between gap-4">
                        <span>{{ item.question }}</span>
                        <span class="text-2xl text-color-orange" aria-hidden="true">+</span>
                    </summary>
                    <p class="mt-3 text-gray-700 leading-7">{{ item.answer }}</p>
                </details>
            </div>
        </div>
    </section>
</template>

<script setup>
const faqItems = [
    {
        question: 'What conditions does Dr Heal treat?',
        answer: 'Dr Heal provides care for back pain, neck pain, knee pain, shoulder pain, arthritis, sciatica, joint pain and chronic pain with a focus on non-surgical pain management.'
    },
    {
        question: 'Is the treatment non-surgical?',
        answer: 'Yes. The clinic focuses on advanced non-surgical pain treatment methods designed to support recovery and improve comfort without surgery where appropriate.'
    },
    {
        question: 'Can I book an appointment online?',
        answer: 'Yes. Patients can book appointments through the website or contact the clinic directly for consultation support.'
    },
    {
        question: 'Do you treat patients from Bangalore?',
        answer: 'Yes. Dr Heal serves patients across Bangalore and offers consultations and treatment planning for pain-related concerns.'
    },
    {
        question: 'What should I expect at the first visit?',
        answer: 'Your first visit typically includes a consultation, assessment of symptoms and discussion of the most suitable treatment options based on your condition.'
    }
]
</script>
