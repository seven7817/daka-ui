<template>
  <div class="daka-con">
    <div class="daka-cont">
      <div class="head-con">
        <div class="head-left">打卡申请</div>
        <div class="cancel">X</div>
      </div>
      <div class="title-con">
        <div class="title-tips">您的标题：</div>
        <div class="title-cont">
          <input type="text" placeholder="请叙述清楚">
        </div>
      </div>
      <div class="start-date-con">
        <div class="start-date-tips">开始日期：</div>
        <div class="start-date-cont">
          <input type="datetime-local">
        </div>
      </div>
      <div class="time-interval-con">
        <div class="time-interval-tips">时间间隔：</div>
        <div class="time-interval-cont">
          <select>
            <option value="volvo">一天</option>
            <option value="saab">两天</option>
            <option value="opel">三天</option>
            <option value="audi">四天</option>
            <option value="audi">五天</option>
            <option value="audi">六天</option>
            <option value="audi">七天</option>
          </select>
        </div>
      </div>
      <div class="times-con">
        <div class="times-tips">打卡次数：</div>
        <div class="times-cont">
          <input type="number" name="points" min="1" max="100" placeholder="(输入1-100的整数)">
        </div>
      </div>
      <div class="money-very-time-con">
        <div class="money-very-time-tips">打卡金额：</div>
        <div class="money-very-time-cont">
          <input type="number" name="points" min="1" max="100" placeholder="按次计算(输入1-100的整数)">
        </div>
      </div>
      <div class="money-total-con">
        <div class="money-total-tips">总计金额：</div>
        <div class="money-total-cont">
         100元
        </div>
      </div>
      <div class="submit">提交并付款</div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {}
};
</script>

<style>
.daka-con {
  position: absolute;
  height: 100%;
  width: 890px;
  border: 1px solid #000;
  /* z-index: 100; */
  background-color: #ffffff;
}
.daka-con .daka-cont {
  position: absolute;
  top: 25px;
  height: 90%;
  width: 804px;
  border: 1px solid #ddd;
  left: 445px;
  margin-left: -402px;
}
.daka-con .head-con {
  height: 40px;
  width: 804px;
  border: 1px solid black;
  margin: auto;
}
.daka-con .head-con .head-left {
  float: left;
  height: 40px;
  width: 200px;
  border: 1px solid black;
  line-height: 40px;
  font-weight: bold;
  text-align: center;
  font-size: 20px;
}
.daka-con .head-con .cancel {
  float: right;
  height: 40px;
  width: 30px;
  border: 1px solid black;
  line-height: 40px;
  font-weight: bold;
  text-align: center;
  font-size: 20px;
  cursor: pointer;
}
.daka-con .money-total-con,
.daka-con .money-very-time-con,
.daka-con .times-con,
.daka-con .time-interval-con,
.daka-con .start-date-con,
.daka-con .title-con {
  height: 30px;
  width: 500px;
  /* border: 1px solid black; */
  margin: auto;
  margin-top: 25px;
  position: relative;
}
.daka-con .submit{
  height: 30px;
  width: 100px;
  border: 1px solid black;
  margin: auto;
  margin-top: 25px;
  position: relative;
  line-height: 30px;
  text-align: center;
  background-color: #28a745;
  color: #fff;
  font-weight: bold;
  cursor: pointer;
}
.daka-con .money-total-con .money-total-tips,
.daka-con .money-very-time-con .money-very-time-tips,
.daka-con .times-con .times-tips,
.daka-con .time-interval-con .time-interval-tips,
.daka-con .start-date-con .start-date-tips,
.daka-con .title-con .title-tips {
  position: absolute;
  float: left;
  height: 30px;
  width: 80px;
  /* border: 1px solid black; */
  line-height: 30px;
  left: 250px;
  margin-left: -80px;
}
.daka-con .money-total-con .money-total-cont,
.daka-con .money-very-time-con .money-very-time-cont,
.daka-con .times-con .times-cont,
.daka-con .time-interval-con .time-interval-cont,
.daka-con .start-date-con .start-date-cont,
.daka-con .title-con .title-cont {
  position: absolute;
  float: left;
  height: 30px;
  width: 180px;
  /* border: 1px solid black; */
  line-height: 30px;
  left: 250px;
}
.daka-con .money-very-time-con .money-very-time-cont input,
.daka-con .times-con .times-cont input,
.daka-con .start-date-con .start-date-cont input,
.daka-con .title-con .title-cont input {
  /* position: absolute;
  float: left; */
  height: 30px;
  width: 180px;
  /* border: 1px solid black; */
  line-height: 30px;
  left: 250px;
}
.daka-con .time-interval-con .time-interval-cont select {
  height: 34px;
  width: 184px;
  /* border: 1px solid black; */
  line-height: 30px;
  left: 250px;
}
</style>

