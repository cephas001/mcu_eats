<script setup>
const menuList = [
  { title: "Action" },
  { title: "Another Action" },
  { title: "Something elese here" },
];

const tableHeader = ["Select", "Order Code", "Order Status", "Updated At"];

const orders = [
  {
    id: 1,
    orderCode: "3323",
    orderStatus: {
      state: "Assigned",
      updatedAt: "18/06/2025 - 5:16",
    },
  },
  {
    id: 2,
    orderCode: "5141",
    orderStatus: {
      state: "Opened",
      updatedAt: "15/06/2025 - 9:29",
    },
  },
];

const resolveStatusVariant = (status) => {
  if (status === 1)
    return {
      color: "success",
      text: "Approved",
    };
  else if (status === 2)
    return {
      color: "warning",
      text: "In Progress",
    };
  else
    return {
      color: "error",
      text: "Pending",
    };
};
</script>

<template>
  <v-card class="h-100">
    <v-card-title class="d-flex align-center justify-space-between">
      <h4 class="text-h4">Pending Orders</h4>
      <v-menu location="bottom">
        <template v-slot:activator="{ props }">
          <v-btn
            v-bind="props"
            class="text-button"
            size="small"
            variant="outlined"
            color="secondary"
          >
            Action <v-icon icon="tabler-chevron-down" />
          </v-btn>
        </template>
        <v-list>
          <v-list-item v-for="(item, i) in menuList" :key="i" :value="item.title">
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-card-title>
    <v-divider />
    <v-table hover>
      <thead>
        <tr>
          <th v-for="item in tableHeader" :key="item">
            {{ item }}
          </th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="order in orders" :key="order.id">
          <td class="w-36">
            <v-checkbox />
          </td>
          <td class="min-w-30">
            {{ order.orderCode }}
          </td>
          <td class="min-w-40">
            {{ order.orderStatus.state }}
          </td>
          <td class="min-w-60">
            {{ order.orderStatus.updatedAt }}
          </td>
        </tr>
      </tbody>
    </v-table>
  </v-card>
</template>
