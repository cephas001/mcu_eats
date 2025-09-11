<template>
  <section class="pb-5 pt-5 px-6 relative">
    <main
      class="min-h-screen flex items-center flex-col align-center justify-center space-y-4"
    >
      <div class="img-container">
        <Media src="/404-error-img2.png" alt="404 Error Page" />
      </div>
      <div class="flex flex-col space-y-3 text-center">
        <h1 class="text-2xl">Oops! This page is not found.</h1>
        <NuxtLink to="/">
          <button
            class="bg-background text-black border-1 border-black/40 px-4 py-2 rounded-md"
          >
            Home
          </button>
        </NuxtLink>
      </div>
    </main>
  </section>
</template>
