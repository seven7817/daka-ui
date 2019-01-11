<template>
  <div class="daka-con">
    <div class="daka-cont">
      <div class="head-con"></div>
      <div class="title-con"></div>
      <div class="start-date-con"></div>
      <div class="time-interval-con"></div>
      <div @click="sendMsg()">打什么主题的卡，，，什么时候开始，，，时间间隔，，打卡多少次，，，每次打卡押金</div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {
    sendMsg() {
      alert("fasf");
      window.setInterval(() => {
        setTimeout(this.sendMsgAllTheTime(), 0);
      }, 10000);
    },
    sendMsgAllTheTime() {
      this.$axios.post("/apis/daka/sendMsg/", {}).then(response => {
        console.log(response.data[0].code);
        console.log(response.data[0]);
        alert(response.data[0].msg);
      });
    }
  }
};
</script>

<style>
.daka-con {
  position: absolute;
  height: 100%;
  width: 890px;
  border: 1px solid #000;
  /* z-index: 100; */
  background-color: #ffffff;
}
.daka-con .daka-cont {
  position: absolute;
  top: 25px;
  height: 90%;
  width: 804px;
  border: 1px solid #ddd;
  left: 445px;
  margin-left: -402px;
}
</style>

