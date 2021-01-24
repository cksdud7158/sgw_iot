const functions = require("firebase-functions");

var admin = require("firebase-admin");

var serviceAccount = require("./key.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://iotserver3.firebaseio.com",
});
const db = admin.database();
const fdb = admin.firestore();

let sensor = {
  cds: 0,
  dust: 0,
  humidity: 0,
  temp: 0,
};

// 30분마다 센서값 저장
exports.scheduledFunctionReadData = functions
  .region("asia-northeast3")
  .pubsub.schedule("every 30 minutes")
  .onRun(async () => {
    var d = new Date();
    var n = d.toLocaleString();
    const r = await db.ref("sensor").once("value", (sn) => {
      sensor = sn.val();
      sensor.time = n;
      console.log("sensor.cds:::" + sensor.time);
      fdb.collection("boards").add(sensor);
    });
  });

// 1년에 한번씩 데이터 삭제
exports.scheduledFunctionDeleteData = functions
  .region("asia-northeast3")
  .pubsub.schedule("1 of jan 00:00")
  .onRun(async () => {
    let items = {};
    const sn = await fdb.collection("boards").get();
    items = sn.docs.map((v) => {
      const item = v.data();
      return {
        id: v.id,
      };
    });
    for (let item in items) {
      fdb
        .collection("boards")
        .doc(items[item].id)
        .delete();
    }
  });

//5분마다  백색등 설정 시간 받아와서 키고 끄기
exports.CheckTimerStatus = functions
  .region("asia-northeast3")
  .pubsub.schedule("every 5 minutes synchronized")
  .onRun(async () => {
    var d = new Date() + "";
    let nowTime = d.split(" ")[4].split(":")[0] + d.split(" ")[4].split(":")[1];
    // 백색등 시간 받아오기
    const r = await db
      .ref("timer")
      .child("light")
      .once("value");
    let start = parseInt(r.val().start);
    let end = parseInt(r.val().end);

    const sn = await db.ref("socket").once("value");

    if (sn.val().socket_1 === 1) {
      if (start <= nowTime && end >= nowTime) {
        db.ref("socket").update({
          socket_1: 1,
        });
      } else {
        db.ref("socket").update({
          socket_1: 0,
        });
      }
    }
  });

// 소켓2 온오프 및 작동 시간
exports.testRun = functions
  .region("asia-northeast3")
  .database.ref("/socket/socket_2")
  .onUpdate(async () => {
    // 소켓 상태 받아오기
    const sn = await db.ref("socket").once("value");
    var socket_2 = sn.val().socket_2;

    const xx = await db
      .ref("timer")
      .child("onOff")
      .once("value");
    var onTime = xx.val().onTime;
    var offTime = xx.val().offTime;
    var onSeconds =
      parseInt(onTime.split("")[0] + onTime.split("")[1]) * 1000 * 60 * 60 +
      parseInt(onTime.split("")[2] + onTime.split("")[3]) * 1000 * 60;
    var offSeconds =
      parseInt(offTime.split("")[0] + offTime.split("")[1]) * 1000 * 60 * 60 +
      parseInt(offTime.split("")[2] + offTime.split("")[3]) * 1000 * 60;
    var status = xx.val().status;
    // 소켓 상태 판별하여 test 함수 실행
    if (socket_2 === 1 && status === 1) {
      test(onSeconds);
    } else if (socket_2 === 0 && status === 1) {
      test2(offSeconds);
    }
    return null;
  });

async function test(onSeconds) {
  console.log("소켓 2 상태 1");
  setTimeout(async () => {
    await db.ref("socket").update({
      socket_2: 0,
    });
  }, onSeconds);
}
async function test2(offSeconds) {
  console.log("소켓 2 상태 2");
  setTimeout(() => {
    db.ref("socket").update({
      socket_2: 1,
    });
  }, offSeconds);
}
