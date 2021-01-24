<template>
  <v-main id="dark">
    <v-container>
      <v-row no-gutters justify="center" class="pt-4">
        <v-col cols="8">
          <v-card class="mx-auto my-4 pa-4">
            <v-btn color="success" @click="test">시작</v-btn>
            <v-btn color="success" @click="stop">중지</v-btn>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>
<script>
export default {
  data() {
    return {
      timerId: "",
    };
  },
  methods: {
    test() {
      var a = 1;
      console.log(typeof a);
      if (a === 1) {
        console.log("true");
      }
    },
    test1() {
      console.log("test11111");
    },
    stop() {
      if (this.timerId != null) {
        clearTimeout(this.timerId);
      }
    },
  },
};
</script>
