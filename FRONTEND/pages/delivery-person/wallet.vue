<template>
    <div class="max-w-4xl mx-auto pt-10 px-6">
        <header>
            <h1 class="text-2xl font-bold text-gray-900 mb-6">Your Wallet</h1>
        </header>   
        <!-- Balance Overview -->
        <section class="bg-gradient-to-r from-orange-200 to-primary text-white p-6 rounded-xl shadow-lg mb-6">
            <div class="text-center">
                <h2 class="text-lg font-medium mb-2">Available Balance</h2>
                <strong class="text-3xl mb-2">₦{{ (wallet.balance || '0.00').toLocaleString('en-NG', { minimuFractionDigits: 2 })}}</strong>
                <div class="flex justify-between py-2 px-3">
                    <p class="text-gray-600">Data updated {{ lastUpdate }} second<span v-if="lastUpdate !== 1">s</span> ago</p>
                    <UIcon
                        name='i-material-symbols-light:sync'
                        class="text-gray-600 w-7 h-7 cursor-pointer hover:rotate-180 transition-transform duration-500"
                        @click="refreshTime"
                    />
                </div>
            </div>
        </section>

        <!-- Action Buttons -->
        <div class="bg-white shadow-md rounded-lg p-6 mb-6">
            <div class="text-lg font-bold text-gray-900 mb-4">Quick Actions</div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <!-- Withdraw Button -->
                <button class="bg-green-500 hover:bg-green-600 text-white p-4 rounded-lg transition-colors">
                    <div class="flex flex-col items-center justiy-center h-full">
                        <UIcon
                        name='i-material-symbols-account-balance-wallet'
                        class="w-8 h-8 mb-2"
                    />
                    <span class="font-medium">Withdraw</span>
                    </div>
                </button>
                <!-- Send Button -->
                <button class="bg-blue-500 hover:bg-blue-600 text-white p-4 rounded-lg transition-colors">
                    <div class="flex flex-col items-center justiy-center h-full">
                        <UIcon
                        name='i-material-symbols-send'
                        class="w-8 h-8 mb-2"
                    />
                    <span class="font-medium">Send</span>
                    </div>
                </button>

                <!-- Receive Button -->
                <button class="bg-purple-500 hover:bg-purple-600 text-white p-4 rounded-lg transition-colors">
                    <div class="flex flex-col items-center justiy-center h-full">
                        <UIcon
                        name='i-material-symbols-receipt'
                        class="w-8 h-8 mb-2"
                    />
                    <span class="font-medium">Receive</span>
                    </div>
                </button>
            </div>
        </div>

        <section ref="historySection" class="bg-gray-50 font-manrope shadow-md rounded-lg p-6 mb-6">
            <div class="flex flex-wrap items-center justify-between gap-3 mb-4">
                <h3 class="text-lg font-bold text-gray-900">Transaction History</h3>
                <input 
                    v-model="searchQuery" 
                    type="text" 
                    placeholder="Search by ID"
                    class="border rounded px-3 py-2 text-sm w-full md:w-64"
                    >
            </div>
            <div class="flex gap-2 mb-4">
                <button
                    v-for="f in filters"
                    :key="f.value"
                    @click="activeFilter = f.value"
                    :class="[
                        'px-3 py-1.5 rounded text-sm border', 
                            activeFilter === f.value ? 'bg-primary text-white'
                                                     : 'bg-white text-gray-700 border-gray-300'
                    ]"
                >
                    {{  f.label }}
                </button>
            </div>
            <div v-if="fliteredTxs.length" class="divide-y">
                <div v-for="tx in fliteredTxs" class="py-3 flex items-start justify-between">
                    <div class="flex items-center gap-3">
                        <UIcon :name="tx.icon" class="w-8 h-8"
                               :class="tx.amount > 0 ? 'text-green-600' : 'text-red-600'" 
                        />
                        <div>
                            <p class="font-medium text-gray-900">{{ tx.title }} • #{{ tx.id }}</p>
                            <p class="text-xs text-gray-500"> {{  tx.date }} • {{ tx.status }}</p>
                        </div>
                    </div>
                    <div class="text-right">
                        <p
                            :class="[
                                'font-semibold', tx.amount > 0 ? 'text-green-600' : 'text-red-600'
                            ]"
                        >
                            {{ tx.amount > 0 ? '+' : '-' }}₦{{ Math.abs(tx.amount).toLocaleString('en-NG') }}
                        </p>
                    </div>
                </div>
            </div>
            <!-- V-else to be included later on -->
            <p class="text-sm text-center text-gray-500">No other transactions found.</p>
        </section>

    </div>
</template>

<script setup>
import { onBeforeMount, onMounted } from 'vue';

const wallet = ref({
    balance: 0,
    pending: 0,
    totalEarnings: 0
})

const lastUpdate = ref(0)
let timer = null
const startTimer = () => {
    clearInterval(timer)
    lastUpdate.value = 0
    timer = setInterval(() => {
        lastUpdate.value++
    }, 1000)
}


const refreshTime = () => {
    startTimer()
}

const filters = [
    { label: 'All', value: 'all'},
    { label: 'Incoming', value: 'incoming'},
    { label: 'Outgoing', value: 'outgoing'},
    { label: 'Withdrawals', value: 'withdrawal'}
]

const activeFilter = ref('all')
const searchQuery = ref('')
const historySection = ref(null)

// Dummy txs
const transactions = ref([
    {
        id: 'TX-123', 
        title: 'Delivery payout', 
        date: '2025-08-15 14:22', 
        amount: 6500, 
        status: 'Completed', 
        type: 'incoming', 
        icon: 'i-material-symbols-payments'
    },

    {
        id: 'TX-1234', 
        title: 'Withdrawal', 
        date: '2025-08-15 15:02', 
        amount: -20000, 
        status: 'Processing', 
        type: 'withdrawal', 
        icon: 'i-material-symbols-light-account-balance'
    },

    {
        id: 'TX-12345', 
        title: 'Transfer', 
        date: '2025-08-15 10:12', 
        amount: -3500, 
        status: 'Completed', 
        type: 'outgoing', 
        icon: 'i-material-symbols-send'
    }
])


const fliteredTxs = computed(() => {
    const query = searchQuery.value.trim().toLowerCase()
    return transactions.value
        .filter(tx => activeFilter.value === 'all' ? true : tx.type === activeFilter.value)
        .filter(tx => !query || tx.id.toLowerCase().includes(query) || tx.titletoLowerCase().includes(query))
})


onMounted(() => {
    wallet.value = {
        balance: 25000,
        pending: 500,
        totalEarnings: 1000000
    }
    
    startTimer()
})

onBeforeMount(() => {
    clearInterval(timer)
})
</script>