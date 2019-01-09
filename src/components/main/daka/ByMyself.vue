<template>
  <div class="main-cont">
    <div class="main-cont-left">
      <div class="msg">
        <div class="responseNum">100</div>
        <div class="msg-cont">
          <div class="msgTitle">标题</div>
          <div class="msgTime-con">
            <div class="msgTime">时间</div>
          </div>
        </div>
      </div>
    </div>
    <div class="main-cont-right">
        <div class="userInfo-con"></div>
        <div class="apply-daka" v-on:click="daka()">我要打卡</div>
    </div>
  </div>
</template>
<script>
export default {
  data(){
    return {

    }
  },
  methods:{
    daka(){
      sessionStorage.setItem('loginFlag',true)
    }
  }
};
</script>
<style>
.main-cont {
  width: 1190px;
  height: 100%;
  margin: 0 auto;
  background-color: #ffffff;
}
.main-cont .main-cont-left {
  float: left;
  height: 100%;
  width: 890px;
  border: 1px solid #000;
}
.main-cont .main-cont-left .msg {
  width: 100%;
  height: 60px;
  border: 1px solid black;
}
.main-cont .main-cont-left .msg .responseNum {
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
.main-cont .main-cont-left .msg .msg-cont {
  float: right;
  width: 800px;
  height: 100%;
  /* border: 1px solid black; */
}
.main-cont .main-cont-left .msg .msgTitle {
  float: right;
  width: 100%;
  height: 60%;
  /* border: 1px solid black; */
}
.main-cont .main-cont-left .msg .msgTime-con {
  float: right;
  width: 100%;
  height: 40%;
}
.main-cont .main-cont-left .msg .msgTime-con .msgTime{
    float: right;
    height: 100%;
    width: 165px;
}
.main-cont .main-cont-right {
  float: right;
  height: 100%;
  width: 290px;
  border: 1px solid #000;
}
.main-cont .main-cont-right .userInfo-con{
    width: 100%;
    height: 60%;
    border:1px solid black;
}

</style>


