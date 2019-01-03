<template>
  <div class="modify-psd-con">
    <div class="tip">邮箱验证修改密码</div>
    <div class="code">
      <div class="code-inp">
        <input type="text" placeholder="请输入验证码"></input>
      </div>
      <div class="code-get" @click="binding && getVerificationCode()">{{tips1}}</div>
    </div>
    <div class="psd1">
      <input type="text" placeholder="请输入新的密码"></input>
    </div>
    <div class="psd2">
      <input type="text" placeholder="请重新输入密码"></input>
    </div>
    <div class="submit">提 交</div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      binding: true,
      tips1: "获取验证码",
      totalTime: "60"
    };
  },
  methods: {
    getVerificationCode() {
      console.log("getVerificationCode" + sessionStorage.getItem("Email"));

      // 取消该按钮的绑定
      this.binding = false;
      this.tips1 = "重新发送(" + this.totalTime + "s)";
      let clock = window.setInterval(() => {
        this.totalTime--;
        this.tips1 = "重新发送(" + this.totalTime + "s)";
        if (this.totalTime < 0) {
          window.clearInterval(clock);
          this.tips1 = "重新发送";
          this.totalTime = 60;
          this.binding = true;
        }
      }, 1000);
      this.$axios
        .post("/apis/daka/getEmail/", {
          Email: sessionStorage.getItem("Email"),
          operation: 2 //表示修改密码的验证码
        })
        .then(response => {
          console.log(response.data[0].code);
          console.log(response.data[0]);
          alert(response.data[0].msg);
        });
    }
  }
};
</script>

<style>
.modify-psd-con {
  width: 442px;
  height: 402px;
  margin: 40px auto;
  border: 1px solid red;
}
.modify-psd-con .tip {
  font-size: 20px;
  font-weight: bold;
  margin: 30px;
}
.modify-psd-con .code {
  width: 358px;
  height: 44px;
  margin: 40px auto;
}
.modify-psd-con .psd1,
.modify-psd-con .psd2,
.modify-psd-con .submit {
  width: 358px;
  height: 44px;
  border: 1px solid #c5cddb;
  margin: 40px auto;
}
.modify-psd-con .submit {
  line-height: 44px;
  text-align: center;
  background-color: #49af4f;
  color: #ffffff;
  cursor: pointer;
  font-size: 20px;
}
.modify-psd-con .code .code-inp {
  border: 1px solid #c5cddb;
  float: left;
  width: 230px;
  height: 44px;
}
.modify-psd-con .code .code-inp input {
  /* text-decoration: none; */
  width: 200px;
  height: 44px;
  border: none;
  outline: none;
  font-size: 20px;
}
.modify-psd-con .code .code-get {
  border: 1px solid #49af4f;
  color: #49af4f;
  width: 120px;
  height: 44px;
  line-height: 44px;
  text-align: center;
  float: right;
  cursor: pointer;
}
.modify-psd-con .psd1 input,
.modify-psd-con .psd2 input {
  width: 358px;
  height: 44px;
  font-size: 20px;
  line-height: 44px;
  border: none;
  outline: none;
}
</style>
