import Register from './components/LoginRegisterRouters/RegisterRouter'
import Login from './components/LoginRegisterRouters/LoginRouter'
import FindPassword from './components/LoginRegisterRouters/FindbackPassword'
import MineMenu from './components/mine/MineMenu'
import MessageMenu from './components/message/MessageMenu'
import MineInfo from './components/mine/info/MineInfo'
import MineDaka from './components/mine/info/MineDaka'
import BaseInfo from './components/mine/info/mineInfo/BaseInfo'
import ModifyPassword from './components/mine/info/mineInfo/ModifyPassword'

export const routes = [
    { path:'/register' ,name:'registerLink', components:{
        'loginRegisterFind':Register}},
    { path:'/login' , components:{'loginRegisterFind':Login}},
    { path:'/findPassword' , components:{'loginRegisterFind':FindPassword}},
    { path:'/mineMenu', component:MineMenu , children:[
        {path:'/mineInfo',component:MineInfo, redirect: '/baseInfo',children:[
            {path:'/baseInfo',component:BaseInfo},
            {path:'/modifyPassword',component:ModifyPassword},
        ]},
        {path:'/mineDaka',component:MineDaka},
    ]
    },
    {path:'/MessageMenu',component:MessageMenu}
]