<template>
  <v-card class="mx-auto" max-width="300" tile>
    <v-list disabled>
      <v-subheader>REPORTS</v-subheader>
      <v-list-item-group v-model="selectedItem" color="primary">
        <v-list-item v-for="(item, i) in items" :key="i">
          <v-list-item-icon>
            <v-icon v-text="item.icon"></v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title v-text="item.text"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-card>
</template>

<style scoped src="@/assets/css/remove_css.css"></style>
<script src="@/assets/js/home.js"></script>
<style scoped src="@/assets/css/home.css"></style>
