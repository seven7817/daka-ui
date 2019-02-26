<template>
  <div class="right-content-center">
    <div class="left-con">
      <div class="left-cont" v-if="showDetail">
        <div class="top-con">
          <div class="title">{{title}}</div>
          <div class="applyDate">申请时间:{{getApplyDate}}</div>
          <div class="blank"></div>
          <div class="blank"></div>
          <div class="dakaType">打卡类型:{{dakaType}}</div>
          <div class="startDate">开始时间:{{getStartDate}}</div>
          <div class="blank"></div>
          <div class="blank"></div>
          <div class="moneyVeryTime">每次金额:{{moneyVeryTime}}</div>
          <div class="timeInterval">时间间隔:{{timeInterval}}</div>
          <div class="blank"></div>
          <div class="blank"></div>
          <div class="times">总的次数:{{times}}</div>
        </div>
        <div class="bottom-con">
          <div class="go-left"></div>
          <div class="bottom-center-con">
            <div class="task"></div>
            <div class="task"></div>
            <div class="task"></div>
            <div class="task"></div>
            <div class="task"></div>
          </div>
          <div class="go-right"></div>
        </div>
      </div>
    </div>
    <div class="right-con">
      <ul>
        <li v-for="finishing in finishingList">
          <div class="record" @click="showDetail=true,showTop(finishing),showDetailCalendar(finishing)">
            <div class="title">{{finishing.title}}</div>
            <div class="bottom">
              <div class="passed">已进行{{getPassed(finishing.startDate,finishing.timeInterval)}}次</div>
              <div class="completed">已打卡{{finishing.completionTimes}}次</div>
              <div
                class="rest"
              >还剩{{finishing.times-getPassed(finishing.startDate,finishing.timeInterval)}}次</div>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div class="calendar-container">
      <myCalendar :dakaTasks='dakaTasks'></myCalendar>
    </div>
  </div>
</template>
<script>
import pageHelper from "@/components/pageHelper";
import myCalendar from "@/components/Calendar";
export default {
  components: {
    pageHelper,
    myCalendar,
  },
  data() {
    return {
      finishingList: null,
      showDetail: false,
      applyDate: "",
      dakaType: "",
      moneyVeryTime: "",
      startDate: "",
      timeInterval: "",
      times: "",
      title: "",
      dakaTasks:null,
      dateOfCalendarNedd:null,
    };
  },
  created() {
    this.$axios
      .post("/apis/daka/getFinishing/", {
        Email: sessionStorage.getItem("seesionEmail")
      })
      .then(response => {
        console.log(response.data[0].code);
        console.log(response.data[0]);
        this.finishingList = response.data[0].data;
      });
  },
  computed: {
    getApplyDate() {
      this.applyDate = this.applyDate.replace("上午", "a ");
      this.applyDate = this.applyDate.replace("下午", "p ");
      return this.applyDate;
    },
    getStartDate() {
      this.startDate = this.startDate.replace("上午", "a ");
      this.startDate = this.startDate.replace("下午", "p ");
      return this.startDate;
    }
  },
  methods: {
    getPassed(startDate, timeInterval) {
      if ((new Date() - startDate.time) / (1000 * 60 * 60 * timeInterval) < 0) {
        return 0;
      } else {
        return parseInt(
          (new Date() - startDate.time) / (1000 * 60 * 60 * timeInterval)
        ); //丢弃小数部分,保留整数部分
      }
    },
    showTop(finishing) {
      var date = new Date();
      date.setTime(finishing.applyDate.time);

      this.applyDate = date.toLocaleString();
      if (finishing.dakaType == "0") {
        this.dakaType = "自主监督";
      } else if (finishing.dakaType == "1") {
        this.dakaType = "系统监督";
      } else if (finishing.dakaType == "2") {
        this.dakaType = "指代监督";
      }
      this.moneyVeryTime = finishing.moneyVeryTime + "元";
      date.setTime(finishing.startDate.time);
      this.startDate = date.toLocaleString();
      this.timeInterval = finishing.timeInterval + "小时";
      this.times = finishing.times + "次";
      this.title = finishing.title;
    },
    showDetailCalendar(finishing) {
      
      this.$axios
      .post("/apis/daka/getDakaTasksByDakaId/", {
        dakaId: finishing.id
      })
      .then(response => {
        console.log(response.data[0].code);
        console.log(response.data[0]);
        this.dakaTasks = response.data[0].data;
      });
      

    }
  }
};
</script>

