import Login from "../components/Auth/Login";
import Register from "../components/Auth/Register";
import store from "../store/index"
import Tasks from "@/components/Task/Tasks";
import AddTask from "@/components/Task/AddTask";

export const routes = [
    {
        path: '/',
        name: 'login',
        component: Login,
        beforeEnter: (to, from, next) => {
            if (store.getters['Auth/authenticated']) {
                return next({
                    name: 'tasks'
                });
            }
            next();
        }
    },
    {
        path: '/register',
        name: 'register',
        component: Register,
        beforeEnter: (to, from, next) => {
            if (store.getters['Auth/authenticated']) {
                return next({
                    name: 'tasks'
                });
            }
            next();
        }
    },
    {
        path: '/tasks',
        name: 'tasks',
        component: Tasks,
        beforeEnter: (to, from, next) => {
            if (!store.getters['Auth/authenticated']) {
                return next({
                    name: 'login'
                });
            }
            next();
        }
    },
    {
        path: '/add-tasks',
        name: 'add_task',
        component: AddTask,
        beforeEnter: (to, from, next) => {
            if (!store.getters['Auth/authenticated']) {
                return next({
                    name: 'login'
                });
            }
            next();
        }
    },
]
