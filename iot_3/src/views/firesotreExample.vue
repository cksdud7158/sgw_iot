<template>
  <v-card>
    <v-card-title primary-title>
      title
    </v-card-title>
    <v-card-actions>
      <v-btn color="success" @click="openDialog"
        ><v-icon>mdi-pencil</v-icon></v-btn
      >
      <v-btn @click="read"><v-icon>mdi-pencil</v-icon></v-btn>
    </v-card-actions>
    <v-dialog
      v-model="dialog"
      scrollable
      persistent
      :overlay="false"
      max-width="500px"
      transition="dialog-transition"
    >
      <v-card>
        <v-form>
          <v-card-text>
            <v-text-field v-model="form.title"></v-text-field>
            <v-text-field v-model="form.content"></v-text-field>
          </v-card-text>
          <v-card-actions>
            <v-btn @click="add">save</v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      items: [],
      dialog: false,
      form: {
        title: "",
        content: "",
      },
      unsubscribe: null,
    };
  },
  destroyed() {
    if (this.unsubscribe) this.unsubscribe();
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
    subscribed() {
      this.unsubscribe = this.$firebase
        .firestore()
        .collection("boards")
        .onSnapshot((sn) => {
          if (sn.empty) {
            this.items = [];
            return;
          }
          this.items = sn.docs.map((v) => {
            const item = v.data();
            return {
              id: v.id,
              title: item.title,
              content: item.content,
            };
          });
        });
    },
  },
};
</script>
