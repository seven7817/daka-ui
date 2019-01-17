<template>
  <div class="main-cont-left">
    <div class="msg">
      <div class="responseNum">100</div>
      <div class="msg-cont">
        <div class="msgTitle">标题</div>
        <div class="msgTime-con">
          <div class="msgTime">时间</div>
        </div>
      </div>
      <!-- <vue-qr text="Hello world!" :callback="test" qid="testid"></vue-qr> -->
    </div>
  </div>
</template>
<script>
import { mapState, mapGetters, mapActions } from "vuex";
import VueQr from "vue-qr";

export default {
  components: { VueQr },

  data() {
    return {
      clock:null
    };
  },
  computed: {
    ...mapGetters(["showApplyDakaFlag"])
  },
  methods: {
    ...mapActions(["setLoginFlag", "setSelect3"]),
  }
};
</script>
<style>
.qrcode {
  height: 500px;
  width: 500px;
  border: 1px solid black;
}
.main-cont-left {
  float: left;
  height: 100%;
  width: 890px;
  border: 1px solid #000;
}
.main-cont-left .msg {
  width: 100%;
  height: 60px;
  border: 1px solid black;
}
.main-cont-left .msg .responseNum {
  float: left;
  width: 50px;
  height: 30px;
  margin-right: 20px;
  border: 1px solid #ddd;
  font-size: 12px;
  color: #333;
  line-height: 30px;
  text-align: center;
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
}
.main-cont-left .msg .msg-cont {
  float: right;
  width: 800px;
  height: 100%;
  /* border: 1px solid black; */
}
.main-cont-left .msg .msgTitle {
  float: right;
  width: 100%;
  height: 60%;
  /* border: 1px solid black; */
}
.main-cont-left .msg .msgTime-con {
  float: right;
  width: 100%;
  height: 40%;
}
.main-cont-left .msg .msgTime-con .msgTime {
  float: right;
  height: 100%;
  width: 165px;
}
</style>


