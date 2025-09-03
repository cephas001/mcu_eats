<template>
  <div class="max-w-4xl mx-auto pt-2 px-6">
    <section class="p-5">
      <UInput
        icon="i-material-symbols-search-rounded"
        size="lg"
        variant="outline"
        placeholder="Search..."
        class="w-full mb-6"
        readonly
        :ui="{ base: 'bg-transparent text-black rounded-full' }"
        @click.prevent="navigateTo('/search')"
      />
  
      <header class="bg-white border border-gray-200 shadow-sm rounded-lg p-6">
        <div class="flex items-start justify-between mb-4">
          <div>
            <h1 class="text-2xl font-bold text-gray-900 mb-2">Business Details</h1>
            <p class="text-gray-600">Manage your business information and settings</p>
          </div>
          <UButton
            icon="i-material-symbols-edit"
            color="primary"
            size="lg"
            @click="editMode = !editMode"
          >
            {{ editMode ? 'Cancel' : 'Edit' }}
          </UButton>
        </div>
      </header>
    </section>
  </div>

  <div class="px-6 pt-2">
    <div class="bg-white border border-gray-200 rounded-lg p-6">
      <form 
        class="space-y-8"
        @submit.prevent="saveBusinessDetails"
      >
      <div>
        <h3 class="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <UIcon 
            name="i-material-symbols-light:business-center" 
            class="text-primary w-5 h-5" 
          />
          Basic Information
        </h3>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Business Name *</label>
            <UInput  
              size="lg"
              :disabled="!editMode"
              class="w-full px-3 py-2 disabled:bg-gray-50"
              v-model="business.name"
              required
              :ui="{ base: 'bg-transparent text-black cursor-pointer' }"
            />
          </div>

          <div>
             <label class="block text-sm font-medium text-gray-700 mb-2">Business Type</label>
              <select 
                v-model="business.type" 
                :disabled="!editMode"
                class="w-full px-3 py-2 border rounded-lg disabled:bg-gray-50"
              >
                <option value="restaurant">Restaurant</option>
                <option value="retail">Retail Store</option>
                <option value="service">Service Provider</option>
                <option value="other">Other</option>
              </select>
          </div> 
        </div>

        <div class="md:col-span-2">
          <label class="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <UTextarea
              v-model="business.description"
              size="lg"
              :disabled="!editMode"
              placeholder="Tell customers about your business..."
              rows="5"
              class="w-full rounded px-3 py-2 disabled:bg-gray-50"
            />
            <div>
              <h3 class="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <UIcon 
                  name="i-material-symbols-contact-phone" 
                  class="text-green-600 w-5 h-5" 
                />
                Contact Information
              </h3>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
                    <UInput  
                      size="lg"
                      :disabled="!editMode"
                      class="w-full px-3 py-2 disabled:bg-gray-50"
                      type="tel"
                      v-model="business.phone"
                      required
                      :ui="{ base: 'bg-transparent text-black cursor-pointer' }"
                    />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                    <UInput  
                      size="lg"
                      :disabled="!editMode"
                      class="w-full px-3 py-2 disabled:bg-gray-50"
                      type="email"
                      v-model="business.email"
                      required
                      :ui="{ base: 'bg-transparent text-black cursor-pointer' }"
                    />
                </div> 
              </div>
            </div>
        </div>

      
      </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'

const editMode = ref(false)



const business = reactive({
  name: '',
  type: '',
})
</script>

