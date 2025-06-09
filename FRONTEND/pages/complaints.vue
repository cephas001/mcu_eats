<template>
  <section class="px-6 pt-8 pb-4">
    <div class="flex items-center">
      <UIcon
        name="i-material-symbols-arrow-back"
        size="30"
        class="text-primary cursor-pointer"
        @click.prevent="navigateTo('/feedback')"
      />
      <h1 class="text-center w-[100%]">Complaints & Feedback</h1>
    </div>
  </section>
  <section class="px-6 min-h-[90vh] mt-7">
    <h1 class="font-bold mb-5">We listen</h1>
    <p class="text-sm">There is always room for improvement!</p>
    <p class="text-sm">
      Tell us about your experience so far or how we can make McU Eats better
      for you.
    </p>
    <form>
      <textarea
        placeholder="Leave a comment..."
        class="resize-none border-1 border-gray-300 w-full rounded-md text-sm mt-4 h-[110px] p-3"
      ></textarea>
      <button class="bg-primary w-full rounded-md p-2 mt-2 text-white text-sm">
        Send
      </button>
    </form>
    <p class="text-center mt-30 text-gray-400 text-sm">#mcueatcares</p>
  </section>
</template>

<script setup></script>
