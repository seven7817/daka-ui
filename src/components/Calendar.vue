<template>
  <div class="calendar-con">
    <div class="top-con">
      <div class="pre-year" @click="goPreYear(),updateCalendarByDifferentDate()">&lt;&lt;</div>
      <div class="pre-month" @click="goPreMonth(),updateCalendarByDifferentDate()">&lt;</div>
      <div class="cur-year">{{curYear}}年</div>
      <div class="cur-month">{{curMonth+1}}月</div>
      <div class="next-month" @click="goNextMonth(),updateCalendarByDifferentDate()">&gt;</div>
      <div class="next-year" @click="goNextYear(),updateCalendarByDifferentDate()">&gt;&gt;</div>
    </div>
    <div class="day">
      <ul>
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
        <li v-for="n in preBoxNum" :key="n">{{n+preStart}}</li>
      </ul>
      <ul class="cur-date">
        <li
          v-for="n in curBoxNum"
          :class="{isToday:isToday==n,noFinished:datesState[n-1]==1,isFinished:datesState[n-1]==2,Finishing:datesState[n-1]==3,checking:datesState[n-1]==4}"
          @click="showTaskDetail(n)"
        >{{n}}</li>
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
      preBoxNum: "", //第一段的盒子数
      preStart: "", //第一个框应该显示的日期
      curBoxNum: "", //这个月的盒子数
      nextBoxNum: "", //下一个月的盒子数
      isToday: "",
      datesState: [
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0
      ], //1表示未完成用红色，审核未通过也用红色 2表示已完成用绿色，3表示正在进行用黄色。4表示正在审核用粉色
      allTasksState: null
    };
  },
  props: ["finishing", "isUpdateCalendar"],
  created() {
    var date = new Date();
    console.log('box'+date)
    //获得这个月的一号是星期几
    date.setDate(1);
    this.preBoxNum = date.getDay();
    //把date设置为0那么月份会减一
    date.setDate(0); 
    this.preStart = date.getDate() - this.preBoxNum;
    //获得这个月有几天
    date.setDate(1);   //把date设置为1的目的是为了让如果当月有三十一日的时候月份加2的话不一定那个月有三十一天，可能会出错
    date.setMonth(date.getMonth() + 2);
    date.setDate(0);
    // date = new Date(2019,3,0)   //这个初始值是3月份的第零天，就表示上个月的最后一天
    this.curBoxNum = date.getDate();
    console.log('box'+date)

    //获得下个月要显示到几号
    this.nextBoxNum = 42 - this.preBoxNum - this.curBoxNum;
    //初始化今天是哪天
    date = new Date();
    this.isToday = date.getDate();
  },
  watch: {
    isUpdateCalendar: function(newValue ,oldValue){
      this.$axios
        .post(
          "/apis/daka/getDakaTasksStateByDakaIdAndStartDateAndTimeInterval/",
          {
            dakaId: this.finishing.id,
            //2019-02-27 00:00:00
            startDate: this.finishing.startDate.time / 1000,
            timeInterval: this.finishing.timeInterval
          }
        )
        .then(response => {
          // console.log(response.data[0]);
          // console.log(response.data[0].code);
          // console.log(response.data[0].data)
          this.allTasksState = response.data[0].data;
          this.updateCalendar(response.data[0].data);
        });
    },
    // 如果 `question` 发生改变，这个函数就会运行
    finishing: function(newFinishing, oldQuestion) {
      // console.log('finishing')
      // console.log(this.finishing)

      // console.log(this.finishing.id)
      // console.log(this.finishing.startDate.time)
      // console.log(this.finishing.timeInterval)
      this.$axios
        .post(
          "/apis/daka/getDakaTasksStateByDakaIdAndStartDateAndTimeInterval/",
          {
            dakaId: this.finishing.id,
            //2019-02-27 00:00:00
            startDate: this.finishing.startDate.time / 1000,
            timeInterval: this.finishing.timeInterval
          }
        )
        .then(response => {
          // console.log(response.data[0]);
          // console.log(response.data[0].code);
          // console.log(response.data[0].data)
          this.allTasksState = response.data[0].data;
          this.updateCalendar(response.data[0].data);
        });
    }
  },
  methods: {
    //当用户点击日历上的日期的时候进行
    showTaskDetail(n) {
      if (this.allTasksState != null ) {
        if (this.allTasksState[n - 1] != 0 ) {
          this.$emit("showTaskDetail", this.curYear, this.curMonth, n);
        }
      }
    },
    //变更日历的时候更新任务状态
    updateCalendarByDifferentDate() {
      if (this.allTasksState != null) {
        this.updateCalendar(this.allTasksState);
      }
    },
    //初始化日历的时候接受服务器发回的状态进行更新日历操作
    updateCalendar(tasksState) {
      var date = new Date();
      //今天所处的周期
      var curOrder =
        (date.getTime() - this.finishing.startDate.time) /
        (this.finishing.timeInterval * 60 * 60 * 1000);
      curOrder = Math.ceil(curOrder);
      // console.log('curOrder:'+curOrder)
      var newDatesState = [
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0
      ];

      var todayDeadDate = new Date();
      todayDeadDate.setHours(0);
      todayDeadDate.setMinutes(0);
      todayDeadDate.setSeconds(0);
      todayDeadDate.setDate(todayDeadDate.getDate() + 1);

      var deadLine =
        todayDeadDate.getTime() >
        this.finishing.startDate.time +
          this.finishing.timeInterval * 60 * 60 * 1000 * this.finishing.times
          ? this.finishing.startDate.time +
            this.finishing.timeInterval * 60 * 60 * 1000 * this.finishing.times
          : todayDeadDate.getTime();
      // console.log('deadLine:'+deadLine)
      // console.log('startDate.time'+this.finishing.startDate.time)
      // console.log('curBoxNum:'+this.curBoxNum)
      for (var i = 1; i <= this.curBoxNum; i++) {
        // console.log('num:'+i)
        date.setFullYear(this.curYear, this.curMonth, i);
        // console.log('date:'+date.getTime())

        if (
          this.finishing.startDate.time < date.getTime() &&
          date.getTime() < deadLine
        ) {
          var order =
            (date.getTime() - this.finishing.startDate.time) /
            (this.finishing.timeInterval * 60 * 60 * 1000);
          order = Math.ceil(order);
          // console.log('order:'+order)
          // console.log(tasksState)
          if (tasksState.length > 0) {
            for (var j = 0; j < tasksState.length; j++) {
              // console.log(tasksState[j][0]==order)
              if (tasksState[j][0] == order) {
                //说明打卡了
                if (tasksState[j][1] == "0") {
                  //说明待审核
                  newDatesState[i - 1] = 4;
                  break;
                } else if (tasksState[j][1] == "1") {
                  //表示通过
                  newDatesState[i - 1] = 2;
                  break;
                } else if (tasksState[j][1] == "2") {
                  //表示没有通过
                  newDatesState[i - 1] = 1;
                  break;
                }
              } else {
                //说明没有打卡
                newDatesState[i - 1] = 1;
              }
            }
          } else {
            newDatesState[i - 1] = 1;
          }
          // 1表示未完成用红色，审核未通过也用红色 2表示已完成用绿色，3表示正在进行用黄色。4表示正在审核用粉色
          if (order == curOrder) {
            //表名是正在进行打卡的周期
            if (tasksState.length > 0) {
              for (var j = 0; j < tasksState.length; j++) {
                if (tasksState[j][0] == order) {
                  //说明打卡了
                  if (tasksState[j][1] == "0") {
                    //说明待审核
                    newDatesState[i - 1] = 4;
                    break;
                  } else if (tasksState[j][1] == "1") {
                    //表示通过
                    newDatesState[i - 1] = 2;
                    break;
                  } else if (tasksState[j][1] == "2") {
                    //表示没有通过
                    newDatesState[i - 1] = 1;
                    break;
                  }
                } else {
                  //说明没有打卡需变成黄色，表正在进行
                  newDatesState[i - 1] = 3;
                }
              }
            } else {
              newDatesState[i - 1] = 3;
            }
          }
        }
      }
      // console.log(newDatesState)
      // console.log(newDatesState)
      this.datesState = newDatesState;
    },
    goPreMonth() {
      if (this.curMonth == 0) {
        this.curYear -= 1;
        this.curMonth = 11;
      } else {
        this.curMonth -= 1;
      }
      this.flushDate();
    },
    goNextMonth() {
      if (this.curMonth == 11) {
        this.curYear += 1;
        this.curMonth = 0;
      } else {
        this.curMonth += 1;
      }
      this.flushDate();
    },
    goPreYear() {
      this.curYear -= 1;
      this.flushDate();
    },
    goNextYear() {
      this.curYear += 1;
      this.flushDate();
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
    flushDate() {
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
  width: 28px;
  height: 28px;
  margin: 1px;
  float: left;
  text-align: center;
  line-height: 28px;
  border-radius: 50%;
  cursor: pointer;
}
.calendar-con .bottom-con .pre-date li,
.calendar-con .bottom-con .next-date li {
  color: rgb(150, 150, 150);
  cursor: not-allowed;
}

.calendar-con .bottom-con .cur-date .isToday {
  background-color: aqua;
}
/* 1表示未完成用红色，审核未通过也用红色 2表示已完成用绿色，3表示正在进行用黄色。4表示正在审核用粉色 */
.calendar-con .bottom-con .cur-date .isFinished {
  background-color: chartreuse;
}
.calendar-con .bottom-con .cur-date .noFinished {
  background-color: firebrick;
}
.calendar-con .bottom-con .cur-date .Finishing {
  background-color: gold;
}
.calendar-con .bottom-con .cur-date .checking {
  background-color: darkgray;
}
</style>

