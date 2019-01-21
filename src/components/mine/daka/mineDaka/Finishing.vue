<template>
  <div class="right-content-center">
    <div class="left-con">
      <div class="top-con"></div>
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
    <div class="right-con">
      <ul>
        <li v-for="finishing in finishingList">
          <div class="record">
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
  </div>
</template>
<script>
import pageHelper from "@/components/pageHelper";
export default {
  components: {
    pageHelper
  },
  data() {
    return {
      //用于记录该用户搜索到的正在打卡的记录
      count: "1",
      title: "1",
      passed: "1",
      completed: "1",
      rest: "1",
      finishingList: null
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
  computed: {},
  methods: {
    getPassed(startDate, timeInterval) {
      if ((new Date() - startDate.time) / (1000 * 60 * 60 * timeInterval) < 0) {
        return 0;
      } else {
        return parseInt(
          (new Date() - startDate.time) / (1000 * 60 * 60 * timeInterval)
        ); //丢弃小数部分,保留整数部分
      }
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
.right-content-center .left-con .bottom-con{
  width: 100%px;
  height: 100px;
  /* border: 1px solid black; */
  margin-top: 30px;
}
.right-content-center .left-con .bottom-con .go-left{
  margin-top: 15px;
  float: left;
  width: 40px;
  height: 80px;
  background: url('http://s.stu.126.net/res/images/index/indexSlideArrow.png') no-repeat;
  background-position:  0 0;
}
.right-content-center .left-con .bottom-con .go-left:hover{
  cursor: pointer;
  background-position:  0 -95px;
}
.right-content-center .left-con .bottom-con .go-right{
  margin-top: 15px;
  float: right;
  width: 40px;
  height: 80px;
  background: url('http://s.stu.126.net/res/images/index/indexSlideArrow.png') no-repeat;
  background-position:  -66px 0;
}
.right-content-center .left-con .bottom-con .go-right:hover{
  background-position:  -66px -95px;
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
</style>
