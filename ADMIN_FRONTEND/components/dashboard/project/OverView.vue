<template>
  <div class="project-over-view pb-5">
    <v-row>
      <v-col cols="12" md="6" lg="3">
        <v-card class="card-lift">
          <v-card-item>
            <div class="d-flex justify-space-between align-center">
              <h4 class="text-h4">Pending Orders</h4>
              <div class="soft-bg-primary size-10">
                <v-icon icon="tabler-hourglass-high" size="24" color="primary" />
              </div>
            </div>
            <div class="mt-3 mb-1">
              <h3 class="text-h1">18</h3>
            </div>
          </v-card-item>
        </v-card>
      </v-col>

      <v-col cols="12" md="6" lg="3">
        <v-card class="card-lift">
          <v-card-item>
            <div class="d-flex justify-space-between align-center">
              <h4 class="text-h4">Active Orders</h4>
              <div class="soft-bg-primary size-10">
                <v-icon icon="tabler-truck-delivery" size="24" color="primary" />
              </div>
            </div>
            <div class="mt-3 mb-1">
              <h3 class="text-h1">5</h3>
            </div>
          </v-card-item>
        </v-card>
      </v-col>

      <v-col cols="12" md="6" lg="3">
        <v-card class="card-lift">
          <v-card-item>
            <div class="d-flex justify-space-between align-center">
              <h4 class="text-h4">Completed Orders</h4>
              <div class="soft-bg-primary size-10">
                <v-icon icon="tabler-progress-check" size="24" color="primary" />
              </div>
            </div>
            <div class="mt-3 mb-1">
              <h3 class="text-h1">12</h3>
            </div>
          </v-card-item>
        </v-card>
      </v-col>

      <v-col cols="12" md="6" lg="3">
        <v-card class="card-lift">
          <v-card-item>
            <div class="d-flex justify-space-between align-center">
              <h4 class="text-h4">Productivity</h4>
              <div class="soft-bg-primary size-10">
                <v-icon icon="tabler-target" size="24" color="primary" />
              </div>
            </div>
            <div class="mt-3 mb-1">
              <h3 class="text-h1">76%</h3>
            </div>
          </v-card-item>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>
