<template>
  <v-main>
    <v-row
      no-gutters
      justify="center"
      align="center"
      :style="{ height: '100%' }"
    >
      <v-col cols="10">
        <v-card class="pa-2">
          <v-card-text primary-title class="text-center text-h5 pa-4 ">
            백색등 온오프 시간 설정
          </v-card-text>
          <v-divider class="mb-3"></v-divider>
          <v-card-text class="mb-2">
            <v-row justify="space-around" align="center">
              <p>시작 시간</p>
              <vue-timepicker
                v-model="start"
                :minute-interval="5"
              ></vue-timepicker>
            </v-row>
          </v-card-text>
          <v-card-text class="my-4">
            <v-row justify="space-around" align="center">
              <p>종료 시간</p>
              <vue-timepicker
                v-model="end"
                :minute-interval="5"
              ></vue-timepicker>
            </v-row>
          </v-card-text>
          <v-card-actions justify="right" class="mb-2">
            <v-btn @click="test">test</v-btn>
            <v-spacer></v-spacer>
            <v-btn @click="saveLightTime">설정하기</v-btn>
          </v-card-actions>
          <v-divider> </v-divider>
          <v-card-actions class="mt-2">
            <v-spacer></v-spacer>
            <span class="mr-2">온오프 버튼 : </span>
            <v-switch
              v-model="lightOnOff"
              color="indigo"
              hide-details
              @click="saveLightOnOff"
            ></v-switch>
          </v-card-actions>
        </v-card>
        <v-card class="pa-2 mt-3">
          <v-card-text primary-title class="text-center text-h5 pa-4 ">
            미스팅 시스템
          </v-card-text>
          <v-divider class="mb-3"></v-divider>
          <v-card-text class="mb-2">
            <v-row justify="space-around" align="center">
              <p>작동 시간</p>
              <vue-timepicker v-model="onTime"></vue-timepicker>
            </v-row>
          </v-card-text>
          <v-card-text class="my-4">
            <v-row justify="space-around" align="center">
              <p>꺼짐 시간</p>
              <vue-timepicker v-model="offTime"></vue-timepicker>
            </v-row>
          </v-card-text>
          <v-card-actions class="mt-2">
            <v-spacer></v-spacer>
            <span class="mr-2">온오프 버튼 : </span>
            <v-switch
              v-model="socket2"
              color="indigo"
              hide-details
              @click="saveSocket2OnOff"
            ></v-switch>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-main>
</template>

<style scoped src="@/assets/css/remove_css.css"></style>
<script src="@/assets/js/timer.js"></script>
<style scoped src="@/assets/css/timer.css"></style>
