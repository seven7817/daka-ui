<template>
  <div class="mine-menu-con">
    <div class="mine-menu">
      <ul>
        <li :class="{'active':1===select}" @click="choose(1)">
          <router-link to="">我的个人资料</router-link>
        </li>
        <li :class="{'active':2===select}" @click="choose(2)">
          <router-link to="">我的打卡记录</router-link>
        </li>
        <li :class="{'active':3===select}" @click="choose(3)">
          <router-link to="">我的钱包</router-link>
        </li>
        <li :class="{'active':4===select}" @click="choose(4)">
          <router-link to="">我的消息</router-link>
        </li>
        <li :class="{'active':5===select}" @click="choose(5)">
          <router-link to="">我的好友</router-link>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      select: null
    };
  },
  methods: {
    choose(index) {
      console.log(index);
      this.select = index;
    }
  }
};
</script>

<style>
div.mine-menu ul li {
  float: left;
  font-size: 15px;
  font-weight: bold;
  height: 53px;
  line-height: 53px;
  width: 120px;
  text-align: center;
}
div.mine-menu ul li a {
color: #000;
}
div ul li:hover {
  color: #10ae58;
}
div ul li.active {
  background-color: #10ae58;
  color: #ffffff;
}
</style>

