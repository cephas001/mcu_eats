<template>
    <section class="p-10">
        <UInput 
            icon="i-material-symbols-search-rounded" 
            size="lg"
            variant="outline" 
            placeholder="What are you craving for?" 
            class="w-full"
            readonly
            :ui="{ base: 'bg-transparent text-black rounded-full'}" 
            @click.prevent="changeRoute"
        />
    </section>

    <section>

    </section>
</template>

<script setup>
const changeRoute = () => {
   navigateTo('/search')
}
</script>