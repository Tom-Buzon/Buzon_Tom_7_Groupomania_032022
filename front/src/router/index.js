import { createWebHistory, createRouter } from "vue-router";
import Login from "@/views/Login.vue";
import Home from "@/views/Home.vue";
import Profil from "@/views/Profil.vue";

function guardMyroute(to, from, next) {
    var isAuthenticated = false;
    if (localStorage.getItem('user'))
        isAuthenticated = true;
    else
        isAuthenticated = false;
    if (isAuthenticated) {
        next(); // allow to enter route
    } else {
        next('/'); // go to '/login';
    }
}

const routes = [{
        name: 'login',
        path: '/',
        component: Login,
    },
    {
        name: 'home',
        path: '/home',
        component: Home,
        beforeEnter: guardMyroute,
        props: true
    },
    {
        name: 'profil',
        path: '/profil',
        component: Profil,
        props: true
    },

]
const router = createRouter({
    history: createWebHistory(),
    routes,
})


router.replace({ path: '*', redirect: '/' })

export default router;