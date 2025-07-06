<script setup>
import PendingOrders from "~/components/dashboard/project/PendingOrders.vue";
const route = useRoute();

const layoutClassic = route.path.includes("horizontal");
</script>
<template>
  <div class="project-dashboard ma-n1">
    <div :class="`project-dashboard__background-${layoutClassic ? 'horizontal' : 'classic'}`" />
  </div>

  <v-container fluid>
    <GlobalsHeader title="Orders" is-btn btn-color="success" btn-text="Taking Orders" />

    <div class="pb-5">
      <v-row>
        <v-col lg="4" cols="12">
          <pending-orders />
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<style scoped lang="scss">
.project-dashboard-background {
  background: rgba(var(--v-theme-primary));
  padding-bottom: 8.5rem;
  padding-top: 3rem;
  position: absolute;
  top: 0;
}

.project-dashboard {
  position: relative;
  &__background-classic {
    @extend .project-dashboard-background;
    width: 100%;
    left: 0px;
  }

  &__background-horizontal {
    @extend .project-dashboard-background;
    width: 200%;
    transform: translate(-20%);
  }
}
</style>
