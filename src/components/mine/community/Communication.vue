<template>
  <div class="bottom-con">
    <div class="left-nav-con">
      <div class="user-frame" v-for="friend in friends">
        <div class="username">{{friend.toEmail}}</div>
        <div class="bottom">
          <div class="sendMsg">发送消息</div>
          <div class="delete">删除好友</div>
        </div>
      </div>
    </div>
    <div class="right-content-con"></div>
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      friends:null
    };
  },
  methods: {},
  created() {
    this.$axios
      .post("/apis/daka/getFriends/", {
        email: sessionStorage.getItem("seesionEmail")
      })
      .then(response => {
        // console.log(response.data[0]);
        // console.log(response.data[0].code);
        // console.log(response.data[0].data);
        this.friends = response.data[0].data;
      });
  }
};
</script>
<style scoped>
.bottom-con {
  width: 1190px;
  height: 100%;
  margin: 0 auto;
  border: 1px solid black;
  position: relative;
  background-color: #ffffff;
}
.bottom-con .left-nav-con {
  border: 1px solid black;
  position: absolute;
  right: 0px;
  width: 250px;
  height: 100%;
  overflow: scroll;
  overflow-x: hidden;
}
.user-frame {
  width: 230px;
  height: 100px;
  border: 1px solid black;
}
.username {
  width: 100%;
  height: 60px;
  /* border: 1px solid black; */
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  line-height: 60px;
}
.bottom {
  width: 230px;
  height: 40px;
  /*  */
  /* border: 1px solid red; */
  background-color: #eee;
  box-sizing: border-box;
}
.sendMsg,
.delete {
  width: 114px;
  height: 40px;
  /* border: 1px solid black; */
  line-height: 40px;
  text-align: center;
  box-sizing: border-box;
  float: left;
  cursor: pointer;
}
.sendMsg {
  border-right: 1px solid #ddd;
}
.bottom-con .right-content-con {
  width: 740px;
  height: 100%;
  border: 1px solid black;
  position: absolute;
  left: 100px;
  overflow: scroll;
  overflow-x: hidden;
}
</style>


