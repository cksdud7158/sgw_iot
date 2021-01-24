<template>
  <v-app id="inspire">
    <v-system-bar app>
      <v-spacer></v-spacer>
    </v-system-bar>
    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-spacer></v-spacer>
      <v-toolbar-title @click="goHome" id="toolbarIcon" class="mt-1"
        ><img src="@/assets/img/1.png" @click="goHome" :style="{ width: '30%' }"
      /></v-toolbar-title>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" fixed temporary>
      <menuBar />
    </v-navigation-drawer>

    <router-view />
  </v-app>
</template>

<style scoped src="@/assets/css/remove_css.css"></style>
<script src="@/assets/js/app.js"></script>
<style scoped src="@/assets/css/app.css"></style>
