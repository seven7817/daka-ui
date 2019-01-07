import Register from './components/LoginRegisterRouters/RegisterRouter'
import Login from './components/LoginRegisterRouters/LoginRouter'
import FindPassword from './components/LoginRegisterRouters/FindbackPassword'
import MineMenu from './components/mine/MineMenu'
import MessageMenu from './components/message/MessageMenu'
import MineInfo from './components/mine/info/MineInfo'
import MineDaka from './components/mine/info/MineDaka'
import BaseInfo from './components/mine/info/mineInfo/BaseInfo'
import ModifyPassword from './components/mine/info/mineInfo/ModifyPassword'
import Main from './components/main/Main'

export const routes = [
    { path:'/register' ,name:'registerLink', components:{
        'loginRegisterFind':Register}},
    { path:'/login' , components:{'loginRegisterFind':Login}},
    { path:'/findPassword' , components:{'loginRegisterFind':FindPassword}},
    { path:'/mineMenu', component:MineMenu , redirect: '/mineMenu/mineInfo', children:[
        {path:'/mineMenu/mineInfo',component:MineInfo, redirect: '/mineMenu/mineInfo/baseInfo',children:[
            {path:'/mineMenu/mineInfo/baseInfo',component:BaseInfo},
            {path:'/mineMenu/mineInfo/modifyPassword',component:ModifyPassword},
        ]},
        {path:'/mineMenu/mineDaka',component:MineDaka},
    ]
    },
    {path:'/MessageMenu',component:MessageMenu},
    {path:'/main',component:Main}
]