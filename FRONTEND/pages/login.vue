<template>
  <section>
    <h1>Welcome</h1>
    <p>Continue with one of the following options</p>

    <div>
      <div>
        <label for="code">Prefix</label>
        <UInput
          aria-disabled="true"
          aria-placeholder="+234"
          name="code"
          placeholder="+234"
          disabled
        />
      </div>
      <div>
        <label for="number">Phone number</label>
        <UInput placeholder="Phone number" />
      </div>
    </div>

    <div>
      <p>
        This site is protected by reCAPTCHA and the Google Privacy Policy and
        Terms of Service apply
      </p>
    </div>
    <div>
      <div>WhatsApp</div>
      <div>SMS</div>
    </div>
    <div>
      <p>or with</p>
      <div>Google</div>
      <div>Facebook</div>
      <div>Email</div>
    </div>
  </section>
</template>