<style scoped>
.right-content-center {
  width: 880px;
  height: 450px;
  border: 1px solid #ddd;
  margin: 10px auto;
  position: relative;
}
.right-content-center .left-con {
  float: left;
  width: 600px;
  height: 450px;
  border: 1px solid #ddd;
  background-image: url("http://img03.tooopen.com/uploadfile/downs/images/20110714/sy_20110714135215645030.jpg");
  background-size: 100% 105%;
  opacity: 0.7;
  /* cursor: not-allowed */
}
.right-content-center .left-con .top-con {
  width: 500px;
  height: 300px;
  border: 1px solid #000;
  margin: auto;
  margin-top: 20px;
}

.right-content-center .left-con .left-cont .top-con .applyDate,
.right-content-center .left-con .left-cont .top-con .dakaType,
.right-content-center .left-con .left-cont .top-con .moneyVeryTime,
.right-content-center .left-con .left-cont .top-con .startDate,
.right-content-center .left-con .left-cont .top-con .timeInterval,
.right-content-center .left-con .left-cont .top-con .times,
.right-content-center .left-con .left-cont .top-con .blank {
  width: 248px;
  height: 30px;
  float: left;
  border: 1px solid rgba(2, 2, 2, 0.247);
  line-height: 30px;
}
.right-content-center .left-con .left-cont .top-con .title {
  width: 100%;
  height: 40px;
  /* border: 1px solid black; */
  margin: auto;
  text-align: center;
  font-size: 16px;
  font-weight: bold;
  line-height: 40px;
  color: #000;
  margin-bottom: 50px;
}
.right-content-center .left-con .bottom-con {
  width: 100%px;
  height: 100px;
  /* border: 1px solid black; */
  margin-top: 30px;
}
.right-content-center .left-con .bottom-con .go-left {
  margin-top: 15px;
  float: left;
  width: 40px;
  height: 72px;
  background: url("http://s.stu.126.net/res/images/index/indexSlideArrow.png")
    no-repeat;
  background-position: 0 0;
}
.right-content-center .left-con .bottom-con .go-left:hover {
  cursor: pointer;
  background-position: 0 -95px;
}
.right-content-center .left-con .bottom-con .go-right {
  margin-top: 15px;
  float: right;
  width: 40px;
  height: 72px;
  background: url("http://s.stu.126.net/res/images/index/indexSlideArrow.png")
    no-repeat;
  background-position: -66px 0;
}
.right-content-center .left-con .bottom-con .go-right:hover {
  background-position: -66px -95px;
  cursor: pointer;
}
.right-content-center .left-con .bottom-center-con {
  width: 520px;
  height: 100px;
  /* border: 1px solid #000; */
  margin: auto;
  float: left;
}
.right-content-center .left-con .bottom-center-con .task {
  width: 90px;
  height: 90px;
  border: 1px solid black;
  float: left;
  margin: 5px 6px;
}
.right-content-center .left-con .bottom-center-con .task:hover {
  margin: 0px;
  width: 100px;
  height: 100px;
  cursor: pointer;
}
.right-content-center .right-con {
  overflow: scroll;
  overflow-x: hidden;
  float: right;
  width: 265px;
  height: 450px;
  border: 1px solid #ddd;
}
.right-content-center .right-con .record {
  width: 256px;
  height: 120px;
  border: 1px solid #ddd;
  margin-bottom: 10px;
  cursor: pointer;
}
.right-content-center .right-con .record .title {
  width: 250px;
  height: 70px;
  /* border: 1px solid black; */
  margin: auto;
  font-size: 17px;
  font-weight: bold;
}
.right-content-center .right-con .record .bottom {
  width: 256px;
  height: 40px;
  /* border: 1px solid black; */
  margin: auto;
  margin-top: 10px;
  position: relative;
  background-color: rgb(223, 223, 223);
}
.right-content-center .right-con .record .bottom .passed,
.right-content-center .right-con .record .bottom .completed,
.right-content-center .right-con .record .bottom .rest {
  width: 70px;
  height: 40px;
  /* border: 1px solid black; */
  margin: auto;
  font-size: 13px;
  color: rgb(135, 136, 158);
  line-height: 40px;
  text-align: center;
}
.right-content-center .right-con .record .bottom .passed {
  position: absolute;
  left: 0;
}
.right-content-center .right-con .record .bottom .completed {
  position: absolute;
  left: calc(50% - 32.5px);
}
.right-content-center .right-con .record .bottom .rest {
  position: absolute;
  right: 0;
}

.right-content-center .calendar-container {
  width: 230px;
  height: 265px;
  /* background-color: aqua; */
  position: absolute;
  left: -260px;
  top: 130px;
}
</style>
