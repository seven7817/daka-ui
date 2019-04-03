<template>
  <div class="main-cont-left">
    <div class="top">
      <div class="msg" v-for="dakaInfo in dakaInfoList">
        <div class="responseNum">标题:</div>
        <div class="msg-cont">
          <div class="msgTitle">{{dakaInfo.title}}</div>
          <div class="msgTime-con">
            <div class="msgTime">时间{{modifyDate(dakaInfo.applyDate)}}</div>
            <div
              class="username"
              @mouseenter="showApplyFriendFrame(dakaInfo)"
              @mouseleave="showApplyFrindFrame=false"
            >
              {{dakaInfo.email}}：
              <div
                class="applyFriend"
                v-if="showApplyFrindFrame&&dakaInfo==applyFriendDakaInfo"
                @click="applyFriend()"
              >申请好友</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="bottom">
      <pageHelper :curPage="curpage" :total="totalpageNum" @getPageInfo="getPageInfo"></pageHelper>
    </div>
  </div>
</template>
<script>
import { mapState, mapGetters, mapActions } from "vuex";
import VueQr from "vue-qr";
import pageHelper from "@/components/pageHelper";
export default {
  components: {
    VueQr,
    pageHelper
  },
  data() {
    return {
      clock: null,
      dakaInfoList: "",
      curpage: 0,
      totalpageNum: 0,
      applyFriendDakaInfo: null,
      applyFriendEmail: "",
      showApplyFrindFrame: false
    };
  },
  created() {
    this.$axios.post("/apis/daka/getAllDakaInfo/", {}).then(response => {
      console.log(response.data[0].code);
      console.log(response.data[0]);
      this.dakaInfoList = response.data[0].data[0];
      this.curpage = 1;
      this.totalpageNum = Math.ceil(response.data[0].data[1] / 7);
    });
  },
  computed: {
    ...mapGetters(["showApplyDakaFlag"])
  },
  methods: {
    ...mapActions(["setLoginFlag", "setSelect3"]),
    //分页组件出发事件调用的方法
    getPageInfo(pageNumStr) {
      this.$axios
        .post("/apis/daka/getDakaInfoOfPage/", {
          pageNum: pageNumStr
        })
        .then(response => {
          this.curpage = pageNumStr;
          // console.log(response.data[0].code);
          // console.log(response.data[0]);
          this.dakaInfoList = response.data[0].data;
        });
    },
    modifyDate(date) {
      var d = new Date();
      d.setTime(date.time);
      return d.toLocaleString();
    },
    showApplyFriendFrame(dakaInfo) {
      this.applyFriendDakaInfo = dakaInfo;
      this.showApplyFrindFrame = true;
    },
    applyFriend() {
      if (
        this.applyFriendDakaInfo.email == sessionStorage.getItem("seesionEmail")
      ) {
        alert("不能添加自己为好友");
      } else {
        this.$axios
          .post("/apis/daka/applyFriend/", {
            fromEmail: sessionStorage.getItem("seesionEmail"),
            toEmail: this.applyFriendDakaInfo.email
          })
          .then(response => {
            // console.log(response.data[0].code);
            // console.log(response.data[0]);
            if (response.data[0].code == 0) {
              alert("申请成功，等待确认");
            }
          });
      }
    }
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
  box-sizing: border-box;
}
.main-cont-left .top {
  width: 100%;
  height: 427px;
  /* border: 1px solid black; */
}
.main-cont-left .msg {
  width: 100%;
  height: 60px;
  border: 1px solid #aaa;
  box-sizing: border-box;
  margin-bottom: 1px;
}
.main-cont-left .bottom {
  margin-top: 18px;
  width: 350px;
  height: 30px;
  margin-left: calc(50% - 175px);
}

.main-cont-left .msg .responseNum {
  float: left;
  width: 50px;
  height: 30px;
  margin-right: 10px;
  border: 1px solid #ddd;
  font-size: 12px;
  color: #333;
  line-height: 30px;
  text-align: center;
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
}
.main-cont-left .msg .msg-cont {
  float: right;
  width: 820px;
  height: 100%;
  /* border: 1px solid black; */
}
.main-cont-left .msg .msgTitle {
  float: right;
  width: 100%;
  height: 60%;
  line-height: 36px;
  /* border: 1px solid black; */
}
.main-cont-left .msg .msgTime-con {
  font-size: 12px;
  float: right;
  width: 100%;
  height: 40%;
  color: rgb(128, 121, 121);
}
.main-cont-left .msg .msgTime-con .username {
  float: right;
  height: 100%;
  cursor: pointer;
}
.main-cont-left .msg .msgTime-con .msgTime {
  float: right;
  height: 100%;
  width: 165px;
}
.main-cont-left .msg .msgTime-con .applyFriend {
  position: relative;
  z-index: 100;
  background-color: #eee;
  width: 50px;
  cursor: pointer;
  margin-top: 5px;
}
</style>


