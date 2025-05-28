<template>
  <section class="px-6 font-manrope">
    <header class="mt-5 py-3 mb-3 text-center text-lg">
      <h1 class="font-bold text-gray-800 uppercase tracking-wide">
        My details
      </h1>
    </header>

    <!-- Name -->
    <ProfilePart
      text="Name"
      subtext="Peter Okodugha"
      :edit="true"
      iconName="i-material-symbols-light-person-outline"
    />
    <!-- Phone Number -->
    <ProfilePart
      text="Phone Number"
      :edit="true"
      subtext="08112985079"
      iconName="i-material-symbols-call"
    />
    <!-- Username -->
    <ProfilePart
      text="Username"
      :edit="true"
      subtext="peter10056"
      iconName="i-material-symbols-light-alternate-email"
    />

    <!-- Email -->
    <ProfilePart
      text="Email"
      :edit="true"
      subtext="okodughapeter85@gmail"
      iconName="i-material-symbols-light-mail-outline"
    />
    <!-- Gender -->
    <ProfilePart
      text="Male"
      subtext="Male"
      iconName="i-material-symbols-supervisor-account-outline"
    />
    <!-- Birthday -->
    <ProfilePart
      text="Birthday"
      subtext="March 22"
      iconName="i-material-symbols-light-cake"
      :edit="true"
    />
  </section>
</template>
