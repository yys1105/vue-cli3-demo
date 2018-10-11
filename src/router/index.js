import Vue from 'vue'
import Router from 'vue-router'
// const homeView = () =>
//     import ( /* webpackChunkName: "home" */ '../views/homeView')
const mainView = () =>
    import('../views/mainView.vue')

const homeView = () =>
    import ('../views/homeView')
const fundsView = () =>
    import ('../views/fundsView')

const memberView = () =>
    import ('../views/memberView')
const memberSpuView = () =>
    import('../views/memberView/memberSpuView.vue')

const priceView = () =>
    import ('../views/product/priceView')
const salesView = () =>
    import ('../views/product/salesView')
const typeView = () =>
    import ('../views/product/typeView')

const ordersView = () =>
    import ('../views/ordersView')
const orderDetailsView = () =>
    import("../views/ordersView/detailsView.vue")

const reportsView = () =>
    import("../views/reportsView")
const reportDetailsView = () =>
    import("../views/reportsView/detailsView.vue")
const loginView = () =>
    import ('../views/loginView')


// 404
const Fview = () =>
    import ( /* webpackChunkName: "fof" */ '../views/fof.vue')

Vue.use(Router)

export default new Router({
    mode: 'hash',
    scrollBehavior: () => ({
        y: 0
    }),
    routes: [
        // {
        //     path: '/home',
        //     name: 'homeView',
        //     component: homeView
        // },
        {
            path: "",
            name: "home",
            redirect: {
                name: 'funds'
            }
        },
        {
            path: '/funds',
            name: 'funds',
            component: fundsView
        },
        {
            path: '/member',
            component: mainView,
            children: [{
                path: '',
                name: 'member',
                component: memberView
            }, {
                path: 'hy',
                name: 'hy',
                component: memberSpuView
            }]
        },
        {
            path: '/product',
            component: mainView,
            children: [{
                path: 'price',
                name: 'price',
                component: priceView
            }, {
                path: 'sales',
                name: 'sales',
                component: salesView
            }, {
                path: 'type',
                name: 'type',
                component: typeView
            }]
        },
        {
            path: "/orders",
            component: mainView,
            children: [{
                path: '',
                name: "orders",
                component: ordersView
            }, {
                path: ':id',
                name: "orderDetails",
                component: orderDetailsView
            }]
        }, {
            path: "/reports",
            component: mainView,
            children: [{
                path: '',
                name: "reports",
                component: reportsView
            }, {
                path: ':id',
                name: "reportDetails",
                component: reportDetailsView
            }]
        },
        // {
        //     path: '/orders',
        //     name: "orders",
        //     component: ordersView
        // },
        // {
        //     path: '/orders/:id',
        //     name: "orderDetails",
        //     component: orderDetailsView
        // },
        {
            path: '/login',
            name: "login",
            component: loginView
        },
        {
            path: '*',
            alias: "404",
            name: "fof",
            component: Fview
        }
    ]
})