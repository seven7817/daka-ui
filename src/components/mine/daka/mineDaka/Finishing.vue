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
      </div>
      <div class="taskDetail" v-if="isShowTaskDetail">
        <div class="close">
          <div class="showClose" @click="isShowTaskDetail=false">X</div>
        </div>
        <div class="title-con">{{finishing.title}}</div>
        <div class="time-range-con">{{timeRange}}</div>
        <div class="uploadImg-con">
          <div class="imgs-con">
            <img
              v-for="url in imgURLList"
              :src="url"
              onerror="this.style.display='none'"
              style="width: 100px;height: 85px;margin-right:20px;"
            >
          </div>
          <div class="upload-buton-con">
            <div>最多只能上传5张图片</div>
            <div>
              <input
                type="file"
                multiple="true"
                accept="image/*"
                @change="tirggerFile($event)"
                :disabled="!canSubmit"
              >
            </div>
            <div>已上传: {{uploadTips}}</div>
          </div>
        </div>
        <div class="summary">
          <textarea
            rows="3"
            cols="20"
            placeholder="小结(不超过200字)"
            maxlength="200"
            v-model="summaryStr"
            :disabled="!canSubmit"
          ></textarea>
          <div class="showNum-con">
            <div class="showNum">{{summaryStr.length}}/200</div>
          </div>
        </div>
        <div class="response-con">{{responseStr}}</div>
        <div class="submit-con">
          <div class="submit" :class="{canSubmit : !canSubmit}" @click="submitTask()">提 交</div>
        </div>
      </div>
    </div>
    <div class="right-con">
      <ul>
        <li v-for="finishing in finishingList">
          <div class="record" @click="showDetail=true,showTop(finishing),isShowTaskDetail=false">
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
      <myCalendar
        :finishing="finishing"
        :isUpdateCalendar="isUpdateCalendar"
        @showTaskDetail="showTaskDetail1"
      ></myCalendar>
      <div class="tips-con">
        <ul>
          <li class="li1">
            <div class="color1"></div>
            <div>正在审核</div>
          </li>
          <li class="li2">
            <div class="color2"></div>
            <div>未打卡或者失败</div>
          </li>
          <li class="li3">
            <div class="color3"></div>
            <div>今天</div>
          </li>
          <li class="li4">
            <div class="color4"></div>
            <div>打卡完成</div>
          </li>
          <li class="li5">
            <div class="color5"></div>
            <div>待完成</div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import pageHelper from "@/components/pageHelper";
