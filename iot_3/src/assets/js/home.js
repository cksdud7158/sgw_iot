export default {
  data() {
    return {
      selectedItem: "",
      items: [],
      dialog: false,
      form: {
        title: "",
        content: "",
      },
    };
  },
  methods: {
    openDialog() {
      this.dialog = !this.dialog;
    },
    add() {
      this.$firebase
        .firestore()
        .collection("boards")
        .add(this.form);
      this.dialog = !this.dialog;
    },
    update() {
      this.$firebase
        .firestore()
        .collection("boards")
        .doc(this.items[0].id)
        .update(this.form);
      this.dialog = !this.dialog;
    },
    remove() {
      this.$firebase
        .firestore()
        .collection("boards")
        .doc(this.items[0].id)
        .delete();
      this.dialog = !this.dialog;
    },
    async read() {
      const sn = await this.$firebase
        .firestore()
        .collection("boards")
        .get();
      //   sn.docs.forEach((v) => {
      //     console.log(v.id);
      //     console.log(v.data());
      //   });
      this.items = sn.docs.map((v) => {
        const item = v.data();
        return {
          id: v.id,
          title: item.title,
          content: item.content,
        };
      });
      console.log(this.items);
    },
  },
};
