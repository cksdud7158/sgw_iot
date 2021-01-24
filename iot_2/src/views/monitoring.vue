<template>
  <v-main>
    <v-container>
      <v-row no-gutters justify="center" class="pt-4">
        <v-col cols="8">
          <v-card class="mx-auto my-4 pa-4">
            <v-card-title class="text-h6">
              <v-icon>mdi-thermometer</v-icon> 온도</v-card-title
            >
            <v-card-text class="text-right pr-4 text-h4">
              <h1>{{ liveData.temp }} ℃</h1>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <v-row no-gutters justify="center">
        <v-col cols="8">
          <v-card class="mx-auto my-4 pa-4">
            <v-card-title class="text-h6"
              ><v-icon>mdi-water-percent</v-icon> 습도</v-card-title
            >
            <v-card-text class="text-right pr-4 text-h4">
              <h1>{{ liveData.humidity }}%</h1>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <v-row no-gutters justify="center">
        <v-col cols="8">
          <v-card class="mx-auto my-4 pa-4">
            <v-card-title class="text-h6"
              ><v-icon>mdi-face-mask</v-icon> 미세먼지 농도</v-card-title
            >
            <v-card-text class="text-right pr-4 text-h4">
              <h1>{{ liveData.dust }}㎍/㎥</h1>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <v-row no-gutters justify="center">
        <v-col cols="8">
          <v-card class="mx-auto my-4 pa-4">
            <v-card-title class="text-h6"
              ><v-icon>mdi-lightbulb-outline</v-icon> 조도</v-card-title
            >
            <v-card-text class="text-right pr-4 text-h4">
              <h1>{{ liveData.cds }}lx</h1>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <v-row>
      <v-col id="test">
        <v-btn dark @click="onexport">Excel download</v-btn>
      </v-col>
    </v-row>
  </v-main>
</template>

<style scoped src="@/assets/css/remove_css.css"></style>
<script src="@/assets/js/monitoring.js"></script>
<style scoped src="@/assets/css/monitoring.css"></style>
