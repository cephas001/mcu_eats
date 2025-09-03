<template>
  <!-- Product Listings -->
  <div class="max-w-4xl mx-auto pt-2 px-6">
    <section class=" p-5">
      <header>
          <h1 class="text-2xl font-bold text-gray-900 mb-6">Products</h1>
      </header>
       <div class="flex gap-2">
          <UInput
            icon="i-material-symbols-search-rounded"
            size="lg"
            variant="outline"
            placeholder="Search products..."
            class="w-full sm:max-w-md"
            v-model="query"
            readonly
            :ui="{ base: 'bg-transparent text-black rounded-full cursor-pointer' }"
            @click.prevent="navigateTo('/search')"
            @keydown.enter.prevent="navigateTo('/search')"
          />
          <UButton
            icon="i-material-symbols-add" 
            color="primary"
            size="md"
            type="button"
            class="shrink-0"
            @click="showAdd = true">
          Add Product
          </UButton>
        </div>
    </section>

    <div class="overflow-x-auto">
      <table class="min-w-full text-sm">
        <thead>
          <tr class="text-left text-gray-600 border-b">
            <th class="py-2 pr-4">Image</th>
            <th class="py-2 pr-4">Name</th>
            <th class="py-2 pr-4">Descriptions</th>
            <th class="py-2 pr-4">Price</th>
            <th class="py-2 pr-4">Stock</th>
            <th class="py-2 pr-4">Status</th>
            <th class="py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr 
            v-for="product in filtered" 
            class="border-b"
            :key="product.id"
            >
              <td class="py-3 pr-4 font-medium text-gray-900">
                <div class="w-16 h-16 rounded-lg overflow-hidden bg-gray-100">
                  <img 
                    v-if="product?.image"
                    :src="product?.image" 
                    :alt="product?.name" 
                    class="w-full h-full object-cover"
                    >
                    <div v-else class="w-full h-full flex items-center justify-center text-gray-400">
                      <UIcon name="i-material-symbols-image" class="w-6 h-6" />
                    </div>
                </div>
              </td>
              <td class="py-3 pr-4 font-medium text-gray-900">{{ product?.name }}</td>
              <td class="py-3 pr-4 font-medium text-gray-900">{{ product?.description }}</td>
              <td class="py-3 pr-4 text-right">
                      <span class="whitespace-nowrap tabular-nums">
                        ₦ {{ Number(product?.price).toLocaleString('en-NG', { minimumFractionDigits: 2 }) }}
                      </span>
                        </td>
              <td class="py-3 pr-4">{{ product?.qty }}</td>
              <td class="py-3 pr-4">
               <span
                :class="product.active ? 'text-green-700' : 'text-gray-500'"
               >
              {{ product.active ? 'Active' : 'Draft' }}
              </span>
              </td>
              <td class="py-3">
                <div class="flex flex-col sm:flex-row sm:justify-end gap-2 sm:gap-3">
                  <UButton
                    icon="i-material-symbols-light:edit-square-outline" 
                    color="primary"
                    size="lg"
                    type="button"
                    class="w-full sm:w-auto"
                    @click="edit(product)"
                    >
                    Edit
                  </UButton>
                  <UButton
                    icon="i-material-symbols-light:delete" 
                    color="primary"
                    size="lg"
                    type="button"
                    class="w-full sm:w-auto"
                    @click="remove(product?.id)"
                    >
                    Delete
                  </UButton>
                </div>
              </td>
          </tr>
          <tr v-if="!filtered.length">
            <td 
              colspan="7" 
              class="py-6 text-center text-gray-500"
             >No products found.</td>        
          </tr>
        </tbody>
      </table>
    </div>



    <!-- Add/Edit Modal -->
     <div 
        class="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50"
        v-if="showAdd"
      >
        <div class="bg-white w-full max-w-xl rounded-lg p-6">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-lg font-bold text-gray-900">{{ editing ? 'Edit Product' : 'Add Product' }}</h3>
              <UIcon
                name="i-material-symbols-light:close"
                class="text-gray-500 font-bold w-6 h-6 cursor-pointer"
                @click="close()"
              />
          </div>
          
          <div class="space-y-4">
            <UInput
              size="lg"
              variant="outline"
              placeholder="Search products..."
              class="w-full sm:max-w-md"
              readonly
              :ui="{ base: ' w-full bg-transparent text-black rounded-full cursor-pointer' }"
              @click.prevent="navigateTo('/search')"
              @keydown.enter.prevent="navigateTo('/search')"
            />
            <UTextarea
              v-model="form.description"
              size="lg"
              placeholder="Description"
              rows="3"
              class="w-full rounded px-3 py-2"
            />

            <div class="grid grid-cols-2 gap-3">
              <div>
                <label class="block text-xs text-gray-500 mb-1">Name</label>
                  <UInput
                    v-model="form.name"
                    variant="outline"
                    type="text"
                    class="w-full rounded px-3 py-2"
                  />
              </div>
              <div>
                <label class="block text-xs text-gray-500 mb-1">Price (₦)</label>
                  <UInput
                    v-model.number="form.price"
                    variant="outline"
                    type="number"
                    min="0"
                    class="w-full rounded px-3 py-2"
                  />
              </div>
              <div>
                <label class="block text-xs text-gray-500 mb-1">Quantity</label>
                  <UInput
                    v-model.number="form.qty"
                    variant="outline"
                    type="number"
                    min="0"
                    class="w-full rounded px-3 py-2"
                  />
              </div>
            </div>

            <div>
              <label class="block text-xs text-gray-500 mb-1">
                Images
              </label>
              <UInput
                type="file"
                multiple
                @change="onFiles"
                :ui="{ base: 'cursor-pointer' }"
              />
              <div class="mt-2 flex gap-2 flex-wrap">
                <img  
                  v-for="(img, i) in form.images"  
                  :src="img" 
                  :key="i"
                  alt="Product on display" 
                  class="w-16 h-16 object-cover border"
                  >
              </div>
            </div>
          </div>

          <div class="mt-6 flex justify-end gap-2">
            <UButton
              type="button"
              class="px-4 py-2 bg-red-600 rounded border"
              @click="close()"
              >
              Cancel
            </UButton>

            <UButton
              color="primary"
              type="button"
              class="px-4 py-2 rounded border bg-green-600 text-white"
              @click="save()"
              >
              {{ editing ? 'Save' : 'Create' }}
            </UButton>
          </div>
        </div>
     </div>
  </div>




