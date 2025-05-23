<template>
    <section class="min-h-screen">
        <header class="favourites-header px-6 py-3 z-1000 bg-white sticky top-0 text-md mb-5">
                <div class="flex px-4 py-3 items-center w-full">
                    <UIcon
                    name="i-material-symbols-light-close"
                    class="text-red-600 w-8 h-8 mr-5"
                    />
                    <div >
                        <div class="flex-grow text-center font-manrope">
                            <h1 class="text-xl font-bold text-gray-800">Contact support</h1>
                        </div>
                    </div>
                </div>
            </header>

            <div class="flex flex-col items-center justify-center">
                <div class="mt-3">
                    <Media src="/support.jpg" class="w-40 h-auto" />
                </div>
                <p class=" text-black text-bold text-center">Let us know your issue by selecting any of your preferred choice of communication below</p>
            </div>

            <!-- Name -->
           <div
            class="flex items-center justify-between py-2 px-6 border-b border-gray-200 bg-white font-manrope text-md mt-3"
            >
                <div class="flex items-center">
                <UIcon
                    name="i-material-symbols-light-mail-outline"
                    class="text-primary text-xl w-7 h-7 mr-4 self-center"
                />
                 <div class="flex flex-col justify-center">
                    <span class="text-black font-bold">Email Us</span>
                    <p class="text-gray-600 text-sm">We go reply when you press us 2k</p>
                </div>
                
                </div>

                <div
                class="flex items-center p-1 cursor-pointer"
                >
                <UIcon
                    name="i-material-symbols-arrow-right"
                    class="text-gray-600 text-xl w-7 h-7"
                />
                </div>
            </div>
            <!-- WhatsApp -->
            <div
            class="flex items-center justify-between py-2 px-6 border-b border-gray-200 bg-white font-manrope text-md mt-3"
            >
                <div class="flex items-center">
                <UIcon whatsapp
                    name="i-material-symbols-whatsapp"
                    class="text-primary text-xl w-7 h-7 mr-4"
                 />
                 <div class="flex flex-col justify-center">
                    <span class=" font-bold text-black">Chat on WhatsApp</span>
                    <p class="text-gray-600 text-sm">Reply Asap</p>
                </div>
                </div>
                <UIcon
                    name="i-material-symbols-arrow-right"
                    class="text-gray-600 text-xl w-7 h-7"
                />
            </div>
            <!-- Username -->
            <div
                class="flex items-center justify-between py-2 px-6 border-b border-gray-200 bg-white font-manrope text-md mt-3"
            >
                <div class="flex items-center">
                <UIcon
                    name="i-material-symbols-call"
                    class="text-primary text-xl w-7 h-7 mr-4"
                />
                <div class="flex flex-col justify-center">
                   <span class=" font-bold text-black">Call Us</span>
                    <p class="text-gray-600 text-sm">Business hours everyday</p>
                </div>
                </div>
                <UIcon
                    name="i-material-symbols-arrow-right"
                    class="text-gray-600 text-xl w-7 h-7"
                />
               
            </div>
            
            <!-- Order Problem -->
            <div
            class="flex items-center justify-between py-2 px-6 border-b border-gray-200 bg-white font-manrope text-md mt-3"
            >
                <div class="flex items-center">
                 <UIcon name="i-material-symbols-contact-support-outline" class="text-primary w-7 h-7 mr-4" />
                  <div class="flex flex-col justify-center">
                    <span class=" font-bold text-black">Help with an order</span>
                    <p class="text-gray-600 text-sm">Problem with your order?</p>
                </div>   
                
                </div>
                <UIcon
                    name="i-material-symbols-arrow-right"
                    class="text-gray-600 text-xl w-7 h-7"
                />
                
            </div>
            <!-- Live Chat -->
            <div
            class="flex items-center justify-between py-2 px-6 border-b border-gray-200 bg-white font-manrope text-md mt-3"
            >
                <div class="flex items-center">
                <UIcon
                    name="i-material-symbols-support-agent"
                    class="text-primary w-7 h-7 text-xl mr-4"
                />
                <div class="flex flex-col justify-center">
                    <span class=" font-bold text-black">Live Chat</span>
                    <p class="text-gray-600 text-sm">Chat live with our in-app agents</p>
                </div>
                </div>
                <UIcon
                    name="i-material-symbols-arrow-right"
                    class="text-gray-600 text-xl w-7 h-7"
                />
            </div>
    </section>
</template>
