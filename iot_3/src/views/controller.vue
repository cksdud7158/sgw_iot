<template>
  <v-main>
    <v-row :style="{ height: '100%' }">
      <v-col align-self="center">
        <div id="first">
          <v-card>
            <v-card-text>
              <v-color-picker v-model="color" />
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions class="mt-3 pa-3">
              <v-spacer></v-spacer
              ><v-btn outlined @click="updateData">설정하기</v-btn>
            </v-card-actions>
          </v-card>
        </div>
      </v-col>
    </v-row>
  </v-main>
</template>

<style scoped src="@/assets/css/remove_css.css"></style>
<script src="@/assets/js/controller.js"></script>
<style scoped src="@/assets/css/controller.css"></style>
