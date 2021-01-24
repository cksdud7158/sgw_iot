import { Chrome } from "vue-color";

export default {
  components: { Chrome },
  data() {
    return {
      color: {
        r: 16,
        g: 118,
        b: 67,
        a: 1,
      },
    };
  },
  methods: {
    updateData() {
      console.log("update");
      this.$firebase
        .database()
        .ref("RGBB")
        .update({
          blue: this.color.b,
          green: this.color.g,
          red: this.color.r,
          brightness: parseInt(this.color.a * 255),
        });
    },
  },
};
