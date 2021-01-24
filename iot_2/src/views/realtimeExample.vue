<template>
  <div class="home">
    <v-container fluid>
      <v-row justify="center">
        <v-col cols="2">
          <v-btn color="success" @click="save">save</v-btn>
          <v-btn color="success" @click="read">read</v-btn>
          <v-btn color="success" @click="readOnce">readOnce</v-btn>
          <v-btn color="success" @click="listenrsData">listenrsData</v-btn>
          <v-btn color="success" @click="updateTitle">updateTitle</v-btn>
          <v-text-field
            v-model="title"
            label="label"
            hide-details
          ></v-text-field>
        </v-col>
        <v-col cols="12">
          <h1>
            {{ site.menu }} <br />
            {{ site.title }} <br />
            {{ site.fotter }}
          </h1>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "Home",
  data() {
    return {
      site: {
        menu: [],
        title: "타이틀입니다.",
        fotter: "푸터입니다. ",
      },
      title: "",
    };
  },

  mounted() {
    // console.log(this.$firebase);
  },
  methods: {
    async save() {
      // 데이터 쓰기
      try {
        await this.$firebase
          .database()
          .ref()
          .child("abcd")
          .set({
            title: "abcd",
            text: "ttt",
          });
      } catch (error) {
        // 에러 처리
        console.error(error.message);
      } finally {
        console.log("save 실행");
      }
    },
    read() {
      // 값이 바뀔떄마다 실시간으로 값을 받아옴
      this.$firebase
        .database()
        .ref()
        .child("abcd")
        .on("value", (sn) => {
          console.log(sn);
          console.log(sn.val());
        });
    },
    async readOnce() {
      // 한번만 값을 받아옴
      const r = await this.$firebase
        .database()
        .ref()
        .child("abcd")
        .once("value");

      console.log(r.val());
    },
    listenrsData() {
      this.$firebase
        .database()
        .ref()
        .child("site")
        .on(
          "value",
          (sn) => {
            const v = sn.val();
            if (!v) {
              this.$firebase
                .database()
                .ref()
                .child("site")
                .set(this.site);
            }
            this.site = v;
          },
          (e) => {
            console.log(e.message);
          }
        );
    },
    updateTitle() {
      this.$firebase
        .database()
        .ref()
        .child("site")
        .update({
          title: this.title,
        });
    },
  },
};
</script>
