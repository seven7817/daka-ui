import Register from './components/LoginRegisterRouters/RegisterRouter'
import Login from './components/LoginRegisterRouters/LoginRouter'
import FindPassword from './components/LoginRegisterRouters/FindbackPassword'
import MineMenu from './components/mine/MineMenu'

export const routes = [
    { path:'/register' ,name:'registerLink', components:{
        'loginRegisterFind':Register}},
    { path:'/login' , components:{'loginRegisterFind':Login}},
    { path:'/findPassword' , components:{'loginRegisterFind':FindPassword}},
    { path:'/mineMenu', component:MineMenu}
]