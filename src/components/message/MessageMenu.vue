<template>
  <div class="con">
    <div class="cont" v-for="msg in msgList">
      <div class="title">好友申请</div>
      <div class="info">
        用户
        <div style="text-decoration:underline;display:inline-block">{{msg.fromEmail}}</div>
        于时间 {{modifyDate(msg.applyDate)}} 向您发起好友申请，是否通过?
      </div>
      <div class="deal">
        <div class="agree" v-if="msg.isPassed==0" @click="choose(msg.id,1)">同意</div>
        <div class="reject" v-if="msg.isPassed==0" @click="choose(msg.id,2)">拒绝</div>
        <div class="agreed" v-if="msg.isPassed==1">已同意</div>
        <div class="rejected" v-if="msg.isPassed==2">已拒绝</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      msgList: null
    };
  },
  methods: {
    modifyDate(date) {
      var d = new Date();
      d.setTime(date.time);
      return d.toLocaleString();
    },
    choose(id, num) {
      this.$axios
        .post("/apis/daka/choosePass/", {
          id: id,
          num: num
        })
        .then(response => {
          // console.log(response.data[0]);
          // console.log(response.data[0].code);
          this.getMsgAboutApplyFriend();
        });
    },
    getMsgAboutApplyFriend() {
      this.$axios
        .post("/apis/daka/getMsgAboutApplyFriend/", {
          email: sessionStorage.getItem("seesionEmail")
        })
        .then(response => {
          console.log(response.data[0]);
          console.log(response.data[0].code);
          console.log(response.data[0].data);
          this.msgList = response.data[0].data;
        });
    }
  },
  created() {
    this.getMsgAboutApplyFriend();
  }
};
</script>
<style scoped>
.con {
  width: 1190px;
  height: 530px;
  margin: 0 auto;
  /* border: 1px solid black; */
  background-color: #ffffff;
  box-sizing: border-box;
  overflow: scroll;
  overflow-x: hidden;
}
.cont {
  width: 1169px;
  height: 100px;
  border: 1px solid #aaa;
  margin-top: 10px;
}
.title {
  height: 33px;
  line-height: 33px;
  font-weight: bold;
  /* border: 1px solid black; */
}
.info {
  text-indent: 2em;
  height: 33px;
  /* border: 1px solid black; */
}
.info div {
  text-indent: initial;
}
.deal {
  height: 33px;
  float: right;
  /* border: 1px solid black; */
}
.agree,
.reject,
.agreed,
.rejected {
  display: inline-block;
  line-height: 33px;
  width: 120px;
  text-align: center;
}
.agree {
  background-color: rgb(38, 219, 92);
  cursor: pointer;
}
.reject {
  background-color: #ca3f3f;
  cursor: pointer;
}
.agreed,
.rejected {
  background-color: #aaa;
  cursor: not-allowed;
}
</style>


