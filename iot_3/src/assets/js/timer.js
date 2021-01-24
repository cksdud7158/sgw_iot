// https://phoenixwong.github.io/vue2-timepicker/
import VueTimepicker from "vue2-timepicker/src/vue-timepicker.vue";

export default {
  data() {
    return {
      start: {
        HH: "10",
        mm: "05",
        ss: "00",
      },
      end: {
        HH: "10",
        mm: "05",
        ss: "00",
      },
      onTime: {
        HH: "10",
        mm: "05",
        ss: "00",
      },
      offTime: {
        HH: "10",
        mm: "05",
        ss: "00",
      },
      lightOnOff: "",
      socket2: true,
      socketStatus: "",
    };
  },
  mounted() {
    this.readFirst();
  },
  components: { VueTimepicker },
  methods: {
    async saveLightTime() {
      //백색등 설정하기 버튼
      try {
        await this.$firebase
          .database()
          .ref("timer")
          .child("light")
          .update({
            start: this.start.HH + this.start.mm,
            end: this.end.HH + this.end.mm,
          });
      } catch (error) {
        // 에러 처리
        console.error(error.message);
      } finally {
        console.log("save 실행");
      }
    },
    async saveLightOnOff() {
      // 백색등 온오프 버튼
      let temp = 1;
      if (this.lightOnOff == true) {
        temp = 1;
      } else {
        temp = 0;
      }
      await this.$firebase
        .database()
        .ref("socket")
        .update({
          socket_1: temp,
        });
    },
    async readOnce() {
      //사용 안함
      // 한번만 값을 받아옴
      const r = await this.$firebase
        .database()
        .ref("timer")
        .child("light")
        .once("value");

      console.log(r.val().end);
    },

    async readFirst() {
      // 처음 값 받아옴
      //백색등 온오프 상태 받기
      const r = await this.$firebase
        .database()
        .ref("socket")
        .on("value", (sn) => {
          this.lightOnOff = sn.val().socket_1;
          this.socket2 = sn.val().socket_2;
        });
      r;

      // 백색등 온오프 시간 받기
      const j = await this.$firebase
        .database()
        .ref("timer")
        .child("light")
        .once("value");
      this.end.HH = j.val().end.split("")[0] + j.val().end.split("")[1];
      this.end.mm = j.val().end.split("")[2] + j.val().end.split("")[3];
      this.start.HH = j.val().start.split("")[0] + j.val().start.split("")[1];
      this.start.mm = j.val().start.split("")[2] + j.val().start.split("")[3];
      this.socketStatus = j.val().status;

      // 소켓2 온오프 시간 받기
      const x = await this.$firebase
        .database()
        .ref("timer")
        .child("onOff")
        .once("value");

      let temp13 = x.val().onTime + "";
      let temp14 = x.val().offTime + "";
      this.onTime.HH = temp13.split("")[0] + temp13.split("")[1];
      this.onTime.mm = temp13.split("")[2] + temp13.split("")[3];
      this.offTime.HH = temp14.split("")[0] + temp14.split("")[1];
      this.offTime.mm = temp14.split("")[2] + temp14.split("")[3];
    },

    async saveOnOff() {
      //소켓2 설정하기 버튼(사용안함)
      await this.$firebase
        .database()
        .ref("timer")
        .child("onOff")
        .update({
          onTime: this.onTime.HH + this.onTime.mm,
          offTime: this.offTime.HH + this.offTime.mm,
        });
    },

    async saveSocket2OnOff() {
      // 소켓2 온오프 버튼
      let temp = 1;
      if (this.socket2 == true) {
        temp = 1;
        this.socketStatus = 1;
      } else {
        temp = 0;
        this.socketStatus = 0;
      }
      await this.$firebase
        .database()
        .ref("socket")
        .update({
          socket_2: temp,
        });

      await this.$firebase
        .database()
        .ref("timer")
        .child("onOff")
        .update({
          onTime: this.onTime.HH + this.onTime.mm,
          offTime: this.offTime.HH + this.offTime.mm,
          status: this.socketStatus,
        });
    },

    test() {
      console.log("test Works!");
      this.test1();
    },

    test1() {
      setTimeout(function() {
        console.log("test1 Works!");
      }, 1000);
      this.test2();
    },
    test2() {
      setTimeout(function() {
        console.log("test2 Works!");
      }, 1000);
      this.test1();
    },
  },
};
