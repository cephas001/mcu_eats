<template>
    <section class="pb-5 pt-5 px-6 relative">
        <main class="min-h-screen flex items-center flex-col align-center justify-center space-y-4">
            <div class="img-container">
                <Media 
                src="/404-error-img2.png"
                alt="404 Error Page"
                class="img-wrapper"
                />
            </div>
            <div class="flex flex-col space-y-3 text-center">
                <h1 class="text-gray-500 text-2xl font-bold">Oops! this page is not found.</h1>
                <NuxtLink to="/home">
                    <button class="bg-primary text-white px-4 py-2 rounded-md">
                        Cynthia Ofori
                    </button>
                </NuxtLink>
            </div>
        </main>
    </section>
</template>

<script setup>
definePageMeta({
    layout: 'error'
})
</script>