</template>

<script setup>
import { ref, toRaw } from "vue";
const query = ref('')
const showAdd = ref(false)
const editing = ref(false)
const editingId = ref(null)

// A mock reactive array of products
const products = ref([
  // {
  //   id: 'P-1001',
  //   name: 'MCU Bread',
  //   price: '1100100', // String to be removed later on
  //   qty: '10',
  //   active: true
  // }
])

const form = reactive({
  name: '',
  description: '',
  price: 0,
  qty: 0,
  images: []
})

const filtered = computed(() => {
  const search = query.value.trim().toLowerCase()
  return products.value.filter(product => !search || product.name.toLowerCase().includes(search) || product.id.toLowerCase().includes(search))
})


// A file input handler function for the images in the modal
function onFiles(event) {
  const files = Array.from(event.target.files || [])
  form.images = files.map(f => URL.createObjectURL(f))
}

// Function for closing or exiting the Modal
function close() {
  showAdd.value = false
  editing.value = false
  Object.assign(
    form, 
    { 
      name: '',
      description: '',
      price: 0,
      qty: 0,
      images: []
  })
}


// Function for saving a product
function save() {
  if(!form.name || form.price < 0) return
  if(editing.value) {
    const index = products.value.findIndex(product => product.id === editingId.value)
    if(index > -1) products.value[index] = { 
                                          ...products.value[index],
                                          ...toRaw(form)
                                          }
          } else {
            products.value.unshift({
              id: `P-${Date.now()}`,
              ...toRaw(form)
            })
          }
  close()
}

// Function for editing a product
function edit(product){
  editing.value = true
  editingId.value = product.id
  Object.assign(form, JSON.parse(JSON.stringify(product)))
  showAdd.value = true
}

// Function for deleting a product
function remove(id) {
  products.value = products.value.filter(product => product.id !== id)
}

</script>


