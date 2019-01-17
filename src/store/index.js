import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

const state = {//要设置的全局访问的state对象
    loginFlag: false,
    // 设置到底是登录组件还是注册还是找回密码
    select3:'0',
    //要设置的初始属性值
    isLogin:false,
    Email:'',
    //打卡窗弹是否弹出的状态，现在没有用
    applyDakaFlag:false,
    //弹出扫码框的状态
    scanCodeFlag:false,
};
const getters = {   
    showLoginFlag(state) {  
        return state.loginFlag
    },
    showSelect3(state) {  
        return state.select3
    },
    showIsLogin(state) {  
        return state.isLogin
    },
    showEmail(state) {  
        return state.Email
    },
    showApplyDakaFlag(state) {  
        return state.applyDakaFlag
    },
    showScanCodeFlag(state) {  
        return state.scanCodeFlag
    },
};
const mutations = {
    setLoginFlag(state) {   
        state.loginFlag = !state.loginFlag;
    },
    setSelect3(state,num) {   
        state.select3 = num;
    },
    setIsLogin(state,status) {   
        state.isLogin = status;
    },
    setEmail(state,Email) {   
        state.Email = Email;
    },
    setApplyDakaFlag(state) {   
        state.applyDakaFlag = !state.applyDakaFlag;
    },
    setScanCodeFlag(state) {   
        state.scanCodeFlag = !state.scanCodeFlag;
    },

};
const actions = {
    setLoginFlag(context) {
        context.commit('setLoginFlag');
    },
    setSelect3(context,num) {  
        context.commit('setSelect3',num);
    },
    setIsLogin(context,status) {  
        context.commit('setIsLogin',status);
    },
    setEmail(context,Email) {   
        context.commit('setEmail',Email);
    },
    setApplyDakaFlag(context) {   
        context.commit('setApplyDakaFlag');
    },
    setScanCodeFlag(context) {   
        context.commit('setScanCodeFlag');
    },
};
const store = new Vuex.Store({
    state,
    getters,
    mutations,
    actions
});
export default store;