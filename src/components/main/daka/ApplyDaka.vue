<template>
  <div class="daka-con">
    <div class="daka-cont">
      <div class="head-con">
        <div class="head-left">打卡申请</div>
        <div class="cancel" @click="setApplyDakaFlag()">X</div>
      </div>
      <div class="daka-type-con">
        <div class="daka-type-tips">打卡类型：</div>
        <div class="daka-type-cont">
          <select v-model="dakaType">
            <option value="0">自主监督</option>
            <option value="1">系统监督</option>
            <option value="2">指代监督 (推荐)</option>
          </select>
        </div>
      </div>
      <div class="title-con">
        <div class="title-tips">您的标题：</div>
        <div class="title-cont">
          <input type="text" placeholder="请叙述清楚" v-model="title">
        </div>
      </div>
      <div class="start-date-con">
        <div class="start-date-tips">开始日期：</div>
        <div class="start-date-cont">
          <input type="datetime-local" v-model="startDate">
        </div>
      </div>
      <div class="time-interval-con">
        <div class="time-interval-tips">时间间隔：</div>
        <div class="time-interval-cont">
          <select v-model="timeInterval">
            <option value="24">一天</option>
            <option value="48">两天</option>
            <option value="72">三天</option>
            <option value="96">四天</option>
            <option value="120">五天</option>
            <option value="144">六天</option>
            <option value="168">七天</option>
          </select>
        </div>
      </div>
      <div class="times-con">
        <div class="times-tips">打卡次数：</div>
        <div class="times-cont">
          <input
            type="number"
            name="points"
            min="1"
            max="100"
            placeholder="(输入1-100的整数)"
            v-model="times"
          >
        </div>
      </div>
      <div class="money-very-time-con">
        <div class="money-very-time-tips">打卡金额：</div>
        <div class="money-very-time-cont">
          <input
            type="number"
            name="points"
            min="1"
            max="100"
            placeholder="按次计算(输入1-100的整数)"
            v-model="moneyVeryTime"
          >
        </div>
      </div>
      <div class="money-total-con">
        <div class="money-total-tips">总计金额：</div>
        <div class="money-total-cont">{{totolMoney}}</div>
      </div>
      <div class="submit" @click="submit()">提交并付款</div>
      <div>{{dakaType}} {{title}} {{startDate}} {{timeInterval}} {{times}} {{moneyVeryTime}}</div>
    </div>
    <scanCode v-if="showScanCodeFlag" @saveDakaInfo="saveDakaInfo"></scanCode>
  </div>
</template>
<script>
import { mapState, mapGetters, mapActions } from "vuex";
import scanCode from "./ScanCode";
export default {
  components: {
    scanCode
  },
  data() {
    return {
      dakaType: "",
      title: "",
      startDate: "",
      timeInterval: "",
      times: "",
      moneyVeryTime: ""
    };
  },
  computed: {
    ...mapGetters(["showScanCodeFlag"]),
    totolMoney() {
      return this.times * this.moneyVeryTime + "元";
    }
  },
  methods: {
    ...mapActions(["setApplyDakaFlag", "setScanCodeFlag"]),
    submit() {
      if (
        this.dakaType == "" ||
        this.title == "" ||
        this.startDate == "" ||
        this.timeInterval == "" ||
        this.times == "" ||
        this.moneyVeryTime == ""
      ) {
        alert("请输入正确的信息");
      } else {
        this.setScanCodeFlag();
        sessionStorage.setItem("totalMoney", this.totolMoney);
      }
    },
    saveDakaInfo() {
      console.log("正在保存信息并调回首页");

      this.$axios
        .post("/apis/daka/saveDakaInfo/", {
          Email: sessionStorage.getItem('seesionEmail'),
          dakaType: this.dakaType,
          title: this.title,
          startDate: this.startDate,
          timeInterval: this.timeInterval,
          times: this.times,
          moneyVeryTime: this.moneyVeryTime
        })
        .then(response => {
          console.log(response.data[0].code),
          console.log(response.data[0]),
          this.dakaType = "",
          this.title = "",
          this.startDate = "",
          this.timeInterval = "",
          this.times = "",
          this.moneyVeryTime = "",
          this.setApplyDakaFlag()
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
.daka-con .head-con {
  height: 40px;
  width: 804px;
  /* border: 1px solid black; */
  margin: auto;
}
.daka-con .head-con .head-left {
  float: left;
  height: 40px;
  width: 200px;
  /* border: 1px solid black; */
  line-height: 40px;
  font-weight: bold;
  /* text-align: center; */
  font-size: 20px;
}
.daka-con .head-con .cancel {
  float: right;
  height: 40px;
  width: 30px;
  /* border: 1px solid black; */
  line-height: 40px;
  font-weight: bold;
  text-align: center;
  font-size: 20px;
  cursor: pointer;
}
.daka-con .daka-type-con,
.daka-con .money-total-con,
.daka-con .money-very-time-con,
.daka-con .times-con,
.daka-con .time-interval-con,
.daka-con .start-date-con,
.daka-con .title-con {
  height: 30px;
  width: 500px;
  /* border: 1px solid black; */
  margin: auto;
  margin-top: 20px;
  position: relative;
}
.daka-con .submit {
  border-radius: 15px;
  height: 30px;
  width: 100px;
  /* border: 1px solid black; */
  margin: auto;
  margin-top: 6px;
  position: relative;
  line-height: 30px;
  text-align: center;
  background-color: #28a745;
  color: #fff;
  font-weight: bold;
  cursor: pointer;
}
.daka-con .daka-type-con .daka-type-tips,
.daka-con .money-total-con .money-total-tips,
.daka-con .money-very-time-con .money-very-time-tips,
.daka-con .times-con .times-tips,
.daka-con .time-interval-con .time-interval-tips,
.daka-con .start-date-con .start-date-tips,
.daka-con .title-con .title-tips {
  position: absolute;
  float: left;
  height: 30px;
  width: 80px;
  /* border: 1px solid black; */
  line-height: 30px;
  left: 250px;
  margin-left: -80px;
}
.daka-con .daka-type-con .daka-type-cont,
.daka-con .money-total-con .money-total-cont,
.daka-con .money-very-time-con .money-very-time-cont,
.daka-con .times-con .times-cont,
.daka-con .time-interval-con .time-interval-cont,
.daka-con .start-date-con .start-date-cont,
.daka-con .title-con .title-cont {
  position: absolute;
  float: left;
  height: 30px;
  width: 180px;
  /* border: 1px solid black; */
  line-height: 30px;
  left: 250px;
}
.daka-con .money-very-time-con .money-very-time-cont input,
.daka-con .times-con .times-cont input,
.daka-con .start-date-con .start-date-cont input,
.daka-con .title-con .title-cont input {
  /* position: absolute;
  float: left; */
  height: 30px;
  width: 180px;
  /* border: 1px solid black; */
  line-height: 30px;
  left: 250px;
}
.daka-con .daka-type-con .daka-type-cont select,
.daka-con .time-interval-con .time-interval-cont select {
  height: 34px;
  width: 184px;
  /* border: 1px solid black; */
  line-height: 30px;
  left: 250px;
}
</style>

