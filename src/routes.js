import MineMenu from './components/mine/MineMenu'
import MessageMenu from './components/message/MessageMenu'
import MineInfo from './components/mine/info/MineInfo'
import MineDaka from './components/mine/daka/MineDaka'
import BaseInfo from './components/mine/info/mineInfo/BaseInfo'
import ModifyPassword from './components/mine/info/mineInfo/ModifyPassword'
import Main from './components/main/Main'
import ByMyself from './components/main/daka/ByMyself'
import BySystem from './components/main/daka/BySystem'

import DakaHistory from './components/mine/daka/mineDaka/DakaHistory'
import Finishing from './components/mine/daka/mineDaka/Finishing'

import Community from './components/mine/community/Communication'

export const routes = [
    
    {
        path: '/mineMenu', component: MineMenu, redirect: '/mineMenu/mineInfo', children: [
            {
                path: '/mineMenu/mineInfo', component: MineInfo, redirect: '/mineMenu/mineInfo/baseInfo', children: [
                    { path: '/mineMenu/mineInfo/baseInfo', component: BaseInfo },
                    { path: '/mineMenu/mineInfo/modifyPassword', component: ModifyPassword },
                ]
            },
            { path: '/mineMenu/mineDaka', component: MineDaka,children:[
                { path: '/mineMenu/mineDaka/dakaHistory', component: DakaHistory },
                { path: '/mineMenu/mineDaka/finishing', component: Finishing },
            ] },
            { path: '/mineMenu/community', component: Community }, 
        ]
    },
    { path: '/MessageMenu', component: MessageMenu },
    {
        path: '/', component: Main, redirect: '/main/byMyself',children: [
            { path: '/main/byMyself', component: ByMyself },
            { path: '/main/bySystem', component: BySystem },
        ]
    }
]