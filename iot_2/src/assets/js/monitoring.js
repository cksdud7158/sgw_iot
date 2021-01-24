import XLSX from "xlsx";

export default {
  data() {
    return {
      liveData: {},
      items: {},
    };
  },
  mounted() {
    this.read();
    this.get();
  },
  methods: {
    read() {
      // 값이 바뀔떄마다 실시간으로 값을 받아옴
      this.$firebase
        .database()
        .ref("sensor")
        .on("value", (sn) => {
          console.log(sn);
          console.log(sn.val());
          this.liveData = sn.val();
        });
    },
    onexport() {
      // On Click Excel download button

      // export json to Worksheet of Excel
      // only array possible
      var items = XLSX.utils.json_to_sheet(this.items);

      // A workbook is the name given to an Excel file
      var wb = XLSX.utils.book_new(); // make Workbook of Excel

      // add Worksheet to Workbook
      // Workbook contains one or more worksheets
      XLSX.utils.book_append_sheet(wb, items, "items"); // sheetAName is name of Worksheet

      // export Excel file
      XLSX.writeFile(wb, "data.xlsx"); // name of the file is 'book.xlsx'
    },
    async get() {
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
          time: item.time,
          cds: item.cds,
          dust: item.dust,
          humidity: item.humidity,
          temp: item.temp,
        };
      });
    },
  },
};
