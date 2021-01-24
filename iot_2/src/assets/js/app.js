import menuBar from "@/components/menuBar.vue";
import sign from "@/components/sign.vue";

export default {
  data: () => ({
    drawer: null,
  }),
  components: { menuBar, sign },
  methods: {
    goHome() {
      this.$router.push("/");
    },
  },
};
