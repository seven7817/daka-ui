<template>
  <div class="right-content-center">
    <ul>
      <li>
        <div>账户 {{Email}}</div>
      </li>
      <li>
        <div class="nickname">
          昵称
          <input type="text" v-model="nicknamme">
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
        <div>
          性别
          <input type="radio" v-model="gender" name="gender" value="0">男
          <input type="radio" v-model="gender" name="gender" value="1">女
          <input type="radio" v-model="gender" name="gender" value="2">保密
        </div>
      </li>
      <!-- <li>
        <div>保 存</div>
      </li> -->
    </ul>
    <div class="submit">保 存</div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      Email: "1162573719@qq.com",
      nicknamme: "nickname",
      age: "19",
      gender: "男",
      phone: "18780606147"
    };
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
.right-content-center .submit{
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
  margin-left: 1em;
  font-size: 15px;
}
</style>
