<template>
  <v-card class="mx-auto" max-width="300" tile>
    <v-list rounded>
      <v-subheader>Menu</v-subheader>
      <v-list-item-group v-model="selectedItem" color="primary">
        <v-list-item v-for="(item, i) in items" :key="i" :to="item.to">
          <v-list-item-icon>
            <v-icon v-text="item.icon"></v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title v-text="item.page"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    selectedItem: 1,
    items: [
      { page: "모니터링", icon: "mdi-monitor", to: "/" },
      { page: "시간 제어", icon: "mdi-timer", to: "/timer" },
      { page: "제어", icon: "mdi-controller-classic", to: "/controller" },
    ],
  }),
};
</script>
