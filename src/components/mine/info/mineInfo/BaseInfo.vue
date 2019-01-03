<template>
  <div class="right-content-center">
    <ul>
      <li>
        <div>账户 {{Email}}</div>
      </li>
      <li>
        <div class="nickname">
          昵称
          <input type="text" v-model="nickname">
        </div>
      </li>
      <li>
        <div class="age">
          年龄
          <input type="text" v-model="age">
        </div>
      </li>
      <li>
        <div class="phone">
          手机
          <input type="text" v-model="phone">
        </div>
      </li>
      <li>
        <div class="gender">
          性别
          <input  type="radio" v-model="gender" name="gender" value="0">男
          <input type="radio" v-model="gender" name="gender" value="1">女
          <input type="radio" v-model="gender" name="gender" value="2">保密
        </div>
      </li>
      <!-- <li>
        <div>保 存</div>
      </li>-->
    </ul>
    <div class="submit" @click="saveBaseInfo()">保 存</div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      Email: "",
      nickname: "",
      age: "",
      gender: "",
      phone: ""
    };
  },
  methods: {
    saveBaseInfo() {
      if(this.nickname.length<24){
        if (!isNaN(this.age) && this.age % 1 === 0) {
          if (this.age > 150 || this.age < 1) {
            alert("请输入正确的年龄");
          } else {
            this.$axios
              .post("/apis/daka/saveBaseInfo/", {
                Email: this.Email,
                nickname: this.nickname,
                age: this.age,
                Email: this.Email,
                gender: this.gender,
                phone: this.phone
              })
              .then(response => {
                // console.log(response.data[0]);
                if(response.data[0].code==0){
                  alert('保存成功')
                }
              });
          }
        } else {
          alert("请输入正确的年龄");
        }
      }else{
        alert("昵称的长度不能超过24个字符")
      }
    }
  },
  created() {
    this.$axios
      .post("/apis/daka/getBaseInfo/", {
        Email: sessionStorage.getItem("Email")
      })
      .then(response => {
        if (response.data[0].code == 0) {
          console.log(response.data[0].data);
          this.Email = sessionStorage.getItem("Email");
          this.nickname = response.data[0].data.nickname;
          this.age = response.data[0].data.age;
          this.phone = response.data[0].data.phone;
          this.gender = response.data[0].data.gender;
        } else {
          console.log(response.data[0]);
        }
      });
  }
};
</script>

<style>
.right-content-center {
  width: 880px;
  height: 450px;
  border: 1px solid red;
  margin: 10px auto;
  position: relative;
}
.right-content-center .submit {
  display: inline-block;
  position: absolute;
  bottom: 0px;
  cursor: pointer;
  width: 88px;
  height: 44px;
  background-color: #10ae58;
  text-align: center;
  line-height: 44px;
  left: 50%;
  margin-left: -44px;
  color: #ffffff;
  font-weight: bold;
}
.right-content-center ul li {
  float: left;
  width: 250px;
  height: 100px;
  border: 1px solid black;
  margin: 0 90px;
  color: #666;
}
.right-content-center ul li {
  width: 250px;
  display: inline-block;
  height: 100px;
  line-height: 100px;
  /* text-align: center; */
}
.right-content-center ul li div.phone input,
.right-content-center ul li div.age input,
.right-content-center ul li div.nickname input {
  height: 37px;
  margin-left: 4px;
  font-size: 15px;
}
.right-content-center ul li div.gender input{
  margin-left: 4px;
}
</style>
