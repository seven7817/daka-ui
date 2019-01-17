<template>
  <div>
    <div class="frame-con">
      <div class="head">请扫码支付</div>
      <div class="money">金额 ：{{totalMoney}}</div>
      <div class="Email">用户 ：{{userName}}</div>
      <div class="description">描述 ：用于打卡申请</div>
      <div class="code">
        <vue-qr :text="content" :size="150"></vue-qr>
      </div>
      <div class="tips" v-show="tipsFlag">{{tips}}</div>
      <div class="cancel" @click="setScanCodeFlag()">返回</div>
    </div>
    <div class="marsk" @click="setScanCodeFlag()"></div>
  </div>
</template>
<script>
import { mapState, mapGetters, mapActions } from "vuex";
import VueQr from "vue-qr";
export default {
  components: {
    VueQr
  },
  data() {
    return {
      tips: "√ 支付成功，等待跳转。。。",
      tipsFlag: false,
      clock: null,
      content: ""
    };
  },
  created() {
    this.content =
      "http://47.101.212.238:8080/daka/index?Email=" +
      this.userName +
      "&money=" +
      this.totalMoney +
      "&description=用于打卡申请";
    this.isRecharge();
  },
  computed: {
    totalMoney() {
      return sessionStorage.getItem("totalMoney");
    },
    userName() {
      return sessionStorage.getItem("seesionEmail");
    }
  },
  methods: {
    ...mapActions(["setScanCodeFlag"]),
    isRecharge() {
      this.clock = window.setInterval(() => {
        setTimeout(this.sendMsgAllTheTime(), 0);
      }, 3000);
    },
    sendMsgAllTheTime() {
      console.log("正在验证是否付款");
      this.$axios
        .post("/apis/daka/isRecharge/", {
          Email: this.userName
        })
        .then(response => {
          console.log(response.data[0].code);
          console.log(response.data[0]);
          // alert(response.data[0].msg);
          if (response.data[0].code == "0") {
            window.clearInterval(this.clock);
            this.tipsFlag = true;
            let clock = window.setInterval(() => {
              //隐藏扫码框
              this.setScanCodeFlag();
              //把打卡信息进行保存
              this.$emit("saveDakaInfo");
              window.clearInterval(clock);
            }, 2000);
          }
        });
    },
  }
};
</script>

<style>
.frame-con {
  width: 440px;
  height: 400px;
  border: 1px solid black;
  z-index: 110;
  position: fixed;
  left: 50%;
  margin-left: -220px;
  top: 50%;
  margin-top: -220px;
  background-color: #ffffff;
}
.frame-con .head {
  font-size: 30px;
  margin: auto;
  margin-top: 20px;
  width: 180px;
  height: 40px;
  /* border: 1px solid black; */
  font-weight: bold;
  line-height: 40px;
  text-align: center;
  background-color: #28a745;
  color: #ffffff;
  border-radius: 5px;
  margin-bottom: 10px;
}
.frame-con .tips {
  margin: auto;
  width: 210px;
  height: 30px;
  /* border: 1px solid black; */
  line-height: 30px;
  background-color: #28a745;
  color: #fff;
  border-radius: 5px;
  text-align: center;
}
.frame-con .description,
.frame-con .Email,
.frame-con .money {
  /* margin-top要写margin：auto在后面才生效  ，，现在是没有生效的 */
  margin-top: 10px;
  margin: auto;
  width: 220px;
  height: 30px;
  /* border: 1px solid black; */
  line-height: 30px;
  font-weight: bold;
}
.frame-con .code {
  height: 150px;
  width: 150px;
  /* border: 1px solid black; */
  margin: auto;
}

.frame-con .cancel {
  margin: auto;
  margin-top: 10px;
  width: 100px;
  height: 40px;
  /* border: 1px solid black; */
  font-weight: bold;
  font-size: 20px;
  line-height: 40px;
  text-align: center;
  cursor: pointer;
  border-radius: 5px;
  background-color: #28a745;
  color: #fff;
}
.marsk {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: #000;
  opacity: 0.7;
  z-index: 9;
}
</style>
