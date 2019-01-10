<template>
    <div class="main-cont">
    </div>

</template>
<script>
export default {
    data(){
        return {

        }
    },
    computed:{
        bbb(){
            
            return sessionStorage.getItem('aaa')
        }
    },
    methods:{
        aaa(){
            sessionStorage.setItem('aaa','bbbb')
        }
    }

    
}
</script>
<style>
.main-cont{
    width: 1190px;
    height: 100%;
    margin: 0 auto;
    background-color: #ffffff;
}
</style>


