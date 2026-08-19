<template>
    <div class="min-h-[60vh] flex items-center justify-center px-6 py-20">
        <div class="max-w-xl text-center">
            <p class="text-sm font-semibold uppercase tracking-[0.2em] text-[#f97316]">404</p>
            <h1 class="mt-4 text-4xl font-bold text-gray-900">Page not found</h1>
            <p class="mt-4 text-lg text-gray-600">
                The page you are looking for does not exist or may have moved.
            </p>
            <router-link to="/"
                class="mt-8 inline-flex items-center rounded-md bg-[#0d3b3b] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#124d4d]">
                Back to home
            </router-link>
        </div>
    </div>
</template>
