<template>
  <div class="pageHelper">
    <div class="first" @click="canGoFirst&&goFirstPage()">首页</div>
    <div class="backBefore" :class="{ative:!canBackBefore}" @click="canBackBefore&&backBefore()">上一页</div>
    <div class="goNext" :class="{ative:!canGoNext}" @click="canGoNext&&goNext()">下一页</div>
    <div class="last" @click="goLastPage()">尾页</div>
    <div class="currentPage">{{curPage}}/{{total}}</div>
    <div class="jump" @click="goYourWant()">跳转到 </div>
    <div class="want-to-jump-con">
      <input type="text" class="want-to-jump" v-model="wantToJump"> 页
    </div>
  </div>
</template>
<script>
export default {
    mounted() {
        this.$nextTick(() => { this.initPager() }) //需要延迟初始化
    },
    data(){
        return {
            canBackBefore:'',
            canGoNext:'',
            wantToJump:'',
            canGoFirst:'',
            canGoLast:''
        }
    },
    //当前页数，总页数
    props:['curPage',"total"],
    watch:{
        curPage(){
            this.initPager()
        }
    },
    methods:{
        goFirstPage(){
            this.$emit('getPageInfo',1)
        },
        backBefore(){
            this.$emit('getPageInfo',this.curPage-1)
        },
        goNext(){
            this.$emit('getPageInfo',this.curPage+1)
        },
        goLastPage(){
            this.$emit('getPageInfo',this.total)
        },
        goYourWant(){
            if(this.wantToJump && /[1-9][0-9]*/.test(this.wantToJump)){             
                if(this.wantToJump > 0 && this.wantToJump <= this.total){
                    this.$emit('getPageInfo', this.wantToJump ) //调用父组件方法
                }else{
                    this.wantToJump = ""
                    alert('请输入正确的页数')
                }
            }else{
                this.wantToJump = ""
                alert('请输入正确的数字')
            }
        },
        initPager(){
            this.canGoFirst = this.curPage> 1
            this.canGoLast = this.curPage< this.total
            // console.log(this.curPage)
            // console.log(this.total)
            this.canBackBefore = this.curPage> 1
            this.canGoNext = this.curPage< this.total
        }
    }
}
</script>

<style>
.pageHelper {
  height: 30px;
}
.pageHelper .jump,
.pageHelper .last,
.pageHelper .goNext,
.pageHelper .backBefore,
.pageHelper .first {
  width: 50px;
  height: 30px;
  float: left;
  line-height: 30px;
  text-align: center;
  cursor: pointer;
}
.pageHelper .currentPage{
    width: 50px;
  height: 30px;
  float: left;
  line-height: 30px;
  text-align: center;
}
.pageHelper .want-to-jump-con {
  width: 50px;
  height: 30px;
  float: left;
  line-height: 30px;
  text-align: center;
}
.pageHelper .want-to-jump-con .want-to-jump {
  width: 22px;
}
.pageHelper .active{
    cursor: not-allowed
}
</style>

