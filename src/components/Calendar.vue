<template>
  <div class="calendar-con">
    
    <div class="top-con">
      <div class="pre-year" @click="goPreYear()">&lt;&lt;</div>
      <div class="pre-month" @click="goPreMonth()">&lt;</div>
      <div class="cur-year">{{curYear}}年</div>
      <div class="cur-month">{{curMonth+1}}月</div>
      <div class="next-month" @click="goNextMonth()">&gt;</div>
      <div class="next-year" @click="goNextYear()">&gt;&gt;</div>
    </div>
    <div class="day">
      <ul >
        <li>日</li>
        <li>一</li>
        <li>二</li>
        <li>三</li>
        <li>四</li>
        <li>五</li>
        <li>六</li>
      </ul>
    </div>
    <div class="bottom-con">
      <ul class="pre-date">
        <li v-for="n in preBoxNum">{{n+preStart}}</li>
      </ul>
      <ul class="cur-date">
        <li v-for="n in curBoxNum" :class="{isToday:isToday==n}">{{n}}</li>
      </ul>
      <ul class="next-date">
        <li v-for="n in nextBoxNum">{{n}}</li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      curYear: new Date().getFullYear(),
      curMonth: new Date().getMonth(),
      preBoxNum: "",
      preStart: "",
      curBoxNum: "",
      nextBoxNum: "",
      indexYear: "",
      indexMonth: "",
      isToday: ""
    };
  },
  created() {
    var date = new Date();
    //获得这个月的一号是星期几
    date.setDate(1);
    this.preBoxNum = date.getDay();
    date.setDate(0);
    this.preStart = date.getDate() - this.preBoxNum;
    //获得这个月有几天
    date.setMonth(date.getMonth() + 1);
    date.setDate(0);
    // date = new Date(2019,3,0)   //这个初始值是3月份的第零天，就表示上个月的最后一天
    this.curBoxNum = date.getDate();
    //获得下个月要显示到几号
    this.nextBoxNum = 42 - this.preBoxNum - this.curBoxNum;
    //初始化今天是哪天
    date = new Date();
    this.isToday = date.getDate();
  },
  methods: {
    goPreMonth() {
      if (this.curMonth == 0) {
        this.curYear -= 1;
        this.curMonth = 11;
      } else {
        this.curMonth -= 1;
      }
      this.flushDate()
    },
    goNextMonth() {
      if (this.curMonth == 11) {
        this.curYear += 1;
        this.curMonth = 0;
      } else {
        this.curMonth += 1;
      }
      this.flushDate()
    },
    goPreYear() {
      this.curYear -= 1;
      this.flushDate()
    },
    goNextYear(){
      this.curYear += 1;
      this.flushDate()
    },
    getWeekByYearAndMonth(year, month) {
      var date = new Date(year, month, 1);
      return date.getDay();
    },
    getDaysByYearAndMonth(year, month) {
      var date = new Date(year, month + 1, 0);
      return date.getDate();
    },
    getPreMonthStartDay(year, month, preBoxNum) {
      var date = new Date(year, month, 0);
      return date.getDate() - preBoxNum;
    },
    //判断是否是本年本月
    isRightDate(year, month) {
      var date = new Date();
      if (year == date.getFullYear() && month == date.getMonth()) {
        this.isToday = date.getDate();
      } else {
        this.isToday = 0;
      }
    },
    flushDate(){
      this.preBoxNum = this.getWeekByYearAndMonth(this.curYear, this.curMonth);
      this.curBoxNum = this.getDaysByYearAndMonth(this.curYear, this.curMonth);
      this.nextBoxNum = 42 - this.preBoxNum - this.curBoxNum;
      this.preStart = this.getPreMonthStartDay(
        this.curYear,
        this.curMonth,
        this.preBoxNum
      );
      //是否是本年本月
      this.isRightDate(this.curYear, this.curMonth);
    }
  }
};
</script>
<style>
.calendar-con {
  width: 220px;
  height: 260px;
  border: 1px solid black;
}
.calendar-con .top-con {
  width: 220px;
  height: 40px;
  margin: auto;
  text-align: center;
}
.calendar-con .top-con .pre-year,
.calendar-con .top-con .pre-month {
  cursor: pointer;
  display: inline-block;
  width: 20px;
  height: 40px;
  line-height: 40px;
}
.calendar-con .top-con .cur-year {
  display: inline-block;
  width: 55px;
  height: 40px;
  line-height: 40px;
}
.calendar-con .top-con .cur-month {
  display: inline-block;

  width: 40px;
  height: 40px;
  line-height: 40px;
}
.calendar-con .top-con .next-month,
.calendar-con .top-con .next-year {
  display: inline-block;
  width: 20px;
  height: 40px;
  line-height: 40px;
  cursor: pointer;
}
.calendar-con .day {
  height: 30px;
  text-align: center;
}
.calendar-con .day li {
  float: left;
  width: 30px;
  height: 30px;
}
.calendar-con .bottom-con {
  margin-top: 10px;
  width: 210px;
  height: 180px;
}
.calendar-con .bottom-con li {
  width: 30px;
  height: 30px;
  float: left;
  text-align: center;
  line-height: 30px;
}
.calendar-con .bottom-con .pre-date li,
.calendar-con .bottom-con .next-date li {
  color: rgb(150, 150, 150);
}

.calendar-con .bottom-con .cur-date .isToday {
  background-color: aqua;
}
</style>

