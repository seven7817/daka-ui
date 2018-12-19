import Register from './components/LoginRegisterRouters/RegisterRouter'
import Login from './components/LoginRegisterRouters/LoginRouter'


export const routes = [
    { path:'/register' ,name:'registerLink', component:Register},
    { path:'/login' , component:Login}
]