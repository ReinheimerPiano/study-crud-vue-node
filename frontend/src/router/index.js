import Vue from 'vue'
import Router from 'vue-router'
import Menu from '@/components/Menu'
import Estado from '@/components/Estado'
import Cidade from '@/components/Cidade'
import Cliente from '@/components/Cliente'

Vue.use(Router)

export default new Router({
    routes: [{
            path: '/',
            name: 'Menu',
            component: Menu
        },
        {
            path: '/Estado',
            name: 'Estado',
            component: Estado
        },
        {
            path: '/Cidade',
            name: 'Cidade',
            component: Cidade
        },
        {
            path: '/Cliente',
            name: 'Cliente',
            component: Cliente
        }
    ]
})