import myCalendar from "@/components/Calendar";
export default {
  components: {
    pageHelper,
    myCalendar
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
      dakaTasks: null,
      dateOfCalendarNedd: null,
      finishing: null,
      isShowTaskDetail: false,
      timeRange: "",
      imgURLList: null,
      qiniuToken: "",
      summaryStr: "", //总结
      canSubmit: null,
      filesList: null,
      filesAddress: [], //用于存储在七牛云上的地址
      responseStr: "", //用于存储回复
      choosedCycle: "", // 用户要提交的打卡任务的周期
      uploadNum: 0, //用于显示上传的进度
      uploadTips: "", //上传具体提示
      isUpdateCalendar: false //再提交完成之后让日历更新一下状态
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
    //获取七牛云要的token先，因为，不先获取，会出现还没有获取token就先用token去上传文件的问题
    this.$axios.post("/apis/daka/getSimpleToken/", {}).then(response => {
      console.log(response.data[0]);
      this.qiniuToken = response.data[0].data;
      console.log("qiniu1: " + this.qiniuToken);
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
    submitTask() {
      this.$axios
        .post("/apis/daka/saveDakaTaskInfo/", {
          filesAddress: this.filesAddress,
          summary: this.summaryStr,
          cycle: this.choosedCycle,
          dakaId: this.finishing.id
        })
        .then(response => {
          console.log(response);
          if (response.data[0].code == 0) {
            alert("提交成功");
            this.isShowTaskDetail = false;
            this.isUpdateCalendar = !this.isUpdateCalendar;
          } else {
            alert("提交失败，请稍后尝试");
          }
        });
    },
    uploadImgToqiniu(file, i, len) {
      var formData = new FormData();
      formData.append("file", file);
      // console.log('qiniu2: '+this.qiniuToken)
      formData.append("token", this.qiniuToken); //在后台获取到7牛的token
      var url = "";
      let url1 = "http://pnu2yhiik.bkt.clouddn.com"; //自己公司，每个公司不一样
      //这个上传地址应该是华南区特有

      this.$axios
        .post("https://upload-z2.qiniup.com", formData, {
          header: { "Content-Type": "multipart/form-data" }
        })
        .then(res => {
          if (res.status == 200) {
            // console.log(res) ;
            // console.log(res.data) ;
            // console.log(res.data.key) ; //返回的key跟自己公司的url拼接
            // console.log(url1+'/'+res.data.key)
            // console.log('url'+url)
            this.filesAddress[i] = url1 + "/" + res.data.key;
            this.uploadNum = this.uploadNum + 1;
            this.uploadTips = this.uploadNum + "/" + len;
          } else {
            alert("上传失败");
          }
        });
    },
    tirggerFile(event) {
      this.uploadNum = 0;
      var files = event.target.files;
      this.filesList = event.target.files;
      // console.log(files);
      var imgFile = null;
      var url = null;
      var imgURLlist = [];
      if (files.length > 0) {
        if (files.length > 5) {
          for (var i = 0; i < 5; i++) {
            if (window.createObjectURL != undefined) {
              // basic
              url = window.createObjectURL(files[i]);
            } else if (window.URL != undefined) {
              // mozilla(firefox)
              url = window.URL.createObjectURL(files[i]);
            } else if (window.webkitURL != undefined) {
              // webkit or chrome
              url = window.webkitURL.createObjectURL(files[i]);
            }
            imgURLlist[i] = url;
          }
        } else {
          for (var i = 0; i < files.length; i++) {
            if (window.createObjectURL != undefined) {
              // basic
              url = window.createObjectURL(files[i]);
            } else if (window.URL != undefined) {
              // mozilla(firefox)
              url = window.URL.createObjectURL(files[i]);
            } else if (window.webkitURL != undefined) {
              // webkit or chrome
              url = window.webkitURL.createObjectURL(files[i]);
            }
            imgURLlist[i] = url;
          }
        }

        var len = this.filesList.length > 5 ? 5 : this.filesList.length;
        //上传图片
        for (var i = 0; i < len; i++) {
          this.uploadImgToqiniu(this.filesList[i], i, len);
        }
      }
      this.imgURLList = imgURLlist;
    },
    showTaskDetail1(curYear, curMonth, n) {
      // console.log(curYear);
      // console.log(curMonth);
      // console.log(n);
      this.isShowTaskDetail = true;
      var date = new Date();
      //今天的周期
      var todayCycle = Math.ceil(
        (date.getTime() - this.finishing.startDate.time) /
          (this.finishing.timeInterval * 60 * 60 * 1000)
      );
      date.setFullYear(curYear, curMonth, n);
      date.setHours(0);
      date.setMinutes(0);
      date.setSeconds(0);
      //选择日期的周期
      var cycle = Math.ceil(
        (date.getTime() - this.finishing.startDate.time) /
          (this.finishing.timeInterval * 60 * 60 * 1000)
      );
      this.choosedCycle = cycle;

      var date1 = new Date(
        this.finishing.startDate.time +
          this.finishing.timeInterval * (cycle - 1) * 60 * 60 * 1000
      );
      var date2 = new Date(
        this.finishing.startDate.time +
          this.finishing.timeInterval * cycle * 60 * 60 * 1000
      );
      //去服务器查询需要的打卡任务信息
      this.$axios
        .post("/apis/daka/getDakaTaskInfo/", {
          cycle: this.choosedCycle,
          dakaId: this.finishing.id
        })
        .then(response => {
          // console.log(response);
          // console.log(response.data[0].data);
          if (response.data[0].data == null) {
            this.canSubmit = true;
            this.imgURLList = null;
            this.responseStr = "";
            this.summaryStr = "";
          } else {
            // console.log(11111);
            this.canSubmit = false;
            var list = new Array();
            list[0] = response.data[0].data.img1;
            list[1] = response.data[0].data.img2;
            list[2] = response.data[0].data.img3;
            list[3] = response.data[0].data.img4;
            list[4] = response.data[0].data.img5;
            this.imgURLList = list;
            this.response = response.data[0].data.response;
            this.summaryStr = response.data[0].data.summary;
            this.responseStr = response.data[0].data.response;
          }
          this.timeRange =
            date1.toLocaleString() +
            "~" +
            date2.toLocaleString() +
            "  第" +
            this.choosedCycle +
            "次";

          //如果选择的周期小于今天的周期，就应该不能让用户修改打卡信息
          if (cycle < todayCycle) {
            // console.log(22222);
            // console.log(cycle);
            // console.log(todayCycle);
            this.canSubmit = false;
          }
        });
    },
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
      this.finishing = finishing;
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
  background-size: 100% 105%;
  /* opacity: 0.7; */
  /* cursor: not-allowed */
  position: relative;
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
.right-content-center .left-con .taskDetail {
  position: absolute;
  width: 600px;
  height: 450px;
  background-color: #fff;
  left: 0;
  top: 0;
}
.right-content-center .left-con .taskDetail .close {
  width: 100%;
  height: 30px;
  /* border: 1px solid black; */
}
.right-content-center .left-con .taskDetail .showClose {
  height: 30px;
  width: 30px;
  float: right;
  text-align: center;
  line-height: 30px;
  cursor: pointer;
}
.right-content-center .left-con .taskDetail .title-con {
  width: 100%;
  height: 40px;
  text-align: center;
  font-size: 16px;
  font-weight: bold;
  line-height: 40px;
}
.right-content-center .left-con .taskDetail .time-range-con {
  width: 100%;
  height: 30px;
  text-align: center;
  font-size: 12px;
  font-weight: bold;
  line-height: 30px;
}
.right-content-center .left-con .taskDetail .uploadImg-con {
  width: 100%;
  height: 120px;
  /* border: 1px solid black; */
}
.right-content-center .left-con .taskDetail .imgs-con {
  width: 100%;
  height: 85px;
  border: 1px solid #bbb;
  border-left: none;
  border-right: none;
}
.right-content-center .left-con .taskDetail .upload-buton-con div {
  float: left;
  width: 200px;
  height: 35px;
  line-height: 35px;
  text-align: center;
  color: red;
  font-size: 12px;
}
.right-content-center .left-con .taskDetail .summary {
  margin-top: 10px;
  width: 600px;
  height: 100px;
}
.right-content-center .left-con .taskDetail .summary .showNum-con {
  width: 600px;
  height: 20px;
}
.right-content-center .left-con .taskDetail .summary textarea {
  width: 600px;
  height: 80px;
}
.right-content-center .left-con .taskDetail .summary .showNum {
  font-size: 10px;
  float: right;
}
.right-content-center .left-con .taskDetail .response-con {
  margin-top: 10px;
  width: 600px;
  height: 50px;
  box-sizing: border-box;
  border: 1px solid black;
}
.right-content-center .left-con .taskDetail .submit-con {
  position: relative;
  margin-top: 20px;
  width: 600px;
  height: 30px;
  /* border: 1px solid black; */
}
.right-content-center .left-con .taskDetail .submit {
  position: absolute;
  width: 120px;
  height: 30px;
  /* border: 1px solid black; */
  text-align: center;
  line-height: 30px;
  left: 50%;
  margin-left: -60px;
  cursor: pointer;
  background-color: #10ae58;
}
.right-content-center .left-con .taskDetail .submit {
  position: absolute;
  width: 120px;
  height: 30px;
  /* border: 1px solid black; */
  text-align: center;
  line-height: 30px;
  left: 50%;
  margin-left: -60px;
  cursor: pointer;
  background-color: #10ae58;
}
.right-content-center .left-con .taskDetail .submit.canSubmit {
  background-color: darkgray;
  cursor: not-allowed;
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
  height: 305px;
  /* background-color: aqua; */
  position: absolute;
  left: -260px;
  top: 130px;
}
.right-content-center .calendar-container .tips-con {
  width: 220px;
  height: 60px;
  margin-left: 8px;
}
.right-content-center .calendar-container .tips-con li {
  float: left;
  width: 110px;
  height: 20px;
}
.right-content-center .calendar-container .tips-con li div {
  font-size: 10px;
  display: inline-block;
}
.right-content-center .calendar-container .tips-con li .color1 {
  width: 10px;
  height: 10px;
  background-color: darkgray;
}
.right-content-center .calendar-container .tips-con li .color2 {
  width: 10px;
  height: 10px;
  background-color: firebrick;
}
.right-content-center .calendar-container .tips-con li .color3 {
  width: 10px;
  height: 10px;
  background-color: aqua;
}
.right-content-center .calendar-container .tips-con li .color4 {
  width: 10px;
  height: 10px;
  background-color: chartreuse;
}
.right-content-center .calendar-container .tips-con li .color5 {
  width: 10px;
  height: 10px;
  background-color: gold;
}
</style>
