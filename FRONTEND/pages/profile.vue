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
                            <h1 class="text-xl font-bold text-gray-800">My details</h1>
                        </div>
                    </div>
                </div>
            </header>
        
        
        
        <!-- Name -->
           <div
            class="flex items-center justify-between py-2 px-6 border-b border-gray-200 bg-white font-manrope text-md mt-3"
            >
                <div class="flex items-center">
                <UIcon
                    name="i-material-symbols-light-person-outline"
                    class="text-primary text-xl w-7 h-7 mr-4 self-center"
                />
                 <div class="flex flex-col justify-center">
                    <span class="text-sm text-gray-600">Name</span>
                    <p class="text-black font-bold">Peter Okodugha</p>
                </div>
                
                </div>

                <div
                class="flex items-center p-1 cursor-pointer"
                >
                <UIcon
                    name="i-material-symbols-edit-sharp"
                    class="text-gray-600 text-xl"
                />
                </div>
            </div>
            <!-- Phone Number -->
            <div
            class="flex items-center justify-between py-2 px-6 border-b border-gray-200 bg-white font-manrope text-md mt-3"
            >
                <div class="flex items-center">
                <UIcon
                    name="i-material-symbols-call"
                    class="text-primary text-xl w-7 h-7 mr-4"
                 />
                 <div class="flex flex-col justify-center">
                    <span class="text-sm text-gray-600">Phone Number</span>
                    <p class="text-black font-bold">08112985079</p>
                </div>
                
                </div>
            </div>
            <!-- Username -->
            <div
                class="flex items-center justify-between py-2 px-6 border-b border-gray-200 bg-white font-manrope text-md mt-3"
            >
                <div class="flex items-center">
                <UIcon
                    name="i-material-symbols-light-alternate-email"
                    class="text-primary text-xl w-7 h-7 mr-4"
                />
                <div class="flex flex-col justify-center">
                    <span class="text-sm text-gray-600">Username</span>
                   <p class="text-black font-bold">peter10056</p>
                </div>
                
                </div>

               <UIcon
                    name="i-material-symbols-edit-sharp"
                    class="text-gray-600 text-xl"
                />
               
            </div>
            
            <!-- Email -->
            <div
            class="flex items-center justify-between py-2 px-6 border-b border-gray-200 bg-white font-manrope text-md mt-3"
            >
                <div class="flex items-center">
                 <UIcon name="i-material-symbols-light-mail-outline" class="text-primary w-7 h-7 mr-4" />
                  <div class="flex flex-col justify-center">
                    <span class="text-sm text-gray-600">Birthday</span>
                    <p class="text-black font-bold">okodughapeter85@gmail.com</p>
                </div>   
                
                </div>
                <UIcon
                    name="i-material-symbols-arrow-right"
                    class="text-gray-600 text-xl w-7 h-7"
                />
                
            </div>
            <!-- Gender -->
            <div
            class="flex items-center justify-between py-2 px-6 border-b border-gray-200 bg-white font-manrope text-md mt-3"
            >
                <div class="flex items-center">
                <UIcon
                    name="i-material-symbols-supervisor-account-outline"
                    class="text-primary w-7 h-7 text-xl mr-4"
                />
                <div class="flex flex-col justify-center">
                    <span class="text-sm text-gray-600">Gender</span>
                    <p class="text-black font-bold">Male</p>
                </div>
                </div>

            </div>

            <!-- Birthday -->
            <div
                class="flex items-center justify-between py-2 px-6 border-b border-gray-200 bg-white font-manrope text-md mt-3"
            >
                <div class="flex items-center">
                <UIcon
                    name="i-material-symbols-light-cake"
                    class="text-primary w-7 h-7 text-xl mr-4"
                />
                <div class="flex flex-col justify-center">
                    <span class="text-sm text-gray-600">Birthday</span>
                    <p class="text-black font-bold">March, 22</p>
                </div>
                
                </div>

                <UIcon
                    name="i-material-symbols-edit-sharp"
                    class="text-gray-600 text-xl"
                    />
                
            </div>

    </section>
</template>
